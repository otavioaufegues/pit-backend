let seeder = require("mongoose-seed");

let user = [
  {
    model: "User",
    documents: [
      {
        email: "otavioaufegues@gmail.com",
        password: "123456",
        firstName: "Otávio",
        lastName: "Rodrigues",
        siape: "202065",
        department: 1,
        username: "otavioaufegues",
        regime: 40,
        isVerified: true,
        isActive: true,
      },
    ],
  },
];

let year = [
  {
    model: "Year",
    documents: [
      { _id: 1, year: 2020 },
      { _id: 2, year: 2021 },
      { _id: 3, year: 2022 },
      { _id: 4, year: 2023 },
    ],
  },
];

let institution = [
  {
    model: "Institution",
    documents: [{ _id: 1, name: "Universidade Federal de Juiz de Fora" }],
  },
];

let department = [
  {
    model: "Department",
    documents: [
      { _id: 1, name: "Ciência da Computação" },
      { _id: 2, name: "Física" },
      { _id: 3, name: "Química" },
      { _id: 4, name: "Artes" },
      { _id: 5, name: "Filosofia" },
      { _id: 6, name: "Engenharia" },
    ],
  },
];

let axis = [
  {
    model: "Axis",
    documents: [
      { _id: 1, name: "Ensino", ref: "teaching", limit: 16, icon: "book" },
      {
        _id: 2,
        name: "Pesquisa",
        ref: "researching",
        limit: 24,
        icon: "gradient",
      },
      {
        _id: 3,
        name: "Extensão",
        ref: "extension",
        limit: 16,
        icon: "move-to-inbox",
      },
      {
        _id: 4,
        name: "Atividade Administrativa",
        ref: "management",
        limit: 40,
        icon: "how-to-vote",
      },
      {
        _id: 5,
        name: "Capacitação e Representação",
        ref: "leave",
        limit: 40,
        icon: "nat",
      },
    ],
  },
];

