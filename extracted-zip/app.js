// SUGGESTLY ELITE - Ultra Premium Luxury Platform
// Web3 Integration, AI Concierge, NFT Minting, and AR Try-On

// Global Variables
let web3;
let contract;
let userAccount;
let isWalletConnected = false;
let currentMembership = null;

// Contract Configuration (Replace with your actual contract details)
const CONTRACT_CONFIG = {
  address: "0x1234567890123456789012345678901234567890", // Replace with your contract address
  abi: [
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "string",
          name: "uri",
          type: "string",
        },
      ],
      name: "mintNFT",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "tokenURI",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
};

// AI Concierge Responses
const AI_RESPONSES = {
  greetings: [
    "Welcome to SUGGESTLY ELITE! How may I assist you with your luxury experience today?",
    "Greetings! I'm your personal AI concierge. What exclusive service can I help you with?",
    "Hello! Welcome to the world of ultra-premium luxury. How can I enhance your experience?",
  ],
  luxury: [
    "I can arrange exclusive access to private events, luxury travel, and premium services.",
    "Our platinum members enjoy private jet services, exclusive dining, and VIP experiences.",
    "Let me connect you with our luxury partners for bespoke experiences.",
  ],
  nft: [
    "Our exclusive NFT collection grants access to premium services and events.",
    "Each NFT represents a unique membership tier with specific benefits.",
    "I can help you mint your exclusive membership NFT right now.",
  ],
  travel: [
    "I'll arrange private jet services, luxury accommodations, and exclusive experiences.",
    "Our travel partners include the world's most prestigious hotels and resorts.",
    "Let me create a bespoke travel itinerary for your next luxury adventure.",
  ],
  investment: [
    "Our wealth management team specializes in high-net-worth portfolios.",
    "I can connect you with exclusive investment opportunities and private equity deals.",
    "Let me arrange a consultation with our elite investment advisors.",
  ],
  default: [
    "I understand your interest. Let me connect you with the appropriate luxury service.",
    "That's an excellent choice. I'll arrange the finest experience for you.",
    "Allow me to curate a personalized luxury experience just for you.",
  ],
};

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
  setupEventListeners();
  initializeAR();
});

// Initialize the main application
function initializeApp() {
  console.log("🚀 SUGGESTLY ELITE - Initializing Ultra Premium Platform");

  // Check for Web3 provider
  if (typeof window.ethereum !== "undefined") {
    console.log("✅ MetaMask detected");
    web3 = new Web3(window.ethereum);
  } else {
    console.log("❌ MetaMask not detected");
    showNotification(
      "Please install MetaMask to access full features",
      "warning"
    );
  }

  // Initialize smooth scrolling
  initializeSmoothScrolling();

  // Initialize animations
  initializeAnimations();

  // Load user preferences
  loadUserPreferences();
}

// Setup event listeners
function setupEventListeners() {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", toggleMobileMenu);
  }

  // Contact form submission
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactForm);
  }

  // Chat input enter key
  const chatInput = document.getElementById("userInput");
  if (chatInput) {
    chatInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        sendToAI();
      }
    });
  }

  // Scroll animations
  window.addEventListener("scroll", handleScroll);

  // Window resize
  window.addEventListener("resize", handleResize);
}

// Web3 Functions
async function connectWallet() {
  try {
    if (!window.ethereum) {
      showNotification(
        "Please install MetaMask to connect your wallet",
        "error"
      );
      return;
    }

    showNotification("Connecting to MetaMask...", "info");

    // Request account access
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    userAccount = accounts[0];
    isWalletConnected = true;

    // Update UI
    updateWalletUI();

    showNotification("Wallet connected successfully!", "success");

    // Initialize contract
    await initializeContract();
  } catch (error) {
    console.error("Error connecting wallet:", error);
    showNotification("Failed to connect wallet", "error");
  }
}

async function initializeContract() {
  try {
    if (!web3 || !userAccount) return;

    contract = new web3.eth.Contract(
      CONTRACT_CONFIG.abi,
      CONTRACT_CONFIG.address
    );
    console.log("✅ Smart contract initialized");
  } catch (error) {
    console.error("Error initializing contract:", error);
    showNotification("Failed to initialize smart contract", "error");
  }
}

