import type { NextApiRequest, NextApiResponse } from 'next'
import PokedexData from "../../pokedex.json"

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  const { type, from, to } = req.query
  console.log(req.query)

  let filteredPokedexData = PokedexData

  if(from && to) {
    filteredPokedexData = filteredPokedexData.filter(data => 
      data.id >= parseInt(from) && data.id <= parseInt(to)
    )
    console.log('TO/FROM FILTERED', filteredPokedexData[0].name.english)
  }


  if(type) {
    filteredPokedexData = filteredPokedexData.filter(data => 
      data.type.includes(type[0].toUpperCase() + type.substring(1))
    )
    console.log('TYPE FILTERED', filteredPokedexData[0].name.english)
  }

  // console.log(filteredPokedexData)

  res.status(200).json(filteredPokedexData)
}