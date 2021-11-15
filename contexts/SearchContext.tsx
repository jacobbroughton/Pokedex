import { createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from "react"

const SetSearchContext = createContext<null | Dispatch<SetStateAction<string>>>(null)
const SearchContext = createContext<string>("")

interface SearchProps {
  children: JSX.Element
}

export function SearchProvider({ children }: SearchProps) {

  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    console.log(searchValue)
  }, [searchValue])

  return (
    <SetSearchContext.Provider value={setSearchValue}>
      <SearchContext.Provider value={searchValue}>
        { children }
      </SearchContext.Provider>
    </SetSearchContext.Provider>
  )
}

export function useSetSearch() {
  return useContext(SetSearchContext)
}

export function useSearch() {
  return useContext(SearchContext)
}