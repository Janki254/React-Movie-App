import './MovieItem.css';

import React from 'react';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {IconButton} from '@mui/material';

import NoImg from '../../assets/images/no-image.jpg';
import {Movie} from '../../services/fetchMovieService';

const MovieItem: React.FC<{
    movie_item: Movie;
    image_path: string;
    favorites?: Movie[];
    removeFromfavourites: (movie: Movie) => void;
    addTofavourites?: (movie: Movie) => void;
}> = (props) => {
    // console.log(props.movie_item);
    let RateingColorClass;
    const getClassByRate = (vote: number) => {
        if (vote >= 8) {
            RateingColorClass = 'green';
        } else if (vote >= 5) {
            RateingColorClass = 'orange';
        } else {
            RateingColorClass = 'red';
        }
        return RateingColorClass;
    };

    const date = new Date(props.movie_item.release_date);
    const month = date.toLocaleString('en-US', {month: 'long'});
    const day = date.toLocaleString('en-US', {day: '2-digit'});
    const year = date.getFullYear();
    return (
        <React.Fragment>
            <div className='card'>
                <div className='card-image'>
                    <img
                        src={
                            props.movie_item.poster_path
                                ? `${
                                      props.image_path +
                                      props.movie_item.poster_path
                                  }`
                                : NoImg
                        }
                        alt='movie-Image'
                    />
                </div>
                <div className='card-header'>
                    <h2 className='card-title'>{props.movie_item.title}</h2>
                    <h3 className='ratings'>
                        <span
                            className={getClassByRate(
                                props.movie_item.vote_average,
                            )}
                        >
                            {props.movie_item.vote_average}
                        </span>
                    </h3>
                </div>
                <div className='card-info'>
                    <h2 className='card-title'>
                        {props.movie_item.title}
                        <span className='fav'>
                            {props.favorites?.includes(props.movie_item) ? (
                                <IconButton
                                    onClick={() =>
                                        props.removeFromfavourites(
                                            props.movie_item,
                                        )
                                    }
                                >
                                    <FavoriteIcon />
                                </IconButton>
                            ) : (
                                <IconButton
                                    onClick={() =>
                                        props.addTofavourites &&
                                        props.addTofavourites(props.movie_item)
                                    }
                                >
                                    <FavoriteBorderIcon />
                                </IconButton>
                            )}
                        </span>
                    </h2>
                    <h3 className='realease-date'>
                        {`${day} ${month} ${year}`}
                    </h3>
                    <p className='overview'>{props.movie_item.overview}</p>
                </div>
            </div>
        </React.Fragment>
    );
};

export default MovieItem;
