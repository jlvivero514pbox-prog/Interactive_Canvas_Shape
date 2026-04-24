const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let circles = [];
let selectedCircle = null;
let isDragging = false;

// Draw all circles
function drawCircles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    circles.forEach(circle => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fillStyle = (circle === selectedCircle) ? "red" : "blue";
        ctx.fill();
    });
}

// Check if mouse is inside circle
function getCircle(x, y) {
    return circles.find(circle => {
        const dx = x - circle.x;
        const dy = y - circle.y;
        return Math.sqrt(dx * dx + dy * dy) <= circle.radius;
    });
}

// CLICK EVENT 
canvas.addEventListener("mousedown", function(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clickedCircle = getCircle(x, y);

    if (clickedCircle) {
        selectedCircle = clickedCircle;
        isDragging = true;
    } else {
        const newCircle = { x: x, y: y, radius: 20 };
        circles.push(newCircle);
        selectedCircle = null;
    }

    drawCircles();
});

// MOUSE MOVE 
canvas.addEventListener("mousemove", function(e) {
    if (isDragging && selectedCircle) {
        const rect = canvas.getBoundingClientRect();
        selectedCircle.x = e.clientX - rect.left;
        selectedCircle.y = e.clientY - rect.top;
        drawCircles();
    }
});

// MOUSE UP
canvas.addEventListener("mouseup", function() {
    isDragging = false;
});

// DELETE 
document.addEventListener("keydown", function(e) {
    if (e.key === "Delete" && selectedCircle) {
        circles = circles.filter(c => c !== selectedCircle);
        selectedCircle = null;
        drawCircles();
    }
});

// SCROLL 
canvas.addEventListener("wheel", function(e) {
    if (selectedCircle) {
        e.preventDefault();

        if (e.deltaY < 0) {
            selectedCircle.radius += 2;
        } else {
            selectedCircle.radius -= 2;
        }

        // Minimum size
        if (selectedCircle.radius < 5) {
            selectedCircle.radius = 5;
        }

        drawCircles();
    }
});