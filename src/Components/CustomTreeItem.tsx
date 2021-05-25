import {Box, makeStyles, Typography} from "@material-ui/core";
import {Item} from "../Data/Item";
import {Star, StarOutline} from "@material-ui/icons";
import {MouseEvent} from 'react';
import {useRecoilState} from "recoil";
import {ItemsMapAccess} from "../State/Items/ItemsMap";

const useStyles = makeStyles({
    flexContainer: {
        display: 'flex',
        flexGrow: 1,
    },
    flexNameContainer: {
        display: 'flex',
        flexGrow: 1,
        paddingLeft: '10px',
        justifyContent: 'flex-start'
    }
});

interface Props {
    itemID: string
}

export const CustomTreeItem = (props: Props) => {
    const classes = useStyles();
    const [item, setItem] = useRecoilState(ItemsMapAccess(props.itemID))

    const onToggleTrackHandle = (e: MouseEvent<SVGSVGElement>) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        const newItem = Item.fromItem(item)
        newItem.tracked = !item.tracked
        setItem(newItem)
    }
    const chooseStar = (tracked: boolean): JSX.Element => (
        tracked ? <Star onClick={onToggleTrackHandle}/> : <StarOutline onClick={onToggleTrackHandle}/>
    )

    return (<>
        <Box className={classes.flexContainer} flexDirection={'row'}>
            <Box className={classes.flexNameContainer} justifyContent={'center'} alignItems={'center'}>
                {chooseStar(item.tracked)}
                <Typography>{item.name}</Typography>
            </Box>
            {/*<Box className={classes.flexContainer}>*/}
            {/*    <FormGroup>*/}
            {/*        <Button variant={'contained'} color={'primary'} onClick={onToggleChildrenTrackHandle}>*/}
            {/*            Toggle all children tracking*/}
            {/*        </Button>*/}
            {/*    </FormGroup>*/}
            {/*</Box>*/}
            <Box flex={2}/>
        </Box>
    </>)
}