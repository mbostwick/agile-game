import type {Ticket} from "../archetype/Ticket.js";
import {Octokit} from "octokit";
import {useState} from "react";
import { Box, Text } from 'ink';
import {Select, TextInput} from '@inkjs/ui';
import {readFileSync} from "node:fs";
function getToken(): string {
    const fText = readFileSync("..\\git.token")
    return fText.toString();
}

async function createTicket(title: string, body: string = ""): Promise<Ticket> {
// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
    const octokit = new Octokit({ auth: getToken() });
// Compare: https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
    const {
        data: { login },
    } = await octokit.rest.users.getAuthenticated();
    console.log("Creating Ticket For %s", login);

    const {
            data: ticket
        }= await octokit.rest.issues.create({
            owner: "mbostwick",
            repo: "agile-game",
            title,
            body,
        })
    ;
    return ticket;
}

export function NewIssue(props: { back: ()=> void}){
    const [activeInput, setActiveInput] = useState('title');
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    return (<>
        <Box flexDirection="column" gap={1}>
            <Box flexDirection="column">
                <TextInput
                    isDisabled={activeInput !== 'title'}
                    placeholder="Enter Ticket Title"
                    onChange={setTitle}
                    onSubmit={() => {
                        setActiveInput('desc');
                    }}
                />

                <TextInput
                    isDisabled={activeInput !== 'desc'}
                    placeholder="Enter Ticket Description"
                    onChange={setDesc}
                    onSubmit={() => {
                        setActiveInput('submit');
                    }}
                />
                <Select
                    isDisabled={activeInput !== 'submit'}
                    options={[
                        {
                            label: 'create',
                            value: 'create',
                        },
                        {
                            label: 'back',
                            value: 'back',
                        },
                    ]}
                    onChange={newValue => {
                        if(newValue == "create") {
                            createTicket(title, desc).then(_x=> {
                                props.back();
                            })
                        }else {
                            props.back();
                        }
                    }}
                />
            </Box>

            <Box flexDirection="column">
                <Text>Title: "{title}"</Text>
                <Text>Description: "{desc}"</Text>
            </Box>
        </Box>
    </>);
}
