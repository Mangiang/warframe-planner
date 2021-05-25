import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import {Box, CircularProgress} from "@material-ui/core";
import {Navigation} from "./Routes/Navigation";
import {getItemData} from "./DataAccess/WarframeItems";
import {RawItem} from "./Data/WarframeItems";
import {useRecoilCallback} from "recoil";
import {ItemsMapAccess} from "./State/Items/ItemsMap";
import {blacklist, Item} from "./Data/Item";

export const App = () => {
    const [loadingItems, setLoadingItems] = useState(true);
    const [initMap, setInitMap] = useState<boolean>(false);
    const setItems = useRecoilCallback(({set}) => async (items: RawItem[]) => {
        items.forEach((it: RawItem) => {
            it.components
                ?.filter(elt => blacklist.includes(elt.name))
                .forEach(elt => set(ItemsMapAccess(elt.uniqueName), Item.fromRaw(elt)));
            const newItem = Item.fromRaw(it);
            set(ItemsMapAccess(it.uniqueName), newItem)
        });
    });

    const updateItemList = useCallback(
        async () => {
            console.log("Updating items")
            const currentItemListData = []

            if (currentItemListData.length === 0) {
                console.log("No items yet, downloading items")
                const itemListData = await getItemData()
                currentItemListData.push(itemListData)
                console.log("Download completed")
            }
            const allItems = JSON.parse(currentItemListData[0].value);
            await setItems(allItems)
            setLoadingItems(false)
            console.log("Updated items")
        }, []);

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
            {DisplayApp(loadingItems)}
        </Box>
    );
}