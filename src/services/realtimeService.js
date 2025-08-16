/**
 * @fileoverview Real-time Communication Service
 * @author Tyron Mitchell
 * @version 2.0.0
 * @created 2025-01-27
 * @lastModified 2025-01-27
 * @description WebSocket and Firebase integration for live communication features
 * @copyright © 2025 SuggestlyG4Plus. All rights reserved.
 * @license MIT
 */

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";

class RealtimeService {
  constructor() {
    this.db = getFirestore();
    this.socket = null;
    this.connections = new Map();
    this.listeners = new Map();
    this.notifications = [];
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000;
  }

  // Initialize real-time service
  async init() {
    try {
      // Initialize WebSocket connection
      await this.connectWebSocket();

      // Initialize Firebase real-time listeners
      this.initializeFirebaseListeners();

      // Start heartbeat
      this.startHeartbeat();

      return { success: true };
    } catch (error) {
      console.error("Real-time service initialization error:", error);
      return { success: false, error: error.message };
    }
  }

  // Connect WebSocket
  async connectWebSocket() {
    try {
      const wsUrl =
        process.env.REACT_APP_WEBSOCKET_URL ||
        "wss://your-websocket-server.com";
      this.socket = new WebSocket(wsUrl);

      this.socket.onopen = () => {
        console.log("WebSocket connected");
        this.isConnected = true;
        this.reconnectAttempts = 0;
        this.emit("connection", { status: "connected" });
      };

      this.socket.onmessage = (event) => {
        this.handleWebSocketMessage(event.data);
      };

      this.socket.onclose = () => {
        console.log("WebSocket disconnected");
        this.isConnected = false;
        this.emit("connection", { status: "disconnected" });
        this.attemptReconnect();
      };

      this.socket.onerror = (error) => {
        console.error("WebSocket error:", error);
        this.emit("error", error);
      };

      return { success: true };
    } catch (error) {
      console.error("WebSocket connection error:", error);
      return { success: false, error: error.message };
    }
  }

  // Handle WebSocket messages
  handleWebSocketMessage(data) {
    try {
      const message = JSON.parse(data);

      switch (message.type) {
        case "notification":
          this.handleNotification(message.data);
          break;
        case "chat_message":
          this.handleChatMessage(message.data);
          break;
        case "live_data":
          this.handleLiveData(message.data);
          break;
        case "status_update":
          this.handleStatusUpdate(message.data);
          break;
        default:
          this.emit(message.type, message.data);
      }
    } catch (error) {
      console.error("Error handling WebSocket message:", error);
    }
  }

  // Attempt reconnection
  attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(
        `Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})`
      );

