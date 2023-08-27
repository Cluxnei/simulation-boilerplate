import { Body, IBodyProps } from "../core/body.ts";
import { ISimulatedItem } from "../core/simulation.ts";
import { Vector2 } from "../core/vector2.ts";

interface IParticleProps extends IBodyProps {

}

export class Particle extends Body implements ISimulatedItem {
  constructor(props: IParticleProps) {
    super(props);
  }

  update(deltaTime?: number): void {
    this.updatePosition(deltaTime);
    this.handleCollisions();
  }

  handleCollisionWith<Particle>() {
    return [Particle];
  }

  onCollisionEnter<Particle>(particle) {
    this.applyInelasticCollision(particle);
  }


  applyInelasticCollision(particle: Particle) {
    this.velocity = new Vector2();
    particle.velocity = new Vector2();
    // TODO - compute the correct collision velocities
  }
}