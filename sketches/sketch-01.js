const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    context.lineWidth = width * 0.01;

    const w = width * 0.1;
    const h = height * 0.1;
    const gap = width * 0.03;
    const x0 = width * 0.17;
    const y0 = height * 0.17;

    const off = width * 0.02;

    let inverted = true;
    const drawSquares = () => {
      context.clearRect(0, 0, width, height);
      let gradient = context.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#240c76');
      gradient.addColorStop(1, '#df2676');
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);
      // synthwave sunset colors, palette taken from https://applecolors.com/palette/53535-synthwave-sunset-color
      const palette = [
        '#FFD319', // candlelight
        '#FF901F', // tree poppy
        '#FF2975', // radical red
        '#F222FF', // heliotrope
        '#8C1EFF', // electric violet
      ]
      context.lineWidth = width * 0.01;
      for(let i = 0; i < 5; i++) {
        for(let j = 0; j < 5; j++) {
            let x = x0 + (w + gap) * i;
            let y = y0 + (h + gap) * j;
            context.strokeStyle = palette[Math.floor(Math.random() * 4)];
            context.beginPath();
            context.rect(x, y, w, h);
            context.stroke();
            context.strokeStyle = palette[Math.floor(Math.random() * 4)];
            if (Math.random() > 0.5) {
                context.beginPath();
                context.rect(x + off / 2 , y + off / 2, w - off, h - off);
                context.stroke();
            }
        }
      }
    }
   setInterval(drawSquares, 1000);
  };
};

canvasSketch(sketch, settings);
