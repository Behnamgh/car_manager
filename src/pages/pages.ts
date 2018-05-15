// The page the user lands on after opening the app and without a session
let skip = localStorage.getItem('skip');
export const FirstRunPage = skip == 'true' ? 'HomePage' : 'TutorialPage';
// let data = '[{"profilePic":"","name":"206 Black","about":"Behnam","Fuels":[{"name":"eyd ","location":"velenjak","date":"1397-01-01T22:04:75Z","litr":"50","kilometre":"120111","favorite":"true"},{"name":"sizdah be dar","location":"jordan","date":"1397-01-13T22:04:69Z","litr":"33","kilometre":"121250"},{"name":"akhare farvardin","location":"pido","date":"1397-01-31T22:04:79Z","litr":"22","kilometre":"121350"},{"name":"ghable safar","location":"karaj","date":"1397-02-04T23:05:95Z","litr":"40","kilometre":"121650"},{"name":"bade safar","location":"tehran","date":"1397-02-14T23:05:52Z","litr":"33","kilometre":"122000"}]},{"profilePic":"","name":"Besturn White","about":"Yegane"},{"profilePic":"","name":"Samand White","about":"baba"}]';
// let data = ''
// localStorage.setItem('datas',data);
// The main page the user will see as they use the app over a long period of time.
// Change this if not using tabs
export const MainPage = 'HomePage';

// // The initial root pages for our tabs (remove if not using tabs)
// export const Tab1Root = 'ListMasterPage';
// export const Tab2Root = 'SearchPage';
// export const Tab3Root = 'SettingsPage';
