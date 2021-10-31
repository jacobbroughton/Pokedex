import React, { useState, createContext, useContext } from "react"

const FiltersContext = createContext({})

export function useFilters() {
  return useContext(FiltersContext)
}

interface FiltersProviderProps {
  children: JSX.Element
}

export function FiltersProvider({ children }: FiltersProviderProps) {

  const [filters, setFilters] = useState({})


  return (
    <FiltersContext.Provider value={[filters, setFilters]}>
      {children}
    </FiltersContext.Provider>
  )
}