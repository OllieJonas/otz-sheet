import {BaseSpreadsheetCharacter, Guides, Spreadsheet, SpreadsheetKiller, KillerGuides} from './interfaces'

const GITHUB_BASE: string = "https://raw.githubusercontent.com/OllieJonas/scrape-dbd-perks/master/out/"
const KILLER_SPREADSHEET_URL = GITHUB_BASE + "killer_spreadsheet_LATEST.json"

async function loadSpreadsheet<T extends BaseSpreadsheetCharacter, V extends Guides>(url: string): Promise<Spreadsheet<T, V>> {
    const response: Response = await fetch(url);
    return await response.json();
}

loadSpreadsheet<SpreadsheetKiller, KillerGuides>(KILLER_SPREADSHEET_URL).then(res => console.log(res))