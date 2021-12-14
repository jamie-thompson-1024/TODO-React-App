import Item from './Item';
import ItemModel from '../../Model/Item';
import TodoContext from '../TodoContext';

import { useContext } from 'react';

import './ItemList.css';

function ItemList()
{
    const itemCollection = useContext(TodoContext).itemCollection;
    let items = itemCollection.getSearchItems();
    console.log(itemCollection);
    console.log(items);

    itemCollection.addEventListener('itemSearch', 
        () => { items = itemCollection.getSearchItems(); console.log(items); });

    return (
        <div className="ItemList">
            {
                items.map((item: ItemModel) => {
                    return <Item 
                        key={item.ID}
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
