import { useEffect, useRef, useState } from 'react';
import './ItemForm.css';

function ItemForm()
{
    const nameRef = useRef<HTMLInputElement>(null);
    const descRef = useRef<HTMLTextAreaElement>(null);
    const tagsRef = useRef<HTMLInputElement>(null);

    const [tags, setTags] = useState<string[]>([]);

    function addTag()
    {
        if(tagsRef.current)
        {
            tags.push(tagsRef.current.value);
            setTags(tags.map((e) => e));
        }
    }

    function removeTag(index: number)
    {
        tags.splice(index, 1);
        setTags(tags.map((e) => e));
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
            <button className="ItemForm-submitInput"> Add Item </button>
        </div>
    )
}

export default ItemForm;
