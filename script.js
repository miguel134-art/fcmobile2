let score = 0;
const scoreElement = document.getElementById("score");
const jogador = document.getElementById("jogador");
const gol = document.getElementById("gol");
const campo = document.getElementById("campo");

let jogadorPosX = 225;  // Posição inicial do jogador (no meio do campo)
let jogadorPosY = 250;  // Posição inicial do jogador
let velocidade = 10;

function updateJogadorPosition() {
  jogador.style.left = jogadorPosX + 'px';
  jogador.style.bottom = jogadorPosY + 'px';
}

function moverJogador(event) {
  switch(event.key) {
    case "ArrowLeft":
      if (jogadorPosX > 0) jogadorPosX -= velocidade;
      break;
    case "ArrowRight":
      if (jogadorPosX < campo.offsetWidth - 50) jogadorPosX += velocidade;
      break;
    case "ArrowUp":
      if (jogadorPosY < campo.offsetHeight - 50) jogadorPosY += velocidade;
      break;
    case "ArrowDown":
      if (jogadorPosY > 0) jogadorPosY -= velocidade;
      break;
  }
  updateJogadorPosition();
}

function verificarGol() {
  if (jogadorPosX + 25 > gol.offsetLeft && jogadorPosX + 25 < gol.offsetLeft + gol.offsetWidth &&
      jogadorPosY + 25 > gol.offsetTop && jogadorPosY + 25 < gol.offsetTop + gol.offsetHeight) {
    score++;
    scoreElement.textContent = score;
    jogadorPosX = 225;  // Resetando a posição do jogador
    jogadorPosY = 250;
    updateJogadorPosition();
  }
}

document.addEventListener('keydown', (event) => {
  moverJogador(event);
  verificarGol();
});

updateJogadorPosition();
const canvas = document.getElementById('campoFutebol');
const ctx = canvas.getContext('2d');

canvas.width = 800;  // Largura do campo
canvas.height = 400; // Altura do campo

const jogadorImg = new Image();
jogadorImg.src = 'https://via.placeholder.com/50/0000FF/FFFFFF?text=Jog';  // Substitua por uma imagem de jogador real

const bolaImg = new Image();
bolaImg.src = 'https://via.placeholder.com/30/000000/FFFFFF?text=Bola';  // Substitua por uma imagem de bola real

const torcidaImg = new Image();
torcidaImg.src = 'https://via.placeholder.com/800x100/0000FF/FFFFFF?text=Torcida'; // Imagem simples da torcida

let jogador1 = { x: 100, y: 300, width: 50, height: 50, dx: 0, dy: 0 };
let jogador2 = { x: 650, y: 300, width: 50, height: 50, dx: 0, dy: 0 };
let bola = { x: 375, y: 200, width: 30, height: 30, dx: 3, dy: 3 };
let score = 0;

// Função para desenhar o campo de futebol
function drawCampo() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Desenha a torcida
  ctx.drawImage(torcidaImg, 0, 0, canvas.width, 100);

  // Desenha o campo
  ctx.fillStyle = 'green';
  ctx.fillRect(0, 100, canvas.width, canvas.height - 100);
  
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 5;
  
  // Desenha a linha central
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 100);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();

  // Desenha a área do gol
  ctx.strokeRect(50, 150, 100, 100);
  ctx.strokeRect(canvas.width - 150, 150, 100, 100);
  
  // Desenha a linha de meio campo
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
  ctx.stroke();
}

// Função para desenhar o jogador
function drawJogador(jogador) {
  ctx.drawImage(jogadorImg, jogador.x, jogador.y, jogador.width, jogador.height);
}

// Função para desenhar a bola
function drawBola() {
  ctx.drawImage(bolaImg, bola.x, bola.y, bola.width, bola.height);
}

// Função para atualizar o movimento da bola
function moveBola() {
  bola.x += bola.dx;
  bola.y += bola.dy;

  // Colisão com as bordas do campo
  if (bola.x <= 0 || bola.x >= canvas.width - bola.width) bola.dx = -bola.dx;
  if (bola.y <= 100 || bola.y >= canvas.height - bola.height) bola.dy = -bola.dy;

  // Colisão com os jogadores
  if (checkCollision(bola, jogador1) || checkCollision(bola, jogador2)) {
    bola.dx = -bola.dx;
    bola.dy = -bola.dy;
  }

  // Verifica se a bola entrou no gol
  if (bola.x <= 150 && bola.y >= 150 && bola.y <= 250) {
    score++;
    resetBola();
  }
  if (bola.x >= canvas.width - 150 && bola.y >= 150 && bola.y <= 250) {
    score++;
    resetBola();
  }
}

// Função para verificar colisão entre a bola e o jogador
function checkCollision(bola, jogador) {
  return bola.x < jogador.x + jogador.width &&
         bola.x + bola.width > jogador.x &&
         bola.y < jogador.y + jogador.height &&
         bola.y + bola.height > jogador.y;
}

// Função para desenhar o placar
function drawPlacar() {
  document.getElementById('score').textContent = score;
}

// Função para controlar o movimento dos jogadores
function moveJogador(jogador) {
  jogador.x += jogador.dx;
  jogador.y += jogador.dy;
}

// Função para atualizar o jogo
function update() {
  drawCampo();
  drawJogador(jogador1);
  drawJogador(jogador2);
  drawBola();
  moveBola();
  drawPlacar();
}

// Função para controlar as teclas
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp') jogador1.dy = -5;
  if (event.key === 'ArrowDown') jogador1.dy = 5;
  if (event.key === 'ArrowLeft') jogador1.dx = -5;
  if (event.key === 'ArrowRight') jogador1.dx = 5;

  if (event.key === 'w') jogador2.dy = -5;
  if (event.key === 's') jogador2.dy = 5;
  if (event.key === 'a') jogador2.dx = -5;
  if (event.key === 'd') jogador2.dx = 5;
});

document.addEventListener('keyup', (event) => {
  if (event.key === 'ArrowUp' || event.key === 'ArrowDown') jogador1.dy = 0;
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') jogador1.dx = 0;

  if (event.key === 'w' || event.key === 's') jogador2.dy = 0;
  if (event.key === 'a' || event.key === 'd') jogador2.dx = 0;
});

// Função para resetar a posição da bola após um gol
function resetBola() {
  bola.x = canvas.width / 2 - bola.width / 2;
  bola.y = canvas.height / 2 - bola.height / 2;
  bola.dx = 3;
  bola.dy = 3;
}

// Função principal do jogo
function gameLoop() {
  update();
  moveJogador(jogador1);
  moveJogador(jogador2);
  requestAnimationFrame(gameLoop);
}

// Inicia o jogo
gameLoop();
const canvas = document.getElementById('campoFutebol');
const ctx = canvas.getContext('2d');

canvas.width = 800;  // Largura do campo
canvas.height = 500; // Altura do campo

const jogadorImg = new Image();
jogadorImg.src = 'https://via.placeholder.com/50/0000FF/FFFFFF?text=Jog';  // Substitua por uma imagem de jogador real

const bolaImg = new Image();
bolaImg.src = 'https://via.placeholder.com/30/000000/FFFFFF?text=Bola';  // Substitua por uma imagem de bola real

const torcidaImg = new Image();
torcidaImg.src = 'https://via.placeholder.com/800x100/0000FF/FFFFFF?text=Torcida'; // Imagem simples da torcida

const tecnicoImg = new Image();
tecnicoImg.src = 'https://via.placeholder.com/50/FF0000/FFFFFF?text=T';  // Substitua por uma imagem de técnico real

let jogador1 = []; // Jogadores do time 1
let jogador2 = []; // Jogadores do time 2
let bola = { x: 375, y: 200, width: 30, height: 30, dx: 3, dy: 3 };
let score = 0;

const jogadoresPorTime = 11;

// Função para desenhar o campo de futebol
function drawCampo() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Desenha a torcida
  ctx.drawImage(torcidaImg, 0, 0, canvas.width, 100);

  // Desenha o campo
  ctx.fillStyle = 'green';
  ctx.fillRect(0, 100, canvas.width, canvas.height - 100);
  
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 5;
  
  // Desenha a linha central
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 100);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();

  // Desenha a área do gol
  ctx.strokeRect(50, 150, 100, 100);
  ctx.strokeRect(canvas.width - 150, 150, 100, 100);
  
  // Desenha a linha de meio campo
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
  ctx.stroke();
  
  // Desenha o VAR
  ctx.strokeStyle = 'yellow';
  ctx.strokeRect(0, 100, canvas.width, 50);
  ctx.strokeStyle = 'white';
  ctx.fillStyle = 'yellow';
  ctx.fillText("VAR", 10, 130);
}

// Função para desenhar os jogadores
function drawJogadores() {
  for (let i = 0; i < jogador1.length; i++) {
    ctx.drawImage(jogadorImg, jogador1[i].x, jogador1[i].y, jogador1[i].width, jogador1[i].height);
  }

  for (let i = 0; i < jogador2.length; i++) {
    ctx.drawImage(jogadorImg, jogador2[i].x, jogador2[i].y, jogador2[i].width, jogador2[i].height);
  }
}

// Função para desenhar a bola
function drawBola() {
  ctx.drawImage(bolaImg, bola.x, bola.y, bola.width, bola.height);
}

