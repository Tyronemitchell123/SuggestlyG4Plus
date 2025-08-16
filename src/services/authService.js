/**
 * @fileoverview Authentication Service
 * @author Tyron Mitchell
 * @version 2.0.0
 * @created 2025-01-27
 * @lastModified 2025-01-27
 * @description Complete user authentication and profile management system
 * @copyright © 2025 SuggestlyG4Plus. All rights reserved.
 * @license MIT
 */

import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "your-api-key",
  authDomain:
    process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "your-domain.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket:
    process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "your-bucket.appspot.com",
  messagingSenderId:
    process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "your-app-id",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

class AuthService {
  constructor() {
    this.currentUser = null;
    this.authStateListeners = [];
    this.init();
  }

  // Initialize authentication state
  init() {
    onAuthStateChanged(auth, (user) => {
      this.currentUser = user;
      this.notifyAuthStateChange(user);
    });
  }

  // Register new user
  async register(email, password, userData = {}) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update profile with display name
      if (userData.displayName) {
        await updateProfile(user, { displayName: userData.displayName });
      }

      // Create user document in Firestore
      await this.createUserProfile(user.uid, {
        email: user.email,
        displayName: userData.displayName || user.displayName,
        createdAt: new Date(),
        role: "user",
        subscription: "free",
        ...userData,
      });

      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Login with email/password
  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Google login
  async loginWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if user exists in our database
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (!userDoc.exists()) {
        // Create new user profile
        await this.createUserProfile(user.uid, {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          createdAt: new Date(),
          role: "user",
          subscription: "free",
          provider: "google",
        });
      }

      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Logout
  async logout() {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Password reset
  async resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Create user profile in Firestore
  async createUserProfile(uid, userData) {
    try {
      await setDoc(doc(db, "users", uid), {
        ...userData,
        updatedAt: new Date(),
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Get user profile
  async getUserProfile(uid) {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        return { success: true, data: userDoc.data() };
      } else {
        return { success: false, error: "User not found" };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Update user profile
  async updateUserProfile(uid, updates) {
    try {
      await updateDoc(doc(db, "users", uid), {
        ...updates,
        updatedAt: new Date(),
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Get current user
  getCurrentUser() {
    return this.currentUser;
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.currentUser;
  }

  // Check user role
  hasRole(role) {
    return this.currentUser && this.currentUser.role === role;
  }

  // Subscribe to auth state changes
  onAuthStateChanged(callback) {
    this.authStateListeners.push(callback);
    return () => {
      this.authStateListeners = this.authStateListeners.filter(
        (listener) => listener !== callback
      );
    };
  }

  // Notify auth state listeners
  notifyAuthStateChange(user) {
    this.authStateListeners.forEach((callback) => callback(user));
  }

  // Get user subscription status
  async getSubscriptionStatus(uid) {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        return { success: true, subscription: userDoc.data().subscription };
      }
      return { success: false, error: "User not found" };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Update subscription
  async updateSubscription(uid, subscription) {
    try {
      await updateDoc(doc(db, "users", uid), {
        subscription,
        updatedAt: new Date(),
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

// Create singleton instance
const authService = new AuthService();

export default authService;
