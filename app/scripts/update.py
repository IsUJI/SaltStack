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
    print('\nUpdating the gateway ' + key)

    print('\nSearching for the gateway...')
    docs = db.minions.find({"name": str(key)})

    for doc in docs:
      minion = doc

    print('\Minion:')  
    print(minion)

    connection = local.cmd(key, 'test.ping')
    memory = local.cmd(key, 'disk.usage')

    if connection[key]:
      print('Connection es True')
      last_connection = datetime.now().strftime("%d/%m/%Y, %H:%M:%S")
    else:
      print('Connection es False')
      last_connection = minion['status']['last_connected']

    print('Modifying the value...')
    value = {
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

    print('\nValue:')
    print(value)

    print('\nUpdating on database...')
    update = db.minions.update({"_id" : key}, value)
    print('\nUpdated gateway with value: ')
    print(update)

  except Exception as exc:
    print("Couldn't update the gateways")
    print(exc)

elif len(sys.argv) == 1:
  try:
    minions = []
    print('Updating ALL the gateways\n')

    print('Searching for the gateways...\n')
    docs = db.minions.find()

    for doc in docs:
      minions.append(doc)

    for minion in minions:

      key = minion['_id']

      connection = local.cmd(key, 'test.ping')
      memory = local.cmd(key, 'disk.usage')

      if connection[key]:
        last_connection = datetime.now().strftime("%d/%m/%Y, %H:%M:%S")
      else:
        last_connection = minion['status']['last_connected']

      print('Modifying the value...')
      value = {
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

      print('\nValue:')
      print(value)

      print('\nUpdating a gateway on database...')
      update = db.minions.update({"_id" : key}, value)
      print('\nUpdated gateway: ')
      print(update)

  except Exception as exc:
    print("Couldn't update the gateways")
    print(exc)
  
else:
  print("WRONG number of arguments")
