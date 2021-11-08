import { useContext, useState, useEffect, createContext } from "react"
import { useRouter } from "next/router"


// Create context object
interface PaginationContextTypes {
  limit: string | number,
  offset: string | number
}

const InitialPaginationValue = {
  limit: '20',
  offset: '0'
}

const SetPaginationContext = createContext<null | React.Dispatch<React.SetStateAction<PaginationContextTypes>>>(null)

const PaginationContext = createContext<PaginationContextTypes>(InitialPaginationValue)

interface PaginationProviderProps {
  children: JSX.Element
}

export function PaginationProvider({ children }: PaginationProviderProps) {

  const { query, isReady } = useRouter()
  let { limit: limitFromQuery, offset: offsetFromQuery } = query
  

  const [paginationValues, setPaginationValues] = useState<PaginationContextTypes>(InitialPaginationValue)

  useEffect(() => {
    if(isReady) {
      setPaginationValues({
        limit: (limitFromQuery as string),
        offset: (offsetFromQuery as string)
      })
    }
  }, [isReady])

  return (
    <SetPaginationContext.Provider value={setPaginationValues}>
      <PaginationContext.Provider value={paginationValues}>
        { children }
      </PaginationContext.Provider>
    </SetPaginationContext.Provider>
  )
}

export function usePagination() {
  return useContext(PaginationContext)
}

export function useSetPagination() {
  return useContext(SetPaginationContext)
}
