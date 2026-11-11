import{G as ge,j as be,e as we,z as s,m as a,y as P,f as F,h as D,o as t,c as e,aw as E,al as xe,bw as j,af as I,ag as q,i as _e,aM as ke,bA as ye,t as Le,n as d,D as Te,b as h,d as Ce,r as Me,u as $e,g as He,ah as Se}from"./vendor-DD6qoAQi.js";import{T as Pe}from"./ToolLayout-BLTXxgnX.js";import{t as c}from"./notifications-D_9cxcKx.js";import"./index-P59-iu8G.js";import"./router-Dh19MaBG.js";var De=F('<div class="flex items-center justify-center h-full text-ink-muted text-center"><div><!> <p>Your markdown preview will appear here</p> <p class="text-body-sm">Start typing in the editor to see the live preview</p></div></div>'),Ee=F('<div class="flex flex-wrap gap-2 items-center"><button class="btn btn-secondary">Load sample</button> <button class="btn btn-ghost">Clear</button> <div class="flex items-center gap-2 text-code text-ink-muted ml-auto"><!> <span> </span></div></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-4"><div class="tool-card flex flex-col gap-3"><div class="flex items-center justify-between"><div class="flex items-center gap-2"><!> <span class="text-label text-ink-muted">Markdown editor</span></div> <button class="btn-icon" title="Copy markdown" aria-label="Copy markdown"><!></button></div> <div class="relative"><textarea placeholder="Enter your markdown text here..." class="code-editor w-full h-48 sm:h-64 lg:h-96"></textarea></div></div> <div class="tool-card flex flex-col gap-3"><div class="flex items-center justify-between"><div class="flex items-center gap-2"><!> <span class="text-label text-ink-muted">Live preview</span></div> <div class="flex gap-2"><button class="btn-icon" title="Copy HTML" aria-label="Copy HTML"><!></button> <button class="btn-icon" title="Download HTML" aria-label="Download HTML"><!></button></div></div> <div class="h-48 sm:h-64 lg:h-96 overflow-y-auto p-4 sm:p-6 bg-sunken rounded-md text-ink prose max-w-none"><!></div></div></div> <div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div class="tool-card"><div class="feature-icon"><!></div> <h3 class="feature-title">Live preview</h3> <p class="feature-description">See your markdown rendered in real-time as you type with instant updates</p></div> <div class="tool-card"><div class="feature-icon"><!></div> <h3 class="feature-title">Syntax highlighting</h3> <p class="feature-description">Code blocks with proper formatting and highlighting for better readability</p></div> <div class="tool-card"><div class="feature-icon"><!></div> <h3 class="feature-title">Export options</h3> <p class="feature-description">Download your formatted content as HTML or copy to clipboard with one click</p></div></div>',1);function Re(O,R){we(R,!0);let o=P(`# Welcome to Markdown Preview

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

*Thank you for using Markdown Preview!*`),i=P("");function f(){s(i,a(o).replace(/^### (.*$)/gm,'<h3 class="text-xl font-semibold mb-3 mt-6">$1</h3>').replace(/^## (.*$)/gm,'<h2 class="text-2xl font-semibold mb-4 mt-8">$1</h2>').replace(/^# (.*$)/gm,'<h1 class="text-3xl font-bold mb-6 mt-8">$1</h1>').replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\*(.*?)\*/g,"<em>$1</em>").replace(/```(.*?)\n([\s\S]*?)```/g,'<pre class="overflow-x-auto mb-4"><code class="font-mono">$2</code></pre>').replace(/`(.*?)`/g,'<code class="font-mono">$1</code>').replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2" class="hover:underline" target="_blank" rel="noopener noreferrer">$1</a>').replace(/^- (.*$)/gm,'<li class="ml-4">$1</li>').replace(/(<li.*>.*<\/li>)/s,'<ul class="list-disc mb-4">$1</ul>').replace(/\n\n/g,'</p><p class="mb-4">').replace(/\n/g,"<br>"),!0),a(i)&&!a(i).startsWith("<")&&s(i,'<p class="mb-4">'+a(i)+"</p>")}function U(){navigator.clipboard.writeText(a(o)),c.success("Markdown copied to clipboard")}function A(){navigator.clipboard.writeText(a(i)),c.success("HTML copied to clipboard")}function W(){const v=new Blob([a(i)],{type:"text/html"}),p=URL.createObjectURL(v),r=document.createElement("a");r.href=p,r.download="markdown-preview.html",r.click(),URL.revokeObjectURL(p),c.success("HTML downloaded")}function B(){s(o,`# Sample Markdown Document

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

Visit [GitHub](https://github.com) for more resources!`),f(),c.success("Sample markdown loaded")}function G(){s(o,""),s(i,""),c.success("Cleared all")}const N=$e(()=>a(o).split(`
`).length);ge(()=>{f()}),Pe(O,{title:"Markdown Preview",description:"Preview markdown text with live rendering and syntax highlighting.",get icon(){return E},color:"warning",children:(v,p)=>{var r=Ee(),g=D(r),b=e(g),w=t(b,2),Y=t(w,2),x=e(Y);E(x,{class:"w-4 h-4"});var V=t(x,2),z=e(V),_=t(g,2),k=e(_),y=e(k),L=e(y),J=e(L);xe(J,{class:"w-4 h-4 text-ink-muted"});var T=t(L,2),Z=e(T);j(Z,{class:"w-4 h-4"});var K=t(y,2),Q=e(K),X=t(k,2),C=e(X),M=e(C),ee=e(M);I(ee,{class:"w-4 h-4 text-ink-muted"});var te=t(M,2),u=e(te),ae=e(u);j(ae,{class:"w-4 h-4"});var $=t(u,2),ie=e($);q(ie,{class:"w-4 h-4"});var ne=t(C,2),oe=e(ne);{var re=n=>{var l=He(),m=D(l);Se(m,()=>a(i)),h(n,l)},se=n=>{var l=De(),m=e(l),fe=e(m);I(fe,{class:"w-12 h-12 mb-2 opacity-50 mx-auto"}),h(n,l)};_e(oe,n=>{a(i)?n(re):n(se,-1)})}var le=t(_,2),H=e(le),de=e(H),ce=e(de);ke(ce,{class:"w-5 h-5"});var S=t(H,2),ve=e(S),pe=e(ve);ye(pe,{class:"w-5 h-5"});var ue=t(S,2),me=e(ue),he=e(me);q(he,{class:"w-5 h-5"}),Le(()=>Me(z,`${a(N)??""} lines`)),d("click",b,B),d("click",w,G),d("click",T,U),Te(Q,()=>a(o),n=>s(o,n)),d("click",u,A),d("click",$,W),h(v,r)},$$slots:{default:!0}}),be()}Ce(["click"]);export{Re as default};
