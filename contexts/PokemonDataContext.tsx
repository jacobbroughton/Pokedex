import { createContext, useContext, useState, useEffect } from "react"
import { useFilters } from "./FiltersContext"
import { callApi } from "../utilities/callApi"

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

  const [filters] = useFilters()

  const { type, generation, weight, height } = filters
  const { idStart, idEnd } = generation
  const { weightStart, weightEnd } = weight
  const { heightStart, heightEnd } = height

  const [pokemonData, setPokemonData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  async function getPokemon(url: string) {
    setIsLoading(true)
    setPokemonData(await callApi(url))
    setIsLoading(false)
  }

  useEffect(() => {
    getPokemon(`
    http://localhost:3000/api/pokemon
    ${type ? `?type=${type}` : ''}
    ${(idStart && idEnd) 
      ? `${type ? '&' : '?'}from=${idStart}&to=${idEnd}` 
      : ''}
    ${`${type || (idStart && idEnd) ? '&' : '?'}minWeight=${weightStart}&maxWeight=${weightEnd}`}
    &minHeight=${heightStart}&maxHeight=${heightEnd}
    `.replace(/\s/g, ''))
  }, [type, generation, weight, height])

  useEffect(() => {
    console.log(pokemonData[0])
  }, [pokemonData])

  return (
    <PokemonDataContext.Provider value={{pokemonData, isLoading}}>
      <PokemonDataUpdateContext.Provider value={getPokemon}>
        {children}
      </PokemonDataUpdateContext.Provider>
    </PokemonDataContext.Provider>
  )
}