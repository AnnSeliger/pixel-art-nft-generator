function generatePixelArt() {
    const address = document.getElementById("walletAddress").value || "0x4f4C15d9bD7c796A9f9B769b78323EA3E0054104";

    // Проверка корректности адреса
    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
        alert("Please enter a valid Ethereum address.");
        return;
    }

    console.log("Generating art for address:", address);

    const canvas = document.getElementById("pixelArtCanvas");
    if (!canvas) {
        console.error("Canvas element not found!");
        return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
        console.error("Canvas context not available!");
        return;
    }

    // Очистка холста
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log("Canvas cleared.");

    // Преобразование адреса в параметры
    const colorPalette = parseInt(address.slice(2, 6), 16) % 10; // Цветовая палитра
    const shape = [...address.slice(6, 10)].reduce((sum, c) => sum + parseInt(c, 16), 0) % 3; // Форма
    const emotion = parseInt(address.slice(10, 14), 16) % 4; // Эмоция
    const accessory = parseInt(address.slice(14, 18), 16) % 5; // Аксессуар
    const foregroundLayer = parseInt(address.slice(18, 22), 16) % 3; // Передний план
    const midgroundLayer = parseInt(address.slice(22, 26), 16) % 3; // Средний план
    const backgroundLayer = parseInt(address.slice(26, 30), 16) % 3; // Задний план
    const hiddenSymbol = parseInt(address.slice(30, 34), 16) % 4; // Скрытый символ

    console.log("Color Palette Index:", colorPalette);
    console.log("Shape:", shape);
    console.log("Emotion:", emotion);
    console.log("Accessory:", accessory);
    console.log("Foreground Layer:", foregroundLayer);
    console.log("Midground Layer:", midgroundLayer);
    console.log("Background Layer:", backgroundLayer);
    console.log("Hidden Symbol:", hiddenSymbol);

    // Цветовая палитра
    const colors = [
        "#00FF00", // Зеленый
        "#0000FF", // Синий
        "#FF0000", // Красный
        "#FFFF00", // Желтый
        "#FFA500", // Оранжевый
        "#800080", // Фиолетовый
        "#00FFFF", // Голубой
        "#FFC0CB", // Розовый
        "#008000", // Темно-зеленый
        "#FF4500"  // Оранжево-красный
    ];
    const mainColor = colors[colorPalette % colors.length];

    try {
        // Рисование заднего плана
        drawBackground(ctx, backgroundLayer);
        console.log("Background drawn.");

        // Рисование среднего плана
        drawMidground(ctx, midgroundLayer);
        console.log("Midground drawn.");

        // Рисование основной формы
        drawMainCharacter(ctx, shape, mainColor, emotion);
        console.log("Main character drawn.");

        // Рисование аксессуаров
        drawAccessory(ctx, accessory, mainColor);
        console.log("Accessory drawn.");

        // Рисование переднего плана
        drawForeground(ctx, foregroundLayer);
        console.log("Foreground drawn.");

        // Рисование скрытого символа
        drawHiddenSymbol(ctx, hiddenSymbol);
        console.log("Hidden symbol drawn.");

        // Добавление миллиона деталей
        drawDetails(ctx, address);
        console.log("Details added.");
    } catch (error) {
        console.error("Error during art generation:", error);
    }
}

function drawBackground(ctx, layer) {
    switch (layer) {
        case 0:
            // Космический фон
            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 0, 1024, 1024);

            // Звезды
            for (let i = 0; i < 500; i++) {
                const x = Math.random() * 1024;
                const y = Math.random() * 1024;
                const intensity = Math.random();
                ctx.fillStyle = `rgba(255, 255, 255, ${intensity})`;
                ctx.fillRect(x, y, 2, 2); // Размер звезды
            }

            // Вихрь
            ctx.beginPath();
            ctx.arc(512, 512, 200, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
            ctx.lineWidth = 2;
            ctx.stroke();

            break;
        case 1:
            // Подводный мир
            const gradient = ctx.createLinearGradient(0, 0, 0, 1024);
            gradient.addColorStop(0, "#0000FF");
            gradient.addColorStop(1, "#00FFFF");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 1024, 1024);

            // Кораллы
            for (let i = 0; i < 50; i++) {
                const x = Math.random() * 1024;
                const y = Math.random() * 1024;
                const size = Math.random() * 20 + 10;
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fillStyle = `hsl(${Math.random() * 360}, 70%, 50%)`;
                ctx.fill();
            }
            break;
        case 2:
            // Лес
            ctx.fillStyle = "#228B22";
            ctx.fillRect(0, 0, 1024, 1024);

            // Деревья
            for (let i = 0; i < 50; i++) {
                const x = Math.random() * 1024;
                const y = Math.random() * 200;
                const height = Math.random() * 50 + 50;
                ctx.fillStyle = `hsl(120, ${Math.random() * 50 + 50}%, 40%)`;
                ctx.fillRect(x, y, 10, height);
            }
            break;
    }
}

