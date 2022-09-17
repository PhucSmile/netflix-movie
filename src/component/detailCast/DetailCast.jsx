import React, { useEffect, useState } from 'react';
import './DetailCast.scss';

import { useParams } from 'react-router';

import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

const DetailCast = (props) => {
    const { category } = useParams();

    const [cast, setCast] = useState([]);

    useEffect(() => {
        const getCredits = async () => {
            try {
                const response = await tmdbApi.credits(category, props.id);
                setCast(response.cast.slice(0, 4));
            } catch {
                console.log('error');
            }
        };
        getCredits();
    }, [category, props.id]);

    return (
        <div className="detail__cast d-flex ">
            {cast.map((item, index) => (
                <div key={index} className="detail__cast-item">
                    <img src={apiConfig.w500Image(item.profile_path)} alt="img-casts" />

                    <p className="detail__cast-name">{item.name}</p>
                </div>
            ))}
        </div>
    );
};

export default DetailCast;
