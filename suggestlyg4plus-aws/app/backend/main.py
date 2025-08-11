from flask import Flask, jsonify
import os
from datetime import datetime

app = Flask(__name__)

@app.route('/')
def home():
    return jsonify({
        "message": "SuggestlyG4Plus API",
        "status": "running",
        "environment": "production",
        "version": "2.0.0",
        "timestamp": datetime.now().isoformat(),
        "infrastructure": "AWS ECS"
    })

@app.route('/health')
def health():
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "service": "suggestlyg4plus-backend"
    })

@app.route('/api/health')
def api_health():
    return jsonify({
        "status": "healthy",
        "service": "suggestlyg4plus-backend",
        "version": "2.0.0",
        "timestamp": datetime.now().isoformat(),
        "infrastructure": {
            "platform": "AWS ECS",
            "region": "eu-west-2",
            "load_balancer": "ALB",
            "monitoring": "CloudWatch"
        }
    })

@app.route('/api/infrastructure')
def infrastructure():
    return jsonify({
        "domain": "suggestlyg4plus.io",
        "region": "eu-west-2",
        "components": {
            "vpc": "Active",
            "route53": "Configured",
            "cloudfront": "Deployed",
            "s3": "Active",
            "ecs": "Running",
            "alb": "Active",
            "ssl": "Valid"
        },
        "status": "operational"
    })

@app.route('/api/status')
def status():
    return jsonify({
        "deployment": "complete",
        "domain": "suggestlyg4plus.io",
        "ssl": "enabled",
        "cdn": "active",
        "monitoring": "enabled",
        "auto_scaling": "enabled"
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port, debug=False)


