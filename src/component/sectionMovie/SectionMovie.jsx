import React from 'react';
import './SectionMovie.scss';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';

const SectionMovie = ({ title }) => {
    return (
        <section className="section__movies">
            <Container>
                <h3 className="text-center">{title}</h3>
            </Container>
        </section>
    );
};

SectionMovie.propTypes = {
    title: PropTypes.string.isRequired,
};

export default SectionMovie;
