import { I_Item, SortOrder, ValidationMessage, ItemCollectionJson, ChangeAction } from './Todo';
import Item from './Item';
import Change from './Change';

class ItemCollection extends EventTarget implements I_Item
{
    items: Array<Item> = [];
    selected: number = -1;
    changes: Array<Change> = [];
    undoneChanges: Array<Change> = [];

    lastID: number = 0;

    searchItems: Array<Item> = [];
    filter: string = '';
    order: SortOrder = SortOrder.ASC_DATE_ADDED;

    constructor()
    {
        super();
        this.setSearchParams('', SortOrder.ASC_DATE_ADDED);
    }

    static fromJson(obj?: ItemCollectionJson): ItemCollection | undefined
    {
        if(!obj)
            return undefined;
        
        let itemCol = new ItemCollection();

        itemCol.selected = obj.selected;
        itemCol.lastID = obj.lastID;

        itemCol.items = <Item[]>(
            obj.items.map((item) => { 
                return Item.fromJson(item); })
            .filter((item) => { 
                return item; }));

        itemCol.changes = <Change[]>(
            obj.changes.map((change) => { 
                return Change.fromJson(change); })
            .filter((change) => { 
                return change; }));

        itemCol.undoneChanges = <Change[]>(
            obj.undoneChanges.map((change) => { 
                return Change.fromJson(change); })
            .filter((change) => { 
                return change; }));
        
        return itemCol;
    }

    toJson(): ItemCollectionJson
    {
        return {
            items: this.items.map((item) => { return item.toJson(); }),
            selected: this.selected,
            changes: this.changes.map((change) => { return change.toJson(); }),
            undoneChanges: this.changes.map((change) => { return change.toJson(); }),
            lastID: this.lastID
        };
    }

    selectItem(ID: number): ValidationMessage
    {
        let item = this.items.find((item) => { return item.ID === ID; });
        if(item)
        {
            this.selected = ID;
            this.selectEvent(item);
            return ValidationMessage.OK;
        }

        return ValidationMessage.DOESNT_EXIST;
    }
    
    removeItem(ID?: number): ValidationMessage
    {
        if(!ID)
            ID = this.selected;
        
        let item = this.items.find((item) => { return item.ID === ID; });
        if(item)
        {
            this.items = this.items.filter((f_item) => { return f_item != item });

            this.changes.push( new Change(
                ChangeAction.REMOVE_ITEM,
                { oldValue: item.clone() }
            ));

            this.changeEvent(item);
            return ValidationMessage.OK;
        }

        return ValidationMessage.DOESNT_EXIST;
    }

    createItem(name: string, desc: string, tags: Array<string>): Array<ValidationMessage>
    {
        let errorList: ValidationMessage[] = [];

        errorList[0] = Item.checkStringInput(name);
        errorList[1] = Item.checkStringInput(desc);
        tags.forEach((tag, i) => {
            errorList[i + 2] = Item.checkStringInput(tag);
        });

        if(errorList.some((msg) => { return msg != ValidationMessage.OK }))
            return errorList;
        
        let item = new Item( this.createID(), name, desc, tags );
        this.items.push( item );

        this.changes.push( new Change(
            ChangeAction.ADD_ITEM,
            { newValue: item.clone() }
        ));

        this.changeEvent(item);

        return errorList;
    }

    undo(change?: Change)
    {
        if(!change)
        {
            if(this.changes.length > 0)
                change = this.changes[this.changes.length - 1];
            else
                return;
        }

        switch(change.action)
        {
            case ChangeAction.ADD_ITEM:
                if(change.newValue)
                {
                    let item = this.getItem(change.newValue.ID);
                    if(!item)
                        break;
                    this.items
                }
                break;
            case ChangeAction.ADD_TAG:
                break;
            case ChangeAction.REMOVE_ITEM:
                break;
            case ChangeAction.REMOVE_TAG:
                break;
            case ChangeAction.SET_DESC:
                break;
            case ChangeAction.SET_NAME:
                break;
            case ChangeAction.SET_STATE:
                break;
            default:
                
        }
    }

    redo(change?: Change)
    {
        switch(change?.action)
        {
            case ChangeAction.ADD_ITEM:
                break;
            case ChangeAction.ADD_TAG:
                break;
            case ChangeAction.REMOVE_ITEM:
                break;
            case ChangeAction.REMOVE_TAG:
                break;
            case ChangeAction.SET_DESC:
                break;
            case ChangeAction.SET_NAME:
                break;
            case ChangeAction.SET_STATE:
                break;
            default:
                
        }
    }

    createID(): number
    {
        return this.lastID++;
    }

    getItem(ID: number): Item | undefined
    {
        return this.items.find((item) => {
            return item.ID === ID;
        });
    }

