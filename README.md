# INDACS 2.0 • Do PDF Navegável à Aplicação Web Interativa

**GAT 8 | PET Saúde Digital – UFCG | Secretaria de Saúde de Campina Grande - PB**  
**Cocriação:** Kalilka (Design, linguagem simples, ilustrações originais e experiência) e Nathan (Computação, código, testes, armazenamento local e contingência)  
**Facilitação:** Prof. Marcelo Barros • **Validação técnica:** Prof. Sales e equipe de saúde

---

## 1. Missão e Escopo Entregue

Aplicação web mobile-first que transforma a **Cartilha INDACS** original e as **7 Notas Metodológicas do Ministério da Saúde (C1 a C7)** em uma ferramenta interativa de consulta rápida, tomada de decisão segura de encaminhamento e reconhecimento profissional para **Agentes Comunitários de Saúde (ACS)**.

### Telas Implementadas (Conforme Seção 5 do Roteiro)
1. **Tela 1 — O que preciso saber hoje?**:
   - Cartões acessíveis por toque para os **7 indicadores (C1 a C7)** preservando os ícones, cores (verde e creme) e ilustrações originais de Kalilka.
   - Busca textual instantânea por palavras da rotina (`recém-nascido`, `30 dias`, `pé diabético`, `feridas`, `vacina`, `pressão`, `gestante`, `idosa`, `quedas`, `HPV`, `faltosos`, etc.) e botões de filtro rápido.
   - Sinalização explícita entre os indicadores com casos validados prioritários (**C2** e **C4**) e os cartões com cenários complementares **em revisão técnica** (**C1, C3, C5, C6 e C7**).
2. **Tela 2 — Orientação contextualizada e limites de atribuição**:
   - Diferenciação explícita entre:
     1. **Critérios de cálculo do indicador** (regras de pontuação da equipe no SIAPS/e-SUS APS);
     2. **O que compete ao ACS** na visita domiciliar e busca ativa;
     3. **Ações privativas ou compartilhadas de outros profissionais** (ex.: exame clínico do pé diabético `SIGTAP 03.01.04.009-5`, consultas de puericultura/pré-natal e retirada do CBO `5151-05` do quadro de aferição de pressão arterial nas Notas C4 e C5).
   - **Casos interativos com escolhas e feedback imediato** (priorizando C2 – Desenvolvimento Infantil e C4 – Diabetes), estruturados com *"O que observar"*, *"O que cabe ao ACS"*, *"Quando comunicar à equipe"* e *"Fonte exata"*.
   - Visualizador integrado das **páginas originais da Cartilha INDACS** para comparação direta durante o teste exploratório.
3. **Tela 3 — Meu calendário de jornadas ("Jornadas que Cuidam")**:
   - Calendário mensal com **X reversível** no dia vivido (*"O X significa 'reconheço minha jornada', nunca 'cumpri metas', 'registrei visitas' ou 'provei presença'"*).
   - Espaço para reflexão opcional e privada, sem ranking, sem sequência obrigatória (*streak*) e sem vigilância.
   - Armazenamento apenas local no navegador (`localStorage`), com **Modo Aparelho Compartilhado (Demonstração sem persistência)**, botão **"Apagar registros"** e opção de **"Desativar módulo"**.
4. **Tela 4 — A ponte para a próxima jornada**:
   - Ao marcar o X, convida suavemente: *"O que você gostaria de levar para a próxima jornada?"* (com opção de registrar ou pular).
   - Ao retornar ao aplicativo em outra data (ou através do botão de teste **"Testar retorno em novo dia"**), apresenta a intenção sem cobrança, alerta de atraso ou julgamento, permitindo **Renovar para hoje**, **Editar** ou **Deixar ir / Abandonar**.
5. **Painel de Governança da Oficina & Teste Exploratório (Seções 7, 8, 9 e 10)**:
   - Separação explícita entre **INDACS 2.0** (*"O que compete a mim nesta situação?"*) e **Anjo ACS** (*"Como superar esta dificuldade?"*).
   - Registro transparente de limitações, **Cronômetro integrado**, **Folha de observação exportável (.txt)** para o teste exploratório na UBS (segunda-feira, 09/11, às 8h, com 2 ACS) e **Checklist de saída da oficina**.

---

## 2. Como Executar e Publicar

### Execução em Desenvolvimento (Com Node.js)
```bash
npm install
npm run dev
```

### Gerar Pacote Estático para Publicação (Vercel / Netlify / GitHub Pages)
```bash
npm run build
npm run preview
```
A pasta `dist/` gerada é 100% estática (sem backend, sem banco de dados externo e sem chamadas de IA em tempo de execução).

### Plano de Contingência Local (Sem Internet / Sem Servidor)
Caso não haja Wi-Fi na UBS durante o teste exploratório:
- Abra diretamente o arquivo `public/contingencia-offline.html` (ou `dist/contingencia-offline.html`) com duplo-clique em qualquer navegador de celular, tablet ou notebook.

