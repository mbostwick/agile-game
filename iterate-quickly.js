const readline = require("readline");
const interfaceForStartingAgileGame = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// this section is for wizard who don't need types
// if you think nothing needs types, then you likely also value chaos, in which case
// no one will read this comment, now think about it a little longer
// now that you have read this comment, we can agree that if we need to agree on something it must take some form
// now chaos is of course a form, but objectively I have now defined chaos, as the comment on line 8
// should the comment no longer be on line 8, please see the iterate-quickly.js file
// should this comment not be in iterate-quickly.js please make sure to read all the comments again
// export const type chaos = "no one will read this comment, now think about it a little longer";
// function writeCode(comments:chaos): boolean { return !comments ? !!"order" : false }
interfaceForStartingAgileGame.question("Did you read the rules ? (y/n) ", function(ans) {
    if (ans === "y" || ans === "yes") {
        console.log("we should really tell people about updates and such, but who has time for that ? ");
        console.log("You already know there is a readme called the-rules");
        process.exit(0);
    } else {
        console.log("there is a folder called the-rules, which has a readme and provides most of the functional things");
        process.exit(1);
    }
    interfaceForStartingAgileGame.pause();
});
