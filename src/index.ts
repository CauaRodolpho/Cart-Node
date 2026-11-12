import { CHARACTERS } from "./data/characters.js";
import { selectPlayers } from "./services/menu.js";
import { showResults, startRace } from "./services/raceEngine.js";

async function main(): Promise<void> {
  const [player1, player2] = await selectPlayers(CHARACTERS);

  console.log(`\nLargada: ${player1.name} vs ${player2.name}\n`);

  await startRace(player1, player2);
  showResults(player1, player2);
}

main();
