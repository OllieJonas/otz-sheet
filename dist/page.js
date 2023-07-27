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
    console.log(sidebar === null)
    if (sidebar === null) return;
    console.log("definitely not null!");

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
    perkImage.src = perks[perkCharacter][perkName]['icon'];
    perkImage.alt = perkName;

    modal.addEventListener("click", event => {
        if (event.target == modal) {
            modal.remove();
            if (--modalDepth == 0) {
                document.body.classList.remove("blur");
            }
        }
    })

    // console.log(dataset.role);
    // console.log(dataset.perkname);
    // console.log(dataset.character.replace("The ", ""));

    modal.querySelector(".perkName").textContent = perks[perkCharacter][perkName]['name'];
    modal.querySelector(".perkCharacter").textContent = `${role === "killers" ? "The " : ""} ${perkCharacter} Teachable Perk`
    modal.querySelector(".perkDescription").innerHTML = perks[perkCharacter][perkName]['description'];

    modal.querySelector(".perkDescription").prepend(perkImage);

    modalDepth++;
    document.body.appendChild(modal);
    document.body.classList.add(".blur");
}

getPerks();
getCharacters();

prepareSidebar(document.querySelector("#killerSidebar"));
prepareSidebar(document.querySelector("#survivorSidebar"));

document.addEventListener("click", function(event) {
    if (event.target.classList.contains("perk")) {
        showPerkDetails(event.target.dataset);

    } else if (event.target.classList.contains("perkIcon") || event.target.classList.contains("perkName") || event.target.classList.contains("exhaustionIcon")) {
        event.stopPropagation();
        showPerkDetails(event.target.parentNode.dataset);

    } else if (event.target.classList.contains("sidebarTab")) {
        event.target.parentNode.classList.toggle("open");
    }
});