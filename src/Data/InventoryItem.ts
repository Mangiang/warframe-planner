export class InventoryItem {
    name: string
    id: string
    have: number
    total: number

    constructor(name?: string, id?: string, have?: number, total?: number) {
        this.name = name ? name : '';
        this.id = id ? id : '';
        this.have = have ? have : 0;
        this.total = total ? total : 1;
    }
}