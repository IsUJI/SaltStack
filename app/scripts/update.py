import salt.client
import sys
from pymongo import MongoClient
from datetime import datetime


# Connection with saltstack
local = salt.client.LocalClient()

# Connection with mongodb

DOMAIN = '172.21.0.2'
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

if len(sys.argv) == 2:
  try:
    key = sys.argv[1]
    minion = {}
    print('Gateway name: ' + key)

    print('Searching for the gateway...')
    docs = db.minions.find({"name": str(key)})

    for doc in docs:
      minion = str(doc)
      print('Minion: ' + minion)

    print('Checking the connection')
    connection = local.cmd(key, 'test.ping')
    print(connection)

    memory = local.cmd(key, 'disk.usage')
    print(memory)

    if connection[key] == 'True':
      last_connection = datetime.now().strftime("%d/%m/%Y, %H:%M:%S")
    else:
      last_connection = minion['status']['last_connected']

      print('Id' + minion['_id'])

      print('name' + minion['name'])
      print('created' + minion['created'])
      print('updated' + datetime.now().strftime("%d/%m/%Y, %H:%M:%S"))
      print('status' + minion['status'])

    print('Modifying the value')
    valor = {
      "_id": minion['_id'],
      "name": minion['name'], 
      "created": minion['created'],
      "updated": datetime.now().strftime("%d/%m/%Y, %H:%M:%S"),
      "status": {
        "connected": connection,
        "disk": memory[key],
        "last_connected": last_connection
      }   
    }
    print('New value: ' + valor)

  except Exception as inst:
    print("Couldn't find the gateway")
    print(inst)

  try:
    print(valor)
    print('Updating gateway...')
    db.minions.update_one({"_id" : key}, valor)
    print("Updated gateway with value: " + valor)

  except Exception as inst:
    print("Couldn't update the gateway")
    print(inst)
  
else:
  print("WRONG number of arguments")
