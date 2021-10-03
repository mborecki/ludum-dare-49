import getAudioPlayer from "../audio";
import GAME_CONFIG from "./config";
import CarPanel from "./game-objects/car";
import GameOver from "./game-objects/game-over";
import GameMap from "./game-objects/map";
import PlayerGO from "./game-objects/map/player";
import GameMoney from "./game-objects/money";
import GamePoints from "./game-objects/points";
import GameProgram from "./game-objects/program";
import SidePanel from "./game-objects/side-panel";
import RULES from "./rules";
import { DIRECTION, Goal, Procedure, PROCEDURE_TYPE } from "./types";
import generateGameState from "./utils/generate-game-state";

export default class GameScene extends Phaser.Scene {

    private audio = getAudioPlayer();

    private gameState = generateGameState();

    private map: GameMap;
    private program: GameProgram;

    private money: GameMoney;
    private points: GamePoints;

    private carPanel: CarPanel;

    private gameOver: GameOver;

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

        this.program.on('buy', (dir: DIRECTION) => {
            if (this.gameState.money >= RULES.ADD_COST) {

                this.changeMoney(-RULES.ADD_COST);

                const newStep = {
                    type: PROCEDURE_TYPE.DIRECTION,
                    direction: dir
                }

                this.gameState.program.procedures.splice(this.gameState.program.activeStep, 0, newStep);
                this.program.addStep(newStep, this.gameState.program.activeStep);
            }
        });

        panel.add(this.program);

        this.money = new GameMoney(this);

        this.money.setPosition(796, 670);
        this.add.existing(this.money);
        this.money.setValue(this.gameState.money);

        this.points = new GamePoints(this);

        this.points.setPosition(0, 670);
        this.add.existing(this.points);
        this.money.setValue(0);

        this.carPanel = new CarPanel(this);
        this.carPanel.setPosition(10, 560);

        this.carPanel.on('pick-up', (slot: number) => {
            this.pickUp(slot);
        })

        panel.add(this.carPanel);

        this.gameOver = new GameOver(this);
        this.gameOver.setVisible(false);
        this.add.existing(this.gameOver);

        this.updateGameState();
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

        this.updateGameState();
    }

    private setActiveStep(index: number) {
        this.gameState.program.activeStep = index;
        this.program.setPointer(index);
    }

    private changeMoney(diff: number) {
        this.gameState.money += diff;
        this.money.setValue(this.gameState.money);

        this.money.spawnInfo(diff);

        if (this.gameState.money < 0) {
            console.log('GAME OVER!!!')
            this.gameOver.setVisible(true);
        }
    }

    private procedureError() {
        const index = this.gameState.program.activeStep;
        this.program.deleteStep(index);
        const deleted = this.gameState.program.procedures.splice(index, 1);

        this.cameras.main.flash(300, 255, 0, 0);

        this.changeMoney(RULES.ERROR_COST)

    }

    private updateGameState() {

        if (this.gameState.player.passangers.slot1 || this.gameState.player.passangers.slot2) {
            const goal = this.gameState.goals.find(g => g.x === this.gameState.player.x && g.y === this.gameState.player.y);

            if (goal) {
                if (this.gameState.player.passangers.slot1) {
                    this.gameState.player.passangers.slot1 = false
                } else {
                    this.gameState.player.passangers.slot2 = false
                }

                this.gameState.goals = this.gameState.goals.filter(g => g.x !== this.gameState.player.x || g.y !== this.gameState.player.y);
                this.changeMoney(RULES.EARNINGS);
                this.points.addPoint();
            }

        }


        while (this.gameState.clients.length < 5) {
            const c = {
                x: Math.floor(Math.random() * GAME_CONFIG.MAP_WIDTH),
                y: Math.floor(Math.random() * GAME_CONFIG.MAP_HEIGHT),
                goalType: 'red'
            }

            const old = this.gameState.clients.find(x => {
                return x.x === c.x && x.y === c.y
            }) || this.gameState.goals.find(x => {
                return x.x === c.x && x.y === c.y
            })

            if (!old) {
                this.gameState.clients.push(c);
            }
        }

        this.map.updateClients(this.gameState.clients);

        while (this.gameState.goals.length < 5) {
            const g: Goal = {
                id: 'id',
                x: Math.floor(Math.random() * GAME_CONFIG.MAP_WIDTH),
                y: Math.floor(Math.random() * GAME_CONFIG.MAP_HEIGHT),
                type: 'red'
            }

            const old = this.gameState.clients.find(x => {
                return x.x === g.x && x.y === g.y
            }) || this.gameState.goals.find(x => {
                return x.x === g.x && x.y === g.y
            })

            if (!old) {
                this.gameState.goals.push(g);
            }
        }

        this.map.updateGoals(this.gameState.goals);
        this.carPanel.updateCar(this.gameState);
    }

    private pickUp(slot: number) {
        switch (slot) {
            case 1:
                this.gameState.player.passangers.slot1 = true;
                break;
            case 2:
                this.gameState.player.passangers.slot2 = true;
                break;
        }

        this.gameState.clients = this.gameState.clients.filter(c => c.x !== this.gameState.player.x || c.y !== this.gameState.player.y);

        this.updateGameState();
    }
}
