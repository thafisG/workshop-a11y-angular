# Gabarito — problemas intencionais

> Para o facilitador **e para quem faz a lição de casa depois do workshop** (abrir o gabarito antes de tentar tira a graça). Os slides seguem a ordem das 8 etapas descritas no README.
> Os trechos de código estão em `start/src/app/` (`app.html`, `app.ts`, `app.css`); a correção completa está em `solution/` e em `diff-start-solution.patch`.
> A coluna "Impacto sugerido" é um ponto de partida para a discussão: a graça do exercício é o grupo defender a própria classificação com base no contexto, não acertar a minha.

## Visão geral

| # | Problema | Onde | Impacto sugerido | Critério WCAG |
|---|---|---|---|---|
| 1 | Botões só com ícone, sem nome acessível | Carrinho no cabeçalho, "adicionar" nos cards, remover item, fechar modal | **Crítico** (impede saber como comprar) | 4.1.2 Nome, função, valor (A) |
| 2 | Imagens sem texto alternativo adequado | Cards de produto | **Médio** (o nome do produto está em texto ao lado) | 1.1.1 Conteúdo não textual (A) |
| 3 | Campos sem rótulo associado | Formulário de entrega | **Alto** a **Crítico** (impede concluir a compra) | 1.3.1, 3.3.2, 4.1.2 (A); 3.3.1 para os erros |
| 4 | Foco mal gerenciado no modal | Carrinho / checkout | **Crítico** | 2.4.3 Ordem do foco (A), 4.1.2 (A) |
| 5 | Mensagens não anunciadas | Toast, erros, confirmação | **Alto** | 4.1.3 Mensagens de status (AA) |
| 6 (bônus) | Favoritar não funciona pelo teclado e o foco é invisível | Coração no card; `outline: none` | **Médio** (recurso não essencial, mas sem alternativa) | 2.1.1 Teclado (A), 2.4.7 Foco visível (AA) |

Escopo do workshop: **1 a 5**. O 6 é bônus para quem terminar cedo.

### Problemas "fáceis de notar" (7 a 12)

Estes aparecem para **qualquer pessoa**, mesmo sem leitor de tela: servem de aquecimento e para a turma perceber que acessibilidade não é só ARIA. Peça para olharem a loja com atenção antes de ligar o NVDA.

| # | Problema | Onde | Impacto sugerido | Critério WCAG |
|---|---|---|---|---|
| 7 | Imagem borrada (baixa resolução esticada) | Foto da mochila (`img/mochila-baixa.png`, 48×36 px exibida em ~400 px) | **Baixo** a **Médio** | Boa prática (qualidade e clareza da imagem) |
| 8 | Texto minúsculo | Descrição (11 px), preço (12 px) e rodapé (10 px) | **Alto** | 1.4.4 Redimensionar texto (AA); legibilidade |
| 9 | Contraste baixo | Subtítulo, descrições e rodapé em cinza muito claro | **Alto** | 1.4.3 Contraste mínimo (AA) |
| 10 | Informação só na imagem | Banner "FRETE GRÁTIS acima de R$ 200" com `alt=""` | **Médio** | 1.1.1 Conteúdo não textual (A), 1.4.5 Imagens de texto (AA) |
| 11 | Sem títulos para navegar | Nomes dos produtos e "Produtos" são `<div>`, não títulos | **Médio** | 1.3.1 Informação e relações (A), 2.4.6 |
| 12 | Idioma, título da página e zoom | `<html lang="en">`, `<title>Angular App</title>`, `user-scalable=no` | **Médio** a **Alto** | 3.1.1 Idioma da página (A), 2.4.2 Título da página (A), 1.4.4 (AA) |
| 13 | Alvos de toque pequenos | Coração (28 px) e lixeira do carrinho (22 px) | **Baixo** a **Médio** | 2.5.8 Tamanho do alvo (AA) |

