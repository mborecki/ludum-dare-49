import { GameState, Passangers } from "../../types";
import CancelButton from "./cancel";
import PickUpButton from "./pick-up";

export default class CarPanel extends Phaser.GameObjects.Container {

    private pickUp1: PickUpButton;
    private pickUp2: PickUpButton;

    private person1: Phaser.GameObjects.Sprite;
    private person2: Phaser.GameObjects.Sprite;

    constructor(scene: Phaser.Scene) {
        super(scene);

        const bg = new Phaser.GameObjects.Sprite(scene, 0, 0, 'car', 'background');
        bg.setOrigin(0);

        this.add(bg);

        this.person1 = new Phaser.GameObjects.Sprite(scene, 68, 100, 'car', 'person');
        this.person2 = new Phaser.GameObjects.Sprite(scene, 178, 100, 'car', 'person');

        this.add(this.person1);
        this.add(this.person2);

        this.pickUp1 = new PickUpButton(scene);
        this.pickUp1.setPosition(22, 100);
        this.add(this.pickUp1);

        this.pickUp1.on('pointerdown', () => {
            this.emit('pick-up', 1);
        })


        this.pickUp2 = new PickUpButton(scene);
        this.pickUp2.setPosition(133, 100);
        this.add(this.pickUp2);

        this.pickUp2.on('pointerdown', () => {
            this.emit('pick-up', 2);
        })
    }

    public updateCar(data: GameState) {

        const isClientHere = data.clients.find(c => c.x === data.player.x && c.y === data.player.y);

        if (data.player.passangers.slot1) {
            this.person1.setVisible(true);
            this.pickUp1.setVisible(false);
        } else {
            this.person1.setVisible(false);
            this.pickUp1.setVisible(false);
            if (isClientHere) {
                this.pickUp1.setVisible(true);
            }
        }

        if (data.player.passangers.slot2) {
            this.person2.setVisible(true);
            this.pickUp2.setVisible(false);
        } else {
            this.person2.setVisible(false);
            this.pickUp2.setVisible(false);
            if (isClientHere) {
                this.pickUp2.setVisible(true);
            }
        }
    }
}
