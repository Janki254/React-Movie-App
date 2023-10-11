export interface Genre {
    id: number;
    name: string;
}
const genreList: Genre[] = [];
export const getMovieGenres = async (): Promise<Genre[]> => {
    const API_KEY = '3fd2be6f0c70a2a598f084ddfb75487c';

    const API_URL = `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${API_KEY}`;

    // Clear the moviesList array at the beginning of each search
    genreList.length = 0;

    const url = API_URL;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Something went horrible wrong!');
    }

    const responseJsonData = await response.json();
    const results = responseJsonData.genres;

    results.forEach((genre: Genre) => {
        genreList.push(genre);
    });

    // Convert the API response to the desired Movie format

    const formattedGenres: Genre[] = genreList.map((genre: Genre) => ({
        id: genre.id,
        name: genre.name,
    }));

    return formattedGenres;
};
