export function determineEnv () {
  return process.env.NODE_ENV === "development" 
    ? "http://localhost:3000" 
    : "https://pokedex-jb.vercel.app"
}