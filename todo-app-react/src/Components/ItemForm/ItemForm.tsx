import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import TodoContext from '../TodoContext';
import './ItemForm.css';

function ItemForm()
{
    const nameRef = useRef<HTMLInputElement>(null);
    const descRef = useRef<HTMLTextAreaElement>(null);
    const tagsRef = useRef<HTMLInputElement>(null);

    const [tags, setTags] = useState<string[]>([]);

    const TodoStorage = useContext(TodoContext);

    const addTag = useCallback(() => {
        if(tagsRef.current)
        {
            tags.push(tagsRef.current.value);
            setTags(tags.map((e) => e));
            tagsRef.current.value = '';
        }
    }, [tagsRef, tags]);

    const removeTag = useCallback((index: number) => {
        tags.splice(index, 1);
        setTags(tags.map((e) => e));
    }, [tags]);

    const submitItem = useCallback(() => {
        if(nameRef.current && descRef.current && tagsRef.current)
        {
            let msg = TodoStorage.itemCollection.createItem(
                nameRef.current.value, descRef.current.value, tags.map((e) => e)
            );
            console.log(msg);

            setTags([]);
            tagsRef.current.value = '';
            descRef.current.value = '';
            nameRef.current.value = '';
        }
    }, [nameRef, descRef, tagsRef, TodoStorage, tags]);

    useEffect(() => {
        if(tagsRef.current)
            tagsRef.current.onchange = addTag;
    }, [tagsRef, addTag]);

    return (
        <div className="ItemForm">
            <h2 className="ItemForm-Heading">Create Item</h2>
            <label htmlFor="ItemForm-nameInput">
                Name: 
            </label>
            <input id="ItemForm-nameInput" className="ItemForm-nameInput" ref={nameRef} type="text"></input>
            <label htmlFor="ItemForm-descInput">
                Description: 
            </label>
            <textarea id="ItemForm-descInput" className="ItemForm-descInput" ref={descRef}></textarea>
            <label htmlFor="ItemForm-tagInput">
                Tags: 
            </label>
            <div className={ "ItemForm-tags" + (tags.length > 0) ? "" : "ItemForm-display-none" }>
                {
                    tags.map((tag, i) => {
                        return (
                            <div className="ItemForm-tag" key={i}>
                                { tag }
                                <div 
                                    className="ItemForm-tag-del" 
                                    onClick={() => { 
                                        removeTag(i);
                                    }}>x</div>
                            </div>
                        );
                    })
                }
            </div>
            <input
                id="ItemForm-tagInput" 
                className="ItemForm-tagInput" 
                ref={tagsRef} 
                type="text"></input>
            <button 
                className="ItemForm-submitInput" 
                onClick={() => { submitItem(); }}> Add Item </button>
        </div>
    )
}

export default ItemForm;
