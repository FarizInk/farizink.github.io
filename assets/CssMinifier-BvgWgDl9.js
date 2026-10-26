import{u as Ie,k as Oe,p as Te,g as e,s as w,d as s,m as B,h as q,w as a,n as t,i as F,ax as Ue,aX as De,aH as E,ar as N,t as I,J as C,Q as V,j as $,I as He,v as O,o as T,K as h,bH as Ke}from"./vendor-Dm-feJI2.js";import{T as Pe}from"./ToolLayout-GjpI-t1f.js";import{t as z}from"./notifications-BZShXvb2.js";import"./index-yZmSxAKZ.js";import"./router-BpIG6wBW.js";var Ae=B('<button class="btn btn-primary"><!> Copy result</button> <button class="btn btn-secondary"><!> Download CSS</button>',1),Ge=B('<div class="stats-card"><div class="stat-item"><p class="text-label text-ink-muted">Original size</p> <p class="stat-value font-mono"> </p></div> <div class="stat-item"><p class="text-label text-ink-muted">Processed size</p> <p class="stat-value font-mono"> </p></div> <div class="stat-item"><p class="text-label text-ink-muted">Size change</p> <p> </p></div> <div class="stat-item"><p class="text-label text-ink-muted">Compression</p> <p class="stat-value font-mono"> </p></div></div>'),Je=B('<div class="absolute inset-0 flex flex-col items-center justify-center p-6 pointer-events-none"><!> <p class="text-body-sm text-ink-muted"> </p></div>'),Qe=B('<div class="tab-nav" role="tablist"><button role="tab">Beautify CSS</button> <button role="tab">Minify CSS</button></div> <div class="flex flex-wrap gap-2 items-center"><!> <button class="btn btn-secondary"><!> Load sample CSS</button> <button class="btn btn-ghost">Clear all</button></div> <!> <div class="grid grid-cols-1 lg:grid-cols-2 gap-4"><div class="tool-card"><div class="card-header"><h2 class="section-title !mb-0">Input CSS</h2> <span class="text-count"> </span></div> <textarea placeholder="Enter your CSS code here..." class="code-editor min-h-[200px] sm:min-h-[300px] lg:min-h-[500px]"></textarea></div> <div class="tool-card"><div class="card-header"><h2 class="section-title !mb-0"> </h2> <span class="text-count"> </span></div> <div class="relative"><textarea readonly="" class="code-editor min-h-[200px] sm:min-h-[300px] lg:min-h-[500px]"></textarea> <!></div></div></div> <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4"><div class="card"><div class="feature-icon"><!></div> <h3 class="feature-title">Minify CSS</h3> <p class="feature-description">Reduce file size by removing whitespace, comments, and unnecessary characters</p></div> <div class="card"><div class="feature-icon"><!></div> <h3 class="feature-title">Beautify CSS</h3> <p class="feature-description">Format CSS with proper indentation and line breaks for better readability</p></div> <div class="card"><div class="feature-icon"><!></div> <h3 class="feature-title">Export results</h3> <p class="feature-description">Copy to clipboard or download processed CSS as a file for immediate use</p></div></div>',1);function We(W,Y){Te(Y,!0);let c=w(""),o=w(""),l=w(!1),n=w(0),p=w(0),k=w(0);function U(){if(!e(c).trim()){s(o,""),s(n,0),s(p,0),s(k,0);return}if(s(n,new Blob([e(c)]).size,!0),e(l)){let i=e(c).replace(/\/\*[\s\S]*?\*\//g,"").replace(/\s+/g," ").replace(/\s*{\s*/g,"{").replace(/\s*}\s*/g,"}").replace(/\s*;\s*/g,";").replace(/\s*:\s*/g,":").replace(/\s*,\s*/g,",").replace(/;}/g,"}").trim();s(o,i,!0),s(p,new Blob([i]).size,!0)}else{let i=e(c).replace(/}/g,`}
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
}`),s(l,!0),U(),z.success("Sample CSS loaded")}function te(i){navigator.clipboard.writeText(i),z.success("Copied to clipboard")}function ae(){const i=new Blob([e(o)],{type:"text/css"}),d=URL.createObjectURL(i),v=document.createElement("a");v.href=d,v.download=e(l)?"styles.min.css":"styles.css",v.click(),URL.revokeObjectURL(d),z.success("CSS downloaded")}function se(){s(c,""),s(o,""),s(n,0),s(p,0),s(k,0),z.success("Cleared all")}function R(i){if(i===0)return"0 Bytes";const d=1024,v=["Bytes","KB","MB","GB"],f=Math.floor(Math.log(i)/Math.log(d));return parseFloat((i/Math.pow(d,f)).toFixed(2))+" "+v[f]}Ie(()=>{e(c)&&U()}),Pe(W,{title:"CSS Minifier",description:"Minify or beautify CSS code with real-time preview and size comparison.",get icon(){return E},color:"warning",children:(i,d)=>{var v=Qe(),f=q(v),m=t(f),b=a(m,2),g=a(f,2),x=t(g);{var ie=r=>{var _=Ae(),u=q(_),y=t(u);Ke(y,{class:"w-4 h-4"});var S=a(u,2),M=t(S);N(M,{class:"w-4 h-4"}),C("click",u,()=>te(e(o))),C("click",S,ae),$(r,_)};F(x,r=>{e(o)&&r(ie)})}var j=a(x,2),re=t(j);Ue(re,{class:"w-4 h-4"});var le=a(j,2),D=a(g,2);{var oe=r=>{var _=Ge(),u=t(_),y=a(t(u),2),S=t(y),M=a(u,2),Me=a(t(M),2),$e=t(Me),X=a(M,2),Z=a(t(X),2),ze=t(Z),Be=a(X,2),Re=a(t(Be),2),je=t(Re);I((Le,Fe,Ee)=>{h(S,Le),h($e,Fe),T(Z,1,`stat-value font-mono ${e(p)<e(n)?"!text-live":"!text-negative"}`),h(ze,`${e(p)<e(n)?"-":"+"}${Ee??""}`),h(je,`${e(k)??""}%`)},[()=>R(e(n)),()=>R(e(p)),()=>R(Math.abs(e(p)-e(n)))]),$(r,_)};F(D,r=>{e(n)>0&&r(oe)})}var H=a(D,2),K=t(H),P=t(K),ne=a(t(P),2),ce=t(ne),de=a(P,2),ve=a(K,2),A=t(ve),G=t(A),pe=t(G),ue=a(G,2),fe=t(ue),me=a(A,2),L=t(me),be=a(L,2);{var _e=r=>{var _=Je(),u=t(_);E(u,{class:"w-12 h-12 mb-2 opacity-50 text-ink-muted"});var y=a(u,2),S=t(y);I(()=>h(S,`Enter CSS code to see ${e(l)?"minified":"beautified"} result`)),$(r,_)};F(be,r=>{e(o)||r(_e)})}var he=a(H,2),J=t(he),xe=t(J),ge=t(xe);De(ge,{class:"w-5 h-5"});var Q=a(J,2),Se=t(Q),we=t(Se);E(we,{class:"w-5 h-5"});var Ce=a(Q,2),ye=t(Ce),ke=t(ye);N(ke,{class:"w-5 h-5"}),I(()=>{O(m,"aria-selected",!e(l)),T(m,1,`tab-btn ${e(l)?"":"active"}`),O(b,"aria-selected",e(l)),T(b,1,`tab-btn ${e(l)?"active":""}`),h(ce,`${e(c).length??""} characters`),h(pe,`${e(l)?"Minified":"Beautified"} CSS`),h(fe,`${e(o).length??""} characters`),O(L,"placeholder",`${e(l)?"Minified":"Beautified"} CSS will appear here...`)}),C("click",m,()=>s(l,!1)),C("click",b,()=>s(l,!0)),C("click",j,ee),C("click",le,se),V(de,()=>e(c),r=>s(c,r)),V(L,()=>e(o),r=>s(o,r)),$(i,v)},$$slots:{default:!0}}),Oe()}He(["click"]);export{We as default};
