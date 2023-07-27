import { Context } from '@frontastic/extension-types';
import axios from "axios";
import {initialize} from "@bloomreach/spa-sdk";
import { Content } from '@Types/content/Content';
import {ContentMapper} from "@Content-bloomreach/mappers/ContentMapper";

export default class ContentApi {
  private page: any;
  private locale: string;

  constructor(frontasticContext: Context, locale?: string) {
    this.locale = (locale ?? frontasticContext.project.defaultLocale).replace('_', '-');
  }

  async getContent(): Promise<Content> {

    const deliveryApiUrl = 'https://sandbox-commercetools.bloomreach.io/delivery/site/v1/';
    const path = ``;

    // Initialize Bloomreach
    this.page = await initialize({
      // The path to request from the Page Model API, should include query
      // parameters if those are present in the url
      path,
      // The location of the Page Model API of the brX channel
      endpoint: `${deliveryApiUrl}channels/commercetools/pages`,
      // The httpClient used to make requests
      httpClient: axios,
    });

    return ContentMapper.bloomreachDocumentToContent(this.page.getDocument().getData());
  }

}
