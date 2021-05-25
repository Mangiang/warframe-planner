import {makeStyles} from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import {TreeItem, TreeView} from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {useRecoilValue} from "recoil";
import {ItemsFullTree} from "../State/Items/ItemsMap";
import {Item} from "../Data/Item";
import React from "react";
import {CustomTreeItem} from "./CustomTreeItem";

interface Props {
    dataId?: string
}

const useStyles = makeStyles({
    root: {
        height: 240,
        flexGrow: 1,
        maxWidth: '50vw',
    },
});
export const CustomTree = (props: Props) => {
    const item = useRecoilValue(ItemsFullTree(props.dataId));
    const classes = useStyles();

    const renderLeaf = (item: Item) => {
        return (<TreeItem
            key={item.id}
            nodeId={item.id}
            label={<CustomTreeItem itemID={item.id} />}
        />)
    }
    const renderNode = (item: Item) => {
        return (<TreeItem
            key={item.id}
            nodeId={item.id}
            label={<CustomTreeItem itemID={item.id} />}
        >
            {item.components.map(comp => getItemComponents(comp))}
        </TreeItem>)
    }

    const getItemComponents = (item: Item): JSX.Element => {
        return (!item.components || item.components.length === 0) ? renderLeaf(item) : renderNode(item);
    }

    return (<>
        <TreeView
            className={classes.root}
            defaultCollapseIcon={<ExpandMoreIcon/>}
            defaultExpandIcon={<ChevronRightIcon/>}
        >
            {item && getItemComponents(item)}
        </TreeView>
    </>)
}