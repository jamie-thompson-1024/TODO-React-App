import { I_Item, ValidationMessage } from './model';

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

    static fromJson(obj: Object): Item | undefined
    {
        return undefined;
    }

    toJson(): Object
    {
        return {};
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

}

export default Item;
