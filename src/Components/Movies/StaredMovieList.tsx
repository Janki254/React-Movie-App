import React, {useEffect, useState} from 'react';

import {Typography} from '@mui/material';

import {Movie} from '../../services/fetchMovieService';
import MovieItem from './MovieItem';

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

const StaredMovieList: React.FC = () => {
    const [favMovies, setFavMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const myFavMovies = JSON.parse(
            localStorage.getItem('react-movie-app-favorites'),
        );

        setFavMovies(myFavMovies);
    }, []);
    // const saveFavMovieToLocalStorage = (movieItems: Movie[]) => {
    //     const existingData = localStorage.getItem('react-movie-app-favorites');
    //     const newData = existingData ? JSON.parse(existingData) : [];
    //     newData.push(...movieItems);
    //     localStorage.setItem(
    //         'react-movie-app-favorites',
    //         JSON.stringify(newData),
    //     );
    // };

    const removeMovieFromLocalStorage = (moviesAfterRemoval: Movie) => {
        localStorage.setItem(
            'react-movie-app-favorites',
            JSON.stringify(moviesAfterRemoval),
        );
    };
    // const addToFavMovieHandler = (movie: Movie) => {
    //     const newFavouriteList = [...favMovies, movie];
    //     if (movie) {
    //         if (!favMovies.includes(movie)) {
    //             setFavMovies(newFavouriteList);
    //             saveFavMovieToLocalStorage(newFavouriteList);
    //         }
    //     }
    // };

    const removeFavMovieHandler = (movie: Movie) => {
        const newFavouriteList = favMovies.filter(
            (fav_movie) => fav_movie.id !== movie?.id,
        );

        setFavMovies(newFavouriteList);
        removeMovieFromLocalStorage(newFavouriteList);
    };
    return (
        <React.Fragment>
            <section>
                <div className='container'>
                    <div className='cards-container'>
                        {favMovies ? (
                            favMovies.map((movie, indx) => (
                                <MovieItem
                                    key={movie.id + indx}
                                    movie_item={movie}
                                    image_path={IMG_PATH}
                                    removeFromfavourites={removeFavMovieHandler}
                                    favorites={favMovies}
                                />
                            ))
                        ) : (
                            <Typography variant='h6' color={'primary'}>
                                No Movies Added to Favorites
                            </Typography>
                        )}
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};

export default StaredMovieList;
