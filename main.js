// const canvas = document.getElementById('canvas');
// const ctx = canvas.getContext('2d');
//
// let fileInput = document.getElementById('file');
// let textInput = document.getElementById('text');
// let colorInput = document.getElementById('color');
// let addTextBtn = document.getElementById('addText');
// let saveBtn = document.getElementById('save');
//
// let img;
//
// fileInput.addEventListener('change', function () {
//     img = new Image();
//     img.onload = function () {
//         drawImage();
//     };
//     img.src = URL.createObjectURL(fileInput.files[0]);
// });
//
// addTextBtn.addEventListener('click', function () {
//     drawText();
// });
//
// window.addEventListener('keydown', function (e) {
//     if (e.key === "Delete") {
//         clearCanvas();
//     }
// });
//
// saveBtn.addEventListener('click', function () {
//     saveImage();
// });
//
// function drawImage() {
//     clearCanvas();
//     ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
// }
//
// function drawText() {
//     let text = textInput.value;
//     let textColor = colorInput.value;
//
//     ctx.fillStyle = textColor;
//     ctx.font = '20px Arial';
//     ctx.fillText(text, 100, 100);
// }
//
// function clearCanvas() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
// }
//
// function saveImage() {
//     let dataURL = canvas.toDataURL();
//     let link = document.createElement('a');
//     link.href = dataURL;
//     link.download = 'image.png';
//     link.click();
// }
// Ваш main.js

const canvas = new fabric.Canvas('canvas', {
    width: 500,
    height: 500,
    backgroundColor: '#fff'
});

const fileInput = document.getElementById('file');
const addTextBtn = document.getElementById('addText');
const textInput = document.getElementById('text');
const colorInput = document.getElementById('color');
const saveBtn = document.getElementById('save');

fileInput.addEventListener('change', handleImageUpload);
addTextBtn.addEventListener('click', addTextToCanvas);
window.addEventListener('keydown', handleKeyPress);
saveBtn.addEventListener('click', saveCanvas);

function handleImageUpload() {
    const img = fileInput.files[0];

    if (!img) {
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
        const data = reader.result;

        fabric.Image.fromURL(data, function (img) {
            canvas.add(img);

            if (img.width > canvas.width) {
                img.scaleToWidth(canvas.width);
            }
        });
    };

    reader.readAsDataURL(img);
}

function addTextToCanvas() {
    const _text = new fabric.Text(textInput.value, {
        left: 100,
        top: 100,
        fontSize: 20,
        fill: colorInput.value
    });

    canvas.add(_text);
}

function handleKeyPress(e) {
    if (e.key === 'Delete') {
        canvas.remove(canvas.getActiveObject());
    }
}

function saveCanvas() {
    const data = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = data;
    link.download = 'image.png';
    link.click();
}
