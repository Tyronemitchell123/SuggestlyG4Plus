#!/bin/bash
echo "DEPLOYING TO VERCEL..."
vercel --prod --force --yes
echo "DEPLOYMENT COMPLETE!"
echo "Your site: https://suggestlyg4plus.vercel.app"
echo "Custom domain: https://suggestlyg4plus.io"
