(this["webpackJsonpgogo-react"]=this["webpackJsonpgogo-react"]||[]).push([[17],{173:function(e,t,a){"use strict";a.d(t,"a",(function(){return n})),a.d(t,"b",(function(){return c}));var l=a(6),s=a.n(l),r=a(211);const n=e=>s.a.createElement(r.a,Object.assign({},e,{widths:["xxs","xs","sm","md","lg","xl","xxl"]})),c=e=>s.a.createElement("div",{className:"separator ".concat(e.className)})},177:function(e,t,a){"use strict";var l=a(6),s=a.n(l),r=a(222),n=a(223),c=a(176),i=a(175);const o=e=>s.a.createElement(i.a,{id:"menu.".concat(e)}),m=(e,t,a)=>0===a?"":e.split(t)[0]+t,d=({match:e})=>{const t=e.path.substr(1);let a=t.split("/");return a[a.length-1].indexOf(":")>-1&&(a=a.filter(e=>-1===e.indexOf(":"))),s.a.createElement(l.Fragment,null,s.a.createElement(r.a,{className:"pt-0 breadcrumb-container d-none d-sm-block d-lg-inline-block"},a.map((e,l)=>s.a.createElement(n.a,{key:l,active:a.length===l+1},a.length!==l+1?s.a.createElement(c.c,{to:"/"+m(t,e,l)},o(e)):o(e)))))};t.a=({heading:e,match:t})=>s.a.createElement(l.Fragment,null,e&&s.a.createElement("h1",null,s.a.createElement(i.a,{id:e})),s.a.createElement(d,{match:t}))},181:function(e,t,a){"use strict";var l=a(180),s=(a(178),a(179));a.d(t,"a",(function(){return s.a}));l.a},192:function(e,t,a){"use strict";var l=a(6),s=a.n(l),r=a(176),n=a(225);class c extends l.Component{constructor(e){super(e),this.onThumbClick=this.onThumbClick.bind(this),this.state={photoIndex:0,isOpen:!1}}onThumbClick(){this.setState({isOpen:!0})}render(){const e=this.state.isOpen;return s.a.createElement(l.Fragment,null,s.a.createElement(r.c,{to:"#",onClick:()=>this.onThumbClick()},s.a.createElement("img",{src:this.props.thumb,alt:"thumbnail",className:this.props.className})),e&&s.a.createElement(n.a,{mainSrc:this.props.large,onCloseRequest:()=>this.setState({isOpen:!1})}))}}t.a=c},256:function(e,t,a){"use strict";var l=a(3),s=a.n(l),r=a(9),n=a(6),c=a.n(n),i=a(688),o=a(659),m=a(661),d=a(663),u=a(270),h=a.n(u),p=a(175),E=a(33),b=a(182),g=a(181);class v extends c.a.Component{constructor(e){var t;super(e),t=this,this.handleAlert=(e,t)=>{this.setState({[e]:t})},this.handleSubmit=function(){var e=Object(r.a)(s.a.mark((function e(a,l){var r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a.preventDefault(),b.a.defaults.headers.common["Content-Type"]="application/json",r={asset_id:E.reactLocalStorage.get("asset")},b.a.post("/borrows",r).then(e=>{200===e.status&&(window.location.href="./peminjaman",E.reactLocalStorage.set("isSuccesSubmit",!0))}).catch(e=>{console.log(e.message),g.a.error("Silahkan coba kembali beberapa saat lagi!","Terjadi Kesalahan",5e3,()=>{t.setState({visible:!1})},null)});case 4:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),this.state={setujuAlert:!1,tolakAlert:!1,confirmsetujuAlert:!1,confirmtolakAlert:!1,cancelAlert:!1}}render(){return c.a.createElement("div",{className:"text-zero top-right-button-container"},c.a.createElement(i.a,null,c.a.createElement(o.a,{caret:!0,color:"primary",size:"lg",outline:!0,className:"top-right-button top-right-button-single"},c.a.createElement(p.a,{id:"ACTIONS"})),c.a.createElement(m.a,null,c.a.createElement(d.a,{onClick:()=>this.handleAlert("setujuAlert",!0)},c.a.createElement(p.a,{id:"Terima"})),c.a.createElement(d.a,{onClick:()=>this.handleAlert("tolakAlert",!0)},c.a.createElement(p.a,{id:"Tolak"})))),c.a.createElement("div",null,c.a.createElement(h.a,{title:"Apakah Anda Yakin?",warning:!0,show:this.state.setujuAlert,showCancel:!0,reverseButtons:!0,cancelBtnBsStyle:"danger",confirmBtnText:"Ya, saya yakin!",cancelBtnText:"Batal",onConfirm:()=>{this.handleAlert("basicAlert",!1),this.handleAlert("confirmsetujuAlert",!0)},onCancel:()=>{this.handleAlert("setujuAlert",!1),this.handleAlert("cancelAlert",!1)}},"Anda akan menyetujui ",E.reactLocalStorage.get("sweetAlertTitle")," ini!"),c.a.createElement(h.a,{success:!0,title:"Berhasil!",confirmBtnBsStyle:"success",show:this.state.confirmsetujuAlert,onConfirm:()=>{this.handleAlert("setujuAlert",!1),this.handleAlert("confirmsetujuAlert",!1)}},c.a.createElement("p",{className:"sweet-alert-text"},E.reactLocalStorage.get("sweetAlertTitle")," berhasil disetujui.")),c.a.createElement(h.a,{title:"Apakah Anda Yakin?",warning:!0,show:this.state.tolakAlert,showCancel:!0,reverseButtons:!0,cancelBtnBsStyle:"danger",confirmBtnText:"Ya, saya yakin!",cancelBtnText:"Batal",onConfirm:()=>{this.handleAlert("basicAlert",!1),this.handleAlert("confirmtolakAlert",!0)},onCancel:()=>{this.handleAlert("tolakAlert",!1),this.handleAlert("cancelAlert",!1)}},"Anda akan menolak ",E.reactLocalStorage.get("sweetAlertTitle")," ini!"),c.a.createElement(h.a,{success:!0,title:"Berhasil!",confirmBtnBsStyle:"success",show:this.state.confirmtolakAlert,onConfirm:()=>{this.handleAlert("tolakAlert",!1),this.handleAlert("confirmtolakAlert",!1)}},c.a.createElement("p",{className:"sweet-alert-text"},E.reactLocalStorage.get("sweetAlertTitle")," ditolak.")),c.a.createElement(h.a,{error:!0,title:"Cancelled",confirmBtnBsStyle:"success",show:this.state.cancelAlert,onConfirm:()=>{this.handleAlert("tolakAlert",!1),this.handleAlert("cancelAlert",!1)}},c.a.createElement("p",{className:"sweet-alert-text"},"Your imaginary file is safe :)"))))}}t.a=v},335:function(e,t,a){"use strict";var l=a(11),s=a(19),r=a(6),n=a.n(r),c=a(85),i=a.n(c),o=a(170),m=a.n(o),d=a(172),u={className:i.a.string,cssModule:i.a.object,size:i.a.string,bordered:i.a.bool,borderless:i.a.bool,striped:i.a.bool,dark:i.a.bool,hover:i.a.bool,responsive:i.a.oneOfType([i.a.bool,i.a.string]),tag:d.q,responsiveTag:d.q,innerRef:i.a.oneOfType([i.a.func,i.a.string,i.a.object])},h=function(e){var t=e.className,a=e.cssModule,r=e.size,c=e.bordered,i=e.borderless,o=e.striped,u=e.dark,h=e.hover,p=e.responsive,E=e.tag,b=e.responsiveTag,g=e.innerRef,v=Object(s.a)(e,["className","cssModule","size","bordered","borderless","striped","dark","hover","responsive","tag","responsiveTag","innerRef"]),A=Object(d.m)(m()(t,"table",!!r&&"table-"+r,!!c&&"table-bordered",!!i&&"table-borderless",!!o&&"table-striped",!!u&&"table-dark",!!h&&"table-hover"),a),f=n.a.createElement(E,Object(l.a)({},v,{ref:g,className:A}));if(p){var x=Object(d.m)(!0===p?"table-responsive":"table-responsive-"+p,a);return n.a.createElement(b,{className:x},f)}return f};h.propTypes=u,h.defaultProps={tag:"table",responsiveTag:"div"},t.a=h},628:function(e,t,a){"use strict";a.r(t);var l=a(6),s=a.n(l),r=a(212),n=a(213),c=a(248),i=a(266),o=a(335),m=a(177),d=a(173),u=a(187),h=a(192),p=a(175),E=a(182),b=a(10),g=a(256),v=a(33);class A extends l.Component{constructor(e){super(e),this.state={detailService:""},v.reactLocalStorage.set("sweetAlertTitle","perbaikan")}componentDidMount(){var e;E.a.get("/services/"+(e=window.location.href,e.substring(e.lastIndexOf("/")+1))).then(e=>{this.setState({detailService:e.data.data})}).catch(e=>{console.log(e.message)})}render(){return s.a.createElement(l.Fragment,null,s.a.createElement(r.a,null,s.a.createElement(d.a,{xxs:"12"},s.a.createElement(m.a,{heading:"menu.detail-perbaikan",match:this.props.match}),"super admin"==b.i.role_name.toLowerCase()&&s.a.createElement(g.a,null),s.a.createElement(d.b,{className:"mb-5"}))),s.a.createElement(r.a,null,s.a.createElement(d.a,{xxs:"12",lg:"8",xl:"8",className:"col-left"},s.a.createElement(n.a,{className:"mb-3"},s.a.createElement(h.a,{thumb:this.state.detailService.asset_photo||null,large:this.state.detailService.asset_photo||null,className:"responsive card-img-top"}),s.a.createElement("p",{className:"text-muted text-small pl-3 pt-5"},s.a.createElement(p.a,{id:"Kode Barang"})),s.a.createElement("p",{className:"pl-3"},this.state.detailService.asset_code),s.a.createElement("p",{className:"text-muted text-small pl-3 pt-2 mb-3"},s.a.createElement(p.a,{id:"Nama Barang"})),s.a.createElement("p",{className:"pl-3"},this.state.detailService.asset_name),s.a.createElement("p",{className:"text-muted text-small pl-3 pt-2 mb-3"},s.a.createElement(p.a,{id:"Jenis Barang"})),s.a.createElement("p",{className:"pl-3"},this.state.detailService.asset_category_name),s.a.createElement("p",{className:"text-muted text-small pl-3 pt-2 mb-3"},s.a.createElement(p.a,{id:"Merk"})),s.a.createElement("p",{className:"pl-3"},this.state.detailService.asset_brand),s.a.createElement("p",{className:"text-muted text-small pl-3 pt-2 mb-3"},s.a.createElement(p.a,{id:"Tahun"})),s.a.createElement("p",{className:"pl-3"},this.state.detailService.asset_year))),"super admin"==b.i.role_name.toLowerCase()&&s.a.createElement(d.a,{xxs:"12",lg:"4",xl:"4",className:"col-right"},s.a.createElement(n.a,{className:"mb-4"},s.a.createElement(c.a,null,s.a.createElement(i.a,null," Data Peminjam"),s.a.createElement("div",{className:"text-center"},s.a.createElement(h.a,{thumb:this.state.detailService.user_photo,large:this.state.detailService.user_photo,className:"img-thumbnail border-0 mb-4 list-thumbnail"})),s.a.createElement(o.a,{borderless:!0},s.a.createElement("thead",null,s.a.createElement("tr",null,s.a.createElement("td",{className:"text-muted text-small",scope:"col"},"NPK"),s.a.createElement("td",{scope:"col"},this.state.detailService.user_code)),s.a.createElement("tr",null,s.a.createElement("td",{className:"text-muted text-small",scope:"col"},"Nama"),s.a.createElement("td",{scope:"col"},this.state.detailService.user_name)),s.a.createElement("tr",null,s.a.createElement("td",{className:"text-muted text-small",scope:"col"},"Email"),s.a.createElement("td",{scope:"col"},this.state.detailService.user_email)),s.a.createElement("tr",null,s.a.createElement("td",{className:"text-muted text-small",scope:"col"},"Divisi"),s.a.createElement("td",{scope:"col"},this.state.detailService.user_division)),s.a.createElement("tr",null,s.a.createElement("td",{className:"text-muted text-small",scope:"col"},"No Telpn"),s.a.createElement("td",{scope:"col"},this.state.detailService.user_phone)),s.a.createElement("tr",null,s.a.createElement("td",{className:"text-muted text-small",scope:"col"},"Alamat"),s.a.createElement("td",{scope:"col"},this.state.detailService.user_address)))))))))}}t.default=Object(u.d)(A)}}]);
//# sourceMappingURL=detail-perbaikan.b713e46e.chunk.js.map