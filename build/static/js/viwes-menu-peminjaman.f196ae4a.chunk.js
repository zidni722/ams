(this["webpackJsonpgogo-react"]=this["webpackJsonpgogo-react"]||[]).push([[40],{362:function(e,a,n){"use strict";n.d(a,"a",(function(){return r}));var t=n(33);const r=()=>{const e=window.location.href,a=t.reactLocalStorage.getObject("me")||null;if(!a)return!1;const n=e.substring(e.lastIndexOf("/")+1),r=a.role_name.toLowerCase();let l=[];return"employee"===r?l=["barang","pengadaan","karyawan"]:"manager"===r&&(l=["barang","karyawan"]),!l.includes(n)||(console.log("masuk sini engga"),!1)}},667:function(e,a,n){"use strict";n.r(a);var t=n(6),r=n.n(t),l=n(194),c=n(362);const o=r.a.lazy(()=>Promise.all([n.e(3),n.e(7),n.e(25)]).then(n.bind(null,637))),m=r.a.lazy(()=>Promise.all([n.e(0),n.e(2),n.e(4),n.e(6),n.e(19)]).then(n.bind(null,646))),i=r.a.lazy(()=>Promise.all([n.e(1),n.e(5),n.e(14)]).then(n.bind(null,624)));a.default=({match:e})=>r.a.createElement(t.Suspense,{fallback:r.a.createElement("div",{className:"loading"})},r.a.createElement(l.d,null,r.a.createElement(l.a,{exact:!0,from:"".concat(e.url,"/"),to:"".concat(e.url,"/peminjaman")}),Object(c.a)()&&r.a.createElement(l.b,{path:"".concat(e.url,"/peminjaman"),render:e=>r.a.createElement(o,e)}),Object(c.a)()&&r.a.createElement(l.b,{path:"".concat(e.url,"/form-peminjaman"),render:e=>r.a.createElement(m,e)}),Object(c.a)()&&r.a.createElement(l.b,{path:"".concat(e.url,"/detail-peminjaman/:id"),render:e=>r.a.createElement(i,e)}),r.a.createElement(l.a,{to:"/error"})))}}]);