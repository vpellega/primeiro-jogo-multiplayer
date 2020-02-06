export default function render(screen, game, requestAnimationFrame, currentPlayerId){
    const context = screen.getContext('2d')
    context.clearRect(0, 0, 10, 10)
    for(const playerId in game.state.player){
        const player = game.state.player[playerId]
        context.fillStyle= 'black'
        context.fillRect(player.x, player.y, 1, 1)
    } 

    for(const fruitId in game.state.fruit){
        const fruit = game.state.fruit[fruitId]
        context.fillStyle = 'green'
        context.fillRect(fruit.x, fruit.y, 1, 1)
    }

    const currentPlayer = game.state.player[currentPlayerId]

    if(currentPlayer){
        context.fillStyle = 'green'
        context.fillRect(currentPlayer.x, currentPlayer.y, 1, 1)
    }

    requestAnimationFrame(()=> (
        render(screen, game, requestAnimationFrame, currentPlayerId)
    ))
}