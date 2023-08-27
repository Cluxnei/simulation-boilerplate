import { ISimulatedItem } from "../core/simulation.ts";

export interface ISimulationProps {
  items: ISimulatedItem[];
}

export class Simulation {
  items: ISimulatedItem[];

  constructor(props: ISimulationProps) {
    this.items = props.items;
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