export interface InitialState {
    movies: Movie[]
    status: string | null
    error: string | null
}

export interface Movie {
    id:string
    name:string
    img:string
    description:string
    year:number
    genres:string[]
    director:string
    starring:string[]
    favorite?:boolean
}