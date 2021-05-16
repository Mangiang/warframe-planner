import React from "react";
import {AppBar, Tab, Tabs} from "@material-ui/core";
import {Routes} from "./Routes";
import {TabPanel} from "./TabPanel";


export const Navigation = () => {
    const [value, setValue] = React.useState<number>(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (<>
        <AppBar position="static">
            <Tabs value={value} onChange={handleChange} aria-label="warframe-planner navigation" centered>
                {Routes.map(tab => <Tab key={tab.id} label={tab.id} {...tab}/>)}
            </Tabs>
        </AppBar>
        {Routes.map((tab, idx) => <TabPanel key={idx} value={value} index={idx}>{tab.page}</TabPanel>)}
    </>);
}