Como encontrar cada um:
- **7, 8, 9, 10:** a olho. Dê zoom de 200% (Ctrl e +) e compare com a versão corrigida.
- **8 e 9:** DevTools → Elements, clique no texto e veja o *Contrast* no painel Styles; ou a aba Lighthouse.
- **10:** o NVDA lê "gráfico" ou nada; quem não enxerga perde a promoção (e o prazo "só até domingo").
- **11:** no NVDA, tecla `H` e `NVDA + F7` (lista de títulos): só aparece "Achados do Recife".
- **12:** o NVDA com troca automática de idioma lê o português com sotaque de inglês; a aba do navegador mostra o título genérico; no celular não dá para dar zoom.
- **13:** teste no celular ou com o DevTools em modo toque.

Correções (já feitas em `solution/`): trocar a imagem pelo SVG nítido; `font-size` ≥ 16 px (usar `rem`); cores com contraste ≥ 4,5:1; `alt` com o texto do banner; `<h2>`/`<h3>` nos títulos; `lang="pt-BR"`, título descritivo e viewport sem bloqueio de zoom; alvos de pelo menos 44 px (mínimo de 24 px).

---

## 1. Botão sem nome acessível

**O que acontece.** O NVDA anuncia só "botão" (às vezes o número do contador no caso do carrinho). Quatro botões de "adicionar" iguais.

**Causa.** `<button>` com apenas um `<svg>` dentro.

**Correção.** Dar nome ao botão e esconder o ícone decorativo.

```html
<button type="button" class="btn-icon add"
        [attr.aria-label]="'Adicionar ' + p.name + ' ao carrinho'" (click)="addToCart(p)">
  <svg aria-hidden="true" focusable="false" ...></svg>
</button>
```

Aplicar em: carrinho do cabeçalho (`Abrir carrinho, N itens`), adicionar, remover item, fechar modal.

**Dica de ensino.** O nome precisa dizer *qual* produto. "Adicionar" quatro vezes seguidas não ajuda quem navega com `B`.
**Alternativa válida:** texto visualmente oculto (`.sr-only`) dentro do botão. `aria-label` é o caminho mais curto no workshop.

## 2. Imagem sem texto alternativo adequado

**O que acontece.** Quatro casos diferentes de propósito:

| Produto | `alt` em `start` | Problema |
|---|---|---|
| Caneca | ausente | O leitor pode anunciar só "imagem" ou o nome do arquivo (varia com a configuração) |
| Fone | `IMG_0231.png` | Nome de arquivo não descreve nada |
| Mochila | `imagem` | Redundante e vazio de informação |
| Garrafa | descrição correta | Referência de como deveria ser |

**Correção.** Descrever o que a imagem mostra e que o texto ao redor ainda não diz. Ver `alt` dos produtos em `app.ts` na solução.

**Discussão boa.** Na lista do carrinho, a miniatura repete o nome ao lado: ali o certo é `alt=""` (decorativa). Mesmo conteúdo, contextos diferentes, decisões diferentes. Também vale perguntar: o preço é informação? (Está em texto, então sim, acessível.)

## 3. Campo sem rótulo associado

**O que acontece** (Chrome + NVDA):

| Campo | Em `start` | O que o NVDA lê |
|---|---|---|
| Nome | `<span>` visual + placeholder "Ex.: Maria Silva" | O exemplo, não a pergunta |
| E-mail | `<span>` visual, sem placeholder | Só "caixa de edição" |
| CEP | só placeholder | "CEP" (placeholder usado como nome de reserva; some ao digitar) |

**Correção.** `<label for>` + `id`, e de brinde `autocomplete`, `type="email"`, `inputmode`, `required`.

```html
<label for="campo-email" class="field-label">E-mail</label>
<input id="campo-email" type="email" autocomplete="email" required ...>
```

**Erros do formulário (parte do mesmo problema).** Em `start` a mensagem fica solta ao lado do campo. Na solução: `aria-invalid="true"` + `aria-describedby="erro-email"` e o foco vai para o primeiro campo inválido; assim o leitor fala rótulo, "inválido" e a mensagem de uma vez.

**Armadilha comum.** Placeholder não é rótulo: some ao digitar, costuma ter contraste baixo e nem todo leitor o usa como nome.

## 4. Foco mal gerenciado no modal

**O que acontece em `start`:**

