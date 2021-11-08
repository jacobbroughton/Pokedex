import React, { createContext, useContext, useState } from "react"

const SetLoadingContext = createContext<null | React.Dispatch<React.SetStateAction<boolean>>>(null)
const LoadingContext = createContext<boolean>(true)

interface LoadingProviderProps {
  children: JSX.Element
}

export function LoadingProvider({ children }: LoadingProviderProps) {

  const [isLoading, setIsLoading] = useState<boolean>(true)

  return (
    <SetLoadingContext.Provider value={setIsLoading}>
      <LoadingContext.Provider value={isLoading}>
        { children }
      </LoadingContext.Provider>
    </SetLoadingContext.Provider>

  )
}

export function useLoading() {
  return useContext(LoadingContext)
}

export function useSetLoading() {
  return useContext(SetLoadingContext)
}