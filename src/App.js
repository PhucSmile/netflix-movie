import './App.css';

import Routers from './router/Routers';

import Header from './component/header/Header';
import Footer from './component/footer/Footer';

function App() {
    return (
        <div>
            <Header />
            <Routers />
            <Footer />
        </div>
    );
}

export default App;