let category = [
  {
    model: "Category",
    documents: [
      //eixo 1 - ensino
      {
        _id: 1,
        description:
          "Hora aula + (teórica, prática, de estágio, de laboratório ou de campo em graduação ou pós-graduação não remunerada)",
        axis: 1,
        limitHours: 20,
        details: {
          "Carga horária": "",
          Período: "",
          Alunos: "",
          Disciplina: "",
          Turma: "",
        },
      },
      {
        _id: 2,
        description: "Ensino a distância — professor",
        axis: 1,
        limitHours: 12,
        details: { "Carga horária": "" },
      },
      {
        _id: 3,
        description: "Ensino a distância — tutor",
        axis: 1,
        limitHours: 12,
        details: { "Carga horária": "" },
      },
      {
        _id: 4,
        description: "Orientação e co-orientação de monografia e/ou TCC",
        axis: 1,
        limitHours: 8,
        details: { "Carga horária": "" },
      },
      {
        _id: 5,
        description: "Orientação de dissertação",
        axis: 1,
        limitHours: 8,
        details: { "Carga horária": "" },
      },
      {
        _id: 6,
        description: "Orientação de tese",
        axis: 1,
        limitHours: 9,
        details: { "Carga horária": "" },
      },
      {
        _id: 7,
        description: "Co-orientação de tese e de dissertação ",
        axis: 1,
        limitHours: 6,
        details: { "Carga horária": "" },
      },
      {
        _id: 8,
        description: "Supervisão de pós-doutorado",
        axis: 1,
        limitHours: 6,
        details: { "Carga horária": "" },
      },
      {
        _id: 9,
        description:
          "Preparação, avaliação, correção e atendimento aos alunos na educação básica",
        axis: 1,
        limitHours: 0,
        details: { "Carga horária": "" },
      },
      {
        _id: 10,
        description:
          "Preparação, avaliação. correção e atendimento aos alunos graduação (até 40 alunos)",
        axis: 1,
        limitHours: 0,
        details: { "Carga horária": "" },
      },
      {
        _id: 11,
        description:
          "Preparação, avaliação, correção e atendimento aos alunos na graduação (acima de 40 alunos)",
        axis: 1,
        limitHours: 0,
        details: { "Carga horária": "" },
      },
      {
        _id: 12,
        description:
          "Preparação, avaliação, correção e atendimento aos alunos na pós graduação",
        axis: 1,
        limitHours: 0,
        details: { "Carga horária": "" },
      },
      {
        _id: 13,
        description: "Participação em banca de TCC e/ou monografia",
        axis: 1,
        limitHours: 1,
        details: { "Carga horária": "" },
      },
      {
        _id: 14,
        description: "Participação banca de defesa de dissertação",
        axis: 1,
        limitHours: 1,
        details: { "Carga horária": "" },
      },
      {
        _id: 15,
        description: "Participação em defesa de tese",
        axis: 1,
        limitHours: 2,
        details: { "Carga horária": "" },
      },
      {
        _id: 16,
        description: "Coordenação de grupo de estudo cadastrado",
        axis: 1,
        limitHours: 3,
        details: { "Carga horária": "" },
      },
      {
        _id: 17,
        description: "Supervisão de estágio curricular ou internato",
        axis: 1,
        limitHours: 5,
        details: { "Carga horária": "" },
      },
      {
        _id: 18,
        description: "Orientação e supervisão de estágio não curricular",
        axis: 1,
        limitHours: 5,
        details: { "Carga horária": "" },
      },
      {
        _id: 19,
        description: "Orientação de monitoria (6 horas por projeto)",
        axis: 1,
        limitHours: 2,
        details: { "Carga horária": "" },
      },
      {
        _id: 20,
        description: "Orientação de monitoria (12 por projeto)",
        axis: 1,
        limitHours: 3,
        details: { "Carga horária": "" },
      },
      {
        _id: 21,
        description: "Orientação de treinamento profissional",
        axis: 1,
        limitHours: 3,
        details: { "Carga horária": "" },
      },
      {
        _id: 22,
        description:
          "Atender e orientar discentes e programas de bolsas de ensino da Instituição ou decorrentes de convênio",
        axis: 1,
        limitHours: 3,
        details: { "Carga horária": "" },
      },
      {
        _id: 23,
        description: "Preceptor ou tutor de Residência",
        axis: 1,
        limitHours: 4,
        details: { "Carga horária": "" },
      },
      {
        _id: 24,
        description: "Sobreaviso ou prontidão para execução de serviço",
        axis: 1,
        limitHours: 6,
        details: { "Carga horária": "" },
      },
      {
        _id: 25,
        description:
          "Orientação no âmbito do projeto de universalização das linguas estrangeiras e idiomas sem fronteiras",
        axis: 1,
        limitHours: 4,
        details: { "Carga horária": "" },
      },

      //eixo 2 - pesquisa

      {
        _id: 26,
        description: "Coordenador de grupo de pesquisa cadastrado",
        axis: 2,
        limitHours: 3,
        details: { "Carga horária": "" },
      },
      {
        _id: 27,
        description: "Membro de grupo de pesquisa cadastrado",
        axis: 2,
        limitHours: 2,
        details: { "Carga horária": "" },
      },
      {
        _id: 28,
        description:
          "Coordenador de projeto registrado na PROPP ou outro agente de fomento",
        axis: 2,
        limitHours: 3,
        details: { "Carga horária": "" },
      },
      {
        _id: 29,
        description:
          "Membro de projeto registrado na PROPP ou outro agente de fomento",
        axis: 2,
        limitHours: 2,
        details: { "Carga horária": "" },
      },
      {
        _id: 30,
        description: "Orientação de aluno em Iniciação Científica",
        axis: 2,
        limitHours: 2,
        details: { "Carga horária": "" },
      },
      {
        _id: 31,
        description:
          "Organização de Congresso, Seminário. Simpósio, Workshop etc.",
        axis: 2,
        limitHours: 2,
        details: { "Carga horária": "" },
      },
      {
        _id: 32,
        description:
          "Participação em Congresso, Seminário, Simpósio, Workshop etc.",
        axis: 2,
        limitHours: 1,
        details: { "Carga horária": "" },
      },
      {
        _id: 33,
        description:
          "Participação com apresentação de trabalho em Congresso, Seminário, Simpósio, Workshop etc.",
        axis: 2,
        limitHours: 1.5,
        details: { "Carga horária": "" },
      },
      {
        _id: 34,
        description: "Palestras, conferência, mesa redonda e aula inaugural",
        axis: 2,
        limitHours: 2,
        details: { "Carga horária": "" },
      },
      {
        _id: 35,
        description: "Parecerista e revisor de artigo e/ou evento",
        axis: 2,
        limitHours: 1.5,
        details: { "Carga horária": "" },
      },
      {
        _id: 36,
        description:
          "Submissão ou participação comprovada de artigo em Revista acadêmica",
        axis: 2,
        limitHours: 6,
        details: { "Carga horária": "" },
      },
      {
        _id: 37,
        description:
          "Submissão ou participação comprovada de trabalho ou projeto acadêmico",
        axis: 2,
        limitHours: 5,
        details: { "Carga horária": "" },
      },
      {
        _id: 38,
        description: "Submissão comprovada de livro indexado",
        axis: 2,
        limitHours: 7,
        details: { "Carga horária": "" },
      },
      {
        _id: 39,
        description: "Tradução publicada de livro",
        axis: 2,
        limitHours: 2,
        details: {
          "Carga horária": "",
          Autoria: "",
          "Título da Obra": "",
          Local: "",
          Data: "",
        },
      },
      {
        _id: 40,
        description: "Tradução publicada de artigo ou capítulo de livro",
        axis: 2,
        limitHours: 1,
        details: {
          "Carga horária": "",
          Autoria: "",
          "Título da Obra": "",
          Local: "",
          Data: "",
        },
      },
      {
        _id: 41,
        description: "Resenha publicada",
        axis: 2,
        limitHours: 1,
        details: {
          "Carga horária": "",
          Autoria: "",
          "Título da Obra": "",
          Local: "",
          Data: "",
        },
      },
      {
        _id: 42,
        description: "Capitulo de livro publicado",
        axis: 2,
        limitHours: 5,
        details: {
          "Carga horária": "",
          Autoria: "",
          "Título da Obra": "",
          Local: "",
          Data: "",
        },
      },
      {
        _id: 43,
        description: "Verbete em dicionário publicado",
        axis: 2,
        limitHours: 1,
        details: {
          "Carga horária": "",
          Autoria: "",
          "Título da Obra": "",
          Local: "",
          Data: "",
        },
      },
      {
        _id: 44,
        description: "Cartas, mapas. maquetes ou Similares publicados",
        axis: 2,
        limitHours: 1,
        details: {
          "Carga horária": "",
          Autoria: "",
          "Título da Obra": "",
          Local: "",
          Data: "",
        },
      },
      {
        _id: 45,
        description: "Material didático publicado",
        axis: 2,
        limitHours: 1,
        details: {
          "Carga horária": "",
          Autoria: "",
          "Título da Obra": "",
          Local: "",
          Data: "",
        },
      },
      {
        _id: 46,
        description: "Artigo publicado em anais de evento acadêmico",
        axis: 2,
        limitHours: 1,
        details: {
          "Carga horária": "",
          Autoria: "",
          "Título da Obra": "",
          Local: "",
          Data: "",
        },
      },
      {
        _id: 47,
        description: "Produto ou processo com registro de patente",
        axis: 2,
        limitHours: 5,
        details: { "Carga horária": "" },
      },
      {
        _id: 48,
        description: "Softwares. aplicativo, produto ou técnica registrados",
        axis: 2,
        limitHours: 5,
        details: { "Carga horária": "" },
      },
      {
        _id: 49,
        description: "Produção artística coletiva ou individual",
        axis: 2,
        limitHours: 5,
        details: { "Carga horária": "" },
      },

      //eixo 3 - extensao
      {
        _id: 50,
        description:
          "Coordenação de projeto ou programa regisirado na PROEX ou outro agente de financiamento",
        axis: 3,
        limitHours: 3,
        details: { "Carga horária": "" },
      },
      {
        _id: 51,
        description:
          "Participação em projeto ou programa registrado na PROEX ou outro agente de financiamento",
        axis: 3,
        limitHours: 2,
        details: { "Carga horária": "" },
      },
      {
        _id: 52,
        description:
          "Coordenação de projeto ou programa de extensão com ou sem financiamento",
        axis: 3,
        limitHours: 3,
        details: { "Carga horária": "" },
      },
      {
        _id: 53,
        description:
          "Participação em projeto ou programa de extensão com ou sem financiamento",
        axis: 3,
        limitHours: 2,
        details: { "Carga horária": "" },
      },
      {
        _id: 54,
        description:
          "Participação em atividades de extensão da Universidade ou outros órgãos suplementares",
        axis: 3,
        limitHours: 3,
        details: { "Carga horária": "" },
      },
      {
        _id: 55,
        description: "Palestras, dinâmicas ou treinamento de extensão",
        axis: 3,
        limitHours: 2,
        details: { "Carga horária": "" },
      },
      {
        _id: 56,
        description:
          "Organização de palestras, dinâmicas ou treinamento de extensão",
        axis: 3,
        limitHours: 2,
        details: { "Carga horária": "" },
      },
      {
        _id: 57,
        description:
          "Coordenação, promoção e produção artística e/ou cultural vinculada à UFJF",
        axis: 3,
        limitHours: 2,
        details: { "Carga horária": "" },
      },
      {
        _id: 58,
        description:
          "Participação em Congresso, Seminário, Simpósio, Workshop etc.",
        axis: 3,
        limitHours: 1,
        details: { "Carga horária": "" },
      },
      {
        _id: 59,
        description:
          "Participação com apresentação de trabalho em Congresso, Seminário, Simpósio, Workshop etc.",
        axis: 3,
        limitHours: 1.5,
        details: { "Carga horária": "" },
      },
      {
        _id: 60,
        description: "Submissão de trabalho ou projeto de extensão",
        axis: 3,
        limitHours: 5,
        details: { "Carga horária": "" },
      },
      {
        _id: 61,
        description: "Curso de extensão (mínimo 20 horas)",
        axis: 3,
        limitHours: 4,
        details: { "Carga horária": "" },
      },
      {
        _id: 62,
        description: "Curso de extensão (profissionalizante — 40 horas)",
        axis: 3,
        limitHours: 6,
        details: { "Carga horária": "" },
      },
      {
        _id: 63,
        description: "Tutoria de grupos PET, GET e similares",
        axis: 3,
        limitHours: 4,
        details: { "Carga horária": "" },
      },
      {
        _id: 64,
        description: "Orientação de Projetos de Consultoria e Técnico",
        axis: 3,
        limitHours: 1.5,
        details: { "Carga horária": "" },
      },
      {
        _id: 65,
        description: "Coordenação de Empresa Júnior",
        axis: 3,
        limitHours: 4,
        details: { "Carga horária": "" },
      },
      {
        _id: 66,
        description: "Orientação de Empresa Júnior",
        axis: 3,
        limitHours: 1.5,
        details: { "Carga horária": "" },
      },
      {
        _id: 67,
        description:
          "Publicação de artigo em Jornal ou Revista (não-acadêmico e de grande circulação)",
        axis: 3,
        limitHours: 0.5,
        details: {
          "Carga horária": "",
          Autoria: "",
          "Título da Obra": "",
          Local: "",
          Data: "",
        },
      },
      {
        _id: 68,
        description:
          "Participação em programa de rádio, TV ou canal em razão se sua atividade docente",
        axis: 3,
        limitHours: 0.5,
        details: { "Carga horária": "" },
      },
      {
        _id: 69,
        description: "Prestação de serviço técnico não-remunerado",
        axis: 3,
        limitHours: 1,
        details: { "Carga horária": "" },
      },
      {
        _id: 70,
        description: "Orientação de bolsista de extensão",
        axis: 3,
        limitHours: 2.5,
        details: { "Carga horária": "" },
      },
      {
        _id: 71,
        description: "Atividades de extensão institucional",
        axis: 3,
        limitHours: 12,
        details: { "Carga horária": "" },
      },
      {
        _id: 72,
        description: "Coordenação de eventos",
        axis: 3,
        limitHours: 2,
        details: { "Carga horária": "" },
      },

      //eixo 4 - administrativo
      {
        _id: 73,
        description: "Reitor, Vice-reitor e Pró-reitor",
        axis: 4,
        limitHours: 40,
        details: { "Carga horária": "" },
      },
      {
        _id: 74,
        description:
          "Pró-reitor Adjunto e Diretor (institucionais””, ouvidoria, unidades acadêmicas, centros, fundações credenciadas)",
        axis: 4,
        limitHours: 40,
        details: { "Carga horária": "" },
      },
      {
        _id: 75,
        description:
          "Vice-diretor (institucionais, ouvidoria especializada, unidades acadêmicas. centros, fundações credenciadas)",
        axis: 4,
        limitHours: 30,
        details: { "Carga horária": "" },
      },
      {
        _id: 76,
        description: "Coordenador",
        axis: 4,
        limitHours: 20,
        details: { "Carga horária": "" },
      },
      {
        _id: 77,
        description: "Coordenador de graduação",
        axis: 4,
        limitHours: 20,
        details: { "Carga horária": "" },
      },
      {
        _id: 78,
        description: "Coordenador de pós-graduação",
        axis: 4,
        limitHours: 20,
        details: { "Carga horária": "" },
      },
      {
        _id: 79,
        description: "Chefe de departamento",
        axis: 4,
        limitHours: 20,
        details: { "Carga horária": "" },
      },
      {
        _id: 80,
        description: "Membro de colegiado",
        axis: 4,
        limitHours: 2,
        details: { "Carga horária": "" },
      },
      {
        _id: 81,
        description: "Membro do NDE",
        axis: 4,
        limitHours: 4,
        details: { "Carga horária": "" },
      },
      {
        _id: 82,
        description: "Membro de comissão departamental",
        axis: 4,
        limitHours: 4,
        details: { "Carga horária": "" },
      },
      {
        _id: 83,
        description: "Membro de comissão institucional",
        axis: 4,
        limitHours: 4,
        details: { "Carga horária": "" },
      },
      {
        _id: 84,
        description: "Diretor e/ou vice-diretor de fundações de apceio",
        axis: 4,
        limitHours: 10,
        details: { "Carga horária": "" },
      },
      {
        _id: 85,
        description: "Membro do conselho curador das fundações de apoio",
        axis: 4,
        limitHours: 2,
        details: { "Carga horária": "" },
      },
      {
        _id: 86,
        description: "Colaboração ad-hoc em instituições de fomento",
        axis: 4,
        limitHours: 2,
        details: { "Carga horária": "" },
      },
      {
        _id: 87,
        description: "Assessoria à UFJF",
        axis: 4,
        limitHours: 40,
        details: { "Carga horária": "" },
      },
      {
        _id: 88,
        description: "Editor de periódico",
        axis: 4,
        limitHours: 4,
        details: { "Carga horária": "" },
      },
      {
        _id: 89,
        description: "Coordenação de PIBID",
        axis: 4,
        limitHours: 2,
        details: { "Carga horária": "" },
      },
      {
        _id: 90,
        description:
          "Participação em reuniões institucionais (Departamento e/ou Congregação)",
        axis: 4,
        limitHours: 2,
        details: { "Carga horária": "" },
      },
      {
        _id: 91,
        description: "Coordenação ou gestão de laboratório ou núcleos da UFJF",
        axis: 4,
        limitHours: 2,
        details: { "Carga horária": "" },
      },
      {
        _id: 92,
        description: "Participação em comissão de revalidação de diploma",
        axis: 4,
        limitHours: 2,
        details: { "Carga horária": "" },
      },
      {
        _id: 93,
        description: "Banca de concurso público",
        axis: 4,
        limitHours: 2,
        details: { "Carga horária": "" },
      },
      {
        _id: 94,
        description: "Organização de evento",
        axis: 4,
        limitHours: 2,
        details: { "Carga horária": "" },
      },
      {
        _id: 95,
        description: "Coordenador de disciplina",
        axis: 4,
        limitHours: 6,
        details: { "Carga horária": "" },
      },
      {
        _id: 96,
        description: "Coordenador de Residência",
        axis: 4,
        limitHours: 12,
        details: { "Carga horária": "" },
      },

      //eixo 5 - capacitacao e representação

      {
        _id: 97,
        description: "Capacitação (afastamento integral)",
        axis: 5,
        limitHours: 40,
        details: {
          "Carga horária": "",
          Motivo: "",
          Local: "",
          "Atividades Realizadas": "",
          Meses: "",
        },
      },
      {
        _id: 98,
        description: "Capacitação (afastamento parcial)",
        axis: 5,
        limitHours: 40,
        details: {
          "Carga horária": "",
          Motivo: "",
          Local: "",
          "Atividades Realizadas": "",
          Meses: "",
        },
      },
      {
        _id: 99,
        description: "Representação de classe",
        axis: 5,
        limitHours: 40,
        details: { "Carga horária": "" },
      },
      {
        _id: 100,
        description: "Representação junto a órgãos do Governo",
        axis: 5,
        limitHours: 40,
        details: {
          "Carga horária": "",
        },
      },
    ],
  },
];

