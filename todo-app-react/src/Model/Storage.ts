import Settings from './Settings';
import ItemCollection from './ItemCollection';

import { TodoDataJson } from './Todo';

class TodoStorage extends EventTarget
{
    settings: Settings = new Settings();
    itemCollection: ItemCollection = new ItemCollection();

    constructor()
    {
        super();

        this.load();

        this.itemCollection.addEventListener(
            'itemChange', () => { this.save() });
        this.settings.addEventListener(
            'themeChange', () => { this.save() });
    }

    load()
    {

        let localObject: TodoDataJson | undefined
        let localObjectString = localStorage['todoData'] as string | undefined;
        if(localObjectString)
            localObject = JSON.parse(localObjectString) as TodoDataJson;
        this.settings = Settings.fromJson(localObject?.settings);
        this.itemCollection = ItemCollection.fromJson(localObject?.itemCollection);
        
        if(!localObject || !(localObject?.itemCollection) || !(localObject?.settings))
            this.save();
        
        this.loadEvent();
    }

    save()
    {
        localStorage['todoData'] = JSON.stringify({
            settings: this.settings.toJson(),
            itemCollection: this.itemCollection.toJson()
        } as TodoDataJson);

        this.saveEvent();
    }

    wipe()
    {
        localStorage.removeItem('todoData');

        this.load();
    }

    loadEvent()
    {
        this.dispatchEvent(
            new Event('load')
        );
    }

    saveEvent()
    {
        this.dispatchEvent(
            new Event('save')
        );
    }
}

export default TodoStorage;