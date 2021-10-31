import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter, NextRouter } from "next/router"
import styles from '../styles/Home.module.css'
import PokemonList from "../components/PokemonList"
import { useEffect, useState } from 'react'
import { usePaginationContext } from "../contexts/PaginationProvider"
import { usePokemonData, usePokemonDataUpdate } from "../contexts/PokemonDataContext"
import Filters from '../components/Filters'

const Home: NextPage = () => {

  const getPokemon = usePokemonDataUpdate()
  const router = useRouter()
  let { limit, offset } = router.query

  // useEffect(() => {
  //   // if(limit !== undefined && offset !== undefined) {
  //     getPokemon(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
  //   // }
  // }, [limit, offset])


  return (
    <div className={styles.container}>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Created by Jacob Broughton" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Filters/>
      <PokemonList/>
    </div>
  )
}

export default Home
