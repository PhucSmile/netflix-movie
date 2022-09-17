import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import './Modal.scss';
import CloseIcon from '@mui/icons-material/Close';

const Modal = (props) => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(props.active);
    }, [props.active]);

    return (
        <div id={props.id} className={`modal ${active ? 'active' : ''}`}>
            {props.children}
        </div>
    );
};

Modal.propTypes = {
    active: PropTypes.bool,
    id: PropTypes.string,
    children: PropTypes.node,
};

export const ModalContent = (props) => {
    const contentRef = useRef(null);

    const closeModal = () => {
        contentRef.current.parentNode.classList.remove('active');
        if (props.onClose) props.onClose();
    };

    return (
        <div ref={contentRef} className="modal__content">
            {props.children}
            <div className="modal__content-close" onClick={closeModal}>
                <CloseIcon />
            </div>
        </div>
    );
};

ModalContent.propTypes = {
    onClose: PropTypes.func,
};

export default Modal;
