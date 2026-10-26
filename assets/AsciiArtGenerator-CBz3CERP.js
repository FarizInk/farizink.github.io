import{u as un,k as mn,p as fn,g as t,s as T,d as a,m as k,h as P,w as s,n,C as bn,v as N,i as Q,aR as hn,aX as xn,aW as gn,t as D,J as g,Q as yn,j as y,ap as kn,I as Cn,o as wn,K as L,c as In,D as An,Z as Sn,ar as Tn,bA as Ln,bH as Un}from"./vendor-Dm-feJI2.js";import{T as En}from"./ToolLayout-GjpI-t1f.js";import{t as U}from"./notifications-BZShXvb2.js";import"./index-yZmSxAKZ.js";import"./router-BpIG6wBW.js";var Rn=k('<button><div class="text-left"><h4 class="font-medium text-ink mb-1"> </h4> <p class="text-body-sm text-ink-muted"> </p></div></button>'),jn=k("<!> Copied!",1),Bn=k("<!> Copy",1),On=k('<div class="tool-card"><div class="flex flex-wrap justify-between items-center gap-2 mb-4"><h3 class="section-title mb-0">ASCII art result</h3> <div class="flex gap-2"><button class="btn btn-primary btn-sm"><!></button> <button class="btn btn-secondary btn-sm"><!> Download</button></div></div> <div class="relative"><pre class="p-6 bg-sunken rounded-md font-mono text-sm text-ink overflow-x-auto whitespace-pre"> </pre></div></div>'),Pn=k(`<div class="flex flex-wrap gap-2"><button class="btn btn-secondary">Load sample text</button> <button class="btn btn-ghost">Clear all</button></div> <div class="tool-card"><h3 class="section-title">Art style</h3> <div class="grid grid-cols-1 md:grid-cols-3 gap-4"></div></div> <div class="tool-card"><div class="flex justify-between items-center mb-4"><h3 class="section-title mb-0">Input text</h3> <span class="text-count"> </span></div> <input type="text" placeholder="Enter text to convert to ASCII art..." class="tool-input w-full font-mono text-sm"/> <p class="mt-2 text-body-sm text-ink-muted">Maximum 10 characters recommended for best results. Supports letters, numbers, and basic
      punctuation.</p></div> <!> <div class="tool-card"><h3 class="section-title">Supported characters</h3> <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"><div class="text-body-sm"><span class="font-medium text-ink">Letters:</span> <span class="font-mono text-ink-muted">A-Z</span></div> <div class="text-body-sm"><span class="font-medium text-ink">Numbers:</span> <span class="font-mono text-ink-muted">0-9</span></div> <div class="text-body-sm"><span class="font-medium text-ink">Punctuation:</span> <span class="font-mono text-ink-muted">! ? . ,</span></div> <div class="text-body-sm"><span class="font-medium text-ink">Space:</span> <span class="text-ink-muted">Supported</span></div></div></div> <div class="tool-card"><h3 class="section-title">Usage tips</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="info-card"><h4 class="section-title-sm">Best practices</h4> <ul class="text-body-sm text-ink-muted space-y-1 list-disc ml-4"><li>Keep text short (under 10 characters)</li> <li>Use uppercase letters for better results</li> <li>Experiment with different styles</li> <li>Works great in terminal applications</li></ul></div> <div class="info-card"><h4 class="section-title-sm">Common uses</h4> <ul class="text-body-sm text-ink-muted space-y-1 list-disc ml-4"><li>Terminal splash screens</li> <li>Code comments and signatures</li> <li>Social media bio text</li> <li>Email signatures and greetings</li></ul></div></div></div> <div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div class="tool-card"><div class="feature-icon"><!></div> <h3 class="feature-title">Multiple styles</h3> <p class="feature-description">Choose from standard, block, and simple ASCII art styles for different use cases</p></div> <div class="tool-card"><div class="feature-icon"><!></div> <h3 class="feature-title">Real-time preview</h3> <p class="feature-description">See your ASCII art generated instantly as you type with automatic updates</p></div> <div class="tool-card"><div class="feature-icon"><!></div> <h3 class="feature-title">Easy export</h3> <p class="feature-description">Copy to clipboard or download your ASCII art as a text file for easy sharing</p></div></div>`,1);function Hn(X,F){fn(F,!0);let i=T(""),r=T(""),C=T("standard"),E=T("");const M={standard:{name:"Standard",chars:{A:`  #  
 ### 
# # #
#####
#   #`,B:`#### 
#   #
#### 
#   #
#### `,C:` ### 
#    
#    
#    
 ### `,D:`#### 
#   #
#   #
#   #
#### `,E:`#####
#    
###  
#    
#####`,F:`#####
#    
###  
#    
#    `,G:` ### 
#    
#  ##
#   #
 ### `,H:`#   #
#   #
#####
#   #
#   #`,I:`#####
  #  
  #  
  #  
#####`,J:` #####
    #
    #
#   #
 ### `,K:`#  # 
# #  
##   
# #  
#  # `,L:`#    
#    
#    
#    
#####`,M:`#   #
## ##
# # #
#   #
#   #`,N:`#   #
##  #
# # #
#  ##
#   #`,O:` ### 
#   #
#   #
#   #
 ### `,P:`#### 
#   #
#### 
#    
#    `,Q:` ### 
#   #
#   #
#  ##
 ## #`,R:`#### 
#   #
#### 
# #  
#  # `,S:` ### 
#    
 ### 
    #
 ####`,T:`#####
  #  
  #  
  #  
  #  `,U:`#   #
#   #
#   #
#   #
 ### `,V:`#   #
#   #
#   #
 # # 
  #  `,W:`#   #
#   #
# # #
## ##
#   #`,X:`#   #
 # # 
  #  
 # # 
#   #`,Y:`#   #
 # # 
  #  
  #  
  #  `,Z:`#####
   # 
  #  
 #   
#####`," ":`     
     
     
     
     `,"!":`  #  
  #  
  #  
     
  #  `,"?":` ### 
#   #
   # 
  #  
  #  `,".":`     
     
     
     
  #  `,",":`     
     
     
  #  
 #   `,0:` ### 
#  # 
# # #
##  #
 ### `,1:`  #  
 ##  
  #  
  #  
 ### `,2:` ### 
#   #
   # 
  #  
#####`,3:`#### 
    #
 ### 
    #
#### `,4:`#   #
#   #
#####
    #
    #`,5:`#####
#    
#### 
    #
#### `,6:` ### 
#    
#### 
#   #
 ### `,7:`#####
    #
   # 
  #  
  #  `,8:` ### 
#   #
 ### 
#   #
 ### `,9:` ### 
#   #
 ####
    #
 ### `}},block:{name:"Block",chars:{A:`█████
█   █
█████
█   █
█   █`,B:`█████
█   █
█████
█   █
█████`,C:` █████
█     
█     
█     
 █████`,D:`█████ 
█   █ 
█   █ 
█   █ 
█████ `,E:`█████
█     
████  
█     
█████`,F:`█████
█     
████  
█     
█    `,G:` █████
█     
█  ███
█   █ 
 █████`,H:`█   █
█   █
█████
█   █
█   █`,I:`█████
  █  
  █  
  █  
█████`,J:`  ████
     █
     █
█   █ 
 ███ `,K:`█   █ 
█  █  
███   
█  █  
█   █ `,L:`█     
█     
█     
█     
█████`,M:`█   █
██ ██
█ █ █
█   █
█   █`,N:`█   █
██  █
█ █ █
█  ██
█   █`,O:` █████
█   █ 
█   █ 
█   █ 
 █████`,P:`█████ 
█   █ 
█████ 
█     
█    `,Q:` █████
█   █ 
█   █ 
█  ██ 
 ██ █ `,R:`█████ 
█   █ 
█████ 
█  █  
█   █ `,S:` █████
█     
 ████ 
     █
█████ `,T:`█████
  █  
  █  
  █  
  █  `,U:`█   █
█   █
█   █
█   █ 
 ███ `,V:`█   █
█   █
█   █
 █ █ 
  █  `,W:`█   █
█   █
█ █ █
██ ██
█   █`,X:`█   █
 █ █ 
  █  
 █ █ 
█   █`,Y:`█   █
 █ █ 
  █  
  █  
  █  `,Z:`█████
   █ 
  █  
 █   
█████`," ":`     
     
     
     
     `,"!":`  █  
  █  
  █  
     
  █  `,"?":` ████
█   █
   █ 
  █  
  █  `,".":`     
     
     
     
  █  `,",":`     
     
     
  █  
 █   `,0:` ████
█  ██
█ █ █
██  █
 ████`,1:`  █  
 ██  
  █  
  █  
 ████`,2:` ████
█   █
   █ 
  █  
█████`,3:`█████
    █
 ███ 
    █
█████`,4:`█   █
█   █
█████
    █
    █`,5:`█████
█    
████ 
    █
████ `,6:` ███ 
█    
████ 
█   █
 ███ `,7:`█████
    █
   █ 
  █  
  █  `,8:` ███ 
█   █
 ███ 
█   █
 ███ `,9:` ███ 
█   █
 ████
    █
 ███ `}},simple:{name:"Simple",chars:{A:`/\\  
/\\_\\`,B:`| __
|__)`,C:` __ 
/  |`,D:`|  \\
|__/`,E:`___ 
|__ `,F:`___ 
|  `,G:` __ 
| __|`,H:`|__|
|  |`,I:`_ 
|`,J:` __
|__`,K:`|_/
| \\`,L:`|   
|__ `,M:`|\\/|
|  |`,N:`|\\ |
| \\|`,O:` __ 
|__)`,P:` __ 
|__)`,Q:` __ 
|__\\`,R:` __ 
|__/`,S:` __ 
/__)`,T:`___ 
  | `,U:`|  |
|__|`,V:`\\  /
 \\/ `,W:`|\\/|
|  |`,X:`\\_/
/ \\`,Y:`\\_/
  |`,Z:`__ 
/__`," ":`   
   `,"!":`   
  )`,"?":` _ 
(_)`,".":`   
  )`,",":`   
(_ `,0:` __ 
/__)`,1:`  
| `,2:` __ 
/__)`,3:` __ 
/__)`,4:`    
|__|`,5:` __ 
/__ `,6:` __ 
|__)`,7:` __ 
   /`,8:` __ 
|__)`,9:` __ 
|__/`}}};function Z(){if(!t(i).trim()){a(r,"");return}const v=t(i).toUpperCase(),p=M[t(C)],e=[];for(let l=0;l<5;l++){let o="";for(let m=0;m<v.length;m++){const f=v[m];if(p.chars[f]){const w=p.chars[f].split(`
`);w[l]?o+=w[l]+" ":o+=" ".repeat(6)+" "}else o+=" ".repeat(6)+" "}e.push(o.trimEnd())}a(r,e.join(`
`),!0)}function V(){navigator.clipboard.writeText(t(r)),a(E,"ascii"),setTimeout(()=>{a(E,"")},2e3),U.success("ASCII art copied to clipboard")}function Y(){const v=new Blob([t(r)],{type:"text/plain"}),p=URL.createObjectURL(v),e=document.createElement("a");e.href=p,e.download="ascii-art.txt",e.click(),URL.revokeObjectURL(p),U.success("ASCII art downloaded")}function q(){a(i,""),a(r,""),U.success("Cleared all")}function z(){a(i,"HELLO"),Z(),U.success("Sample text loaded")}un(()=>{Z()}),En(X,{title:"ASCII Art Generator",description:"Convert text into ASCII art with different styles. Perfect for terminal displays and creative text art.",get icon(){return kn},color:"warning",children:(v,p)=>{var e=Pn(),l=P(e),o=n(l),m=s(o,2),f=s(l,2),w=s(n(f),2);bn(w,21,()=>Object.entries(M),An,(c,I)=>{var b=In(()=>Sn(t(I),2));let d=()=>t(b)[0],h=()=>t(b)[1];var _=Rn(),R=n(_),A=n(R),S=n(A),j=s(A,2),B=n(j);D(()=>{wn(_,1,`preset-btn rounded-md! p-4 text-left ${t(C)===d()?"active":""}`),N(_,"aria-pressed",t(C)===d()),L(S,h().name),L(B,d()==="standard"?"Classic ASCII style with standard characters":d()==="block"?"Bold block style using full Unicode blocks":"Minimal style using basic ASCII characters")}),g("click",_,()=>a(C,d(),!0)),y(c,_)});var $=s(f,2),G=n($),nn=s(n(G),2),tn=n(nn),H=s(G,2);N(H,"maxlength",10);var K=s($,2);{var sn=c=>{var I=On(),b=n(I),d=s(n(b),2),h=n(d),_=n(h);{var R=u=>{var x=jn(),O=P(x);Ln(O,{class:"w-4 h-4"}),y(u,x)},A=u=>{var x=Bn(),O=P(x);Un(O,{class:"w-4 h-4"}),y(u,x)};Q(_,u=>{t(E)==="ascii"?u(R):u(A,-1)})}var S=s(h,2),j=n(S);Tn(j,{class:"w-4 h-4"});var B=s(b,2),vn=n(B),pn=n(vn);D(()=>L(pn,t(r))),g("click",h,V),g("click",S,Y),y(c,I)};Q(K,c=>{t(r)&&c(sn)})}var en=s(K,6),W=n(en),an=n(W),rn=n(an);hn(rn,{class:"w-5 h-5"});var J=s(W,2),ln=n(J),on=n(ln);xn(on,{class:"w-5 h-5"});var cn=s(J,2),dn=n(cn),_n=n(dn);gn(_n,{class:"w-5 h-5"}),D(()=>L(tn,`${t(i).length??""} characters`)),g("click",o,z),g("click",m,q),yn(H,()=>t(i),c=>a(i,c)),y(v,e)},$$slots:{default:!0}}),mn()}Cn(["click"]);export{Hn as default};
