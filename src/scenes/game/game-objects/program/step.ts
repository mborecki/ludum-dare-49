import { DIRECTION, Procedure, PROCEDURE_TYPE } from "../../types";

export default class ProgramStep extends Phaser.GameObjects.Container {

    private text: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0);

        this.text = new Phaser.GameObjects.Text(scene, 100, 20, '', {});
        this.text.setOrigin(.5);

        const gfx = new Phaser.GameObjects.Graphics(scene);

        gfx.lineStyle(1, 0xffffff, 1);
        gfx.beginPath()
        gfx.moveTo(0,0)
        gfx.lineTo(200, 0);
        gfx.lineTo(200, 40);
        gfx.lineTo(0, 40);
        gfx.lineTo(0, 0);
        gfx.strokePath();

        this.add(gfx);
        this.add(this.text);
    }

    public setProcedureData(data: Procedure) {
        switch (data.type) {
            case PROCEDURE_TYPE.DIRECTION:
                switch (data.direction) {
                    case DIRECTION.N:
                        this.text.setText('Drive N');
                        break;
                    case DIRECTION.S:
                        this.text.setText('Drive S');
                        break;
                    case DIRECTION.E:
                        this.text.setText('Drive E');
                        break;
                    case DIRECTION.W:
                        this.text.setText('Drive W');
                        break;
                }
                break;

            case PROCEDURE_TYPE.RESTART_PROGRAM:
                this.text.setText('Restart');
        }
    }
}
