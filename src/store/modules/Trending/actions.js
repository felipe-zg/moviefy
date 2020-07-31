export const fetchTrendings = (trendings) => {
    return {
        type: '@Trending/FETCH_TRENDINGS',
        payload: trendings
    };
};
