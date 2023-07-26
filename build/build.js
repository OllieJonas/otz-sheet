const fs = require("fs")
const handlebars = require("handlebars")

const GITHUB_LINK = "https://raw.githubusercontent.com/OllieJonas/scrape-dbd-perks/master/out/spreadsheet_LATEST.json"

async function buildPage() {
    let spreadsheet = await fetch(GITHUB_LINK)
    let spreadsheetText = await spreadsheet.text()
    return JSON.parse(spreadsheetText)
}

// Helpers
handlebars.registerHelper("linearGradient", function(direction, red, green, blue, toOpacity) {
    let from = `rgba(${red}, ${green}, ${blue}, 1.0)`
    let to = `rgba(${red}, ${green}, ${blue}, ${toOpacity})`
    return new handlebars.SafeString(
        `linear-gradient(${direction}, ${from}, ${to})`)
});

const template = handlebars.compile(fs.readFileSync("./build/template.hbs", {encoding: 'utf8', flag: 'r'}))
buildPage().then(data => fs.writeFileSync("./dist/index.html", template(data)))