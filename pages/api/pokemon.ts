import type { NextApiRequest, NextApiResponse } from 'next'
import PokedexData from "../../pokedex.json"

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  let { type, from, to, weight, height,
    // minWeight, maxWeight, minHeight, maxHeight,
     limit, offset, sort } = req.query
  from = parseInt(from)
  to = parseInt(to)
  weight = parseInt(weight)
  height = parseFloat(height)
  // minWeight = parseInt(minWeight)
  // maxWeight = parseInt(maxWeight)
  // minHeight = parseInt(minHeight)
  // maxHeight = parseInt(maxHeight)
  limit = parseInt(limit)
  offset = parseInt(offset)
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
      (parseStringToFloat(data.profile.weight) < weight) 
      && 
      (parseStringToFloat(data.profile.height) < height) 

      // (parseStringToFloat(data.profile.weight) >= minWeight && parseStringToFloat(data.profile.weight) <= maxWeight)
      // &&
      // (parseStringToFloat(data.profile.height) >= minHeight && parseStringToFloat(data.profile.height) <= maxHeight)
    )
  }


  if(type) {
    filteredPokedexData = filteredPokedexData.filter(data => 
      data.type.includes(type[0].toUpperCase() + type.substring(1))
      &&
      (parseStringToFloat(data.profile.weight) <= weight)
      && 
      (parseStringToFloat(data.profile.height) <= height) 
      // (parseStringToFloat(data.profile.weight) >= minWeight && parseStringToFloat(data.profile.weight) <= maxWeight)
      // &&
      // (parseStringToFloat(data.profile.height) >= minHeight && parseStringToFloat(data.profile.height) <= maxHeight)
    )
  }



  filteredPokedexData = filteredPokedexData.filter(data => 
    (parseStringToFloat(data.profile.weight) < weight) 
    && 
    (parseStringToFloat(data.profile.height) < height) 
    // (parseStringToFloat(data.profile.weight) >= minWeight 
    // && 
    // parseStringToFloat(data.profile.weight) <= maxWeight)
  )

  // filteredPokedexData = filteredPokedexData.filter(data => 
  //   (parseStringToFloat(data.profile.height) >= minHeight 
  //   && 
  //   parseStringToFloat(data.profile.height) <= maxHeight)
  // )

  if(sort === 'a-z') {
    filteredPokedexData = filteredPokedexData.sort((a, b) => {
      return a.name.english.localeCompare(b.name.english)
    })
  } else if (sort === 'z-a') {
    filteredPokedexData = filteredPokedexData.sort((a, b) => {
      return b.name.english.localeCompare(a.name.english)
    })
  } else if (sort === 'asc') {
    filteredPokedexData = filteredPokedexData.sort((a, b) => {
      return a.id - b.id
    })
  } else if (sort === 'desc') {
    filteredPokedexData = filteredPokedexData.sort((a, b) => {
      return b.id - a.id
    })
    console.log(filteredPokedexData.map(pokemon => pokemon.id))
  }

  console.log("Offset: ", offset)
  console.log("Limit: ", limit)

  res.status(200).json({
    previous: offset > 0,
    next: (offset + limit) < filteredPokedexData.length,
    count: filteredPokedexData.length,
    pokemonList: filteredPokedexData.slice(
      offset, 
      offset === 0 ? limit : offset + limit)
  })
}