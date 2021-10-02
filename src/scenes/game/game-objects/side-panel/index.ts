export default class SidePanel extends Phaser.GameObjects.Container {


    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0);

        const bg = new Phaser.GameObjects.Graphics(scene);

        bg.fillStyle(0x16260f, 1);
        bg.fillRect(0,0, 262, 720);

        this.add(bg);
    }
}
