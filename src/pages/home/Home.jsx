import React from 'react';
import HeroSlider from '../../component/heroSlider/HeroSlider';

import MovieList from '../../component/movieList/MovieList';
import { category, movieType, tvType } from '../../api/tmdbApi';

const Home = () => {
    return (
        <div>
            <HeroSlider />

            <MovieList title="Up Coming" category={category.movie} type={movieType.upcoming} />
            <MovieList title="Top Rated Movies" category={category.movie} type={movieType.top_rated} />
            <MovieList title="Trending TV" category={category.tv} type={tvType.popular} />
            <MovieList title="Top Rated TV" category={category.tv} type={tvType.top_rated} />
        </div>
    );
};

export default Home;
