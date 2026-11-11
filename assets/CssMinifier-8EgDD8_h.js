import{G as Oe,j as Te,e as Ue,m as e,y as w,z as s,f as B,h as Q,o as a,c as t,i as F,am as De,aM as Ie,aw as E,ag as V,t as O,n as y,D as W,b as $,d as Ge,k as T,a as U,r as h,bw as Pe}from"./vendor-DD6qoAQi.js";import{T as Ae}from"./ToolLayout-BLTXxgnX.js";import{t as z}from"./notifications-D_9cxcKx.js";import"./index-P59-iu8G.js";import"./router-Dh19MaBG.js";var Ke=B('<button class="btn btn-primary"><!> Copy result</button> <button class="btn btn-secondary"><!> Download CSS</button>',1),Ze=B('<div class="stats-card"><div class="stat-item"><p class="text-label text-ink-muted">Original size</p> <p class="stat-value font-mono"> </p></div> <div class="stat-item"><p class="text-label text-ink-muted">Processed size</p> <p class="stat-value font-mono"> </p></div> <div class="stat-item"><p class="text-label text-ink-muted">Size change</p> <p> </p></div> <div class="stat-item"><p class="text-label text-ink-muted">Compression</p> <p class="stat-value font-mono"> </p></div></div>'),qe=B('<div class="absolute inset-0 flex flex-col items-center justify-center p-6 pointer-events-none"><!> <p class="text-body-sm text-ink-muted"> </p></div>'),He=B('<div class="tab-nav" role="tablist"><button role="tab">Beautify CSS</button> <button role="tab">Minify CSS</button></div> <div class="flex flex-wrap gap-2 items-center"><!> <button class="btn btn-secondary"><!> Load sample CSS</button> <button class="btn btn-ghost">Clear all</button></div> <!> <div class="grid grid-cols-1 lg:grid-cols-2 gap-4"><div class="tool-card"><div class="card-header"><h2 class="section-title !mb-0">Input CSS</h2> <span class="text-count"> </span></div> <textarea placeholder="Enter your CSS code here..." class="code-editor min-h-[200px] sm:min-h-[300px] lg:min-h-[500px]"></textarea></div> <div class="tool-card"><div class="card-header"><h2 class="section-title !mb-0"> </h2> <span class="text-count"> </span></div> <div class="relative"><textarea readonly="" class="code-editor min-h-[200px] sm:min-h-[300px] lg:min-h-[500px]"></textarea> <!></div></div></div> <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4"><div class="card"><div class="feature-icon"><!></div> <h3 class="feature-title">Minify CSS</h3> <p class="feature-description">Reduce file size by removing whitespace, comments, and unnecessary characters</p></div> <div class="card"><div class="feature-icon"><!></div> <h3 class="feature-title">Beautify CSS</h3> <p class="feature-description">Format CSS with proper indentation and line breaks for better readability</p></div> <div class="card"><div class="feature-icon"><!></div> <h3 class="feature-title">Export results</h3> <p class="feature-description">Copy to clipboard or download processed CSS as a file for immediate use</p></div></div>',1);function Xe(X,Y){Ue(Y,!0);let c=w(""),o=w(""),l=w(!1),n=w(0),p=w(0),k=w(0);function D(){if(!e(c).trim()){s(o,""),s(n,0),s(p,0),s(k,0);return}if(s(n,new Blob([e(c)]).size,!0),e(l)){let i=e(c).replace(/\/\*[\s\S]*?\*\//g,"").replace(/\s+/g," ").replace(/\s*{\s*/g,"{").replace(/\s*}\s*/g,"}").replace(/\s*;\s*/g,";").replace(/\s*:\s*/g,":").replace(/\s*,\s*/g,",").replace(/;}/g,"}").trim();s(o,i,!0),s(p,new Blob([i]).size,!0)}else{let i=e(c).replace(/}/g,`}
`).replace(/;/g,`;
`).split(`
`).map((d,v,f)=>{let m=d.trim();if(!m)return"";let b=0,g=0;for(let x=0;x<v;x++)f[x].includes("{")&&g++,f[x].includes("}")&&g--;return b=Math.max(0,g),m==="}"&&(b=Math.max(0,b-1)),"  ".repeat(b)+m}).filter(d=>d.trim()).join(`
`);s(o,i,!0),s(p,new Blob([i]).size,!0)}s(k,e(n)>0?Math.round((e(n)-e(p))/e(n)*100):0,!0)}function ee(){s(c,`/* Sample CSS styles */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.header {
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 15px 0;
}

.navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 24px;
    font-weight: bold;
    color: #333333;
}

.nav-links {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
}

.nav-links li {
    margin-left: 20px;
}

.nav-links a {
    text-decoration: none;
    color: #666666;
    transition: color 0.3s ease;
}

.nav-links a:hover {
    color: #007bff;
}`),s(l,!0),D(),z.success("Sample CSS loaded")}function te(i){navigator.clipboard.writeText(i),z.success("Copied to clipboard")}function ae(){const i=new Blob([e(o)],{type:"text/css"}),d=URL.createObjectURL(i),v=document.createElement("a");v.href=d,v.download=e(l)?"styles.min.css":"styles.css",v.click(),URL.revokeObjectURL(d),z.success("CSS downloaded")}function se(){s(c,""),s(o,""),s(n,0),s(p,0),s(k,0),z.success("Cleared all")}function R(i){if(i===0)return"0 Bytes";const d=1024,v=["Bytes","KB","MB","GB"],f=Math.floor(Math.log(i)/Math.log(d));return parseFloat((i/Math.pow(d,f)).toFixed(2))+" "+v[f]}Oe(()=>{e(c)&&D()}),Ae(X,{title:"CSS Minifier",description:"Minify or beautify CSS code with real-time preview and size comparison.",get icon(){return E},color:"warning",children:(i,d)=>{var v=He(),f=Q(v),m=t(f),b=a(m,2),g=a(f,2),x=t(g);{var ie=r=>{var _=Ke(),u=Q(_),C=t(u);Pe(C,{class:"w-4 h-4"});var S=a(u,2),M=t(S);V(M,{class:"w-4 h-4"}),y("click",u,()=>te(e(o))),y("click",S,ae),$(r,_)};F(x,r=>{e(o)&&r(ie)})}var j=a(x,2),re=t(j);De(re,{class:"w-4 h-4"});var le=a(j,2),I=a(g,2);{var oe=r=>{var _=Ze(),u=t(_),C=a(t(u),2),S=t(C),M=a(u,2),Me=a(t(M),2),$e=t(Me),J=a(M,2),N=a(t(J),2),ze=t(N),Be=a(J,2),Re=a(t(Be),2),je=t(Re);O((Le,Fe,Ee)=>{h(S,Le),h($e,Fe),U(N,1,`stat-value font-mono ${e(p)<e(n)?"!text-live":"!text-negative"}`),h(ze,`${e(p)<e(n)?"-":"+"}${Ee??""}`),h(je,`${e(k)??""}%`)},[()=>R(e(n)),()=>R(e(p)),()=>R(Math.abs(e(p)-e(n)))]),$(r,_)};F(I,r=>{e(n)>0&&r(oe)})}var G=a(I,2),P=t(G),A=t(P),ne=a(t(A),2),ce=t(ne),de=a(A,2),ve=a(P,2),K=t(ve),Z=t(K),pe=t(Z),ue=a(Z,2),fe=t(ue),me=a(K,2),L=t(me),be=a(L,2);{var _e=r=>{var _=qe(),u=t(_);E(u,{class:"w-12 h-12 mb-2 opacity-50 text-ink-muted"});var C=a(u,2),S=t(C);O(()=>h(S,`Enter CSS code to see ${e(l)?"minified":"beautified"} result`)),$(r,_)};F(be,r=>{e(o)||r(_e)})}var he=a(G,2),q=t(he),xe=t(q),ge=t(xe);Ie(ge,{class:"w-5 h-5"});var H=a(q,2),Se=t(H),we=t(Se);E(we,{class:"w-5 h-5"});var ye=a(H,2),Ce=t(ye),ke=t(Ce);V(ke,{class:"w-5 h-5"}),O(()=>{T(m,"aria-selected",!e(l)),U(m,1,`tab-btn ${e(l)?"":"active"}`),T(b,"aria-selected",e(l)),U(b,1,`tab-btn ${e(l)?"active":""}`),h(ce,`${e(c).length??""} characters`),h(pe,`${e(l)?"Minified":"Beautified"} CSS`),h(fe,`${e(o).length??""} characters`),T(L,"placeholder",`${e(l)?"Minified":"Beautified"} CSS will appear here...`)}),y("click",m,()=>s(l,!1)),y("click",b,()=>s(l,!0)),y("click",j,ee),y("click",le,se),W(de,()=>e(c),r=>s(c,r)),W(L,()=>e(o),r=>s(o,r)),$(i,v)},$$slots:{default:!0}}),Te()}Ge(["click"]);export{Xe as default};
