# Documentação de Implementações — INDACS 2.0 (09/11 a 12/11/2026)

Este documento registra as alterações e melhorias implementadas no projeto **INDACS 2.0** a partir de **09 de novembro de 2026**, com foco em tornar a aplicação web mais enxuta, intuitiva e fiel à **Cartilha INDACS**, mantendo o recurso de **filtro por voz (`pt-BR`)** e o funcionamento com **deploy automático no GitHub Pages**.

---

## Resumo Cronológico das Entregas

| Data | Commit | Tipo | Descrição Resumida |
| :--- | :--- | :--- | :--- |
| **10/11/2026** | `8872097` | Refatoração | Remoção das situações práticas/cenários dos indicadores |
| **10/11/2026** | `8b717dd` | Funcionalidade | Adição do botão **Retornar** destacado no topo e botão flutuante inferior |
| **11/11/2026** | `c5b25f3` | Refatoração | Remoção completa do calendário (*Jornadas que Cuidam*) no app e na contingência offline |
| **11/11/2026** | `60eef02` | Interface (UI) | Transformação dos blocos de diálogo em balões de fala com ponteiros SVG |
| **12/11/2026** | `6c2d667` | Refatoração | Remoção da seção e do botão de **Limites de Atuação e Fonte** |
| **12/11/2026** | — | Interface (UI) | Substituição do formato checklist por marcadores reais de tópicos (bullet points) |

---

## Detalhamento das Implementações

### 1. Remoção das Situações Práticas dos Indicadores (`10/11/2026` — `8872097`)
Para deixar a visualização de cada indicador (C1 a C7) direta e alinhada ao conteúdo da cartilha impressa, foram removidos os blocos interativos de situações práticas/cenários de atendimento.
- **Arquivos modificados:**
  - `src/components/IndicatorDetailModal.jsx`
  - `public/contingencia-offline.html`
  - `contingencia-offline.html`
- **Impacto:** Redução de 181 linhas removidas em favor de uma leitura objetiva dos checklists e orientações ao ACS.

---

### 2. Botões de Retorno Visíveis (`10/11/2026` — `8b717dd`)
Para facilitar a navegação (especialmente em telas de celular), o retorno à tela inicial passou a contar com dois pontos de acesso bem visíveis dentro do modal de indicador:
- **Barra superior:** botão **Retornar** com maior destaque visual no topo da folha da cartilha.
- **Botão flutuante inferior:** botão fixo no canto inferior direito (`fixed bottom-4 right-4`), ideal para uso com uma mão em dispositivos móveis.
- **Arquivo modificado:**
  - `src/components/IndicatorDetailModal.jsx`

---

### 3. Remoção Completa do Calendário (*Jornadas que Cuidam*) (`11/11/2026` — `c5b25f3`)
Seguindo a diretriz de simplificação do projeto, toda a funcionalidade de calendário e o banner inicial foram removidos do código-fonte principal e das versões de contingência offline.
- **Arquivos modificados:**
  - `src/App.jsx` (remoção das abas/alternância de visualização, importações e renderização do calendário)
  - `src/data/indacsData.js` (remoção dos dados vinculados ao calendário)
  - `public/contingencia-offline.html` e `contingencia-offline.html` (remoção da seção correspondente)
- **Arquivos removidos:**
  - `src/components/CalendarJornadas.jsx`
  - `src/components/IntentionWelcomeBanner.jsx`
- **Impacto:** Remoção de 1.170 linhas de código não utilizadas, consolidando a tela inicial exclusivamente na grade **3-2-2** dos 7 indicadores da Cartilha + busca textual e filtro por voz.

---

### 4. Diálogos em Formato de Balões de Fala (`11/11/2026` — `60eef02`)
Na área ilustrada de perguntas e respostas de cada indicador, os blocos retangulares simples foram convertidos em **balões de fala** reais com caudas/ponteiros SVG direcionados aos personagens (usuário/cidadão à esquerda e ACS à direita), reproduzindo a linguagem visual da Cartilha INDACS.
- **Arquivo modificado:**
  - `src/components/IndicatorDetailModal.jsx`

---

### 5. Remoção da Seção "Limites de Atuação" (`12/11/2026` — `6c2d667`)
Para finalizar o enxugamento da ficha de cada indicador, foram removidos o botão **"Limites de Atuação e Fonte"**, o estado expansível (`showLimits`), o painel de atribuições/cálculo/fontes e as importações não utilizadas (`useState`, `Scale`, `ChevronDown`, `ChevronUp`, `BookOpen`).
- **Arquivo modificado:**
  - `src/components/IndicatorDetailModal.jsx`
- **Resultado:** O rodapé institucional (`SECRETARIA DA SAÚDE DE CAMPINA GRANDE - PB` | `PET SAÚDE DIGITAL | UFCG`) agora fecha diretamente abaixo da ilustração com os balões de fala.

---

### 6. Transição de Checklist para Marcadores de Tópicos (`12/11/2026`)
Os itens da seção *"O que compete ao ACS"* deixaram de usar ícones de caixa de verificação/checklist (`[✓]`) e foram convertidos em **tópicos pontuados (bullet points)** limpos e alinhados verticalmente com a tipografia da Cartilha.
- **Arquivo modificado:**
  - `src/components/IndicatorDetailModal.jsx` (`CartilhaTopicItem` com bullet dot estilizado em `indacs-primary`)
- **Impacto:** Eliminação do aspecto de "tarefa a checar/marcar", evidenciando que se tratam de orientações e tópicos de atuação.

---

## Estado Atual do Projeto (após `12/11/2026`)
- **Tela Inicial (`src/App.jsx`):** Identidade visual fiel à capa da Cartilha INDACS, grade 3-2-2 com os indicadores **C1 a C7**, busca por texto e **filtro por voz em `pt-BR`**.
- **Detalhe do Indicador (`src/components/IndicatorDetailModal.jsx`):** Cabeçalho com botão **Retornar**, checklist e orientações da cartilha, balões de fala apontando para os personagens, rodapé institucional e botão flutuante **Retornar**.
- **Build e Deploy:** Compilação validada com `npm run build` (`vite build`) e publicada na branch `main` (`https://github.com/nathantrajano/Indacs.git`) com deploy automático via GitHub Actions (`.github/workflows/deploy.yml`).

