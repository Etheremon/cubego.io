import {addTranslation, initialize} from "react-localize-redux";
import * as LS from "./services/localStorageService";

export const Languages = [
  { name: 'English', code: 'en', country: 'gb'},
  { name: 'Korean', code: 'ko', country: 'kr'},
  { name: 'Japanese', code: 'ja', country: 'jp'},
  { name: 'Chinese', code: 'zh', country: 'cn'},
  { name: 'Vietnamese', code: 'vi', country: 'vn'},
  // { name: 'Thai', code: 'th', country: 'th'},
  // { name: 'French', code: 'fr', country: 'fr'},
];

export const DefaultLanguage = 'en';

// ------------------------------------
// Get localization data
const localizationCsv = require('./shared/resource/localization.csv');
let localization = {};
localizationCsv.forEach(row => {
  localization[row.key] = Languages.map(l => l.code).map(l => row[l] || row[DefaultLanguage]);
  // localization[row.key] = Config.Languages.map(l => l.code).map(l => row[l]);
});

let browserLan = navigator.language.slice(0, 2);
let selectedLan = Languages.map(lan => lan.code).includes(browserLan) ? browserLan : DefaultLanguage;
// ------------------------------------

export const LanInitialActions = [
  initialize(Languages, {
    defaultLanguage: LS.GetItem(LS.Fields.language) || selectedLan,
    missingTranslationMsg: '${key}',
  }),
  addTranslation(localization)
];

