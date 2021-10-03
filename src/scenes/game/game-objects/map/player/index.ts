import GAME_CONFIG from "../../../config";

export default class PlayerGO extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0);

        const debug = new Phaser.GameObjects.Graphics(scene);

        // this.add(debug);

        debug.fillStyle(0xffffff, 1);
        debug.fillCircle(0, 0, 15);

        const sprite = new Phaser.GameObjects.Sprite(scene, 0, 5, 'player', 'player0');
        sprite.setOrigin(.5, 1);

        const a = this.scene.anims.create({
            key: 'playerAnim',
            frames: 'player',
            frameRate: 3,
            repeat: -1,
            showOnStart: true
        });

        console.log(a)

        this.add(sprite);

        sprite.play('playerAnim');

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
