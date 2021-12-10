import SearchBar from './SearchBar';
import ItemList from './ItemList';

import './ItemViewer.css';

function ItemViewer()
{
    return (
        <div className="ItemViewer">
            <SearchBar />
            <ItemList />
        </div>
    )
}

export default ItemViewer;
