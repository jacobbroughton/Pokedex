import { useEffect, useState, FC } from "react"
import styled from "@emotion/styled"

export const ThemeToggle: FC = () => {

  const [activeTheme, setActiveTheme] = useState<string>(document.body.dataset.theme!)
  const inactiveTheme = activeTheme === "light" ? "dark" : "light"

  useEffect(() => {
    document.body.dataset.theme = activeTheme;
    window.localStorage.setItem("theme", activeTheme)
  }, [activeTheme])

  const Button = styled.button`
    background: transparent;
    border: 0;
    font-size: 1.4rem;
    height: 28px;
    max-width: 28px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  `

  const Img = styled.img`
    height: 55px;
    max-height: 55px;
    align-self: center;
    margin-top: 5px;
  `

  return (
    <Button onClick={() => setActiveTheme(inactiveTheme)} >
      {activeTheme === "light" ? <span>🌙</span> : <span>☀️</span>}
      {/* {activeTheme === "light" ? <span><Img src='/images/lunatone.png'/></span> : <span><Img src='/images/solrock.png'/></span>} */}
    </Button>
  )
}