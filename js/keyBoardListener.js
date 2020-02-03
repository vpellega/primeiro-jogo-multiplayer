export default function createKeyboardListener() {
    const state = {
        observers: []
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
            playerId: 'player1',
            keyPressed
        }
        notifyAll(command)
    }
    
    return {
        subscribe
    }
}