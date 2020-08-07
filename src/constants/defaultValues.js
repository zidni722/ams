/* 
Menu Types:
"menu-default", "menu-sub-hidden", "menu-hidden"
*/
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
export const servicePath = "http://ams-aaz-backend.herokuapp.com";
export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXVpZCI6IjU2NzkyZTFjLTc3MDEtNDdjZC1iMzdkLTg1Y2VjMzI3MjkyZCIsIm5hbWUiOiJCaXlhbiIsImVtYWlsIjoiYml5YW4uYmVsaW5kYUBwYXdvb24uY29tIiwicm9sZV9pZCI6MSwiZGl2aXNpb25faWQiOjQsInN0YXR1cyI6MCwiaWF0IjoxNTk2NjM2NTk2fQ.kGWMHFGjkQ-J7qxWwtA-HzyMe4EhEvv_aSBkMJHrN6w';


/* 
Color Options:
"light.purple", "light.blue", "light.green", "light.orange", "light.red", "dark.purple", "dark.blue", "dark.green", "dark.orange", "dark.red"
*/
export const themeColorStorageKey="__theme_color"
export const isMultiColorActive = false;
export const isDarkSwitchActive = false;
export const defaultColor = "light.blue";
export const defaultDirection = "ltr";
export const themeRadiusStorageKey = "__theme_radius";
export const isDemo = true;