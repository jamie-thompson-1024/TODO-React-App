import Item from './Item';
import ItemModel from '../../Model/Item';

import './ItemList.css';

function ItemList()
{
    const items: Array<ItemModel> = [];

    return (
        <div className="ItemList">
            {
                items.map((item: ItemModel) => {
                    return <Item />;
                })
            }
        </div>
    )
}

export default ItemList;