// Função para desenhar o placar
function drawPlacar() {
  document.getElementById('score').textContent = score;
}

// Função para desenhar os técnicos
function drawTecnicos() {
  ctx.drawImage(tecnicoImg, 200, 60, 50, 50);
  ctx.drawImage(tecnicoImg, 550, 60, 50, 50);
}

// Função para desenhar os jogadores reservas
function drawReservas() {
  for (let i = 0; i < 5; i++) {
    ctx.drawImage(jogadorImg, 100 + i * 60, 450, 50, 50);
    ctx.drawImage(jogadorImg, 600 + i * 60, 450, 50, 50);
  }
}

// Função para desenhar os juízes e bandeirinhas
function drawJuizes() {
  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.arc(100, 200, 20, 0, Math.PI * 2); // Árbitro principal
  ctx.fill();

  ctx.beginPath();
  ctx.arc(700, 200, 20, 0, Math.PI * 2); // Árbitro auxiliar
  ctx.fill();

  ctx.fillStyle = 'yellow';
  ctx.beginPath();
  ctx.arc(100, 50, 15, 0, Math.PI * 2); // Bandeirinha 1
  ctx.fill();

  ctx.beginPath();
  ctx.arc(700, 50, 15, 0, Math.PI * 2); // Bandeirinha 2
  ctx.fill();
}

// Função para controlar o movimento dos jogadores
function moveJogador() {
  // Jogadores movimentando-se com teclas (mecanismo simples para movimento)
  jogador1[0].y += 2; // Exemplo de movimentação simples para o jogador 1
  jogador2[0].y -= 2; // Exemplo de movimentação simples para o jogador 2
}

// Função para atualizar o jogo
function update() {
  moveJogador();
  drawCampo();
  drawJogadores();
  drawBola();
  drawPlacar();
  drawTecnicos();
  drawReservas();
  drawJuizes();
}

// Função para inicializar os jogadores
function inicializarJogadores() {
  for (let i = 0; i < jogadoresPorTime; i++) {
    jogador1.push({ x: 100 + i * 60, y: 250, width: 50, height: 50 });
    jogador2.push({ x: 100 + i * 60, y: 100, width: 50, height: 50 });
  }
}

// Função principal do jogo
function gameLoop() {
  update();
  requestAnimationFrame(gameLoop);
}

// Inicializa os jogadores e começa o jogo
inicializarJogadores();
gameLoop();
const canvas = document.getElementById('campoFutebol');
const ctx = canvas.getContext('2d');

canvas.width = 800;  // Largura do campo
canvas.height = 500; // Altura do campo

const jogadorImg = new Image();
jogadorImg.src = 'https://via.placeholder.com/50/0000FF/FFFFFF?text=Jog';  // Substitua por uma imagem de jogador real

const bolaImg = new Image();
bolaImg.src = 'https://via.placeholder.com/30/000000/FFFFFF?text=Bola';  // Substitua por uma imagem de bola real

const torcidaImg = new Image();
torcidaImg.src = 'https://via.placeholder.com/800x100/0000FF/FFFFFF?text=Torcida'; // Imagem simples da torcida

const tecnicoImg = new Image();
tecnicoImg.src = 'https://via.placeholder.com/50/FF0000/FFFFFF?text=T';  // Substitua por uma imagem de técnico real

let jogador1 = []; // Jogadores do time 1
let jogador2 = []; // Jogadores do time 2
let bola = { x: 375, y: 200, width: 30, height: 30, dx: 3, dy: 3 };
let score = 0;

const jogadoresPorTime = 11;

// Função para desenhar o campo de futebol
function drawCampo() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Desenha a torcida
  ctx.drawImage(torcidaImg, 0, 0, canvas.width, 100);

  // Desenha o campo
  ctx.fillStyle = 'green';
  ctx.fillRect(0, 100, canvas.width, canvas.height - 100);
  
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 5;
  
  // Desenha a linha central
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 100);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();

  // Desenha a área do gol
  ctx.strokeRect(50, 150, 100, 100);
  ctx.strokeRect(canvas.width - 150, 150, 100, 100);
  
  // Desenha a linha de meio campo
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
  ctx.stroke();
  
  // Desenha o VAR
  ctx.strokeStyle = 'yellow';
  ctx.strokeRect(0, 100, canvas.width, 50);
  ctx.strokeStyle = 'white';
  ctx.fillStyle = 'yellow';
  ctx.fillText("VAR", 10, 130);
}

// Função para desenhar os jogadores
function drawJogadores() {
  for (let i = 0; i < jogador1.length; i++) {
    ctx.drawImage(jogadorImg, jogador1[i].x, jogador1[i].y, jogador1[i].width, jogador1[i].height);
  }

  for (let i = 0; i < jogador2.length; i++) {
    ctx.drawImage(jogadorImg, jogador2[i].x, jogador2[i].y, jogador2[i].width, jogador2[i].height);
  }
}

// Função para desenhar a bola
function drawBola() {
  ctx.drawImage(bolaImg, bola.x, bola.y, bola.width, bola.height);
}

// Função para desenhar o placar
function drawPlacar() {
  document.getElementById('score').textContent = score;
}

// Função para desenhar os técnicos
function drawTecnicos() {
  ctx.drawImage(tecnicoImg, 200, 60, 50, 50);
  ctx.drawImage(tecnicoImg, 550, 60, 50, 50);
}

// Função para desenhar os jogadores reservas
function drawReservas() {
  for (let i = 0; i < 5; i++) {
    ctx.drawImage(jogadorImg, 100 + i * 60, 450, 50, 50);
    ctx.drawImage(jogadorImg, 600 + i * 60, 450, 50, 50);
  }
}

// Função para desenhar os juízes e bandeirinhas
function drawJuizes() {
  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.arc(100, 200, 20, 0, Math.PI * 2); // Árbitro principal
  ctx.fill();

  ctx.beginPath();
  ctx.arc(700, 200, 20, 0, Math.PI * 2); // Árbitro auxiliar
  ctx.fill();

  ctx.fillStyle = 'yellow';
  ctx.beginPath();
  ctx.arc(100, 50, 15, 0, Math.PI * 2); // Bandeirinha 1
  ctx.fill();

  ctx.beginPath();
  ctx.arc(700, 50, 15, 0, Math.PI * 2); // Bandeirinha 2
  ctx.fill();
}

// Função para movimentar os jogadores
function moveJogador() {
  // Movimentação do jogador 1 com as teclas de seta
  if (keyState['ArrowUp']) jogador1[0].y -= 5;
  if (keyState['ArrowDown']) jogador1[0].y += 5;
  if (keyState['ArrowLeft']) jogador1[0].x -= 5;
  if (keyState['ArrowRight']) jogador1[0].x += 5;

  // Movimentação do jogador 2 com as teclas WASD
  if (keyState['w']) jogador2[0].y -= 5;
  if (keyState['s']) jogador2[0].y += 5;
  if (keyState['a']) jogador2[0].x -= 5;
  if (keyState['d']) jogador2[0].x += 5;
}

// Função para inicializar os jogadores
function inicializarJogadores() {
  for (let i = 0; i < jogadoresPorTime; i++) {
    jogador1.push({ x: 100 + i * 60, y: 250, width: 50, height: 50 });
    jogador2.push({ x: 100 + i * 60, y: 100, width: 50, height: 50 });
  }
}

// Função para controlar as teclas pressionadas
let keyState = {};

document.addEventListener('keydown', (event) => {
  keyState[event.key] = true;
});

document.addEventListener('keyup', (event) => {
  keyState[event.key] = false;
});

// Função para atualizar o jogo
function update() {
  moveJogador();
  drawCampo();
  drawJogadores();
  drawBola();
  drawPlacar();
  drawTecnicos();
  drawReservas();
  drawJuizes();
}

// Função principal do jogo
function gameLoop() {
  update();
  requestAnimationFrame(gameLoop);
}

// Inicializa os jogadores e começa o jogo
inicializarJogadores();
gameLoop();
const canvas = document.getElementById('campoFutebol');
const ctx = canvas.getContext('2d');

canvas.width = 1000;  // Largura do campo (aumentamos para simular o grande estádio)
canvas.height = 600; // Altura do campo

// URLs para imagens de jogadores reais (substitua com links reais)
const jogadorImagens = {
  neymar: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Neymar_2018.jpg',
  messi: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Lionel_Messi_20180626.jpg',
  cr7: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Cristiano_Ronaldo_2018.jpg',
  mbappe: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Kylian_Mbapp%C3%A9_2018.jpg',
};

const bolaImg = new Image();
bolaImg.src = 'https://via.placeholder.com/30/000000/FFFFFF?text=Bola';  // Imagem da bola

const torcidaImg = new Image();
torcidaImg.src = 'https://via.placeholder.com/1000x150/0000FF/FFFFFF?text=Torcida'; // Imagem da torcida (grande)

let jogador1 = []; // Jogadores do time 1
let jogador2 = []; // Jogadores do time 2
let bola = { x: 475, y: 300, width: 30, height: 30, dx: 3, dy: 3 };
let score = 0;

const jogadoresPorTime = 11;

