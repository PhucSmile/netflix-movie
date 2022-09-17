import React, { useEffect, useState } from 'react';
import './MovieList.scss';
import PropTypes from 'prop-types';

import tmdbApi, { category } from '../../api/tmdbApi';

import { Link } from 'react-router-dom';
import { SwiperSlide, Swiper } from 'swiper/react';

import { OutlineButton } from '../../component/button/Button';
import MovieItem from '../movieItem/MovieItem';

const MovieList = (props) => {
    const [movies, setMovies] = useState([]);

    // get API and check similar
    useEffect(() => {
        const getMovies = async () => {
            let response = null;
            const params = {};

            if (props.type !== 'similar') {
                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(props.type, { params });
                        break;
                    default:
                        response = await tmdbApi.getTvList(props.type, { params });
                }
            } else {
                response = await tmdbApi.similar(props.category, props.id);
            }
            setMovies(response.results);
        };
        getMovies();
    }, [props.type, props.id, props.category]);

    return (
        <div className="movie__list">
            <div className="section__list d-flex justify-content-between align-items-center mb-2">
                <h2>{props.title}</h2>
                <Link to="/movies">
                    <OutlineButton className="small">View more</OutlineButton>
                </Link>
            </div>
            <Swiper grabCursor={true} spaceBetween={10} slidesPerView={'auto'}>
                {movies.map((movie, index) => (
                    <SwiperSlide key={index}>
                        <MovieItem category={props.category} data={movie} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

MovieList.propTypes = {
    type: PropTypes.string,
    category: PropTypes.string,
    id: PropTypes.number,
};

export default MovieList;
