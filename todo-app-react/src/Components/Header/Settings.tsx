import { useState, useCallback, useContext, useEffect } from 'react';
import TodoContext from '../TodoContext';
import { Theme } from '../../Model/Todo';

import './Settings.css';

function Settings()
{
    const storage = useContext(TodoContext);
    const { settings } = storage;

    const [showMenu, setShowMenu] = useState(false);

    const cogSvgLogoPath = useCallback((theme: Theme) => { 
        return `./Assets/cog-logo-${theme.toString()}.svg`; 
    }, []);

    const [cogSvgLogo, setCogSvgLogo] = useState(cogSvgLogoPath(settings.theme));

    const updateTheme = useCallback(() => {
        setCogSvgLogo(cogSvgLogoPath(settings.theme))
    }, [cogSvgLogoPath, settings]);

    const toggleMenu = useCallback(() => {
        setShowMenu(!showMenu);
    }, [showMenu]);

    const toggleTheme = useCallback(() => {
        if(settings.theme === Theme.DARK)
            settings.setTheme(Theme.LIGHT);
        else if(settings.theme === Theme.LIGHT)
            settings.setTheme(Theme.DARK);
    }, [settings]);

    const wipeData = useCallback(() => {
        if(showMenu)
            storage.wipe();
    }, [showMenu, storage]);

    useEffect(() => {
        settings.addEventListener('themeChange', updateTheme);
        return (() => {
            settings.removeEventListener('themeChange', updateTheme);
        })
    }, [settings, updateTheme]);

    return (
        <div className="Settings">
            <div className="Settings-button" onClick={toggleMenu}>
                <img src={cogSvgLogo} alt="cog"></img>
            </div>
            <div className={"Settings-menu" + ( showMenu ? "" : " Settings-hidden" )}>
                <button className="Settings-themeButton" onClick={toggleTheme}>Theme</button>
                <button className="Settings-wipe" onClick={wipeData}>Wipe Data</button>
            </div>
        </div>
    )
}

export default Settings;
