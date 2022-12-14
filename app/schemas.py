from pydantic import BaseModel

class CommentPayload(BaseModel):
    comment: str

    class Config:
        orm_mode = True
        