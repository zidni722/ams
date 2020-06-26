const data = [
  {
    id: "dashboard",
    icon: "iconsminds-digital-drawing",
    label: "menu.dashboard",
    to: "/app/dashboard",
    // subs: [
    //   {
    //     icon: "simple-icon-paper-plane",
    //     label: "menu.start",
    //     to: "/app/gogo/start"
    //   }     
    // ]
  },
  {
    id: "barang",
    icon: "iconsminds-box-full",
    label: "Barang",
    to: "/app/second-menu",
    // subs: [
    //   {
    //     icon: "simple-icon-paper-plane",
    //     label: "menu.second",
    //     to: "/app/second-menu/second"
    //   }
    // ]
  },
  {
    id: "peminjaman",
    icon: "iconsminds-inbox-into",
    label: "Peminjaman",
    to: "/app/blank-page"
  },
  {
    id: "pengembalian",
    icon: "iconsminds-inbox-out",
    label: "Pengembalian",
    to: "/app/pengembalian",
    newWindow:false
  },
  {
    id: "perbaikan",
    icon: "iconsminds-gears",
    label: "Perbaikan",
    to: "/app/perbaikan",
    newWindow:false
  },
  {
    id: "pengadaan",
    icon: "iconsminds-add-cart",
    label: "Pengadaan",
    to: "/app/pengadaan",
    newWindow:false
  },
  {
    id: "karyawan",
    icon: "iconsminds-business-man-woman",
    label: "Karyawan",
    to: "/app/karyawan",
    newWindow:false
  }

];
export default data;
