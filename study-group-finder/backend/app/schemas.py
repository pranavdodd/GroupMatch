from pydantic import BaseModel
from typing import List, Optional

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserOut(BaseModel):
    id: int
    username: str
    email: str
    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class StudyGroupCreate(BaseModel):
    title: str
    description: Optional[str] = None

class StudyGroupOut(BaseModel):
    id: int
    title: str
    description: str
    owner: UserOut
    members: List[UserOut] = []
    class Config:
        orm_mode = True
