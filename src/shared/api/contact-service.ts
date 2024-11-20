export class ContactService {
   public async loadContact(): Promise<string> {
      return Promise.resolve("+375293218813");
   }
}

export const contactService = new ContactService();
