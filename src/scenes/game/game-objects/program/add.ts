export default class AddButton extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0);

        const bg = new Phaser.GameObjects.Graphics(scene);

        bg.fillStyle(0x0d0d0d);
        bg.fillRect(0,0,242, 50);
        this.add(bg);

        this.setInteractive({
            hitArea: new Phaser.Geom.Rectangle(0, 0, 262, 50),
            hitAreaCallback: Phaser.Geom.Rectangle.Contains,
            useHandCursor: true
        });

        const frame = new Phaser.GameObjects.Sprite(scene, 121, 25, 'panel', 'frame-big');
        const sprite = new Phaser.GameObjects.Sprite(scene, 121, 25, 'panel', 'add');

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
