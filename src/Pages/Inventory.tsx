import React, {useEffect, useState} from 'react';
import {useIndexedDB} from "react-indexed-db";
import {DataGrid, GridColumns, GridEditCellPropsParams, GridSortCellParams} from '@material-ui/data-grid';

const needCompute = (params: GridSortCellParams): number => {
    const totalStr = params.getValue('total')
    const total: number = totalStr ? +totalStr : 1
    const haveStr = params.getValue('have')
    const have: number = haveStr ? +haveStr : 0
    const need = total - have
    return need > 0 ? need : 0
}

const columns: GridColumns = [
    {field: 'name', headerName: 'Name', flex: 1, editable: false},
    {field: 'have', headerName: 'Have', flex: 1, type: 'number', editable: true},
    {
        field: 'need',
        headerName: 'Need',
        flex: 1,
        type: 'number',
        editable: false,
        valueGetter: needCompute,
        sortComparator: (v1, v2, cellParams1, cellParams2) => needCompute(cellParams1) - needCompute(cellParams2)
    },
    {field: 'total', headerName: 'Total', flex: 1, type: 'number', editable: false,},
];

export const Inventory = () => {
    const inventoryDB = useIndexedDB('inventory');
    const [inventory, setInventory] = useState<any[]>([])

    useEffect(() => {
        (async () => {
            const inv = await inventoryDB.getAll();
            setInventory(inv)
        })()
    }, [inventoryDB])

    const handleEditCellChangeCommitted = React.useCallback(
        async ({id, field, props}: GridEditCellPropsParams) => {
            if (field === 'have') {
                const have = +props.value!;

                const updatedRows = await Promise.all(inventory.map(async (row) => {
                    if (row.id === id) {
                        const newRow = {...row, have}
                        await inventoryDB.update(newRow)
                        return newRow;
                    }
                    return row;
                }));

                setInventory(updatedRows);
            }
        },
        [inventory, inventoryDB],
    );

    return (
        <div style={{height: '100%', width: '100%'}}>
            <DataGrid autoHeight={true} rows={inventory} columns={columns}
                      onEditCellChangeCommitted={handleEditCellChangeCommitted}
            />
        </div>
    );
}