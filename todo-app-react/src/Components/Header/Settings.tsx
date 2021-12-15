import { useState, useCallback, useContext, useEffect } from 'react';
import TodoContext from '../TodoContext';
import { Theme } from '../../Model/Todo';

import './Settings.css';

function Settings()
{
    const { settings } = useContext(TodoContext);

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

            </div>
        </div>
    )
}

export default Settings;
