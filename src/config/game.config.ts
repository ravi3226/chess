export interface Position {
    x: number,
    y: number
}

export interface Game {
    board: object,
    pieceTypes: object,
    teamColors: object
}

export interface Player {
    id: string,
    waiting: boolean,
    turn: boolean,
    teamColor: number,
    game: Game,
    oponent: string | null
}