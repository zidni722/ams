const data = [
  {
    id: "gogo",
    icon: "iconsminds-optimization",
    label: "menu.gogo",
    to: "/app/gogo",
    subs: [
      {
        icon: "simple-icon-paper-plane",
        label: "menu.start",
        to: "/app/gogo/start"
      }     
    ]
  },
  {
    id: "secondmenu",
    icon: "iconsminds-business-man-woman",
    label: "menu.second-menu",
    to: "/app/second-menu",
    subs: [
      {
        icon: "simple-icon-paper-plane",
        label: "menu.second",
        to: "/app/second-menu/second"
      }
    ]
  },
  {
    id: "blankpage",
    icon: "iconsminds-laptop-3",
    label: "menu.blank-page",
    to: "/app/blank-page"
  },
  {
    id: "docs",
    icon: "iconsminds-add-cart",
    label: "menu.docs",
    to: "https://gogo-react-docs.coloredstrategies.com/",
    newWindow:true
  }
];
export default data;
