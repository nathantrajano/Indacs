export const APP_METADATA = {
  title: 'Indacs',
  subtitle: 'Cartilha interativa dos indicadores de qualidade da Atenção Primária à Saúde para Agentes Comunitários de Saúde',
  project: 'PET SAÚDE DIGITAL | UFCG',
  municipality: 'SECRETARIA DA SAÚDE DE CAMPINA GRANDE - PB',
  authors: {
    designAndContent: 'Kalilka (Design, ilustrações originais, linguagem simples e experiência)',
    implementation: 'Nathan (Computação, arquitetura web, armazenamento local e testes)',
    facilitation: 'Prof. Marcelo Barros (Facilitação pedagógica e cocriação)',
    technicalValidation: 'Prof. Sales e equipe de saúde da UBS (Validação técnica e normativa)'
  },
  version: '2.0.0',
  principle: 'Cada dia vivido merece reconhecimento. Cada novo dia merece a liberdade de recomeçar.'
};

export const ROUTINE_SEARCH_CHIPS = [
  { label: 'Recém-nascido (30 dias)', query: 'recém-nascido 30 dias' },
  { label: 'Pé diabético / feridas', query: 'feridas pés diabetes' },
  { label: 'Vacina criança / HPV', query: 'vacina' },
  { label: 'Pressão alta', query: 'pressão hipertensão' },
  { label: 'Gestante / Puerpério', query: 'gestante puerpério' },
  { label: 'Pessoa idosa / Quedas', query: 'idosa quedas acamadas' },
  { label: 'Faltosos / Busca ativa', query: 'faltosos busca ativa' }
];