// Função para desenhar o estádio e o campo de futebol
function drawEstadio() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenha o estádio (arquibancada)
  ctx.drawImage(torcidaImg, 0, 0, canvas.width, 150);  // Torcida visível no topo

  // Desenha o campo
  ctx.fillStyle = 'green';
  ctx.fillRect(0, 150, canvas.width, canvas.height - 150);
  
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 5;

  // Desenha a linha central
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 150);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();

  // Desenha a área do gol
  ctx.strokeRect(50, 200, 100, 100);
  ctx.strokeRect(canvas.width - 150, 200, 100, 100);

  // Desenha a linha de meio campo
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
  ctx.stroke();

  // Desenha o VAR (representação simples)
  ctx.strokeStyle = 'yellow';
  ctx.strokeRect(0, 150, canvas.width, 50);
  ctx.fillStyle = 'yellow';
  ctx.fillText("VAR", 10, 180);
}

// Função para desenhar os jogadores com as imagens reais
function drawJogadores() {
  // Jogadores do time 1
  for (let i = 0; i < jogador1.length; i++) {
    let jogador = jogador1[i];
    let jogadorImagem = new Image();
    jogadorImagem.src = jogador.src;
    jogadorImagem.onload = function() {
      ctx.drawImage(jogadorImagem, jogador.x, jogador.y, jogador.width, jogador.height);
    };
  }

  // Jogadores do time 2
  for (let i = 0; i < jogador2.length; i++) {
    let jogador = jogador2[i];
    let jogadorImagem = new Image();
    jogadorImagem.src = jogador.src;
    jogadorImagem.onload = function() {
      ctx.drawImage(jogadorImagem, jogador.x, jogador.y, jogador.width, jogador.height);
    };
  }
}

// Função para desenhar a bola
function drawBola() {
  ctx.drawImage(bolaImg, bola.x, bola.y, bola.width, bola.height);
}

// Função para desenhar o placar
function drawPlacar() {
  document.getElementById('score').textContent = score;
}

// Função para inicializar os jogadores com nomes e imagens reais
function inicializarJogadores() {
  const jogadoresTime1 = ['neymar', 'messi', 'cr7', 'mbappe', 'neymar', 'messi', 'cr7', 'mbappe', 'neymar', 'messi', 'cr7'];
  const jogadoresTime2 = ['mbappe', 'neymar', 'messi', 'cr7', 'neymar', 'messi', 'cr7', 'mbappe', 'neymar', 'messi', 'cr7'];

  for (let i = 0; i < jogadoresPorTime; i++) {
    jogador1.push({ x: 100 + i * 60, y: 250, width: 50, height: 50, src: `https://via.placeholder.com/50?text=${jogadoresTime1[i]}` });
    jogador2.push({ x: 100 + i * 60, y: 100, width: 50, height: 50, src: `https://via.placeholder.com/50?text=${jogadoresTime2[i]}` });
  }
}

// Função para controlar o movimento dos jogadores (teclado)
let keyState = {};

document.addEventListener('keydown', (event) => {
  keyState[event.key] = true;
});

document.addEventListener('keyup', (event) => {
  keyState[event.key] = false;
});

// Função para movimentar os jogadores
function moveJogador() {
  // Jogador 1 (Usando teclas de seta)
  if (keyState['ArrowUp']) jogador1[0].y -= 5;
  if (keyState['ArrowDown']) jogador1[0].y += 5;
  if (keyState['ArrowLeft']) jogador1[0].x -= 5;
  if (keyState['ArrowRight']) jogador1[0].x += 5;

  // Jogador 2 (Usando teclas WASD)
  if (keyState['w']) jogador2[0].y -= 5;
  if (keyState['s']) jogador2[0].y += 5;
  if (keyState['a']) jogador2[0].x -= 5;
  if (keyState['d']) jogador2[0].x += 5;
}

// Função para atualizar o jogo
function update() {
  moveJogador();
  drawEstadio();
  drawJogadores();
  drawBola();
  drawPlacar();
}

// Função principal do jogo
function gameLoop() {
  update();
  requestAnimationFrame(gameLoop);
}

// Inicializa os jogadores e começa o jogo
inicializarJogadores();
gameLoop();
const canvas = document.getElementById('campoFutebol');
const ctx = canvas.getContext('2d');

canvas.width = 1000;  // Largura do campo (aumentamos para simular o grande estádio)
canvas.height = 600; // Altura do campo

// URLs para imagens de jogadores reais (substitua com links reais)
const jogadorImagens = {
  neymar: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Neymar_2018.jpg',
  messi: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Lionel_Messi_20180626.jpg',
  cr7: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Cristiano_Ronaldo_2018.jpg',
  mbappe: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Kylian_Mbapp%C3%A9_2018.jpg',
};

const bolaImg = new Image();
bolaImg.src = 'https://via.placeholder.com/30/000000/FFFFFF?text=Bola';  // Imagem da bola

const torcidaImg = new Image();
torcidaImg.src = 'https://via.placeholder.com/1000x150/0000FF/FFFFFF?text=Torcida'; // Imagem da torcida (grande)

let jogador1 = []; // Jogadores do time 1
let jogador2 = []; // Jogadores do time 2
let bola = { x: 475, y: 300, width: 30, height: 30, dx: 3, dy: 3 };
let score = 0;

const jogadoresPorTime = 11;

// Função para desenhar o estádio e o campo de futebol
function drawEstadio() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenha o estádio (arquibancada)
  ctx.drawImage(torcidaImg, 0, 0, canvas.width, 150);  // Torcida visível no topo

  // Desenha o campo
  ctx.fillStyle = 'green';
  ctx.fillRect(0, 150, canvas.width, canvas.height - 150);
  
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 5;

  // Desenha a linha central
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 150);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();

  // Desenha a área do gol
  ctx.strokeRect(50, 200, 100, 100);
  ctx.strokeRect(canvas.width - 150, 200, 100, 100);

  // Desenha a linha de meio campo
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
  ctx.stroke();

  // Desenha o VAR (representação simples)
  ctx.strokeStyle = 'yellow';
  ctx.strokeRect(0, 150, canvas.width, 50);
  ctx.fillStyle = 'yellow';
  ctx.fillText("VAR", 10, 180);
}

// Função para desenhar os jogadores com as imagens reais
function drawJogadores() {
  // Jogadores do time 1
  for (let i = 0; i < jogador1.length; i++) {
    let jogador = jogador1[i];
    let jogadorImagem = new Image();
    jogadorImagem.src = jogador.src;
    jogadorImagem.onload = function() {
      ctx.drawImage(jogadorImagem, jogador.x, jogador.y, jogador.width, jogador.height);
    };
  }

  // Jogadores do time 2
  for (let i = 0; i < jogador2.length; i++) {
    let jogador = jogador2[i];
    let jogadorImagem = new Image();
    jogadorImagem.src = jogador.src;
    jogadorImagem.onload = function() {
      ctx.drawImage(jogadorImagem, jogador.x, jogador.y, jogador.width, jogador.height);
    };
  }
}

// Função para desenhar a bola
function drawBola() {
  ctx.drawImage(bolaImg, bola.x, bola.y, bola.width, bola.height);
}

// Função para desenhar o placar
function drawPlacar() {
  document.getElementById('score').textContent = score;
}

// Função para inicializar os jogadores com nomes e imagens reais
function inicializarJogadores() {
  const jogadoresTime1 = ['neymar', 'messi', 'cr7', 'mbappe', 'neymar', 'messi', 'cr7', 'mbappe', 'neymar', 'messi', 'cr7'];
  const jogadoresTime2 = ['mbappe', 'neymar', 'messi', 'cr7', 'neymar', 'messi', 'cr7', 'mbappe', 'neymar', 'messi', 'cr7'];

  for (let i = 0; i < jogadoresPorTime; i++) {
    jogador1.push({ x: 100 + i * 60, y: 250, width: 50, height: 50, src: `https://via.placeholder.com/50?text=${jogadoresTime1[i]}` });
    jogador2.push({ x: 100 + i * 60, y: 100, width: 50, height: 50, src: `https://via.placeholder.com/50?text=${jogadoresTime2[i]}` });
  }
}

// Função para controlar o movimento dos jogadores (teclado)
let keyState = {};

document.addEventListener('keydown', (event) => {
  keyState[event.key] = true;
});

document.addEventListener('keyup', (event) => {
  keyState[event.key] = false;
});

// Função para movimentar os jogadores
function moveJogador() {
  // Jogador 1 (Usando teclas de seta)
  if (keyState['ArrowUp']) jogador1[0].y -= 5;
  if (keyState['ArrowDown']) jogador1[0].y += 5;
  if (keyState['ArrowLeft']) jogador1[0].x -= 5;
  if (keyState['ArrowRight']) jogador1[0].x += 5;

  // Jogador 2 (Usando teclas WASD)
  if (keyState['w']) jogador2[0].y -= 5;
  if (keyState['s']) jogador2[0].y += 5;
  if (keyState['a']) jogador2[0].x -= 5;
  if (keyState['d']) jogador2[0].x += 5;
}

// Função para atualizar o jogo
function update() {
  moveJogador();
  drawEstadio();
  drawJogadores();
  drawBola();
  drawPlacar();
}

// Função principal do jogo
function gameLoop() {
  update();
  requestAnimationFrame(gameLoop);
}

