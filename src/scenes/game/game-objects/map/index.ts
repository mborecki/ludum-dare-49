import GAME_CONFIG from "../../config";
import generateIntersections from "../../utils/generate-intersections";
import MapDebug from "./debug";

export default class GameMap extends Phaser.GameObjects.Container {



    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0);

        const intersections = generateIntersections(GAME_CONFIG.MAP_WIDTH, GAME_CONFIG.MAP_HEIGHT);

        const mapDebug = new MapDebug(scene);
        mapDebug.drawMap(intersections);

        this.add(mapDebug);
    }
}
