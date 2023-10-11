import React, {useEffect, useRef, useState} from 'react';

import {Typography} from '@mui/material';

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

    const addToFavMovieHandler = (movie: Movie | undefined) => {
        const newFavouriteList = [...favMovies, movie];
        if (movie) {
            setFavMovies(newFavouriteList);
        }
    };

    const apiCalled = useRef(false);

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
        />
    ));

    const filteredMovies = filteredMoviesByGenres.map((item, indx) => (
        <MovieItem
            key={item.id + indx}
            movie_item={item}
            image_path={IMG_PATH}
        />
    ));

    return (
        <React.Fragment>
            <section>
                <div className='container'>
                    <div className='cards-container'>
                        {props.genres ? filteredMovies : allMovies}
                    </div>
                    <Typography variant='h3'>Your Favorite Movies</Typography>
                    <div className='card-container'>
                        {favMovies.map((movie, indx) => (
                            <MovieItem
                                key={movie.id + indx}
                                movie_item={movie}
                                image_path={IMG_PATH}
                                addTofavourites={addToFavMovieHandler}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};

export default MovieList;
