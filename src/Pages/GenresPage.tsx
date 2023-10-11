import React, { useState } from 'react';

import Genres from '../Components/Genres/Genres';
import MovieList from '../Components/Movies/MovieList';
import { Genre } from '../services/fetchGenresServices';

// import MovieList from '../Components/Movies/MovieList';

const GenresPage = () => {
    const [filteredMovieGenres, setFilteredMovieGenres] = useState<Genre[]>([]);

    const handleGenreSelection = (genre: Genre) => {
        // Toggle genre selection
        setFilteredMovieGenres((prevGenres) => {
            if (prevGenres.some((g) => g.id === genre.id)) {
                return prevGenres.filter(
                    (selectedGenres) => selectedGenres.id !== genre.id,
                );
            } else {
                return [...prevGenres, genre];
            }
        });
    };
    // console.log(filteredMovieGenres);
    return (
        <React.Fragment>
            <Genres
                onFilterGenres={handleGenreSelection}
                filteredGenres={filteredMovieGenres}
            />
            <MovieList genres={filteredMovieGenres} />
        </React.Fragment>
    );
};

export default GenresPage;
