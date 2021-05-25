import {atom} from "recoil";
import {SearchItem} from "../../Data/SearchItem";

export const ItemsList = atom<SearchItem[]>({
    key: 'items/list',
    default: [] as SearchItem[]
})