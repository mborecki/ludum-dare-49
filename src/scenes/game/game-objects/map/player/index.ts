import GAME_CONFIG from "../../../config";

export default class PlayerGO extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0);

        const debug = new Phaser.GameObjects.Graphics(scene);

        // this.add(debug);

        debug.fillStyle(0xffffff, 1);
        debug.fillCircle(0, 0, 15);

        const target = new Phaser.GameObjects.Sprite(scene, 0, 3, 'map', 'player-target');
        target.setOrigin(.5, 1);

        this.add(target);

        const bubble = new Phaser.GameObjects.Sprite(scene, 0, -7, 'map', 'player-bubble');
        bubble.setOrigin(.5, 1);

        this.add(bubble);

        this.scene.add.tween({
            targets: bubble,
            duration: 500,
            yoyo: true,
            repeat: -1,
            y: -5
        })

    }
    movePlayerTo(x: number, y: number) {

        this.scene.add.tween({
            targets: this,
            duration: 500,
            x: 50 + x * GAME_CONFIG.INTERSECTION_DISTANCE,
            y: 50 + y * GAME_CONFIG.INTERSECTION_DISTANCE
        })
    }
}
