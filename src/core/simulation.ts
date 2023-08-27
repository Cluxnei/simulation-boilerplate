import { ISimulationProps } from "../custom/simulation.ts";

export interface ISimulatedItem {
  render(ctx: CanvasRenderingContext2D): void
  update(deltaTime?: number): void
  setSimulationRef(simulationRef: SimulationRef): void
}

export class SimulationRef {
  items: ISimulatedItem[];
  constructor(props: ISimulationProps) {
    this.items = props.items;
    for (const item of this.items) {
      item.setSimulationRef(this);
    }
  }
}