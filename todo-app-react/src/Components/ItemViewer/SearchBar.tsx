import { useCallback, useContext, useEffect, useState, useRef } from 'react';
import TodoContext from '../TodoContext';
import { Theme } from '../../Model/Todo';

import './SearchBar.css';

function SearchBar()
{
    const {itemCollection, settings} = useContext(TodoContext);

    const searchSvgLogoPath = useCallback((theme: Theme) => { 
        return `./Assets/search-logo-${theme.toString()}.svg`; 
    }, []);
    const [searchSvgLogo, setSearchSvgLogo] = useState(searchSvgLogoPath(settings.theme));
    const updateTheme = useCallback(() => {
        setSearchSvgLogo(searchSvgLogoPath(settings.theme))
    }, [searchSvgLogoPath, settings]);

    const searchRef = useRef<HTMLInputElement>(null);
    const search = useCallback(() => {
        if(searchRef.current)
        {
            itemCollection.setSearchParams(searchRef.current.value ?? "");
            console.log(searchRef.current.value);
        }
    },[itemCollection, searchRef]);

    useEffect(() => {
        settings.addEventListener('themeChange', updateTheme);
        return () => {
            settings.removeEventListener('themeChange', updateTheme);
        }
    }, [settings, updateTheme]);

    return (
        <div className="SearchBar">
            <div className="SearchBar-bar">
                <button 
                    className="SearchBar-searchButton"
                    onClick={search}>
                    <img src={searchSvgLogo} alt="search"></img>
                </button>
                <input 
                    type="text" 
                    className="SearchBar-searchInput"
                    ref={searchRef}></input>
            </div>
            <div className="SearchBar-sortOptions">

            </div>
        </div>
    )
}

export default SearchBar;
