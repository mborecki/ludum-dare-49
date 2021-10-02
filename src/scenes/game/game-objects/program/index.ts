import { GameState } from "../../types";
import ProgramStep from "./step";

export default class GameProgram extends Phaser.GameObjects.Container {

    private pointer: Phaser.GameObjects.Graphics;
    private steps: ProgramStep[] = [];

    constructor(scene: Phaser.Scene) {
        super(scene,0,0);

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

        console.log('#1', this.steps.length);

        this.steps.splice(index, 1);
        step.destroy();

        console.log('#2', this.steps.length);
        this.steps.forEach((s, index) => {
            s.setPosition(20, index * 40);
        });
    }
}
