import { Context } from '@frontastic/extension-types';
import axios from 'axios';
import { initialize } from '@bloomreach/spa-sdk';
import { ContentMapper } from '@Content-bloomreach/mappers/ContentMapper';
import { Content } from '@Types/content/Content';

export default class ContentApi {
  private locale: string;
  private deliveryApiUrl: string;

  constructor(frontasticContext: Context, locale?: string) {
    this.locale = (locale ?? frontasticContext.project.defaultLocale).replace('_', '-');
    this.deliveryApiUrl = frontasticContext.project.configuration?.bloomreach.deliveryApiUrl;
  }

  async getContent(channel: string, page: string) {
    const path = '';
    let pageData = await initialize({
      // The path to request from the Page Model API, should include query
      // parameters if those are present in the url
      path,
      // The location of the Page Model API of the brX channel
      endpoint: `${this.deliveryApiUrl}channels/${channel}/pages/${page}`,
      // The httpClient used to make requests
      httpClient: axios,
    });

    return ContentMapper.bloomreachDocumentToContent(pageData);
  }

  async getContentList(channel: string, pages: string[]) {
    const path = '';
    let pageResults: Content[] = [];
    await Promise.all(
      pages.map(async (page: string) => {
        let pageData = await initialize({
          path,
          endpoint: `${this.deliveryApiUrl}channels/${channel}/pages/${page}`,
          httpClient: axios,
        });
        await pageResults.push(ContentMapper.bloomreachDocumentToContent(pageData));
      }),
    );
    return pageResults;
  }
}