- Ao abrir, o foco continua no botão do carrinho, **atrás** do modal.
- `Tab` percorre toda a página de fundo antes de chegar ao modal (que está no fim do DOM); depois sai dele.
- `Esc` não fecha.
- O NVDA não anuncia "diálogo" nem o título.
- Ao fechar (ou ao remover o último item / finalizar), o foco cai no `body` e a pessoa perde o lugar.

**Correção (caminho curto — elemento nativo).** Trocar o `div` por `<dialog>` e abrir com `showModal()`. O navegador cuida de: foco para dentro, foco preso, fundo inerte, `Esc`, devolução do foco ao botão que abriu.

```html
<dialog #dialog aria-labelledby="modal-title" (close)="onDialogClosed()">...</dialog>
```
```ts
this.dialog().nativeElement.showModal();   // abrir
this.dialog().nativeElement.close();       // fechar
```

Além do nativo, dois pontos manuais que o navegador não resolve:
- Quando o elemento focado **deixa de existir** (remover item, finalizar compra), devolver o foco a algo previsível (título do carrinho / título da confirmação, com `tabindex="-1"`).
- Dar `aria-label` ao botão de fechar.

**Se a turma quiser a versão manual** (sem `<dialog>`): `role="dialog"` + `aria-modal="true"` + `aria-labelledby`, guardar `document.activeElement` ao abrir, focar o título/primeiro controle, interceptar `Tab`/`Shift+Tab` para ciclar, fechar com `Esc`, devolver o foco ao fechar e aplicar `inert` no conteúdo de fundo. Dá para mostrar como "o que o `<dialog>` faz por você".

## 5. Mensagem não anunciada

**O que acontece.** O toast "… adicionado ao carrinho" aparece e some; o leitor não diz nada. Erros do formulário e a confirmação do pedido idem.

**Causa.** O elemento é criado com `@if` já com o texto. Leitores de tela anunciam **mudanças dentro de uma região viva que já existe**, não elementos que surgem prontos.

**Correção.** Região persistente; só o conteúdo muda.

```html
<div class="toast-region" role="status" aria-live="polite" aria-atomic="true">
  @if (toast()) { <div class="toast">{{ toast() }}</div> }
</div>
```

Pontos de atenção (bons para a discussão final):
- Um `<dialog>` modal torna o resto da página inerte, então avisos disparados **dentro** do modal precisam de uma região viva **dentro** dele. Por isso a solução tem uma segunda (`.form-message`, `role="status"`).
- A confirmação do pedido recebe o foco (título com `tabindex="-1"`): mudar o foco já faz o leitor falar, sem precisar de região viva.
- Ao focar o primeiro campo inválido *e* atualizar uma região viva, alguns leitores falam as duas coisas. Se ficar verboso na sua máquina de teste, remova um dos dois.
- `role="alert"` interrompe a fala; reserve para erros urgentes. `status` (polite) é o padrão para confirmações.

## 6. (Bônus) Navegação por teclado

**O que acontece.** O coração de favoritar é um `<div (click)>`: não recebe foco com `Tab`. Além disso, `outline: none` nos botões e campos remove o indicador de foco.

**Nuance importante para a conversa.** Quem navega **só por teclado** (sem leitor) não consegue favoritar. Com NVDA, o modo de navegação costuma anunciar "clicável" e permite ativar com `Enter`: o mesmo defeito pesa diferente conforme a tecnologia. Teste das duas formas.

**Correção.**

```html
<button type="button" class="fav" [attr.aria-pressed]="isFavorite(p.id)"
        [attr.aria-label]="'Favoritar ' + p.name" (click)="toggleFavorite(p.id)">
  <svg aria-hidden="true" focusable="false" ...></svg>
</button>
```
```css
:focus-visible { outline: 3px solid #0b57d0; outline-offset: 2px; }
```

---

## O que já está certo em `start` (de propósito)

Landmarks (`header`/`main`/`footer`), `<h1>`, listas semânticas, contraste do texto dos botões e do título principal, e a lógica do carrinho. Os problemas 1 a 13 aparecem sobre uma base que funciona, o que mantém a investigação clara.
