export interface ISimulatedItem {
  render(ctx: CanvasRenderingContext2D): void
  update(deltaTime?: number): void
}