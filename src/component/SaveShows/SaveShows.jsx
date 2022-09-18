import './SaveShows.scss';

import { useState, useEffect } from 'react';
import Button from '../button/Button';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { db } from '../../Firebase';
import { updateDoc, doc, onSnapshot } from 'firebase/firestore';

import apiConfig from '../../api/apiConfig';
import { SwiperSlide, Swiper } from 'swiper/react';

import CloseIcon from '@mui/icons-material/Close';
import YouTubeIcon from '@mui/icons-material/YouTube';

function SaveShows(props) {
    const [movies, setMovies] = useState([]);
    const user = useSelector((state) => state.user.user);

    const movieRef = doc(db, 'users', `${user?.email}`);

    // get api from database
    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
            setMovies(doc.data().saveShows);
        });
    }, [user?.email]);

    // HandleDelete
    const HandleDelete = async (id) => {
        try {
            const result = movies.filter((x) => x.id !== id);
            await updateDoc(movieRef, {
                saveShows: result,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="account">
            <h2 className="account__title">{props.title}</h2>
            <div className="account__wrapper">
                <Swiper grabCursor={true} spaceBetween={10} slidesPerView={'auto'}>
                    {movies
                        ? movies.map((item, index) => (
                              <SwiperSlide key={index}>
                                  <div className="account__lists d-flex flex-column">
                                      <div className="account____lists-img">
                                          <img src={apiConfig.w500Image(item.img)} alt="img-movie" />

                                          <Link to={'/' + item.category + '/' + item.id}>
                                              <Button className="small">
                                                  <YouTubeIcon />
                                              </Button>
                                          </Link>

                                          <CloseIcon className="icon__close" onClick={() => HandleDelete(item.id)} />
                                      </div>
                                      <span className="account__lists-title mt-2 ">{item.title}</span>
                                  </div>
                              </SwiperSlide>
                          ))
                        : null}
                </Swiper>
            </div>
        </div>
    );
}

export default SaveShows;
