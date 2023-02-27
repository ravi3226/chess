import {Server, Socket} from 'socket.io'
import { socketEvents } from '../config/events.config.js';
import { Player } from '../config/game.config.js';
import { game, teamColors } from '../helpers/game.helper.js'
import { getConnectedSocketIds } from '../helpers/socket.helpers.js';
import { redisGetKeyValue, redisGetKeys, redisSetKeyValue, redisDeletekey } from '../services/redis.service.js'

export const gameJoin = async (IO: Server, socket: Socket, payload) : Promise<void> => {
    const allPlayers : string[] = getConnectedSocketIds(IO, socket.id);
    var findWaitingPlayer = null;
    
    try {
        const joinedPlayers = await redisGetKeys();

        if (joinedPlayers.value.length > 0) {
            for(let i = 0; i < joinedPlayers.value.length; i++) {
                if (allPlayers.includes(joinedPlayers.value[i])) {
    
                    findWaitingPlayer = await redisGetKeyValue(joinedPlayers.value[i], true);
    
                    if (findWaitingPlayer.value.waiting) {
                        findWaitingPlayer = findWaitingPlayer.value;
                        break;
                    }
    
                } else {
                    await redisDeletekey(joinedPlayers.value[i]);
                }
            }
        }

        if (findWaitingPlayer) {

            findWaitingPlayer.waiting = false;
            findWaitingPlayer.turn = true;
            findWaitingPlayer.oponent = socket.id;

            await redisSetKeyValue(findWaitingPlayer.id, findWaitingPlayer, true);

            IO.to(findWaitingPlayer.id).emit(socketEvents.PlayerTurn, findWaitingPlayer );

            const currentPlayer : Player = {
                id: socket.id,
                waiting: false,
                turn: false,
                teamColor: teamColors.black,
                game: game,
                oponent: findWaitingPlayer.id
            }

            await redisSetKeyValue(socket.id, currentPlayer, true);

            socket.emit(socketEvents.GameJoinSuccess, currentPlayer);
        } else {
            const currentPlayer : Player = {
                id: socket.id,
                waiting: true,
                turn: false,
                teamColor: teamColors.white,
                game: game,
                oponent: null
            }

            await redisSetKeyValue(socket.id, currentPlayer, true);

            socket.emit(socketEvents.GameJoinSuccess, currentPlayer);
        }

    } catch(e) {
        socket.emit(socketEvents.GameJoinFail, { msg: e.message });
    }

}