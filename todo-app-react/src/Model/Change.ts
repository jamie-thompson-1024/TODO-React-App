import { ChangeAction } from './Todo';
import Item from './Item';

class Change
{
    time: number;
    action: ChangeAction;
    oldValue?: Item;
    newValue?: Item;

    constructor(action: ChangeAction, data: {newValue?: Item, oldValue?: Item})
    {
        this.time = Date.now();
        this.action = action;
        this.oldValue = data.oldValue;
        this.newValue = data.newValue;
    }

    static fromJson(obj: Object): Change | undefined
    {
        return undefined;
    }

    toJson(): Object
    {
        return {};
    }
}

export default Change;
