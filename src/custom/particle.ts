import { Body, IBodyProps } from "../core/body.ts";
import { ISimulatedItem } from "../core/simulation.ts";

interface IParticleProps extends IBodyProps {

}

export class Particle extends Body implements ISimulatedItem {
  constructor(props: IParticleProps) {
    super(props);
  }

  update(deltaTime?: number): void {
    this.updatePosition(deltaTime);
  }


}