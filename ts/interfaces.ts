// UTIL
export interface ValueWrapper<T> {
    value: T
}

// SPREADSHEET
export interface PerkColour {
    red?: number
    green?: number
    blue?: number
}

export interface SpreadsheetPerk {
    perk_tier: PerkColour
    perk_name: string
}

export interface BaseSpreadsheetCharacter {
    name: string
    perk_tiers: Array<ValueWrapper<PerkColour>>
    perk_names: Array<ValueWrapper<string>>
    availability: string
}

export interface Guides {}

export interface KillerGuides extends Guides {
    latest_tier_list: string,
    which_killer: string,
}

export interface SurvivorGuides extends Guides {

}

export interface Spreadsheet<T extends BaseSpreadsheetCharacter, V extends Guides> {
    characters: Array<T>
    universals: Array<SpreadsheetPerk>
    guides: V
}

export interface SpreadsheetKiller {
    movement_speed: string
    terror_radius: string
}

export interface SpreadsheetSurvivor {
    stealth: string
    noise: string
    cries: string
}

export interface Perk {
    icon: string
    description: string
    is_upcoming_patch: boolean
}

export interface Survivor {
    name: string
    icon: string
    image_half: string
    image_full: string
    wiki_link: string
    lore: string
}

export interface Power {
    name: string
    icon: string
    desc: string
}

export interface Killer extends Survivor {
    former_name: string
    height: string
    power: Power
}
