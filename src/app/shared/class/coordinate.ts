export class Coordinate {
  constructor(public type: string, public size: Array<object>) {
  }

  public static fromJson(json: object): Coordinate {
    return new Coordinate(
      json['type'],
      [json['1'], json['2'], json['3'], json['4'], json['5'], json['6'], json['7'], json['8'], json['9'], json['10']]
    );
  }
  public static getCoordinate(range: string, size: number) {
    // @ts-ignore
    if (Coordinate.type === range) {
      return Coordinate;
    }
  }
}
