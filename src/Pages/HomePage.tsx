import React, {useState} from 'react';

import MovieList from '../Components/Movies/MovieList';
import SearchInput from '../Components/SearchBox/SearchInput';

const HomePage = () => {
    const [searched_Term, setsearched_Term] = useState<string>('');

    const onSearchMovie = (s: string) => {
        setsearched_Term(s);
        console.log(searched_Term);
    };

    return (
        <React.Fragment>
            <SearchInput onSearch={onSearchMovie} />
            <MovieList searchedTerm={searched_Term} />
        </React.Fragment>
    );
};

export default HomePage;
