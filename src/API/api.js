
const API_KEY = 'cb1ed51f5576b76307b476b85602626d'; 

export const getMoviesAndSeries = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching data from TMDb API:', error);
    return [];
  }
};
