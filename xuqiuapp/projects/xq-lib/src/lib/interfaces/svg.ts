export interface Svg {
    [prop: string]: {
        circle: number,
        coordinates: {x: number, y: number}[],
        lastPoint: {x: number, y: number}
    }
}
