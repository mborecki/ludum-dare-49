import GAME_CONFIG from "../../../config";
import { DIRECTION, Intersection } from "../../../types";
import { getRandomElement } from "./elements";

const GRID_SIZE = 14;

export default class MapBlocks extends Phaser.GameObjects.Container {

    private debug: Phaser.GameObjects.Graphics;

    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0);

        this.debug = new Phaser.GameObjects.Graphics(scene);
        // this.add(this.debug);
    }

    createBlocks(intersections: Intersection[], mapWidth: number, mapHeight: number) {
        const width = mapWidth - 1;
        const height = mapHeight - 1;

        const gridWidth = 1 + (width * 7);
        const gridHeight = 1 + (height * 7);

        const grid = Array(gridWidth * gridHeight).fill(false);

        intersections.forEach(int => {
            const baseIndex = int.y * 7 * gridWidth + int.x * 7
            grid[baseIndex] = true;

            if (int.open.includes(DIRECTION.S)) {
                for (let i = 1; i < 7; i++) {
                    grid[baseIndex + i * gridWidth] = true;
                }
            }

            if (int.open.includes(DIRECTION.E)) {
                for (let i = 1; i < 7; i++) {
                    grid[baseIndex + i] = true;
                }
            }
        });

        grid.forEach((value, index) => {
            if (value) {
                this.debug.fillStyle(0xff0000, .3);
                this.debug.fillRect(50 + (index % gridWidth) * GRID_SIZE, 50 + Math.floor(index / gridWidth) * GRID_SIZE, GRID_SIZE, GRID_SIZE);
            }
        });

        const zones: number[][] = [];

        for (let i = 0; i < grid.length; i++) {
            if (!grid[i]) {
                const zone: number[] = [];

                findNeibors(i, zone, grid, gridWidth, gridHeight);

                // if (i % gridWidth && !grid[i - 1]) {
                //     zone.push(i - 1);
                //     grid[i - 1] = true;
                // }

                // if ((i % gridWidth) !== gridWidth - 1 && !grid[i + 1]) {
                //     zone.push(i + 1);
                //     grid[i + 1] = true;
                // }

                // if (Math.floor(i / gridWidth) && !grid[i - gridWidth]) {
                //     zone.push(i - gridWidth);
                //     grid[i - gridWidth] = true;
                // }

                // if (Math.floor(i / gridWidth) !== gridHeight - 1 && !grid[i + gridWidth]) {
                //     zone.push(i + gridWidth);
                //     grid[i + gridWidth] = true;
                // }

                if (zone.length) {
                    zones.push(zone);
                }
            }
        }

        zones.forEach(zone => {
            this.debug.fillStyle(Math.random() * 255 * 255 * 255, .8);
            zone.forEach(index => {
                this.debug.fillRect(50 + (index % gridWidth) * GRID_SIZE, 50 + Math.floor(index / gridWidth) * GRID_SIZE, GRID_SIZE - 2, GRID_SIZE - 2);
            })
        });

        // [zones[13]].forEach(zone => {
        zones.forEach(zone => {
            const { tiles, minX, minY, maxX, maxY } = zone.map(index => {
                return {
                    x: index % gridWidth,
                    y: Math.floor(index / gridWidth)
                }
            }).reduce((state, next) => {
                return {
                    tiles: [...state.tiles, next],
                    minX: Math.min(state.minX, next.x),
                    minY: Math.min(state.minY, next.y),
                    maxX: Math.max(state.maxX, next.x),
                    maxY: Math.max(state.maxY, next.y),
                };
            }, {
                tiles: [],
                minX: Infinity,
                minY: Infinity,
                maxX: 0,
                maxY: 0,
            });

            const normGridWidth = maxX - minX + 1;
            const normGridHeight = maxY - minY + 1;

            const normGrid = Array(normGridHeight * normGridWidth).fill(true);

            tiles.forEach(({ x, y }) => {
                normGrid[(y - minY) * normGridWidth + (x - minX)] = false;
            });

            const texture = new Phaser.GameObjects.RenderTexture(this.scene, 0, 0, normGridWidth * GRID_SIZE, normGridHeight * GRID_SIZE);

            normGrid.forEach((value, index) => {
                if (!value) {

                    let fitted = false;
                    do {
                        fitted = true;
                        const element = getRandomElement();

                        for (let i = 0; i < element.width; i++) {
                            for (let j = 0; j < element.height; j++) {
                                if (fitted && normGrid[index + i + j * normGridWidth]) {
                                    fitted = false;
                                }
                            }
                        }

                        if (fitted) {
                            for (let i = 0; i < element.width; i++) {
                                for (let j = 0; j < element.height; j++) {
                                    normGrid[index + i + j * normGridWidth] = true;
                                }
                            }

                            texture.drawFrame('blocks', 'tree-1', (index % normGridWidth) * GRID_SIZE, Math.floor(index / normGridWidth) * GRID_SIZE);
                        }

                    } while (!fitted);
                }
            });

            texture.setOrigin(0);
            texture.setPosition(50 + minX * GRID_SIZE - GRID_SIZE/2, 50 + minY * GRID_SIZE - GRID_SIZE/2);
            // texture.setTint(Math.random() * 255 * 255 * 255)

            this.add(texture);
        })
    }
}


function findNeibors(i: number, zone: number[], grid: boolean[], gridWidth: number, gridHeight: number) {

    if (
        i % gridWidth !== 0 &&
        i % gridWidth !== gridWidth - 1 &&
        Math.floor(i / gridWidth) !== 0 &&
        Math.floor(i / gridWidth) !== gridHeight - 1
    ) {
        zone.push(i);
        grid[i] = true;



        if (!grid[i - 1]) {
            findNeibors(i - 1, zone, grid, gridWidth, gridHeight);
        }

        if (!grid[i + 1]) {
            findNeibors(i + 1, zone, grid, gridWidth, gridHeight);
        }

        if (!grid[i - gridWidth]) {
            findNeibors(i - gridWidth, zone, grid, gridWidth, gridHeight);
        }

        if (!grid[i + gridWidth]) {
            findNeibors(i + gridWidth, zone, grid, gridWidth, gridHeight);
        }
    }
}
