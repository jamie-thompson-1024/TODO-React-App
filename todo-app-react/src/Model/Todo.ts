
import Item from './Item';

const allowedChars = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 
    '-', '_', '+', '=', '*', ' ', 
];

interface ItemJson
{
    ID: number
    name: string
    description: string
    creationTime: number;
    lastModifiedTime: number;
    completed: boolean;
    tags: Array<string>
}

interface ItemCollectionJson
{
    items: Array<ItemJson>;
    selected: number;
    changes: Array<ChangeJson>;
    undoneChanges: Array<ChangeJson>;
    lastID: number;
}

interface SettingsJson
{
    theme: Theme
}

interface ChangeJson
{
    time: number;
    action: ChangeAction;
    oldValue?: ItemJson;
    newValue?: ItemJson;
}

interface ChangeData
{
    newValue?: Item, 
    oldValue?: Item
}

interface I_Item
{
    ID: number,
    name: string,
    description: string,
    creationTime: number,
    lastModifiedTime: number,
    completed: boolean,
    tags: Array<string>,

    setName: (newName: string) => ValidationMessage,
    setDesc: (newDesc: string) => ValidationMessage,
    setState: (newState: boolean) => ValidationMessage,
    addTag: (newTag: string) => ValidationMessage,
    removeTag: (tag: string) => ValidationMessage
}

enum ValidationMessage
{
    OK, EMPTY, INVALID_CHAR, DOESNT_EXIST, ALREADY_EXISTS, ITEM_NOT_SELECTED
}

enum ChangeAction
{
    REMOVE_ITEM, ADD_ITEM, 
    SET_NAME, SET_DESC, SET_STATE, 
    ADD_TAG, REMOVE_TAG
}

enum SortOrder
{
    ASC_NAME, DSC_NAME,
    ASC_DATE_ADDED, DSC_DATE_ADDED,
    ASC_DATE_MODIFIED, DSC_DATE_MODIFIED
}

enum Theme
{
    LIGHT = 'light',
    DARK = 'dark'
}

const availableThemes = [
    Theme.LIGHT,
    Theme.DARK
];

export type {
    I_Item,
    ItemJson,
    SettingsJson,
    ChangeJson,
    ChangeData,
    ItemCollectionJson
};

export {
    ValidationMessage,
    ChangeAction,
    SortOrder,
    Theme,
    allowedChars,
    availableThemes
};
