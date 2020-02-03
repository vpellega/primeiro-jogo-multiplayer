export default function createGame(){
    const state = {
        player: {},
        fruit: {},
        screen: {
            height: 10, 
            width: 10
        }
    }

    function addPlayer(command) {
        const player = command.playerId
        const playerX = command.playerX
        const playerY = command.playerY

        state.player[player] = {
            x: playerX,
            y: playerY
        }                               
    }

    function removePlayer(command) {
        const playerId = command.playerId

        delete state.player[playerId]
    }
    
    function addFruit(command) {
        const fruitId = command.fruitId
        const fruitX = command.fruitX
        const fruitY = command.fruitY

        state.fruit[fruitId] = {
            x: fruitX,
            y: fruitY
        }                               
    }

    function removeFruit(command) {
        const fruitId = command.fruitId

        delete state.fruit[fruitId]
    }



    function movePlayer(command) {

        const acceptMoves = {
            ArrowUp: (player) => {
                console.log('Moving player up')
                if(state.player[player].y - 1 >= 0){    
                    state.player[player].y -= 1
                }
                return
            },
            ArrowDown: (player) => {
                console.log('Moving player down')
                if(state.player[player].y + 1 < state.screen.height){    
                    state.player[player].y += 1
                }
                return
            },
            ArrowLeft: (player) => {
                console.log('Moving player left')
                if(state.player[player].x - 1 >= 0){    
                    state.player[player].x -= 1
                }
                return
            },
            ArrowRight: (player) => {
                console.log('Moving player right')
                if(state.player[player].x + 1 < state.screen.width){    
                    state.player[player].x += 1
                }
                return
            }
        } 

        const player = command.playerId
        const moveFunction = acceptMoves[command.keyPressed]
        if(moveFunction)
            moveFunction(player)
            checkCollision(player)
        return
    }
    function checkCollision(playerId){
        const player = state.player[playerId]
        for (const fruitId in state.fruit){
            const fruit = state.fruit[fruitId]
            if (player.x === fruit.x && player.y === fruit.y) {
                console.log(`${playerId} colidiu com a ${fruitId}`)
                removeFruit({fruitId})
            }
        }
    }

    return {
        movePlayer, 
        state, 
        addPlayer, 
        removePlayer,
        addFruit,
        removeFruit
    }
}