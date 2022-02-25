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

    static fromJson(obj?: ItemCollectionJson): ItemCollection
    {
        let itemCol = new ItemCollection();

        // if data object given convert items/changes intertively to Item / Change objects
        if(obj)
        {
            itemCol.lastID = obj.lastID;

            itemCol.items = (
                obj.items.map((item) => { 
                    return Item.fromJson(item); })
                .filter((item) => { 
                    return item; })) as Item[];

            itemCol.changes = (
                obj.changes.map((change) => { 
                    return Change.fromJson(change); })
                .filter((change) => { 
                    return change; })) as Change[];

            itemCol.undoneChanges = (
                obj.undoneChanges.map((change) => { 
                    return Change.fromJson(change); })
                .filter((change) => { 
                    return change; })) as Change[];
        }
        
        // reset search params
        itemCol.setSearchParams('', SortOrder.ASC_DATE_ADDED);

        return itemCol;
    }

    toJson(): ItemCollectionJson
    {
        // itertively convert items/changes to raw json objects
        return {
            items: this.items.map((item) => { return item.toJson(); }),
            changes: this.changes.map((change) => { return change.toJson(); }),
            undoneChanges: this.undoneChanges.map((change) => { return change.toJson(); }),
            lastID: this.lastID
        };
    }

    selectItem(ID: number): ValidationMessage
    {
        // find item with ID
        let item = this.items.find((item) => { return item.ID === ID; });

        // if item exists set selected ID and give OK message
        if(item)
        {
            this.selected = ID;
            this.selectEvent(item);
            return ValidationMessage.OK;
        }

        // if item doesnt exist set selected -1 and given doesnt_exist message
        this.selected = -1;
        this.selectEvent();
        return ValidationMessage.DOESNT_EXIST;
    }
    
    removeItem(ID?: number): ValidationMessage
    {
        if(!ID)
            ID = this.selected;
        
        let item = this.items.find((item) => { return item.ID === ID; });
        if(item)
        {
            this.items = this.items.filter((f_item) => { return f_item !== item });

            let change = new Change(
                ChangeAction.REMOVE_ITEM,
                { oldValue: item.clone() }
            );
            this.changes.push(change);
            this.changeEvent(change);
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

        if(errorList.some((msg) => { return msg !== ValidationMessage.OK }))
            return errorList;
        
        let item = new Item( this.createID(), name, desc, tags );
        this.items.push( item );

        let change = new Change(
            ChangeAction.ADD_ITEM,
            { newValue: item.clone() }
        );
        this.changes.push(change);
        this.changeEvent(change);
        this.selectItem(item.ID);

        return errorList;
    }

    undo(change?: Change): ValidationMessage
    {
        if(!change)
        {
            change = this.changes.pop();

            if(!change)
                return ValidationMessage.DOESNT_EXIST;

            this.undoneChanges.push(change);
        }

        let item;
        let tagAdded;
        
        switch(change.action)
        {
            case ChangeAction.ADD_ITEM:
                this.items = this.items.filter(({ID}) => {
                    return change?.newValue?.ID ?? -1 !== ID;
                });
                break;
            case ChangeAction.ADD_TAG:
                tagAdded = change?.newValue?.tags.find((tag) => {
                    return !change?.oldValue?.tags.includes(tag);
                });

                item = this.getItem(change?.newValue?.ID ?? -1);
                
                if(tagAdded && item)
                    item.removeTag(tagAdded);

                break;
            case ChangeAction.REMOVE_ITEM:
                item = change.oldValue?.clone();
                if(item)
                    this.items.push(item)
                break;
            case ChangeAction.REMOVE_TAG:
                tagAdded = change?.oldValue?.tags.find((tag) => {
                    return !change?.newValue?.tags.includes(tag);
                });

                item = this.getItem(change?.newValue?.ID ?? -1);
                
                if(tagAdded && item)
                    item.addTag(tagAdded);

                break;
            case ChangeAction.SET_DESC:
                item = this.getItem(change?.newValue?.ID ?? -1);
                if(item)
                    item.description = change?.oldValue?.description ?? item.description;
                break;
            case ChangeAction.SET_NAME:
                item = this.getItem(change?.newValue?.ID ?? -1);
                if(item)
                    item.name = change?.oldValue?.name ?? item.name;
                break;
            case ChangeAction.SET_STATE:
                item = this.getItem(change?.newValue?.ID ?? -1);
                if(item)
                    item.completed = change?.oldValue?.completed ?? item.completed;
                break;
        }

        this.changeEvent(change);

        return ValidationMessage.OK;
    }

    redo(change?: Change): ValidationMessage
    {
        if(!change)
        {
            change = this.undoneChanges.pop();
            
            if(!change)
                return ValidationMessage.DOESNT_EXIST;

            this.changes.push(change);
        }

        let item;
        let tagAdded;
        
        switch(change.action)
        {
            case ChangeAction.ADD_ITEM:
                item = change.newValue?.clone();
                if(item)
                    this.items.push(item)
                break;
            case ChangeAction.ADD_TAG:
                tagAdded = change?.newValue?.tags.find((tag) => {
                    return !change?.oldValue?.tags.includes(tag);
                });

                item = this.getItem(change?.newValue?.ID ?? -1);
                console.log(item); console.log(tagAdded);
                if(tagAdded && item)
                    item.addTag(tagAdded);

                break;
            case ChangeAction.REMOVE_ITEM:
                this.items = this.items.filter(({ID}) => {
                    return change?.oldValue?.ID ?? -1 !== ID;
                });
                break;
            case ChangeAction.REMOVE_TAG:
                tagAdded = change?.oldValue?.tags.find((tag) => {
                    return !change?.newValue?.tags.includes(tag);
                });

                item = this.getItem(change?.newValue?.ID ?? -1);
                
                if(tagAdded && item)
                    item.removeTag(tagAdded);

                break;
            case ChangeAction.SET_DESC:
                item = this.getItem(change?.newValue?.ID ?? -1);
                if(item)
                    item.description = change?.newValue?.description ?? item.description;
                break;
            case ChangeAction.SET_NAME:
                item = this.getItem(change?.newValue?.ID ?? -1);
                if(item)
                    item.name = change?.newValue?.name ?? item.name;
                break;
            case ChangeAction.SET_STATE:
                item = this.getItem(change?.newValue?.ID ?? -1);
                if(item)
                    item.completed = change?.newValue?.completed ?? item.completed;
                break;
        }

        this.changeEvent(change);

        return ValidationMessage.OK;
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

    setSearchParams(filter?: string, order?: SortOrder): ValidationMessage
    {
        if(filter !== undefined)
            this.filter = filter;
        if(order !== undefined)
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
                default:
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

            let change = new Change(
                ChangeAction.SET_NAME,
                { oldValue: old, newValue: item.clone() }
            );
            this.changes.push(change);
            this.changeEvent(change);
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

            let change = new Change(
                ChangeAction.SET_DESC,
                { oldValue: old, newValue: item.clone() }
            );
            this.changes.push(change);
            this.changeEvent(change);
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

            let change = new Change(
                ChangeAction.SET_STATE,
                { oldValue: old, newValue: item.clone() }
            );
            this.changes.push(change);
            this.changeEvent(change);
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

            let change = new Change(
                ChangeAction.ADD_TAG,
                { oldValue: old, newValue: item.clone() }
            );
            this.changes.push( change );
            this.changeEvent( change );
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

            let change = new Change(
                ChangeAction.REMOVE_TAG,
                { oldValue: old, newValue: item.clone() }
            );
            this.changes.push( change );
            this.changeEvent( change );
            return msg;
        }

        return ValidationMessage.ITEM_NOT_SELECTED;
    }


    // === Events ===
    changeEvent(change?: Change)
    {
        this.setSearchParams();
        this.dispatchEvent(
            new CustomEvent<{change?: Change}>('itemChange', { detail: { change } })
        );
    }

    searchEvent()
    {
        this.dispatchEvent(
            new CustomEvent('itemSearch')
        );
    }

    selectEvent(item?: Item)
    {
        this.dispatchEvent(
            new CustomEvent<{item?: Item}>('itemSelect', { detail: { item } })
        );
    }

}

export default ItemCollection;
