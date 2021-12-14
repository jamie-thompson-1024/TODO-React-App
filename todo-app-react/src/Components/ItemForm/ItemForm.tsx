import { useContext, useEffect, useRef, useState } from 'react';
import TodoContext from '../TodoContext';
import './ItemForm.css';

function ItemForm()
{
    const nameRef = useRef<HTMLInputElement>(null);
    const descRef = useRef<HTMLTextAreaElement>(null);
    const tagsRef = useRef<HTMLInputElement>(null);

    const [tags, setTags] = useState<string[]>([]);

    const TodoStorage = useContext(TodoContext);

    function addTag()
    {
        if(tagsRef.current)
        {
            tags.push(tagsRef.current.value);
            setTags(tags.map((e) => e));
            tagsRef.current.value = '';
        }
    }

    function removeTag(index: number)
    {
        tags.splice(index, 1);
        setTags(tags.map((e) => e));
    }

    function submitItem()
    {
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
    }

    useEffect(() => {
        if(tagsRef.current)
        {
            tagsRef.current.onchange = () => { addTag(); }
        }
    // eslint-disable-next-line
    }, [tags]);

    return (
        <div className="ItemForm">
            <input className="ItemForm-nameInput" ref={nameRef} type="text"></input>
            <textarea className="ItemForm-descInput" ref={descRef}></textarea>
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
