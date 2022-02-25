
import ItemCollection from './ItemCollection';
import { ItemCollectionJson, SortOrder, ValidationMessage } from './Todo';

describe('ItemCollection', () => {
    describe('constructor', () => {
        
        let itemCol: ItemCollection;

        describe('empty', () => {
            beforeAll(() => {
                itemCol = new ItemCollection();
            });

            test('items', () => {
                expect(itemCol.items).toHaveLength(0);
            });

            test('selected', () => {
                expect(itemCol.selected).toEqual(-1);
            });

            test('changes', () => {
                expect(itemCol.changes).toHaveLength(0);
            });

            test('undoneChanges', () => {
                expect(itemCol.undoneChanges).toHaveLength(0);
            });

            test('lastID', () => {
                expect(itemCol.lastID).toEqual(0);
            });

            test('searchItems', () => {
                expect(itemCol.searchItems).toHaveLength(0);
            });

            test('filter', () => {
                expect(itemCol.filter).toEqual('');
            });

            test('order', () => {
                expect(itemCol.order).toEqual(SortOrder.ASC_DATE_ADDED);
            });
        });
    });

    describe('json conversion', () => {
        
        let itemCol: ItemCollection;

        describe('toJson -> fromJson', () => {
            beforeEach(() => {
                itemCol = new ItemCollection();
                itemCol.createItem('item0', 'desc0', ['tag0', 'tag1']);
                itemCol.createItem('item1', 'desc1', ['tag4', 'tag2']);
                itemCol.createItem('item2', 'desc2', ['tag5', 'tag3']);
            });

            test('toJson', () => {
                let json = itemCol.toJson();
                expect(itemCol).toMatchObject(json);
            });

            test('fromJson', () => {
                let json = itemCol.toJson();

                let newCol = ItemCollection.fromJson(json);
                expect(newCol).toMatchObject(json);
            });
        });
    });

    describe('setters', () => {
        let itemCol : ItemCollection;

        beforeEach(() => {
            itemCol = new ItemCollection();
            itemCol.createItem(
                'name',
                'desc',
                []
            );
            itemCol.selectItem(0);
        });

        test('setName', () => {
            let input = [
                {desc: 'Empty', in: '', msg: ValidationMessage.EMPTY, exp: 'name'}, 
                {desc: 'Invalid char', in: 'sdf]', msg: ValidationMessage.INVALID_CHAR, exp: 'name'}, 
                {desc: 'ok', in: 'new name', msg: ValidationMessage.OK, exp: 'new name'}
            ];

            input.forEach((test) => {
                let msg = itemCol.setName(test.in);
                expect(msg).toEqual(test.msg);
                expect(itemCol.name).toEqual(test.exp);
            });
        });

        test('setDesc', () => {
            let input = [
                {desc: 'Empty', in: '', msg: ValidationMessage.EMPTY, exp: 'desc'}, 
                {desc: 'Invalid char', in: 'sdf]', msg: ValidationMessage.INVALID_CHAR, exp: 'desc'}, 
                {desc: 'ok', in: 'new desc', msg: ValidationMessage.OK, exp: 'new desc'}
            ];

            input.forEach((test) => {
                let msg = itemCol.setDesc(test.in);
                expect(msg).toEqual(test.msg);
                expect(itemCol.description).toEqual(test.exp);
            });
        });

        test('setState', () => {

        });

        test('setTag', () => {
            let input = [
                {desc: 'Empty', in: '', msg: ValidationMessage.EMPTY, exp: undefined}, 
                {desc: 'Invalid char', in: 'sdf]', msg: ValidationMessage.INVALID_CHAR, exp: undefined}, 
                {desc: 'ok', in: 'new tag', msg: ValidationMessage.OK, exp: 'new tag'}
            ];

            input.forEach((test) => {
                let msg = itemCol.addTag(test.in);
                expect(msg).toEqual(test.msg);
                expect(itemCol.tags[0]).toEqual(test.exp);
            });
        });

        test('removeTag', () => {

        });
    });

    describe('getItem', () => {

    });

    describe('setItems', () => {

    });

    describe('createID', () => {

    });

    describe('selectItem', () => {

    });

    describe('removeItem', () => {

    });

    describe('createItem', () => {

    });

    describe('undo', () => {

    });

    describe('redo', () => {

    });
});
