import {initDB} from "react-indexed-db";

const DBConfig = {
    name: "warframe-planner",
    version: 1,
    objectStoresMeta: [
        {
            store: 'items',
            storeConfig: {keyPath: 'id', autoIncrement: true, primaryKey: true},
            storeSchema: [
                {name: 'value', keypath: 'value', options: {unique: false}},
                {name: 'checksum', keypath: 'checksum', options: {unique: true}},
            ]
        },
        {
            store: 'wishlist',
            storeConfig: {keyPath: 'id', autoIncrement: false},
            storeSchema: [
                {name: 'name', keypath: 'name', options: {unique: true}}
            ]
        },
        {
            store: 'inventory',
            storeConfig: {keyPath: 'id', autoIncrement: false},
            storeSchema: [
                {name: 'name', keypath: 'name', options: {unique: true}},
                {name: 'id', keypath: 'id', options: {unique: false}},
                {name: 'have', keypath: 'have', options: {unique: false}},
                {name: 'need', keypath: 'need', options: {unique: false}},
            ]
        },
        {
            store: 'tracking',
            storeConfig: {keyPath: 'id', autoIncrement: false},
            storeSchema: [
                {name: 'name', keypath: 'name', options: {unique: true}}
            ]
        }
    ]
};
export const initDatabase = () => initDB(DBConfig);
