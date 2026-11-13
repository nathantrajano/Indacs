# Relatório Consolidado de Implementações — INDACS 2.0
**Período:** 09 de Novembro de 2026 a 12 de Novembro de 2026  
**Projeto:** INDACS 2.0 — Cartilha Interativa dos Indicadores de Qualidade da APS  
**Parceria:** PET Saúde Digital | UFCG & Secretaria da Saúde de Campina Grande - PB  
**Repositório:** [github.com/nathantrajano/Indacs](https://github.com/nathantrajano/Indacs)  

---

## 1. Contexto e Diretriz do Período

A partir de 09 de novembro de 2026, o projeto passou por um ciclo intensivo de **simplificação, refinamento visual e fidelização pedagógica** em relação à **Cartilha INDACS impressa** e às orientações da coordenação.

O objetivo central foi **eliminar sobrecargas cognitivas e ruídos visuais**, garantindo que o Agente Comunitário de Saúde (ACS) acesse diretamente o conteúdo essencial em qualquer smartphone, sem distrações, formulários interativos desnecessários ou módulos secundários que desviassem do propósito original da cartilha.

---

## 2. Linha do Tempo Consolidada dos Commits

| Data | Commit | Categoria | Escopo da Alteração |
| :--- | :--- | :--- | :--- |
| **10/11/2026** | `8872097` | Refatoração | Remoção dos blocos de situações práticas/cenários simulados dos indicadores |
| **10/11/2026** | `8b717dd` | Usabilidade | Inclusão de botão "Retornar" destacado no topo e botão flutuante inferior no mobile |
| **11/11/2026** | `c5b25f3` | Arquitetura | Exclusão definitiva do calendário interativo (*Jornadas que Cuidam*) e do banner inicial |
| **11/11/2026** | `60eef02` | UI / Design | Conversão dos blocos retangulares de diálogo em balões de fala reais com cauda SVG |
| **12/11/2026** | `6c2d667` | Simplificação | Supressão da seção expansível e do botão de "Limites de Atuação e Fonte" |
| **12/11/2026** | `59ceb9a` | UI / Tipografia | Substituição do formato de checklist (`[✓]`) por marcadores limpos de tópicos (*bullet points*) |
| **12/11/2026** | `fe1b994` | Refatoração | Remoção completa do módulo de pesquisa textual, filtro por voz e chips rápidos |

---

## 3. Detalhamento Técnico das Implementações

### 3.1. Remoção das Situações Práticas (`10/11/2026` — `8872097`)
- **Motivação:** O detalhe de cada indicador continha blocos interativos de perguntas e cenários práticos que tornavam a leitura longa e distanciavam a tela do formato objetivo da cartilha física.
- **Modificações:**
  - `src/components/IndicatorDetailModal.jsx`: exclusão dos blocos de simulação e lógica condicional associada (-110 linhas).
  - `public/contingencia-offline.html` e `contingencia-offline.html`: remoção das situações nas páginas de fallback (-80 linhas combinadas).
- **Resultado:** Abertura direta do indicador focada nas orientações e atribuições do ACS.

---

### 3.2. Botões Visíveis de Retorno (`10/11/2026` — `8b717dd`)
- **Motivação:** Proporcionar navegação rápida e acessível com uma só mão em telas móveis.
- **Modificações em `src/components/IndicatorDetailModal.jsx`:**
  - **Barra superior:** Botão **"Retornar"** em fundo branco com tipografia preta em negrito (`font-extrabold`), ícone de seta evidente e efeito de escala ao toque.
  - **Botão flutuante (FAB):** Botão fixo no canto inferior direito (`fixed bottom-4 right-4 z-50 md:hidden`), permitindo ao ACS voltar à tela inicial a qualquer momento da rolagem sem precisar subir a página.

---

### 3.3. Exclusão Completa do Calendário e Banner Inicial (`11/11/2026` — `c5b25f3`)
- **Motivação:** A funcionalidade de calendário (*Jornadas que Cuidam*), filtros de prioridade e o banner de boas-vindas adicionavam complexidade desnecessária ao fluxo de consulta.
- **Ações Realizadas:**
  - Exclusão dos componentes legados `src/components/CalendarJornadas.jsx` (556 linhas) e `src/components/IntentionWelcomeBanner.jsx` (154 linhas).
  - Limpeza em `src/App.jsx` de todos os estados de alternância de abas, seletores de rotina e renderização condicional (-243 linhas).
  - Remoção dos nós de calendário em `public/contingencia-offline.html` e `contingencia-offline.html`.
- **Impacto:** Eliminação de 1.170 linhas de código legado e foco total na grade de indicadores.

---

### 3.4. Diálogos em Balões de Fala com Ponteiros SVG (`11/11/2026` — `60eef02`)
- **Motivação:** Na parte inferior da folha de cada indicador, os textos explicativos pareciam caixas de texto genéricas e não diálogos entre os personagens ilustrados.
- **Modificações em `src/components/IndicatorDetailModal.jsx`:**
  - Criação de balões de conversa arredondados (`rounded-3xl`):
    - **Pergunta do cidadão (esquerda):** Balão claro com borda verde (`border-2 border-indacs-primary/60 bg-indacs-creamLight/90`), acompanhado de cauda SVG apontando para o personagem masculino.
    - **Resposta da ACS (direita):** Balão verde institucional sólido (`bg-indacs-primary text-white shadow-md`), com cauda SVG apontando para a personagem feminina (ACS).
  - Reprodução fiel do estilo das páginas 2 a 9 da Cartilha original.

---

### 3.5. Supressão da Seção "Limites de Atuação" (`12/11/2026` — `6c2d667`)
- **Motivação:** Reduzir a extensão do modal, retirando dados técnicos e fórmulas de cálculo que pertencem às notas metodológicas e não à rotina rápida de campo do ACS.
- **Modificações em `src/components/IndicatorDetailModal.jsx`:**
  - Remoção do botão sanfona *"Limites de Atuação e Fonte"*, do estado `showLimits` e do painel expansível de fórmulas de cálculo.
  - Limpeza de dependências não utilizadas (`useState`, `Scale`, `ChevronDown`, `ChevronUp`, `BookOpen`).
  - Posicionamento do rodapé institucional (`SECRETARIA DA SAÚDE DE CAMPINA GRANDE - PB` | `PET SAÚDE DIGITAL | UFCG`) diretamente abaixo do morro verde e das ilustrações.

---

### 3.6. Conversão de Checklist para Marcadores de Tópicos (`12/11/2026` — `59ceb9a`)
- **Motivação:** A presença de círculos com marcas de verificação (`✓`) passava a impressão equivocada de um checklist de tarefas a serem marcadas ou itens previamente checados.
- **Modificações em `src/components/IndicatorDetailModal.jsx`:**
  - Substituição do componente `CartilhaCheckItem` por `CartilhaTopicItem`.
  - Remoção da caixinha circular e do caractere `✓`.
  - Implementação de marcador circular de tópico (*bullet point*) preenchido em verde institucional (`h-2 w-2 rounded-full bg-indacs-primary`), perfeitamente alinhado verticalmente com a primeira linha de texto tanto no celular quanto no desktop.

---

### 3.7. Remoção do Módulo de Pesquisa e Filtro por Voz (`12/11/2026` — `fe1b994`)
- **Motivação:** Deixar a tela de entrada da aplicação exatamente idêntica à **página 1 (Capa)** da Cartilha INDACS impressa, onde o acesso aos indicadores é puramente visual e intuitivo através dos 7 círculos.
- **Modificações:**
  - **`src/App.jsx`:** Remoção do campo de busca textual, botão de microfone, integração com a API `webkitSpeechRecognition`, tratamento de erros de áudio, chips rápidos (`ROUTINE_SEARCH_CHIPS`), lógica de stopwords (`PT_STOPWORDS`) e busca de termos. O arquivo foi enxugado de **531 para 131 linhas** (-75% de código).
  - **`src/data/indacsData.js`:** Remoção do array `ROUTINE_SEARCH_CHIPS`.
  - **`public/contingencia-offline.html` e `contingencia-offline.html`:** Remoção dos inputs de texto, botões de áudio e scripts de filtro, renderizando diretamente a grade de indicadores.

---

## 4. Arquitetura Atual da Aplicação

```
src/
├── App.jsx                        # Tela inicial limpa (Capa da Cartilha: Grade 3 - 2 - 2)
├── components/
│   └── IndicatorDetailModal.jsx   # Folha do indicador (Tópicos do ACS + Balões + Ilustração)
├── data/
│   └── indacsData.js              # Base normativa estruturada dos 7 indicadores (C1 a C7)
├── index.css                      # Configurações de tipografia e Tailwind
└── main.jsx                       # Ponto de entrada React 18

public/
├── assets/cartilha/               # Ícones circulares e ilustrações originais da Cartilha
└── contingencia-offline.html      # Versão estável monobloco para uso sem internet / sem servidor
```

### Fluxo de Uso do Usuário:
1. **Página Inicial:**
   - Cabeçalho: Título *Indacs* e subtítulo institucional da APS.
   - Instrução: *"Toque em cada ícone para navegar."*
   - Grade 3 - 2 - 2 idêntica à capa:
     - Linha 1: **C1** (Mais acesso), **C2** (Desenvolvimento infantil), **C3** (Gestação e puerpério).
     - Linha 2: **C4** (Pessoa com diabetes), **C5** (Pessoa com hipertensão).
     - Linha 3: **C6** (Pessoa idosa), **C7** (Mulher na prevenção do câncer).
2. **Visualização do Indicador:**
   - Botão **Retornar** no topo.
   - Banner do indicador com o ícone circular oficial.
   - Seção *"O que compete ao ACS"* formatada com **tópicos pontuados**.
   - Balões de conversa (pergunta do morador e resposta da ACS).
   - Ilustração sobre o morro verde e rodapé institucional.
   - Botão flutuante **Retornar** acessível no mobile.

---

## 5. Resultados de Desempenho e Qualidade de Código

- **Tamanho do Bundle de Produção:**
  - JavaScript compilado: **192.92 kB** (gzip: **58.20 kB**) — redução significativa após a remoção de listeners de áudio, lógica de processamento de texto e componentes de calendário.
  - CSS compilado: **21.15 kB** (gzip: **4.40 kB**).
- **Estabilidade:**
  - Build sem advertências ou erros no Vite (`npm run build`).
  - Deploy automatizado contínuo via GitHub Actions (`.github/workflows/deploy.yml`) para o **GitHub Pages**.
  - Versão offline de contingência totalmente funcional e sincronizada com as decisões de design.