      setTimeout(() => {
        this.connectWebSocket();
      }, this.reconnectDelay * this.reconnectAttempts);
    } else {
      console.error("Max reconnection attempts reached");
      this.emit("connection", { status: "failed" });
    }
  }

  // Initialize Firebase real-time listeners
  initializeFirebaseListeners() {
    // Listen for user notifications
    this.listenToNotifications();

    // Listen for chat messages
    this.listenToChatMessages();

    // Listen for live data updates
    this.listenToLiveData();
  }

  // Listen to notifications
  listenToNotifications(userId) {
    if (!userId) return;

    const notificationsQuery = query(
      collection(this.db, "notifications"),
      where("userId", "==", userId),
      where("read", "==", false),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(notificationsQuery, (snapshot) => {
      const notifications = [];
      snapshot.forEach((doc) => {
        notifications.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      this.emit("notifications", notifications);
    });

    this.listeners.set(`notifications_${userId}`, unsubscribe);
  }

  // Listen to chat messages
  listenToChatMessages(chatId) {
    if (!chatId) return;

    const messagesQuery = query(
      collection(this.db, "chat_messages"),
      where("chatId", "==", chatId),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const messages = [];
      snapshot.forEach((doc) => {
        messages.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      this.emit("chat_messages", { chatId, messages });
    });

    this.listeners.set(`chat_${chatId}`, unsubscribe);
  }

  // Listen to live data
  listenToLiveData() {
    const liveDataQuery = query(
      collection(this.db, "live_data"),
      orderBy("timestamp", "desc"),
      limit(100)
    );

    const unsubscribe = onSnapshot(liveDataQuery, (snapshot) => {
      const liveData = [];
      snapshot.forEach((doc) => {
        liveData.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      this.emit("live_data", liveData);
    });

    this.listeners.set("live_data", unsubscribe);
  }

  // Send WebSocket message
  sendMessage(type, data) {
    if (this.socket && this.isConnected) {
      const message = {
        type,
        data,
        timestamp: Date.now(),
      };

      this.socket.send(JSON.stringify(message));
      return { success: true };
    } else {
      return { success: false, error: "WebSocket not connected" };
    }
  }

  // Join chat room
  joinChat(chatId, userId) {
    this.sendMessage("join_chat", { chatId, userId });

    // Start listening to chat messages
    this.listenToChatMessages(chatId);

    return { success: true };
  }

  // Leave chat room
  leaveChat(chatId, userId) {
    this.sendMessage("leave_chat", { chatId, userId });

    // Stop listening to chat messages
    const listenerKey = `chat_${chatId}`;
    if (this.listeners.has(listenerKey)) {
      this.listeners.get(listenerKey)();
      this.listeners.delete(listenerKey);
    }

    return { success: true };
  }

  // Send chat message
  async sendChatMessage(chatId, userId, message, type = "text") {
    try {
      // Save to database
      const messageData = {
        chatId,
        userId,
        message,
        type,
        createdAt: new Date(),
        status: "sent",
      };

      const messageRef = await addDoc(
        collection(this.db, "chat_messages"),
        messageData
      );

      // Send via WebSocket
      this.sendMessage("chat_message", {
        ...messageData,
        id: messageRef.id,
      });

      return { success: true, messageId: messageRef.id };
    } catch (error) {
      console.error("Send chat message error:", error);
      return { success: false, error: error.message };
    }
  }

  // Create notification
  async createNotification(userId, notification) {
    try {
      const notificationData = {
        userId,
        ...notification,
        read: false,
        createdAt: new Date(),
      };

      const notificationRef = await addDoc(
        collection(this.db, "notifications"),
        notificationData
      );

      // Send via WebSocket
      this.sendMessage("notification", {
        ...notificationData,
        id: notificationRef.id,
      });

      return { success: true, notificationId: notificationRef.id };
    } catch (error) {
      console.error("Create notification error:", error);
      return { success: false, error: error.message };
    }
  }

  // Mark notification as read
  async markNotificationAsRead(notificationId) {
    try {
      await updateDoc(doc(this.db, "notifications", notificationId), {
        read: true,
        readAt: new Date(),
      });

      return { success: true };
    } catch (error) {
      console.error("Mark notification as read error:", error);
      return { success: false, error: error.message };
    }
  }

  // Get user notifications
  async getUserNotifications(userId, limit = 20) {
    try {
      const notificationsQuery = query(
        collection(this.db, "notifications"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc"),
        limit(limit)
      );

      const querySnapshot = await getDocs(notificationsQuery);
      const notifications = [];

      querySnapshot.forEach((doc) => {
        notifications.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      return { success: true, notifications };
    } catch (error) {
      console.error("Get user notifications error:", error);
      return { success: false, error: error.message };
    }
  }

  // Get chat messages
  async getChatMessages(chatId, limit = 50) {
    try {
      const messagesQuery = query(
        collection(this.db, "chat_messages"),
        where("chatId", "==", chatId),
        orderBy("createdAt", "desc"),
        limit(limit)
      );

      const querySnapshot = await getDocs(messagesQuery);
      const messages = [];

      querySnapshot.forEach((doc) => {
        messages.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      return { success: true, messages: messages.reverse() };
    } catch (error) {
      console.error("Get chat messages error:", error);
      return { success: false, error: error.message };
    }
  }

  // Create chat room
  async createChatRoom(participants, name = null) {
    try {
      const chatData = {
        participants,
        name: name || `Chat ${participants.join(", ")}`,
        createdAt: new Date(),
        lastMessage: null,
        unreadCount: {},
      };

      const chatRef = await addDoc(collection(this.db, "chat_rooms"), chatData);

      return { success: true, chatId: chatRef.id };
    } catch (error) {
      console.error("Create chat room error:", error);
      return { success: false, error: error.message };
    }
  }

  // Get user chat rooms
  async getUserChatRooms(userId) {
    try {
      const chatRoomsQuery = query(
        collection(this.db, "chat_rooms"),
        where("participants", "array-contains", userId),
        orderBy("lastMessageAt", "desc")
      );

      const querySnapshot = await getDocs(chatRoomsQuery);
      const chatRooms = [];

      querySnapshot.forEach((doc) => {
        chatRooms.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      return { success: true, chatRooms };
    } catch (error) {
      console.error("Get user chat rooms error:", error);
      return { success: false, error: error.message };
    }
  }

  // Update live data
  async updateLiveData(data) {
    try {
      const liveData = {
        ...data,
        timestamp: new Date(),
      };

      await addDoc(collection(this.db, "live_data"), liveData);

      // Send via WebSocket
      this.sendMessage("live_data_update", liveData);

      return { success: true };
    } catch (error) {
      console.error("Update live data error:", error);
      return { success: false, error: error.message };
    }
  }

  // Handle notification
  handleNotification(notification) {
    this.notifications.unshift(notification);

    // Keep only recent notifications
    if (this.notifications.length > 100) {
      this.notifications = this.notifications.slice(0, 100);
    }

    this.emit("notification", notification);
  }

  // Handle chat message
  handleChatMessage(message) {
    this.emit("chat_message", message);
  }

  // Handle live data
  handleLiveData(data) {
    this.emit("live_data_update", data);
  }

  // Handle status update
  handleStatusUpdate(status) {
    this.emit("status_update", status);
  }

  // Start heartbeat
  startHeartbeat() {
    setInterval(() => {
      if (this.isConnected) {
        this.sendMessage("heartbeat", { timestamp: Date.now() });
      }
    }, 30000); // Send heartbeat every 30 seconds
  }

  // Subscribe to events
  on(event, callback) {
    if (!this.connections.has(event)) {
      this.connections.set(event, []);
    }
    this.connections.get(event).push(callback);
  }

  // Unsubscribe from events
  off(event, callback) {
    if (this.connections.has(event)) {
      const callbacks = this.connections.get(event);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  // Emit events
  emit(event, data) {
    if (this.connections.has(event)) {
      this.connections.get(event).forEach((callback) => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in event callback for ${event}:`, error);
        }
      });
    }
  }

  // Get connection status
  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      reconnectAttempts: this.reconnectAttempts,
      maxReconnectAttempts: this.maxReconnectAttempts,
    };
  }

  // Disconnect
  disconnect() {
    // Close WebSocket
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }

    // Unsubscribe from all listeners
    this.listeners.forEach((unsubscribe) => unsubscribe());
    this.listeners.clear();

    // Clear connections
    this.connections.clear();

    this.isConnected = false;
  }

  // Cleanup
  cleanup() {
    this.disconnect();
  }
}

// Create singleton instance
const realtimeService = new RealtimeService();

export default realtimeService;
