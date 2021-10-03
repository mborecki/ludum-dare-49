export type BlockElement = {
    width: number,
    height: number,
    frame: string,
    y?: number,
}

const elements: BlockElement[] = [
    {
        width: 1,
        height: 1,
        frame: 'tree-1'
    },
    {
        width: 2,
        height: 1,
        frame: 'tree-2'
    },
    {
        width: 3,
        height: 2,
        frame: 'building-1'
    },
    {
        width: 2,
        height: 4,
        frame: 'building-2',
        y: -14,
    },
    {
        width: 2,
        height: 4,
        frame: 'building-2b',
        y: -14,
    },
    {
        width: 2,
        height: 4,
        frame: 'building-2c',
        y: -14,
    },
    {
        width: 2,
        height: 2,
        frame: 'building-3',
        y: -14,
    },
    {
        width: 3,
        height: 2,
        frame: 'building-4',
        y: -7,
    },
    {
        width: 4,
        height: 4,
        frame: 'building-5',
        y: -7,
    },
    {
        width: 1,
        height: 3,
        frame: 'building-6',
        y: -7,
    },
    {
        width: 1,
        height: 2,
        frame: 'building-7',
        y: -7,
    }
];

export function getRandomElement() {
    return elements[Math.floor(Math.random()*elements.length)];
}
