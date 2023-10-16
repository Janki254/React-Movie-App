import React from 'react';

import {Box, Typography} from '@mui/material';

// import MovieList from '../Components/Movies/MovieList';
import StaredMovieList from '../Components/Movies/StaredMovieList';

const StaredMoviePage = () => {
    return (
        <React.Fragment>
            <div className='container'>
                <div className='stared-movie-container'>
                    <Typography variant='h3' my={3}>
                        Your Favorite Movies
                    </Typography>
                    <Box sx={{mt: 3}}>
                        <StaredMovieList />
                    </Box>
                </div>
            </div>
        </React.Fragment>
    );
};

export default StaredMoviePage;
