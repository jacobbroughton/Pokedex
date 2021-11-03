import React, { useState, useEffect, createContext, useContext } from "react"

const FiltersContext = createContext({
  type: null,
  generation: {
    idStart: null,
    idEnd: null
  },
  weight: 1000,
  // weight: {
  //   weightStart: 0,
  //   weightEnd: 1000
  // },
  height: 20
  // height: {
  //   heightStart: 0,
  //   heightEnd: 20
  // }
})


export function useFilters() {
  return useContext(FiltersContext)
}

interface FiltersProviderProps {
  children: JSX.Element
}

export function FiltersProvider({ children }: FiltersProviderProps) {

  const [filters, setFilters] = useState({  
    type: null,
    generation: {
      idStart: null,
      idEnd: null
    },
    weight: 1000,
    // weight: {
    //   weightStart: 0,
    //   weightEnd: 1000
    // },
    height: 20
    // height: {
    //   heightStart: 0,
    //   heightEnd: 20
    // }
  })

  // useEffect(() => {
  //   console.log('---FILTERS---', filters)
  // }, [filters])


  return (
    <FiltersContext.Provider value={[filters, setFilters]}>
      {children}
    </FiltersContext.Provider>
  )
}