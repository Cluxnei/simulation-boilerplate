import { Vector2 } from "./vector2.ts";
import { SimulationRef } from "./simulation.ts";

export interface IBodyRenderProps {
  color?: string;
  shape: "square" | "circle";
  squareProps?: {
    width: number
    height: number
  };
  circleProps?: {
    radius: number
  };
}

export interface IBodyProps {
  position?: Vector2;
  velocity?: Vector2;
  acceleration?: Vector2;
  forces?: Vector2;
  mass?: number;
  renderProps?: IBodyRenderProps;
}

export class Body {
  position: Vector2;
  velocity: Vector2;
  acceleration: Vector2;
  forces: Vector2;
  mass: number;
  renderProps: IBodyRenderProps;
  simulationRef: SimulationRef | null;


  constructor(props: IBodyProps) {
    this.simulationRef = null;
    this.position = props.position ?? new Vector2();
    this.velocity = props.velocity ?? new Vector2();
    this.acceleration = props.acceleration ?? new Vector2();
    this.forces = props.forces ?? new Vector2();
    this.mass = props.mass ?? 1;
    this.renderProps = props.renderProps ?? {
      color: "#f00",
      shape: "circle",
      circleProps: {
        radius: 100
      }
    };
  }

  setSimulationRef(simulationRef: SimulationRef) {
    this.simulationRef = simulationRef;
  }

  updateAcceleration() {
    this.acceleration = this.forces.copy().scale(1 / this.mass);
  }

  updateVelocity(deltaTime?: number) {
    this.velocity.add(this.acceleration.copy().scale(deltaTime ?? 1));
  }

  updatePosition(deltaTime?: number) {
    this.updateAcceleration();
    this.updateVelocity(deltaTime);
    this.position.add(this.velocity.copy().scale(deltaTime ?? 1));
  }

  handleCollisionWith<T>(): T[] {
    return [];
  }

  onCollisionEnter<T>(_item: T) {

  }

  handleCollisions() {
    const allowedCollisionWith: any[] = this.handleCollisionWith();
    for (const _item of this.simulationRef?.items ?? []) {
      const item = _item as unknown as Body;
      if (allowedCollisionWith.find((type) => item instanceof type) && this.isCollidingWith(item)) {
        this.onCollisionEnter(item);
      }
    }
  }

  isCollidingWith(item: Body): boolean {
    if (item as Body === this) {
      return false;
    }
    if (this.renderProps.shape === "circle" && item.renderProps.shape === "circle") {
      return this.isCollidingWithCircle(item);
    }
    // TODO - handle square collisions & mixed collisions
    return false;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.renderProps?.color ?? "#fff";
    if (this.renderProps.shape === "circle" && this.renderProps.circleProps) {
      this.renderArc({
        position: this.position,
        radius: this.renderProps.circleProps.radius
      }, ctx);
      return;
    }
    if (this.renderProps.shape === "square" && this.renderProps.squareProps) {
      this.renderSquare({
        position: this.position,
        width: this.renderProps.squareProps.width,
        height: this.renderProps.squareProps.height
      }, ctx);
      return;
    }
  }

  renderArc(props: { position: Body["position"], radius: number }, ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(props.position.x, props.position.y, props.radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  private renderSquare(props: { width: number; position: Body["position"]; height: number }, ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.rect(props.position.x, props.position.y, props.width, props.height);
    ctx.fill();
  }

  private isCollidingWithCircle(item: Body) {
    if (!this.renderProps.circleProps || !item.renderProps.circleProps) {
      return false;
    }
    const { radius: r1 } = this.renderProps.circleProps;
    const { radius: r2 } = item.renderProps.circleProps;
    const d = this.position.copy().sub(item.position).magnitude();
    return d < r1 + r2;
  }
}