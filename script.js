let livro = document.getElementById('livros')
let capitulo = document.getElementById('capitulos')
let imagem = document.getElementById('imgLivro')

let botaoLivro = document.getElementById('botaoSelect')
let botaoPlayPause = document.getElementById('play-pause')
let botaoProximo = document.getElementById('proximo')
let botaoAnterior = document.getElementById('anterior')
let audio = document.getElementById('audioLivro')

let estaTocando = 0
let cap = 1

const livrosInfo = {
    'Alasombra Deunroble': { totalCapitulos: 12 },
    'O alienista': { totalCapitulos: 9 },
    'Dom Casmurro': { totalCapitulos: 10 },
    'Amor por anexins': { totalCapitulos: 1 },
};

function escolhaLivro() {
    if (livro.value === "") {
        imagem.src = "./imgAudioBook.jpg"
    } else {
        audio.src = "./books/" + livro.value + "/1.mp3"
        imagem.src = "./books/" + livro.value + "/img.jpg"
    }
}

function playAudio() {
    audio.play()
    botaoPlayPause.classList.remove('bi-play-circle-fill')
    botaoPlayPause.classList.add('bi-pause-circle-fill')
    estaTocando = 1
}

function pauseAudio() {
    audio.pause()
    botaoPlayPause.classList.remove('bi-pause-circle-fill')
    botaoPlayPause.classList.add('bi-play-circle-fill')
    estaTocando = 0
}

function proxCapitulo() {
    if (cap < livrosInfo[livro.value].totalCapitulos) {
        cap = cap + 1
        audio.src = "./books/" + livro.value + "/" + cap + ".mp3"
        capitulo.innerHTML = "Capítulo " + cap
        playAudio()
    } else {
        let livros = Object.keys(livrosInfo);
        let indexAtual = livros.indexOf(livro.value);
        capitulo.innerHTML = "Capítulo 1"
        playAudio()
        if (indexAtual < livros.length - 1) {
            livro.value = livros[indexAtual + 1]
            escolhaLivro()
            capitulo.innerHTML = "Capítulo 1"
            playAudio()
        } else {
            livro.value = livros[0];
            escolhaLivro()
            capitulo.innerHTML = "Capítulo 1"
            playAudio()
        }
    }
}

function antCapitulo() {
    cap = cap - 1
    if (cap <= 0) {
        audio.src = "./books/" + livro.value + "/1.mp3"
        capitulo.innerHTML = "Capítulo 1"
        playAudio()
    } else {
        audio.src = "./books/" + livro.value + "/" + cap + ".mp3"
        capitulo.innerHTML = "Capítulo " + cap
        playAudio()
    }
}

function playPause() {
    if (estaTocando === 0) {
        playAudio()
    } else {
        pauseAudio()
    }
}

botaoPlayPause.addEventListener('click', playPause)
botaoProximo.addEventListener('click', proxCapitulo)
botaoAnterior.addEventListener('click', antCapitulo)