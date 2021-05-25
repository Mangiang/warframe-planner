import {RawItem} from "./WarframeItems";

export const blacklist = [
    "Blueprint",
    "Chassis",
    "Neuroptics",
    "Systems"
]

export class Item {
    name = ''
    id = ''
    amount = 1
    imageName: string = ''
    components: Item[] = []
    tracked: boolean
    type: string

    constructor(name?: string, id?: string, amount?: number, components?: Item[], imageName?: string, tracked?: boolean, type?: string) {
        this.name = name ? name : 'ITEM_INVALID';
        this.id = id ? id : 'ITEM_INVALID';
        this.amount = amount ? amount : 1;
        this.components = components ? components : [];
        this.imageName = imageName ? imageName : '';
        this.tracked = tracked ? tracked : false;
        this.type = type ? type : '';
    }

    static fromRaw(item: RawItem): Item {
        const newItem = new Item()
        newItem.name = item.name;
        newItem.id = item.uniqueName;
        newItem.imageName = item.imageName;
        const newItems = item.components?.map(comp => Item.fromRaw(comp));
        newItem.components = newItems ? newItems : [];
        newItem.tracked = false;
        newItem.type = item.type;

        if (blacklist.includes(newItem.name)){
            newItem.type = newItem.name
            const splitId = newItem.id.split('/')
            newItem.name = splitId[splitId.length - 1]
                .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
                .replace(/[A-Z]([A-Z])/g, '$1')
        }

        return newItem;
    }

    static fromItem(item: Item): Item {
        const newItem = new Item()
        newItem.name = item.name;
        newItem.id = item.id;
        newItem.imageName = item.imageName;
        const newItems = item.components?.map(comp => Item.fromItem(comp));
        newItem.components = newItems ? newItems : [];
        newItem.tracked = false;
        newItem.type = item.type;

        if (blacklist.includes(newItem.name)){
            newItem.type = newItem.name
            const splitId = newItem.id.split('/')
            newItem.name = splitId[splitId.length - 1]
                .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
                .replace(/[A-Z]([A-Z])/g, '$1')
        }

        return newItem;
    }
}