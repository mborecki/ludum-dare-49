import getAudioPlayer from "../audio";
import GameMap from "./game-objects/map";
import PlayerGO from "./game-objects/map/player";
import GameMoney from "./game-objects/money";
import GameProgram from "./game-objects/program";
import SidePanel from "./game-objects/side-panel";
import RULES from "./rules";
import { Procedure, PROCEDURE_TYPE } from "./types";
import generateGameState from "./utils/generate-game-state";

export default class GameScene extends Phaser.Scene {

    private audio = getAudioPlayer();

    private gameState = generateGameState();

    private map: GameMap;
    private program: GameProgram;

    private money: GameMoney;

    constructor() {
        super(null);
    }

    preload() {
        this.load.scenePlugin('rexuiplugin', '/assets/vendors/rexuiplugin.min.js', 'rexUI', 'rexUI');
    }

    create() {
        const panel = new SidePanel(this);
        panel.setPosition(1018, 0);
        this.add.existing(panel);

        this.map = new GameMap(this);
        this.map.loadGameState(this.gameState);

        this.map.setPosition(0, 0);

        this.add.existing(this.map);

        this.program = new GameProgram(this);
        this.program.loadGameState(this.gameState);

        this.program.on('execute-clicked', () => {
            this.nextStep();
        });

        this.program.setPosition(10, 10);

        panel.add(this.program);

        this.money = new GameMoney(this);

        this.money.setPosition(1000, 600);
        this.add.existing(this.money);
        this.money.setValue(this.gameState.money);

        window['nextStep'] = () => {
            this.nextStep();
        }
    }

    private nextStep() {
        this.executeStep(this.gameState.program.procedures[this.gameState.program.activeStep]);
    }

    private executeStep(procedure: Procedure) {
        switch (procedure.type) {
            case PROCEDURE_TYPE.DIRECTION:
                if (this.map.movePlayer(procedure.direction)) {
                    this.setActiveStep(this.gameState.program.activeStep + 1);
                } else {
                    this.procedureError();
                }
                break;

            case PROCEDURE_TYPE.RESTART_PROGRAM:
                this.setActiveStep(0);
                break;
        }
    }

    private setActiveStep(index: number) {
        this.gameState.program.activeStep = index;
        this.program.setPointer(index);
    }

    private changeMoney(diff: number) {
        this.gameState.money += diff;
        this.money.setValue(this.gameState.money);

        if (this.gameState.money < 0) {
            throw "BANKRUT!!!!";
        }
    }

    private procedureError() {
        const index = this.gameState.program.activeStep;
        this.program.deleteStep(index);
        const deleted = this.gameState.program.procedures.splice(index, 1);

        this.changeMoney(RULES.ERROR_COST)

    }
}
