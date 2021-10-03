export default class PickUpButton extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0);

        const bg = new Phaser.GameObjects.Graphics(scene);

        bg.fillStyle(0x0d0d0d);
        bg.fillRect(0, 0, 95, 28);
        this.add(bg);

        this.setInteractive({
            hitArea: new Phaser.Geom.Rectangle(0, 0, 95, 28),
            hitAreaCallback: Phaser.Geom.Rectangle.Contains,
            useHandCursor: true
        });

        const frame = new Phaser.GameObjects.Sprite(scene, 0, 0, 'car', 'pick-up');
        frame.setOrigin(0);

        this.add(frame);

        this.on('pointerover', () => {
            frame.setTint(0xff0000);
        })

        this.on('pointerout', () => {
            frame.setTint(0xffffff);
        })
    }


}
