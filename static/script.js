const imageUpload = document.getElementById("imageUpload");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const saveBtn = document.getElementById("saveBtn");
const labelInput = document.getElementById("label");

let img = new Image();
let startX, startY, endX, endY;
let drawing = false;
let annotation = {};

imageUpload.addEventListener("change", function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(event) {
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        };
        img.src = event.target.result;
    };

    reader.readAsDataURL(file);
});

canvas.addEventListener("mousedown", function(e) {
    startX = e.offsetX;
    startY = e.offsetY;
    drawing = true;
});

canvas.addEventListener("mouseup", function(e) {
    if (!drawing) return;

    endX = e.offsetX;
    endY = e.offsetY;
    drawing = false;

    ctx.drawImage(img, 0, 0);

    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.strokeRect(
        startX,
        startY,
        endX - startX,
        endY - startY
    );

    annotation = {
        label: labelInput.value,
        x: startX,
        y: startY,
        width: endX - startX,
        height: endY - startY
    };
});

saveBtn.addEventListener("click", function() {
    fetch("/save", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(annotation)
    })
    .then(res => res.json())
    .then(data => alert(data.message));
});
