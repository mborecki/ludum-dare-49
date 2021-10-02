import { GameState } from "../../types";
import ProgramStep from "./step";

const TEXT_COLOR = 0x8fd96c;

export default class GameProgram extends Phaser.GameObjects.Container {

    private header: Phaser.GameObjects.Text;
    private pointer: Phaser.GameObjects.Graphics;
    private steps: ProgramStep[] = [];

    constructor(scene: Phaser.Scene) {
        super(scene,0,0);

        this.header = new Phaser.GameObjects.Text(this.scene, 131, 0, 'Program', {
            color: '#8fd96c',
            fontSize: '24px'
        });
        this.header.setTint(0x00ff00);
        this.header.setOrigin(.5, 0);

        this.add(this.header);

        this.pointer = new Phaser.GameObjects.Graphics(scene);

        this.pointer.fillStyle(0xffffff);
        this.pointer.fillCircle(-3,-3,6);

        this.add(this.pointer);
    }

    public loadGameState(gameState: GameState) {
        gameState.program.procedures.forEach((prod, index) => {
            const step = new ProgramStep(this.scene);
            step.setProcedureData(prod);
            step.setPosition(20, index * (40 + 4));
            this.steps.push(step);

            this.add(step);
        });

        this.setPointer(gameState.program.activeStep);
    }

    public setPointer(index: number) {
        this.pointer.setPosition(10, 20 + index * (40 + 4));
    }

    public deleteStep(index: number) {
        const step = this.steps[index];

        this.steps.splice(index, 1);
        step.destroy();
        this.steps.forEach((s, index) => {
            s.setPosition(20, index * 40);
        });
    }
}
