const Y_cordinates = [0, 1, 2, 3, 4, 5, 6, 7]; // rank
const X_cordinates = [0, 1, 2, 3, 4, 5, 6, 7]; // file
export const swapKeyValue = (object) => {
    var ret = {};
    for (var key in object) {
        ret[object[key]] = key;
    }
    return ret;
};
export const pieceTypes = {
    empty: 0,
    pawn: 1,
    bishop: 2,
    knight: 3,
    rook: 4,
    queen: 5,
    king: 6
};
export const teamColors = {
    white: 1,
    black: 0
};
var board = {};
Y_cordinates.forEach((Y) => {
    X_cordinates.forEach((X) => {
        let pieceInfo = {};
        if (Y <= 1)
            pieceInfo['teamColor'] = teamColors.white;
        else if (Y >= 6)
            pieceInfo['teamColor'] = teamColors.black;
        if ((Y === 0 && X === 0) ||
            (Y === 7 && X === 0) ||
            (Y === 0 && X === 7) ||
            (Y === 7 && X === 7)) {
            pieceInfo['pieceType'] = pieceTypes.rook;
        }
        else if ((Y === 0 && X === 1) ||
            (Y === 7 && X === 1) ||
            (Y === 0 && X === 6) ||
            (Y === 7 && X === 6)) {
            pieceInfo['pieceType'] = pieceTypes.knight;
        }
        else if ((Y === 0 && X === 2) ||
            (Y === 0 && X === 5) ||
            (Y === 7 && X === 2) ||
            (Y === 7 && X === 2)) {
            pieceInfo['pieceType'] = pieceTypes.bishop;
        }
        else if ((Y === 0 && X === 3) ||
            (Y === 7 && X === 3)) {
            pieceInfo['pieceType'] = pieceTypes.queen;
        }
        else if ((Y === 0 && X === 4) ||
            (Y === 7 && X === 4)) {
            pieceInfo['pieceType'] = pieceTypes.king;
        }
        else if (Y === 1 || Y === 6) {
            pieceInfo['pieceType'] = pieceTypes.pawn;
        }
        else {
            pieceInfo['pieceType'] = pieceTypes.empty;
        }
        board[`${X}o${Y}`] = pieceInfo;
    });
});
export const game = {
    board,
    pieceTypes,
    teamColors
};
export const stringToPosition = (position) => {
    const x_y = position.split('o');
    try {
        if (x_y.length != 2)
            throw new Error("Function stringToPosition :: Position is invalid");
        else
            return {
                x: parseInt(x_y[0]),
                y: parseInt(x_y[1])
            };
    }
    catch (e) {
        throw new Error("Function stringToPosition :: Position is invalid");
    }
};
export const PositionToString = (position) => {
    return `${position.x}o${position.y}`;
};
export const isValidPosition = (position) => {
    const strPosition = PositionToString(position);
    return board[strPosition] ? true : false;
};
export const checkEmptyTileOrNot = (position, game) => {
    return (game.board[`${position.x}o${position.y}`].teamColor === undefined &&
        game.board[`${position.x}o${position.y}`].pieceType === 0) ? true : false;
};
/**
 * all 4 directions configure according to the function signature named 'findCross'
 */
export const directionConfig = {
    leftForward: { forwardOrBack: false, leftOrRight: false },
    rightForward: { forwardOrBack: false, leftOrRight: true },
    rightBack: { forwardOrBack: true, leftOrRight: false },
    leftBack: { forwardOrBack: true, leftOrRight: true }
};
/**
 * all knight's 8 possible move direction config according to the function signature named 'findKnightPosition'
 */
