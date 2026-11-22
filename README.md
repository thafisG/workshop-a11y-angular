# Workshop DevFest Recife 2026 — Tornando acessível um app Angular com leitor de tela

Workshop prático de 50 minutos. Os participantes exploram uma loja virtual Angular com **problemas de acessibilidade intencionais**, registram o que encontram no FigJam, priorizam por impacto e corrigem parte deles no código.

## O que tem aqui

| Pasta / arquivo | Para quê |
|---|---|
| `start/` | App Angular **com** os problemas. É onde os participantes trabalham. |
| `solution/` | Mesma app **corrigida**, para consulta e para o facilitador. |
| `docs/guia-nvda.md` | Guia básico de NVDA para quem nunca usou. |
| `docs/roteiro-facilitador.md` | Roteiro minuto a minuto, falas, dicas e plano B. |
| `docs/gabarito.md` | Os 6 problemas: onde estão, o que o NVDA diz, correção, critério WCAG. |
| `docs/figjam-board.md` | Estrutura do quadro *Accessibility Audit Board* e como duplicá-lo. |
| `docs/diff-start-solution.patch` | Diferença completa entre `start` e `solution`. |
| `slides/` | Slides de abertura e encerramento. |

> **Participantes:** não abram `solution/` antes da hora, ou a investigação perde a graça.

## Quadro FigJam

Quadro pronto: <https://www.figma.com/board/wI6THeYn53CYv97TdUYd8C>. Duplique o arquivo (File → Duplicate) para a sua cópia de reserva e libere edição por link para os participantes.

## Pré-requisitos (fazer antes do evento)

- Windows, Google Chrome, [Node.js](https://nodejs.org/) 22 LTS (testado com 22.x) e npm, [VS Code](https://code.visualstudio.com/).
- [NVDA](https://www.nvaccess.org/download/) instalado e testado (veja `docs/guia-nvda.md`).
- Projeto baixado e dependências instaladas:

```bash
git clone https://github.com/thafisG/workshop-a11y-angular
cd workshop-a11y-angular/start
npm install
```

## Rodando o app

```bash
cd start
npm start
```

Abra <http://localhost:4200> no Chrome. Para ver a versão corrigida, rode o mesmo comando dentro de `solution/` (use outra porta se as duas estiverem abertas: `npm start -- --port 4300`).

## Stack

Angular (standalone components, signals, control flow `@if`/`@for`), TypeScript, CSS simples. Sem bibliotecas de UI, de propósito: tudo que importa para acessibilidade está visível no código.

## Estrutura do código

Cada versão tem só três arquivos que importam: `src/app/app.ts`, `src/app/app.html`, `src/app/app.css`. Imagens em `public/img/`.

## Verificação feita na preparação

As duas versões compilam (`ng build`) e foram exercitadas no Chrome com o axe-core e com testes de teclado: em `start` o axe aponta `button-name`, `image-alt` e `label`, e o foco/anúncio falham como esperado; em `solution` o axe não aponta violações WCAG A/AA e o foco, o Esc e os avisos funcionam. **Não foi possível testar com NVDA real**: faça o ensaio completo em uma máquina Windows antes do evento.

## Publicação (Vercel)

O `vercel.json` na raiz publica as duas versões a partir deste repositório: a loja com problemas (`start`) na raiz do site e a corrigida (`solution`) em `/solution/`. É a rede de segurança do workshop: quem não conseguir rodar o projeto localmente pode explorar a versão publicada. O build fica em `vercel-build.sh`.
