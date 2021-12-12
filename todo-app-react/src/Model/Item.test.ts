import { ValidationMessage } from './Todo';

import Item from './Item';

describe('Item', () => {
    describe('constructor', () => {
        
        let initData: {id: number, name: string, desc: string, tags: string[]};
        let item: Item;
        let time: number;

        beforeAll(() => {
            initData = {
                id: 0,
                name: 'testName',
                desc: 'testDesc',
                tags: ['testTag0', 'testTag1']
            };

            item = new Item(
                initData.id,
                initData.name,
                initData.desc,
                initData.tags);

            time = Date.now();
        });

        test('id', () => {
            expect(item.ID).toEqual(initData.id);
        });
        
        test('name', () => {
            expect(item.name).toEqual(initData.name);
        });
        
        test('description', () => {
            expect(item.description).toEqual(initData.desc);
        });
        
        test('tags', () => {
            expect(item.tags).toEqual(initData.tags);
        });
        
        test('completed', () => {
            expect(item.completed).toBeFalsy();
        });
        
        test('creation time', () => {
            expect(time - item.creationTime).toBeLessThan(1000);
        });
        
        test('modification time', () => {
            expect(time - item.lastModifiedTime).toBeLessThan(1000);
        });

    });

    describe('Json conversion', () => {

        let initData: {id: number, name: string, desc: string, tags: string[]};
        let item: Item;
        let time: number;

        beforeAll(() => {
            initData = {
                id: 0,
                name: 'testName',
                desc: 'testDesc',
                tags: ['testTag0', 'testTag1']
            };

            item = new Item(
                initData.id,
                initData.name,
                initData.desc,
                initData.tags);

            time = Date.now();
        });

        test('toJson', () => {
            let expected = {
                ID: item.ID,
                name: item.name,
                description: item.description,
                creationTime: item.creationTime,
                lastModifiedTime: item.lastModifiedTime,
                completed: item.completed,
                tags: item.tags,
            };

            expect(item.toJson()).toEqual(expected);
        });

        test('fromJson', () => {
            expect(Item.fromJson(item.toJson())).toEqual(item);
        });
    });

    describe('getter / setters', () => {

        let initData: {id: number, name: string, desc: string, tags: string[]};
        let item: Item;
        let time: number;

        beforeEach(() => {
            initData = {
                id: 0,
                name: 'testName',
                desc: 'testDesc',
                tags: ['testTag0', 'testTag1']
            };

            item = new Item(
                initData.id,
                initData.name,
                initData.desc,
                initData.tags);

            time = Date.now();
        });
            
        describe('setName', () => {
            test('empty string', () => {
                let input = '';
                let msg = item.setName(input);

                expect(item.name).toEqual(initData.name); 
                expect(msg).toEqual(ValidationMessage.EMPTY);
            });

            test('invalid char', () => {
                let input = 'newTestName*$%';
                let msg = item.setName(input);

                expect(item.name).toEqual(initData.name); 
                expect(msg).toEqual(ValidationMessage.INVALID_CHAR);
            });
            
            test('valid string', () => {
                let input = 'newTestName';
                let msg = item.setName(input);

                expect(item.name).not.toEqual(initData.name); 
                expect(msg).toEqual(ValidationMessage.OK);
            });
        });

        describe('setDescription', () => {
            test('empty string', () => {
                let input = '';
                let msg = item.setDesc(input);

                expect(item.description).toEqual(initData.desc); 
                expect(msg).toEqual(ValidationMessage.EMPTY);
            });

            test('invalid char', () => {
                let input = 'newTestDesc*$%';
                let msg = item.setDesc(input);

                expect(item.description).toEqual(initData.desc); 
                expect(msg).toEqual(ValidationMessage.INVALID_CHAR);
            });
            
            test('valid string', () => {
                let input = 'newTestDesc';
                let msg = item.setDesc(input);

                expect(item.description).not.toEqual(initData.desc); 
                expect(msg).toEqual(ValidationMessage.OK);
            });
        });

        describe('setState', () => {
            test('set incomplete', () => {
                let msg = item.setState(false);

                expect(item.completed).toBeFalsy();
                expect(msg).toEqual(ValidationMessage.OK);
            });

            test('set complete', () => {
                let msg = item.setState(true);

                expect(item.completed).toBeTruthy();
                expect(msg).toEqual(ValidationMessage.OK);
            });
        });

        describe('add/rem Tag', () => {
            describe('add tag', () => {
                test('add to empty', () => {
                    item.tags = [];
                    let input = 'newTestTag';
                    let msg = item.addTag(input);

                    expect(item.tags).toContain(input);
                    expect(msg).toEqual(ValidationMessage.OK);
                });

                test('add', () => {
                    let input = 'newTestTag';
                    let msg = item.addTag(input);

                    expect(item.tags).toContain(input);
                    expect(msg).toEqual(ValidationMessage.OK);
                });

                test('add invalid char', () => {
                    let input = 'newTestTag$';
                    let msg = item.addTag(input);

                    expect(item.tags).not.toContain(input);
                    expect(msg).toEqual(ValidationMessage.INVALID_CHAR);
                });

                test('add empty', () => {
                    let input = '';
                    let msg = item.addTag(input);

                    expect(item.tags).not.toContain(input);
                    expect(msg).toEqual(ValidationMessage.EMPTY);
                });

                test('add clone', () => {
                    let input = 'newTestTag';
                    item.addTag(input);
                    let msg = item.addTag(input);

                    let count = item.tags.reduce((a, e) => { return a + (e === input ? 1 : 0); }, 0);
                    expect(count).toEqual(1);
                    expect(msg).toEqual(ValidationMessage.ALREADY_EXISTS);
                });
            });
            describe('remove tag', () => {
                test('remove from empty', () => {
                    let input = 'oldTestTag';
                    item.tags = [];
                    let msg = item.removeTag(input);

                    expect(msg).toEqual(ValidationMessage.DOESNT_EXIST);
                });

                test('remove', () => {
                    let input = 'testTag0';
                    let msg = item.removeTag(input);

                    expect(item.tags).not.toContain(input);
                    expect(msg).toEqual(ValidationMessage.OK);
                });

                test('remove invalid char', () => {
                    let input = 'testTag0$';
                    let msg = item.removeTag(input);

                    expect(item.tags).not.toContain(input);
                    expect(msg).toEqual(ValidationMessage.INVALID_CHAR);
                });

                test('remove empty', () => {
                    let input = '';
                    let msg = item.removeTag(input);

                    expect(item.tags).not.toContain(input);
                    expect(msg).toEqual(ValidationMessage.EMPTY);
                });
            });
        });
    });
});
