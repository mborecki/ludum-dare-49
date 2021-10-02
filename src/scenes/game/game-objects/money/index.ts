export default class GameMoney extends Phaser.GameObjects.Container {
    private text: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0);

        this.text = new Phaser.GameObjects.Text(scene, 0, 0, 'Money: ???', {});

        this.add(this.text);
    }

    public setValue(v: number) {
        this.text.setText(`Money: ${v}`);
    }
}
