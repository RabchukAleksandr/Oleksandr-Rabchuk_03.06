export interface InitialState {
    movies: Movie[]
    favorites: number[]
    genres: string[]
    status: string | null
    error: string | null
    filteredMovies:Movie[]
    selectedGenre: string | null
}

export interface Movie {
    id:number
    name:string
    img:string
    description:string
    year:number
    genres:string[]
    director:string
    starring:string[]
    favorite?:boolean
}