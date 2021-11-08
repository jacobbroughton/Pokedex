

export const formatLowerCaseString = (name: string) => {
  if(name.includes('-') ) {
    return name
      .split('-')
      .map(nameItem => 
        (nameItem[0].toUpperCase() + nameItem.substring(1)))
      .join(' ')
  }
  return name[0].toUpperCase() + name.substring(1)
}