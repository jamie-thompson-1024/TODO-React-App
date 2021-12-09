import { I_Item, SortOrder, ValidationMessage } from './model';
import Item from './Item';
import Change from './Change';

class ItemCollection extends EventTarget implements I_Item
{
    items: Array<Item> = [];
    selected: number = -1;

    changes: Array<Change> = [];
    undoneChanges: Array<Change> = [];

    lastID: number = 0;

    constructor()
    {
        super();
    }

    static fromJson(obj: Object): ItemCollection | undefined
    {
        return undefined;
    }

    toJson(): Object
    {
        return {};
    }

    selectItem(ID: number): ValidationMessage
    {
        return ValidationMessage.OK;
    }
    
    removeItem(ID?: number): ValidationMessage
    {
        return ValidationMessage.OK;
    }

    createItem(name: string, desc: string, tags: Array<string>): Array<ValidationMessage>
    {
        return [];
    }

    undo(change?: Change)
    {

    }

    redo(change?: Change)
    {

    }

    createID(): number
    {
        return this.lastID++;
    }

    getItem(ID: number): Item | undefined
    {
        return;
    }

    setSearchParams(filter: string, order: SortOrder): ValidationMessage
    {
        return ValidationMessage.OK;
    }

    getSearchItems(): Array<Item>
    {
        return [];
    }

    // === Item Getter/Setters ===
    get ID(): number
    {
        return -1;
    }

    get name(): string
    {
        return '';
    }

    get completed(): boolean
    {
        return false;
    }

    get description(): string
    {
        return '';
    }
    
    get creationTime(): number
    {
        return -1;
    }
    
    get lastModifiedTime(): number
    {
        return -1;
    }

    get tags(): Array<string>
    {
        return [];
    }

    setName(newName: string): ValidationMessage
    {
        return ValidationMessage.OK;
    }

    setDesc(newDesc: string): ValidationMessage
    {
        return ValidationMessage.OK;
    }

    setState(newState: string): ValidationMessage
    {
        return ValidationMessage.OK;
    }

    addTag(newTag: string): ValidationMessage
    {
        return ValidationMessage.OK;
    }

    removeTag(tag: string): ValidationMessage
    {
        return ValidationMessage.OK;
    }


    // === Events ===
    changeEvent(item: Item)
    {

    }

    searchEvent()
    {

    }

    selectEvent(item: Item)
    {

    }

}

export default ItemCollection;
