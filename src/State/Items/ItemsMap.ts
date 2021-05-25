import {atomFamily, DefaultValue, GetRecoilValue, RecoilState, selectorFamily} from "recoil";
import {ItemsList} from "./ItemsList";
import {Item} from "../../Data/Item";

export const ItemsMap: (param?: string) => RecoilState<Item> = atomFamily<Item, string | undefined>({
    key: 'items/map',
    default: new Item()
})

export const ItemsMapAccess = selectorFamily<Item, string>({
    key: 'items/map_access',
    get: (id: string) => ({get}) => {
        return get(ItemsMap(id));
    },
    set: () => ({set, get}, newValue) => {
        if (!(newValue instanceof DefaultValue)) {
            set(ItemsMap(newValue.id), newValue);
            set(ItemsList, prev => ([...prev, {id: newValue.id, name: newValue.name}]))
        }
    },
})

const getFullItemTree  = (get: GetRecoilValue, id: string): Item => {
    const item: Item = get(ItemsMap(id))
    const newItem: Item = new Item(item.name, item.id, item.amount, [], item.imageName, item.tracked)
    newItem.components = !item.components ? [] : item.components.map(comp => getFullItemTree(get, comp.id))

    return newItem
}

export const ItemsFullTree = selectorFamily<Item | undefined, string | undefined>({
    key: 'items/map_full_tree',
    get: (id?: string) => ({get}) => {
        if (!id) return undefined;
        return getFullItemTree(get,id);
    },
})