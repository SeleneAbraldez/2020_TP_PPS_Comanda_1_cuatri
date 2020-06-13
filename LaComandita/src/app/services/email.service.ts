import { Injectable } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private emailComposer: EmailComposer) { }

  sendMail(to: string, body: string, isHtml: boolean, cc?: string, bcc?: string[], attachments?: any[], subject?: string) {
    let email = {
      to,//Para quien va dirigido el mail.
      cc: cc,// En caso de que queramos pone a alguien en copia.
      bcc: bcc,//En el caso de que queramos poner a alguien en copia oculta.
      attachments,//s para cuando queremos enviar documentos adjuntos al mail.
      subject: subject,// Es el asunto del mail.
      body,
      isHtml// Nos permite definir si el mail lleva formato html.
    };
    // Send a text message using default options
    this.emailComposer.open(email);
  }
}
