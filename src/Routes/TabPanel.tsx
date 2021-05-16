import React from "react";
import {Box} from "@material-ui/core";
import {Routes} from "./Routes";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export const TabPanel = (props: TabPanelProps) => {
    const {children, value, index, ...other} = props;

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={Routes[index].id}
            aria-labelledby={Routes[index].id}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </Box>
    );
}