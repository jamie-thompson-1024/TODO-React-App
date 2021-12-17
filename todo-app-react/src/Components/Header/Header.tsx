import { useState, useCallback, useContext, useEffect } from 'react';
import TodoContext from '../TodoContext';
import { Theme } from '../../Model/Todo';
import Settings from './Settings';

import './Header.css';

function Header()
{
    const { settings } = useContext(TodoContext);

    const notesSvgLogoPath = useCallback((theme: Theme) => { 
        return `./Assets/sticky-notes-logo-${theme.toString()}.svg`; 
    }, []);

    const [notesSvgLogo, setNotesSvgLogo] = useState(notesSvgLogoPath(settings.theme));
    
    const updateTheme = useCallback(() => {
        setNotesSvgLogo(notesSvgLogoPath(settings.theme))
    }, [notesSvgLogoPath, settings]);
    
    useEffect(() => {
        settings.addEventListener('themeChange', updateTheme);
        return (() => {
            settings.removeEventListener('themeChange', updateTheme);
        })
    }, [settings, updateTheme]);

    return (
        <header className="Header">
            <div className="Header-Title">
                <img src={notesSvgLogo} alt="sticky note"></img>
                <h1>Todo List</h1>
            </div>
            <Settings />
        </header>
    )
}

export default Header;
