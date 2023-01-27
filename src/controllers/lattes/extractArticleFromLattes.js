const Activity = require("../../models/activity");

module.exports = function extractArticleFromLattes(
  data,
  yearNumberLattes,
  yearId,
  departmentId,
  userId
) {
  const categoryId = 43;
  
  data =
    data["CURRICULO-VITAE"]["PRODUCAO-BIBLIOGRAFICA"]["ARTIGOS-PUBLICADOS"][
      "ARTIGO-PUBLICADO"
    ];

  data.map((v) => {
    let year = v["DADOS-BASICOS-DO-ARTIGO"]["ANO-DO-ARTIGO"];

    let autores = "";
    let tituloArtigo = "";
    let tituloPeriodicoOuRevista = "";
    let paginas = "";

    if (year == yearNumberLattes) {
      // console.log(v);
      v.AUTORES.map((v, i) => {
        let nomeCitacao = v["NOME-PARA-CITACAO"];
        autores += nomeCitacao + " ; ";
      });

      tituloArtigo +=
        ". " + v["DADOS-BASICOS-DO-ARTIGO"]["TITULO-DO-ARTIGO"] + ". ";

      tituloPeriodicoOuRevista +=
        "In: " +
        v["DETALHAMENTO-DO-ARTIGO"]["TITULO-DO-PERIODICO-OU-REVISTA"] +
        ", " +
        yearNumberLattes +
        ". P. ";

      paginas +=
        v["DETALHAMENTO-DO-ARTIGO"]["PAGINA-INICIAL"] +
        "-" +
        v["DETALHAMENTO-DO-ARTIGO"]["PAGINA-FINAL"];

      let description =
        autores + tituloArtigo + tituloPeriodicoOuRevista + paginas;

      saveDetailsLattes(yearId, departmentId, userId, categoryId, description);
    }
  });
  return data;
};

async function saveDetailsLattes(
  yearId,
  departmentId,
  userId,
  categoryId,
  description
) {
  let query = {
      category: categoryId,
      year: yearId,
      department: departmentId,
      user: userId,
      description: description,
    },
    update = {
      details: {},
    },
    options = {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
      useFindAndModify: false,
    };

  await Activity.findOneAndUpdate(
    query,
    update,
    options,
    function (error, result) {
      if (!error) {
        if (!result) result = new Activity();

        result.save(function (error) {
          if (!error) {
            // result.details.set("Publicação", publicacao);
            result.save();
          } else {
            throw error;
          }
        });
      }
    }
  );
}
