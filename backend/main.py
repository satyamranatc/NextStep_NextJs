from fastapi import FastAPI, HTTPException, Depends, Request
from pydantic import BaseModel, Field
from typing import List, Optional
import httpx
import os
import json
from dotenv import load_dotenv
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
import models, database
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

load_dotenv()

from fastapi.middleware.cors import CORSMiddleware

# Initialize rate limiter
limiter = Limiter(key_func=get_remote_address)
app = FastAPI(title="NextStep | AI Career Guide API")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables (async version)
@app.on_event("startup")
async def startup():
    async with database.engine.begin() as conn:
        await conn.run_sync(models.Base.metadata.create_all)

# OpenRouter API Key should be in .env
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY") or "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"

class CareerRequest(BaseModel):
    background: str
    skills: List[str]
    interests: List[str]
    goal: str

class SkillGapSchema(BaseModel):
    have: List[str]
    missing: List[str]

class MiniProjectSchema(BaseModel):
    title: str
    description: str
    tools: List[str]
    outcome: str

class WeeklyTaskSchema(BaseModel):
    week: str
    tasks: List[str]

class CompanySchema(BaseModel):
    name: str
    avg_package: str

class StepTaskSchema(BaseModel):
    title: str
    completed: bool = False

class RoadmapStepSchema(BaseModel):
    id: Optional[int] = None
    title: str
    description: str
    duration: str
    resources: List[str]
    status: str = "pending"
    feedback: Optional[str] = None
    tasks: List[StepTaskSchema]
    mini_project: MiniProjectSchema
    weekly_plan: List[WeeklyTaskSchema]
    outcomes: List[str]
    warnings: str
    completion_criteria: str

class CareerRoadmapSchema(BaseModel):
    id: Optional[int] = None
    title: str
    overview: str
    skill_gap_analysis: SkillGapSchema
    confidence_score: int
    coach_suggestions: List[str]
    motivation: str
    best_books: List[str]
    best_youtube_channels: List[str]
    top_companies_india: List[CompanySchema]
    popular_mistakes: List[str]
    steps: List[RoadmapStepSchema]

class StepUpdate(BaseModel):
    status: Optional[str] = None
    feedback: Optional[str] = None
    tasks: Optional[List[StepTaskSchema]] = None

@app.get("/")
async def root():
    return {"message": "Welcome to the AI Career Guide API"}

@app.post("/generate-roadmap", response_model=CareerRoadmapSchema)
async def generate_roadmap(request: CareerRequest, db: AsyncSession = Depends(database.get_db)):
    if not OPENROUTER_API_KEY:
        raise HTTPException(status_code=500, detail="OpenRouter API Key not configured")

    prompt = f"""
    Generate a highly actionable, personalized, and "living" career roadmap for:
    Background: {request.background}
    Skills: {", ".join(request.skills)}
    Interests: {", ".join(request.interests)}
    Goal: {request.goal}

    The response MUST be a JSON object with this exact structure:
    {{
        "title": "Actionable Title",
        "overview": "Personalized overview referencing background in a funny, relatable Indian tone",
        "skill_gap_analysis": {{
            "have": ["Skill 1", "Skill 2"],
            "missing": ["Missing Skill 1", "Missing Skill 2"]
        }},
        "confidence_score": 85,
        "coach_suggestions": ["Suggestion 1", "Suggestion 2"],
        "motivation": "Encouraging closing thought in a funny tone",
        "best_books": ["Book Title 1 by Author", "Book Title 2"],
        "best_youtube_channels": ["Channel Name - Reason why it's good"],
        "top_companies_india": [
            {{"name": "Company Name", "avg_package": "LPA range"}}
        ],
        "popular_mistakes": ["Mistake 1 - Tips to avoid"],
        "steps": [
            {{
                "title": "Specific Step Title",
                "description": "Deeply actionable description (Long and detailed)",
                "duration": "Timeframe",
                "resources": ["Specific resource with reason"],
                "tasks": [
                    {{"title": "Specific task 1", "completed": false}}
                ],
                "mini_project": {{
                    "title": "Project Title",
                    "description": "What to build",
                    "tools": ["Tool 1"],
                    "outcome": "Measurable result"
                }},
                "weekly_plan": [
                    {{"week": "Week 1", "tasks": ["Task A", "Task B"]}}
                ],
                "outcomes": ["Capability 1", "Capability 2"],
                "warnings": "Mental prep / tutorial hell warning in funny tone",
                "completion_criteria": "How to know you're done"
            }}
        ]
    }}

    CRITICAL REQUIREMENTS:
    1. At least 5 steps in the roadmap.
    2. Tone: "Funny Indian Mentor/Big Brother". Use Hinglish, Indian slang (e.g., 'beta', 'sharma ji ka beta', 'paisa hi paisa hoga', 'jugad'), and relate to Indian culture/market.
    3. Context: Focus on the Indian job market, top companies (FAANG/MAANG in India, startups like Zomato/Swiggy/Razorpay), and average packages in INR (LPA).
    4. Descriptions must be long, detailed, and actionable.
    """

    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": "openai/gpt-3.5-turbo",
                    "messages": [
                        {"role": "system", "content": "You are a world-class career mentor AI."},
                        {"role": "user", "content": prompt}
                    ],
                    "response_format": {"type": "json_object"}
                },
                timeout=45.0
            )
            response.raise_for_status()
            data = response.json()
            roadmap_data = json.loads(data['choices'][0]['message']['content'])
            
            db_roadmap = models.Roadmap(
                title=roadmap_data['title'],
                overview=roadmap_data['overview'],
                background=request.background,
                goal=request.goal,
                skill_gap_analysis=json.dumps(roadmap_data['skill_gap_analysis']),
                confidence_score=roadmap_data['confidence_score'],
                coach_suggestions=json.dumps(roadmap_data['coach_suggestions']),
                motivation=roadmap_data['motivation'],
                best_books=json.dumps(roadmap_data['best_books']),
                best_youtube_channels=json.dumps(roadmap_data['best_youtube_channels']),
                top_companies_india=json.dumps(roadmap_data['top_companies_india']),
                popular_mistakes=json.dumps(roadmap_data['popular_mistakes'])
            )
            db.add(db_roadmap)
            await db.commit()
            await db.refresh(db_roadmap)
            
            for step in roadmap_data['steps']:
                db_step = models.Step(
                    roadmap_id=db_roadmap.id,
                    title=step['title'],
                    description=step['description'],
                    duration=step['duration'],
                    resources=json.dumps(step['resources']),
                    tasks=json.dumps(step['tasks']),
                    mini_project=json.dumps(step['mini_project']),
                    weekly_plan=json.dumps(step['weekly_plan']),
                    outcomes=json.dumps(step['outcomes']),
                    warnings=step['warnings'],
                    completion_criteria=step['completion_criteria']
                )
                db.add(db_step)
            await db.commit()
            
            return await get_roadmap_by_id(db_roadmap.id, db)
        except Exception as e:
            await db.rollback()
            raise HTTPException(status_code=500, detail=str(e))

