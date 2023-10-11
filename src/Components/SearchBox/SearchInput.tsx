import './SearchInput.css';

import React, {useState} from 'react';

import SearchIcon from '@mui/icons-material/Search';
import {Box, Button} from '@mui/material';

const SearchInput: React.FC<{
    onSearch: (search_item: string) => void;
}> = (props) => {
    const [searchValue, setSearchValue] = useState<string>('');

    const onChangeMovie = (e: {
        target: {value: React.SetStateAction<string>};
    }) => {
        setSearchValue(e.target.value);
    };
    const submitHandler = (event: {preventDefault: () => void}) => {
        event.preventDefault();

        props.onSearch(searchValue);

        setSearchValue('');
    };

    const [showSearchBox, setShowSearchBox] = useState<boolean>(false);

    return (
        <React.Fragment>
            <Box className='searchBar' sx={{flexGrow: 1, minHeight: '192px'}}>
                <h1>Search Movie By Title</h1>
                <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    padding={1}
                >
                    <form onSubmit={submitHandler}>
                        <input
                            type='search'
                            placeholder='Search Movie'
                            className={`searchInput ${
                                showSearchBox ? 'active' : ''
                            }`}
                            autoFocus={true}
                            onChange={onChangeMovie}
                            value={searchValue}
                        />
                        {showSearchBox && (
                            <Button
                                type='submit'
                                variant='contained'
                                size='large'
                                sx={{
                                    borderTopLeftRadius: '0px',
                                    borderBottomLeftRadius: '0px',
                                }}
                            >
                                <SearchIcon />
                            </Button>
                        )}
                    </form>
                    {!showSearchBox && (
                        <Button
                            variant='contained'
                            size='large'
                            onClick={() => setShowSearchBox((prev) => !prev)}
                        >
                            <SearchIcon />
                        </Button>
                    )}
                </Box>
            </Box>
        </React.Fragment>
    );
};

export default SearchInput;
