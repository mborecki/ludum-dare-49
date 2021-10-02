export type BlockElement = {
    width: number,
    height: number,
    frame: string
}

const elements: BlockElement[] = [
    {
        width: 1,
        height: 1,
        frame: 'tree-1'
    }
];

export function getRandomElement() {
    return elements[Math.floor(Math.random()*elements.length)];
}
