import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/router"

const SortContext = createContext({
  name: null,
  slug: null
})


export function useSort() {
  return useContext(SortContext)
}

export function SortProvider({ children }) {

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

  const [sortOrder, setSortOrder] = useState({
    name: null,
    slug: null
  })

  useEffect(() => {
    if(isReady) {
      setSortOrder(sortValues.filter(sortValue => sortValue.slug === sortFromQuery)[0])
    }
  }, [isReady])

  return (
    <SortContext.Provider value={[sortOrder, setSortOrder]}>
      { children }
    </SortContext.Provider>
  )
} 