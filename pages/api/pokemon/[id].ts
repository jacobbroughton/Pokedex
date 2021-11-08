import type { NextApiRequest, NextApiResponse } from 'next'
import PokedexData from "../../../pokedex.json"

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  const { id } = req.query
  let parsedId: number = parseInt(id as string)

  const foundPokemon = PokedexData.filter(pokemon => pokemon.id === parsedId)

  if(foundPokemon) {
    res.status(200).json(foundPokemon[0])
  }
}