// Inicializa os jogadores e começa o jogo
inicializarJogadores();
gameLoop();
const canvas = document.getElementById('campoFutebol');
const ctx = canvas.getContext('2d');

canvas.width = 1000;  // Largura do campo
canvas.height = 600; // Altura do campo

// URLs para imagens de jogadores reais de diferentes seleções
const jogadorImagens = {
  neymar: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Neymar_2018.jpg',  // Brasil
  messi: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Lionel_Messi_20180626.jpg',  // Argentina
  cr7: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Cristiano_Ronaldo_2018.jpg',  // Portugal
  mbappe: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Kylian_Mbapp%C3%A9_2018.jpg',  // França
  lukaku: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Romelu_Lukaku_2018.jpg',  // Bélgica
  kane: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Harry_Kane_2018.jpg',  // Inglaterra
};

let jogador1 = []; // Jogadores do time 1
let jogador2 = []; // Jogadores do time 2
let bola = { x: 475, y: 300, width: 50, height: 50, dx: 3, dy: 3 };  // Bola como jogador
let score = 0;

const jogadoresPorTime = 1;  // Alteramos para um jogador por vez para representar um único jogador por time

// Função para desenhar o estádio e o campo de futebol
function drawEstadio() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenha o estádio (arquibancada)
  ctx.fillStyle = 'green';
  ctx.fillRect(0, 150, canvas.width, canvas.height - 150);
  
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 5;

  // Desenha a linha central
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 150);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();

  // Desenha a área do gol
  ctx.strokeRect(50, 200, 100, 100);
  ctx.strokeRect(canvas.width - 150, 200, 100, 100);

  // Desenha a linha de meio campo
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
  ctx.stroke();
}

// Função para desenhar os jogadores com as imagens reais
function drawJogadores() {
  // Jogador 1 (Time 1)
  for (let i = 0; i < jogador1.length; i++) {
    let jogador = jogador1[i];
    let jogadorImagem = new Image();
    jogadorImagem.src = jogador.src;
    jogadorImagem.onload = function() {
      ctx.drawImage(jogadorImagem, jogador.x, jogador.y, jogador.width, jogador.height);
    };
  }

  // Jogador 2 (Time 2)
  for (let i = 0; i < jogador2.length; i++) {
    let jogador = jogador2[i];
    let jogadorImagem = new Image();
    jogadorImagem.src = jogador.src;
    jogadorImagem.onload = function() {
      ctx.drawImage(jogadorImagem, jogador.x, jogador.y, jogador.width, jogador.height);
    };
  }
}

// Função para desenhar a bola (agora o jogador com a bola)
function drawBola() {
  ctx.fillStyle = 'yellow';
  ctx.fillRect(bola.x, bola.y, bola.width, bola.height);  // Desenhamos o jogador em vez da bola
}

// Função para desenhar o placar
function drawPlacar() {
  document.getElementById('score').textContent = score;
}

// Função para inicializar os jogadores com nomes e imagens reais
function inicializarJogadores() {
  const jogadoresTime1 = ['neymar'];  // Exemplo de jogador do Brasil
  const jogadoresTime2 = ['messi'];  // Exemplo de jogador da Argentina

  jogador1.push({ x: 100, y: 250, width: 50, height: 50, src: jogadorImagens[jogadoresTime1[0]] });  // Time 1
  jogador2.push({ x: 800, y: 250, width: 50, height: 50, src: jogadorImagens[jogadoresTime2[0]] });  // Time 2
}

// Função para controlar o movimento dos jogadores (teclado)
let keyState = {};

document.addEventListener('keydown', (event) => {
  keyState[event.key] = true;
});

document.addEventListener('keyup', (event) => {
  keyState[event.key] = false;
});

// Função para movimentar os jogadores
function moveJogador() {
  // Jogador 1 (Usando teclas de seta)
  if (keyState['ArrowUp']) jogador1[0].y -= 5;
  if (keyState['ArrowDown']) jogador1[0].y += 5;
  if (keyState['ArrowLeft']) jogador1[0].x -= 5;
  if (keyState['ArrowRight']) jogador1[0].x += 5;

  // Jogador 2 (Usando teclas WASD)
  if (keyState['w']) jogador2[0].y -= 5;
  if (keyState['s']) jogador2[0].y += 5;
  if (keyState['a']) jogador2[0].x -= 5;
  if (keyState['d']) jogador2[0].x += 5;
}

// Função para atualizar o jogo
function update() {
  moveJogador();
  drawEstadio();
  drawJogadores();
  drawBola();
  drawPlacar();
}

// Função principal do jogo
function gameLoop() {
  update();
  requestAnimationFrame(gameLoop);
}

// Inicializa os jogadores e começa o jogo
inicializarJogadores();
gameLoop();
const canvas = document.getElementById('campoFutebol');
const ctx = canvas.getContext('2d');

canvas.width = 1000;  // Largura do campo
canvas.height = 600; // Altura do campo

// URLs para imagens de jogadores reais de diferentes seleções
const jogadorImagens = {
  neymar: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Neymar_2018.jpg',  // Brasil
  messi: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Lionel_Messi_20180626.jpg',  // Argentina
  cr7: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Cristiano_Ronaldo_2018.jpg',  // Portugal
  mbappe: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Kylian_Mbapp%C3%A9_2018.jpg',  // França
  lukaku: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Romelu_Lukaku_2018.jpg',  // Bélgica
  kane: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Harry_Kane_2018.jpg',  // Inglaterra
};

let jogador1 = []; // Jogadores do time 1
let jogador2 = []; // Jogadores do time 2
let bola = { x: 475, y: 300, width: 50, height: 50, dx: 3, dy: 3 };  // Bola como jogador
let score = 0;

const jogadoresPorTime = 1;  // Alteramos para um jogador por vez para representar um único jogador por time

// Função para desenhar o estádio e o campo de futebol
function drawEstadio() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenha o estádio (arquibancada)
  ctx.fillStyle = 'green';
  ctx.fillRect(0, 150, canvas.width, canvas.height - 150);
  
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 5;

  // Desenha a linha central
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 150);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();

  // Desenha a área do gol
  ctx.strokeRect(50, 200, 100, 100);
  ctx.strokeRect(canvas.width - 150, 200, 100, 100);

  // Desenha a linha de meio campo
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
  ctx.stroke();
}

// Função para desenhar os jogadores com as imagens reais
function drawJogadores() {
  // Jogador 1 (Time 1)
  for (let i = 0; i < jogador1.length; i++) {
    let jogador = jogador1[i];
    let jogadorImagem = new Image();
    jogadorImagem.src = jogador.src;
    jogadorImagem.onload = function() {
      ctx.drawImage(jogadorImagem, jogador.x, jogador.y, jogador.width, jogador.height);
    };
  }

  // Jogador 2 (Time 2)
  for (let i = 0; i < jogador2.length; i++) {
    let jogador = jogador2[i];
    let jogadorImagem = new Image();
    jogadorImagem.src = jogador.src;
    jogadorImagem.onload = function() {
      ctx.drawImage(jogadorImagem, jogador.x, jogador.y, jogador.width, jogador.height);
    };
  }
}

// Função para desenhar a bola (agora o jogador com a bola)
function drawBola() {
  ctx.fillStyle = 'yellow';
  ctx.fillRect(bola.x, bola.y, bola.width, bola.height);  // Desenhamos o jogador em vez da bola
}

// Função para desenhar o placar
function drawPlacar() {
  document.getElementById('score').textContent = score;
}

// Função para inicializar os jogadores com nomes e imagens reais
function inicializarJogadores() {
  const jogadoresTime1 = ['neymar'];  // Exemplo de jogador do Brasil
  const jogadoresTime2 = ['messi'];  // Exemplo de jogador da Argentina

  jogador1.push({ x: 100, y: 250, width: 50, height: 50, src: jogadorImagens[jogadoresTime1[0]] });  // Time 1
  jogador2.push({ x: 800, y: 250, width: 50, height: 50, src: jogadorImagens[jogadoresTime2[0]] });  // Time 2
}

// Função para controlar o movimento dos jogadores (teclado)
let keyState = {};

document.addEventListener('keydown', (event) => {
  keyState[event.key] = true;
});

document.addEventListener('keyup', (event) => {
  keyState[event.key] = false;
});

// Função para movimentar os jogadores
function moveJogador() {
  // Jogador 1 (Usando teclas de seta)
  if (keyState['ArrowUp']) jogador1[0].y -= 5;
  if (keyState['ArrowDown']) jogador1[0].y += 5;
  if (keyState['ArrowLeft']) jogador1[0].x -= 5;
  if (keyState['ArrowRight']) jogador1[0].x += 5;

  // Jogador 2 (Usando teclas WASD)
  if (keyState['w']) jogador2[0].y -= 5;
  if (keyState['s']) jogador2[0].y += 5;
  if (keyState['a']) jogador2[0].x -= 5;
  if (keyState['d']) jogador2[0].x += 5;
}