function drawMidground(ctx, layer) {
    switch (layer) {
        case 0:
            // Кристаллы
            for (let i = 0; i < 50; i++) {
                const x = Math.random() * 1024;
                const y = Math.random() * 100 + 300;
                const size = Math.random() * 20 + 10;
                ctx.fillStyle = `hsl(${Math.random() * 360}, 70%, 50%)`;
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            }
            break;
        case 1:
            // Лунные горы
            ctx.fillStyle = "#8B4513";
            ctx.fillRect(0, 300, 1024, 212);
            ctx.fillStyle = "#D2B48C";
            ctx.beginPath();
            ctx.moveTo(0, 300);
            ctx.lineTo(512, 100);
            ctx.lineTo(1024, 300);
            ctx.fill();
            break;
        case 2:
            // Пустыня
            const desertGradient = ctx.createLinearGradient(0, 300, 0, 1024);
            desertGradient.addColorStop(0, "#F4A460");
            desertGradient.addColorStop(1, "#8B4513");
            ctx.fillStyle = desertGradient;
            ctx.fillRect(0, 300, 1024, 212);
            break;
    }
}

function drawMainCharacter(ctx, shape, color, emotion) {
    if (shape === 0) {
        // Растительное существо
        ctx.fillStyle = color;
        ctx.fillRect(200, 200, 600, 600);

        // Текстура листьев
        for (let x = 200; x <= 800; x += 40) {
            for (let y = 200; y <= 800; y += 40) {
                ctx.fillStyle = `hsl(${Math.random() * 120}, 70%, 50%)`;
                ctx.fillRect(x, y, 20, 20);
            }
        }
    } else if (shape === 1) {
        // Водное существо
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(512, 512, 250, 0, Math.PI * 2);
        ctx.fill();

        // Волны
        for (let i = 0; i < 10; i++) {
            ctx.strokeStyle = `hsl(200, 70%, ${Math.random() * 30 + 50}%)`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, 512 + i * 10);
            ctx.bezierCurveTo(256, 512 + i * 10, 768, 512 - i * 10, 1024, 512 + i * 10);
            ctx.stroke();
        }
    } else {
        // Космическое существо
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(512, 512, 250, 0, Math.PI * 2);
        ctx.fill();

        // Щупальца
        for (let i = 0; i < 5; i++) {
            const angle = (i / 5) * Math.PI * 2;
            const x = 512 + Math.cos(angle) * 250;
            const y = 512 + Math.sin(angle) * 250;
            ctx.beginPath();
            ctx.moveTo(512, 512);
            ctx.lineTo(x, y);
            ctx.strokeStyle = color;
            ctx.lineWidth = 5;
            ctx.stroke();
        }
    }

    // Добавление эмоций
    if (emotion === 0) {
        // Спокойствие
        drawEye(ctx, 400, 400, 20, "white", "black");
        drawEye(ctx, 600, 400, 20, "white", "black");
    } else if (emotion === 1) {
        // Радость
        drawEye(ctx, 400, 400, 20, "yellow", "blue");
        drawEye(ctx, 600, 400, 20, "yellow", "blue");
        drawSmile(ctx, 512, 512, 100);
    } else if (emotion === 2) {
        // Загадочность
        drawEye(ctx, 400, 400, 20, "white", "red");
        drawEye(ctx, 600, 400, 20, "white", "red");
        drawShadow(ctx, 450, 450, 100, 40);
    } else if (emotion === 3) {
        // Ярость
        drawEye(ctx, 400, 400, 20, "white", "orange");
        drawEye(ctx, 600, 400, 20, "white", "orange");
        drawFire(ctx, 450, 450, 100, 40);
    }
}

function drawEye(ctx, x, y, radius, scleraColor, irisColor) {
    // Склера
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = scleraColor;
    ctx.fill();

    // Радужка
    ctx.beginPath();
    ctx.arc(x, y, radius / 2, 0, Math.PI * 2);
    ctx.fillStyle = irisColor;
    ctx.fill();

    // Зрачок
    ctx.beginPath();
    ctx.arc(x, y, radius / 4, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
}

function drawSmile(ctx, x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI);
    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 5;
    ctx.stroke();
}

