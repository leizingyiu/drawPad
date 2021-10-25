/*page loading*/

var blendModes = {
    ADD: "ADD",
    BLEND: "BLEND",
    BURN: "BURN",
    DARKEST: "DARKEST",
    DIFFERENCE: "DIFFERENCE",
    DODGE: "DODGE",
    EXCLUSION: "EXCLUSION",
    HARD_LIGHT: "HARD_LIGHT",
    LIGHTEST: "LIGHTEST",
    MULTIPLY: "MULTIPLY",
    OVERLAY: "OVERLAY",
    REPLACE: "REPLACE",
    SCREEN: "SCREEN",
    SOFT_LIGHT: "SOFT_LIGHT"
}

blendModesForm = document.querySelector('#blendModes');
Object.entries(blendModes).map(i => {
    let l = document.createElement('lable');
    let input = document.createElement('input');
    l.setAttribute('for', 'blendModes_' + i[0]);
    l.innerHTML = '<input type="radio" name="blendMode" id="blendModes_' + i[0] + '"" value="' + i[0] + '" >' + i[1];
    blendModesForm.appendChild(l);
})

blendModesForm.addEventListener('input', function inputHandler(e) {
    console.log(e.target.value);
    cblend = e.target.value;
});























var cV = 196;
var c1 = [255, 255, 255],
    c2 = [cV, cV, cV],
    brushWeight = 1,
    cblend = "NORMAL",
    maxZStep = 20,
    zArr = [];
var beforeX, beforeY;
var pressCtrl = false;

function setup() {
    c = createCanvas(windowWidth, windowHeight);
    background(...c1);
    writeP();
}

function draw() {
    drawingBackstage();
    drawing();
}



document.querySelector('main').addEventListener('mousedown', function (e) {
    console.log(e);
    console.log(this);

    switch (true) {
        case e.altKey:

            break;
        case e.ctrlKey:

            break;
    };


}, true);

document.querySelector('main').addEventListener('mouseup', function (e) {
    console.log(e);
    console.log(this);

}, true);

document.addEventListener('keydown', function (e) {
    console.log(e.code);
    console.log(e);
});
document.addEventListener('keyup', function (e) {

});
// function logKey(e) {
//   log.textContent += ` ${e.code}`;
// }

function keyPressed() {
    console.log(keyCode);
    if (keyCode === ESCAPE) {
        fill(c1);
        rect(0, 0, windowWidth, windowHeight);
    }
    if (keyCode === 17) {
        pressCtrl = true;
    }
    if (keyCode === 13 && pressCtrl) {
        saveCanvas(c, 'myCanvas', 'jpg');
    }
    writeP();
}

function keyReleased() {
    if (keyCode === 17) {
        pressCtrl = false;
    }
}








function drawingBackstage() {

    if (keyIsDown(219)) {
        strokeWeightChanging(-1);
    }
    if (keyIsDown(221)) {
        strokeWeightChanging(1);
    }
    if (keyIsDown(187)) {
        cV--;
        cV = cV <= 0 ? 0 : cV;
        c2 = [cV, cV, cV];
        strokeWeightChanging(0)
    }
    if (keyIsDown(189)) {
        cV++;
        cV = cV > 254 ? 254 : cV;
        c2 = [cV, cV, cV];
        strokeWeightChanging(0)
    }
}

function drawing() {

    strokeWeight(brushWeight);
    cblend = cblend == "NORMAL" ? 'BLEND' : cblend;
    if (mouseIsPressed) {
        if (mouseButton === LEFT) {
            stroke(...c2);
            blendMode(eval(cblend))
        }
        if (mouseButton === RIGHT || mouseButton === CENTER) {
            stroke(...c1);
            blendMode(LIGHTEST)
        }
        if (typeof beforeX != 'undefined') {
            line(beforeX, beforeY, mouseX, mouseY)
        }
        beforeX = mouseX;
        beforeY = mouseY;

    } else {
        beforeX = undefined;
        beforeY = undefined;
    }
}

function mouseWheel(event) {
    strokeWeightChanging(-event.delta / 10);
}

function writeP() {
    document.querySelector('p').innerHTML = '当前笔刷大小为 ' + brushWeight + ' , 当前颜色为 ' + cV + '</br> 鼠标滚轮 以及 中括号键 [ ] 可以调节笔刷大小；</br> 鼠标左键为画笔，右键为擦除；</br> 按 ctrl + enter 可以保存当前画面，按 esc 可清理画布';
}

function strokeWeightChanging(change) {
    var max = 100;
    var min = 1;
    blendMode(BLEND);
    strokeWeight(0);
    fill(...c1);
    rect(windowWidth - max * 1, windowHeight - max * 1, max, max);
    brushWeight += change;
    console.log(brushWeight);
    brushWeight = brushWeight < min ? min : brushWeight;
    brushWeight = brushWeight > max ? max : brushWeight;
    blendMode(BLEND);
    fill(...c2);
    circle(windowWidth - max * 0.5, windowHeight - max * 0.5, brushWeight);
    writeP();
}


