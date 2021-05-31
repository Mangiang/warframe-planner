// import React, {useCallback, useContext, useEffect, useState} from 'react';
import React, {useCallback, useContext, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {AutocompleteText} from "../Components/AutocompleteText";
// import {ItemTree} from "../Components/ItemTree";
import {Item} from "../Data/Item";
import {Box} from "@material-ui/core";
// import {Box, makeStyles} from "@material-ui/core";
// import {Box, Button, makeStyles} from "@material-ui/core";
// import {useIndexedDB} from "react-indexed-db";
// import {Wish} from "../Data/Wish";
// import {InventoryItem} from "../Data/InventoryItem";
import {ItemsListContext} from "../Context/ItemsListContext";
import {RawItem} from "../Data/WarframeItems";
// import {TreeItem, TreeView} from "@material-ui/lab";
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import {CustomTreeItem} from "../Components/CustomTreeItem";
// import {useRecoilState, useRecoilValue} from "recoil";
import {useRecoilCallback} from "recoil";
// import {ItemsMap} from "../State/Items/ItemsMap";
// import {ItemsList, ItemsSearchableList} from "../State/Items/ItemsList";
import {ItemsList} from "../State/Items/ItemsList";
import {SearchItem} from "../Data/SearchItem";
import {CustomTree} from "../Components/CustomTree";
import {ItemsMapAccess} from "../State/Items/ItemsMap";


// const useStyles = makeStyles({
//     root: {
//         // height: 240,
//         flexGrow: 1,
//         // maxWidth: 400,
//     },
// });

export const Wishlist = () => {
    // const classes = useStyles();
    const itemsListContext = useContext(ItemsListContext);
    // const [searchData, setSearchData] = useState<ParentItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<SearchItem | undefined>(undefined);
    // const [selectedData, setSelectedData] = useState<ParentItem | undefined>(undefined);
    // const [wishlistData, setWishlistData] = useState<ParentItem[]>([]);
    // const wishlistDB = useIndexedDB('wishlist');
    // const inventoryDB = useIndexedDB('inventory');
    const itemsList = useRecoilCallback(({snapshot}) => () => {
        const searchableItems: SearchItem[] = []
        snapshot.getLoadable(ItemsList).getValue().forEach((it: SearchItem) => {
            const item = snapshot.getLoadable(ItemsMapAccess(it.id)).getValue()
            if (item.components.length > 0)
                searchableItems.push(item)
        });
        return searchableItems
    }, [ItemsList, ItemsMapAccess]);

    // const getSearchResults = useCallback(
    //     (search: string) => {
    //         const regex = new RegExp(search, 'i');
    //         const filteredItems = Array.from(itemsListContext.values())
    //             .filter(it => it.name.match(regex))
    //             .map(it => (new ParentItem(it.name, it.uniqueName)));
    //         setSearchData(filteredItems)
    //     },
    //     [itemsListContext]
    // );


    // const getComponents = useCallback(
    //     async (parent: ParentItem, item: string): Promise<ParentItem> => {
    //         const parentItem: RawItem | undefined = itemsListContext.get(item)
    //         let components: any = undefined;
    //         if (parentItem && parentItem.components) {
    //             components = {
    //                 buildQuantity: parentItem.buildQuantity,
    //                 components: parentItem.components.map(it => ({
    //                     name: it.name,
    //                     id: it.uniqueName,
    //                     amount: it.itemCount,
    //                     imageName: it.imageName
    //                 }))
    //             }
    //         }
    //
    //         if (!components) return parent;
    //
    //         const newItem = parent;
    //         const componentsData: any = await Promise.all(components.components.map(async (comp: any) => {
    //             return await getComponents(new ParentItem(comp.name, comp.id, comp.amount, [], comp.imageName), comp.id)
    //         }));
    //         newItem.components = []
    //         if (newItem.amount && componentsData) {
    //             const multiplicator = Math.ceil(newItem.amount / components.buildQuantity)
    //             newItem.components = componentsData.map((it: any) => {
    //                 const tmpItem = {...it}
    //                 if (it.name !== "Blueprint")
    //                     tmpItem.amount *= multiplicator
    //                 return tmpItem
    //             })
    //         } else if (componentsData) {
    //             newItem.components = componentsData
    //         }
    //         newItem.components.filter(it => it !== null && it !== undefined);
    //         return newItem
    //     },
    //     [itemsListContext],
    // );


    // const updateWishlistData = useCallback(
    //     async (): Promise<void> => {
    //         const list = (await wishlistDB.getAll()).filter(it => !wishlistData.find(elt => elt.id === it.id));
    //         const newList = await Promise.all(list.map(it => getComponents(it, it.id)));
    //         newList.push(...wishlistData)
    //         setWishlistData(newList)
    //     },
    //     [wishlistDB, wishlistData, getComponents],
    // );

    // useEffect(() => {
    //     getSearchResults(".*");
    // }, [])
    //
    // useEffect(() => {
    //     (async () => {
    //         await updateWishlistData()
    //     })()
    // }, [])
    //
    // useEffect(() => {
    //     (async () => {
    //         if (!selectedItem) return;
    //         const newSelectedItem = await getComponents(selectedItem, selectedItem.id);
    //         setSelectedData(newSelectedItem)
    //     })()
    // }, [selectedItem, getComponents])

    // const addToInventory = async (item: ItemsMap) => {
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
    //     await updateWishlistData()
    //     // await addToInventory(selectedItem)
    // }

    // const toggleItemTracking = (parent: ParentItem, item?: ParentItem): ParentItem => {
    //
    //     if (item && parent.id === item.id){
    //         parent.tracked = !parent.tracked
    //         return parent
    //     }
    //     else if (!item){
    //         parent.tracked = !parent.tracked;
    //     }
    //
    //     parent.components = parent.components.map(comp => toggleItemTracking(comp, item))
    //     return parent
    // }

    // const toggleTracking = (trackingItem: ParentItem) => {
    //     const newWishData = wishlistData.map(wish => toggleItemTracking(wish, trackingItem))
    //     setWishlistData(newWishData)
    // }
    //
    // const toggleChildrenTracking = (trackingItem: ParentItem) => {
    //     const newWishData = wishlistData.map(wish => wish.id === trackingItem.id ? toggleItemTracking(wish) : wish)
    //     setWishlistData(newWishData)
    // }

    // const getTreeItems = useCallback(
    //     (item: ParentItem) => {
    //         return (<TreeItem nodeId={item.id} label={<CustomTreeItem item={item}
    //                                                                   toggleChildrenTracking={toggleChildrenTracking}
    //                                                                   toggleTracking={toggleTracking}/>}>
    //             {item.components.map(child => getTreeItems(child))}
    //         </TreeItem>)
    //     },
    //     [wishlistDB],
    // );

    return (
        <div className="App">
            <Autocomplete
                id="combo-box-demo"
                options={itemsList()}
                ListboxComponent={AutocompleteText as React.ComponentType<React.HTMLAttributes<HTMLElement>>}
                getOptionLabel={(option: SearchItem) => option.name}
                style={{width: 300}}
                onChange={(event: any, newValue: SearchItem | null) => {
                    if (!newValue) return
                    setSelectedItem(newValue);
                }}
                renderInput={(params) => <TextField {...params} label="ItemsMap search" variant="outlined"/>}
            />
            {/*<Button variant="contained" onClick={addToWhishlist}>Add to whishlist</Button>*/}
            <Box style={{maxWidth: "50vw"}}>
                {/*<ItemTree dataId={selectedItem?.id}/>*/}
                <CustomTree dataId={selectedItem?.id}/>
            </Box>
            {/*<Box style={{width: "100%", height: "100%"}}>*/}
            {/*    <h3>Tracking</h3>*/}

            {/*    /!*{*!/*/}
            {/*    /!*    wishlistData.map(it =>*!/*/}
            {/*    /!*        <ItemTree key={it.id} data={it}/>)*!/*/}
            {/*    /!*}*!/*/}
            {/*    <TreeView*/}
            {/*        className={classes.root}*/}
            {/*        defaultCollapseIcon={<ExpandMoreIcon/>}*/}
            {/*        defaultExpandIcon={<ChevronRightIcon/>}*/}
            {/*    >*/}
            {/*        {wishlistData.map(it => getTreeItems(it))}*/}
            {/*    </TreeView>*/}
            {/*</Box>*/}
        </div>
    );
}