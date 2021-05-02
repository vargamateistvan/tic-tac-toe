import { Position } from "./position";

export type Square = {
    value: 'X' | 'O' | '';
    position: Position;
}