export const knightDirectionsConfig = {
    leftForwardSide: { leftOrRight: false, forwardOrBack: false, sideOrStreight: false },
    leftForwardStreight: { leftOrRight: false, forwardOrBack: false, sideOrStreight: true },
    leftBackSide: { leftOrRight: false, forwardOrBack: true, sideOrStreight: false },
    leftBackStreight: { leftOrRight: false, forwardOrBack: true, sideOrStreight: true },
    rightForwardSide: { leftOrRight: true, forwardOrBack: false, sideOrStreight: false },
    rightForwardStreight: { leftOrRight: true, forwardOrBack: false, sideOrStreight: true },
    rightBackSide: { leftOrRight: true, forwardOrBack: true, sideOrStreight: false },
    rightBackStreight: { leftOrRight: true, forwardOrBack: true, sideOrStreight: true },
};
export const positionExistOrNot = (position) => game.board[position] ? true : false;
export const findCrossPosition = ({ position, forwardOrBack, leftOrRight, steps }) => {
    if (!forwardOrBack) {
        if (!leftOrRight) {
            let cross = PositionToString({ x: position.x - steps, y: position.y + steps });
            return game.board[cross] ? { x: position.x - steps, y: position.y + steps } : null;
        }
        else {
            let cross = PositionToString({ x: position.x + steps, y: position.y + steps });
            return game.board[cross] ? { x: position.x + steps, y: position.y + steps } : null;
        }
    }
    else {
        if (!leftOrRight) {
            let cross = PositionToString({ x: position.x + steps, y: position.y - steps });
            return game.board[cross] ? { x: position.x + steps, y: position.y - steps } : null;
        }
        else {
            let cross = PositionToString({ x: position.x - steps, y: position.y - steps });
            return game.board[cross] ? { x: position.x - steps, y: position.y - steps } : null;
        }
    }
};
export const findKnightPosition = ({ position, forwardOrBack, leftOrRight, sideOrStreight }) => {
    if (!forwardOrBack) {
        if (sideOrStreight) {
            const upOne = { x: position.x, y: position.y + 1 };
            if (positionExistOrNot(PositionToString(upOne))) {
                if (!leftOrRight) {
                    const leftCrossUp = findCrossPosition({ position: upOne, steps: 1, ...directionConfig.leftForward });
                    return leftCrossUp;
                }
                else {
                    const rightCrossUp = findCrossPosition({ position: upOne, steps: 1, ...directionConfig.rightForward });
                    return rightCrossUp;
                }
            }
            else
                return null;
        }
        else {
            if (!leftOrRight) {
                const leftCrossUp = findCrossPosition({ position, steps: 1, ...directionConfig.leftForward });
                if (leftCrossUp) {
                    const leftOne = { x: leftCrossUp.x - 1, y: leftCrossUp.y };
                    if (positionExistOrNot(PositionToString(leftOne)))
                        return leftOne;
                    else
                        return null;
                }
                else
                    return null;
            }
            else {
                const rightCrossUp = findCrossPosition({ position, steps: 1, ...directionConfig.rightForward });
                if (rightCrossUp) {
                    const rightOne = { x: rightCrossUp.x + 1, y: rightCrossUp.y };
                    if (positionExistOrNot(PositionToString(rightOne)))
                        return rightOne;
                    else
                        return null;
                }
                else
                    return null;
            }
        }
    }
    else {
        if (sideOrStreight) {
            const downOne = { x: position.x, y: position.y - 1 };
            if (positionExistOrNot(PositionToString(downOne))) {
                if (!leftOrRight) {
                    const leftCrossUp = findCrossPosition({ position: downOne, steps: 1, ...directionConfig.leftBack });
                    return leftCrossUp;
                }
                else {
                    const rightCrossUp = findCrossPosition({ position: downOne, steps: 1, ...directionConfig.rightBack });
                    return rightCrossUp;
                }
            }
            else
                return null;
        }
        else {
            if (!leftOrRight) {
                const leftCrossUp = findCrossPosition({ position, steps: 1, ...directionConfig.leftBack });
                if (leftCrossUp) {
                    const leftOne = { x: leftCrossUp.x - 1, y: leftCrossUp.y };
                    if (positionExistOrNot(PositionToString(leftOne)))
                        return leftOne;
                    else
                        return null;
                }
                else
                    return null;
            }
            else {
                const rightCrossUp = findCrossPosition({ position, steps: 1, ...directionConfig.rightBack });
                if (rightCrossUp) {
                    const rightOne = { x: rightCrossUp.x + 1, y: rightCrossUp.y };
                    if (positionExistOrNot(PositionToString(rightOne)))
                        return rightOne;
                    else
                        return null;
                }
                else
                    return null;
            }
        }
    }
};
export const findPosibleMove = (position, game) => {
    if (!isValidPosition(position))
        throw new Error("Function findPosibleMove :: Invalid position provided.");
    else {
        var allPossibleMove = [];
        const strPosition = PositionToString(position);
        const positionInfo = game.board[strPosition];
        if (positionInfo.teamColor === 'undefined')
            throw new Error("Cant move empty tile");
        else {
            const swapedPieceType = swapKeyValue(pieceTypes);
            const pieceType = swapedPieceType[positionInfo.pieceType];
            console.log(pieceType);
            if (pieceType === 'pawn') {
                if (position.y === 1 && positionInfo.teamColor === teamColors.white) {
                    const isFirstEmpty = positionExistOrNot(`${position.x}o${position.y + 1}`) ? checkEmptyTileOrNot(stringToPosition(`${position.x}o${position.y + 1}`), game) : false;
                    if (isFirstEmpty) {
                        allPossibleMove.push(stringToPosition(`${position.x}o${position.y + 1}`));
                        const isSecondEmpty = positionExistOrNot(`${position.x}o${position.y + 2}`) ? checkEmptyTileOrNot(stringToPosition(`${position.x}o${position.y + 2}`), game) : false;
                        if (isSecondEmpty)
                            allPossibleMove.push(stringToPosition(`${position.x}o${position.y + 2}`));
                    }
                    const findLeftCross = findCrossPosition({
                        position,
                        forwardOrBack: positionInfo.teamColor === teamColors.white ? false : true,
                        leftOrRight: false,
                        steps: 1
                    });
                    const findRightCross = findCrossPosition({
                        position,
                        forwardOrBack: positionInfo.teamColor === teamColors.white ? false : true,
                        leftOrRight: true,
                        steps: 1
                    });
                    if (findLeftCross &&
                        positionExistOrNot(PositionToString(findLeftCross)) &&
                        game.board[PositionToString(findLeftCross)].pieceType !== 0 &&
                        game.board[PositionToString(findLeftCross)].teamColor !== positionInfo.teamColor)
                        allPossibleMove.push(findLeftCross);
                    if (findRightCross &&
                        positionExistOrNot(PositionToString(findRightCross)) &&
                        game.board[PositionToString(findRightCross)].pieceType !== 0 &&
                        game.board[PositionToString(findRightCross)].teamColor !== positionInfo.teamColor)
                        allPossibleMove.push(findRightCross);
                }
                else if (position.y === 6 && positionInfo.teamColor === teamColors.black) {
                    console.log('pawn is black');
                    const isFirstEmpty = positionExistOrNot(`${position.x}o${position.y - 1}`) ? checkEmptyTileOrNot(stringToPosition(`${position.x}o${position.y - 1}`), game) : false;
                    console.log('exists', positionExistOrNot(`${position.x}o${position.y - 1}`));
                    console.log('empty : ', checkEmptyTileOrNot(stringToPosition(`${position.x}o${position.y - 1}`), game));
                    if (isFirstEmpty) {
                        console.log('first is empty');
                        allPossibleMove.push(stringToPosition(`${position.x}o${position.y - 1}`));
                        const isSecondEmpty = positionExistOrNot(`${position.x}o${position.y - 2}`) ? checkEmptyTileOrNot(stringToPosition(`${position.x}o${position.y - 2}`), game) : false;
                        if (isSecondEmpty)
                            allPossibleMove.push(stringToPosition(`${position.x}o${position.y - 2}`));
                    }
                    const findLeftCross = findCrossPosition({
                        position,
                        forwardOrBack: positionInfo.teamColor === teamColors.white ? false : true,
                        leftOrRight: false,
                        steps: 1
                    });
                    const findRightCross = findCrossPosition({
                        position,
                        forwardOrBack: positionInfo.teamColor === teamColors.white ? false : true,
                        leftOrRight: true,
                        steps: 1
                    });
                    if (findLeftCross &&
                        positionExistOrNot(PositionToString(findLeftCross)) &&
                        game.board[PositionToString(findLeftCross)].pieceType !== 0 &&
                        game.board[PositionToString(findLeftCross)].teamColor !== positionInfo.teamColor)
                        allPossibleMove.push(findLeftCross);
                    if (findRightCross &&
                        positionExistOrNot(PositionToString(findRightCross)) &&
                        game.board[PositionToString(findRightCross)].pieceType !== 0 &&
                        game.board[PositionToString(findRightCross)].teamColor !== positionInfo.teamColor)
                        allPossibleMove.push(findRightCross);
                }
            }
            else if (pieceType === 'bishop') {
                Object.keys(directionConfig).forEach(direction => {
                    let steps = 1;
                    while (true) {
                        let foundCross = findCrossPosition({ position: position, steps: steps, ...directionConfig[direction] });
                        steps++;
                        if (foundCross) {
                            let isEmpty = checkEmptyTileOrNot(foundCross, game);
                            if (isEmpty) {
                                allPossibleMove.push(foundCross);
                            }
                            else {
                                if (game.board[PositionToString(foundCross)].pieceType !== 0 &&
                                    game.board[PositionToString(foundCross)].teamColor !== positionInfo.teamColor)
                                    allPossibleMove.push(foundCross);
                                break;
                            }
                        }
                        else {
                            break;
                        }
                    }
                });
            }
            else if (pieceType === 'knight') {
                Object.keys(knightDirectionsConfig).forEach(direction => {
                    const foundKnightMove = findKnightPosition({ position: position, ...knightDirectionsConfig[direction] });
                    if (foundKnightMove) {
                        if (checkEmptyTileOrNot(foundKnightMove, game)) {
                            allPossibleMove.push(foundKnightMove);
                        }
                        else if (game.board[PositionToString(foundKnightMove)].pieceType !== 0 &&
                            game.board[PositionToString(foundKnightMove)].teamColor !== positionInfo.teamColor) {
                            allPossibleMove.push(foundKnightMove);
                        }
                    }
                });
            }
        }
        return allPossibleMove;
    }
};
console.log(findPosibleMove({ x: 6, y: 0 }, game));
// console.log(findKnightPosition({
//     position: { x: 3, y: 3},
//     forwardOrBack: true,
//     sideOrStreight: true,
//     leftOrRight: false
// }))
//# sourceMappingURL=game.helper.js.map