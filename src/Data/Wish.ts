export class Wish {
    name: string
    id: string
    amount: number
    imageName: string
    tracked: boolean

    constructor(name?: string, id?: string, amount?: number, imageName?: string, tracked ?: boolean) {
        this.name = name ? name : '';
        this.id = id ? id : '';
        this.amount = amount ? amount : 1;
        this.imageName = imageName ? imageName : '';
        this.tracked = tracked ? tracked : false;
    }
}