    setSearchParams(filter: string, order: SortOrder): ValidationMessage
    {
        this.filter = filter;
        this.order = order;

        this.searchItems = this.items.filter((item) => {
            return item.name.includes(this.filter);
        }).sort((a: Item, b: Item) => {
            switch(this.order)
            {
                case SortOrder.ASC_DATE_ADDED:
                    return a.creationTime - b.creationTime;
                case SortOrder.ASC_DATE_MODIFIED:
                    return a.lastModifiedTime - b.lastModifiedTime;
                case SortOrder.ASC_NAME:
                    if(a.name.toUpperCase() < b.name.toUpperCase())
                        return -1;
                    if(a.name.toUpperCase() > b.name.toUpperCase())
                        return 1;
                    return 0;
                case SortOrder.DSC_DATE_ADDED:
                    return b.creationTime - a.creationTime;
                case SortOrder.DSC_DATE_MODIFIED:
                    return b.lastModifiedTime - a.lastModifiedTime;
                case SortOrder.DSC_NAME:
                    if(a.name.toUpperCase() < b.name.toUpperCase())
                        return 1;
                    if(a.name.toUpperCase() > b.name.toUpperCase())
                        return -1;
                    return 0;
            }
        });

        this.searchEvent();
        return ValidationMessage.OK;
    }

    getSearchItems(): Array<Item>
    {
        return this.searchItems;
    }

    // === Item Getter/Setters ===
    get ID(): number
    {
        return this.selected;
    }

    get name(): string
    {
        return this.getItem(this.selected)?.name || '';
    }

    get completed(): boolean
    {
        return this.getItem(this.selected)?.completed || false;
    }

    get description(): string
    {
        return this.getItem(this.selected)?.description || '';
    }
    
    get creationTime(): number
    {
        return this.getItem(this.selected)?.creationTime || -1;
    }
    
    get lastModifiedTime(): number
    {
        return this.getItem(this.selected)?.lastModifiedTime || -1;
    }

    get tags(): Array<string>
    {
        return this.getItem(this.selected)?.tags || [];
    }

    setName(newName: string): ValidationMessage
    {
        let item = this.getItem(this.selected);

        if(item)
        {
            let old = item.clone();
            let msg = item.setName(newName);

            this.changes.push( new Change(
                ChangeAction.SET_NAME,
                { oldValue: old, newValue: item.clone() }
            ));
            this.changeEvent(item);
            return msg;
        }

        return ValidationMessage.ITEM_NOT_SELECTED;
    }

    setDesc(newDesc: string): ValidationMessage
    {
        let item = this.getItem(this.selected);

        if(item)
        {
            let old = item.clone();
            let msg = item.setDesc(newDesc);

            this.changes.push( new Change(
                ChangeAction.SET_DESC,
                { oldValue: old, newValue: item.clone() }
            ));
            this.changeEvent(item);
            return msg;
        }

        return ValidationMessage.ITEM_NOT_SELECTED;
    }

    setState(newState: boolean): ValidationMessage
    {
        let item = this.getItem(this.selected);

        if(item)
        {
            let old = item.clone();
            let msg = item.setState(newState);

            this.changes.push( new Change(
                ChangeAction.SET_STATE,
                { oldValue: old, newValue: item.clone() }
            ));
            this.changeEvent(item);
            return msg;
        }

        return ValidationMessage.ITEM_NOT_SELECTED;
    }

    addTag(newTag: string): ValidationMessage
    {
        let item = this.getItem(this.selected);

        if(item)
        {
            let old = item.clone();
            let msg = item.addTag(newTag);

            this.changes.push( new Change(
                ChangeAction.ADD_TAG,
                { oldValue: old, newValue: item.clone() }
            ));
            this.changeEvent(item);
            return msg;
        }

        return ValidationMessage.ITEM_NOT_SELECTED;
    }

    removeTag(tag: string): ValidationMessage
    {
        let item = this.getItem(this.selected);

        if(item)
        {
            let old = item.clone();
            let msg = item.removeTag(tag);

            this.changes.push( new Change(
                ChangeAction.REMOVE_TAG,
                { oldValue: old, newValue: item.clone() }
            ));
            this.changeEvent(item);
            return msg;
        }

        return ValidationMessage.ITEM_NOT_SELECTED;
    }


    // === Events ===
    changeEvent(item: Item)
    {
        this.dispatchEvent(
            new CustomEvent<{item: Item}>('itemChange', { detail: { item } })
        );
    }

    searchEvent()
    {
        this.dispatchEvent(
            new CustomEvent('itemSearch')
        );
    }

    selectEvent(item: Item)
    {
        this.dispatchEvent(
            new CustomEvent<{item: Item}>('itemSelect', { detail: { item } })
        );
    }

}

export default ItemCollection;
