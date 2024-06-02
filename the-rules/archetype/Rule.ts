import type {Step} from "./Step.ts";

export type Rule = {
    description?: string
    name?: string
    steps?: Step[]
    followed?: boolean
}