let activity = [
  {
    model: "Activity",
    documents: [
      {
        description: "Aula de Grafos",
        category: 1,
        year: 1,
        department: 1,
        user: "614401eb8d6097f97f7f3d19",
        details: {
          Período: "2019/1",
          Alunos: "12",
          "Carga Horária": "4",
          Disciplina: "DCC001",
          Turma: "A",
        },
      },
      {
        description: "Aula de ED2",
        category: 1,
        year: 1,
        department: 1,
        user: "614401eb8d6097f97f7f3d19",
        details: {
          Período: "2019/3",
          Alunos: "12",
          "Carga Horária": "4",
          Disciplina: "DCC131",
          Turma: "A",
        },
      },
    ],
  },
];

seeder.connect("mongodb://127.0.0.1:27017/relate", function () {
  seeder.loadModels([
    "src/models/user",
    "src/models/year",
    "src/models/category",
    "src/models/activity",
    "src/models/axis",
    "src/models/department",
    "src/models/institution",
  ]);

  seeder.clearModels(
    [
      "User",
      "Year",
      "Category",
      "Activity",
      "Axis",
      "Department",
      "Institution",
    ],
    function () {
      seeder.populateModels(year, function () {
        seeder.disconnect();
      });
      seeder.populateModels(category, function () {
        seeder.disconnect();
      });
      seeder.populateModels(activity, function () {
        seeder.disconnect();
      });
      seeder.populateModels(axis, function () {
        seeder.disconnect();
      });
      seeder.populateModels(department, function () {
        seeder.disconnect();
      });
      seeder.populateModels(institution, function () {
        seeder.disconnect();
      });
      seeder.populateModels(user, function () {
        seeder.disconnect();
      });
    }
  );
});
