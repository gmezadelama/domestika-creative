const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = '#023047';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black';

    const cx = width * 0.5;
    const cy = height * 0.5;
    const w = width * 0.01;
    const h = height * 0.1;
    let x,y;

    const drawRings = ({
      radius,
      fillStyle,
      num = 40,
      lineWidthMin = 5,
      lineWidthMax = 20
    }) => {
      for (let i = 0; i < num; i++) {
        const slice = math.degToRad(360 / num);
        const angle = slice * i;
  
        x = cx + radius * Math.sin(angle);
        y = cy + radius * Math.cos(angle);
  
        context.save();
        context.translate(x, y);
        context.rotate(-angle);
        context.scale(random.range(0.1, 2), random.range(0.2, 0.5));
  
        context.beginPath();
        context.rect(-w * 0.5, random.range(0, -h * 0.5), w, h);
        context.fill();
        context.restore();
  
        context.save();
        context.translate(cx, cy);
        context.rotate(-angle);
  
        context.lineWidth = random.range(lineWidthMin, lineWidthMax);
  
        context.beginPath();
        context.arc(0, 0, radius * random.range(0.7, 1.3), slice * random.range(1, -8), slice * random.range(1, 5));
        context.fillStyle = fillStyle;
        context.fill();
        context.stroke();
        context.restore();
      }
    }

    
    context.save();
    context.translate(cx, cy);

    context.beginPath();
    context.arc(0, 0, 400, 0, 360);
    context.shadowColor = '#0ff';
    context.shadowBlur = 60;
    context.fillStyle = '#fff';
    context.fill();
    context.restore();

    context.save();
    context.translate(cx, cy);
    context.beginPath();
    context.arc(0, 0, 200, 0, 360);
    context.shadowColor = '#f0f';
    context.shadowBlur = 45;
    context.fillStyle = '#fff';
    context.fill();
    context.restore();

    context.save();
    context.translate(cx, cy);
    context.beginPath();
    context.arc(0, 0, 100, 0, 360);
    context.shadowColor = '#fff';
    context.shadowBlur = 30;
    context.fillStyle = '#fff';
    context.fill();
    context.restore();

    drawRings({
      radius: width * 0.3,
      fillStyle: 'red',
      num: 40
    });
    drawRings({
      radius: width * 0.2,
      fillStyle: '#ffb703',
      num: 40
    });
    drawRings({
      radius: width * 0.1,
      fillStyle: '#fb8500',
      num: 40
    });
    drawRings({
      radius: width * 0.035,
      fillStyle: '#7dcfb6',
      num: 40,
      lineWidthMin: 1,
      lineWidthMax: 5
    });
  };
};

canvasSketch(sketch, settings);
