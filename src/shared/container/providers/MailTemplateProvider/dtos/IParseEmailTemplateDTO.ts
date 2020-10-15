interface ITemplateVariable {
    [key: string]: string | number;
}

export default interface IParseEmailTemplateDTO {
    template: string;
    variables: ITemplateVariable;
}
