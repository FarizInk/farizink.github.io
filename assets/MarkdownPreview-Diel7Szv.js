import{u as ue,h as xe,p as ye,f as R,k as q,aq as h,s as D,m as r,ae as we,bK as I,ag as F,c as e,ah as O,i as fe,aK as ke,bt as _e,r as Le,aR as Te,b as d,g as t,e as u,d as $e,Q as Se,l as Ce,j as Me,aa as He}from"./vendor-BAeO1-TM.js";import{T as Pe}from"./ToolLayout-B1xfaTa0.js";import{t as g}from"./notifications-BlRhRz1S.js";import"./router-suN6MkCp.js";function je(l,o){navigator.clipboard.writeText(t(o)),g.success("Markdown copied to clipboard")}function Ee(l,o){navigator.clipboard.writeText(t(o)),g.success("HTML copied to clipboard")}function qe(l,o,a){d(o,`# Sample Markdown Document

## Introduction

This is a **sample document** to demonstrate the *capabilities* of our markdown previewer.

## Code Examples

### JavaScript

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));
\`\`\`

### Python

\`\`\`python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print([fibonacci(i) for i in range(10)])
\`\`\`

## Features

- ✅ Live preview
- ✅ Syntax highlighting
- ✅ Export capabilities
- ✅ Responsive design

> "The best way to learn is by doing." - Anonymous

Visit [GitHub](https://github.com) for more resources!`),a(),g.success("Sample markdown loaded")}function De(l,o,a){d(o,""),d(a,""),g.success("Cleared all")}var Ie=R('<div class="flex items-center justify-center h-full text-gray-400 dark:text-gray-600 text-center"><div><!> <p>Your markdown preview will appear here</p> <p class="text-sm">Start typing in the editor to see the live preview</p></div></div>'),Fe=R('<div class="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl border border-warning-200 dark:border-primary-800 p-4 sm:p-6 mb-6"><div class="flex flex-col sm:flex-row items-center justify-between gap-4"><div class="flex items-center gap-3"><div class="p-3 bg-warning-500 dark:bg-primary-500 rounded-xl"><!></div> <div><h2 class="text-xl font-bold text-gray-900 dark:text-white">Markdown Preview</h2> <p class="text-sm text-gray-600 dark:text-gray-400">Live markdown rendering with syntax highlighting</p></div></div></div></div> <div class="flex flex-wrap gap-3 items-center justify-center mb-6"><div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"><!> <span> </span></div> <button class="btn btn-copy">Load Sample</button> <button class="btn btn-secondary">Clear</button></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-4"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"><div class="bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600 flex items-center justify-between"><div class="flex items-center gap-2"><!> <span class="text-sm font-medium text-gray-900 dark:text-white">Markdown Editor</span></div> <button class="btn-icon"><!></button></div> <div class="relative"><textarea placeholder="Enter your markdown text here..." class="w-full h-48 sm:h-64 lg:h-96 p-4 font-mono text-sm border-0 resize-none focus:ring-0 bg-white dark:bg-gray-800 text-gray-900 dark:text-white code-editor"></textarea></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"><div class="bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600 flex items-center justify-between"><div class="flex items-center gap-2"><!> <span class="text-sm font-medium text-gray-900 dark:text-white">Live Preview</span></div> <div class="flex gap-2"><button class="btn-icon"><!></button> <button class="btn-icon"><!></button></div></div> <div class="h-48 sm:h-64 lg:h-96 overflow-y-auto p-3 sm:p-6 prose prose-sm dark:prose-invert max-w-none"><!></div></div></div> <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"><div class="group p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"><div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Live Preview</h3> <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">See your markdown rendered in real-time as you type with instant updates</p></div> <div class="group p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"><div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Syntax Highlighting</h3> <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Code blocks with proper formatting and highlighting for better readability</p></div> <div class="group p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-warning-300 dark:hover:border-primary-400"><div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 bg-warning-100 dark:bg-primary-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-purple-900/30 transition-colors"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Export Options</h3> <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Download your formatted content as HTML or copy to clipboard with one click</p></div></div>',1);function Ae(l,o){ye(o,!0);let a=D(`# Welcome to Markdown Preview

This is a **live markdown preview** tool. Start typing on the left side to see the rendered output here!

## Features

- ✅ **Live preview** - See changes instantly as you type
- ✅ **Syntax highlighting** - Code blocks with proper highlighting
- ✅ **Export options** - Download as HTML or copy to clipboard
- ✅ **CommonMark support** - Compatible with standard markdown

## Text Formatting

You can write **bold text**, *italic text*, or ***both***!

You can also use ~~strikethrough text~~.

## Lists

### Unordered List

- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2
- Item 3

### Ordered List

1. First item
2. Second item
   1. Nested item
   2. Another nested item
3. Third item

## Links and Images

Visit [GitHub](https://github.com) for more resources!

## Code

Inline code: \`console.log("Hello, World!")\`

### Code Block with Syntax Highlighting

\`\`\`javascriptfunction fibonacci(n) {  if (n <= 1) return n;  return fibonacci(n - 1) + fibonacci(n - 2);}

console.log(fibonacci(10)); // Output: 55\`\`\`

### Python Example

\`\`\`pythondef quick_sort(arr):    if len(arr) <= 1:        return arr
    pivot = arr[len(arr) // 2]    left = [x for x in arr if x < pivot]    middle = [x for x in arr if x == pivot]    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)\`\`\`

## Blockquotes

> This is a blockquote.> It can span multiple lines.

## Tables

| Feature | Status | Priority ||---------|--------|----------|| Live Preview | ✅ Done | High || Syntax Highlighting | ✅ Done | Medium || Export Options | ✅ Done | Medium |

---

*Thank you for using Markdown Preview!*`),i=D("");function x(){d(i,t(a).replace(/^### (.*$)/gm,'<h3 class="text-xl font-semibold mb-3 mt-6">$1</h3>').replace(/^## (.*$)/gm,'<h2 class="text-2xl font-semibold mb-4 mt-8">$1</h2>').replace(/^# (.*$)/gm,'<h1 class="text-3xl font-bold mb-6 mt-8">$1</h1>').replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\*(.*?)\*/g,"<em>$1</em>").replace(/```(.*?)\n([\s\S]*?)```/g,'<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4"><code class="text-sm font-mono">$2</code></pre>').replace(/`(.*?)`/g,'<code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono">$1</code>').replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2" class="text-primary-600 dark:text-primary-400 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>').replace(/^- (.*$)/gm,'<li class="ml-4">$1</li>').replace(/(<li.*>.*<\/li>)/s,'<ul class="list-disc mb-4">$1</ul>').replace(/\n\n/g,'</p><p class="mb-4">').replace(/\n/g,"<br>"),!0),t(i)&&!t(i).startsWith("<")&&d(i,'<p class="mb-4">'+t(i)+"</p>")}function U(){const v=new Blob([t(i)],{type:"text/html"}),p=URL.createObjectURL(v),s=document.createElement("a");s.href=p,s.download="markdown-preview.html",s.click(),URL.revokeObjectURL(p),g.success("HTML downloaded")}const W=Ce(()=>t(a).split(`
`).length);ue(()=>{x()}),Pe(l,{title:"Markdown Preview",description:"Preview markdown text with live rendering and syntax highlighting.",get icon(){return h},color:"warning",children:(v,p)=>{var s=Fe(),y=q(s),A=e(y),B=e(A),N=e(B),Y=e(N);h(Y,{class:"w-6 h-6 text-white"});var w=r(y,2),f=e(w),k=e(f);h(k,{class:"w-4 h-4"});var G=r(k,2),K=e(G),_=r(f,2);_.__click=[qe,a,x];var V=r(_,2);V.__click=[De,a,i];var L=r(w,2),T=e(L),$=e(T),S=e($),z=e(S);we(z,{class:"w-4 h-4 text-gray-600 dark:text-gray-400"});var C=r(S,2);C.__click=[je,a];var J=e(C);I(J,{class:"w-4 h-4"});var Q=r($,2),Z=e(Q),X=r(T,2),M=e(X),H=e(M),ee=e(H);F(ee,{class:"w-4 h-4 text-gray-600 dark:text-gray-400"});var re=r(H,2),m=e(re);m.__click=[Ee,i];var te=e(m);I(te,{class:"w-4 h-4"});var P=r(m,2);P.__click=U;var ae=e(P);O(ae,{class:"w-4 h-4"});var ie=r(M,2),oe=e(ie);{var ne=n=>{var c=Me(),b=q(c);He(b,()=>t(i)),u(n,c)},se=n=>{var c=Ie(),b=e(c),he=e(b);F(he,{class:"w-12 h-12 mb-2 opacity-50 mx-auto"}),u(n,c)};fe(oe,n=>{t(i)?n(ne):n(se,!1)})}var de=r(L,2),j=e(de),le=e(j),ce=e(le);ke(ce,{class:"w-6 h-6 text-warning-600 dark:text-primary-400"});var E=r(j,2),ge=e(E),ve=e(ge);_e(ve,{class:"w-6 h-6 text-warning-600 dark:text-primary-400"});var pe=r(E,2),me=e(pe),be=e(me);O(be,{class:"w-6 h-6 text-warning-600 dark:text-primary-400"}),Le(()=>Se(K,`${t(W)??""} lines`)),Te(Z,()=>t(a),n=>d(a,n)),u(v,s)},$$slots:{default:!0}}),xe()}$e(["click"]);export{Ae as default};