async function mintMembership(tier) {
  try {
    if (!isWalletConnected) {
      showNotification("Please connect your wallet first", "warning");
      return;
    }

    if (!contract) {
      showNotification("Smart contract not initialized", "error");
      return;
    }

    showNotification(`Minting ${tier} membership NFT...`, "info");

    // Create metadata URI
    const metadataURI = `https://api.suggestlyelite.com/metadata/${tier}-membership.json`;

    // Estimate gas
    const gasEstimate = await contract.methods
      .mintNFT(userAccount, metadataURI)
      .estimateGas({ from: userAccount });

    // Mint NFT
    const result = await contract.methods
      .mintNFT(userAccount, metadataURI)
      .send({
        from: userAccount,
        gas: Math.floor(gasEstimate * 1.2), // Add 20% buffer
      });

    currentMembership = tier;
    updateMembershipUI();

    showNotification(`${tier} membership NFT minted successfully!`, "success");

    // Add to chat
    addMessageToChat("system", `Successfully minted ${tier} membership NFT!`);
  } catch (error) {
    console.error("Error minting NFT:", error);
    showNotification("Failed to mint NFT", "error");
  }
}

// AI Concierge Functions
function sendToAI() {
  const userInput = document.getElementById("userInput");
  const query = userInput.value.trim();

  if (!query) return;

  // Add user message to chat
  addMessageToChat("user", query);

  // Clear input
  userInput.value = "";

  // Generate AI response
  const response = getAIResponse(query);

  // Simulate typing delay
  setTimeout(() => {
    addMessageToChat("ai", response);
  }, 1000);
}

function getAIResponse(query) {
  const lowerQuery = query.toLowerCase();
  const interests = [
    "watches",
    "fashion",
    "art",
    "travel",
    "luxury",
    "premium",
    "exclusive",
  ];

  // Check for greetings first
  if (
    lowerQuery.includes("hello") ||
    lowerQuery.includes("hi") ||
    lowerQuery.includes("welcome")
  ) {
    return getRandomResponse(AI_RESPONSES.greetings);
  }

  // Check for specific interests
  if (interests.some((interest) => lowerQuery.includes(interest))) {
    if (lowerQuery.includes("watches")) {
      return `We noticed you're interested in luxury watches. Would you like to explore the latest limited-edition collection? I can arrange a private viewing with our exclusive watchmakers.`;
    } else if (lowerQuery.includes("fashion")) {
      return `Excellent taste! Our fashion concierge can arrange private fittings with top designers and exclusive access to fashion week events.`;
    } else if (lowerQuery.includes("art")) {
      return `Art connoisseur! I can arrange private gallery tours, exclusive art auctions, and meetings with renowned artists.`;
    } else if (lowerQuery.includes("travel")) {
      return `Adventure awaits! I can curate bespoke travel experiences including private jet charters and exclusive resort access.`;
    } else {
      return `We noticed you're interested in luxury experiences. Would you like to explore our curated collection of premium services?`;
    }
  }

  // Check for other specific categories
  if (
    lowerQuery.includes("nft") ||
    lowerQuery.includes("token") ||
    lowerQuery.includes("mint")
  ) {
    return getRandomResponse(AI_RESPONSES.nft);
  }

  if (
    lowerQuery.includes("investment") ||
    lowerQuery.includes("wealth") ||
    lowerQuery.includes("money")
  ) {
    return getRandomResponse(AI_RESPONSES.investment);
  }

  // Default personalized response
  return `How about we explore a curated experience based on your preferences? I can suggest some luxury destinations and exclusive services tailored just for you.`;
}

function getRandomResponse(responses) {
  return responses[Math.floor(Math.random() * responses.length)];
}

