import styles from "../styles/components/Navbar.module.scss"
// import { ThemeToggle } from "./ThemeToggle"
import dynamic from "next/dynamic"

// use React.ReactNode interface if the component has no props
const ThemeToggle = dynamic<React.ReactNode>(() => import("./ThemeToggle").then(({ ThemeToggle }) => ThemeToggle), {
  ssr: false,
});

export const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.main}>
        Pokedex
        <ThemeToggle/>
      </div>
    </nav>
  )
}