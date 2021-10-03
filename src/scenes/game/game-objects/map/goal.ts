export default class GoalGO extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene) {
        super(scene,0,0);

        const sprite = new Phaser.GameObjects.Sprite(scene, -7,-7, 'map', 'target-red');
        sprite.setOrigin(1,1);

        this.add(sprite);

        this.scene.add.tween({
            targets: sprite,
            duration: 500,
            yoyo: true,
            repeat: -1,
            y: -10,
            x: -8
        })
    }
}
