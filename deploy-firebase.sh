#!/bin/bash
echo "🔥 Deploying to Firebase..."
firebase deploy --only hosting
echo "✅ Firebase deployment completed"
