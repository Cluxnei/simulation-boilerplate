import { ISimulatedItem, SimulationRef } from "../core/simulation.ts";

export interface ISimulationProps {
  items: ISimulatedItem[];
}

export class Simulation extends SimulationRef {
  constructor(props: ISimulationProps) {
    super(props);
  }

  update(deltaTime?: number) {
    for (const item of this.items) {
      item.update(deltaTime);
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    for (const item of this.items) {
      item.render(ctx);
    }
  }
}