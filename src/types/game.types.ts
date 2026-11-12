export type TrackBlock = "RETA" | "CURVA" | "CONFRONTO";

export type AttributeName = "velocidade" | "manobrabilidade" | "poder";

export interface ConfrontationItem {
  name: string;
  damage: number;
}

export interface Player {
  name: string;
  speed: number;
  handling: number;
  power: number;
  points: number;
}
