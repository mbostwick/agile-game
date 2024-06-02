import JSON5 from "json5";
import { resolve } from 'node:path';
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import type {Rule} from "./archetype/Rule.js";


function userFollowedRule(rule: Rule): boolean{
    let followed = rule.followed;
    if((rule?.steps??[]).findIndex(x=> x.kind === "read") >= 0) {
        console.log(rule.description)
        console.log(rule.name, "has now been read..")
    }
    const indexOfHasFile = (rule?.steps ??[]).findIndex(x => x.kind === "has-file");
    if(rule?.steps && indexOfHasFile >= 0){
        followed = false;
        const options = rule.steps[indexOfHasFile].options ??[];
        const fileOptionIndex = options.findIndex(x => x.kind === "file")
        if(fileOptionIndex >= 0){
            followed = existsSync(options[fileOptionIndex].text);
        }
    }
    if(rule?.steps && !followed){
        const indexOfReadIfNotFollowed = rule?.steps.findIndex(x => x.kind === "read-if-not-followed");
        if(indexOfReadIfNotFollowed >= 0){
            console.log(`${rule.name} was not followed`)
            console.log(rule.description)
        }
    }
    return followed ?? false;
}

function getRule(fPath: string): Rule{
    const fText = readFileSync(fPath)
    return JSON5.parse(fText.toString());
}


async function* getFiles(dir: string): AsyncGenerator<Rule> {
    const dirsRead = readdirSync(dir, { withFileTypes: true });
    for (const dirent of dirsRead) {
        const res = resolve(dir, dirent.name);
        if (dirent.isDirectory()) {
            yield* getFiles(res);
        } else {
            yield getRule(res);
        }
    }
}


let someoneWonTheGame = true;
try{
    if(someoneWonTheGame) {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const theRules = await getFiles(`${__dirname}\\data`);
        for await (const givenRule of theRules) {
            if(!userFollowedRule(givenRule)){
                someoneWonTheGame = false;
            }
        }
        if(someoneWonTheGame) {
            console.log("You Win!")
        }else{
            console.log("You did not follow the rules, or at least I think that's what happened, I guess its based on how you read the rules..")
        }
    }
} catch(e){
    console.warn("You didn't play the game right, so you lost or are lost, who can really say.. maybe the node program ?", e);
}
// console.log("maybe ... I mean this comment is proof that really you can't win, but you can have fun trying...")
