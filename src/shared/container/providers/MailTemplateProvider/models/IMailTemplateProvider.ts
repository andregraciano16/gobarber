import IMailTemplateDTO from '../dtos/IParseEmailTemplateDTO';

export default interface IMailTemplateProvider {
    parse(mailTemplateDTO: IMailTemplateDTO): Promise<string>;
}
