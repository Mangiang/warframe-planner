import {Button, Card, CardActions, CardContent, CardMedia, makeStyles, Typography} from "@material-ui/core";
import {Item} from "../Data/Item";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
});

interface Props {
    item: Item
}

export const WishlistCard = (props: Props) => {
    const classes = useStyles();
    const baseImageUrl = 'https://github.com/WFCD/warframe-items/blob/master/data/img/'

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {props.item.name}
                </Typography>
                <CardMedia
                    className={classes.media}
                    image={`${baseImageUrl}${props.item.imageName}`}
                    title="image"
                />
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}