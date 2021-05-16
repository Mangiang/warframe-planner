import React from "react";
import {RawItem} from "../Data/WarframeItems";

export const ItemsListContext = React.createContext<Map<string, RawItem>>(new Map());
