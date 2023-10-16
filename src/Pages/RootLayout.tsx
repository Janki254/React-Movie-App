import React from 'react';
import {Outlet} from 'react-router-dom';

import {Backdrop, Drawer, useMediaQuery} from '@mui/material';

import Navbar from '../Components/Navbar/Navbar';
import DrawerContent from '../DrawerSidebar/DrawerContent';

const drawerWidth = 240;
const RootLayout = () => {
    const isMobile = useMediaQuery('(max-width:600px)');

    const [mobileOpen, setMobileOpen] = React.useState(true);

    const handleDrawerToggle = () => {
        if (isMobile) {
            setMobileOpen(!mobileOpen);
        }
    };

    return (
        <React.Fragment>
            <Navbar onOpenSidebar={handleDrawerToggle} />
            <Drawer
                variant='persistent'
                open={!isMobile || mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    width: drawerWidth,
                    display: {sm: 'block'},
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: '#10141e',
                    },
                }}
            >
                <DrawerContent />
            </Drawer>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer - 1}}
                open={isMobile && mobileOpen}
                onClick={handleDrawerToggle}
            ></Backdrop>
            <main>
                <Outlet />
            </main>
        </React.Fragment>
    );
};

export default RootLayout;
