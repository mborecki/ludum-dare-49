import * as Phaser from 'phaser';

export default class BootState extends Phaser.Scene {
    constructor(private firstScene: string) {
        super(null);
    }

    preload() {
        this.load.atlas('_ph', 'assets/generated/_ph.png', 'assets/generated/_ph.json');
        this.load.atlas('tiles', 'assets/generated/tiles.png', 'assets/generated/tiles.json');
        this.load.atlas('roads', 'assets/generated/roads.png', 'assets/generated/roads.json');
        this.load.atlas('map', 'assets/generated/map.png', 'assets/generated/map.json');

        this.load.atlas('blocks', 'assets/generated/blocks.png', 'assets/generated/blocks.json');

        this.load.bitmapFont('press-start-2p', 'assets/press-start-2p_0.png', 'assets/press-start-2p.xml');
    }

    create() {
        this.game.scene.start(this.firstScene);
    }
}
