import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { ValidationMessage } from '../../Model/Todo';
import TodoContext from '../TodoContext';
import './ItemForm.css';

function ItemForm()
{
    const nameRef = useRef<HTMLInputElement>(null);
    const descRef = useRef<HTMLTextAreaElement>(null);
    const tagsRef = useRef<HTMLInputElement>(null);

    const [tags, setTags] = useState<string[]>([]);

    const [errors, setErrors] = useState<ValidationMessage[]>([]);

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
            setErrors(msg);
            console.log(msg);

            setTags([]);
            tagsRef.current.value = '';
            descRef.current.value = '';
            nameRef.current.value = '';
        }
    }, [nameRef, descRef, tagsRef, TodoStorage, tags, setErrors]);

    useEffect(() => {
        if(tagsRef.current)
            tagsRef.current.onchange = addTag;
    }, [tagsRef, addTag]);

    return (
        <div className="ItemForm">
            <h2 className="ItemForm-Heading">Create Item</h2>
            <label htmlFor="ItemForm-nameInput">
                Name: <p className="ItemForm-errorMessage">{
                    errors[0] === ValidationMessage.EMPTY ? "Required field" :
                    errors[0] === ValidationMessage.INVALID_CHAR ? "Invalid Characters" :
                    errors[0] === ValidationMessage.ALREADY_EXISTS ? "Name already taken" : ""
                }</p>
            </label>
            <input id="ItemForm-nameInput" className="ItemForm-nameInput" ref={nameRef} type="text"></input>
            <label htmlFor="ItemForm-descInput">
                Description: <p className="ItemForm-errorMessage">{
                    errors[1] === ValidationMessage.EMPTY ? "Required field" :
                    errors[1] === ValidationMessage.INVALID_CHAR ? "Invalid Characters" :
                    errors[1] === ValidationMessage.ALREADY_EXISTS ? "Name already taken" : ""
                }</p>
            </label>
            <textarea id="ItemForm-descInput" className="ItemForm-descInput" ref={descRef}></textarea>
            <label htmlFor="ItemForm-tagInput">
                Tags: <p className="ItemForm-errorMessage">{
                    errors.some((e, i) => { 
                        return (i >= 2) && (e === ValidationMessage.INVALID_CHAR) 
                    }) ? "Invalid Characters" : ""
                }</p>
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
