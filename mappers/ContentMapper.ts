import { Content } from '@Types/content/Content';

export class ContentMapper {
  static bloomreachDocumentToContent(response: any): Content {

    const { title, introduction, image } = response;

    return {
      contentId: "",
      contentTypeId: "",
      title: title,
      banner: image.$ref,
      summary: introduction
    };
  }
}
