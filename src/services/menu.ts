import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import type { Player } from "../types/game.types.js";

export async function selectPlayers(
  roster: Player[],
): Promise<[Player, Player]> {
  const rl = readline.createInterface({ input, output });

  try {
    console.log("=== SELECAO DE CORREDORES ===\n");
    roster.forEach((char, index) => {
      console.log(
        `${index + 1}. ${char.name.padEnd(12)} | Vel: ${char.speed} | Man: ${char.handling} | Pod: ${char.power}`,
      );
    });
    console.log("");

    const promptPlayer = async (
      label: string,
      blockedIndex?: number,
    ): Promise<Player> => {
      while (true) {
        const answer = await rl.question(`${label} (1-${roster.length}): `);
        const index = Number.parseInt(answer.trim(), 10) - 1;
        const selected = roster[index];

        if (!selected) {
          console.log("Opcao invalida. Tente novamente.\n");
          continue;
        }

        if (index === blockedIndex) {
          console.log("Este corredor ja foi selecionado. Escolha outro.\n");
          continue;
        }

        return { ...selected, points: 0 };
      }
    };

    const player1 = await promptPlayer("Jogador 1");
    const player2 = await promptPlayer(
      "Jogador 2",
      roster.findIndex((c) => c.name === player1.name),
    );

    return [player1, player2];
  } finally {
    rl.close();
  }
}
