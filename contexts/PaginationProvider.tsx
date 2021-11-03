import { useContext, useState, useEffect, createContext } from "react"
import { useRouter } from "next/router"


// Create context object
interface PaginationContextProps {
  limit: string | null,
  offset: string| null
}

const PaginationContext = createContext<PaginationContextProps>({
  limit: '20',
  offset: '0'
})

// Export provider
interface PaginationProviderProps {
  children: JSX.Element
}

export function usePagination() {
  return useContext(PaginationContext)
}


export function PaginationProvider({ children }: PaginationProviderProps) {

  const { query, isReady } = useRouter()
  let { limit: limitFromQuery, offset: offsetFromQuery } = query
  

  const [paginationValues, setPaginationValues] = useState({
    limit: null,
    offset: null
  })

  useEffect(() => {
    setPaginationValues({
      limit: limitFromQuery,
      offset: offsetFromQuery
    })
  }, [isReady])

  return (
    <PaginationContext.Provider value={[paginationValues, setPaginationValues]}>
      { children }
    </PaginationContext.Provider>
  )
}

// Export usePaginationContext hook
export function usePaginationContext() {
  return useContext(PaginationContext)
}