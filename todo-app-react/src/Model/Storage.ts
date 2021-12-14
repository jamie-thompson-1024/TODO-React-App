import Settings from './Settings';
import ItemCollection from './ItemCollection';

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
    }

    load()
    {
        let doSave = false;

        if(!localStorage['todo-settings'])
            doSave = true;
        try
        {
            this.settings = Settings.fromJson(
                JSON.parse(localStorage['todo-settings'])) ?? this.settings;
        }
        catch
        {
            doSave = true;
        }

        if(!localStorage['todo-collection'])
            doSave = true;
        try
        {
            this.itemCollection = ItemCollection.fromJson(
                JSON.parse(localStorage['todo-collection'])) ?? this.itemCollection;
        }
        catch
        {
            doSave = true;
        }

        if(doSave)
            this.save();
        
        this.loadEvent();
    }

    save()
    {
        localStorage['todo-settings'] = JSON.stringify(this.settings.toJson());
        localStorage['todo-collection'] = JSON.stringify(this.itemCollection.toJson());

        this.saveEvent();
    }

    wipe()
    {
        localStorage.removeItem('todo-settings');
        localStorage.removeItem('todo-collection');

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