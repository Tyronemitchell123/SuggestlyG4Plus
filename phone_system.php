<?php
// Investment Platform AI Phone System Handler
// Advanced AI methods for call processing and forwarding

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Load configuration
$config = json_decode(file_get_contents('phone_system_config.json'), true);

class InvestmentPhoneSystem {
    private $config;
    private $forwarding_number = '+447832682418';
    
    public function __construct($config) {
        $this->config = $config;
    }
    
    // AI-powered call screening
    public function screenCall($caller_data) {
        $risk_score = 0;
        $priority = 'normal';
        
        // Check caller ID against known patterns
        if ($this->isKnownSpam($caller_data['number'])) {
            $risk_score += 80;
            $priority = 'block';
        }
        
        // Check if VIP client
        if ($this->isVIPClient($caller_data['number'])) {
            $risk_score -= 50;
            $priority = 'vip';
        }
        
        // Check business hours
        if (!$this->isBusinessHours()) {
            $priority = 'voicemail';
        }
        
        // Geographic analysis
        if ($this->isInternationalCall($caller_data['number'])) {
            $risk_score += 20;
        }
        
        return [
            'risk_score' => $risk_score,
            'priority' => $priority,
            'action' => $this->determineAction($risk_score, $priority),
            'forward_to' => $this->forwarding_number
        ];
    }
    
    // AI voicemail transcription (simulated)
    public function transcribeVoicemail($audio_file) {
        // In a real implementation, this would use OpenAI Whisper API
        $transcription = "Thank you for calling the Investment Platform. This is a simulated transcription of your voicemail message.";
        
        // Sentiment analysis
        $sentiment = $this->analyzeSentiment($transcription);
        
        // Priority detection
        $priority = $this->detectPriority($transcription);
        
        return [
            'transcription' => $transcription,
            'sentiment' => $sentiment,
            'priority' => $priority,
            'keywords' => $this->extractKeywords($transcription)
        ];
    }
    
    // Call analytics
    public function analyzeCall($call_data) {
        $analytics = [
            'duration' => $call_data['duration'] ?? 0,
            'quality_score' => $this->calculateQualityScore($call_data),
            'geographic_data' => $this->getGeographicData($call_data['number']),
            'call_pattern' => $this->analyzeCallPattern($call_data),
            'timestamp' => date('Y-m-d H:i:s'),
            'forwarded_to' => $this->forwarding_number
        ];
        
        // Log call analytics
        $this->logCallAnalytics($analytics);
        
        return $analytics;
    }
    
    // Smart call routing
    public function routeCall($call_data) {
        $screening_result = $this->screenCall($call_data);
        
        switch ($screening_result['action']) {
            case 'forward':
                return [
                    'action' => 'forward',
                    'number' => $this->forwarding_number,
                    'message' => $this->config['phone_system']['greeting_messages']['business_hours']
                ];
                
            case 'voicemail':
                return [
                    'action' => 'voicemail',
                    'message' => $this->config['phone_system']['greeting_messages']['after_hours'],
                    'transcription_enabled' => true,
                    'email_notification' => true
                ];
                
            case 'block':
                return [
                    'action' => 'block',
                    'message' => 'Call blocked due to spam detection.',
                    'reason' => 'High risk score'
                ];
                
            case 'vip':
                return [
                    'action' => 'forward',
                    'number' => $this->forwarding_number,
                    'priority' => 'high',
                    'message' => 'VIP client - immediate forwarding.'
                ];
                
            default:
                return [
                    'action' => 'forward',
                    'number' => $this->forwarding_number,
                    'message' => 'Standard call forwarding.'
                ];
        }
    }
    
    // Helper methods
    private function isKnownSpam($number) {
        // Simulated spam detection
        $spam_patterns = ['0000000000', '1234567890', '9999999999'];
        return in_array($number, $spam_patterns);
    }
    
    private function isVIPClient($number) {
        // Simulated VIP detection
        $vip_numbers = ['+447832682418', '+447700900000', '+447700900001'];
        return in_array($number, $vip_numbers);
    }
    
