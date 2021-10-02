import GAME_CONFIG from "../../../config";
import { DIRECTION, Intersection } from "../../../types";
import { reverseDirection } from "../../../utils/generate-intersections";

const ROAD_TILE_SIZE = 14;

export default class Roads extends Phaser.GameObjects.Container {

    private texture: Phaser.GameObjects.RenderTexture;

    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0);

        this.texture = new Phaser.GameObjects.RenderTexture(scene, 0, 0, 1018, 720);
        this.add(this.texture);
    }

    createRoads(intersections: Intersection[]) {

        const int1 = new Phaser.GameObjects.Sprite(this.scene, 0, 0, 'roads', 'dead-end');
        const int2 = new Phaser.GameObjects.Sprite(this.scene, 0, 0, 'roads', 'corner');
        const int3 = new Phaser.GameObjects.Sprite(this.scene, 0, 0, 'roads', 'cross-t');
        const int4 = new Phaser.GameObjects.Sprite(this.scene, 0, 0, 'roads', 'cross-x');

        const road1 = new Phaser.GameObjects.Sprite(this.scene, 0, 0, 'roads', 'road-1');
        const road2 = new Phaser.GameObjects.Sprite(this.scene, 0, 0, 'roads', 'road-2');


        intersections.forEach(int => {
            const x = 50 + int.x * GAME_CONFIG.INTERSECTION_DISTANCE;
            const y = 50 + int.y * GAME_CONFIG.INTERSECTION_DISTANCE;


            int.open.forEach(dis => {
                if (dis === DIRECTION.E) {
                    for (let i = 0; i < Math.floor(GAME_CONFIG.INTERSECTION_DISTANCE / ROAD_TILE_SIZE); i++) {
                        this.texture.draw(
                            road1,
                            50 + ROAD_TILE_SIZE / 2 + i * ROAD_TILE_SIZE + int.x * GAME_CONFIG.INTERSECTION_DISTANCE,
                            50 + int.y * GAME_CONFIG.INTERSECTION_DISTANCE
                        );
                    }
                }

                if (dis === DIRECTION.S) {
                    for (let i = 0; i < Math.floor(GAME_CONFIG.INTERSECTION_DISTANCE / ROAD_TILE_SIZE); i++) {
                        this.texture.draw(
                            road2,
                            50 + int.x * GAME_CONFIG.INTERSECTION_DISTANCE,
                            50 + i * ROAD_TILE_SIZE + int.y * GAME_CONFIG.INTERSECTION_DISTANCE + ROAD_TILE_SIZE / 2
                        );
                    }
                }
            })

            if (int.open.length === 4) {
                this.texture.draw(int4, x, y)
            }

            if (int.open.length === 3) {
                if (!int.open.includes(DIRECTION.N)) {
                    int3.setRotation(Math.PI);
                    this.texture.draw(int3, x, y)
                }
                if (!int.open.includes(DIRECTION.S)) {
                    int3.setRotation(0);
                    this.texture.draw(int3, x, y)
                }
                if (!int.open.includes(DIRECTION.E)) {
                    int3.setRotation(Math.PI * 1.5);
                    this.texture.draw(int3, x, y)
                }
                if (!int.open.includes(DIRECTION.W)) {
                    int3.setRotation(Math.PI * .5);
                    this.texture.draw(int3, x, y)
                }
            }

            if (int.open.length === 2) {
                if (int.open[0] === reverseDirection(int.open[1])) {
                    if (int.open.includes(DIRECTION.N)) {
                        this.texture.draw(road2, x, y);
                    }
                    if (int.open.includes(DIRECTION.E)) {
                        this.texture.draw(road1, x, y);
                    }
                } else {
                    if (int.open.includes(DIRECTION.N) && int.open.includes(DIRECTION.E)) {
                        int2.setRotation(Math.PI);
                        this.texture.draw(int2, x, y);
                    }
                    if (int.open.includes(DIRECTION.E) && int.open.includes(DIRECTION.S)) {
                        int2.setRotation(Math.PI*1.5);
                        this.texture.draw(int2, x, y);
                    }
                    if (int.open.includes(DIRECTION.S) && int.open.includes(DIRECTION.W)) {
                        int2.setRotation(0);
                        this.texture.draw(int2, x, y);
                    }
                    if (int.open.includes(DIRECTION.W) && int.open.includes(DIRECTION.N)) {
                        int2.setRotation(Math.PI * .5);
                        this.texture.draw(int2, x, y);
                    }
                }
            }

            if (int.open.length === 1) {

                if (int.open.includes(DIRECTION.W)) {
                    int1.setRotation(Math.PI);
                    this.texture.draw(int1, x, y)
                }
                if (int.open.includes(DIRECTION.E)) {
                    int1.setRotation(0);
                    this.texture.draw(int1, x, y)
                }
                if (int.open.includes(DIRECTION.N)) {
                    int1.setRotation(Math.PI * 1.5);
                    this.texture.draw(int1, x, y)
                }
                if (int.open.includes(DIRECTION.S)) {
                    int1.setRotation(Math.PI * .5);
                    this.texture.draw(int1, x, y)
                }
            }
        });
    }
}
