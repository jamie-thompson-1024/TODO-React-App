import { useCallback, useContext, useEffect, useState, useRef } from 'react';
import TodoContext from '../TodoContext';
import { SortOrder, Theme } from '../../Model/Todo';

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
    const orderRef = useRef<HTMLSelectElement>(null);
    const search = useCallback(() => {
        if(searchRef.current && orderRef.current)
        {
            itemCollection.setSearchParams(
                searchRef.current.value ?? "",
                orderRef.current.value as SortOrder ?? SortOrder.ASC_DATE_ADDED);
            console.log(searchRef.current.value);
        }
    },[itemCollection, searchRef]);
    
    const undoChange = useCallback(() => {
        itemCollection.undo();
    }, [itemCollection]);

    const redoChange = useCallback(() => {
        itemCollection.redo();
    }, [itemCollection]);

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
            <div className="SearchBar-options">
                <div className="SearchBar-SortOptions">
                    <label htmlFor="sortOrderOption">Order: </label>
                    <select id="sortOrderOption" ref={orderRef}>
                        <option value={SortOrder.ASC_DATE_ADDED}>Created Asc</option>
                        <option value={SortOrder.DSC_DATE_ADDED}>Created Dsc</option>
                        <option value={SortOrder.ASC_NAME}>Name Asc</option>
                        <option value={SortOrder.DSC_NAME}>Name Dsc</option>
                        <option value={SortOrder.ASC_DATE_MODIFIED}>Modified Asc</option>
                        <option value={SortOrder.DSC_DATE_MODIFIED}>Modified Dsc</option>
                    </select>
                </div>
                <div className="SearchBar-undoRedoControls">
                    <button className="SearchBar-undoRedoButton" onClick={undoChange}>
                        undo
                    </button>
                    <button className="SearchBar-undoRedoButton" onClick={redoChange}>
                        redo
                    </button>
                </div>
            </div>

        </div>
    )
}

export default SearchBar;
