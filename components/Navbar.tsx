import { useEffect } from "react"
import { useFilters } from "../contexts/FiltersContext"
import dynamic from "next/dynamic"
import Link from "next/link";
import styles from "../styles/components/Navbar.module.scss"

// use React.ReactNode interface if the component has no props
const ThemeToggle = dynamic<React.ReactNode>(() => import("./ThemeToggle").then(({ ThemeToggle }) => ThemeToggle), {
  ssr: false,
});

// ***
// Use Solrock for the sun icon and Lunatone for the moon

export const Navbar = () => {

  const [ , setFilters] = useFilters()


  return (
    <nav className={styles.nav}>
      <div className={styles.main}>
        <Link 
          href="/?limit=20&offset=0&sort=asc"
        >
          <a
            onClick={() => setFilters({
              type: null,
              generation: {
                idStart: null,
                idEnd: null
              },
              weight: {
                weightStart: 0,
                weightEnd: 1000
              },
              height: {
                heightStart: 0,
                heightEnd: 20
              }
            })}
          >
            <img src='/images/pokedex-logo.png' alt="Pokedex"/>
          </a>
        </Link>
        <ThemeToggle/>
      </div>
    </nav>
  )
}