function addMessageToChat(sender, message) {
  const chatbox = document.getElementById("chatbox");
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}-message`;

  const avatar = document.createElement("div");
  avatar.className = "message-avatar";

  const content = document.createElement("div");
  content.className = "message-content";
  content.textContent = message;

  if (sender === "user") {
    avatar.innerHTML = '<i class="fas fa-user"></i>';
    messageDiv.appendChild(content);
    messageDiv.appendChild(avatar);
  } else {
    avatar.innerHTML = '<i class="fas fa-robot"></i>';
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
  }

  chatbox.appendChild(messageDiv);
  chatbox.scrollTop = chatbox.scrollHeight;
}

// AR Try-On Functions
function initializeAR() {
  // Check if AR.js is available
  if (typeof AFRAME === "undefined") {
    console.log("AR.js not loaded, AR features disabled");
    return;
  }

  console.log("✅ AR.js initialized");

  // Register custom AR components
  AFRAME.registerComponent("luxury-product", {
    init: function () {
      this.el.addEventListener("click", function () {
        showProductDetails();
      });
    },
  });
}

function showProductDetails() {
  showNotification("Luxury product details loaded in AR", "success");
}

function launchARExperience() {
  // Create AR scene
  const arScene = `
    <a-scene embedded arjs="sourceType: webcam; debugUIEnabled: false;">
      <a-marker preset="hiro">
        <a-box position="0 0.5 0" 
               material="color: #ffd700; metalness: 0.8; roughness: 0.2;"
               scale="0.5 0.5 0.5"
               luxury-product>
        </a-box>
      </a-marker>
      <a-entity camera></a-entity>
    </a-scene>
  `;

  // Open AR experience in new window
  const arWindow = window.open("", "_blank", "width=800,height=600");
  arWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>SUGGESTLY ELITE - AR Try-On</title>
      <script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>
      <script src="https://cdn.jsdelivr.net/gh/jeromeetienne/AR.js/aframe/build/aframe-ar.js"></script>
    </head>
    <body style="margin: 0; overflow: hidden;">
      ${arScene}
    </body>
    </html>
  `);
}

// UI Update Functions
function updateWalletUI() {
  const connectBtn = document.querySelector('[onclick="connectWallet()"]');
  if (connectBtn) {
    connectBtn.innerHTML = '<i class="fas fa-check"></i> Connected';
    connectBtn.classList.remove("btn-primary");
    connectBtn.classList.add("btn-secondary");
    connectBtn.onclick = null;
  }
}

function updateMembershipUI() {
  if (currentMembership) {
    showNotification(`Active membership: ${currentMembership}`, "success");
  }
}

// Utility Functions
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    color: white;
    font-weight: 600;
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 300px;
  `;

  // Set background color based on type
  const colors = {
    success: "#10b981",
    error: "#ef4444",
    warning: "#f59e0b",
    info: "#3b82f6",
  };

  notification.style.backgroundColor = colors[type] || colors.info;

  // Add to page
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 5000);
}

function toggleMobileMenu() {
  const navMenu = document.querySelector(".nav-menu");
  navMenu.classList.toggle("active");
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

function initializeAnimations() {
  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  });

  // Observe elements for animation
  document.querySelectorAll(".card, .section-title").forEach((el) => {
    observer.observe(el);
  });
}

function handleScroll() {
  const nav = document.querySelector(".nav");
  if (window.scrollY > 100) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
}

function handleResize() {
  // Handle responsive behavior
  if (window.innerWidth > 768) {
    const navMenu = document.querySelector(".nav-menu");
    navMenu.classList.remove("active");
  }
}

function handleContactForm(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  // Simulate form submission
  showNotification(
    "Thank you for your message. We'll get back to you soon!",
    "success"
  );

  // Reset form
  e.target.reset();
}

function loadUserPreferences() {
  // Load user preferences from localStorage
  const preferences = localStorage.getItem("suggestlyPreferences");
  if (preferences) {
    const prefs = JSON.parse(preferences);
    // Apply user preferences
  }
}

function saveUserPreferences(preferences) {
  localStorage.setItem("suggestlyPreferences", JSON.stringify(preferences));
}

// Export functions for global access
window.connectWallet = connectWallet;
window.mintMembership = mintMembership;
window.sendToAI = sendToAI;
window.scrollToSection = scrollToSection;
window.toggleMobileMenu = toggleMobileMenu;
window.launchARExperience = launchARExperience;

// Performance monitoring
console.log("🚀 SUGGESTLY ELITE - Platform loaded successfully");
