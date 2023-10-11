import React, {useEffect, useRef, useState} from 'react';

import {Genre} from '../../services/fetchGenresServices';
import {getMovieRequest, Movie} from '../../services/fetchMovieService';
import MovieItem from './MovieItem';

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

const MovieList: React.FC<{
    searchedTerm?: string | undefined;
    genres?: Genre[] | undefined;
}> = (props) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [favMovies, setFavMovies] = useState<Movie[]>([]);

    useEffect(() => {
        // Define an async function and call it within useEffect
        const fetchMovies = async () => {
            try {
                if (!apiCalled.current) {
                    apiCalled.current = true;
                    const data = await getMovieRequest(props.searchedTerm);
                    setMovies(data);
                    apiCalled.current = false;
                }
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, [props.searchedTerm]);

    const saveFavMovieToLocalStorage = (movieItems: Movie[]) => {
        // const existingData = localStorage.getItem('react-movie-app-favorites');
        const newData = [...movieItems]; // Create a new copy of the movie items array.
        const uniqueMovies = [...new Set(newData)]; // Create a unique set of movies.
        localStorage.setItem(
            'react-movie-app-favorites',
            JSON.stringify(uniqueMovies),
        );
    };

    const addToFavMovieHandler = (movie: Movie) => {
        const existingFavourites = localStorage.getItem(
            'react-movie-app-favorites',
        );
        const existingFavouritesList: Movie[] = existingFavourites
            ? JSON.parse(existingFavourites)
            : [];

        const newFavouriteList = [...existingFavouritesList, movie];
        if (movie) {
            if (!favMovies.includes(movie)) {
                setFavMovies(newFavouriteList);
            }
            if (!existingFavouritesList.includes(movie)) {
                saveFavMovieToLocalStorage(newFavouriteList);
            }
        }
    };
    const removeMovieFromLocalStorage = (moviesAfterRemoval: Movie) => {
        localStorage.setItem(
            'react-movie-app-favorites',
            JSON.stringify(moviesAfterRemoval),
        );
    };

    const removeFavMovieHandler = (movie: Movie) => {
        const newFavouriteList = favMovies.filter(
            (fav_movie) => fav_movie.id !== movie?.id,
        );

        setFavMovies(newFavouriteList);
        removeMovieFromLocalStorage(newFavouriteList);
    };

    const apiCalled = useRef(false);

    const idsFromGenres = props.genres?.map((g) => g.id);
    console.log(idsFromGenres);

    const filteredMoviesByGenres = movies.filter((movie) => {
        return idsFromGenres?.some((genreId) =>
            movie.genre_ids.includes(genreId),
        );
    });

    const allMovies = movies.map((item, indx) => (
        <MovieItem
            key={item.id + indx}
            movie_item={item}
            image_path={IMG_PATH}
            addTofavourites={addToFavMovieHandler}
            removeFromfavourites={removeFavMovieHandler}
            favorites={favMovies}
        />
    ));

    const filteredMovies = filteredMoviesByGenres.map((item, indx) => (
        <MovieItem
            key={item.id + indx}
            movie_item={item}
            image_path={IMG_PATH}
            addTofavourites={addToFavMovieHandler}
            removeFromfavourites={removeFavMovieHandler}
            favorites={favMovies}
        ></MovieItem>
    ));

    // const favoritmovieList = favMovies?.map((movie, indx) => (
    //     <MovieItem
    //         key={movie.id + indx}
    //         movie_item={movie}
    //         image_path={IMG_PATH}
    //         removeFromfavourites={removeFavMovieHandler}
    //         addTofavourites={addToFavMovieHandler}
    //         favorites={favMovies}
    //     />
    // ));

    return (
        <React.Fragment>
            <section>
                <div className='container'>
                    <div className='cards-container'>
                        {props.genres ? filteredMovies : allMovies}
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};

export default MovieList;
