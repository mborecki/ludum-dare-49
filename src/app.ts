import * as Phaser from 'phaser';
import MainScene from './scenes/main';
import BootScene from './scenes/boot';
import GameScene from './scenes/game';

export default class App extends Phaser.Game {
    constructor() {
        super({
            type: Phaser.AUTO,
            width: 1280,
            height: 720,
            pixelArt: true,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 200 }
                }
            }
        });

        // this.scene.add('bootScene', new BootScene('mainScene'), true);
        this.scene.add('bootScene', new BootScene('gameScene'), true);
        this.scene.add('mainScene', new MainScene());
        this.scene.add('gameScene', new GameScene());
    }
}
