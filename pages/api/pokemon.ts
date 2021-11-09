import type { NextApiRequest, NextApiResponse } from 'next'
import PokedexData from "../../pokedex.json"
import { parseStringToFloat } from "../../utilities/parseStringToFloat"

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  // console.log(req)
  
  if(req.query.id) {
    res.status(200).json(PokedexData)
  } else {
    let { type, from: fromStr, to: toStr, weight: weightStr, height: heightStr, limit: limitStr, offset: offsetStr, sort } = req.query

    if(!weightStr) weightStr = '1000'
    if(!heightStr) heightStr = '20'
    if(!limitStr) limitStr = '20'
    if(!offsetStr) offsetStr = '0'
    if(!sort) sort = 'asc'


    let from = parseInt(fromStr as string)
    let to = parseInt(toStr as string)
    let weight = parseInt(weightStr as string)
    let height = parseFloat(heightStr as string)
    let limit = parseInt(limitStr as string)
    let offset = parseInt(offsetStr as string)

    // console.log(limit, offset)
  
    let filteredData = PokedexData
  
    if(from && to) {
      filteredData = filteredData.filter(data => 
        data.id >= from && data.id <= to
        && (parseStringToFloat(data.profile.weight) < weight) 
        && (parseStringToFloat(data.profile.height) < height) 
      )
    }

  
  
    if(type) {
      filteredData = filteredData.filter(data => 
        data.type.includes(type[0].toUpperCase() + (type as string).substring(1))
        && (parseStringToFloat(data.profile.weight) <= weight)
        && (parseStringToFloat(data.profile.height) <= height) 
      )
    }
    
  
    filteredData = filteredData.filter(data => 
      (parseStringToFloat(data.profile.weight) < weight) 
      && (parseStringToFloat(data.profile.height) < height) 
    )

  
    if(sort === 'a-z') {
      filteredData = filteredData.sort((a, b) => {
        return a.name.english.localeCompare(b.name.english)
      })
    } else if (sort === 'z-a') {
      filteredData = filteredData.sort((a, b) => {
        return b.name.english.localeCompare(a.name.english)
      })
    } else if (sort === 'asc') {
      filteredData = filteredData.sort((a, b) => {
        return a.id - b.id
      })
    } else if (sort === 'desc') {
      filteredData = filteredData.sort((a, b) => {
        return b.id - a.id
      })
    }

    // console.log(filteredData.slice(
    //   offset, 
    //   offset === 0 ? limit : offset + limit
    // ))
  
    res.status(200).json({
      previous: offset > 0,
      next: (offset + limit) < filteredData.length,
      count: filteredData.length,
      pokemonList: filteredData.slice(
        offset, 
        offset === 0 ? limit : offset + limit)
    })
  }
}