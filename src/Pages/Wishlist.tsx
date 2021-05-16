import React, {useCallback, useContext, useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {AutocompleteText} from "../Components/AutocompleteText";
import {ItemTree} from "../Components/ItemTree";
import {Item} from "../Data/Item";
import {Box} from "@material-ui/core";
// import {useIndexedDB} from "react-indexed-db";
// import {Wish} from "../Data/Wish";
// import {InventoryItem} from "../Data/InventoryItem";
import {ItemsListContext} from "../Context/ItemsListContext";
import {RawItem} from "../Data/WarframeItems";

export const Wishlist = () => {
    const itemsListContext = useContext(ItemsListContext);
    const [searchData, setSearchData] = useState<Item[]>([]);
    const [selectedItem, setSelectedItem] = useState<Item | undefined>(undefined);
    const [selectedData, setSelectedData] = useState<Item | undefined>(undefined);
    // const [wishlistData, setWishlistData] = useState<Item[]>([]);
    // const wishlistDB = useIndexedDB('wishlist');
    // const inventoryDB = useIndexedDB('inventory');

    const getSearchResults = useCallback(
        (search: string) => {
            const regex = new RegExp(search, 'i');
            const filteredItems = Array.from(itemsListContext.values())
                .filter(it => it.name.match(regex))
                .map(it => (new Item(it.name, it.uniqueName)));
            setSearchData(filteredItems)
        },
        [itemsListContext]
    );


    const getComponents = useCallback(
        async (parent: Item, item: string): Promise<Item> => {
            const parentItem: RawItem | undefined = itemsListContext.get(item)
            let components: any = undefined;
            if (parentItem && parentItem.components) {
                components = {
                    buildQuantity: parentItem.buildQuantity,
                    components: parentItem.components.map(it => ({
                        name: it.name,
                        id: it.uniqueName,
                        amount: it.itemCount,
                        imageName: it.imageName
                    }))
                }
            }

            if (!components) return parent;

            const newItem = parent;
            const componentsData: any = await Promise.all(components.components.map(async (comp: any) => {
                return await getComponents(new Item(comp.name, comp.id, comp.amount, [], comp.imageName), comp.id)
            }));
            newItem.components = []
            if (newItem.amount && componentsData) {
                const multiplicator = Math.ceil(newItem.amount / components.buildQuantity)
                newItem.components = componentsData.map((it: any) => {
                    const tmpItem = {...it}
                    if (it.name !== "Blueprint")
                        tmpItem.amount *= multiplicator
                    return tmpItem
                })
            } else if (componentsData) {
                newItem.components = componentsData
            }
            newItem.components.filter(it => it !== null && it !== undefined);
            return newItem
        },
        [itemsListContext],
    );


    // const updateWishlistData = useCallback(
    //     async (): Promise<void> => {
    //         console.log("test")
    //         const list = (await wishlistDB.getAll()).filter(it => !wishlistData.find(elt => elt.id === it.id));
    //         const newList = await Promise.all(list.map(it => getComponents(it, it.id)));
    //         newList.push(...wishlistData)
    //         setWishlistData(newList)
    //     },
    //     [wishlistDB, wishlistData, getComponents],
    // );

    useEffect(() => {
        getSearchResults(".*");
    }, [getSearchResults])

    // useEffect(() => {
    //     (async () => {
    //        await updateWishlistData()
    //     })()
    // }, [updateWishlistData])

    useEffect(() => {
        (async () => {
            if (!selectedItem) return;
            const newSelectedItem = await getComponents(selectedItem, selectedItem.id);
            setSelectedData(newSelectedItem)
        })()
    }, [selectedItem, getComponents])

    // const addToInventory = async (item: Item) => {
    //     let invItem: InventoryItem | undefined = await inventoryDB.getByID(item.id)
    //     if (invItem) {
    //         invItem.total += item.amount
    //     } else {
    //         invItem = new InventoryItem(item.name, item.id, 0, item.amount)
    //     }
    //
    //     await Promise.all(item.components.map(comp => addToInventory(comp)))
    //
    //     await inventoryDB.add(invItem)
    // }

    // const addToWhishlist = async () => {
    //     if (!selectedItem) return
    //
    //     await wishlistDB.add(new Wish(selectedItem.name, selectedItem.id, selectedItem.amount, selectedItem.imageName))
    //     setWishlistData(await wishlistDB.getAll())
    //     await addToInventory(selectedItem)
    // }

    return (
        <div className="App">
            <Autocomplete
                id="combo-box-demo"
                options={searchData}
                ListboxComponent={AutocompleteText as React.ComponentType<React.HTMLAttributes<HTMLElement>>}
                getOptionLabel={(option: Item) => option.name}
                style={{width: 300}}
                onChange={(event: any, newValue: Item | null) => {
                    if (!newValue) return
                    setSelectedItem(newValue);
                }}
                renderInput={(params) => <TextField {...params} label="Item search" variant="outlined"/>}
            />
            {/*<Button variant="contained" onClick={addToWhishlist}>Add to whishlist</Button>*/}
            <Box style={{width: "20vw"}}>
                <ItemTree data={selectedData}/>
                {/*{*/}
                {/*    wishlistData.map(it =>*/}
                {/*        <ItemTree key={it.id} data={it}/>)*/}
                {/*}*/}
            </Box>
        </div>
    );
}