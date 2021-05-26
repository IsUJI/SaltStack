import React, { createContext, useState } from 'react';

export const DetailsContext = createContext({
  "_id": "",
  "name": "",
  "created": "",
  "updated": "",
  "status": {
    "connected": "",
    "disk": {
      "/": {
        "capacity": ""
      }
    },
    "last_connected": ""
  }
})

const DetailsProvider = ({children}) => {
  
  const [details, setDetails] = useState({
    "_id": "",
    "name": "",
    "created": "",
    "updated": "",
    "status": {
      "connected": "",
      "disk": {
        "/": {
          "capacity": ""
        }
      },
      "last_connected": ""
    }
  })
  
  return(
    <DetailsContext.Provider value={ {details, setDetails} }>
      { children }
    </DetailsContext.Provider>
  )
}
export default DetailsProvider;