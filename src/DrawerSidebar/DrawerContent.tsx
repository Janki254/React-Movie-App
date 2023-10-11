import { Link } from 'react-router-dom';

import {
	Box,
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Toolbar,
} from '@mui/material';

const Nav_Links = [
    {
        title: 'All Movies',
        page_link: '/',
    },
    {
        title: 'Movies by Genres',
        page_link: 'genre-filter',
    },
    {
        title: 'Starred Movies',
        page_link: 'stared-movies',
    },
];
const DrawerContent = () => {
    return (
        <Box sx={{backgroundColor: '#10141e'}}>
            <Toolbar />
            <Divider />
            <List>
                {Nav_Links.map((nav_link, indx) => (
                    <Link key={indx} to={nav_link.page_link}>
                        <ListItem key={indx} disablePadding>
                            <ListItemButton>
                                <ListItemText
                                    primary={nav_link.title}
                                    sx={{color: '#fff'}}
                                />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />
        </Box>
    );
};

export default DrawerContent;
