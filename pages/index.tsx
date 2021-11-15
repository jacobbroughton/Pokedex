import { useEffect } from "react"
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import PokemonList from "../components/PokemonList"
import Filters from '../components/Filters'
import SortAndLimit from '../components/SortAndLimit'
import { useMenus } from "../contexts/MenusContext"
import { useRouter } from "next/router"

const Home: NextPage = () => {

  const router = useRouter()
  const { sortMenuOpen, filterMenuOpen } = useMenus()

  useEffect(() => {
    if(router.pathname === "/" && Object.keys(router.query).length === 0) {
      router.push('?limit=20&offset=0&sort=asc')
    }
  }, [router]) 

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Created by Jacob Broughton" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Filters visible={filterMenuOpen}/>
      <PokemonList/>
      <SortAndLimit visible={sortMenuOpen}/>
    </div>
  )
}

export default Home
