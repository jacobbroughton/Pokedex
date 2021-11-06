import React, { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/router"

interface SortTypes {
  name: string,
  slug: string
}

const InitialSortValue = {
  name: 'Asc By ID',
  slug: 'asc'
}

const SetSortContext = createContext<null | React.Dispatch<React.SetStateAction<SortTypes>>>(null)

const SortContext = createContext<SortTypes>(InitialSortValue)

interface SortProviderProps {
  children: JSX.Element
}

export function SortProvider({ children }: SortProviderProps) {

  const sortValues = [
    {
      name: 'A - Z',
      slug: 'a-z'
    }, 
    {
      name: 'Z - A',
      slug: 'z-a'
    }, 
    {
      name: 'Asc by ID',
      slug: 'asc'
    }, 
    {
      name: 'Desc by ID',
      slug: 'desc'
    }
  ]
  
  const { query, isReady } = useRouter()
  let { sort: sortFromQuery } = query

  const [sortOrder, setSortOrder] = useState(InitialSortValue)

  useEffect(() => {
    if(isReady) {
      setSortOrder(sortValues.filter(sortValue => sortValue.slug === sortFromQuery)[0])
    }
  }, [isReady])


  return (
    <SetSortContext.Provider value={setSortOrder}>
      <SortContext.Provider value={sortOrder}>
        { children }
      </SortContext.Provider>
    </SetSortContext.Provider>
  )
} 

export function useSort() {
  return useContext(SortContext)
}

export function useSetSort() {
  return useContext(SetSortContext)
}