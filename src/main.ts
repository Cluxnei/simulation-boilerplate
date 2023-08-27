import { initCanvas, updateCanvas } from "./core/canvas.ts";
import { delay } from "./core/time.ts";
import { FIXED_DELTA_TIME_IN_MS } from "./core/constants.ts";
import { Simulation } from "./custom/simulation.ts";
import { Particle } from "./custom/particle.ts";
import { Vector2 } from "./core/vector2.ts";

const canvas = initCanvas({
  canvasQuerySelector: '#canvas'
});
const ctx = canvas.getContext('2d');
if (!ctx) {
  throw new Error('cannot get canvas context');
}

const simulation = new Simulation({
  items: [
    new Particle({
      forces: new Vector2(0.1, 0.05),
      mass: 10
    })
  ]
})

function update() {
  simulation.update();
}

function render(ctx: CanvasRenderingContext2D) {
  simulation.render(ctx);
}

async function updateLoop() {
  update();
  await delay(FIXED_DELTA_TIME_IN_MS);
  updateLoop().then(() => null);
}

function renderLoop(ctx: CanvasRenderingContext2D) {
  updateCanvas(canvas, {
    backgroundColor: '#000000',
    useCtx: ctx
  });
  render(ctx);
  requestAnimationFrame(() => renderLoop(ctx));
}

updateLoop().then(() => {
  console.log('physics initialized!');
});

renderLoop(ctx);
console.log('render initialized!');