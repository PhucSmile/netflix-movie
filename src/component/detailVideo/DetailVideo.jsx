import React, { useEffect, useState } from 'react';
import './DetailVideo.scss';
import PropTypes from 'prop-types';

import { useParams } from 'react-router';

import tmdbApi from '../../api/tmdbApi';

const DetailVideo = (props) => {
    const { category } = useParams();

    const [video, setVideo] = useState([]);

    useEffect(() => {
        const getVideos = async () => {
            try {
                const response = await tmdbApi.getVideos(category, props.id);
                setVideo(response.results.slice(1, 3));
            } catch (err) {
                console.log(err);
            }
        };
        getVideos();
    }, [category, props.id]);

    return (
        <>
            {video.map((item, index) => (
                <div key={index} className="video">
                    <div className="video__title">
                        <h2>{item.name}</h2>
                    </div>
                    <iframe src={`https://www.youtube.com/embed/${item.key}`} width="100%" title="video"></iframe>
                </div>
            ))}
        </>
    );
};

DetailVideo.propTypes = {
    id: PropTypes.number.isRequired,
};

export default DetailVideo;
