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
        // get localstorage save object and apply to this object create new data if none saved
        let localObject: TodoDataJson | undefined
        let localObjectString = localStorage['todoData'] as string | undefined;
        if(localObjectString)
            localObject = JSON.parse(localObjectString) as TodoDataJson;
        this.settings = Settings.fromJson(localObject?.settings);
        this.itemCollection = ItemCollection.fromJson(localObject?.itemCollection);
        
        // if new data created save to localstorage
        if(!localObject || !(localObject?.itemCollection) || !(localObject?.settings))
            this.save();
        
        this.loadEvent();
    }

    save()
    {
        // stringify data and save in localstorage
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
        this.wipeEvent();
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

    wipeEvent()
    {
        this.dispatchEvent(
            new Event('wipe')
        );
    }
}

export default TodoStorage;