import GAME_CONFIG from "../../../config";

export default class PlayerGO extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0);

        const debug = new Phaser.GameObjects.Graphics(scene);

        this.add(debug);

        debug.fillStyle(0xffffff, 1);
        debug.fillCircle(0, 0, 15);
    }
    movePlayerTo(x: number, y: number) {
        this.setPosition(50 + x * GAME_CONFIG.INTERSECTION_DISTANCE, 50 + y * GAME_CONFIG.INTERSECTION_DISTANCE);
    }
}
