import { createContext, useContext, useState, useEffect } from "react"
import { useFilters } from "./FiltersContext"
import { usePagination } from "./PaginationProvider"
import { useSort } from "./SortContext"
import { callApi } from "../utilities/callApi"
import { useRouter } from "next/router"

const PokemonDataContext = createContext({Array, Boolean})
const PokemonDataUpdateContext = createContext(Function)

interface PokemonDataProviderProps {
  children: JSX.Element
}

export function usePokemonData() {
  return useContext(PokemonDataContext)
}

export function usePokemonDataUpdate() {
  return useContext(PokemonDataUpdateContext)
}

export function PokemonDataProvider({ children }: PokemonDataProviderProps) {

  const { push, isReady } = useRouter()

  const [filters] = useFilters()
  const [paginationValues] = usePagination()
  const [sortOrder] = useSort()

  const { type, generation, weight, height } = filters
  const { idStart, idEnd } = generation
  // const { weightStart, weightEnd } = weight
  // const { heightStart, heightEnd } = height

  const { limit, offset } = paginationValues

  const [pokemonData, setPokemonData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

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
        http://localhost:3000/api/pokemon
        ${type ? `?type=${type}` : ''}
        ${(idStart && idEnd) 
          ? `${type ? '&' : '?'}from=${idStart}&to=${idEnd}` 
          : ''}
        ${`${type || (idStart && idEnd) ? '&' : '?'}weight=${weight}`}
        
        &height=${height}
        &limit=${limit}&offset=${offset}
        &sort=${sortOrder.slug}
      `
      // minWeight=${weightStart}&maxWeight=${weightEnd}`}
      // &minHeight=${heightStart}&maxHeight=${heightEnd}
      .replace(/\s/g, ''))

      push(`/?limit=${limit}&offset=${offset}&sort=${sortOrder.slug}`)
    }
  }, [type, generation, weight, height, limit, offset, sortOrder, isReady])

  useEffect(() => {
    console.log(pokemonData)
  }, [pokemonData])


  return (
    <PokemonDataContext.Provider value={{pokemonData, isLoading}}>
      <PokemonDataUpdateContext.Provider value={getPokemon}>
        {children}
      </PokemonDataUpdateContext.Provider>
    </PokemonDataContext.Provider>
  )
}