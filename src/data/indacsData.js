export const APP_METADATA = {
  title: 'INDACS 2.0',
  subtitle: 'Cartilha interativa dos indicadores de qualidade da Atenção Primária à Saúde para Agentes Comunitários de Saúde',
  project: 'GAT 8 | PET Saúde Digital – UFCG',
  municipality: 'Secretaria de Saúde de Campina Grande - PB',
  authors: {
    designAndContent: 'Kalilka (Design, ilustrações originais, linguagem simples e experiência)',
    implementation: 'Nathan (Computação, arquitetura web, armazenamento local e testes)',
    facilitation: 'Prof. Marcelo Barros (Facilitação pedagógica e cocriação)',
    technicalValidation: 'Prof. Sales e equipe de saúde da UBS (Validação técnica e normativa)'
  },
  version: '2.0.0-oficina (06/11/2026)',
  testDate: 'Segunda-feira, 09/11/2026, às 8h, em UBS',
  principle: 'Cada dia vivido merece reconhecimento. Cada novo dia merece a liberdade de recomeçar.'
};

export const ROUTINE_SEARCH_CHIPS = [
  { label: 'Recém-nascido (30 dias)', query: 'recém-nascido 30 dias' },
  { label: 'Pé diabético / feridas', query: 'feridas pés diabetes' },
  { label: 'Vacina criança / HPV', query: 'vacina' },
  { label: 'Pressão alta /PA', query: 'pressão hipertensão' },
  { label: 'Gestante / Puerpério', query: 'gestante puerpério' },
  { label: 'Idoso / Quedas', query: 'idosa quedas acamadas' },
  { label: 'Faltosos / Busca ativa', query: 'faltosos busca ativa' },
  { label: 'Intervalo 30 dias', query: 'intervalo mínimo de 30 dias' }
];

