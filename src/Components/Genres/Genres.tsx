import './Genres.css';

import React, { useEffect, useRef, useState } from 'react';

import { Chip, Typography } from '@mui/material';

import { Genre, getMovieGenres } from '../../services/fetchGenresServices';

const Genres: React.FC<{
    onFilterGenres: (genres: Genre) => void;
    filteredGenres: Genre[];
}> = (props) => {
    const [genres, setGenres] = useState<Genre[]>([]);

    const apiCalled = useRef(false);
    // Define an async function and call it within useEffect
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                if (!apiCalled.current) {
                    apiCalled.current = true;

                    const data = await getMovieGenres();
                    setGenres(data);
                }
            } catch (error) {
                console.error('Error fetching Genres:', error);
            }
        };
        fetchGenres();
    }, []);

    const GenreSelection = (genre: Genre) => {
        props.onFilterGenres(genre);
    };

    return (
        <React.Fragment>
            <div className='container'>
                <div className='genres-container'>
                    <Typography variant='h3' my={3}>
                        Filter Movies by Genres
                    </Typography>
                    <div className='genres'>
                        {genres.map((genre) => {
                            if (
                                genre.name === 'Documentary' ||
                                genre.name === 'History' ||
                                genre.name === 'Music' ||
                                genre.name === 'TV Movie' ||
                                genre.name === 'Western'
                            ) {
                                return;
                            } else {
                                return (
                                    <Chip
                                        key={genre.id}
                                        sx={{padding: 1, margin: '.5rem'}}
                                        color={'primary'}
                                        variant={
                                            props.filteredGenres.some(
                                                (g) => g.id === genre.id,
                                            )
                                                ? 'filled'
                                                : 'outlined'
                                        }
                                        label={genre.name}
                                        clickable
                                        onClick={() => GenreSelection(genre)}
                                    />
                                );
                            }
                        })}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Genres;
