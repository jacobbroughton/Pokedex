import { Navbar } from "./Navbar"

type LayoutProps = {
  children: JSX.Element
}

export const Layout = ({ children } : LayoutProps) => {
  return (
    <>
      <Navbar/>
      { children }
    </>
  )
}