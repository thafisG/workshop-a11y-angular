# Quadro FigJam — Accessibility Audit Board

> **Quadro já criado:** <https://www.figma.com/board/wI6THeYn53CYv97TdUYd8C> (seis seções: Problemas, Crítico, Alto, Médio, Baixo, Soluções; 12 cartões-modelo amarelos e 6 azuis). Abaixo está a especificação, útil para recriar o quadro ou adaptá-lo.

Montagem estimada: **15 a 20 minutos**. O quadro deve estar pronto, com áreas e cartões vazios, antes do evento.

## Estrutura

Uma única página com três áreas, da esquerda para a direita:

```
┌──────────────────────┐   ┌──────────────────────────────────────┐   ┌──────────────────────┐
│ 1. PROBLEMAS         │   │ 2. PRIORIZAÇÃO POR IMPACTO           │   │ 3. SOLUÇÕES          │
│    ENCONTRADOS       │   │                                      │   │    PROPOSTAS         │
│                      │   │ ┌────────┬────────┬────────┬───────┐ │   │                      │
│ [cartão] [cartão]    │   │ │CRÍTICO │ ALTO   │ MÉDIO  │ BAIXO │ │   │ [cartão] [cartão]    │
│ [cartão] [cartão]    │   │ │        │        │        │       │ │   │ [cartão] [cartão]    │
│ [cartão] [cartão]    │   │ └────────┴────────┴────────┴───────┘ │   │ [cartão] [cartão]    │
└──────────────────────┘   └──────────────────────────────────────┘   └──────────────────────┘
```

Use **Sections** do FigJam (atalho `Shift + S`) para cada área; as colunas de impacto são quatro Sections menores dentro da área 2.

## Área 1 — Problemas encontrados

Instrução fixa no topo (sticky grande):

> Um cartão por problema. Escreva **o que aconteceu** e **qual dificuldade** isso causa. Evite nomes técnicos.

Modelo de cartão (cole 12 cópias vazias; cor amarela):

```
Problema:
O que aconteceu na navegação:
Dificuldade percebida:
Como testei:  ☐ teclado  ☐ NVDA
```

## Área 2 — Priorização por impacto

Quatro colunas com cores sugeridas (use cores **e** texto; não dependa só da cor):

| Coluna | Definição (escreva na própria seção) | Cor |
|---|---|---|
| **Crítico** | Impede uma funcionalidade essencial. | Vermelho |
| **Alto** | Dificulta significativamente a utilização. | Laranja |
| **Médio** | Causa dificuldade, mas existe uma alternativa. | Amarelo |
| **Baixo** | Melhoria de experiência ou clareza. | Verde |

Instrução fixa:

> Classifique pelo **contexto e impacto**, não pela existência de uma violação técnica. Se a dupla discordar, vale discutir.

## Área 3 — Soluções propostas

Modelo de cartão (azul):

```
Problema: (copie o título do cartão da área 1)
Qual seria a melhoria?
Como implementar?
Resultado esperado:
```

## Preparação passo a passo

1. Crie o arquivo FigJam *Accessibility Audit Board*.
2. Crie as três Sections e dê nome a cada uma.
3. Dentro da área 2, crie as quatro colunas e escreva a definição de cada nível.
4. Cole as instruções fixas (stickies grandes) no topo de cada área.
5. Crie os cartões-modelo e duplique: 12 na área 1, 6 na área 3.
6. Configure o compartilhamento: **qualquer pessoa com o link pode editar** (teste em janela anônima).
7. Gere um QR code do link para o slide de abertura.
8. Faça uma **cópia de reserva** do arquivo (File → Duplicate).

## Se quiser automatizar a montagem

Há um conector do Figma disponível no Claude, mas ele precisa ser conectado à sua conta primeiro. Com ele conectado dá para pedir a geração do diagrama-base; hoje esta sessão não tem acesso ao FigJam, então este documento é a especificação.

## Plano B

Sem FigJam: use uma planilha com colunas **Problema / O que aconteceu / Impacto / Solução**, ou um quadro físico com post-its nas mesmas três áreas.
