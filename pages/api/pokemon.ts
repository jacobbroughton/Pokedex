import type { NextApiRequest, NextApiResponse } from 'next'
import PokedexData from "../../pokedex.json"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  
  if(req.query.id) {
    res.status(200).json({ pokemonList: pokedexData })
  } else {
    let { type, from, to, weight, height, limit, offset, sort } = req.query

    if(!limit) limit = '20'
    if(!offset) offset = '0'
    if(!sort) sort = 'asc'

    from = parseInt(from)
    to = parseInt(to)
    weight = parseInt(weight)
    height = parseFloat(height)
    limit = parseInt(limit)
    offset = parseInt(offset)

    console.log(req.query)
  
    let filteredData = PokedexData
  
    function parseStringToFloat(string) {
      return parseFloat(string.replace('kg', '').replace(/\s/g, ''))
    }


  
    if(from && to) {
      filteredData = filteredData.filter(data => 
        data.id >= from && data.id <= to
        && (parseStringToFloat(data.profile.weight) < weight) 
        && (parseStringToFloat(data.profile.height) < height) 
      )
    }
  
  
    if(type) {
      filteredData = filteredData.filter(data => 
        data.type.includes(type[0].toUpperCase() + type.substring(1))
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