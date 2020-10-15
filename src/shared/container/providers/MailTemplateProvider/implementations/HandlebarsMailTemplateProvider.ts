import hadlebars from 'handlebars';
import IParseEmailTemplateDTO from '../dtos/IParseEmailTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
    public async parse({ template, variables }: IParseEmailTemplateDTO): Promise<string> {
        const parseTemplate = hadlebars.compile(template);
        return parseTemplate(variables);
    }
}

export default HandlebarsMailTemplateProvider;
