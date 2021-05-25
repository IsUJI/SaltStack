import React, { createContext, useState } from 'react';

export const IdContext = createContext(0)

const IdProvider = ({children}) => {
  
  const [id, setId] = useState(0)
  
  return(
    <IdContext.Provider value={ {id, setId} }>
      { children }
    </IdContext.Provider>
  )
}
export default IdProvider;