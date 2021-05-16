export class Wish {
    name = ''
    id = ''
    amount = 1
    imageName: string = ''


    constructor(name?: string, id?: string, amount?: number, imageName?: string) {
        this.name = name ? name : '';
        this.id = id ? id : '';
        this.amount = amount ? amount : 1;
        this.imageName = imageName ? imageName : '';
    }
}