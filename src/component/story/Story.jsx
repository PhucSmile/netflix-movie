import './Story.scss';
import Questions from '../Questions/Questions';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function Story() {
    return (
        <>
            <div className="story">
                <Container className="m-0">
                    <Row>
                        <Col lg={6} md={12} xs={12}>
                            <div className="story__title">
                                <h3>Enjoy on your TV.</h3>
                                <h5>
                                    Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and
                                    more.
                                </h5>
                            </div>
                        </Col>

                        <Col lg={6} md={12} xs={12} className="set-mt">
                            <div className="image-tv">
                                <img
                                    src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png"
                                    alt="img-tv"
                                />
                                <div className="movie">
                                    <video data-uia="our-story-card-video" autoPlay playsInline muted loop>
                                        <source
                                            src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v"
                                            type="video/mp4"
                                        />
                                    </video>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Story-2 */}
            <div className="story ">
                <Container className="m-0">
                    <Row className="flex-dir">
                        <Col lg={6} md={12} xs={12}>
                            <div className="story__title">
                                <h3>Download your shows to watch offline.</h3>
                                <h5>Save your favorites easily and always have something to watch.</h5>
                            </div>
                        </Col>

                        <Col lg={6} md={12} xs={12} className="set-mt">
                            <div className="image-tv">
                                <img
                                    src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg"
                                    alt=""
                                />

                                <div className="story__card">
                                    <img
                                        src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/boxshot.png"
                                        alt=" "
                                    />

                                    <div className="story__story-title">
                                        <span>Stranger Things</span>
                                        <span>Downloading...</span>
                                    </div>
                                    <div className="story__animation"></div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Story-3 */}
            <div className="story hight">
                <Container className="m-0">
                    <Row>
                        <Col lg={6} md={12} xs={12}>
                            <div className="story__title">
                                <h3>Watch everywhere.</h3>
                                <h5>Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</h5>
                            </div>
                        </Col>

                        <Col lg={6} md={12} xs={12}></Col>
                    </Row>
                </Container>
            </div>

            {/* Story-4 */}
            <div className="story story-h-kid">
                <Container className="m-0">
                    <Row className="flex-dir">
                        <Col lg={6} md={12} xs={12}>
                            <div className="story__title">
                                <h3>Create profiles for kids.</h3>
                                <h5>
                                    Send kids on adventures with their favorite characters in a space made just for
                                    them—free with your membership.
                                </h5>
                            </div>
                        </Col>

                        <Col lg={6} md={12} xs={12} className="set-mt">
                            <div className="image-tv image-kid ">
                                <img
                                    src="https://occ-0-325-58.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABfpnX3dbgjZ-Je8Ax3xn0kXehZm_5L6-xe6YSTq_ucht9TI5jwDMqusWZKNYT8DfGudD0_wWVVTFLiN2_kaQJumz2iivUWbIbAtF.png?r=11f"
                                    alt=""
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Story-5 */}
            <div className="story h-phone">
                <Container className="m-0">
                    <Row>
                        <Col lg={6} md={12} xs={12}>
                            <div className="story__title">
                                <h3>Have an Android Phone? Get our new free plan!</h3>
                                <h5>
                                    Watch a selection of new movies and TV shows without adding any payment details!
                                </h5>

                                <button className="btn btn__getAp ">
                                    <a href="https://play.google.com/store/apps/details?id=com.netflix.mediaclient">
                                        Get the app <ChevronRightIcon className="icon" />
                                    </a>
                                </button>
                            </div>
                        </Col>

                        <Col lg={6} md={12} xs={12} className="set-mt">
                            <div className="image-tv phone ">
                                <img
                                    src="https://assets.nflxext.com/ffe/siteui/acquisition/ab36101/nmhp/vn.jpg"
                                    alt=""
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Questions />
        </>
    );
}

export default Story;
