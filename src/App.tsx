import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import {Box, CircularProgress} from "@material-ui/core";
import {initDatabase} from "./DataAccess/IndexedDB"
import {Navigation} from "./Routes/Navigation";
import {useIndexedDB} from "react-indexed-db";
import {getItemData} from "./DataAccess/WarframeItems";
import {ItemsListContext} from "./Context/ItemsListContext";
import {RawItem} from "./Data/WarframeItems";

initDatabase()

export const App = () => {
    const itemsDB = useIndexedDB('items');
    const [loadingItems, setLoadingItems] = useState(true);
    const [initMap, setInitMap] = useState<boolean>(false);
    const [itemsMap, setItemsMap] = useState<Map<string, RawItem>>(new Map());

    const updateItemList = useCallback(
        async () => {
            console.log("Updating items")
            const itemListData = await getItemData()
            const currentItemListData = await itemsDB.getAll()

            if (currentItemListData.length === 0) {
                await itemsDB.add(itemListData)
                console.log("No items yet, updating items")
            } else if (currentItemListData[0].checksum === itemListData.checksum) {
                console.log("Same checksum, continue")
            } else {
                console.log("Replacing older version")
                await Promise.all(currentItemListData.map(async it => itemsDB.deleteRecord(it.id)))
                await itemsDB.add(itemListData)
            }
            const itemList = JSON.parse(itemListData.value);
            const newItemMap = new Map()
            itemList.forEach((it: RawItem) => newItemMap.set(it.uniqueName, it))
            setItemsMap(newItemMap)
            setLoadingItems(false)
        }, [itemsDB]);

    useEffect(() => {
        if (!initMap) {
            setInitMap(true);
            (async () => await updateItemList())()
        }
    }, [initMap, updateItemList]);

    const DisplayApp = (isLoading: boolean) => {
        if (isLoading)
            return (<><h1>Loading Warframe items please wait ...</h1><CircularProgress/></>)
        return <Navigation/>
    }

    return (
        <Box className="App">
            <ItemsListContext.Provider value={itemsMap}>
                {DisplayApp(loadingItems)}
            </ItemsListContext.Provider>
        </Box>
    );
}