// Função para atualizar a narração e comentários
function atualizaNarração() {
  // Narrador
  const narradorTexto = document.getElementById('narrador-texto');
  const comentaristaTexto = document.getElementById('comentarista-texto');

  // Narração aleatória de acordo com o estado do jogo
  const narracaoOpcoes = [
    'A partida começou! Vamos ver quem vai levar a melhor hoje!',
    'Os times estão se aquecendo. A torcida está vibrando!',
    'Que lance emocionante! O jogo está pegando fogo!',
    'Gol! Gol! Gol! Que golaço!'
  ];

  const comentaristaOpcoes = [
    'O Neymar vai ser um grande diferencial hoje.',
    'Messi e Neymar são sempre imprevisíveis em campo!',
    'A defesa vai precisar trabalhar muito para parar esses jogadores.',
    'O Mbappé pode ser o jogador da partida se mantiver o ritmo!'
  ];

  // Escolha aleatória de comentários
  narradorTexto.textContent = narracaoOpcoes[Math.floor(Math.random() * narracaoOpcoes.length)];
  comentaristaTexto.textContent = comentaristaOpcoes[Math.floor(Math.random() * comentaristaOpcoes.length)];
}

// Função para atualizar o jogo
function update() {
  moveJogador();
  drawEstadio();
  drawJogadores();
  drawBola();
  drawPlacar();
  atualizaNarração();
}

// Função principal do jogo
function gameLoop() {
  update();
  requestAnimationFrame(gameLoop);
}

// Inicializa os jogadores e começa o jogo
inicializarJogadores();
gameLoop();
const canvas = document.getElementById('campoFutebol');
const ctx = canvas.getContext('2d');

canvas.width = 1000;  // Largura do campo
canvas.height = 600; // Altura do campo

// URLs para imagens de jogadores reais de diferentes seleções
const jogadorImagens = {
  neymar: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Neymar_2018.jpg',  // Brasil
  messi: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Lionel_Messi_20180626.jpg',  // Argentina
  cr7: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Cristiano_Ronaldo_2018.jpg',  // Portugal
  mbappe: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Kylian_Mbapp%C3%A9_2018.jpg',  // França
  lukaku: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Romelu_Lukaku_2018.jpg',  // Bélgica
  kane: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Harry_Kane_2018.jpg',  // Inglaterra
};

let jogador1 = []; // Jogadores do time 1
let jogador2 = []; // Jogadores do time 2
let bola = { x: 475, y: 300, width: 50, height: 50, dx: 3, dy: 3 };  // Bola como jogador
let score = 0;

const jogadoresPorTime = 1;  // Alteramos para um jogador por vez para representar um único jogador por time

let cartaoJogador1 = null;
let cartaoJogador2 = null;

// Função para desenhar o estádio e o campo de futebol
function drawEstadio() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenha o estádio (arquibancada)
  ctx.fillStyle = 'green';
  ctx.fillRect(0, 150, canvas.width, canvas.height - 150);
  
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 5;

  // Desenha a linha central
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 150);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();

  // Desenha a área do gol
  ctx.strokeRect(50, 200, 100, 100);
  ctx.strokeRect(canvas.width - 150, 200, 100, 100);

  // Desenha a linha de meio campo
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
  ctx.stroke();
}

// Função para desenhar os jogadores com as imagens reais
function drawJogadores() {
  // Jogador 1 (Time 1)
  for (let i = 0; i < jogador1.length; i++) {
    let jogador = jogador1[i];
    let jogadorImagem = new Image();
    jogadorImagem.src = jogador.src;
    jogadorImagem.onload = function() {
      ctx.drawImage(jogadorImagem, jogador.x, jogador.y, jogador.width, jogador.height);
    };
  }

  // Jogador 2 (Time 2)
  for (let i = 0; i < jogador2.length; i++) {
    let jogador = jogador2[i];
    let jogadorImagem = new Image();
    jogadorImagem.src = jogador.src;
    jogadorImagem.onload = function() {
      ctx.drawImage(jogadorImagem, jogador.x, jogador.y, jogador.width, jogador.height);
    };
  }
}

// Função para desenhar a bola (agora o jogador com a bola)
function drawBola() {
  ctx.fillStyle = 'yellow';
  ctx.fillRect(bola.x, bola.y, bola.width, bola.height);  // Desenhamos o jogador em vez da bola
}

// Função para desenhar o placar
function drawPlacar() {
  document.getElementById('score').textContent = score;
}

// Função para inicializar os jogadores com nomes e imagens reais
function inicializarJogadores() {
  const jogadoresTime1 = ['neymar'];  // Exemplo de jogador do Brasil
  const jogadoresTime2 = ['messi'];  // Exemplo de jogador da Argentina

  jogador1.push({ x: 100, y: 250, width: 50, height: 50, src: jogadorImagens[jogadoresTime1[0]] });  // Time 1
  jogador2.push({ x: 800, y: 250, width: 50, height: 50, src: jogadorImagens[jogadoresTime2[0]] });  // Time 2
}

// Função para controlar o movimento dos jogadores (teclado)
let keyState = {};

document.addEventListener('keydown', (event) => {
  keyState[event.key] = true;
});

document.addEventListener('keyup', (event) => {
  keyState[event.key] = false;
});

// Função para movimentar os jogadores
function moveJogador() {
  // Jogador 1 (Usando teclas de seta)
  if (keyState['ArrowUp']) jogador1[0].y -= 5;
  if (keyState['ArrowDown']) jogador1[0].y += 5;
  if (keyState['ArrowLeft']) jogador1[0].x -= 5;
  if (keyState['ArrowRight']) jogador1[0].x += 5;

  // Jogador 2 (Usando teclas WASD)
  if (keyState['w']) jogador2[0].y -= 5;
  if (keyState['s']) jogador2[0].y += 5;
  if (keyState['a']) jogador2[0].x -= 5;
  if (keyState['d']) jogador2[0].x += 5;
}

// Função para verificar e dar cartões
function darCartao(jogador, time) {
  if (time === 1 && cartaoJogador1) return;  // Jogador 1 já tem cartão
  if (time === 2 && cartaoJogador2) return;  // Jogador 2 já tem cartão

  const cartaoElement1 = document.getElementById('cartao1');
  const cartaoElement2 = document.getElementById('cartao2');
  
  // Simula falta para receber cartão
  const tipoDeCartao = Math.random() > 0.5 ? 'amarelo' : 'vermelho';  // 50% chance de ser amarelo ou vermelho
  
  if (time === 1) {
    if (tipoDeCartao === 'amarelo') {
      cartaoJogador1 = 'amarelo';
      cartaoElement1.textContent = 'Jogador 1 (Brasil) recebeu cartão AMARELO!';
      cartaoElement1.classList.add('amarelo');
    } else {
      cartaoJogador1 = 'vermelho';
      cartaoElement1.textContent = 'Jogador 1 (Brasil) recebeu cartão VERMELHO!';
      cartaoElement1.classList.add('vermelho');
    }
  } else if (time === 2) {
    if (tipoDeCartao === 'amarelo') {
      cartaoJogador2 = 'amarelo';
      cartaoElement2.textContent = 'Jogador 2 (Argentina) recebeu cartão AMARELO!';
      cartaoElement2.classList.add('amarelo');
    } else {
      cartaoJogador2 = 'vermelho';
      cartaoElement2.textContent = 'Jogador 2 (Argentina) recebeu cartão VERMELHO!';
      cartaoElement2.classList.add('vermelho');
    }
  }
}

// Função para atualizar a narração e comentários
function atualizaNarração() {
  // Narrador
  const narradorTexto = document.getElementById('narrador-texto');
  const comentaristaTexto = document.getElementById('comentarista-texto');

  // Narração aleatória de acordo com o estado do jogo
  const narracaoOpcoes = [
    'A partida começou! Vamos ver quem vai levar a melhor hoje!',
    'Os times estão se aquecendo. A torcida está vibrando!',
    'Que lance emocionante! O jogo está pegando fogo!',
    'Gol! Gol! Gol! Que golaço!'
  ];

  const comentaristaOpcoes = [
    'O Neymar vai ser um grande diferencial hoje.',
    'Messi e Neymar são sempre imprevisíveis em campo!',
    'A defesa vai precisar trabalhar muito para parar esses jogadores.',
    'O Mbappé pode ser o jogador da partida se mantiver o ritmo!'
  ];

  // Escolha aleatória de comentários
  narradorTexto.textContent = narracaoOpcoes[Math.floor(Math.random() * narracaoOpcoes.length)];
  comentaristaTexto.textContent = comentaristaOpcoes[Math.floor(Math.random() * comentaristaOpcoes.length)];
}

// Função para atualizar o jogo
function update() {
  moveJogador();
  drawEstadio();
  drawJogadores();
  drawBola();
  drawPlacar();
  atualizaNarração();
}

// Função principal do jogo
function gameLoop() {
  update();
  darCartao(jogador1[0], 1);  // Jogador 1 pode receber cartão
  darCartao(jogador2[0], 2);  // Jogador 2 pode receber cartão
  requestAnimationFrame(gameLoop);
}

// Inicializa os jogadores e começa o jogo
inicializarJogadores();
gameLoop();
const canvas = document.getElementById('campoFutebol');
const ctx = canvas.getContext('2d');

canvas.width = 1000;  // Largura do campo
canvas.height = 600; // Altura do campo

const jogadorImagens = {
  neymar: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Neymar_2018.jpg',  // Brasil
  messi: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Lionel_Messi_20180626.jpg',  // Argentina
  cr7: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Cristiano_Ronaldo_2018.jpg',  // Portugal
  mbappe: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Kylian_Mbapp%C3%A9_2018.jpg',  // França
};

