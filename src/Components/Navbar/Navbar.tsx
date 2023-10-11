import React from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Navbar: React.FC<{
    onOpenSidebar: React.MouseEventHandler<HTMLButtonElement> | undefined;
}> = (props) => {
    return (
        <React.Fragment>
            <Box sx={{display: 'flex', flexGrow: 1}}>
                {/* <CssBaseline /> */}
                <AppBar
                    position='static'
                    color={'transparent'}
                    sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}
                >
                    <Toolbar>
                        <IconButton
                            size='large'
                            edge='start'
                            aria-label='menu'
                            sx={{mr: 2, color: '#eee'}}
                            onClick={props.onOpenSidebar}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant='h6'
                            component='div'
                            sx={{
                                flexGrow: 1,
                                color: '#0467CB',
                            }}
                        >
                            MELTED MOVIES
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </React.Fragment>
    );
};

export default Navbar;
