let seeder = require("mongoose-seed");

const Activity = require("./models/Activity");
const Axis = require("./models/Axis");
const Category = require("./models/Category");
const Department = require("./models/Department");
const Institution = require("./models/Institution");
const User = require("./models/User");
const Year = require("./models/Year");

async function seed() {
  try {
    // Limpar dados existentes
    await Activity.deleteMany({});
    await Axis.deleteMany({});
    await User.deleteMany({});
    await Department.deleteMany({});
    await Institution.deleteMany({});
    await Category.deleteMany({});
    await Year.deleteMany({});
    console.log("Esvaziando Tabelas");

    // const axis = await Axis.insertMany([
    //   { name: "Ensino", ref: "teaching", limit: 16, icon: "book" },
    //   {
    //     name: "Pesquisa",
    //     ref: "researching",
    //     limit: 24,
    //     icon: "gradient",
    //   },
    //   {
    //     name: "Extensão",
    //     ref: "extension",
    //     limit: 16,
    //     icon: "move-to-inbox",
    //   },
    //   {
    //     name: "Atividade Administrativa",
    //     ref: "management",
    //     limit: 40,
    //     icon: "how-to-vote",
    //   },
    //   {
    //     name: "Capacitação e Representação",
    //     ref: "leave",
    //     limit: 40,
    //     icon: "nat",
    //   },
    // ]);
    // console.log("Add axis");
    
    // const years = await Year.insertMany([
    //   { year: 2021 },
    //   { year: 2022 },
    //   { year: 2023 },
    // ]);
    // console.log("Add Years");

    // const institutions = await Institution.insertMany([
    //   { name: "Universidade Federal de Juiz de Fora" },
    // ]);
    // console.log("Add institutions");

    // const departments = await Department.insertMany([
    //   { name: "Ciência da Computação" },
    //   { name: "Física" },
    //   { name: "Química" },
    //   { name: "Artes" },
    //   { name: "Filosofia" },
    //   { name: "Engenharia" },
    // ]);
    // console.log("Add departments");

    // const categories = await Category.insertMany([
    //   //eixo 1 - ensino
    //   {
    //     description:
    //       "Hora aula + (teórica, prática, de estágio, de laboratório ou de campo em graduação ou pós-graduação não remunerada)",
    //     axis: axis[0]._id,
    //     limitHours: 20,
    //     details: {
    //       "Carga horária": "",
    //       Período: "",
    //       Alunos: "",
    //       Disciplina: "",
    //       Turma: "",
    //     },
    //   },
    //   {
    //     description: "Ensino a distância — professor",
    //     axis: axis[0]._id,
    //     limitHours: 12,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Ensino a distância — tutor",
    //     axis: axis[0]._id,
    //     limitHours: 12,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Orientação e co-orientação de monografia e/ou TCC",
    //     axis: axis[0]._id,
    //     limitHours: 8,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Orientação de dissertação",
    //     axis: axis[0]._id,
    //     limitHours: 8,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Orientação de tese",
    //     axis: axis[0]._id,
    //     limitHours: 9,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Co-orientação de tese e de dissertação ",
    //     axis: axis[0]._id,
    //     limitHours: 6,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Supervisão de pós-doutorado",
    //     axis: axis[0]._id,
    //     limitHours: 6,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description:
    //       "Preparação, avaliação, correção e atendimento aos alunos na educação básica",
    //     axis: axis[0]._id,
    //     limitHours: 0,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description:
    //       "Preparação, avaliação. correção e atendimento aos alunos graduação (até 40 alunos)",
    //     axis: axis[0]._id,
    //     limitHours: 0,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description:
    //       "Preparação, avaliação, correção e atendimento aos alunos na graduação (acima de 40 alunos)",
    //     axis: axis[0]._id,
    //     limitHours: 0,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description:
    //       "Preparação, avaliação, correção e atendimento aos alunos na pós graduação",
    //     axis: axis[0]._id,
    //     limitHours: 0,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Participação em banca de TCC e/ou monografia",
    //     axis: axis[0]._id,
    //     limitHours: 1,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Participação banca de defesa de dissertação",
    //     axis: axis[0]._id,
    //     limitHours: 1,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Participação em defesa de tese",
    //     axis: axis[0]._id,
    //     limitHours: 2,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Coordenação de grupo de estudo cadastrado",
    //     axis: axis[0]._id,
    //     limitHours: 3,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Supervisão de estágio curricular ou internato",
    //     axis: axis[0]._id,
    //     limitHours: 5,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Orientação e supervisão de estágio não curricular",
    //     axis: axis[0]._id,
    //     limitHours: 5,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Orientação de monitoria (6 horas por projeto)",
    //     axis: axis[0]._id,
    //     limitHours: 2,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Orientação de monitoria (12 por projeto)",
    //     axis: axis[0]._id,
    //     limitHours: 3,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Orientação de treinamento profissional",
    //     axis: axis[0]._id,
    //     limitHours: 3,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description:
    //       "Atender e orientar discentes e programas de bolsas de ensino da Instituição ou decorrentes de convênio",
    //     axis: axis[0]._id,
    //     limitHours: 3,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Preceptor ou tutor de Residência",
    //     axis: axis[0]._id,
    //     limitHours: 4,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Sobreaviso ou prontidão para execução de serviço",
    //     axis: axis[0]._id,
    //     limitHours: 6,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description:
    //       "Orientação no âmbito do projeto de universalização das linguas estrangeiras e idiomas sem fronteiras",
    //     axis: axis[0]._id,
    //     limitHours: 4,
    //     details: { "Carga horária": "" },
    //   },

    //   //eixo 2 - pesquisa

    //   {
    //     description: "Coordenador de grupo de pesquisa cadastrado",
    //     axis: axis[1]._id,
    //     limitHours: 3,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Membro de grupo de pesquisa cadastrado",
    //     axis: axis[1]._id,
    //     limitHours: 2,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description:
    //       "Coordenador de projeto registrado na PROPP ou outro agente de fomento",
    //     axis: axis[1]._id,
    //     limitHours: 3,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description:
    //       "Membro de projeto registrado na PROPP ou outro agente de fomento",
    //     axis: axis[1]._id,
    //     limitHours: 2,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Orientação de aluno em Iniciação Científica",
    //     axis: axis[1]._id,
    //     limitHours: 2,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description:
    //       "Organização de Congresso, Seminário. Simpósio, Workshop etc.",
    //     axis: axis[1]._id,
    //     limitHours: 2,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description:
    //       "Participação em Congresso, Seminário, Simpósio, Workshop etc.",
    //     axis: axis[1]._id,
    //     limitHours: 1,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description:
    //       "Participação com apresentação de trabalho em Congresso, Seminário, Simpósio, Workshop etc.",
    //     axis: axis[1]._id,
    //     limitHours: 1.5,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Palestras, conferência, mesa redonda e aula inaugural",
    //     axis: axis[1]._id,
    //     limitHours: 2,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Parecerista e revisor de artigo e/ou evento",
    //     axis: axis[1]._id,
    //     limitHours: 1.5,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description:
    //       "Submissão ou participação comprovada de artigo em Revista acadêmica",
    //     axis: axis[1]._id,
    //     limitHours: 6,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description:
    //       "Submissão ou participação comprovada de trabalho ou projeto acadêmico",
    //     axis: axis[1]._id,
    //     limitHours: 5,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Submissão comprovada de livro indexado",
    //     axis: axis[1]._id,
    //     limitHours: 7,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Tradução publicada de livro",
    //     axis: axis[1]._id,
    //     limitHours: 2,
    //     details: {
    //       "Carga horária": "",
    //       Autoria: "",
    //       "Título da Obra": "",
    //       Local: "",
    //       Data: "",
    //     },
    //   },
    //   {
    //     description: "Tradução publicada de artigo ou capítulo de livro",
    //     axis: axis[1]._id,
    //     limitHours: 1,
    //     details: {
    //       "Carga horária": "",
    //       Autoria: "",
    //       "Título da Obra": "",
    //       Local: "",
    //       Data: "",
    //     },
    //   },
    //   {
    //     description: "Resenha publicada",
    //     axis: axis[1]._id,
    //     limitHours: 1,
    //     details: {
    //       "Carga horária": "",
    //       Autoria: "",
    //       "Título da Obra": "",
    //       Local: "",
    //       Data: "",
    //     },
    //   },
    //   {
    //     description: "Capitulo de livro publicado",
    //     axis: axis[1]._id,
    //     limitHours: 5,
    //     details: {
    //       "Carga horária": "",
    //       Autoria: "",
    //       "Título da Obra": "",
    //       Local: "",
    //       Data: "",
    //     },
    //   },
    //   {
    //     description: "Verbete em dicionário publicado",
    //     axis: axis[1]._id,
    //     limitHours: 1,
    //     details: {
    //       "Carga horária": "",
    //       Autoria: "",
    //       "Título da Obra": "",
    //       Local: "",
    //       Data: "",
    //     },
    //   },
    //   {
    //     description: "Cartas, mapas. maquetes ou Similares publicados",
    //     axis: axis[1]._id,
    //     limitHours: 1,
    //     details: {
    //       "Carga horária": "",
    //       Autoria: "",
    //       "Título da Obra": "",
    //       Local: "",
    //       Data: "",
    //     },
    //   },
    //   {
    //     description: "Material didático publicado",
    //     axis: axis[1]._id,
    //     limitHours: 1,
    //     details: {
    //       "Carga horária": "",
    //       Autoria: "",
    //       "Título da Obra": "",
    //       Local: "",
    //       Data: "",
    //     },
    //   },
    //   {
    //     description: "Artigo publicado em anais de evento acadêmico",
    //     axis: axis[1]._id,
    //     limitHours: 1,
    //     details: {
    //       "Carga horária": "",
    //       Autoria: "",
    //       "Título da Obra": "",
    //       Local: "",
    //       Data: "",
    //     },
    //   },
    //   {
    //     description: "Produto ou processo com registro de patente",
    //     axis: axis[1]._id,
    //     limitHours: 5,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Softwares. aplicativo, produto ou técnica registrados",
    //     axis: axis[1]._id,
    //     limitHours: 5,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Produção artística coletiva ou individual",
    //     axis: axis[1]._id,
    //     limitHours: 5,
    //     details: { "Carga horária": "" },
    //   },

    //   //eixo 3 - extensao
    //   {
    //     description:
    //       "Coordenação de projeto ou programa regisirado na PROEX ou outro agente de financiamento",
    //     axis: axis[2]._id,
    //     limitHours: 3,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description:
    //       "Participação em projeto ou programa registrado na PROEX ou outro agente de financiamento",
    //     axis: axis[2]._id,
    //     limitHours: 2,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description:
    //       "Coordenação de projeto ou programa de extensão com ou sem financiamento",
    //     axis: axis[2]._id,
    //     limitHours: 3,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description:
    //       "Participação em projeto ou programa de extensão com ou sem financiamento",
    //     axis: axis[2]._id,
    //     limitHours: 2,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description:
    //       "Participação em atividades de extensão da Universidade ou outros órgãos suplementares",
    //     axis: axis[2]._id,
    //     limitHours: 3,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Palestras, dinâmicas ou treinamento de extensão",
    //     axis: axis[2]._id,
    //     limitHours: 2,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description:
    //       "Organização de palestras, dinâmicas ou treinamento de extensão",
    //     axis: axis[2]._id,
    //     limitHours: 2,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description:
    //       "Coordenação, promoção e produção artística e/ou cultural vinculada à UFJF",
    //     axis: axis[2]._id,
    //     limitHours: 2,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description:
    //       "Participação em Congresso, Seminário, Simpósio, Workshop etc.",
    //     axis: axis[2]._id,
    //     limitHours: 1,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description:
    //       "Participação com apresentação de trabalho em Congresso, Seminário, Simpósio, Workshop etc.",
    //     axis: axis[2]._id,
    //     limitHours: 1.5,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Submissão de trabalho ou projeto de extensão",
    //     axis: axis[2]._id,
    //     limitHours: 5,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Curso de extensão (mínimo 20 horas)",
    //     axis: axis[2]._id,
    //     limitHours: 4,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Curso de extensão (profissionalizante — 40 horas)",
    //     axis: axis[2]._id,
    //     limitHours: 6,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Tutoria de grupos PET, GET e similares",
    //     axis: axis[2]._id,
    //     limitHours: 4,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Orientação de Projetos de Consultoria e Técnico",
    //     axis: axis[2]._id,
    //     limitHours: 1.5,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Coordenação de Empresa Júnior",
    //     axis: axis[2]._id,
    //     limitHours: 4,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Orientação de Empresa Júnior",
    //     axis: axis[2]._id,
    //     limitHours: 1.5,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description:
    //       "Publicação de artigo em Jornal ou Revista (não-acadêmico e de grande circulação)",
    //     axis: axis[2]._id,
    //     limitHours: 0.5,
    //     details: {
    //       "Carga horária": "",
    //       Autoria: "",
    //       "Título da Obra": "",
    //       Local: "",
    //       Data: "",
    //     },
    //   },
    //   {
    //     description:
    //       "Participação em programa de rádio, TV ou canal em razão se sua atividade docente",
    //     axis: axis[2]._id,
    //     limitHours: 0.5,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Prestação de serviço técnico não-remunerado",
    //     axis: axis[2]._id,
    //     limitHours: 1,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Orientação de bolsista de extensão",
    //     axis: axis[2]._id,
    //     limitHours: 2.5,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Atividades de extensão institucional",
    //     axis: axis[2]._id,
    //     limitHours: 12,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Coordenação de eventos",
    //     axis: axis[2]._id,
    //     limitHours: 2,
    //     details: { "Carga horária": "" },
    //   },

    //   //eixo 4 - administrativo
    //   {
    //     description: "Reitor, Vice-reitor e Pró-reitor",
    //     axis: axis[3]._id,
    //     limitHours: 40,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description:
    //       "Pró-reitor Adjunto e Diretor (institucionais””, ouvidoria, unidades acadêmicas, centros, fundações credenciadas)",
    //     axis: axis[3]._id,
    //     limitHours: 40,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description:
    //       "Vice-diretor (institucionais, ouvidoria especializada, unidades acadêmicas. centros, fundações credenciadas)",
    //     axis: axis[3]._id,
    //     limitHours: 30,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Coordenador",
    //     axis: axis[3]._id,
    //     limitHours: 20,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Coordenador de graduação",
    //     axis: axis[3]._id,
    //     limitHours: 20,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Coordenador de pós-graduação",
    //     axis: axis[3]._id,
    //     limitHours: 20,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Chefe de departamento",
    //     axis: axis[3]._id,
    //     limitHours: 20,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Membro de colegiado",
    //     axis: axis[3]._id,
    //     limitHours: 2,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Membro do NDE",
    //     axis: axis[3]._id,
    //     limitHours: 4,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Membro de comissão departamental",
    //     axis: axis[3]._id,
    //     limitHours: 4,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Membro de comissão institucional",
    //     axis: axis[3]._id,
    //     limitHours: 4,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Diretor e/ou vice-diretor de fundações de apceio",
    //     axis: axis[3]._id,
    //     limitHours: 10,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Membro do conselho curador das fundações de apoio",
    //     axis: axis[3]._id,
    //     limitHours: 2,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Colaboração ad-hoc em instituições de fomento",
    //     axis: axis[3]._id,
    //     limitHours: 2,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Assessoria à UFJF",
    //     axis: axis[3]._id,
    //     limitHours: 40,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Editor de periódico",
    //     axis: axis[3]._id,
    //     limitHours: 4,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Coordenação de PIBID",
    //     axis: axis[3]._id,
    //     limitHours: 2,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description:
    //       "Participação em reuniões institucionais (Departamento e/ou Congregação)",
    //     axis: axis[3]._id,
    //     limitHours: 2,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Coordenação ou gestão de laboratório ou núcleos da UFJF",
    //     axis: axis[3]._id,
    //     limitHours: 2,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Participação em comissão de revalidação de diploma",
    //     axis: axis[3]._id,
    //     limitHours: 2,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Banca de concurso público",
    //     axis: axis[3]._id,
    //     limitHours: 2,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Organização de evento",
    //     axis: axis[3]._id,
    //     limitHours: 2,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Coordenador de disciplina",
    //     axis: axis[3]._id,
    //     limitHours: 6,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Coordenador de Residência",
    //     axis: axis[3]._id,
    //     limitHours: 12,
    //     details: { "Carga horária": "" },
    //   },

    //   //eixo 5 - capacitacao e representação

    //   {
    //     description: "Capacitação (afastamento integral)",
    //     axis: axis[4]._id,
    //     limitHours: 40,
    //     details: {
    //       "Carga horária": "",
    //       Motivo: "",
    //       Local: "",
    //       "Atividades Realizadas": "",
    //       Meses: "",
    //     },
    //   },
    //   {
    //     description: "Capacitação (afastamento parcial)",
    //     axis: axis[4]._id,
    //     limitHours: 40,
    //     details: {
    //       "Carga horária": "",
    //       Motivo: "",
    //       Local: "",
    //       "Atividades Realizadas": "",
    //       Meses: "",
    //     },
    //   },
    //   {
    //     description: "Representação de classe",
    //     axis: axis[4]._id,
    //     limitHours: 40,
    //     details: { "Carga horária": "" },
    //   },
    //   {
    //     description: "Representação junto a órgãos do Governo",
    //     axis: axis[4]._id,
    //     limitHours: 40,
    //     details: {
    //       "Carga horária": "",
    //     },
    //   },
    // ]);
    // console.log("Add categories");

    // const users = await User.insertMany([
    //   {
    //     email: "otavioaufegues@gmail.com",
    //     password: "123456",
    //     firstName: "Otávio",
    //     lastName: "Rodrigues",
    //     siape: "202065",
    //     department: departments[0]._id,
    //     username: "otavioaufegues",
    //     regime: 40,
    //     isVerified: true,
    //     isActive: true,
    //   },
    // ]);
    // console.log("Add users");

    // const activities = await Activity.insertMany([
    //   {
    //     description: "Aula de Grafos",
    //     category: categories[0]._id,
    //     year: years[2]._id,
    //     department: departments[0]._id,
    //     user: users[0]._id,
    //     details: {
    //       Período: "2019/1",
    //       Alunos: "12",
    //       "Carga Horária": "4",
    //       Disciplina: "DCC001",
    //       Turma: "A",
    //     },
    //   },
    //   {
    //     description: "Aula de ED2",
    //     category: categories[0]._id,
    //     year: years[2]._id,
    //     department: departments[0]._id,
    //     user: users[0]._id,
    //     details: {
    //       Período: "2019/3",
    //       Alunos: "12",
    //       "Carga Horária": "4",
    //       Disciplina: "DCC131",
    //       Turma: "A",
    //     },
    //   },
    // ]);
    // console.log("Add activities");

    console.log("Seeder concluído com sucesso.");
    process.exit(0);
  } catch (error) {
    console.error("Erro ao executar o seeder:", error);
    process.exit(1);
  }
}

seeder.connect("mongodb://127.0.0.1:27017/relate", async () => {
  console.log("Running");
  await seed();
  seeder.disconnect();
  console.log("Finished");
});
