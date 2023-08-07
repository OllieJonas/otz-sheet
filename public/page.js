const SURVIVOR_METAINFO = [
    ["Stealth", "./assets/images/survivor_stealth.png", "Character size and visibility when using their darkest cosmetics."],
    ["Healthy Noises", "./assets/images/icon_healthy.png", "Noise made when standing still, running and performing actions."],
    ["Injured Noises", "./assets/images/icon_injured.png", "Loudness, clarity and consistency of grunts when injured."]
]


const KILLER_METAINFO = [
    ["Movement Speed", "./assets/images/icon_movement_speed.png", ""],
    ["Terror Radius", "./assets/images/icon_terror_radius.png", ""]
]

let perks;
let characters;

async function getPerks() {
    perks = await fetch("https://raw.githubusercontent.com/OllieJonas/scrape-dbd-perks/master/out/perks_LATEST.json");
    perks = await perks.text();
    perks = JSON.parse(perks);
}

async function getCharacters() {
    characters = await fetch("https://raw.githubusercontent.com/OllieJonas/scrape-dbd-perks/master/out/characters_LATEST.json");
    characters = await characters.text();
    characters = JSON.parse(characters);
}


function prepareSidebar(sidebar) {
    if (sidebar === null) return;

    sidebar.addEventListener("click", function (event) {
        if (event.target.tagName === "A") {
            sidebar.classList.remove("open");
        }
    });
}

let modalDepth = 0;

function showPerkDetails(dataset) {
    let role = dataset.role;
    let perkName = dataset.perkname;
    let perkCharacter = dataset.character.replace("The ", "");

    const modalTemplate = document.getElementById("perkInfo").content.cloneNode(true);
    const modal = modalTemplate.querySelector(".modalbg");

    const perkImage = document.createElement("img");
    perkImage.classList.add("modalPerkImage");

    perkImage.src = perks[role][perkCharacter][perkName]['icon'];
    perkImage.alt = perkName;

    modal.addEventListener("click", event => {
        if (event.target === modal) {
            modal.remove();
            if (--modalDepth === 0) {
                document.body.classList.remove("blur");
            }
        }
    })

    // console.log(dataset.role);
    // console.log(dataset.perkname);
    // console.log(dataset.character.replace("The ", ""));

    modal.querySelector(".perkName").textContent = perks[role][perkCharacter][perkName]['name'];

    modal.querySelector(".perkCharacter").textContent = (perkCharacter === "All") ?
        `${role.charAt(0).toUpperCase() + role.slice(1)} Base Perk` :
        `${role === "killers" ? "The " : ""} ${perkCharacter} Teachable Perk`;
    modal.querySelector(".perkDescription").innerHTML = perks[role][perkCharacter][perkName]['description'];
    modal.querySelector(".perkDescription").prepend(perkImage);

    modalDepth++;
    document.body.appendChild(modal);
    document.body.classList.add("blur");
}

function showCharacterExample(characterType) {
    const modalTemplate = document.getElementById("exampleCharacter").content.cloneNode(true);
    const modal = modalTemplate.querySelector(".modalbg");

    const metaInfo = modal.querySelector(".metaInfo");
    const metaInfoDivs = metaInfo.querySelectorAll("div");
    let meta = characterType === "survivors" ? SURVIVOR_METAINFO : KILLER_METAINFO;

    for (let i = 0; i < metaInfoDivs.length; i++) {
        let div = metaInfoDivs[i];

        if (i >= meta.length) {
            div.remove();
            break;
        }

        let info = meta[i];
        div.querySelector(".miscText").textContent = info[0];
        div.querySelector(".miscImage").src = info[1];
        div.querySelector(".miscImage").alt = info[0];
    }

    const exampleExtraInfo = modal.querySelector(".exampleExtraInfo");

    if (characterType === "survivors") {
        // add exhaustion perk icon
        const exhaustionPerk = modal.querySelector(".perks").querySelectorAll("div")[1];
        const exhaustionPerkDiv = document.createElement('div');
        exhaustionPerkDiv.className = "exhaustionPerk";

        const exhaustionText = document.createElement("p");
        exhaustionText.className = "exhaustionText";
        exhaustionText.textContent = "Exhaustion Perk";

        const exhaustionIcon = document.createElement("img");
        exhaustionIcon.className = 'exhaustionIcon';
        exhaustionIcon.src = "https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/e/ef/IconStatusEffects_exhausted.png";
        exhaustionIcon.alt = "Exhaustion Symbol";

        exhaustionPerkDiv.appendChild(exhaustionText);
        exhaustionPerkDiv.appendChild(exhaustionIcon);

        exhaustionPerk.insertBefore(exhaustionPerkDiv, exhaustionPerk.firstChild);
        // add extra info on bottom
        exampleExtraInfo.querySelectorAll("p").forEach((div, i) => {
            let info = meta[i];
            const bold = document.createElement('b');
            bold.textContent = `${info[0]}: `;
            div.textContent = info[2];
            div.insertBefore(bold, div.firstChild);
        });
    } else {
        exampleExtraInfo.remove();
    }

    modal.addEventListener("click", event => {
        if (event.target === modal) {
            modal.remove();
            if (--modalDepth === 0) {
                document.body.classList.remove("blur");
            }
        }
    })

    modalDepth++;
    document.body.appendChild(modal);
    document.body.classList.add("blur");
}

function updateTabFromUrl() {
    const hashIndex = window.location.href.indexOf("#");
    const fragment = hashIndex !== -1 ? window.location.href.substring(hashIndex + 1) : "";
    const radioButtons = document.querySelectorAll("input[type=radio][name=role]")

    if (radioButtons.length === 2 && fragment.toLowerCase() === "survivors") {
        radioButtons[0].checked = false;
        radioButtons[1].checked = true;
    }
}

document.addEventListener("DOMContentLoaded", updateTabFromUrl);
document.addEventListener("hashchange", updateTabFromUrl);

getPerks();
getCharacters();

prepareSidebar(document.querySelector("#killerSidebar"));
prepareSidebar(document.querySelector("#survivorSidebar"));

// base perks sidebar auto-scrolling
let sidebarHeight = undefined;

document.addEventListener("scroll", function() {
    const sidebar = document.querySelector(".universalSidebar");
    console.log(sidebar);

    if (sidebarHeight === undefined) sidebarHeight = sidebar.offsetTop;

    const scrollPosition = window.scrollY;

    if (scrollPosition >= sidebarHeight) {
        sidebar.classList.add("stickyUniversalSidebar");
    } else {
        console.log("hi!");
        sidebar.classList.remove("stickyUniversalSidebar");
        sidebar.offsetTop = sidebarHeight;
    }
});

document.addEventListener("click", function(event) {
    if (event.target.classList.contains("perk")) {
        showPerkDetails(event.target.dataset);

    } else if (event.target.classList.contains("perkIcon") || event.target.classList.contains("perkName") || event.target.classList.contains("exhaustionIcon")) {
        event.stopPropagation();
        showPerkDetails(event.target.parentNode.dataset);

    } else if (event.target.classList.contains("sidebarTab") || (event.target.classList.contains("universalSidebarTab"))) {
        event.target.parentNode.classList.toggle("open");

    } else if (event.target.classList.contains("universalSidebarText")) {
        event.target.parentNode.parentNode.classList.toggle("open");

    } else if (event.target.classList.contains("help")) {
        showCharacterExample(event.target.dataset.characterType);
    }
});