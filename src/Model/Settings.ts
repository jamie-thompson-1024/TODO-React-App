import { Theme, availableThemes, SettingsJson } from './Todo';

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
        this.theme = theme;
        this.themeChangeEvent();
    }

    getThemes(): Array<Theme>
    {
        return availableThemes;
    }

    themeChangeEvent()
    {
        this.dispatchEvent(
            new CustomEvent<{theme: Theme}>('themeChange', { detail: {theme: this.theme} })
        );
    }

    static fromJson(obj?: SettingsJson): Settings
    {
        let settings = new Settings();
        if(obj)
            settings.theme = obj.theme;
        return settings;
    }

    toJson(): SettingsJson
    {
        return {
            theme: this.theme
        };
    }
}

export default Settings;
