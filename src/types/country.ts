/* 
  Country type with only a few fields in order to keep it concise,
  see https://gitlab.com/restcountries/restcountries/-/blob/master/FIELDS.md for all fields
*/
export type Country = {
  cca2: string
  name: {
    common: string
    official: string
  }
  capital: string[]
  continents: string[]
}