let jogador1 = [{ x: 100, y: 250, width: 50, height: 50, src: jogadorImagens.neymar }];
let jogador2 = [{ x: 800, y: 250, width: 50, height: 50, src: jogadorImagens.messi }];
let bola = { x: 475, y: 300, width: 50, height: 50, dx: 3, dy: 3 };
let score = 0;
let keyState = {};
let jogando = false;

let animacaoBicicleta = false;
let animacaoVoleio = false;
let animacaoScorpion = false;
let animacaoSuperChute = false;

document.addEventListener('keydown', (event) => {
  keyState[event.key] = true;
});

document.addEventListener('keyup', (event) => {
  keyState[event.key] = false;
});

// Função para desenhar o campo
function drawEstadio() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'green';
  ctx.fillRect(0, 150, canvas.width, canvas.height - 150);

  ctx.strokeStyle = 'white';
  ctx.lineWidth = 5;

  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 150);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();

  ctx.strokeRect(50, 200, 100, 100);
  ctx.strokeRect(canvas.width - 150, 200, 100, 100);
  
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
  ctx.stroke();
}

// Função para desenhar os jogadores
function drawJogadores() {
  for (let i = 0; i < jogador1.length; i++) {
    let jogador = jogador1[i];
    let jogadorImagem = new Image();
    jogadorImagem.src = jogador.src;
    jogadorImagem.onload = function() {
      ctx.drawImage(jogadorImagem, jogador.x, jogador.y, jogador.width, jogador.height);
    };
  }

  for (let i = 0; i < jogador2.length; i++) {
    let jogador = jogador2[i];
    let jogadorImagem = new Image();
    jogadorImagem.src = jogador.src;
    jogadorImagem.onload = function() {
      ctx.drawImage(jogadorImagem, jogador.x, jogador.y, jogador.width, jogador.height);
    };
  }
}

// Função para desenhar a bola
function drawBola() {
  ctx.fillStyle = 'yellow';
  ctx.fillRect(bola.x, bola.y, bola.width, bola.height);
}

// Função para mover a bola
function moveBola() {
  bola.x += bola.dx;
  bola.y += bola.dy;
  if (bola.x < 0 || bola.x > canvas.width - bola.width) bola.dx *= -1;
  if (bola.y < 0 || bola.y > canvas.height - bola.height) bola.dy *= -1;
}

// Função para controlar o movimento dos jogadores
function moveJogadores() {
  if (keyState['ArrowUp']) jogador1[0].y -= 5;
  if (keyState['ArrowDown']) jogador1[0].y += 5;
  if (keyState['ArrowLeft']) jogador1[0].x -= 5;
  if (keyState['ArrowRight']) jogador1[0].x += 5;

  if (keyState['w']) jogador2[0].y -= 5;
  if (keyState['s']) jogador2[0].y += 5;
  if (keyState['a']) jogador2[0].x -= 5;
  if (keyState['d']) jogador2[0].x += 5;
}

// Função para desenhar animações especiais
function desenharAnimacoesEspeciais() {
  if (animacaoBicicleta) {
    ctx.fillText("Bicicleta!", 400, 100);
    animacaoBicicleta = false;
  }
  if (animacaoVoleio) {
    ctx.fillText("Voleio!", 400, 100);
    animacaoVoleio = false;
  }
  if (animacaoScorpion) {
    ctx.fillText("Scorpion!", 400, 100);
    animacaoScorpion = false;
  }
  if (animacaoSuperChute) {
    ctx.fillText("Super Chute!", 400, 100);
    animacaoSuperChute = false;
  }
}

// Função para realizar animações de dribles
function realizarDribles() {
  if (keyState[' ']) {  // Tecla espaço para dribles
    // Pode-se colocar animações de dribles aqui
    ctx.fillText("Drible realizado!", 400, 200);
  }
}

// Função para realizar o super chute
function superChute() {
  if (keyState['Enter']) {  // Tecla Enter para o super chute
    animacaoSuperChute = true;
    bola.dx = bola.dx * 2;  // Aumentar a velocidade do chute
    bola.dy = bola.dy * 2;
  }
}

// Função para executar a bicicleta
function bicicleta() {
  if (keyState['b']) {  // Tecla "b" para bicicleta
    animacaoBicicleta = true;
  }
}

// Função para executar o voleio
function voleio() {
  if (keyState['v']) {  // Tecla "v" para voleio
    animacaoVoleio = true;
    bola.dy = -5;  // Direção do chute no voleio
  }
}

// Função para executar o scorpion
function scorpion() {
  if (keyState['s']) {  // Tecla "s" para scorpion
    animacaoScorpion = true;
    bola.dy = -5;  // Movimento do chute
    bola.dx = 5;   // Direção do chute
  }
}

// Função para desenhar o placar
function drawPlacar() {
  document.getElementById('score').textContent = score;
}

// Função para atualizar a narração
function atualizaNarração() {
  const narradorTexto = document.getElementById('narrador-texto');
  const comentaristaTexto = document.getElementById('comentarista-texto');

  const narracaoOpcoes = [
    'A partida começou! Vamos ver quem vai levar a melhor hoje!',
    'Os times estão se aquecendo. A torcida está vibrando!',
    'Que lance emocionante! O jogo está pegando fogo!',
    'Gol! Gol! Gol! Que golaço!',
    'E agora! Uma bicicleta! Que jogada incrível!'
  ];

  const comentaristaOpcoes = [
    'O Neymar vai ser um grande diferencial hoje.',
    'Messi e Neymar são sempre imprevisíveis em campo!',
    'A defesa vai precisar trabalhar muito para parar esses jogadores.',
    'O Mbappé pode ser o jogador da partida se mantiver o ritmo!',
    'Que drible fantástico! Vai ser difícil parar o Neymar!'
  ];

  narradorTexto.textContent = narracaoOpcoes[Math.floor(Math.random() * narracaoOpcoes.length)];
  comentaristaTexto.textContent = comentaristaOpcoes[Math.floor(Math.random() * comentaristaOpcoes.length)];
}

// Função para atualizar o jogo
function update() {
  moveJogadores();
  moveBola();
  bicicleta();
  voleio();
  scorpion();
  superChute();
  desenharAnimacoesEspeciais();
  drawEstadio();
  drawJogadores();
  drawBola();
  drawPlacar();
  atualizaNarração();
}

// Função principal do jogo
function gameLoop() {
  update();
  requestAnimationFrame(gameLoop);
}

// Inicializa os jogadores e começa o jogo
gameLoop();
const canvas = document.getElementById('campoFutebol');
const ctx = canvas.getContext('2d');

canvas.width = 1000;  // Largura do campo
canvas.height = 600; // Altura do campo

// Definindo os jogadores e seus atributos (over)
const jogadorImagens = {
  neymar: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Neymar_2018.jpg',  // Brasil
  messi: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Lionel_Messi_20180626.jpg',  // Argentina
  cr7: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Cristiano_Ronaldo_2018.jpg',  // Portugal
  mbappe: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Kylian_Mbapp%C3%A9_2018.jpg',  // França
};

// Atributos dos jogadores (drible, chute, velocidade, passe, defesa)
let jogadores = {
  neymar: { nome: "Neymar", drible: 95, chute: 88, velocidade: 92, passe: 85, defesa: 40, over: 0 },
  messi: { nome: "Messi", drible: 98, chute: 90, velocidade: 89, passe: 91, defesa: 45, over: 0 },
  cr7: { nome: "Cristiano Ronaldo", drible: 85, chute: 92, velocidade: 90, passe: 82, defesa: 50, over: 0 },
  mbappe: { nome: "Mbappé", drible: 92, chute: 88, velocidade: 96, passe: 80, defesa: 60, over: 0 },
};

// Função para calcular o "over" de cada jogador
function calcularOver(jogador) {
  jogador.over = Math.round((jogador.drible + jogador.chute + jogador.velocidade + jogador.passe + jogador.defesa) / 5);
  return jogador.over;
}

// Calcular o over para todos os jogadores
for (let key in jogadores) {
  calcularOver(jogadores[key]);
}

let jogador1 = [{ x: 100, y: 250, width: 50, height: 50, src: jogadorImagens.neymar }];
let jogador2 = [{ x: 800, y: 250, width: 50, height: 50, src: jogadorImagens.messi }];
let bola = { x: 475, y: 300, width: 50, height: 50, dx: 3, dy: 3 };
let score = 0;
let keyState = {};
let jogando = false;

let animacaoBicicleta = false;
let animacaoVoleio = false;
let animacaoScorpion = false;
let animacaoSuperChute = false;

document.addEventListener('keydown', (event) => {
  keyState[event.key] = true;
});

document.addEventListener('keyup', (event) => {
  keyState[event.key] = false;
});

// Função para desenhar o campo
function drawEstadio() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'green';
  ctx.fillRect(0, 150, canvas.width, canvas.height - 150);

  ctx.strokeStyle = 'white';
  ctx.lineWidth = 5;

  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 150);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();

  ctx.strokeRect(50, 200, 100, 100);
  ctx.strokeRect(canvas.width - 150, 200, 100, 100);
  
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
  ctx.stroke();
}

