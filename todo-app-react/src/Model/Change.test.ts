
import Change from './Change';
import Item from './Item';
import { ChangeAction } from './Todo';

describe('Change', () => {
    describe('Json conversion', () => {

        let initData: {changeAction: ChangeAction, changeData: {oldValue: Item, newValue: Item}};
        let change: Change;
        let time: number;

        beforeAll(() => {
            let itemNew = new Item(0, 'itemname', 'itemdesc', ['tag0']);
            let itemOld = Item.fromJson(itemNew.toJson());
            itemNew.setDesc('new desc');

            initData = {
                changeAction: ChangeAction.SET_DESC,
                changeData: {oldValue: itemOld, newValue: itemNew }
            };

            change = new Change(
                initData.changeAction,
                initData.changeData);

            time = Date.now();
        });

        test('toJson', () => {
            let expected = {
                time: change.time,
                action: change.action,
                oldValue: change.oldValue,
                newValue: change.newValue
            };

            expect(change.toJson()).toEqual(expected);
        });

        test('fromJson', () => {
            expect(Change.fromJson(change.toJson())).toEqual(change);
        });
    });
});
