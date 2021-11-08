import { createContext, useContext, useState, useEffect } from "react"
import { useFilters } from "./FiltersContext"
import { usePagination } from "./PaginationProvider"
import { useSort } from "./SortContext"
import { useLoading, useSetLoading } from "./LoadingContext"
import { callApi } from "../utilities/callApi"
import { useRouter } from "next/router"
import { PokemonProps } from "../types"
import { determineEnv } from "../utilities/determineEnv"

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
// const PokemonDataUpdateContext = createContext<null | ((url: string) => Promise<void>)>(null)


interface PokemonDataProviderProps {
  children: JSX.Element
}

export function PokemonDataProvider({ children }: PokemonDataProviderProps) {

  const filters = useFilters()
  const paginationValues = usePagination()
  const sortOrder = useSort()
  const setIsLoading = useSetLoading()!
  const baseUrl = determineEnv()

  const { push, isReady, query } = useRouter()

  const { type, generation, weight, height } = filters
  const { idStart, idEnd } = generation
  const { limit, offset } = paginationValues

  const [pokemonData, setPokemonData] = useState<PokemonDataTypes>(InitialPokemonData)

  async function getPokemon(url: string) {
    setIsLoading(true)
    if(isReady && Object.keys(query).length !== 0) {
      console.log("---------------------------------------")
      console.log("ITS HAPPENIN")
      console.log("----------------------------------------")
      setPokemonData(await callApi(url))
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if(isReady && Object.keys(query).length !== 0) {
      console.log(paginationValues)
      getPokemon(`
        ${baseUrl}/api/pokemon
        ${type ? `?type=${type}` : ''}
        ${(idStart && idEnd) 
          ? `${type ? '&' : '?'}from=${idStart}&to=${idEnd}` 
          : ''}
        ${`${type || (idStart && idEnd) ? '&' : '?'}weight=${weight}`}
        
        &height=${height}
        &limit=${limit ? limit : query.limit}&offset=${offset ? offset : query.offset}
        &sort=${sortOrder ? sortOrder?.slug : query.sort}
      `
      .replace(/\s/g, ''))

      if(limit && offset && sortOrder.slug) push(`/?limit=${limit}&offset=${offset}&sort=${sortOrder.slug}`)
    }
  }, [
    filters, paginationValues, sortOrder, 
    isReady])


  return (
    <PokemonDataContext.Provider value={pokemonData}>
        {children}
    </PokemonDataContext.Provider>
  )
}

export function usePokemonData() {
  return useContext(PokemonDataContext)
}

// export function usePokemonDataUpdate() {
//   return useContext(PokemonDataUpdateContext)
// }