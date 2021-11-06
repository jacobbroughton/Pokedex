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

interface PaginationProviderProps {
  children: JSX.Element
}

export function PaginationProvider({ children }: PaginationProviderProps) {

  const { query, isReady } = useRouter()
  let { limit: limitFromQuery, offset: offsetFromQuery } = query
  

  const [paginationValues, setPaginationValues] = useState({
    limit: null,
    offset: null
  })

  useEffect(() => {
    console.log("READY")
    if(isReady) {
      setPaginationValues({
        limit: limitFromQuery,
        offset: offsetFromQuery
      })
    }

  }, [isReady])

  return (
    <PaginationContext.Provider value={[paginationValues, setPaginationValues]}>
      { children }
    </PaginationContext.Provider>
  )
}

export function usePagination() {
  return useContext(PaginationContext)
}
