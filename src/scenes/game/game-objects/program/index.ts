import { GameState } from "../../types";
import AddButton from "./add";
import ExecuteButton from "./execute";
import ProgramList from "./list";
import ProgramStep from "./step";

const TEXT_COLOR = 0x8fd96c;

export default class GameProgram extends Phaser.GameObjects.Container {

    private header: Phaser.GameObjects.Text;

    private executeButton: ExecuteButton;
    private addButton: AddButton;

    private bg: Phaser.GameObjects.Graphics;

    private stepList: ProgramList;

    constructor(scene: Phaser.Scene) {
        super(scene,0,0);

        this.bg = new Phaser.GameObjects.Graphics(scene);

        this.bg.fillStyle(0x0d0d0d);
        this.bg.fillRect(0,0,242, 460);
        this.add(this.bg);

        this.header = new Phaser.GameObjects.Text(this.scene, 131, 60, 'Program', {
            color: '#8fd96c',
            fontSize: '24px'
        });



        this.header.setTint(0x00ff00);
        this.header.setOrigin(.5, 0);

        this.add(this.header);

        this.executeButton = new ExecuteButton(scene);
        this.executeButton.setPosition(0,0);

        this.add(this.executeButton);

        this.addButton = new AddButton(scene);
        this.addButton.setPosition(0,410);

        this.add(this.addButton);

        this.stepList = new ProgramList(scene);
        this.stepList.setPosition(0, 100);

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
