#!/usr/bin/env python3
"""
Simple test to identify the issue
"""
import sys
import traceback

try:
    print("Testing imports...")
    from fastapi import FastAPI
    print("✅ FastAPI imported")
    
    import uvicorn
    print("✅ Uvicorn imported")
    
    from real_agents import REAL_AGENTS
    print(f"✅ Real agents imported: {len(REAL_AGENTS)} agents")
    
    print("Creating FastAPI app...")
    app = FastAPI(title="Test App")
    print("✅ FastAPI app created")
    
    @app.get("/")
    def root():
        return {"message": "Test working"}
    
    print("Starting uvicorn...")
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info")
    
except Exception as e:
    print(f"❌ Error: {e}")
    traceback.print_exc()