import React from 'react';
import './Footer.scss';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const dataList = [
    {
        title: 'FAQ',
    },
    {
        title: 'Help Center',
    },
    {
        title: 'Account',
    },
    {
        title: 'Media Center',
    },
    {
        title: 'Investor Relations',
    },
    {
        title: 'Jobs',
    },
    {
        title: 'Ways to Watch',
    },
    {
        title: 'Terms of Use',
    },
    {
        title: 'Privacy',
    },
    {
        title: 'Cookie Preferences',
    },
    {
        title: 'Corporate Information',
    },
    {
        title: 'Contact Us',
    },
    {
        title: 'Speed Test',
    },
    {
        title: 'Legal Notices',
    },
    {
        title: 'Only on Netflix',
    },
];

const Footer = () => {
    return (
        <div className="footer__login mt-5">
            <Container className="footer__container">
                <Row>
                    <span className="footer__question mt-4">Questions? Contact us.</span>
                </Row>
                <Row className="lists">
                    {dataList.map((item, index) => (
                        <Col key={index} className="item" lg={3} md={4} sm={6} xs={6}>
                            {item.title}
                        </Col>
                    ))}
                </Row>
                <div className="btn__language"></div>
            </Container>
        </div>
    );
};
export default Footer;
