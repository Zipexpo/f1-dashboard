"use strict";(self.webpackChunkapp_perform_dashboard=self.webpackChunkapp_perform_dashboard||[]).push([[133],{7133:function(t,n,e){e.r(n),e.d(n,{default:function(){return B}});var r=e(1413),a=e(3433),o=e(9439),u=e(9434),i=e(5739),c=e(1923),s=e(6846),f=e(9218),l=e(1889),m=e(890),p=e(3767),h=e(3786),d=e(388),v=e(7621),x=e(4554),y=e(2791),Z=e(8452),g=e(8286),b=e(184),k=[],j={title:{text:"",pad:0},margin:{t:10,l:50,b:30,r:30}},w=function(t){var n=t.data,e=void 0===n?k:n,a=t.xKey,u=t.domain,i=t.yKey,c=t.cKey,s=(t.getArr,t.getName,t.colorDomain),f=void 0===s?u:s,l=t.mode,m=void 0===l?"line":l,p=t.showscale,h=(0,y.useTransition)(),d=(0,o.Z)(h,2),v=(d[0],d[1]),x=(0,y.useState)(k),Z=(0,o.Z)(x,2),w=Z[0],S=Z[1],z=(0,y.useState)([]),M=(0,o.Z)(z,2),E=M[0],K=M[1];(0,y.useEffect)((function(){v((function(){var t=[],n=[];e.forEach((function(e){t.push(e[a]),n.push(e[i])})),S({x:t,y:n})}))}),[a,i,e]),(0,y.useEffect)((function(){K("markers"===m&&c?e.map((function(t){return t[c]})):[])}),[e,c,m]);var A=[{x:w.x,y:w.y,type:"scatter",mode:m}];E.length&&(A[0].marker={color:E,colorscale:"Portland",colorbarTitleText:c,colorbarThickness:5,showscale:p,cmin:f[0],cmax:f[1]});var H=(0,r.Z)((0,r.Z)({},j),{},{yaxis:{title:i,autorange:!1,range:u[i]},xaxis:{title:a}});return(0,b.jsx)(g.Z,{data:A,style:{width:"100%",height:"100%"},layout:H,useResizeHandler:!0})},S=[],z={title:{text:"",pad:0},margin:{t:10,l:50,b:20,r:30}},M=function(t){var n=t.data,e=void 0===n?S:n,r=t.getArr,a=t.getName,u=t.xKey,i=t.yKey,c=(t.cKey,t.colorDomain,t.mode,t.showscale,(0,y.useTransition)()),s=(0,o.Z)(c,2),f=(s[0],s[1]),l=(0,y.useState)(S),m=(0,o.Z)(l,2),p=m[0],h=m[1],d=(0,y.useState)([]),v=(0,o.Z)(d,2);v[0],v[1];return(0,y.useEffect)((function(){f((function(){var t=e.map((function(t){var n=[],e=[];return r(t).forEach((function(t){n.push(t[u]),e.push(t[i])})),{name:a(t),x:n,y:e,type:"scatter"}}));h(t)}))}),[u,i,e]),(0,b.jsx)(g.Z,{data:p,style:{width:"100%",height:"100%"},layout:z,useResizeHandler:!0})},E=[],K={title:{text:"",pad:0},margin:{t:10,l:50,b:20,r:10}},A=function(t){var n=t.data,e=void 0===n?E:n,a=t.getArr,u=t.getName,i=t.xKey,c=t.yKey,s=t.zKey,f=(t.mode,(0,y.useState)(E)),l=(0,o.Z)(f,2),m=l[0],p=l[1];(0,y.useEffect)((function(){var t=e.map((function(t){var n=[],e=[],r=[];return a(t).forEach((function(t){n.push(t[i]),e.push(t[c]),r.push(t[s])})),{name:u(t),x:n,y:e,z:r}}));p(t)}),[i,c,s,e]);var h=(0,y.useMemo)((function(){return m.map((function(t){return(0,r.Z)((0,r.Z)({},t),{},{type:"scatter3d",colorscale:"Portland",mode:"markers",marker:{size:3}})}))}),[m]);return(0,b.jsx)(g.Z,{data:h,style:{width:"100%",height:"100%"},layout:(0,r.Z)((0,r.Z)({},K),{},{scene:{xaxis:{title:{text:i}},yaxis:{title:{text:c}},zaxis:{title:{text:s}}}}),useResizeHandler:!0})},H=[],P={title:{text:"",pad:0},margin:{t:10,l:50,b:50,r:10},hovermode:"closest",dragmode:"select",plot_bgcolor:"rgba(240,240,240, 0.95)",grid:{roworder:"bottom to top"}},N=function(t){var n=t.data,e=void 0===n?H:n,a=t.getArr,u=t.getName,i=t.dimensionKeys,c=(t.mode,(0,y.useState)(H)),s=(0,o.Z)(c,2),f=s[0],l=s[1],m=(0,y.useState)(P),p=(0,o.Z)(m,2),h=p[0],d=p[1];(0,y.useEffect)((function(){var t=e.map((function(t){var n=i.map((function(t){return{label:t,values:[]}}));return a(t).forEach((function(t){n.forEach((function(n){n.values.push(t[n.label])}))})),{type:"splom",name:u(t),dimensions:n,marker:{size:5,line:{color:"white",width:.5}}}}));l(t)}),[i,e]),(0,y.useEffect)((function(){var t=(0,r.Z)({},P);i.forEach((function(n,e){t["xaxis".concat(e)]=v(),t["yaxis".concat(e)]=v()})),d(t)}),[i]);var v=function(){return{showline:!1,zeroline:!1,gridcolor:"#ffff",ticklen:4}};return(0,b.jsx)(g.Z,{data:f,style:{width:"100%",height:"100%"},layout:h,useResizeHandler:!0})},R=function(){function t(t){return n(t).map((function(n){return Z.Smz(n)/t.length}))}function n(t){return Z.w6H(t[0].length).map((function(n){return t.map((function(t){return t[n]}))}))}function e(t,e){return t.map((function(t){return n(e).map((function(n){return Z.Smz(Z.$Re(t,n).map((function(t){return t[0]*t[1]})))}))}))}function r(t,n){return Z.w6H(t).map((function(t){return Z.w6H(n).map((function(){return 0}))}))}function a(t,n){return console.assert(t.length===n.length,"dim(x) == dim(y)"),Z.$Re(t,n).map((function(t){return"number"===typeof t[0]?t[0]-t[1]:Z.$Re(t[0],t[1]).map((function(t){return t[0]-t[1]}))}))}this.scale=function(n,e,r){if(e){var o=t(n);n=n.map((function(t){return a(t,o)}))}if(r){var u=function(n){t(n);return e=t(function(t,n){return Z.$Re(t,n).map((function(t){return"number"===typeof t[0]?t[0]*t[1]:Z.$Re(t[0],t[1]).map((function(t){return t[0]*t[1]}))}))}(n,n)),e.map((function(t){return Math.sqrt(t)}));var e}(n);n=n.map((function(t){return n=t,e=u,console.assert(n.length===e.length,"dim(x) == dim(y)"),Z.$Re(n,e).map((function(t){return 0!==t[1]?t[0]/t[1]:0}));var n,e}))}return n},this.pca=function(t,n){var o=function(t){var n,e=Math.pow(2,-52),a=1e-64/e,o=50,u=0,i=0,c=0,s=0,f=0,l=t.map((function(t){return t.slice(0)})),m=l.length,p=l[0].length;console.assert(m>=p,"Need more rows than columns");var h=Z.w6H(p).map((function(){return 0})),d=Z.w6H(p).map((function(){return 0})),v=r(p,p);function x(t,n){return(t=Math.abs(t))>(n=Math.abs(n))?t*Math.sqrt(1+n*n/t/t):0===n?t:n*Math.sqrt(1+t*t/n/n)}var y=0,g=0,b=0,k=0,j=0,w=0,S=0;for(i=0;i<p;i++){for(h[i]=g,S=0,f=i+1,c=i;c<m;c++)S+=l[c][i]*l[c][i];if(S<=a)g=0;else for(y=l[i][i],g=Math.sqrt(S),y>=0&&(g=-g),b=y*g-S,l[i][i]=y-g,c=f;c<p;c++){for(S=0,s=i;s<m;s++)S+=l[s][i]*l[s][c];for(y=S/b,s=i;s<m;s++)l[s][c]+=y*l[s][i]}for(d[i]=g,S=0,c=f;c<p;c++)S+=l[i][c]*l[i][c];if(S<=a)g=0;else{for(y=l[i][i+1],g=Math.sqrt(S),y>=0&&(g=-g),b=y*g-S,l[i][i+1]=y-g,c=f;c<p;c++)h[c]=l[i][c]/b;for(c=f;c<m;c++){for(S=0,s=f;s<p;s++)S+=l[c][s]*l[i][s];for(s=f;s<p;s++)l[c][s]+=S*h[s]}}(j=Math.abs(d[i])+Math.abs(h[i]))>k&&(k=j)}for(i=p-1;-1!==i;i+=-1){if(0!==g){for(b=g*l[i][i+1],c=f;c<p;c++)v[c][i]=l[i][c]/b;for(c=f;c<p;c++){for(S=0,s=f;s<p;s++)S+=l[i][s]*v[s][c];for(s=f;s<p;s++)v[s][c]+=S*v[s][i]}}for(c=f;c<p;c++)v[i][c]=0,v[c][i]=0;v[i][i]=1,g=h[i],f=i}for(i=p-1;-1!==i;i+=-1){for(f=i+1,g=d[i],c=f;c<p;c++)l[i][c]=0;if(0!==g){for(b=l[i][i]*g,c=f;c<p;c++){for(S=0,s=f;s<m;s++)S+=l[s][i]*l[s][c];for(y=S/b,s=i;s<m;s++)l[s][c]+=y*l[s][i]}for(c=i;c<m;c++)l[c][i]=l[c][i]/g}else for(c=i;c<m;c++)l[c][i]=0;l[i][i]+=1}for(e*=k,s=p-1;-1!==s;s+=-1)for(var z=0;z<o;z++){var M=!1;for(f=s;-1!==f;f+=-1){if(Math.abs(h[f])<=e){M=!0;break}if(Math.abs(d[f-1])<=e)break}if(!M){u=0,S=1;var E=f-1;for(i=f;i<s+1&&(y=S*h[i],h[i]=u*h[i],!(Math.abs(y)<=e));i++)for(b=x(y,g=d[i]),d[i]=b,u=g/b,S=-y/b,c=0;c<m;c++)j=l[c][E],w=l[c][i],l[c][E]=j*u+w*S,l[c][i]=-j*S+w*u}if(w=d[s],f===s){if(w<0)for(d[s]=-w,c=0;c<p;c++)v[c][s]=-v[c][s];break}for(console.assert(z<o-1,"Error: no convergence."),k=d[f],g=x(y=(((j=d[s-1])-w)*(j+w)+((g=h[s-1])-(b=h[s]))*(g+b))/(2*b*j),1),y=y<0?((k-w)*(k+w)+b*(j/(y-g)-b))/k:((k-w)*(k+w)+b*(j/(y+g)-b))/k,u=1,S=1,i=f+1;i<s+1;i++){for(g=h[i],j=d[i],b=S*g,g*=u,w=x(y,b),h[i-1]=w,y=k*(u=y/w)+g*(S=b/w),g=-k*S+g*u,b=j*S,j*=u,c=0;c<p;c++)k=v[c][i-1],w=v[c][i],v[c][i-1]=k*u+w*S,v[c][i]=-k*S+w*u;for(w=x(y,b),d[i-1]=w,y=(u=y/w)*g+(S=b/w)*j,k=-S*g+u*j,c=0;c<m;c++)j=l[c][i-1],w=l[c][i],l[c][i-1]=j*u+w*S,l[c][i]=-j*S+w*u}h[f]=0,h[s]=y,d[s]=k}for(i=0;i<d.length;i++)d[i]<e&&(d[i]=0);for(i=0;i<p;i++)for(c=i-1;c>=0;c--)if(d[c]<d[i]){for(u=d[c],d[c]=d[i],d[i]=u,s=0;s<l.length;s++)n=l[s][i],l[s][i]=l[s][c],l[s][c]=n;for(s=0;s<v.length;s++)n=v[s][i],v[s][i]=v[s][c],v[s][c]=n;i=c}return{U:l,S:d,V:v}}(t),u=o.U,i=function(t){return Z.w6H(t.length).map((function(n){return Z.w6H(t.length).map((function(e){return n===e?t[n]:0}))}))}(o.S),c=o.V,s=e(t,c),f=e(u,i),l=function(t,n){return t.map((function(t){return t.map((function(t){return t<n?0:t}))}))}(a(s,f),1e-12),m=r(l.length,l[0].length);console.assert(function(t,n){return Z.$Re(t,n).map((function(t){return Z.$Re(t[0],t[1]).map((function(t){return t[0]===t[1]}))})).map((function(t){return t.reduce((function(t,n){return t*n}))})).reduce((function(t,n){return t*n}))}(l,m),"svd and eig ways must be the same.");for(var p=[],h=0;h<n;h++)p.push(h);for(var d in o.S)for(h=0;h<n;h++)if(o.S[d]>=o.S[p[h]]){p[h]=parseInt(d);break}return[f,c,p,i]}},C=[],q={title:{text:"",pad:0},margin:{t:10,l:50,b:50,r:10}},$=2,T=function(t){var n=t.data,e=void 0===n?C:n,a=t.getArr,u=t.getName,i=t.dimensionKeys,c=(t.mode,(0,y.useState)(C)),s=(0,o.Z)(c,2),f=s[0],l=s[1],m=(0,y.useState)(q),p=(0,o.Z)(m,2),h=p[0],d=p[1],v=(0,y.useTransition)(),x=(0,o.Z)(v,2),k=(x[0],x[1]);return(0,y.useEffect)((function(){k((function(){try{var t=[],n=[];e.forEach((function(e,r){n[r]=[],a(e).forEach((function(e){var a=i.map((function(t){return+e[t]}));n[r].push(t.length),t.push(a)}))}));var c=function(t,n){var e=new R,r=e.scale(t,!0,!0),a=e.pca(r,$),u=a[0],i=a[1],c=a[2],s=a[3];console.log(i);var f=t.map((function(t,n){var e=(0,Z.w6H)(0,$).map((function(t){return u[n][c[t]]}));return e.data=t,e})),l=(0,Z.Wem)(f,(function(t){return t[0]})),m=(0,Z.Wem)(f,(function(t){return t[1]})),p=[0,0],h=[[0,-1/0],[0,-1/0]],d=n.map((function(t,n){var e=[p,(0,Z.w6H)(0,$).map((function(t){return i[n][c[t]]}))];return h.forEach((function(t,r){var a=(0,o.Z)(t,2),u=(a[0],a[1]),i=Math.abs(e[1][r]-e[0][r]);i>u&&(h[r]=[n,i])})),e.name=t,e}));d[h[0][0]].pc1=!0,d[h[1][0]].pc2=!0;var v=Math.sqrt((0,Z.Fp7)([_(p,[l[0],m[0]]),_(p,[l[0],m[1]]),_(p,[l[1],m[0]]),_(p,[l[1],m[1]])])/(0,Z.Fp7)(d,(function(t){return _(p,[t[1][0],t[1][1]])})));d.forEach((function(t){t[1][0]=t[1][0]*v,t[1][1]=t[1][1]*v}));var x=(0,Z.Smz)(s,(function(t,n){return t[n]}));var y=(0,Z.w6H)(0,$).map((function(t){return s[c[t]][c[t]]/x}));return{solution:f,feature:d,contribute:y}}(t,i),s=c.solution,f=c.feature,m=c.contribute,p=e.map((function(t,e){return{type:"scatters",mode:"markers",name:u(t),x:n[e].map((function(t){return s[t][0]})),y:n[e].map((function(t){return s[t][1]}))}}));l(p);var h=(0,r.Z)((0,r.Z)({},q),{},{xaxis:{title:{text:"PC1 (".concat(Math.round(1e3*m[0])/10,"%)")}},yaxis:{title:{text:"PC2 (".concat(Math.round(1e3*m[1])/10,"%)")}}});h.shapes=f.map((function(t){return{type:"line",x0:t[0][0],y0:t[0][1],x1:t[1][0],y1:t[1][1]}})),h.annotations=f.map((function(t){return{x:t[1][0],y:t[1][1],text:t.name,xanchor:"center",yanchor:"bottom",font:{color:t.pc1||t.pc2?"red":"unset"}}})),d(h)}catch(v){l([])}}))}),[i,e]),(0,b.jsx)(g.Z,{data:f,style:{width:"100%",height:"100%"},layout:h,useResizeHandler:!0})};function _(t,n){return Math.sqrt((t[1]-n[1])*(t[1]-n[1])+(t[0]-n[0])*(t[0]-n[0]))}var W=[],D={title:{text:"",pad:0},margin:{t:10,l:50,b:50,r:10}},F=2,V=function(t){var n=t.data,e=void 0===n?W:n,a=t.getArr,u=t.getName,i=t.dimensionKeys,c=(t.mode,(0,y.useState)(W)),s=(0,o.Z)(c,2),f=s[0],l=s[1],m=(0,y.useState)(D),p=(0,o.Z)(m,2),h=p[0],d=p[1],v=(0,y.useTransition)(),x=(0,o.Z)(v,2),k=(x[0],x[1]);return(0,y.useEffect)((function(){k((function(){try{var t=e.map((function(t){return u(t)})),n=(0,Z.VV$)(e,(function(t){return a(t).length})),c=[];e.forEach((function(t,e){for(var r=a(t),o=function(){var t=r[u],n=i.map((function(n){return+t[n]}));c.push(n)},u=0;u<n;u++)o()}));var s=function(t,n,e,r){for(var a=new R,u=a.scale(t,!0,!0),i=[],c=function(t){for(var n=function(n){i[t*r+n]=e.map((function(e,a){return u[a*r+n][t]}))},a=0;a<r;a++)n(a)},s=0;s<n.length;s++)c(s);var f=a.pca(i,F),l=f[0],m=f[1],p=f[2],h=f[3];console.log(m);var d=i.map((function(t,n){return(0,Z.w6H)(0,F).map((function(t){return l[n][p[t]]}))})),v=(0,Z.Wem)(d,(function(t){return t[0]})),x=(0,Z.Wem)(d,(function(t){return t[1]})),y=[0,0],g=[[0,-1/0],[0,-1/0]],b=e.map((function(t,n){var e=[y,(0,Z.w6H)(0,F).map((function(t){return m[n][p[t]]}))];return g.forEach((function(t,r){var a=(0,o.Z)(t,2),u=(a[0],a[1]),i=Math.abs(e[1][r]-e[0][r]);i>u&&(g[r]=[n,i])})),e.name=t,e}));b[g[0][0]].pc1=!0,b[g[1][0]].pc2=!0;var k=Math.sqrt((0,Z.Fp7)([L(y,[v[0],x[0]]),L(y,[v[0],x[1]]),L(y,[v[1],x[0]]),L(y,[v[1],x[1]])])/(0,Z.Fp7)(b,(function(t){return L(y,[t[1][0],t[1][1]])})));b.forEach((function(t){t[1][0]=t[1][0]*k,t[1][1]=t[1][1]*k}));var j=(0,Z.Smz)(h,(function(t,n){return t[n]}));var w=(0,Z.w6H)(0,F).map((function(t){return h[p[t]][p[t]]/j}));return{solution:d,feature:b,contribute:w}}(c,i,t,n),f=s.solution,m=s.feature,p=s.contribute,h=(0,Z.w6H)(0,n),v=i.map((function(t,e){return{type:"scatters",mode:"markers",name:t,x:h.map((function(t){return f[e*n+t][0]})),y:h.map((function(t){return f[e*n+t][1]}))}}));l(v);var x=(0,r.Z)((0,r.Z)({},D),{},{xaxis:{title:{text:"PC1 (".concat(Math.round(1e3*p[0])/10,"%)")}},yaxis:{title:{text:"PC2 (".concat(Math.round(1e3*p[1])/10,"%)")}}});x.shapes=m.map((function(t){return{type:"line",x0:t[0][0],y0:t[0][1],x1:t[1][0],y1:t[1][1]}})),x.annotations=m.map((function(t){return{x:t[1][0],y:t[1][1],text:t.name,xanchor:"center",yanchor:"bottom",font:{color:t.pc1||t.pc2?"red":"unset"}}})),d(x)}catch(y){l([])}}))}),[i,e]),(0,b.jsx)(g.Z,{data:f,style:{width:"100%",height:"100%"},layout:h,useResizeHandler:!0})};function L(t,n){return Math.sqrt((t[1]-n[1])*(t[1]-n[1])+(t[0]-n[0])*(t[0]-n[0]))}var O=[],I={title:{text:"",pad:0},margin:{t:10,r:10},xaxis:{ticks:"",tickfont:{size:8}},yaxis:{ticks:"",ticksuffix:" ",tickfont:{size:8}}},U=function(t){var n=t.data,e=void 0===n?O:n,a=t.getArr,u=t.getName,i=t.dimensionKey,c=(0,y.useState)(O),s=(0,o.Z)(c,2),f=s[0],l=s[1],m=(0,y.useState)(I),p=(0,o.Z)(m,2),h=p[0],d=p[1],v=(0,y.useTransition)(),x=(0,o.Z)(v,2),Z=(x[0],x[1]);return(0,y.useEffect)((function(){Z((function(){try{for(var t=[],n=e.map((function(n,e){return t.push(u(n)),a(n).map((function(t){return+t[i]}))})),o=[],c=t.map((function(n){return t.map((function(t){return null}))})),s=0;s<t.length-1;s++)for(var f=s+1;f<t.length;f++){var m=n[s].length<n[f].length?X(n[s],n[f]):X(n[f],n[s]);c[s][f]=Math.abs(m),c[f][s]=c[s][f],c[s][f],o.push({xref:"x1",yref:"y1",x:t[f],y:t[s],text:Math.round(100*m)/100,font:{color:"white"},showarrow:!1})}l([{type:"heatmap",name:i,x:t,y:t,z:c,zauto:!1,zmin:0,zmax:1,hoverongaps:!1,showscale:!1}]);var p=(0,r.Z)((0,r.Z)({},I),{},{annotations:o});d(p)}catch(h){l([])}}))}),[i,e]),(0,b.jsx)(g.Z,{data:f,style:{width:"100%",height:"100%"},layout:h,useResizeHandler:!0})};function X(t,n){var e=Math.min,r=Math.pow,a=Math.sqrt,u=function(t,n){return t+n},i=e(t.length,n.length);if(0===i)return 0;var c=[t.slice(0,i),n.slice(0,i)],s=[t=c[0],n=c[1]].map((function(t){return t.reduce(u)})),f=(0,o.Z)(s,2),l=f[0],m=f[1],p=[t,n].map((function(t){return t.reduce((function(t,n){return t+r(n,2)}),0)})),h=(0,o.Z)(p,2),d=h[0],v=h[1],x=t.map((function(t,e){return t*n[e]})).reduce(u),y=a((d-r(l,2)/i)*(v-r(m,2)/i));return 0===y?0:(x-l*m/i)/y}var B=function(){var t=(0,u.v9)(i.hp),n=(0,y.useState)(!1),e=(0,o.Z)(n,2),g=e[0],k=e[1],j=(0,y.useState)([]),S=(0,o.Z)(j,2),z=S[0],E=S[1],K=(0,y.useState)([]),H=(0,o.Z)(K,2),P=H[0],R=H[1],C=(0,y.useState)({}),q=(0,o.Z)(C,2),$=q[0],_=q[1],W=(0,y.useState)("lines"),D=(0,o.Z)(W,2),F=D[0],L=D[1],O=(0,y.useState)([]),I=(0,o.Z)(O,2),X=(I[0],I[1],(0,y.useState)([{label:"x",key:"index"},{label:"y",key:"voltage"},{label:"z",key:null,is3D:!0},{label:"color",key:null},{label:"dim",key:[],is3D:!0}])),B=(0,o.Z)(X,2),G=B[0],J=B[1];(0,y.useEffect)((function(){var n=function(t,n){var e=t?"Profile":"AppName",r=t?"AppName":"Profile",a=(0,Z.Xxj)(n,(function(t){return t[e]})),u={},i=[],c=a.map((function(t){var n=(0,o.Z)(t,2),e=n[0],a=n[1],c=Object.keys(u).map((function(t){return[t,[]]}));return a.forEach((function(t){void 0===u[t[r]]&&(u[t[r]]=c.length,c[u[t[r]]]=[t[r],[]]),c[u[t[r]]][1].push(t),i.push(t.data)})),[e,c]}));return E(c),{flatdata:i}}(g,t),e=n.flatdata,r={};if(t[0]&&t[0].data&&t[0].data[0]){var a=Object.keys(t[0].data[0]);a.forEach((function(t){r[t]=[1/0,-1/0];var n=e.map((function(n){return(0,Z.Wem)(n,(function(n){return+n[t]}))}));r[t]=[(0,Z.VV$)(n,(function(t){return t[0]})),(0,Z.Fp7)(n,(function(t){return t[1]}))]})),R(a)}else R([]);_(r)}),[g,t]);var Q=function(t,n){G[t].key=n,J((0,a.Z)(G))},Y="markers"===F||"lines2"===F||"lines"===F||"Splom"===F,tt=function(t){var n=(0,o.Z)(t,2),e=n[0],r=n[1];switch(F){case"markers":case"lines":return(0,b.jsx)(l.ZP,{container:!0,children:r.map((function(t,n){var r,a=(0,o.Z)(t,2),u=a[0],i=a[1];return(0,b.jsxs)(l.ZP,{item:!0,xs:4,sx:{height:200,mb:3,paddingTop:2},children:[(0,b.jsx)(m.Z,{variant:"h5",textAlign:"center",children:u}),i[0]&&(0,b.jsx)(w,{data:null===(r=i[0])||void 0===r?void 0:r.data,xKey:G[0].key,yKey:G[1].key,domain:$,cKey:G[3].key,colorDomain:$[G[3].key],getArr:function(t){var n=(0,o.Z)(t,2),e=(n[0],n[1]);return e[0]?e[0].data:[]},getName:function(t){var n=(0,o.Z)(t,2),e=n[0];n[1];return e},mode:F,showscale:2===n})]},"".concat(e," ").concat(u))}))});case"lines2":return(0,b.jsx)(M,{getArr:function(t){var n=(0,o.Z)(t,2),e=(n[0],n[1]);return e[0]?e[0].data:[]},getName:function(t){var n=(0,o.Z)(t,2),e=n[0];n[1];return e},data:r,xKey:G[0].key,yKey:G[1].key});case"Splom":return(0,b.jsx)(N,{getArr:function(t){var n=(0,o.Z)(t,2),e=(n[0],n[1]);return e[0]?e[0].data:[]},getName:function(t){var n=(0,o.Z)(t,2),e=n[0];n[1];return e},data:r,dimensionKeys:G[4].key});case"pca":return(0,b.jsx)(T,{getArr:function(t){var n=(0,o.Z)(t,2),e=(n[0],n[1]);return e[0]?e[0].data:[]},getName:function(t){var n=(0,o.Z)(t,2),e=n[0];n[1];return e},data:r,dimensionKeys:G[4].key});case"pca_2":return(0,b.jsx)(V,{getArr:function(t){var n=(0,o.Z)(t,2),e=(n[0],n[1]);return e[0]?e[0].data:[]},getName:function(t){var n=(0,o.Z)(t,2),e=n[0];n[1];return e},data:r,dimensionKeys:G[4].key});case"sim":return(0,b.jsx)(l.ZP,{container:!0,children:G[4].key.map((function(t){return(0,b.jsxs)(l.ZP,{item:!0,xs:6,sx:{height:200,mb:3},children:[(0,b.jsx)(m.Z,{variant:"h5",textAlign:"center",children:t}),(0,b.jsx)(U,{getArr:function(t){var n=(0,o.Z)(t,2),e=(n[0],n[1]);return e[0]?e[0].data:[]},getName:function(t){var n=(0,o.Z)(t,2),e=n[0];n[1];return e},data:r,dimensionKey:t})]},t)}))});case"Ribbon":return(0,b.jsx)(A,{getArr:function(t){var n=(0,o.Z)(t,2),e=(n[0],n[1]);return e[0]?e[0].data:[]},getName:function(t){var n=(0,o.Z)(t,2),e=n[0];n[1];return e},data:r,xKey:G[0].key,yKey:G[1].key,zKey:G[2].key,cKey:G[3].key});default:return(0,b.jsx)(b.Fragment,{children:"Not support yet"})}};return(0,b.jsxs)(l.ZP,{container:!0,spacing:c.dv,children:[(0,b.jsx)(l.ZP,{item:!0,xs:12,children:(0,b.jsxs)(p.Z,{spacing:2,direction:"row",children:[(0,b.jsxs)(f.Z,{select:!0,label:"Plot type",size:"small",sx:{minWidth:200},value:F,onChange:function(t){return L(t.target.value)},children:[(0,b.jsx)(h.Z,{value:"markers",children:"Scatter plot"}),(0,b.jsx)(h.Z,{value:"lines",children:"Line chart"}),(0,b.jsx)(h.Z,{value:"lines2",children:"Line chart (combine)"}),(0,b.jsx)(h.Z,{value:"Ribbon",children:"3D scatter plot"}),(0,b.jsx)(h.Z,{value:"Splom",children:"Splom"}),(0,b.jsx)(h.Z,{value:"pca",children:"PCA"}),(0,b.jsx)(h.Z,{value:"pca_2",children:"PCA 2"}),(0,b.jsx)(h.Z,{value:"sim",children:"Similarity matrix"})]}),(0,b.jsx)(d.Z,{value:"app_profile",selected:g,color:"primary",onChange:function(){return k(!g)},children:"Swap App and Profile"}),function(){switch(F){case"markers":case"lines":return G.map((function(t,n){return(0,b.jsx)(s.Z,{value:t.key,getOptionLabel:function(t){return t},size:"small",sx:{minWidth:200,display:t.is3D?"none":void 0},options:P,onChange:function(t,e){return Q(n,e)},renderInput:function(n){return(0,b.jsx)(f.Z,(0,r.Z)((0,r.Z)({},n),{},{label:t.label}))}},t.label)}));case"Splom":case"pca":case"pca_2":case"sim":return(0,b.jsx)(s.Z,{value:G[4].key,multiple:!0,getOptionLabel:function(t){return t},size:"small",options:P,onChange:function(t,n){return Q(4,n)},renderInput:function(t){return(0,b.jsx)(f.Z,(0,r.Z)((0,r.Z)({},t),{},{label:G[4].label}))}});default:return G.map((function(t,n){return(0,b.jsx)(s.Z,{value:t.key,size:"small",getOptionLabel:function(t){return t},sx:{minWidth:200,display:"color"===t.label?"none":void 0},options:P,onChange:function(t,e){return Q(n,e)},renderInput:function(n){return(0,b.jsx)(f.Z,(0,r.Z)((0,r.Z)({},n),{},{label:t.label}))}},t.label)}))}}()]})}),z.map((function(t){var n=(0,o.Z)(t,2),e=n[0],r=n[1];return(0,b.jsx)(l.ZP,{item:!0,xs:Y?12:6,children:(0,b.jsx)(v.Z,{children:(0,b.jsxs)(x.Z,{sx:{p:2,pl:2},children:[(0,b.jsx)(m.Z,{variant:"h3",children:e}),tt([e,r])]})})},e)}))]})}}}]);
//# sourceMappingURL=133.bf469210.chunk.js.map