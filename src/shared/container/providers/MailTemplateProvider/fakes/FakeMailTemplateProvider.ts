import IParseEmailTemplateDTO from '../dtos/IParseEmailTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

class FakeMailTemplateProvider implements IMailTemplateProvider {
    public async parse({ template }: IParseEmailTemplateDTO): Promise<string> {
        return template;
    }
}

export default FakeMailTemplateProvider;
