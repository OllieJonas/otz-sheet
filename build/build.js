const fs = require("fs")
const handlebars = require("handlebars")
const template = handlebars.compile(fs.readFileSync("./build/template.hbs", {encoding: 'utf8', flag: 'r'}))

const GITHUB_LINK = "https://raw.githubusercontent.com/OllieJonas/scrape-dbd-perks/master/out/spreadsheet_LATEST.json"

async function buildPage() {
    let spreadsheet = await fetch(GITHUB_LINK)
    let spreadsheetText = await spreadsheet.text()
    return JSON.parse(spreadsheetText)
}

buildPage().then(data => fs.writeFileSync("./dist/index.html", template(data)))