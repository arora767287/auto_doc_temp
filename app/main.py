from fastapi import FastAPI, HTTPException
from app.auth import authenticate_user
from app.workflows import trigger_batch_workflow
from app.knowledge_base import update_knowledge_base

app = FastAPI()

@app.post("/connect/{platform}")
async def connect_account(platform: str, auth_code: str):
    """Handles OAuth2 connection for a platform."""
    try:
        token_data = authenticate_user(platform, auth_code)
        return {"message": f"{platform} account connected successfully", "token": token_data}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/batch-update")
async def batch_update(user_id: str):
    """Triggers batch updates for all workflows."""
    raw_data = trigger_batch_workflow(user_id)
    update_knowledge_base(user_id, raw_data)
    return {"message": "Knowledge base updated successfully"}
