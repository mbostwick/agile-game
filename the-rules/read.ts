import JSON5 from "json5";
import { resolve } from 'path';
import { readdirSync, readFileSync } from "fs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

export interface Rule {
    description?: string
    name?: string
    followed?: boolean
}

function userFollowedRule(rule: Rule): boolean{
    console.log(rule.description)
    console.log(rule.name, "has now been read..")
    return rule.followed;
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
    const [major] = process.versions.node.split('.').map(Number)
    if(major < 18){
        console.log("so yah a dev saw you didn't have the right node version, but they didn't want to write a more complex way of reading files... " +
            "your node version", major)
        someoneWonTheGame = false;
    }
    if(someoneWonTheGame) {
        console.log("hello");
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