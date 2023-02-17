"use strict";(self.webpackChunkapp_perform_dashboard=self.webpackChunkapp_perform_dashboard||[]).push([[684],{1684:function(e,t,n){n.r(t),n.d(t,{default:function(){return P}});var r=n(1413),a=n(3433),i=n(9439),o=n(9434),s=n(5739),u=n(1923),l=n(6846),c=n(9218),d=n(1889),f=n(890),m=n(3767),p=n(3786),h=n(7621),x=n(4554),v=n(2791),y=n(9288),Z=(n(3791),n(8286)),b=n(184),g=[],k=[void 0,void 0],j={title:{text:"",pad:0},margin:{t:10,l:50,b:20,r:30}},S=function(e){var t=e.data,n=void 0===t?g:t,r=e.xKey,a=e.yKey,o=e.cKey,s=e.colorDomain,u=void 0===s?k:s,l=e.mode,c=void 0===l?"line":l,d=e.showscale,f=(0,v.useTransition)(),m=(0,i.Z)(f,2),p=(m[0],m[1]),h=(0,v.useState)(g),x=(0,i.Z)(h,2),y=x[0],S=x[1],w=(0,v.useState)([]),z=(0,i.Z)(w,2),K=z[0],E=z[1];(0,v.useEffect)((function(){p((function(){var e=[],t=[];n.forEach((function(n){e.push(n[r]),t.push(n[a])})),S({x:e,y:t})}))}),[r,a,n]),(0,v.useEffect)((function(){E("markers"===c&&o?n.map((function(e){return e[o]})):[])}),[n,o,c]);var A=[{x:y.x,y:y.y,type:"scatter",mode:c}];return console.log(u),K.length&&(A[0].marker={color:K,colorscale:"Portland",colorbarTitleText:o,colorbarThickness:5,showscale:d,cmin:u[0],cmax:u[1]}),(0,b.jsx)(Z.Z,{data:A,style:{width:"100%",height:"100%"},layout:j,useResizeHandler:!0})},w=[],z={title:{text:"",pad:0},margin:{t:10,l:50,b:20,r:10}},K=function(e){var t=e.data,n=void 0===t?w:t,a=e.getArr,o=e.getName,s=e.xKey,u=e.yKey,l=e.zKey,c=(e.mode,(0,v.useState)(w)),d=(0,i.Z)(c,2),f=d[0],m=d[1];(0,v.useEffect)((function(){var e=n.map((function(e){var t=[],n=[],r=[];return a(e).forEach((function(e){t.push(e[s]),n.push(e[u]),r.push(e[l])})),{name:o(e),x:t,y:n,z:r}}));m(e)}),[s,u,l,n]);var p=(0,v.useMemo)((function(){return f.map((function(e){return(0,r.Z)((0,r.Z)({},e),{},{type:"scatter3d",colorscale:"Portland",mode:"markers",marker:{size:3}})}))}),[f]);return(0,b.jsx)(Z.Z,{data:p,style:{width:"100%",height:"100%"},layout:(0,r.Z)((0,r.Z)({},z),{},{scene:{xaxis:{title:{text:s}},yaxis:{title:{text:u}},zaxis:{title:{text:l}}}}),useResizeHandler:!0})},E=[],A={title:{text:"",pad:0},margin:{t:10,l:50,b:50,r:10},hovermode:"closest",dragmode:"select",plot_bgcolor:"rgba(240,240,240, 0.95)",grid:{roworder:"bottom to top"}},N=function(e){var t=e.data,n=void 0===t?E:t,a=e.getArr,o=e.getName,s=e.dimensionKeys,u=(e.mode,(0,v.useState)(E)),l=(0,i.Z)(u,2),c=l[0],d=l[1],f=(0,v.useState)(A),m=(0,i.Z)(f,2),p=m[0],h=m[1];(0,v.useEffect)((function(){var e=n.map((function(e){var t=s.map((function(e){return{label:e,values:[]}}));return a(e).forEach((function(e){t.forEach((function(t){t.values.push(e[t.label])}))})),{type:"splom",name:o(e),dimensions:t,marker:{size:5,line:{color:"white",width:.5}}}}));d(e)}),[s,n]),(0,v.useEffect)((function(){var e=(0,r.Z)({},A);s.forEach((function(t,n){e["xaxis".concat(n)]=x(),e["yaxis".concat(n)]=x()})),h(e)}),[s]);var x=function(){return{showline:!1,zeroline:!1,gridcolor:"#ffff",ticklen:4}};return(0,b.jsx)(Z.Z,{data:c,style:{width:"100%",height:"100%"},layout:p,useResizeHandler:!0})},P=function(){var e=(0,o.v9)(s.hp),t=(0,v.useState)([]),n=(0,i.Z)(t,2),Z=n[0],g=n[1],k=(0,v.useState)([]),j=(0,i.Z)(k,2),w=j[0],z=j[1],E=(0,v.useState)({}),A=(0,i.Z)(E,2),P=A[0],C=A[1],D=(0,v.useState)("lines"),R=(0,i.Z)(D,2),_=R[0],T=R[1],W=(0,v.useState)([]),H=(0,i.Z)(W,2),I=(H[0],H[1],(0,v.useState)([{label:"x",key:"index"},{label:"y",key:"voltage"},{label:"z",key:null,is3D:!0},{label:"color",key:null},{label:"dim",key:[]}])),F=(0,i.Z)(I,2),O=F[0],V=F[1];(0,v.useEffect)((function(){var t=(0,y.Xxj)(e,(function(e){return e.Profile})),n={},r=[],a=t.map((function(e){var t=(0,i.Z)(e,2),a=t[0],o=t[1],s=Object.keys(n).map((function(e){return[e,[]]}));return o.forEach((function(e){void 0===n[e.AppName]&&(n[e.AppName]=s.length,s[n[e.AppName]]=[e.AppName,[]]),s[n[e.AppName]][1].push(e),r.push(e.data)})),[a,s]}));g(a);var o={};if(e[0]&&e[0].data&&e[0].data[0]){var s=Object.keys(e[0].data[0]);s.forEach((function(e){o[e]=[1/0,-1/0];var t=r.map((function(t){return(0,y.Wem)(t,(function(t){return+t[e]}))}));o[e]=[(0,y.VV$)(t,(function(e){return e[0]})),(0,y.Fp7)(t,(function(e){return e[1]}))]})),z(s)}else z([]);C(o)}),[e]);var L=function(e,t){O[e].key=t,V((0,a.Z)(O))},M="markers"===_||"lines"===_||"Splom"===_,X=function(e){var t=(0,i.Z)(e,2),n=t[0],r=t[1];switch(_){case"markers":case"lines":return(0,b.jsx)(d.ZP,{container:!0,children:r.map((function(e,t){var r,a=(0,i.Z)(e,2),o=a[0],s=a[1];return(0,b.jsxs)(d.ZP,{item:!0,xs:4,sx:{height:200,mb:3},children:[(0,b.jsx)(f.Z,{variant:"h5",textAlign:"center",children:o}),s[0]&&(0,b.jsx)(S,{data:null===(r=s[0])||void 0===r?void 0:r.data,xKey:O[0].key,yKey:O[1].key,cKey:O[3].key,colorDomain:P[O[3].key],getArr:function(e){var t=(0,i.Z)(e,2),n=(t[0],t[1]);return n[0]?n[0].data:[]},getName:function(e){var t=(0,i.Z)(e,2),n=t[0];t[1];return n},mode:_,showscale:2===t})]},"".concat(n," ").concat(o))}))});case"Splom":return(0,b.jsx)(N,{getArr:function(e){var t=(0,i.Z)(e,2),n=(t[0],t[1]);return n[0]?n[0].data:[]},getName:function(e){var t=(0,i.Z)(e,2),n=t[0];t[1];return n},data:r,dimensionKeys:O[4].key});case"Ribbon":return(0,b.jsx)(K,{getArr:function(e){var t=(0,i.Z)(e,2),n=(t[0],t[1]);return n[0]?n[0].data:[]},getName:function(e){var t=(0,i.Z)(e,2),n=t[0];t[1];return n},data:r,xKey:O[0].key,yKey:O[1].key,zKey:O[2].key,cKey:O[3].key});default:return(0,b.jsx)(b.Fragment,{children:"Not support yet"})}};return(0,b.jsxs)(d.ZP,{container:!0,spacing:u.dv,children:[(0,b.jsx)(d.ZP,{item:!0,xs:12,children:(0,b.jsxs)(m.Z,{spacing:2,direction:"row",children:[(0,b.jsxs)(c.Z,{select:!0,label:"Plot type",size:"small",sx:{minWidth:200},value:_,onChange:function(e){return T(e.target.value)},children:[(0,b.jsx)(p.Z,{value:"markers",children:"Scatter plot"}),(0,b.jsx)(p.Z,{value:"lines",children:"Line chart"}),(0,b.jsx)(p.Z,{value:"Ribbon",children:"3D scatter plot"}),(0,b.jsx)(p.Z,{value:"Splom",children:"Splom"}),(0,b.jsx)(p.Z,{value:"pca",children:"PCA"})]}),function(){switch(_){case"markers":case"lines":return O.map((function(e,t){return(0,b.jsx)(l.Z,{value:e.key,size:"small",sx:{minWidth:200,display:e.is3D?"none":void 0},options:w,onChange:function(e,n){return L(t,n)},renderInput:function(t){return(0,b.jsx)(c.Z,(0,r.Z)((0,r.Z)({},t),{},{label:e.label}))}},e.label)}));case"Splom":return(0,b.jsx)(l.Z,{value:O[4].key,multiple:!0,size:"small",options:w,onChange:function(e,t){return L(4,t)},renderInput:function(e){return(0,b.jsx)(c.Z,(0,r.Z)((0,r.Z)({},e),{},{label:O[4].label}))}});default:return O.map((function(e,t){return(0,b.jsx)(l.Z,{value:e.key,size:"small",sx:{minWidth:200,display:"color"===e.label?"none":void 0},options:w,onChange:function(e,n){return L(t,n)},renderInput:function(t){return(0,b.jsx)(c.Z,(0,r.Z)((0,r.Z)({},t),{},{label:e.label}))}},e.label)}))}}()]})}),Z.map((function(e){var t=(0,i.Z)(e,2),n=t[0],r=t[1];return(0,b.jsx)(d.ZP,{item:!0,xs:M?12:6,children:(0,b.jsx)(h.Z,{children:(0,b.jsxs)(x.Z,{sx:{p:2,pl:2},children:[(0,b.jsx)(f.Z,{variant:"h3",children:n}),X([n,r])]})})},n)}))]})}}}]);
//# sourceMappingURL=684.1bb9a2dc.chunk.js.map