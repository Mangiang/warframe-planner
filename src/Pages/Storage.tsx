import React, {useState} from 'react';
import {Box, Button, Snackbar} from "@material-ui/core";
import {useIndexedDB} from "react-indexed-db";
import {ConfirmationChoice, ConfirmationDialog} from "../Components/ConfirmationDialog";
import MuiAlert, {AlertProps} from "@material-ui/lab/Alert";

const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const Storage = () => {
    const [wishlistDialogOpen, setWishlistDialogOpen] = useState<boolean>(false);
    const [inventoryDialogOpen, setInventoryDialogOpen] = useState<boolean>(false);
    const [statusOpen, setStatusOpen] = useState<boolean>(false);

    const whishlistDB = useIndexedDB('wishlist');
    const inventoryDB = useIndexedDB('inventory');

    const confirmationChoices: ConfirmationChoice[] = [
        {
            text: "Cancel",
            color: "secondary"
        },
        {
            text: "Apply",
            color: "primary"
        }
    ]

    const handleWishlistClose = async (choiceIdx: number) => {
        if (confirmationChoices[choiceIdx].text === "Apply") {
            const allData = await whishlistDB.getAll()
            console.log("data", allData)
            await Promise.all(allData.map(elt => whishlistDB.deleteRecord(elt.id)))
        }
        setWishlistDialogOpen(false)
        setStatusOpen(true)
    }

    const handleInventoryClose = async (choiceIdx: number) => {
        if (confirmationChoices[choiceIdx].text === "Apply") {
            const allData = await inventoryDB.getAll()
            await Promise.all(allData.map(elt => inventoryDB.deleteRecord(elt.id)))
        }
        setInventoryDialogOpen(false)
        setStatusOpen(true)
    }

    return (
        <Box>
            <Button variant="contained" onClick={() => setInventoryDialogOpen(true)}>Clear ALL data</Button>
            <Button variant="contained" onClick={() => setWishlistDialogOpen(true)}>Clear wishlist data</Button>
            <Button variant="contained" onClick={() => setInventoryDialogOpen(true)}>Clear inventory data</Button>
            <Button variant="contained" onClick={() => setInventoryDialogOpen(true)}>Clear items data</Button>
            <Button variant="contained" onClick={() => setInventoryDialogOpen(true)}>Clear tracking data</Button>
            <ConfirmationDialog open={wishlistDialogOpen}
                                body={"This will remove all wishlist Data. You CANNOT revert this operation"}
                                title={"Do you really want to remove all your wishlist Data ?"}
                                choices={confirmationChoices}
                                handleClose={handleWishlistClose}/>
            <ConfirmationDialog open={inventoryDialogOpen}
                                body={"This will remove all inventory Data. You CANNOT revert this operation"}
                                title={"Do you really want to remove all your inventory Data ?"}
                                choices={confirmationChoices}
                                handleClose={handleInventoryClose}/>
            <Snackbar open={statusOpen} autoHideDuration={6000} onClose={() => setStatusOpen(false)}>
                <Alert onClose={() => setStatusOpen(false)} severity="success">
                    Database successfully updated
                </Alert>
            </Snackbar>
        </Box>
    );
}