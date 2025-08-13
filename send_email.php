<?php
// SuggestlyG4Plus Email Handler
// Supports multiple recipients via config.php or EMAIL_RECIPIENTS env variable

// Set headers to prevent caching
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-Type: application/json');

// Allow CORS for local development
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Determine recipients
$recipients = ['tyrone.mitchell76@hotmail.com'];
// Load from config.php if present
$configPath = __DIR__ . '/config.php';
if (file_exists($configPath)) {
    $cfg = require $configPath;
    if (!empty($cfg['recipients']) && is_array($cfg['recipients'])) {
        $recipients = $cfg['recipients'];
    }
}
// Override with environment variable if provided
$envRecipients = getenv('EMAIL_RECIPIENTS');
if ($envRecipients) {
    $recipients = array_map('trim', explode(',', $envRecipients));
}
// Prepare recipient string
$to = implode(',', array_unique(array_filter($recipients)));

// Get form data
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

// Validate required fields
$required_fields = ['name', 'email'];
foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => "Missing required field: $field"]);
        exit;
    }
}

// Sanitize inputs
$name = htmlspecialchars(trim($input['name']));
$email = filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL);
$company = isset($input['company']) ? htmlspecialchars(trim($input['company'])) : '';
$position = isset($input['position']) ? htmlspecialchars(trim($input['position'])) : '';
$investment_focus = isset($input['investment_focus']) ? htmlspecialchars(trim($input['investment_focus'])) : '';
$investment_size = isset($input['investment_size']) ? htmlspecialchars(trim($input['investment_size'])) : '';
$message = isset($input['message']) ? htmlspecialchars(trim($input['message'])) : '';
$subject = isset($input['subject']) ? htmlspecialchars(trim($input['subject'])) : '';

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit;
}

// Determine form type and set appropriate subject
$form_type = 'Contact Form';
if (isset($input['trialName'])) {
    $form_type = 'Preview Access Request';
    $name = htmlspecialchars(trim($input['trialName']));
    $email = filter_var(trim($input['trialEmail']), FILTER_SANITIZE_EMAIL);
    $company = isset($input['trialCompany']) ? htmlspecialchars(trim($input['trialCompany'])) : '';
}

// Set email headers
$fromDomain = isset($_SERVER['SERVER_NAME']) && $_SERVER['SERVER_NAME'] ? $_SERVER['SERVER_NAME'] : 'example.com';
$subject_line = "SuggestlyG4Plus - $form_type Submission";
$headers = array(
    'From: noreply@' . $fromDomain,
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
    'Content-Type: text/html; charset=UTF-8'
);

// Create email body
$email_body = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #fbbf24; color: #000; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #fbbf24; }
        .value { margin-left: 10px; }
        .footer { background: #333; color: #fff; padding: 15px; text-align: center; font-size: 12px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>SuggestlyG4Plus</h1>
            <h2>$form_type Submission</h2>
        </div>
        <div class='content'>
            <div class='field'>
                <span class='label'>Name:</span>
                <span class='value'>$name</span>
            </div>
            <div class='field'>
                <span class='label'>Email:</span>
                <span class='value'>$email</span>
            </div>";

if ($company) {
    $email_body .= "
            <div class='field'>
                <span class='label'>Company:</span>
                <span class='value'>$company</span>
            </div>";
}

if ($position) {
    $email_body .= "
            <div class='field'>
                <span class='label'>Position:</span>
                <span class='value'>$position</span>
            </div>";
}

if ($investment_focus) {
    $email_body .= "
            <div class='field'>
                <span class='label'>Investment Focus:</span>
                <span class='value'>$investment_focus</span>
            </div>";
}

if ($investment_size) {
    $email_body .= "
            <div class='field'>
                <span class='label'>Investment Size:</span>
                <span class='value'>$investment_size</span>
            </div>";
}

if ($subject) {
    $email_body .= "
            <div class='field'>
                <span class='label'>Subject:</span>
                <span class='value'>$subject</span>
            </div>";
}

if ($message) {
    $email_body .= "
            <div class='field'>
                <span class='label'>Message:</span>
                <div class='value' style='margin-top: 10px; padding: 10px; background: #fff; border-left: 3px solid #fbbf24;">" . nl2br($message) . "</div>
            </div>";
}

$email_body .= "
            <div class='field'>
                <span class='label'>Submission Time:</span>
                <span class='value">" . date('F j, Y \a\t g:i A T') . "</span>
            </div>
            <div class='field'>
                <span class='label'>IP Address:</span>
                <span class='value">" . $_SERVER['REMOTE_ADDR'] . "</span>
            </div>
        </div>
        <div class='footer'>
            <p>This email was sent from the SuggestlyG4Plus contact form.</p>
            <p>Please respond directly to: $email</p>
        </div>
    </div>
</body>
</html>";

// Send email using PHP mail function
$mail_sent = mail($to, $subject_line, $email_body, implode("\r\n", $headers));

if ($mail_sent) {
    // Log successful submission
    $log_entry = date('Y-m-d H:i:s') . " - $form_type from $email ($name)\n";
    file_put_contents('email_log.txt', $log_entry, FILE_APPEND | LOCK_EX);
    
echo json_encode([
        'success' => true, 
        'message' => $form_type === 'Preview Access Request' 
            ? 'Preview access granted! Check your email for login credentials within 24 hours.'
            : 'Thank you for your message. A member of our team will contact you within 24 hours.'
    ]);
} else {
    // Log failed submission
    $log_entry = date('Y-m-d H:i:s') . " - FAILED $form_type from $email ($name)\n";
    file_put_contents('email_log.txt', $log_entry, FILE_APPEND | LOCK_EX);
    
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send email. Please try again.']);
}
?>