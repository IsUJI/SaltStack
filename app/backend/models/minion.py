from pydantic import BaseModel


class Minion(BaseModel):
  _id: str
  name: str
  created: str
  updated: str
  status: { connected: bool, disk: str, last_connected: str }
  