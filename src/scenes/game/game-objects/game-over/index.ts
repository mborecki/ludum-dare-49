export default class GameOver extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0);

        const box = new Phaser.GameObjects.Graphics(this.scene);
        box.fillStyle(0x0d0d0d);
        box.fillRect(100, 100, 800, 520);
        box.lineStyle(1, 0x8fd96c, 1);
        box.moveTo(100, 100);
        box.lineTo(900, 100);
        box.lineTo(900, 620);
        box.lineTo(100, 620);
        box.lineTo(100, 100);
        box.stroke();

        this.setInteractive(new Phaser.Geom.Rectangle(0, 0, 1280, 720), Phaser.Geom.Rectangle.Contains);

        this.add(box);

        const text = new Phaser.GameObjects.Text(this.scene, 1000/2, 720/2, 'GAME OVER!', {
            fontSize: '36px',
            color: '#8fd96c'
        })
        text.setOrigin(.5)

        this.add(text);
    }

    public setVisible(value: boolean) {
        super.setVisible(value);

        if (value) {
            setTimeout(() => {
                console.log('xxxxxx');
                this.on('pointerdown', () => {
                    console.log('cccc');
                    this.scene.scene.start('mainScene')
                });
            }, 2000);
        }

        return this;
    }
}