function drawShadow(ctx, x, y, width, height) {
    ctx.fillStyle = "gray";
    ctx.fillRect(x, y, width, height);
}

function drawFire(ctx, x, y, width, height) {
    ctx.fillStyle = "orange";
    ctx.fillRect(x, y, width, height);
}

function drawAccessory(ctx, accessory, color) {
    switch (accessory) {
        case 0:
            // Корона
            drawCrown(ctx, 400, 300, 200, 40, "gold");
            break;
        case 1:
            // Шлем
            drawHelmet(ctx, 512, 350, 150, "silver");
            break;
        case 2:
            // Посох
            drawStaff(ctx, 800, 400, 40, 200, "brown", "purple");
            break;
        case 3:
            // Щит
            drawShield(ctx, 800, 800, 100, color);
            break;
        case 4:
            // Оружие
            drawSword(ctx, 700, 700, 40, 200, "steelblue");
            break;
    }
}

function drawCrown(ctx, x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);

    // Украшения
    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(x + (i * width / 4), y - height / 2, height / 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawHelmet(ctx, x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    // Визор
    ctx.fillStyle = "black";
    ctx.fillRect(x - radius / 2, y, radius, radius / 2);
}

function drawStaff(ctx, x, y, width, height, staffColor, gemColor) {
    ctx.fillStyle = staffColor;
    ctx.fillRect(x, y, width, height);

    ctx.beginPath();
    ctx.arc(x + width / 2, y - height / 2, height / 4, 0, Math.PI * 2);
    ctx.fillStyle = gemColor;
    ctx.fill();
}

function drawShield(ctx, x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}

function drawSword(ctx, x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);

    ctx.beginPath();
    ctx.moveTo(x + width / 2, y);
    ctx.lineTo(x, y - height / 2);
    ctx.lineTo(x + width, y - height / 2);
    ctx.closePath();
    ctx.fill();
}

function drawForeground(ctx, layer) {
    switch (layer) {
        case 0:
            // Плавающие кристаллы
            for (let i = 0; i < 50; i++) {
                const x = Math.random() * 1024;
                const y = Math.random() * 100 + 600;
                const size = Math.random() * 10 + 5;
                ctx.fillStyle = `hsl(${Math.random() * 360}, 70%, 50%)`;
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            }
            break;
        case 1:
            // Лес
            for (let i = 0; i < 100; i++) {
                const x = Math.random() * 1024;
                const y = Math.random() * 200;
                const height = Math.random() * 50 + 50;
                ctx.fillStyle = `hsl(120, ${Math.random() * 50 + 50}%, 40%)`;
                ctx.fillRect(x, y, 10, height);
            }
            break;
        case 2:
            // Пустыня
            const desertGradient = ctx.createLinearGradient(0, 300, 0, 1024);
            desertGradient.addColorStop(0, "#F4A460");
            desertGradient.addColorStop(1, "#8B4513");
            ctx.fillStyle = desertGradient;
            ctx.fillRect(0, 300, 1024, 212);
            break;
    }
}

function drawHiddenSymbol(ctx, symbol) {
    switch (symbol) {
        case 0:
            // Ключ
            ctx.fillStyle = "gold";
            ctx.fillRect(900, 900, 40, 40);
            break;
        case 1:
            // Замок
            ctx.fillStyle = "gray";
            ctx.fillRect(900, 900, 40, 40);
            break;
        case 2:
            // Звезда
            ctx.fillStyle = "yellow";
            ctx.beginPath();
            ctx.moveTo(920, 920);
            ctx.lineTo(940, 920);
            ctx.lineTo(930, 930);
            ctx.lineTo(940, 940);
            ctx.lineTo(920, 940);
            ctx.closePath();
            ctx.fill();
            break;
        case 3:
            // Луна
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(930, 930, 20, 0, Math.PI * 2);
            ctx.fill();
            break;
    }
}

function drawDetails(ctx, address) {
    for (let i = 0; i < 2000; i++) { // Уменьшаем количество деталей
        const x = (parseInt(address[i % 40], 16) * i) % 1024;
        const y = (parseInt(address[(i + 1) % 40], 16) * i) % 1024;
        const colorIndex = (x + y) % 4;
        const detailColors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00"];
        ctx.fillStyle = detailColors[colorIndex];
        ctx.fillRect(x, y, 2, 2); // Увеличиваем размер точки
    }
}

function downloadImage() {
    const canvas = document.getElementById("pixelArtCanvas");
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "pixel-art.png";
    link.click();
}
