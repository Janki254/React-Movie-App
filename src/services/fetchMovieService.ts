export interface Movie {
    id: number;
    overview: string;
    poster_path: string;
    release_date: string;
    title: string;
    vote_average: number;
    genre_ids: number[];
}
const moviesList: Movie[] = [];
export const getMovieRequest = async (
    searchterm: string | undefined,
): Promise<Movie[]> => {
    const API_KEY = '3fd2be6f0c70a2a598f084ddfb75487c';
    let page = 1;
    const API_URL = searchterm
        ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchterm}`
        : `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=${page}`;

    // Clear the moviesList array at the beginning of each search
    moviesList.length = 0;

    while (page <= 1) {
        const url = API_URL;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Something went horrible wrong!');
        }

        const responseJsonData = await response.json();
        const results = responseJsonData.results;

        results.forEach((movie: Movie) => {
            moviesList.push(movie);
        });
        page++;
    }

    // Convert the API response to the desired Movie format

    const formattedMovies: Movie[] = moviesList.map((movie: Movie) => ({
        id: movie.id,
        overview: movie.overview,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        title: movie.title,
        vote_average: movie.vote_average,
        genre_ids: movie.genre_ids,
    }));

    return formattedMovies;
};
