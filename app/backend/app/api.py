from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import MongoClient
import paramiko



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

	try:
		# Building a tunnel with salt-master and initializaing the gateways on the database

		print('Building the tunnel\n')
		host = "172.21.0.3"
		port = 22
		username = "root"
		password = "example"

		command = "python3 initiate.py"

		ssh = paramiko.SSHClient()
		ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
		ssh.connect(host, port, username, password)

		stdin, stdout, stderr = ssh.exec_command(command)
		lines = stdout.readlines()
		print(lines)
		
	except Exception as excep:
		print(excep)

	

# @app.on_event("shutdown")
# def shutdown_event():
#   client.close()

@app.get("/", tags = ["root"])
async def read_root() -> str:
	return "Welcome to the app"

@app.get("/minions", tags=["minions"])
async def get_minions(request: Request):
	
	client = MongoClient(
			host = [ "172.21.0.2:27017" ],
			serverSelectionTimeoutMS = 3000,
			username = "root",
			password = "example",
		)
	db = client.saltstack

	data = db.minions.find()
	# data = await db.minions.find().to_list(100)
	minions = []

	for doc in data:
		minions.append(doc)

	return minions

@app.get("/minions/{id}", tags=["minion"])
async def get_minion(id: str):
	
	client = MongoClient(
			host = [ "172.21.0.2:27017" ],
			serverSelectionTimeoutMS = 3000,
			username = "root",
			password = "example",
		)
	db = client.saltstack

	data = db.minions.find({"_id": id})

	for doc in data:
		minion = doc

	return minion

	raise HTTPException(status_code=404, detail=f"Todo with id {id} not found.")