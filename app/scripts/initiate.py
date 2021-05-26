import salt.client
from pymongo import MongoClient
from datetime import datetime


# Connection with saltstack
local = salt.client.LocalClient()

# Connection with mongodb

DOMAIN = '172.29.0.2'
PORT = 27017

try:
  # try to instantiate a client instance
  client = MongoClient(
    host = [ str(DOMAIN) + ":" + str(PORT) ],
    serverSelectionTimeoutMS = 3000, # 3 second timeout
    username = "root",
    password = "example",
)

except errors.ServerSelectionTimeoutError as err:
  # set the client to 'None' if exception
  client = None

  # catch pymongo.errors.ServerSelectionTimeoutError
  print ("pymongo ERROR:", err)


# use the database saltstack
db = client.saltstack

# reset the collection minions
db.minions.delete_many({})



data = []

# test connection with minions
minions = local.cmd('*', 'test.ping')

for key in minions:
  now = datetime.now() # current date and time
  memory = local.cmd(key, 'disk.usage')
  if (minions[key]):
    connection = True
  else:
    connection = False
  data.append({
    "_id": key,
    "name": key, 
    "created": now.strftime("%d/%m/%Y, %H:%M:%S"), # string format of time
    "updated": now.strftime("%d/%m/%Y, %H:%M:%S"),
    "status": {
      "connected": connection,
      "disk": memory[key],
      "last_connected": now.strftime("%d/%m/%Y, %H:%M:%S")
    }
  })

# insert initial data
db.minions.insert_many(data)

# print inserted data
datos = db.minions.find()

for obj in datos:
  print('\n', obj, '\n')



