const request = require("request");
function titleCase(title) {
  if (title.length > 0) {
    return title.charAt(0).toUpperCase() + title.slice(1);
  }
  return;
}
request.get(
  `https://api.aprs.fi/api/get?name=WA5PMO-B&what=loc&apikey=118189.tA9HQbULuIDRghEx&format=json`,
  function(error, res, body) {
    if (error) {
      console.log(error);
      return;
    }
    let data = JSON.parse(body);

    let embedFields = [];
    for (var i = 0; i < data.entries.length; i++) {
      Object.keys(data.entries[i]).forEach(key => {
        let field = {
          name: titleCase(key),
          value: data.entries[i][key]
        };
        embedFields.push(field);
      });
    }
    const locationEmbed = {
      color: "config.embed_color",
      author: {
        name: "APRS Bot"
      },
      fields: embedFields,
      image: {
        url: "miniMapUrl"
      },
      timestamp: new Date(),
      footer: {
        text: "Data sourced from https://aprs.fi/"
      }
    };
    console.log(locationEmbed);
  }
);
