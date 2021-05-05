from pydantic import BaseModel


class Minion(BaseModel):
  name: str
  created: str
  updated: str
  status: { connected: bool, disk: str, last_connected: str }
  