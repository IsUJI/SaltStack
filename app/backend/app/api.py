from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient


app = FastAPI()

origins = [
	"http://localhost:3000",
	"localhost:3000"
]


app.add_middleware(
	CORSMiddleware,
	allow_origins=origins,
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"]
)

@app.on_event("startup")
async def startup_event():
  client = MongoClient('localhost', port=27017)
  db = client.saltstack
  minions = [ {"key1": "minionn1"}, {"key2": "minionn2"}, {"key3": "minionn3"}, {"key4": "minionn4"} ]
  db.minions.insert_many(minions)

@app.on_event("shutdown")
def shutdown_event():
  client.close()

@app.get("/", tags = ["root"])
async def read_root() -> str:
	return "Welcome to the app"

@app.get("/minions", tags=["minions"])
async def get_minions():
  data = db.minions.find()
  return data