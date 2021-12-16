import Item from './Item';
import ItemModel from '../../Model/Item';
import TodoContext from '../TodoContext';

import { useCallback, useContext, useEffect, useState } from 'react';

import './ItemList.css';

function ItemList()
{
    const { itemCollection } = useContext(TodoContext);
    const [items, setItems] = useState(itemCollection.getSearchItems());

    const updateItems = useCallback(() => {
        setItems(itemCollection.getSearchItems());
        console.log(itemCollection);
    }, [setItems, itemCollection]);

    useEffect(() => {
        itemCollection.addEventListener('itemSearch', updateItems);
        return () => { itemCollection.removeEventListener('itemSearch', updateItems); }
    }, [itemCollection, updateItems]);

    return (
        <div className="ItemList">
            {
                items.map((item: ItemModel) => {
                    return <Item 
                        key={item.ID}
                        ID={item.ID}
                        name={item.name}
                        desc={item.description}
                        tags={item.tags}
                        state={item.completed} />;
                })
            }
        </div>
    )
}

export default ItemList;
