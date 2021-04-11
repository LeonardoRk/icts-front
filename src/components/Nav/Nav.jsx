import { Component } from 'react';
import './nav.css';

import { Link } from 'react-router-dom';

class Nav extends Component {

    render() {
        return (
            <nav>
                <ul className="nav_ul">
                    <li className="nav_li"><Link to="/products">Produto</Link></li>
                    <li className="nav_li"><Link to="/purchases">Compra</Link></li>
                </ul>
            </nav>
        );
    }
}

export default Nav;