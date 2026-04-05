    import {useState, useEffect} from "react"
    import { data } from "react-router-dom"
    import MovieCard from "../components/MovieCard"
    import { getPopularMovie, searchMovies } from "../services/api"
    import '../css/Home.css'

    function Home(){

        const [movies, setMovies] = useState([])

        useEffect(() => {
            const loadPopularMovies = async () => {
                try {
                    const popularMovies = await getPopularMovie()
                    setMovies(popularMovies)

                } catch (err) {
                    console.log(err)
                }
            }

            loadPopularMovies()

        },[])

        // const test = async () => {
        //     data = await getPopularMovie()
        //     res = await data.json()
        //     return data
        // }

        // console.log(getPopularMovie())
        // const movies = [
        //     {id: 1, title: "Terminator", url: "#", release_date: "1969"},
        //     {id: 2, title: "Titanic", url: "#", release_date: "1999"},
        //     {id: 3, title: "PKPANDI", url: "#", release_date: "2003"}
        // ]

        const [searchQuery, setSearchQuery] = useState("")

        const handleSubmit = (e) => {
            e.preventDefault()
            alert(searchQuery)
        }

        return (
            <div className="home">
                <form className="search-form" onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Search for movies..."
                        className="search-input"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        value={searchQuery}
                    />
                    <button type="submit" className="search-button">Search</button>
                </form>

                <div className="movie-grid">
                    {movies.map((movie) => 
                       movie.title.toLowerCase().startsWith(searchQuery) && (<MovieCard movie={movie} key={movie.id} />) 
                    )}
                </div>
            </div>
        )
    }

    export default Home