export const fetchMovies = (movies) => {
    return {
        type: '@Movies/FETCH_MOVIES',
        movies
    };
};

export const updateMovies = (movies) => {
    return {
        type: '@Movies/UPDATE_MOVIES',
        movies
    };
};
