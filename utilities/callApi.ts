// import { usePokemonDataUpdate } from "../contexts/PokemonDataContext"

export async function callApi(url: string) {
  let response = await fetch(url)
  let data = await response.json()
  return data
}