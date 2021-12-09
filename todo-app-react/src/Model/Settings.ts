import { Theme } from './model';

class Settings extends EventTarget
{
    theme: Theme;

    constructor()
    {
        super();
        
        this.theme = Theme.DARK;
    }

    setTheme(theme: Theme)
    {
        
    }

    getThemes(): Array<Theme>
    {
        return [];
    }

    themeChangeEvent()
    {

    }

    static fromJson(obj: Object): Settings | undefined
    {
        return undefined;
    }

    toJson(): Object
    {
        return {};
    }
}

export default Settings;
