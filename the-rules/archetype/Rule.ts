import {Step} from "./Step.js";

export interface Rule {
    description?: string
    name?: string
    steps?: Step[]
    followed?: boolean
}