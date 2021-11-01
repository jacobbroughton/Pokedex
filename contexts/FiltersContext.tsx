import React, { useState, useEffect, createContext, useContext } from "react"

const FiltersContext = createContext({
  type: null,
  generation: {
    idStart: null,
    idEnd: null
  }
})


export function useFilters() {
  return useContext(FiltersContext)
}

interface FiltersProviderProps {
  children: JSX.Element
}

export function FiltersProvider({ children, value }: FiltersProviderProps) {

  const [filters, setFilters] = useState({})

  useEffect(() => {
    console.log('---FILTERS---', filters)
  }, [filters])


  return (
    <FiltersContext.Provider value={[filters, setFilters]}>
      {children}
    </FiltersContext.Provider>
  )
}