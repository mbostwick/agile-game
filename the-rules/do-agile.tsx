// @ts-ignore
import React, {useState} from 'react';
import {render, Box, useApp } from 'ink';
import {Select} from '@inkjs/ui';
import {NewIssue} from "./components/NewIssue.tsx";


export type agile_choices= "start" | "new-ticket" | "exit";
function mapTextToChoice(text: string): agile_choices {
    switch (text){
        case "exit":
        case "new-ticket":
        case "start":{
            return text;
        }
        default:{
            return "start";
        }
    }
}
function ChoiceDisplay(){
    const {exit} = useApp();
    const [choice, setMadeChoice] = useState<agile_choices>("start");
    const handleChoice = (newValue: agile_choices) => {
        switch (newValue){
            case "exit":{
                exit();
            }
        }
        setMadeChoice(newValue);
    }
    return <Box flexDirection={`column`} alignItems={`center`} justifyContent={`center`} width={`100%`}>
        {choice === "start" && <Box justifyContent={`center`} width={`100%`}>
            <Select
                options={[
                    {
                        label: 'New Ticket',
                        value: 'new-ticket',
                    },
                    {
                        label: 'exit',
                        value: 'exit',
                    },
                ]}
                onChange={newValue => {
                    handleChoice(mapTextToChoice(newValue));
                }}
            />
        </Box> }
        {choice === "new-ticket" ? (<Box>
            <NewIssue back={() => { (setMadeChoice("start")) }} />
        </Box>) : null}
        <Box height={1} />
        <Box height={1} />
    </Box>
}
const ui = <ChoiceDisplay />;
const result = render(ui, {debug: true,});
await result.waitUntilExit()

