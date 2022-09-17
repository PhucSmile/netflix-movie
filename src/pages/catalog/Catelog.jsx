import React, { useEffect, useRef, useState } from 'react';
import './Catelog.scss';
import SectionMovie from '../../component/sectionMovie/SectionMovie';

import { useParams } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button, { OutlineButton } from '../../component/button/Button';

import MovieItem from '../../component/movieItem/MovieItem';

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import RotateLeftOutlinedIcon from '@mui/icons-material/RotateLeftOutlined';

import tmdbApi, { movieType, tvType } from '../../api/tmdbApi';
import useDebounce from '../../component/hook/useDebounce';

const Catelog = () => {
    const { category } = useParams();
    const [movies, setMovies] = useState([]);
    // paginate
    const [page, setPage] = useState(1);
    const [pageNumber, setPageNumber] = useState(0);
    // value search
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(false);
    const focusRef = useRef();
    const debounced = useDebounce(searchValue, 500);

    // API movie &Tv &search
    useEffect(() => {
        const getList = async () => {
            let response = null;

            if (debounced === '') {
                const params = {};
                switch (category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(movieType.upcoming, { params });

                        break;
                    default:
                        response = await tmdbApi.getTvList(tvType.popular, { params });
                }
            } else {
                const params = {
                    query: debounced,
                };
                response = await tmdbApi.search(category, { params });
                setLoading(true);
            }
            setMovies(response.results);
            setPageNumber(response.total_pages);
            setLoading(false);
        };
        getList();
    }, [category, debounced]);

    // Handle
    const HandlePaginate = async () => {
        let response = null;
        if (searchValue === '') {
            const params = {
                page: page + 1,
            };
            switch (category) {
                case category.movie:
                    response = await tmdbApi.getMoviesList(movieType.upcoming, { params });
                    break;
                default:
                    response = await tmdbApi.getTvList(tvType.popular, { params });
            }
        } else {
            const params = {
                page: page + 1,
                query: searchValue,
            };
            response = await tmdbApi.search(category, { params });
        }
        setMovies([...movies, ...response.results]);
        setPageNumber(page + 1);
    };

    const HandleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
            setLoading(true);
        }
        return;
    };

    const HandleCloseValue = () => {
        setSearchValue('');
        focusRef.current.focus();
    };

    return (
        <div>
            <SectionMovie title={category === 'movie' ? 'Movies' : 'Tv Series'} />

            <Container>
                {/* search */}
                <Row>
                    <Col lg={12}>
                        <div className="catelog__form">
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Search Movie"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    ref={focusRef}
                                    value={searchValue}
                                    onChange={HandleChange}
                                />
                                {!!searchValue && !loading && (
                                    <CloseOutlinedIcon className="icon__close" onClick={HandleCloseValue} />
                                )}
                                {loading && <RotateLeftOutlinedIcon className="icon__loading" />}
                                <Button>Search</Button>
                            </InputGroup>
                        </div>
                    </Col>
                </Row>

                {/* movie list */}
                <Row>
                    {movies.map((item, index) => (
                        <Col key={index} xl={2} lg={3} md={3} sm={4} xs={6} className="mt-3 half-off">
                            <MovieItem category={category} data={item} />
                        </Col>
                    ))}

                    {/* PAGINATE */}
                    {page < pageNumber ? (
                        <div className="btn__paginate text-center mt-3">
                            <OutlineButton className="small" onClick={HandlePaginate}>
                                Load more
                            </OutlineButton>
                        </div>
                    ) : null}
                </Row>
            </Container>
        </div>
    );
};

export default Catelog;
