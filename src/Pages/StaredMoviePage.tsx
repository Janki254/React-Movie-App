import React from 'react';

import { Box, Typography } from '@mui/material';

import MovieList from '../Components/Movies/MovieList';

const StaredMoviePage = () => {
    return (
        <React.Fragment>
            <div className='container'>
                <Typography variant='h3' my={3}>
                    Your Favorite Movies
                </Typography>
                <Box sx={{mt: 3}}>
                    <MovieList />
                </Box>
            </div>
        </React.Fragment>
    );
};

export default StaredMoviePage;
