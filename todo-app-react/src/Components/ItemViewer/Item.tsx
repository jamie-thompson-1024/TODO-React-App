import { useCallback, useContext, useEffect, useState, useRef } from 'react';
import TodoContext from '../TodoContext';
import { Theme } from '../../Model/Todo';

import './Item.css';

interface ItemProps
{
    ID: number,
    name: string,
    desc: string,
    tags: string[],
    state: boolean,
}

enum EditMode
{
    NONE,
    TITLE,
    DESC,
    TAGS
}

function Item(props: ItemProps)
{
    const {itemCollection, settings} = useContext(TodoContext);
    const [expand, setExpand] = useState(itemCollection.selected === props.ID);
    const [editMode, setEditMode] = useState(EditMode.NONE);

    const editSvgLogoPath = useCallback((theme: Theme) => { 
        return `./Assets/pencil-logo-${theme.toString()}.svg`; 
    }, []);
    const [editSvgLogo, setEditSvgLogo] = useState(editSvgLogoPath(settings.theme));
    const updateTheme = useCallback(() => {
        setEditSvgLogo(editSvgLogoPath(settings.theme))
    }, [editSvgLogoPath, settings]);

    const tagsRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const descRef = useRef<HTMLInputElement>(null);

    const setName = useCallback(() => {
        if(itemCollection.selected === props.ID && editMode === EditMode.TITLE && nameRef.current)
            itemCollection.setName(nameRef.current.value);
        setEditMode(EditMode.NONE);
    }, [itemCollection, props.ID, editMode, nameRef]);

    const setDesc = useCallback(() => {
        if(itemCollection.selected === props.ID && editMode === EditMode.DESC && descRef.current)
            itemCollection.setDesc(descRef.current.value);
        setEditMode(EditMode.NONE);
    }, [itemCollection, props.ID, editMode, descRef]);

    const addTag = useCallback(() => {
        if(itemCollection.selected === props.ID && editMode === EditMode.TAGS && tagsRef.current)
        {
            itemCollection.addTag(tagsRef.current.value);
            tagsRef.current.value = ""
        }
        console.log("add Tag");
    }, [itemCollection, props.ID, editMode, tagsRef]);

    const removeTag = useCallback((oldTag: string) => {
        if(itemCollection.selected === props.ID && editMode === EditMode.TAGS)
            itemCollection.removeTag(oldTag);
    }, [itemCollection, props.ID, editMode]);

    const deleteThis = useCallback(() => {
        if(itemCollection.selected === props.ID)
            itemCollection.removeItem();
    }, [itemCollection, props.ID]);

    const selectResponse = useCallback(() => {
        setExpand(itemCollection.selected === props.ID);
    }, [itemCollection, props.ID]);

    const toggleThisState = useCallback((ev: any) => {
        if(itemCollection.selected === props.ID)
            itemCollection.setState(!props.state);
        ev.stopPropagation();
    }, [itemCollection, props.ID, props.state]);

    const toggleThisSelect = useCallback(() => {
        if(itemCollection.selected === props.ID)
            itemCollection.selectItem(-1);
        else
            itemCollection.selectItem(props.ID);
    }, [itemCollection, props.ID]);

    const stopPropigation = useCallback((ev: any) => {
        ev.stopPropagation();
    }, []);

    useEffect(() => {
        itemCollection.addEventListener('itemSelect', selectResponse);
        settings.addEventListener('themeChange', updateTheme);
        let tagRefc = tagsRef.current;
        let nameRefc = nameRef.current;
        let descRefc = descRef.current;
        
        if(tagRefc) tagRefc.onchange = addTag;
        if(nameRefc) nameRefc.onchange = setName;
        if(descRefc) descRefc.onchange = setDesc;
        return () => { 
            itemCollection.removeEventListener('itemSelect', selectResponse);
            settings.removeEventListener('themeChange', updateTheme);
        }
    }, [itemCollection, settings, selectResponse, tagsRef, nameRef, descRef, addTag, setName, setDesc, updateTheme]);

    return (
        <div className={"Item" + ( expand ? " Item-select" : "" )}>
            <div className="Item-bar" onClick={toggleThisSelect}>
                <div className="Item-nameContainer">
                    { (() => { if(editMode === EditMode.TITLE && expand) {
                        return (<input 
                            className="Item-tagInput" 
                            onClick={ stopPropigation }
                            ref={ nameRef } 
                            type="text"
                            defaultValue={props.name}></input>);
                    }else{
                        return (
                            <h3 className="Item-name">{ props.name }</h3>);
                    }})() }
                    <div 
                        className={"Item-editTag" + ( expand ? "" : " Item-hidden" )} 
                        onClick={(ev: any) => { 
                            setEditMode(
                                editMode === EditMode.TITLE ? EditMode.NONE : EditMode.TITLE);
                            ev.stopPropagation(); 
                        }}><img src={editSvgLogo} alt="edit"/></div>
                </div>
                <div 
                    className={
                        "Item-state"
                        + ( props.state ? " Item-complete" : " Item-incomplete")}
                    onClick={toggleThisState}></div>
            </div>
            <div className={"Item-expand" + ( expand ? "" : " Item-hidden" )}>
                <div className="Item-descContainer">
                    { (() => { if(editMode === EditMode.DESC) {
                        return (<input 
                            className="Item-tagInput" 
                            ref={ descRef } 
                            type="text"
                            defaultValue={props.desc}></input>);
                    }else{
                        return (
                            <p className="Item-desc">{ props.desc }</p>
                            );
                    }})() }
                    <div 
                        className="Item-editTag" 
                        onClick={() => { 
                            setEditMode(
                                editMode === EditMode.DESC ? EditMode.NONE : EditMode.DESC) 
                }}><img src={editSvgLogo} alt="edit"/></div>
               </div>
                <div className="Item-tags">
                    {
                        props.tags.map((tag, i) => {
                            return (
                                <div className="Item-tag" key={i}>
                                    { tag }
                                    { (() => { if(editMode === EditMode.TAGS) {
                                        return (<div 
                                            className="ItemForm-tag-del" 
                                            onClick={() => { 
                                                removeTag(tag);
                                            }}>x</div>);
                                    }})() }
                                </div>
                            )
                        })
                    }
                    <div 
                        className="Item-editTag" 
                        onClick={() => { 
                            setEditMode(
                                editMode === EditMode.TAGS ? EditMode.NONE : EditMode.TAGS) 
                        }}><img src={editSvgLogo} alt="edit"/></div>
                </div>
                { (() => { if(editMode === EditMode.TAGS) {
                    return (<input 
                        className="Item-tagInput" 
                        ref={ tagsRef } 
                        type="text"></input>);
                }})() }
                <div className="Item-options">
                    <button className="Item-options-del" onClick={deleteThis}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Item;
