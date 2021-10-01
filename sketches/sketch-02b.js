const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "#023047";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "black";

    const cx = width * 0.5;
    const cy = height * 0.5;
    const w = width * 0.01;
    const h = height * 0.1;
    let x, y;

    const drawRings = (delta, drawingData) => {
      for (let i = 0; i < drawingData.length; i++) {
        const slice = math.degToRad(360 / drawingData.length);
        const angle = slice * i;

        x = cx + drawingData[i].radius * Math.sin(angle);
        y = cy + drawingData[i].radius * Math.cos(angle);

        context.save();
        context.translate(x, y);
        context.rotate(-angle + delta);
        context.scale(drawingData[i].scaleX, drawingData[i].scaleY);

        context.beginPath();
        context.rect(-w * 0.5, random.range(0, -h * 0.5), w, h);
        context.fill();
        context.restore();

        context.save();
        context.translate(cx, cy);
        context.rotate(-angle + delta);

        context.lineWidth = drawingData[i].lineWidth;

        context.beginPath();
        context.arc(
          0,
          0,
          drawingData[i].radius2,
          drawingData[i].startAngle + delta + 0.1,
          drawingData[i].endAngle + delta + 0.1
        );
        context.fillStyle = drawingData[i].fillStyle;
        context.fill();
        context.stroke();
        context.restore();
      }
    };

    const getDrawingData = ({
      radius,
      fillStyle,
      num = 40,
      lineWidthMin = 5,
      lineWidthMax = 20,
      orientation = -1,
    }) => {
      const drawingData = [];
      for (let i = 0; i < num; i++) {
        const slice = math.degToRad(360 / num);

        const scaleX = random.range(0.1, 2);
        const scaleY = random.range(0.2, 0.5);

        const lineWidth = random.range(lineWidthMin, lineWidthMax);
        const startAngle = slice * random.range(1, -8);
        const endAngle = slice * random.range(1, 5);

        drawingData.push({
          radius: radius,
          radius2: radius * random.range(0.7, 1.3),
          fillStyle: fillStyle,
          scaleX,
          scaleY,
          lineWidth,
          startAngle,
          endAngle,
        });
      }
      return drawingData;
      // requestAnimationFrame(step(orientation, drawingData));
      // setInterval(step(orientation + 0.1, drawingData), 500);
    };

    const minR1 = 400;
    const maxR1 = 450;
    const minShadowBlur1 = 10;
    const maxShadowBlur1 = 60;
    let sB1 = minShadowBlur1;
    let r1 = minR1;
    let dR1 = 1;
    let dSB1 = 1;
    const drawGlow = () => {
      r1 += dR1;
      if (r1 === maxR1 || r1 === minR1) {
        dR1 *= -1;
      }
      sB1 += dSB1;
      if (sB1 === maxShadowBlur1 || sB1 === minShadowBlur1) {
        dSB1 *= -1;
      }
      context.save();
      context.translate(cx, cy);

      context.beginPath();
      context.arc(0, 0, r1, 0, 360);
      context.shadowColor = "#0ff";
      context.shadowBlur = sB1;
      context.fillStyle = "#fff";
      context.fill();
      context.restore();

      context.save();
      context.translate(cx, cy);
      context.beginPath();
      context.arc(0, 0, 200, 0, 360);
      context.shadowColor = "#f0f";
      context.shadowBlur = 45;
      context.fillStyle = "#fff";
      context.fill();
      context.restore();

      context.save();
      context.translate(cx, cy);
      context.beginPath();
      context.arc(0, 0, 100, 0, 360);
      context.shadowColor = "#fff";
      context.shadowBlur = 80;
      context.fillStyle = "#fff";
      context.fill();
      context.restore();
    };

    const redData = getDrawingData({
      radius: width * 0.3,
      fillStyle: "red",
      num: 40,
      orientation: -1,
    });
    const yellowData = getDrawingData({
      radius: width * 0.2,
      fillStyle: "#ffb703",
      num: 40,
      orientation: 1,
    });
    const orangeData = getDrawingData({
      radius: width * 0.1,
      fillStyle: "#fb8500",
      num: 40,
      orientation: -1,
    });
    const blueData = getDrawingData({
      radius: width * 0.035,
      fillStyle: "#7dcfb6",
      num: 40,
      lineWidthMin: 1,
      lineWidthMax: 5,
      orientation: 1,
    });

    const clear = () => {
      context.fillStyle = "#023047";
      context.fillRect(0, 0, width, height);

      context.fillStyle = "black";
    };

    const delta = 0.05;
    const draw = (delta) => {
      clear();
      drawGlow();
      drawRings(-delta, redData);
      drawRings(delta, yellowData);
      drawRings(-delta, orangeData);
      drawRings(delta, blueData);
    };

    let previousTimeStamp;
    const step = (time) => (timestamp) => {
      if (!previousTimeStamp) previousTimeStamp = timestamp;
      const elapsed = timestamp - previousTimeStamp;

      if (elapsed > 150) {
        clear();
        draw(delta * time);
        previousTimeStamp = timestamp;
        window.requestAnimationFrame(step(time + 1));
      } else {
        window.requestAnimationFrame(step(time));
      }
    };
    window.requestAnimationFrame(step(1));
  };
};

canvasSketch(sketch, settings);
