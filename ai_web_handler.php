<?php
// Investment Platform AI Web Handler
// Advanced AI answering service with learning and automation

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Load configuration
$config = json_decode(file_get_contents('ai_agent_config.json'), true);

class InvestmentAIWebHandler {
    private $config;
    private $conversation_db = "conversations.db";
    private $user_sessions = [];
    
    public function __construct($config) {
        $this->config = $config;
        $this->init_database();
    }
    
    private function init_database() {
        $conn = new SQLite3($this->conversation_db);
        
        $conn->exec('
            CREATE TABLE IF NOT EXISTS web_conversations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                session_id TEXT,
                user_message TEXT,
                ai_response TEXT,
                intent TEXT,
                confidence REAL,
                sentiment TEXT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        ');
        
        $conn->exec('
            CREATE TABLE IF NOT EXISTS user_sessions (
                session_id TEXT PRIMARY KEY,
                user_ip TEXT,
                user_agent TEXT,
                start_time DATETIME DEFAULT CURRENT_TIMESTAMP,
                last_activity DATETIME DEFAULT CURRENT_TIMESTAMP,
                conversation_count INTEGER DEFAULT 0
            )
        ');
        
        $conn->close();
    }
    
    public function handle_request($input) {
        $action = $input['action'] ?? 'chat';
        
        switch ($action) {
            case 'chat':
                return $this->process_chat_message($input);
            case 'start_session':
                return $this->start_session($input);
            case 'get_analytics':
                return $this->get_analytics();
            case 'get_suggestions':
                return $this->get_suggestions($input);
            default:
                return ['success' => false, 'message' => 'Invalid action'];
        }
    }
    
    private function process_chat_message($input) {
        $message = trim($input['message'] ?? '');
        $session_id = $input['session_id'] ?? $this->generate_session_id();
        
        if (empty($message)) {
            return ['success' => false, 'message' => 'Message is required'];
        }
        
        // Analyze message
        $intent = $this->analyze_intent($message);
        $sentiment = $this->analyze_sentiment($message);
        $confidence = $this->calculate_confidence($message, $intent);
        $priority = $this->determine_priority($message, $intent, $sentiment);
        
        // Generate AI response
        $response = $this->generate_ai_response($message, $intent, $sentiment, $priority, $session_id);
        
        // Store conversation
        $this->store_conversation($session_id, $message, $response['message'], $intent, $confidence, $sentiment);
        
        // Update session
        $this->update_session($session_id);
        
        return [
            'success' => true,
            'data' => [
                'response' => $response['message'],
                'intent' => $intent,
                'confidence' => $confidence,
                'sentiment' => $sentiment,
                'priority' => $priority,
                'suggested_actions' => $response['suggested_actions'],
                'follow_up_questions' => $response['follow_up_questions'],
                'session_id' => $session_id
            ]
        ];
    }
    
    private function analyze_intent($message) {
        $message_lower = strtolower($message);
        
        $intents = [
            'greeting' => ['hello', 'hi', 'good morning', 'good afternoon', 'welcome', 'hey'],
            'membership_inquiry' => ['membership', 'join', 'apply', 'requirements', 'cost', 'fee', 'minimum'],
            'investment_opportunity' => ['investment', 'opportunity', 'portfolio', 'returns', 'risk', 'invest'],
            'contact_request' => ['speak', 'talk', 'call', 'contact', 'human', 'representative', 'advisor'],
            'pricing' => ['price', 'cost', 'fee', 'minimum', 'annual', 'commitment', 'how much'],
            'services' => ['services', 'offer', 'provide', 'help', 'assist', 'what do you do'],
            'urgency' => ['urgent', 'immediate', 'asap', 'emergency', 'critical', 'important'],
            'complaint' => ['problem', 'issue', 'complaint', 'unhappy', 'dissatisfied', 'wrong']
        ];
        
        $intent_scores = [];
        foreach ($intents as $intent => $keywords) {
            $score = 0;
            foreach ($keywords as $keyword) {
                if (strpos($message_lower, $keyword) !== false) {
                    $score++;
                }
            }
            $intent_scores[$intent] = $score;
        }
        
        $max_score = max($intent_scores);
        if ($max_score > 0) {
            return array_search($max_score, $intent_scores);
        }
        
        return 'general_inquiry';
    }
    
    private function analyze_sentiment($message) {
        $message_lower = strtolower($message);
        
        $positive_words = ['interested', 'excellent', 'great', 'good', 'amazing', 'wonderful', 'perfect', 'love', 'like'];
        $negative_words = ['bad', 'terrible', 'awful', 'horrible', 'disappointed', 'angry', 'frustrated', 'hate', 'dislike'];
        $urgent_words = ['urgent', 'immediate', 'asap', 'emergency', 'critical', 'important', 'now'];
        
        $positive_count = 0;
        $negative_count = 0;
        $urgent_count = 0;
        
        foreach ($positive_words as $word) {
            if (strpos($message_lower, $word) !== false) $positive_count++;
        }
        foreach ($negative_words as $word) {
            if (strpos($message_lower, $word) !== false) $negative_count++;
        }
        foreach ($urgent_words as $word) {
            if (strpos($message_lower, $word) !== false) $urgent_count++;
        }
        
        if ($urgent_count > 0) return 'urgent';
        if ($positive_count > $negative_count) return 'positive';
        if ($negative_count > $positive_count) return 'negative';
        return 'neutral';
    }
    
    private function calculate_confidence($message, $intent) {
        $base_confidence = min(strlen($message) / 100, 1.0);
        
        $intent_keywords = [
            'membership_inquiry' => ['membership', 'join', 'apply'],
            'investment_opportunity' => ['investment', 'opportunity', 'portfolio'],
            'contact_request' => ['speak', 'talk', 'call', 'human'],
            'pricing' => ['price', 'cost', 'fee', 'minimum']
        ];
        
        if (isset($intent_keywords[$intent])) {
            $keyword_matches = 0;
            foreach ($intent_keywords[$intent] as $keyword) {
                if (strpos(strtolower($message), $keyword) !== false) {
                    $keyword_matches++;
                }
            }
            $confidence_boost = $keyword_matches * 0.2;
            return min($base_confidence + $confidence_boost, 1.0);
        }
        
        return $base_confidence;
    }
    
    private function determine_priority($message, $intent, $sentiment) {
        if ($sentiment == 'urgent' || $intent == 'urgency') {
            return 'high';
        }
        if (in_array($intent, ['contact_request', 'complaint'])) {
            return 'medium';
        }
        return 'normal';
    }
    
    private function generate_ai_response($message, $intent, $sentiment, $priority, $session_id) {
        // Check if escalation is needed
        if ($priority == 'high' || $sentiment == 'urgent') {
            return $this->generate_escalation_response();
        }
        
        // Get response template
        $response_text = $this->get_response_template($intent);
        
        // Add personalization
        $response_text = $this->personalize_response($response_text, $session_id);
        
        // Generate follow-up questions
        $follow_up_questions = $this->generate_follow_up_questions($intent);
        
        // Generate suggested actions
        $suggested_actions = $this->generate_suggested_actions($intent, $priority);
        
        return [
            'message' => $response_text,
            'suggested_actions' => $suggested_actions,
            'follow_up_questions' => $follow_up_questions
        ];
    }
    
    private function get_response_template($intent) {
        $templates = $this->config['response_templates'];
        
        switch ($intent) {
            case 'greeting':
                return $templates['greeting'][array_rand($templates['greeting'])];
            case 'membership_inquiry':
                return $templates['membership'][array_rand($templates['membership'])];
            case 'investment_opportunity':
                return $templates['investment'][array_rand($templates['investment'])];
            case 'contact_request':
                return $templates['contact'][array_rand($templates['contact'])];
            default:
                return "I understand your inquiry about Aurum Private. Let me provide you with relevant information about our elite investment services.";
        }
    }
    
    private function generate_escalation_response() {
        $escalation_message = $this->config['response_templates']['escalation'][array_rand($this->config['response_templates']['escalation'])];
        $escalation_message .= " I'm connecting you to our team at " . $this->config['ai_system']['forwarding_number'] . " immediately.";
        
        return [
            'message' => $escalation_message,
            'suggested_actions' => ['transfer_call', 'send_priority_email', 'create_urgent_ticket'],
            'follow_up_questions' => []
        ];
    }
    
    private function personalize_response($response, $session_id) {
        $conversation_count = $this->get_conversation_count($session_id);
        
        if ($conversation_count > 3) {
            $response .= " As a returning visitor, I can provide you with more detailed information.";
        }
        
        return $response;
    }
    
    private function generate_follow_up_questions($intent) {
        $questions = [
            'membership_inquiry' => [
                'What is your typical investment size?',
                'Which investment sectors interest you most?',
                'Do you have a preferred investment timeline?'
            ],
            'investment_opportunity' => [
                'Are you looking for short-term or long-term investments?',
                'What is your risk tolerance level?',
                'Do you have experience with private equity investments?'
            ],
            'general_inquiry' => [
                'Would you like to learn more about our membership process?',
                'Are you interested in specific investment opportunities?',
                'Would you prefer to speak with our investment team?'
            ]
        ];
        
        return $questions[$intent] ?? ['How can I assist you further?'];
    }
    
    private function generate_suggested_actions($intent, $priority) {
        $actions = [];
        
        if ($intent == 'membership_inquiry') {
            $actions[] = 'send_membership_brochure';
            $actions[] = 'schedule_consultation';
        } elseif ($intent == 'investment_opportunity') {
            $actions[] = 'send_investment_overview';
            $actions[] = 'connect_with_advisor';
        }
        
        if ($priority == 'high') {
            $actions[] = 'escalate_to_team';
            $actions[] = 'send_priority_notification';
        }
        
        return $actions;
    }
    
    private function store_conversation($session_id, $user_message, $ai_response, $intent, $confidence, $sentiment) {
        $conn = new SQLite3($this->conversation_db);
        $stmt = $conn->prepare('
            INSERT INTO web_conversations (session_id, user_message, ai_response, intent, confidence, sentiment)
            VALUES (:session_id, :user_message, :ai_response, :intent, :confidence, :sentiment)
        ');
        
        $stmt->bindValue(':session_id', $session_id, SQLITE3_TEXT);
        $stmt->bindValue(':user_message', $user_message, SQLITE3_TEXT);
        $stmt->bindValue(':ai_response', $ai_response, SQLITE3_TEXT);
        $stmt->bindValue(':intent', $intent, SQLITE3_TEXT);
        $stmt->bindValue(':confidence', $confidence, SQLITE3_FLOAT);
        $stmt->bindValue(':sentiment', $sentiment, SQLITE3_TEXT);
        
        $stmt->execute();
        $conn->close();
    }
    
    private function update_session($session_id) {
        $conn = new SQLite3($this->conversation_db);
        
        // Check if session exists
        $stmt = $conn->prepare('SELECT session_id FROM user_sessions WHERE session_id = :session_id');
        $stmt->bindValue(':session_id', $session_id, SQLITE3_TEXT);
        $result = $stmt->execute();
        
        if ($result->fetchArray()) {
            // Update existing session
            $stmt = $conn->prepare('
                UPDATE user_sessions 
                SET last_activity = CURRENT_TIMESTAMP, conversation_count = conversation_count + 1
                WHERE session_id = :session_id
            ');
        } else {
            // Create new session
            $stmt = $conn->prepare('
                INSERT INTO user_sessions (session_id, user_ip, user_agent, conversation_count)
                VALUES (:session_id, :user_ip, :user_agent, 1)
            ');
            $stmt->bindValue(':user_ip', $_SERVER['REMOTE_ADDR'] ?? '', SQLITE3_TEXT);
            $stmt->bindValue(':user_agent', $_SERVER['HTTP_USER_AGENT'] ?? '', SQLITE3_TEXT);
        }
        
        $stmt->bindValue(':session_id', $session_id, SQLITE3_TEXT);
        $stmt->execute();
        $conn->close();
    }
    
    private function get_conversation_count($session_id) {
        $conn = new SQLite3($this->conversation_db);
        $stmt = $conn->prepare('SELECT conversation_count FROM user_sessions WHERE session_id = :session_id');
        $stmt->bindValue(':session_id', $session_id, SQLITE3_TEXT);
        $result = $stmt->execute();
        
        $row = $result->fetchArray();
        $conn->close();
        
        return $row ? $row['conversation_count'] : 0;
    }
    
    private function generate_session_id() {
        return md5(uniqid() . $_SERVER['REMOTE_ADDR'] . time());
    }
    
    private function start_session($input) {
        $session_id = $this->generate_session_id();
        
        return [
            'success' => true,
            'data' => [
                'session_id' => $session_id,
                'welcome_message' => $this->config['response_templates']['greeting'][0]
            ]
        ];
    }
    
    private function get_analytics() {
        $conn = new SQLite3($this->conversation_db);
        
        // Total conversations
        $result = $conn->query('SELECT COUNT(*) as total FROM web_conversations');
        $total_conversations = $result->fetchArray()['total'];
        
        // Intent distribution
        $result = $conn->query('SELECT intent, COUNT(*) as count FROM web_conversations GROUP BY intent');
        $intent_distribution = [];
        while ($row = $result->fetchArray()) {
            $intent_distribution[$row['intent']] = $row['count'];
        }
        
        // Recent activity (last hour)
        $result = $conn->query("SELECT COUNT(*) as recent FROM web_conversations WHERE timestamp > datetime('now', '-1 hour')");
        $recent_activity = $result->fetchArray()['recent'];
        
        // Active sessions
        $result = $conn->query("SELECT COUNT(*) as active FROM user_sessions WHERE last_activity > datetime('now', '-30 minutes')");
        $active_sessions = $result->fetchArray()['active'];
        
        $conn->close();
        
        return [
            'success' => true,
            'data' => [
                'total_conversations' => $total_conversations,
                'intent_distribution' => $intent_distribution,
                'recent_activity' => $recent_activity,
                'active_sessions' => $active_sessions
            ]
        ];
    }
    
    private function get_suggestions($input) {
        $intent = $input['intent'] ?? 'general';
        
        $suggestions = [
            'greeting' => [
                'Tell me about your investment services',
                'What are the membership requirements?',
                'I\'d like to speak with someone'
            ],
            'membership_inquiry' => [
                'What is the minimum investment?',
                'How long does the application process take?',
                'What services are included?'
            ],
            'investment_opportunity' => [
                'What types of investments do you offer?',
                'What are the expected returns?',
                'How do you manage risk?'
            ],
            'general' => [
                'Learn about membership',
                'Explore investment opportunities',
                'Contact our team'
            ]
        ];
        
        return [
            'success' => true,
            'data' => [
                'suggestions' => $suggestions[$intent] ?? $suggestions['general']
            ]
        ];
    }
}

// Handle incoming requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        $input = $_POST;
    }
    
    $ai_handler = new AurumAIWebHandler($config);
    $result = $ai_handler->handle_request($input);
    
    echo json_encode($result);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method',
        'available_actions' => ['chat', 'start_session', 'get_analytics', 'get_suggestions']
    ]);
}
?>
