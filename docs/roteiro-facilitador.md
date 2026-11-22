# Roteiro do facilitador — 50 minutos

**Mensagem central:** acessibilidade começa quando consideramos diferentes formas de interagir com aquilo que construímos.

## Antes do evento (checklist)

- [ ] Ensaio completo, cronometrado, em uma máquina Windows com NVDA (a verificação automática não substitui ouvir o NVDA).
- [ ] `start/` e `solution/` rodando na máquina do facilitador, com `npm install` feito e Wi-Fi desligado como teste.
- [ ] Quadro FigJam montado (veja `figjam-board.md`) com link de edição aberto e uma cópia de reserva.
- [ ] Repositório no GitHub com `start/`, `solution/`, `docs/` e os slides. Envie o link e os pré-requisitos com antecedência.
- [ ] Visualizador de fala do NVDA configurado para projetar.
- [ ] Impressos ou link do `guia-nvda.md`.
- [ ] Voz pt-BR do NVDA testada **na máquina que vai projetar** (volume, velocidade confortável para a sala).
- [ ] Decidir duplas: um participante opera, outro registra.

## Aviso honesto sobre o tempo

Seis fases em 50 minutos é apertado, principalmente **32–45 min** (corrigir código). Para caber:

- Trabalhem **em duplas** (uma máquina com NVDA, a outra com o editor).
- Corrijam **3 problemas** com a turma (1, 2 e 3) e mostre **4 e 5** ao vivo ou pela `solution/`. O plano já prevê isso: "sem exigir que todos sejam corrigidos".
- Se a turma for lenta na exploração, corte o registro para 8 min e não tente cobrir os 6 problemas.

## Cronograma

### 0–5 min · Abertura

- Mostre `start` no navegador, usando o mouse. "Funciona e vende." Pergunte à sala se já dá para notar algo estranho: a foto borrada, o texto pequeno e claro demais (problemas 7 a 9 do `gabarito.md`). (1 min)
- Mostre a mesma tela **com o NVDA e sem olhar**: tab no cabeçalho, `B` pelos botões. Deixe o silêncio e os "botão, botão, botão" falarem. (2 min)
- Explique a dinâmica: explorar → registrar → priorizar → corrigir. Mostre o link do FigJam. (2 min)

**Fala sugerida:** "O código passa no build e a loja vende. Alguns problemas dá para ver a olho; outros só aparecem quando mudamos a forma de usar."

### 5–15 min · Exploração (duplas)

- Distribua `docs/guia-nvda.md` e peça o **roteiro de exploração**.
- Passe pelas mesas. Perguntas melhores que respostas:
  - "O que você esperava ouvir aqui?"
  - "Se eu fosse novo nessa loja, eu conseguiria comprar?"
  - "Tente sem o NVDA, só com `Tab`. É o mesmo problema?"
- Quem travar no NVDA: sente com a dupla ou dê o Visualizador de fala.

### 15–25 min · Registro no FigJam

- Cada descoberta vira um cartão em **Problemas encontrados**: *o que aconteceu / qual dificuldade*.
- Peça cartões **curtos e concretos** ("o botão do carrinho só diz 'botão'"), não nomes técnicos ("falta aria-label").
- Aos 22 min, leia 3 cartões em voz alta para empurrar quem ainda está só olhando.

### 25–32 min · Priorização e soluções

- Arraste os cartões para **Crítico / Alto / Médio / Baixo**. Regra: classifique pelo **impacto no contexto**, não pela existência de uma violação.
- Escolha um cartão em que as duplas discordaram e faça a turma defender (bom candidato: **imagem sem alt** ou **favoritar**). Use a tabela de impacto do `gabarito.md` só depois.
- Cada dupla propõe correção em **Soluções propostas**: *melhoria / como implementar / resultado esperado*.

### 32–45 min · Implementação (13 min)

Ordem recomendada:

1. **(4 min) Botão sem nome** — todos juntos, você codifica na projeção: `aria-label` + `aria-hidden` no svg.
2. **(3 min) Imagem** — as duplas escrevem os `alt` em `app.ts`.
3. **(4 min) Campos** — `label for` + `id`; teste imediato com `F` no NVDA.
4. **(2 min) Modal e mensagem** — abra `solution/` e mostre o `<dialog>` e a região viva. Diga: "Com mais tempo, fazemos juntos."

Peça a cada dupla que **teste de novo com o NVDA** depois de cada correção: ouvir a diferença é o ponto.

**Dicas (se travarem), sem entregar o código:**
- Botões: "Qual é o nome que o NVDA fala? Que atributo muda isso?"
- Campos: "Qual elemento HTML liga texto a campo?"
- Modal: "Quem é o elemento nativo do HTML para janela modal?"
- Mensagem: "Quando o aviso aparece, a região onde ele aparece já existia?"

### 45–50 min · Teste, discussão e encerramento

- Rode `start` com as correções feitas pela turma no NVDA e ouça o antes/depois do botão do carrinho.
- Perguntas finais (2 min): "O que foi mais difícil de perceber?" "O que você vai checar no seu próximo PR?"
- Mostre `solution/` e o repositório. Feche com a mensagem central (slide final).
- Convide a continuar: roteiro de teste de 5 minutos para levar para o time (Tab, NVDA, zoom 200%).

## Plano de contingência

| Problema | Resposta |
|---|---|
| FigJam fora do ar | Documento simples ou parede com post-its: 3 colunas (encontrado / prioridade / solução). |
| Internet instável | Tudo local: `start/` e `solution/` já com `node_modules`; a app não usa recursos externos. |
| NVDA não funciona em alguma máquina | A dupla acompanha a máquina que funciona; demonstração na máquina testada. |
| Participante não consegue rodar o projeto | Acompanha a dupla; não pare a turma. |
| Tempo estourou | Pule o registro formal; vá direto à priorização dos 3 mais críticos e às correções 1 e 3. |
| Voz do NVDA muito rápida ou ininteligível | `NVDA + Ctrl + V`, reduzir velocidade; usar o Visualizador de fala. |

## Observação de segurança emocional

Alguns participantes podem usar leitor de tela no dia a dia. Evite frases como "imagine ser cego"; prefira "como essa pessoa usaria isto". Se houver pessoas com deficiência na sala, convide-as a comentar o que a equipe não percebeu, sem obrigar.
