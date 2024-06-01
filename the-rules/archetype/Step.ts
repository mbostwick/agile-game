
export type KnownSteps = "read" | "has-file" | "read-if-not-followed";

export type OptionInputType = "file" | "literal";
export type StepOption = {
    name: string
    text: string
    kind: OptionInputType
}
export type Step  = {
    kind: KnownSteps
    options?: StepOption[]
}
