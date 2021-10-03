export default class GameMoney extends Phaser.GameObjects.Container {
    private text: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0);

        const bg = new Phaser.GameObjects.Graphics(scene);
        bg.fillStyle(0x0d0d0d, 1);
        bg.fillRect(0, 0, 222, 50);

        this.add(bg);

        const frame = new Phaser.GameObjects.Sprite(scene, 0, 0, 'panel', 'frame');
        frame.setOrigin(0);

        this.add(frame);

        this.text = new Phaser.GameObjects.Text(scene, 111, 25, 'Money: ???', {});
        this.text.setOrigin(.5);

        this.add(this.text);


        window['xxxx'] = (v) => {this.spawnInfo(v)}
    }

    public setValue(v: number) {
        this.text.setText(`Money: ${v}`);
    }

    spawnInfo(value: number) {
        console.log('spawnInfo', value);
        const text = new Phaser.GameObjects.Text(this.scene, 111, 25, `${value < 0 ? '-' : ''}$${Math.abs(value)}`, {
            color: value > 0 ? 'green' : 'red',
            fontSize: '24px',
            backgroundColor: 'rgba(0,0,0,.8)',
            padding: {
                x: 5,
                y: 5
            }
        });
        text.setOrigin(.5);

        this.add(text);

        this.scene.add.tween({
            targets: text,
            duration: 1000,
            y: -25,
            onComplete: () => {
                text.destroy();
            }
        })

    }
}
