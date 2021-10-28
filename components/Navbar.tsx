import styles from "../styles/components/Navbar.module.scss"
// import { ThemeToggle } from "./ThemeToggle"
import dynamic from "next/dynamic"
import Link from "next/link";
// import PokedexLogo from "public/images/pokedex-logo.png"

// use React.ReactNode interface if the component has no props
const ThemeToggle = dynamic<React.ReactNode>(() => import("./ThemeToggle").then(({ ThemeToggle }) => ThemeToggle), {
  ssr: false,
});

// ***
// Use Solrock for the sun icon and Lunatone for the moon

export const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.main}>
        <Link href="/">
          <a>
            <img src='/images/pokedex-logo.png' alt="Pokedex"/>
          </a>
        </Link>
        <ThemeToggle/>
      </div>
    </nav>
  )
}