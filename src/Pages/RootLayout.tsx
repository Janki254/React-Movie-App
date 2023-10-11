import React from 'react';
import { Outlet } from 'react-router-dom';

import { Drawer } from '@mui/material';

import Navbar from '../Components/Navbar/Navbar';
import DrawerContent from '../DrawerSidebar/DrawerContent';

const drawerWidth = 240;
const RootLayout = () => {
    const [mobileOpen, setMobileOpen] = React.useState(true);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const customBackdropProps = {
        invisible: true, // Set the backdrop to be invisible
    };
    return (
        <React.Fragment>
            <Navbar onOpenSidebar={handleDrawerToggle} />
            <Drawer
                variant='persistent'
                open={mobileOpen}
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
                BackdropProps={customBackdropProps}
            >
                <DrawerContent />
            </Drawer>
            <main>
                <Outlet />
            </main>
        </React.Fragment>
    );
};

export default RootLayout;
