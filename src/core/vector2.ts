export class Vector2 {
  x: number;
  y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  copy(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  add(vector: Vector2): Vector2 {
    this.x += vector.x;
    this.y += vector.y;
    return this;
  }

  sub(vector: Vector2): Vector2 {
    this.x -= vector.x;
    this.y -= vector.y;
    return this;
  }

  scale(scaleX: number = 1, scaleY?: number): Vector2 {
    this.x *= scaleX;
    this.y *= typeof scaleY === 'undefined' ? scaleX : scaleY;
    return this;
  }

  magnitude(): number {
    return Math.hypot(this.x, this.y);
  }

  normalize(): Vector2 {
    const magnitude = this.magnitude();
    this.x /= magnitude;
    this.y /= magnitude;
    return this;
  }

  rotate(angle: number): Vector2 {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const x = this.x;
    const y = this.y;
    this.x = x * cos - y * sin;
    this.y = x * sin + y * cos;
    return this;
  }

  rotateAround(angle: number, center: Vector2): Vector2 {
    this.sub(center);
    this.rotate(angle);
    this.add(center);
    return this;
  }
}
