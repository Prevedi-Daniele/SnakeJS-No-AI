/*
Snake JS - No AI
Questo progetto è un'implementazione del gioco Snake realizzata in JavaScript Vanilla, senza l’uso di IA.
Realizzato interamente da Daniele Prevedi (4° INFO) dell'ITT Agnelli.

Soggetto a licenza Creative Commons CC BY-NC-SA 4.0
*/

document.addEventListener("DOMContentLoaded", inizializzaPagina, false)

let pressToStart = null
let divPunteggio = null
let punteggio = 0

let campoDiGioco = null
let contesto = null
let larghezzaCampo = null
let altezzaCampo = null

let coloreSnake = "green"
let coloreCibo = "red"

let velocitaOrizzontaleSnake = 0
let velocitaVerticaleSnake = 0

let posizioneOrizzontaleCibo = 0
let posizioneVerticaleCibo = 0

let unitaDiMisura = 0

let snake = []




function inizializzaPagina(){
    pressToStart = document.getElementById("pressToStart")
    divPunteggio = document.getElementsByClassName("punteggio")[0]

    document.addEventListener("keydown", verificaInizioGioco, false)
}


function verificaInizioGioco(evento){
    if(evento.key === " " && pressToStart.style.display != "none"){
        inizializzaGioco()
    }
    else if (pressToStart.style.display == "none"){
        cambiaDirezioneSnake(evento)
    }
    else{
        return
    }
}


function startGame(){
    aggiornaPunteggio()
    generaPosizioniCibo()
    disegnaCibo()
    prossimoFrameGioco()
}


function inizializzaGioco(){
    pressToStart.style.display = "none"

    creaScrittaPunteggio()

    divContainerGioco = document.getElementById("divContainerCanvasGioco")
    
    if (divContainerGioco.children.length > 0){
        divContainerGioco.removeChild(divContainerGioco.children[0])
    }

    let canvasGioco = document.createElement("canvas")
    canvasGioco.id = "campoDiGioco"
    
    divContainerGioco.append(canvasGioco)
    canvasGioco.width = divContainerGioco.clientWidth
    canvasGioco.height = divContainerGioco.clientHeight
    canvasGioco.style.width = "100%"
    canvasGioco.style.height = "100%"
    
    contesto = canvasGioco.getContext("2d")
    larghezzaCampo = canvasGioco.clientWidth
    altezzaCampo = canvasGioco.clientHeight

    velocitaOrizzontaleSnake = Math.floor(larghezzaCampo / 20)

    unitaDiMisura = Math.floor(larghezzaCampo / 20)

    snake = [
        {x: 0, y: 0},
        {x: unitaDiMisura * 1, y: 0},
        {x: unitaDiMisura * 2, y: 0},
    ]

    startGame()
}


function prossimoFrameGioco(){
    if(pressToStart.style.display != "none"){
        return
    }

    setTimeout(() => {
        pulisciCampoDiGioco()
        disegnaCibo()
        muoviSnake()
        disegnaSnake()
        verificaFineGioco()
        prossimoFrameGioco()
    }, 90)
}


function resettaGioco(){
    mostraPressToStart()
    resetPunteggio()
    velocitaOrizzontaleSnake = 0
    velocitaVerticaleSnake = 0
    snake = [
        {x: 0, y: 0},
        {x: unitaDiMisura * 1, y: 0},
        {x: unitaDiMisura * 2, y: 0},
    ]
}


function verificaFineGioco(){
    let testaSnake = snake[snake.length - 1]

    if(testaSnake.x < 0 || testaSnake.x >= larghezzaCampo || testaSnake.y < 0 || testaSnake.y >= altezzaCampo){
        resettaGioco()
        return
    }

    for(let i = 0; i < snake.length - 1; i++){
        if(testaSnake.x === snake[i].x && testaSnake.y === snake[i].y){
            resettaGioco()
            return
        }
    }
}