export const INDICATORS = [
  {
    id: 'C1',
    code: 'C1',
    shortTitle: 'Mais acesso',
    fullTitle: 'Mais Acesso à Atenção Primária à Saúde (APS)',
    cartilhaHeaderTitle: 'Nota Metodológica C1',
    cartilhaHeaderSubtitle: 'Mais acesso à APS',
    icon: './assets/cartilha/icon-c1.png',
    illustration: './assets/cartilha/ilustracao-acs-homem.png',
    cartilhaPageImg: './assets/cartilha/pagina-2.png',
    validationStatus: 'em_revisao_complementar',
    summaryQuestion: 'Qual a função do ACS na Competência 1?',
    summaryAnswer: 'O ACS é responsável por organizar o acesso no território, identificar pendências e aproximar o usuário da equipe.',
    tags: [
      'acesso', 'demanda programada', 'demanda espontânea', 'faltosos', 'busca ativa',
      'consulta agendada', 'cadastro', 'endereço', 'telefone', 'acompanhamento atrasado'
    ],
    cartilhaSections: {
      singleList: [
        'Identificar pessoas com acompanhamento atrasado',
        'Organizar a relação de faltosos.',
        'Realizar busca ativa.',
        'Orientar sobre consultas programadas.',
        'Comunicar à equipe as necessidades encontradas.',
        'Confirmar se o usuário conseguiu acessar o serviço.',
        'Atualizar endereço, telefone e situação territorial.',
        'Orientar que o acompanhamento deve continuar mesmo sem sintomas'
      ]
    },
    directAcsGoal: {
      hasDirectVisitCount: false,
      badge: 'Apoio territorial ao acesso programado',
      description: 'Organizar o acesso no território, identificar pendências, orientar sobre consultas programadas e realizar busca ativa de faltosos.'
    },
    acsCompetencies: [
      'Identificar pessoas com acompanhamento atrasado',
      'Organizar a relação de faltosos.',
      'Realizar busca ativa.',
      'Orientar sobre consultas programadas.',
      'Comunicar à equipe as necessidades encontradas.',
      'Confirmar se o usuário conseguiu acessar o serviço.',
      'Atualizar endereço, telefone e situação territorial.',
      'Orientar que o acompanhamento deve continuar mesmo sem sintomas'
    ],
    calculationCriteria: {
      formula: 'Numerador: Nº total de atendimentos por demanda programada (consulta agendada programada, cuidado continuado e consulta agendada) ÷ Denominador: Nº total de atendimentos por todos os tipos de demandas (espontâneas + programadas).',
      parameters: 'Ótimo: > 50% e ≤ 70% | Bom: > 30% e ≤ 50% | Suficiente: > 10% e ≤ 30% | Regular: ≤ 10% ou > 70%.',
      note: 'Critério de indicador de equipe (INE). Não representa meta de produtividade individual do ACS.'
    },
    professionalBoundaries: {
      otherProfessionals: 'Médicos (CBO 2251-42, 2251-70, 2251-30, 2251-25, 2252-50) e Enfermeiros (CBO 2235-65, 2235-05) registram os Atendimentos Individuais (MIAI) que entram na fórmula do indicador C1.',
      notAcsRole: 'O ACS NÃO realiza classificação de risco clínico, NÃO tria urgências médicas no domicílio e NÃO substitui a escuta inicial clínica de enfermagem/medicina na UBS.'
    },
    sources: {
      cartilha: 'Cartilha INDACS (Kalilka / PET Saúde Digital UFCG), página 2.',
      nota: 'Nota Metodológica C1 – Mais Acesso (SEI/MS nº 0054814890, 2026), Seção 3 (itens 4, 5, 23, 24 e 30) e Seção 4 (Quadro 01, págs. 1 a 3).'
    },
    scenario: {
      id: 'c1-cenario-1',
      isPriorityValidated: false,
      badge: 'Situação prática C1',
      title: 'Morador que só procura a UBS quando passa mal',
      context: 'Durante visita na microárea, Seu Joaquim (situação fictícia) comenta que deixou de ir às consultas agendadas porque "não está sentindo dor nenhuma" e prefere ir à UBS apenas quando sente tontura.',
      whatToObserve: [
        'Se o morador está com consultas programadas em atraso ou faltou ao último agendamento.',
        'Se os dados de telefone e endereço estão atualizados no cadastro.',
        'Se há sintomas agudos no momento da visita que exijam avaliação no mesmo dia.'
      ],
      whatBelongsToAcs: [
        'Orientar que o acompanhamento deve continuar mesmo sem sintomas.',
        'Atualizar telefone/endereço e incluir na relação de busca ativa de faltosos.',
        'Comunicar à equipe as necessidades encontradas para apoiar o agendamento.'
      ],
      whenToCommunicateTeam: [
        'Quando identificar faltosos recorrentes ou barreiras de acesso para agendamento.',
        'Imediatamente, caso o morador apresente queixa aguda no momento da visita.'
      ],
      exactSource: 'Cartilha INDACS, pág. 2 • Nota Metodológica C1, Seção 3, item 5 (pág. 1).',
      question: 'Diante da fala de Seu Joaquim de que "só vai ao posto quando sente dor", qual é a conduta adequada do ACS?',
      options: [
        {
          id: 'a',
          text: 'Orientar que o acompanhamento programado deve continuar mesmo sem sintomas, atualizar o contato e comunicar à equipe para apoiar o agendamento.',
          isCorrect: true,
          feedback: 'Correto! Conforme a Cartilha INDACS (pág. 2) e a Nota Metodológica C1, o ACS aproxima o usuário da equipe, orienta sobre a continuidade do cuidado mesmo sem sintomas e realiza busca ativa de faltosos.'
        },
        {
          id: 'b',
          text: 'Dizer que ele está certo em só procurar a UBS quando tiver sintomas fortes.',
          isCorrect: false,
          feedback: 'Atenção: o cuidado continuado (demanda programada) acompanha ciclos de vida e condições crônicas antes que surjam crises agudas. A Cartilha C1 orienta explicar que o acompanhamento deve continuar mesmo sem sintomas.'
        },
        {
          id: 'c',
          text: 'Avaliar clinicamente a tontura no domicílio e dispensar a consulta médica.',
          isCorrect: false,
          feedback: 'Fora do limite de atuação do ACS! Avaliar sintomas clínicos ou dispensar acompanhamento médico/enfermagem é atribuição clínica.'
        }
      ]
    }
  },
  {
    id: 'C2',
    code: 'C2',
    shortTitle: 'Desenvolvimento infantil',
    fullTitle: 'Cuidado no Desenvolvimento Infantil na APS',
    cartilhaHeaderTitle: 'Nota Metodológica C2',
    cartilhaHeaderSubtitle: 'Desenvolvimento Infantil',
    icon: './assets/cartilha/icon-c2.png',
    illustration: './assets/cartilha/ilustracao-acs-mulher.png',
    cartilhaPageImg: './assets/cartilha/pagina-3.png',
    validationStatus: 'validado_prioritario',
    summaryQuestion: 'Qual a função do ACS na competência 2?',
    summaryAnswer: 'É acompanhar as crianças até 2 anos com visitas domiciliares nos prazos certos, checando vacinação e cadastro, orientando a família e avisando a equipe sobre faltas ou riscos.',
    tags: [
      'criança', 'bebê', 'recém-nascido', 'puericultura', '30 dias', '6 meses', '2 anos',
      'vacina', 'caderneta da criança', 'peso', 'altura', 'pentavalente', 'vip', 'pólio',
      'pneumo', 'sarampo', 'desenvolvimento infantil', 'aleitamento'
    ],
    cartilhaSections: {
      topTitle: 'Para cada criança de até 2 anos:',
      topItems: [
        'Realizar a primeira visita domiciliar até o 30º dia de vida.',
        'Realizar a segunda visita domiciliar até os 6 meses de vida.'
      ],
      columnsTitle: 'Durante as visitas:',
      leftColumn: [
        'Identificar o nascimento.',
        'Atualizar o cadastro da criança.',
        'Verificar se a criança está sendo acompanhada.',
        'Conferir a situação vacinal.',
        'Orientar a família.'
      ],
      rightColumn: [
        'Identificar faltas e dificuldades de acesso.',
        'Comunicar situações de risco à equipe.',
        'Realizar busca ativa dos faltosos.'
      ]
    },
    directAcsGoal: {
      hasDirectVisitCount: true,
      badge: 'Para cada criança de até 2 anos: 1ª visita até 30 dias e 2ª visita até 6 meses',
      description: 'Realizar a primeira visita domiciliar até o 30º dia de vida e a segunda visita domiciliar até os 6 meses de vida.'
    },
    acsCompetencies: [
      'Realizar a primeira visita domiciliar até o 30º dia de vida.',
      'Realizar a segunda visita domiciliar até os 6 meses de vida.',
      'Identificar o nascimento e atualizar o cadastro da criança.',
      'Verificar se a criança está sendo acompanhada.',
      'Conferir a situação vacinal e orientar a família.',
      'Identificar faltas e dificuldades de acesso.',
      'Comunicar situações de risco à equipe e realizar busca ativa dos faltosos.'
    ],
    calculationCriteria: {
      formula: 'Soma de 5 boas práticas (20 pontos cada = até 100 pontos por criança de até 2 anos): (A) 1ª consulta médica/enfermagem até o 30º dia; (B) ≥ 9 consultas médicas/enfermagem até 2 anos; (C) ≥ 9 registros simultâneos de peso e altura até 2 anos; (D) ≥ 2 visitas domiciliares por ACS/TACS (1ª até 30 dias e 2ª até 6 meses); (E) Vacinas recomendadas em dia.',
      parameters: 'Ótimo: > 75 e ≤ 100 | Bom: > 50 e ≤ 75 | Suficiente: > 25 e ≤ 50 | Regular: ≤ 25.',
      note: 'No registro e-SUS APS (MIVDT), marcar em "motivo da visita" as opções "recém-nascido" ou "criança" (Nota C2, Seção 3, item 24-e, pág. 3).'
    },
    professionalBoundaries: {
      otherProfessionals: 'Consultas de puericultura (Boas práticas A e B) são privativas de Médicos e Enfermeiros. Registro de peso e altura (Boa prática C, Quadro 03) pode ser realizado por médicos, enfermeiros, técnicos de enfermagem, TACS, ACS (CBO 5151-05) e equipe multiprofissional.',
      notAcsRole: 'O ACS NÃO realiza consulta clínica de puericultura, NÃO diagnostica atrasos clínicos, NÃO prescreve medicamentos/pomadas e NÃO aplica vacinas.'
    },
    sources: {
      cartilha: 'Cartilha INDACS (Kalilka / PET Saúde Digital UFCG), página 3.',
      nota: 'Nota Metodológica C2 – Cuidado no Desenvolvimento Infantil (SEI/MS nº 0054824593, 2026), Seção 3 (item 16-D e item 24-e, págs. 2 e 3) e Seção 4 (Quadros 01, 03 e 04, págs. 5 e 6).'
    },
    scenario: {
      id: 'c2-cenario-1',
      isPriorityValidated: true,
      badge: 'Situação prática C2',
      title: 'Visita domiciliar ao bebê recém-nascido com 18 dias de vida',
      context: 'Em visita à casa de Dona Camila (caso fictício), você conhece o bebê Lucas, que nasceu há 18 dias. A mãe conta que ainda não foi à UBS para a primeira consulta do bebê nem atualizou o cadastro porque achou melhor esperar completar 2 meses, e pergunta se você pode "indicar uma pomada para o umbigo que está vermelho".',
      whatToObserve: [
        'Idade atual do bebê (18 dias — dentro do prazo dos primeiros 30 dias de vida).',
        'Situação do cadastro da criança e da 1ª consulta na UBS (que deve ocorrer até o 30º dia).',
        'Caderneta da Criança (vacinação) e sinal de risco relatado no coto umbilical.'
      ],
      whatBelongsToAcs: [
        'Realizar e registrar a 1ª visita domiciliar até o 30º dia de vida (e planejar a 2ª até os 6 meses).',
        'Identificar o nascimento, atualizar o cadastro, conferir a situação vacinal e orientar a família.',
        'Comunicar imediatamente à equipe para agendar a 1ª consulta antes do 30º dia e avaliar o umbigo.'
      ],
      whenToCommunicateTeam: [
        'Imediatamente, pois o bebê tem 18 dias (janela da 1ª consulta até 30 dias) e apresenta sinal de alerta no umbigo.'
      ],
      exactSource: 'Cartilha INDACS, pág. 3 • Nota Metodológica C2, Seção 3, item 16 (pág. 2) e Seção 4, Quadro 01 e Quadro 04 (págs. 5 e 6).',
      question: 'Como o ACS deve agir nesta visita ao bebê de 18 dias?',
      options: [
        {
          id: 'a',
          text: 'Indicar uma pomada cicatrizante para o umbigo e dizer que ela pode levar o bebê à UBS apenas aos 2 meses.',
          isCorrect: false,
          feedback: 'Incorreto! O ACS nunca prescreve pomadas ou condutas clínicas, e esperar até os 2 meses faria a criança perder a janela da 1ª consulta presencial (até o 30º dia de vida).'
        },
        {
          id: 'b',
          text: 'Atualizar o cadastro, conferir a vacinação, registrar a 1ª visita (até 30 dias), orientar a família sem prescrever conduta e comunicar à equipe para consulta antes do 30º dia.',
          isCorrect: true,
          feedback: 'Perfeito! Você cumpriu a 1ª visita domiciliar até o 30º dia de vida (Nota C2, Quadro 04), respeitou os limites do ACS e comunicou a situação à equipe.'
        },
        {
          id: 'c',
          text: 'Voltar somente quando a criança completar 1 ano.',
          isCorrect: false,
          feedback: 'Atenção aos prazos da Cartilha C2: a 1ª visita domiciliar do ACS deve ocorrer até o 30º dia de vida e a 2ª visita até os 6 meses de vida.'
        }
      ]
    }
  },
  {
    id: 'C3',
    code: 'C3',
    shortTitle: 'Gestação e puerpério',
    fullTitle: 'Cuidado na Gestação e Puerpério na APS',
    cartilhaHeaderTitle: 'Nota Metodológica C3',
    cartilhaHeaderSubtitle: 'Gestação e Puerpério',
    icon: './assets/cartilha/icon-c3.png',
    illustration: './assets/cartilha/ilustracao-acs-homem.png',
    cartilhaPageImg: './assets/cartilha/pagina-4.png',
    validationStatus: 'em_revisao_complementar',
    summaryQuestion: 'Qual a função do ACS na competência 3?',
    summaryAnswer: 'É acompanhar a gestante do pré-natal ao puerpério, com visitas domiciliares regulares, atualizando cadastro e informando a equipe sobre riscos e o desfecho da gestação.',
    tags: [
      'gestante', 'gravidez', 'pré-natal', 'puerpério', 'pós-parto', '42 dias', '12 semanas',
      'dtpa', 'teste rápido', 'sífilis', 'hiv', 'consulta odontológica', '3 visitas'
    ],
    cartilhaSections: {
      highlightBoxes: [
        {
          title: 'Durante a gestação:',
          items: ['Realizar pelo menos 3 visitas domiciliares após a primeira consulta do pré-natal.']
        },
        {
          title: 'Durante o puerpério:',
          items: ['Realizar pelo menos 1 visita domiciliar até 42 dias após o término da gestação.']
        }
      ],
      columnsTitle: 'Outras ações do ACS:',
      leftColumn: [
        'Identificar precocemente possíveis gestantes.',
        'Comunicar a gestação à equipe.',
        'Atualizar cadastro, endereço e telefone.',
        'Orientar para início imediato do pré-natal.',
        'Acompanhar faltosas.'
      ],
      rightColumn: [
        'Verificar se a gestante continua vinculada à equipe.',
        'Identificar o nascimento.',
        'Realizar a visita puerperal.',
        'Informar à equipe o desfecho da gestação.',
        'Iniciar o acompanhamento da criança.'
      ]
    },
    directAcsGoal: {
      hasDirectVisitCount: true,
      badge: 'Gestação: ≥ 3 visitas após 1ª consulta • Puerpério: ≥ 1 visita até 42 dias',
      description: 'Realizar pelo menos 3 visitas domiciliares após a primeira consulta do pré-natal e pelo menos 1 visita domiciliar até 42 dias após o término da gestação.'
    },
    acsCompetencies: [
      'Durante a gestação: realizar pelo menos 3 visitas domiciliares após a primeira consulta do pré-natal.',
      'Durante o puerpério: realizar pelo menos 1 visita domiciliar até 42 dias após o término da gestação.',
      'Identificar precocemente possíveis gestantes e orientar para início imediato do pré-natal.',
      'Comunicar a gestação à equipe e atualizar cadastro, endereço e telefone.',
      'Acompanhar faltosas e verificar se a gestante continua vinculada à equipe.',
      'Identificar o nascimento, realizar a visita puerperal, informar o desfecho da gestação e iniciar o acompanhamento da criança.'
    ],
    calculationCriteria: {
      formula: 'Soma de 11 boas práticas (até 100 pontos): (A) 1ª consulta até 12ª semana; (B) ≥ 7 consultas de pré-natal; (C) ≥ 7 aferições de PA; (D) ≥ 7 registros simultâneos de peso e altura; (E) ≥ 3 visitas do ACS após 1ª consulta; (F) vacina dTpa a partir da 20ª semana; (G) exames 1º tri; (H) exames 3º tri; (I) ≥ 1 consulta no puerpério; (J) ≥ 1 visita do ACS no puerpério até 42 dias; (K) ≥ 1 avaliação odontológica.',
      parameters: 'Ótimo: > 75 e ≤ 100 | Bom: > 50 e ≤ 75 | Suficiente: > 25 e ≤ 50 | Regular: ≤ 25.',
      note: 'O puerpério considera os 42 dias após a data de desfecho da gestação (Nota C3, Seção 3, item 17, pág. 2).'
    },
    professionalBoundaries: {
      otherProfessionals: 'Consultas de pré-natal e puerpério: Médicos e Enfermeiros. Saúde bucal: Cirurgião-dentista e TSB. Exames rápidos: Médicos, Enfermeiros, Farmacêuticos e Técnicos de Enfermagem.',
      notAcsRole: 'O ACS NÃO realiza consultas clínicas nem testes rápidos, cabendo-lhe a captação precoce, visitas domiciliares, busca ativa e comunicação com a equipe.'
    },
    sources: {
      cartilha: 'Cartilha INDACS (Kalilka / PET Saúde Digital UFCG), página 4.',
      nota: 'Nota Metodológica C3 – Cuidado na Gestação e Puerpério (SEI/MS nº 0054619475, 2026), Seção 3 (item 16, pág. 2) e Seção 4 (Quadros 01 e 05, págs. 5 e 7).'
    },
    scenario: {
      id: 'c3-cenario-1',
      isPriorityValidated: false,
      badge: 'Situação prática C3',
      title: 'Puérpera que retornou da maternidade há 10 dias',
      context: 'Na visita à casa de Juliana (caso fictício), você descobre que o bebê nasceu há 10 dias. Ela ainda não avisou à equipe sobre a data do parto e tem dúvidas sobre a consulta pós-parto.',
      whatToObserve: [
        'Data do término da gestação (há 10 dias — dentro dos 42 dias do puerpério).',
        'Necessidade de agendar a consulta puerperal e a 1ª consulta do bebê.'
      ],
      whatBelongsToAcs: [
        'Realizar a visita puerperal (até 42 dias após o término da gestação).',
        'Informar à equipe o desfecho da gestação e iniciar o acompanhamento da criança.'
      ],
      whenToCommunicateTeam: [
        'Logo após a visita, informando o nascimento/desfecho da gestação para agendamento da consulta puerperal.'
      ],
      exactSource: 'Cartilha INDACS, pág. 4 • Nota Metodológica C3, Seção 4, Quadro 05 (pág. 7).',
      question: 'Qual é a ação correta do ACS ao identificar que Juliana teve bebê há 10 dias?',
      options: [
        {
          id: 'a',
          text: 'Realizar a visita puerperal (dentro dos 42 dias), informar o desfecho da gestação à equipe e iniciar o acompanhamento da criança.',
          isCorrect: true,
          feedback: 'Exato! Conforme a Cartilha INDACS (pág. 4), cabe ao ACS realizar pelo menos 1 visita até 42 dias após o término da gestação, informar o desfecho à equipe e iniciar o acompanhamento da criança.'
        },
        {
          id: 'b',
          text: 'Explicar que após o parto não há necessidade de nova visita ou consulta para a mãe.',
          isCorrect: false,
          feedback: 'Incorreto! O puerpério vai até 42 dias após o parto e inclui pelo menos 1 visita do ACS e 1 consulta médica/enfermagem.'
        }
      ]
    }
  },
  {
    id: 'C4',
    code: 'C4',
    shortTitle: 'Pessoa com diabetes',
    fullTitle: 'Cuidado da Pessoa com Diabetes na APS',
    cartilhaHeaderTitle: 'Nota Metodológica C4',
    cartilhaHeaderSubtitle: 'Pessoa com Diabetes',
    icon: './assets/cartilha/icon-c4.png',
    illustration: './assets/cartilha/ilustracao-acs-mulher.png',
    cartilhaPageImg: './assets/cartilha/pagina-5.png',
    validationStatus: 'validado_prioritario',
    summaryQuestion: 'Qual a função do ACS na competência 4?',
    summaryAnswer: 'É realizar ao menos 2 visitas domiciliares por ano, com intervalo mínimo de 30 dias, e verificar o uso de medicamentos, sinais de alerta nos pés e faltas às consultas, comunicando riscos à equipe.',
    tags: [
      'diabetes', 'glicemia', 'açúcar no sangue', 'pé diabético', 'feridas', 'rachaduras',
      'pés', 'hemoglobina glicada', 'insulina', 'medicamentos', '30 dias', '12 meses', '2 visitas'
    ],
    cartilhaSections: {
      topTitle: 'Meta direta do ACS:',
      topItems: [
        'Realizar pelo menos 2 visitas domiciliares nos últimos 12 meses.',
        'Respeitar intervalo mínimo de 30 dias entre as visitas.'
      ],
      columnsTitle: 'Durante as visitas:',
      leftColumn: [
        'Verificar se a pessoa permanece no território.',
        'Atualizar endereço e telefone.',
        'Orientar sobre continuidade do acompanhamento.',
        'Identificar faltas às consultas.',
        'Realizar busca ativa.'
      ],
      rightColumn: [
        'Verificar uso regular dos medicamentos.',
        'Perguntar sobre feridas, rachaduras ou alterações nos pés.',
        'Comunicar sinais de risco à equipe.',
        'Identificar dificuldade de locomoção ou acesso.',
        'Registrar corretamente a visita.'
      ]
    },
    directAcsGoal: {
      hasDirectVisitCount: true,
      badge: 'Meta direta do ACS: ≥ 2 visitas em 12 meses (intervalo mínimo de 30 dias)',
      description: 'Realizar pelo menos 2 visitas domiciliares nos últimos 12 meses, respeitando o intervalo mínimo de 30 dias entre as visitas.'
    },
    acsCompetencies: [
      'Realizar pelo menos 2 visitas domiciliares nos últimos 12 meses, respeitando intervalo mínimo de 30 dias entre as visitas.',
      'Verificar se a pessoa permanece no território e atualizar endereço e telefone.',
      'Orientar sobre continuidade do acompanhamento.',
      'Identificar faltas às consultas e realizar busca ativa.',
      'Verificar uso regular dos medicamentos.',
      'Perguntar sobre feridas, rachaduras ou alterações nos pés.',
      'Comunicar sinais de risco à equipe e identificar dificuldade de locomoção ou acesso.',
      'Registrar corretamente a visita.'
    ],
    calculationCriteria: {
      formula: 'Soma de 6 boas práticas (até 100 pontos): (A) ≥ 1 consulta médica/enfermagem nos últimos 6 meses (20 pts); (B) ≥ 1 aferição de PA nos últimos 6 meses (15 pts); (C) ≥ 1 registro de peso e altura nos últimos 12 meses (15 pts); (D) ≥ 2 visitas domiciliares por ACS/TACS com intervalo mínimo de 30 dias nos últimos 12 meses (20 pts); (E) ≥ 1 registro de Hemoglobina Glicada nos últimos 12 meses (15 pts); (F) ≥ 1 avaliação dos pés nos últimos 12 meses (15 pts).',
      parameters: 'Ótimo: > 75 e ≤ 100 | Bom: > 50 e ≤ 75 | Suficiente: > 25 e ≤ 50 | Regular: ≤ 25.',
      note: 'No MIVDT (Quadro 05, pág. 6), é obrigatório preencher "motivo da visita" e "desfecho".'
    },
    professionalBoundaries: {
      otherProfessionals: 'Exame clínico do pé diabético (SIGTAP 03.01.04.009-5, Quadro 07): Médicos, Enfermeiros, Farmacêuticos, Fisioterapeutas e Terapeutas Ocupacionais. Aferição de PA (Quadro 03 e Nota de Rodapé 4, pág. 7): o CBO 5151-05 (ACS) foi retirado da contabilização deste procedimento.',
      notAcsRole: 'O ACS NÃO realiza o exame clínico diagnóstico do pé diabético, NÃO prescreve pomadas/curativos e NÃO altera doses de medicamentos. Ao ACS cabe perguntar sobre feridas/rachaduras nos pés, verificar uso de medicamentos e comunicar riscos à equipe.'
    },
    sources: {
      cartilha: 'Cartilha INDACS (Kalilka / PET Saúde Digital UFCG), página 5.',
      nota: 'Nota Metodológica C4 – Cuidado da Pessoa com Diabetes (SEI/MS nº 0055986848, 2026), Seção 3 (item 16, pág. 2) e Seção 4 (Quadros 01, 05 e 07 e Nota de Rodapé 4, págs. 4 a 7).'
    },
    scenario: {
      id: 'c4-cenario-1',
      isPriorityValidated: true,
      badge: 'Situação prática C4',
      title: 'Moradora com diabetes que relata ferida no pé e parada de medicação',
      context: 'Em visita a Dona Severina (62 anos, caso fictício), ela conta que parou de tomar o comprimido do diabetes há duas semanas porque "estava se sentindo bem", não passa em consulta há 8 meses e comenta que surgiu uma rachadura com pequena ferida no pé direito que quase não dói.',
      whatToObserve: [
        'Interrupção do uso regular dos medicamentos.',
        'Relato de ferida ou rachadura no pé sem dor (sinal de risco!).',
        'Falta à consulta semestral e intervalo mínimo de 30 dias entre as 2 visitas anuais do ACS.'
      ],
      whatBelongsToAcs: [
        'Perguntar sobre feridas/rachaduras nos pés e verificar o uso dos medicamentos (sem alterar doses nem prescrever condutas).',
        'Orientar sobre a continuidade do acompanhamento.',
        'Registrar corretamente a visita e comunicar imediatamente os sinais de risco à equipe.'
      ],
      whenToCommunicateTeam: [
        'Imediatamente! Ferida nos pés em pessoa com diabetes e interrupção de medicação exigem avaliação clínica pela equipe.'
      ],
      exactSource: 'Cartilha INDACS, pág. 5 • Nota Metodológica C4, Seção 4, Quadros 01, 05 e 07 (págs. 4 e 6).',
      question: 'Diante da situação de Dona Severina, qual é a decisão correta do ACS?',
      options: [
        {
          id: 'a',
          text: 'Fazer o exame clínico do pé diabético para dar baixa no indicador e mandar ela voltar a tomar metade do comprimido.',
          isCorrect: false,
          feedback: 'Atenção aos limites! O exame clínico do pé diabético (SIGTAP 03.01.04.009-5, Quadro 07 da Nota C4) é atribuição clínica, e o ACS nunca altera doses de medicamentos.'
        },
        {
          id: 'b',
          text: 'Perguntar sobre a ferida no pé e o uso dos remédios, orientar a continuidade do acompanhamento sem prescrever conduta, registrar a visita e comunicar imediatamente o sinal de risco à equipe.',
          isCorrect: true,
          feedback: 'Excelente! Conforme a Cartilha INDACS (pág. 5) e a Nota C4 (Quadros 05 e 07), cabe ao ACS perguntar sobre feridas/rachaduras nos pés, verificar uso de medicamentos, realizar ao menos 2 visitas em 12 meses (intervalo mínimo de 30 dias) e comunicar riscos à equipe.'
        }
      ]
    }
  },
  {
    id: 'C5',
    code: 'C5',
    shortTitle: 'Pessoa com hipertensão',
    fullTitle: 'Cuidado da Pessoa com Hipertensão na APS',
    cartilhaHeaderTitle: 'Nota Metodológica C5',
    cartilhaHeaderSubtitle: 'Pessoa com Hipertensão',
    icon: './assets/cartilha/icon-c5.png',
    illustration: './assets/cartilha/ilustracao-acs-homem.png',
    cartilhaPageImg: './assets/cartilha/pagina-6.png',
    validationStatus: 'em_revisao_complementar',
    summaryQuestion: 'Qual a função do ACS na competência 5?',
    summaryAnswer: 'Realizar ao menos 2 visitas domiciliares por ano, com intervalo mínimo de 30 dias, verificando uso de medicamentos e abandono do cuidado, com busca ativa dos faltosos e comunicação de pendências à equipe.',
    tags: [
      'hipertensão', 'pressão alta', 'pa', 'remédio de pressão', 'abandono do cuidado',
      'faltosos', 'busca ativa', '30 dias', '12 meses', '2 visitas', 'locomoção'
    ],
    cartilhaSections: {
      topTitle: 'Meta direta do ACS:',
      topItems: [
        'Realizar pelo menos 2 visitas domiciliares nos últimos 12 meses.',
        'Respeitar intervalo mínimo de 30 dias entre as visitas.'
      ],
      columnsTitle: 'Durante as visitas:',
      leftColumn: [
        'Orientar sobre acompanhamento mesmo sem sintomas.',
        'Identificar abandono do cuidado.',
        'Realizar busca ativa dos faltosos.',
        'Verificar uso dos medicamentos.'
      ],
      rightColumn: [
        'Identificar dificuldade de locomoção.',
        'Confirmar mudança de endereço ou território.',
        'Comunicar pendências à equipe.',
        'Registrar corretamente as visitas.'
      ]
    },
    directAcsGoal: {
      hasDirectVisitCount: true,
      badge: 'Meta direta do ACS: ≥ 2 visitas em 12 meses (intervalo mínimo de 30 dias)',
      description: 'Realizar pelo menos 2 visitas domiciliares nos últimos 12 meses, respeitando o intervalo mínimo de 30 dias entre as visitas.'
    },
    acsCompetencies: [
      'Realizar pelo menos 2 visitas domiciliares nos últimos 12 meses, respeitando intervalo mínimo de 30 dias entre as visitas.',
      'Orientar sobre acompanhamento mesmo sem sintomas.',
      'Identificar abandono do cuidado e realizar busca ativa dos faltosos.',
      'Verificar uso dos medicamentos e identificar dificuldade de locomoção.',
      'Confirmar mudança de endereço ou território, comunicar pendências à equipe e registrar corretamente as visitas.'
    ],
    calculationCriteria: {
      formula: 'Soma de 4 boas práticas (25 pontos cada = até 100 pontos): (A) ≥ 1 consulta médica/enfermagem nos últimos 6 meses; (B) ≥ 1 aferição de PA nos últimos 6 meses; (C) ≥ 1 registro simultâneo de peso e altura nos últimos 12 meses; (D) ≥ 2 visitas domiciliares por ACS/TACS com intervalo mínimo de 30 dias nos últimos 12 meses.',
      parameters: 'Ótimo: > 75 e ≤ 100 | Bom: > 50 e ≤ 75 | Suficiente: > 25 e ≤ 50 | Regular: ≤ 25.',
      note: 'Critério de indicador de equipe (INE).'
    },
    professionalBoundaries: {
      otherProfessionals: 'Consultas: Médicos e Enfermeiros. Aferição de pressão arterial (SIGTAP 03.01.10.003-9, Quadro 03): Médicos, Enfermeiros, Técnicos/Auxiliares de Enfermagem e TACS (CBO 3222) e equipe multiprofissional.',
      notAcsRole: 'Conforme Nota de Rodapé 4 da Nota Metodológica C5 (pág. 6), o CBO 5151-05 (ACS) foi retirado do Quadro 03 de aferição de PA para pontuação do indicador. O ACS não diagnostica hipertensão nem ajusta medicamentos.'
    },
    sources: {
      cartilha: 'Cartilha INDACS (Kalilka / PET Saúde Digital UFCG), página 6.',
      nota: 'Nota Metodológica C5 – Cuidado da Pessoa com Hipertensão (SEI/MS nº 0056042518, 2026), Seção 4 (Quadros 01 a 05 e Nota de Rodapé 4, págs. 4 a 6).'
    },
    scenario: {
      id: 'c5-cenario-1',
      isPriorityValidated: false,
      badge: 'Situação prática C5',
      title: 'Morador com hipertensão que parou o remédio por não ter sintomas',
      context: 'Seu Roberto (58 anos, caso fictício) conta que parou o remédio de pressão porque "não sente mais dor na nuca" e faltou à consulta do semestre.',
      whatToObserve: [
        'Abandono do uso de medicamentos e falta à consulta semestral.'
      ],
      whatBelongsToAcs: [
        'Orientar sobre o acompanhamento mesmo sem sintomas, realizar busca ativa, registrar a visita e comunicar a pendência à equipe.'
      ],
      whenToCommunicateTeam: [
        'Comunicar à equipe o abandono do cuidado para reagendar consulta e aferição de PA.'
      ],
      exactSource: 'Cartilha INDACS, pág. 6 • Nota Metodológica C5, Quadro 01 e Quadro 05 (págs. 4 e 5).',
      question: 'Qual orientação cabe ao ACS na visita a Seu Roberto?',
      options: [
        {
          id: 'a',
          text: 'Orientar que o acompanhamento deve continuar mesmo sem sintomas, registrar a visita e comunicar o abandono do cuidado à equipe.',
          isCorrect: true,
          feedback: 'Correto! Conforme a Cartilha INDACS (pág. 6), o ACS orienta sobre o acompanhamento mesmo sem sintomas, identifica o abandono do cuidado e comunica pendências à equipe.'
        },
        {
          id: 'b',
          text: 'Confirmar que sem dor de cabeça não precisa mais tomar o remédio.',
          isCorrect: false,
          feedback: 'Incorreto! A hipertensão exige acompanhamento mesmo sem sintomas.'
        }
      ]
    }
  },
  {
    id: 'C6',
    code: 'C6',
    shortTitle: 'Pessoa idosa',
    fullTitle: 'Cuidado Integral à Pessoa Idosa na APS',
    cartilhaHeaderTitle: 'Nota Metodológica C6',
    cartilhaHeaderSubtitle: 'Pessoa Idosa',
    icon: './assets/cartilha/icon-c6.png',
    illustration: './assets/cartilha/ilustracao-acs-mulher.png',
    cartilhaPageImg: './assets/cartilha/pagina-7.png',
    validationStatus: 'em_revisao_complementar',
    summaryQuestion: 'Qual a função do ACS na competência 6?',
    summaryAnswer: 'É realizar ao menos 2 visitas domiciliares por ano, com intervalo mínimo de 30 dias, identificar os riscos de quedas, isolamento e pessoas acamadas, verificando cuidador e vacinação, além de comunicar as vulnerabilidades à equipe.',
    tags: [
      'idosa', 'idoso', '60 anos', 'quedas', 'acamado', 'domiciliado', 'cuidador',
      'isolamento', 'abandono', 'vacina gripe', 'influenza', '30 dias', '12 meses'
    ],
    cartilhaSections: {
      topTitle: 'Meta direta do ACS:',
      topItems: [
        'Realizar pelo menos 2 visitas domiciliares nos últimos 12 meses.',
        'Respeitar intervalo mínimo de 30 dias entre as visitas.'
      ],
      columnsTitle: 'Durante as visitas:',
      leftColumn: [
        'Atualizar o cadastro.',
        'Verificar se a pessoa continua no território.',
        'Identificar dificuldade de locomoção.',
        'Observar risco de quedas.',
        'Identificar situação de abandono ou isolamento.'
      ],
      rightColumn: [
        'Verificar presença de cuidador.',
        'Identificar pessoas acamadas ou domiciliadas.',
        'Verificar uso dos medicamentos',
        'Conferir situação vacinal.',
        'Comunicar vulnerabilidades à equipe.'
      ]
    },
    directAcsGoal: {
      hasDirectVisitCount: true,
      badge: 'Meta direta do ACS: ≥ 2 visitas em 12 meses (intervalo mínimo de 30 dias)',
      description: 'Realizar pelo menos 2 visitas domiciliares nos últimos 12 meses, respeitando o intervalo mínimo de 30 dias entre as visitas.'
    },
    acsCompetencies: [
      'Realizar pelo menos 2 visitas domiciliares nos últimos 12 meses, respeitando intervalo mínimo de 30 dias.',
      'Atualizar o cadastro e verificar se a pessoa continua no território.',
      'Identificar dificuldade de locomoção e observar risco de quedas.',
      'Identificar situação de abandono ou isolamento e verificar presença de cuidador.',
      'Identificar pessoas acamadas ou domiciliadas.',
      'Verificar uso dos medicamentos, conferir situação vacinal (influenza) e comunicar vulnerabilidades à equipe.'
    ],
    calculationCriteria: {
      formula: 'Soma de 4 boas práticas (25 pontos cada = até 100 pontos para pessoas com ≥ 60 anos): (A) ≥ 1 consulta médica/enfermagem nos últimos 12 meses; (B) ≥ 1 registro simultâneo de peso e altura nos últimos 12 meses; (C) ≥ 2 visitas domiciliares por ACS/TACS com intervalo mínimo de 30 dias nos últimos 12 meses; (D) 1 dose da vacina contra influenza nos últimos 12 meses.',
      parameters: 'Ótimo: > 75 e ≤ 100 | Bom: > 50 e ≤ 75 | Suficiente: > 25 e ≤ 50 | Regular: ≤ 25.',
      note: 'Considera todas as pessoas vinculadas à equipe com idade ≥ 60 anos.'
    },
    professionalBoundaries: {
      otherProfessionals: 'Consultas clínicas: Médicos e Enfermeiros. Vacinação: equipe de imunização habilitada. Avaliação de peso/altura no mesmo dia: Médicos, Enfermeiros, Técnicos/Auxiliares/TACS, ACS e equipe multiprofissional.',
      notAcsRole: 'O ACS NÃO altera prescrições nem realiza procedimentos clínicos, cabendo-lhe identificar risco de quedas, isolamento, restrição ao leito e comunicar à equipe.'
    },
    sources: {
      cartilha: 'Cartilha INDACS (Kalilka / PET Saúde Digital UFCG), página 7.',
      nota: 'Nota Metodológica C6 – Cuidado da Pessoa Idosa (SEI/MS nº 0056053813, 2026), Seção 4 (Quadros 01 a 05, págs. 4 e 5).'
    },
    scenario: {
      id: 'c6-cenario-1',
      isPriorityValidated: false,
      badge: 'Situação prática C6',
      title: 'Idoso com dificuldade de locomoção, risco de quedas e vacina da gripe pendente',
      context: 'Seu Antônio (74 anos, caso fictício) mora sozinho, tropeçou recentemente no tapete da sala, tem dificuldade de caminhar até a UBS e ainda não tomou a vacina anual contra influenza.',
      whatToObserve: [
        'Risco de quedas, dificuldade de locomoção, ausência de cuidador e situação vacinal.'
      ],
      whatBelongsToAcs: [
        'Observar o risco de quedas e isolamento, conferir medicamentos e vacinação e comunicar as vulnerabilidades à equipe.'
      ],
      whenToCommunicateTeam: [
        'Logo após a visita, para organizar o cuidado e a vacinação.'
      ],
      exactSource: 'Cartilha INDACS, pág. 7 • Nota Metodológica C6, Quadro 01 e Quadro 04 (págs. 4 e 5).',
      question: 'Qual é o papel do ACS ao identificar essas vulnerabilidades na casa de Seu Antônio?',
      options: [
        {
          id: 'a',
          text: 'Observar risco de quedas e isolamento, conferir vacinação e medicamentos, registrar a visita e comunicar as vulnerabilidades à equipe.',
          isCorrect: true,
          feedback: 'Perfeito! A Cartilha INDACS (pág. 7) destaca exatamente essas ações do ACS no cuidado à pessoa idosa.'
        },
        {
          id: 'b',
          text: 'Suspender por conta própria os medicamentos que possam causar tontura.',
          isCorrect: false,
          feedback: 'Incorreto! Qualquer ajuste medicamentoso é atribuição clínica.'
        }
      ]
    }
  },
  {
    id: 'C7',
    code: 'C7',
    shortTitle: 'Mulher na prevenção do câncer',
    fullTitle: 'Cuidado da Mulher e do Homem Transgênero na Prevenção do Câncer',
    cartilhaHeaderTitle: 'Nota Metodológica C7',
    cartilhaHeaderSubtitle: 'Mulher na Prevenção do Câncer',
    icon: './assets/cartilha/icon-c7.png',
    illustration: './assets/cartilha/ilustracao-acs-homem.png',
    illustrationPage2: './assets/cartilha/ilustracao-acs-mulher.png',
    cartilhaPageImg: './assets/cartilha/pagina-8.png',
    cartilhaPageImg2: './assets/cartilha/pagina-9.png',
    validationStatus: 'em_revisao_complementar',
    summaryQuestion: 'Qual a função do ACS na competência 7?',
    summaryAnswer: 'É identificar, orientar e fazer busca ativa em públicos específicos: meninas de 9 a 14 anos para vacinação de HPV, pessoas de 14 a 69 anos em saúde sexual e reprodutiva, e rastreamento de colo de útero e câncer de mama atrasados, sempre comunicando pendências à equipe.',
    tags: [
      'mulher', 'câncer', 'preventivo', 'citopatológico', 'colo do útero', 'mama', 'mamografia',
      'hpv', 'vacina hpv', '9 a 14 anos', '25 a 64 anos', '50 a 69 anos', '14 a 69 anos',
      'saúde sexual e reprodutiva', 'homem transgênero', 'transgênero'
    ],
    cartilhaSections: {
      introNote: 'A nota metodológica não estabelece uma quantidade específica de visitas domiciliares do ACS para este indicador. A atuação direta do ACS está concentrada em identificação, orientação e busca ativa.',
      ageGroupsPage1: [
        {
          title: 'Meninas de 9 a 14 anos',
          items: [
            'Identificar todas as meninas da microárea.',
            'Verificar a situação vacinal contra HPV.',
            'Orientar pais ou responsáveis.',
            'Realizar busca ativa das não vacinadas'
          ]
        },
        {
          title: 'Pessoas de 14 a 69 anos',
          items: [
            'Orientar sobre saúde sexual e reprodutiva.',
            'Identificar quem necessita de atendimento.',
            'Comunicar e encaminhar a necessidade à equipe.'
          ]
        }
      ],
      ageGroupsPage2: [
        {
          title: 'Mulheres e homens transgêneros de 25 a 64 anos',
          items: [
            'Identificar quem está com rastreamento do colo do útero atrasado.',
            'Realizar busca ativa respeitosa e sigilosa.',
            'Orientar sobre a importância do acompanhamento.'
          ]
        },
        {
          title: 'Mulheres e homens transgêneros de 50 a 69 anos',
          items: [
            'Identificar quem está com rastreamento do câncer de mama atrasado.',
            'Orientar sobre o acompanhamento.',
            'Verificar dificuldades de acesso.',
            'Comunicar as pendências à equipe'
          ]
        }
      ],
      extraQuestion: 'O que é um homem ou uma mulher transgênero?',
      extraAnswer: 'É uma pessoa que se identifica com um gênero diferente daquele que lhe foi atribuído ao nascer.'
    },
    directAcsGoal: {
      hasDirectVisitCount: false,
      badge: 'Atuação focada em identificação, orientação e busca ativa por faixa etária',
      description: 'A nota metodológica não estabelece uma quantidade específica de visitas domiciliares do ACS para este indicador. A atuação direta do ACS está concentrada em identificação, orientação e busca ativa.'
    },
    acsCompetencies: [
      'Meninas de 9 a 14 anos: identificar todas as meninas da microárea, verificar situação vacinal contra HPV, orientar pais/responsáveis e realizar busca ativa das não vacinadas.',
      'Pessoas de 14 a 69 anos: orientar sobre saúde sexual e reprodutiva, identificar quem necessita de atendimento e comunicar/encaminhar à equipe.',
      'Mulheres e homens transgêneros de 25 a 64 anos: identificar quem está com rastreamento do colo do útero atrasado, realizar busca ativa respeitosa e sigilosa e orientar sobre o acompanhamento.',
      'Mulheres e homens transgêneros de 50 a 69 anos: identificar quem está com rastreamento do câncer de mama atrasado, orientar, verificar dificuldades de acesso e comunicar pendências à equipe.'
    ],
    calculationCriteria: {
      formula: 'Soma ponderada de 4 boas práticas por faixa etária (até 100 pontos): (A) 25 a 64 anos: exame de rastreamento do colo do útero nos últimos 36 meses (ou 60 meses para teste molecular de HPV) (20 pts); (B) 9 a 14 anos (sexo feminino): ≥ 1 dose da vacina HPV (30 pts); (C) 14 a 69 anos: ≥ 1 atendimento sobre saúde sexual e reprodutiva nos últimos 12 meses (30 pts); (D) 50 a 69 anos: ≥ 1 exame de rastreamento de mama nos últimos 24 meses (20 pts).',
      parameters: 'Ótimo: > 75 e ≤ 100 | Bom: > 50 e ≤ 75 | Suficiente: > 25 e ≤ 50 | Regular: ≤ 25.',
      note: 'Inclui mulheres e homens transgênero nas respectivas faixas etárias (Nota C7, Seção 4, item 4.1).'
    },
    professionalBoundaries: {
      otherProfessionals: 'Coleta de citopatológico/teste de HPV, consultas de saúde sexual e reprodutiva e solicitação/avaliação de mamografia são realizadas por Médicos e Enfermeiros.',
      notAcsRole: 'O ACS NÃO solicita mamografia nem coleta preventivo; realiza identificação, orientação acolhedora e busca ativa respeitosa e sigilosa.'
    },
    sources: {
      cartilha: 'Cartilha INDACS (Kalilka / PET Saúde Digital UFCG), páginas 8 e 9.',
      nota: 'Nota Metodológica C7 – Cuidado da Mulher na Prevenção do Câncer (SEI/MS nº 0054641718, 2026), Seção 4 (Quadro 01, pág. 5).'
    },
    scenario: {
      id: 'c7-cenario-1',
      isPriorityValidated: false,
      badge: 'Situação prática C7',
      title: 'Busca ativa por faixas etárias na mesma família',
      context: 'Na visita à casa de Dona Marta (54 anos, sem mamografia há 3 anos), moram também sua filha Carla (29 anos, preventivo atrasado) e a neta Beatriz (11 anos, ainda sem vacina contra HPV).',
      whatToObserve: [
        'Três faixas prioritárias da Competência 7: 9 a 14 anos (HPV), 25 a 64 anos (colo do útero) e 50 a 69 anos (mama).'
      ],
      whatBelongsToAcs: [
        'Orientar sobre a vacina HPV para a menina de 11 anos e sobre o rastreamento do colo do útero e mama, comunicando as pendências à equipe.'
      ],
      whenToCommunicateTeam: [
        'Comunicar as pendências à equipe para agendamento de vacinação, coleta de preventivo e mamografia.'
      ],
      exactSource: 'Cartilha INDACS, págs. 8 e 9 • Nota Metodológica C7, Quadro 01 (pág. 5).',
      question: 'De acordo com a Cartilha INDACS (pág. 8), como funciona a atuação do ACS no indicador C7?',
      options: [
        {
          id: 'a',
          text: 'A nota não fixa uma quantidade específica de visitas do ACS; a atuação direta foca em identificação, orientação e busca ativa nas faixas de 9–14, 14–69, 25–64 e 50–69 anos.',
          isCorrect: true,
          feedback: 'Exatamente! Conforme a página 8 da Cartilha INDACS, a atuação direta do ACS em C7 está concentrada em identificação, orientação e busca ativa.'
        },
        {
          id: 'b',
          text: 'O próprio ACS preenche a requisição de mamografia no domicílio.',
          isCorrect: false,
          feedback: 'Incorreto! A solicitação e avaliação de mamografia cabem a médicos e enfermeiros.'
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
