export type FieldValidatorType = (value: string) => string | undefined

export const required: FieldValidatorType = value => {
    if(value) return undefined;

    return "this field is required";
}

export const maxLengthCreator = (maxLength: number):FieldValidatorType => (value) => {
    if(value.length > maxLength) return `max length is ${maxLength}`;

    return undefined;
}