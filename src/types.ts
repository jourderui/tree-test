export interface Item {
    id: number,
    name: string,
    parentId: number
}

export interface Items extends Array<Item | null> { }

