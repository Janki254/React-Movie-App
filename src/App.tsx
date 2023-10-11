import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import GenresPage from './Pages/GenresPage';
import HomePage from './Pages/HomePage';
import RootLayout from './Pages/RootLayout';
import StaredMoviePage from './Pages/StaredMoviePage';

const App = () => {
    const routes = createBrowserRouter([
        {
            path: '/',
            element: <RootLayout />,
            children: [
                {
                    index: true,
                    element: <HomePage />,
                },
                {
                    path: 'genre-filter',
                    element: <GenresPage />,
                },
                {
                    path: 'stared-movies',
                    element: <StaredMoviePage />,
                },
            ],
        },
    ]);

    return (
        <React.Fragment>
            <RouterProvider router={routes}></RouterProvider>
        </React.Fragment>
    );
};

export default App;