// Função para desenhar os jogadores
function drawJogadores() {
  for (let i = 0; i < jogador1.length; i++) {
    let jogador = jogador1[i];
    let jogadorImagem = new Image();
    jogadorImagem.src = jogador.src;
    jogadorImagem.onload = function() {
      ctx.drawImage(jogadorImagem, jogador.x, jogador.y, jogador.width, jogador.height);
    };
  }

  for (let i = 0; i < jogador2.length; i++) {
    let jogador = jogador2[i];
    let jogadorImagem = new Image();
    jogadorImagem.src = jogador.src;
    jogadorImagem.onload = function() {
      ctx.drawImage(jogadorImagem, jogador.x, jogador.y, jogador.width, jogador.height);
    };
  }
}

// Função para desenhar a bola
function drawBola() {
  ctx.fillStyle = 'yellow';
  ctx.fillRect(bola.x, bola.y, bola.width, bola.height);
}

// Função para mover a bola
function moveBola() {
  bola.x += bola.dx;
  bola.y += bola.dy;
  if (bola.x < 0 || bola.x > canvas.width - bola.width) bola.dx *= -1;
  if (bola.y < 0 || bola.y > canvas.height - bola.height) bola.dy *= -1;
}

// Função para controlar o movimento dos jogadores
function moveJogadores() {
  if (keyState['ArrowUp']) jogador1[0].y -= 5;
  if (keyState['ArrowDown']) jogador1[0].y += 5;
  if (keyState['ArrowLeft']) jogador1[0].x -= 5;
  if (keyState['ArrowRight']) jogador1[0].x += 5;

  if (keyState['w']) jogador2[0].y -= 5;
  if (keyState['s']) jogador2[0].y += 5;
  if (keyState['a']) jogador2[0].x -= 5;
  if (keyState['d']) jogador2[0].x += 5;
}

// Função para desenhar animações especiais
function desenharAnimacoesEspeciais() {
  if (animacaoBicicleta) {
    ctx.fillText("Bicicleta!", 400, 100);
    animacaoBicicleta = false;
  }
  if (animacaoVoleio) {
    ctx.fillText("Voleio!", 400, 100);
    animacaoVoleio = false;
  }
  if (animacaoScorpion) {
    ctx.fillText("Scorpion!", 400, 100);
    animacaoScorpion = false;
  }
  if (animacaoSuperChute) {
    ctx.fillText("Super Chute!", 400, 100);
    animacaoSuperChute = false;
  }
}

// Função para desenhar o placar
function drawPlacar() {
  document.getElementById('score').textContent = score;
}

// Função para atualizar a narração
function atualizaNarração() {
  const narradorTexto = document.getElementById('narrador-texto');
  const comentaristaTexto = document.getElementById('comentarista-texto');

  const narracaoOpcoes = [
    'A partida começou! Vamos ver quem vai levar a melhor hoje!',
    'Os times estão se aquecendo. A torcida está vibrando!',
    'Que lance emocionante! O jogo está pegando fogo!',
    'Gol! Gol! Gol! Que golaço!',
    'E agora! Uma bicicleta! Que jogada incrível!'
  ];

  const comentaristaOpcoes = [
    `O ${jogadores.neymar.nome} vai ser um grande diferencial hoje. (Over: ${jogadores.neymar.over})`,
    `O ${jogadores.messi.nome} é um dos maiores do mundo. (Over: ${jogadores.messi.over})`,
    `O ${jogadores.cr7.nome} tem uma habilidade incrível. (Over: ${jogadores.cr7.over})`,
    `O ${jogadores.mbappe.nome} pode ser o futuro do futebol. (Over: ${jogadores.mbappe.over})`
  ];

  narradorTexto.textContent = narracaoOpcoes[Math.floor(Math.random() * narracaoOpcoes.length)];
  comentaristaTexto.textContent = comentaristaOpcoes[Math.floor(Math.random() * comentaristaOpcoes.length)];
}

// Função para atualizar o jogo
function update() {
  moveJogadores();
  moveBola();
  desenharAnimacoesEspeciais();
  drawEstadio();
  drawJogadores();
  drawBola();
  drawPlacar();
  atualizaNarração();
}

// Função principal do jogo
function gameLoop() {
  update();
  requestAnimationFrame(gameLoop);
}

// Inicializa os jogadores e começa o jogo
gameLoop();
const canvas = document.getElementById('campoFutebol');
const ctx = canvas.getContext('2d');

canvas.width = 1000;  // Largura do campo
canvas.height = 600; // Altura do campo

// Carregar os sons da torcida
const somTorcida = new Audio('assets/audio/torcida_gritando.mp3');  // Coloque o caminho correto do arquivo de áudio
somTorcida.loop = true;  // Faz o som da torcida ser contínuo
somTorcida.volume = 0.3; // Ajusta o volume da torcida

// Definindo os jogadores e seus atributos (over)
const jogadorImagens = {
  neymar: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Neymar_2018.jpg',  // Brasil
  messi: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Lionel_Messi_20180626.jpg',  // Argentina
  cr7: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Cristiano_Ronaldo_2018.jpg',  // Portugal
  mbappe: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Kylian_Mbapp%C3%A9_2018.jpg',  // França
};

// Atributos dos jogadores (drible, chute, velocidade, passe, defesa)
let jogadores = {
  neymar: { nome: "Neymar", drible: 95, chute: 88, velocidade: 92, passe: 85, defesa: 40, over: 0 },
  messi: { nome: "Messi", drible: 98, chute: 90, velocidade: 89, passe: 91, defesa: 45, over: 0 },
  cr7: { nome: "Cristiano Ronaldo", drible: 85, chute: 92, velocidade: 90, passe: 82, defesa: 50, over: 0 },
  mbappe: { nome: "Mbappé", drible: 92, chute: 88, velocidade: 96, passe: 80, defesa: 60, over: 0 },
};

// Função para calcular o "over" de cada jogador
function calcularOver(jogador) {
  jogador.over = Math.round((jogador.drible + jogador.chute + jogador.velocidade + jogador.passe + jogador.defesa) / 5);
  return jogador.over;
}

// Calcular o over para todos os jogadores
for (let key in jogadores) {
  calcularOver(jogadores[key]);
}

let jogador1 = [{ x: 100, y: 250, width: 50, height: 50, src: jogadorImagens.neymar }];
let jogador2 = [{ x: 800, y: 250, width: 50, height: 50, src: jogadorImagens.messi }];
let bola = { x: 475, y: 300, width: 50, height: 50, dx: 3, dy: 3 };
let score = 0;
let keyState = {};
let jogando = false;

let animacaoBicicleta = false;
let animacaoVoleio = false;
let animacaoScorpion = false;
let animacaoSuperChute = false;

document.addEventListener('keydown', (event) => {
  keyState[event.key] = true;
});

document.addEventListener('keyup', (event) => {
  keyState[event.key] = false;
});

// Função para desenhar o campo
function drawEstadio() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'green';
  ctx.fillRect(0, 150, canvas.width, canvas.height - 150);

  ctx.strokeStyle = 'white';
  ctx.lineWidth = 5;

  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 150);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();

  ctx.strokeRect(50, 200, 100, 100);
  ctx.strokeRect(canvas.width - 150, 200, 100, 100);
  
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
  ctx.stroke();
}

// Função para desenhar os jogadores
function drawJogadores() {
  for (let i = 0; i < jogador1.length; i++) {
    let jogador = jogador1[i];
    let jogadorImagem = new Image();
    jogadorImagem.src = jogador.src;
    jogadorImagem.onload = function() {
      ctx.drawImage(jogadorImagem, jogador.x, jogador.y, jogador.width, jogador.height);
    };
  }

  for (let i = 0; i < jogador2.length; i++) {
    let jogador = jogador2[i];
    let jogadorImagem = new Image();
    jogadorImagem.src = jogador.src;
    jogadorImagem.onload = function() {
      ctx.drawImage(jogadorImagem, jogador.x, jogador.y, jogador.width, jogador.height);
    };
  }
}

// Função para desenhar a bola
function drawBola() {
  ctx.fillStyle = 'yellow';
  ctx.fillRect(bola.x, bola.y, bola.width, bola.height);
}

// Função para mover a bola
function moveBola() {
  bola.x += bola.dx;
  bola.y += bola.dy;
  if (bola.x < 0 || bola.x > canvas.width - bola.width) bola.dx *= -1;
  if (bola.y < 0 || bola.y > canvas.height - bola.height) bola.dy *= -1;
}

// Função para controlar o movimento dos jogadores
function moveJogadores() {
  if (keyState['ArrowUp']) jogador1[0].y -= 5;
  if (keyState['ArrowDown']) jogador1[0].y += 5;
  if (keyState['ArrowLeft']) jogador1[0].x -= 5;
  if (keyState['ArrowRight']) jogador1[0].x += 5;

  if (keyState['w']) jogador2[0].y -= 5;
  if (keyState['s']) jogador2[0].y += 5;
  if (keyState['a']) jogador2[0].x -= 5;
  if (keyState['d']) jogador2[0].x += 5;
}

