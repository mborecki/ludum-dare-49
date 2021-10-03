import GAME_CONFIG from "../config";
import RULES from "../rules";
import { DIRECTION, GameState, PROCEDURE_TYPE } from "../types";
import generateIntersections from "./generate-intersections";

export default function generateGameState(): GameState {
    return {
        intersections: generateIntersections(GAME_CONFIG.MAP_WIDTH, GAME_CONFIG.MAP_HEIGHT),
        player: {
            x: Math.floor(GAME_CONFIG.MAP_WIDTH/2),
            y: Math.floor(GAME_CONFIG.MAP_HEIGHT/2),
            passangers: {
                slot1: false,
                slot2: false,
            }
        },
        clients: [],
        goals: [],
        money: RULES.START_MONEY,
        program: {
            procedures: [
                {
                    type: PROCEDURE_TYPE.DIRECTION,
                    direction: DIRECTION.N
                },
                {
                    type: PROCEDURE_TYPE.DIRECTION,
                    direction: DIRECTION.E
                },
                {
                    type: PROCEDURE_TYPE.DIRECTION,
                    direction: DIRECTION.S
                },
                {
                    type: PROCEDURE_TYPE.DIRECTION,
                    direction: DIRECTION.W
                },
                {
                    type: PROCEDURE_TYPE.DIRECTION,
                    direction: DIRECTION.N
                },
                {
                    type: PROCEDURE_TYPE.DIRECTION,
                    direction: DIRECTION.E
                },
                {
                    type: PROCEDURE_TYPE.DIRECTION,
                    direction: DIRECTION.S
                },
                {
                    type: PROCEDURE_TYPE.DIRECTION,
                    direction: DIRECTION.W
                },
                {
                    type: PROCEDURE_TYPE.DIRECTION,
                    direction: DIRECTION.N
                },
                {
                    type: PROCEDURE_TYPE.DIRECTION,
                    direction: DIRECTION.E
                },
                {
                    type: PROCEDURE_TYPE.DIRECTION,
                    direction: DIRECTION.S
                },
                {
                    type: PROCEDURE_TYPE.DIRECTION,
                    direction: DIRECTION.W
                },
                {
                    type: PROCEDURE_TYPE.RESTART_PROGRAM
                }
            ],
            activeStep: 0
        }
    }
}
