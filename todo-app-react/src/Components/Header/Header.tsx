import Settings from './Settings';

import './Header.css';

function Header()
{
    return (
        <header className="Header">
            <h1>Todo List</h1>
            <Settings />
        </header>
    )
}

export default Header;
