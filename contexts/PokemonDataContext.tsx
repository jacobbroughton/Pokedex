import { createContext, useContext, useState, useEffect } from "react"
import { useFilters } from "./FiltersContext"
import { usePagination } from "./PaginationContext"
import { useSort } from "./SortContext"
import { useSetLoading } from "./LoadingContext"
import { callApi } from "../utilities/callApi"
import { useRouter } from "next/router"
import { PokemonProps } from "../types"
import { determineEnv } from "../utilities/determineEnv"
import { useSearch } from "./SearchContext"

interface PokemonDataTypes {
  count: number,
  previous: boolean,
  next: boolean,
  pokemonList: Array<PokemonProps>
}

const InitialPokemonData = {
  count: 0,
  previous: false,
  next: false,
  pokemonList: []
}

const PokemonDataContext = createContext<PokemonDataTypes>(InitialPokemonData)


interface PokemonDataProviderProps {
  children: JSX.Element
}

export function PokemonDataProvider({ children }: PokemonDataProviderProps) {

  const filters = useFilters()
  const paginationValues = usePagination()
  const sortOrder = useSort()
  const setIsLoading = useSetLoading()!
  const baseUrl = determineEnv()
  const searchValue = useSearch()

  const { pathname, push, isReady, query } = useRouter()

  const { type, generation, weight, height } = filters
  const { idStart, idEnd } = generation
  const { limit, offset } = paginationValues

  const [pokemonData, setPokemonData] = useState<PokemonDataTypes>(InitialPokemonData)

  async function getPokemon(url: string) {
    setIsLoading(true)
    if(isReady) {
      setPokemonData(await callApi(url))
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if(isReady) {
      getPokemon(`
        ${baseUrl}/api/pokemon
        ${type ? `?type=${type}` : ''}
        ${(idStart && idEnd) 
          ? `${type ? '&' : '?'}from=${idStart}&to=${idEnd}` 
          : ''}
        ${`${type || (idStart && idEnd) ? '&' : '?'}weight=${weight}`}
        
        &height=${height}
        &limit=${limit ? limit : 20}&offset=${offset ? offset : 0}
        &sort=${sortOrder ? sortOrder?.slug : 'asc'}
        ${searchValue ? `&search=${searchValue}` : ''}
      `
      .replace(/\s/g, ''))

      if(pathname === "/" && limit && offset && sortOrder.slug) push(`/?limit=${limit}&offset=${offset}&sort=${sortOrder.slug}${searchValue ? `&search=${searchValue}` : ''}`)
    }
  }, [filters, paginationValues, sortOrder, isReady, searchValue])


  return (
    <PokemonDataContext.Provider value={pokemonData}>
        {children}
    </PokemonDataContext.Provider>
  )
}

export function usePokemonData() {
  return useContext(PokemonDataContext)
}