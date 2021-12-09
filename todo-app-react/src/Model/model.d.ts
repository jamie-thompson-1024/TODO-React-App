
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
    setState: (newState: string) => ValidationMessage,
    addTag: (newTag: string) => ValidationMessage,
    removeTag: (tag: string) => ValidationMessage
}

enum ValidationMessage
{
    OK, EMPTY, INVALID_CHAR, DOESNT_EXIST
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
    LIGHT = 'theme-light',
    DARK = 'theme-dark'
}

export type {
    I_Item
};

export {
    ValidationMessage,
    ChangeAction,
    SortOrder,
    Theme
};
