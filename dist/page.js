console.log("Hello, world!")

document.addEventListener("click", function(event) {
    let showPerkDetails = false;
    let characterName = "All";
    let perkName = "";

    for (const class_ of event.target.classList) {
        if (class_.startsWith("perk")) {
            console.log(event.target.dataset.role);
            console.log(event.target.dataset.perkname);
            console.log(event.target.dataset.character.replace("The ", ""));
            break;
        }
    }

    if (showPerkDetails) {
        console.log(`name: ${characterName}, perk: ${perkName}`)
    }
});