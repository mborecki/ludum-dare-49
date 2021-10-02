export type GameState = {
    intersections: Intersection[],
    player: Player,
    clients: Client[],
    goals: Goal[],
    money: number,
    program: Program
}

export enum DIRECTION {
    N = 'n',
    E = 'e',
    S = 's',
    W = 'w',
}

export enum GOAL_TYPE {
    FACTORY = 'factory',
    BAR = 'bar',
    HOTEL = 'hotel'
}

export type Intersection = {
    x: number,
    y: number,
    open: DIRECTION[]
}

export type Player = {
    x: number,
    y: number,
    passanger: Passanger[]
}

export type Passanger = {
    goalID?: string,
    goalType?: string
}

export type Client = {
    x: number,
    y: number,
    goalID?: string,
    goalType?: string
}

export type Goal = {
    id: string,
    x: number,
    y: number,
    type: string,
}

export type Program = {
    procedures: Procedure[],
    activeStep: number
}

export enum PROCEDURE_TYPE {
    DIRECTION = 'direction',
    RESTART_PROGRAM = 'restart'
}

export type Procedure = DirectionProcedure | RestartProcedure;

export interface BaseProcedure{
    type: PROCEDURE_TYPE
}

export interface DirectionProcedure extends BaseProcedure {
    type: PROCEDURE_TYPE.DIRECTION,
    direction: DIRECTION
}

export interface RestartProcedure extends BaseProcedure {
    type: PROCEDURE_TYPE.RESTART_PROGRAM
}
