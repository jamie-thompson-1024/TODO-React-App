
import Settings from './Settings';
import { Theme } from './Todo';

describe('Settings', () => {
    describe('Json conversion', () => {

        let initData: {theme: Theme};
        let settings: Settings;
        let time: number;

        beforeEach(() => {
            initData = {
                theme: Theme.DARK
            };

            settings = new Settings();
            settings.theme = initData.theme;

            time = Date.now();
        });

        test('toJson', () => {
            let expected = {
                theme: settings.theme
            };

            expect(settings.toJson()).toEqual(expected);
        });

        test('fromJson', () => {
            expect(Settings.fromJson(settings.toJson())).toEqual(settings);
        });
    });
    describe('events', () => {
        
        let initData: {theme: Theme};
        let settings: Settings;
        let time: number;

        beforeEach(() => {
            initData = {
                theme: Theme.DARK
            };

            settings = new Settings();
            settings.theme = initData.theme;

            time = Date.now();
        });

        test('theme change', (done) => {
            settings.addEventListener('themeChange', () => {
                done();
            });

            settings.setTheme(Theme.LIGHT);
            expect(settings.theme).toEqual(Theme.LIGHT);
        });
    })
});
