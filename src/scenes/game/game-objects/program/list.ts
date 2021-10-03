import { GameState } from "../../types";
import ProgramStep from "./step";

const SCROLL_HEIGHT = 300;

export default class ProgramList extends Phaser.GameObjects.Container {

    private steps: ProgramStep[] = [];
    private scrollPanel: Phaser.GameObjects.Container;
    private scrollBar: Phaser.GameObjects.Sprite;
    private listContainer: Phaser.GameObjects.Container;

    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0);

        this.listContainer = new Phaser.GameObjects.Container(scene);

        const mask = new Phaser.GameObjects.Graphics(scene);
        mask.fillStyle(0xff0000);
        mask.fillRect(1028, 110, 242, SCROLL_HEIGHT);
        this.scrollPanel = new Phaser.GameObjects.Container(scene);
        this.scrollPanel.add(mask);

        this.scrollPanel.setMask(new Phaser.Display.Masks.GeometryMask(scene, mask));

        this.scrollPanel.add(this.listContainer);

        // scene.add.existing(mask);

        this.scrollPanel.setInteractive(new Phaser.Geom.Rectangle(0, 0, 222, SCROLL_HEIGHT), Phaser.Geom.Rectangle.Contains);

        this.scrollPanel.on('wheel', (pointer, dx, dy, dz, event) => {
            this.scrollList(dy);
        })

        let panelDragged: [number, number] | null = null;

        this.scrollPanel.on('pointerdown', (pointer, dragX, dragY) => {
            console.log('dragStart');
            panelDragged = [dragX, dragY];
        })

        this.scrollPanel.on('pointermove', (pointer, dragX, dragY) => {
            if (panelDragged) {
                const dy = panelDragged[1] - dragY;
                console.log({ pointer, dragX, dragY }, dy)
                this.scrollList(dy, false);
                panelDragged = [dragX, dragY];
            }
        })

        this.scrollPanel.on('pointerup', () => {
            panelDragged = null;
        })

        this.scrollPanel.on('pointerout', () => {
            panelDragged = null;
        })

        this.scrollBar = new Phaser.GameObjects.Sprite(scene, 222, 0, 'panel', 'scroll');
        this.scrollBar.setOrigin(0);

        this.scrollBar.setInteractive();

        let scrollDragged: [number, number] | null = null;

        this.scrollBar.on('pointerdown', (pointer) => {
            console.log('dragStart');
            scrollDragged = [pointer.x, pointer.y];
        })

        this.scrollBar.on('pointermove', (pointer) => {
            if (scrollDragged) {
                const dy = scrollDragged[1] - pointer.y;
                this.scrollByBar(dy);
                scrollDragged = [pointer.x, pointer.y];
            }
        })

        this.scrollBar.on('pointerup', () => {
            scrollDragged = null;
        })

        this.scrollBar.on('pointerout', () => {
            scrollDragged = null;
        })



        this.add(this.scrollPanel);
        this.add(this.scrollBar);
    }

    private scrollList(dy: number, tween: boolean = true) {
        const newY = Math.max(SCROLL_HEIGHT - this.steps.length * 51, Math.min(0, this.listContainer.y - dy));
        const newYProcentage = newY / (SCROLL_HEIGHT - this.steps.length * 51);

        if (tween) {
            this.scene.add.tween({
                targets: this.listContainer,
                duration: 100,
                y: newY
            });

            this.scene.add.tween({
                targets: this.scrollBar,
                duration: 100,
                y: newYProcentage * (SCROLL_HEIGHT - 47)
            });
        } else {
            this.listContainer.setY(newY)
            this.scrollBar.setY(newYProcentage * (SCROLL_HEIGHT - 47))
        }

    }

    private scrollByBar(dy: number) {
        console.log({dy}, this.scrollBar.y)
        const newY = Math.min(SCROLL_HEIGHT - 47, Math.max(0, this.scrollBar.y - dy));
        console.log({newY})
        const newYProcentage = newY / (SCROLL_HEIGHT - 47);

        this.listContainer.setY(newYProcentage *(SCROLL_HEIGHT - this.steps.length * 51))
        this.scrollBar.setY(newY)
    }


    public loadGameState(gameState: GameState) {
        gameState.program.procedures.forEach((prod, index) => {
            const step = new ProgramStep(this.scene);
            step.setProcedureData(prod);
            step.setPosition(0, index * (51));
            this.steps.push(step);

            this.listContainer.add(step);
        });

        this.setPointer(gameState.program.activeStep);
    }

    public setPointer(index: number) {
        this.steps.forEach((s, i) => {
            s.markActive(i === index)
        });
    }

    public deleteStep(index: number) {
        const step = this.steps[index];

        this.steps.splice(index, 1);
        step.destroy();
        this.steps.forEach((s, index) => {
            s.setPosition(index * 51);
        });
    }
}
