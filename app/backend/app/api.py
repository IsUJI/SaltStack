from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
# from motor.motor_asyncio import AsyncIOMotorClient
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

	try:
		# try to instantiate a client instance
		client = MongoClient(
			host = [ "172.21.0.2:27017" ],
			serverSelectionTimeoutMS = 3000, # 3 second timeout
			username = "root",
			password = "example",
		)

		db = client.saltstack
		# datos = db.minions.find()
		# for docs in datos:
		# 	print(docs)
		
	except errors.ServerSelectionTimeoutError as err:
		# set the client to 'None' if exception
		client = None
		# database_names = []

		# catch pymongo.errors.ServerSelectionTimeoutError
		print ("pymongo ERROR:", err)

	

@app.on_event("shutdown")
def shutdown_event():
  client.close()

@app.get("/", tags = ["root"])
async def read_root() -> str:
	return "Welcome to the app"

@app.get("/minions", tags=["minions"])
async def get_minions(request: Request):
	print("Geting gateways")
	client = MongoClient(
			host = [ "172.21.0.2:27017" ],
			serverSelectionTimeoutMS = 3000, # 3 second timeout
			username = "root",
			password = "example",
		)
	db = client.saltstack


	data = db.minions.find()
	# minions = []

	# for doc in db.minions.find():
	# # 	minions.append(doc)
	# 	print("\n", doc)
	
	return data