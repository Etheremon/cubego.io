import {addTranslation, initialize} from "react-localize-redux";
import * as LS from "./services/localStorageService";
import { getLocalization } from './services/api';

export const Languages = [
  { name: 'English', code: 'en', country: 'gb'},
  // { name: 'Korean', code: 'ko', country: 'kr'},
  { name: 'Japanese', code: 'ja', country: 'jp'},
  // { name: 'Chinese', code: 'zh', country: 'cn'},
  // { name: 'Vietnamese', code: 'vi', country: 'vn'},
  // { name: 'Thai', code: 'th', country: 'th'},
  // { name: 'French', code: 'fr', country: 'fr'},
];

export const DefaultLanguage = 'en';

// ------------------------------------
// Get localization data
const fetchLocalization = async () => {

  const data = await getLocalization();
  let localization = {};

  const json = JSON.parse(data.response
  .replace('gdata.io.handleScriptLoaded(', '')
  .replace('});', '}')
  .replace(/gsx\$/g, ''));

  if (json['feed'] && json['feed'].entry.length) {
    json['feed'].entry.map(entryObj => {
      localization[entryObj['key']['$t']] = Languages.map(l => l.code).map(l => entryObj[l]['$t'] || entryObj[DefaultLanguage]['$t']);
    })
  }

  return localization;
}

let browserLan = navigator.language.slice(0, 2);
let selectedLan = Languages.map(lan => lan.code).includes(browserLan) ? browserLan : DefaultLanguage;
// ------------------------------------

export const LanguageActions = async () => { 
  let localization = await fetchLocalization(); 

  return [
  initialize(Languages, {
    defaultLanguage: LS.GetItem(LS.Fields.language) || selectedLan,
    missingTranslationMsg: '${key}',
  }),
  addTranslation(localization)]
};
