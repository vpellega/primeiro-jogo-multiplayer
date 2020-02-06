export default function createKeyboardListener() {
    const state = {
        observers: [],
        player: null
    }

    function registerPlayer(player){
        state.player = player
    }

    function subscribe(observer){
        state.observers.push(observer)
    }

    function notifyAll(command){
        for(const observer of state.observers){
            observer(command)
        }
    }
    document.addEventListener('keydown', handleKeydown)
   
    function handleKeydown(event) {
        const keyPressed = event.key

        const command = {
            type: 'move-player',
            playerId: state.player,
            keyPressed
        }
        notifyAll(command)
    }
    
    return {
        subscribe,
        registerPlayer
    }
}