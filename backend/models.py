from sqlalchemy import Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import relationship
from database import Base

class Roadmap(Base):
    __tablename__ = "roadmaps"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    overview = Column(Text)
    background = Column(String)
    goal = Column(String)
    
    # New fields
    skill_gap_analysis = Column(Text) # JSON: { "have": [], "missing": [] }
    confidence_score = Column(Integer)
    coach_suggestions = Column(Text) # JSON: []
    motivation = Column(Text)
    
    # New enriched fields
    best_books = Column(Text) # JSON list
    best_youtube_channels = Column(Text) # JSON list
    top_companies_india = Column(Text) # JSON list of dicts
    popular_mistakes = Column(Text) # JSON list
    
    steps = relationship("Step", back_populates="roadmap", cascade="all, delete-orphan")

class Step(Base):
    __tablename__ = "steps"

    id = Column(Integer, primary_key=True, index=True)
    roadmap_id = Column(Integer, ForeignKey("roadmaps.id"))
    title = Column(String)
    description = Column(Text)
    duration = Column(String)
    resources = Column(Text) # JSON list
    
    # New fields
    status = Column(String, default="pending") # pending, completed, stuck
    feedback = Column(String) # easy, neutral, hard
    tasks = Column(Text) # JSON: [ { "title": "Checklist item", "completed": boolean } ]
    mini_project = Column(Text) # JSON: { "title", "description", "tools", "outcome" }
    weekly_plan = Column(Text) # JSON: [ { "week": string, "tasks": [] } ]
    outcomes = Column(Text) # JSON list
    warnings = Column(Text)
    completion_criteria = Column(Text)

    roadmap = relationship("Roadmap", back_populates="steps")
