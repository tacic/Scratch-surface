var scratchBckg = new Image();
var section = document.getElementById('section');
var SCREEN_WIDTH = screen.width;
var SCREEN_HEIGHT = screen.height;

var canvasDim = 595;

if (SCREEN_WIDTH < canvasDim)
    canvasDim = SCREEN_WIDTH;

function createCanvas(parent, width, height, img) {
    var canvas = {};
    canvas.node = document.createElement('canvas');
    canvas.context = canvas.node.getContext('2d');

    canvas.node.width = canvasDim;
    canvas.node.height = canvasDim;
    parent.appendChild(canvas.node);
    canvas.context.drawImage(img, 0, 0);
    return canvas;
}

function init(container, width, height, img) {
    var canvas = createCanvas(container, width, height, img);
    var ctx = canvas.context;

    ctx.fillCircle = function(x, y, radius, img) {
        this.lineWidth = 50;
        this.lineCap = this.lineJoin = 'round';
        this.strokeStyle = '#f00';
        this.beginPath();
        this.moveTo(x + 0.1, y);
        this.lineTo(x, y);
        this.stroke();
    };

    canvas.node.onmousemove = function(e) {
        if (!canvas.isDrawing)
            return;

        var x = e.pageX - section.offsetLeft;
        var y = e.pageY - section.offsetTop;

        var radius = 45;
        var fillColor = '#ff0000';
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillCircle(x, y, radius, img);
    };

    canvas.node.onmousedown = function(e) {
        startDraw();
    };

    canvas.node.onmouseup = function(e) {
        stopDraw();
    };

    canvas.node.addEventListener('touchmove', handleTouchMove, false);
    canvas.node.addEventListener('touchstart', startDraw, false);
    canvas.node.addEventListener('touchend', stopDraw, false);

    function handleTouchMove(e) {
        var touches = e.changedTouches;

        if (!canvas.isDrawing)
            return;

        for (var i=0; i<touches.length; ++i) {
            var x = touches[i].pageX - section.offsetLeft;
            var y = touches[i].pageY - section.offsetTop;

            var radius = 35;
            var fillColor = '#ff0000';
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillCircle(x, y, radius, img);        
        }
    }

    function startDraw(e) {
        canvas.isDrawing = true;
    }

    function stopDraw(e) {
        canvas.isDrawing = false;
    }
}

scratchBckg.onload = function() {
    var container = document.getElementById('scratcher');
    init(container, 595, 595, scratchBckg);
};

scratchBckg.src = 'images/green.png';

