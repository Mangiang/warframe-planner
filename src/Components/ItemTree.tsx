import React, {useCallback, useEffect, useState} from "react";
import MuiTreeView, {Tree} from "material-ui-treeview";
import {Item} from "../Data/Item";

interface Props {
    data: Item | undefined
}

export const ItemTree = (props: Props) => {
    const [data, setData] = useState<Tree>();

    const transformData = useCallback(
        (item: Item): Tree => {
            return {
                value: item.amount ? `${item.amount} ${item.name}` : item.name,
                nodes: !item.components ? [] : item.components.map(comp => transformData(comp))
            } as Tree
        },
        [],
    );

    useEffect(() => {
        if (!props.data) return;
        setData(transformData(props.data));
    }, [props.data, transformData])

    return (<>
        {data && <MuiTreeView tree={[data]}/>}
    </>);
}