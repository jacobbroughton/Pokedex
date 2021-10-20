import { Navbar } from "./Navbar"
import { FC } from "react"


interface LayoutProps {
  children: JSX.Element
}

export const Layout: FC<LayoutProps> = ({ children } : LayoutProps) => {
  return (
    <>
      <Navbar/>
      { children }
    </>
  )
}