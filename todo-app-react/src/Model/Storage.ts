import Settings from './Settings';
import ItemCollection from './ItemCollection';

class Storage extends EventTarget
{
    settings: Settings = new Settings();
    itemCollection: ItemCollection = new ItemCollection();

    constructor()
    {
        super();
    }

    load()
    {

    }

    save()
    {

    }

    wipe()
    {

    }

    loadEvent()
    {

    }

    saveEvent()
    {

    }
}

export default Storage;