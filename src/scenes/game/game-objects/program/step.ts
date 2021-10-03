import { DIRECTION, Procedure, PROCEDURE_TYPE } from "../../types";

export default class ProgramStep extends Phaser.GameObjects.Container {

    private text: Phaser.GameObjects.Text;

    private playSprite: Phaser.GameObjects.Sprite;
    private icon: Phaser.GameObjects.Sprite;

    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0);

        this.text = new Phaser.GameObjects.Text(scene, 100, 20, '', {});
        this.text.setOrigin(.5);

        const frame = new Phaser.GameObjects.Sprite(scene, 0, 0, 'panel', 'frame');
        frame.setOrigin(0);

        this.playSprite = new Phaser.GameObjects.Sprite(scene, 50, 25, 'panel', 'play');
        this.playSprite.setOrigin(.5);

        this.icon = new Phaser.GameObjects.Sprite(scene, 125, 25, 'panel', 'arrow-up');
        this.icon.setOrigin(.5);


        this.add(frame);
        this.add(this.playSprite);
        this.add(this.icon);
        this.add(this.text);
    }

    public setProcedureData(data: Procedure) {
        switch (data.type) {
            case PROCEDURE_TYPE.DIRECTION:
                switch (data.direction) {
                    case DIRECTION.N:

                        this.icon.setTexture('panel', 'arrow-up');
                        break;
                    case DIRECTION.S:
                        this.icon.setTexture('panel', 'arrow-down');
                        break;
                    case DIRECTION.E:
                        this.icon.setTexture('panel', 'arrow-right');
                        break;
                    case DIRECTION.W:
                        this.icon.setTexture('panel', 'arrow-left');
                        break;
                }
                break;

            case PROCEDURE_TYPE.RESTART_PROGRAM:
                this.text.setText('Restart');
        }
    }

    public markActive(value: boolean) {
        this.playSprite.setTexture('panel', value ? 'play-active' : 'play');
    }

    destMe() {
        this.icon.setTint(0xff0000);
        this.playSprite.setTint(0xff0000);
    }
}
