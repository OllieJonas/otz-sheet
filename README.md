# otz-sheet

Code for the website at https://otzdarva.com/characters.

Website displaying information for Otzdarva's Killer & Survivor Info spreadsheet (not including Builds) using Handlebars for Dead by Daylight (DBD).

This project illustrates information scraped from Otzdarva's Quick Info Sheet for DBD (see [Here](https://otzdarva.com/spreadsheet)) and allows users to click on a Perk to get a description of it, taken from the [Dead by Daylight Wiki](https://deadbydaylight.fandom.com/wiki/Perks#All_Perks). This information is scraped in a [separate project](https://github.com/OllieJonas/scrape-dbd-perks). The resulting JSON file used for this can be found [Here (Spreadsheet)](https://github.com/OllieJonas/otz-scraper/tree/master/out/spreadsheet_LATEST.json), and [Here (Perks)](https://github.com/OllieJonas/otz-scraper/tree/master/out/perks_LATEST.json).

This project is deployed on GitHub Pages, and can be found at https://olliejonas.github.io/otz-sheet/. You can also use https://olliejonas.github.io/otz-sheet/#Survivors to access the Survivors tab first. The link at the top redirects to this page (with the Killer tab selected).

This project is heavily inspired by MrTipson's implementation for the Builds portion of the sheet (see [Here](https://github.com/MrTipson/otz-builds)).

