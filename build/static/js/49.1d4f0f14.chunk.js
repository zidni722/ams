(this["webpackJsonpgogo-react"]=this["webpackJsonpgogo-react"]||[]).push([[49],{173:function(e,a,t){"use strict";t.d(a,"a",(function(){return r})),t.d(a,"b",(function(){return c}));var s=t(6),l=t.n(s),n=t(211);const r=e=>l.a.createElement(n.a,Object.assign({},e,{widths:["xxs","xs","sm","md","lg","xl","xxl"]})),c=e=>l.a.createElement("div",{className:"separator ".concat(e.className)})},177:function(e,a,t){"use strict";var s=t(6),l=t.n(s),n=t(222),r=t(223),c=t(176),i=t(175);const o=e=>l.a.createElement(i.a,{id:"menu.".concat(e)}),m=(e,a,t)=>0===t?"":e.split(a)[0]+a,u=({match:e})=>{const a=e.path.substr(1);let t=a.split("/");return t[t.length-1].indexOf(":")>-1&&(t=t.filter(e=>-1===e.indexOf(":"))),l.a.createElement(s.Fragment,null,l.a.createElement(n.a,{className:"pt-0 breadcrumb-container d-none d-sm-block d-lg-inline-block"},t.map((e,s)=>l.a.createElement(r.a,{key:s,active:t.length===s+1},t.length!==s+1?l.a.createElement(c.c,{to:"/"+m(a,e,s)},o(e)):o(e)))))};a.a=({heading:e,match:a})=>l.a.createElement(s.Fragment,null,e&&l.a.createElement("h1",null,l.a.createElement(i.a,{id:e})),l.a.createElement(u,{match:a}))},182:function(e,a,t){"use strict";var s=t(180),l=(t(178),t(179));t.d(a,"a",(function(){return l.a}));s.a},192:function(e,a,t){"use strict";var s=t(6),l=t.n(s),n=t(176),r=t(225);class c extends s.Component{constructor(e){super(e),this.onThumbClick=this.onThumbClick.bind(this),this.state={photoIndex:0,isOpen:!1}}onThumbClick(){this.setState({isOpen:!0})}render(){const e=this.state.isOpen;return l.a.createElement(s.Fragment,null,l.a.createElement(n.c,{to:"#",onClick:()=>this.onThumbClick()},l.a.createElement("img",{src:this.props.thumb,alt:"thumbnail",className:this.props.className})),e&&l.a.createElement(r.a,{mainSrc:this.props.large,onCloseRequest:()=>this.setState({isOpen:!1})}))}}a.a=c},211:function(e,a,t){"use strict";var s=t(11),l=t(19),n=t(6),r=t.n(n),c=t(85),i=t.n(c),o=t(170),m=t.n(o),u=t(172),d=i.a.oneOfType([i.a.number,i.a.string]),b=i.a.oneOfType([i.a.bool,i.a.number,i.a.string,i.a.shape({size:i.a.oneOfType([i.a.bool,i.a.number,i.a.string]),order:d,offset:d})]),p={tag:u.q,xs:b,sm:b,md:b,lg:b,xl:b,className:i.a.string,cssModule:i.a.object,widths:i.a.array},g={tag:"div",widths:["xs","sm","md","lg","xl"]},h=function(e,a,t){return!0===t||""===t?e?"col":"col-"+a:"auto"===t?e?"col-auto":"col-"+a+"-auto":e?"col-"+t:"col-"+a+"-"+t},f=function(e){var a=e.className,t=e.cssModule,n=e.widths,c=e.tag,i=Object(l.a)(e,["className","cssModule","widths","tag"]),o=[];n.forEach((function(a,s){var l=e[a];if(delete i[a],l||""===l){var n=!s;if(Object(u.k)(l)){var r,c=n?"-":"-"+a+"-",d=h(n,a,l.size);o.push(Object(u.m)(m()(((r={})[d]=l.size||""===l.size,r["order"+c+l.order]=l.order||0===l.order,r["offset"+c+l.offset]=l.offset||0===l.offset,r)),t))}else{var b=h(n,a,l);o.push(b)}}})),o.length||o.push("col");var d=Object(u.m)(m()(a,o),t);return r.a.createElement(c,Object(s.a)({},i,{className:d}))};f.propTypes=p,f.defaultProps=g,a.a=f},212:function(e,a,t){"use strict";var s=t(11),l=t(19),n=t(6),r=t.n(n),c=t(85),i=t.n(c),o=t(170),m=t.n(o),u=t(172),d=i.a.oneOfType([i.a.number,i.a.string]),b={tag:u.q,noGutters:i.a.bool,className:i.a.string,cssModule:i.a.object,form:i.a.bool,xs:d,sm:d,md:d,lg:d,xl:d},p={tag:"div",widths:["xs","sm","md","lg","xl"]},g=function(e){var a=e.className,t=e.cssModule,n=e.noGutters,c=e.tag,i=e.form,o=e.widths,d=Object(l.a)(e,["className","cssModule","noGutters","tag","form","widths"]),b=[];o.forEach((function(a,t){var s=e[a];if(delete d[a],s){var l=!t;b.push(l?"row-cols-"+s:"row-cols-"+a+"-"+s)}}));var p=Object(u.m)(m()(a,n?"no-gutters":null,i?"form-row":"row",b),t);return r.a.createElement(c,Object(s.a)({},d,{className:p}))};g.propTypes=b,g.defaultProps=p,a.a=g},213:function(e,a,t){"use strict";var s=t(11),l=t(19),n=t(6),r=t.n(n),c=t(85),i=t.n(c),o=t(170),m=t.n(o),u=t(172),d={tag:u.q,inverse:i.a.bool,color:i.a.string,body:i.a.bool,outline:i.a.bool,className:i.a.string,cssModule:i.a.object,innerRef:i.a.oneOfType([i.a.object,i.a.string,i.a.func])},b=function(e){var a=e.className,t=e.cssModule,n=e.color,c=e.body,i=e.inverse,o=e.outline,d=e.tag,b=e.innerRef,p=Object(l.a)(e,["className","cssModule","color","body","inverse","outline","tag","innerRef"]),g=Object(u.m)(m()(a,"card",!!i&&"text-white",!!c&&"card-body",!!n&&(o?"border":"bg")+"-"+n),t);return r.a.createElement(d,Object(s.a)({},p,{className:g,ref:b}))};b.propTypes=d,b.defaultProps={tag:"div"},a.a=b},222:function(e,a,t){"use strict";var s=t(11),l=t(19),n=t(6),r=t.n(n),c=t(85),i=t.n(c),o=t(170),m=t.n(o),u=t(172),d={tag:u.q,listTag:u.q,className:i.a.string,listClassName:i.a.string,cssModule:i.a.object,children:i.a.node,"aria-label":i.a.string},b=function(e){var a=e.className,t=e.listClassName,n=e.cssModule,c=e.children,i=e.tag,o=e.listTag,d=e["aria-label"],b=Object(l.a)(e,["className","listClassName","cssModule","children","tag","listTag","aria-label"]),p=Object(u.m)(m()(a),n),g=Object(u.m)(m()("breadcrumb",t),n);return r.a.createElement(i,Object(s.a)({},b,{className:p,"aria-label":d}),r.a.createElement(o,{className:g},c))};b.propTypes=d,b.defaultProps={tag:"nav",listTag:"ol","aria-label":"breadcrumb"},a.a=b},223:function(e,a,t){"use strict";var s=t(11),l=t(19),n=t(6),r=t.n(n),c=t(85),i=t.n(c),o=t(170),m=t.n(o),u=t(172),d={tag:u.q,active:i.a.bool,className:i.a.string,cssModule:i.a.object},b=function(e){var a=e.className,t=e.cssModule,n=e.active,c=e.tag,i=Object(l.a)(e,["className","cssModule","active","tag"]),o=Object(u.m)(m()(a,!!n&&"active","breadcrumb-item"),t);return r.a.createElement(c,Object(s.a)({},i,{className:o,"aria-current":n?"page":void 0}))};b.propTypes=d,b.defaultProps={tag:"li"},a.a=b},248:function(e,a,t){"use strict";var s=t(11),l=t(19),n=t(6),r=t.n(n),c=t(85),i=t.n(c),o=t(170),m=t.n(o),u=t(172),d={tag:u.q,className:i.a.string,cssModule:i.a.object,innerRef:i.a.oneOfType([i.a.object,i.a.string,i.a.func])},b=function(e){var a=e.className,t=e.cssModule,n=e.innerRef,c=e.tag,i=Object(l.a)(e,["className","cssModule","innerRef","tag"]),o=Object(u.m)(m()(a,"card-body"),t);return r.a.createElement(c,Object(s.a)({},i,{className:o,ref:n}))};b.propTypes=d,b.defaultProps={tag:"div"},a.a=b},263:function(e,a,t){"use strict";var s=t(11),l=t(19),n=t(6),r=t.n(n),c=t(85),i=t.n(c),o=t(170),m=t.n(o),u=t(172),d={color:i.a.string,pill:i.a.bool,tag:u.q,innerRef:i.a.oneOfType([i.a.object,i.a.func,i.a.string]),children:i.a.node,className:i.a.string,cssModule:i.a.object},b=function(e){var a=e.className,t=e.cssModule,n=e.color,c=e.innerRef,i=e.pill,o=e.tag,d=Object(l.a)(e,["className","cssModule","color","innerRef","pill","tag"]),b=Object(u.m)(m()(a,"badge","badge-"+n,!!i&&"badge-pill"),t);return d.href&&"span"===o&&(o="a"),r.a.createElement(o,Object(s.a)({},d,{className:b,ref:c}))};b.propTypes=d,b.defaultProps={color:"secondary",pill:!1,tag:"span"},a.a=b},630:function(e,a,t){"use strict";t.r(a);var s=t(6),l=t.n(s),n=t(212),r=t(685),c=t(657),i=t(659),o=t(661),m=t(213),u=t(248),d=t(385),b=t(263),p=t(177),g=t(173),h=t(187),f=t(192),E=t(175),N=t(181),v=t(33),x=t(182);class O extends s.Component{constructor(e){super(e),this.state={detailUser:""}}componentDidMount(){var e;N.a.get("/users/"+(e=window.location.href,e.substring(e.lastIndexOf("/")+1))).then(e=>{this.setState({detailUser:e.data.data})}).catch(e=>{console.log(e.message)}),"true"===v.reactLocalStorage.get("isSuccesSubmit")&&x.a.success("Anda berhasil merubah data karyawan","Perubahan Data Berhasil",1e9,()=>{v.reactLocalStorage.set("isSuccesSubmit",!1),this.setState({visible:!1})},null)}render(){return l.a.createElement(s.Fragment,null,l.a.createElement(n.a,null,l.a.createElement(g.a,{xxs:"12"},l.a.createElement(p.a,{heading:"menu.detail-karyawan",match:this.props.match}),l.a.createElement("div",{className:"text-zero top-right-button-container"},l.a.createElement(r.a,null,l.a.createElement(c.a,{caret:!0,color:"primary",size:"lg",outline:!0,className:"top-right-button top-right-button-single"},l.a.createElement(E.a,{id:"ACTIONS"})),l.a.createElement(i.a,null,l.a.createElement(o.a,{header:!0},l.a.createElement(E.a,{id:"Ubah Status"})),l.a.createElement(o.a,null,l.a.createElement(E.a,{id:"Non Aktif"}))))),l.a.createElement(g.b,{className:"mb-5"}))),l.a.createElement(n.a,null,l.a.createElement(g.a,{xxs:"12",className:"mb-5"},l.a.createElement("br",null)),l.a.createElement(g.a,{xxs:"12",lg:"5",xl:"4",className:"mb-5"}),l.a.createElement(g.a,{xxs:"12",lg:"7",xl:"4",className:"mb-3"},l.a.createElement(f.a,{thumb:this.state.detailUser.photo,large:this.state.detailUser.photo,className:"img-thumbnail card-img social-profile-img"}),l.a.createElement(m.a,{className:"mb-4"},l.a.createElement(u.a,null,l.a.createElement("div",{className:"position-absolute card-top-buttons"},l.a.createElement(d.a,{outline:!0,color:"black",className:"btn-header-primary-light icon-button",onClick:()=>{window.location.href="../edit-karyawan/"+this.state.detailUser.id}},l.a.createElement("i",{className:"simple-icon-pencil"}))),l.a.createElement("div",{className:"text-center pt-4"},l.a.createElement("p",{className:"list-item-heading pt-2 mb-2"},this.state.detailUser.name),l.a.createElement("p",{className:"mb-2"},this.state.detailUser.email),l.a.createElement("p",{className:"mb-3"},l.a.createElement(b.a,{color:"outline-selesai",className:"mb-1 mr-1",pill:!0},this.state.detailUser.status))),l.a.createElement("p",{className:"text-muted text-small mb-2"},l.a.createElement(E.a,{id:"NPK"})),l.a.createElement("p",{className:"mb-3"},this.state.detailUser.code),l.a.createElement("p",{className:"text-muted text-small mb-2"},l.a.createElement(E.a,{id:"Divisi"})),l.a.createElement("p",{className:"mb-3"},this.state.detailUser.division_name),l.a.createElement("p",{className:"text-muted text-small mb-2"},l.a.createElement(E.a,{id:"Role"})),l.a.createElement("p",{className:"mb-3"},this.state.detailUser.role_name),l.a.createElement("p",{className:"text-muted text-small mb-2"},l.a.createElement(E.a,{id:"No. Telepon"})),l.a.createElement("p",{className:"mb-3"},this.state.detailUser.phone),l.a.createElement("p",{className:"text-muted text-small mb-2"},l.a.createElement(E.a,{id:"Alamat"})),l.a.createElement("p",{className:"mb-3"},this.state.detailUser.address))))))}}a.default=Object(h.d)(O)}}]);