import { useCallback, useContext, useEffect, useState } from 'react';
import TodoContext from '../TodoContext';

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
    const itemCollection = useContext(TodoContext).itemCollection;
    const [expand, setExpand] = useState(false);
    const [editMode, setEditMode] = useState(EditMode.NONE);

    const setName = useCallback((newName: string) => {

    }, []);
    const setDesc = useCallback((newDesc: string) => {

    }, []);

    const addTag = useCallback((newTag: string) => {

    }, []);

    const removeTag = useCallback((oldTag: string) => {

    }, []);

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

    useEffect(() => {
        itemCollection.addEventListener('itemSelect', selectResponse);
        return () => { itemCollection.removeEventListener('itemSelect', selectResponse); }
    }, [itemCollection, selectResponse]);

    return (
        <div className={"Item" + ( expand ? " Item-select" : "" )}>
            <div className="Item-bar" onClick={toggleThisSelect}>
                <h3 className="Item-name">{ props.name }</h3>
                <div 
                    className={"Item-state" + ( props.state ? " Item-complete" : " Item-incomplete")}
                    onClick={toggleThisState}></div>
            </div>
            <div className={"Item-expand" + ( expand ? "" : " Item-hidden" )}>
                <p className="Item-desc">{ props.desc }</p>
                <div className="Item-tags">
                    {
                        props.tags.map((tag, i) => {
                            return (
                                <div className="Item-tag" key={i}>
                                    { tag }
                                    <div 
                                        className="ItemForm-tag-del" 
                                        onClick={() => { 
                                            removeTag(tag);
                                        }}>x</div>
                                </div>
                            )
                        })
                    }
                </div>
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
