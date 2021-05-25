export interface Drop {
    location: string
    type: string
    chance: number
    rarity: string
}

export interface LevelStat {
    stats: string[]
}

export class RawItem {
    uniqueName: string = ''
    name: string = ''
    type: string = ''
    description: string = ''
    imageName: string = ''
    category: string = ''
    tradable: boolean = false
    levelStats?: LevelStat
    rarity?: string
    excludeFromCodex?: boolean
    components: RawItem[] = []
    buildQuantity?: number
    itemCount?: number
}