
import ItemCollection from './ItemCollection';
import { ItemCollectionJson, SortOrder } from './Todo';

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
});