function cambiaDirezioneSnake(evento){
    switch(evento.key){
        case "ArrowUp":
            if (velocitaVerticaleSnake === unitaDiMisura){ 
                break 
            }

            velocitaOrizzontaleSnake = 0
            velocitaVerticaleSnake = -unitaDiMisura
            break

        case "ArrowDown":
            if (velocitaVerticaleSnake === -unitaDiMisura){ 
                break 
            }

            velocitaOrizzontaleSnake = 0
            velocitaVerticaleSnake = unitaDiMisura
            break

        case "ArrowLeft":
            if (velocitaOrizzontaleSnake === unitaDiMisura){
        break
            }

            velocitaOrizzontaleSnake = -unitaDiMisura
            velocitaVerticaleSnake = 0
            break

        case "ArrowRight":
            if (velocitaOrizzontaleSnake === -unitaDiMisura){
                break
            }

            velocitaOrizzontaleSnake = unitaDiMisura
            velocitaVerticaleSnake = 0
            break
    }
}


function muoviSnake(){
    let testaSnake = {x: snake[snake.length - 1].x + velocitaOrizzontaleSnake, y: snake[snake.length - 1].y + velocitaVerticaleSnake}

    snake.push(testaSnake)

    if(testaSnake.x === posizioneOrizzontaleCibo && testaSnake.y === posizioneVerticaleCibo){
        aumentaPunteggio()
        generaPosizioniCibo()
    } else {
        snake.shift()
    }
}


function disegnaSnake(){
    contesto.fillStyle = coloreSnake
    for(let i = 0; i < snake.length; i++){
        contesto.fillRect(snake[i].x, snake[i].y, unitaDiMisura, unitaDiMisura)
    }
}


function pulisciCampoDiGioco(){
    contesto.fillStyle = "#e0e0e0"
    contesto.fillRect(0, 0, larghezzaCampo, altezzaCampo)
}


function generaPosizioniCibo(){
    posizioneOrizzontaleCibo = generaPosizioneCasuale(0, larghezzaCampo - unitaDiMisura)
    posizioneVerticaleCibo = generaPosizioneCasuale(0, altezzaCampo - unitaDiMisura)
}


function disegnaCibo(){
    contesto.fillStyle = coloreCibo
    contesto.fillRect(posizioneOrizzontaleCibo, posizioneVerticaleCibo, unitaDiMisura, unitaDiMisura)
}


function creaScrittaPunteggio(){
    if (divPunteggio.children.length > 0){
        divPunteggio.removeChild(divPunteggio.children[0])
        divPunteggio.removeChild(divPunteggio.children[0]) 
    }

    let testoPunteggio = document.createElement("h2")
    testoPunteggio.id = "testoPunteggio"
    testoPunteggio.innerText = "Punteggio "
    let numeroPunteggio = document.createElement("h2")
    numeroPunteggio.id = "numeroPunteggio"
    numeroPunteggio.innerText = punteggio
    divPunteggio.append(testoPunteggio)
    divPunteggio.append(numeroPunteggio)
}


function aumentaPunteggio(){
    punteggio += 1
    aggiornaPunteggio()
}


function resetPunteggio(){
    punteggio = 0
    aggiornaPunteggio()
}


function aggiornaPunteggio(){
    let numeroPunteggio = document.getElementById("numeroPunteggio")
    numeroPunteggio.innerText = punteggio
}


function mostraPressToStart(){
    pressToStart.style.display = "block"

    if (pressToStart.children.length > 2) {
        pressToStart.children[2].remove()
    }

    let divTestoPunteggioPrecedente = document.createElement("div")
    let testoPunteggioPrecedente = document.createElement("h2")
    testoPunteggioPrecedente.id = "testoPunteggioPrecedente"
    testoPunteggioPrecedente.innerText = "Punteggio precedente "
    let numeroPunteggioPrecedente = document.createElement("h2")
    numeroPunteggioPrecedente.id = "numeroPunteggioPrecedente"
    numeroPunteggioPrecedente.innerText = punteggio
    pressToStart.append(divTestoPunteggioPrecedente)
    divTestoPunteggioPrecedente.append(testoPunteggioPrecedente)
    divTestoPunteggioPrecedente.append(numeroPunteggioPrecedente)
}


function generaNumeroCasuale(min, max){
    return Math.floor(Math.random() * (max - min)) + min
}


function generaPosizioneCasuale(min, max){
    let posizioneCasuale = generaNumeroCasuale(min, max)
    posizioneCasuale = Math.floor(posizioneCasuale / unitaDiMisura) * unitaDiMisura
    return posizioneCasuale
}