@app.get("/roadmaps", response_model=List[CareerRoadmapSchema])
async def get_roadmaps(db: AsyncSession = Depends(database.get_db)):
    result = await db.execute(select(models.Roadmap).options(selectinload(models.Roadmap.steps)))
    roadmaps = result.scalars().all()
    return [format_roadmap(r) for r in roadmaps]

@app.get("/roadmaps/{roadmap_id}", response_model=CareerRoadmapSchema)
async def get_roadmap_endpoint(roadmap_id: int, db: AsyncSession = Depends(database.get_db)):
    return await get_roadmap_by_id(roadmap_id, db)

@app.patch("/roadmaps/steps/{step_id}", response_model=RoadmapStepSchema)
async def update_step_status(step_id: int, update: StepUpdate, db: AsyncSession = Depends(database.get_db)):
    result = await db.execute(select(models.Step).filter(models.Step.id == step_id))
    db_step = result.scalars().first()
    if not db_step:
        raise HTTPException(status_code=404, detail="Step not found")
    
    if update.status:
        db_step.status = update.status
    if update.feedback:
        db_step.feedback = update.feedback
    if update.tasks:
        db_step.tasks = json.dumps([t.dict() for t in update.tasks])
    
    await db.commit()
    await db.refresh(db_step)
    return format_step(db_step)

@app.post("/roadmaps/{roadmap_id}/regenerate", response_model=CareerRoadmapSchema)
async def regenerate_roadmap(roadmap_id: int, db: AsyncSession = Depends(database.get_db)):
    # This would involve taking current progress and feeding it back into the AI
    # For now, we'll just simulate by refetching a fresh one with same parameters
    result = await db.execute(select(models.Roadmap).filter(models.Roadmap.id == roadmap_id))
    db_roadmap = result.scalars().first()
    if not db_roadmap:
        raise HTTPException(status_code=404, detail="Roadmap not found")
    
    request = CareerRequest(
        background=db_roadmap.background,
        skills=db_roadmap.background.split(","), # Simplified
        interests=[], # Simplified
        goal=db_roadmap.goal
    )
    return await generate_roadmap(request, db)

# Helper functions
async def get_roadmap_by_id(roadmap_id: int, db: AsyncSession):
    result = await db.execute(
        select(models.Roadmap)
        .options(selectinload(models.Roadmap.steps))
        .filter(models.Roadmap.id == roadmap_id)
    )
    db_roadmap = result.scalars().first()
    if not db_roadmap:
        raise HTTPException(status_code=404, detail="Roadmap not found")
    return format_roadmap(db_roadmap)

def format_roadmap(r):
    return {
        "id": r.id,
        "title": r.title,
        "overview": r.overview,
        "skill_gap_analysis": json.loads(r.skill_gap_analysis) if r.skill_gap_analysis else {"have": [], "missing": []},
        "confidence_score": r.confidence_score or 0,
        "coach_suggestions": json.loads(r.coach_suggestions) if r.coach_suggestions else [],
        "motivation": r.motivation or "",
        "best_books": json.loads(r.best_books) if r.best_books else [],
        "best_youtube_channels": json.loads(r.best_youtube_channels) if r.best_youtube_channels else [],
        "top_companies_india": json.loads(r.top_companies_india) if r.top_companies_india else [],
        "popular_mistakes": json.loads(r.popular_mistakes) if r.popular_mistakes else [],
        "steps": [format_step(s) for s in r.steps]
    }

def format_step(s):
    return {
        "id": s.id,
        "title": s.title,
        "description": s.description,
        "duration": s.duration,
        "resources": json.loads(s.resources) if s.resources else [],
        "status": s.status,
        "feedback": s.feedback,
        "tasks": json.loads(s.tasks) if s.tasks else [],
        "mini_project": json.loads(s.mini_project) if s.mini_project else {},
        "weekly_plan": json.loads(s.weekly_plan) if s.weekly_plan else [],
        "outcomes": json.loads(s.outcomes) if s.outcomes else [],
        "warnings": s.warnings or "",
        "completion_criteria": s.completion_criteria or ""
    }
