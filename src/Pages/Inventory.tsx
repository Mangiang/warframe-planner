// import React, {useEffect, useState} from 'react';
import React from 'react';
// import {useIndexedDB} from "react-indexed-db";
// import {DataGrid, GridColumns, GridEditCellPropsParams, GridSortCellParams} from '@material-ui/data-grid';
// import {GridColumns, GridSortCellParams} from '@material-ui/data-grid';
// import {Item} from "../Data/Item";

// const needCompute = (params: GridSortCellParams): number => {
//     const totalStr = params.getValue('total')
//     const total: number = totalStr ? +totalStr : 1
//     const haveStr = params.getValue('have')
//     const have: number = haveStr ? +haveStr : 0
//     const need = total - have
//     return need > 0 ? need : 0
// }

// const columns: GridColumns = [
//     {field: 'name', headerName: 'Name', flex: 1, editable: false},
//     {field: 'have', headerName: 'Have', flex: 1, type: 'number', editable: true},
//     {
//         field: 'need',
//         headerName: 'Need',
//         flex: 1,
//         type: 'number',
//         editable: false,
//         valueGetter: needCompute,
//         sortComparator: (v1, v2, cellParams1, cellParams2) => needCompute(cellParams1) - needCompute(cellParams2)
//     },
//     {field: 'total', headerName: 'Total', flex: 1, type: 'number', editable: false,},
// ];

export const Inventory = () => {
    // const inventoryDB = useIndexedDB('inventory');
    // const wishlistDB = useIndexedDB('wishlist');
    // const [inventory, setInventory] = useState<any[]>([])
    // const [wishList, setWishList] = useState<any[]>([])

    // const listComponents = (item: Item): Item[] => {
    //     if (!item.components || item.components.length === 0)
    //         return [];
    //     return item.components.map(comp => listComponents(comp)).flat()
    // }
    //
    // useEffect(() => {
    //     (async () => {
    //         const wishTrees = await wishlistDB.getAll();
    //         console.log(wishTrees)
    //         const wishlist = wishTrees.map(tree => listComponents(tree))
    //         console.log(wishlist)
    //     })()
    // }, []);
    //
    //
    // useEffect(() => {
    //     (async () => {
    //         const inv = await inventoryDB.getAll();
    //
    //         setInventory(inv)
    //     })()
    // }, [inventoryDB])
    //
    // const handleEditCellChangeCommitted = React.useCallback(
    //     async ({id, field, props}: GridEditCellPropsParams) => {
    //         if (field === 'have') {
    //             const have = +props.value!;
    //
    //             const updatedRows = await Promise.all(inventory.map(async (row) => {
    //                 if (row.id === id) {
    //                     const newRow = {...row, have}
    //                     await inventoryDB.update(newRow)
    //                     return newRow;
    //                 }
    //                 return row;
    //             }));
    //
    //             setInventory(updatedRows);
    //         }
    //     },
    //     [inventory, inventoryDB],
    // );
    //
    // return (
    //     <div style={{height: '100%', width: '100%'}}>
    //         <DataGrid autoHeight={true} rows={inventory} columns={columns}
    //                   onEditCellChangeCommitted={handleEditCellChangeCommitted}
    //         />
    //     </div>
    // );
    return (<></>)
}