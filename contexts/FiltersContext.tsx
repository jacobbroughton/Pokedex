import React, { useState, createContext, useContext } from "react"

interface FilterTypes {
  type: string | null,
  generation: {
    name: string | null,
    idStart: number | null,
    idEnd: number | null
  },
  weight: number,
  height: number
}

const InitialFiltersValue = {
  type: null,
  generation: {
    name: null,
    idStart: null,
    idEnd: null
  },
  weight: 1000,
  height: 20
}


const SetFiltersContext = createContext<null | React.Dispatch<React.SetStateAction<FilterTypes>>>(null)

const FiltersContext = createContext<FilterTypes>(InitialFiltersValue)

interface FiltersProviderProps {
  children: JSX.Element,
}

export function FiltersProvider({ children }: FiltersProviderProps) {

  const [filters, setFilters] = useState<FilterTypes>(InitialFiltersValue)

  return (
    <SetFiltersContext.Provider value={setFilters}>
      <FiltersContext.Provider value={filters}>
        {children}
      </FiltersContext.Provider>
    </SetFiltersContext.Provider>

  )
}

export function useFilters() {
  return useContext(FiltersContext)
}

export function useSetFilters() {
  return useContext(SetFiltersContext)
}