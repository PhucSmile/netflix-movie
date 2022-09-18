import React, { useEffect, useState } from 'react';
import './Detail.scss';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useParams } from 'react-router-dom';

import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import DetailCast from '../../component/detailCast/DetailCast';
import DetailVideo from '../../component/detailVideo/DetailVideo';
import MovieList from '../../component/movieList/MovieList';

const Detail = () => {
    const { category, id } = useParams();

    const [getInfor, setGetInfor] = useState(null);

    useEffect(() => {
        const getDetail = async () => {
            try {
                const response = await tmdbApi.detail(category, id, { params: {} });
                setGetInfor(response);
                window.scrollTo(0, 0);
            } catch (error) {
                console.log(error);
            }
        };
        getDetail();
    }, [category, id]);

    return (
        <>
            {getInfor && (
                <>
                    <div
                        className="detail__banner"
                        style={{
                            backgroundImage: `url(${apiConfig.originalImage(
                                getInfor.backdrop_path || getInfor.poster_path,
                            )})`,
                        }}
                    ></div>
                    <Container className="detail__container ">
                        <Row>
                            <Col lg={4} md={4}>
                                <img
                                    src={apiConfig.originalImage(getInfor.poster_path || getInfor.backdrop_path)}
                                    alt="img-movie"
                                    className="detail__image-movie w-100"
                                />
                            </Col>
                            <Col lg={8} md={8}>
                                <Row>
                                    <Col lg={12}>
                                        <div className="detail__wrap">
                                            <h1 className="detail__title">
                                                {getInfor.title || getInfor.original_name}
                                            </h1>
                                            <div className="detail__genres">
                                                {getInfor.genres &&
                                                    getInfor.genres.slice(1, 3).map((genre, index) => (
                                                        <span key={index} className="detail__genres-btn ">
                                                            {genre.name}
                                                        </span>
                                                    ))}
                                            </div>
                                            <p className="detail__desc">{getInfor.overview}</p>
                                            <div className="detail__cast">
                                                <div className="detail__cats-list">
                                                    <h4>Casts</h4>
                                                    <DetailCast id={getInfor.id} />
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>

                    <Container>
                        <div className="detail__video-list">
                            <DetailVideo id={getInfor.id} />
                        </div>
                        <div className="similar">
                            <MovieList title="similar" category={category} type="similar" id={getInfor.id} />
                        </div>
                    </Container>
                </>
            )}
        </>
    );
};

export default Detail;
