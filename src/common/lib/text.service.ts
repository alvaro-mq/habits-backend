import { Injectable } from '@nestjs/common';
import { v5, v4 } from 'uuid';

@Injectable()
export class TextService {
  /**
   * Metodo para convertir un texto a formato uuid
   * @param text Texto
   * @param namespace Uuid base
   */
  static textToUuid(
    text: string,
    namespace = 'bb5d0ffa-9a4c-4d7c-8fc2-0a7d2220ba45',
  ): string {
    return v5(text, namespace);
  }

  static generateUuid(): string {
    return v4();
  }

  static decodeBase64 = (base64) => {
    const text = TextService.atob(base64);
    return decodeURI(text);
  };

  static atob = (a) => Buffer.from(a, 'base64').toString('ascii');

  static btoa = (b) => Buffer.from(b).toString('base64');
}
