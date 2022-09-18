import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './MovieItem.scss';
import Button from '../button/Button';
import { useNavigate } from 'react-router-dom';

import apiConfig from '../../api/apiConfig';
import { db } from '../../Firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

import YouTubeIcon from '@mui/icons-material/YouTube';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { useSelector } from 'react-redux';

const MovieItem = (props) => {
    const [save, setSave] = useState(false);
    const [active, setActive] = useState(false);

    const API = props.data;
    const category = props.category;
    const link = '/' + category + '/' + API.id;

    const background = apiConfig.originalImage(API.backdrop_path ? API.backdrop_path : API.poster_path);
    const user = useSelector((state) => state.user.user);
    const moveId = doc(db, 'users', `${user?.email}`);
    const navigate = useNavigate();

    const goToMovie = () => {
        if (!user?.email) {
            alert('Please log in  to play movie');
        } else {
            navigate(link);
        }
    };

    const saveShow = async (props) => {
        if (user?.email) {
            if (props === 'add') {
                setActive(!active);
            }

            setSave(true);
            await updateDoc(moveId, {
                saveShows: arrayUnion({
                    id: API.id,
                    title: API.title,
                    img: API.backdrop_path,
                    category: category,
                }),
            });
        } else {
            alert('Please log in  to save ');
        }
    };

    return (
        <div className="movie__item">
            <div className="movie__item-wrap d-flex flex-column">
                <div className="movie__img">
                    <img src={background} alt={API.title} />

                    <Button className="small" onClick={goToMovie}>
                        <YouTubeIcon />
                    </Button>

                    <FavoriteBorderIcon className={`icon ${active ? 'active' : ''}`} onClick={() => saveShow('add')} />
                </div>
                <span className="movie__item-title mt-2">{API.title || API.name}</span>
            </div>
        </div>
    );
};

MovieItem.propTypes = {
    data: PropTypes.object.isRequired,
    category: PropTypes.string.isRequired,
};

export default MovieItem;
