import{b as p,t as l}from"../chunks/disclose-version.BffXv8gN.js";import{a0 as b,o as m,a1 as i,l as d,O as v,W as $,$ as g,X as h,Y as n,_ as c}from"../chunks/runtime.fPXvfd0O.js";import{s as x}from"../chunks/render.CQRS2aum.js";import{i as _}from"../chunks/lifecycle.MEWedBzr.js";import{a as w}from"../chunks/entry.nGrDgQi8.js";import{p as O}from"../chunks/stores.CRB7ynG2.js";function W(s,r,t){const e=t[r]??(t[r]={store:null,source:m(void 0),unsubscribe:i});if(e.store!==s)if(e.unsubscribe(),e.store=s??null,s==null)e.source.v=void 0,e.unsubscribe=i;else{var o=!0;e.unsubscribe=w(s,a=>{o?e.source.v=a:d(e.source,a)}),o=!1}return v(e.source)}function X(){const s={};return b(()=>{for(var r in s)s[r].unsubscribe()}),s}var Y=l('<div class="error"><h1> </h1></div>');function C(s,r){$(r,!1);const t=X(),e=()=>W(O,"$page",t);_();var o=Y(),a=n(o),f=n(a);c(a),c(o),g(()=>{var u;return x(f,`${e().status??""}: ${((u=e().error)==null?void 0:u.message)??""}`)}),p(s,o),h()}export{C as component};