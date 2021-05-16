import React, {useState} from 'react';
import {Box, Button, Snackbar} from "@material-ui/core";
import {useIndexedDB} from "react-indexed-db";
import {ConfirmationChoice, ConfirmationDialog} from "../Components/ConfirmationDialog";
import MuiAlert, {AlertProps} from "@material-ui/lab/Alert";

const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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

export const Storage = () => {
    const [allClearDialogOpen, setAllClearDialogOpen] = useState<boolean>(false);
    // const [wishlistDialogOpen, setWishlistDialogOpen] = useState<boolean>(false);
    // const [inventoryDialogOpen, setInventoryDialogOpen] = useState<boolean>(false);
    const [statusOpen, setStatusOpen] = useState<boolean>(false);

    const wishlistDB = useIndexedDB('wishlist');
    const inventoryDB = useIndexedDB('inventory');
    const trackingDB = useIndexedDB('tracking');
    const itemsDB = useIndexedDB('items');


    // const handleWishlistClose = async (choiceIdx: number) => {
    //     if (confirmationChoices[choiceIdx].text === "Apply") {
    //         const allData = await whishlistDB.getAll()
    //         console.log("data", allData)
    //         await Promise.all(allData.map(elt => whishlistDB.deleteRecord(elt.id)))
    //     }
    //     setWishlistDialogOpen(false)
    //     setStatusOpen(true)
    // }
    //
    // const handleInventoryClose = async (choiceIdx: number) => {
    //     if (confirmationChoices[choiceIdx].text === "Apply") {
    //         const allData = await inventoryDB.getAll()
    //         await Promise.all(allData.map(elt => inventoryDB.deleteRecord(elt.id)))
    //     }
    //     setInventoryDialogOpen(false)
    //     setStatusOpen(true)
    // }

    const handleClearAllClose = async (choiceIdx: number) => {
        setAllClearDialogOpen(false)
        if (confirmationChoices[choiceIdx].text === "Apply") {
            const wishlist = await wishlistDB.getAll()
            const inventory = await inventoryDB.getAll()
            const tracking = await trackingDB.getAll()
            const items = await itemsDB.getAll()
            const removeList = []
            if (wishlist.length > 0)
                removeList.push(...wishlist.map(elt => wishlistDB.deleteRecord(elt.id)))
            if (inventory.length > 0)
                removeList.push(...inventory.map(elt => inventoryDB.deleteRecord(elt.id)))
            if (tracking.length > 0)
                removeList.push(...tracking.map(elt => trackingDB.deleteRecord(elt.id)))
            if (items.length > 0)
                removeList.push(...items.map(elt => itemsDB.deleteRecord(elt.id)))
            await Promise.all(removeList)
        }
        setStatusOpen(true)
    }

    const dialogs = [
        {
            open: allClearDialogOpen,
            title: "Do you really want to remove all your Data ?",
            body: "This will remove all Data. You CANNOT revert this operation",
            choices: confirmationChoices,
            handleClose: handleClearAllClose,
            buttonText: "Clear tracking data",
            buttonOnClick: () => setAllClearDialogOpen(true)
        }
        // {
        //     open: wishlistDialogOpen,
        //     title: "Do you really want to remove all your wishlist Data ?",
        //     body: "This will remove all wishlist Data. You CANNOT revert this operation",
        //     choices: confirmationChoices,
        //     handleClose: handleWishlistClose,
        //     buttonText: "Clear wishlist data",
        //     buttonOnClick: () => setWishlistDialogOpen(true)
        // },
        // {
        //     open: inventoryDialogOpen,
        //     title: "Do you really want to remove all your inventory Data ?",
        //     body: "This will remove all inventory Data. You CANNOT revert this operation",
        //     choices: confirmationChoices,
        //     handleClose: handleInventoryClose,
        //     buttonText: "Clear tracking data",
        //     buttonOnClick: () => setInventoryDialogOpen(true)
        // }
    ]

    return (
        <Box>
            {dialogs.map((diag, idx) =>
                <>
                    <Button key={`button_${idx}`} variant="contained" onClick={diag.buttonOnClick}>{diag.buttonText}</Button>
                    <ConfirmationDialog key={`diag_${idx}`}
                                        open={diag.open}
                                        title={diag.title}
                                        body={diag.body}
                                        choices={diag.choices}
                                        handleClose={diag.handleClose}/>
                </>
            )}
            <Snackbar open={statusOpen} autoHideDuration={6000} onClose={() => setStatusOpen(false)}>
                <Alert onClose={() => setStatusOpen(false)} severity="success">
                    Database successfully updated
                </Alert>
            </Snackbar>
        </Box>
    );
}