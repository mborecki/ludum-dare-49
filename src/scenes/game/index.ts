import getAudioPlayer from "../audio";
import GameMap from "./game-objects/map";
import PlayerGO from "./game-objects/player";

export default class GameScene extends Phaser.Scene {

    private audio = getAudioPlayer();

    constructor() {
        super(null);
    }

    create() {
        const map = new GameMap(this);

        map.setPosition(50,50);

        this.add.existing(map);
        this.add.existing(new PlayerGO(this));
    }
}
