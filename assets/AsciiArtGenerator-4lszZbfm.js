import{G as un,j as mn,e as fn,m as t,y as L,z as a,f as k,h as B,o as s,c as n,E as bn,k as F,i as J,aG as hn,aM as xn,aL as gn,t as G,n as g,D as yn,b as y,ae as kn,d as wn,a as Cn,r as T,u as In,O as Sn,P as An,ag as Ln,bp as Tn,bw as En}from"./vendor-DD6qoAQi.js";import{T as Un}from"./ToolLayout-BLTXxgnX.js";import{t as E}from"./notifications-D_9cxcKx.js";import"./index-P59-iu8G.js";import"./router-Dh19MaBG.js";var On=k('<button><div class="text-left"><h4 class="font-medium text-ink mb-1"> </h4> <p class="text-body-sm text-ink-muted"> </p></div></button>'),Pn=k("<!> Copied!",1),Rn=k("<!> Copy",1),jn=k('<div class="tool-card"><div class="flex flex-wrap justify-between items-center gap-2 mb-4"><h3 class="section-title mb-0">ASCII art result</h3> <div class="flex gap-2"><button class="btn btn-primary btn-sm"><!></button> <button class="btn btn-secondary btn-sm"><!> Download</button></div></div> <div class="relative"><pre class="p-6 bg-sunken rounded-md font-mono text-sm text-ink overflow-x-auto whitespace-pre"> </pre></div></div>'),Bn=k(`<div class="flex flex-wrap gap-2"><button class="btn btn-secondary">Load sample text</button> <button class="btn btn-ghost">Clear all</button></div> <div class="tool-card"><h3 class="section-title">Art style</h3> <div class="grid grid-cols-1 md:grid-cols-3 gap-4"></div></div> <div class="tool-card"><div class="flex justify-between items-center mb-4"><h3 class="section-title mb-0">Input text</h3> <span class="text-count"> </span></div> <input type="text" placeholder="Enter text to convert to ASCII art..." class="tool-input w-full font-mono text-sm"/> <p class="mt-2 text-body-sm text-ink-muted">Maximum 10 characters recommended for best results. Supports letters, numbers, and basic
      punctuation.</p></div> <!> <div class="tool-card"><h3 class="section-title">Supported characters</h3> <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"><div class="text-body-sm"><span class="font-medium text-ink">Letters:</span> <span class="font-mono text-ink-muted">A-Z</span></div> <div class="text-body-sm"><span class="font-medium text-ink">Numbers:</span> <span class="font-mono text-ink-muted">0-9</span></div> <div class="text-body-sm"><span class="font-medium text-ink">Punctuation:</span> <span class="font-mono text-ink-muted">! ? . ,</span></div> <div class="text-body-sm"><span class="font-medium text-ink">Space:</span> <span class="text-ink-muted">Supported</span></div></div></div> <div class="tool-card"><h3 class="section-title">Usage tips</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="info-card"><h4 class="section-title-sm">Best practices</h4> <ul class="text-body-sm text-ink-muted space-y-1 list-disc ml-4"><li>Keep text short (under 10 characters)</li> <li>Use uppercase letters for better results</li> <li>Experiment with different styles</li> <li>Works great in terminal applications</li></ul></div> <div class="info-card"><h4 class="section-title-sm">Common uses</h4> <ul class="text-body-sm text-ink-muted space-y-1 list-disc ml-4"><li>Terminal splash screens</li> <li>Code comments and signatures</li> <li>Social media bio text</li> <li>Email signatures and greetings</li></ul></div></div></div> <div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div class="tool-card"><div class="feature-icon"><!></div> <h3 class="feature-title">Multiple styles</h3> <p class="feature-description">Choose from standard, block, and simple ASCII art styles for different use cases</p></div> <div class="tool-card"><div class="feature-icon"><!></div> <h3 class="feature-title">Real-time preview</h3> <p class="feature-description">See your ASCII art generated instantly as you type with automatic updates</p></div> <div class="tool-card"><div class="feature-icon"><!></div> <h3 class="feature-title">Easy export</h3> <p class="feature-description">Copy to clipboard or download your ASCII art as a text file for easy sharing</p></div></div>`,1);function Hn(Q,V){fn(V,!0);let i=L(""),r=L(""),w=L("standard"),U=L("");const M={standard:{name:"Standard",chars:{A:`  #  
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
|__/`}}};function D(){if(!t(i).trim()){a(r,"");return}const v=t(i).toUpperCase(),p=M[t(w)],e=[];for(let l=0;l<5;l++){let o="";for(let m=0;m<v.length;m++){const f=v[m];if(p.chars[f]){const C=p.chars[f].split(`
`);C[l]?o+=C[l]+" ":o+=" ".repeat(6)+" "}else o+=" ".repeat(6)+" "}e.push(o.trimEnd())}a(r,e.join(`
`),!0)}function X(){navigator.clipboard.writeText(t(r)),a(U,"ascii"),setTimeout(()=>{a(U,"")},2e3),E.success("ASCII art copied to clipboard")}function Y(){const v=new Blob([t(r)],{type:"text/plain"}),p=URL.createObjectURL(v),e=document.createElement("a");e.href=p,e.download="ascii-art.txt",e.click(),URL.revokeObjectURL(p),E.success("ASCII art downloaded")}function z(){a(i,""),a(r,""),E.success("Cleared all")}function q(){a(i,"HELLO"),D(),E.success("Sample text loaded")}un(()=>{D()}),Un(Q,{title:"ASCII Art Generator",description:"Convert text into ASCII art with different styles. Perfect for terminal displays and creative text art.",get icon(){return kn},color:"warning",children:(v,p)=>{var e=Bn(),l=B(e),o=n(l),m=s(o,2),f=s(l,2),C=s(n(f),2);bn(C,21,()=>Object.entries(M),Sn,(c,I)=>{var b=In(()=>An(t(I),2));let d=()=>t(b)[0],h=()=>t(b)[1];var _=On(),O=n(_),S=n(O),A=n(S),P=s(S,2),R=n(P);G(()=>{Cn(_,1,`preset-btn rounded-md! p-4 text-left ${t(w)===d()?"active":""}`),F(_,"aria-pressed",t(w)===d()),T(A,h().name),T(R,d()==="standard"?"Classic ASCII style with standard characters":d()==="block"?"Bold block style using full Unicode blocks":"Minimal style using basic ASCII characters")}),g("click",_,()=>a(w,d(),!0)),y(c,_)});var $=s(f,2),Z=n($),nn=s(n(Z),2),tn=n(nn),H=s(Z,2);F(H,"maxlength",10);var K=s($,2);{var sn=c=>{var I=jn(),b=n(I),d=s(n(b),2),h=n(d),_=n(h);{var O=u=>{var x=Pn(),j=B(x);Tn(j,{class:"w-4 h-4"}),y(u,x)},S=u=>{var x=Rn(),j=B(x);En(j,{class:"w-4 h-4"}),y(u,x)};J(_,u=>{t(U)==="ascii"?u(O):u(S,-1)})}var A=s(h,2),P=n(A);Ln(P,{class:"w-4 h-4"});var R=s(b,2),vn=n(R),pn=n(vn);G(()=>T(pn,t(r))),g("click",h,X),g("click",A,Y),y(c,I)};J(K,c=>{t(r)&&c(sn)})}var en=s(K,6),N=n(en),an=n(N),rn=n(an);hn(rn,{class:"w-5 h-5"});var W=s(N,2),ln=n(W),on=n(ln);xn(on,{class:"w-5 h-5"});var cn=s(W,2),dn=n(cn),_n=n(dn);gn(_n,{class:"w-5 h-5"}),G(()=>T(tn,`${t(i).length??""} characters`)),g("click",o,q),g("click",m,z),yn(H,()=>t(i),c=>a(i,c)),y(v,e)},$$slots:{default:!0}}),mn()}wn(["click"]);export{Hn as default};
