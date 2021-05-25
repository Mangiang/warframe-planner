import {Wishlist} from "../Pages/Wishlist";
// import {Inventory} from "../Pages/Inventory";
// import {Storage} from "../Pages/Storage";
import React from "react";

export interface Route {
    id: string
    'aria-controls': string
    page: JSX.Element
}

export const Routes: Route[] = [
    {
        id: `wishlist`,
        'aria-controls': `wishlist`,
        page: <Wishlist/>
    },
    // {
    //     id: `inventory`,
    //     'aria-controls': `inventory`,
    //     page: <Inventory/>
    // }
    // {
    //     id: `manage data storage`,
    //     'aria-controls': `manage data storage`,
    //     page: <Storage/>
    // }
]
