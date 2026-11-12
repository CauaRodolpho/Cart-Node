import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import type {
  AttributeName,
  ConfrontationItem,
  Player,
  TrackBlock,
} from "../types/game.types.js";

const TOTAL_ROUNDS = 5;

function rollDice(): number {
  return Math.floor(Math.random() * 6) + 1;
}

function getRandomBlock(): TrackBlock {
  const value = Math.random();
  if (value < 0.33) return "RETA";
  if (value < 0.66) return "CURVA";
  return "CONFRONTO";
}

function getRandomItem(): ConfrontationItem {
  return Math.random() < 0.5
    ? { name: "Casco", damage: 1 }
    : { name: "Bomba", damage: 2 };
}

function logRoll(
  playerName: string,
  attribute: AttributeName,
  dice: number,
  baseValue: number,
): void {
  console.log(
    `  ${playerName} rolou ${attribute}: ${dice} + ${baseValue} = ${dice + baseValue}`,
  );
}

export async function startRace(
  player1: Player,
  player2: Player,
): Promise<void> {
  const rl = readline.createInterface({ input, output });

  try {
    for (let round = 1; round <= TOTAL_ROUNDS; round++) {
      const block = getRandomBlock();
      const dice1 = rollDice();
      const dice2 = rollDice();

      console.log(`--- Rodada ${round}/${TOTAL_ROUNDS} | Trecho: ${block} ---`);

      if (block === "RETA" || block === "CURVA") {
        const isStraight = block === "RETA";
        const attrLabel: AttributeName = isStraight
          ? "velocidade"
          : "manobrabilidade";
        const base1 = isStraight ? player1.speed : player1.handling;
        const base2 = isStraight ? player2.speed : player2.handling;

        const score1 = dice1 + base1;
        const score2 = dice2 + base2;

        logRoll(player1.name, attrLabel, dice1, base1);
        logRoll(player2.name, attrLabel, dice2, base2);

        if (score1 > score2) {
          player1.points++;
          console.log(`> ${player1.name} venceu o trecho (+1 pt)`);
        } else if (score2 > score1) {
          player2.points++;
          console.log(`> ${player2.name} venceu o trecho (+1 pt)`);
        } else {
          console.log("> Empate no trecho. Ninguem pontuou.");
        }
      } else {
        const power1 = dice1 + player1.power;
        const power2 = dice2 + player2.power;

        logRoll(player1.name, "poder", dice1, player1.power);
        logRoll(player2.name, "poder", dice2, player2.power);

        if (power1 !== power2) {
          const winner = power1 > power2 ? player1 : player2;
          const loser = power1 > power2 ? player2 : player1;
          const item = getRandomItem();
          const penalty = Math.min(loser.points, item.damage);

          loser.points -= penalty;
          console.log(
            `> ${winner.name} acertou um(a) ${item.name}! ${loser.name} perdeu ${penalty} pt(s).`,
          );

          if (Math.random() < 0.5) {
            winner.points++;
            console.log(`> ${winner.name} ativou turbo (+1 pt)`);
          }
        } else {
          console.log("> Confronto empatado.");
        }
      }

      console.log(
        `Placar: ${player1.name} ${player1.points} x ${player2.points} ${player2.name}\n`,
      );

      if (round < TOTAL_ROUNDS) {
        await rl.question("Pressione ENTER para a proxima rodada...");
        console.log("");
      }
    }
  } finally {
    rl.close();
  }
}

export function showResults(player1: Player, player2: Player): void {
  console.log("=== RESULTADO FINAL ===");
  console.log(`${player1.name}: ${player1.points} pt(s)`);
  console.log(`${player2.name}: ${player2.points} pt(s)\n`);

  if (player1.points > player2.points) {
    console.log(`Vencedor: ${player1.name}`);
  } else if (player2.points > player1.points) {
    console.log(`Vencedor: ${player2.name}`);
  } else {
    console.log("Resultado: Empate");
  }
}