    private function isBusinessHours() {
        $now = new DateTime('now', new DateTimeZone('Europe/London'));
        $day = strtolower($now->format('l'));
        $time = $now->format('H:i');
        
        if (!isset($this->config['phone_system']['business_hours'][$day])) {
            return false;
        }
        
        $hours = $this->config['phone_system']['business_hours'][$day];
        if ($hours['start'] === 'closed') {
            return false;
        }
        
        return $time >= $hours['start'] && $time <= $hours['end'];
    }
    
    private function isInternationalCall($number) {
        return !preg_match('/^\+44/', $number);
    }
    
    private function determineAction($risk_score, $priority) {
        if ($priority === 'block' || $risk_score > 70) {
            return 'block';
        } elseif ($priority === 'vip') {
            return 'vip';
        } elseif ($priority === 'voicemail') {
            return 'voicemail';
        } else {
            return 'forward';
        }
    }
    
    private function analyzeSentiment($text) {
        // Simulated sentiment analysis
        $positive_words = ['interested', 'investment', 'opportunity', 'elite', 'premium'];
        $negative_words = ['complaint', 'problem', 'issue', 'angry', 'unhappy'];
        
        $positive_count = 0;
        $negative_count = 0;
        
        foreach ($positive_words as $word) {
            if (stripos($text, $word) !== false) $positive_count++;
        }
        
        foreach ($negative_words as $word) {
            if (stripos($text, $word) !== false) $negative_count++;
        }
        
        if ($positive_count > $negative_count) return 'positive';
        elseif ($negative_count > $positive_count) return 'negative';
        else return 'neutral';
    }
    
    private function detectPriority($text) {
        $urgent_words = ['urgent', 'immediate', 'asap', 'emergency', 'critical'];
        foreach ($urgent_words as $word) {
            if (stripos($text, $word) !== false) return 'high';
        }
        return 'normal';
    }
    
    private function extractKeywords($text) {
        $keywords = ['investment', 'membership', 'opportunity', 'elite', 'private', 'equity'];
        $found = [];
        foreach ($keywords as $keyword) {
            if (stripos($text, $keyword) !== false) {
                $found[] = $keyword;
            }
        }
        return $found;
    }
    
    private function calculateQualityScore($call_data) {
        // Simulated call quality calculation
        return rand(70, 100);
    }
    
    private function getGeographicData($number) {
        // Simulated geographic data
        return [
            'country' => 'United Kingdom',
            'region' => 'London',
            'timezone' => 'Europe/London'
        ];
    }
    
    private function analyzeCallPattern($call_data) {
        // Simulated call pattern analysis
        return [
            'frequency' => 'first_time',
            'time_of_day' => date('H:i'),
            'day_of_week' => date('l')
        ];
    }
    
    private function logCallAnalytics($analytics) {
        $log_entry = date('Y-m-d H:i:s') . " - Call Analytics: " . json_encode($analytics) . "\n";
        file_put_contents('call_analytics.log', $log_entry, FILE_APPEND | LOCK_EX);
    }
}

// Handle incoming requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        $input = $_POST;
    }
    
    $phone_system = new AurumPhoneSystem($config);
    
    switch ($input['action'] ?? 'route') {
        case 'screen':
            $result = $phone_system->screenCall($input['caller_data'] ?? []);
            break;
            
        case 'transcribe':
            $result = $phone_system->transcribeVoicemail($input['audio_file'] ?? '');
            break;
            
        case 'analyze':
            $result = $phone_system->analyzeCall($input['call_data'] ?? []);
            break;
            
        case 'route':
        default:
            $result = $phone_system->routeCall($input['call_data'] ?? []);
            break;
    }
    
    echo json_encode([
        'success' => true,
        'data' => $result,
        'timestamp' => date('Y-m-d H:i:s'),
        'system' => 'Investment Platform AI Phone System'
    ]);
    
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method',
        'available_actions' => ['screen', 'transcribe', 'analyze', 'route']
    ]);
}
?>
