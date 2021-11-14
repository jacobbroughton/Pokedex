import { useContext, useState, createContext, useEffect } from "react"
import { useWidth } from "../utilities/useWidth"

const initialState = {
  sortMenuOpen: false,
  filterMenuOpen: false
}

interface setMenusTypes {
  sortMenuOpen: boolean,
  filterMenuOpen: boolean
}

const MenusContext = createContext(initialState)
const SetMenusContext = createContext<null | React.Dispatch<React.SetStateAction<setMenusTypes>>>(null)

interface MenusProviderProps {
  children: JSX.Element
}

export function MenusProvider({ children }: MenusProviderProps) {

  const [menusOpen, setMenusOpen] = useState(initialState)
  const width = useWidth()

  useEffect(() => {
    console.log(width)
    if(typeof window !== 'undefined' && width > 885) {
      setMenusOpen({
        sortMenuOpen: true,
        filterMenuOpen: true
      })
    } else if (typeof window !== 'undefined' && width < 885) {
      setMenusOpen({
        sortMenuOpen: false,
        filterMenuOpen: false
      })
    }
  }, [width])

  return (
    <SetMenusContext.Provider value={setMenusOpen}>
      <MenusContext.Provider value={menusOpen}>
        { children }
      </MenusContext.Provider>
    </SetMenusContext.Provider>

  )
}

export function useSetMenus() {
  return useContext(SetMenusContext)
}

export function useMenus() {
  return useContext(MenusContext)
}