export const INDICATORS = [
  {
    id: 'C1',
    code: 'C1',
    shortTitle: 'Mais acesso',
    fullTitle: 'Mais Acesso à Atenção Primária à Saúde (APS)',
    cartilhaTitle: 'Nota Metodológica C1 — Mais acesso à APS',
    icon: './assets/cartilha/icon-c1.png',
    illustration: './assets/cartilha/ilustracao-acs-homem.png',
    cartilhaPageImg: './assets/cartilha/pagina-2.png',
    validationStatus: 'em_revisao_complementar',
    validationLabel: 'Cartilha + Nota C1 conferidas • Cenário interativo em revisão com equipe',
    summaryQuestion: 'Qual a função do ACS na Competência 1?',
    summaryAnswer: 'O ACS é responsável por organizar o acesso no território, identificar pendências e aproximar o usuário da equipe.',
    tags: [
      'acesso', 'demanda programada', 'demanda espontânea', 'faltosos', 'busca ativa',
      'consulta agendada', 'cadastro', 'endereço', 'telefone', 'acompanhamento atrasado'
    ],
    directAcsGoal: {
      hasDirectVisitCount: false,
      badge: 'Apoio territorial ao acesso programado',
      description: 'A Nota Metodológica C1 mede a proporção de consultas programadas/continuadas realizadas por médicos e enfermeiros frente ao total de atendimentos. A contribuição direta do ACS está em identificar quem precisa de cuidado contínuo, orientar sobre agendamentos e reduzir faltas por meio da busca ativa.'
    },
    acsCompetencies: [
      'Identificar pessoas com acompanhamento atrasado na microárea.',
      'Organizar a relação de faltosos às consultas programadas.',
      'Realizar busca ativa no território.',
      'Orientar os moradores sobre o funcionamento das consultas programadas e do cuidado continuado.',
      'Comunicar à equipe as necessidades e barreiras de acesso encontradas.',
      'Confirmar se o usuário conseguiu acessar o serviço na UBS.',
      'Atualizar endereço, telefone e situação territorial no cadastro.',
      'Orientar que o acompanhamento de condições crônicas e ciclos de vida deve continuar mesmo sem sintomas.'
    ],
    calculationCriteria: {
      formula: 'Numerador: Nº total de atendimentos por demanda programada (consulta agendada programada, cuidado continuado e consulta agendada) ÷ Denominador: Nº total de atendimentos por todos os tipos de demandas (espontâneas + programadas).',
      parameters: 'Ótimo: > 50% e ≤ 70% | Bom: > 30% e ≤ 50% | Suficiente: > 10% e ≤ 30% | Regular: ≤ 10% ou > 70% (equilíbrio entre porta aberta à urgência e cuidado programado).',
      note: 'Critério de indicador de equipe (INE). Não representa meta de produtividade individual do ACS.'
    },
    professionalBoundaries: {
      otherProfessionals: 'Médicos (CBO 2251-42, 2251-70, 2251-30, 2251-25, 2252-50) e Enfermeiros (CBO 2235-65, 2235-05) registram os Atendimentos Individuais (MIAI) que entram na fórmula do indicador C1.',
      notAcsRole: 'O ACS NÃO realiza classificação de risco clínico, NÃO tria urgências médicas no domicílio e NÃO substitui a escuta inicial clínica de enfermagem/medicina na UBS.'
    },
    sources: {
      cartilha: 'Cartilha INDACS (Kalilka / PET Saúde Digital UFCG), página 2.',
      nota: 'Nota Metodológica C1 – Mais Acesso (SEI/MS nº 0054814890, 2026), Seção 3 (itens 4, 5, 23, 24 e 30) e Seção 4 (Quadro 01, págs. 1 a 3).',
      reviewNote: 'Conferência técnica: Prof. Sales e equipe de saúde da UBS.'
    },
    scenario: {
      id: 'c1-cenario-1',
      isPriorityValidated: false,
      badge: 'Cenário de apoio (em revisão técnica)',
      title: 'Morador que só procura a UBS quando passa mal',
      context: 'Durante visita na microárea, você encontra Seu Joaquim (situação fictícia), que comenta que deixou de ir às consultas agendadas porque "não está sentindo dor nenhuma" e prefere ir à UBS apenas como encaixe no dia em que sente tontura.',
      whatToObserve: [
        'Se o morador está com consultas programadas em atraso ou faltou ao último agendamento.',
        'Se os dados de telefone e endereço estão atualizados no cadastro.',
        'Se há sintomas agudos no momento da visita que exijam avaliação no mesmo dia.'
      ],
      whatBelongsToAcs: [
        'Explicar em linguagem simples a diferença entre consulta programada (cuidado continuado para evitar complicações) e atendimento de urgência/demanda espontânea.',
        'Orientar que o acompanhamento deve continuar mesmo sem sintomas.',
        'Incluir na relação de busca ativa/faltosos e avisar à equipe para reprogramar o cuidado.'
      ],
      whenToCommunicateTeam: [
        'Quando identificar faltosos recorrentes ou barreiras de acesso para agendamento.',
        'Imediatamente, caso o morador apresente queixa aguda ou sinal de sofrimento no momento da visita.'
      ],
      exactSource: 'Cartilha INDACS, pág. 2 • Nota Metodológica C1, Seção 3, item 5 (Conceitos de demanda programada e espontânea, pág. 1).',
      question: 'Diante da fala de Seu Joaquim de que "só vai ao posto quando sente dor", qual é a conduta adequada do ACS?',
      options: [
        {
          id: 'a',
          text: 'Orientar que o acompanhamento programado deve continuar mesmo sem sintomas, atualizar o contato e comunicar à equipe para apoiar o agendamento.',
          isCorrect: true,
          feedback: 'Correto! Conforme a Cartilha INDACS (pág. 2) e a Nota Metodológica C1 (item 5), o ACS aproxima o usuário da equipe, orienta sobre a continuidade do cuidado mesmo sem sintomas e organiza a busca ativa de faltosos.'
        },
        {
          id: 'b',
          text: 'Dizer que ele está certo em só procurar a UBS quando tiver sintomas fortes, para não ocupar vagas de consulta agendada.',
          isCorrect: false,
          feedback: 'Atenção: o cuidado continuado (demanda programada) serve justamente para acompanhar ciclos de vida e condições crônicas antes que surjam crises agudas. A Cartilha C1 orienta explicar que o acompanhamento deve continuar mesmo sem sintomas.'
        },
        {
          id: 'c',
          text: 'Avaliar clinicamente a tontura no domicílio e dizer que ele não precisa de consulta médica neste semestre.',
          isCorrect: false,
          feedback: 'Fora do limite de atuação do ACS! Avaliar sintomas clínicos ou dispensar acompanhamento médico/enfermagem é atribuição clínica. Ao ACS cabe acolher, orientar o acesso e comunicar à equipe.'
        }
      ]
    }
  },
  {
    id: 'C2',
    code: 'C2',
    shortTitle: 'Desenvolvimento infantil',
    fullTitle: 'Cuidado no Desenvolvimento Infantil na APS',
    cartilhaTitle: 'Nota Metodológica C2 — Desenvolvimento Infantil',
    icon: './assets/cartilha/icon-c2.png',
    illustration: './assets/cartilha/ilustracao-acs-mulher.png',
    cartilhaPageImg: './assets/cartilha/pagina-3.png',
    validationStatus: 'validado_prioritario',
    validationLabel: 'Conteúdo e Cenário Prioritários da Oficina (C2 Conferido)',
    summaryQuestion: 'Qual a função do ACS na Competência 2?',
    summaryAnswer: 'É acompanhar as crianças até 2 anos com visitas domiciliares nos prazos certos, checando vacinação e cadastro, orientando a família e avisando a equipe sobre faltas ou riscos.',
    tags: [
      'criança', 'bebê', 'recém-nascido', 'puericultura', '30 dias', '6 meses', '2 anos',
      'vacina', 'caderneta da criança', 'peso', 'altura', 'pentavalente', 'vip', 'pólio',
      'pneumo', 'sarampo', 'desenvolvimento infantil', 'aleitamento'
    ],
    directAcsGoal: {
      hasDirectVisitCount: true,
      badge: 'Boa Prática (D): 2 visitas do ACS (até 30 dias e até 6 meses)',
      description: 'Para cada criança de até 2 anos: realizar pelo menos 02 (duas) visitas domiciliares por ACS/TACS, sendo a 1ª até os primeiros 30 dias de vida e a 2ª até os 06 meses de vida (registradas no MIVDT com motivo "recém-nascido" ou "criança"). Nota: esses prazos pontuam no indicador, mas o acompanhamento do ACS segue durante toda a infância.'
    },
    acsCompetencies: [
      'Realizar a primeira visita domiciliar até o 30º dia de vida da criança.',
      'Realizar a segunda visita domiciliar até os 6 meses de vida da criança.',
      'Identificar precocemente o nascimento no território.',
      'Atualizar o cadastro individual da criança (CPF/CNS, data de nascimento e vínculo com a equipe).',
      'Verificar se a criança está sendo acompanhada nas consultas de puericultura (1ª consulta até 30 dias e pelo menos 9 consultas até 2 anos).',
      'Conferir a situação vacinal na Caderneta da Criança e orientar a família.',
      'Identificar faltas às consultas/vacinas e dificuldades de acesso da família.',
      'Comunicar situações de risco ou vulnerabilidade à equipe de saúde.',
      'Realizar busca ativa das crianças faltosas.'
    ],
    calculationCriteria: {
      formula: 'Soma de 5 boas práticas (20 pontos cada = até 100 pontos por criança de até 2 anos): (A) 1ª consulta médica/enfermagem até o 30º dia; (B) ≥ 9 consultas médicas/enfermagem até 2 anos; (C) ≥ 9 registros simultâneos de peso e altura até 2 anos; (D) ≥ 2 visitas domiciliares por ACS/TACS (1ª até 30 dias e 2ª até 6 meses); (E) Vacinas em dia (Pentavalente 3 doses, VIP 3 doses, Pneumo-10 2 doses, SCR/SCRV 2 doses após 12 meses).',
      parameters: 'Ótimo: > 75 e ≤ 100 | Bom: > 50 e ≤ 75 | Suficiente: > 25 e ≤ 50 | Regular: ≤ 25.',
      note: 'Atenção no registro e-SUS APS (MIVDT): selecionar em "motivo da visita" as opções "recém-nascido" ou "criança" com CNS do ACS identificado (Nota C2, Seção 3, item 24-e, pág. 3). Esses critérios de pontuação não esgotam os deveres de cuidado integral.'
    },
    professionalBoundaries: {
      otherProfessionals: 'Consultas presenciais ou remotas de puericultura (Boas práticas A e B) são privativas de Médicos (CBO 2251/2252/2253/2231) e Enfermeiros (CBO 2235). Registro de peso e altura (Boa prática C, Quadro 03) pode ser realizado por médicos, enfermeiros, técnicos de enfermagem, TACS, ACS (CBO 5151-05) e equipe multiprofissional, quando registrado no mesmo dia em campo específico.',
      notAcsRole: 'O ACS NÃO realiza consulta clínica de puericultura (SIGTAP 03.01.01.026-9 / 03.01.01.027-7), NÃO diagnostica atrasos clínicos do desenvolvimento, NÃO prescreve medicamentos/suplementos e NÃO aplica vacinas.'
    },
    sources: {
      cartilha: 'Cartilha INDACS (Kalilka / PET Saúde Digital UFCG), página 3.',
      nota: 'Nota Metodológica C2 – Cuidado no Desenvolvimento Infantil (SEI/MS nº 0054824593, 2026), Seção 3 (item 16-D e item 24-e, págs. 2 e 3) e Seção 4 (Quadros 01, 03 e 04, págs. 5 e 6).',
      reviewNote: 'Conteúdo prioritário conferido na Oficina INDACS 2.0 (validação Prof. Sales / equipe de saúde).'
    },
    scenario: {
      id: 'c2-cenario-1',
      isPriorityValidated: true,
      badge: 'Caso Interativo Prioritário C2 • Validado',
      title: 'Visita domiciliar ao bebê recém-nascido com 18 dias de vida',
      context: 'Em visita à casa de Dona Camila (caso fictício), você conhece o bebê Lucas, que nasceu há 18 dias. A mãe conta que saiu da maternidade bem, mas ainda não foi à UBS para a primeira consulta do bebê nem atualizou o cadastro porque achou melhor esperar o bebê completar 2 meses. Ela também mostra a Caderneta da Criança e pergunta se você pode "examinar o umbigo que está um pouco vermelho e passar alguma pomada".',
      whatToObserve: [
        'Idade atual do bebê (18 dias — está dentro da janela crítica dos primeiros 30 dias de vida!).',
        'Situação do cadastro individual da criança (CPF/CNS) e vínculo no território.',
        'Se a 1ª consulta de puericultura (médico/enfermeiro até o 30º dia) já foi agendada ou realizada.',
        'Caderneta da Criança (vacinas ao nascer e próximos agendamentos) e sinais de alerta relatados pela mãe (vermelhidão no coto umbilical).'
      ],
      whatBelongsToAcs: [
        'Realizar e registrar esta 1ª visita domiciliar até o 30º dia de vida (marcando "recém-nascido" ou "criança" no motivo da visita no MIVDT) e planejar a 2ª visita até os 6 meses.',
        'Identificar o nascimento, atualizar o cadastro da criança e conferir a Caderneta da Criança.',
        'Orientar a família sobre a importância da 1ª consulta presencial na UBS antes do 30º dia de vida.',
        'Comunicar imediatamente à equipe de enfermagem/medicina a necessidade da consulta de até 30 dias e o sinal de alerta no coto umbilical.'
      ],
      whenToCommunicateTeam: [
        'Imediatamente, pois o bebê tem 18 dias e precisa realizar a 1ª consulta médica/enfermagem até o 30º dia de vida (Boa prática A), além de apresentar sinal de alerta no umbigo que exige avaliação clínica.'
      ],
      exactSource: 'Cartilha INDACS, pág. 3 • Nota Metodológica C2, Seção 3, item 16 (Boas práticas A e D, pág. 2), item 24-e (MIVDT, pág. 3) e Seção 4, Quadro 01 e Quadro 04 (págs. 5 e 6).',
      question: 'Como o ACS deve agir nesta visita ao bebê de 18 dias?',
      options: [
        {
          id: 'a',
          text: 'Indicar uma pomada cicatrizante para o umbigo e tranquilizar a mãe, dizendo que ela pode levar o bebê à UBS apenas quando ele completar 2 meses.',
          isCorrect: false,
          feedback: 'Incorreto e inseguro! O ACS nunca prescreve pomadas ou condutas clínicas. Além disso, esperar até os 2 meses faria a criança perder a janela da 1ª consulta de puericultura (que deve ocorrer até o 30º dia de vida, conforme Nota Metodológica C2, Boa Prática A).'
        },
        {
          id: 'b',
          text: 'Atualizar o cadastro, conferir a Caderneta, registrar a 1ª visita domiciliar (até 30 dias), orientar a família sem prescrever conduta e comunicar à equipe para agendar a 1ª consulta antes do 30º dia e avaliar o umbigo.',
          isCorrect: true,
          feedback: 'Perfeito! Você respeitou os limites de atuação do ACS (não prescreveu pomada nem inferiu diagnóstico), cumpriu a 1ª visita domiciliar dentro dos primeiros 30 dias de vida (Boa Prática D da Nota C2, Quadro 04) e acionou a equipe para garantir a 1ª consulta médica/enfermagem até o 30º dia e avaliar o sinal de risco.'
        },
        {
          id: 'c',
          text: 'Apenas anotar que o bebê nasceu e voltar somente quando a criança completar 1 ano, já que o indicador exige apenas duas visitas até os 2 anos.',
          isCorrect: false,
          feedback: 'Atenção aos prazos da Nota Metodológica C2 (Quadro 04, pág. 6): as duas visitas pontuadas do ACS têm janelas específicas — a 1ª até 30 dias de vida e a 2ª até os 6 meses de vida! Além disso, o papel do ACS inclui busca ativa e comunicação de sinais de risco.'
        }
      ]
    }
  },
  {
    id: 'C3',
    code: 'C3',
    shortTitle: 'Gestação e puerpério',
    fullTitle: 'Cuidado na Gestação e Puerpério na APS',
    cartilhaTitle: 'Nota Metodológica C3 — Gestação e Puerpério',
    icon: './assets/cartilha/icon-c3.png',
    illustration: './assets/cartilha/ilustracao-acs-homem.png',
    cartilhaPageImg: './assets/cartilha/pagina-4.png',
    validationStatus: 'em_revisao_complementar',
    validationLabel: 'Cartilha + Nota C3 conferidas • Cenário interativo em revisão com equipe',
    summaryQuestion: 'Qual a função do ACS na Competência 3?',
    summaryAnswer: 'É acompanhar a gestante do pré-natal ao puerpério, com visitas domiciliares regulares, atualizando cadastro e informando a equipe sobre riscos e o desfecho da gestação.',
    tags: [
      'gestante', 'gravidez', 'pré-natal', 'puerpério', 'pós-parto', '42 dias', '12 semanas',
      'dtpa', 'teste rápido', 'sífilis', 'hiv', 'consulta odontológica', '3 visitas'
    ],
    directAcsGoal: {
      hasDirectVisitCount: true,
      badge: 'Boas Práticas (E) e (J): ≥ 3 visitas na gestação + ≥ 1 visita no puerpério',
      description: 'Durante a gestação: realizar pelo menos 3 visitas domiciliares após a 1ª consulta do pré-natal (Boa Prática E). Durante o puerpério: realizar pelo menos 1 visita domiciliar até 42 dias após o término da gestação (Boa Prática J).'
    },
    acsCompetencies: [
      'Durante a gestação: realizar pelo menos 3 visitas domiciliares após a primeira consulta do pré-natal.',
      'Durante o puerpério: realizar pelo menos 1 visita domiciliar até 42 dias após o término da gestação.',
      'Identificar precocemente possíveis gestantes no território e orientar para início imediato do pré-natal (captação precoce até a 12ª semana).',
      'Comunicar a gestação à equipe de saúde.',
      'Atualizar cadastro, endereço e telefone e verificar se a gestante continua vinculada à equipe.',
      'Acompanhar gestantes faltosas às consultas, exames, vacina dTpa ou atendimento odontológico.',
      'Identificar o nascimento, realizar a visita puerperal, informar à equipe o desfecho da gestação e iniciar o acompanhamento da criança (C2).'
    ],
    calculationCriteria: {
      formula: 'Soma de 11 boas práticas (até 100 pontos por gestação/puerpério): (A) 1ª consulta até 12ª semana (10 pts); (B) ≥ 7 consultas de pré-natal (9 pts); (C) ≥ 7 aferições de PA (9 pts); (D) ≥ 7 registros simultâneos de peso e altura (9 pts); (E) ≥ 3 visitas do ACS após 1ª consulta (9 pts); (F) vacina dTpa a partir da 20ª semana (9 pts); (G) exames sífilis/HIV/hepatites B e C no 1º tri (9 pts); (H) exames sífilis/HIV no 3º tri (9 pts); (I) ≥ 1 consulta no puerpério (9 pts); (J) ≥ 1 visita do ACS no puerpério até 42 dias (9 pts); (K) ≥ 1 atividade de saúde bucal na gestação (9 pts).',
      parameters: 'Ótimo: > 75 e ≤ 100 | Bom: > 50 e ≤ 75 | Suficiente: > 25 e ≤ 50 | Regular: ≤ 25.',
      note: 'O puerpério considera os 42 dias após a data de desfecho da gestação (parto) registrada no sistema (Nota C3, Seção 3, item 17, pág. 2).'
    },
    professionalBoundaries: {
      otherProfessionals: 'Consultas de pré-natal e puerpério: Médicos e Enfermeiros (Quadro 02). Exames de 1º e 3º trimestre: Médicos, Enfermeiros, Farmacêuticos e Técnicos de Enfermagem/TACS (Quadro 07). Saúde bucal: Cirurgião-dentista e TSB (Quadro 08). Aferição de PA (Quadro 03): Médicos, Enfermeiros, Técnicos/Auxiliares/TACS (3222) e equipe multiprofissional.',
      notAcsRole: 'O ACS NÃO realiza consultas de pré-natal/puerpério, NÃO solicita/executa testes rápidos e seu CBO (5151-05) não pontua na aferição de PA (Quadro 03), embora pontue nas visitas domiciliares (Quadro 05) e no registro simultâneo de peso e altura (Quadro 04).'
    },
    sources: {
      cartilha: 'Cartilha INDACS (Kalilka / PET Saúde Digital UFCG), página 4.',
      nota: 'Nota Metodológica C3 – Cuidado na Gestação e Puerpério (SEI/MS nº 0054619475, 2026), Seção 3 (itens 5, 16 e 17, págs. 1 e 2) e Seção 4 (Quadros 01 e 05, págs. 5 e 7).',
      reviewNote: 'Conferência técnica: Prof. Sales e equipe de saúde da UBS.'
    },
    scenario: {
      id: 'c3-cenario-1',
      isPriorityValidated: false,
      badge: 'Cenário de apoio (em revisão técnica)',
      title: 'Puérpera que retornou da maternidade há 10 dias',
      context: 'Na visita à casa de Juliana (caso fictício), você descobre que o bebê nasceu há 10 dias. Ela conta que está com dúvidas sobre quando deve fazer a consulta pós-parto na UBS e ainda não avisou à equipe sobre a data do parto.',
      whatToObserve: [
        'Data do parto (há 10 dias — dentro do período do puerpério de até 42 dias e dos primeiros 30 dias do recém-nascido).',
        'Se a consulta puerperal e a 1ª consulta do bebê já foram agendadas.',
        'Bem-estar geral da mãe e do bebê e necessidade de atualização cadastral.'
      ],
      whatBelongsToAcs: [
        'Realizar e registrar a visita domiciliar no puerpério (até 42 dias após o término da gestação) e também a 1ª visita ao recém-nascido (C2).',
        'Informar à equipe a data do desfecho da gestação para registro adequado e agendamento da consulta puerperal.',
        'Atualizar o cadastro familiar e iniciar o acompanhamento da criança.'
      ],
      whenToCommunicateTeam: [
        'Logo após a visita, informando o nascimento/desfecho da gestação e solicitando agendamento da consulta de puerpério (até 42 dias) e puericultura (até 30 dias).'
      ],
      exactSource: 'Cartilha INDACS, pág. 4 • Nota Metodológica C3, Seção 3, itens 16-I, 16-J e 17 (pág. 2) e Seção 4, Quadro 05 (pág. 7).',
      question: 'Qual é a ação correta do ACS ao identificar que Juliana teve bebê há 10 dias?',
      options: [
        {
          id: 'a',
          text: 'Realizar a visita puerperal (dentro dos 42 dias), informar o desfecho da gestação à equipe para agendar a consulta pós-parto e iniciar o acompanhamento do bebê.',
          isCorrect: true,
          feedback: 'Exato! Conforme a Cartilha INDACS (pág. 4) e a Nota C3 (Quadro 01 e Quadro 05), o ACS realiza pelo menos 1 visita até 42 dias pós-parto, comunica o desfecho da gestação à equipe e já inicia o cuidado da criança (C2).'
        },
        {
          id: 'b',
          text: 'Explicar que após o parto o acompanhamento da gestante está encerrado e não há necessidade de nova consulta para a mãe.',
          isCorrect: false,
          feedback: 'Incorreto! O puerpério vai até 42 dias após o parto e exige pelo menos 1 consulta médica/enfermagem (Boa Prática I) e 1 visita domiciliar do ACS (Boa Prática J).'
        },
        {
          id: 'c',
          text: 'Dar alta clínica do pré-natal no prontuário e prescrever anticoncepcional para Juliana.',
          isCorrect: false,
          feedback: 'Incorreto! A consulta puerperal e a prescrição de métodos contraceptivos são atribuições clínicas de médicos e enfermeiros.'
        }
      ]
    }
  },
  {
    id: 'C4',
    code: 'C4',
    shortTitle: 'Pessoa com diabetes',
    fullTitle: 'Cuidado da Pessoa com Diabetes na APS',
    cartilhaTitle: 'Nota Metodológica C4 — Pessoa com Diabetes',
    icon: './assets/cartilha/icon-c4.png',
    illustration: './assets/cartilha/ilustracao-acs-mulher.png',
    cartilhaPageImg: './assets/cartilha/pagina-5.png',
    validationStatus: 'validado_prioritario',
    validationLabel: 'Conteúdo e Cenário Prioritários da Oficina (C4 Conferido)',
    summaryQuestion: 'Qual a função do ACS na Competência 4?',
    summaryAnswer: 'É realizar ao menos 2 visitas domiciliares por ano, com intervalo mínimo de 30 dias, e verificar o uso de medicamentos, sinais de alerta nos pés e faltas às consultas, comunicando riscos à equipe.',
    tags: [
      'diabetes', 'glicemia', 'açúcar no sangue', 'pé diabético', 'feridas', 'rachaduras',
      'pés', 'hemoglobina glicada', 'insulina', 'medicamentos', '30 dias', '12 meses', '2 visitas'
    ],
    directAcsGoal: {
      hasDirectVisitCount: true,
      badge: 'Boa Prática (D): ≥ 2 visitas em 12 meses (intervalo mín. 30 dias)',
      description: 'Meta direta do ACS: realizar pelo menos 02 (duas) visitas domiciliares nos últimos 12 meses, respeitando o intervalo mínimo de 30 (trinta) dias entre as visitas (20 pontos no indicador). Lembrete: duas visitas no ano com 30 dias de intervalo são o critério mínimo de pontuação, não o limite do cuidado comunitário.'
    },
    acsCompetencies: [
      'Realizar pelo menos 2 visitas domiciliares nos últimos 12 meses, respeitando o intervalo mínimo de 30 dias entre elas.',
      'Verificar se a pessoa permanece morando no território e atualizar endereço e telefone.',
      'Orientar sobre a importância da continuidade do acompanhamento na UBS (consultas a cada 6 meses e exames anuais).',
      'Identificar faltas às consultas ou exames e realizar busca ativa.',
      'Verificar o uso regular dos medicamentos prescritos.',
      'Perguntar sobre feridas, rachaduras, dormência ou alterações nos pés.',
      'Identificar dificuldades de locomoção ou acesso ao serviço de saúde.',
      'Comunicar imediatamente sinais de risco à equipe de saúde.',
      'Registrar corretamente a visita no MIVDT (preenchendo motivo da visita e desfecho).'
    ],
    calculationCriteria: {
      formula: 'Soma de 6 boas práticas (até 100 pontos por pessoa com diabetes): (A) ≥ 1 consulta médica/enfermagem nos últimos 6 meses (20 pts); (B) ≥ 1 aferição de PA nos últimos 6 meses (15 pts); (C) ≥ 1 registro simultâneo de peso e altura nos últimos 12 meses (15 pts); (D) ≥ 2 visitas domiciliares por ACS/TACS com intervalo mínimo de 30 dias nos últimos 12 meses (20 pts); (E) ≥ 1 registro de Hemoglobina Glicada solicitada/avaliada nos últimos 12 meses (15 pts); (F) ≥ 1 avaliação dos pés nos últimos 12 meses (15 pts).',
      parameters: 'Ótimo: > 75 e ≤ 100 | Bom: > 50 e ≤ 75 | Suficiente: > 25 e ≤ 50 | Regular: ≤ 25.',
      note: 'No MIVDT (Quadro 05, pág. 6), é obrigatório preencher o campo "motivo da visita" e o campo "desfecho".'
    },
    professionalBoundaries: {
      otherProfessionals: 'Exame clínico do pé diabético (Boa prática F, SIGTAP 03.01.04.009-5): realizado por Médicos, Enfermeiros, Farmacêuticos, Fisioterapeutas e Terapeutas Ocupacionais (Quadro 07, pág. 6). Solicitação/avaliação de Hemoglobina Glicada (Quadro 06): Médicos, Enfermeiros, Técnicos/Auxiliares/TACS (3222), Cirurgiões-dentistas e Nutricionistas. Aferição de PA (Quadro 03 e Rodapé 4, pág. 7): o CBO 5151-05 (ACS) foi retirado da contabilização deste procedimento.',
      notAcsRole: 'O ACS NÃO realiza o exame clínico diagnóstico do pé diabético (SIGTAP 03.01.04.009-5), NÃO faz desbridamento/curativos técnicos, NÃO solicita exames laboratoriais e NÃO altera doses de medicamentos ou insulina. Ao ACS cabe perguntar sobre feridas/rachaduras nos pés, verificar adesão e comunicar sinais de alerta à equipe!'
    },
    sources: {
      cartilha: 'Cartilha INDACS (Kalilka / PET Saúde Digital UFCG), página 5.',
      nota: 'Nota Metodológica C4 – Cuidado da Pessoa com Diabetes (SEI/MS nº 0055986848, 2026), Seção 3 (item 16, pág. 2) e Seção 4 (Quadros 01, 03, 04, 05, 06 e 07 e Notas de Rodapé 4 e 6, págs. 4 a 7).',
      reviewNote: 'Conteúdo prioritário conferido na Oficina INDACS 2.0 (validação Prof. Sales / equipe de saúde).'
    },
    scenario: {
      id: 'c4-cenario-1',
      isPriorityValidated: true,
      badge: 'Caso Interativo Prioritário C4 • Validado',
      title: 'Visita a moradora com diabetes que relata ferida no pé e parada de medicação',
      context: 'Você realiza uma visita domiciliar a Dona Severina (62 anos, caso fictício), acompanhada por diabetes na UBS. Você já havia feito uma visita há 10 dias, mas passou hoje para entregar um recado. Ela conta que parou de tomar o comprimido do diabetes há duas semanas porque "estava se sentindo bem", que não passa em consulta há 8 meses e comenta que surgiu uma rachadura com pequena ferida na planta do pé direito que ela quase não sente doer.',
      whatToObserve: [
        'Interrupção do uso regular dos medicamentos prescritos.',
        'Relato de ferida/rachadura no pé com perda de sensibilidade (sinal de alerta importante!).',
        'Atraso na consulta médica/enfermagem (há 8 meses sem consulta, quando o indicador prevê ao menos 1 consulta a cada 6 meses e avaliação anual dos pés).',
        'Intervalo entre visitas para fins do indicador: como a visita anterior foi há apenas 10 dias, esta segunda visita é essencial para o cuidado e busca ativa, mas para pontuar a 2ª visita da Boa Prática D no indicador é exigido intervalo mínimo de 30 dias em 12 meses.'
      ],
      whatBelongsToAcs: [
        'Perguntar sobre a ferida/rachadura nos pés e verificar o uso dos medicamentos (sem alterar doses nem prescrever pomadas/curativos).',
        'Orientar sobre a importância de manter o tratamento mesmo sem sintomas e não manipular a ferida em casa.',
        'Comunicar imediatamente o sinal de risco (ferida no pé + interrupção medicamentosa + consulta atrasada) à equipe de saúde (enfermeiro/médico) para avaliação clínica e exame do pé diabético.',
        'Registrar a visita no e-SUS APS (MIVDT) e manter o acompanhamento longitudinal (observando o intervalo mínimo de 30 dias entre visitas no ano).'
      ],
      whenToCommunicateTeam: [
        'Imediatamente! Ferida ou rachadura nos pés em pessoa com diabetes (especialmente sem dor) e abandono de medicação são sinais de risco que exigem avaliação clínica prioritária pela equipe.'
      ],
      exactSource: 'Cartilha INDACS, pág. 5 • Nota Metodológica C4, Seção 3, item 16 (pág. 2) e Seção 4, Quadro 01 (pág. 4), Quadro 05 (Visitas ACS com intervalo mín. de 30 dias, pág. 6) e Quadro 07 (Exame do pé diabético por profissionais clínicos habilitados, pág. 6).',
      question: 'Diante da situação de Dona Severina, qual é a decisão correta do ACS?',
      options: [
        {
          id: 'a',
          text: 'Realizar você mesmo o exame clínico do pé diabético para dar baixa no indicador, orientar uma pomada antibiótica e mandar ela voltar a tomar metade do comprimido.',
          isCorrect: false,
          feedback: 'Atenção aos limites normativos! O exame clínico do pé diabético (SIGTAP 03.01.04.009-5, Quadro 07 da Nota C4) é atribuição de médicos, enfermeiros, fisioterapeutas, farmacêuticos e terapeutas ocupacionais, e o ACS nunca prescreve pomadas nem ajusta doses de medicamentos.'
        },
        {
          id: 'b',
          text: 'Escutar e observar o relato da ferida no pé e da parada do remédio, orientar a continuidade do cuidado sem prescrever conduta, registrar a visita e comunicar imediatamente o sinal de risco à equipe para consulta e avaliação clínica dos pés.',
          isCorrect: true,
          feedback: 'Excelente decisão! Conforme a Cartilha INDACS (pág. 5) e a Nota Metodológica C4 (Quadros 05 e 07), cabe ao ACS perguntar sobre feridas/rachaduras nos pés, verificar o uso de medicamentos, realizar busca ativa de faltosos e comunicar imediatamente os sinais de risco à equipe, lembrando que para a pontuação da Boa Prática D são necessárias ao menos 2 visitas em 12 meses com intervalo mínimo de 30 dias.'
        },
        {
          id: 'c',
          text: 'Como você já visitou Dona Severina há 10 dias, ir embora sem registrar nem avisar a equipe, voltando apenas daqui a 20 dias para completar os 30 dias do indicador.',
          isCorrect: false,
          feedback: 'Cuidado! O intervalo mínimo de 30 dias é a regra de cálculo para pontuar a 2ª visita no indicador C4 (Quadro 05), mas nunca impede o ACS de agir diante de um sinal de risco real! Diante de ferida no pé e abandono de medicação, a comunicação à equipe deve ser imediata.'
        }
      ]
    }
  },
  {
    id: 'C5',
    code: 'C5',
    shortTitle: 'Pessoa com hipertensão',
    fullTitle: 'Cuidado da Pessoa com Hipertensão na APS',
    cartilhaTitle: 'Nota Metodológica C5 — Pessoa com Hipertensão',
    icon: './assets/cartilha/icon-c5.png',
    illustration: './assets/cartilha/ilustracao-acs-homem.png',
    cartilhaPageImg: './assets/cartilha/pagina-6.png',
    validationStatus: 'em_revisao_complementar',
    validationLabel: 'Cartilha + Nota C5 conferidas • Cenário interativo em revisão com equipe',
    summaryQuestion: 'Qual a função do ACS na Competência 5?',
    summaryAnswer: 'Realizar ao menos 2 visitas domiciliares por ano, com intervalo mínimo de 30 dias, verificando uso de medicamentos e abandono do cuidado, com busca ativa dos faltosos e comunicação de pendências à equipe.',
    tags: [
      'hipertensão', 'pressão alta', 'pa', 'remédio de pressão', 'abandono do cuidado',
      'faltosos', 'busca ativa', '30 dias', '12 meses', '2 visitas', 'locomoção'
    ],
    directAcsGoal: {
      hasDirectVisitCount: true,
      badge: 'Boa Prática (D): ≥ 2 visitas em 12 meses (intervalo mín. 30 dias)',
      description: 'Meta direta do ACS: realizar pelo menos 02 (duas) visitas domiciliares nos últimos 12 meses, respeitando o intervalo mínimo de 30 dias entre as visitas (25 pontos no indicador C5).'
    },
    acsCompetencies: [
      'Realizar pelo menos 2 visitas domiciliares nos últimos 12 meses, respeitando o intervalo mínimo de 30 dias entre as visitas.',
      'Orientar sobre a importância de manter o acompanhamento mesmo sem sintomas.',
      'Identificar abandono do cuidado e realizar busca ativa dos faltosos.',
      'Verificar se a pessoa está fazendo uso regular dos medicamentos prescritos.',
      'Identificar dificuldade de locomoção para ir até a UBS.',
      'Confirmar mudança de endereço ou território.',
      'Comunicar pendências e necessidades à equipe de saúde.',
      'Registrar corretamente as visitas domiciliares no e-SUS APS (MIVDT).'
    ],
    calculationCriteria: {
      formula: 'Soma de 4 boas práticas (25 pontos cada = até 100 pontos por pessoa com hipertensão): (A) ≥ 1 consulta médica/enfermagem nos últimos 6 meses (25 pts); (B) ≥ 1 registro de aferição de pressão arterial nos últimos 6 meses (25 pts); (C) ≥ 1 registro simultâneo de peso e altura nos últimos 12 meses (25 pts); (D) ≥ 2 visitas domiciliares por ACS/TACS com intervalo mínimo de 30 dias nos últimos 12 meses (25 pts).',
      parameters: 'Ótimo: > 75 e ≤ 100 | Bom: > 50 e ≤ 75 | Suficiente: > 25 e ≤ 50 | Regular: ≤ 25.',
      note: 'Pessoas com condição marcada como "resolvida" ou "mudança de território" saem do denominador.'
    },
    professionalBoundaries: {
      otherProfessionals: 'Consultas (Boa prática A): Médicos e Enfermeiros (Quadro 02). Aferição de pressão arterial (Boa prática B, SIGTAP 03.01.10.003-9, Quadro 03): Médicos, Enfermeiros, Técnicos/Auxiliares de Enfermagem e TACS (CBO 3222), Dentistas, Farmacêuticos, Fisioterapeutas, Nutricionistas, Profissionais de Educação Física, Terapeutas Ocupacionais e TSB.',
      notAcsRole: 'Atenção à Nota de Rodapé 4 da Nota Metodológica C5 (pág. 6): o CBO 5151-05 (Agente Comunitário de Saúde) foi RETIRADO do Quadro 03 de aferição de pressão arterial para pontuação do indicador (permanecendo no Quadro 04 de peso/altura e no Quadro 05 de visitas domiciliares). O ACS também não altera receitas nem suspende anti-hipertensivos.'
    },
    sources: {
      cartilha: 'Cartilha INDACS (Kalilka / PET Saúde Digital UFCG), página 6.',
      nota: 'Nota Metodológica C5 – Cuidado da Pessoa com Hipertensão (SEI/MS nº 0056042518, 2026), Seção 3 (item 16, pág. 2) e Seção 4 (Quadros 01 a 05 e Nota de Rodapé 4, págs. 4 a 6).',
      reviewNote: 'Conferência técnica: Prof. Sales e equipe de saúde da UBS.'
    },
    scenario: {
      id: 'c5-cenario-1',
      isPriorityValidated: false,
      badge: 'Cenário de apoio (em revisão técnica)',
      title: 'Morador com hipertensão que parou o remédio por se sentir bem',
      context: 'Durante a 2ª visita do ano a Seu Roberto (58 anos, caso fictício), realizada 45 dias após a visita anterior, ele conta que parou de tomar o remédio de pressão porque "não sente mais dor de cabeça na nuca" e não foi à consulta do último semestre.',
      whatToObserve: [
        'Abandono do uso contínuo do medicamento anti-hipertensivo.',
        'Falta à consulta semestral e aferição de pressão arterial na UBS.',
        'Se há dificuldade de locomoção ou dúvida sobre a receita.'
      ],
      whatBelongsToAcs: [
        'Orientar que a hipertensão geralmente é silenciosa e o acompanhamento deve continuar mesmo sem sintomas.',
        'Realizar a busca ativa e comunicar a pendência (abandono medicamentoso e consulta atrasada) à equipe.',
        'Registrar a visita domiciliar no MIVDT (que cumpre o intervalo mínimo de 30 dias).'
      ],
      whenToCommunicateTeam: [
        'Comunicar à equipe de saúde o abandono do tratamento e a ausência de consulta/aferição de PA nos últimos 6 meses.'
      ],
      exactSource: 'Cartilha INDACS, pág. 6 • Nota Metodológica C5, Seção 4, Quadro 01 e Quadro 05 (págs. 4 e 5).',
      question: 'Qual orientação cabe ao ACS na visita a Seu Roberto?',
      options: [
        {
          id: 'a',
          text: 'Orientar que o acompanhamento da hipertensão deve continuar mesmo sem sintomas, registrar a visita e comunicar o abandono do cuidado à equipe para reagendar consulta e aferição de PA.',
          isCorrect: true,
          feedback: 'Correto! Conforme a Cartilha INDACS (pág. 6), o ACS orienta sobre a continuidade do cuidado mesmo sem sintomas, identifica o abandono do tratamento, realiza busca ativa e comunica à equipe.'
        },
        {
          id: 'b',
          text: 'Confirmar que se ele não sente dor de cabeça a pressão está curada e suspender o medicamento até o próximo ano.',
          isCorrect: false,
          feedback: 'Incorreto! A hipertensão é uma condição crônica frequentemente assintomática e o ACS nunca suspende medicamentos.'
        },
        {
          id: 'c',
          text: 'Prescrever um novo anti-hipertensivo mais fraco para ele tomar apenas em dias alternados.',
          isCorrect: false,
          feedback: 'Fora das atribuições do ACS! A prescrição e o ajuste medicamentoso são atos privativos de profissionais prescritores.'
        }
      ]
    }
  },
  {
    id: 'C6',
    code: 'C6',
    shortTitle: 'Pessoa idosa',
    fullTitle: 'Cuidado Integral à Pessoa Idosa na APS',
    cartilhaTitle: 'Nota Metodológica C6 — Pessoa Idosa',
    icon: './assets/cartilha/icon-c6.png',
    illustration: './assets/cartilha/ilustracao-acs-mulher.png',
    cartilhaPageImg: './assets/cartilha/pagina-7.png',
    validationStatus: 'em_revisao_complementar',
    validationLabel: 'Cartilha + Nota C6 conferidas • Cenário interativo em revisão com equipe',
    summaryQuestion: 'Qual a função do ACS na Competência 6?',
    summaryAnswer: 'É realizar ao menos 2 visitas domiciliares por ano, com intervalo mínimo de 30 dias, identificar os riscos de quedas, isolamento e pessoas acamadas, verificando cuidador e vacinação, além de comunicar as vulnerabilidades à equipe.',
    tags: [
      'idosa', 'idoso', '60 anos', 'quedas', 'acamado', 'domiciliado', 'cuidador',
      'isolamento', 'abandono', 'vacina gripe', 'influenza', '30 dias', '12 meses'
    ],
    directAcsGoal: {
      hasDirectVisitCount: true,
      badge: 'Boa Prática (C): ≥ 2 visitas em 12 meses (intervalo mín. 30 dias)',
      description: 'Meta direta do ACS: para cada pessoa com 60 anos ou mais, realizar pelo menos 02 (duas) visitas domiciliares nos últimos 12 meses, respeitando o intervalo mínimo de 30 dias entre as visitas (25 pontos no indicador C6).'
    },
    acsCompetencies: [
      'Realizar pelo menos 2 visitas domiciliares nos últimos 12 meses, respeitando o intervalo mínimo de 30 dias entre as visitas.',
      'Atualizar o cadastro e verificar se a pessoa idosa continua residindo no território.',
      'Identificar dificuldade de locomoção.',
      'Observar fatores de risco de quedas no domicílio.',
      'Identificar situação de abandono ou isolamento social.',
      'Verificar a presença e sobrecarga de cuidador.',
      'Identificar pessoas idosas acamadas ou domiciliadas.',
      'Verificar o uso dos medicamentos e conferir a situação vacinal (especialmente a vacina anual contra influenza/gripe).',
      'Comunicar vulnerabilidades à equipe para organização do cuidado domiciliar ou na UBS.'
    ],
    calculationCriteria: {
      formula: 'Soma de 4 boas práticas (25 pontos cada = até 100 pontos para pessoas com ≥ 60 anos): (A) ≥ 1 consulta médica/enfermagem nos últimos 12 meses (25 pts); (B) ≥ 1 registro simultâneo (no mesmo dia) de peso e altura nos últimos 12 meses (25 pts); (C) ≥ 2 visitas domiciliares por ACS/TACS com intervalo mínimo de 30 dias nos últimos 12 meses (25 pts); (D) registro de 1 dose da vacina contra influenza nos últimos 12 meses (25 pts).',
      parameters: 'Ótimo: > 75 e ≤ 100 | Bom: > 50 e ≤ 75 | Suficiente: > 25 e ≤ 50 | Regular: ≤ 25.',
      note: 'Inclui todas as pessoas vinculadas à equipe com idade igual ou superior a 60 anos no período.'
    },
    professionalBoundaries: {
      otherProfessionals: 'Consultas anuais presenciais/remotas ou domiciliares (Boa prática A): Médicos e Enfermeiros (Quadro 02). Vacinação contra influenza (Boa prática D): equipe de vacinação habilitada na APS (Quadro 05). Avaliação antropométrica de peso e altura no mesmo dia (Boa prática B, Quadro 03): Médicos, Enfermeiros, Técnicos/Auxiliares/TACS, ACS (CBO 5151-05) e equipe multiprofissional.',
      notAcsRole: 'O ACS NÃO realiza consulta clínica geriátrica, NÃO aplica vacinas e NÃO altera prescrições; seu olhar territorial identifica precocemente risco de quedas, isolamento, restrição ao leito e necessidade de visita clínica domiciliar.'
    },
    sources: {
      cartilha: 'Cartilha INDACS (Kalilka / PET Saúde Digital UFCG), página 7.',
      nota: 'Nota Metodológica C6 – Cuidado da Pessoa Idosa (SEI/MS nº 0056053813, 2026), Seção 3 (itens 5, 16 e 27, págs. 1 a 3) e Seção 4 (Quadros 01 a 05, págs. 4 e 5).',
      reviewNote: 'Conferência técnica: Prof. Sales e equipe de saúde da UBS.'
    },
    scenario: {
      id: 'c6-cenario-1',
      isPriorityValidated: false,
      badge: 'Cenário de apoio (em revisão técnica)',
      title: 'Idoso com dificuldade de locomoção, tapetes soltos e vacina da gripe atrasada',
      context: 'Em visita a Seu Antônio (74 anos, caso fictício), que mora sozinho, você nota que ele está caminhando com muita dificuldade após um tropeço no tapete da sala, não conseguiu ir à UBS tomar a vacina anual contra a gripe (influenza) e não passa em consulta há mais de um ano.',
      whatToObserve: [
        'Risco de quedas no ambiente domiciliar e dificuldade de locomoção.',
        'Situação de morar sozinho / ausência de cuidador (vulnerabilidade e isolamento).',
        'Atraso na vacina anual contra influenza e na consulta anual com médico/enfermeiro.'
      ],
      whatBelongsToAcs: [
        'Observar o risco de quedas e conversar de forma acolhedora sobre cuidados no ambiente.',
        'Conferir a situação vacinal (influenza) e o uso dos medicamentos.',
        'Registrar a visita domiciliar e comunicar as vulnerabilidades (dificuldade de locomoção, risco de queda, falta de cuidador e vacina/consulta pendentes) à equipe para planejar o atendimento domiciliar.'
      ],
      whenToCommunicateTeam: [
        'Logo após a visita, para que a equipe organize a vacinação e o atendimento domiciliar ou compartilhado.'
      ],
      exactSource: 'Cartilha INDACS, pág. 7 • Nota Metodológica C6, Seção 3, item 16 e item 27 (págs. 1 a 3) e Seção 4, Quadro 01 e Quadro 04 (págs. 4 e 5).',
      question: 'Qual é o papel do ACS ao identificar essas vulnerabilidades na casa de Seu Antônio?',
      options: [
        {
          id: 'a',
          text: 'Observar o risco de quedas e isolamento, conferir a situação vacinal e medicamentos, registrar a visita e comunicar as vulnerabilidades à equipe para viabilizar o cuidado e a vacinação.',
          isCorrect: true,
          feedback: 'Perfeito! A Cartilha INDACS (pág. 7) e a Nota Metodológica C6 destacam exatamente esse papel protagonista do ACS: observar risco de quedas, isolamento, presença de cuidador, dificuldade de locomoção e vacinação, comunicando à equipe.'
        },
        {
          id: 'b',
          text: 'Apenas cobrar que ele vá sozinho até a UBS na semana seguinte para não prejudicar a nota da equipe.',
          isCorrect: false,
          feedback: 'Incorreto! Pessoas idosas restritas ao domicílio ou com dificuldade importante de locomoção necessitam que o ACS comunique a vulnerabilidade à equipe para organizar o cuidado seguro.'
        },
        {
          id: 'c',
          text: 'Suspender os remédios que possam dar tontura por conta própria.',
          isCorrect: false,
          feedback: 'Incorreto! Qualquer revisão medicamentosa é atribuição clínica da equipe médica/farmacêutica/enfermagem.'
        }
      ]
    }
  },
  {
    id: 'C7',
    code: 'C7',
    shortTitle: 'Mulher na prevenção do câncer',
    fullTitle: 'Cuidado da Mulher e do Homem Transgênero na Prevenção do Câncer',
    cartilhaTitle: 'Nota Metodológica C7 — Mulher na Prevenção do Câncer',
    icon: './assets/cartilha/icon-c7.png',
    illustration: './assets/cartilha/ilustracao-acs-homem.png',
    cartilhaPageImg: './assets/cartilha/pagina-8.png',
    cartilhaPageImg2: './assets/cartilha/pagina-9.png',
    validationStatus: 'em_revisao_complementar',
    validationLabel: 'Cartilha (págs. 8–9) + Nota C7 conferidas • Cenário em revisão',
    summaryQuestion: 'Qual a função do ACS na Competência 7?',
    summaryAnswer: 'É identificar, orientar e fazer busca ativa em públicos específicos: meninas de 9 a 14 anos para vacinação de HPV, pessoas de 14 a 69 anos em saúde sexual e reprodutiva, e rastreamento de colo de útero (25 a 64 anos) e câncer de mama (50 a 69 anos) atrasados, sempre comunicando pendências à equipe.',
    tags: [
      'mulher', 'câncer', 'preventivo', 'citopatológico', 'colo do útero', 'mama', 'mamografia',
      'hpv', 'vacina hpv', '9 a 14 anos', '25 a 64 anos', '50 a 69 anos', '14 a 69 anos',
      'saúde sexual e reprodutiva', 'homem transgênero', 'transgênero'
    ],
    directAcsGoal: {
      hasDirectVisitCount: false,
      badge: 'Sem nº fixo de visitas • Foco em Identificação, Orientação e Busca Ativa',
      description: 'A Nota Metodológica C7 NÃO estabelece uma quantidade específica de visitas domiciliares do ACS para este indicador. A atuação direta do ACS está concentrada em identificação por faixa etária, orientação acolhedora e busca ativa respeitosa e sigilosa.'
    },
    acsCompetencies: [
      'Meninas de 9 a 14 anos: identificar todas as meninas da microárea, verificar a situação vacinal contra HPV, orientar pais/responsáveis e realizar busca ativa das não vacinadas.',
      'Pessoas de 14 a 69 anos (mulheres e homens transgênero): orientar sobre saúde sexual e reprodutiva, identificar quem necessita de atendimento e comunicar/encaminhar à equipe.',
      'Mulheres e homens transgêneros de 25 a 64 anos: identificar quem está com rastreamento do câncer do colo do útero atrasado, realizar busca ativa respeitosa e sigilosa e orientar sobre a importância do acompanhamento.',
      'Mulheres e homens transgêneros de 50 a 69 anos: identificar quem está com rastreamento do câncer de mama atrasado, orientar sobre o acompanhamento, verificar dificuldades de acesso e comunicar as pendências à equipe.',
      'Compreender e respeitar a identidade de gênero: pessoa transgênero é aquela que se identifica com um gênero diferente daquele que lhe foi atribuído ao nascer (Cartilha INDACS, pág. 9).'
    ],
    calculationCriteria: {
      formula: 'Soma ponderada de 4 boas práticas por faixa etária (até 100 pontos): (A) 25 a 64 anos: ≥ 1 exame de rastreamento de câncer do colo do útero nos últimos 36 meses, ou 60 meses para teste molecular de HPV (peso 20); (B) 9 a 14 anos (sexo feminino): ≥ 1 dose da vacina HPV (peso 30); (C) 14 a 69 anos: ≥ 1 atendimento presencial/remoto sobre saúde sexual e reprodutiva nos últimos 12 meses (peso 30); (D) 50 a 69 anos: ≥ 1 exame de rastreamento para câncer de mama (mamografia) solicitado/avaliado nos últimos 24 meses (peso 20).',
      parameters: 'Ótimo: > 75 e ≤ 100 | Bom: > 50 e ≤ 75 | Suficiente: > 25 e ≤ 50 | Regular: ≤ 25.',
      note: 'Elegibilidade no denominador (Seção 4, item 4.1 da Nota C7): pessoas de 9 a 69 anos com registro de sexo feminino OU registro de sexo masculino com identidade de gênero "Homem transgênero".'
    },
    professionalBoundaries: {
      otherProfessionals: 'Coleta de exame citopatológico/molecular do colo do útero (Quadro 02), consultas de saúde sexual e reprodutiva (Quadro 04) e solicitação/avaliação de mamografia (Quadro 05) são realizadas por Médicos e Enfermeiros. Vacinação contra HPV (Quadro 03): equipe de vacinação habilitada.',
      notAcsRole: 'O ACS NÃO solicita mamografia, NÃO coleta preventivo e NÃO expõe a intimidade dos usuários; sua busca ativa deve ser sempre respeitosa e sigilosa.'
    },
    sources: {
      cartilha: 'Cartilha INDACS (Kalilka / PET Saúde Digital UFCG), páginas 8 e 9.',
      nota: 'Nota Metodológica C7 – Cuidado da Mulher na Prevenção do Câncer (SEI/MS nº 0054641718, 2026), Seção 3 (item 16, pág. 2) e Seção 4 (itens 4.1 a 4.5 e Quadros 01 a 05, págs. 5 e 6).',
      reviewNote: 'Conferência técnica: Prof. Sales e equipe de saúde da UBS.'
    },
    scenario: {
      id: 'c7-cenario-1',
      isPriorityValidated: false,
      badge: 'Cenário de apoio (em revisão técnica)',
      title: 'Busca ativa por faixas etárias na mesma família',
      context: 'Em visita domiciliar à família de Dona Marta (54 anos, caso fictício), ela mora com sua filha Carla (29 anos) e sua neta Beatriz (11 anos). Dona Marta diz que faz mais de 3 anos que não faz mamografia, Carla nunca fez o exame preventivo do colo do útero e a neta Beatriz ainda não tomou a vacina contra o HPV.',
      whatToObserve: [
        'Beatriz (11 anos): está na faixa de 9 a 14 anos para vacina contra o HPV (dose única).',
        'Carla (29 anos): está na faixa de 25 a 64 anos para rastreamento do câncer do colo do útero (a cada 36 meses) e de 14 a 69 anos para saúde sexual e reprodutiva.',
        'Dona Marta (54 anos): está na faixa de 50 a 69 anos para rastreamento do câncer de mama (nos últimos 24 meses) e também de 25 a 64 anos para colo do útero.'
      ],
      whatBelongsToAcs: [
        'Orientar a família sobre a vacina contra HPV para a menina de 11 anos e realizar busca ativa.',
        'Orientar de forma respeitosa e sigilosa sobre o rastreamento do colo do útero (25–64 anos) e de mama (50–69 anos), verificando dificuldades de acesso.',
        'Comunicar e encaminhar as pendências das três faixas etárias à equipe da UBS.'
      ],
      whenToCommunicateTeam: [
        'Comunicar à equipe as pendências identificadas para agendamento de vacinação, coleta de citopatológico/atendimento em saúde sexual e reprodutiva e solicitação/avaliação de mamografia.'
      ],
      exactSource: 'Cartilha INDACS, págs. 8 e 9 • Nota Metodológica C7, Seção 3, item 16 (pág. 2) e Seção 4, Quadro 01 (pág. 5).',
      question: 'De acordo com a Cartilha INDACS e a Nota C7, como funciona a meta do ACS neste indicador?',
      options: [
        {
          id: 'a',
          text: 'A Nota C7 não fixa um número específico de visitas domiciliares do ACS; a atuação direta do ACS foca em identificar os públicos por faixa etária (9–14, 14–69, 25–64 e 50–69 anos), orientar com respeito e sigilo, fazer busca ativa e comunicar pendências à equipe.',
          isCorrect: true,
          feedback: 'Exatamente! Como destaca a página 8 da Cartilha INDACS, a Nota Metodológica C7 não estabelece uma quantidade específica de visitas domiciliares do ACS para pontuação, concentrando a atuação do ACS em identificação, orientação e busca ativa nas quatro faixas prioritárias.'
        },
        {
          id: 'b',
          text: 'O ACS precisa realizar obrigatoriamente 4 visitas por mês para cada mulher para que o indicador pontue no sistema.',
          isCorrect: false,
          feedback: 'Incorreto! Diferentemente de C2, C3, C4, C5 e C6, a Nota Metodológica C7 não tem uma boa prática de contagem de visitas domiciliares no cálculo, mas depende diretamente da busca ativa do ACS para que as usuárias e homens transgênero acessem a vacina HPV, as consultas e os exames.'
        },
        {
          id: 'c',
          text: 'O próprio ACS preenche a requisição de mamografia no domicílio para agilizar a fila.',
          isCorrect: false,
          feedback: 'Incorreto! A solicitação e avaliação de mamografia (Quadro 05 da Nota C7) são privativas de médicos e enfermeiros.'
        }
      ]
    }
  }
];

