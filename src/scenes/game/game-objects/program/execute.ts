export default class ExecuteButton extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0);

        this.setInteractive({
            hitArea: new Phaser.Geom.Rectangle(0, 0, 262, 50),
            hitAreaCallback: Phaser.Geom.Rectangle.Contains,
            useHandCursor: true
        });

        const frame = new Phaser.GameObjects.Sprite(scene, 131, 25, 'panel', 'frame');
        const sprite = new Phaser.GameObjects.Sprite(scene, 131, 25, 'panel', 'play');

        this.add(frame);
        this.add(sprite);

        this.on('pointerover', () => {
            frame.setTint(0xff0000);
            sprite.setTint(0xff0000);
        })

        this.on('pointerout', () => {
            frame.setTint(0xffffff);
            sprite.setTint(0xffffff);
        })
    }


}
