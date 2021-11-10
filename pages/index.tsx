import { useEffect, useState } from "react"
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import PokemonList from "../components/PokemonList"
import Filters from '../components/Filters'
import SortAndLimit from '../components/SortAndLimit'
// import { usePagination } from "../contexts/PaginationProvider"
// import { useSort } from "../contexts/SortContext"
import { useRouter } from "next/router"

const Home: NextPage = () => {

  const router = useRouter()
  
  const [dropdownOpen, setDropdownOpen] = useState(true)

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
      {/* <div className={styles['aside-parent']}> */}
        {/* { !dropdownOpen && <button className={styles['open-dropdown-button']} onClick={() => setDropdownOpen(true)}>View Filters</button>}
        { dropdownOpen &&
          <aside className={styles.aside}>
            <button className={styles['exit-dropdown-button']} onClick={() => setDropdownOpen(false)}>X</button>
            <SortAndLimit/>
            <Filters/>
          </aside> */}
        

      {/* </div> */}

      <Filters/>
      <PokemonList/>
      <SortAndLimit/>
    </div>
  )
}

export default Home
