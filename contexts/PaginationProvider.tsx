import { useContext, createContext } from "react"


// Create context object
interface PaginationContextProps {
  limit: number,
  offset: number
}

const PaginationContext = createContext<PaginationContextProps>({
  limit: 20,
  offset: 0
})


// Export provider
interface PaginationProviderProps {
  limit: number,
  offset: number,
  children: JSX.Element
}


export function PaginationProvider(props: PaginationProviderProps) {

  const {  children } = props

  // Default values
  const defaultPaginationValues = {
    limit: 20,
    offset: 0
  }

  return (
    <PaginationContext.Provider value={defaultPaginationValues}>
      { children }
    </PaginationContext.Provider>
  )
}

// Export usePaginationContext hook
export function usePaginationContext() {
  return useContext(PaginationContext)
}