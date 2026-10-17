
/**
 * Blogger Atom Tools
 * Importa metadados do feed Atom do Blogger para o Google Sheets.
 *
 * Funções disponíveis:
 * IMPORTAR_ATOM_ROBUSTO(urlFeed)
 * IMPORTAR_HOME_ROBUSTO(urlFeed)
 *
 * Formato de data: dd/MM/yyyy
 */

var NAMESPACE_ATOM = "http://www.w3.org/2005/Atom";

/**
 * Importa datas e URLs dos posts do feed Atom.
 *
 * Uso no Google Sheets:
 * =IMPORTAR_ATOM_ROBUSTO("URL_DO_FEED")
 *
 * Retorna:
 * Publicado | Última modificação | URL
 *
 * @param {string} urlFeed URL completa do feed Atom.
 * @return {Array|string} Dados dos posts ou mensagem de erro.
 * @customfunction
 */
function IMPORTAR_ATOM_ROBUSTO(urlFeed) {
  if (!urlFeed) {
    return "Forneça a URL do Feed.";
  }

  try {
    var response = UrlFetchApp.fetch(urlFeed, {
      muteHttpExceptions: true
    });

    var responseCode = response.getResponseCode();

    if (responseCode !== 200) {
      return "Erro HTTP: " + responseCode;
    }

    var document = XmlService.parse(response.getContentText());
    var root = document.getRootElement();
    var atom = XmlService.getNamespace(NAMESPACE_ATOM);
    var entries = root.getChildren("entry", atom);
    var output = [];

    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];

      var publishedEl = entry.getChild("published", atom);
      var updatedEl = entry.getChild("updated", atom);

      var publishedStr = publishedEl
        ? publishedEl.getText()
        : "";

      var updatedStr = updatedEl
        ? updatedEl.getText()
        : "";

      var publishedFormatted = formatarDataBR(publishedStr);
      var updatedFormatted = formatarDataBR(updatedStr);
      var link = obterLink(entry.getChildren("link", atom), true);

      output.push([
        publishedFormatted,
        updatedFormatted,
        link
      ]);
    }

    if (output.length === 0) {
      return "Nenhum post encontrado no feed.";
    }

    return output;

  } catch (error) {
    return "Erro ao processar: " + error.message;
  }
}

/**
 * Importa os principais metadados do feed Atom.
 *
 * Uso no Google Sheets:
 * =IMPORTAR_HOME_ROBUSTO("URL_DO_FEED")
 *
 * Retorna:
 * Data do primeiro post | Atualização do feed | URL da home
 *
 * @param {string} urlFeed URL completa do feed Atom.
 * @return {Array|string} Metadados ou mensagem de erro.
 * @customfunction
 */
function IMPORTAR_HOME_ROBUSTO(urlFeed) {
  if (!urlFeed) {
    return "Forneça a URL do Feed.";
  }

  try {
    var response = UrlFetchApp.fetch(urlFeed, {
      muteHttpExceptions: true
    });

    var responseCode = response.getResponseCode();

    if (responseCode !== 200) {
      return "Erro HTTP: " + responseCode;
    }

    var document = XmlService.parse(response.getContentText());
    var root = document.getRootElement();
    var atom = XmlService.getNamespace(NAMESPACE_ATOM);

    var feedUpdatedEl = root.getChild("updated", atom);
    var feedUpdatedStr = feedUpdatedEl
      ? feedUpdatedEl.getText()
      : "";

    var feedUpdatedFormatted = formatarDataBR(feedUpdatedStr);
    var entries = root.getChildren("entry", atom);
    var firstPublishedFormatted = "";

    if (entries.length > 0) {
      var firstPublishedEl = entries[0].getChild(
        "published",
        atom
      );

      var firstPublishedStr = firstPublishedEl
        ? firstPublishedEl.getText()
        : "";

      firstPublishedFormatted = formatarDataBR(
        firstPublishedStr
      );
    }

    var homeLink = obterLink(
      root.getChildren("link", atom),
      false
    );

    return [[
      firstPublishedFormatted,
      feedUpdatedFormatted,
      homeLink
    ]];

  } catch (error) {
    return "Erro ao processar: " + error.message;
  }
}

/**
 * Localiza a URL de uma postagem ou da página inicial.
 *
 * @param {Array} links Elementos link do feed Atom.
 * @param {boolean} linkDePost Indica se é um link de postagem.
 * @return {string} URL encontrada ou string vazia.
 */
function obterLink(links, linkDePost) {
  var primeiroHref = "";

  for (var i = 0; i < links.length; i++) {
    var relAttr = links[i].getAttribute("rel");
    var typeAttr = links[i].getAttribute("type");
    var hrefAttr = links[i].getAttribute("href");

    var rel = relAttr ? relAttr.getValue() : "";
    var type = typeAttr ? typeAttr.getValue() : "";
    var href = hrefAttr ? hrefAttr.getValue() : "";

    if (!href) {
      continue;
    }

    if (!primeiroHref) {
      primeiroHref = href;
    }

    if (rel === "alternate") {
      if (linkDePost) {
        return href;
      }

      if (type === "text/html") {
        return href;
      }
    }
  }

  return primeiroHref;
}

/**
 * Formata uma data ISO para dd/MM/yyyy.
 *
 * Exemplo:
 * 2025-08-17T13:45:00.000-03:00 -> 17/08/2025
 *
 * @param {string} dataIsoStr Data no formato ISO.
 * @return {string} Data formatada ou valor original.
 */
function formatarDataBR(dataIsoStr) {
  if (!dataIsoStr) {
    return "";
  }

  var data = String(dataIsoStr);
  var correspondencia = data.match(
    /^(\d{4})-(\d{2})-(\d{2})(?:T|$)/
  );

  if (!correspondencia) {
    return data;
  }

  var ano = correspondencia[1];
  var mes = correspondencia[2];
  var dia = correspondencia[3];

  return dia + "/" + mes + "/" + ano;
}
