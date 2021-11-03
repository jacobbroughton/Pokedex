import { useEffect } from "react"
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout } from "../components/Layout"
import { PaginationProvider } from "../contexts/PaginationProvider"
import { SortProvider } from "../contexts/SortContext"
import { PokemonDataProvider } from "../contexts/PokemonDataContext"
import { FiltersProvider } from "../contexts/FiltersContext"



function MyApp({ Component, pageProps }: AppProps) {

  return (
    <PaginationProvider>
      <FiltersProvider>
        <SortProvider>
          <PokemonDataProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout> 
          </PokemonDataProvider>
        </SortProvider>
      </FiltersProvider>
    </PaginationProvider>
  )
}

export default MyApp
