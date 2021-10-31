import type { NextApiRequest, NextApiResponse } from 'next'
import PokedexData from "../../pokedex.json"

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  console.log(req)

  res.status(200).json(PokedexData)
}