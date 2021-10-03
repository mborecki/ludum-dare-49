import GAME_CONFIG from "../../config";
import { Client, DIRECTION, GameState, Goal } from "../../types";
import { getSibling } from "../../utils/generate-intersections";
import MapBlocks from "./blocks";
import ClientGO from "./client";
import MapDebug from "./debug";
import GoalGO from "./goal";
import PlayerGO from "./player";
import Roads from "./roads";

export default class GameMap extends Phaser.GameObjects.Container {

    private player: PlayerGO;
    private gameState?: GameState;

    private blocks: MapBlocks;

    private roads: Roads;

    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0);

        const bg = new Phaser.GameObjects.Sprite(scene, 0, 0, 'map', 'background');
        bg.setOrigin(0, 0);
        this.add(bg);

        this.roads = new Roads(scene);
        this.roads.setPosition(0, 0);
        this.add(this.roads);

        this.blocks = new MapBlocks(scene);
        this.add(this.blocks);

        this.player = new PlayerGO(scene);
        this.add(this.player);
    }

    public loadGameState(gameState: GameState) {
        this.gameState = gameState;
        const mapDebug = new MapDebug(this.scene);
        mapDebug.drawMap(gameState.intersections);
        mapDebug.setPosition(50, 50);
        // this.add(mapDebug);

        this.roads.createRoads(gameState.intersections);

        this.blocks.createBlocks(gameState.intersections, GAME_CONFIG.MAP_WIDTH, GAME_CONFIG.MAP_HEIGHT);

        this.player.setPosition(50 + gameState.player.x * GAME_CONFIG.INTERSECTION_DISTANCE, 50 + gameState.player.y * GAME_CONFIG.INTERSECTION_DISTANCE);
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

    private clients: ClientGO[] = []

    public updateClients(clients: Client[]) {
        this.clients.forEach(c => {
            c.destroy()});
        this.clients = [];

        clients.forEach((data) => {
            const c = new ClientGO(this.scene);

            c.setPosition(50 + data.x * GAME_CONFIG.INTERSECTION_DISTANCE, 50 + data.y * GAME_CONFIG.INTERSECTION_DISTANCE)
            this.add(c);
            this.clients.push(c);
        })
    }

    private goals: GoalGO[] = []

    public updateGoals(goals: Goal[]) {
        this.goals.forEach(c => c.destroy());
        this.goals = [];

        goals.forEach((data) => {
            const c = new GoalGO(this.scene);

            c.setPosition(50 + data.x * GAME_CONFIG.INTERSECTION_DISTANCE, 50 + data.y * GAME_CONFIG.INTERSECTION_DISTANCE)
            this.add(c);
            this.goals.push(c);
        })
    }
}
