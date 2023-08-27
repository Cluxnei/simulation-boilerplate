import { Vector2 } from './vector2';

type initCanvasOptions = {
  canvasQuerySelector: string;
};

interface CustomCanvas extends HTMLCanvasElement {
  zoom: number;
  positionX: number;
  positionY: number;
  mousePositionInCanvas: Vector2;
  dragging?: boolean;
}

export function initCanvas(options: initCanvasOptions) {
  const canvas = document.querySelector<CustomCanvas>(
    options.canvasQuerySelector,
  );
  if (!canvas) {
    throw new Error('canvas not found');
  }
  canvas.zoom = 1;
  canvas.positionX = 0;
  canvas.positionY = 0;

  canvas.mousePositionInCanvas = new Vector2(0, 0);

  const handleMouseMove = (event: MouseEvent) => {
    canvas.mousePositionInCanvas.x =
      -((canvas.positionX || 0) - event.offsetX + canvas.clientWidth / 2) /
      canvas.zoom;
    canvas.mousePositionInCanvas.y =
      -((canvas.positionY || 0) - event.offsetY + canvas.clientHeight / 2) /
      canvas.zoom;
  };

  canvas.addEventListener('mousemove', (event: MouseEvent) => {
    handleMouseMove(event);
    if (!canvas.dragging) {
      return;
    }
    canvas.positionX = (canvas.positionX || 0) + event.movementX;
    canvas.positionY = (canvas.positionY || 0) + event.movementY;
  });

  canvas.addEventListener('mousedown', () => {
    canvas.dragging = true;
  });

  canvas.addEventListener('mouseup', () => {
    canvas.dragging = false;
  });

  canvas.addEventListener('wheel', (event: WheelEvent) => {
    canvas.zoom -= (event.deltaY / 1000) * canvas.zoom;
  });

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resizeCanvas();

  window.addEventListener('resize', resizeCanvas, false);

  return canvas;
}

type updateCanvasOptions = {
  backgroundColor: string;
};

export function updateCanvas(
  canvas: CustomCanvas,
  options: updateCanvasOptions,
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return;
  }
  const zoom = canvas.zoom;
  const x = canvas.positionX || 0;
  const y = canvas.positionY || 0;
  ctx.resetTransform();
  ctx.fillStyle = options.backgroundColor;
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  ctx.translate(canvas.clientWidth / 2 + x, canvas.clientHeight / 2 + y);
  ctx.scale(zoom, zoom);
}
