import {reactLocalStorage} from 'reactjs-localstorage';

export const defaultMenuType = "menu-default";

export const subHiddenBreakpoint = 1440;
export const menuHiddenBreakpoint = 768;
export const defaultLocale = "en";
export const localeOptions = [
  { id: "en", name: "English - LTR", direction: "ltr" },
  { id: "es", name: "Español", direction: "ltr" },
  { id: "enrtl", name: "English - RTL", direction: "rtl" }
];

export const firebaseConfig = {
  apiKey: "AIzaSyBBksq-Asxq2M4Ot-75X19IyrEYJqNBPcg",
  authDomain: "gogo-react-login.firebaseapp.com",
  databaseURL: "https://gogo-react-login.firebaseio.com",
  projectId: "gogo-react-login",
  storageBucket: "gogo-react-login.appspot.com",
  messagingSenderId: "216495999563"
};

export const searchPath = "/app/pages/search";
export const servicePath = "https://ams-aaz-backend.herokuapp.com";
export const me = reactLocalStorage.getObject('me');
export const isSuccesSubmit = reactLocalStorage.get('isSuccesSubmit') || false;
export let token = reactLocalStorage.get('token') || null;

export const themeColorStorageKey="__theme_color"
export const isMultiColorActive = false;
export const isDarkSwitchActive = false;
export const defaultColor = "light.blue";
export const defaultDirection = "ltr";
export const themeRadiusStorageKey = "__theme_radius";
export const isDemo = false;
