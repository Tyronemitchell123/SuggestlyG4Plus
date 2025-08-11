from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sys
import os

# Add the src directory to the path to import our modules
sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..', 'src'))

app = FastAPI(
    title="SuggestlyG4Plus v2.0",
    description="Enterprise AI Platform for Professional Services",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware, 
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ultra_secure", "monitoring": "enabled", "version": "2.0.0"}

@app.get("/")
def root():
    return {"message": "SuggestlyG4Plus v2.0 - Enterprise AI Platform", "status": "operational"}

# Import and mount the main SuggestlyG4Plus application
try:
    from main_ultra_secure import app as suggestly_app
    
    # Mount all routes from the main application
    app.mount("/api", suggestly_app)
    
    # Copy all routes from the main app to the root app
    for route in suggestly_app.routes:
        app.routes.append(route)
        
    print("✅ SuggestlyG4Plus v2.0 routes mounted successfully")
    
except ImportError as e:
    print(f"⚠️ Warning: Could not import main_ultra_secure: {e}")
    print("Running in minimal mode - only health endpoints available")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
