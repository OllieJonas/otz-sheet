const fs = require("fs")
const handlebars = require("handlebars")

const GITHUB_LINK = "https://raw.githubusercontent.com/OllieJonas/scrape-dbd-perks/master/out/spreadsheet_LATEST.json"

async function buildPage() {
    let spreadsheet = await fetch(GITHUB_LINK)
    let spreadsheetText = await spreadsheet.text()
    let json = JSON.parse(spreadsheetText)

    // add guide images manually (really don't like this, but unable to fetch them from Google)
    json['guides']['survivors'][0]['icon'] = "./assets/images/survivor_sounds_0.png";
    json['guides']['survivors'][1]['icon'] = "./assets/images/survivor_sounds_1.png";
    json['guides']['killers'][0]['icon'] = "./assets/images/killer_guide_0.png";
    json['guides']['killers'][1]['icon'] = "./assets/images/killer_guide_1.png";

    return json
}

// Helpers
handlebars.registerHelper("linearGradient", function(direction, red, green, blue, toOpacity) {
    let from = `rgba(${red}, ${green}, ${blue}, 1.0)`
    let to = `rgba(${red}, ${green}, ${blue}, ${toOpacity})`
    return new handlebars.SafeString(
        `linear-gradient(${direction}, ${from}, ${to})`)
});

const template = handlebars.compile(fs.readFileSync("template.hbs", {encoding: 'utf8', flag: 'r'}))
buildPage().then(data => fs.writeFileSync("../index.html", template(data)))