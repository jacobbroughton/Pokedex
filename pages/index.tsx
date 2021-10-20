import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import PokemonList from "../components/PokemonList"

type PokemonListProps = {
  data: object
}

const Home: NextPage<PokemonListProps> = ({ data }) => {

  console.log(data)

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Created by Jacob Broughton" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PokemonList data={data}/>
    </div>
  )
}

export const getStaticProps = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20")
  const data = await response.json()

  return {
    props: { data }
  }
}

export default Home
