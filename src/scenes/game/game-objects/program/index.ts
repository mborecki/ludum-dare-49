import { GameState } from "../../types";
import AddButton from "./add";
import ExecuteButton from "./execute";
import ProgramList from "./list";
import ProgramStep from "./step";

const TEXT_COLOR = 0x8fd96c;

export default class GameProgram extends Phaser.GameObjects.Container {

    private executeButton: ExecuteButton;
    private addButton: AddButton;

    private bg: Phaser.GameObjects.Graphics;

    private stepList: ProgramList;

    constructor(scene: Phaser.Scene) {
        super(scene,0,0);

        this.executeButton = new ExecuteButton(scene);
        this.executeButton.setPosition(0,0);

        this.executeButton.on('pointerdown', () => {
            this.emit('execute-clicked');
        })

        this.add(this.executeButton);

        this.addButton = new AddButton(scene);
        this.addButton.setPosition(0,370);

        this.add(this.addButton);

        this.stepList = new ProgramList(scene);
        this.stepList.setPosition(0, 60);

        this.add(this.stepList);

    }

    public loadGameState(gameState: GameState) {
        this.stepList.loadGameState(gameState);
    }

    public setPointer(index: number) {
        this.stepList.setPointer(index);
    }

    public deleteStep(index: number) {
        this.stepList.deleteStep(index);
    }
}
