import { addTranslation, initialize } from 'react-localize-redux';
import * as LS from './services/localStorageService';
import { GeneralApi } from './services/api/generalApi';
import { IsLiveServer } from './utils/utils';

export const Languages = [
  { name: 'English', code: 'en', country: 'gb' },
  // { name: 'Korean', code: 'ko', country: 'kr'},
  { name: 'Japanese', code: 'ja', country: 'jp' },
  { name: 'Chinese', code: 'zh', country: 'cn' },
  // { name: 'Vietnamese', code: 'vi', country: 'vn'},
  // { name: 'Thai', code: 'th', country: 'th'},
  // { name: 'French', code: 'fr', country: 'fr'},
];

export const DefaultLanguage = 'en';

// ------------------------------------
// Get localization data
const fetchLocalization = async () => {
  let oldData = LS.GetItem(LS.Fields.localization);
  if (oldData) oldData = JSON.parse(oldData);

  if (oldData && parseFloat(oldData.expireTime) > Date.now() / 1000) {
    return oldData.data;
  }
  const data = await GeneralApi.GetLocalization();
  const localization = {};

  const json = JSON.parse(data.response
    .replace('gdata.io.handleScriptLoaded(', '')
    .replace('});', '}')
    .replace(/gsx\$/g, ''));

  if (json.feed && json.feed.entry.length) {
    json.feed.entry.forEach((entryObj) => {
      localization[entryObj.key.$t] = Languages.map(
        (l) => l.code,
      ).map((l) => entryObj[l].$t || entryObj[DefaultLanguage].$t);
    });
  }

  LS.SetItem(LS.Fields.localization, JSON.stringify({
    expireTime: Date.now() / 1000 + (IsLiveServer ? 15 * 60 : 0),
    data: localization,
  }));

  return localization;
};

const browserLan = navigator.language.slice(0, 2);
const selectedLan = Languages.map((lan) => lan.code).includes(browserLan) ? browserLan : DefaultLanguage;
// ------------------------------------

export const LanguageActions = async () => {
  const localization = await fetchLocalization();

  return [
    initialize(Languages, {
      defaultLanguage: LS.GetItem(LS.Fields.language) || selectedLan,
      // eslint-disable-next-line no-template-curly-in-string
      missingTranslationMsg: '${key}',
    }),
    addTranslation(localization)];
};
