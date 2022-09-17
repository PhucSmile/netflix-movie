import './Questions.scss';
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const dataListQuestions = [
    {
        question: 'What is Netflix?',
        answer: 'Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.',
        answer2:
            "You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!",
    },
    {
        question: 'How much does Netflix cost?',
        answer: 'Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from 70,000 ₫ to 260,000 ₫ a month. No extra costs, no contracts.',
    },
    {
        question: 'Where can I watch?',
        answer: 'Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.',
        answer2:
            "You can also download your favorite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.",
    },
    {
        question: 'How do I cancel?',
        answer: 'Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.',
    },
    {
        question: 'What can I watch on Netflix?',
        answer: 'Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.',
    },
    {
        question: 'Is Netflix good for kids?',
        answer: 'The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space.',
        answer2:
            'Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific answers you don’t want kids to see.',
    },
];

function Questions() {
    return (
        <div className="question">
            <Container fluid>
                <h1>Frequently Asked Questions</h1>
                <div className="wrapper ">
                    {dataListQuestions.map((list, index) => (
                        <Accordion key={index} flush>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>{list.question} </Accordion.Header>
                                <Accordion.Body>
                                    {list.answer}
                                    <br />
                                    <br />
                                    {list.answer2}
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    ))}
                </div>
                <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Email address"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                    />
                    <InputGroup.Text id="basic-addon2">
                        Get Started <KeyboardArrowRightIcon className="icon" />
                    </InputGroup.Text>
                </InputGroup>
            </Container>
        </div>
    );
}

export default Questions;
