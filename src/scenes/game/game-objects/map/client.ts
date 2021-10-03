export default class ClientGO extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene) {
        super(scene,0,0);

        const sprite = new Phaser.GameObjects.Sprite(scene, 7,-7, 'map', 'client-red');
        sprite.setOrigin(0,1);

        this.add(sprite);

        this.scene.add.tween({
            targets: sprite,
            duration: 500,
            yoyo: true,
            repeat: -1,
            y: -10,
            x: 8
        })
    }
}
