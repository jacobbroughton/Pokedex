import type { NextApiRequest, NextApiResponse } from 'next'
import PokedexData from "../../pokedex.json"

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  let { type, from, to, minWeight, maxWeight, minHeight, maxHeight } = req.query
  from = parseInt(from)
  to = parseInt(to)
  minWeight = parseInt(minWeight)
  maxWeight = parseInt(maxWeight)
  minHeight = parseInt(minHeight)
  maxHeight = parseInt(maxHeight)
  console.log(req.query)

  let filteredPokedexData = PokedexData

  // Min height: 0m
  // Max height: 20m

  function parseStringToFloat(string) {
    return parseFloat(string.replace('kg', '').replace(/\s/g, ''))
  }

  if(from && to) {
    filteredPokedexData = filteredPokedexData.filter(data => 
      data.id >= from && data.id <= to
      &&
      (parseStringToFloat(data.profile.weight) >= minWeight && parseStringToFloat(data.profile.weight) <= maxWeight)
      &&
      (parseStringToFloat(data.profile.height) >= minHeight && parseStringToFloat(data.profile.height) <= maxHeight)
    )
  }


  if(type) {
    filteredPokedexData = filteredPokedexData.filter(data => 
      data.type.includes(type[0].toUpperCase() + type.substring(1))
      &&
      (parseStringToFloat(data.profile.weight) >= minWeight && parseStringToFloat(data.profile.weight) <= maxWeight)
      &&
      (parseStringToFloat(data.profile.height) >= minHeight && parseStringToFloat(data.profile.height) <= maxHeight)
    )
  }



  filteredPokedexData = filteredPokedexData.filter(data => 
    (parseStringToFloat(data.profile.weight) >= minWeight 
    && 
    parseStringToFloat(data.profile.weight) <= maxWeight)
  )

  filteredPokedexData = filteredPokedexData.filter(data => 
    (parseStringToFloat(data.profile.height) >= minHeight 
    && 
    parseStringToFloat(data.profile.height) <= maxHeight)
  )

  // console.log(filteredPokedexData)

  res.status(200).json(filteredPokedexData)
}