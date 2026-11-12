# 🏎️ Simulador de Corridas — Mario Kart (Node.js + TypeScript)

Simulador de corridas via linha de comando (CLI) inspirado na franquia **Mario Kart**, desenvolvido originalmente como desafio prático da Formação Node.js da **Digital Innovation One (DIO)**, ministrada pelo instrutor **Lucas (Felipão)**, e refatorado do zero para **TypeScript** com novas mecânicas e arquitetura modular.

---

## 🎯 Sobre o Projeto e Evoluções

O desafio proposto na aula tinha como objetivo consolidar os fundamentos de lógica de programação, manipulação de objetos e controle de fluxo assíncrono em Node.js puro.

A partir da proposta base da aula, este projeto foi expandido com as seguintes implementações:

- **Migração completa para TypeScript:** Tipagem estática rigorosa (`strict: true`, `verbatimModuleSyntax` e `noUncheckedIndexedAccess`), garantindo contratos claros entre personagens, trechos de pista e itens.
- **Arquitetura Modularizada:** Separação de responsabilidades em camadas (`types`, `data` e `services`), substituindo o arquivo único por uma estrutura escalável.
- **Menu Interativo no Terminal:** Implementação de seleção manual dos dois corredores via CLI usando o módulo nativo `node:readline/promises`, com validação de entradas e bloqueio de personagens repetidos.
- **Execução Rodada por Rodada:** Pausa controlada a cada rodada para acompanhamento do placar parcial em tempo real antes de avançar na corrida.
- **Sistema de Itens e Turbo nos Confrontos:**
  - Sorteio dinâmico entre **Casco** (-1 ponto) e **Bomba** (-2 pontos) para penalizar o perdedor do confronto (respeitando o limite mínimo de 0 pontos).
  - Chance de **50% de Turbo** (+1 ponto bônus) para o vencedor do duelo.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** (ES Modules)
- **TypeScript**
- **TSX** (execução rápida em desenvolvimento)
- **Node Readline (`node:readline/promises`)** (interface interativa no terminal sem dependências externas)

---

## 📂 Estrutura de Pastas

```text
├── src/
│   ├── data/
│   │   └── characters.ts     # Catálogo oficial de corredores e seus atributos
│   ├── services/
│   │   ├── menu.ts           # Interface de seleção de jogadores via terminal
│   │   └── raceEngine.ts     # Motor principal da corrida, sorteios e regras de pontuação
│   ├── types/
│   │   └── game.types.ts     # Interfaces e Union Types do domínio do jogo
│   └── index.ts              # Ponto de entrada da aplicação
├── package.json
└── tsconfig.json
🚀 Como Executar
Instale as dependências:

Bash
npm install
Inicie o simulador:

Bash
npm start
Siga as instruções no terminal:

Digite o número correspondente ao Jogador 1 e ao Jogador 2.

Acompanhe cada rodada e pressione ENTER para avançar até o resultado final.


---

### Explicação das Principais Funcionalidades do Código

Para você ter domínio total sobre o que está acontecendo por baixo dos panos (especialmente útil caso precise explicar o projeto em entrevistas ou no portfólio), aqui está o funcionamento técnico de cada parte:

1. **Imutabilidade na Seleção (`selectPlayers` em `menu.ts`)**
   * Quando você escolhe um corredor da lista `CHARACTERS`, o código retorna `{ ...selected, points: 0 }`. Usar o operador *spread* (`...`) cria uma cópia independente do objeto na memória, evitando que os pontos de uma corrida sujem o catálogo original de personagens.
   * O `try / finally { rl.close(); }` garante que o fluxo de leitura do teclado (`stdin`) seja encerrado corretamente mesmo se ocorrer algum erro inesperado, evitando que o terminal fique travado.

2. **Prevenção de Pontuação Negativa (`Math.min`)**
   * Na regra da Bomba (`damage: 2`), se um jogador tiver apenas `1` ponto e perder um confronto, ele não pode ficar com `-1`. A expressão `const penalty = Math.min(loser.points, item.damage)` compara os pontos atuais com o dano do item e subtrai sempre o menor valor entre os dois, travando o piso em `0`.

3. **Consolidação de Regras de Pista (`raceEngine.ts`)**
   * Os trechos `"RETA"` e `"CURVA"` seguem exatamente a mesma lógica matemática (dado + atributo base; quem somar mais ganha `+1` ponto). Em vez de escrever duas estruturas condicionais repetidas, o código identifica o atributo correspondente via operador ternário e executa o cálculo uma única vez, aplicando o princípio **DRY** (*Don't Repeat Yourself*).

4. **Tipagem Estrita como Documentação (`game.types.ts`)**
   * O uso de *Union Types* (`type TrackBlock = "RETA" | "CURVA" | "CONFRONTO"`) impede em te
```
