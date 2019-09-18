import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({ isRoot }) => (
    <header>
        {!isRoot &&
            <Link to="/">
                <i className="far fa-arrow-alt-circle-left"></i>
            </Link>
        }
        <h1>Mankatter Gamez</h1>
    </header>
)

export default Header
