import './Account.scss';

import SaveShows from '../../component/SaveShows/SaveShows';

function Account() {
    return (
        <>
            <div className="account">
                <div className="account__img">
                    <div className="account__overlay"></div>
                    <h2 className="title">My Shows</h2>
                </div>
                <SaveShows title="My Shows" />
            </div>
        </>
    );
}

export default Account;
