# Workshop DevFest Recife 2026 — Tornando acessível um app Angular com leitor de tela

Workshop de 50 minutos conduzido **pelos slides**: a turma descobre os problemas de uma loja Angular com leitor de tela, prioriza no FigJam e acompanha, um problema por vez, o antes, o que o NVDA fala e a correção, até a loja ficar acessível. **Este repositório é a lição de casa**: a loja com os 13 problemas (`start/`) para você mexer no seu ritmo, na mesma ordem dos slides.

## O que tem aqui

| Pasta / arquivo | Para quê |
|---|---|
| `start/` | App Angular **com** os problemas. É onde os participantes trabalham. |
| `solution/` | Mesma app **corrigida**, para consulta e para o facilitador. |
| `docs/guia-nvda.md` | Guia básico de NVDA para quem nunca usou. |
| `docs/roteiro-facilitador.md` | Roteiro minuto a minuto, falas, dicas e plano B. |
| `docs/gabarito.md` | Os 13 problemas: onde estão, o que o NVDA diz, correção, critério WCAG. |
| `docs/figjam-board.md` | Estrutura do quadro *Accessibility Audit Board* e como duplicá-lo. |
| `docs/diff-start-solution.patch` | Diferença completa entre `start` e `solution`. |
| `slides/` | Onde os slides ficam e como importar no Canva. |

> **Lição de casa:** tente corrigir cada etapa antes de abrir `solution/`. É a comparação que ensina.

## Lição de casa: roteiro na ordem dos slides

Rode `start/`, abra o NVDA e vá marcando. Cada etapa tem o problema, como perceber e a correção (detalhes em `docs/gabarito.md`, com os números abaixo).

| Etapa | Problemas | O que fazer | Como testar |
|---|---|---|---|
| 1 | 1 | Dar nome aos botões de ícone (carrinho, adicionar, remover, fechar). | Tecla `B` no NVDA |
| 2 | 2, 7, 10 | `alt` que descreve, imagem nítida (SVG), texto do banner no `alt`. | Tecla `G`; zoom de 200% |
| 3 | 3 | `label` ligado ao campo, `aria-invalid` e `aria-describedby` nos erros. | Tecla `F` |
| 4 | 4 | Trocar o `div` do carrinho por `<dialog>` e `showModal()`. | Tab, Esc, para onde vai o foco |
| 5 | 5 | Região viva `role="status"` sempre presente. | Adicionar ao carrinho e ouvir |
| 6 | 6, 13 | Coração como `<button aria-pressed>`, `:focus-visible`, alvos de pelo menos 24 px. | Só teclado |
| 7 | 8, 9 | Texto em `rem` e contraste de pelo menos 4,5 para 1. | DevTools, Lighthouse, zoom |
| 8 | 11, 12 | `lang="pt-BR"`, `<title>`, `h2`/`h3`, zoom liberado. | Teclas `H` e `NVDA + F7` |

Regra de ouro para decidir o que expor: se tirar o elemento a pessoa perde informação ou ação, dê nome; se é só decoração, esconda (`alt=""` ou `aria-hidden="true"`). Depois compare com `solution/` e com `docs/diff-start-solution.patch`.

Desafio extra: rode o axe-core (extensão do Chrome) antes e depois e compare.

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

As duas versões compilam (`ng build`) e foram exercitadas no Chrome com o axe-core e com testes de teclado: em `start` o axe aponta `button-name`, `image-alt`, `label`, `color-contrast` e `meta-viewport`, e o foco/anúncio falham como esperado; em `solution` o axe não aponta violações WCAG A/AA e o foco, o Esc e os avisos funcionam. **Não foi possível testar com NVDA real**: faça o ensaio completo em uma máquina Windows antes do evento.

## Publicação (Vercel)

O `vercel.json` na raiz publica as duas versões a partir deste repositório: a loja com problemas (`start`) na raiz do site e a corrigida (`solution`) em `/solution/`. É a rede de segurança do workshop: quem não conseguir rodar o projeto localmente pode explorar a versão publicada. O build fica em `vercel-build.sh`.

- Loja com problemas: https://workshop-a11y-angular.vercel.app/
- Loja corrigida: https://workshop-a11y-angular.vercel.app/solution/
