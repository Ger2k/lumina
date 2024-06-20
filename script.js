let hunger = 50;
let energy = 50;
let happiness = 50;
let health = 50;

function saveState() {
    const state = {
        hunger,
        energy,
        happiness,
        health,
        lastUpdated: new Date().getTime()
    };
    localStorage.setItem('tamagochiState', JSON.stringify(state));
}

function loadState() {
    const savedState = localStorage.getItem('tamagochiState');
    if (savedState) {
        const state = JSON.parse(savedState);
        hunger = state.hunger;
        energy = state.energy;
        happiness = state.happiness;
        health = state.health;
        return state.lastUpdated;
    }
    return new Date().getTime();
}

function updateStats() {
    document.getElementById('hunger').innerText = Math.floor(hunger);
    document.getElementById('energy').innerText = Math.floor(energy);
    document.getElementById('happiness').innerText = Math.floor(happiness);
    document.getElementById('health').innerText = Math.floor(health);
    saveState();
}

function adjustStatsForElapsedTime(lastUpdated) {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - lastUpdated; // Tiempo transcurrido en milisegundos
    const elapsedSeconds = Math.floor(elapsedTime / 1000); // Convertir a segundos

    console.log(`Time elapsed: ${elapsedSeconds} seconds`); // Log para depurar

    // Ajustar los estados basados en el tiempo transcurrido
    hunger = Math.min(Math.floor(hunger + (elapsedSeconds * 5 / 3600)), 100); // Incrementa proporcionalmente a 5 por hora
    energy = Math.max(Math.floor(energy - (elapsedSeconds * 2 / 3600)), 0);   // Decrementa proporcionalmente a 2 por hora
    happiness = Math.max(Math.floor(happiness - (elapsedSeconds / 3600)), 0); // Decrementa proporcionalmente a 1 por hora
    health = Math.max(Math.floor(health - (elapsedSeconds * 2 / 3600)), 0);   // Decrementa proporcionalmente a 2 por hora

    updateStats();
}

function animateScript() {
    const spriteContainer = document.getElementById("sprite-container");
    let position = 0; 
    const interval = 400; // Intervalo de tiempo en milisegundos
    const width = 210; // Ancho de un frame
    const frames = 7; // Número de frames

    setInterval(() => {
        position = (position + width) % (width * frames);
        spriteContainer.style.backgroundPosition = `-${position}px 0px`;
    }, interval);
}

window.onload = () => {
    const lastUpdated = loadState();
    adjustStatsForElapsedTime(lastUpdated);
    changeStatsOverTime();
    animateScript();
};

function feed() {
    hunger = Math.max(hunger - 20, 0);
    health = Math.min(health + 10, 100);
    updateStats();
}

function play() {
    happiness = Math.min(happiness + 15, 100);
    energy = Math.max(energy - 10, 0);
    updateStats();
}

function sleep() {
    energy = Math.min(energy + 20, 100);
    hunger = Math.max(hunger + 10, 0);
    updateStats();
}

function changeStatsOverTime() {
    setInterval(() => {
        hunger = Math.min(hunger + 1, 100);
        energy = Math.max(energy - 1, 0);
        happiness = Math.max(happiness - 1, 0);
        health = Math.max(health - 1, 0);
        updateStats();
    }, 1000); // Cambia los estados cada segundo
}
