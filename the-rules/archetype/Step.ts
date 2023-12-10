
export type KnownSteps = "read" | "has-file" | "read-if-not-followed";

export type OptionInputType = "file" | "literal";
export interface StepOption {
    name: string
    text: string
    kind: OptionInputType
}
export interface Step {
    kind: KnownSteps
    options?: StepOption[]
}