import { 
    I_Item, 
    ItemJson, 
    ValidationMessage,
    allowedChars } from './Todo';

class Item implements I_Item
{
    ID: number
    name: string
    description: string
    creationTime: number = Date.now();
    lastModifiedTime: number = Date.now();
    completed: boolean = false;
    tags: Array<string>

    constructor(ID: number, name: string, desc: string, tags: Array<string>)
    {
        this.ID = ID;
        this.name = name;
        this.description = desc;
        this.tags = tags;
    }

    static fromJson(obj?: ItemJson): Item | undefined
    {
        if(!obj)
            return undefined;

        let item = new Item(
            obj.ID, 
            obj.name, 
            obj.description, 
            obj.tags.map((e) => e));

        item.creationTime = obj.creationTime;
        item.lastModifiedTime = obj.lastModifiedTime;
        item.completed = obj.completed;

        return item;
    }

    clone(): Item
    {
        let newItem = new Item(0, '', '', []);
        Object.assign(newItem, this);
        return newItem;
    }

    toJson(): ItemJson
    {
        return {
            ID: this.ID,
            name: this.name,
            description: this.description,
            creationTime: this.creationTime,
            lastModifiedTime: this.lastModifiedTime,
            completed: this.completed,
            tags: this.tags,
        };
    }

    setName(newName: string): ValidationMessage
    {
        let msg = Item.checkStringInput(newName);
        if(msg != ValidationMessage.OK)
            return msg;
        
        this.name = newName;
        this.lastModifiedTime = Date.now();
        return ValidationMessage.OK;
    }

    setDesc(newDesc: string): ValidationMessage
    {
        let msg = Item.checkStringInput(newDesc);
        if(msg != ValidationMessage.OK)
            return msg;
        
        this.description = newDesc;
        this.lastModifiedTime = Date.now();
        return ValidationMessage.OK;
    }

    setState(newState: boolean): ValidationMessage
    {
        this.completed = newState;
        this.lastModifiedTime = Date.now();
        return ValidationMessage.OK;
    }

    addTag(newTag: string): ValidationMessage
    {
        let msg = Item.checkStringInput(newTag);
        if(msg != ValidationMessage.OK)
            return msg;

        if(this.tags.includes(newTag))
            return ValidationMessage.ALREADY_EXISTS;

        this.tags.push(newTag);
        this.lastModifiedTime = Date.now();
        return ValidationMessage.OK;
    }

    removeTag(oldTag: string): ValidationMessage
    {
        if(oldTag.trim() === '')
            return ValidationMessage.EMPTY;
        if([...oldTag].some((char) => { return !allowedChars.includes(char); }))
            return ValidationMessage.INVALID_CHAR;

        let doesntExistFlag = true;
        this.tags = this.tags.filter((tag) => { 
            if(tag === oldTag)
                doesntExistFlag = false; 
            return tag != oldTag; });

        if(doesntExistFlag)
            return ValidationMessage.DOESNT_EXIST;

        this.lastModifiedTime = Date.now();
        return ValidationMessage.OK;
    }

    static checkStringInput(input: string): ValidationMessage
    {
        if(input.trim() === '')
            return ValidationMessage.EMPTY;
        if([...input].some((char) => { return !allowedChars.includes(char); }))
            return ValidationMessage.INVALID_CHAR;

        return ValidationMessage.OK;
    }

}

export default Item;
