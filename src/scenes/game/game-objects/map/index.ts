import GAME_CONFIG from "../../config";
import { DIRECTION, GameState } from "../../types";
import { getSibling } from "../../utils/generate-intersections";
import MapDebug from "./debug";
import PlayerGO from "./player";
import Roads from "./roads";

export default class GameMap extends Phaser.GameObjects.Container {

    private player: PlayerGO;
    private gameState?: GameState;

    private roads: Roads;

    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0);

        const bg = new Phaser.GameObjects.Sprite(scene, 0,0,'map','background');
        bg.setOrigin(0,0);
        this.add(bg);

        this.roads = new Roads(scene);
        this.roads.setPosition(0,0);
        this.add(this.roads);

        this.player = new PlayerGO(scene);
        this.add(this.player);
    }

    public loadGameState(gameState: GameState) {
        this.gameState = gameState;
        const mapDebug = new MapDebug(this.scene);
        mapDebug.drawMap(gameState.intersections);
        mapDebug.setPosition(50,50);
        // this.add(mapDebug);

        this.roads.createRoads(gameState.intersections);

        this.player.setPosition(gameState.player.x * GAME_CONFIG.INTERSECTION_DISTANCE, gameState.player.y * GAME_CONFIG.INTERSECTION_DISTANCE);
    }

    public movePlayer(dir: DIRECTION) {
        if (this.gameState) {
            const playerIntersection = this.gameState.intersections.find(int => (int.x === this.gameState?.player.x && int.y === this.gameState?.player.y));

            if (!playerIntersection?.open.includes(dir)) {
                return false;
            }

            if (this.gameState?.player) {
                const target = getSibling(this.gameState?.player.x, this.gameState?.player.y, dir, this.gameState?.intersections);

                if (target) {
                    this.gameState.player.x = target.x;
                    this.gameState.player.y = target.y;

                    this.player.movePlayerTo(target.x, target.y);
                    return true
                }
            }

        }

        throw 'Something gone wrong';
    }
}
