import { DIRECTION } from "../../types";

export default class InstallMenu extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0);

        const buttonN = new InstallButtom(scene, DIRECTION.N);
        const buttonS = new InstallButtom(scene, DIRECTION.S);
        const buttonE = new InstallButtom(scene, DIRECTION.E);
        const buttonW = new InstallButtom(scene, DIRECTION.W);

        buttonN.setPosition(0, 0);
        buttonS.setPosition(126, 0);
        buttonE.setPosition(0, 60);
        buttonW.setPosition(126, 60);

        buttonN.on('pointerdown', () => {
            this.emit('buy', DIRECTION.N);
        })

        buttonS.on('pointerdown', () => {
            this.emit('buy', DIRECTION.S);
        })

        buttonW.on('pointerdown', () => {
            this.emit('buy', DIRECTION.W);
        })

        buttonE.on('pointerdown', () => {
            this.emit('buy', DIRECTION.E);
        })


        this.add(buttonN);
        this.add(buttonS);
        this.add(buttonE);
        this.add(buttonW);

    }
}

class InstallButtom extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene, dir: DIRECTION) {
        super(scene, 0, 0);


        const bg = new Phaser.GameObjects.Graphics(scene);

        bg.fillStyle(0x0d0d0d);
        bg.fillRect(0, 0, 116, 50);
        this.add(bg);

        this.setInteractive({
            hitArea: new Phaser.Geom.Rectangle(0, 0, 116, 50),
            hitAreaCallback: Phaser.Geom.Rectangle.Contains,
            useHandCursor: true
        });

        const frame = new Phaser.GameObjects.Sprite(scene, 58, 25, 'panel', 'frame-small');

        const sprite = new Phaser.GameObjects.Sprite(scene, 39, 25, 'panel', '');

        const text = new Phaser.GameObjects.Text(this.scene, 78, 25, '$3', {
            color: 'red',
            fontSize: '20px'
        })
        text.setOrigin(.5);

        switch (dir) {
            case DIRECTION.N:
                sprite.setTexture('panel', 'arrow-up');
                break;
            case DIRECTION.S:
                sprite.setTexture('panel', 'arrow-down');
                break;
            case DIRECTION.E:
                sprite.setTexture('panel', 'arrow-right');
                break;
            case DIRECTION.W:
                sprite.setTexture('panel', 'arrow-left');
                break;
        }

        this.add(frame);
        this.add(sprite);
        this.add(text);

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
