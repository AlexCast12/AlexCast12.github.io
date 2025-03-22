// Obtener el contexto del canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Función para dibujar un pétalo
function dibujarPetalo(x, y, angle, size) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.ellipse(0, 0, 50 * size, 100 * size, 0, 0, 2 * Math.PI);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.restore();
}

// Función para dibujar el centro de la flor
function dibujarCentro(x, y, size) {
    ctx.beginPath();
    ctx.arc(x, y, 20 * size, 0, 2 * Math.PI);
    ctx.fillStyle = 'brown';
    ctx.fill();
}

// Función para dibujar el tallo
function dibujarTallo(x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + 200 * size);
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 10 * size;
    ctx.stroke();
}

// Función para dibujar una hoja
function dibujarHoja(x, y, angle, size) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.ellipse(0, 0, 30 * size, 60 * size, 0, 0, 2 * Math.PI);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.restore();
}

// Función para dibujar la flor completa
function dibujarFlor(x, y, angleOffset, size) {
    // Dibujar el tallo y las hojas primero
    dibujarTallo(x, y + 20 * size, size);
    dibujarHoja(x - 20 * size, y + 150 * size, -Math.PI / 4, size);
    dibujarHoja(x + 20 * size, y + 150 * size, Math.PI / 4, size);

    // Dibujar los pétalos
    for (let i = 0; i < 6; i++) {
        const angle = angleOffset + i * Math.PI / 3;
        dibujarPetalo(x, y, angle, size);
    }

    // Dibujar el centro de la flor
    dibujarCentro(x, y, size);
}

// Variables para la animación
let angle = 0;
let size1 = 0.1;
let size2 = 0.1;
let size3 = 0.1;
let growing1 = true;
let growing2 = false;
let growing3 = false;

// Función para animar las flores
function animarFlores() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerX1 = canvas.width / 4;
    const centerY1 = canvas.height / 2;
    const centerX2 = canvas.width / 2;
    const centerY2 = canvas.height / 2;
    const centerX3 = (canvas.width * 3) / 4;
    const centerY3 = canvas.height / 2;

    // Animar la primera flor
    if (growing1) {
        dibujarFlor(centerX1, centerY1, angle, size1);
        size1 += 0.01;
        if (size1 >= 1) {
            growing1 = false;
            growing2 = true;
        }
    } else {
        dibujarFlor(centerX1, centerY1, angle, 1);
    }

    // Animar la segunda flor
    if (growing2) {
        dibujarFlor(centerX2, centerY2, angle, size2);
        size2 += 0.01;
        if (size2 >= 1) {
            growing2 = false;
            growing3 = true;
        }
    } else if (!growing3) {
        dibujarFlor(centerX2, centerY2, angle, 1);
    }

    // Animar la tercera flor
    if (growing3) {
        dibujarFlor(centerX3, centerY3, angle, size3);
        size3 += 0.01;
        if (size3 >= 1) {
            growing3 = false;
        }
    } else {
        dibujarFlor(centerX3, centerY3, angle, 1);
    }

    angle += 0.01;
    requestAnimationFrame(animarFlores);
}

// Iniciar la animación
animarFlores();

