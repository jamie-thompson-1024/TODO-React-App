import { ChangeAction, ChangeJson, ChangeData } from './Todo';
import Item from './Item';

class Change
{
    time: number;
    action: ChangeAction;
    oldValue?: Item;
    newValue?: Item;

    constructor(action: ChangeAction, data: ChangeData)
    {
        this.time = Date.now();
        this.action = action;
        this.oldValue = data.oldValue;
        this.newValue = data.newValue;
    }

    static fromJson(obj?: ChangeJson): Change | undefined
    {
        if(!obj)
            return undefined;

        let change = new Change(
            obj.action, 
            {
                oldValue: obj.oldValue ? Item.fromJson(obj.oldValue) : undefined, 
                newValue: obj.newValue ? Item.fromJson(obj.newValue) : undefined
            });
        change.time = obj.time;
        return change;
    }

    toJson(): ChangeJson
    {
        return {
            time: this.time,
            action: this.action,
            oldValue: this.oldValue?.toJson(),
            newValue: this.newValue?.toJson()
        };
    }
}

export default Change;
