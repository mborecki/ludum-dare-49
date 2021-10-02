import GAME_CONFIG from "../../config";
import { DIRECTION, Intersection } from "../../types";

export default class MapDebug extends Phaser.GameObjects.Graphics {
    constructor(scene: Phaser.Scene) {
        super(scene);
    }

    public drawMap(intersections: Intersection[]) {
        for (let i = 0; i < intersections.length; i++) {
            const intersection = intersections[i];
            this.fillStyle(0xffff00, 1);

            const x = intersection.x * GAME_CONFIG.INTERSECTION_DISTANCE;
            const y = intersection.y * GAME_CONFIG.INTERSECTION_DISTANCE;

            this.fillRect(x - 2, y - 2, 4, 4);

            if (intersection.open.includes(DIRECTION.N)) {
                this.lineStyle(1, 0x00ff00, 1);
                this.lineBetween(x, y, x, y - GAME_CONFIG.INTERSECTION_DISTANCE / 2)
            }

            if (intersection.open.includes(DIRECTION.S)) {
                this.lineStyle(1, 0x00ff00, 1);
                this.lineBetween(x, y, x, y + GAME_CONFIG.INTERSECTION_DISTANCE / 2)
            }

            if (intersection.open.includes(DIRECTION.E)) {
                this.lineStyle(1, 0x00ff00, 1);
                this.lineBetween(x, y, x + GAME_CONFIG.INTERSECTION_DISTANCE / 2, y)
            }

            if (intersection.open.includes(DIRECTION.W)) {
                this.lineStyle(1, 0x00ff00, 1);
                this.lineBetween(x, y, x - GAME_CONFIG.INTERSECTION_DISTANCE / 2, y)
            }
        }
    }
}
