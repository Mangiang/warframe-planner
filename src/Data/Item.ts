export class Item {
    name = ''
    id = ''
    amount = 1
    imageName: string = ''
    components: Item[] = []


    constructor(name?: string, id?: string, amount?: number, components?: Item[], imageName?: string) {
        this.name = name ? name : '';
        this.id = id ? id : '';
        this.amount = amount ? amount : 1;
        this.components = components ? components : [];
        this.imageName = imageName ? imageName : '';
    }
}