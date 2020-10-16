import fs from 'fs';
import hadlebars from 'handlebars';
import IParseEmailTemplateDTO from '../dtos/IParseEmailTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
    public async parse({ file, variables }: IParseEmailTemplateDTO): Promise<string> {
        const templateFileContent = await fs.promises.readFile(file, {
            encoding: 'utf-8',
        });
        const parseTemplate = hadlebars.compile(templateFileContent);
        return parseTemplate(variables);
    }
}

export default HandlebarsMailTemplateProvider;