// Função para desenhar animações especiais
function desenharAnimacoesEspeciais() {
  if (animacaoBicicleta) {
    ctx.fillText("Bicicleta!", 400, 100);
    animacaoBicicleta = false;
  }
  if (animacaoVoleio) {
    ctx.fillText("Voleio!", 400, 100);
    animacaoVoleio = false;
  }
  if (animacaoScorpion) {
    ctx.fillText("Scorpion!", 400, 100);
    animacaoScorpion = false;
  }
  if (animacaoSuperChute) {
    ctx.fillText("Super Chute!", 400, 100);
    animacaoSuperChute = false;
  }
}

// Função para desenhar o placar
function drawPlacar() {
  document.getElementById('score').textContent = score;
}

// Função para atualizar a narração
function atualizaNarração() {
  const narradorTexto = document.getElementById('narrador-texto');
  const comentaristaTexto = document.getElementById('comentarista-texto');

  const narracaoOpcoes = [
    'A partida começou! Vamos ver quem vai levar a melhor hoje!',
    'Os times estão se aquecendo. A torcida está vibrando!',
    'Que lance emocionante! O jogo está pegando fogo!',
    'Gol! Gol! Gol! Que golaço!',
    'E agora! Uma bicicleta! Que jogada incrível!'
  ];

  const comentaristaOpcoes = [
    `O ${jogadores.neymar.nome} vai ser um grande diferencial hoje. (Over: ${jogadores.neymar.over})`,
    `O ${jogadores.messi.nome} é um dos maiores do mundo. (Over: ${jogadores.messi.over})`,
    `O ${jogadores.cr7.nome} tem uma habilidade incrível. (Over: ${jogadores.cr7.over})`,
    `O ${jogadores.mbappe.nome} pode ser o futuro do futebol. (Over: ${jogadores.mbappe.over})`
  ];

  narradorTexto.textContent = narracaoOpcoes[Math.floor(Math.random() * narracaoOpcoes.length)];
  comentaristaTexto.textContent = comentaristaOpcoes[Math.floor(Math.random() * comentaristaOpcoes.length)];
}

// Função para atualizar o jogo
function update() {
  moveJogadores();
  moveBola();
  desenharAnimacoesEspeciais();
  drawEstadio();
  drawJogadores();
  drawBola();
  drawPlacar();
  atualizaNarração();

  // Começar a torcida quando o jogo começa
  if (!somTorcida.playing) {
    somTorcida.play(); // Reproduz a torcida no início
  }
}

// Função principal do jogo
function gameLoop() {
  update();
  requestAnimationFrame(gameLoop);
}

// Inicializa os jogadores e começa o jogo
gameLoop();
const canvas = document.getElementById('campoFutebol');
const ctx = canvas.getContext('2d');

canvas.width = 1000;  // Largura do campo
canvas.height = 600;  // Altura do campo

// Carregar os sons das torcidas
const somTorcidaLocal = new Audio('assets/audio/torcida_local.mp3');  // Torcida do time da casa
somTorcidaLocal.loop = true;  // Torcida local em loop
somTorcidaLocal.volume = 0.3;  // Volume da torcida local

const somTorcidaVisitante = new Audio('assets/audio/torcida_visitante.mp3');  // Torcida do time visitante
somTorcidaVisitante.loop = true;  // Torcida visitante em loop
somTorcidaVisitante.volume = 0.3;  // Volume da torcida visitante

// Definindo os jogadores e seus atributos (over)
const jogadorImagens = {
  neymar: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Neymar_2018.jpg',  // Brasil
  messi: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Lionel_Messi_20180626.jpg',  // Argentina
  cr7: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Cristiano_Ronaldo_2018.jpg',  // Portugal
  mbappe: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Kylian_Mbapp%C3%A9_2018.jpg',  // França
};

// Atributos dos jogadores (drible, chute, velocidade, passe, defesa)
let jogadores = {
  neymar: { nome: "Neymar", drible: 95, chute: 88, velocidade: 92, passe: 85, defesa: 40, over: 0 },
  messi: { nome: "Messi", drible: 98, chute: 90, velocidade: 89, passe: 91, defesa: 45, over: 0 },
  cr7: { nome: "Cristiano Ronaldo", drible: 85, chute: 92, velocidade: 90, passe: 82, defesa: 50, over: 0 },
  mbappe: { nome: "Mbappé", drible: 92, chute: 88, velocidade: 96, passe: 80, defesa: 60, over: 0 },
};

// Função para calcular o "over" de cada jogador
function calcularOver(jogador) {
  jogador.over = Math.round((jogador.drible + jogador.chute + jogador.velocidade + jogador.passe + jogador.defesa) / 5);
  return jogador.over;
}

// Calcular o over para todos os jogadores
for (let key in jogadores) {
  calcularOver(jogadores[key]);
}

let jogador1 = [{ x: 100, y: 250, width: 50, height: 50, src: jogadorImagens.neymar }];
let jogador2 = [{ x: 800, y: 250, width: 50, height: 50, src: jogadorImagens.messi }];
let bola = { x: 475, y: 300, width: 50, height: 50, dx: 3, dy: 3 };
let score = 0;
let keyState = {};
let jogando = false;

let animacaoBicicleta = false;
let animacaoVoleio = false;
let animacaoScorpion = false;
let animacaoSuperChute = false;

document.addEventListener('keydown', (event) => {
  keyState[event.key] = true;
});

document.addEventListener('keyup', (event) => {
  keyState[event.key] = false;
});

// Função para desenhar o campo
function drawEstadio() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'green';
  ctx.fillRect(0, 150, canvas.width, canvas.height - 150);

  ctx.strokeStyle = 'white';
  ctx.lineWidth = 5;

  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 150);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();

  ctx.strokeRect(50, 200, 100, 100);
  ctx.strokeRect(canvas.width - 150, 200, 100, 100);
  
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
  ctx.stroke();
}

// Função para desenhar os jogadores
function drawJogadores() {
  for (let i = 0; i < jogador1.length; i++) {
    let jogador = jogador1[i];
    let jogadorImagem = new Image();
    jogadorImagem.src = jogador.src;
    jogadorImagem.onload = function() {
      ctx.drawImage(jogadorImagem, jogador.x, jogador.y, jogador.width, jogador.height);
    };
  }

  for (let i = 0; i < jogador2.length; i++) {
    let jogador = jogador2[i];
    let jogadorImagem = new Image();
    jogadorImagem.src = jogador.src;
    jogadorImagem.onload = function() {
      ctx.drawImage(jogadorImagem, jogador.x, jogador.y, jogador.width, jogador.height);
    };
  }
}

// Função para desenhar a bola
function drawBola() {
  ctx.fillStyle = 'yellow';
  ctx.fillRect(bola.x, bola.y, bola.width, bola.height);
}

// Função para mover a bola
function moveBola() {
  bola.x += bola.dx;
  bola.y += bola.dy;
  if (bola.x < 0 || bola.x > canvas.width - bola.width) bola.dx *= -1;
  if (bola.y < 0 || bola.y > canvas.height - bola.height) bola.dy *= -1;
}

// Função para controlar o movimento dos jogadores
function moveJogadores() {
  if (keyState['ArrowUp']) jogador1[0].y -= 5;
  if (keyState['ArrowDown']) jogador1[0].y += 5;
  if (keyState['ArrowLeft']) jogador1[0].x -= 5;
  if (keyState['ArrowRight']) jogador1[0].x += 5;

  if (keyState['w']) jogador2[0].y -= 5;
  if (keyState['s']) jogador2[0].y += 5;
  if (keyState['a']) jogador2[0].x -= 5;
  if (keyState['d']) jogador2[0].x += 5;
}

// Função para desenhar animações especiais
function desenharAnimacoesEspeciais() {
  if (animacaoBicicleta) {
    ctx.fillText("Bicicleta!", 400, 100);
    animacaoBicicleta = false;
  }
  if (animacaoVoleio) {
    ctx.fillText("Voleio!", 400, 100);
    animacaoVoleio = false;
  }
  if (animacaoScorpion) {
    ctx.fillText("Scorpion!", 400, 100);
    animacaoScorpion = false;
  }
  if (animacaoSuperChute) {
    ctx.fillText("Super Chute!", 400, 100);
    animacaoSuperChute = false;
  }
}

// Função para desenhar o placar
function drawPlacar() {
  document.getElementById('score').textContent = score;
}

// Função para atualizar a narração
function atualizaNarração() {
  const narradorTexto = document.getElementById('narrador-texto');
  const comentaristaTexto = document.getElementById('comentarista-texto');

  const narracaoOpcoes = [
    'A partida começou! Vamos ver quem vai levar a melhor hoje!',
    'Os times estão se aquecendo. A torcida está vibrando!',
    'Que lance emocionante! O jogo está pegando fogo!',
    'Gol! Gol! Gol! Que golaço!',
    'E agora! Uma bicicleta! Que jogada incrível!'
  ];

  const comentaristaOpcoes = [
    `O ${jogadores.neymar.nome} vai ser um grande diferencial hoje. (Over: ${jogadores.neymar.over})`,
    `O ${jogadores.messi.nome} é um dos maiores do mundo. (Over: ${jogadores.messi.over})`,
    `O ${jogadores.cr7.nome} tem uma habilidade incrível. (Over: ${jogadores.cr7.over})`,
    `O ${jogadores.mbappe.nome} pode ser
