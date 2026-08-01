import{u as mn,h as bn,p as xn,f as k,k as M,aa as V,s as T,c as n,m as r,v as yn,A as hn,i as X,aE as un,aL as fn,aJ as kn,x as O,aS as wn,b as i,g as a,e as f,d as Sn,Y as Cn,S as L,ai as An,z as In,n as Tn,bp as Ln,bM as En,bN as Un}from"./vendor-CYhhcCQ3.js";import{T as jn}from"./ToolLayout-BpaAidUh.js";import{t as E}from"./notifications-Cc4Eusmt.js";import"./router-CF5VSPvA.js";function Pn(b,e,t){navigator.clipboard.writeText(a(e)),i(t,"ascii"),setTimeout(()=>{i(t,"")},2e3),E.success("ASCII art copied to clipboard")}function Rn(b,e,t){i(e,""),i(t,""),E.success("Cleared all")}function Bn(b,e,t){i(e,"HELLO"),t(),E.success("Sample text loaded")}var Mn=(b,e,t)=>i(e,t(),!0),On=k('<button><div class="text-left"><h4 class="font-medium text-gray-900 dark:text-white mb-1"> </h4> <p class="text-xs text-gray-500 dark:text-gray-400"> </p></div></button>'),Gn=k("<!> Copied!",1),$n=k("<!> Copy",1),Dn=k('<div class="tool-card mb-6"><div class="flex justify-between items-center mb-4"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-0">ASCII Art Result</h3> <div class="flex gap-2"><button class="btn btn-copy bg-warning-500 hover:bg-warning-600 dark:bg-primary-500 dark:hover:bg-primary-600 text-white"><!></button> <button class="btn btn-copy bg-warning-500 hover:bg-warning-600 dark:bg-primary-500 dark:hover:bg-primary-600 text-white"><!> Download</button></div></div> <div class="relative"><pre class="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg font-mono text-sm text-gray-900 dark:text-white overflow-x-auto whitespace-pre"> </pre></div></div>'),Nn=k(`<div class="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl border border-warning-200 dark:border-primary-800 p-4 sm:p-6 mb-6"><div class="flex flex-col sm:flex-row items-center justify-between gap-4"><div class="flex items-center gap-3"><div class="p-3 bg-warning-500 dark:bg-primary-500 rounded-xl"><!></div> <div><h2 class="text-xl font-bold text-gray-900 dark:text-white">ASCII Art Generator</h2> <p class="text-sm text-gray-600 dark:text-gray-400">Convert text to creative ASCII art</p></div></div></div></div> <div class="flex flex-wrap gap-3 items-center justify-center mb-6"><button class="btn btn-copy bg-warning-500 hover:bg-warning-600 dark:bg-primary-500 dark:hover:bg-primary-600 text-white">Load Sample Text</button> <button class="btn btn-secondary bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300">Clear All</button></div> <div class="tool-card mb-6"><h3 class="section-title">Art Style</h3> <div class="grid grid-cols-1 md:grid-cols-3 gap-4"></div></div> <div class="tool-card mb-6"><div class="flex justify-between items-center mb-4"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-0">Input Text</h3> <span class="text-sm text-gray-500 dark:text-gray-400"> </span></div> <input type="text" placeholder="Enter text to convert to ASCII art..." class="tool-input w-full font-mono text-sm"/> <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">Maximum 10 characters recommended for best results. Supports letters, numbers, and basic
      punctuation.</p></div> <!> <div class="tool-card mb-6"><h3 class="section-title">Supported Characters</h3> <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"><div class="text-sm"><span class="font-medium text-gray-900 dark:text-white">Letters:</span> <span class="text-gray-600 dark:text-gray-400">A-Z</span></div> <div class="text-sm"><span class="font-medium text-gray-900 dark:text-white">Numbers:</span> <span class="text-gray-600 dark:text-gray-400">0-9</span></div> <div class="text-sm"><span class="font-medium text-gray-900 dark:text-white">Punctuation:</span> <span class="text-gray-600 dark:text-gray-400">! ? . ,</span></div> <div class="text-sm"><span class="font-medium text-gray-900 dark:text-white">Space:</span> <span class="text-gray-600 dark:text-gray-400">Supported</span></div></div></div> <div class="tool-card mb-6"><h3 class="section-title">Usage Tips</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">Best Practices</h4> <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1"><li>• Keep text short (under 10 characters)</li> <li>• Use uppercase letters for better results</li> <li>• Experiment with different styles</li> <li>• Works great in terminal applications</li></ul></div> <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">Common Uses</h4> <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1"><li>• Terminal splash screens</li> <li>• Code comments and signatures</li> <li>• Social media bio text</li> <li>• Email signatures and greetings</li></ul></div></div></div> <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"><div class="group p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"><div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Multiple Styles</h3> <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Choose from standard, block, and simple ASCII art styles for different use cases</p></div> <div class="group p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"><div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Real-time Preview</h3> <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">See your ASCII art generated instantly as you type with automatic updates</p></div> <div class="group p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"><div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Easy Export</h3> <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Copy to clipboard or download your ASCII art as a text file for easy sharing</p></div></div>`,1);function Wn(b,e){xn(e,!0);let t=T(""),d=T(""),U=T("standard"),G=T("");const $={standard:{name:"Standard",chars:{A:`  #  
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
|__/`}}};function D(){if(!a(t).trim()){i(d,"");return}const c=a(t).toUpperCase(),g=$[a(U)],s=[];for(let o=0;o<5;o++){let v="";for(let x=0;x<c.length;x++){const w=c[x];if(g.chars[w]){const S=g.chars[w].split(`
`);S[o]?v+=S[o]+" ":v+=" ".repeat(6)+" "}else v+=" ".repeat(6)+" "}s.push(v.trimEnd())}i(d,s.join(`
`),!0)}function z(){const c=new Blob([a(d)],{type:"text/plain"}),g=URL.createObjectURL(c),s=document.createElement("a");s.href=g,s.download="ascii-art.txt",s.click(),URL.revokeObjectURL(g),E.success("ASCII art downloaded")}mn(()=>{D()}),jn(b,{title:"ASCII Art Generator",description:"Convert text into ASCII art with different styles. Perfect for terminal displays and creative text art.",get icon(){return V},color:"warning",children:(c,g)=>{var s=Nn(),o=M(s),v=n(o),x=n(v),w=n(x),S=n(w);V(S,{class:"w-6 h-6 text-white"});var N=r(o,2),Z=n(N);Z.__click=[Bn,t,D];var q=r(Z,2);q.__click=[Rn,t,d];var H=r(N,2),nn=r(n(H),2);yn(nn,21,()=>Object.entries($),Cn,(l,C)=>{var y=Tn(()=>Un(a(C),2));let p=()=>a(y)[0],h=()=>a(y)[1];var _=On();_.__click=[Mn,U,p];var j=n(_),A=n(j),I=n(A),P=r(A,2),R=n(P);O(()=>{In(_,1,`preset-btn p-4 border-2 rounded-lg transition-all text-left ${a(U)===p()?"border-warning-400 dark:border-primary-500 bg-warning-50 dark:bg-primary-900/20":"border-gray-200 dark:border-gray-600 hover:border-warning-300 dark:hover:border-primary-400"}`),L(I,h().name),L(R,p()==="standard"?"Classic ASCII style with standard characters":p()==="block"?"Bold block style using full Unicode blocks":"Minimal style using basic ASCII characters")}),f(l,_)});var J=r(H,2),K=n(J),tn=r(n(K),2),rn=n(tn),W=r(K,2);hn(W,"maxlength",10);var Y=r(J,2);{var an=l=>{var C=Dn(),y=n(C),p=r(n(y),2),h=n(p);h.__click=[Pn,d,G];var _=n(h);{var j=m=>{var u=Gn(),B=M(u);Ln(B,{class:"w-4 h-4 mr-2"}),f(m,u)},A=m=>{var u=$n(),B=M(u);En(B,{class:"w-4 h-4 mr-2"}),f(m,u)};X(_,m=>{a(G)==="ascii"?m(j):m(A,!1)})}var I=r(h,2);I.__click=z;var P=n(I);An(P,{class:"w-4 h-4 mr-2"});var R=r(y,2),pn=n(R),_n=n(pn);O(()=>L(_n,a(d))),f(l,C)};X(Y,l=>{a(d)&&l(an)})}var en=r(Y,6),F=n(en),sn=n(F),dn=n(sn);un(dn,{class:"w-6 h-6 text-warning-600 dark:text-primary-400"});var Q=r(F,2),on=n(Q),ln=n(on);fn(ln,{class:"w-6 h-6 text-warning-600 dark:text-primary-400"});var cn=r(Q,2),gn=n(cn),vn=n(gn);kn(vn,{class:"w-6 h-6 text-warning-600 dark:text-primary-400"}),O(()=>L(rn,`${a(t).length??""} characters`)),wn(W,()=>a(t),l=>i(t,l)),f(c,s)},$$slots:{default:!0}}),bn()}Sn(["click"]);export{Wn as default};