export const INTENTION_SUGGESTIONS = [
  'Escutar com calma antes de orientar',
  'Lembrar que meu papel tem limites seguros',
  'Olhar com carinho para as crianças e idosos da microárea',
  'Não levar o peso de tudo sozinho(a) — conversar com a equipe',
  'Reconhecer o valor de cada conversa na calçada',
  'Ir um passo de cada vez hoje'
];

export const LIMITATIONS_AND_CONTINGENCY = {
  prototypeNature: 'Protótipo educativo cocriado na Oficina INDACS 2.0 (GAT 8 / PET Saúde Digital – UFCG). Não substitui normas do Ministério da Saúde, supervisão profissional da equipe de saúde nem os sistemas oficiais do SUS (PEC / e-SUS APS / e-SUS Território).',
  scopeSeparation: {
    indacs2: 'INDACS 2.0 responde: "O que compete a mim (ACS) nesta situação e qual é a fonte normativa?"',
    anjoAcs: 'Anjo ACS (projeto distinto) responde: "Como superar esta dificuldade comunicacional ou emocional no território?" (Não duplicamos o assistente conversacional aqui).'
  },
  incompleteOrInReviewFeatures: [
    {
      item: 'Cenários interativos de C1, C3, C5, C6 e C7',
      status: 'Em revisão técnica complementar',
      detail: 'Os cenários de C2 (Desenvolvimento Infantil) e C4 (Diabetes) foram priorizados e validados para o teste exploratório. Os demais 5 cenários estão incluídos como apoio e sinalizados para conferência adicional com o Prof. Sales e equipe de saúde.'
    },
    {
      item: 'Integração com e-SUS APS / Prontuário Eletrônico',
      status: 'Não faz parte do escopo (Protótipo 100% educativo e desvinculado)',
      detail: 'O aplicativo não possui backend, login, banco de dados externo nem sincronização com o e-SUS APS. Nenhum dado de paciente (nome, CPF, CNS, endereço ou foto) é coletado ou transmitido.'
    },
    {
      item: 'Uso de Inteligência Artificial em tempo de execução',
      status: 'Desativado por princípio de segurança',
      detail: 'Nenhuma API de IA generativa é chamada durante o uso pelo ACS, evitando alucinações clínicas, custos de API ou dependência de internet para respostas.'
    },
    {
      item: 'Armazenamento em aparelhos compartilhados da UBS',
      status: 'Atenção operacional (Modo Demonstração disponível)',
      detail: 'O calendário "Jornadas que Cuidam" usa apenas localStorage do navegador. Em tablets ou celulares compartilhados por vários ACS na UBS, recomenda-se ativar o "Modo Demonstração (Aparelho Compartilhado)" no topo do calendário ou usar o botão "Apagar registros" ao final do turno.'
    }
  ],
  contingencyPlan: {
    primary: 'Execução local via Vite/React (npm run dev / npm run build) ou publicação estática gratuita (GitHub Pages / Vercel / Netlify).',
    backupFile: 'Arquivo único autocontido "contingencia-offline.html" na pasta public/ (e na raiz do projeto) que abre diretamente com duplo-clique em qualquer navegador de celular, tablet ou notebook mesmo sem internet, sem Node.js e sem servidor.'
  },
  exploratoryTestScript: {
    date: 'Segunda-feira, 09/11/2026, às 8h, na UBS (n = 2 ACS)',
    ethicsNote: 'Avaliação exploratória com consentimento para participação e registro observacional. Explicar claramente que o PRODUTO está sendo avaliado, nunca o desempenho do trabalhador.',
    tasks: [
      {
        step: 1,
        task: 'Localizar orientação de desenvolvimento infantil (C2).',
        measures: 'Tempo, acerto, caminhos utilizados (busca ou cartão), pedidos de ajuda.'
      },
      {
        step: 2,
        task: 'Encontrar informação sobre acompanhamento de diabetes (C4).',
        measures: 'Compreensão do intervalo de 30 dias em 12 meses, confiança na fonte, clareza sobre limites de atribuição (exame do pé vs. perguntar sobre feridas).'
      },
      {
        step: 3,
        task: 'Responder à pergunta interativa nos cenários C2 e C4.',
        measures: 'Interpretação do feedback pedagógico, eventuais confusões de linguagem.'
      },
      {
        step: 4,
        task: 'Marcar o X no calendário "Jornadas que Cuidam" e conhecer a intenção para a próxima jornada (opcional).',
        measures: 'Sentido afetivo atribuído ao X, conforto, percepção de ausência de cobrança, interesse em retorno.'
      }
    ],
    closingQuestions: [
      'Em que situação da sua rotina você usaria isto?',
      'O que ficou confuso ou difícil de ler?',
      'Esse X teria algum significado pessoal para você ou pareceria mais uma tarefa/cobrança?',
      'Você gostaria de encontrar uma intenção sua quando voltasse ao aplicativo em outro dia?'
    ]
  }
};

