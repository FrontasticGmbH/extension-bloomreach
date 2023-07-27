import { Context, ExtensionRegistry } from '@frontastic/extension-types';
import ContentApi from './apis/ContentApi';
import { getLocale } from './utils/Request';
import * as ContentActions from './actionControllers/BloomreachController';

export default {
  'data-sources': {
    'bloomreach/content': async (config, context) => {
      const contentApi = new ContentApi(context.frontasticContext as Context, getLocale(context.request));
      return {
        dataSourcePayload: await contentApi.getContent(),
      };
    },
  },
  actions: {
    bloomreach: ContentActions,
  },
} as ExtensionRegistry;
