import React, { useState, useEffect, useRef } from 'react';
import './HeroSlider.scss';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';

import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Button, { OutlineButton } from '../button/Button';
import Modal, { ModalContent } from '../modal/Modal';

import tmdbApi, { category, movieType } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import { useNavigate } from 'react-router-dom';

const HeroSlide = () => {
    SwiperCore.use([Autoplay]);
    const [movieItems, setMovieItems] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const params = { page: 1 };
            try {
                const response = await tmdbApi.getMoviesList(movieType.popular, { params });
                setMovieItems(response.results.slice(1, 8));
            } catch {
                console.log('error');
            }
        };
        getMovies();
    }, []);

    return (
        <div className="hero__slide ">
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 3000 }}
            >
                {movieItems.map((item, index) => (
                    <SwiperSlide key={index}>
                        {({ isActive }) => <HeroSliderItem item={item} className={`${isActive ? 'active' : ''}`} />}
                    </SwiperSlide>
                ))}
            </Swiper>
            {/* video trailer */}
            {movieItems.map((item, index) => (
                <TrailerModal key={index} item={item} />
            ))}
        </div>
    );
};

const HeroSliderItem = (props) => {
    let navigate = useNavigate();
    const item = props.item;

    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);

    const setModalActive = async () => {
        const modal = document.querySelector(`#modal_${item.id}`);

        const videos = await tmdbApi.getVideos(category.movie, item.id);

        if (videos.results.length > 0) {
            const videSrc = 'https://www.youtube.com/embed/' + videos.results[0].key;
            modal.querySelector('.modal__content > iframe').setAttribute('src', videSrc);
        } else {
            modal.querySelector('.modal__content').innerHTML = 'No trailer';
        }

        modal.classList.toggle('active');
    };

    // slice overview
    const trumcateString = (str, num) => {
        if (str?.length > num) {
            return str.slice(0, num) + '.....';
        } else {
            return str;
        }
    };

    return (
        <div className={`hero__slide-item ${props.className}`} style={{ backgroundImage: `url(${background})` }}>
            <Container>
                <div className="hero__slide-content d-flex justify-content-between align-items-center">
                    <div className="hero__slide-info">
                        <h2 className="title mb-4">{item.title}</h2>
                        <div className="overview mb-4">{trumcateString(item.overview, 200)}</div>
                        <div className="btns d-flex gap-4">
                            <Button onClick={() => navigate('/movie/' + item.id)}>Watch now</Button>
                            <OutlineButton onClick={setModalActive}>Watch trailer</OutlineButton>
                        </div>
                    </div>
                    <div className="hero__slide-poster">
                        <img src={apiConfig.w500Image(item.poster_path)} alt="" />
                    </div>
                </div>
            </Container>
        </div>
    );
};

// VIDEO
const TrailerModal = (props) => {
    const item = props.item;

    const iframeRef = useRef(null);

    const onClose = () => iframeRef.current.setAttribute('src', '');

    return (
        <Modal active={false} id={`modal_${item.id}`}>
            <ModalContent onClose={onClose}>
                <iframe ref={iframeRef} width="100%" height="500px" title="trailer"></iframe>
            </ModalContent>
        </Modal>
    );
};

HeroSliderItem.propTypes = {
    item: PropTypes.object.isRequired,
};

TrailerModal.propTypes = {
    item: PropTypes.object.isRequired,
};

export default HeroSlide;
