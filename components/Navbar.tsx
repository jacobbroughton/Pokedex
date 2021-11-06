import { FC, useEffect } from "react"
import { useFilters, useSetFilters } from "../contexts/FiltersContext"
import { usePagination } from "../contexts/PaginationProvider"
import { useSort } from "../contexts/SortContext"
import dynamic from "next/dynamic"
import Link from "next/link";
import styles from "../styles/components/Navbar.module.scss"

// use React.ReactNode interface if the component has no props
const ThemeToggle = dynamic<React.ReactNode>(() => import("./ThemeToggle").then(({ ThemeToggle }) => ThemeToggle), {
  ssr: false,
});

// ***
// Use Solrock for the sun icon and Lunatone for the moon

export const Navbar: FC = () => {

  const filters = useFilters()
  const setFilters = useSetFilters()

  const [paginationValues] = usePagination()
  const sortOrder = useSort()

  const { limit, offset } = paginationValues

  return (
    <nav className={styles.nav}>
      <div className={styles.main}>
        <Link 
          href={`/?limit=${limit ? limit : 20}&offset=${offset ? offset : 0}&sort=${sortOrder ? sortOrder.slug : 'asc'}`}
        >
          <a
            onClick={() => setFilters({
              type: null,
              generation: {
                name: null,
                idStart: null,
                idEnd: null
              },
              weight: 1000,
              height: 20
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