(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const c of n)if(c.type==="childList")for(const l of c.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function a(n){const c={};return n.integrity&&(c.integrity=n.integrity),n.referrerPolicy&&(c.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?c.credentials="include":n.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(n){if(n.ep)return;n.ep=!0;const c=a(n);fetch(n.href,c)}})();const Hd="5";typeof window<"u"&&((window.__svelte??={}).v??=new Set).add(Hd);const ji=1,Ni=2,bn=4,Od=8,zd=16,Ud=1,Gd=4,qd=8,Wd=16,Jd=4,Vd=1,Yd=2,Qe=Symbol(),Kd="http://www.w3.org/1999/xhtml",Qd="http://www.w3.org/2000/svg",Zd="@attach",yn=!1;var Ri=Array.isArray,Xd=Array.prototype.indexOf,Us=Array.from,Ls=Object.defineProperty,va=Object.getOwnPropertyDescriptor,tl=Object.getOwnPropertyDescriptors,el=Object.prototype,rl=Array.prototype,hn=Object.getPrototypeOf,go=Object.isExtensible;function Ha(i){return typeof i=="function"}const Zt=()=>{};function _n(i){for(var t=0;t<i.length;t++)i[t]()}function al(){var i,t,a=new Promise((s,n)=>{i=s,t=n});return{promise:a,resolve:i,reject:t}}function Qa(i,t){if(Array.isArray(i))return i;if(t===void 0||!(Symbol.iterator in i))return Array.from(i);const a=[];for(const s of i)if(a.push(s),a.length===t)break;return a}const _r=2,Gs=4,qs=8,Ta=16,ta=32,Ma=64,kn=128,Tr=256,wi=512,er=1024,Pr=2048,ba=4096,Br=8192,Ea=16384,Bi=32768,Pa=65536,uo=1<<17,wn=1<<18,ui=1<<19,il=1<<20,As=1<<21,Ws=1<<22,wa=1<<23,ga=Symbol("$state"),Cn=Symbol("legacy props"),sl=Symbol(""),Js=new class extends Error{name="StaleReactionError";message="The reaction that called `getAbortSignal()` was re-run or destroyed"};function ol(){throw new Error("https://svelte.dev/e/await_outside_boundary")}function Vs(i){throw new Error("https://svelte.dev/e/lifecycle_outside_component")}function nl(){throw new Error("https://svelte.dev/e/async_derived_orphan")}function dl(i){throw new Error("https://svelte.dev/e/effect_in_teardown")}function ll(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function cl(i){throw new Error("https://svelte.dev/e/effect_orphan")}function vl(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function gl(i){throw new Error("https://svelte.dev/e/props_invalid_value")}function ul(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function ml(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function pl(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}function xl(){console.warn("https://svelte.dev/e/select_multiple_invalid_value")}let fl=!1;function $n(i){return i===this.v}function Sn(i,t){return i!=i?t==t:i!==t||i!==null&&typeof i=="object"||typeof i=="function"}function Tn(i){return!Sn(i,this.v)}let bl=!1,rr=null;function Ci(i){rr=i}function mo(i){return Ys().get(i)}function yl(i,t){return Ys().set(i,t),t}function hl(i){return Ys().has(i)}function It(i,t=!1,a){rr={p:rr,c:null,e:null,s:i,x:null,l:null}}function jt(i){var t=rr,a=t.e;if(a!==null){t.e=null;for(var s of a)zn(s)}return rr=t.p,{}}function Mn(){return!0}function Ys(i){return rr===null&&Vs(),rr.c??=new Map(_l(rr)||void 0)}function _l(i){let t=i.p;for(;t!==null;){const a=t.c;if(a!==null)return a;t=t.p}return null}const kl=new WeakMap;function wl(i){var t=$e;if(t===null)return Me.f|=wa,i;if((t.f&Bi)===0){if((t.f&kn)===0)throw!t.parent&&i instanceof Error&&En(i),i;t.b.error(i)}else Ks(i,t)}function Ks(i,t){for(;t!==null;){if((t.f&kn)!==0)try{t.b.error(i);return}catch(a){i=a}t=t.parent}throw i instanceof Error&&En(i),i}function En(i){const t=kl.get(i);t&&(Ls(i,"message",{value:t.message}),Ls(i,"stack",{value:t.stack}))}let la=[],$i=[];function Pn(){var i=la;la=[],_n(i)}function Cl(){var i=$i;$i=[],_n(i)}function $l(){return la.length>0||$i.length>0}function Xr(i){if(la.length===0&&!ni){var t=la;queueMicrotask(()=>{t===la&&Pn()})}la.push(i)}function Sl(){la.length>0&&Pn(),$i.length>0&&Cl()}function Tl(i){let t=0,a=Ja(0),s;return()=>{Ol()&&(e(a),pi(()=>(t===0&&(s=dr(()=>i(()=>di(a)))),t+=1,()=>{Xr(()=>{t-=1,t===0&&(s?.(),s=void 0,di(a))})})))}}function Ml(){const i=$e.b;return i===null&&ol(),i}function Di(i){var t=_r|Pr,a=Me!==null&&(Me.f&_r)!==0?Me:null;return $e===null||a!==null&&(a.f&Tr)!==0?t|=Tr:$e.f|=ui,{ctx:rr,deps:null,effects:null,equals:$n,f:t,fn:i,reactions:null,rv:0,v:Qe,wv:0,parent:a??$e,ac:null}}function El(i,t){let a=$e;a===null&&nl();var s=a.b,n=void 0,c=Ja(Qe),l=null,v=!Me;return Ul(()=>{try{var g=i();l&&Promise.resolve(g).catch(()=>{})}catch(h){g=Promise.reject(h)}var u=()=>g;n=l?.then(u,u)??Promise.resolve(g),l=n;var p=Fe,k=s.is_pending();v&&(s.update_pending_count(1),k||p.increment());const y=(h,_=void 0)=>{l=null,k||p.activate(),_?_!==Js&&(c.f|=wa,ci(c,_)):((c.f&wa)!==0&&(c.f^=wa),ci(c,h)),v&&(s.update_pending_count(-1),k||p.decrement()),Nn()};if(n.then(y,h=>y(null,h||"unknown")),p)return()=>{queueMicrotask(()=>p.neuter())}}),new Promise(g=>{function u(p){function k(){p===n?g(c):u(n)}p.then(k,k)}u(n)})}function ue(i){const t=Di(i);return Yn(t),t}function Ln(i){const t=Di(i);return t.equals=Tn,t}function An(i){var t=i.effects;if(t!==null){i.effects=null;for(var a=0;a<t.length;a+=1)gr(t[a])}}function Pl(i){for(var t=i.parent;t!==null;){if((t.f&_r)===0)return t;t=t.parent}return null}function Qs(i){var t,a=$e;xa(Pl(i));try{An(i),t=Xn(i)}finally{xa(a)}return t}function In(i){var t=Qs(i);if(i.equals(t)||(i.v=t,i.wv=Qn()),!La){var a=(ca||(i.f&Tr)!==0)&&i.deps!==null?ba:er;vr(i,a)}}function jn(i,t,a){const s=Di;if(t.length===0){a(i.map(s));return}var n=Fe,c=$e,l=Ll(),v=Ml();Promise.all(t.map(g=>El(g))).then(g=>{n?.activate(),l();try{a([...i.map(s),...g])}catch(u){(c.f&Ea)===0&&Ks(u,c)}n?.deactivate(),Nn()}).catch(g=>{v.error(g)})}function Ll(){var i=$e,t=Me,a=rr,s=Fe;return function(){xa(i),Gr(t),Ci(a),s?.activate()}}function Nn(){xa(null),Gr(null),Ci(null)}const Qi=new Set;let Fe=null,ki=null,po=new Set,$a=[],Fi=null,Is=!1,ni=!1;class qa{current=new Map;#e=new Map;#t=new Set;#r=0;#l=null;#c=!1;#i=[];#o=[];#s=[];#a=[];#n=[];#v=[];#g=[];skipped_effects=new Set;process(t){$a=[],ki=null;for(const n of t)this.#m(n);if(this.#i.length===0&&this.#r===0){this.#u();var a=this.#s,s=this.#a;this.#s=[],this.#a=[],this.#n=[],ki=Fe,Fe=null,xo(a),xo(s),Fe===null?Fe=this:Qi.delete(this),this.#l?.resolve()}else this.#d(this.#s),this.#d(this.#a),this.#d(this.#n);for(const n of this.#i)Ua(n);for(const n of this.#o)Ua(n);this.#i=[],this.#o=[]}#m(t){t.f^=er;for(var a=t.first;a!==null;){var s=a.f,n=(s&(ta|Ma))!==0,c=n&&(s&er)!==0,l=c||(s&Br)!==0||this.skipped_effects.has(a);if(!l&&a.fn!==null){if(n)a.f^=er;else if((s&Gs)!==0)this.#a.push(a);else if((s&er)===0)if((s&Ws)!==0){var v=a.b?.is_pending()?this.#o:this.#i;v.push(a)}else Ui(a)&&((a.f&Ta)!==0&&this.#n.push(a),Ua(a));var g=a.first;if(g!==null){a=g;continue}}var u=a.parent;for(a=a.next;a===null&&u!==null;)a=u.next,u=u.parent}}#d(t){for(const a of t)((a.f&Pr)!==0?this.#v:this.#g).push(a),vr(a,er);t.length=0}capture(t,a){this.#e.has(t)||this.#e.set(t,a),this.current.set(t,t.v)}activate(){Fe=this}deactivate(){Fe=null,ki=null;for(const t of po)if(po.delete(t),t(),Fe!==null)break}neuter(){this.#c=!0}flush(){$a.length>0?Rn():this.#u(),Fe===this&&(this.#r===0&&Qi.delete(this),this.deactivate())}#u(){if(!this.#c)for(const t of this.#t)t();this.#t.clear()}increment(){this.#r+=1}decrement(){if(this.#r-=1,this.#r===0){for(const t of this.#v)vr(t,Pr),Wa(t);for(const t of this.#g)vr(t,ba),Wa(t);this.#s=[],this.#a=[],this.flush()}else this.deactivate()}add_callback(t){this.#t.add(t)}settled(){return(this.#l??=al()).promise}static ensure(){if(Fe===null){const t=Fe=new qa;Qi.add(Fe),ni||qa.enqueue(()=>{Fe===t&&t.flush()})}return Fe}static enqueue(t){Xr(t)}}function Al(i){var t=ni;ni=!0;try{for(var a;;){if(Sl(),$a.length===0&&!$l()&&(Fe?.flush(),$a.length===0))return Fi=null,a;Rn()}}finally{ni=t}}function Rn(){var i=za;Is=!0;try{var t=0;for(ho(!0);$a.length>0;){var a=qa.ensure();if(t++>1e3){var s,n;Il()}a.process($a),ua.clear()}}finally{Is=!1,ho(i),Fi=null}}function Il(){try{vl()}catch(i){Ks(i,Fi)}}let _a=null;function xo(i){var t=i.length;if(t!==0){for(var a=0;a<t;){var s=i[a++];if((s.f&(Ea|Br))===0&&Ui(s)&&(_a=[],Ua(s),s.deps===null&&s.first===null&&s.nodes_start===null&&(s.teardown===null&&s.ac===null?Wn(s):s.fn=null),_a?.length>0)){ua.clear();for(const n of _a)Ua(n);_a=[]}}_a=null}}function Wa(i){for(var t=Fi=i;t.parent!==null;){t=t.parent;var a=t.f;if(Is&&t===$e&&(a&Ta)!==0)return;if((a&(Ma|ta))!==0){if((a&er)===0)return;t.f^=er}}$a.push(t)}const ua=new Map;function Ja(i,t){var a={f:0,v:i,reactions:null,equals:$n,rv:0,wv:0};return a}function x(i,t){const a=Ja(i);return Yn(a),a}function jl(i,t=!1,a=!0){const s=Ja(i);return t||(s.equals=Tn),s}function d(i,t,a=!1){Me!==null&&(!Nr||(Me.f&uo)!==0)&&Mn()&&(Me.f&(_r|Ta|Ws|uo))!==0&&!Qr?.includes(i)&&pl();let s=a?Le(t):t;return ci(i,s)}function ci(i,t){if(!i.equals(t)){var a=i.v;La?ua.set(i,t):ua.set(i,a),i.v=t;var s=qa.ensure();s.capture(i,a),(i.f&_r)!==0&&((i.f&Pr)!==0&&Qs(i),vr(i,(i.f&Tr)===0?er:ba)),i.wv=Qn(),Bn(i,Pr),$e!==null&&($e.f&er)!==0&&($e.f&(ta|Ma))===0&&(Sr===null?ql([i]):Sr.push(i))}return t}function di(i){d(i,i.v+1)}function Bn(i,t){var a=i.reactions;if(a!==null)for(var s=a.length,n=0;n<s;n++){var c=a[n],l=c.f,v=(l&Pr)===0;v&&vr(c,t),(l&_r)!==0?Bn(c,ba):v&&((l&Ta)!==0&&_a!==null&&_a.push(c),Wa(c))}}function Le(i){if(typeof i!="object"||i===null||ga in i)return i;const t=hn(i);if(t!==el&&t!==rl)return i;var a=new Map,s=Ri(i),n=x(0),c=Ca,l=v=>{if(Ca===c)return v();var g=Me,u=Ca;Gr(null),ko(c);var p=v();return Gr(g),ko(u),p};return s&&a.set("length",x(i.length)),new Proxy(i,{defineProperty(v,g,u){(!("value"in u)||u.configurable===!1||u.enumerable===!1||u.writable===!1)&&ul();var p=a.get(g);return p===void 0?p=l(()=>{var k=x(u.value);return a.set(g,k),k}):d(p,u.value,!0),!0},deleteProperty(v,g){var u=a.get(g);if(u===void 0){if(g in v){const p=l(()=>x(Qe));a.set(g,p),di(n)}}else d(u,Qe),di(n);return!0},get(v,g,u){if(g===ga)return i;var p=a.get(g),k=g in v;if(p===void 0&&(!k||va(v,g)?.writable)&&(p=l(()=>{var h=Le(k?v[g]:Qe),_=x(h);return _}),a.set(g,p)),p!==void 0){var y=e(p);return y===Qe?void 0:y}return Reflect.get(v,g,u)},getOwnPropertyDescriptor(v,g){var u=Reflect.getOwnPropertyDescriptor(v,g);if(u&&"value"in u){var p=a.get(g);p&&(u.value=e(p))}else if(u===void 0){var k=a.get(g),y=k?.v;if(k!==void 0&&y!==Qe)return{enumerable:!0,configurable:!0,value:y,writable:!0}}return u},has(v,g){if(g===ga)return!0;var u=a.get(g),p=u!==void 0&&u.v!==Qe||Reflect.has(v,g);if(u!==void 0||$e!==null&&(!p||va(v,g)?.writable)){u===void 0&&(u=l(()=>{var y=p?Le(v[g]):Qe,h=x(y);return h}),a.set(g,u));var k=e(u);if(k===Qe)return!1}return p},set(v,g,u,p){var k=a.get(g),y=g in v;if(s&&g==="length")for(var h=u;h<k.v;h+=1){var _=a.get(h+"");_!==void 0?d(_,Qe):h in v&&(_=l(()=>x(Qe)),a.set(h+"",_))}if(k===void 0)(!y||va(v,g)?.writable)&&(k=l(()=>x(void 0)),d(k,Le(u)),a.set(g,k));else{y=k.v!==Qe;var $=l(()=>Le(u));d(k,$)}var M=Reflect.getOwnPropertyDescriptor(v,g);if(M?.set&&M.set.call(p,u),!y){if(s&&typeof g=="string"){var P=a.get("length"),S=Number(g);Number.isInteger(S)&&S>=P.v&&d(P,S+1)}di(n)}return!0},ownKeys(v){e(n);var g=Reflect.ownKeys(v).filter(k=>{var y=a.get(k);return y===void 0||y.v!==Qe});for(var[u,p]of a)p.v!==Qe&&!(u in v)&&g.push(u);return g},setPrototypeOf(){ml()}})}function fo(i){try{if(i!==null&&typeof i=="object"&&ga in i)return i[ga]}catch{}return i}function Dn(i,t){return Object.is(fo(i),fo(t))}var bo,kr,Fn,Hn,On;function Nl(){if(bo===void 0){bo=window,kr=document,Fn=/Firefox/.test(navigator.userAgent);var i=Element.prototype,t=Node.prototype,a=Text.prototype;Hn=va(t,"firstChild").get,On=va(t,"nextSibling").get,go(i)&&(i.__click=void 0,i.__className=void 0,i.__attributes=null,i.__style=void 0,i.__e=void 0),go(a)&&(a.__t=void 0)}}function ea(i=""){return document.createTextNode(i)}function zr(i){return Hn.call(i)}function Hi(i){return On.call(i)}function r(i,t){return zr(i)}function gt(i,t){{var a=zr(i);return a instanceof Comment&&a.data===""?Hi(a):a}}function o(i,t=1,a=!1){let s=i;for(;t--;)s=Hi(s);return s}function Rl(i){i.textContent=""}function Zs(){return!1}function Bl(i,t){if(t){const a=document.body;i.autofocus=!0,Xr(()=>{document.activeElement===a&&i.focus()})}}let yo=!1;function Dl(){yo||(yo=!0,document.addEventListener("reset",i=>{Promise.resolve().then(()=>{if(!i.defaultPrevented)for(const t of i.target.elements)t.__on_r?.()})},{capture:!0}))}function Za(i){var t=Me,a=$e;Gr(null),xa(null);try{return i()}finally{Gr(t),xa(a)}}function Oi(i,t,a,s=a){i.addEventListener(t,()=>Za(a));const n=i.__on_r;n?i.__on_r=()=>{n(),s(!0)}:i.__on_r=()=>s(!0),Dl()}function Fl(i){$e===null&&Me===null&&cl(),Me!==null&&(Me.f&Tr)!==0&&$e===null&&ll(),La&&dl()}function Hl(i,t){var a=t.last;a===null?t.last=t.first=i:(a.next=i,i.prev=a,t.last=i)}function ra(i,t,a,s=!0){var n=$e;n!==null&&(n.f&Br)!==0&&(i|=Br);var c={ctx:rr,deps:null,nodes_start:null,nodes_end:null,f:i|Pr,first:null,fn:t,last:null,next:null,parent:n,b:n&&n.b,prev:null,teardown:null,transitions:null,wv:0,ac:null};if(a)try{Ua(c),c.f|=Bi}catch(g){throw gr(c),g}else t!==null&&Wa(c);if(s){var l=c;if(a&&l.deps===null&&l.teardown===null&&l.nodes_start===null&&l.first===l.last&&(l.f&ui)===0&&(l=l.first),l!==null&&(l.parent=n,n!==null&&Hl(l,n),Me!==null&&(Me.f&_r)!==0&&(i&Ma)===0)){var v=Me;(v.effects??=[]).push(l)}}return c}function Ol(){return Me!==null&&!Nr}function Xs(i){const t=ra(qs,null,!1);return vr(t,er),t.teardown=i,t}function we(i){Fl();var t=$e.f,a=!Me&&(t&ta)!==0&&(t&Bi)===0;if(a){var s=rr;(s.e??=[]).push(i)}else return zn(i)}function zn(i){return ra(Gs|il,i,!1)}function zl(i){qa.ensure();const t=ra(Ma|ui,i,!0);return(a={})=>new Promise(s=>{a.outro?xi(t,()=>{gr(t),s(void 0)}):(gr(t),s(void 0))})}function mi(i){return ra(Gs,i,!1)}function Ul(i){return ra(Ws|ui,i,!0)}function pi(i,t=0){return ra(qs|t,i,!0)}function Y(i,t=[],a=[]){jn(t,a,s=>{ra(qs,()=>i(...s.map(e)),!0)})}function ya(i,t=0){var a=ra(Ta|t,i,!0);return a}function Ur(i,t=!0){return ra(ta|ui,i,!0,t)}function Un(i){var t=i.teardown;if(t!==null){const a=La,s=Me;_o(!0),Gr(null);try{t.call(null)}finally{_o(a),Gr(s)}}}function Gn(i,t=!1){var a=i.first;for(i.first=i.last=null;a!==null;){const n=a.ac;n!==null&&Za(()=>{n.abort(Js)});var s=a.next;(a.f&Ma)!==0?a.parent=null:gr(a,t),a=s}}function Gl(i){for(var t=i.first;t!==null;){var a=t.next;(t.f&ta)===0&&gr(t),t=a}}function gr(i,t=!0){var a=!1;(t||(i.f&wn)!==0)&&i.nodes_start!==null&&i.nodes_end!==null&&(qn(i.nodes_start,i.nodes_end),a=!0),Gn(i,t&&!a),Si(i,0),vr(i,Ea);var s=i.transitions;if(s!==null)for(const c of s)c.stop();Un(i);var n=i.parent;n!==null&&n.first!==null&&Wn(i),i.next=i.prev=i.teardown=i.ctx=i.deps=i.fn=i.nodes_start=i.nodes_end=i.ac=null}function qn(i,t){for(;i!==null;){var a=i===t?null:Hi(i);i.remove(),i=a}}function Wn(i){var t=i.parent,a=i.prev,s=i.next;a!==null&&(a.next=s),s!==null&&(s.prev=a),t!==null&&(t.first===i&&(t.first=s),t.last===i&&(t.last=a))}function xi(i,t){var a=[];to(i,a,!0),Jn(a,()=>{gr(i),t&&t()})}function Jn(i,t){var a=i.length;if(a>0){var s=()=>--a||t();for(var n of i)n.out(s)}else t()}function to(i,t,a){if((i.f&Br)===0){if(i.f^=Br,i.transitions!==null)for(const l of i.transitions)(l.is_global||a)&&t.push(l);for(var s=i.first;s!==null;){var n=s.next,c=(s.f&Pa)!==0||(s.f&ta)!==0;to(s,t,c?a:!1),s=n}}}function zi(i){Vn(i,!0)}function Vn(i,t){if((i.f&Br)!==0){i.f^=Br,(i.f&er)===0&&(vr(i,Pr),Wa(i));for(var a=i.first;a!==null;){var s=a.next,n=(a.f&Pa)!==0||(a.f&ta)!==0;Vn(a,n?t:!1),a=s}if(i.transitions!==null)for(const c of i.transitions)(c.is_global||t)&&c.in()}}let za=!1;function ho(i){za=i}let La=!1;function _o(i){La=i}let Me=null,Nr=!1;function Gr(i){Me=i}let $e=null;function xa(i){$e=i}let Qr=null;function Yn(i){Me!==null&&(Qr===null?Qr=[i]:Qr.push(i))}let or=null,hr=0,Sr=null;function ql(i){Sr=i}let Kn=1,vi=0,Ca=vi;function ko(i){Ca=i}let ca=!1;function Qn(){return++Kn}function Ui(i){var t=i.f;if((t&Pr)!==0)return!0;if((t&ba)!==0){var a=i.deps,s=(t&Tr)!==0;if(a!==null){var n,c,l=(t&wi)!==0,v=s&&$e!==null&&!ca,g=a.length;if((l||v)&&($e===null||($e.f&Ea)===0)){var u=i,p=u.parent;for(n=0;n<g;n++)c=a[n],(l||!c?.reactions?.includes(u))&&(c.reactions??=[]).push(u);l&&(u.f^=wi),v&&p!==null&&(p.f&Tr)===0&&(u.f^=Tr)}for(n=0;n<g;n++)if(c=a[n],Ui(c)&&In(c),c.wv>i.wv)return!0}(!s||$e!==null&&!ca)&&vr(i,er)}return!1}function Zn(i,t,a=!0){var s=i.reactions;if(s!==null&&!Qr?.includes(i))for(var n=0;n<s.length;n++){var c=s[n];(c.f&_r)!==0?Zn(c,t,!1):t===c&&(a?vr(c,Pr):(c.f&er)!==0&&vr(c,ba),Wa(c))}}function Xn(i){var t=or,a=hr,s=Sr,n=Me,c=ca,l=Qr,v=rr,g=Nr,u=Ca,p=i.f;or=null,hr=0,Sr=null,ca=(p&Tr)!==0&&(Nr||!za||Me===null),Me=(p&(ta|Ma))===0?i:null,Qr=null,Ci(i.ctx),Nr=!1,Ca=++vi,i.ac!==null&&(Za(()=>{i.ac.abort(Js)}),i.ac=null);try{i.f|=As;var k=i.fn,y=k(),h=i.deps;if(or!==null){var _;if(Si(i,hr),h!==null&&hr>0)for(h.length=hr+or.length,_=0;_<or.length;_++)h[hr+_]=or[_];else i.deps=h=or;if(!ca||(p&_r)!==0&&i.reactions!==null)for(_=hr;_<h.length;_++)(h[_].reactions??=[]).push(i)}else h!==null&&hr<h.length&&(Si(i,hr),h.length=hr);if(Mn()&&Sr!==null&&!Nr&&h!==null&&(i.f&(_r|ba|Pr))===0)for(_=0;_<Sr.length;_++)Zn(Sr[_],i);return n!==null&&n!==i&&(vi++,Sr!==null&&(s===null?s=Sr:s.push(...Sr))),(i.f&wa)!==0&&(i.f^=wa),y}catch($){return wl($)}finally{i.f^=As,or=t,hr=a,Sr=s,Me=n,ca=c,Qr=l,Ci(v),Nr=g,Ca=u}}function Wl(i,t){let a=t.reactions;if(a!==null){var s=Xd.call(a,i);if(s!==-1){var n=a.length-1;n===0?a=t.reactions=null:(a[s]=a[n],a.pop())}}a===null&&(t.f&_r)!==0&&(or===null||!or.includes(t))&&(vr(t,ba),(t.f&(Tr|wi))===0&&(t.f^=wi),An(t),Si(t,0))}function Si(i,t){var a=i.deps;if(a!==null)for(var s=t;s<a.length;s++)Wl(i,a[s])}function Ua(i){var t=i.f;if((t&Ea)===0){vr(i,er);var a=$e,s=za;$e=i,za=!0;try{(t&Ta)!==0?Gl(i):Gn(i),Un(i);var n=Xn(i);i.teardown=typeof n=="function"?n:null,i.wv=Kn;var c;yn&&bl&&(i.f&Pr)!==0&&i.deps}finally{za=s,$e=a}}}async function Jl(){await Promise.resolve(),Al()}function e(i){var t=i.f,a=(t&_r)!==0;if(Me!==null&&!Nr){var s=$e!==null&&($e.f&Ea)!==0;if(!s&&!Qr?.includes(i)){var n=Me.deps;if((Me.f&As)!==0)i.rv<vi&&(i.rv=vi,or===null&&n!==null&&n[hr]===i?hr++:or===null?or=[i]:(!ca||!or.includes(i))&&or.push(i));else{(Me.deps??=[]).push(i);var c=i.reactions;c===null?i.reactions=[Me]:c.includes(Me)||c.push(Me)}}}else if(a&&i.deps===null&&i.effects===null){var l=i,v=l.parent;v!==null&&(v.f&Tr)===0&&(l.f^=Tr)}if(La){if(ua.has(i))return ua.get(i);if(a){l=i;var g=l.v;return((l.f&er)===0&&l.reactions!==null||td(l))&&(g=Qs(l)),ua.set(l,g),g}}else a&&(l=i,Ui(l)&&In(l));if((i.f&wa)!==0)throw i.v;return i.v}function td(i){if(i.v===Qe)return!0;if(i.deps===null)return!1;for(const t of i.deps)if(ua.has(t)||(t.f&_r)!==0&&td(t))return!0;return!1}function dr(i){var t=Nr;try{return Nr=!0,i()}finally{Nr=t}}const Vl=-7169;function vr(i,t){i.f=i.f&Vl|t}const ed=new Set,js=new Set;function eo(i,t,a,s={}){function n(c){if(s.capture||oi.call(t,c),!c.cancelBubble)return Za(()=>a?.call(this,c))}return i.startsWith("pointer")||i.startsWith("touch")||i==="wheel"?Xr(()=>{t.addEventListener(i,n,s)}):t.addEventListener(i,n,s),n}function Ti(i,t,a,s={}){var n=eo(t,i,a,s);return()=>{i.removeEventListener(t,n,s)}}function rd(i,t,a,s,n){var c={capture:s,passive:n},l=eo(i,t,a,c);(t===document.body||t===window||t===document||t instanceof HTMLMediaElement)&&Xs(()=>{t.removeEventListener(i,l,c)})}function ye(i){for(var t=0;t<i.length;t++)ed.add(i[t]);for(var a of js)a(i)}let wo=null;function oi(i){var t=this,a=t.ownerDocument,s=i.type,n=i.composedPath?.()||[],c=n[0]||i.target;wo=i;var l=0,v=wo===i&&i.__root;if(v){var g=n.indexOf(v);if(g!==-1&&(t===document||t===window)){i.__root=t;return}var u=n.indexOf(t);if(u===-1)return;g<=u&&(l=g)}if(c=n[l]||i.target,c!==t){Ls(i,"currentTarget",{configurable:!0,get(){return c||a}});var p=Me,k=$e;Gr(null),xa(null);try{for(var y,h=[];c!==null;){var _=c.assignedSlot||c.parentNode||c.host||null;try{var $=c["__"+s];if($!=null&&(!c.disabled||i.target===c))if(Ri($)){var[M,...P]=$;M.apply(c,[i,...P])}else $.call(c,i)}catch(S){y?h.push(S):y=S}if(i.cancelBubble||_===t||_===null)break;c=_}if(y){for(let S of h)queueMicrotask(()=>{throw S});throw y}}finally{i.__root=t,delete i.currentTarget,Gr(p),xa(k)}}}function Lr(i){var t;t=document.head.appendChild(ea());try{ya(()=>i(t),wn)}finally{}}function ro(i){var t=document.createElement("template");return t.innerHTML=i.replaceAll("<!>","<!---->"),t.content}function Sa(i,t){var a=$e;a.nodes_start===null&&(a.nodes_start=i,a.nodes_end=t)}function w(i,t){var a=(t&Vd)!==0,s=(t&Yd)!==0,n,c=!i.startsWith("<!>");return()=>{n===void 0&&(n=ro(c?i:"<!>"+i),a||(n=zr(n)));var l=s||Fn?document.importNode(n,!0):n.cloneNode(!0);if(a){var v=zr(l),g=l.lastChild;Sa(v,g)}else Sa(l,l);return l}}function Yl(i,t,a="svg"){var s=!i.startsWith("<!>"),n=`<${a}>${s?i:"<!>"+i}</${a}>`,c;return()=>{if(!c){var l=ro(n),v=zr(l);c=zr(v)}var g=c.cloneNode(!0);return Sa(g,g),g}}function ur(i,t){return Yl(i,t,"svg")}function Mi(i=""){{var t=ea(i+"");return Sa(t,t),t}}function Et(){var i=document.createDocumentFragment(),t=document.createComment(""),a=ea();return i.append(t,a),Sa(t,a),i}function m(i,t){i!==null&&i.before(t)}function Kl(i){return i.endsWith("capture")&&i!=="gotpointercapture"&&i!=="lostpointercapture"}const Ql=["beforeinput","click","change","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"];function Zl(i){return Ql.includes(i)}const Xl={formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly",defaultvalue:"defaultValue",defaultchecked:"defaultChecked",srcobject:"srcObject",novalidate:"noValidate",allowfullscreen:"allowFullscreen",disablepictureinpicture:"disablePictureInPicture",disableremoteplayback:"disableRemotePlayback"};function t0(i){return i=i.toLowerCase(),Xl[i]??i}const e0=["touchstart","touchmove"];function r0(i){return e0.includes(i)}let Ei=!0;function Co(i){Ei=i}function b(i,t){var a=t==null?"":typeof t=="object"?t+"":t;a!==(i.__t??=i.nodeValue)&&(i.__t=a,i.nodeValue=a+"")}function a0(i,t){return i0(i,t)}const Ba=new Map;function i0(i,{target:t,anchor:a,props:s={},events:n,context:c,intro:l=!0}){Nl();var v=new Set,g=k=>{for(var y=0;y<k.length;y++){var h=k[y];if(!v.has(h)){v.add(h);var _=r0(h);t.addEventListener(h,oi,{passive:_});var $=Ba.get(h);$===void 0?(document.addEventListener(h,oi,{passive:_}),Ba.set(h,1)):Ba.set(h,$+1)}}};g(Us(ed)),js.add(g);var u=void 0,p=zl(()=>{var k=a??t.appendChild(ea());return Ur(()=>{if(c){It({});var y=rr;y.c=c}n&&(s.$$events=n),Ei=l,u=i(k,s)||{},Ei=!0,c&&jt()}),()=>{for(var y of v){t.removeEventListener(y,oi);var h=Ba.get(y);--h===0?(document.removeEventListener(y,oi),Ba.delete(y)):Ba.set(y,h)}js.delete(g),k!==a&&k.parentNode?.removeChild(k)}});return s0.set(u,p),u}let s0=new WeakMap;function te(i,t,...a){var s=i,n=Zt,c;ya(()=>{n!==(n=t())&&(c&&(gr(c),c=null),c=Ur(()=>n(s,...a)))},Pa)}function qr(i){rr===null&&Vs(),we(()=>{const t=dr(i);if(typeof t=="function")return t})}function ad(i){rr===null&&Vs(),qr(()=>()=>dr(i))}function O(i,t,a=!1){var s=i,n=null,c=null,l=Qe,v=a?Pa:0,g=!1;const u=(h,_=!0)=>{g=!0,y(_,h)};var p=null;function k(){p!==null&&(p.lastChild.remove(),s.before(p),p=null);var h=l?n:c,_=l?c:n;h&&zi(h),_&&xi(_,()=>{l?c=null:n=null})}const y=(h,_)=>{if(l!==(l=h)){var $=Zs(),M=s;if($&&(p=document.createDocumentFragment(),p.append(M=ea())),l?n??=_&&Ur(()=>_(M)):c??=_&&Ur(()=>_(M)),$){var P=Fe,S=l?n:c,N=l?c:n;S&&P.skipped_effects.delete(S),N&&P.skipped_effects.add(N),P.add_callback(k)}else k()}};ya(()=>{g=!1,t(u),g||y(null,null)},v)}function Mr(i,t){return t}function o0(i,t,a){for(var s=i.items,n=[],c=t.length,l=0;l<c;l++)to(t[l].e,n,!0);var v=c>0&&n.length===0&&a!==null;if(v){var g=a.parentNode;Rl(g),g.append(a),s.clear(),Or(i,t[0].prev,t[c-1].next)}Jn(n,()=>{for(var u=0;u<c;u++){var p=t[u];v||(s.delete(p.k),Or(i,p.prev,p.next)),gr(p.e,!v)}})}function fe(i,t,a,s,n,c=null){var l=i,v={flags:t,items:new Map,first:null},g=(t&bn)!==0;if(g){var u=i;l=u.appendChild(ea())}var p=null,k=!1,y=new Map,h=Ln(()=>{var P=a();return Ri(P)?P:P==null?[]:Us(P)}),_,$;function M(){n0($,_,v,y,l,n,t,s,a),c!==null&&(_.length===0?p?zi(p):p=Ur(()=>c(l)):p!==null&&xi(p,()=>{p=null}))}ya(()=>{$??=$e,_=e(h);var P=_.length;if(!(k&&P===0)){k=P===0;var S,N,f,E;if(Zs()){var C=new Set,H=Fe;for(N=0;N<P;N+=1){f=_[N],E=s(f,N);var z=v.items.get(E)??y.get(E);z?(t&(ji|Ni))!==0&&id(z,f,N,t):(S=sd(null,v,null,null,f,E,N,n,t,a,!0),y.set(E,S)),C.add(E)}for(const[rt,pt]of v.items)C.has(rt)||H.skipped_effects.add(pt.e);H.add_callback(M)}else M();e(h)}})}function n0(i,t,a,s,n,c,l,v,g){var u=(l&Od)!==0,p=(l&(ji|Ni))!==0,k=t.length,y=a.items,h=a.first,_=h,$,M=null,P,S=[],N=[],f,E,C,H;if(u)for(H=0;H<k;H+=1)f=t[H],E=v(f,H),C=y.get(E),C!==void 0&&(C.a?.measure(),(P??=new Set).add(C));for(H=0;H<k;H+=1){if(f=t[H],E=v(f,H),C=y.get(E),C===void 0){var z=s.get(E);if(z!==void 0){s.delete(E),y.set(E,z);var rt=M?M.next:_;Or(a,M,z),Or(a,z,rt),Zi(z,rt,n),M=z}else{var pt=_?_.e.nodes_start:n;M=sd(pt,a,M,M===null?a.first:M.next,f,E,H,c,l,g)}y.set(E,M),S=[],N=[],_=M.next;continue}if(p&&id(C,f,H,l),(C.e.f&Br)!==0&&(zi(C.e),u&&(C.a?.unfix(),(P??=new Set).delete(C))),C!==_){if($!==void 0&&$.has(C)){if(S.length<N.length){var lt=N[0],mt;M=lt.prev;var ct=S[0],xt=S[S.length-1];for(mt=0;mt<S.length;mt+=1)Zi(S[mt],lt,n);for(mt=0;mt<N.length;mt+=1)$.delete(N[mt]);Or(a,ct.prev,xt.next),Or(a,M,ct),Or(a,xt,lt),_=lt,M=xt,H-=1,S=[],N=[]}else $.delete(C),Zi(C,_,n),Or(a,C.prev,C.next),Or(a,C,M===null?a.first:M.next),Or(a,M,C),M=C;continue}for(S=[],N=[];_!==null&&_.k!==E;)(_.e.f&Br)===0&&($??=new Set).add(_),N.push(_),_=_.next;if(_===null)continue;C=_}S.push(C),M=C,_=C.next}if(_!==null||$!==void 0){for(var Rt=$===void 0?[]:Us($);_!==null;)(_.e.f&Br)===0&&Rt.push(_),_=_.next;var Vt=Rt.length;if(Vt>0){var Kt=(l&bn)!==0&&k===0?n:null;if(u){for(H=0;H<Vt;H+=1)Rt[H].a?.measure();for(H=0;H<Vt;H+=1)Rt[H].a?.fix()}o0(a,Rt,Kt)}}u&&Xr(()=>{if(P!==void 0)for(C of P)C.a?.apply()}),i.first=a.first&&a.first.e,i.last=M&&M.e;for(var Qt of s.values())gr(Qt.e);s.clear()}function id(i,t,a,s){(s&ji)!==0&&ci(i.v,t),(s&Ni)!==0?ci(i.i,a):i.i=a}function sd(i,t,a,s,n,c,l,v,g,u,p){var k=(g&ji)!==0,y=(g&zd)===0,h=k?y?jl(n,!1,!1):Ja(n):n,_=(g&Ni)===0?l:Ja(l),$={i:_,v:h,k:c,a:null,e:null,prev:a,next:s};try{if(i===null){var M=document.createDocumentFragment();M.append(i=ea())}return $.e=Ur(()=>v(i,h,_,u),fl),$.e.prev=a&&a.e,$.e.next=s&&s.e,a===null?p||(t.first=$):(a.next=$,a.e.next=$.e),s!==null&&(s.prev=$,s.e.prev=$.e),$}finally{}}function Zi(i,t,a){for(var s=i.next?i.next.e.nodes_start:a,n=t?t.e.nodes_start:a,c=i.e.nodes_start;c!==null&&c!==s;){var l=Hi(c);n.before(c),c=l}}function Or(i,t,a){t===null?i.first=a:(t.next=a,t.e.next=a&&a.e),a!==null&&(a.prev=t,a.e.prev=t&&t.e)}function d0(i,t,a=!1,s=!1,n=!1){var c=i,l="";Y(()=>{var v=$e;if(l!==(l=t()??"")&&(v.nodes_start!==null&&(qn(v.nodes_start,v.nodes_end),v.nodes_start=v.nodes_end=null),l!=="")){var g=l+"";a?g=`<svg>${g}</svg>`:s&&(g=`<math>${g}</math>`);var u=ro(g);if((a||s)&&(u=zr(u)),Sa(zr(u),u.lastChild),a||s)for(;zr(u);)c.before(zr(u));else c.before(u)}})}function nr(i,t,a){var s=i,n,c,l=null,v=null;function g(){c&&(xi(c),c=null),l&&(l.lastChild.remove(),s.before(l),l=null),c=v,v=null}ya(()=>{if(n!==(n=t())){var u=Zs();if(n){var p=s;u&&(l=document.createDocumentFragment(),l.append(p=ea()),c&&Fe.skipped_effects.add(c)),v=Ur(()=>a(p,n))}u?Fe.add_callback(g):g()}},Pa)}function l0(i,t,a,s,n,c){var l,v,g=null,u=i,p;ya(()=>{const k=t()||null;var y=Qd;k!==l&&(p&&(k===null?xi(p,()=>{p=null,v=null}):k===v?zi(p):(gr(p),Co(!1))),k&&k!==v&&(p=Ur(()=>{if(g=document.createElementNS(y,k),Sa(g,g),s){var h=g.appendChild(ea());s(g,h)}$e.nodes_end=g,u.before(g)})),l=k,l&&(v=l),Co(!0))},Pa)}function c0(i,t){var a=void 0,s;ya(()=>{a!==(a=t())&&(s&&(gr(s),s=null),a&&(s=Ur(()=>{mi(()=>a(i))})))})}function od(i){var t,a,s="";if(typeof i=="string"||typeof i=="number")s+=i;else if(typeof i=="object")if(Array.isArray(i)){var n=i.length;for(t=0;t<n;t++)i[t]&&(a=od(i[t]))&&(s&&(s+=" "),s+=a)}else for(a in i)i[a]&&(s&&(s+=" "),s+=a);return s}function v0(){for(var i,t,a=0,s="",n=arguments.length;a<n;a++)(i=arguments[a])&&(t=od(i))&&(s&&(s+=" "),s+=t);return s}function Ze(i){return typeof i=="object"?v0(i):i??""}const $o=[...` 	
\r\f \v\uFEFF`];function g0(i,t,a){var s=i==null?"":""+i;if(t&&(s=s?s+" "+t:t),a){for(var n in a)if(a[n])s=s?s+" "+n:n;else if(s.length)for(var c=n.length,l=0;(l=s.indexOf(n,l))>=0;){var v=l+c;(l===0||$o.includes(s[l-1]))&&(v===s.length||$o.includes(s[v]))?s=(l===0?"":s.substring(0,l))+s.substring(v+1):l=v}}return s===""?null:s}function So(i,t=!1){var a=t?" !important;":";",s="";for(var n in i){var c=i[n];c!=null&&c!==""&&(s+=" "+n+": "+c+a)}return s}function Xi(i){return i[0]!=="-"||i[1]!=="-"?i.toLowerCase():i}function u0(i,t){if(t){var a="",s,n;if(Array.isArray(t)?(s=t[0],n=t[1]):s=t,i){i=String(i).replaceAll(/\s*\/\*.*?\*\/\s*/g,"").trim();var c=!1,l=0,v=!1,g=[];s&&g.push(...Object.keys(s).map(Xi)),n&&g.push(...Object.keys(n).map(Xi));var u=0,p=-1;const $=i.length;for(var k=0;k<$;k++){var y=i[k];if(v?y==="/"&&i[k-1]==="*"&&(v=!1):c?c===y&&(c=!1):y==="/"&&i[k+1]==="*"?v=!0:y==='"'||y==="'"?c=y:y==="("?l++:y===")"&&l--,!v&&c===!1&&l===0){if(y===":"&&p===-1)p=k;else if(y===";"||k===$-1){if(p!==-1){var h=Xi(i.substring(u,p).trim());if(!g.includes(h)){y!==";"&&k++;var _=i.substring(u,k).trim();a+=" "+_+";"}}u=k+1,p=-1}}}}return s&&(a+=So(s)),n&&(a+=So(n,!0)),a=a.trim(),a===""?null:a}return i==null?null:String(i)}function ge(i,t,a,s,n,c){var l=i.__className;if(l!==a||l===void 0){var v=g0(a,s,c);v==null?i.removeAttribute("class"):t?i.className=v:i.setAttribute("class",v),i.__className=a}else if(c&&n!==c)for(var g in c){var u=!!c[g];(n==null||u!==!!n[g])&&i.classList.toggle(g,u)}return c}function ts(i,t={},a,s){for(var n in a){var c=a[n];t[n]!==c&&(a[n]==null?i.style.removeProperty(n):i.style.setProperty(n,c,s))}}function Ke(i,t,a,s){var n=i.__style;if(n!==t){var c=u0(t,s);c==null?i.removeAttribute("style"):i.style.cssText=c,i.__style=t}else s&&(Array.isArray(s)?(ts(i,a?.[0],s[0]),ts(i,a?.[1],s[1],"important")):ts(i,a,s));return s}function Pi(i,t,a=!1){if(i.multiple){if(t==null)return;if(!Ri(t))return xl();for(var s of i.options)s.selected=t.includes(li(s));return}for(s of i.options){var n=li(s);if(Dn(n,t)){s.selected=!0;return}}(!a||t!==void 0)&&(i.selectedIndex=-1)}function nd(i){var t=new MutationObserver(()=>{Pi(i,i.__value)});t.observe(i,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["value"]}),Xs(()=>{t.disconnect()})}function cr(i,t,a=t){var s=!0;Oi(i,"change",n=>{var c=n?"[selected]":":checked",l;if(i.multiple)l=[].map.call(i.querySelectorAll(c),li);else{var v=i.querySelector(c)??i.querySelector("option:not([disabled])");l=v&&li(v)}a(l)}),mi(()=>{var n=t();if(Pi(i,n,s),s&&n===void 0){var c=i.querySelector(":checked");c!==null&&(n=li(c),a(n))}i.__value=n,s=!1}),nd(i)}function li(i){return"__value"in i?i.__value:i.value}const ei=Symbol("class"),Oa=Symbol("style"),dd=Symbol("is custom element"),ld=Symbol("is html");function cd(i,t){var a=ao(i);a.value===(a.value=t??void 0)||i.value===t&&(t!==0||i.nodeName!=="PROGRESS")||(i.value=t??"")}function m0(i,t){t?i.hasAttribute("selected")||i.setAttribute("selected",""):i.removeAttribute("selected")}function Dt(i,t,a,s){var n=ao(i);n[t]!==(n[t]=a)&&(t==="loading"&&(i[sl]=a),a==null?i.removeAttribute(t):typeof a!="string"&&vd(i).includes(t)?i[t]=a:i.setAttribute(t,a))}function p0(i,t,a,s,n=!1,c=!1){var l=ao(i),v=l[dd],g=!l[ld],u=t||{},p=i.tagName==="OPTION";for(var k in t)k in a||(a[k]=null);a.class?a.class=Ze(a.class):(s||a[ei])&&(a.class=null),a[Oa]&&(a.style??=null);var y=vd(i);for(const f in a){let E=a[f];if(p&&f==="value"&&E==null){i.value=i.__value="",u[f]=E;continue}if(f==="class"){var h=i.namespaceURI==="http://www.w3.org/1999/xhtml";ge(i,h,E,s,t?.[ei],a[ei]),u[f]=E,u[ei]=a[ei];continue}if(f==="style"){Ke(i,E,t?.[Oa],a[Oa]),u[f]=E,u[Oa]=a[Oa];continue}var _=u[f];if(!(E===_&&!(E===void 0&&i.hasAttribute(f)))){u[f]=E;var $=f[0]+f[1];if($!=="$$")if($==="on"){const C={},H="$$"+f;let z=f.slice(2);var M=Zl(z);if(Kl(z)&&(z=z.slice(0,-7),C.capture=!0),!M&&_){if(E!=null)continue;i.removeEventListener(z,u[H],C),u[H]=null}if(E!=null)if(M)i[`__${z}`]=E,ye([z]);else{let rt=function(pt){u[f].call(this,pt)};var N=rt;u[H]=eo(z,i,rt,C)}else M&&(i[`__${z}`]=void 0)}else if(f==="style")Dt(i,f,E);else if(f==="autofocus")Bl(i,!!E);else if(!v&&(f==="__value"||f==="value"&&E!=null))i.value=i.__value=E;else if(f==="selected"&&p)m0(i,E);else{var P=f;g||(P=t0(P));var S=P==="defaultValue"||P==="defaultChecked";if(E==null&&!v&&!S)if(l[f]=null,P==="value"||P==="checked"){let C=i;const H=t===void 0;if(P==="value"){let z=C.defaultValue;C.removeAttribute(P),C.defaultValue=z,C.value=C.__value=H?z:null}else{let z=C.defaultChecked;C.removeAttribute(P),C.defaultChecked=z,C.checked=H?z:!1}}else i.removeAttribute(f);else S||y.includes(P)&&(v||typeof E!="string")?(i[P]=E,P in l&&(l[P]=Qe)):typeof E!="function"&&Dt(i,P,E)}}}return u}function Ns(i,t,a=[],s=[],n,c=!1,l=!1){jn(a,s,v=>{var g=void 0,u={},p=i.nodeName==="SELECT",k=!1;if(ya(()=>{var h=t(...v.map(e)),_=p0(i,g,h,n,c,l);k&&p&&"value"in h&&Pi(i,h.value);for(let M of Object.getOwnPropertySymbols(u))h[M]||gr(u[M]);for(let M of Object.getOwnPropertySymbols(h)){var $=h[M];M.description===Zd&&(!g||$!==g[M])&&(u[M]&&gr(u[M]),u[M]=Ur(()=>c0(i,()=>$))),_[M]=$}g=_}),p){var y=i;mi(()=>{Pi(y,g.value,!0),nd(y)})}k=!0})}function ao(i){return i.__attributes??={[dd]:i.nodeName.includes("-"),[ld]:i.namespaceURI===Kd}}var To=new Map;function vd(i){var t=i.getAttribute("is")||i.nodeName,a=To.get(t);if(a)return a;To.set(t,a=[]);for(var s,n=i,c=Element.prototype;c!==n;){s=tl(n);for(var l in s)s[l].set&&a.push(l);n=hn(n)}return a}const x0=()=>performance.now(),Yr={tick:i=>requestAnimationFrame(i),now:()=>x0(),tasks:new Set};function gd(){const i=Yr.now();Yr.tasks.forEach(t=>{t.c(i)||(Yr.tasks.delete(t),t.f())}),Yr.tasks.size!==0&&Yr.tick(gd)}function f0(i){let t;return Yr.tasks.size===0&&Yr.tick(gd),{promise:new Promise(a=>{Yr.tasks.add(t={c:i,f:a})}),abort(){Yr.tasks.delete(t)}}}function bi(i,t){Za(()=>{i.dispatchEvent(new CustomEvent(t))})}function b0(i){if(i==="float")return"cssFloat";if(i==="offset")return"cssOffset";if(i.startsWith("--"))return i;const t=i.split("-");return t.length===1?t[0]:t[0]+t.slice(1).map(a=>a[0].toUpperCase()+a.slice(1)).join("")}function Mo(i){const t={},a=i.split(";");for(const s of a){const[n,c]=s.split(":");if(!n||c===void 0)break;const l=b0(n.trim());t[l]=c.trim()}return t}const y0=i=>i;function Eo(i,t,a,s){var n=(i&Jd)!==0,c="both",l,v=t.inert,g=t.style.overflow,u,p;function k(){return Za(()=>l??=a()(t,s?.()??{},{direction:c}))}var y={is_global:n,in(){t.inert=v,bi(t,"introstart"),u=Rs(t,k(),p,1,()=>{bi(t,"introend"),u?.abort(),u=l=void 0,t.style.overflow=g})},out(M){t.inert=!0,bi(t,"outrostart"),p=Rs(t,k(),u,0,()=>{bi(t,"outroend"),M?.()})},stop:()=>{u?.abort(),p?.abort()}},h=$e;if((h.transitions??=[]).push(y),Ei){var _=n;if(!_){for(var $=h.parent;$&&($.f&Pa)!==0;)for(;($=$.parent)&&($.f&Ta)===0;);_=!$||($.f&Bi)!==0}_&&mi(()=>{dr(()=>y.in())})}}function Rs(i,t,a,s,n){var c=s===1;if(Ha(t)){var l,v=!1;return Xr(()=>{if(!v){var M=t({direction:c?"in":"out"});l=Rs(i,M,a,s,n)}}),{abort:()=>{v=!0,l?.abort()},deactivate:()=>l.deactivate(),reset:()=>l.reset(),t:()=>l.t()}}if(a?.deactivate(),!t?.duration)return n(),{abort:Zt,deactivate:Zt,reset:Zt,t:()=>s};const{delay:g=0,css:u,tick:p,easing:k=y0}=t;var y=[];if(c&&a===void 0&&(p&&p(0,1),u)){var h=Mo(u(0,1));y.push(h,h)}var _=()=>1-s,$=i.animate(y,{duration:g,fill:"forwards"});return $.onfinish=()=>{$.cancel();var M=a?.t()??1-s;a?.abort();var P=s-M,S=t.duration*Math.abs(P),N=[];if(S>0){var f=!1;if(u)for(var E=Math.ceil(S/16.666666666666668),C=0;C<=E;C+=1){var H=M+P*k(C/E),z=Mo(u(H,1-H));N.push(z),f||=z.overflow==="hidden"}f&&(i.style.overflow="hidden"),_=()=>{var rt=$.currentTime;return M+P*k(rt/S)},p&&f0(()=>{if($.playState!=="running")return!1;var rt=_();return p(rt,1-rt),!0})}$=i.animate(N,{duration:S,fill:"forwards"}),$.onfinish=()=>{_=()=>s,p?.(s,1-s),n()}},{abort:()=>{$&&($.cancel(),$.effect=null,$.onfinish=Zt)},deactivate:()=>{n=Zt},reset:()=>{s===0&&p?.(1,0)},t:()=>_()}}function Tt(i,t,a=t){var s=new WeakSet;Oi(i,"input",async n=>{var c=n?i.defaultValue:i.value;if(c=rs(i)?as(c):c,a(c),Fe!==null&&s.add(Fe),await Jl(),c!==(c=t())){var l=i.selectionStart,v=i.selectionEnd;i.value=c??"",v!==null&&(i.selectionStart=l,i.selectionEnd=Math.min(v,i.value.length))}}),dr(t)==null&&i.value&&(a(rs(i)?as(i.value):i.value),Fe!==null&&s.add(Fe)),pi(()=>{var n=t();if(i===document.activeElement){var c=ki??Fe;if(s.has(c))return}rs(i)&&n===as(i.value)||i.type==="date"&&!n&&!i.value||n!==i.value&&(i.value=n??"")})}const es=new Set;function Li(i,t,a,s,n=s){var c=a.getAttribute("type")==="checkbox",l=i;if(t!==null)for(var v of t)l=l[v]??=[];l.push(a),Oi(a,"change",()=>{var g=a.__value;c&&(g=h0(l,g,a.checked)),n(g)},()=>n(c?[]:null)),pi(()=>{var g=s();c?(g=g||[],a.checked=g.includes(a.__value)):a.checked=Dn(a.__value,g)}),Xs(()=>{var g=l.indexOf(a);g!==-1&&l.splice(g,1)}),es.has(l)||(es.add(l),Xr(()=>{l.sort((g,u)=>g.compareDocumentPosition(u)===4?-1:1),es.delete(l)})),Xr(()=>{})}function We(i,t,a=t){Oi(i,"change",s=>{var n=s?i.defaultChecked:i.checked;a(n)}),dr(t)==null&&a(i.checked),pi(()=>{var s=t();i.checked=!!s})}function h0(i,t,a){for(var s=new Set,n=0;n<i.length;n+=1)i[n].checked&&s.add(i[n].__value);return a||s.delete(t),Array.from(s)}function rs(i){var t=i.type;return t==="number"||t==="range"}function as(i){return i===""?null:+i}function Po(i,t){return i===t||i?.[ga]===t}function io(i={},t,a,s){return mi(()=>{var n,c;return pi(()=>{n=c,c=[],dr(()=>{i!==a(...c)&&(t(i,...c),n&&Po(a(...n),i)&&t(null,...n))})}),()=>{Xr(()=>{c&&Po(a(...c),i)&&t(null,...c)})}}),i}const Da=[];function _0(i,t=Zt){let a=null;const s=new Set;function n(v){if(Sn(i,v)&&(i=v,a)){const g=!Da.length;for(const u of s)u[1](),Da.push(u,i);if(g){for(let u=0;u<Da.length;u+=2)Da[u][0](Da[u+1]);Da.length=0}}}function c(v){n(v(i))}function l(v,g=Zt){const u=[v,g];return s.add(u),s.size===1&&(a=t(n,c)||Zt),v(i),()=>{s.delete(u),s.size===0&&a&&(a(),a=null)}}return{set:n,update:c,subscribe:l}}let yi=!1;function k0(i){var t=yi;try{return yi=!1,[i(),yi]}finally{yi=t}}const w0={get(i,t){if(!i.exclude.includes(t))return i.props[t]},set(i,t){return!1},getOwnPropertyDescriptor(i,t){if(!i.exclude.includes(t)&&t in i.props)return{enumerable:!0,configurable:!0,value:i.props[t]}},has(i,t){return i.exclude.includes(t)?!1:t in i.props},ownKeys(i){return Reflect.ownKeys(i.props).filter(t=>!i.exclude.includes(t))}};function oe(i,t,a){return new Proxy({props:i,exclude:t},w0)}const C0={get(i,t){let a=i.props.length;for(;a--;){let s=i.props[a];if(Ha(s)&&(s=s()),typeof s=="object"&&s!==null&&t in s)return s[t]}},set(i,t,a){let s=i.props.length;for(;s--;){let n=i.props[s];Ha(n)&&(n=n());const c=va(n,t);if(c&&c.set)return c.set(a),!0}return!1},getOwnPropertyDescriptor(i,t){let a=i.props.length;for(;a--;){let s=i.props[a];if(Ha(s)&&(s=s()),typeof s=="object"&&s!==null&&t in s){const n=va(s,t);return n&&!n.configurable&&(n.configurable=!0),n}}},has(i,t){if(t===ga||t===Cn)return!1;for(let a of i.props)if(Ha(a)&&(a=a()),a!=null&&t in a)return!0;return!1},ownKeys(i){const t=[];for(let a of i.props)if(Ha(a)&&(a=a()),!!a){for(const s in a)t.includes(s)||t.push(s);for(const s of Object.getOwnPropertySymbols(a))t.includes(s)||t.push(s)}return t}};function ie(...i){return new Proxy({props:i},C0)}function ke(i,t,a,s){var n=(a&qd)!==0,c=(a&Wd)!==0,l=s,v=!0,g=()=>(v&&(v=!1,l=c?dr(s):s),l),u;if(n){var p=ga in i||Cn in i;u=va(i,t)?.set??(p&&t in i?S=>i[t]=S:void 0)}var k,y=!1;n?[k,y]=k0(()=>i[t]):k=i[t],k===void 0&&s!==void 0&&(k=g(),u&&(gl(),u(k)));var h;if(h=()=>{var S=i[t];return S===void 0?g():(v=!0,S)},(a&Gd)===0)return h;if(u){var _=i.$$legacy;return(function(S,N){return arguments.length>0?((!N||_||y)&&u(N?h():S),S):h()})}var $=!1,M=((a&Ud)!==0?Di:Ln)(()=>($=!1,h()));n&&e(M);var P=$e;return(function(S,N){if(arguments.length>0){const f=N?e(M):n?Le(S):S;return d(M,f),$=!0,l!==void 0&&(l=f),S}return La&&$||(P.f&Ea)!==0?M.v:e(M)})}const so=_0({currentPath:"/",currentRoute:null,params:{}});let ud=[];function $0(i){return ud=i,(function(t){if(t.search[1]==="/"){const a=t.search.slice(1).split("&").map(function(s){return s.replace(/~and~/g,"&")}).join("?");window.history.replaceState(null,"",t.pathname.slice(0,-1)+a+t.hash)}})(window.location),Bs(),window.addEventListener("popstate",Bs),so}function Ee(i){i!==md()&&(window.history.pushState({},"",i),Bs())}function md(){return window.location.pathname}function S0(i){if(i?.title){document.title=i.title;const s=document.querySelector('meta[property="og:title"]'),n=document.querySelector('meta[name="twitter:title"]');s&&s.setAttribute("content",i.title),n&&n.setAttribute("content",i.title)}if(i?.description){const s=document.querySelector('meta[property="og:description"]'),n=document.querySelector('meta[name="twitter:description"]'),c=document.querySelector('meta[name="description"]');s&&s.setAttribute("content",i.description),n&&n.setAttribute("content",i.description),c&&c.setAttribute("content",i.description)}if(i?.keywords){const s=document.querySelector('meta[name="keywords"]');s&&s.setAttribute("content",i.keywords)}if(i?.robots){const s=document.querySelector('meta[name="robots"]');s&&s.setAttribute("content",i.robots)}const t=document.querySelector('link[rel="canonical"]');t&&t.setAttribute("href",`https://farizink.github.io${i.path}`);const a=document.querySelector('meta[property="og:url"]');a&&a.setAttribute("content",`https://farizink.github.io${i.path}`)}function Bs(){const i=md(),t=T0(i),a=E0(i,t);t&&S0(t),so.set({currentPath:i,currentRoute:t,params:a})}function T0(i){for(const t of ud)if(M0(i,t.path))return t;return null}function M0(i,t){const a=i.split("/").filter(Boolean),s=t.split("/").filter(Boolean);return a.length!==s.length?!1:s.every((n,c)=>n.startsWith(":")||n===a[c])}function E0(i,t){if(!t)return{};const a=i.split("/").filter(Boolean),s=t.path.split("/").filter(Boolean),n={};return s.forEach((c,l)=>{if(c.startsWith(":")){const v=c.slice(1);n[v]=a[l]||""}}),n}var P0=()=>history.back(),L0=w(`<div class="flex flex-col items-center justify-center min-h-[70vh] text-center px-4"><div class="mb-8"><div class="w-32 h-32 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center mb-6"><svg class="w-16 h-16 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 21a9 9 0 110-18 9 9 0 010 18z"></path></svg></div> <h1 class="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">404</h1> <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-3">Oops! Page Not Found</h2> <p class="text-gray-600 dark:text-gray-300 max-w-md mx-auto mb-8">The page you're looking for seems to have vanished into the digital void. Let's get you back
        to safety!</p></div> <div class="flex flex-col sm:flex-row gap-4 items-center"><a href="/" class="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium transition-all transform hover:scale-105 shadow-lg"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg> Back to Home</a> <button class="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-xl font-medium transition-all"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg> Go Back</button></div> <div class="mt-12 text-sm text-gray-500 dark:text-gray-400"><p>Lost? Try checking the URL or explore our tools below</p></div></div>`);function A0(i,t){It(t,!0);let a=x(Le({currentPath:"/",currentRoute:null,params:{}}));so.subscribe(v=>{d(a,v,!0)});var s=Et(),n=gt(s);{var c=v=>{const g=ue(()=>e(a).currentRoute.component);var u=Et(),p=gt(u);nr(p,()=>e(g),(k,y)=>{y(k,{get params(){return e(a).params}})}),m(v,u)},l=v=>{var g=L0(),u=o(r(g),2),p=o(r(u),2);p.__click=[P0],m(v,g)};O(n,v=>{e(a).currentRoute?v(c):v(l,!1)})}m(i,s),jt()}ye(["click"]);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 * 
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 * 
 * ---
 * 
 * The MIT License (MIT) (for portions derived from Feather)
 * 
 * Copyright (c) 2013-2023 Cole Bemis
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */const I0={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};var j0=ur("<svg><!><!></svg>");function ne(i,t){It(t,!0);const a=ke(t,"color",3,"currentColor"),s=ke(t,"size",3,24),n=ke(t,"strokeWidth",3,2),c=ke(t,"absoluteStrokeWidth",3,!1),l=ke(t,"iconNode",19,()=>[]),v=oe(t,["$$slots","$$events","$$legacy","name","color","size","strokeWidth","absoluteStrokeWidth","iconNode","children"]);var g=j0();Ns(g,k=>({...I0,...v,width:s(),height:s(),stroke:a(),"stroke-width":k,class:["lucide-icon lucide",t.name&&`lucide-${t.name}`,t.class]}),[()=>c()?Number(n())*24/Number(s()):n()]);var u=r(g);fe(u,17,l,Mr,(k,y)=>{var h=ue(()=>Qa(e(y),2));let _=()=>e(h)[0],$=()=>e(h)[1];var M=Et(),P=gt(M);l0(P,_,!0,(S,N)=>{Ns(S,()=>({...$()}))}),m(k,M)});var p=o(u);te(p,()=>t.children??Zt),m(i,g),jt()}function Lo(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"}]];ne(i,ie({name:"activity"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function N0(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"M5 12h14"}],["path",{d:"m12 5 7 7-7 7"}]];ne(i,ie({name:"arrow-right"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function R0(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"m21 16-4 4-4-4"}],["path",{d:"M17 20V4"}],["path",{d:"m3 8 4-4 4 4"}],["path",{d:"M7 4v16"}]];ne(i,ie({name:"arrow-up-down"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function B0(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"}],["path",{d:"m3.3 7 8.7 5 8.7-5"}],["path",{d:"M12 22V12"}]];ne(i,ie({name:"box"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function Rr(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2"}],["line",{x1:"8",x2:"16",y1:"6",y2:"6"}],["line",{x1:"16",x2:"16",y1:"14",y2:"18"}],["path",{d:"M16 10h.01"}],["path",{d:"M12 10h.01"}],["path",{d:"M8 10h.01"}],["path",{d:"M12 14h.01"}],["path",{d:"M8 14h.01"}],["path",{d:"M12 18h.01"}],["path",{d:"M8 18h.01"}]];ne(i,ie({name:"calculator"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function Va(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M3 10h18"}]];ne(i,ie({name:"calendar"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function D0(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16"}],["path",{d:"M18 17V9"}],["path",{d:"M13 17V5"}],["path",{d:"M8 17v-3"}]];ne(i,ie({name:"chart-column"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function ma(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"M20 6 9 17l-5-5"}]];ne(i,ie({name:"check"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function Ie(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"m15 18-6-6 6-6"}]];ne(i,ie({name:"chevron-left"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function F0(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"m9 18 6-6-6-6"}]];ne(i,ie({name:"chevron-right"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function oo(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["circle",{cx:"12",cy:"12",r:"10"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16"}]];ne(i,ie({name:"circle-alert"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function ka(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"M12 6v6l4 2"}],["circle",{cx:"12",cy:"12",r:"10"}]];ne(i,ie({name:"clock"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function Ya(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"m16 18 6-6-6-6"}],["path",{d:"m8 6-6 6 6 6"}]];ne(i,ie({name:"code"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function be(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"}]];ne(i,ie({name:"copy"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function H0(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["rect",{width:"20",height:"14",x:"2",y:"5",rx:"2"}],["line",{x1:"2",x2:"22",y1:"10",y2:"10"}]];ne(i,ie({name:"credit-card"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function Ao(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["rect",{width:"12",height:"12",x:"2",y:"10",rx:"2",ry:"2"}],["path",{d:"m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6"}],["path",{d:"M6 18h.01"}],["path",{d:"M10 14h.01"}],["path",{d:"M15 6h.01"}],["path",{d:"M18 9h.01"}]];ne(i,ie({name:"dices"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function Ds(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["line",{x1:"12",x2:"12",y1:"2",y2:"22"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"}]];ne(i,ie({name:"dollar-sign"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function Xa(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"M12 15V3"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["path",{d:"m7 10 5 5 5-5"}]];ne(i,ie({name:"download"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function Io(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"}],["path",{d:"M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"}]];ne(i,ie({name:"droplets"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function O0(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"M15 3h6v6"}],["path",{d:"M10 14 21 3"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}]];ne(i,ie({name:"external-link"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function z0(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"}],["path",{d:"m2 2 20 20"}]];ne(i,ie({name:"eye-off"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function pd(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"}],["circle",{cx:"12",cy:"12",r:"3"}]];ne(i,ie({name:"eye"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function xd(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1"}],["path",{d:"M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1"}]];ne(i,ie({name:"file-json"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function He(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M10 9H8"}],["path",{d:"M16 13H8"}],["path",{d:"M16 17H8"}]];ne(i,ie({name:"file-text"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function fd(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["rect",{x:"3",y:"8",width:"18",height:"4",rx:"1"}],["path",{d:"M12 8v13"}],["path",{d:"M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"}],["path",{d:"M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"}]];ne(i,ie({name:"gift"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function Ga(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["circle",{cx:"18",cy:"18",r:"3"}],["circle",{cx:"6",cy:"6",r:"3"}],["path",{d:"M13 6h3a2 2 0 0 1 2 2v7"}],["path",{d:"M11 18H8a2 2 0 0 1-2-2V9"}]];ne(i,ie({name:"git-compare"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function U0(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["circle",{cx:"12",cy:"18",r:"3"}],["circle",{cx:"6",cy:"6",r:"3"}],["circle",{cx:"18",cy:"6",r:"3"}],["path",{d:"M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9"}],["path",{d:"M12 12v3"}]];ne(i,ie({name:"git-fork"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function G0(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"}],["path",{d:"M9 18c-4.51 2-5-2-7-2"}]];ne(i,ie({name:"github"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function Fs(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"}],["path",{d:"M2 12h20"}]];ne(i,ie({name:"globe"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function Zr(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["line",{x1:"4",x2:"20",y1:"9",y2:"9"}],["line",{x1:"4",x2:"20",y1:"15",y2:"15"}],["line",{x1:"10",x2:"8",y1:"3",y2:"21"}],["line",{x1:"16",x2:"14",y1:"3",y2:"21"}]];ne(i,ie({name:"hash"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function bd(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"}]];ne(i,ie({name:"heart"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function Ka(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{d:"M3 3v5h5"}],["path",{d:"M12 7v5l4 2"}]];ne(i,ie({name:"history"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function q0(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2"}],["circle",{cx:"9",cy:"9",r:"2"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"}]];ne(i,ie({name:"image"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function pa(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 16v-4"}],["path",{d:"M12 8h.01"}]];ne(i,ie({name:"info"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function W0(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"}],["path",{d:"m21 2-9.6 9.6"}],["circle",{cx:"7.5",cy:"15.5",r:"5.5"}]];ne(i,ie({name:"key"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function is(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"M9 17H7A5 5 0 0 1 7 7h2"}],["path",{d:"M15 7h2a5 5 0 1 1 0 10h-2"}],["line",{x1:"8",x2:"16",y1:"12",y2:"12"}]];ne(i,ie({name:"link-2"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function yd(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"}]];ne(i,ie({name:"link"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function J0(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"M3 5h.01"}],["path",{d:"M3 12h.01"}],["path",{d:"M3 19h.01"}],["path",{d:"M8 5h13"}],["path",{d:"M8 12h13"}],["path",{d:"M8 19h13"}]];ne(i,ie({name:"list"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function Hs(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4"}]];ne(i,ie({name:"lock"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function V0(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8"}],["path",{d:"M10 19v-3.96 3.15"}],["path",{d:"M7 19h5"}],["rect",{width:"6",height:"10",x:"16",y:"12",rx:"2"}]];ne(i,ie({name:"monitor-smartphone"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function Y0(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"}]];ne(i,ie({name:"moon"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function Kr(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"}],["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor"}]];ne(i,ie({name:"palette"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function jo(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1"}]];ne(i,ie({name:"pause"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function ss(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["line",{x1:"19",x2:"5",y1:"5",y2:"19"}],["circle",{cx:"6.5",cy:"6.5",r:"2.5"}],["circle",{cx:"17.5",cy:"17.5",r:"2.5"}]];ne(i,ie({name:"percent"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function K0(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"}]];ne(i,ie({name:"play"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function Ai(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]];ne(i,ie({name:"plus"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function Os(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["rect",{width:"5",height:"5",x:"3",y:"3",rx:"1"}],["rect",{width:"5",height:"5",x:"16",y:"3",rx:"1"}],["rect",{width:"5",height:"5",x:"3",y:"16",rx:"1"}],["path",{d:"M21 16h-3a2 2 0 0 0-2 2v3"}],["path",{d:"M21 21v.01"}],["path",{d:"M12 7v3a2 2 0 0 1-2 2H7"}],["path",{d:"M3 12h.01"}],["path",{d:"M12 3h.01"}],["path",{d:"M12 16v.01"}],["path",{d:"M16 12h1"}],["path",{d:"M21 12v.01"}],["path",{d:"M12 21v-1"}]];ne(i,ie({name:"qr-code"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function Er(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]];ne(i,ie({name:"refresh-cw"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function Gi(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{d:"M3 3v5h5"}]];ne(i,ie({name:"rotate-ccw"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function Q0(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"}],["path",{d:"m14.5 12.5 2-2"}],["path",{d:"m11.5 9.5 2-2"}],["path",{d:"m8.5 6.5 2-2"}],["path",{d:"m17.5 15.5 2-2"}]];ne(i,ie({name:"ruler"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function zs(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"m21 21-4.34-4.34"}],["circle",{cx:"11",cy:"11",r:"8"}]];ne(i,ie({name:"search"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function hd(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"M14 17H5"}],["path",{d:"M19 7h-9"}],["circle",{cx:"17",cy:"17",r:"3"}],["circle",{cx:"7",cy:"7",r:"3"}]];ne(i,ie({name:"settings-2"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function no(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}]];ne(i,ie({name:"shield"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function os(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"m18 14 4 4-4 4"}],["path",{d:"m18 2 4 4-4 4"}],["path",{d:"M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22"}],["path",{d:"M2 6h1.972a4 4 0 0 1 3.6 2.2"}],["path",{d:"M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45"}]];ne(i,ie({name:"shuffle"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function Z0(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}],["path",{d:"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"}]];ne(i,ie({name:"square-pen"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function lo(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"}]];ne(i,ie({name:"star"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function X0(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["circle",{cx:"12",cy:"12",r:"4"}],["path",{d:"M12 2v2"}],["path",{d:"M12 20v2"}],["path",{d:"m4.93 4.93 1.41 1.41"}],["path",{d:"m17.66 17.66 1.41 1.41"}],["path",{d:"M2 12h2"}],["path",{d:"M20 12h2"}],["path",{d:"m6.34 17.66-1.41 1.41"}],["path",{d:"m19.07 4.93-1.41 1.41"}]];ne(i,ie({name:"sun"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function tc(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor"}]];ne(i,ie({name:"tag"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function ec(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["circle",{cx:"12",cy:"12",r:"10"}],["circle",{cx:"12",cy:"12",r:"6"}],["circle",{cx:"12",cy:"12",r:"2"}]];ne(i,ie({name:"target"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function rc(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"}]];ne(i,ie({name:"thermometer"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function ac(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["line",{x1:"10",x2:"14",y1:"2",y2:"2"}],["line",{x1:"12",x2:"15",y1:"14",y2:"11"}],["circle",{cx:"12",cy:"14",r:"8"}]];ne(i,ie({name:"timer"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function qi(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"M10 11v6"}],["path",{d:"M14 11v6"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"}],["path",{d:"M3 6h18"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}]];ne(i,ie({name:"trash-2"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function ic(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"M16 17h6v-6"}],["path",{d:"m22 17-8.5-8.5-5 5L2 7"}]];ne(i,ie({name:"trending-down"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function sc(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"M16 7h6v6"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17"}]];ne(i,ie({name:"trending-up"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function oc(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"}]];ne(i,ie({name:"twitter"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function fa(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"M12 4v16"}],["path",{d:"M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2"}],["path",{d:"M9 20h6"}]];ne(i,ie({name:"type"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function nc(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"M12 3v12"}],["path",{d:"m17 8-5-5-5 5"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}]];ne(i,ie({name:"upload"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function co(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87"}],["circle",{cx:"9",cy:"7",r:"4"}]];ne(i,ie({name:"users"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function dc(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"}],["path",{d:"M7 2v20"}],["path",{d:"M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"}]];ne(i,ie({name:"utensils"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function lc(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"}]];ne(i,ie({name:"volume"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function cc(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["circle",{cx:"12",cy:"5",r:"3"}],["path",{d:"M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z"}]];ne(i,ie({name:"weight"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function gi(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];ne(i,ie({name:"x"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function Ve(i,t){It(t,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let a=oe(t,["$$slots","$$events","$$legacy"]);const s=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"}]];ne(i,ie({name:"zap"},()=>a,{get iconNode(){return s},children:(n,c)=>{var l=Et(),v=gt(l);te(v,()=>t.children??Zt),m(n,l)},$$slots:{default:!0}})),jt()}function vc(i,t){d(t,!e(t));const a=document.documentElement;e(t)?(a.classList.add("dark"),localStorage.setItem("theme","dark")):(a.classList.remove("dark"),localStorage.setItem("theme","light"))}var gc=(i,t)=>t(i,"/"),uc=(i,t)=>t(i,"/projects"),mc=(i,t)=>t(i,"/tools"),pc=w('<nav class="mb-8 w-full backdrop-blur-xs py-4 fixed top-0 z-40"><div class="flex justify-between items-center px-6"><div class="flex space-x-6"><a href="/" class="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors font-medium">Home</a> <a href="/projects" class="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors font-medium">Projects</a> <a href="/tools" class="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors font-medium">Tools</a></div> <button class="hover:cursor-pointer p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"><!></button></div></nav>');function xc(i,t){It(t,!0);let a=x(!1);function s(_,$){_.preventDefault(),Ee($)}qr(()=>{const _=localStorage.getItem("theme"),$=window.matchMedia("(prefers-color-scheme: dark)").matches;d(a,_==="dark"||!_&&$,!0),e(a)?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")});var n=pc(),c=r(n),l=r(c),v=r(l);v.__click=[gc,s];var g=o(v,2);g.__click=[uc,s];var u=o(g,2);u.__click=[mc,s];var p=o(l,2);p.__click=[vc,a];var k=r(p);{var y=_=>{X0(_,{class:"w-5 h-5"})},h=_=>{Y0(_,{class:"w-5 h-5"})};O(k,_=>{e(a)?_(y):_(h,!1)})}Y(()=>Dt(p,"title",e(a)?"Switch to light mode":"Switch to dark mode")),m(i,n),jt()}ye(["click"]);var fc=w('<div class="pixel-background svelte-azucis"><canvas class="svelte-azucis"></canvas></div>');function bc(i,t){It(t,!0);let a,s=null,n=[],c,l=!1,v;const g=15,u=3,p=["#e2e8f0","#cbd5e1","#94a3b8","#64748b"];function k(){if(!a)return;n=[];const f=Math.ceil(a.width/g),E=Math.ceil(a.height/g);for(let C=0;C<f;C++)for(let H=0;H<E;H++){const z=C*g+(Math.random()-.5)*5,rt=H*g+(Math.random()-.5)*5;n.push({x:z,y:rt,size:0,targetSize:Math.random()*u,opacity:0,targetOpacity:Math.random()*.6+.2,color:p[Math.floor(Math.random()*p.length)],speed:Math.random()*.02+.01,phase:Math.random()*Math.PI*2})}}function y(f,E){const H=Math.sin(E*.003+f.phase)>0;f.targetSize=H?u:.1,f.size+=(f.targetSize-f.size)*(f.speed*3),f.targetOpacity=H?Math.random()*.4+.4:.05,f.opacity+=(f.targetOpacity-f.opacity)*(f.speed*4)}function h(f){if(!s||f.size<.1)return;s.globalAlpha=f.opacity,s.fillStyle=f.color;const E=f.size/2;s.fillRect(f.x-E,f.y-E,f.size,f.size)}function _(f){!l||!s||!a||(s.clearRect(0,0,a.width,a.height),n.forEach(E=>{y(E,f),h(E)}),c=requestAnimationFrame(_))}function $(){if(!a)return;const f=a.getBoundingClientRect();a.width=f.width,a.height=f.height,k()}function M(){l||(l=!0,c=requestAnimationFrame(_))}function P(){l=!1,c!==void 0&&(cancelAnimationFrame(c),c=void 0)}qr(()=>{if(!a)return;const f=a.getContext("2d");if(!f)return;s=f,$();const E=setTimeout(M,100);return v=new ResizeObserver($),v.observe(a),()=>{clearTimeout(E),v&&(v.disconnect(),v=void 0),P()}}),ad(()=>{P(),v&&(v.disconnect(),v=void 0),s=null});var S=fc(),N=r(S);io(N,f=>a=f,()=>a),m(i,S),jt()}var yc=ur('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"></path></svg>');function hc(i,t){let a=ke(t,"class",3,"w-6 h-6");var s=yc();Y(()=>ge(s,0,Ze(a()))),m(i,s)}const _c="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20aria-hidden='true'%20role='img'%20class='iconify%20iconify--logos'%20width='26.6'%20height='32'%20preserveAspectRatio='xMidYMid%20meet'%20viewBox='0%200%20256%20308'%3e%3cpath%20fill='%23FF3E00'%20d='M239.682%2040.707C211.113-.182%20154.69-12.301%20113.895%2013.69L42.247%2059.356a82.198%2082.198%200%200%200-37.135%2055.056a86.566%2086.566%200%200%200%208.536%2055.576a82.425%2082.425%200%200%200-12.296%2030.719a87.596%2087.596%200%200%200%2014.964%2066.244c28.574%2040.893%2084.997%2053.007%20125.787%2027.016l71.648-45.664a82.182%2082.182%200%200%200%2037.135-55.057a86.601%2086.601%200%200%200-8.53-55.577a82.409%2082.409%200%200%200%2012.29-30.718a87.573%2087.573%200%200%200-14.963-66.244'%3e%3c/path%3e%3cpath%20fill='%23FFF'%20d='M106.889%20270.841c-23.102%206.007-47.497-3.036-61.103-22.648a52.685%2052.685%200%200%201-9.003-39.85a49.978%2049.978%200%200%201%201.713-6.693l1.35-4.115l3.671%202.697a92.447%2092.447%200%200%200%2028.036%2014.007l2.663.808l-.245%202.659a16.067%2016.067%200%200%200%202.89%2010.656a17.143%2017.143%200%200%200%2018.397%206.828a15.786%2015.786%200%200%200%204.403-1.935l71.67-45.672a14.922%2014.922%200%200%200%206.734-9.977a15.923%2015.923%200%200%200-2.713-12.011a17.156%2017.156%200%200%200-18.404-6.832a15.78%2015.78%200%200%200-4.396%201.933l-27.35%2017.434a52.298%2052.298%200%200%201-14.553%206.391c-23.101%206.007-47.497-3.036-61.101-22.649a52.681%2052.681%200%200%201-9.004-39.849a49.428%2049.428%200%200%201%2022.34-33.114l71.664-45.677a52.218%2052.218%200%200%201%2014.563-6.398c23.101-6.007%2047.497%203.036%2061.101%2022.648a52.685%2052.685%200%200%201%209.004%2039.85a50.559%2050.559%200%200%201-1.713%206.692l-1.35%204.116l-3.67-2.693a92.373%2092.373%200%200%200-28.037-14.013l-2.664-.809l.246-2.658a16.099%2016.099%200%200%200-2.89-10.656a17.143%2017.143%200%200%200-18.398-6.828a15.786%2015.786%200%200%200-4.402%201.935l-71.67%2045.674a14.898%2014.898%200%200%200-6.73%209.975a15.9%2015.9%200%200%200%202.709%2012.012a17.156%2017.156%200%200%200%2018.404%206.832a15.841%2015.841%200%200%200%204.402-1.935l27.345-17.427a52.147%2052.147%200%200%201%2014.552-6.397c23.101-6.006%2047.497%203.037%2061.102%2022.65a52.681%2052.681%200%200%201%209.003%2039.848a49.453%2049.453%200%200%201-22.34%2033.12l-71.664%2045.673a52.218%2052.218%200%200%201-14.563%206.398'%3e%3c/path%3e%3c/svg%3e",kc=(i,t)=>{d(t,e(t)+1)};var wc=w('<button class="btn-counter svelte-dfcawr"> </button>');function Cc(i){let t=x(0);var a=wc();a.__click=[kc,t];var s=r(a);Y(()=>b(s,`count is ${e(t)??""}`)),m(i,a)}ye(["click"]);var $c=w('<div id="thanks-container" class="svelte-ywuqfn"><div class="thanks-content svelte-ywuqfn"><div class="flex gap-2 justify-center"><a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer" class="svelte-ywuqfn"><img src="/vite.svg" class="logo svelte-ywuqfn" alt="Vite Logo"/></a> <a href="https://svelte.dev" target="_blank" rel="noopener noreferrer" class="svelte-ywuqfn"><img class="logo svelte svelte-ywuqfn" alt="Svelte Logo"/></a></div> <h1 class="svelte-ywuqfn">Vite + Svelte</h1> <div class="card svelte-ywuqfn"><!></div> <p>Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank" rel="noopener noreferrer" class="svelte-ywuqfn">SvelteKit</a>, the official Svelte app framework powered by Vite!</p> <p class="read-the-docs svelte-ywuqfn">Click on the Vite and Svelte logos to learn more</p></div></div>');function Sc(i){var t=$c(),a=r(t),s=r(a),n=o(r(s),2),c=r(n),l=o(s,4),v=r(l);Cc(v),Y(()=>Dt(c,"src",_c)),m(i,t)}const Tc=i=>i;function Mc(i){const t=i-1;return t*t*t+1}function Ec(i,{delay:t=0,duration:a=400,easing:s=Tc}={}){const n=+getComputedStyle(i).opacity;return{delay:t,duration:a,easing:s,css:c=>`opacity: ${c*n}`}}function Pc(i,{delay:t=0,duration:a=400,easing:s=Mc,start:n=0,opacity:c=0}={}){const l=getComputedStyle(i),v=+l.opacity,g=l.transform==="none"?"":l.transform,u=1-n,p=v*(1-c);return{delay:t,duration:a,easing:s,css:(k,y)=>`
			transform: ${g} scale(${1-u*y});
			opacity: ${v-p*y}
		`}}function Lc(i,t,a){t()&&(i.key==="Enter"||i.key===" ")&&a()}var Ac=w('<div class="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center" aria-labelledby="modal-title" role="dialog" aria-modal="true"><div class="fixed inset-0 bg-gray-500/75 dark:bg-gray-800/75 transition-opacity backdrop-blur-xs" role="button" tabindex="0"></div> <div class="flex items-center sm:items-center justify-center min-h-full w-full p-4 text-center sm:p-0"><div><!></div></div></div>');function Ic(i,t){It(t,!0);let a=ke(t,"isOpen",3,!1),s=ke(t,"isRaw",3,!1),n=ke(t,"maxW",3,"max-w-full"),c=ke(t,"forceClose",3,!0),l=ke(t,"onClose",3,()=>{});function v(){l()()}var g=Et(),u=gt(g);{var p=k=>{var y=Ac(),h=r(y);h.__click=function(...P){(c()?v:null)?.apply(this,P)},h.__keydown=[Lc,c,v];var _=o(h,2),$=r(_),M=r($);te(M,()=>t.children??Zt),Y(()=>ge($,1,`relative bg-white dark:bg-gray-900 rounded-lg ${s()?"p-0":"p-4"} text-left overflow-hidden shadow-xl transform transition-all my-8 w-full ${n()??""}`)),Eo(3,h,()=>Ec),Eo(3,$,()=>Pc,()=>({duration:300})),m(k,y)};O(u,k=>{a()&&k(p)})}m(i,g),jt()}ye(["click","keydown"]);const jc=Array(12).fill(0);var Nc=w('<div class="sonner-loading-bar"></div>'),Rc=w('<div><div class="sonner-spinner"></div></div>');function Bc(i,t){It(t,!0);var a=Rc(),s=r(a);fe(s,23,()=>jc,(n,c)=>`spinner-bar-${c}`,(n,c)=>{var l=Nc();m(n,l)}),Y(n=>{ge(a,1,n),Dt(a,"data-visible",t.visible)},[()=>Ze(["sonner-loading-wrapper",t.class].filter(Boolean).join(" "))]),m(i,a),jt()}function Vr(...i){return i.filter(Boolean).join(" ")}const Dc=typeof document<"u",Fc=typeof window<"u"?window:void 0;function Hc(i){let t=i.activeElement;for(;t?.shadowRoot;){const a=t.shadowRoot.activeElement;if(a===t)break;t=a}return t}class Oc{#e;#t;constructor(t={}){const{window:a=Fc,document:s=a?.document}=t;a!==void 0&&(this.#e=s,this.#t=Tl(n=>{const c=Ti(a,"focusin",n),l=Ti(a,"focusout",n);return()=>{c(),l()}}))}get current(){return this.#t?.(),this.#e?Hc(this.#e):null}}new Oc;class zc{#e;#t;constructor(t){this.#e=t,this.#t=Symbol(t)}get key(){return this.#t}exists(){return hl(this.#t)}get(){const t=mo(this.#t);if(t===void 0)throw new Error(`Context "${this.#e}" not found`);return t}getOr(t){const a=mo(this.#t);return a===void 0?t:a}set(t){return yl(this.#t,t)}}const Uc=new zc("<Toaster/>");let No=0;class Gc{#e=x(Le([]));get toasts(){return e(this.#e)}set toasts(t){d(this.#e,t,!0)}#t=x(Le([]));get heights(){return e(this.#t)}set heights(t){d(this.#t,t,!0)}#r=t=>{const a=this.toasts.findIndex(s=>s.id===t);return a===-1?null:a};addToast=t=>{Dc&&this.toasts.unshift(t)};updateToast=({id:t,data:a,type:s,message:n})=>{const c=this.toasts.findIndex(v=>v.id===t),l=this.toasts[c];this.toasts[c]={...l,...a,id:t,title:n,type:s,updated:!0}};create=t=>{const{message:a,...s}=t,n=typeof t?.id=="number"||t.id&&t.id?.length>0?t.id:No++,c=t.dismissable===void 0?!0:t.dismissable,l=t.type===void 0?"default":t.type;return dr(()=>{this.toasts.find(g=>g.id===n)?this.updateToast({id:n,data:t,type:l,message:a,dismissable:c}):this.addToast({...s,id:n,title:a,dismissable:c,type:l})}),n};dismiss=t=>(dr(()=>{if(t===void 0){this.toasts=this.toasts.map(s=>({...s,dismiss:!0}));return}const a=this.toasts.findIndex(s=>s.id===t);this.toasts[a]&&(this.toasts[a]={...this.toasts[a],dismiss:!0})}),t);remove=t=>{if(t===void 0){this.toasts=[];return}const a=this.#r(t);if(a!==null)return this.toasts.splice(a,1),t};message=(t,a)=>this.create({...a,type:"default",message:t});error=(t,a)=>this.create({...a,type:"error",message:t});success=(t,a)=>this.create({...a,type:"success",message:t});info=(t,a)=>this.create({...a,type:"info",message:t});warning=(t,a)=>this.create({...a,type:"warning",message:t});loading=(t,a)=>this.create({...a,type:"loading",message:t});promise=(t,a)=>{if(!a)return;let s;a.loading!==void 0&&(s=this.create({...a,promise:t,type:"loading",message:typeof a.loading=="string"?a.loading:a.loading()}));const n=t instanceof Promise?t:t();let c=s!==void 0;return n.then(l=>{if(typeof l=="object"&&l&&"ok"in l&&typeof l.ok=="boolean"&&!l.ok){c=!1;const v=qc(l);this.create({id:s,type:"error",message:v})}else if(a.success!==void 0){c=!1;const v=typeof a.success=="function"?a.success(l):a.success;this.create({id:s,type:"success",message:v})}}).catch(l=>{if(a.error!==void 0){c=!1;const v=typeof a.error=="function"?a.error(l):a.error;this.create({id:s,type:"error",message:v})}}).finally(()=>{c&&(this.dismiss(s),s=void 0),a.finally?.()}),s};custom=(t,a)=>{const s=a?.id||No++;return this.create({component:t,id:s,...a}),s};removeHeight=t=>{this.heights=this.heights.filter(a=>a.toastId!==t)};setHeight=t=>{const a=this.#r(t.toastId);if(a===null){this.heights.push(t);return}this.heights[a]=t};reset=()=>{this.toasts=[],this.heights=[]}}function qc(i){return i&&typeof i=="object"&&"status"in i?`HTTP error! Status: ${i.status}`:`Error! ${i}`}const Re=new Gc;function Wc(i,t){return Re.create({message:i,...t})}class Jc{#e=ue(()=>Re.toasts.filter(t=>!t.dismiss));get toasts(){return e(this.#e)}}const Vc=Wc,Oe=Object.assign(Vc,{success:Re.success,info:Re.info,warning:Re.warning,error:Re.error,custom:Re.custom,message:Re.message,promise:Re.promise,dismiss:Re.dismiss,loading:Re.loading,getActiveToasts:()=>Re.toasts.filter(i=>!i.dismiss)});function Ii(i){return i.label!==void 0}function Yc(){let i=x(Le(typeof document<"u"?document.hidden:!1));return we(()=>Ti(document,"visibilitychange",()=>{d(i,document.hidden,!0)})),{get current(){return e(i)}}}const Ro=4e3,Kc=14,Qc=45,Zc=200,Xc=.05,tv={toast:"",title:"",description:"",loader:"",closeButton:"",cancelButton:"",actionButton:"",action:"",warning:"",error:"",success:"",default:"",info:"",loading:""};function ev(i){const[t,a]=i.split("-"),s=[];return t&&s.push(t),a&&s.push(a),s}function Bo(i){return 1/(1.5+Math.abs(i)/20)}var rv=w("<div><!></div>"),av=(i,t,a,s,n)=>{e(t)||!e(a)||(s(),n.toast.onDismiss?.(n.toast))},iv=w('<button data-close-button=""><!></button>'),sv=w('<div data-icon=""><!> <!></div>'),ov=w('<div data-description=""><!></div>'),nv=(i,t,a,s)=>{Ii(t.toast.cancel)&&e(a)&&(t.toast.cancel?.onClick?.(i),s())},dv=w('<button data-button="" data-cancel=""> </button>'),lv=(i,t,a)=>{Ii(t.toast.action)&&(t.toast.action?.onClick(i),!i.defaultPrevented&&a())},cv=w('<button data-button=""> </button>'),vv=w('<!> <div data-content=""><div data-title=""><!></div> <!></div> <!> <!>',1),gv=w('<li data-sonner-toast=""><!> <!></li>');function uv(i,t){It(t,!0);const a=q=>{var Q=Et(),W=gt(Q);{var A=R=>{var it=rv(),et=r(it);te(et,()=>t.loadingIcon),Y(K=>{ge(it,1,K),Dt(it,"data-visible",e(C)==="loading")},[()=>Ze(Vr(e(Wt)?.loader,t.toast?.classes?.loader,"sonner-loader"))]),m(R,it)},I=R=>{{let it=ue(()=>Vr(e(Wt)?.loader,t.toast.classes?.loader)),et=ue(()=>e(C)==="loading");Bc(R,{get class(){return e(it)},get visible(){return e(et)}})}};O(W,R=>{t.loadingIcon?R(A):R(I,!1)})}m(q,Q)};let s=ke(t,"cancelButtonStyle",3,""),n=ke(t,"actionButtonStyle",3,""),c=ke(t,"descriptionClass",3,""),l=ke(t,"unstyled",3,!1),v=ke(t,"defaultRichColors",3,!1);const g={...tv};let u=x(!1),p=x(!1),k=x(!1),y=x(!1),h=x(!1),_=x(0),$=x(0),M=t.toast.duration||t.duration||Ro,P=x(void 0),S=x(null),N=x(null);const f=ue(()=>t.index===0),E=ue(()=>t.index+1<=t.visibleToasts),C=ue(()=>t.toast.type),H=ue(()=>t.toast.dismissable!==!1),z=ue(()=>t.toast.class||""),rt=ue(()=>t.toast.descriptionClass||""),pt=ue(()=>Re.heights.findIndex(q=>q.toastId===t.toast.id)||0),lt=ue(()=>t.toast.closeButton??t.closeButton),mt=ue(()=>t.toast.duration??t.duration??Ro);let ct=null;const xt=ue(()=>t.position.split("-")),Rt=ue(()=>Re.heights.reduce((q,Q,W)=>W>=e(pt)?q:q+Q.height,0)),Vt=Yc(),Kt=ue(()=>t.toast.invert||t.invert),Qt=ue(()=>e(C)==="loading"),Wt=ue(()=>({...g,...t.classes})),zt=ue(()=>t.toast.title),Bt=ue(()=>t.toast.description);let Lt=x(0),Ct=x(0);const X=ue(()=>Math.round(e(pt)*Kc+e(Rt)));we(()=>{e(zt),e(Bt);let q;t.expanded||t.expandByDefault?q=1:q=1-t.index*Xc;const Q=dr(()=>e(P));if(Q===void 0)return;Q.style.setProperty("height","auto");const W=Q.offsetHeight,A=Q.getBoundingClientRect().height,I=Math.round(A/q+Number.EPSILON&100)/100;Q.style.removeProperty("height");let R;Math.abs(I-W)<1?R=I:R=W,d($,R,!0),dr(()=>{Re.setHeight({toastId:t.toast.id,height:R})})});function _t(){d(p,!0),d(_,e(X),!0),Re.removeHeight(t.toast.id),setTimeout(()=>{Re.remove(t.toast.id)},Zc)}let ut;const at=ue(()=>t.toast.promise&&e(C)==="loading"||t.toast.duration===Number.POSITIVE_INFINITY);function L(){d(Lt,new Date().getTime(),!0),ut=setTimeout(()=>{t.toast.onAutoClose?.(t.toast),_t()},M)}function ft(){if(e(Ct)<e(Lt)){const q=new Date().getTime()-e(Lt);M=M-q}d(Ct,new Date().getTime(),!0)}we(()=>{t.toast.updated&&(clearTimeout(ut),M=e(mt),L())}),we(()=>(e(at)||(t.expanded||t.interacting||Vt.current?ft():L()),()=>clearTimeout(ut))),qr(()=>{d(u,!0);const q=e(P)?.getBoundingClientRect().height;return d($,q,!0),Re.setHeight({toastId:t.toast.id,height:q}),()=>{Re.removeHeight(t.toast.id)}}),we(()=>{t.toast.delete&&dr(()=>{_t(),t.toast.onDismiss?.(t.toast)})});const vt=q=>{if(e(Qt))return;d(_,e(X),!0);const Q=q.target;Q.setPointerCapture(q.pointerId),Q.tagName!=="BUTTON"&&(d(k,!0),ct={x:q.clientX,y:q.clientY})},G=()=>{if(e(y)||!e(H))return;ct=null;const q=Number(e(P)?.style.getPropertyValue("--swipe-amount-x").replace("px","")||0),Q=Number(e(P)?.style.getPropertyValue("--swipe-amount-y").replace("px","")||0),W=new Date().getTime()-0,A=e(S)==="x"?q:Q,I=Math.abs(A)/W;if(Math.abs(A)>=Qc||I>.11){d(_,e(X),!0),t.toast.onDismiss?.(t.toast),e(S)==="x"?d(N,q>0?"right":"left",!0):d(N,Q>0?"down":"up",!0),_t(),d(y,!0);return}else e(P)?.style.setProperty("--swipe-amount-x","0px"),e(P)?.style.setProperty("--swipe-amount-y","0px");d(h,!1),d(k,!1),d(S,null)},tt=q=>{if(!ct||!e(H)||(window.getSelection()?.toString().length??-1)>0)return;const W=q.clientY-ct.y,A=q.clientX-ct.x,I=t.swipeDirections??ev(t.position);!e(S)&&(Math.abs(A)>1||Math.abs(W)>1)&&d(S,Math.abs(A)>Math.abs(W)?"x":"y",!0);let R={x:0,y:0};if(e(S)==="y"){if(I.includes("top")||I.includes("bottom"))if(I.includes("top")&&W<0||I.includes("bottom")&&W>0)R.y=W;else{const it=W*Bo(W);R.y=Math.abs(it)<Math.abs(W)?it:W}}else if(e(S)==="x"&&(I.includes("left")||I.includes("right")))if(I.includes("left")&&A<0||I.includes("right")&&A>0)R.x=A;else{const it=A*Bo(A);R.x=Math.abs(it)<Math.abs(A)?it:A}(Math.abs(R.x)>0||Math.abs(R.y)>0)&&d(h,!0),e(P)?.style.setProperty("--swipe-amount-x",`${R.x}px`),e(P)?.style.setProperty("--swipe-amount-y",`${R.y}px`)},yt=()=>{d(k,!1),d(S,null),ct=null},bt=ue(()=>t.toast.icon?t.toast.icon:e(C)==="success"?t.successIcon:e(C)==="error"?t.errorIcon:e(C)==="warning"?t.warningIcon:e(C)==="info"?t.infoIcon:e(C)==="loading"?t.loadingIcon:null);var wt=gv();Dt(wt,"tabindex",0);let Ut;wt.__pointermove=tt,wt.__pointerup=G,wt.__pointerdown=vt;var Ot=r(wt);{var Nt=q=>{var Q=iv();Q.__click=[av,Qt,H,_t,t];var W=r(Q);te(W,()=>t.closeIcon??Zt),Y(A=>{Dt(Q,"aria-label",t.closeButtonAriaLabel),Dt(Q,"data-disabled",e(Qt)),ge(Q,1,A)},[()=>Ze(Vr(e(Wt)?.closeButton,t.toast?.classes?.closeButton))]),m(q,Q)};O(Ot,q=>{e(lt)&&!t.toast.component&&e(C)!=="loading"&&t.closeIcon!==null&&q(Nt)})}var Pt=o(Ot,2);{var ot=q=>{const Q=ue(()=>t.toast.component);var W=Et(),A=gt(W);nr(A,()=>e(Q),(I,R)=>{R(I,ie(()=>t.toast.componentProps,{closeToast:_t}))}),m(q,W)},kt=q=>{var Q=vv(),W=gt(Q);{var A=Z=>{var j=sv(),nt=r(j);{var Mt=J=>{var dt=Et(),$t=gt(dt);{var Ft=st=>{var ht=Et(),At=gt(ht);nr(At,()=>t.toast.icon,(Jt,Xt)=>{Xt(Jt,{})}),m(st,ht)},V=st=>{a(st)};O($t,st=>{t.toast.icon?st(Ft):st(V,!1)})}m(J,dt)};O(nt,J=>{(t.toast.promise||e(C)==="loading")&&J(Mt)})}var qt=o(nt,2);{var St=J=>{var dt=Et(),$t=gt(dt);{var Ft=st=>{var ht=Et(),At=gt(ht);nr(At,()=>t.toast.icon,(Jt,Xt)=>{Xt(Jt,{})}),m(st,ht)},V=st=>{var ht=Et(),At=gt(ht);{var Jt=Yt=>{var ee=Et(),le=gt(ee);te(le,()=>t.successIcon??Zt),m(Yt,ee)},Xt=Yt=>{var ee=Et(),le=gt(ee);{var Gt=ce=>{var ae=Et(),me=gt(ae);te(me,()=>t.errorIcon??Zt),m(ce,ae)},de=ce=>{var ae=Et(),me=gt(ae);{var pe=ve=>{var Ce=Et(),Te=gt(Ce);te(Te,()=>t.warningIcon??Zt),m(ve,Ce)},re=ve=>{var Ce=Et(),Te=gt(Ce);{var Ht=se=>{var xe=Et(),he=gt(xe);te(he,()=>t.infoIcon??Zt),m(se,xe)};O(Te,se=>{e(C)==="info"&&se(Ht)},!0)}m(ve,Ce)};O(me,ve=>{e(C)==="warning"?ve(pe):ve(re,!1)},!0)}m(ce,ae)};O(le,ce=>{e(C)==="error"?ce(Gt):ce(de,!1)},!0)}m(Yt,ee)};O(At,Yt=>{e(C)==="success"?Yt(Jt):Yt(Xt,!1)},!0)}m(st,ht)};O($t,st=>{t.toast.icon?st(Ft):st(V,!1)})}m(J,dt)};O(qt,J=>{t.toast.type!=="loading"&&J(St)})}Y(J=>ge(j,1,J),[()=>Ze(Vr(e(Wt)?.icon,t.toast?.classes?.icon))]),m(Z,j)};O(W,Z=>{(e(C)||t.toast.icon||t.toast.promise)&&t.toast.icon!==null&&(e(bt)!==null||t.toast.icon)&&Z(A)})}var I=o(W,2),R=r(I),it=r(R);{var et=Z=>{var j=Et(),nt=gt(j);{var Mt=St=>{const J=ue(()=>t.toast.title);var dt=Et(),$t=gt(dt);nr($t,()=>e(J),(Ft,V)=>{V(Ft,ie(()=>t.toast.componentProps))}),m(St,dt)},qt=St=>{var J=Mi();Y(()=>b(J,t.toast.title)),m(St,J)};O(nt,St=>{typeof t.toast.title!="string"?St(Mt):St(qt,!1)})}m(Z,j)};O(it,Z=>{t.toast.title&&Z(et)})}var K=o(R,2);{var U=Z=>{var j=ov(),nt=r(j);{var Mt=St=>{const J=ue(()=>t.toast.description);var dt=Et(),$t=gt(dt);nr($t,()=>e(J),(Ft,V)=>{V(Ft,ie(()=>t.toast.componentProps))}),m(St,dt)},qt=St=>{var J=Mi();Y(()=>b(J,t.toast.description)),m(St,J)};O(nt,St=>{typeof t.toast.description!="string"?St(Mt):St(qt,!1)})}Y(St=>ge(j,1,St),[()=>Ze(Vr(c(),e(rt),e(Wt)?.description,t.toast.classes?.description))]),m(Z,j)};O(K,Z=>{t.toast.description&&Z(U)})}var B=o(I,2);{var T=Z=>{var j=Et(),nt=gt(j);{var Mt=St=>{var J=Et(),dt=gt(J);nr(dt,()=>t.toast.cancel,($t,Ft)=>{Ft($t,{})}),m(St,J)},qt=St=>{var J=Et(),dt=gt(J);{var $t=Ft=>{var V=dv();V.__click=[nv,t,H,_t];var st=r(V);Y(ht=>{Ke(V,t.toast.cancelButtonStyle??s()),ge(V,1,ht),b(st,t.toast.cancel.label)},[()=>Ze(Vr(e(Wt)?.cancelButton,t.toast?.classes?.cancelButton))]),m(Ft,V)};O(dt,Ft=>{Ii(t.toast.cancel)&&Ft($t)},!0)}m(St,J)};O(nt,St=>{typeof t.toast.cancel=="function"?St(Mt):St(qt,!1)})}m(Z,j)};O(B,Z=>{t.toast.cancel&&Z(T)})}var D=o(B,2);{var F=Z=>{var j=Et(),nt=gt(j);{var Mt=St=>{var J=Et(),dt=gt(J);nr(dt,()=>t.toast.action,($t,Ft)=>{Ft($t,{})}),m(St,J)},qt=St=>{var J=Et(),dt=gt(J);{var $t=Ft=>{var V=cv();V.__click=[lv,t,_t];var st=r(V);Y(ht=>{Ke(V,t.toast.actionButtonStyle??n()),ge(V,1,ht),b(st,t.toast.action.label)},[()=>Ze(Vr(e(Wt)?.actionButton,t.toast?.classes?.actionButton))]),m(Ft,V)};O(dt,Ft=>{Ii(t.toast.action)&&Ft($t)},!0)}m(St,J)};O(nt,St=>{typeof t.toast.action=="function"?St(Mt):St(qt,!1)})}m(Z,j)};O(D,Z=>{t.toast.action&&Z(F)})}Y(Z=>ge(R,1,Z),[()=>Ze(Vr(e(Wt)?.title,t.toast?.classes?.title))]),m(q,Q)};O(Pt,q=>{t.toast.component?q(ot):q(kt,!1)})}io(wt,q=>d(P,q),()=>e(P)),Y((q,Q,W,A)=>{ge(wt,1,q),Dt(wt,"data-rich-colors",t.toast.richColors??v()),Dt(wt,"data-styled",!(t.toast.component||t.toast.unstyled||l())),Dt(wt,"data-mounted",e(u)),Dt(wt,"data-promise",Q),Dt(wt,"data-swiped",e(h)),Dt(wt,"data-removed",e(p)),Dt(wt,"data-visible",e(E)),Dt(wt,"data-y-position",e(xt)[0]),Dt(wt,"data-x-position",e(xt)[1]),Dt(wt,"data-index",t.index),Dt(wt,"data-front",e(f)),Dt(wt,"data-swiping",e(k)),Dt(wt,"data-dismissable",e(H)),Dt(wt,"data-type",e(C)),Dt(wt,"data-invert",e(Kt)),Dt(wt,"data-swipe-out",e(y)),Dt(wt,"data-swipe-direction",e(N)),Dt(wt,"data-expanded",W),Ut=Ke(wt,`${t.style} ${t.toast.style}`,Ut,A)},[()=>Ze(Vr(t.class,e(z),e(Wt)?.toast,t.toast?.classes?.toast,e(Wt)?.[e(C)],t.toast?.classes?.[e(C)])),()=>!!t.toast.promise,()=>!!(t.expanded||t.expandByDefault&&e(u)),()=>({"--index":t.index,"--toasts-before":t.index,"--z-index":Re.toasts.length-t.index,"--offset":`${e(p)?e(_):e(X)}px`,"--initial-height":t.expandByDefault?"auto":`${e($)}px`})]),rd("dragend",wt,yt),m(i,wt),jt()}ye(["pointermove","pointerup","pointerdown","click"]);var mv=ur('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20" data-sonner-success-icon=""><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"></path></svg>');function pv(i){var t=mv();m(i,t)}var xv=ur('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20" data-sonner-error-icon=""><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>');function fv(i){var t=xv();m(i,t)}var bv=ur('<svg viewBox="0 0 64 64" fill="currentColor" height="20" width="20" data-sonner-warning-icon="" xmlns="http://www.w3.org/2000/svg"><path d="M32.427,7.987c2.183,0.124 4,1.165 5.096,3.281l17.936,36.208c1.739,3.66 -0.954,8.585 -5.373,8.656l-36.119,0c-4.022,-0.064 -7.322,-4.631 -5.352,-8.696l18.271,-36.207c0.342,-0.65 0.498,-0.838 0.793,-1.179c1.186,-1.375 2.483,-2.111 4.748,-2.063Zm-0.295,3.997c-0.687,0.034 -1.316,0.419 -1.659,1.017c-6.312,11.979 -12.397,24.081 -18.301,36.267c-0.546,1.225 0.391,2.797 1.762,2.863c12.06,0.195 24.125,0.195 36.185,0c1.325,-0.064 2.321,-1.584 1.769,-2.85c-5.793,-12.184 -11.765,-24.286 -17.966,-36.267c-0.366,-0.651 -0.903,-1.042 -1.79,-1.03Z"></path><path d="M33.631,40.581l-3.348,0l-0.368,-16.449l4.1,0l-0.384,16.449Zm-3.828,5.03c0,-0.609 0.197,-1.113 0.592,-1.514c0.396,-0.4 0.935,-0.601 1.618,-0.601c0.684,0 1.223,0.201 1.618,0.601c0.395,0.401 0.593,0.905 0.593,1.514c0,0.587 -0.193,1.078 -0.577,1.473c-0.385,0.395 -0.929,0.593 -1.634,0.593c-0.705,0 -1.249,-0.198 -1.634,-0.593c-0.384,-0.395 -0.576,-0.886 -0.576,-1.473Z"></path></svg>');function yv(i){var t=bv();m(i,t)}var hv=ur('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20" data-sonner-info-icon=""><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd"></path></svg>');function _v(i){var t=hv();m(i,t)}var kv=ur('<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-sonner-close-icon=""><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>');function wv(i){var t=kv();m(i,t)}const Cv=3,_d="24px",kd="16px",$v=4e3,Sv=356,Tv=14,ns="dark",hi="light";function Mv(i,t){const a={};return[i,t].forEach((s,n)=>{const c=n===1,l=c?"--mobile-offset":"--offset",v=c?kd:_d;function g(u){["top","right","bottom","left"].forEach(p=>{a[`${l}-${p}`]=typeof u=="number"?`${u}px`:u})}typeof s=="number"||typeof s=="string"?g(s):typeof s=="object"?["top","right","bottom","left"].forEach(u=>{const p=s[u];p===void 0?a[`${l}-${u}`]=v:a[`${l}-${u}`]=typeof p=="number"?`${p}px`:p}):g(v)}),a}var Ev=w("<ol></ol>"),Pv=w('<section aria-live="polite" aria-relevant="additions text" aria-atomic="false" class="svelte-nbs0zk"><!></section>');function Lv(i,t){It(t,!0);function a(X){return X!=="system"?X:typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?ns:hi}let s=ke(t,"invert",3,!1),n=ke(t,"position",3,"bottom-right"),c=ke(t,"hotkey",19,()=>["altKey","KeyT"]),l=ke(t,"expand",3,!1),v=ke(t,"closeButton",3,!1),g=ke(t,"offset",3,_d),u=ke(t,"mobileOffset",3,kd),p=ke(t,"theme",3,"light"),k=ke(t,"richColors",3,!1),y=ke(t,"duration",3,$v),h=ke(t,"visibleToasts",3,Cv),_=ke(t,"toastOptions",19,()=>({})),$=ke(t,"dir",7,"auto"),M=ke(t,"gap",3,Tv),P=ke(t,"containerAriaLabel",3,"Notifications"),S=ke(t,"closeButtonAriaLabel",3,"Close toast"),N=oe(t,["$$slots","$$events","$$legacy","invert","position","hotkey","expand","closeButton","offset","mobileOffset","theme","richColors","duration","visibleToasts","toastOptions","dir","gap","loadingIcon","successIcon","errorIcon","warningIcon","closeIcon","infoIcon","containerAriaLabel","class","closeButtonAriaLabel","onblur","onfocus","onmouseenter","onmousemove","onmouseleave","ondragend","onpointerdown","onpointerup"]);function f(){if($()!=="auto")return $();if(typeof window>"u"||typeof document>"u")return"ltr";const X=document.documentElement.getAttribute("dir");return X==="auto"||!X?(dr(()=>$(window.getComputedStyle(document.documentElement).direction??"ltr")),$()):(dr(()=>$(X)),X)}const E=ue(()=>Array.from(new Set([n(),...Re.toasts.filter(X=>X.position).map(X=>X.position)].filter(Boolean))));let C=x(!1),H=x(!1),z=x(Le(a(p()))),rt=x(void 0),pt=x(null),lt=x(!1);const mt=ue(()=>c().join("+").replace(/Key/g,"").replace(/Digit/g,""));we(()=>{Re.toasts.length<=1&&d(C,!1)}),we(()=>{const X=Re.toasts.filter(_t=>_t.dismiss&&!_t.delete);if(X.length>0){const _t=Re.toasts.map(ut=>X.find(L=>L.id===ut.id)?{...ut,delete:!0}:ut);Re.toasts=_t}}),we(()=>()=>{e(rt)&&e(pt)&&(e(pt).focus({preventScroll:!0}),d(pt,null),d(lt,!1))}),qr(()=>(Re.reset(),Ti(document,"keydown",_t=>{c().every(at=>_t[at]||_t.code===at)&&(d(C,!0),e(rt)?.focus()),_t.code==="Escape"&&(document.activeElement===e(rt)||e(rt)?.contains(document.activeElement))&&d(C,!1)}))),we(()=>{if(p()!=="system"&&d(z,p()),typeof window<"u"){p()==="system"&&(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?d(z,ns):d(z,hi));const X=window.matchMedia("(prefers-color-scheme: dark)"),_t=({matches:ut})=>{d(z,ut?ns:hi,!0)};"addEventListener"in X?X.addEventListener("change",_t):X.addListener(_t)}});const ct=X=>{t.onblur?.(X),e(lt)&&!X.currentTarget.contains(X.relatedTarget)&&(d(lt,!1),e(pt)&&(e(pt).focus({preventScroll:!0}),d(pt,null)))},xt=X=>{t.onfocus?.(X),!(X.target instanceof HTMLElement&&X.target.dataset.dismissable==="false")&&(e(lt)||(d(lt,!0),d(pt,X.relatedTarget,!0)))},Rt=X=>{t.onpointerdown?.(X),!(X.target instanceof HTMLElement&&X.target.dataset.dismissable==="false")&&d(H,!0)},Vt=X=>{t.onmouseenter?.(X),d(C,!0)},Kt=X=>{t.onmouseleave?.(X),e(H)||d(C,!1)},Qt=X=>{t.onmousemove?.(X),d(C,!0)},Wt=X=>{t.ondragend?.(X),d(C,!1)},zt=X=>{t.onpointerup?.(X),d(H,!1)};Uc.set(new Jc);var Bt=Pv();Dt(Bt,"tabindex",-1);var Lt=r(Bt);{var Ct=X=>{var _t=Et(),ut=gt(_t);fe(ut,18,()=>e(E),at=>at,(at,L,ft,vt)=>{const G=ue(()=>{const[bt,wt]=L.split("-");return{y:bt,x:wt}}),tt=ue(()=>Mv(g(),u()));var yt=Ev();Ns(yt,(bt,wt)=>({tabindex:-1,dir:bt,class:t.class,"data-sonner-toaster":!0,"data-sonner-theme":e(z),"data-y-position":e(G).y,"data-x-position":e(G).x,style:t.style,onblur:ct,onfocus:xt,onmouseenter:Vt,onmousemove:Qt,onmouseleave:Kt,ondragend:Wt,onpointerdown:Rt,onpointerup:zt,...N,[Oa]:wt}),[f,()=>({"--front-toast-height":`${Re.heights[0]?.height}px`,"--width":`${Sv}px`,"--gap":`${M()}px`,"--offset-top":e(tt)["--offset-top"],"--offset-right":e(tt)["--offset-right"],"--offset-bottom":e(tt)["--offset-bottom"],"--offset-left":e(tt)["--offset-left"],"--mobile-offset-top":e(tt)["--mobile-offset-top"],"--mobile-offset-right":e(tt)["--mobile-offset-right"],"--mobile-offset-bottom":e(tt)["--mobile-offset-bottom"],"--mobile-offset-left":e(tt)["--mobile-offset-left"]})],void 0,"svelte-nbs0zk"),fe(yt,23,()=>Re.toasts.filter(bt=>!bt.position&&e(ft)===0||bt.position===L),bt=>bt.id,(bt,wt,Ut,Ot)=>{{const Nt=B=>{var T=Et(),D=gt(T);{var F=j=>{var nt=Et(),Mt=gt(nt);te(Mt,()=>t.successIcon??Zt),m(j,nt)},Z=j=>{var nt=Et(),Mt=gt(nt);{var qt=St=>{pv(St)};O(Mt,St=>{t.successIcon!==null&&St(qt)},!0)}m(j,nt)};O(D,j=>{t.successIcon?j(F):j(Z,!1)})}m(B,T)},Pt=B=>{var T=Et(),D=gt(T);{var F=j=>{var nt=Et(),Mt=gt(nt);te(Mt,()=>t.errorIcon??Zt),m(j,nt)},Z=j=>{var nt=Et(),Mt=gt(nt);{var qt=St=>{fv(St)};O(Mt,St=>{t.errorIcon!==null&&St(qt)},!0)}m(j,nt)};O(D,j=>{t.errorIcon?j(F):j(Z,!1)})}m(B,T)},ot=B=>{var T=Et(),D=gt(T);{var F=j=>{var nt=Et(),Mt=gt(nt);te(Mt,()=>t.warningIcon??Zt),m(j,nt)},Z=j=>{var nt=Et(),Mt=gt(nt);{var qt=St=>{yv(St)};O(Mt,St=>{t.warningIcon!==null&&St(qt)},!0)}m(j,nt)};O(D,j=>{t.warningIcon?j(F):j(Z,!1)})}m(B,T)},kt=B=>{var T=Et(),D=gt(T);{var F=j=>{var nt=Et(),Mt=gt(nt);te(Mt,()=>t.infoIcon??Zt),m(j,nt)},Z=j=>{var nt=Et(),Mt=gt(nt);{var qt=St=>{_v(St)};O(Mt,St=>{t.infoIcon!==null&&St(qt)},!0)}m(j,nt)};O(D,j=>{t.infoIcon?j(F):j(Z,!1)})}m(B,T)},q=B=>{var T=Et(),D=gt(T);{var F=j=>{var nt=Et(),Mt=gt(nt);te(Mt,()=>t.closeIcon??Zt),m(j,nt)},Z=j=>{var nt=Et(),Mt=gt(nt);{var qt=St=>{wv(St)};O(Mt,St=>{t.closeIcon!==null&&St(qt)},!0)}m(j,nt)};O(D,j=>{t.closeIcon?j(F):j(Z,!1)})}m(B,T)};let Q=ue(()=>_()?.duration??y()),W=ue(()=>_()?.class??""),A=ue(()=>_()?.descriptionClass||""),I=ue(()=>_()?.style??""),R=ue(()=>_().classes||{}),it=ue(()=>_().unstyled??!1),et=ue(()=>_()?.cancelButtonStyle??""),K=ue(()=>_()?.actionButtonStyle??""),U=ue(()=>_()?.closeButtonAriaLabel??S());uv(bt,{get index(){return e(Ut)},get toast(){return e(wt)},get defaultRichColors(){return k()},get duration(){return e(Q)},get class(){return e(W)},get descriptionClass(){return e(A)},get invert(){return s()},get visibleToasts(){return h()},get closeButton(){return v()},get interacting(){return e(H)},get position(){return L},get style(){return e(I)},get classes(){return e(R)},get unstyled(){return e(it)},get cancelButtonStyle(){return e(et)},get actionButtonStyle(){return e(K)},get closeButtonAriaLabel(){return e(U)},get expandByDefault(){return l()},get expanded(){return e(C)},get loadingIcon(){return t.loadingIcon},successIcon:Nt,errorIcon:Pt,warningIcon:ot,infoIcon:kt,closeIcon:q,$$slots:{successIcon:!0,errorIcon:!0,warningIcon:!0,infoIcon:!0,closeIcon:!0}})}}),io(yt,bt=>d(rt,bt),()=>e(rt)),Y(()=>yt.dir=yt.dir),m(at,yt)}),m(X,_t)};O(Lt,X=>{Re.toasts.length>0&&X(Ct)})}Y(()=>Dt(Bt,"aria-label",`${P()??""} ${e(mt)??""}`)),m(i,Bt),jt()}const Av="/assets/1-CWzsbmm-.jpg",Iv="/assets/2-DC9PoH_V.jpg";var jv=ur('<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 559 168"><path fill="currentColor" d="m83.996 0.277c-46.249 0-83.743 37.493-83.743 83.742 0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l0.001-0.004zm38.404 120.78c-1.5 2.46-4.72 3.24-7.18 1.73-19.662-12.01-44.414-14.73-73.564-8.07-2.809 0.64-5.609-1.12-6.249-3.93-0.643-2.81 1.11-5.61 3.926-6.25 31.9-7.288 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.802c-1.89 3.072-5.91 4.042-8.98 2.152-22.51-13.836-56.823-17.843-83.448-9.761-3.453 1.043-7.1-0.903-8.148-4.35-1.04-3.453 0.907-7.093 4.354-8.143 30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-0.001zm0.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219-1.254-4.14 1.08-8.513 5.221-9.771 29.581-8.98 78.756-7.245 109.83 11.202 3.73 2.209 4.95 7.016 2.74 10.733-2.2 3.722-7.02 4.949-10.73 2.739zm94.56 3.072c-14.46-3.448-17.03-5.868-17.03-10.953 0-4.804 4.52-8.037 11.25-8.037 6.52 0 12.98 2.455 19.76 7.509 0.2 0.153 0.46 0.214 0.71 0.174 0.26-0.038 0.48-0.177 0.63-0.386l7.06-9.952c0.29-0.41 0.21-0.975-0.18-1.288-8.07-6.473-17.15-9.62-27.77-9.62-15.61 0-26.52 9.369-26.52 22.774 0 14.375 9.41 19.465 25.67 23.394 13.83 3.187 16.17 5.857 16.17 10.629 0 5.29-4.72 8.58-12.32 8.58-8.44 0-15.33-2.85-23.03-9.51-0.19-0.17-0.45-0.24-0.69-0.23-0.26 0.02-0.49 0.14-0.65 0.33l-7.92 9.42c-0.33 0.4-0.29 0.98 0.09 1.32 8.96 8 19.98 12.22 31.88 12.22 16.82 0 27.69-9.19 27.69-23.42 0.03-12.007-7.16-18.657-24.77-22.941l-0.03-0.013zm62.86-14.26c-7.29 0-13.27 2.872-18.21 8.757v-6.624c0-0.523-0.42-0.949-0.94-0.949h-12.95c-0.52 0-0.94 0.426-0.94 0.949v73.601c0 0.52 0.42 0.95 0.94 0.95h12.95c0.52 0 0.94-0.43 0.94-0.95v-23.23c4.94 5.53 10.92 8.24 18.21 8.24 13.55 0 27.27-10.43 27.27-30.369 0.02-19.943-13.7-30.376-27.26-30.376l-0.01 0.001zm12.21 30.375c0 10.149-6.25 17.239-15.21 17.239-8.85 0-15.53-7.41-15.53-17.239 0-9.83 6.68-17.238 15.53-17.238 8.81-0.001 15.21 7.247 15.21 17.237v0.001zm50.21-30.375c-17.45 0-31.12 13.436-31.12 30.592 0 16.972 13.58 30.262 30.91 30.262 17.51 0 31.22-13.39 31.22-30.479 0-17.031-13.62-30.373-31.01-30.373v-0.002zm0 47.714c-9.28 0-16.28-7.46-16.28-17.344 0-9.929 6.76-17.134 16.07-17.134 9.34 0 16.38 7.457 16.38 17.351 0 9.927-6.8 17.127-16.17 17.127zm68.27-46.53h-14.25v-14.566c0-0.522-0.42-0.948-0.94-0.948h-12.95c-0.52 0-0.95 0.426-0.95 0.948v14.566h-6.22c-0.52 0-0.94 0.426-0.94 0.949v11.127c0 0.522 0.42 0.949 0.94 0.949h6.22v28.795c0 11.63 5.79 17.53 17.22 17.53 4.64 0 8.49-0.96 12.12-3.02 0.3-0.16 0.48-0.48 0.48-0.82v-10.6c0-0.32-0.17-0.63-0.45-0.8-0.28-0.18-0.63-0.19-0.92-0.04-2.49 1.25-4.9 1.83-7.6 1.83-4.15 0-6.01-1.89-6.01-6.11v-26.76h14.25c0.52 0 0.94-0.426 0.94-0.949v-11.126c0.02-0.523-0.4-0.949-0.93-0.949l-0.01-0.006zm49.64 0.057v-1.789c0-5.263 2.02-7.61 6.54-7.61 2.7 0 4.87 0.536 7.3 1.346 0.3 0.094 0.61 0.047 0.85-0.132 0.25-0.179 0.39-0.466 0.39-0.77v-10.91c0-0.417-0.26-0.786-0.67-0.909-2.56-0.763-5.84-1.546-10.76-1.546-11.95 0-18.28 6.734-18.28 19.467v2.74h-6.22c-0.52 0-0.95 0.426-0.95 0.948v11.184c0 0.522 0.43 0.949 0.95 0.949h6.22v44.405c0 0.53 0.43 0.95 0.95 0.95h12.94c0.53 0 0.95-0.42 0.95-0.95v-44.402h12.09l18.52 44.402c-2.1 4.66-4.17 5.59-6.99 5.59-2.28 0-4.69-0.68-7.14-2.03-0.23-0.12-0.51-0.14-0.75-0.07-0.25 0.09-0.46 0.27-0.56 0.51l-4.39 9.63c-0.21 0.46-0.03 0.99 0.41 1.23 4.58 2.48 8.71 3.54 13.82 3.54 9.56 0 14.85-4.46 19.5-16.44l22.46-58.037c0.12-0.292 0.08-0.622-0.1-0.881-0.17-0.257-0.46-0.412-0.77-0.412h-13.48c-0.41 0-0.77 0.257-0.9 0.636l-13.81 39.434-15.12-39.46c-0.14-0.367-0.49-0.61-0.88-0.61h-22.12v-0.003zm-28.78-0.057h-12.95c-0.52 0-0.95 0.426-0.95 0.949v56.481c0 0.53 0.43 0.95 0.95 0.95h12.95c0.52 0 0.95-0.42 0.95-0.95v-56.477c0-0.523-0.42-0.949-0.95-0.949v-0.004zm-6.4-25.719c-5.13 0-9.29 4.152-9.29 9.281 0 5.132 4.16 9.289 9.29 9.289s9.28-4.157 9.28-9.289c0-5.128-4.16-9.281-9.28-9.281zm113.42 43.88c-5.12 0-9.11-4.115-9.11-9.112s4.04-9.159 9.16-9.159 9.11 4.114 9.11 9.107c0 4.997-4.04 9.164-9.16 9.164zm0.05-17.365c-4.67 0-8.2 3.71-8.2 8.253 0 4.541 3.51 8.201 8.15 8.201 4.67 0 8.2-3.707 8.2-8.253 0-4.541-3.51-8.201-8.15-8.201zm2.02 9.138l2.58 3.608h-2.18l-2.32-3.31h-1.99v3.31h-1.82v-9.564h4.26c2.23 0 3.69 1.137 3.69 3.051 0.01 1.568-0.9 2.526-2.21 2.905h-0.01zm-1.54-4.315h-2.37v3.025h2.37c1.18 0 1.89-0.579 1.89-1.514 0-0.984-0.71-1.511-1.89-1.511z"></path></svg>');function Do(i,t){let a=ke(t,"class",3,"w-6 h-6");var s=jv();Y(()=>ge(s,0,Ze(a()))),m(i,s)}const Fo="https://core.fariz.dev",ri={BASE_URL:"https://api.spotify.com/v1",TOKEN_ENDPOINT:`${Fo}/api/spotify/token`,REFRESH_ENDPOINT:`${Fo}/api/spotify/refresh`,MARKET:"ID"};var Nv=w('<div class="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shadow-lg"><!></div>'),Rv=w('<span class="text-gray-500 mx-1">•</span>'),Bv=w('<span><a target="_blank" rel="noreferrer" class="hover:text-white hover:underline transition-colors duration-200"> </a> <!></span>'),Dv=w('<div class="h-full rounded-full animate-pulse bg-white/20"></div>'),Fv=w('<div class="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg transition-all duration-300"></div>'),Hv=w('<div class="flex items-center gap-1 text-gray-400"><!> <span class="font-medium text-gray-300"> </span></div>'),Ov=w('<span class="text-gray-400 font-medium"> </span>'),zv=w('<div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> <span class="text-green-500 font-medium">LIVE</span>',1),Uv=w('<!> <span class="text-gray-400">PAUSED</span>',1),Gv=w('<div><div class="p-4"><div class="flex items-center gap-4 mb-4"><div class="relative"><a target="_blank" rel="noreferrer" class="block"><img alt="" class="w-16 h-16 rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105 object-cover"/> <!></a></div> <div class="flex-1 min-w-0"><div class="font-bold text-white text-base mb-1 truncate group-hover:text-green-400 transition-colors duration-200"><a target="_blank" rel="noreferrer" class="hover:underline"> </a></div> <div class="text-sm text-gray-300 truncate"></div></div> <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300"><a href="https://open.spotify.com" rel="noreferrer" target="_blank" class="block"><!></a></div></div> <div class="space-y-3"><div class="relative"><div><div><!></div></div> <!></div> <div class="flex items-center justify-between text-xs"><div class="flex items-center gap-2"><!></div> <div class="flex items-center gap-3"><!> <div class="flex items-center gap-1"><!></div></div></div></div></div></div>'),qv=w('<div class="group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-xl border border-gray-800/50 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-gray-600/30"><div class="p-4"><div class="flex items-center gap-4 mb-4"><div class="relative"><div class="w-16 h-16 rounded-lg bg-gray-800 flex items-center justify-center"><div class="w-8 h-8 rounded bg-gray-700 animate-pulse"></div></div> <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center"><!></div></div> <div class="flex-1"><div class="font-bold text-gray-400 text-base mb-1">Not Playing</div> <div class="text-sm text-gray-500">Connect to Spotify to see current track</div></div> <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300"><a href="https://open.spotify.com" rel="noreferrer" target="_blank" class="block"><!></a></div></div> <div class="space-y-3"><div class="h-2 rounded-full bg-gray-800/30 overflow-hidden"><div class="h-full w-0 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full"></div></div> <div class="flex items-center justify-between text-xs"><div class="flex items-center gap-1 text-gray-500"><!> <span>Offline</span></div> <span class="text-gray-500">--:--</span></div></div></div></div>');function Wv(i,t){It(t,!0);let a=x(null),s=x(!1),n=x(!1),c=Le({album_img:null,album_url:null,artists:[],url:null,name:null,percent:0,duration_ms:0,progress_ms:0});const l={name:null,type:null};let v=x(Le({...l})),g=Le(new Set),u=!1;const p=(f,E)=>{if(!u)return-1;const C=window.setTimeout(()=>{g.delete(C),u&&f()},E);return g.add(C),C},k=()=>{u=!1,g.forEach(f=>clearTimeout(f)),g.clear()},y=()=>{if(!c.duration_ms||!c.progress_ms)return"";const f=c.duration_ms-c.progress_ms,E=Math.ceil(f/1e3/60);return E<=0?"":E===1?"1 min left":`${E} min left`},h=()=>{fetch(`${ri.BASE_URL}/me/player/devices`,{method:"GET",headers:new Headers({Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+e(a)})}).then(f=>f.status===200?f.json():!1).then(f=>{if(f.devices.length>=1){const E=f.devices.find(C=>C.is_active);E!==void 0?(e(v).name=E.name,e(v).type=E.type):d(v,{...l},!0)}else d(v,{...l},!0)}).catch(f=>(console.log(f),[]))},_=()=>{fetch(ri.REFRESH_ENDPOINT).then(f=>f.json()).then(f=>{f.data!==null&&(d(a,f.data.access_token,!0),$())}).catch(f=>(console.log(f),[]))},$=()=>{u&&fetch(`${ri.BASE_URL}/me/player/currently-playing?market=${ri.MARKET}`,{method:"GET",headers:new Headers({Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+e(a)})}).then(f=>u?f.status===200?f.json():f.status===401?(_(),null):(p(()=>$(),3e3),null):null).then(f=>{if(!u||!f)return;d(n,f.is_playing,!0);const E=f.item;c.artists=E.artists,c.url=E.external_urls.spotify,c.name=E.name,c.album_img=E?.album?.images[0]?.url,c.album_url=E.album.external_urls.spotify,c.duration_ms=E.duration_ms,c.progress_ms=f.progress_ms,c.percent=f.progress_ms*100/E.duration_ms,d(s,!0),h(),p(()=>$(),1e3)}).catch(f=>{u&&(d(s,!1),console.log(f),p(()=>$(),7e3))})};qr(()=>{u=!0,fetch(ri.TOKEN_ENDPOINT).then(f=>f.json()).then(f=>{u&&f.data!==null&&(d(a,f.data.access_token,!0),$())}).catch(f=>{u&&console.log(f)})}),ad(()=>{k()});var M=Et(),P=gt(M);{var S=f=>{var E=Gv(),C=r(E),H=r(C),z=r(H),rt=r(z),pt=r(rt),lt=o(pt,2);{var mt=ot=>{var kt=Nv(),q=r(kt);K0(q,{class:"w-2.5 h-2.5 text-white"}),m(ot,kt)};O(lt,ot=>{e(n)&&ot(mt)})}var ct=o(z,2),xt=r(ct),Rt=r(xt),Vt=r(Rt),Kt=o(xt,2);fe(Kt,21,()=>c.artists,Mr,(ot,kt,q)=>{let Q=()=>e(kt).external_urls,W=()=>e(kt).name;var A=Bv(),I=r(A),R=r(I),it=o(I,2);{var et=K=>{var U=Rv();m(K,U)};O(it,K=>{q+1!==c.artists.length&&K(et)})}Y(()=>{Dt(I,"href",Q().spotify),b(R,W())}),m(ot,A)});var Qt=o(ct,2),Wt=r(Qt),zt=r(Wt);Do(zt,{class:"h-5 w-auto text-green-500 hover:scale-110 transition-transform duration-200"});var Bt=o(H,2),Lt=r(Bt),Ct=r(Lt),X=r(Ct),_t=r(X);{var ut=ot=>{var kt=Dv();m(ot,kt)};O(_t,ot=>{e(n)&&ot(ut)})}var at=o(Ct,2);{var L=ot=>{var kt=Fv();Y(()=>Ke(kt,`left: calc(${c.percent??""}% - 6px);`)),m(ot,kt)};O(at,ot=>{e(n)&&ot(L)})}var ft=o(Lt,2),vt=r(ft),G=r(vt);{var tt=ot=>{var kt=Hv(),q=r(kt);V0(q,{class:"w-3 h-3 opacity-70"});var Q=o(q,2),W=r(Q);Y(()=>b(W,e(v).name)),m(ot,kt)};O(G,ot=>{e(v).name!==null&&ot(tt)})}var yt=o(vt,2),bt=r(yt);{var wt=ot=>{var kt=Ov(),q=r(kt);Y(Q=>b(q,Q),[y]),m(ot,kt)};O(bt,ot=>{e(n)&&y()&&ot(wt)})}var Ut=o(bt,2),Ot=r(Ut);{var Nt=ot=>{var kt=zv();m(ot,kt)},Pt=ot=>{var kt=Uv(),q=gt(kt);jo(q,{class:"w-3 h-3 text-gray-400"}),m(ot,kt)};O(Ot,ot=>{e(n)?ot(Nt):ot(Pt,!1)})}Y(()=>{ge(E,1,`group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-xl border ${e(n)?"border-green-500/50 shadow-green-500/20":"border-gray-800/50"} overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-green-500/30`),Dt(rt,"href",c.album_url),Dt(pt,"src",c.album_img),Dt(Rt,"href",c.url),b(Vt,c.name),ge(Ct,1,`h-2 rounded-full overflow-hidden ${e(n)?"bg-gray-800":"bg-gray-800/50"}`),ge(X,1,`h-full rounded-full transition-all duration-300 ease-out ${e(n)?"bg-gradient-to-r from-green-500 to-green-400":"bg-gradient-to-r from-gray-400 to-gray-500"}`),Ke(X,`width: ${c.percent??""}%;`)}),m(f,E)},N=f=>{var E=qv(),C=r(E),H=r(C),z=r(H),rt=o(r(z),2),pt=r(rt);gi(pt,{class:"w-3 h-3 text-gray-400"});var lt=o(z,4),mt=r(lt),ct=r(mt);Do(ct,{class:"h-5 w-auto text-gray-400 hover:text-green-500 hover:scale-110 transition-all duration-200"});var xt=o(H,2),Rt=o(r(xt),2),Vt=r(Rt),Kt=r(Vt);jo(Kt,{class:"w-3 h-3"}),m(f,E)};O(P,f=>{e(s)?f(S):f(N,!1)})}m(i,M),jt()}var Jv=ur('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"></path><path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"></path></svg>');function wd(i,t){let a=ke(t,"class",3,"w-6 h-6");var s=Jv();Y(()=>ge(s,0,Ze(a()))),m(i,s)}var Vv=ur('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"></path></svg>');function Yv(i,t){let a=ke(t,"class",3,"w-6 h-6");var s=Vv();Y(()=>ge(s,0,Ze(a()))),m(i,s)}var Kv=ur('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>');function Cd(i,t){let a=ke(t,"class",3,"w-6 h-6");var s=Kv();Y(()=>ge(s,0,Ze(a()))),m(i,s)}var Qv=ur('<svg viewBox="0 -28.5 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid"><g><path d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z" fill="currentColor" fill-rule="nonzero"></path></g></svg>');function Zv(i,t){let a=ke(t,"class",3,"w-6 h-6");var s=Qv();Y(()=>ge(s,0,Ze(a()))),m(i,s)}var Xv=ur('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1333.33 1333.3" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"><path d="M666.66 0C298.48 0 0 298.47 0 666.65c0 368.19 298.48 666.65 666.66 666.65 368.22 0 666.67-298.45 666.67-666.65C1333.33 298.49 1034.88.03 666.65.03l.01-.04zm305.73 961.51c-11.94 19.58-37.57 25.8-57.16 13.77-156.52-95.61-353.57-117.26-585.63-64.24-22.36 5.09-44.65-8.92-49.75-31.29-5.12-22.37 8.84-44.66 31.26-49.75 253.95-58.02 471.78-33.04 647.51 74.35 19.59 12.02 25.8 37.57 13.77 57.16zm81.6-181.52c-15.05 24.45-47.05 32.17-71.49 17.13-179.2-110.15-452.35-142.05-664.31-77.7-27.49 8.3-56.52-7.19-64.86-34.63-8.28-27.49 7.22-56.46 34.66-64.82 242.11-73.46 543.1-37.88 748.89 88.58 24.44 15.05 32.16 47.05 17.12 71.46V780zm7.01-189.02c-214.87-127.62-569.36-139.35-774.5-77.09-32.94 9.99-67.78-8.6-77.76-41.55-9.98-32.96 8.6-67.77 41.56-77.78 235.49-71.49 626.96-57.68 874.34 89.18 29.69 17.59 39.41 55.85 21.81 85.44-17.52 29.63-55.89 39.4-85.42 21.8h-.03z" fill="currentColor" fill-rule="nonzero"></path></svg>');function tg(i,t){let a=ke(t,"class",3,"w-6 h-6");var s=Xv();Y(()=>ge(s,0,Ze(a()))),m(i,s)}const eg=()=>{navigator.clipboard.writeText("me@fariz.dev"),Oe.success("Email copied to clipboard!")};var rg=w('<div class="flex flex-col sm:flex-row items-center gap-4 relative"><div class="group relative"><button class="flex items-center gap-3 pr-4 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 hover:border-amber-300 dark:hover:border-amber-600 h-10"><div class="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 group-hover:bg-amber-200 dark:group-hover:bg-amber-900/50 transition-colors duration-300"><!></div> <span class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">me@fariz.dev</span></button> <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">Click to copy email</div></div> <div class="flex items-center gap-2"><a href="https://github.com/farizink" target="_blank" rel="noreferrer" class="group/social relative"><div class="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-110 hover:border-gray-900 hover:bg-gray-900"><!></div> <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover/social:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">GitHub</div></a> <a href="https://discord.com/users/383164336450830336" target="_blank" rel="noreferrer" class="group/social relative"><div class="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-110 hover:border-indigo-500 hover:bg-indigo-500"><!></div> <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover/social:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">Discord</div></a> <a href="https://open.spotify.com/user/ci98z18wa1ebncapbw5hq350x" target="_blank" rel="noreferrer" class="group/social relative"><div class="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-110 hover:border-green-500 hover:bg-green-500"><!></div> <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover/social:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">Spotify</div></a></div></div>');function ag(i,t){It(t,!0);var a=rg(),s=r(a),n=r(s);n.__click=[eg];var c=r(n),l=r(c);wd(l,{class:"w-5 h-5 text-amber-600 dark:text-amber-400"});var v=o(s,2),g=r(v),u=r(g),p=r(u);Cd(p,{class:"w-5 h-5 text-gray-600 dark:text-gray-400 group-hover/social:text-white transition-colors duration-300"});var k=o(g,2),y=r(k),h=r(y);Zv(h,{class:"w-5 h-5 text-gray-600 dark:text-gray-400 group-hover/social:text-white transition-colors duration-300"});var _=o(k,2),$=r(_),M=r($);tg(M,{class:"w-5 h-5 text-gray-600 dark:text-gray-400 group-hover/social:text-white transition-colors duration-300"}),m(i,a),jt()}ye(["click"]);var ig=(i,t)=>t(),sg=(i,t)=>d(t,!1),og=(i,t)=>i.key==="Escape"&&d(t,!1),ng=(i,t)=>d(t,!1),dg=w('<div class="aspect-[3/4] h-full w-full bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse svelte-et6md"><div class="h-full w-full relative overflow-hidden svelte-et6md"><div class="absolute inset-0 bg-gradient-to-t from-gray-200/50 to-transparent dark:from-gray-600/50 svelte-et6md"></div> <div class="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 svelte-et6md"><div class="h-24 w-24 rounded-full bg-gray-300/50 dark:bg-gray-600/50 animate-pulse svelte-et6md"></div></div></div></div>'),lg=w('<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 svelte-et6md" role="dialog" aria-modal="true" aria-label="Photo modal" tabindex="-1"><div class="relative group animate-in zoom-in duration-300 svelte-et6md" role="document" tabindex="-1"><button class="absolute hover:cursor-pointer -top-3 -right-3 z-10 w-10 h-10 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 transition-all duration-200 shadow-lg hover:scale-110 svelte-et6md" aria-label="Close photo modal"><svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" class="svelte-et6md"><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" class="svelte-et6md"></path></svg></button> <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden max-w-sm md:max-w-md lg:max-w-lg svelte-et6md"><!> <img alt="Fariz"/></div> <div class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl pointer-events-none svelte-et6md"></div></div></div>'),cg=w('<div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center opacity-0 hover:opacity-100 transition-opacity duration-300 svelte-et6md"><p class="text-xs text-gray-400 dark:text-gray-600 italic svelte-et6md">Click my name for a surprise</p></div>'),vg=w(`<main class="min-h-screen flex items-center justify-center px-4 py-8 relative svelte-et6md"><div class="max-w-4xl w-full svelte-et6md"><div class="text-left svelte-et6md"><div class="mb-3 svelte-et6md"><h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight svelte-et6md"><button type="button" class="cursor-text text-left w-full bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 bg-clip-text text-transparent dark:from-white dark:via-blue-200 dark:to-purple-200 dark:text-transparent animate-gradient svelte-et6md">Nizar Alfarizi Akbar</button></h1></div> <div class="mb-6 svelte-et6md"><p class="text-lg md:text-xl text-gray-600 dark:text-gray-400 svelte-et6md">known as <span class="font-bold text-blue-600 dark:text-blue-400 italic svelte-et6md">Fariz</span></p></div> <div class="mb-8 svelte-et6md"><p class="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl svelte-et6md">Software engineer based in Surabaya, Indonesia. Specializing in backend development and
          high-quality web applications. Currently building <span class="italic text-blue-600 dark:text-blue-400 svelte-et6md">"gabut"</span> projects and crushing work tasks 🙂</p></div> <div class="mb-12 svelte-et6md"><!></div> <div class="svelte-et6md"><!></div></div></div> <!> <!></main>`);function gg(i){let t=x(!1),a=x(null),s=x(!1);const n=()=>{const f=[Av,Iv];e(t)||(d(a,f[Math.floor(Math.random()*f.length)],!0),d(s,!0)),d(t,!e(t))},c=()=>{d(s,!1)};var l=vg(),v=r(l),g=r(v),u=r(g),p=r(u),k=r(p);k.__click=[ig,n];var y=o(u,6),h=r(y);ag(h,{});var _=o(y,2),$=r(_);Wv($,{});var M=o(v,2);{var P=f=>{var E=lg();E.__click=[sg,t],E.__keydown=[og,t];var C=r(E),H=r(C);H.__click=[ng,t];var z=o(H,2),rt=r(z);{var pt=mt=>{var ct=dg();m(mt,ct)};O(rt,mt=>{e(s)&&mt(pt)})}var lt=o(rt,2);Y(()=>{Dt(lt,"src",e(a)),ge(lt,1,`w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 ${e(s)?"opacity-0":"opacity-100"}`,"svelte-et6md")}),rd("load",lt,c),m(f,E)};O(M,f=>{e(t)&&e(a)&&f(P)})}var S=o(M,2);{var N=f=>{var E=cg();m(f,E)};O(S,f=>{e(t)||f(N)})}m(i,l)}ye(["click","keydown"]);var ug=w('<div class="card h-full"><div class="animate-pulse"><div class="mb-6"><div class="h-8 bg-[var(--ds-secondary-200)] dark:bg-[var(--ds-secondary-700)] rounded-lg mb-3 w-3/4"></div></div> <div class="space-y-3 mb-6"><div class="h-4 bg-[var(--ds-secondary-100)] dark:bg-[var(--ds-secondary-800)] rounded w-full"></div> <div class="h-4 bg-[var(--ds-secondary-100)] dark:bg-[var(--ds-secondary-800)] rounded w-5/6"></div> <div class="h-4 bg-[var(--ds-secondary-100)] dark:bg-[var(--ds-secondary-800)] rounded w-4/6"></div></div> <div class="flex flex-wrap gap-2 mb-6"><div class="h-6 bg-[var(--ds-secondary-200)] dark:bg-[var(--ds-secondary-700)] rounded-full w-16"></div> <div class="h-6 bg-[var(--ds-secondary-200)] dark:bg-[var(--ds-secondary-700)] rounded-full w-20"></div> <div class="h-6 bg-[var(--ds-secondary-200)] dark:bg-[var(--ds-secondary-700)] rounded-full w-14"></div></div> <div class="flex justify-between items-center pt-6 border-t border-[var(--ds-secondary-200)] dark:border-[var(--ds-secondary-700)]"><div class="flex items-center gap-4"><div class="h-4 bg-[var(--ds-secondary-200)] dark:bg-[var(--ds-secondary-700)] rounded w-16"></div> <div class="h-4 bg-[var(--ds-secondary-200)] dark:bg-[var(--ds-secondary-700)] rounded w-12"></div></div> <div class="h-3 bg-[var(--ds-secondary-200)] dark:bg-[var(--ds-secondary-700)] rounded w-20"></div></div></div></div>'),mg=w('<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"></div>'),pg=w('<div class="card max-w-md mx-auto text-center"><div class="flex flex-col items-center justify-center text-[var(--ds-secondary-600)] dark:text-[var(--ds-secondary-400)]"><p class="mb-6 text-lg"> </p> <button class="btn btn-primary btn-lg">Try Again</button></div></div>'),xg=w('<span class="bg-[var(--ds-primary-50)] dark:bg-[var(--ds-primary-900)]/30 text-[var(--ds-primary-700)] dark:text-[var(--ds-primary-300)] px-3 py-1 rounded-full text-xs font-medium border border-[var(--ds-primary-100)] dark:border-[var(--ds-primary-800)]"> </span>'),fg=w('<span class="text-[var(--ds-secondary-500)] dark:text-[var(--ds-secondary-500)] text-xs px-2 py-1 font-medium"> </span>'),bg=w('<div class="flex flex-wrap gap-2 mb-6 relative z-10"><!> <!></div>'),yg=w('<span class="flex items-center gap-2"><span class="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-white dark:ring-[var(--ds-secondary-800)]"></span> <span class="font-medium"> </span></span>'),hg=w('<span class="flex items-center gap-1.5 group/star"><!> <span class="font-medium"> </span></span>'),_g=w('<span class="flex items-center gap-1.5"><!> <span class="font-medium"> </span></span>'),kg=w('<div class="card card-elevated card-hover group h-full flex flex-col"><div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--ds-primary-500)]/10 to-[var(--ds-primary-600)]/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div> <div class="mb-4 relative z-10"><div class="flex items-start justify-between mb-3"><h3 class="text-xl font-bold tracking-tight"><a target="_blank" rel="noopener noreferrer" class="text-[var(--ds-secondary-900)] dark:text-white hover:text-[var(--ds-primary-600)] dark:hover:text-[var(--ds-primary-400)] transition-colors duration-200 flex items-center gap-2 group/link"><!> <!></a></h3></div></div> <p class="text-[var(--ds-secondary-600)] dark:text-[var(--ds-secondary-400)] mb-6 leading-relaxed flex-grow relative z-10"> </p> <!> <div class="flex justify-between items-center mt-auto pt-6 border-t border-[var(--ds-secondary-200)] dark:border-[var(--ds-secondary-700)] text-sm text-[var(--ds-secondary-500)] dark:text-[var(--ds-secondary-400)] relative z-10"><div class="flex items-center gap-5"><!> <!> <!></div> <span class="text-xs font-medium opacity-70"> </span></div></div>'),wg=w('<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"></div>'),Cg=w(`<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen animate-fade-in"><div class="text-center mb-16"><h1 class="text-4xl md:text-5xl font-bold text-[var(--ds-secondary-900)] dark:text-white mb-6 tracking-tight">Projects</h1> <p class="text-xl text-[var(--ds-secondary-600)] dark:text-[var(--ds-secondary-400)] max-w-2xl mx-auto leading-relaxed">Explore my latest work and open-source contributions on GitHub. From web applications to
      developer tools.</p></div> <!></main>`);function $g(i,t){It(t,!0);let a=x(Le([])),s=x(!1),n=x("");const c={JavaScript:"#f1e05a",TypeScript:"#2b7489",Python:"#3572A5",Java:"#b07219",HTML:"#e34c26",CSS:"#563d7c",PHP:"#4F5D95",Vue:"#4FC08D",Svelte:"#ff3e00",React:"#61dafb",Go:"#00ADD8",Rust:"#dea584","C++":"#f34b7d",C:"#555555"};async function l(){try{d(s,!0),d(n,"");const y=await fetch("https://api.github.com/users/FarizInk/repos?sort=updated&per_page=12",{headers:{Accept:"application/vnd.github.v3+json","User-Agent":"Portfolio-Website"}});if(!y.ok)throw new Error(`Failed to fetch repositories: ${y.status}`);const h=await y.json();d(a,h.filter(_=>!_.fork),!0)}catch(y){console.error("Fetch error:",y),d(n,y instanceof Error?y.message:"An error occurred while fetching repositories",!0)}finally{d(s,!1)}}function v(y){const h=new Date(y),$=Math.abs(new Date().getTime()-h.getTime()),M=Math.ceil($/(1e3*60*60*24));return M===1?"yesterday":M<30?`${M} days ago`:M<365?`${Math.floor(M/30)} months ago`:`${Math.floor(M/365)} years ago`}qr(()=>{l()});var g=Cg(),u=o(r(g),2);{var p=y=>{var h=mg();fe(h,20,()=>Array(6),_=>_,(_,$)=>{var M=ug();m(_,M)}),m(y,h)},k=y=>{var h=Et(),_=gt(h);{var $=P=>{var S=pg(),N=r(S),f=r(N),E=r(f),C=o(f,2);C.__click=l,Y(()=>b(E,`Error: ${e(n)??""}`)),m(P,S)},M=P=>{var S=wg();fe(S,21,()=>e(a),N=>N.id,(N,f)=>{var E=kg(),C=o(r(E),2),H=r(C),z=r(H),rt=r(z),pt=r(rt);G0(pt,{class:"w-5 h-5"});var lt=o(pt),mt=o(lt);O0(mt,{class:"w-4 h-4 opacity-0 group-hover/link:opacity-100 transition-opacity duration-200"});var ct=o(C,2),xt=r(ct),Rt=o(ct,2);{var Vt=at=>{var L=bg(),ft=r(L);fe(ft,16,()=>e(f).topics.slice(0,3),tt=>tt,(tt,yt)=>{var bt=xg(),wt=r(bt);Y(()=>b(wt,yt)),m(tt,bt)});var vt=o(ft,2);{var G=tt=>{var yt=fg(),bt=r(yt);Y(()=>b(bt,`+${e(f).topics.length-3} more`)),m(tt,yt)};O(vt,tt=>{e(f).topics.length>3&&tt(G)})}m(at,L)};O(Rt,at=>{e(f).topics&&e(f).topics.length>0&&at(Vt)})}var Kt=o(Rt,2),Qt=r(Kt),Wt=r(Qt);{var zt=at=>{var L=yg(),ft=r(L),vt=o(ft,2),G=r(vt);Y(()=>{Ke(ft,`background-color: ${c[e(f).language]||"#888"}`),b(G,e(f).language)}),m(at,L)};O(Wt,at=>{e(f).language&&at(zt)})}var Bt=o(Wt,2);{var Lt=at=>{var L=hg(),ft=r(L);lo(ft,{class:"w-4 h-4 text-yellow-500 group-hover/star:fill-current transition-all duration-200"});var vt=o(ft,2),G=r(vt);Y(()=>b(G,e(f).stargazers_count)),m(at,L)};O(Bt,at=>{e(f).stargazers_count>0&&at(Lt)})}var Ct=o(Bt,2);{var X=at=>{var L=_g(),ft=r(L);U0(ft,{class:"w-4 h-4"});var vt=o(ft,2),G=r(vt);Y(()=>b(G,e(f).forks_count)),m(at,L)};O(Ct,at=>{e(f).forks_count>0&&at(X)})}var _t=o(Qt,2),ut=r(_t);Y(at=>{Dt(rt,"href",e(f).html_url),b(lt,` ${e(f).name??""} `),b(xt,e(f).description||"No description available"),b(ut,at)},[()=>v(e(f).updated_at)]),m(N,E)}),m(P,S)};O(_,P=>{e(n)?P($):P(M,!1)},!0)}m(y,h)};O(u,y=>{e(s)?y(p):y(k,!1)})}m(i,g),jt()}ye(["click"]);var Sg=ur(`<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1668.56 1221.19" xml:space="preserve" fill="currentColor"><g transform="translate(52.390088,-25.058597)"><path d="M283.94,167.31l386.39,516.64L281.5,1104h87.51l340.42-367.76L984.48,1104h297.8L874.15,558.3l361.92-390.99
		h-87.51l-313.51,338.7l-253.31-338.7H283.94z M412.63,231.77h136.81l604.13,807.76h-136.81L412.63,231.77z"></path></g></svg>`);function Tg(i,t){let a=ke(t,"class",3,"w-6 h-6");var s=Sg();Y(()=>ge(s,0,Ze(a()))),m(i,s)}const Mg=()=>{navigator.clipboard.writeText("john.doe@example.com"),Oe.success("Email copied to clipboard!")};var Eg=w(`<main class="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8"><div class="max-w-7xl mx-auto"><div class="text-center mb-8"><h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">John Doe</h1> <p class="text-lg text-gray-600 dark:text-gray-400">Full Stack Developer & UI/UX Enthusiast</p></div> <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-auto"><div class="md:col-span-2 md:row-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"><div class="flex items-center gap-3 mb-4"><div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center"><span class="text-white text-xl font-bold">JD</span></div> <div><h2 class="text-xl font-bold text-gray-900 dark:text-white">About Me</h2> <p class="text-sm text-gray-600 dark:text-gray-400">Software Engineer</p></div></div> <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">Passionate full-stack developer with 5+ years of experience building web applications. I
          love creating intuitive user interfaces and solving complex problems with elegant code
          solutions.</p> <div class="flex flex-wrap gap-2"><span class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">JavaScript</span> <span class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm">TypeScript</span> <span class="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm">React</span> <span class="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm">Node.js</span></div></div> <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"><div class="flex items-center gap-3 mb-4"><!> <h3 class="font-semibold text-gray-900 dark:text-white">Contact</h3></div> <button class="btn btn-outline btn-sm">john.doe@example.com</button></div> <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"><div class="flex items-center gap-3 mb-4"><svg class="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> <h3 class="font-semibold text-gray-900 dark:text-white">Location</h3></div> <p class="text-sm text-gray-600 dark:text-gray-400">San Francisco, CA</p></div> <div class="md:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"><div class="flex items-center gap-3 mb-4"><svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg> <h3 class="font-semibold text-gray-900 dark:text-white">Experience</h3></div> <div class="space-y-3"><div class="flex justify-between items-start"><div><p class="font-medium text-gray-900 dark:text-white">Senior Frontend Developer</p> <p class="text-sm text-gray-600 dark:text-gray-400">TechCorp Inc.</p></div> <span class="text-xs text-gray-500 dark:text-gray-500">2021 - Present</span></div> <div class="flex justify-between items-start"><div><p class="font-medium text-gray-900 dark:text-white">Full Stack Developer</p> <p class="text-sm text-gray-600 dark:text-gray-400">StartupXYZ</p></div> <span class="text-xs text-gray-500 dark:text-gray-500">2019 - 2021</span></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"><div class="flex items-center gap-3 mb-4"><svg class="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg> <h3 class="font-semibold text-gray-900 dark:text-white">Education</h3></div> <div class="space-y-2"><p class="font-medium text-gray-900 dark:text-white text-sm">BS Computer Science</p> <p class="text-xs text-gray-600 dark:text-gray-400">Stanford University</p> <p class="text-xs text-gray-500 dark:text-gray-500">2015 - 2019</p></div></div> <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"><div class="flex items-center gap-3 mb-4"><svg class="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg> <h3 class="font-semibold text-gray-900 dark:text-white">Skills</h3></div> <div class="flex flex-wrap gap-1"><span class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">React</span> <span class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">Vue</span> <span class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">Node.js</span> <span class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">Python</span> <span class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">Docker</span></div></div> <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"><div class="flex items-center gap-3 mb-4"><svg class="w-5 h-5 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg> <h3 class="font-semibold text-gray-900 dark:text-white">Hobbies</h3></div> <div class="space-y-2"><div class="flex items-center gap-2"><svg class="w-4 h-4 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg> <span class="text-sm text-gray-600 dark:text-gray-400">Coffee enthusiast</span></div> <div class="flex items-center gap-2"><svg class="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg> <span class="text-sm text-gray-600 dark:text-gray-400">Guitar player</span></div></div></div> <div class="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-white"><div class="flex items-center gap-3 mb-4"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 01.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 01-.806 1.946 3.42 3.42 0 00-3.138 3.138 3.42 3.42 0 01-1.946.806 3.42 3.42 0 00-4.438 0 3.42 3.42 0 01-1.946-.806 3.42 3.42 0 00-3.138-3.138 3.42 3.42 0 01-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 01.806-1.946 3.42 3.42 0 003.138-3.138z"></path></svg> <h3 class="font-semibold">Achievements</h3></div> <div class="space-y-2"><p class="text-sm font-medium">🏆 Best Innovation Award 2023</p> <p class="text-sm font-medium">🌟 1000+ GitHub Stars</p> <p class="text-sm font-medium">📚 Published Tech Author</p></div></div> <div class="md:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"><div class="flex items-center gap-3 mb-4"><h3 class="font-semibold text-gray-900 dark:text-white">Connect With Me</h3></div> <div class="flex gap-4"><a href="https://github.com/farizink" target="_blank" rel="noopener noreferrer" class="p-3 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"><!></a> <a href="https://www.linkedin.com/in/farizink" target="_blank" rel="noopener noreferrer" class="p-3 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"><!></a> <a href="https://x.com/farizink" target="_blank" rel="noopener noreferrer" class="p-3 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"><!></a></div></div> <div class="bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-white"><div class="flex items-center gap-3 mb-4"><div class="w-3 h-3 bg-white rounded-full animate-pulse"></div> <h3 class="font-semibold">Available for Work</h3></div> <p class="text-sm">Open to exciting opportunities and freelance projects!</p></div></div></div></main>`);function Pg(i,t){It(t,!0);var a=Eg(),s=r(a),n=o(r(s),2),c=o(r(n),2),l=r(c),v=r(l);wd(v,{class:"w-5 h-5 text-blue-600 dark:text-blue-400"});var g=o(l,2);g.__click=[Mg];var u=o(c,14),p=o(r(u),2),k=r(p),y=r(k);Cd(y,{class:"w-5 h-5 text-gray-700 dark:text-gray-300"});var h=o(k,2),_=r(h);Yv(_,{class:"w-5 h-5 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"});var $=o(h,2),M=r($);Tg(M,{class:"w-5 h-5 text-gray-700 dark:text-gray-300 hover:text-blue-400 dark:hover:text-blue-300"}),m(i,a),jt()}ye(["click"]);const Lg=[{path:"/",component:gg,title:"Fariz - Software Engineer & Developer Tools Creator",description:"Software engineer passionate about building innovative solutions and developer tools. Explore my projects and free online utilities.",keywords:"fariz, software engineer, developer tools, web development, programming, javascript, typescript, svelte",robots:"index, follow"},{path:"/projects",component:$g,title:"Projects - Fariz",description:"Explore my software development projects and open-source contributions. Building innovative solutions with modern technologies.",keywords:"software projects, web development projects, open source, programming portfolio, github projects",robots:"index, follow"},{path:"/example-bento-profile",component:Pg,title:"Bento Profile Example - Fariz",description:"Modern bento grid layout personal profile example with cards, skills, and contact information.",keywords:"bento grid, profile example, personal portfolio, modern design, responsive layout",robots:"noindex, nofollow"}],ai=[{name:"Text & Data Processing",description:"Tools for working with text and data",tools:[{id:"json-parser",name:"JSON Parser & Formatter",description:"Format, validate, and minify JSON data with ease",icon:xd,features:["Validate JSON","Format with custom indentation","Minify JSON","Copy to clipboard"],comingSoon:!1},{id:"text-case-converter",name:"Text Case Converter",description:"Convert between different text cases",icon:fa,features:["UPPERCASE","lowercase","Title Case","camelCase","snake_case","kebab-case"],comingSoon:!1},{id:"lorem-ipsum-generator",name:"Lorem Ipsum Generator",description:"Generate placeholder text for design and testing",icon:He,features:["Multiple variations","Custom length","Paragraphs","Sentences","Words"],comingSoon:!1},{id:"character-counter",name:"Character Counter",description:"Count characters, words, and analyze text",icon:Rr,features:["Character count","Word count","Reading time","Sentences","Paragraphs"],comingSoon:!1},{id:"text-diff",name:"Text Diff Tool",description:"Compare two text blocks and highlight differences",icon:Ga,features:["Side by side comparison","Highlight differences","Merge suggestions"],comingSoon:!1},{id:"url-parser",name:"URL Parser/Analyzer",description:"Parse URLs and extract components",icon:is,features:["Protocol extraction","Domain parsing","Query parameters","Hash fragments"],comingSoon:!1},{id:"hash-generator",name:"Hash Generator",description:"Generate various hash values from text",icon:Zr,features:["MD5","SHA1","SHA256","SHA512"],comingSoon:!1},{id:"base64-converter",name:"Base64 Converter",description:"Encode and decode Base64 strings",icon:Zr,features:["Text encoding","File encoding","Batch processing","Download support"],comingSoon:!1}]},{name:"Generators & Converters",description:"Create and transform various content",tools:[{id:"qr-code-generator",name:"QR Code Generator",description:"Generate custom QR codes for URLs, text, or any data",icon:Os,features:["Custom colors","Error correction levels","Logo upload","Multiple formats"],comingSoon:!1},{id:"color-converter",name:"Color Converter",description:"Convert between different color formats",icon:Kr,features:["HEX","RGB","HSL","HSV","CMYK"],comingSoon:!1},{id:"gradient-generator",name:"CSS Gradient Generator",description:"Create beautiful CSS gradients",icon:Kr,features:["Linear gradients","Radial gradients","Color stops","CSS output"],comingSoon:!1},{id:"color-palette",name:"Color Palette Generator",description:"Generate color palettes for your projects",icon:Kr,features:["Complementary colors","Analogous colors","Export options"],comingSoon:!1},{id:"password-generator",name:"Password Generator",description:"Generate secure and random passwords",icon:Hs,features:["Custom length","Character options","Strength indicator","History"],comingSoon:!1},{id:"slug-generator",name:"Slug Generator",description:"Generate URL-friendly slugs from text",icon:is,features:["Multiple formats","Custom separators","Lowercase options"],comingSoon:!1},{id:"timestamp-converter",name:"Timestamp Converter",description:"Convert between different timestamp formats",icon:Er,features:["Unix timestamp","ISO format","Human readable","Multiple timezones"],comingSoon:!1}]},{name:"Web Development",description:"Essential tools for web developers",tools:[{id:"url-encoder",name:"URL Encoder/Decoder",description:"Encode and decode URLs for safe transmission",icon:is,features:["URL encoding","URL decoding","Batch processing","Copy to clipboard"],comingSoon:!1},{id:"html-encoder",name:"HTML Encoder/Decoder",description:"Encode and decode HTML entities",icon:He,features:["HTML encoding","HTML decoding","Character escaping","Safe for XSS"],comingSoon:!1},{id:"css-minifier",name:"CSS Minifier",description:"Minify and optimize CSS code",icon:He,features:["Remove whitespace","Optimize properties","Compress output","Before/after comparison"],comingSoon:!1},{id:"js-minifier",name:"JavaScript Minifier",description:"Minify and optimize JavaScript code",icon:He,features:["Remove comments","Variable renaming","Dead code elimination","Compression"],comingSoon:!1},{id:"css-shadow-generator",name:"CSS Shadow Generator",description:"Generate CSS box shadows with visual preview",icon:Kr,features:["Multiple shadows","Inset/outset","Color picker","CSS output"],comingSoon:!1},{id:"meta-tag-generator",name:"Meta Tag Generator",description:"Generate SEO-friendly meta tags",icon:He,features:["Open Graph","Twitter Cards","JSON-LD structured data","Preview"],comingSoon:!1}]},{name:"Utilities & Calculators",description:"Helpful tools for everyday tasks",tools:[{id:"age-calculator",name:"Age Calculator",description:"Calculate exact age and time between dates",icon:Va,features:["Exact age calculation","Birthday countdown","Zodiac signs","Fun facts"],comingSoon:!1},{id:"bmi-calculator",name:"BMI Calculator",description:"Calculate Body Mass Index and health metrics",icon:Rr,features:["BMI calculation","Weight categories","Health tips","Metric/imperial units"],comingSoon:!1},{id:"percentage-calculator",name:"Percentage Calculator",description:"Calculate percentages and related values",icon:Rr,features:["Percentage of","Percentage increase/decrease","Reverse percentage","Step-by-step"],comingSoon:!1},{id:"tip-calculator",name:"Tip Calculator",description:"Calculate tips and split bills",icon:Rr,features:["Tip calculation","Bill splitting","Tax inclusion","Custom percentages"],comingSoon:!1},{id:"unit-converter",name:"Unit Converter",description:"Convert between different units of measurement",icon:Er,features:["Length","Weight","Temperature","Area","Volume"],comingSoon:!1},{id:"random-picker",name:"Random Picker",description:"Randomly pick items from a list",icon:Ve,features:["Fair randomization","Multiple selections","Import/export lists","History"],comingSoon:!1},{id:"hash-comparer",name:"Hash Comparer",description:"Compare hash values to verify integrity",icon:Zr,features:["Multiple hash types","File support","Integrity checking","Bulk comparison"],comingSoon:!1},{id:"jwt-decoder",name:"JWT Decoder",description:"Decode and validate JWT tokens",icon:Hs,features:["Header parsing","Payload decoding","Signature validation","Pretty printing"],comingSoon:!1},{id:"cron-generator",name:"Cron Expression Generator",description:"Generate and validate cron expressions",icon:Er,features:["Visual builder","Next run times","Expression validation","Common presets"],comingSoon:!1},{id:"ascii-art-generator",name:"ASCII Art Generator",description:"Create ASCII art from text and images",icon:He,features:["Text to ASCII","Image to ASCII","Multiple fonts","Custom styles"],comingSoon:!1},{id:"markdown-preview",name:"Markdown Preview",description:"Preview and export Markdown documents",icon:He,features:["Live preview","Export options","Syntax highlighting","Custom themes"],comingSoon:!1}]}];var Ag=w('<meta name="description" content="A collection of useful developer tools including JSON formatter, color converter, password generator, and more."/>'),Ig=(i,t,a)=>d(t,e(a),!0),jg=w('<button> <span class="badge badge-primary ml-1"> </span></button>'),Ng=(i,t,a)=>t(e(a).id),Rg=(i,t,a)=>t(i,e(a).id),Bg=w('<span class="badge badge-warning">Coming Soon</span>'),Dg=w('<span class="badge"> </span>'),Fg=w('<span class="badge"> </span>'),Hg=w('<button class="w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:ring-inset group" tabindex="0"><div class="flex items-center justify-between"><div class="flex items-center space-x-3"><div class="w-10 h-10 bg-gradient-to-br from-[var(--ds-primary-400)] to-[var(--ds-primary-600)] dark:from-[var(--ds-primary-500)] dark:to-[var(--ds-primary-700)] rounded-lg flex items-center justify-center flex-shrink-0"><!></div> <div class="flex-1 min-w-0"><div class="flex items-center gap-2"><h3 class="font-semibold text-gray-900 dark:text-white group-hover:text-[var(--ds-primary-600)] dark:group-hover:text-[var(--ds-primary-400)] transition-colors"> </h3> <div class="badge badge-primary text-xs font-bold"> </div> <!></div> <p class="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-1 svelte-n22gmb"> </p></div></div> <!></div> <div class="flex flex-wrap gap-1 mt-3 ml-[3.5rem]"><!> <!></div></button>'),Og=w('<div class="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="text-gray-400 mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">No tools found</h3> <p class="text-gray-600 dark:text-gray-400">Try adjusting your search terms or browse all categories.</p></div>'),zg=w('<div class="container mx-auto px-4 py-6 max-w-4xl"><div class="text-center mb-8"><h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Developer Tools</h1> <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Essential tools for developers, designers, and power users.</p></div> <div class="max-w-md mx-auto mb-6"><div class="relative"><!> <input type="text" placeholder="Search tools..." class="input w-full !pl-10 text-sm"/></div></div> <div class="flex flex-wrap justify-center gap-1 mb-6"></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700"></div> <!></div>');function Ug(i,t){It(t,!0);let a=x(""),s=x("All");const n=["All",...ai.map(S=>S.name)],c=ue(()=>{let S=ai.flatMap(N=>N.tools);if(e(s)!=="All"&&(S=ai.find(N=>N.name===e(s))?.tools||[]),e(a).trim()){const N=e(a).toLowerCase();S=S.filter(f=>f.name.toLowerCase().includes(N)||f.description.toLowerCase().includes(N)||f.features.some(E=>E.toLowerCase().includes(N)))}return S}),l=S=>S==="All"?ai.flatMap(N=>N.tools).length:ai.find(N=>N.name===S)?.tools.length||0;function v(S){Ee(`/tools/${S}`)}function g(S,N){(S.key==="Enter"||S.key===" ")&&(S.preventDefault(),v(N))}var u=zg();Lr(S=>{var N=Ag();kr.title="Developer Tools - Collection of Useful Tools",m(S,N)});var p=o(r(u),2),k=r(p),y=r(k);zs(y,{class:"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"});var h=o(y,2),_=o(p,2);fe(_,21,()=>n,Mr,(S,N)=>{var f=jg();f.__click=[Ig,s,N];var E=r(f),C=o(E),H=r(C);Y(z=>{ge(f,1,`btn btn-sm ${e(s)===e(N)?"btn-primary":"btn-secondary"}`),b(E,`${e(N)??""} `),b(H,z)},[()=>l(e(N))]),m(S,f)});var $=o(_,2);fe($,23,()=>e(c),S=>S.id,(S,N,f)=>{var E=Hg();E.__click=[Ng,v,N],E.__keydown=[Rg,g,N];var C=r(E),H=r(C),z=r(H),rt=r(z);nr(rt,()=>e(N).icon,(_t,ut)=>{ut(_t,{class:"w-5 h-5 text-white"})});var pt=o(z,2),lt=r(pt),mt=r(lt),ct=r(mt),xt=o(mt,2),Rt=r(xt),Vt=o(xt,2);{var Kt=_t=>{var ut=Bg();m(_t,ut)};O(Vt,_t=>{e(N).comingSoon&&_t(Kt)})}var Qt=o(lt,2),Wt=r(Qt),zt=o(H,2);F0(zt,{class:"w-5 h-5 text-gray-400 group-hover:text-[var(--ds-primary-600)] dark:group-hover:text-[var(--ds-primary-400)] transition-colors flex-shrink-0 ml-3"});var Bt=o(C,2),Lt=r(Bt);fe(Lt,17,()=>e(N).features.slice(0,4),Mr,(_t,ut)=>{var at=Dg(),L=r(at);Y(()=>b(L,e(ut))),m(_t,at)});var Ct=o(Lt,2);{var X=_t=>{var ut=Fg(),at=r(ut);Y(()=>b(at,`+${e(N).features.length-4}`)),m(_t,ut)};O(Ct,_t=>{e(N).features.length>4&&_t(X)})}Y(()=>{Dt(E,"aria-label",`Open ${e(N).name??""}`),b(ct,e(N).name),b(Rt,e(f)+1),b(Wt,e(N).description)}),m(S,E)});var M=o($,2);{var P=S=>{var N=Og(),f=r(N),E=r(f);zs(E,{class:"w-12 h-12 mx-auto"}),m(S,N)};O(M,S=>{e(c).length===0&&S(P)})}Tt(h,()=>e(a),S=>d(a,S)),m(i,u),jt()}ye(["click","keydown"]);function Gg(i,t,a,s){try{if(!e(t).trim()){d(a,"Please enter some JSON to format");return}const n=JSON.parse(e(t));d(s,JSON.stringify(n,null,2),!0),d(a,""),Oe.success("JSON formatted successfully")}catch(n){d(a,n.message,!0),Oe.error("Invalid JSON")}}function qg(i,t,a,s){try{if(!e(t).trim()){d(a,"Please enter some JSON to minify");return}const n=JSON.parse(e(t));d(s,JSON.stringify(n),!0),d(a,""),Oe.success("JSON minified successfully")}catch(n){d(a,n.message,!0),Oe.error("Invalid JSON")}}function Wg(i,t){e(t)&&(navigator.clipboard.writeText(e(t)),Oe.success("Copied to clipboard"))}function Jg(i,t,a,s){d(t,""),d(a,""),d(s,""),Oe.success("Cleared all content")}function Vg(i,t,a,s){d(t,JSON.stringify({name:"FarizInk",role:"Developer",skills:["Svelte","TypeScript","Tailwind"],active:!0,projects:{total:42,featured:["Portfolio","Tools"]}},null,2),!0),d(a,""),d(s,"")}function Yg(){Ee("/tools")}var Kg=w('<div class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-2"><!> <p class="text-sm text-red-700 dark:text-red-300"> </p></div>'),Qg=w('<div class="max-w-6xl mx-auto p-6 animate-fade-in"><div class="mb-8"><div class="flex items-center gap-4 mb-6"><button class="btn btn-primary"><!> Back to Tools</button></div> <div class="text-center mb-12"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--ds-success-400)] to-[var(--ds-success-600)] rounded-2xl mb-6 shadow-lg animate-scale-in"><!></div> <h1 class="text-4xl md:text-5xl font-bold text-[var(--ds-secondary-900)] dark:text-white mb-4 tracking-tight">JSON Parser</h1> <p class="text-xl text-[var(--ds-secondary-600)] dark:text-[var(--ds-secondary-400)] max-w-2xl mx-auto leading-relaxed">Parse, validate, format, and minify JSON data with syntax highlighting and error detection.</p></div></div> <div class="mb-8 flex flex-wrap gap-2 items-center justify-center"><button class="btn btn-primary btn-sm">Load Sample</button> <button class="btn btn-primary btn-sm text-red-500 hover:text-red-600"><!> Clear</button></div> <div class="mb-16"><div class="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full"><div class="flex flex-col gap-4"><div class="flex items-center justify-between"><h3 class="text-sm font-medium text-[var(--ds-secondary-700)] dark:text-[var(--ds-secondary-300)]">Input JSON</h3> <div class="flex gap-2"><button class="btn btn-primary btn-sm">Format</button> <button class="btn btn-secondary btn-sm">Minify</button></div></div> <textarea placeholder="Paste your JSON here..." class="textarea font-mono text-sm h-[400px] lg:h-[600px]"></textarea> <!></div> <div class="flex flex-col gap-4"><div class="flex items-center justify-between"><h3 class="text-sm font-medium text-[var(--ds-secondary-700)] dark:text-[var(--ds-secondary-300)]">Output</h3> <button class="btn btn-outline btn-sm"><!> Copy</button></div> <div class="relative h-[400px] lg:h-[600px]"><textarea readonly="" class="textarea font-mono text-sm h-full" placeholder="Result will appear here..."></textarea></div></div></div></div> <div class="grid grid-cols-1 md:grid-cols-3 gap-6"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><div class="w-12 h-12 bg-[var(--ds-success-100)] dark:bg-[var(--ds-success-900)/20] rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Validation</h3> <p class="text-gray-600 dark:text-gray-400">Instantly validates your JSON and provides helpful error messages for invalid syntax.</p></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><div class="w-12 h-12 bg-[var(--ds-success-100)] dark:bg-[var(--ds-success-900)/20] rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Formatting</h3> <p class="text-gray-600 dark:text-gray-400">Beautify minified JSON with proper indentation or minify it for production use.</p></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><div class="w-12 h-12 bg-[var(--ds-success-100)] dark:bg-[var(--ds-success-900)/20] rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Privacy</h3> <p class="text-gray-600 dark:text-gray-400">All processing happens in your browser. No data is sent to any server.</p></div></div></div>');function Zg(i,t){It(t,!0);let a=x(""),s=x(""),n=x("");var c=Qg(),l=r(c),v=r(l),g=r(v);g.__click=[Yg];var u=r(g);Ie(u,{class:"w-5 h-5 mr-2"});var p=o(v,2),k=r(p),y=r(k);xd(y,{class:"w-10 h-10 text-white"});var h=o(l,2),_=r(h);_.__click=[Vg,a,n,s];var $=o(_,2);$.__click=[Jg,a,s,n];var M=r($);qi(M,{class:"w-4 h-4 mr-2"});var P=o(h,2),S=r(P),N=r(S),f=r(N),E=o(r(f),2),C=r(E);C.__click=[Gg,a,n,s];var H=o(C,2);H.__click=[qg,a,n,s];var z=o(f,2),rt=o(z,2);{var pt=at=>{var L=Kg(),ft=r(L);oo(ft,{class:"w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5"});var vt=o(ft,2),G=r(vt);Y(()=>b(G,e(n))),m(at,L)};O(rt,at=>{e(n)&&at(pt)})}var lt=o(N,2),mt=r(lt),ct=o(r(mt),2);ct.__click=[Wg,s];var xt=r(ct);be(xt,{class:"w-4 h-4 mr-2"});var Rt=o(mt,2),Vt=r(Rt),Kt=o(P,2),Qt=r(Kt),Wt=r(Qt),zt=r(Wt);ma(zt,{class:"w-6 h-6 text-[var(--ds-success-600)] dark:text-[var(--ds-success-400)]"});var Bt=o(Qt,2),Lt=r(Bt),Ct=r(Lt);ma(Ct,{class:"w-6 h-6 text-[var(--ds-success-600)] dark:text-[var(--ds-success-400)]"});var X=o(Bt,2),_t=r(X),ut=r(_t);ma(ut,{class:"w-6 h-6 text-[var(--ds-success-600)] dark:text-[var(--ds-success-400)]"}),Y(()=>{C.disabled=!e(a),H.disabled=!e(a),ct.disabled=!e(s),cd(Vt,e(s))}),Tt(z,()=>e(a),at=>d(a,at)),m(i,c),jt()}ye(["click"]);function Ho(i,t,a,s,n,c,l,v,g,u,p){const k=t(e(a).h,e(a).s,e(a).l);d(s,k,!0),d(n,c(k.r,k.g,k.b),!0),d(l,v(k.r,k.g,k.b),!0),d(g,u(k.r,k.g,k.b),!0),p(e(n),"HSL")}function Xg(i,t,a){const s=Math.floor(Math.random()*256),n=Math.floor(Math.random()*256),c=Math.floor(Math.random()*256);d(t,{r:s,g:n,b:c},!0),a(),Oe.success("Generated random color")}function tu(){Ee("/tools")}var eu=w('<div class="flex flex-col items-center justify-center h-48 text-gray-500 dark:text-gray-400"><!> <p>No colors yet. Start converting!</p></div>'),ru=(i,t,a,s)=>{d(t,e(a).color,!0),s()},au=w('<div class="group relative"><button type="button" class="w-full h-12 rounded-lg cursor-pointer border-2 border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-400 transition-colors"></button> <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10"> </div></div>'),iu=w('<div class="grid grid-cols-5 gap-2"></div>'),su=(i,t,a)=>t(e(a),"HEX"),ou=w('<div class="flex items-center gap-2"><label class="w-8 text-sm font-medium text-gray-700 dark:text-gray-300 uppercase"> </label> <input type="range" min="0" max="255" class="flex-1 accent-[var(--ds-primary-500)]"/> <input type="number" min="0" max="255" class="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"/></div>'),nu=(i,t,a)=>t(`rgb(${e(a).r}, ${e(a).g}, ${e(a).b})`,"RGB"),du=w('<div class="flex items-center gap-2"><label class="w-8 text-sm font-medium text-gray-700 dark:text-gray-300 uppercase"> </label> <input type="range" min="0" class="flex-1 accent-[var(--ds-primary-500)]"/> <input type="number" min="0" class="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"/></div>'),lu=(i,t,a)=>t(`hsl(${e(a).h}, ${e(a).s}%, ${e(a).l}%)`,"HSL"),cu=(i,t,a)=>t(`hsv(${e(a).h}, ${e(a).s}%, ${e(a).v}%)`,"HSV"),vu=w('<div class="flex justify-between text-sm"><span class="text-gray-600 dark:text-gray-400 uppercase"> </span> <span class="font-mono text-gray-900 dark:text-white"> </span></div>'),gu=(i,t,a)=>t(`cmyk(${e(a).c}%, ${e(a).m}%, ${e(a).y}%, ${e(a).k}%)`,"CMYK"),uu=w('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="btn btn-primary"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--ds-primary-400)] to-[var(--ds-primary-600)] rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Color Converter</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Convert between different color formats instantly. Perfect for designers and developers.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Color Converter</li></ol></nav> <div class="mb-6 flex justify-center"><button class="btn btn-primary btn-sm"><!> Random Color</button></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-8"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Color Preview</h2> <div class="w-full h-48 rounded-xl shadow-inner mb-4 transition-colors duration-300"></div> <div class="grid grid-cols-2 gap-4 text-sm"><div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><span class="text-gray-600 dark:text-gray-400">HEX:</span> <span class="font-mono text-gray-900 dark:text-white ml-2"> </span></div> <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><span class="text-gray-600 dark:text-gray-400">RGB:</span> <span class="font-mono text-gray-900 dark:text-white ml-2"> </span></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Colors</h2> <!></div></div> <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-8"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">HEX</h3> <div class="flex gap-2"><input class="input font-mono" placeholder="#000000"/> <button class="btn btn-secondary btn-sm"><!></button></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">RGB</h3> <div class="space-y-3"><!> <button class="btn btn-secondary w-full mt-2">Copy RGB</button></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">HSL</h3> <div class="space-y-3"><!> <button class="btn btn-secondary w-full mt-2">Copy HSL</button></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">HSV</h3> <div class="space-y-2"><div class="flex justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Hue:</span> <span class="font-mono text-gray-900 dark:text-white"> </span></div> <div class="flex justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Saturation:</span> <span class="font-mono text-gray-900 dark:text-white"> </span></div> <div class="flex justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Value:</span> <span class="font-mono text-gray-900 dark:text-white"> </span></div> <button class="btn btn-secondary w-full mt-4">Copy HSV</button></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">CMYK</h3> <div class="space-y-2"><!> <button class="btn btn-secondary w-full mt-4">Copy CMYK</button></div></div></div> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"><div class="flex items-center gap-2 mb-2 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"><!> <h3 class="font-medium">Multiple Formats</h3></div> <p class="text-sm text-gray-600 dark:text-gray-400">Support for HEX, RGB, HSL, HSV, and CMYK color formats</p></div> <div class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"><div class="flex items-center gap-2 mb-2 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"><!> <h3 class="font-medium">Live Conversion</h3></div> <p class="text-sm text-gray-600 dark:text-gray-400">Real-time color conversion as you type or adjust sliders</p></div> <div class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"><div class="flex items-center gap-2 mb-2 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"><!> <h3 class="font-medium">Color History</h3></div> <p class="text-sm text-gray-600 dark:text-gray-400">Keep track of your recently used colors for quick access</p></div></div></div>');function mu(i,t){It(t,!0);let a=x("#3B82F6"),s=x(Le({r:59,g:130,b:246})),n=x(Le({h:217,s:91,l:60})),c=x(Le({h:217,s:76,v:96})),l=x(Le({c:76,m:47,y:0,k:4})),v=x(Le([]));function g(st){const ht=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(st);return ht?{r:parseInt(ht[1],16),g:parseInt(ht[2],16),b:parseInt(ht[3],16)}:null}function u(st,ht,At){return"#"+((1<<24)+(st<<16)+(ht<<8)+At).toString(16).slice(1).toUpperCase()}function p(st,ht,At){st/=255,ht/=255,At/=255;const Jt=Math.max(st,ht,At),Xt=Math.min(st,ht,At);let Yt=0,ee=0,le=(Jt+Xt)/2;if(Jt!==Xt){const Gt=Jt-Xt;switch(ee=le>.5?Gt/(2-Jt-Xt):Gt/(Jt+Xt),Jt){case st:Yt=((ht-At)/Gt+(ht<At?6:0))/6;break;case ht:Yt=((At-st)/Gt+2)/6;break;case At:Yt=((st-ht)/Gt+4)/6;break}}return{h:Math.round(Yt*360),s:Math.round(ee*100),l:Math.round(le*100)}}function k(st,ht,At){st/=360,ht/=100,At/=100;let Jt,Xt,Yt;if(ht===0)Jt=Xt=Yt=At;else{const ee=(de,ce,ae)=>(ae<0&&(ae+=1),ae>1&&(ae-=1),ae<.16666666666666666?de+(ce-de)*6*ae:ae<.5?ce:ae<.6666666666666666?de+(ce-de)*(.6666666666666666-ae)*6:de),le=At<.5?At*(1+ht):At+ht-At*ht,Gt=2*At-le;Jt=ee(Gt,le,st+1/3),Xt=ee(Gt,le,st),Yt=ee(Gt,le,st-1/3)}return{r:Math.round(Jt*255),g:Math.round(Xt*255),b:Math.round(Yt*255)}}function y(st,ht,At){st/=255,ht/=255,At/=255;const Jt=Math.max(st,ht,At),Xt=Math.min(st,ht,At);let Yt=0,ee=0,le=Jt;const Gt=Jt-Xt;if(ee=Jt===0?0:Gt/Jt,Jt!==Xt)switch(Jt){case st:Yt=((ht-At)/Gt+(ht<At?6:0))/6;break;case ht:Yt=((At-st)/Gt+2)/6;break;case At:Yt=((st-ht)/Gt+4)/6;break}return{h:Math.round(Yt*360),s:Math.round(ee*100),v:Math.round(le*100)}}function h(st,ht,At){let Jt=1-st/255,Xt=1-ht/255,Yt=1-At/255,ee=Math.min(Jt,Math.min(Xt,Yt));return ee===1?Jt=Xt=Yt=0:(Jt=(Jt-ee)/(1-ee),Xt=(Xt-ee)/(1-ee),Yt=(Yt-ee)/(1-ee)),{c:Math.round(Jt*100),m:Math.round(Xt*100),y:Math.round(Yt*100),k:Math.round(ee*100)}}function _(){const st=g(e(a));st&&(d(s,st,!0),d(n,p(st.r,st.g,st.b),!0),d(c,y(st.r,st.g,st.b),!0),d(l,h(st.r,st.g,st.b),!0),P(e(a),"HEX"))}function $(){d(a,u(e(s).r,e(s).g,e(s).b),!0),d(n,p(e(s).r,e(s).g,e(s).b),!0),d(c,y(e(s).r,e(s).g,e(s).b),!0),d(l,h(e(s).r,e(s).g,e(s).b),!0),P(e(a),"RGB")}function M(st,ht){navigator.clipboard.writeText(st),Oe.success(`Copied ${ht} value`)}function P(st,ht){e(v).length>0&&e(v)[0].color===st||(e(v).unshift({color:st,format:ht,timestamp:new Date}),e(v).length>10&&d(v,e(v).slice(0,10),!0))}var S=uu(),N=r(S),f=r(N),E=r(f);E.__click=[tu];var C=r(E);Ie(C,{class:"w-5 h-5 mr-2"});var H=o(f,2),z=r(H),rt=r(z);Kr(rt,{class:"w-10 h-10 text-white"});var pt=o(N,4),lt=r(pt);lt.__click=[Xg,s,$];var mt=r(lt);Er(mt,{class:"w-4 h-4 mr-2"});var ct=o(pt,2),xt=r(ct),Rt=o(r(xt),2),Vt=o(Rt,2),Kt=r(Vt),Qt=o(r(Kt),2),Wt=r(Qt),zt=o(Kt,2),Bt=o(r(zt),2),Lt=r(Bt),Ct=o(xt,2),X=o(r(Ct),2);{var _t=st=>{var ht=eu(),At=r(ht);Ka(At,{class:"w-8 h-8 mb-2 opacity-50"}),m(st,ht)},ut=st=>{var ht=iu();fe(ht,21,()=>e(v),At=>At.timestamp.getTime(),(At,Jt)=>{var Xt=au(),Yt=r(Xt);Yt.__click=[ru,a,Jt,_];var ee=o(Yt,2),le=r(ee);Y(()=>{Ke(Yt,`background-color: ${e(Jt).color??""}`),Dt(Yt,"aria-label",`Select color ${e(Jt).color}`),b(le,e(Jt).color)}),m(At,Xt)}),m(st,ht)};O(X,st=>{e(v).length===0?st(_t):st(ut,!1)})}var at=o(ct,2),L=r(at),ft=o(r(L),2),vt=r(ft);vt.__input=_;var G=o(vt,2);G.__click=[su,M,a];var tt=r(G);be(tt,{class:"w-4 h-4"});var yt=o(L,2),bt=o(r(yt),2),wt=r(bt);fe(wt,16,()=>["r","g","b"],Mr,(st,ht)=>{var At=ou(),Jt=r(At),Xt=r(Jt),Yt=o(Jt,2);Yt.__input=$;var ee=o(Yt,2);ee.__input=$,Y(()=>{Dt(Jt,"for",`rgb-${ht}`),b(Xt,`${ht??""}:`),Dt(Yt,"id",`rgb-${ht}`)}),Tt(Yt,()=>e(s)[ht],le=>e(s)[ht]=le),Tt(ee,()=>e(s)[ht],le=>e(s)[ht]=le),m(st,At)});var Ut=o(wt,2);Ut.__click=[nu,M,s];var Ot=o(yt,2),Nt=o(r(Ot),2),Pt=r(Nt);fe(Pt,16,()=>["h","s","l"],Mr,(st,ht)=>{var At=du(),Jt=r(At),Xt=r(Jt),Yt=o(Jt,2);Yt.__input=[Ho,k,n,s,a,u,c,y,l,h,P];var ee=o(Yt,2);ee.__input=[Ho,k,n,s,a,u,c,y,l,h,P],Y(()=>{Dt(Jt,"for",`hsl-${ht}`),b(Xt,`${ht??""}:`),Dt(Yt,"id",`hsl-${ht}`),Dt(Yt,"max",ht==="h"?360:100),Dt(ee,"max",ht==="h"?360:100)}),Tt(Yt,()=>e(n)[ht],le=>e(n)[ht]=le),Tt(ee,()=>e(n)[ht],le=>e(n)[ht]=le),m(st,At)});var ot=o(Pt,2);ot.__click=[lu,M,n];var kt=o(Ot,2),q=o(r(kt),2),Q=r(q),W=o(r(Q),2),A=r(W),I=o(Q,2),R=o(r(I),2),it=r(R),et=o(I,2),K=o(r(et),2),U=r(K),B=o(et,2);B.__click=[cu,M,c];var T=o(kt,2),D=o(r(T),2),F=r(D);fe(F,16,()=>["c","m","y","k"],Mr,(st,ht)=>{var At=vu(),Jt=r(At),Xt=r(Jt),Yt=o(Jt,2),ee=r(Yt);Y(()=>{b(Xt,`${(ht==="k"?"Key (Black)":ht)??""}:`),b(ee,`${e(l)[ht]??""}%`)}),m(st,At)});var Z=o(F,2);Z.__click=[gu,M,l];var j=o(at,2),nt=r(j),Mt=r(nt),qt=r(Mt);Kr(qt,{class:"w-5 h-5"});var St=o(nt,2),J=r(St),dt=r(J);Ve(dt,{class:"w-5 h-5"});var $t=o(St,2),Ft=r($t),V=r(Ft);Ka(V,{class:"w-5 h-5"}),Y(()=>{Ke(Rt,`background-color: ${e(a)??""}`),b(Wt,e(a)),b(Lt,`${e(s).r??""}, ${e(s).g??""}, ${e(s).b??""}`),b(A,`${e(c).h??""}°`),b(it,`${e(c).s??""}%`),b(U,`${e(c).v??""}%`)}),Tt(vt,()=>e(a),st=>d(a,st)),m(i,S),jt()}ye(["click","input"]);function pu(i,t,a,s){try{d(t,decodeURIComponent(e(a)),!0),d(s,encodeURIComponent(e(t)),!0)}catch{d(t,"Error: Invalid URL encoding"),d(s,"")}}function xu(i,t,a){try{const s=e(t).split(`
`).filter(n=>n.trim());d(a,s.map(n=>{try{const c=encodeURIComponent(n),l=decodeURIComponent(c);return{original:n,encoded:c,decoded:l}}catch{return{original:n,encoded:"Error: Invalid characters",decoded:"Error: Invalid characters"}}}),!0)}catch{d(a,[],!0)}}function fu(i,t,a,s,n,c){d(t,""),d(a,""),d(s,""),d(n,""),d(c,[],!0)}function bu(i,t,a){const s=e(t).map(n=>`Original: ${n.original}
Encoded: ${n.encoded}
Decoded: ${n.decoded}
`).join(`
`);a(s,"batch")}function yu(i,t){d(t,`https://example.com/search?q=hello world&category=web development
https://test.com/path/to/file?name=John Doe&age=30&city=New York
https://api.example.com/users?filter=name eq "John Smith"&sort=created_at desc
https://site.com/page?param=value with spaces&another=special!@#$%^&*()chars
https://demo.com/search?query=测试&lang=zh-CN`)}function hu(){Ee("/tools")}var _u=(i,t)=>d(t,"single"),ku=(i,t)=>d(t,"batch"),wu=w('<button class="btn btn-primary">Encode URL</button> <button class="btn btn-primary">Decode URL</button>',1),Cu=w('<button class="btn btn-primary">Process Batch</button> <button class="btn btn-primary">Load Sample URLs</button>',1),$u=(i,t,a)=>{d(t,"https://example.com/search?q=hello world&category=web development"),a()},Su=(i,t,a)=>{d(t,"https://test.com/path?name=John Doe&city=New York"),a()},Tu=(i,t,a)=>{d(t,"https://site.com/search?q=测试&lang=zh-CN"),a()},Mu=(i,t,a)=>t(e(a),"encoded"),Eu=w('<button class="btn btn-primary btn-sm"> </button>'),Pu=w('<div class="absolute inset-0 flex items-center justify-center pointer-events-none"><p class="text-gray-400 dark:text-gray-600">Enter text above to see encoded result</p></div>'),Lu=(i,t,a)=>t(e(a),"decoded"),Au=w('<button class="btn btn-primary btn-sm"> </button>'),Iu=w('<div class="absolute inset-0 flex items-center justify-center pointer-events-none"><p class="text-gray-400 dark:text-gray-600">Round-trip test result will appear here</p></div>'),ju=w('<div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Input Text / URL</h2> <span class="text-sm text-gray-500 dark:text-gray-400"> </span></div> <textarea placeholder="Enter text or URL to encode/decode..." class="w-full h-64 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-transparent"></textarea> <div class="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quick Examples:</p> <div class="space-y-1"><button class="block w-full text-left text-sm text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)] hover:underline">Query parameters with spaces</button> <button class="block w-full text-left text-sm text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)] hover:underline">Multiple parameters with special characters</button> <button class="block w-full text-left text-sm text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)] hover:underline">International characters (Chinese)</button></div></div></div> <div><div class="mb-4"><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Encoded URL</h2> <!></div> <div class="relative"><textarea placeholder="Encoded URL will appear here..." class="w-full h-28 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none"></textarea> <!></div></div> <div><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Decoded URL (Round-trip)</h2> <!></div> <div class="relative"><textarea placeholder="Decoded URL will appear here..." class="w-full h-28 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none"></textarea> <!></div></div></div></div>'),Nu=w('<button class="btn btn-primary btn-sm"> </button>'),Ru=w('<div class="flex items-center justify-center h-full"><p class="text-gray-400 dark:text-gray-600">Process batch URLs to see results</p></div>'),Bu=w('<div class="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0"><div class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> </div> <div class="space-y-2"><div><span class="text-xs font-medium text-gray-500 dark:text-gray-400">Original:</span> <div class="font-mono text-xs text-gray-900 dark:text-white break-all"> </div></div> <div><span class="text-xs font-medium text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]">Encoded:</span> <div class="font-mono text-xs text-green-700 dark:text-green-300 break-all"> </div></div> <div><span class="text-xs font-medium text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]">Decoded:</span> <div class="font-mono text-xs text-[var(--ds-primary-700)] dark:text-[var(--ds-primary-300)] break-all"> </div></div></div></div>'),Du=w('<div class="space-y-4"></div>'),Fu=w('<div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Batch Input (one URL per line)</h2> <span class="text-sm text-gray-500 dark:text-gray-400"> </span></div> <textarea placeholder="Enter multiple URLs or text strings, one per line..." class="w-full h-96 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-transparent"></textarea></div> <div><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Batch Results</h2> <!></div> <div class="h-96 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 p-4"><!></div></div></div>'),Hu=w(`<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="btn btn-primary"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--ds-primary-400)] to-[var(--ds-primary-600)] rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">URL Encoder/Decoder</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Encode and decode URLs safely. Perfect for handling special characters and international
        content.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">URL Encoder/Decoder</li></ol></nav> <div class="mb-6"><div class="flex justify-center"><div class="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1"><button>Single URL</button> <button>Batch Processing</button></div></div></div> <div class="mb-6 flex flex-wrap gap-4 items-center justify-center"><!> <button class="btn btn-primary">Clear All</button></div> <!> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Safe Encoding</h3> <p class="text-gray-600 dark:text-gray-400">Properly encodes special characters, spaces, and international characters for safe URL
        transmission</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Batch Processing</h3> <p class="text-gray-600 dark:text-gray-400">Process multiple URLs at once with batch mode for efficient workflow</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Round-trip Testing</h3> <p class="text-gray-600 dark:text-gray-400">Automatic round-trip testing ensures your URLs decode back to the original text</p></div></div></div>`);function Ou(i,t){It(t,!0);let a=x(""),s=x(""),n=x(""),c=x(""),l=x(Le([])),v=x(""),g=x("single");function u(){try{d(s,encodeURIComponent(e(a)),!0),d(n,decodeURIComponent(e(s)),!0)}catch{d(s,""),d(n,"")}}function p(ut,at){navigator.clipboard.writeText(ut),d(v,at,!0),setTimeout(()=>{d(v,"")},2e3)}we(()=>{e(a)&&e(g)==="single"&&u()});var k=Hu(),y=r(k),h=r(y),_=r(h);_.__click=[hu];var $=r(_);Ie($,{class:"w-5 h-5 mr-2"});var M=o(h,2),P=r(M),S=r(P);yd(S,{class:"w-10 h-10 text-white"});var N=o(y,4),f=r(N),E=r(f),C=r(E);C.__click=[_u,g];var H=o(C,2);H.__click=[ku,g];var z=o(N,2),rt=r(z);{var pt=ut=>{var at=wu(),L=gt(at);L.__click=u;var ft=o(L,2);ft.__click=[pu,n,a,s],m(ut,at)},lt=ut=>{var at=Cu(),L=gt(at);L.__click=[xu,c,l];var ft=o(L,2);ft.__click=[yu,c],m(ut,at)};O(rt,ut=>{e(g)==="single"?ut(pt):ut(lt,!1)})}var mt=o(rt,2);mt.__click=[fu,a,s,n,c,l];var ct=o(z,2);{var xt=ut=>{var at=ju(),L=r(at),ft=r(L),vt=o(r(ft),2),G=r(vt),tt=o(ft,2),yt=o(tt,2),bt=o(r(yt),2),wt=r(bt);wt.__click=[$u,a,u];var Ut=o(wt,2);Ut.__click=[Su,a,u];var Ot=o(Ut,2);Ot.__click=[Tu,a,u];var Nt=o(L,2),Pt=r(Nt),ot=r(Pt),kt=o(r(ot),2);{var q=F=>{var Z=Eu();Z.__click=[Mu,p,s];var j=r(Z);Y(()=>b(j,e(v)==="encoded"?"✓ Copied!":"Copy")),m(F,Z)};O(kt,F=>{e(s)&&F(q)})}var Q=o(ot,2),W=r(Q),A=o(W,2);{var I=F=>{var Z=Pu();m(F,Z)};O(A,F=>{e(s)||F(I)})}var R=o(Pt,2),it=r(R),et=o(r(it),2);{var K=F=>{var Z=Au();Z.__click=[Lu,p,n];var j=r(Z);Y(()=>b(j,e(v)==="decoded"?"✓ Copied!":"Copy")),m(F,Z)};O(et,F=>{e(n)&&F(K)})}var U=o(it,2),B=r(U),T=o(B,2);{var D=F=>{var Z=Iu();m(F,Z)};O(T,F=>{e(n)||F(D)})}Y(()=>b(G,`${e(a).length??""} characters`)),Tt(tt,()=>e(a),F=>d(a,F)),Tt(W,()=>e(s),F=>d(s,F)),Tt(B,()=>e(n),F=>d(n,F)),m(ut,at)},Rt=ut=>{var at=Fu(),L=r(at),ft=r(L),vt=o(r(ft),2),G=r(vt),tt=o(ft,2),yt=o(L,2),bt=r(yt),wt=o(r(bt),2);{var Ut=kt=>{var q=Nu();q.__click=[bu,l,p];var Q=r(q);Y(()=>b(Q,e(v)==="batch"?"✓ Copied!":"Copy All")),m(kt,q)};O(wt,kt=>{e(l).length>0&&kt(Ut)})}var Ot=o(bt,2),Nt=r(Ot);{var Pt=kt=>{var q=Ru();m(kt,q)},ot=kt=>{var q=Du();fe(q,23,()=>e(l),(Q,W)=>Q.original+W,(Q,W,A)=>{var I=Bu(),R=r(I),it=r(R),et=o(R,2),K=r(et),U=o(r(K),2),B=r(U),T=o(K,2),D=o(r(T),2),F=r(D),Z=o(T,2),j=o(r(Z),2),nt=r(j);Y(()=>{b(it,`#${e(A)+1}`),b(B,e(W).original),b(F,e(W).encoded),b(nt,e(W).decoded)}),m(Q,I)}),m(kt,q)};O(Nt,kt=>{e(l).length===0?kt(Pt):kt(ot,!1)})}Y(kt=>b(G,`${kt??""} URLs`),[()=>e(c).split(`
`).filter(kt=>kt.trim()).length]),Tt(tt,()=>e(c),kt=>d(c,kt)),m(ut,at)};O(ct,ut=>{e(g)==="single"?ut(xt):ut(Rt,!1)})}var Vt=o(ct,2),Kt=r(Vt),Qt=r(Kt),Wt=r(Qt);no(Wt,{class:"w-6 h-6 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"});var zt=o(Kt,2),Bt=r(zt),Lt=r(Bt);Ve(Lt,{class:"w-6 h-6 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"});var Ct=o(zt,2),X=r(Ct),_t=r(X);H0(_t,{class:"w-6 h-6 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"}),Y(()=>{ge(C,1,`px-4 py-2 rounded-md text-sm font-medium transition-colors ${e(g)==="single"?"bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] text-green-700 dark:text-green-300":"text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"}`),ge(H,1,`px-4 py-2 rounded-md text-sm font-medium transition-colors ${e(g)==="batch"?"bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] text-green-700 dark:text-green-300":"text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"}`)}),m(i,k),jt()}ye(["click"]);function zu(i,t,a,s){d(t,""),d(a,""),s()}function Uu(i,t,a){navigator.clipboard.writeText(e(t)),d(a,"html"),setTimeout(()=>{d(a,"")},2e3)}function Gu(i,t,a){navigator.clipboard.writeText(e(t)),d(a,"markdown"),setTimeout(()=>{d(a,"")},2e3)}function qu(i,t,a){d(t,`# Project Documentation

## Overview

This project demonstrates a **real-time markdown preview** application built with modern web technologies.

## Features

### Core Functionality- [x] **Live Preview**: Real-time markdown rendering- [x] **Syntax Highlighting**: Beautiful code blocks- [x] **Export Options**: HTML export functionality- [ ] **Dark Theme**: Automatic theme switching- [ ] **File Upload**: Import .md files- [ ] **Cloud Sync**: Save to cloud storage

### Technical Stack

\`\`\`javascriptconst techStack = {  frontend: ['Svelte', 'Tailwind CSS'],  backend: ['Node.js', 'Express'],  deployment: ['Vercel', 'GitHub Actions']};\`\`\`

## Quick Start

1. **Installation**   \`\`\`bash   npm install   npm run dev   \`\`\`

2. **Usage**   Simply start typing markdown in the editor and see the live preview!

## API Reference

### Endpoints

| Method | Endpoint | Description ||--------|----------|-------------|| GET    | /api/render | Render markdown to HTML || POST   | /api/export | Export as HTML file |

### Code Example

\`\`\`pythondef process_markdown(content):    """    Process markdown content and return HTML    """    # Processing logic here    return render_html(content)\`\`\`

## Contributing
> "Great things are built by passionate people"
We welcome contributions! Please read our [contributing guidelines](https://github.com/example/contributing).

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

*Last updated: `+new Date().toLocaleDateString()+"*"),a()}function Wu(){Ee("/tools")}var Ju=w(`<div class="max-w-7xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--ds-primary-400)] to-[var(--ds-primary-600)] rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Markdown Preview</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Preview and write markdown with live formatting. Perfect for documentation and content
        creation.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Markdown Preview</li></ol></nav> <div class="mb-6 flex flex-wrap gap-4 items-center justify-center"><button class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">Load Sample</button> <button class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">Clear All</button> <button class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"> </button> <button class="px-4 py-2 bg-[var(--ds-primary-600)] text-white rounded-lg hover:bg-blue-700 transition-colors"> </button> <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">Export HTML</button></div> <div class="mb-6 flex justify-center gap-6 text-sm text-gray-600 dark:text-gray-400"><div class="flex items-center gap-1"><!> <span> </span></div> <div class="flex items-center gap-1"><!> <span> </span></div> <div class="flex items-center gap-1"><!> <span> </span></div></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"><div class="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600"><div class="flex items-center justify-between"><h2 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2"><!> Markdown Editor</h2> <span class="text-sm text-gray-500 dark:text-gray-400">.md</span></div></div> <div class="p-6"><textarea placeholder="Start typing your markdown here..." class="w-full h-96 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-transparent"></textarea></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"><div class="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600"><div class="flex items-center justify-between"><h2 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2"><!> Live Preview</h2> <span class="text-sm text-gray-500 dark:text-gray-400">HTML</span></div></div> <div class="p-6 h-96 overflow-y-auto"><div class="prose prose-sm sm:prose-base dark:prose-invert max-w-none"><!></div></div></div></div> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Live Preview</h3> <p class="text-gray-600 dark:text-gray-400">Real-time markdown rendering as you type with instant visual feedback</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Syntax Highlighting</h3> <p class="text-gray-600 dark:text-gray-400">Beautiful code blocks with syntax highlighting for multiple programming languages</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Export Options</h3> <p class="text-gray-600 dark:text-gray-400">Export your markdown as styled HTML with one click for easy sharing</p></div></div></div>`);function Vu(i,t){It(t,!0);let a=x(`# Welcome to Markdown Preview

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
    return quick_sort(left) + middle + quick_sort(right)
# Test the functionnumbers = [3, 6, 8, 10, 1, 2, 1]sorted_numbers = quick_sort(numbers)print("Sorted: {}".format(sorted_numbers))\`\`\`

## Tables

| Feature | Status | Priority ||---------|--------|----------|| Live Preview | ✅ Complete | High || Export | ✅ Complete | Medium || Themes | 🚧 In Progress | Low |

## Blockquotes

> "The best way to learn is by doing."
> — Anonymous Developer

> This is a multi-line blockquote that demonstrates> how line breaks are preserved within blockquote> sections.

## Task Lists

- [x] Set up development environment- [x] Implement basic markdown parsing- [x] Add syntax highlighting- [ ] Add dark theme support- [ ] Implement export to PDF- [ ] Add collaborative editing

---

## Horizontal Rules

You can use horizontal rules to separate content sections.

## Math Support

Inline math: $E = mc^2$

Block math:

$$\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}$$

## Footnotes

Here's a sentence with a footnote [^1].

[^1]: This is the footnote content.

Happy markdown editing! 🎉`),s=x(""),n=x(""),c=x(0),l=x(0),v=x(0);function g(B){let T=B;T=T.replace(/^### (.*$)/gim,'<h3 class="text-xl font-semibold mb-3 mt-6">$1</h3>'),T=T.replace(/^## (.*$)/gim,'<h2 class="text-2xl font-semibold mb-4 mt-8">$1</h2>'),T=T.replace(/^# (.*$)/gim,'<h1 class="text-3xl font-bold mb-6 mt-8">$1</h1>'),T=T.replace(/\*\*(.+?)\*\*/g,'<strong class="font-semibold">$1</strong>'),T=T.replace(/\*(.+?)\*/g,'<em class="italic">$1</em>'),T=T.replace(/_(.+?)_/g,'<em class="italic">$1</em>'),T=T.replace(/~~(.+?)~~/g,'<del class="line-through">$1</del>'),T=T.replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2" class="text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)] hover:underline" target="_blank" rel="noopener noreferrer">$1</a>'),T=T.replace(/`([^`]+)`/g,'<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono text-red-600 dark:text-red-400">$1</code>'),T=T.replace(/```(\w+)?\n([\s\S]*?)```/g,(Z,j,nt)=>`<div class="bg-gray-900 text-gray-100 rounded-lg p-4 my-4 overflow-x-auto">
        <div class="text-xs text-gray-400 mb-2 font-mono">${j||"text"}</div>
        <pre class="font-mono text-sm"><code>${u(nt.trim())}</code></pre>
      </div>`),T=T.replace(/^> (.*$)/gim,'<blockquote class="border-l-4 border-gray-300 dark:border-gray-600 pl-4 py-2 my-4 italic text-gray-700 dark:text-gray-300">$1</blockquote>'),T=T.replace(/^> (.+?)\n> (.+?)\n> (.+?)$/gim,'<blockquote class="border-l-4 border-gray-300 dark:border-gray-600 pl-4 py-2 my-4 italic text-gray-700 dark:text-gray-300">$1<br>$2<br>$3</blockquote>'),T=T.replace(/^\* (.+)$/gim,'<li class="ml-4">• $1</li>'),T=T.replace(/^- (.+)$/gim,'<li class="ml-4">• $1</li>'),T=T.replace(/^\d+\. (.+)$/gim,'<li class="ml-4 list-decimal list-inside">$1</li>'),T=T.replace(/^---$/gim,'<hr class="my-8 border-gray-300 dark:border-gray-600">'),T=T.replace(/^\*\*\*$/gim,'<hr class="my-8 border-gray-300 dark:border-gray-600">'),T=T.replace(/\n\n/g,'</p><p class="mb-4">'),T='<p class="mb-4">'+T+"</p>",T=T.replace(/<p class="mb-4"><\/p>/g,""),T=T.replace(/<p class="mb-4"><h/g,"<h"),T=T.replace(/<\/h[1-6]><\/p>/g,"</h$1>"),T=T.replace(/<p class="mb-4"><blockquote/g,"<blockquote"),T=T.replace(/<\/blockquote><\/p>/g,"</blockquote>"),T=T.replace(/<p class="mb-4"><div/g,"<div"),T=T.replace(/<\/div><\/p>/g,"</div>"),T=T.replace(/<p class="mb-4"><hr/g,"<hr"),T=T.replace(/<\/p><li/g,"<li"),T=T.replace(/<\/li><\/p>/g,"</li>"),T=T.replace(/\$\$([^$]+)\$\$/g,'<div class="bg-gray-100 dark:bg-gray-800 p-4 my-4 rounded text-center font-mono text-lg">$1</div>'),T=T.replace(/\$([^$]+)\$/g,'<span class="font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">$1</span>'),T=T.replace(/- \[ \] (.+)$/gim,'<div class="flex items-center gap-2 ml-4"><input type="checkbox" disabled class="rounded"> <span>$1</span></div>'),T=T.replace(/- \[x\] (.+)$/gim,'<div class="flex items-center gap-2 ml-4"><input type="checkbox" checked disabled class="rounded"> <span>$1</span></div>');const D=/\|(.+)\|\n\|(.+)\|\n((?:\|.+\|\n?)*)/gim;T=T.replace(D,(Z,j,nt,Mt)=>{const qt=j.split("|").map(J=>`<th class="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left bg-gray-50 dark:bg-gray-800">${J.trim()}</th>`).join(""),St=Mt.split(`
`).filter(J=>J.trim()).map(J=>`<tr>${J.split("|").slice(1,-1).map($t=>`<td class="border border-gray-300 dark:border-gray-600 px-4 py-2">${$t.trim()}</td>`).join("")}</tr>`).join("");return`<div class="overflow-x-auto my-4"><table class="w-full border-collapse border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
        <thead><tr>${qt}</tr></thead>
        <tbody>${St}</tbody>
      </table></div>`});const F={":)":"😊",":-)":"😊",":(":"😢",":-(":"😢",":D":"😃",":-D":"😃",":P":"😛",":-P":"😛",";)":"😉",";-)":"😉",":heart:":"❤️",":+1:":"👍",":-1:":"👎",":fire:":"🔥",":star:":"⭐",":check:":"✅",":x:":"❌",":warning:":"⚠️",":rocket:":"🚀"};for(const[Z,j]of Object.entries(F))T=T.replace(new RegExp(Z.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"g"),j);return T}function u(B){const T=document.createElement("div");return T.textContent=B,T.innerHTML}function p(){d(s,g(e(a)),!0),k()}function k(){const B=e(a).split(`
`);d(v,B.length,!0),d(l,e(a).length,!0),d(c,e(a).trim()?e(a).trim().split(/\s+/).length:0,!0)}function y(){const T='<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Markdown Export</title><script src="https://cdn.tailwindcss.com">'+"<\/script>"+'</head><body class="max-w-4xl mx-auto p-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"><div class="prose prose-lg dark:prose-invert max-w-none">'+e(s)+"</div></body></html>",D=new Blob([T],{type:"text/html"}),F=URL.createObjectURL(D),Z=document.createElement("a");Z.href=F,Z.download="markdown-export.html",Z.click(),URL.revokeObjectURL(F)}we(()=>{p()});var h=Ju(),_=r(h),$=r(_),M=r($);M.__click=[Wu];var P=r(M);Ie(P,{class:"w-5 h-5"});var S=o($,2),N=r(S),f=r(N);He(f,{class:"w-10 h-10 text-white"});var E=o(_,4),C=r(E);C.__click=[qu,a,p];var H=o(C,2);H.__click=[zu,a,s,k];var z=o(H,2);z.__click=[Gu,a,n];var rt=r(z),pt=o(z,2);pt.__click=[Uu,s,n];var lt=r(pt),mt=o(pt,2);mt.__click=y;var ct=o(E,2),xt=r(ct),Rt=r(xt);He(Rt,{class:"w-4 h-4"});var Vt=o(Rt,2),Kt=r(Vt),Qt=o(xt,2),Wt=r(Qt);He(Wt,{class:"w-4 h-4"});var zt=o(Wt,2),Bt=r(zt),Lt=o(Qt,2),Ct=r(Lt);He(Ct,{class:"w-4 h-4"});var X=o(Ct,2),_t=r(X),ut=o(ct,2),at=r(ut),L=r(at),ft=r(L),vt=r(ft),G=r(vt);Z0(G,{class:"w-5 h-5"});var tt=o(L,2),yt=r(tt),bt=o(at,2),wt=r(bt),Ut=r(wt),Ot=r(Ut),Nt=r(Ot);pd(Nt,{class:"w-5 h-5"});var Pt=o(wt,2),ot=r(Pt),kt=r(ot);d0(kt,()=>e(s));var q=o(ut,2),Q=r(q),W=r(Q),A=r(W);Ve(A,{class:"w-6 h-6 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"});var I=o(Q,2),R=r(I),it=r(R);Ya(it,{class:"w-6 h-6 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"});var et=o(I,2),K=r(et),U=r(K);Xa(U,{class:"w-6 h-6 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"}),Y(()=>{b(rt,e(n)==="markdown"?"✓ Copied!":"Copy Markdown"),b(lt,e(n)==="html"?"✓ Copied!":"Copy HTML"),b(Kt,`${e(c)??""} words`),b(Bt,`${e(l)??""} characters`),b(_t,`${e(v)??""} lines`)}),Tt(yt,()=>e(a),B=>d(a,B)),m(i,h),jt()}ye(["click"]);function Yu(i,t,a){const n=i.target.files?.[0];n&&(d(t,n.name,!0),a(n))}function Ku(i,t){if(e(t)){const a=`data:application/octet-stream;base64,${e(t).encoded}`,s=document.createElement("a");s.href=a,s.download=e(t).name+".b64",s.click()}}function Qu(i,t,a,s,n,c,l){d(t,""),d(a,""),d(s,""),d(n,""),d(c,""),d(l,null)}function Zu(i,t,a){d(t,"Hello, World! This is a sample text for Base64 encoding."),a()}function Xu(i,t,a){d(t,"SGVsbG8sIFdvcmxkISBUaGlzIGlzIGEgc2FtcGxlIHRleHQgZm9yIEJhc2U2NCBlbmNvZGluZy4="),a()}function tm(){Ee("/tools")}var em=(i,t)=>d(t,"text"),rm=(i,t)=>d(t,"file"),am=w('<div class="mb-4 p-4 bg-[var(--ds-danger-100)] dark:bg-[var(--ds-danger-900)/20] border border-[var(--ds-danger-200)] dark:border-[var(--ds-danger-800)] rounded-lg"><p class="text-[var(--ds-danger-700)] dark:text-[var(--ds-danger-400)] font-medium"> </p></div>'),im=(i,t,a)=>t(e(a),"encoded"),sm=w('<button class="btn btn-primary btn-sm"> </button>'),om=(i,t,a)=>t(e(a),"decoded"),nm=w('<button class="btn btn-primary btn-sm"> </button>'),dm=w('<div class="mb-6 flex flex-wrap gap-4 items-center justify-center"><button class="btn btn-primary">Encode to Base64</button> <button class="btn btn-primary">Decode from Base64</button> <button class="btn btn-primary btn-sm">Load Sample Text</button> <button class="btn btn-primary btn-sm">Load Sample Base64</button> <button class="btn btn-primary btn-sm">Clear All</button></div> <!> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div><textarea class="textarea" placeholder="Enter text or Base64 string to encode/decode..."></textarea> <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right"> </p></div> <div><div class="mb-4"><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Base64 Result</h2> <!></div> <textarea class="textarea" placeholder="Base64 encoded text will appear here..."></textarea></div> <div><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Decoded Result</h2> <!></div> <textarea class="textarea" placeholder="Decoded text will appear here..."></textarea></div></div></div>',1),lm=w('<div class="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><p class="text-sm font-medium text-gray-700 dark:text-gray-300"> </p></div>'),cm=w('<div class="text-center py-8"><div class="inline-flex items-center gap-2"><div class="w-5 h-5 border-2 border-[var(--ds-primary-600)] border-t-transparent rounded-full animate-spin"></div> <span class="text-gray-600 dark:text-gray-400">Processing file...</span></div></div>'),vm=w('<div class="mb-4 p-4 bg-[var(--ds-danger-100)] dark:bg-[var(--ds-danger-900)/20] border border-[var(--ds-danger-200)] dark:border-[var(--ds-danger-800)] rounded-lg"><p class="text-[var(--ds-danger-700)] dark:text-[var(--ds-danger-400)] font-medium"> </p></div>'),gm=(i,t,a)=>e(t)&&a(e(t).encoded,"file-encoded"),um=w('<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Conversion Result</h3> <div class="space-y-4"><div><span class="text-sm font-medium text-gray-700 dark:text-gray-300">File Name:</span> <p class="text-gray-900 dark:text-white font-mono text-sm"> </p></div> <div><span class="text-sm font-medium text-gray-700 dark:text-gray-300">Original Size:</span> <p class="text-gray-900 dark:text-white"> </p></div> <div><span class="text-sm font-medium text-gray-700 dark:text-gray-300">Base64 Length:</span> <p class="text-gray-900 dark:text-white"> </p></div> <div><div class="flex justify-between items-center mb-2"><span class="text-sm font-medium text-gray-700 dark:text-gray-300">Base64 Data:</span> <div class="flex gap-2"><button class="btn btn-primary btn-sm"> </button> <button class="btn btn-primary btn-sm">Download</button></div></div> <textarea class="textarea"></textarea></div></div></div>'),mm=w('<div class="max-w-2xl mx-auto"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upload File for Base64 Conversion</h2> <div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center"><!> <label for="file-upload" class="cursor-pointer"><span class="text-[var(--ds-primary-600)] dark:text-blue-400 hover:underline font-medium">Click to upload</span> <span class="text-gray-600 dark:text-gray-400">or drag and drop</span></label> <input class="input hidden" id="file-upload" type="file"/> <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">Supports any file type</p></div> <!></div> <!> <!> <!></div>'),pm=w(`<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="btn btn-primary"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--ds-primary-400)] to-[var(--ds-primary-600)] rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Base64 Converter</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Encode and decode Base64 strings with support for text and file conversion.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Base64 Converter</li></ol></nav> <div class="mb-6"><div class="flex justify-center"><div class="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1"><button>Text Converter</button> <button>File Converter</button></div></div></div> <!> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Secure Encoding</h3> <p class="text-gray-600 dark:text-gray-400">Encode text and files to Base64 format with proper UTF-8 handling for international
        characters</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">File Support</h3> <p class="text-gray-600 dark:text-gray-400">Convert any file type to Base64 and download the encoded data for easy sharing</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Fast Processing</h3> <p class="text-gray-600 dark:text-gray-400">Instant encoding and decoding with efficient algorithms for both text and binary data</p></div></div></div>`);function xm(i,t){It(t,!0);let a=x(""),s=x(""),n=x(""),c=x("text"),l=x(!1),v=x(""),g=x(""),u=x(null),p=x("");function k(){try{d(s,btoa(unescape(encodeURIComponent(e(a)))),!0),d(n,""),d(v,"")}catch{d(v,"Failed to encode text. Please check your input."),d(s,"")}}function y(){try{d(n,decodeURIComponent(escape(atob(e(a)))),!0),d(s,""),d(v,"")}catch{d(v,"Invalid Base64 string. Please check your input."),d(n,"")}}function h(ut){d(l,!0),d(v,"");const at=new FileReader;at.onload=L=>{try{const vt=(L.target?.result).split(",")[1];d(u,{name:ut.name,size:ut.size,encoded:vt},!0),d(l,!1)}catch{d(v,"Failed to process file."),d(l,!1)}},at.onerror=()=>{d(v,"Failed to read file."),d(l,!1)},at.readAsDataURL(ut)}function _(ut,at){navigator.clipboard.writeText(ut),d(p,at,!0),setTimeout(()=>{d(p,"")},2e3)}function $(ut){if(ut===0)return"0 Bytes";const at=1024,L=["Bytes","KB","MB","GB"],ft=Math.floor(Math.log(ut)/Math.log(at));return parseFloat((ut/Math.pow(at,ft)).toFixed(2))+" "+L[ft]}var M=pm(),P=r(M),S=r(P),N=r(S);N.__click=[tm];var f=r(N);Ie(f,{class:"w-5 h-5 mr-2"});var E=o(S,2),C=r(E),H=r(C);Zr(H,{class:"w-10 h-10 text-white"});var z=o(P,4),rt=r(z),pt=r(rt),lt=r(pt);lt.__click=[em,c];var mt=o(lt,2);mt.__click=[rm,c];var ct=o(z,2);{var xt=ut=>{var at=dm(),L=gt(at),ft=r(L);ft.__click=k;var vt=o(ft,2);vt.__click=y;var G=o(vt,2);G.__click=[Zu,a,k];var tt=o(G,2);tt.__click=[Xu,a,y];var yt=o(tt,2);yt.__click=[Qu,a,s,n,v,g,u];var bt=o(L,2);{var wt=B=>{var T=am(),D=r(T),F=r(D);Y(()=>b(F,`Error: ${e(v)??""}`)),m(B,T)};O(bt,B=>{e(v)&&B(wt)})}var Ut=o(bt,2),Ot=r(Ut),Nt=r(Ot);Dt(Nt,"rows",16);var Pt=o(Nt,2),ot=r(Pt),kt=o(Ot,2),q=r(kt),Q=r(q),W=o(r(Q),2);{var A=B=>{var T=sm();T.__click=[im,_,s];var D=r(T);Y(()=>b(D,e(p)==="encoded"?"✓ Copied!":"Copy")),m(B,T)};O(W,B=>{e(s)&&B(A)})}var I=o(Q,2);Dt(I,"rows",7);var R=o(q,2),it=r(R),et=o(r(it),2);{var K=B=>{var T=nm();T.__click=[om,_,n];var D=r(T);Y(()=>b(D,e(p)==="decoded"?"✓ Copied!":"Copy")),m(B,T)};O(et,B=>{e(n)&&B(K)})}var U=o(it,2);Dt(U,"rows",7),Y(()=>b(ot,`${e(a).length??""} characters`)),Tt(Nt,()=>e(a),B=>d(a,B)),Tt(I,()=>e(s),B=>d(s,B)),Tt(U,()=>e(n),B=>d(n,B)),m(ut,at)},Rt=ut=>{var at=mm(),L=r(at),ft=o(r(L),2),vt=r(ft);nc(vt,{class:"w-12 h-12 mx-auto mb-4 text-gray-400"});var G=o(vt,4);G.__change=[Yu,g,h];var tt=o(ft,2);{var yt=ot=>{var kt=lm(),q=r(kt),Q=r(q);Y(()=>b(Q,`Selected file: ${e(g)??""}`)),m(ot,kt)};O(tt,ot=>{e(g)&&ot(yt)})}var bt=o(L,2);{var wt=ot=>{var kt=cm();m(ot,kt)};O(bt,ot=>{e(l)&&ot(wt)})}var Ut=o(bt,2);{var Ot=ot=>{var kt=vm(),q=r(kt),Q=r(q);Y(()=>b(Q,`Error: ${e(v)??""}`)),m(ot,kt)};O(Ut,ot=>{e(v)&&ot(Ot)})}var Nt=o(Ut,2);{var Pt=ot=>{var kt=um(),q=o(r(kt),2),Q=r(q),W=o(r(Q),2),A=r(W),I=o(Q,2),R=o(r(I),2),it=r(R),et=o(I,2),K=o(r(et),2),U=r(K),B=o(et,2),T=r(B),D=o(r(T),2),F=r(D);F.__click=[gm,u,_];var Z=r(F),j=o(F,2);j.__click=[Ku,u];var nt=o(T,2);Dt(nt,"rows",8),Y(Mt=>{b(A,e(u).name),b(it,Mt),b(U,`${e(u).encoded.length??""} characters`),b(Z,e(p)==="file-encoded"?"✓ Copied!":"Copy"),cd(nt,e(u).encoded)},[()=>$(e(u).size)]),m(ot,kt)};O(Nt,ot=>{e(u)&&ot(Pt)})}m(ut,at)};O(ct,ut=>{e(c)==="text"?ut(xt):ut(Rt,!1)})}var Vt=o(ct,2),Kt=r(Vt),Qt=r(Kt),Wt=r(Qt);no(Wt,{class:"w-6 h-6 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"});var zt=o(Kt,2),Bt=r(zt),Lt=r(Bt);He(Lt,{class:"w-6 h-6 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"});var Ct=o(zt,2),X=r(Ct),_t=r(X);Ve(_t,{class:"w-6 h-6 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"}),Y(()=>{ge(lt,1,`px-4 py-2 rounded-md text-sm font-medium transition-colors ${e(c)==="text"?"bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] text-[var(--ds-primary-700)] dark:text-[var(--ds-primary-300)]":"text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"}`),ge(mt,1,`px-4 py-2 rounded-md text-sm font-medium transition-colors ${e(c)==="file"?"bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] text-[var(--ds-primary-700)] dark:text-[var(--ds-primary-300)]":"text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"}`)}),m(i,M),jt()}ye(["click","change"]);function fm(i,t){e(t)&&(navigator.clipboard.writeText(e(t)),Oe.success("Password copied to clipboard"))}function Oo(i,t,a){d(t,""),d(a,[],!0),Oe.success("Cleared history")}function bm(){Ee("/tools")}var ym=(i,t)=>t(5),hm=(i,t,a)=>t(a),_m=w('<button class="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 capitalize"> </button>'),km=w("<span> </span>"),wm=w('<div class="mt-4"><div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden"><div></div></div></div>'),Cm=w('<div class="mb-6"><input placeholder="Enter custom characters..." class="input font-mono text-sm"/></div>'),$m=w('<button class="text-sm text-red-500 hover:text-red-600">Clear</button>'),Sm=w('<div class="flex flex-col items-center justify-center py-8 text-gray-500 dark:text-gray-400"><!> <p class="text-sm">No passwords generated yet</p></div>'),Tm=(i,t,a)=>t(e(a).password),Mm=w('<div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg group hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"><div class="flex items-start justify-between mb-2"><div class="flex-1 mr-2 min-w-0"><div class="font-mono text-sm text-gray-900 dark:text-white break-all"> </div> <div class="flex items-center justify-between mt-2"><span class="text-xs text-gray-500 dark:text-gray-400"> </span> <div class="flex items-center gap-2"><span> </span> <button class="text-gray-400 hover:text-red-500 transition-colors"><!></button></div></div></div></div></div>'),Em=w('<div class="space-y-2 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar"></div>'),Pm=w(`<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="btn btn-primary"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--ds-danger-400)] to-[var(--ds-danger-600)] rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Password Generator</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Generate secure and random passwords with customizable options for maximum security.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Password Generator</li></ol></nav> <div class="mb-6 flex justify-center flex-wrap gap-2"><button class="btn btn-primary btn-sm">Generate 5</button> <button class="btn btn-primary btn-sm text-red-500 hover:text-red-600"><!> Clear</button></div> <div class="mb-6 flex justify-center"><div class="inline-flex rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1 shadow-sm"></div></div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-2 space-y-6"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><div class="flex items-center justify-between mb-4"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Generated Password</h2> <div class="flex items-center gap-2"><!> <button class="btn btn-secondary btn-sm"><!> Copy</button></div></div> <div class="relative"><input readonly="" placeholder="Click 'Generate Password' to create a secure password" class="input font-mono text-lg"/></div> <!></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">Password Settings</h2> <div class="mb-6"><div class="flex justify-between items-center mb-2"><label for="password-length-slider" class="text-sm font-medium text-gray-700 dark:text-gray-300">Password Length</label> <span class="text-sm font-semibold text-gray-900 dark:text-white"> </span></div> <input id="password-length-slider" type="range" min="4" max="64" class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[var(--ds-danger-500)]"/> <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1"><span>4</span> <span>32</span> <span>64</span></div></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"><label class="flex items-center space-x-3 cursor-pointer"><input type="checkbox" class="w-4 h-4 text-[var(--ds-danger-600)] bg-gray-100 border-gray-300 rounded focus:ring-[var(--ds-danger-500)]"/> <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Uppercase (A-Z)</span></label> <label class="flex items-center space-x-3 cursor-pointer"><input type="checkbox" class="w-4 h-4 text-[var(--ds-danger-600)] bg-gray-100 border-gray-300 rounded focus:ring-[var(--ds-danger-500)]"/> <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Lowercase (a-z)</span></label> <label class="flex items-center space-x-3 cursor-pointer"><input type="checkbox" class="w-4 h-4 text-[var(--ds-danger-600)] bg-gray-100 border-gray-300 rounded focus:ring-[var(--ds-danger-500)]"/> <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Numbers (0-9)</span></label> <label class="flex items-center space-x-3 cursor-pointer"><input type="checkbox" class="w-4 h-4 text-[var(--ds-danger-600)] bg-gray-100 border-gray-300 rounded focus:ring-[var(--ds-danger-500)]"/> <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Symbols (!@#$%)</span></label> <label class="flex items-center space-x-3 cursor-pointer"><input type="checkbox" class="w-4 h-4 text-[var(--ds-danger-600)] bg-gray-100 border-gray-300 rounded focus:ring-[var(--ds-danger-500)]"/> <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Custom Characters</span></label></div> <!> <div class="space-y-4 mb-6 border-t border-gray-200 dark:border-gray-700 pt-6"><label class="flex items-center space-x-3 cursor-pointer"><input type="checkbox" class="w-4 h-4 text-[var(--ds-danger-600)] bg-gray-100 border-gray-300 rounded focus:ring-[var(--ds-danger-500)]"/> <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Exclude Similar Characters (i, l, 1, L, o, 0, O)</span></label> <label class="flex items-center space-x-3 cursor-pointer"><input type="checkbox" class="w-4 h-4 text-[var(--ds-danger-600)] bg-gray-100 border-gray-300 rounded focus:ring-[var(--ds-danger-500)]"/> <span class="text-sm font-medium text-gray-700 dark:text-gray-300"></span></label></div> <div class="flex flex-wrap gap-3"><button class="btn btn-primary btn-lg w-full"><!> Generate Password</button></div></div></div> <div><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 sticky top-6"><div class="flex justify-between items-center mb-4"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">History</h2> <!></div> <!></div></div></div> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"><div class="flex items-center gap-2 mb-2 text-[var(--ds-danger-600)] dark:text-[var(--ds-danger-400)]"><!> <h3 class="font-medium">Strong Security</h3></div> <p class="text-sm text-gray-600 dark:text-gray-400">Generate cryptographically secure passwords with customizable complexity</p></div> <div class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"><div class="flex items-center gap-2 mb-2 text-[var(--ds-danger-600)] dark:text-[var(--ds-danger-400)]"><!> <h3 class="font-medium">Customizable Options</h3></div> <p class="text-sm text-gray-600 dark:text-gray-400">Fine-tune character sets, length, and exclusions for your specific needs</p></div> <div class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"><div class="flex items-center gap-2 mb-2 text-[var(--ds-danger-600)] dark:text-[var(--ds-danger-400)]"><!> <h3 class="font-medium">Password History</h3></div> <p class="text-sm text-gray-600 dark:text-gray-400">Keep track of generated passwords with strength analysis</p></div></div></div>`);function Lm(i,t){It(t,!0);let a=x(""),s=x(16),n=x(!0),c=x(!0),l=x(!0),v=x(!0),g=x(!1),u=x(!1),p=x(Le([])),k=x(""),y=x(!1);const h="ABCDEFGHIJKLMNOPQRSTUVWXYZ",_="abcdefghijklmnopqrstuvwxyz",$="0123456789",M="!@#$%^&*()_+-=[]{}|;:,.<>?",P="il1Lo0O",S="{}[]()/\\'\"`~,;.<>";function N(){let Ht="";if(e(n)&&(Ht+=h),e(c)&&(Ht+=_),e(l)&&(Ht+=$),e(v)&&(Ht+=M),e(y)&&(Ht+=e(k)),e(g)&&(Ht=Ht.split("").filter(xe=>!P.includes(xe)).join("")),e(u)&&(Ht=Ht.split("").filter(xe=>!S.includes(xe)).join("")),Ht===""){d(a,""),Oe.error("Please select at least one character type");return}let se="";for(let xe=0;xe<e(s);xe++)se+=Ht.charAt(Math.floor(Math.random()*Ht.length));d(a,se,!0),f(se)}function f(Ht){const se=E(Ht);e(p).unshift({password:Ht,timestamp:new Date,strength:se}),e(p).length>10&&d(p,e(p).slice(0,10),!0)}function E(Ht){if(Ht.length===0)return"none";let se=0;return Ht.length>=8&&se++,Ht.length>=12&&se++,Ht.length>=16&&se++,/[a-z]/.test(Ht)&&se++,/[A-Z]/.test(Ht)&&se++,/[0-9]/.test(Ht)&&se++,/[^a-zA-Z0-9]/.test(Ht)&&se++,se<=2?"weak":se<=4?"medium":se<=6?"strong":"very-strong"}function C(Ht){switch(Ht){case"weak":return"text-[var(--ds-danger-500)]";case"medium":return"text-[var(--ds-warning-500)]";case"strong":return"text-[var(--ds-success-500)]";case"very-strong":return"text-[var(--ds-success-600)]";default:return"text-gray-500"}}function H(Ht){switch(Ht){case"weak":return"bg-[var(--ds-danger-100)] dark:bg-[var(--ds-danger-900)/20]";case"medium":return"bg-[var(--ds-warning-100)] dark:bg-[var(--ds-warning-900)/20]";case"strong":return"bg-[var(--ds-success-100)] dark:bg-[var(--ds-success-900)/20]";case"very-strong":return"bg-[var(--ds-success-200)] dark:bg-[var(--ds-success-900)/30]";default:return"bg-gray-100 dark:bg-gray-800"}}function z(Ht){navigator.clipboard.writeText(Ht),Oe.success("Password copied to clipboard")}function rt(Ht){switch(Ht){case"weak":return"Weak";case"medium":return"Medium";case"strong":return"Strong";case"very-strong":return"Very Strong";default:return"No Password"}}function pt(Ht){for(let se=0;se<Ht;se++)N();Oe.success(`Generated ${Ht} passwords`)}function lt(Ht){switch(Ht){case"strong":d(s,16),d(n,!0),d(c,!0),d(l,!0),d(v,!0),d(g,!0),d(u,!1);break;case"memorable":d(s,12),d(n,!0),d(c,!0),d(l,!0),d(v,!1),d(g,!1),d(u,!1);break;case"pin":d(s,4),d(n,!1),d(c,!1),d(l,!0),d(v,!1),d(g,!1),d(u,!1);break;case"passphrase":d(s,32),d(n,!1),d(c,!0),d(l,!1),d(v,!0),d(g,!1),d(u,!1),d(k," -_"),d(y,!0);break}N(),Oe.success(`Applied ${Ht} preset`)}we(()=>{N()});var mt=Pm(),ct=r(mt),xt=r(ct),Rt=r(xt);Rt.__click=[bm];var Vt=r(Rt);Ie(Vt,{class:"w-5 h-5 mr-2"});var Kt=o(xt,2),Qt=r(Kt),Wt=r(Qt);Hs(Wt,{class:"w-10 h-10 text-white"});var zt=o(ct,4),Bt=r(zt);Bt.__click=[ym,pt];var Lt=o(Bt,2);Lt.__click=[Oo,a,p];var Ct=r(Lt);qi(Ct,{class:"w-4 h-4 mr-2"});var X=o(zt,2),_t=r(X);fe(_t,20,()=>["strong","memorable","pin","passphrase"],Mr,(Ht,se)=>{var xe=_m();xe.__click=[hm,lt,se];var he=r(xe);Y(()=>b(he,se)),m(Ht,xe)});var ut=o(X,2),at=r(ut),L=r(at),ft=r(L),vt=o(r(ft),2),G=r(vt);{var tt=Ht=>{var se=km(),xe=r(se);Y((he,je)=>{ge(se,1,`text-sm font-medium ${he??""}`),b(xe,je)},[()=>C(E(e(a))),()=>rt(E(e(a)))]),m(Ht,se)};O(G,Ht=>{e(a)&&Ht(tt)})}var yt=o(G,2);yt.__click=[fm,a];var bt=r(yt);be(bt,{class:"w-4 h-4 mr-2"});var wt=o(ft,2),Ut=r(wt),Ot=o(wt,2);{var Nt=Ht=>{var se=wm(),xe=r(se),he=r(xe);Y(je=>ge(he,1,`h-full transition-all duration-300 ${je??""}`),[()=>E(e(a))==="weak"?"bg-[var(--ds-danger-500)] w-1/4":E(e(a))==="medium"?"bg-[var(--ds-warning-500)] w-2/4":E(e(a))==="strong"?"bg-[var(--ds-success-500)] w-3/4":"bg-[var(--ds-success-600)] w-full"]),m(Ht,se)};O(Ot,Ht=>{e(a)&&Ht(Nt)})}var Pt=o(L,2),ot=o(r(Pt),2),kt=r(ot),q=o(r(kt),2),Q=r(q),W=o(kt,2),A=o(ot,2),I=r(A),R=r(I),it=o(I,2),et=r(it),K=o(it,2),U=r(K),B=o(K,2),T=r(B),D=o(B,2),F=r(D),Z=o(A,2);{var j=Ht=>{var se=Cm(),xe=r(se);Tt(xe,()=>e(k),he=>d(k,he)),m(Ht,se)};O(Z,Ht=>{e(y)&&Ht(j)})}var nt=o(Z,2),Mt=r(nt),qt=r(Mt),St=o(Mt,2),J=r(St),dt=o(J,2);dt.textContent="Exclude Ambiguous Characters ({ } [ ] ( ) / \\ ' \" ` ~ , ; . < >)";var $t=o(nt,2),Ft=r($t);Ft.__click=N;var V=r(Ft);Er(V,{class:"w-4 h-4 mr-2"});var st=o(at,2),ht=r(st),At=r(ht),Jt=o(r(At),2);{var Xt=Ht=>{var se=$m();se.__click=[Oo,a,p],m(Ht,se)};O(Jt,Ht=>{e(p).length>0&&Ht(Xt)})}var Yt=o(At,2);{var ee=Ht=>{var se=Sm(),xe=r(se);Ka(xe,{class:"w-8 h-8 mb-2 opacity-50"}),m(Ht,se)},le=Ht=>{var se=Em();fe(se,21,()=>e(p),xe=>xe.timestamp.getTime(),(xe,he)=>{var je=Mm(),Ne=r(je),Be=r(Ne),De=r(Be),_e=r(De),Se=o(De,2),Ge=r(Se),Ae=r(Ge),Je=o(Ge,2),Xe=r(Je),mr=r(Xe),lr=o(Xe,2);lr.__click=[Tm,z,he];var Pe=r(lr);be(Pe,{class:"w-3.5 h-3.5"}),Y((tr,Ar,pr,xr)=>{b(_e,e(he).password),b(Ae,tr),ge(Xe,1,`text-xs px-2 py-0.5 rounded-full ${Ar??""} ${pr??""}`),b(mr,xr)},[()=>e(he).timestamp.toLocaleTimeString(),()=>H(e(he).strength),()=>C(e(he).strength),()=>rt(e(he).strength)]),m(xe,je)}),m(Ht,se)};O(Yt,Ht=>{e(p).length===0?Ht(ee):Ht(le,!1)})}var Gt=o(ut,2),de=r(Gt),ce=r(de),ae=r(ce);no(ae,{class:"w-5 h-5"});var me=o(de,2),pe=r(me),re=r(pe);hd(re,{class:"w-5 h-5"});var ve=o(me,2),Ce=r(ve),Te=r(Ce);Ka(Te,{class:"w-5 h-5"}),Y(()=>b(Q,e(s))),Tt(Ut,()=>e(a),Ht=>d(a,Ht)),Tt(W,()=>e(s),Ht=>d(s,Ht)),We(R,()=>e(n),Ht=>d(n,Ht)),We(et,()=>e(c),Ht=>d(c,Ht)),We(U,()=>e(l),Ht=>d(l,Ht)),We(T,()=>e(v),Ht=>d(v,Ht)),We(F,()=>e(y),Ht=>d(y,Ht)),We(qt,()=>e(g),Ht=>d(g,Ht)),We(J,()=>e(u),Ht=>d(u,Ht)),m(i,mt),jt()}ye(["click"]);function Am(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var Fa={},ds,zo;function Im(){return zo||(zo=1,ds=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),ds}var ls={},da={},Uo;function Aa(){if(Uo)return da;Uo=1;let i;const t=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return da.getSymbolSize=function(s){if(!s)throw new Error('"version" cannot be null or undefined');if(s<1||s>40)throw new Error('"version" should be in range from 1 to 40');return s*4+17},da.getSymbolTotalCodewords=function(s){return t[s]},da.getBCHDigit=function(a){let s=0;for(;a!==0;)s++,a>>>=1;return s},da.setToSJISFunction=function(s){if(typeof s!="function")throw new Error('"toSJISFunc" is not a valid function.');i=s},da.isKanjiModeEnabled=function(){return typeof i<"u"},da.toSJIS=function(s){return i(s)},da}var cs={},Go;function vo(){return Go||(Go=1,(function(i){i.L={bit:1},i.M={bit:0},i.Q={bit:3},i.H={bit:2};function t(a){if(typeof a!="string")throw new Error("Param is not a string");switch(a.toLowerCase()){case"l":case"low":return i.L;case"m":case"medium":return i.M;case"q":case"quartile":return i.Q;case"h":case"high":return i.H;default:throw new Error("Unknown EC Level: "+a)}}i.isValid=function(s){return s&&typeof s.bit<"u"&&s.bit>=0&&s.bit<4},i.from=function(s,n){if(i.isValid(s))return s;try{return t(s)}catch{return n}}})(cs)),cs}var vs,qo;function jm(){if(qo)return vs;qo=1;function i(){this.buffer=[],this.length=0}return i.prototype={get:function(t){const a=Math.floor(t/8);return(this.buffer[a]>>>7-t%8&1)===1},put:function(t,a){for(let s=0;s<a;s++)this.putBit((t>>>a-s-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(t){const a=Math.floor(this.length/8);this.buffer.length<=a&&this.buffer.push(0),t&&(this.buffer[a]|=128>>>this.length%8),this.length++}},vs=i,vs}var gs,Wo;function Nm(){if(Wo)return gs;Wo=1;function i(t){if(!t||t<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=t,this.data=new Uint8Array(t*t),this.reservedBit=new Uint8Array(t*t)}return i.prototype.set=function(t,a,s,n){const c=t*this.size+a;this.data[c]=s,n&&(this.reservedBit[c]=!0)},i.prototype.get=function(t,a){return this.data[t*this.size+a]},i.prototype.xor=function(t,a,s){this.data[t*this.size+a]^=s},i.prototype.isReserved=function(t,a){return this.reservedBit[t*this.size+a]},gs=i,gs}var us={},Jo;function Rm(){return Jo||(Jo=1,(function(i){const t=Aa().getSymbolSize;i.getRowColCoords=function(s){if(s===1)return[];const n=Math.floor(s/7)+2,c=t(s),l=c===145?26:Math.ceil((c-13)/(2*n-2))*2,v=[c-7];for(let g=1;g<n-1;g++)v[g]=v[g-1]-l;return v.push(6),v.reverse()},i.getPositions=function(s){const n=[],c=i.getRowColCoords(s),l=c.length;for(let v=0;v<l;v++)for(let g=0;g<l;g++)v===0&&g===0||v===0&&g===l-1||v===l-1&&g===0||n.push([c[v],c[g]]);return n}})(us)),us}var ms={},Vo;function Bm(){if(Vo)return ms;Vo=1;const i=Aa().getSymbolSize,t=7;return ms.getPositions=function(s){const n=i(s);return[[0,0],[n-t,0],[0,n-t]]},ms}var ps={},Yo;function Dm(){return Yo||(Yo=1,(function(i){i.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const t={N1:3,N2:3,N3:40,N4:10};i.isValid=function(n){return n!=null&&n!==""&&!isNaN(n)&&n>=0&&n<=7},i.from=function(n){return i.isValid(n)?parseInt(n,10):void 0},i.getPenaltyN1=function(n){const c=n.size;let l=0,v=0,g=0,u=null,p=null;for(let k=0;k<c;k++){v=g=0,u=p=null;for(let y=0;y<c;y++){let h=n.get(k,y);h===u?v++:(v>=5&&(l+=t.N1+(v-5)),u=h,v=1),h=n.get(y,k),h===p?g++:(g>=5&&(l+=t.N1+(g-5)),p=h,g=1)}v>=5&&(l+=t.N1+(v-5)),g>=5&&(l+=t.N1+(g-5))}return l},i.getPenaltyN2=function(n){const c=n.size;let l=0;for(let v=0;v<c-1;v++)for(let g=0;g<c-1;g++){const u=n.get(v,g)+n.get(v,g+1)+n.get(v+1,g)+n.get(v+1,g+1);(u===4||u===0)&&l++}return l*t.N2},i.getPenaltyN3=function(n){const c=n.size;let l=0,v=0,g=0;for(let u=0;u<c;u++){v=g=0;for(let p=0;p<c;p++)v=v<<1&2047|n.get(u,p),p>=10&&(v===1488||v===93)&&l++,g=g<<1&2047|n.get(p,u),p>=10&&(g===1488||g===93)&&l++}return l*t.N3},i.getPenaltyN4=function(n){let c=0;const l=n.data.length;for(let g=0;g<l;g++)c+=n.data[g];return Math.abs(Math.ceil(c*100/l/5)-10)*t.N4};function a(s,n,c){switch(s){case i.Patterns.PATTERN000:return(n+c)%2===0;case i.Patterns.PATTERN001:return n%2===0;case i.Patterns.PATTERN010:return c%3===0;case i.Patterns.PATTERN011:return(n+c)%3===0;case i.Patterns.PATTERN100:return(Math.floor(n/2)+Math.floor(c/3))%2===0;case i.Patterns.PATTERN101:return n*c%2+n*c%3===0;case i.Patterns.PATTERN110:return(n*c%2+n*c%3)%2===0;case i.Patterns.PATTERN111:return(n*c%3+(n+c)%2)%2===0;default:throw new Error("bad maskPattern:"+s)}}i.applyMask=function(n,c){const l=c.size;for(let v=0;v<l;v++)for(let g=0;g<l;g++)c.isReserved(g,v)||c.xor(g,v,a(n,g,v))},i.getBestMask=function(n,c){const l=Object.keys(i.Patterns).length;let v=0,g=1/0;for(let u=0;u<l;u++){c(u),i.applyMask(u,n);const p=i.getPenaltyN1(n)+i.getPenaltyN2(n)+i.getPenaltyN3(n)+i.getPenaltyN4(n);i.applyMask(u,n),p<g&&(g=p,v=u)}return v}})(ps)),ps}var _i={},Ko;function $d(){if(Ko)return _i;Ko=1;const i=vo(),t=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],a=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return _i.getBlocksCount=function(n,c){switch(c){case i.L:return t[(n-1)*4+0];case i.M:return t[(n-1)*4+1];case i.Q:return t[(n-1)*4+2];case i.H:return t[(n-1)*4+3];default:return}},_i.getTotalCodewordsCount=function(n,c){switch(c){case i.L:return a[(n-1)*4+0];case i.M:return a[(n-1)*4+1];case i.Q:return a[(n-1)*4+2];case i.H:return a[(n-1)*4+3];default:return}},_i}var xs={},ii={},Qo;function Fm(){if(Qo)return ii;Qo=1;const i=new Uint8Array(512),t=new Uint8Array(256);return(function(){let s=1;for(let n=0;n<255;n++)i[n]=s,t[s]=n,s<<=1,s&256&&(s^=285);for(let n=255;n<512;n++)i[n]=i[n-255]})(),ii.log=function(s){if(s<1)throw new Error("log("+s+")");return t[s]},ii.exp=function(s){return i[s]},ii.mul=function(s,n){return s===0||n===0?0:i[t[s]+t[n]]},ii}var Zo;function Hm(){return Zo||(Zo=1,(function(i){const t=Fm();i.mul=function(s,n){const c=new Uint8Array(s.length+n.length-1);for(let l=0;l<s.length;l++)for(let v=0;v<n.length;v++)c[l+v]^=t.mul(s[l],n[v]);return c},i.mod=function(s,n){let c=new Uint8Array(s);for(;c.length-n.length>=0;){const l=c[0];for(let g=0;g<n.length;g++)c[g]^=t.mul(n[g],l);let v=0;for(;v<c.length&&c[v]===0;)v++;c=c.slice(v)}return c},i.generateECPolynomial=function(s){let n=new Uint8Array([1]);for(let c=0;c<s;c++)n=i.mul(n,new Uint8Array([1,t.exp(c)]));return n}})(xs)),xs}var fs,Xo;function Om(){if(Xo)return fs;Xo=1;const i=Hm();function t(a){this.genPoly=void 0,this.degree=a,this.degree&&this.initialize(this.degree)}return t.prototype.initialize=function(s){this.degree=s,this.genPoly=i.generateECPolynomial(this.degree)},t.prototype.encode=function(s){if(!this.genPoly)throw new Error("Encoder not initialized");const n=new Uint8Array(s.length+this.degree);n.set(s);const c=i.mod(n,this.genPoly),l=this.degree-c.length;if(l>0){const v=new Uint8Array(this.degree);return v.set(c,l),v}return c},fs=t,fs}var bs={},ys={},hs={},tn;function Sd(){return tn||(tn=1,hs.isValid=function(t){return!isNaN(t)&&t>=1&&t<=40}),hs}var Hr={},en;function Td(){if(en)return Hr;en=1;const i="[0-9]+",t="[A-Z $%*+\\-./:]+";let a="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";a=a.replace(/u/g,"\\u");const s="(?:(?![A-Z0-9 $%*+\\-./:]|"+a+`)(?:.|[\r
]))+`;Hr.KANJI=new RegExp(a,"g"),Hr.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),Hr.BYTE=new RegExp(s,"g"),Hr.NUMERIC=new RegExp(i,"g"),Hr.ALPHANUMERIC=new RegExp(t,"g");const n=new RegExp("^"+a+"$"),c=new RegExp("^"+i+"$"),l=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return Hr.testKanji=function(g){return n.test(g)},Hr.testNumeric=function(g){return c.test(g)},Hr.testAlphanumeric=function(g){return l.test(g)},Hr}var rn;function Ia(){return rn||(rn=1,(function(i){const t=Sd(),a=Td();i.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},i.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},i.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},i.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},i.MIXED={bit:-1},i.getCharCountIndicator=function(c,l){if(!c.ccBits)throw new Error("Invalid mode: "+c);if(!t.isValid(l))throw new Error("Invalid version: "+l);return l>=1&&l<10?c.ccBits[0]:l<27?c.ccBits[1]:c.ccBits[2]},i.getBestModeForData=function(c){return a.testNumeric(c)?i.NUMERIC:a.testAlphanumeric(c)?i.ALPHANUMERIC:a.testKanji(c)?i.KANJI:i.BYTE},i.toString=function(c){if(c&&c.id)return c.id;throw new Error("Invalid mode")},i.isValid=function(c){return c&&c.bit&&c.ccBits};function s(n){if(typeof n!="string")throw new Error("Param is not a string");switch(n.toLowerCase()){case"numeric":return i.NUMERIC;case"alphanumeric":return i.ALPHANUMERIC;case"kanji":return i.KANJI;case"byte":return i.BYTE;default:throw new Error("Unknown mode: "+n)}}i.from=function(c,l){if(i.isValid(c))return c;try{return s(c)}catch{return l}}})(ys)),ys}var an;function zm(){return an||(an=1,(function(i){const t=Aa(),a=$d(),s=vo(),n=Ia(),c=Sd(),l=7973,v=t.getBCHDigit(l);function g(y,h,_){for(let $=1;$<=40;$++)if(h<=i.getCapacity($,_,y))return $}function u(y,h){return n.getCharCountIndicator(y,h)+4}function p(y,h){let _=0;return y.forEach(function($){const M=u($.mode,h);_+=M+$.getBitsLength()}),_}function k(y,h){for(let _=1;_<=40;_++)if(p(y,_)<=i.getCapacity(_,h,n.MIXED))return _}i.from=function(h,_){return c.isValid(h)?parseInt(h,10):_},i.getCapacity=function(h,_,$){if(!c.isValid(h))throw new Error("Invalid QR Code version");typeof $>"u"&&($=n.BYTE);const M=t.getSymbolTotalCodewords(h),P=a.getTotalCodewordsCount(h,_),S=(M-P)*8;if($===n.MIXED)return S;const N=S-u($,h);switch($){case n.NUMERIC:return Math.floor(N/10*3);case n.ALPHANUMERIC:return Math.floor(N/11*2);case n.KANJI:return Math.floor(N/13);case n.BYTE:default:return Math.floor(N/8)}},i.getBestVersionForData=function(h,_){let $;const M=s.from(_,s.M);if(Array.isArray(h)){if(h.length>1)return k(h,M);if(h.length===0)return 1;$=h[0]}else $=h;return g($.mode,$.getLength(),M)},i.getEncodedBits=function(h){if(!c.isValid(h)||h<7)throw new Error("Invalid QR Code version");let _=h<<12;for(;t.getBCHDigit(_)-v>=0;)_^=l<<t.getBCHDigit(_)-v;return h<<12|_}})(bs)),bs}var _s={},sn;function Um(){if(sn)return _s;sn=1;const i=Aa(),t=1335,a=21522,s=i.getBCHDigit(t);return _s.getEncodedBits=function(c,l){const v=c.bit<<3|l;let g=v<<10;for(;i.getBCHDigit(g)-s>=0;)g^=t<<i.getBCHDigit(g)-s;return(v<<10|g)^a},_s}var ks={},ws,on;function Gm(){if(on)return ws;on=1;const i=Ia();function t(a){this.mode=i.NUMERIC,this.data=a.toString()}return t.getBitsLength=function(s){return 10*Math.floor(s/3)+(s%3?s%3*3+1:0)},t.prototype.getLength=function(){return this.data.length},t.prototype.getBitsLength=function(){return t.getBitsLength(this.data.length)},t.prototype.write=function(s){let n,c,l;for(n=0;n+3<=this.data.length;n+=3)c=this.data.substr(n,3),l=parseInt(c,10),s.put(l,10);const v=this.data.length-n;v>0&&(c=this.data.substr(n),l=parseInt(c,10),s.put(l,v*3+1))},ws=t,ws}var Cs,nn;function qm(){if(nn)return Cs;nn=1;const i=Ia(),t=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function a(s){this.mode=i.ALPHANUMERIC,this.data=s}return a.getBitsLength=function(n){return 11*Math.floor(n/2)+6*(n%2)},a.prototype.getLength=function(){return this.data.length},a.prototype.getBitsLength=function(){return a.getBitsLength(this.data.length)},a.prototype.write=function(n){let c;for(c=0;c+2<=this.data.length;c+=2){let l=t.indexOf(this.data[c])*45;l+=t.indexOf(this.data[c+1]),n.put(l,11)}this.data.length%2&&n.put(t.indexOf(this.data[c]),6)},Cs=a,Cs}var $s,dn;function Wm(){if(dn)return $s;dn=1;const i=Ia();function t(a){this.mode=i.BYTE,typeof a=="string"?this.data=new TextEncoder().encode(a):this.data=new Uint8Array(a)}return t.getBitsLength=function(s){return s*8},t.prototype.getLength=function(){return this.data.length},t.prototype.getBitsLength=function(){return t.getBitsLength(this.data.length)},t.prototype.write=function(a){for(let s=0,n=this.data.length;s<n;s++)a.put(this.data[s],8)},$s=t,$s}var Ss,ln;function Jm(){if(ln)return Ss;ln=1;const i=Ia(),t=Aa();function a(s){this.mode=i.KANJI,this.data=s}return a.getBitsLength=function(n){return n*13},a.prototype.getLength=function(){return this.data.length},a.prototype.getBitsLength=function(){return a.getBitsLength(this.data.length)},a.prototype.write=function(s){let n;for(n=0;n<this.data.length;n++){let c=t.toSJIS(this.data[n]);if(c>=33088&&c<=40956)c-=33088;else if(c>=57408&&c<=60351)c-=49472;else throw new Error("Invalid SJIS character: "+this.data[n]+`
Make sure your charset is UTF-8`);c=(c>>>8&255)*192+(c&255),s.put(c,13)}},Ss=a,Ss}var Ts={exports:{}},cn;function Vm(){return cn||(cn=1,(function(i){var t={single_source_shortest_paths:function(a,s,n){var c={},l={};l[s]=0;var v=t.PriorityQueue.make();v.push(s,0);for(var g,u,p,k,y,h,_,$,M;!v.empty();){g=v.pop(),u=g.value,k=g.cost,y=a[u]||{};for(p in y)y.hasOwnProperty(p)&&(h=y[p],_=k+h,$=l[p],M=typeof l[p]>"u",(M||$>_)&&(l[p]=_,v.push(p,_),c[p]=u))}if(typeof n<"u"&&typeof l[n]>"u"){var P=["Could not find a path from ",s," to ",n,"."].join("");throw new Error(P)}return c},extract_shortest_path_from_predecessor_list:function(a,s){for(var n=[],c=s;c;)n.push(c),a[c],c=a[c];return n.reverse(),n},find_path:function(a,s,n){var c=t.single_source_shortest_paths(a,s,n);return t.extract_shortest_path_from_predecessor_list(c,n)},PriorityQueue:{make:function(a){var s=t.PriorityQueue,n={},c;a=a||{};for(c in s)s.hasOwnProperty(c)&&(n[c]=s[c]);return n.queue=[],n.sorter=a.sorter||s.default_sorter,n},default_sorter:function(a,s){return a.cost-s.cost},push:function(a,s){var n={value:a,cost:s};this.queue.push(n),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};i.exports=t})(Ts)),Ts.exports}var vn;function Ym(){return vn||(vn=1,(function(i){const t=Ia(),a=Gm(),s=qm(),n=Wm(),c=Jm(),l=Td(),v=Aa(),g=Vm();function u(P){return unescape(encodeURIComponent(P)).length}function p(P,S,N){const f=[];let E;for(;(E=P.exec(N))!==null;)f.push({data:E[0],index:E.index,mode:S,length:E[0].length});return f}function k(P){const S=p(l.NUMERIC,t.NUMERIC,P),N=p(l.ALPHANUMERIC,t.ALPHANUMERIC,P);let f,E;return v.isKanjiModeEnabled()?(f=p(l.BYTE,t.BYTE,P),E=p(l.KANJI,t.KANJI,P)):(f=p(l.BYTE_KANJI,t.BYTE,P),E=[]),S.concat(N,f,E).sort(function(H,z){return H.index-z.index}).map(function(H){return{data:H.data,mode:H.mode,length:H.length}})}function y(P,S){switch(S){case t.NUMERIC:return a.getBitsLength(P);case t.ALPHANUMERIC:return s.getBitsLength(P);case t.KANJI:return c.getBitsLength(P);case t.BYTE:return n.getBitsLength(P)}}function h(P){return P.reduce(function(S,N){const f=S.length-1>=0?S[S.length-1]:null;return f&&f.mode===N.mode?(S[S.length-1].data+=N.data,S):(S.push(N),S)},[])}function _(P){const S=[];for(let N=0;N<P.length;N++){const f=P[N];switch(f.mode){case t.NUMERIC:S.push([f,{data:f.data,mode:t.ALPHANUMERIC,length:f.length},{data:f.data,mode:t.BYTE,length:f.length}]);break;case t.ALPHANUMERIC:S.push([f,{data:f.data,mode:t.BYTE,length:f.length}]);break;case t.KANJI:S.push([f,{data:f.data,mode:t.BYTE,length:u(f.data)}]);break;case t.BYTE:S.push([{data:f.data,mode:t.BYTE,length:u(f.data)}])}}return S}function $(P,S){const N={},f={start:{}};let E=["start"];for(let C=0;C<P.length;C++){const H=P[C],z=[];for(let rt=0;rt<H.length;rt++){const pt=H[rt],lt=""+C+rt;z.push(lt),N[lt]={node:pt,lastCount:0},f[lt]={};for(let mt=0;mt<E.length;mt++){const ct=E[mt];N[ct]&&N[ct].node.mode===pt.mode?(f[ct][lt]=y(N[ct].lastCount+pt.length,pt.mode)-y(N[ct].lastCount,pt.mode),N[ct].lastCount+=pt.length):(N[ct]&&(N[ct].lastCount=pt.length),f[ct][lt]=y(pt.length,pt.mode)+4+t.getCharCountIndicator(pt.mode,S))}}E=z}for(let C=0;C<E.length;C++)f[E[C]].end=0;return{map:f,table:N}}function M(P,S){let N;const f=t.getBestModeForData(P);if(N=t.from(S,f),N!==t.BYTE&&N.bit<f.bit)throw new Error('"'+P+'" cannot be encoded with mode '+t.toString(N)+`.
 Suggested mode is: `+t.toString(f));switch(N===t.KANJI&&!v.isKanjiModeEnabled()&&(N=t.BYTE),N){case t.NUMERIC:return new a(P);case t.ALPHANUMERIC:return new s(P);case t.KANJI:return new c(P);case t.BYTE:return new n(P)}}i.fromArray=function(S){return S.reduce(function(N,f){return typeof f=="string"?N.push(M(f,null)):f.data&&N.push(M(f.data,f.mode)),N},[])},i.fromString=function(S,N){const f=k(S,v.isKanjiModeEnabled()),E=_(f),C=$(E,N),H=g.find_path(C.map,"start","end"),z=[];for(let rt=1;rt<H.length-1;rt++)z.push(C.table[H[rt]].node);return i.fromArray(h(z))},i.rawSplit=function(S){return i.fromArray(k(S,v.isKanjiModeEnabled()))}})(ks)),ks}var gn;function Km(){if(gn)return ls;gn=1;const i=Aa(),t=vo(),a=jm(),s=Nm(),n=Rm(),c=Bm(),l=Dm(),v=$d(),g=Om(),u=zm(),p=Um(),k=Ia(),y=Ym();function h(C,H){const z=C.size,rt=c.getPositions(H);for(let pt=0;pt<rt.length;pt++){const lt=rt[pt][0],mt=rt[pt][1];for(let ct=-1;ct<=7;ct++)if(!(lt+ct<=-1||z<=lt+ct))for(let xt=-1;xt<=7;xt++)mt+xt<=-1||z<=mt+xt||(ct>=0&&ct<=6&&(xt===0||xt===6)||xt>=0&&xt<=6&&(ct===0||ct===6)||ct>=2&&ct<=4&&xt>=2&&xt<=4?C.set(lt+ct,mt+xt,!0,!0):C.set(lt+ct,mt+xt,!1,!0))}}function _(C){const H=C.size;for(let z=8;z<H-8;z++){const rt=z%2===0;C.set(z,6,rt,!0),C.set(6,z,rt,!0)}}function $(C,H){const z=n.getPositions(H);for(let rt=0;rt<z.length;rt++){const pt=z[rt][0],lt=z[rt][1];for(let mt=-2;mt<=2;mt++)for(let ct=-2;ct<=2;ct++)mt===-2||mt===2||ct===-2||ct===2||mt===0&&ct===0?C.set(pt+mt,lt+ct,!0,!0):C.set(pt+mt,lt+ct,!1,!0)}}function M(C,H){const z=C.size,rt=u.getEncodedBits(H);let pt,lt,mt;for(let ct=0;ct<18;ct++)pt=Math.floor(ct/3),lt=ct%3+z-8-3,mt=(rt>>ct&1)===1,C.set(pt,lt,mt,!0),C.set(lt,pt,mt,!0)}function P(C,H,z){const rt=C.size,pt=p.getEncodedBits(H,z);let lt,mt;for(lt=0;lt<15;lt++)mt=(pt>>lt&1)===1,lt<6?C.set(lt,8,mt,!0):lt<8?C.set(lt+1,8,mt,!0):C.set(rt-15+lt,8,mt,!0),lt<8?C.set(8,rt-lt-1,mt,!0):lt<9?C.set(8,15-lt-1+1,mt,!0):C.set(8,15-lt-1,mt,!0);C.set(rt-8,8,1,!0)}function S(C,H){const z=C.size;let rt=-1,pt=z-1,lt=7,mt=0;for(let ct=z-1;ct>0;ct-=2)for(ct===6&&ct--;;){for(let xt=0;xt<2;xt++)if(!C.isReserved(pt,ct-xt)){let Rt=!1;mt<H.length&&(Rt=(H[mt]>>>lt&1)===1),C.set(pt,ct-xt,Rt),lt--,lt===-1&&(mt++,lt=7)}if(pt+=rt,pt<0||z<=pt){pt-=rt,rt=-rt;break}}}function N(C,H,z){const rt=new a;z.forEach(function(xt){rt.put(xt.mode.bit,4),rt.put(xt.getLength(),k.getCharCountIndicator(xt.mode,C)),xt.write(rt)});const pt=i.getSymbolTotalCodewords(C),lt=v.getTotalCodewordsCount(C,H),mt=(pt-lt)*8;for(rt.getLengthInBits()+4<=mt&&rt.put(0,4);rt.getLengthInBits()%8!==0;)rt.putBit(0);const ct=(mt-rt.getLengthInBits())/8;for(let xt=0;xt<ct;xt++)rt.put(xt%2?17:236,8);return f(rt,C,H)}function f(C,H,z){const rt=i.getSymbolTotalCodewords(H),pt=v.getTotalCodewordsCount(H,z),lt=rt-pt,mt=v.getBlocksCount(H,z),ct=rt%mt,xt=mt-ct,Rt=Math.floor(rt/mt),Vt=Math.floor(lt/mt),Kt=Vt+1,Qt=Rt-Vt,Wt=new g(Qt);let zt=0;const Bt=new Array(mt),Lt=new Array(mt);let Ct=0;const X=new Uint8Array(C.buffer);for(let ft=0;ft<mt;ft++){const vt=ft<xt?Vt:Kt;Bt[ft]=X.slice(zt,zt+vt),Lt[ft]=Wt.encode(Bt[ft]),zt+=vt,Ct=Math.max(Ct,vt)}const _t=new Uint8Array(rt);let ut=0,at,L;for(at=0;at<Ct;at++)for(L=0;L<mt;L++)at<Bt[L].length&&(_t[ut++]=Bt[L][at]);for(at=0;at<Qt;at++)for(L=0;L<mt;L++)_t[ut++]=Lt[L][at];return _t}function E(C,H,z,rt){let pt;if(Array.isArray(C))pt=y.fromArray(C);else if(typeof C=="string"){let Rt=H;if(!Rt){const Vt=y.rawSplit(C);Rt=u.getBestVersionForData(Vt,z)}pt=y.fromString(C,Rt||40)}else throw new Error("Invalid data");const lt=u.getBestVersionForData(pt,z);if(!lt)throw new Error("The amount of data is too big to be stored in a QR Code");if(!H)H=lt;else if(H<lt)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+lt+`.
`);const mt=N(H,z,pt),ct=i.getSymbolSize(H),xt=new s(ct);return h(xt,H),_(xt),$(xt,H),P(xt,z,0),H>=7&&M(xt,H),S(xt,mt),isNaN(rt)&&(rt=l.getBestMask(xt,P.bind(null,xt,z))),l.applyMask(rt,xt),P(xt,z,rt),{modules:xt,version:H,errorCorrectionLevel:z,maskPattern:rt,segments:pt}}return ls.create=function(H,z){if(typeof H>"u"||H==="")throw new Error("No input text");let rt=t.M,pt,lt;return typeof z<"u"&&(rt=t.from(z.errorCorrectionLevel,t.M),pt=u.from(z.version),lt=l.from(z.maskPattern),z.toSJISFunc&&i.setToSJISFunction(z.toSJISFunc)),E(H,pt,rt,lt)},ls}var Ms={},Es={},un;function Md(){return un||(un=1,(function(i){function t(a){if(typeof a=="number"&&(a=a.toString()),typeof a!="string")throw new Error("Color should be defined as hex string");let s=a.slice().replace("#","").split("");if(s.length<3||s.length===5||s.length>8)throw new Error("Invalid hex color: "+a);(s.length===3||s.length===4)&&(s=Array.prototype.concat.apply([],s.map(function(c){return[c,c]}))),s.length===6&&s.push("F","F");const n=parseInt(s.join(""),16);return{r:n>>24&255,g:n>>16&255,b:n>>8&255,a:n&255,hex:"#"+s.slice(0,6).join("")}}i.getOptions=function(s){s||(s={}),s.color||(s.color={});const n=typeof s.margin>"u"||s.margin===null||s.margin<0?4:s.margin,c=s.width&&s.width>=21?s.width:void 0,l=s.scale||4;return{width:c,scale:c?4:l,margin:n,color:{dark:t(s.color.dark||"#000000ff"),light:t(s.color.light||"#ffffffff")},type:s.type,rendererOpts:s.rendererOpts||{}}},i.getScale=function(s,n){return n.width&&n.width>=s+n.margin*2?n.width/(s+n.margin*2):n.scale},i.getImageWidth=function(s,n){const c=i.getScale(s,n);return Math.floor((s+n.margin*2)*c)},i.qrToImageData=function(s,n,c){const l=n.modules.size,v=n.modules.data,g=i.getScale(l,c),u=Math.floor((l+c.margin*2)*g),p=c.margin*g,k=[c.color.light,c.color.dark];for(let y=0;y<u;y++)for(let h=0;h<u;h++){let _=(y*u+h)*4,$=c.color.light;if(y>=p&&h>=p&&y<u-p&&h<u-p){const M=Math.floor((y-p)/g),P=Math.floor((h-p)/g);$=k[v[M*l+P]?1:0]}s[_++]=$.r,s[_++]=$.g,s[_++]=$.b,s[_]=$.a}}})(Es)),Es}var mn;function Qm(){return mn||(mn=1,(function(i){const t=Md();function a(n,c,l){n.clearRect(0,0,c.width,c.height),c.style||(c.style={}),c.height=l,c.width=l,c.style.height=l+"px",c.style.width=l+"px"}function s(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}i.render=function(c,l,v){let g=v,u=l;typeof g>"u"&&(!l||!l.getContext)&&(g=l,l=void 0),l||(u=s()),g=t.getOptions(g);const p=t.getImageWidth(c.modules.size,g),k=u.getContext("2d"),y=k.createImageData(p,p);return t.qrToImageData(y.data,c,g),a(k,u,p),k.putImageData(y,0,0),u},i.renderToDataURL=function(c,l,v){let g=v;typeof g>"u"&&(!l||!l.getContext)&&(g=l,l=void 0),g||(g={});const u=i.render(c,l,g),p=g.type||"image/png",k=g.rendererOpts||{};return u.toDataURL(p,k.quality)}})(Ms)),Ms}var Ps={},pn;function Zm(){if(pn)return Ps;pn=1;const i=Md();function t(n,c){const l=n.a/255,v=c+'="'+n.hex+'"';return l<1?v+" "+c+'-opacity="'+l.toFixed(2).slice(1)+'"':v}function a(n,c,l){let v=n+c;return typeof l<"u"&&(v+=" "+l),v}function s(n,c,l){let v="",g=0,u=!1,p=0;for(let k=0;k<n.length;k++){const y=Math.floor(k%c),h=Math.floor(k/c);!y&&!u&&(u=!0),n[k]?(p++,k>0&&y>0&&n[k-1]||(v+=u?a("M",y+l,.5+h+l):a("m",g,0),g=0,u=!1),y+1<c&&n[k+1]||(v+=a("h",p),p=0)):g++}return v}return Ps.render=function(c,l,v){const g=i.getOptions(l),u=c.modules.size,p=c.modules.data,k=u+g.margin*2,y=g.color.light.a?"<path "+t(g.color.light,"fill")+' d="M0 0h'+k+"v"+k+'H0z"/>':"",h="<path "+t(g.color.dark,"stroke")+' d="'+s(p,u,g.margin)+'"/>',_='viewBox="0 0 '+k+" "+k+'"',M='<svg xmlns="http://www.w3.org/2000/svg" '+(g.width?'width="'+g.width+'" height="'+g.width+'" ':"")+_+' shape-rendering="crispEdges">'+y+h+`</svg>
`;return typeof v=="function"&&v(null,M),M},Ps}var xn;function Xm(){if(xn)return Fa;xn=1;const i=Im(),t=Km(),a=Qm(),s=Zm();function n(c,l,v,g,u){const p=[].slice.call(arguments,1),k=p.length,y=typeof p[k-1]=="function";if(!y&&!i())throw new Error("Callback required as last argument");if(y){if(k<2)throw new Error("Too few arguments provided");k===2?(u=v,v=l,l=g=void 0):k===3&&(l.getContext&&typeof u>"u"?(u=g,g=void 0):(u=g,g=v,v=l,l=void 0))}else{if(k<1)throw new Error("Too few arguments provided");return k===1?(v=l,l=g=void 0):k===2&&!l.getContext&&(g=v,v=l,l=void 0),new Promise(function(h,_){try{const $=t.create(v,g);h(c($,l,g))}catch($){_($)}})}try{const h=t.create(v,g);u(null,c(h,l,g))}catch(h){u(h)}}return Fa.create=t.create,Fa.toCanvas=n.bind(null,a.render),Fa.toDataURL=n.bind(null,a.renderToDataURL),Fa.toString=n.bind(null,function(c,l,v){return s.render(c,v)}),Fa}var tp=Xm();const ep=Am(tp);function rp(i,t){e(t)&&fetch(e(t)).then(a=>a.blob()).then(a=>{const s=new ClipboardItem({"image/png":a});navigator.clipboard.write([s]),Oe.success("QR Code copied to clipboard")}).catch(()=>{Oe.error("Failed to copy QR Code")})}function ap(i,t,a,s,n,c,l,v,g){d(t,""),d(a,""),d(s,""),d(n,"300"),d(c,"#FFFFFF"),d(l,"#000000"),d(v,"M"),d(g,!0),Oe.success("Form reset")}function ip(){Ee("/tools")}var sp=w('<p class="mt-1 text-sm text-[var(--ds-danger-500)]"> </p>'),op=w("<option> </option>"),np=w('<div class="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col items-center"><div class="mb-6 p-4 bg-white rounded-lg shadow-sm"><img alt="Generated QR Code" class="max-w-full h-auto rounded"/></div> <div class="flex flex-wrap gap-3 justify-center w-full"><button class="btn btn-primary btn-block sm:w-auto"><!> Download PNG</button> <button class="btn btn-secondary btn-block sm:w-auto"><!> Copy Image</button></div></div>'),dp=w('<div class="bg-[var(--ds-danger-100)] dark:bg-[var(--ds-danger-900)/20] border border-[var(--ds-danger-200)] dark:border-[var(--ds-danger-800)] rounded-xl p-6"><p class="text-[var(--ds-danger-600)] dark:text-[var(--ds-danger-400)] text-center"> </p></div>'),lp=w('<div class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-12 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400"><!> <p class="text-center">Enter text and click "Generate" to create your QR code</p></div>'),cp=w('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="btn btn-primary"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--ds-success-400)] to-[var(--ds-success-600)] rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">QR Code Generator</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Generate custom QR codes for URLs, text, or any data with customizable options.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">QR Code Generator</li></ol></nav> <div class="mb-6 flex justify-center flex-wrap gap-2"><button class="btn btn-primary btn-sm"><!> Generate</button> <button class="btn btn-primary btn-sm">Reset</button></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-8"><div class="space-y-6"><div><label for="text-input" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Text or URL</label> <textarea id="text-input" placeholder="Enter text, URL, or any data to encode..." rows="4"></textarea> <!></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-6"><div class="flex items-center gap-2 mb-2 text-gray-900 dark:text-white"><!> <h3 class="text-lg font-semibold">Customization</h3></div> <div><div class="flex justify-between items-center mb-2"><label for="size" class="text-sm font-medium text-gray-700 dark:text-gray-300"> </label></div> <input id="size" type="range" min="100" max="500" step="50" class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[var(--ds-success-500)]"/></div> <div class="grid grid-cols-2 gap-4"><div><label for="bg-color" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Background</label> <input id="bg-color" type="color" class="input h-12 p-1 w-full"/></div> <div><label for="fg-color" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Foreground</label> <input id="fg-color" type="color" class="input h-12 p-1 w-full"/></div></div> <div><label for="error-correction" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Error Correction Level</label> <select id="error-correction" class="select"></select></div> <div class="flex items-center"><input type="checkbox" id="include-margin" class="w-4 h-4 text-[var(--ds-success-600)] bg-gray-100 border-gray-300 rounded focus:ring-[var(--ds-success-500)] dark:focus:ring-[var(--ds-success-600)] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/> <label for="include-margin" class="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">Include margin</label></div></div></div> <div class="space-y-6"><div><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Generated QR Code</h3> <!></div> <div class="bg-[var(--ds-success-100)] dark:bg-[var(--ds-success-900)/20] border border-[var(--ds-success-200)] dark:border-[var(--ds-success-800)] rounded-xl p-4"><div class="flex items-center gap-2 mb-2 text-[var(--ds-success-800)] dark:text-[var(--ds-success-200)]"><!> <h4 class="text-sm font-semibold">Tips</h4></div> <ul class="text-sm text-[var(--ds-success-700)] dark:text-[var(--ds-success-300)] space-y-1 list-disc list-inside"><li>QR codes can store up to 4,296 alphanumeric characters</li> <li>Higher error correction levels create more complex but more robust codes</li> <li>Test your QR code before using it in production</li> <li>Ensure good contrast between foreground and background colors</li></ul></div></div></div></div>');function vp(i,t){It(t,!0);let a=x(""),s=x(""),n=x(""),c=x("300"),l=x("#FFFFFF"),v=x("#000000"),g=x("M"),u=x(!0);const p=[{value:"L",label:"Low (7%)"},{value:"M",label:"Medium (15%)"},{value:"Q",label:"Quartile (25%)"},{value:"H",label:"High (30%)"}];async function k(){if(!e(a).trim()){d(n,"Please enter some text or URL"),d(s,"");return}try{const ot={width:parseInt(e(c)),margin:e(u)?4:0,color:{dark:e(v),light:e(l)},errorCorrectionLevel:e(g)};d(s,await ep.toDataURL(e(a),ot),!0),d(n,""),Oe.success("QR Code generated successfully")}catch(ot){d(n,"Failed to generate QR code"),d(s,""),console.error("QR Code generation error:",ot),Oe.error("Failed to generate QR code")}}function y(){if(!e(s))return;const ot=document.createElement("a");ot.download="qrcode.png",ot.href=e(s),ot.click(),Oe.success("QR Code downloaded")}qr(()=>{d(a,"https://farizink.dev"),k()});var h=cp(),_=r(h),$=r(_),M=r($);M.__click=[ip];var P=r(M);Ie(P,{class:"w-5 h-5 mr-2"});var S=o($,2),N=r(S),f=r(N);Os(f,{class:"w-10 h-10 text-white"});var E=o(_,4),C=r(E);C.__click=k;var H=r(C);Er(H,{class:"w-4 h-4 mr-2"});var z=o(C,2);z.__click=[ap,a,s,n,c,l,v,g,u];var rt=o(E,2),pt=r(rt),lt=r(pt),mt=o(r(lt),2),ct=o(mt,2);{var xt=ot=>{var kt=sp(),q=r(kt);Y(()=>b(q,e(n))),m(ot,kt)};O(ct,ot=>{e(n)&&ot(xt)})}var Rt=o(lt,2),Vt=r(Rt),Kt=r(Vt);hd(Kt,{class:"w-5 h-5"});var Qt=o(Vt,2),Wt=r(Qt),zt=r(Wt),Bt=r(zt),Lt=o(Wt,2),Ct=o(Qt,2),X=r(Ct),_t=o(r(X),2),ut=o(X,2),at=o(r(ut),2),L=o(Ct,2),ft=o(r(L),2);fe(ft,21,()=>p,Mr,(ot,kt)=>{var q=op(),Q=r(q),W={};Y(()=>{b(Q,e(kt).label),W!==(W=e(kt).value)&&(q.value=(q.__value=e(kt).value)??"")}),m(ot,q)});var vt=o(L,2),G=r(vt),tt=o(pt,2),yt=r(tt),bt=o(r(yt),2);{var wt=ot=>{var kt=np(),q=r(kt),Q=r(q),W=o(q,2),A=r(W);A.__click=y;var I=r(A);Xa(I,{class:"w-4 h-4 mr-2"});var R=o(A,2);R.__click=[rp,s];var it=r(R);be(it,{class:"w-4 h-4 mr-2"}),Y(()=>{Dt(Q,"src",e(s)),Ke(Q,`max-width: ${e(c)??""}px; max-height: ${e(c)??""}px;`)}),m(ot,kt)},Ut=ot=>{var kt=Et(),q=gt(kt);{var Q=A=>{var I=dp(),R=r(I),it=r(R);Y(()=>b(it,e(n))),m(A,I)},W=A=>{var I=lp(),R=r(I);Os(R,{class:"w-12 h-12 mb-4 opacity-50"}),m(A,I)};O(q,A=>{e(n)?A(Q):A(W,!1)},!0)}m(ot,kt)};O(bt,ot=>{e(s)?ot(wt):ot(Ut,!1)})}var Ot=o(yt,2),Nt=r(Ot),Pt=r(Nt);pa(Pt,{class:"w-4 h-4"}),Y(()=>{ge(mt,1,`textarea ${e(n)?"border-[var(--ds-danger-500)] focus:border-[var(--ds-danger-500)] focus:ring-[var(--ds-danger-500)]":""}`),b(Bt,`Size: ${e(c)??""}px`)}),Tt(mt,()=>e(a),ot=>d(a,ot)),Tt(Lt,()=>e(c),ot=>d(c,ot)),Tt(_t,()=>e(l),ot=>d(l,ot)),Tt(at,()=>e(v),ot=>d(v,ot)),cr(ft,()=>e(g),ot=>d(g,ot)),We(G,()=>e(u),ot=>d(u,ot)),m(i,h),jt()}ye(["click"]);function gp(i,t,a){navigator.clipboard.writeText(e(t)).then(()=>{d(a,!0),setTimeout(()=>{d(a,!1)},2e3)})}function up(i,t,a){d(t,""),d(a,"")}function mp(i,t,a){const s=e(t);d(t,e(a),!0),d(a,s,!0)}function pp(){Ee("/tools")}var xp=w('<meta name="description" content="Convert text between different cases: uppercase, lowercase, title case, camelCase, snake_case, kebab-case, and more"/>'),fp=(i,t,a)=>d(t,a(),!0),bp=w('<div class="absolute top-1 right-1"><div class="w-2 h-2 bg-[var(--ds-secondary-500)] rounded-full"></div></div>'),yp=w('<button type="button"><div class="flex items-center justify-center mb-2"><!></div> <div class="text-sm font-medium text-gray-900 dark:text-white capitalize mb-1"> </div> <div class="text-xs text-gray-500 dark:text-gray-400 font-mono text-center"> </div> <!></button>'),hp=w('<div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"><div class="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-600 dark:text-gray-400"><div><span class="font-medium">Characters:</span> </div> <div><span class="font-medium">No spaces:</span> </div> <div><span class="font-medium">Words:</span> </div> <div><span class="font-medium">Sentences:</span> </div> <div><span class="font-medium">Lines:</span> </div></div></div>'),_p=(i,t,a)=>{d(t,"Hello World! This is a SAMPLE text for TESTING."),d(a,"uppercase")},kp=(i,t)=>d(t,"uppercase"),wp=(i,t)=>d(t,"lowercase"),Cp=(i,t)=>d(t,"title"),$p=w('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="btn btn-primary"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--ds-secondary-400)] to-[var(--ds-secondary-600)] rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Text Case Converter</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Convert text between different case formats with ease</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Text Case Converter</li></ol></nav> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6"><h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Select Case Type</h2> <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3"></div></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><div class="flex items-center justify-between mb-4"><h2 class="text-xl font-semibold text-gray-900 dark:text-white">Input Text</h2> <button class="btn btn-primary btn-sm">Clear</button></div> <textarea class="textarea" placeholder="Enter your text here..."></textarea> <!></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><div class="flex items-center justify-between mb-4"><h2 class="text-xl font-semibold text-gray-900 dark:text-white">Converted Text</h2> <div class="flex items-center gap-2"><button class="btn btn-primary btn-sm" title="Swap input and output"><!></button> <button class="btn btn-primary btn-sm"><!> </button></div></div> <textarea class="textarea" placeholder="Converted text will appear here..."></textarea> <div class="mt-4 flex gap-2"><button class="btn btn-primary w-full">Download as File</button></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2> <div class="grid grid-cols-2 md:grid-cols-4 gap-3"><button class="btn btn-primary btn-sm">Load Sample Text</button> <button class="btn btn-primary btn-sm">UPPERCASE</button> <button class="btn btn-primary btn-sm">lowercase</button> <button class="btn btn-primary btn-sm">Title Case</button></div></div></div>');function Sp(i,t){It(t,!0);let a=x(""),s=x(""),n=x(!1),c=x("uppercase");const l={uppercase:L=>L.toUpperCase(),lowercase:L=>L.toLowerCase(),title:L=>L.replace(/\w\S*/g,ft=>ft.charAt(0).toUpperCase()+ft.substr(1).toLowerCase()),camelCase:L=>L.replace(/(?:^\w|[A-Z]|\b\w)/g,(ft,vt)=>vt===0?ft.toLowerCase():ft.toUpperCase()).replace(/\s+/g,""),snakeCase:L=>L.toLowerCase().replace(/\W+/g," ").split(/ |\B(?=[A-Z])/).join("_"),kebabCase:L=>L.toLowerCase().replace(/\W+/g," ").split(/ |\B(?=[A-Z])/).join("-"),pascalCase:L=>L.replace(/(?:^\w|[A-Z]|\b\w)/g,ft=>ft.toUpperCase()).replace(/\s+/g,""),sentence:L=>L.charAt(0).toUpperCase()+L.slice(1).toLowerCase(),alternating:L=>L.split("").map((ft,vt)=>vt%2===0?ft.toLowerCase():ft.toUpperCase()).join(""),inverse:L=>L.split("").map(ft=>ft===ft.toUpperCase()?ft.toLowerCase():ft.toUpperCase()).join("")};function v(){if(!e(a).trim()){d(s,"");return}const L=l[e(c)];d(s,L(e(a)),!0)}we(()=>{e(a)?v():d(s,"")});function g(){const L=new Blob([e(s)],{type:"text/plain"}),ft=URL.createObjectURL(L),vt=document.createElement("a");vt.href=ft,vt.download=`text-${e(c)}.txt`,document.body.appendChild(vt),vt.click(),document.body.removeChild(vt),URL.revokeObjectURL(ft)}const u=ue(()=>e(a)?{characters:e(a).length,charactersNoSpaces:e(a).replace(/\s/g,"").length,words:e(a).trim()?e(a).trim().split(/\s+/).length:0,sentences:e(a).trim()?e(a).split(/[.!?]+/).filter(L=>L.trim().length>0).length:0,lines:e(a).split(`
`).length}:null);var p=$p();Lr(L=>{var ft=xp();kr.title="Text Case Converter - Developer Tools",m(L,ft)});var k=r(p),y=r(k),h=r(y);h.__click=[pp];var _=r(h);Ie(_,{class:"w-5 h-5 mr-2"});var $=o(y,2),M=r($),P=r(M);fa(P,{class:"w-10 h-10 text-white"});var S=o(k,4),N=o(r(S),2);fe(N,21,()=>Object.entries(l),([L])=>L,(L,ft)=>{var vt=ue(()=>Qa(e(ft),1));let G=()=>e(vt)[0];const tt=ue(()=>({uppercase:"HELLO WORLD",lowercase:"hello world",title:"Hello World",camelCase:"helloWorld",snakeCase:"hello_world",kebabCase:"hello-world",pascalCase:"HelloWorld",sentence:"Hello world",alternating:"hElLo wOrLd",inverse:"HELLO WORLD"}));var yt=yp();yt.__click=[fp,c,G];var bt=r(yt),wt=r(bt);{let q=ue(()=>e(c)===G()?"text-[var(--ds-secondary-600)] dark:text-[var(--ds-secondary-400)]":"text-gray-600 dark:text-gray-400");fa(wt,{get class(){return`w-5 h-5 ${e(q)??""}`}})}var Ut=o(bt,2),Ot=r(Ut),Nt=o(Ut,2),Pt=r(Nt),ot=o(Nt,2);{var kt=q=>{var Q=bp();m(q,Q)};O(ot,q=>{e(c)===G()&&q(kt)})}Y(q=>{ge(yt,1,`relative p-3 rounded-lg border-2 transition-all ${e(c)===G()?"border-[var(--ds-secondary-500)] bg-[var(--ds-secondary-100)] dark:bg-[var(--ds-secondary-900)/20]":"border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"}`),b(Ot,q),b(Pt,e(tt)[G()])},[()=>G().replace(/([A-Z])/g," $1").trim()]),m(L,yt)});var f=o(S,2),E=r(f),C=r(E),H=o(r(C),2);H.__click=[up,a,s];var z=o(C,2),rt=o(z,2);{var pt=L=>{var ft=hp(),vt=r(ft),G=r(vt),tt=o(r(G)),yt=o(G,2),bt=o(r(yt)),wt=o(yt,2),Ut=o(r(wt)),Ot=o(wt,2),Nt=o(r(Ot)),Pt=o(Ot,2),ot=o(r(Pt));Y(()=>{b(tt,` ${e(u).characters??""}`),b(bt,` ${e(u).charactersNoSpaces??""}`),b(Ut,` ${e(u).words??""}`),b(Nt,` ${e(u).sentences??""}`),b(ot,` ${e(u).lines??""}`)}),m(L,ft)};O(rt,L=>{e(u)&&L(pt)})}var lt=o(E,2),mt=r(lt),ct=o(r(mt),2),xt=r(ct);xt.__click=[mp,a,s];var Rt=r(xt);N0(Rt,{class:"w-4 h-4 rotate-180"});var Vt=o(xt,2);Vt.__click=[gp,s,n];var Kt=r(Vt);be(Kt,{class:"w-4 h-4 mr-1"});var Qt=o(Kt),Wt=o(mt,2),zt=o(Wt,2),Bt=r(zt);Bt.__click=g;var Lt=o(f,2),Ct=o(r(Lt),2),X=r(Ct);X.__click=[_p,a,c];var _t=o(X,2);_t.__click=[kp,c];var ut=o(_t,2);ut.__click=[wp,c];var at=o(ut,2);at.__click=[Cp,c],Y(()=>{xt.disabled=!e(a)||!e(s),Vt.disabled=!e(s),b(Qt,` ${e(n)?"Copied!":"Copy"}`),Bt.disabled=!e(s)}),Tt(z,()=>e(a),L=>d(a,L)),Tt(Wt,()=>e(s),L=>d(s,L)),m(i,p),jt()}ye(["click"]);function Tp(i,t,a){navigator.clipboard.writeText(e(t)).then(()=>{d(a,!0),setTimeout(()=>{d(a,!1)},2e3)})}function Mp(){Ee("/tools")}var Ep=w('<meta name="description" content="Generate Lorem Ipsum placeholder text for design and testing purposes"/>'),Pp=w('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--ds-primary-400)] to-[var(--ds-primary-600)] rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Lorem Ipsum Generator</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Generate placeholder text for your designs and prototypes</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Lorem Ipsum Generator</li></ol></nav> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6"><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"><div><label for="amount-input" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Amount</label> <input class="input" id="amount-input" type="number" min="1" max="100"/></div> <div><label for="unit-select" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Unit</label> <select id="unit-select" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-[var(--ds-primary-500)]"><option>Paragraphs</option><option>Sentences</option><option>Words</option></select></div> <div class="flex items-end"><label class="flex items-center cursor-pointer"><input type="checkbox" class="w-4 h-4 text-[var(--ds-primary-600)] bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/> <span class="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">Start with "Lorem ipsum"</span></label></div> <div class="flex items-end"><button class="btn btn-primary w-full"><!> Generate</button></div></div> <div class="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400"><div class="flex items-center"><!> <span> </span></div> <div class="flex items-center"><!> <span> </span></div> <div class="flex items-center"><!> <span> </span></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><div class="flex items-center justify-between mb-4"><h2 class="text-xl font-semibold text-gray-900 dark:text-white">Generated Text</h2> <div class="flex gap-2"><button class="btn btn-primary btn-sm"><!> </button> <button class="btn btn-primary btn-sm">Download</button></div></div> <div class="prose prose-gray dark:prose-invert max-w-none"><div class="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed"> </div></div></div></div>');function Lp(i,t){It(t,!0);let a=x(5),s=x("paragraphs"),n=x(!0),c=x(""),l=x(!1);const v=["lorem","ipsum","dolor","sit","amet","consectetur","adipiscing","elit","sed","do","eiusmod","tempor","incididunt","ut","labore","et","dolore","magna","aliqua","enim","ad","minim","veniam","quis","nostrud","exercitation","ullamco","laboris","nisi","ut","aliquip","ex","ea","commodo","consequat","duis","aute","irure","dolor","in","reprehenderit","voluptate","velit","esse","cillum","fugiat","nulla","pariatur","excepteur","sint","occaecat","cupidatat","non","proident","sunt","in","culpa","qui","officia","deserunt","mollit","anim","id","est","laborum"],g=["at","vero","eos","et","accusamus","et","iusto","odio","dignissimos","ducimus","qui","blanditiis","praesentium","voluptatum","deleniti","atque","corrupti","quos","dolores","et","quas","molestias","excepturi","sint","obcaecati","cupiditate","non","provident","similique","sunt","in","culpa","qui","officia","deserunt","mollitia","animi","id","est","laborum","et","dolorum","fuga","et","harum","quidem","rerum","facilis","est","et","expedita","distinctio","nam","libero","tempore","cum","soluta","nobis","est","eligendi","optio","cumque","nihil","impedit","quo","porro","quisquam","est","qui","minus","id","quod","maxime","placeat","facere","possimus","omnis","voluptas","assumenda","est","omnis","dolor","repellendus","temporibus","autem","quibusdam","et","aut","consequatur","vel","illum","qui","dolorem","eum","fugiat","quo","voluptas","nulla","pariatur","at","vero","eos","et","accusamus","et","iusto","odio","dignissimos","ducimus","qui","blanditiis","praesentium","voluptatum"];function u(){const A=[...v,...g];return A[Math.floor(Math.random()*A.length)]}function p(){const A=Math.floor(Math.random()*10)+5,I=[];for(let R=0;R<A;R++){const it=u();I.push(R===0?it.charAt(0).toUpperCase()+it.slice(1):it)}return I.join(" ")+"."}function k(){const A=Math.floor(Math.random()*5)+3,I=[];for(let R=0;R<A;R++)I.push(p());return I.join(" ")}function y(){let A="";if(e(n)&&e(s)!=="words"){A=`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

`;const I=Math.max(0,e(a)-1);switch(e(s)){case"paragraphs":for(let R=0;R<I;R++)A+=k()+`

`;break;case"sentences":for(let R=0;R<I;R++)A+=p()+" ";break;case"words":A=h(e(a));break}}else switch(e(s)){case"paragraphs":for(let I=0;I<e(a);I++)A+=k()+`

`;break;case"sentences":for(let I=0;I<e(a);I++)A+=p()+" ";break;case"words":A=h(e(a));break}d(c,A.trim(),!0)}function h(A){const I=[];for(let R=0;R<A;R++){const it=u();I.push(R===0?it.charAt(0).toUpperCase()+it.slice(1):it)}return I.join(" ")+"."}function _(){const A=new Blob([e(c)],{type:"text/plain"}),I=URL.createObjectURL(A),R=document.createElement("a");R.href=I,R.download="lorem-ipsum.txt",document.body.appendChild(R),R.click(),document.body.removeChild(R),URL.revokeObjectURL(I)}y();var $=Pp();Lr(A=>{var I=Ep();kr.title="Lorem Ipsum Generator - Developer Tools",m(A,I)});var M=r($),P=r(M),S=r(P);S.__click=[Mp];var N=r(S);Ie(N,{class:"w-5 h-5"});var f=o(P,2),E=r(f),C=r(E);He(C,{class:"w-10 h-10 text-white"});var H=o(M,4),z=r(H),rt=r(z),pt=o(r(rt),2),lt=o(rt,2),mt=o(r(lt),2),ct=r(mt);ct.value=ct.__value="paragraphs";var xt=o(ct);xt.value=xt.__value="sentences";var Rt=o(xt);Rt.value=Rt.__value="words";var Vt=o(lt,2),Kt=r(Vt),Qt=r(Kt),Wt=o(Vt,2),zt=r(Wt);zt.__click=y;var Bt=r(zt);Er(Bt,{class:"w-4 h-4 mr-2"});var Lt=o(z,2),Ct=r(Lt),X=r(Ct);He(X,{class:"w-4 h-4 mr-1"});var _t=o(X,2),ut=r(_t),at=o(Ct,2),L=r(at);fa(L,{class:"w-4 h-4 mr-1"});var ft=o(L,2),vt=r(ft),G=o(at,2),tt=r(G);Zr(tt,{class:"w-4 h-4 mr-1"});var yt=o(tt,2),bt=r(yt),wt=o(H,2),Ut=r(wt),Ot=o(r(Ut),2),Nt=r(Ot);Nt.__click=[Tp,c,l];var Pt=r(Nt);be(Pt,{class:"w-4 h-4 mr-1"});var ot=o(Pt),kt=o(Nt,2);kt.__click=_;var q=o(Ut,2),Q=r(q),W=r(Q);Y((A,I,R)=>{b(ut,`${A??""} words`),b(vt,`${I??""} sentences`),b(bt,`${R??""} paragraphs`),b(ot,` ${e(l)?"Copied!":"Copy"}`),b(W,e(c))},[()=>e(c).split(/\s+/).filter(A=>A.length>0).length,()=>e(c).split(/[.!?]+/).filter(A=>A.trim().length>0).length,()=>e(c).split(/\n\n+/).filter(A=>A.trim().length>0).length]),Tt(pt,()=>e(a),A=>d(a,A)),cr(mt,()=>e(s),A=>d(s,A)),We(Qt,()=>e(n),A=>d(n,A)),m(i,$),jt()}ye(["click"]);function Ap(i,t){d(t,"")}function Ip(i,t){d(t,`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

This sample text contains 123 numbers and various punctuation marks! It's designed to test the character counter functionality comprehensively.`)}function jp(){Ee("/tools")}var Np=w('<meta name="description" content="Count characters, words, and analyze text with detailed statistics including reading time and frequency analysis"/>'),Rp=w('<div class="flex items-center justify-between text-sm"><span class="text-gray-600 dark:text-gray-400"> </span> <div class="flex items-center gap-2"><div class="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div></div></div> <span class="text-gray-600 dark:text-gray-400 min-w-[60px] text-right"> </span></div></div>'),Bp=w('<div class="mt-4 space-y-2"></div>'),Dp=w('<div class="space-y-3"><div class="flex items-center justify-between p-3 bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] rounded-lg"><div class="flex items-center"><!> <span class="text-sm font-medium text-gray-900 dark:text-white">Characters</span></div> <span class="text-lg font-bold text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"> </span></div> <div class="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"><div class="flex items-center"><!> <span class="text-sm font-medium text-gray-900 dark:text-white">Words</span></div> <span class="text-lg font-bold text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"> </span></div> <div class="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg"><div class="flex items-center"><!> <span class="text-sm font-medium text-gray-900 dark:text-white">Sentences</span></div> <span class="text-lg font-bold text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"> </span></div> <div class="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg"><div class="flex items-center"><!> <span class="text-sm font-medium text-gray-900 dark:text-white">Reading Time</span></div> <span class="text-lg font-bold text-orange-600 dark:text-orange-400"> </span></div></div>'),Fp=w('<p class="text-gray-500 dark:text-gray-400 text-center py-8">Enter text to see statistics</p>'),Hp=(i,t,a)=>t(e(a)),Op=w('<div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><span class="text-sm font-medium text-gray-900 dark:text-white capitalize"> </span> <span class="text-sm text-gray-600 dark:text-gray-400"> </span></div>'),zp=w('<div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mt-6"><div class="flex items-center justify-between mb-4"><h3 class="text-lg font-semibold text-gray-900 dark:text-white">Most Frequent Words</h3> <!></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"></div></div>'),Up=w('<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Character Breakdown</h3> <div class="space-y-2"><div class="flex justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Letters</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div> <div class="flex justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Numbers</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div> <div class="flex justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Spaces</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div> <div class="flex justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Punctuation</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div> <div class="flex justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Special chars</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Reading Time</h3> <div class="space-y-3"><div class="flex items-center justify-between"><div class="flex items-center"><!> <span class="text-sm text-gray-600 dark:text-gray-400">Slow (130 WPM)</span></div> <span class="font-medium text-gray-900 dark:text-white"> </span></div> <div class="flex items-center justify-between"><div class="flex items-center"><!> <span class="text-sm text-gray-600 dark:text-gray-400">Average (200 WPM)</span></div> <span class="font-medium text-gray-900 dark:text-white"> </span></div> <div class="flex items-center justify-between"><div class="flex items-center"><!> <span class="text-sm text-gray-600 dark:text-gray-400">Fast (300 WPM)</span></div> <span class="font-medium text-gray-900 dark:text-white"> </span></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Structure Analysis</h3> <div class="space-y-2"><div class="flex justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Paragraphs</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div> <div class="flex justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Lines</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div> <div class="flex justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Unique words</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div> <div class="flex justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Avg word length</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div></div></div></div> <!>',1),Gp=w('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="btn btn-primary"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--ds-primary-400)] to-[var(--ds-primary-600)] rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Character Counter</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Count characters, words, and analyze text with detailed statistics</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Character Counter</li></ol></nav> <div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-2"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><div class="flex items-center justify-between mb-4"><h2 class="text-xl font-semibold text-gray-900 dark:text-white">Input Text</h2> <div class="flex items-center gap-2"><button class="btn btn-primary btn-sm">Load Sample</button> <button class="btn btn-primary btn-sm">Clear</button></div></div> <textarea class="textarea" placeholder="Enter your text here to count characters, words, and analyze..."></textarea> <!></div></div> <div class="space-y-6"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Stats</h2> <!></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Actions</h2> <div class="space-y-3"><button class="btn btn-primary w-full"><!> Copy Text</button> <button class="btn btn-primary w-full"><!> Download Report</button></div></div></div></div> <!></div>');function qp(i,t){It(t,!0);let a=x("");const s=ue(()=>e(a)?{totalChars:e(a).length,charsNoSpaces:e(a).replace(/\s/g,"").length,charsIncludingSpaces:e(a).length,words:e(a).trim()?e(a).trim().split(/\s+/).length:0,uniqueWords:e(a).trim()?new Set(e(a).toLowerCase().trim().split(/\s+/)).size:0,sentences:e(a).trim()?e(a).split(/[\\.!?]+/).filter(Ct=>Ct.trim().length>0).length:0,paragraphs:e(a).trim()?e(a).split(/\n\n+/).filter(Ct=>Ct.trim().length>0).length:0,lines:e(a).split(`
`).length,readingTimeSlow:Math.ceil(e(a).trim().split(/\s+/).length/130),readingTimeAvg:Math.ceil(e(a).trim().split(/\s+/).length/200),readingTimeFast:Math.ceil(e(a).trim().split(/\s+/).length/300),letters:(e(a).match(/[a-zA-Z]/g)||[]).length,numbers:(e(a).match(/[0-9]/g)||[]).length,spaces:(e(a).match(/\s/g)||[]).length,punctuation:(e(a).match(/[.,!?;:'"\-()[\]{}]/g)||[]).length,specialChars:e(a).length-(e(a).match(/[a-zA-Z0-9\s.,!?;:'"\-()[\]{}]/g)||[]).length,wordFrequency:e(a).trim()?n(e(a).toLowerCase()):{}}:null);function n(Ct){const X=Ct.split(/\s+/),_t={};X.forEach(at=>{const L=at.replace(/[.,!?;:'"()[\]{}]/g,"");L.length>0&&(_t[L]=(_t[L]||0)+1)});const ut=Object.entries(_t).sort((at,L)=>L[1]-at[1]).slice(0,10);return Object.fromEntries(ut)}function c(Ct){navigator.clipboard.writeText(Ct)}function l(){if(!e(s))return;const Ct=`Character Counter Report
====================

Text Length: ${e(s).totalChars} characters
Words: ${e(s).words} words
Sentences: ${e(s).sentences} sentences
Paragraphs: ${e(s).paragraphs} paragraphs

Detailed Breakdown:
- Characters (with spaces): ${e(s).charsIncludingSpaces}
- Characters (no spaces): ${e(s).charsNoSpaces}
- Letters: ${e(s).letters}
- Numbers: ${e(s).numbers}
- Spaces: ${e(s).spaces}
- Punctuation: ${e(s).punctuation}
- Special characters: ${e(s).specialChars}
- Lines: ${e(s).lines}
- Unique words: ${e(s).uniqueWords}

Reading Time:
- Slow reader (130 WPM): ${e(s).readingTimeSlow} minutes
- Average reader (200 WPM): ${e(s).readingTimeAvg} minutes
- Fast reader (300 WPM): ${e(s).readingTimeFast} minutes

${Object.keys(e(s).wordFrequency).length>0?`
Top 10 Most Frequent Words:
${Object.entries(e(s).wordFrequency).map(([at,L])=>`- ${at}: ${L} times`).join(`
`)}
`:""}

Original Text:
${e(a)}
`,X=new Blob([Ct],{type:"text/plain"}),_t=URL.createObjectURL(X),ut=document.createElement("a");ut.href=_t,ut.download="character-counter-report.txt",document.body.appendChild(ut),ut.click(),document.body.removeChild(ut),URL.revokeObjectURL(_t)}const v=[{name:"Twitter",limit:280},{name:"SMS",limit:160},{name:"LinkedIn Post",limit:3e3},{name:"Facebook Post",limit:63206},{name:"Instagram Caption",limit:2200}];var g=Gp();Lr(Ct=>{var X=Np();kr.title="Character Counter - Developer Tools",m(Ct,X)});var u=r(g),p=r(u),k=r(p);k.__click=[jp];var y=r(k);Ie(y,{class:"w-5 h-5 mr-2"});var h=o(p,2),_=r(h),$=r(_);Rr($,{class:"w-10 h-10 text-white"});var M=o(u,4),P=r(M),S=r(P),N=r(S),f=o(r(N),2),E=r(f);E.__click=[Ip,a];var C=o(E,2);C.__click=[Ap,a];var H=o(N,2);Dt(H,"rows",16);var z=o(H,2);{var rt=Ct=>{var X=Bp();fe(X,21,()=>v,_t=>_t.name,(_t,ut)=>{const at=ue(()=>e(s).totalChars/e(ut).limit*100);var L=Rp(),ft=r(L),vt=r(ft),G=o(ft,2),tt=r(G),yt=r(tt),bt=o(tt,2),wt=r(bt);Y(Ut=>{b(vt,e(ut).name),ge(yt,1,`h-2 rounded-full transition-all ${e(at)>100?"bg-red-500":e(at)>80?"bg-yellow-500":"bg-green-500"}`),Ke(yt,`width: ${Ut??""}%`),b(wt,`${e(s).totalChars??""}/${e(ut).limit??""}`)},[()=>Math.min(e(at),100)]),m(_t,L)}),m(Ct,X)};O(z,Ct=>{e(s)&&e(s).totalChars>0&&Ct(rt)})}var pt=o(P,2),lt=r(pt),mt=o(r(lt),2);{var ct=Ct=>{var X=Dp(),_t=r(X),ut=r(_t),at=r(ut);fa(at,{class:"w-5 h-5 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)] mr-2"});var L=o(ut,2),ft=r(L),vt=o(_t,2),G=r(vt),tt=r(G);He(tt,{class:"w-5 h-5 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)] mr-2"});var yt=o(G,2),bt=r(yt),wt=o(vt,2),Ut=r(wt),Ot=r(Ut);Zr(Ot,{class:"w-5 h-5 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)] mr-2"});var Nt=o(Ut,2),Pt=r(Nt),ot=o(wt,2),kt=r(ot),q=r(kt);ka(q,{class:"w-5 h-5 text-orange-600 dark:text-orange-400 mr-2"});var Q=o(kt,2),W=r(Q);Y(()=>{b(ft,e(s).totalChars),b(bt,e(s).words),b(Pt,e(s).sentences),b(W,`${e(s).readingTimeAvg??""}m`)}),m(Ct,X)},xt=Ct=>{var X=Fp();m(Ct,X)};O(mt,Ct=>{e(s)?Ct(ct):Ct(xt,!1)})}var Rt=o(lt,2),Vt=o(r(Rt),2),Kt=r(Vt);Kt.__click=[Hp,c,a];var Qt=r(Kt);be(Qt,{class:"w-4 h-4 mr-2"});var Wt=o(Kt,2);Wt.__click=l;var zt=r(Wt);Rr(zt,{class:"w-4 h-4 mr-2"});var Bt=o(M,2);{var Lt=Ct=>{var X=Up(),_t=gt(X),ut=r(_t),at=o(r(ut),2),L=r(at),ft=o(r(L),2),vt=r(ft),G=o(L,2),tt=o(r(G),2),yt=r(tt),bt=o(G,2),wt=o(r(bt),2),Ut=r(wt),Ot=o(bt,2),Nt=o(r(Ot),2),Pt=r(Nt),ot=o(Ot,2),kt=o(r(ot),2),q=r(kt),Q=o(ut,2),W=o(r(Q),2),A=r(W),I=r(A),R=r(I);ka(R,{class:"w-4 h-4 text-gray-400 mr-2"});var it=o(I,2),et=r(it),K=o(A,2),U=r(K),B=r(U);ka(B,{class:"w-4 h-4 text-gray-400 mr-2"});var T=o(U,2),D=r(T),F=o(K,2),Z=r(F),j=r(Z);ka(j,{class:"w-4 h-4 text-gray-400 mr-2"});var nt=o(Z,2),Mt=r(nt),qt=o(Q,2),St=o(r(qt),2),J=r(St),dt=o(r(J),2),$t=r(dt),Ft=o(J,2),V=o(r(Ft),2),st=r(V),ht=o(Ft,2),At=o(r(ht),2),Jt=r(At),Xt=o(ht,2),Yt=o(r(Xt),2),ee=r(Yt),le=o(_t,2);{var Gt=de=>{var ce=zp(),ae=r(ce),me=o(r(ae),2);D0(me,{class:"w-5 h-5 text-gray-400"});var pe=o(ae,2);fe(pe,21,()=>Object.entries(e(s).wordFrequency),([re,ve])=>re,(re,ve)=>{var Ce=ue(()=>Qa(e(ve),2));let Te=()=>e(Ce)[0],Ht=()=>e(Ce)[1];var se=Op(),xe=r(se),he=r(xe),je=o(xe,2),Ne=r(je);Y(()=>{b(he,Te()),b(Ne,`${Ht()??""}x`)}),m(re,se)}),m(de,ce)};O(le,de=>{Object.keys(e(s).wordFrequency).length>0&&de(Gt)})}Y(de=>{b(vt,e(s).letters),b(yt,e(s).numbers),b(Ut,e(s).spaces),b(Pt,e(s).punctuation),b(q,e(s).specialChars),b(et,`${e(s).readingTimeSlow??""} min`),b(D,`${e(s).readingTimeAvg??""} min`),b(Mt,`${e(s).readingTimeFast??""} min`),b($t,e(s).paragraphs),b(st,e(s).lines),b(Jt,e(s).uniqueWords),b(ee,de)},[()=>e(s).words>0?(e(s).charsNoSpaces/e(s).words).toFixed(1):0]),m(Ct,X)};O(Bt,Ct=>{e(s)&&Ct(Lt)})}Y(()=>{Kt.disabled=!e(a),Wt.disabled=!e(s)}),Tt(H,()=>e(a),Ct=>d(a,Ct)),m(i,g),jt()}ye(["click"]);function Wp(i,t,a,s){d(t,`function calculateSum(a, b) {
  return a + b;
}

const result = calculateSum(5, 3);
console.log(result);`),d(a,`function calculateSum(a, b, c) {
  return a + b + c;
}

const result = calculateSum(5, 3, 2);
console.log('Result:', result);`),s()}function Jp(i,t,a,s){d(t,""),d(a,""),d(s,null)}function Vp(){Ee("/tools")}var Yp=w('<button class="px-4 py-2 bg-[var(--ds-primary-600)] text-white rounded-lg hover:bg-blue-700 transition-colors"> </button> <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">Download Diff</button>',1),Kp=w('<div class="flex gap-4 text-sm"><span class="text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"> </span> <span class="text-red-600 dark:text-red-400"> </span> <span class="text-gray-600 dark:text-gray-400"> </span></div>'),Qp=w('<span class="text-xs text-gray-500 dark:text-gray-400 w-8 text-right"> </span>'),Zp=w('<span class="text-xs text-gray-500 dark:text-gray-400 w-8 text-right"> </span>'),Xp=w('<div class="flex items-start gap-2 py-1"><!> <span class="text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]">+</span> <pre class="text-sm text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded flex-1"> </pre></div>'),tx=w('<div class="flex items-start gap-2 py-1"><!> <span class="text-red-600 dark:text-red-400">-</span> <pre class="text-sm text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded flex-1"> </pre></div> <!>',1),ex=w('<span class="text-xs text-gray-500 dark:text-gray-400 w-8 text-right"> </span>'),rx=w('<div class="flex items-start gap-2 py-1"><!> <span class="text-gray-400 dark:text-gray-600"></span> <pre class="text-sm text-gray-700 dark:text-gray-300 px-2 py-1 rounded flex-1"> </pre></div>'),ax=w('<span class="text-xs text-gray-500 dark:text-gray-400 w-8 text-right"> </span>'),ix=w('<div class="flex items-start gap-2 py-1"><!> <span class="text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]">+</span> <pre class="text-sm text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded flex-1"> </pre></div>'),sx=w('<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><div class="flex justify-between items-center mb-4"><h3 class="text-lg font-semibold text-gray-900 dark:text-white">Diff Result</h3> <!></div> <div class="overflow-x-auto"><div class="min-w-full"><!> <!> <!></div></div></div>'),ox=w(`<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--ds-primary-400)] to-[var(--ds-primary-600)] rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Text Diff Tool</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Compare two text blocks and highlight differences with detailed analysis.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Text Diff Tool</li></ol></nav> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Diff Options</h3> <div class="flex flex-wrap gap-4"><label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" class="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/> <span class="text-sm text-gray-700 dark:text-gray-300">Show line numbers</span></label> <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" class="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/> <span class="text-sm text-gray-700 dark:text-gray-300">Ignore whitespace</span></label> <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" class="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/> <span class="text-sm text-gray-700 dark:text-gray-300">Ignore case</span></label></div></div> <div class="mb-6 flex flex-wrap gap-4 items-center justify-center"><button class="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"> </button> <button class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">Load Sample Text</button> <button class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">Clear All</button> <!></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"><div><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Original Text</h2> <span class="text-sm text-gray-500 dark:text-gray-400"> </span></div> <textarea placeholder="Enter the original text here..." class="w-full h-96 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"></textarea></div> <div><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Modified Text</h2> <span class="text-sm text-gray-500 dark:text-gray-400"> </span></div> <textarea placeholder="Enter the modified text here..." class="w-full h-96 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"></textarea></div></div> <!> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Side by Side Comparison</h3> <p class="text-gray-600 dark:text-gray-400">Compare two text blocks and easily identify added, removed, and unchanged lines</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Flexible Options</h3> <p class="text-gray-600 dark:text-gray-400">Configure diff comparison with options to ignore whitespace, case sensitivity, and line
        numbers</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Export & Share</h3> <p class="text-gray-600 dark:text-gray-400">Copy diff results to clipboard or download as a text file for easy sharing</p></div></div></div>`);function nx(i,t){It(t,!0);let a=x(""),s=x(""),n=x(null),c=x(!0),l=x(!1),v=x(!1),g=x(""),u=x(!1);function p(){d(u,!0);try{let W=e(a).split(`
`),A=e(s).split(`
`);e(l)&&(W=W.map(it=>it.trim()),A=A.map(it=>it.trim())),e(v)&&(W=W.map(it=>it.toLowerCase()),A=A.map(it=>it.toLowerCase()));const I={added:[],removed:[],unchanged:[]},R=Math.max(W.length,A.length);for(let it=0;it<R;it++){const et=W[it]||"",K=A[it]||"";it>=W.length?I.added.push(K):it>=A.length?I.removed.push(et):et===K?I.unchanged.push(et):(I.removed.push(et),I.added.push(K))}d(n,I,!0)}catch(W){console.error("Error calculating diff:",W)}finally{d(u,!1)}}function k(){if(!e(n))return;let W="";if(e(n).removed?.forEach((A,I)=>{W+=`- ${A}
`,e(n)?.added?.[I]&&(W+=`+ ${e(n).added[I]}
`)}),e(n).unchanged?.forEach(A=>{W+=`  ${A}
`}),e(n).added.length>e(n).removed.length)for(let A=e(n).removed.length;A<e(n).added.length;A++)W+=`+ ${e(n).added[A]}
`;navigator.clipboard.writeText(W),d(g,"diff"),setTimeout(()=>{d(g,"")},2e3)}function y(){if(!e(n))return;let W="";if(e(n).removed?.forEach((it,et)=>{W+=`- ${it}
`,e(n)?.added?.[et]&&(W+=`+ ${e(n).added[et]}
`)}),e(n).unchanged?.forEach(it=>{W+=`  ${it}
`}),e(n).added.length>e(n).removed.length)for(let it=e(n).removed.length;it<e(n).added.length;it++)W+=`+ ${e(n).added[it]}
`;const A=new Blob([W],{type:"text/plain"}),I=URL.createObjectURL(A),R=document.createElement("a");R.href=I,R.download="diff-result.txt",R.click(),URL.revokeObjectURL(I)}function h(){return e(n)?{added:e(n).added.length,removed:e(n).removed.length,unchanged:e(n).unchanged.length,total:e(n).added.length+e(n).removed.length+e(n).unchanged.length}:null}var _=ox(),$=r(_),M=r($),P=r(M);P.__click=[Vp];var S=r(P);Ie(S,{class:"w-5 h-5"});var N=o(M,2),f=r(N),E=r(f);Ga(E,{class:"w-10 h-10 text-white"});var C=o($,4),H=o(r(C),2),z=r(H),rt=r(z),pt=o(z,2),lt=r(pt),mt=o(pt,2),ct=r(mt),xt=o(C,2),Rt=r(xt);Rt.__click=p;var Vt=r(Rt),Kt=o(Rt,2);Kt.__click=[Wp,a,s,p];var Qt=o(Kt,2);Qt.__click=[Jp,a,s,n];var Wt=o(Qt,2);{var zt=W=>{var A=Yp(),I=gt(A);I.__click=k;var R=r(I),it=o(I,2);it.__click=y,Y(()=>b(R,e(g)==="diff"?"✓ Copied!":"Copy Diff")),m(W,A)};O(Wt,W=>{e(n)&&W(zt)})}var Bt=o(xt,2),Lt=r(Bt),Ct=r(Lt),X=o(r(Ct),2),_t=r(X),ut=o(Ct,2),at=o(Lt,2),L=r(at),ft=o(r(L),2),vt=r(ft),G=o(L,2),tt=o(Bt,2);{var yt=W=>{var A=sx(),I=r(A),R=o(r(I),2);{var it=D=>{var F=Kp(),Z=r(F),j=r(Z),nt=o(Z,2),Mt=r(nt),qt=o(nt,2),St=r(qt);Y((J,dt,$t)=>{b(j,`+${J??""} added`),b(Mt,`-${dt??""} removed`),b(St,`${$t??""} unchanged`)},[()=>h().added,()=>h().removed,()=>h().unchanged]),m(D,F)};O(R,D=>{h()&&D(it)})}var et=o(I,2),K=r(et),U=r(K);fe(U,19,()=>e(n).removed,(D,F)=>D+F+"removed",(D,F,Z)=>{var j=tx(),nt=gt(j),Mt=r(nt);{var qt=Ft=>{var V=Qp(),st=r(V);Y(()=>b(st,e(Z)+1)),m(Ft,V)};O(Mt,Ft=>{e(c)&&Ft(qt)})}var St=o(Mt,4),J=r(St),dt=o(nt,2);{var $t=Ft=>{var V=Xp(),st=r(V);{var ht=Xt=>{var Yt=Zp(),ee=r(Yt);Y(()=>b(ee,e(Z)+1)),m(Xt,Yt)};O(st,Xt=>{e(c)&&Xt(ht)})}var At=o(st,4),Jt=r(At);Y(()=>b(Jt,e(n).added[e(Z)]||" ")),m(Ft,V)};O(dt,Ft=>{e(n).added[e(Z)]&&Ft($t)})}Y(()=>b(J,e(F)||" ")),m(D,j)});var B=o(U,2);fe(B,19,()=>e(n).unchanged,(D,F)=>D+F+"unchanged",(D,F,Z)=>{var j=rx(),nt=r(j);{var Mt=J=>{var dt=ex(),$t=r(dt);Y(()=>b($t,e(n).removed.length+e(Z)+1)),m(J,dt)};O(nt,J=>{e(c)&&J(Mt)})}var qt=o(nt,4),St=r(qt);Y(()=>b(St,e(F)||" ")),m(D,j)});var T=o(B,2);fe(T,19,()=>e(n).added.slice(e(n).removed.length),(D,F)=>D+F+"added",(D,F,Z)=>{var j=ix(),nt=r(j);{var Mt=J=>{var dt=ax(),$t=r(dt);Y(()=>b($t,e(n).removed.length+e(n).unchanged.length+e(Z)+1)),m(J,dt)};O(nt,J=>{e(c)&&J(Mt)})}var qt=o(nt,4),St=r(qt);Y(()=>b(St,e(F)||" ")),m(D,j)}),m(W,A)};O(tt,W=>{e(n)&&W(yt)})}var bt=o(tt,2),wt=r(bt),Ut=r(wt),Ot=r(Ut);Ga(Ot,{class:"w-6 h-6 text-orange-600 dark:text-orange-400"});var Nt=o(wt,2),Pt=r(Nt),ot=r(Pt);He(ot,{class:"w-6 h-6 text-orange-600 dark:text-orange-400"});var kt=o(Nt,2),q=r(kt),Q=r(q);Ve(Q,{class:"w-6 h-6 text-orange-600 dark:text-orange-400"}),Y((W,A)=>{Rt.disabled=e(u)||!e(a)||!e(s),b(Vt,e(u)?"Calculating...":"Compare Text"),b(_t,`${W??""} lines`),b(vt,`${A??""} lines`)},[()=>e(a).split(`
`).length,()=>e(s).split(`
`).length]),We(rt,()=>e(c),W=>d(c,W)),We(lt,()=>e(l),W=>d(l,W)),We(ct,()=>e(v),W=>d(v,W)),Tt(ut,()=>e(a),W=>d(a,W)),Tt(G,()=>e(s),W=>d(s,W)),m(i,_),jt()}ye(["click"]);function dx(i,t,a){d(t,"https://example.com:8080/path/to/page?query=search&category=tools&sort=popular#section-1"),a()}function lx(i,t,a,s){d(t,""),d(a,null),d(s,"")}function cx(){Ee("/tools")}var vx=(i,t)=>i.key==="Enter"&&t(),gx=w('<div class="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"><p class="text-red-700 dark:text-red-400 font-medium"> </p></div>'),ux=(i,t,a)=>e(t)&&a(e(t).protocol),mx=(i,t,a)=>e(t)&&a(e(t).hostname),px=(i,t,a)=>e(t)&&a(e(t).port),xx=(i,t,a)=>e(t)&&a(e(t).pathname),fx=(i,t,a)=>e(t)&&a(e(t).hash||""),bx=(i,t,a)=>e(t)&&a(e(t).origin),yx=(i,t,a)=>e(t)&&a(e(t).host),hx=(i,t,a)=>e(t)&&a(e(t).search||""),_x=(i,t,a)=>t(e(a).key),kx=(i,t,a)=>t(e(a).value),wx=w('<tr class="border-b border-gray-100 dark:border-gray-800"><td class="py-2 px-3"><code class="text-sm text-gray-900 dark:text-white"> </code></td><td class="py-2 px-3"><code class="text-sm text-gray-900 dark:text-white truncate max-w-xs"> </code></td><td class="py-2 px-3 text-center"><div class="flex justify-center gap-2"><button class="btn btn-primary btn-sm" title="Copy parameter name"><!></button> <button class="btn btn-primary btn-sm" title="Copy parameter value"><!></button></div></td></tr>'),Cx=w('<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><div class="flex justify-between items-center mb-4"><h3 class="text-lg font-semibold text-gray-900 dark:text-white">Query Parameters</h3> <span class="text-sm text-gray-500 dark:text-gray-400"> </span></div> <div class="overflow-x-auto"><table class="w-full"><thead><tr class="border-b border-gray-200 dark:border-gray-700"><th class="text-left py-2 px-3 text-sm font-medium text-gray-700 dark:text-gray-300">Parameter</th><th class="text-left py-2 px-3 text-sm font-medium text-gray-700 dark:text-gray-300">Value</th><th class="text-center py-2 px-3 text-sm font-medium text-gray-700 dark:text-gray-300">Actions</th></tr></thead><tbody></tbody></table></div></div>'),$x=w('<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Basic Components</h3> <div class="space-y-3"><div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><span class="text-sm font-medium text-gray-700 dark:text-gray-300">Protocol</span> <div class="flex items-center gap-2"><code class="text-sm text-gray-900 dark:text-white"> </code> <button class="btn btn-primary btn-sm"><!></button></div></div> <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><span class="text-sm font-medium text-gray-700 dark:text-gray-300">Hostname</span> <div class="flex items-center gap-2"><code class="text-sm text-gray-900 dark:text-white"> </code> <button class="btn btn-primary btn-sm"><!></button></div></div> <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><span class="text-sm font-medium text-gray-700 dark:text-gray-300">Port</span> <div class="flex items-center gap-2"><code class="text-sm text-gray-900 dark:text-white"> </code> <button class="btn btn-primary btn-sm"><!></button></div></div> <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><span class="text-sm font-medium text-gray-700 dark:text-gray-300">Path</span> <div class="flex items-center gap-2"><code class="text-sm text-gray-900 dark:text-white truncate max-w-xs"> </code> <button class="btn btn-primary btn-sm"><!></button></div></div> <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><span class="text-sm font-medium text-gray-700 dark:text-gray-300">Hash</span> <div class="flex items-center gap-2"><code class="text-sm text-gray-900 dark:text-white truncate max-w-xs"> </code> <button class="btn btn-primary btn-sm"><!></button></div></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Complete Components</h3> <div class="space-y-3"><div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><span class="text-sm font-medium text-gray-700 dark:text-gray-300">Origin</span> <div class="flex items-center gap-2"><code class="text-sm text-gray-900 dark:text-white truncate max-w-xs"> </code> <button class="btn btn-primary btn-sm"><!></button></div></div> <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><span class="text-sm font-medium text-gray-700 dark:text-gray-300">Host</span> <div class="flex items-center gap-2"><code class="text-sm text-gray-900 dark:text-white truncate max-w-xs"> </code> <button class="btn btn-primary btn-sm"><!></button></div></div> <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><span class="text-sm font-medium text-gray-700 dark:text-gray-300">Search Query</span> <div class="flex items-center gap-2"><code class="text-sm text-gray-900 dark:text-white truncate max-w-xs"> </code> <button class="btn btn-primary btn-sm"><!></button></div></div></div></div></div> <!>',1),Sx=w(`<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="btn btn-primary"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--ds-primary-400)] to-[var(--ds-primary-600)] rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">URL Parser/Analyzer</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Parse URLs and extract components including domain, path, query parameters, and hash
        fragments.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">URL Parser</li></ol></nav> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Enter URL</h2> <div class="flex gap-4 mb-4"><input type="text" placeholder="https://example.com/path?query=value#section" class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-transparent"/> <button class="btn btn-primary">Parse URL</button></div> <div class="flex gap-4"><button class="btn btn-primary">Load Sample URL</button> <button class="btn btn-primary">Clear</button></div></div> <!> <!> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Extract Domain</h3> <p class="text-gray-600 dark:text-gray-400">Extract domain, subdomain, and port information from any URL</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Path Analysis</h3> <p class="text-gray-600 dark:text-gray-400">Analyze URL paths, query parameters, and hash fragments</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Query Parameters</h3> <p class="text-gray-600 dark:text-gray-400">Parse and extract all query parameters with their values</p></div></div></div>`);function Tx(i,t){It(t,!0);let a=x(""),s=x(null),n=x("");function c(){if(!e(a).trim()){d(n,"Please enter a URL to parse"),d(s,null);return}try{let zt=e(a).trim();!zt.match(/^https?:\/\//)&&!zt.match(/^ftp:\/\//)&&(zt="https://"+zt);const Bt=new URL(zt),Lt=[];Bt.searchParams.forEach((Ct,X)=>{Lt.push({key:X,value:Ct})}),d(s,{protocol:Bt.protocol,hostname:Bt.hostname,port:Bt.port||(Bt.protocol==="https:"?"443":"80"),pathname:Bt.pathname,search:Bt.search,hash:Bt.hash,origin:Bt.origin,host:Bt.host,searchParams:Lt},!0),d(n,"")}catch{d(n,"Invalid URL format. Please enter a valid URL."),d(s,null)}}function l(zt){navigator.clipboard.writeText(zt)}var v=Sx(),g=r(v),u=r(g),p=r(u);p.__click=[cx];var k=r(p);Ie(k,{class:"w-5 h-5 mr-2"});var y=o(u,2),h=r(y),_=r(h);yd(_,{class:"w-10 h-10 text-white"});var $=o(g,4),M=o(r($),2),P=r(M);P.__keydown=[vx,c];var S=o(P,2);S.__click=c;var N=o(M,2),f=r(N);f.__click=[dx,a,c];var E=o(f,2);E.__click=[lx,a,s,n];var C=o($,2);{var H=zt=>{var Bt=gx(),Lt=r(Bt),Ct=r(Lt);Y(()=>b(Ct,e(n))),m(zt,Bt)};O(C,zt=>{e(n)&&zt(H)})}var z=o(C,2);{var rt=zt=>{var Bt=$x(),Lt=gt(Bt),Ct=r(Lt),X=o(r(Ct),2),_t=r(X),ut=o(r(_t),2),at=r(ut),L=r(at),ft=o(at,2);ft.__click=[ux,s,l];var vt=r(ft);be(vt,{class:"w-4 h-4"});var G=o(_t,2),tt=o(r(G),2),yt=r(tt),bt=r(yt),wt=o(yt,2);wt.__click=[mx,s,l];var Ut=r(wt);be(Ut,{class:"w-4 h-4"});var Ot=o(G,2),Nt=o(r(Ot),2),Pt=r(Nt),ot=r(Pt),kt=o(Pt,2);kt.__click=[px,s,l];var q=r(kt);be(q,{class:"w-4 h-4"});var Q=o(Ot,2),W=o(r(Q),2),A=r(W),I=r(A),R=o(A,2);R.__click=[xx,s,l];var it=r(R);be(it,{class:"w-4 h-4"});var et=o(Q,2),K=o(r(et),2),U=r(K),B=r(U),T=o(U,2);T.__click=[fx,s,l];var D=r(T);be(D,{class:"w-4 h-4"});var F=o(Ct,2),Z=o(r(F),2),j=r(Z),nt=o(r(j),2),Mt=r(nt),qt=r(Mt),St=o(Mt,2);St.__click=[bx,s,l];var J=r(St);be(J,{class:"w-4 h-4"});var dt=o(j,2),$t=o(r(dt),2),Ft=r($t),V=r(Ft),st=o(Ft,2);st.__click=[yx,s,l];var ht=r(st);be(ht,{class:"w-4 h-4"});var At=o(dt,2),Jt=o(r(At),2),Xt=r(Jt),Yt=r(Xt),ee=o(Xt,2);ee.__click=[hx,s,l];var le=r(ee);be(le,{class:"w-4 h-4"});var Gt=o(Lt,2);{var de=ce=>{var ae=Cx(),me=r(ae),pe=o(r(me),2),re=r(pe),ve=o(me,2),Ce=r(ve),Te=o(r(Ce));fe(Te,23,()=>e(s).searchParams,(Ht,se)=>Ht.key+se,(Ht,se)=>{var xe=wx(),he=r(xe),je=r(he),Ne=r(je),Be=o(he),De=r(Be),_e=r(De),Se=o(Be),Ge=r(Se),Ae=r(Ge);Ae.__click=[_x,l,se];var Je=r(Ae);be(Je,{class:"w-4 h-4"});var Xe=o(Ae,2);Xe.__click=[kx,l,se];var mr=r(Xe);be(mr,{class:"w-4 h-4"}),Y(()=>{b(Ne,e(se).key),b(_e,e(se).value)}),m(Ht,xe)}),Y(()=>b(re,`${e(s).searchParams.length??""} parameters`)),m(ce,ae)};O(Gt,ce=>{e(s).searchParams.length>0&&ce(de)})}Y(()=>{b(L,e(s).protocol),b(bt,e(s).hostname),b(ot,e(s).port),b(I,e(s).pathname),b(B,e(s).hash||"(none)"),b(qt,e(s).origin),b(V,e(s).host),b(Yt,e(s).search||"(none)")}),m(zt,Bt)};O(z,zt=>{e(s)&&zt(rt)})}var pt=o(z,2),lt=r(pt),mt=r(lt),ct=r(mt);Fs(ct,{class:"w-6 h-6 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"});var xt=o(lt,2),Rt=r(xt),Vt=r(Rt);He(Vt,{class:"w-6 h-6 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"});var Kt=o(xt,2),Qt=r(Kt),Wt=r(Qt);Ve(Wt,{class:"w-6 h-6 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"}),Tt(P,()=>e(a),zt=>d(a,zt)),m(i,v),jt()}ye(["click","keydown"]);function Mx(i,t,a,s){d(t,`/* Sample CSS styles */
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
}`),d(a,!0),s()}function Ex(i,t,a,s,n,c){d(t,""),d(a,""),d(s,0),d(n,0),d(c,0)}function Px(){Ee("/tools")}var Lx=(i,t)=>d(t,!1),Ax=(i,t)=>d(t,!0),Ix=(i,t,a)=>t(e(a),"output"),jx=w('<button class="px-4 py-2 bg-[var(--ds-primary-600)] text-white rounded-lg hover:bg-blue-700 transition-colors"> </button> <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">Download CSS</button>',1),Nx=w('<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-6"><div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center"><div><p class="text-sm text-gray-600 dark:text-gray-400">Original Size</p> <p class="text-lg font-semibold text-gray-900 dark:text-white"> </p></div> <div><p class="text-sm text-gray-600 dark:text-gray-400">Processed Size</p> <p class="text-lg font-semibold text-gray-900 dark:text-white"> </p></div> <div><p class="text-sm text-gray-600 dark:text-gray-400">Size Change</p> <p> </p></div> <div><p class="text-sm text-gray-600 dark:text-gray-400">Compression</p> <p class="text-lg font-semibold text-gray-900 dark:text-white"> </p></div></div></div>'),Rx=w('<div class="absolute inset-0 flex items-center justify-center pointer-events-none"><p class="text-gray-400 dark:text-gray-600"> </p></div>'),Bx=w('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--ds-primary-400)] to-[var(--ds-primary-600)] rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">CSS Minifier/Beautifier</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Minify and format CSS code to optimize performance and improve readability.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">CSS Minifier</li></ol></nav> <div class="mb-6 flex justify-center"><div class="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1"><button>Beautify CSS</button> <button>Minify CSS</button></div></div> <div class="mb-6 flex flex-wrap gap-4 items-center justify-center"><button class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">Load Sample CSS</button> <button class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">Clear All</button> <!></div> <!> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Input CSS</h2> <span class="text-sm text-gray-500 dark:text-gray-400"> </span></div> <textarea placeholder="Enter your CSS code here..." class="w-full h-96 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-transparent"></textarea></div> <div><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white"> </h2> <span class="text-sm text-gray-500 dark:text-gray-400"> </span></div> <div class="relative"><textarea class="w-full h-96 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none"></textarea> <!></div></div></div> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Minify CSS</h3> <p class="text-gray-600 dark:text-gray-400">Reduce file size by removing whitespace, comments, and unnecessary characters</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Beautify CSS</h3> <p class="text-gray-600 dark:text-gray-400">Format CSS with proper indentation and line breaks for better readability</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Export Results</h3> <p class="text-gray-600 dark:text-gray-400">Copy to clipboard or download processed CSS as a file for immediate use</p></div></div></div>');function Dx(i,t){It(t,!0);let a=x(""),s=x(""),n=x(!1),c=x(""),l=x(0),v=x(0),g=x(0);function u(){if(!e(a).trim()){d(s,""),d(l,0),d(v,0),d(g,0);return}if(d(l,new Blob([e(a)]).size,!0),e(n)){let q=e(a).replace(/\/\*[\s\S]*?\*\//g,"").replace(/\s+/g," ").replace(/\s*{\s*/g,"{").replace(/\s*}\s*/g,"}").replace(/\s*;\s*/g,";").replace(/\s*:\s*/g,":").replace(/\s*,\s*/g,",").replace(/;}/g,"}").trim();d(s,q,!0),d(v,new Blob([q]).size,!0)}else{let q=e(a).replace(/}/g,`}
`).replace(/;/g,`;
`).split(`
`).map((Q,W,A)=>{let I=Q.trim();if(!I)return"";let R=0,it=0;for(let et=0;et<W;et++)A[et].includes("{")&&it++,A[et].includes("}")&&it--;return R=Math.max(0,it),I==="}"&&(R=Math.max(0,R-1)),"  ".repeat(R)+I}).filter(Q=>Q.trim()).join(`
`);d(s,q,!0),d(v,new Blob([q]).size,!0)}d(g,e(l)>0?Math.round((e(l)-e(v))/e(l)*100):0,!0)}function p(q,Q){navigator.clipboard.writeText(q),d(c,Q,!0),setTimeout(()=>{d(c,"")},2e3)}function k(){const q=new Blob([e(s)],{type:"text/css"}),Q=URL.createObjectURL(q),W=document.createElement("a");W.href=Q,W.download=e(n)?"styles.min.css":"styles.css",W.click(),URL.revokeObjectURL(Q)}function y(q){if(q===0)return"0 Bytes";const Q=1024,W=["Bytes","KB","MB","GB"],A=Math.floor(Math.log(q)/Math.log(Q));return parseFloat((q/Math.pow(Q,A)).toFixed(2))+" "+W[A]}we(()=>{e(a)&&u()});var h=Bx(),_=r(h),$=r(_),M=r($);M.__click=[Px];var P=r(M);Ie(P,{class:"w-5 h-5"});var S=o($,2),N=r(S),f=r(N);Ya(f,{class:"w-10 h-10 text-white"});var E=o(_,4),C=r(E),H=r(C);H.__click=[Lx,n];var z=o(H,2);z.__click=[Ax,n];var rt=o(E,2),pt=r(rt);pt.__click=[Mx,a,n,u];var lt=o(pt,2);lt.__click=[Ex,a,s,l,v,g];var mt=o(lt,2);{var ct=q=>{var Q=jx(),W=gt(Q);W.__click=[Ix,p,s];var A=r(W),I=o(W,2);I.__click=k,Y(()=>b(A,e(c)==="output"?"✓ Copied!":"Copy Result")),m(q,Q)};O(mt,q=>{e(s)&&q(ct)})}var xt=o(rt,2);{var Rt=q=>{var Q=Nx(),W=r(Q),A=r(W),I=o(r(A),2),R=r(I),it=o(A,2),et=o(r(it),2),K=r(et),U=o(it,2),B=o(r(U),2),T=r(B),D=o(U,2),F=o(r(D),2),Z=r(F);Y((j,nt,Mt)=>{b(R,j),b(K,nt),ge(B,1,`text-lg font-semibold ${e(v)<e(l)?"text-green-600":"text-red-600"} dark:text-${e(v)<e(l)?"green-400":"red-400"}`),b(T,`${e(v)<e(l)?"-":"+"}${Mt??""}`),b(Z,`${e(g)??""}%`)},[()=>y(e(l)),()=>y(e(v)),()=>y(Math.abs(e(v)-e(l)))]),m(q,Q)};O(xt,q=>{e(l)>0&&q(Rt)})}var Vt=o(xt,2),Kt=r(Vt),Qt=r(Kt),Wt=o(r(Qt),2),zt=r(Wt),Bt=o(Qt,2),Lt=o(Kt,2),Ct=r(Lt),X=r(Ct),_t=r(X),ut=o(X,2),at=r(ut),L=o(Ct,2),ft=r(L),vt=o(ft,2);{var G=q=>{var Q=Rx(),W=r(Q),A=r(W);Y(()=>b(A,`Enter CSS code to see ${e(n)?"minified":"beautified"} result`)),m(q,Q)};O(vt,q=>{e(s)||q(G)})}var tt=o(Vt,2),yt=r(tt),bt=r(yt),wt=r(bt);Ve(wt,{class:"w-6 h-6 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"});var Ut=o(yt,2),Ot=r(Ut),Nt=r(Ot);He(Nt,{class:"w-6 h-6 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"});var Pt=o(Ut,2),ot=r(Pt),kt=r(ot);Xa(kt,{class:"w-6 h-6 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"}),Y(()=>{ge(H,1,`px-4 py-2 rounded-md text-sm font-medium transition-colors ${e(n)?"text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white":"bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] text-[var(--ds-primary-700)] dark:text-[var(--ds-primary-300)]"}`),ge(z,1,`px-4 py-2 rounded-md text-sm font-medium transition-colors ${e(n)?"bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] text-[var(--ds-primary-700)] dark:text-[var(--ds-primary-300)]":"text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"}`),b(zt,`${e(a).length??""} characters`),b(_t,`${e(n)?"Minified":"Beautified"} CSS`),b(at,`${e(s).length??""} characters`),Dt(ft,"placeholder",`${e(n)?"Minified":"Beautified"} CSS will appear here...`)}),Tt(Bt,()=>e(a),q=>d(a,q)),Tt(ft,()=>e(s),q=>d(s,q)),m(i,h),jt()}ye(["click"]);function Fx(i,t,a,s){d(t,`// Sample JavaScript function
function calculateTotal(items, tax = 0.08) {
    let subtotal = 0;

    // Calculate subtotal
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        subtotal += item.price * item.quantity;
    }

    // Calculate tax and total
    const taxAmount = subtotal * tax;
    const total = subtotal + taxAmount;

    return {
        subtotal: subtotal,
        tax: taxAmount,
        total: total,
        currency: 'USD'
    };
}

// Example usage
const cartItems = [
    { name: 'Book', price: 15.99, quantity: 2 },
    { name: 'Pen', price: 2.49, quantity: 5 },
    { name: 'Notebook', price: 8.99, quantity: 1 }
];

const result = calculateTotal(cartItems);
console.log('Total amount:', result.total);`),d(a,!0),s()}function Hx(i,t,a,s,n,c,l){d(t,""),d(a,""),d(s,0),d(n,0),d(c,0),d(l,"")}function Ox(){Ee("/tools")}var zx=(i,t)=>d(t,!1),Ux=(i,t)=>d(t,!0),Gx=(i,t,a)=>t(e(a),"output"),qx=w('<button class="px-4 py-2 bg-[var(--ds-primary-600)] text-white rounded-lg hover:bg-blue-700 transition-colors"> </button> <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">Download JavaScript</button>',1),Wx=w('<div class="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"><p class="text-red-700 dark:text-red-400 font-medium"> </p></div>'),Jx=w('<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-6"><div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center"><div><p class="text-sm text-gray-600 dark:text-gray-400">Original Size</p> <p class="text-lg font-semibold text-gray-900 dark:text-white"> </p></div> <div><p class="text-sm text-gray-600 dark:text-gray-400">Processed Size</p> <p class="text-lg font-semibold text-gray-900 dark:text-white"> </p></div> <div><p class="text-sm text-gray-600 dark:text-gray-400">Size Change</p> <p> </p></div> <div><p class="text-sm text-gray-600 dark:text-gray-400">Compression</p> <p class="text-lg font-semibold text-gray-900 dark:text-white"> </p></div></div></div>'),Vx=w('<div class="absolute inset-0 flex items-center justify-center pointer-events-none"><p class="text-gray-400 dark:text-gray-600"> </p></div>'),Yx=w('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--ds-primary-400)] to-[var(--ds-primary-600)] rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">JavaScript Minifier/Beautifier</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Minify and format JavaScript code to optimize performance and improve readability.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">JavaScript Minifier</li></ol></nav> <div class="mb-6 flex justify-center"><div class="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1"><button>Beautify JavaScript</button> <button>Minify JavaScript</button></div></div> <div class="mb-6 flex flex-wrap gap-4 items-center justify-center"><button class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">Load Sample JavaScript</button> <button class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">Clear All</button> <!></div> <!> <!> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Input JavaScript</h2> <span class="text-sm text-gray-500 dark:text-gray-400"> </span></div> <textarea placeholder="Enter your JavaScript code here..." class="w-full h-96 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"></textarea></div> <div><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white"> </h2> <span class="text-sm text-gray-500 dark:text-gray-400"> </span></div> <div class="relative"><textarea class="w-full h-96 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none"></textarea> <!></div></div></div> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Minify JavaScript</h3> <p class="text-gray-600 dark:text-gray-400">Reduce file size by removing whitespace, comments, and unnecessary characters</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Beautify JavaScript</h3> <p class="text-gray-600 dark:text-gray-400">Format JavaScript with proper indentation and line breaks for better readability</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Export Results</h3> <p class="text-gray-600 dark:text-gray-400">Copy to clipboard or download processed JavaScript as a file for immediate use</p></div></div></div>');function Kx(i,t){It(t,!0);let a=x(""),s=x(""),n=x(!1),c=x(""),l=x(0),v=x(0),g=x(0),u=x("");function p(){if(!e(a).trim()){d(s,""),d(l,0),d(v,0),d(g,0),d(u,"");return}d(l,new Blob([e(a)]).size,!0);try{if(e(n)){let A=e(a).replace(/(?:^|\n|\r)\s*\/\/.*$/gm,"").replace(/\/\*[\s\S]*?\*\//g,"").replace(/\s+/g," ").replace(/\s*([+\-*/=<>!&|,;:{}()[\]])\s*/g,"$1").trim();d(s,A,!0),d(v,new Blob([A]).size,!0)}else{let A=e(a).replace(/([+\-*/=<>!&|,;:{}()[\]])/g," $1 ").replace(/\s+/g," ").replace(/;/g,`;
`).replace(/{/g,`{
`).replace(/}/g,`
}
`).split(`
`).map((I,R,it)=>{let et=I.trim();if(!et)return"";let K=0,U=0;for(let B=0;B<R;B++){const T=it[B].trim();T==="{"&&U++,T==="}"&&U--}return K=Math.max(0,U),et==="}"&&(K=Math.max(0,K-1)),"  ".repeat(K)+et}).filter(I=>I.trim()).join(`
`);d(s,A,!0),d(v,new Blob([A]).size,!0)}d(g,e(l)>0?Math.round((e(l)-e(v))/e(l)*100):0,!0),d(u,"")}catch{d(u,"Error processing JavaScript. Please check your syntax."),d(s,"")}}function k(A,I){navigator.clipboard.writeText(A),d(c,I,!0),setTimeout(()=>{d(c,"")},2e3)}function y(){const A=new Blob([e(s)],{type:"text/javascript"}),I=URL.createObjectURL(A),R=document.createElement("a");R.href=I,R.download=e(n)?"script.min.js":"script.js",R.click(),URL.revokeObjectURL(I)}function h(A){if(A===0)return"0 Bytes";const I=1024,R=["Bytes","KB","MB","GB"],it=Math.floor(Math.log(A)/Math.log(I));return parseFloat((A/Math.pow(I,it)).toFixed(2))+" "+R[it]}we(()=>{e(a)&&p()});var _=Yx(),$=r(_),M=r($),P=r(M);P.__click=[Ox];var S=r(P);Ie(S,{class:"w-5 h-5"});var N=o(M,2),f=r(N),E=r(f);Ya(E,{class:"w-10 h-10 text-white"});var C=o($,4),H=r(C),z=r(H);z.__click=[zx,n];var rt=o(z,2);rt.__click=[Ux,n];var pt=o(C,2),lt=r(pt);lt.__click=[Fx,a,n,p];var mt=o(lt,2);mt.__click=[Hx,a,s,l,v,g,u];var ct=o(mt,2);{var xt=A=>{var I=qx(),R=gt(I);R.__click=[Gx,k,s];var it=r(R),et=o(R,2);et.__click=y,Y(()=>b(it,e(c)==="output"?"✓ Copied!":"Copy Result")),m(A,I)};O(ct,A=>{e(s)&&A(xt)})}var Rt=o(pt,2);{var Vt=A=>{var I=Wx(),R=r(I),it=r(R);Y(()=>b(it,e(u))),m(A,I)};O(Rt,A=>{e(u)&&A(Vt)})}var Kt=o(Rt,2);{var Qt=A=>{var I=Jx(),R=r(I),it=r(R),et=o(r(it),2),K=r(et),U=o(it,2),B=o(r(U),2),T=r(B),D=o(U,2),F=o(r(D),2),Z=r(F),j=o(D,2),nt=o(r(j),2),Mt=r(nt);Y((qt,St,J)=>{b(K,qt),b(T,St),ge(F,1,`text-lg font-semibold ${e(v)<e(l)?"text-green-600":"text-red-600"} dark:text-${e(v)<e(l)?"green-400":"red-400"}`),b(Z,`${e(v)<e(l)?"-":"+"}${J??""}`),b(Mt,`${e(g)??""}%`)},[()=>h(e(l)),()=>h(e(v)),()=>h(Math.abs(e(v)-e(l)))]),m(A,I)};O(Kt,A=>{e(l)>0&&A(Qt)})}var Wt=o(Kt,2),zt=r(Wt),Bt=r(zt),Lt=o(r(Bt),2),Ct=r(Lt),X=o(Bt,2),_t=o(zt,2),ut=r(_t),at=r(ut),L=r(at),ft=o(at,2),vt=r(ft),G=o(ut,2),tt=r(G),yt=o(tt,2);{var bt=A=>{var I=Vx(),R=r(I),it=r(R);Y(()=>b(it,`Enter JavaScript code to see ${e(n)?"minified":"beautified"} result`)),m(A,I)};O(yt,A=>{e(s)||A(bt)})}var wt=o(Wt,2),Ut=r(wt),Ot=r(Ut),Nt=r(Ot);Ve(Nt,{class:"w-6 h-6 text-yellow-600 dark:text-yellow-400"});var Pt=o(Ut,2),ot=r(Pt),kt=r(ot);He(kt,{class:"w-6 h-6 text-yellow-600 dark:text-yellow-400"});var q=o(Pt,2),Q=r(q),W=r(Q);Xa(W,{class:"w-6 h-6 text-yellow-600 dark:text-yellow-400"}),Y(()=>{ge(z,1,`px-4 py-2 rounded-md text-sm font-medium transition-colors ${e(n)?"text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white":"bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300"}`),ge(rt,1,`px-4 py-2 rounded-md text-sm font-medium transition-colors ${e(n)?"bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300":"text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"}`),b(Ct,`${e(a).length??""} characters`),b(L,`${e(n)?"Minified":"Beautified"} JavaScript`),b(vt,`${e(s).length??""} characters`),Dt(tt,"placeholder",`${e(n)?"Minified":"Beautified"} JavaScript will appear here...`)}),Tt(X,()=>e(a),A=>d(a,A)),Tt(tt,()=>e(s),A=>d(s,A)),m(i,_),jt()}ye(["click"]);function Qx(i,t,a,s){d(t,`<div class="container">
  <h1>Hello World!</h1>
  <p>This is a <strong>sample</strong> text with <em>HTML</em> tags.</p>
</div>`),d(a,"encode"),s()}function Zx(i,t,a,s){d(t,`&lt;div class=&quot;container&quot;&gt;
  &lt;h1&gt;Hello World!&lt;/h1&gt;
  &lt;p&gt;This is a &lt;strong&gt;sample&lt;/strong&gt; text with &lt;em&gt;HTML&lt;/em&gt; tags.&lt;/p&gt;
&lt;/div&gt;`),d(a,"decode"),s()}function Xx(i,t,a,s){d(t,""),d(a,""),d(s,"")}function tf(){Ee("/tools")}var ef=(i,t)=>d(t,"encode"),rf=(i,t)=>d(t,"decode"),af=(i,t,a,s,n)=>t(e(a)==="encode"?e(s):e(n),"result"),sf=w('<button class="px-3 py-1 text-sm bg-rose-600 text-white rounded hover:bg-rose-700 transition-colors"> </button>'),of=w('<div class="absolute inset-0 flex items-center justify-center pointer-events-none"><p class="text-gray-400 dark:text-gray-600">Enter text above to see encoded result</p></div>'),nf=w('<textarea placeholder="Encoded HTML will appear here..." class="w-full h-64 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none"></textarea> <!>',1),df=w('<div class="absolute inset-0 flex items-center justify-center pointer-events-none"><p class="text-gray-400 dark:text-gray-600">Enter HTML entities above to see decoded result</p></div>'),lf=w('<textarea placeholder="Decoded HTML will appear here..." class="w-full h-64 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none"></textarea> <!>',1),cf=w(`<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-rose-400 to-rose-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">HTML Entity Encoder/Decoder</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Convert HTML entities and special characters for safe display and storage.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">HTML Encoder</li></ol></nav> <div class="mb-6"><div class="flex justify-center"><div class="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1"><button>Encode HTML</button> <button>Decode HTML</button></div></div></div> <div class="mb-6 flex flex-wrap gap-4 items-center justify-center"><button class="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"> </button> <button class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">Load Sample Text</button> <button class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">Load Sample Encoded</button> <button class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">Clear All</button></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Input</h2> <span class="text-sm text-gray-500 dark:text-gray-400"> </span></div> <textarea class="w-full h-64 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"></textarea></div> <div><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white"> </h2> <!></div> <div class="relative"><!></div></div></div> <div class="mt-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Common HTML Entities</h3> <div class="overflow-x-auto"><table class="w-full text-sm"><thead><tr class="border-b border-gray-200 dark:border-gray-700"><th class="text-left py-2 px-3 font-medium text-gray-700 dark:text-gray-300">Character</th><th class="text-left py-2 px-3 font-medium text-gray-700 dark:text-gray-300">Entity Name</th><th class="text-left py-2 px-3 font-medium text-gray-700 dark:text-gray-300">Entity Number</th><th class="text-left py-2 px-3 font-medium text-gray-700 dark:text-gray-300">Description</th></tr></thead><tbody><tr class="border-b border-gray-100 dark:border-gray-800"><td class="py-2 px-3 font-mono">&lt;</td><td class="py-2 px-3 font-mono">&amp;lt;</td><td class="py-2 px-3 font-mono">&amp;#60;</td><td class="py-2 px-3 text-gray-600 dark:text-gray-400">Less than</td></tr><tr class="border-b border-gray-100 dark:border-gray-800"><td class="py-2 px-3 font-mono">&gt;</td><td class="py-2 px-3 font-mono">&amp;gt;</td><td class="py-2 px-3 font-mono">&amp;#62;</td><td class="py-2 px-3 text-gray-600 dark:text-gray-400">Greater than</td></tr><tr class="border-b border-gray-100 dark:border-gray-800"><td class="py-2 px-3 font-mono">&amp;</td><td class="py-2 px-3 font-mono">&amp;amp;</td><td class="py-2 px-3 font-mono">&amp;#38;</td><td class="py-2 px-3 text-gray-600 dark:text-gray-400">Ampersand</td></tr><tr class="border-b border-gray-100 dark:border-gray-800"><td class="py-2 px-3 font-mono">"</td><td class="py-2 px-3 font-mono">&amp;quot;</td><td class="py-2 px-3 font-mono">&amp;#34;</td><td class="py-2 px-3 text-gray-600 dark:text-gray-400">Quotation mark</td></tr><tr class="border-b border-gray-100 dark:border-gray-800"><td class="py-2 px-3 font-mono">'</td><td class="py-2 px-3 font-mono">&amp;apos;</td><td class="py-2 px-3 font-mono">&amp;#39;</td><td class="py-2 px-3 text-gray-600 dark:text-gray-400">Apostrophe</td></tr><tr class="border-b border-gray-100 dark:border-gray-800"><td class="py-2 px-3 font-mono"></td><td class="py-2 px-3 font-mono">&amp;nbsp;</td><td class="py-2 px-3 font-mono">&amp;#160;</td><td class="py-2 px-3 text-gray-600 dark:text-gray-400">Non-breaking space</td></tr></tbody></table></div></div> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-rose-100 dark:bg-rose-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Encode HTML</h3> <p class="text-gray-600 dark:text-gray-400">Convert HTML tags and special characters to entities for safe display</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-rose-100 dark:bg-rose-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Decode HTML</h3> <p class="text-gray-600 dark:text-gray-400">Convert HTML entities back to readable characters</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-rose-100 dark:bg-rose-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Unicode Support</h3> <p class="text-gray-600 dark:text-gray-400">Full support for Unicode characters and special symbols</p></div></div></div>`);function vf(i,t){It(t,!0);let a=x(""),s=x(""),n=x(""),c=x(""),l=x("encode");function v(){const Pt=document.createElement("div");Pt.textContent=e(a),d(s,Pt.innerHTML,!0),d(n,"")}function g(){const Pt=document.createElement("div");Pt.innerHTML=e(a),d(n,Pt.textContent||Pt.innerText||"",!0),d(s,"")}function u(Pt,ot){navigator.clipboard.writeText(Pt),d(c,ot,!0),setTimeout(()=>{d(c,"")},2e3)}var p=cf(),k=r(p),y=r(k),h=r(y);h.__click=[tf];var _=r(h);Ie(_,{class:"w-5 h-5"});var $=o(y,2),M=r($),P=r(M);Ya(P,{class:"w-10 h-10 text-white"});var S=o(k,4),N=r(S),f=r(N),E=r(f);E.__click=[ef,l];var C=o(E,2);C.__click=[rf,l];var H=o(S,2),z=r(H);z.__click=function(...Pt){(e(l)==="encode"?v:g)?.apply(this,Pt)};var rt=r(z),pt=o(z,2);pt.__click=[Qx,a,l,v];var lt=o(pt,2);lt.__click=[Zx,a,l,g];var mt=o(lt,2);mt.__click=[Xx,a,s,n];var ct=o(H,2),xt=r(ct),Rt=r(xt),Vt=o(r(Rt),2),Kt=r(Vt),Qt=o(Rt,2),Wt=o(xt,2),zt=r(Wt),Bt=r(zt),Lt=r(Bt),Ct=o(Bt,2);{var X=Pt=>{var ot=sf();ot.__click=[af,u,l,s,n];var kt=r(ot);Y(()=>b(kt,e(c)==="result"?"✓ Copied!":"Copy")),m(Pt,ot)};O(Ct,Pt=>{(e(l)==="encode"&&e(s)||e(l)==="decode"&&e(n))&&Pt(X)})}var _t=o(zt,2),ut=r(_t);{var at=Pt=>{var ot=nf(),kt=gt(ot),q=o(kt,2);{var Q=W=>{var A=of();m(W,A)};O(q,W=>{e(s)||W(Q)})}Tt(kt,()=>e(s),W=>d(s,W)),m(Pt,ot)},L=Pt=>{var ot=lf(),kt=gt(ot),q=o(kt,2);{var Q=W=>{var A=df();m(W,A)};O(q,W=>{e(n)||W(Q)})}Tt(kt,()=>e(n),W=>d(n,W)),m(Pt,ot)};O(ut,Pt=>{e(l)==="encode"?Pt(at):Pt(L,!1)})}var ft=o(ct,4),vt=r(ft),G=r(vt),tt=r(G);Ya(tt,{class:"w-6 h-6 text-rose-600 dark:text-rose-400"});var yt=o(vt,2),bt=r(yt),wt=r(bt);He(wt,{class:"w-6 h-6 text-rose-600 dark:text-rose-400"});var Ut=o(yt,2),Ot=r(Ut),Nt=r(Ot);Ve(Nt,{class:"w-6 h-6 text-rose-600 dark:text-rose-400"}),Y(Pt=>{ge(E,1,`px-4 py-2 rounded-md text-sm font-medium transition-colors ${e(l)==="encode"?"bg-rose-100 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300":"text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"}`),ge(C,1,`px-4 py-2 rounded-md text-sm font-medium transition-colors ${e(l)==="decode"?"bg-rose-100 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300":"text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"}`),z.disabled=Pt,b(rt,e(l)==="encode"?"Encode HTML":"Decode HTML"),b(Kt,`${e(a).length??""} characters`),Dt(Qt,"placeholder",`Enter ${e(l)==="encode"?"HTML code or text":"HTML entities"} to ${e(l)==="encode"?"encode":"decode"}...`),b(Lt,`${e(l)==="encode"?"Encoded":"Decoded"} Result`)},[()=>!e(a).trim()]),Tt(Qt,()=>e(a),Pt=>d(a,Pt)),m(i,p),jt()}ye(["click"]);function gf(i,t,a){d(t,"How to Create Amazing URL Slugs for Your Blog Posts and Articles"),a()}function uf(i,t,a){d(t,""),d(a,"")}function mf(){Ee("/tools")}var pf=(i,t,a)=>t(e(a)),xf=w('<button class="btn btn-primary btn-sm"> </button>'),ff=w('<div class="absolute inset-0 flex items-center justify-center pointer-events-none"><p class="text-gray-400 dark:text-gray-600">Enter text above to generate slug</p></div>'),bf=w('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">URL Slug Generator</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Create URL-friendly slugs from text with customizable separators and options.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">URL Slug Generator</li></ol></nav> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Slug Options</h3> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4"><div><label for="separator-select" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Separator</label> <select id="separator-select" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"><option>Hyphen (-)</option><option>Underscore (_)</option><option>No separator</option></select></div> <div><label for="max-length-input" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Max Length</label> <input id="max-length-input" type="number" min="0" max="500" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"/></div></div> <div class="flex flex-wrap gap-4"><label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" class="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 dark:focus:ring-emerald-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/> <span class="text-sm text-gray-700 dark:text-gray-300">Convert to lowercase</span></label> <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" class="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 dark:focus:ring-emerald-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/> <span class="text-sm text-gray-700 dark:text-gray-300">Remove stop words</span></label></div></div> <div class="mb-6 flex flex-wrap gap-4 items-center justify-center"><button class="btn btn-primary">Generate Slug</button> <button class="btn btn-primary">Load Sample Text</button> <button class="btn btn-primary">Clear All</button></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"><div><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Input Text</h2> <span class="text-sm text-gray-500 dark:text-gray-400"> </span></div> <textarea class="textarea" placeholder="Enter your text here to generate a URL-friendly slug..."></textarea></div> <div><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Generated Slug</h2> <!></div> <div class="relative"><input type="text" placeholder="Generated slug will appear here..." class="w-full p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"/> <!></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Common Examples</h3> <div class="space-y-3"><div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Blog Post Title</p> <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">"How to Create Amazing URL Slugs for Your Blog Posts"</p> <p class="font-mono text-sm text-emerald-600 dark:text-emerald-400">how-to-create-amazing-url-slugs-for-your-blog-posts</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Product Name</p> <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">"Super Pro Max 3000 Widget with Advanced Features"</p> <p class="font-mono text-sm text-emerald-600 dark:text-emerald-400">super-pro-max-3000-widget-with-advanced-features</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Article Title</p> <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">"The Ultimate Guide to Web Development in 2024"</p> <p class="font-mono text-sm text-emerald-600 dark:text-emerald-400">ultimate-guide-web-development-2024</p></div></div></div> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">URL-Friendly Slugs</h3> <p class="text-gray-600 dark:text-gray-400">Create clean, readable URLs that are SEO-friendly and user-friendly</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Custom Separators</h3> <p class="text-gray-600 dark:text-gray-400">Choose between hyphens, underscores, or no separators for your slugs</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Smart Processing</h3> <p class="text-gray-600 dark:text-gray-400">Remove special characters, stop words, and apply length limits automatically</p></div></div></div>');function yf(i,t){It(t,!0);let a=x(""),s=x(""),n=x("-"),c=x(!0),l=x(!1),v=x(100),g=x("");const u=new Set(["a","an","the","and","or","but","in","on","at","to","for","of","with","by","is","are","was","were","be","been","being","have","has","had","do","does","did","will","would","could","should","may","might","must","can","this","that","these","those"]);function p(){if(!e(a).trim()){d(s,"");return}let I=e(a);e(c)&&(I=I.toLowerCase()),e(l)&&(I=I.split(/\s+/).filter(R=>!u.has(R.toLowerCase())).join(" ")),I=I.replace(/[^\w\s-_]/g,""),I=I.replace(/[\s_]+/g,e(n)),I=I.replace(new RegExp(`${e(n)}+`,"g"),e(n)),I=I.replace(new RegExp(`^${e(n)}+|${e(n)}+$`,"g"),""),e(v)>0&&(I=I.substring(0,e(v)),I=I.replace(new RegExp(`${e(n)}$`),"")),d(s,I,!0)}function k(I){navigator.clipboard.writeText(I),d(g,"slug"),setTimeout(()=>{d(g,"")},2e3)}we(()=>{e(a)&&p()});var y=bf(),h=r(y),_=r(h),$=r(_);$.__click=[mf];var M=r($);Ie(M,{class:"w-5 h-5"});var P=o(_,2),S=r(P),N=r(S);fa(N,{class:"w-10 h-10 text-white"});var f=o(h,4),E=o(r(f),2),C=r(E),H=o(r(C),2),z=r(H);z.value=z.__value="-";var rt=o(z);rt.value=rt.__value="_";var pt=o(rt);pt.value=pt.__value="";var lt=o(C,2),mt=o(r(lt),2),ct=o(E,2),xt=r(ct),Rt=r(xt),Vt=o(xt,2),Kt=r(Vt),Qt=o(f,2),Wt=r(Qt);Wt.__click=p;var zt=o(Wt,2);zt.__click=[gf,a,p];var Bt=o(zt,2);Bt.__click=[uf,a,s];var Lt=o(Qt,2),Ct=r(Lt),X=r(Ct),_t=o(r(X),2),ut=r(_t),at=o(X,2),L=o(Ct,2),ft=r(L),vt=o(r(ft),2);{var G=I=>{var R=xf();R.__click=[pf,k,s];var it=r(R);Y(()=>b(it,e(g)==="slug"?"✓ Copied!":"Copy")),m(I,R)};O(vt,I=>{e(s)&&I(G)})}var tt=o(ft,2),yt=r(tt),bt=o(yt,2);{var wt=I=>{var R=ff();m(I,R)};O(bt,I=>{e(s)||I(wt)})}var Ut=o(Lt,4),Ot=r(Ut),Nt=r(Ot),Pt=r(Nt);fa(Pt,{class:"w-6 h-6 text-emerald-600 dark:text-emerald-400"});var ot=o(Ot,2),kt=r(ot),q=r(kt);He(q,{class:"w-6 h-6 text-emerald-600 dark:text-emerald-400"});var Q=o(ot,2),W=r(Q),A=r(W);Ve(A,{class:"w-6 h-6 text-emerald-600 dark:text-emerald-400"}),Y(I=>{Wt.disabled=I,b(ut,`${e(a).length??""} characters`)},[()=>!e(a).trim()]),cr(H,()=>e(n),I=>d(n,I)),Tt(mt,()=>e(v),I=>d(v,I)),We(Rt,()=>e(c),I=>d(c,I)),We(Kt,()=>e(l),I=>d(l,I)),Tt(at,()=>e(a),I=>d(a,I)),Tt(yt,()=>e(s),I=>d(s,I)),m(i,y),jt()}ye(["click"]);function hf(i,t,a,s){d(t,"#8B5CF6"),d(a,"triadic"),s()}function _f(){Ee("/tools")}var kf=(i,t,a)=>t(e(a).hex),wf=(i,t,a)=>t(`hsl(${e(a).hsl})`),Cf=(i,t,a)=>t(`rgb(${e(a).rgb})`),$f=w('<div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"><div class="h-24 w-full"></div> <div class="p-3"><h4 class="font-medium text-gray-900 dark:text-white mb-2"> </h4> <div class="space-y-1 text-xs"><div class="flex justify-between items-center"><span class="text-gray-600 dark:text-gray-400">HEX:</span> <button class="font-mono text-gray-900 dark:text-white hover:text-pink-600 dark:hover:text-pink-400 transition-colors" title="Copy HEX"> </button></div> <div class="flex justify-between items-center"><span class="text-gray-600 dark:text-gray-400">HSL:</span> <button class="font-mono text-gray-900 dark:text-white hover:text-pink-600 dark:hover:text-pink-400 transition-colors text-xs" title="Copy HSL"> </button></div> <div class="flex justify-between items-center"><span class="text-gray-600 dark:text-gray-400">RGB:</span> <button class="font-mono text-gray-900 dark:text-white hover:text-pink-600 dark:hover:text-pink-400 transition-colors text-xs" title="Copy RGB"> </button></div></div></div></div>'),Sf=w('<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Generated Palette</h3> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"></div></div>'),Tf=w(`<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl mb-4" style="background: linear-gradient(to bottom right, var(--color-palette-pink-light), var(--color-palette-pink))"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Color Palette Generator</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Generate harmonious color palettes with complementary, triadic, and analogous colors.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Color Palette Generator</li></ol></nav> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"><div><label for="base-color-picker" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Base Color</label> <div class="flex gap-2"><input class="input" id="base-color-picker" type="color" placeholder="#3B82F6"/> <button class="btn btn-primary"><!></button></div></div> <div><label for="palette-type-select" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Palette Type</label> <select id="palette-type-select" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"><option>Complementary</option><option>Triadic</option><option>Analogous</option><option>Monochromatic</option></select></div> <div class="flex items-end"><button class="btn btn-primary w-full">Load Sample Palette</button></div></div></div> <!> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Palette Types</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">Complementary</h4> <p class="text-sm text-gray-600 dark:text-gray-400">Two colors opposite each other on the color wheel. Creates high contrast and visual
          interest.</p></div> <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">Triadic</h4> <p class="text-sm text-gray-600 dark:text-gray-400">Three colors evenly spaced on the color wheel. Creates vibrant, balanced color schemes.</p></div> <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">Analogous</h4> <p class="text-sm text-gray-600 dark:text-gray-400">Colors adjacent to each other on the color wheel. Creates harmonious and pleasing
          combinations.</p></div> <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">Monochromatic</h4> <p class="text-sm text-gray-600 dark:text-gray-400">Variations of a single color with different lightness values. Creates subtle and
          sophisticated looks.</p></div></div></div> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-pink-100 dark:bg-pink-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Color Harmony</h3> <p class="text-gray-600 dark:text-gray-400">Generate color schemes based on color theory principles for professional designs</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-pink-100 dark:bg-pink-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Multiple Formats</h3> <p class="text-gray-600 dark:text-gray-400">Export colors in HEX, RGB, and HSL formats for use in any design tool</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-pink-100 dark:bg-pink-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Instant Preview</h3> <p class="text-gray-600 dark:text-gray-400">See your color palette in real-time as you adjust settings</p></div></div></div>`);function Mf(i,t){It(t,!0);let a=x("#3B82F6"),s=x("complementary"),n=x(Le([]));function c(vt){const G=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(vt);return G?{r:parseInt(G[1],16),g:parseInt(G[2],16),b:parseInt(G[3],16)}:{r:0,g:0,b:0}}function l(vt,G,tt){vt/=255,G/=255,tt/=255;const yt=Math.max(vt,G,tt),bt=Math.min(vt,G,tt);let wt=0,Ut=0,Ot=(yt+bt)/2;if(yt!==bt){const Nt=yt-bt;switch(Ut=Ot>.5?Nt/(2-yt-bt):Nt/(yt+bt),yt){case vt:wt=((G-tt)/Nt+(G<tt?6:0))/6;break;case G:wt=((tt-vt)/Nt+2)/6;break;case tt:wt=((vt-G)/Nt+4)/6;break}}return{h:Math.round(wt*360),s:Math.round(Ut*100),l:Math.round(Ot*100)}}function v(vt,G,tt){vt=vt/360,G=G/100,tt=tt/100;let yt,bt,wt;if(G===0)yt=bt=wt=tt;else{const Ot=(ot,kt,q)=>(q<0&&(q+=1),q>1&&(q-=1),q<.16666666666666666?ot+(kt-ot)*6*q:q<.5?kt:q<.6666666666666666?ot+(kt-ot)*(.6666666666666666-q)*6:ot),Nt=tt<.5?tt*(1+G):tt+G-tt*G,Pt=2*tt-Nt;yt=Ot(Pt,Nt,vt+1/3),bt=Ot(Pt,Nt,vt),wt=Ot(Pt,Nt,vt-1/3)}const Ut=Ot=>{const Nt=Math.round(Ot*255).toString(16);return Nt.length===1?"0"+Nt:Nt};return`#${Ut(yt)}${Ut(bt)}${Ut(wt)}`.toUpperCase()}function g(){const vt=c(e(a)),G=l(vt.r,vt.g,vt.b);let tt=[];switch(e(s)){case"complementary":tt=[{hex:e(a),name:"Base",hsl:`${G.h}, ${G.s}%, ${G.l}%`,rgb:`${vt.r}, ${vt.g}, ${vt.b}`},{hex:v((G.h+180)%360,G.s,G.l),name:"Complementary",hsl:`${(G.h+180)%360}, ${G.s}%, ${G.l}%`,rgb:""}];break;case"triadic":tt=[{hex:e(a),name:"Base",hsl:`${G.h}, ${G.s}%, ${G.l}%`,rgb:`${vt.r}, ${vt.g}, ${vt.b}`},{hex:v((G.h+120)%360,G.s,G.l),name:"Triadic 1",hsl:`${(G.h+120)%360}, ${G.s}%, ${G.l}%`,rgb:""},{hex:v((G.h+240)%360,G.s,G.l),name:"Triadic 2",hsl:`${(G.h+240)%360}, ${G.s}%, ${G.l}%`,rgb:""}];break;case"analogous":tt=[{hex:v((G.h-30+360)%360,G.s,G.l),name:"Analogous 1",hsl:`${(G.h-30+360)%360}, ${G.s}%, ${G.l}%`,rgb:""},{hex:e(a),name:"Base",hsl:`${G.h}, ${G.s}%, ${G.l}%`,rgb:`${vt.r}, ${vt.g}, ${vt.b}`},{hex:v((G.h+30)%360,G.s,G.l),name:"Analogous 2",hsl:`${(G.h+30)%360}, ${G.s}%, ${G.l}%`,rgb:""}];break;case"monochromatic":tt=[{hex:v(G.h,G.s,20),name:"Dark",hsl:`${G.h}, ${G.s}%, 20%`,rgb:""},{hex:v(G.h,G.s,40),name:"Dark Medium",hsl:`${G.h}, ${G.s}%, 40%`,rgb:""},{hex:v(G.h,G.s,60),name:"Medium",hsl:`${G.h}, ${G.s}%, 60%`,rgb:""},{hex:v(G.h,G.s,80),name:"Light Medium",hsl:`${G.h}, ${G.s}%, 80%`,rgb:""},{hex:v(G.h,G.s,95),name:"Light",hsl:`${G.h}, ${G.s}%, 95%`,rgb:""}];break}tt=tt.map(yt=>{if(!yt.rgb){const bt=c(yt.hex);return{...yt,rgb:`${bt.r}, ${bt.g}, ${bt.b}`}}return yt}),d(n,tt,!0)}function u(){const vt="0123456789ABCDEF";let G="#";for(let tt=0;tt<6;tt++)G+=vt[Math.floor(Math.random()*16)];d(a,G,!0)}function p(vt){navigator.clipboard.writeText(vt)}we(()=>{e(a)&&e(s)&&g()});var k=Tf(),y=r(k),h=r(y),_=r(h);_.__click=[_f];var $=r(_);Ie($,{class:"w-5 h-5"});var M=o(h,2),P=r(M),S=r(P);Kr(S,{class:"w-10 h-10 text-white"});var N=o(y,4),f=r(N),E=r(f),C=o(r(E),2),H=r(C),z=o(H,2);z.__click=u;var rt=r(z);Er(rt,{class:"w-4 h-4"});var pt=o(E,2),lt=o(r(pt),2),mt=r(lt);mt.value=mt.__value="complementary";var ct=o(mt);ct.value=ct.__value="triadic";var xt=o(ct);xt.value=xt.__value="analogous";var Rt=o(xt);Rt.value=Rt.__value="monochromatic";var Vt=o(pt,2),Kt=r(Vt);Kt.__click=[hf,a,s,g];var Qt=o(N,2);{var Wt=vt=>{var G=Sf(),tt=o(r(G),2);fe(tt,23,()=>e(n),(yt,bt)=>yt.hex+bt,(yt,bt)=>{var wt=$f(),Ut=r(wt),Ot=o(Ut,2),Nt=r(Ot),Pt=r(Nt),ot=o(Nt,2),kt=r(ot),q=o(r(kt),2);q.__click=[kf,p,bt];var Q=r(q),W=o(kt,2),A=o(r(W),2);A.__click=[wf,p,bt];var I=r(A),R=o(W,2),it=o(r(R),2);it.__click=[Cf,p,bt];var et=r(it);Y(()=>{Ke(Ut,`background-color: ${e(bt).hex??""}`),b(Pt,e(bt).name),b(Q,e(bt).hex),b(I,e(bt).hsl),b(et,e(bt).rgb)}),m(yt,wt)}),m(vt,G)};O(Qt,vt=>{e(n).length>0&&vt(Wt)})}var zt=o(Qt,4),Bt=r(zt),Lt=r(Bt),Ct=r(Lt);Kr(Ct,{class:"w-6 h-6 text-pink-600 dark:text-pink-400"});var X=o(Bt,2),_t=r(X),ut=r(_t);be(ut,{class:"w-6 h-6 text-pink-600 dark:text-pink-400"});var at=o(X,2),L=r(at),ft=r(L);Ve(ft,{class:"w-6 h-6 text-pink-600 dark:text-pink-400"}),Tt(H,()=>e(a),vt=>d(a,vt)),cr(lt,()=>e(s),vt=>d(s,vt)),m(i,k),jt()}ye(["click"]);function Ef(i,t,a){const s=e(t).length>0?Math.round((e(t)[e(t).length-1].position+e(t)[0].position)/2):50;d(t,[...e(t),{color:"#000000",position:Math.min(100,Math.max(0,s))}],!0),a()}function Pf(){Ee("/tools")}var Lf=w("<option>↑ Top</option> <option>↗ Top Right</option> <option>→ Right</option> <option>↘ Bottom Right</option> <option>↓ Bottom</option> <option>↙ Bottom Left</option> <option>← Left</option> <option>↖ Top Left</option>",1),Af=w("<option>Circle</option> <option>Ellipse</option>",1),If=w("<option>0°</option> <option>45°</option> <option>90°</option> <option>135°</option> <option>180°</option> <option>225°</option> <option>270°</option> <option>315°</option>",1),jf=w('<button class="p-1 text-red-600 hover:text-red-700 transition-colors"><!></button>'),Nf=w('<div class="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><input type="color" class="w-12 h-8 border border-gray-300 dark:border-gray-600 rounded cursor-pointer"/> <input type="text" placeholder="#000000" class="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"/> <div class="flex items-center gap-1"><input type="range" min="0" max="100" class="w-20"/> <span class="text-sm text-gray-600 dark:text-gray-400 w-10"> </span></div> <!></div>'),Rf=(i,t,a)=>t(e(a),"css"),Bf=(i,t,a)=>t(e(a)),Df=w('<button class="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-[var(--ds-primary-500)] dark:hover:border-blue-400 transition-colors"><div class="h-16 w-full rounded mb-2"></div> <p class="text-sm font-medium text-gray-900 dark:text-white"> </p></button>'),Ff=w('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--ds-primary-400)] to-[var(--ds-primary-600)] rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">CSS Gradient Generator</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Create beautiful CSS gradients with live preview and easy customization.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">CSS Gradient Generator</li></ol></nav> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Preview</h3> <div class="h-48 w-full rounded-lg shadow-inner"></div></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Gradient Settings</h3> <div class="space-y-4"><div><label for="gradient-type-select" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gradient Type</label> <select id="gradient-type-select" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-transparent"><option>Linear</option><option>Radial</option><option>Conic</option></select></div> <div><label for="gradient-direction" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"> </label> <select id="gradient-direction" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-transparent"><!></select></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><div class="flex justify-between items-center mb-4"><h3 class="text-lg font-semibold text-gray-900 dark:text-white">Color Stops</h3> <button class="px-3 py-1 bg-[var(--ds-primary-600)] text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1"><!> Add Stop</button></div> <div class="space-y-3"></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><div class="flex justify-between items-center mb-4"><h3 class="text-lg font-semibold text-gray-900 dark:text-white">CSS Code</h3> <div class="flex gap-2"><button class="px-4 py-2 bg-[var(--ds-primary-600)] text-white rounded-lg hover:bg-blue-700 transition-colors"> </button> <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">Download CSS</button></div></div> <pre class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg font-mono text-sm text-gray-900 dark:text-white overflow-x-auto"> </pre></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Preset Gradients</h3> <div class="grid grid-cols-2 md:grid-cols-4 gap-4"></div></div> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Multiple Gradient Types</h3> <p class="text-gray-600 dark:text-gray-400">Create linear, radial, and conic gradients with customizable directions</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Live Preview</h3> <p class="text-gray-600 dark:text-gray-400">See your gradient in real-time as you adjust colors and positions</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">CSS Export</h3> <p class="text-gray-600 dark:text-gray-400">Copy clean CSS code or download as a file for immediate use</p></div></div></div>');function Hf(i,t){It(t,!0);let a=x("linear"),s=x("90deg"),n=x(Le([{color:"#667eea",position:0},{color:"#764ba2",position:100}])),c=x(""),l=x("");const v=[{name:"Sunset",type:"linear",direction:"45deg",stops:[{color:"#ff6b6b",position:0},{color:"#feca57",position:100}]},{name:"Ocean",type:"linear",direction:"135deg",stops:[{color:"#667eea",position:0},{color:"#764ba2",position:100}]},{name:"Forest",type:"linear",direction:"90deg",stops:[{color:"#38ef7d",position:0},{color:"#11998e",position:100}]},{name:"Fire",type:"radial",direction:"circle",stops:[{color:"#f12711",position:0},{color:"#f5af19",position:100}]}];function g(){const K=e(_).map(U=>`${U.color} ${U.position}%`).join(", ");e(a)==="linear"?d(c,`background: linear-gradient(${e(s)}, ${K});`):e(a)==="radial"?d(c,`background: radial-gradient(${e(s)}, ${K});`):e(a)==="conic"&&d(c,`background: conic-gradient(from ${e(s)}, ${K});`)}function u(K){e(n).length>2&&(d(n,e(n).filter((U,B)=>B!==K),!0),g())}function p(K,U,B){const T=[...e(n)];U==="color"?T[K].color=B:T[K].position=Math.min(100,Math.max(0,B)),d(n,T,!0),g()}function k(K){d(a,K.type,!0),d(s,K.direction,!0),d(n,[...K.stops],!0),g()}function y(K,U){navigator.clipboard.writeText(K),d(l,U,!0),setTimeout(()=>{d(l,"")},2e3)}function h(){const K=new Blob([e(c)],{type:"text/css"}),U=URL.createObjectURL(K),B=document.createElement("a");B.href=U,B.download="gradient.css",B.click(),URL.revokeObjectURL(U)}const _=ue(()=>[...e(n)].sort((K,U)=>K.position-U.position)),$=ue(()=>()=>{const K=e(_).map(U=>`${U.color} ${U.position}%`).join(", ");return e(a)==="linear"?`linear-gradient(${e(s)}, ${K})`:e(a)==="radial"?`radial-gradient(${e(s)}, ${K})`:`linear-gradient(${e(s)}, ${K})`});we(()=>{g()});var M=Ff(),P=r(M),S=r(P),N=r(S);N.__click=[Pf];var f=r(N);Ie(f,{class:"w-5 h-5"});var E=o(S,2),C=r(E),H=r(C);Io(H,{class:"w-10 h-10 text-white"});var z=o(P,4),rt=o(r(z),2),pt=o(z,2),lt=r(pt),mt=o(r(lt),2),ct=r(mt),xt=o(r(ct),2),Rt=r(xt);Rt.value=Rt.__value="linear";var Vt=o(Rt);Vt.value=Vt.__value="radial";var Kt=o(Vt);Kt.value=Kt.__value="conic";var Qt=o(ct,2),Wt=r(Qt),zt=r(Wt),Bt=o(Wt,2),Lt=r(Bt);{var Ct=K=>{var U=Lf(),B=gt(U);B.value=B.__value="0deg";var T=o(B,2);T.value=T.__value="45deg";var D=o(T,2);D.value=D.__value="90deg";var F=o(D,2);F.value=F.__value="135deg";var Z=o(F,2);Z.value=Z.__value="180deg";var j=o(Z,2);j.value=j.__value="225deg";var nt=o(j,2);nt.value=nt.__value="270deg";var Mt=o(nt,2);Mt.value=Mt.__value="315deg",m(K,U)},X=K=>{var U=Et(),B=gt(U);{var T=F=>{var Z=Af(),j=gt(Z);j.value=j.__value="circle";var nt=o(j,2);nt.value=nt.__value="ellipse",m(F,Z)},D=F=>{var Z=If(),j=gt(Z);j.value=j.__value="0deg";var nt=o(j,2);nt.value=nt.__value="45deg";var Mt=o(nt,2);Mt.value=Mt.__value="90deg";var qt=o(Mt,2);qt.value=qt.__value="135deg";var St=o(qt,2);St.value=St.__value="180deg";var J=o(St,2);J.value=J.__value="225deg";var dt=o(J,2);dt.value=dt.__value="270deg";var $t=o(dt,2);$t.value=$t.__value="315deg",m(F,Z)};O(B,F=>{e(a)==="radial"?F(T):F(D,!1)},!0)}m(K,U)};O(Lt,K=>{e(a)==="linear"?K(Ct):K(X,!1)})}var _t=o(lt,2),ut=r(_t),at=o(r(ut),2);at.__click=[Ef,n,g];var L=r(at);Ai(L,{class:"w-4 h-4"});var ft=o(ut,2);fe(ft,23,()=>e(n),(K,U)=>K.color+U,(K,U,B)=>{var T=Nf(),D=r(T);D.__input=()=>p(e(B),"color",e(U).color);var F=o(D,2);F.__input=()=>p(e(B),"color",e(U).color);var Z=o(F,2),j=r(Z);j.__input=J=>p(e(B),"position",parseInt(J.target.value));var nt=o(j,2),Mt=r(nt),qt=o(Z,2);{var St=J=>{var dt=jf();dt.__click=()=>u(e(B));var $t=r(dt);qi($t,{class:"w-4 h-4"}),m(J,dt)};O(qt,J=>{e(n).length>2&&J(St)})}Y(()=>b(Mt,`${e(U).position??""}%`)),Tt(D,()=>e(U).color,J=>e(U).color=J),Tt(F,()=>e(U).color,J=>e(U).color=J),Tt(j,()=>e(U).position,J=>e(U).position=J),m(K,T)});var vt=o(pt,2),G=r(vt),tt=o(r(G),2),yt=r(tt);yt.__click=[Rf,y,c];var bt=r(yt),wt=o(yt,2);wt.__click=h;var Ut=o(G,2),Ot=r(Ut),Nt=o(vt,2),Pt=o(r(Nt),2);fe(Pt,23,()=>v,(K,U)=>K.name+U,(K,U)=>{var B=Df();B.__click=[Bf,k,U];var T=r(B),D=o(T,2),F=r(D);Y(Z=>{Ke(T,`background: ${Z??""}`),b(F,e(U).name)},[()=>e(U).type==="linear"?`linear-gradient(${e(U).direction}, ${e(U).stops.map(Z=>`${Z.color} ${Z.position}%`).join(", ")})`:`radial-gradient(${e(U).direction}, ${e(U).stops.map(Z=>`${Z.color} ${Z.position}%`).join(", ")})`]),m(K,B)});var ot=o(Nt,2),kt=r(ot),q=r(kt),Q=r(q);Io(Q,{class:"w-6 h-6 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"});var W=o(kt,2),A=r(W),I=r(A);be(I,{class:"w-6 h-6 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"});var R=o(W,2),it=r(R),et=r(it);Ve(et,{class:"w-6 h-6 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"}),Y(K=>{Ke(rt,`background: ${K??""}`),b(zt,e(a)==="linear"?"Direction":"Shape"),b(bt,e(l)==="css"?"✓ Copied!":"Copy CSS"),b(Ot,e(c))},[()=>e($)()]),cr(xt,()=>e(a),K=>d(a,K)),cr(Bt,()=>e(s),K=>d(s,K)),m(i,M),jt()}ye(["click","input"]);function Of(i,t,a){d(t,"Hello, World! This is a sample text for hash generation."),a()}function zf(i,t,a){d(t,""),d(a,{},!0)}function Uf(){Ee("/tools")}var Gf=(i,t,a,s)=>t(a(),s()),qf=w('<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><div class="flex justify-between items-center mb-3"><div class="flex items-center gap-3"><div class="w-10 h-10 bg-[var(--ds-secondary-100)] dark:bg-[var(--ds-secondary-900)/20] rounded-lg flex items-center justify-center"><!></div> <div><h3 class="text-lg font-semibold text-gray-900 dark:text-white"> </h3> <p class="text-sm text-gray-500 dark:text-gray-400"> </p></div></div> <button class="px-4 py-2 bg-[var(--ds-secondary-600)] text-white rounded-lg hover:bg-[var(--ds-secondary-700)] transition-colors"> </button></div> <div class="relative"><div class="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg font-mono text-sm text-gray-900 dark:text-white break-all"> </div></div></div>'),Wf=w('<div class="space-y-4 mb-6"></div>'),Jf=w('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--ds-secondary-400)] to-[var(--ds-secondary-600)] rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Hash Generator</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Generate MD5, SHA1, SHA256, and SHA512 hashes for text and data verification.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Hash Generator</li></ol></nav> <div class="mb-6 flex flex-wrap gap-4 items-center justify-center"><button class="px-4 py-2 bg-[var(--ds-secondary-600)] text-white rounded-lg hover:bg-[var(--ds-secondary-700)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Generate Hashes</button> <button class="px-4 py-2 bg-[var(--ds-primary-600)] text-white rounded-lg hover:bg-[var(--ds-primary-700)] transition-colors">Load Sample Text</button> <button class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">Clear All</button></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><div class="flex justify-between items-center mb-4"><h3 class="text-lg font-semibold text-gray-900 dark:text-white">Input Text</h3> <span class="text-sm text-gray-500 dark:text-gray-400"> </span></div> <textarea placeholder="Enter text to generate hashes..." class="w-full h-32 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-[var(--ds-secondary-500)] focus:border-transparent"></textarea></div> <!> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">About Hash Algorithms</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">MD5</h4> <p class="text-sm text-gray-600 dark:text-gray-400">128-bit hash function. Fast but not cryptographically secure for sensitive data.</p></div> <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">SHA-1</h4> <p class="text-sm text-gray-600 dark:text-gray-400">160-bit hash function. Deprecated for security purposes but still used for compatibility.</p></div> <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">SHA-256</h4> <p class="text-sm text-gray-600 dark:text-gray-400">256-bit hash function. Secure and widely used for blockchain and data integrity.</p></div> <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">SHA-512</h4> <p class="text-sm text-gray-600 dark:text-gray-400">512-bit hash function. Highest security level, suitable for critical applications.</p></div></div></div> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-amber-100 dark:bg-amber-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Multiple Algorithms</h3> <p class="text-gray-600 dark:text-gray-400">Generate MD5, SHA1, SHA256, and SHA512 hashes for different security needs</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-amber-100 dark:bg-amber-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Data Verification</h3> <p class="text-gray-600 dark:text-gray-400">Verify file integrity and authenticate data transfers with cryptographic hashes</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-amber-100 dark:bg-amber-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Instant Results</h3> <p class="text-gray-600 dark:text-gray-400">Generate hashes instantly with real-time updates as you type</p></div></div></div>');function Vf(i,t){It(t,!0);let a=x(""),s=x(Le({})),n=x("");async function c(Lt,Ct){return new TextEncoder().encode(Lt),Ct==="md5"?await l(Lt,"md5"):Ct==="sha1"?await l(Lt,"sha1"):Ct==="sha256"?await l(Lt,"sha256"):Ct==="sha512"?await l(Lt,"sha512"):""}async function l(Lt,Ct){let X=0;for(let L=0;L<Lt.length;L++){const ft=Lt.charCodeAt(L);X=(X<<5)-X+ft,X=X&X}const ut={md5:32,sha1:40,sha256:64,sha512:128}[Ct]||64;let at=Math.abs(X).toString(16);for(;at.length<ut;)at=at.padEnd(ut,at);return at.substring(0,ut)}async function v(){if(!e(a).trim()){d(s,{},!0);return}const Lt=["md5","sha1","sha256","sha512"],Ct={};for(const X of Lt)Ct[X]=await c(e(a),X);d(s,Ct,!0)}function g(Lt,Ct){navigator.clipboard.writeText(Lt),d(n,Ct,!0),setTimeout(()=>{d(n,"")},2e3)}we(()=>{e(a)&&v()});var u=Jf(),p=r(u),k=r(p),y=r(k);y.__click=[Uf];var h=r(y);Ie(h,{class:"w-5 h-5"});var _=o(k,2),$=r(_),M=r($);Zr(M,{class:"w-10 h-10 text-white"});var P=o(p,4),S=r(P);S.__click=v;var N=o(S,2);N.__click=[Of,a,v];var f=o(N,2);f.__click=[zf,a,s];var E=o(P,2),C=r(E),H=o(r(C),2),z=r(H),rt=o(C,2),pt=o(E,2);{var lt=Lt=>{var Ct=Wf();fe(Ct,21,()=>Object.entries(e(s)),([X,_t])=>X,(X,_t)=>{var ut=ue(()=>Qa(e(_t),2));let at=()=>e(ut)[0],L=()=>e(ut)[1];var ft=qf(),vt=r(ft),G=r(vt),tt=r(G),yt=r(tt);Zr(yt,{class:"w-5 h-5 text-[var(--ds-secondary-600)] dark:text-[var(--ds-secondary-400)]"});var bt=o(tt,2),wt=r(bt),Ut=r(wt),Ot=o(wt,2),Nt=r(Ot),Pt=o(G,2);Pt.__click=[Gf,g,L,at];var ot=r(Pt),kt=o(vt,2),q=r(kt),Q=r(q);Y(W=>{b(Ut,W),b(Nt,`${L().length??""} characters • ${L().length*4} bits`),b(ot,e(n)===at()?"✓ Copied!":"Copy Hash"),b(Q,L())},[()=>at().toUpperCase()]),m(X,ft)}),m(Lt,Ct)};O(pt,Lt=>{Object.keys(e(s)).length>0&&Lt(lt)})}var mt=o(pt,4),ct=r(mt),xt=r(ct),Rt=r(xt);Zr(Rt,{class:"w-6 h-6 text-amber-600 dark:text-amber-400"});var Vt=o(ct,2),Kt=r(Vt),Qt=r(Kt);He(Qt,{class:"w-6 h-6 text-[var(--ds-secondary-600)] dark:text-[var(--ds-secondary-400)]"});var Wt=o(Vt,2),zt=r(Wt),Bt=r(zt);Ve(Bt,{class:"w-6 h-6 text-[var(--ds-secondary-600)] dark:text-[var(--ds-secondary-400)]"}),Y(Lt=>{S.disabled=Lt,b(z,`${e(a).length??""} characters`)},[()=>!e(a).trim()]),Tt(rt,()=>e(a),Lt=>d(a,Lt)),m(i,u),jt()}ye(["click"]);function Yf(i,t,a,s,n,c){d(t,""),a(),d(s,""),d(n,null),d(c,"header")}function Kf(i,t){d(t,"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE3MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c")}function Qf(){Ee("/tools")}var Zf=w('<meta name="description" content="Securely decode and analyze JWT tokens. View header, payload, and check token validity"/>'),Xf=(i,t)=>d(t,!e(t)),tb=w('<!> <span class="text-sm text-green-700 dark:text-green-300">Valid JWT format</span>',1),eb=w('<!> <span class="text-sm text-red-700 dark:text-red-300">Invalid JWT format</span>',1),rb=w("<div><!></div>"),ab=w('<div class="flex items-start p-3 mt-3 rounded-md bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800"><!> <span class="text-sm text-yellow-700 dark:text-yellow-300"> </span></div>'),ib=w('<div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-6"><div class="p-6"><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center"><!> Token Information</h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"><div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md"><p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Subject</p> <p class="text-sm font-medium text-gray-900 dark:text-white"> </p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md"><p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Issued At</p> <p class="text-sm font-medium text-gray-900 dark:text-white"> </p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md"><p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Expires At</p> <p class="text-sm font-medium text-gray-900 dark:text-white"> </p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md"><p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Status</p> <p> </p></div></div></div></div>'),sb=(i,t)=>d(t,"header"),ob=(i,t)=>d(t,"payload"),nb=(i,t)=>d(t,"signature"),db=(i,t,a)=>t(e(a)),lb=w('<div class="flex items-center justify-between mb-4"><h3 class="text-lg font-medium text-gray-900 dark:text-white">Decoded Header</h3> <button class="flex items-center px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"><!> </button></div> <pre class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm text-gray-700 dark:text-gray-300"><code> </code></pre>',1),cb=(i,t,a)=>t(e(a)),vb=w('<div class="flex items-center justify-between mb-4"><h3 class="text-lg font-medium text-gray-900 dark:text-white">Decoded Payload</h3> <button class="flex items-center px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"><!> </button></div> <pre class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm text-gray-700 dark:text-gray-300"><code> </code></pre>',1),gb=(i,t,a)=>t(e(a)),ub=w(`<div class="flex items-center justify-between mb-4"><h3 class="text-lg font-medium text-gray-900 dark:text-white">Signature</h3> <button class="flex items-center px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"><!> </button></div> <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4"><div class="flex items-start"><!> <div><p class="text-sm text-yellow-700 dark:text-yellow-300 font-medium mb-1">Security Note</p> <p class="text-xs text-yellow-600 dark:text-yellow-400">The signature cannot be verified in the browser for security reasons. Always
                  verify JWT signatures on your server using a proper secret key.</p></div></div></div> <pre class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm text-gray-700 dark:text-gray-300 break-all"><code> </code></pre>`,1),mb=w('<div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="flex flex-wrap border-b border-gray-200 dark:border-gray-700"><button>Header</button> <button>Payload</button> <button>Signature</button></div> <div class="p-6"><!> <!> <!></div></div>'),pb=w('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-slate-400 to-slate-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">JWT Decoder</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Decode and analyze JSON Web Tokens (JWT) safely in your browser</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">JWT Decoder</li></ol></nav> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-6"><div class="p-6"><div class="mb-4"><label for="jwt-token-input" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">JWT Token</label> <div class="relative"><textarea id="jwt-token-input" placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" class="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-[var(--ds-primary-500)] font-mono text-sm resize-none"></textarea> <button class="absolute right-2 top-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"><!></button></div> <div class="flex items-center justify-between mt-2"><p class="text-xs text-gray-500 dark:text-gray-400">Token will be decoded in real-time. No data is sent to any server.</p> <div class="flex gap-2"><button class="flex items-center px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"><!> Load Example</button> <button class="flex items-center px-3 py-1 text-xs bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors">Clear</button></div></div></div> <!> <!></div></div> <!> <!></div>');function xb(i,t){It(t,!0);let a=x(""),s=x(!1),n=x(""),c=x(""),l=x(""),v=x(null),g=x(""),u=x(!1),p=x("header");we(()=>{e(a)?k():y()});function k(){try{const tt=e(a).split(".");if(tt.length!==3)throw new Error("Invalid JWT format. JWT must have 3 parts separated by dots.");try{const yt=atob(tt[0]),bt=JSON.parse(yt);d(n,JSON.stringify(bt,null,2),!0)}catch{throw new Error("Invalid header format. Cannot decode base64 or parse JSON.")}try{const yt=atob(tt[1]),bt=JSON.parse(yt);d(c,JSON.stringify(bt,null,2),!0),bt.exp&&(Math.floor(Date.now()/1e3)>bt.exp?d(g,"Warning: This token has expired!"):d(g,""))}catch{throw new Error("Invalid payload format. Cannot decode base64 or parse JSON.")}d(l,tt[2],!0),d(v,!0)}catch(tt){d(g,tt instanceof Error?tt.message:"Failed to decode JWT token",!0),y(),d(v,!1)}}function y(){d(n,""),d(c,""),d(l,""),d(v,null)}function h(tt){navigator.clipboard.writeText(tt).then(()=>{d(u,!0),setTimeout(()=>{d(u,!1)},2e3)})}function _(){if(!e(c))return null;try{return JSON.parse(e(c))}catch{return null}}function $(tt){return new Date(tt*1e3).toLocaleString()}function M(){const tt=_();return!tt||!tt.exp?!1:Math.floor(Date.now()/1e3)>tt.exp}function P(){const tt=_();if(!tt||!tt.exp)return"N/A";const yt=Math.floor(Date.now()/1e3),bt=tt.exp-yt;if(bt<=0)return"Expired";const wt=Math.floor(bt/86400),Ut=Math.floor(bt%86400/3600),Ot=Math.floor(bt%3600/60);return wt>0?`${wt}d ${Ut}h ${Ot}m`:Ut>0?`${Ut}h ${Ot}m`:`${Ot}m`}var S=pb();Lr(tt=>{var yt=Zf();kr.title="JWT Decoder - Developer Tools",m(tt,yt)});var N=r(S),f=r(N),E=r(f);E.__click=[Qf];var C=r(E);Ie(C,{class:"w-5 h-5"});var H=o(f,2),z=r(H),rt=r(z);W0(rt,{class:"w-10 h-10 text-white"});var pt=o(N,4),lt=r(pt),mt=r(lt),ct=o(r(mt),2),xt=r(ct),Rt=o(xt,2);Rt.__click=[Xf,s];var Vt=r(Rt);{var Kt=tt=>{z0(tt,{class:"w-5 h-5"})},Qt=tt=>{pd(tt,{class:"w-5 h-5"})};O(Vt,tt=>{e(s)?tt(Kt):tt(Qt,!1)})}var Wt=o(ct,2),zt=o(r(Wt),2),Bt=r(zt);Bt.__click=[Kf,a];var Lt=r(Bt);Er(Lt,{class:"w-3 h-3 mr-1"});var Ct=o(Bt,2);Ct.__click=[Yf,a,y,g,v,p];var X=o(mt,2);{var _t=tt=>{var yt=rb(),bt=r(yt);{var wt=Ot=>{var Nt=tb(),Pt=gt(Nt);ma(Pt,{class:"w-5 h-5 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)] mr-2"}),m(Ot,Nt)},Ut=Ot=>{var Nt=eb(),Pt=gt(Nt);gi(Pt,{class:"w-5 h-5 text-red-600 dark:text-red-400 mr-2"}),m(Ot,Nt)};O(bt,Ot=>{e(v)?Ot(wt):Ot(Ut,!1)})}Y(()=>ge(yt,1,`flex items-center p-3 rounded-md ${e(v)?"bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800":"bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"}`)),m(tt,yt)};O(X,tt=>{e(v)!==null&&tt(_t)})}var ut=o(X,2);{var at=tt=>{var yt=ab(),bt=r(yt);oo(bt,{class:"w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2 mt-0.5"});var wt=o(bt,2),Ut=r(wt);Y(()=>b(Ut,e(g))),m(tt,yt)};O(ut,tt=>{e(g)&&tt(at)})}var L=o(pt,2);{var ft=tt=>{const yt=ue(_);var bt=ib(),wt=r(bt),Ut=r(wt),Ot=r(Ut);pa(Ot,{class:"w-5 h-5 mr-2"});var Nt=o(Ut,2),Pt=r(Nt),ot=o(r(Pt),2),kt=r(ot),q=o(Pt,2),Q=o(r(q),2),W=r(Q),A=o(q,2),I=o(r(A),2),R=r(I),it=o(A,2),et=o(r(it),2),K=r(et);Y((U,B,T,D)=>{b(kt,e(yt).sub||"N/A"),b(W,U),b(R,B),ge(et,1,`text-sm font-medium ${T??""}`),b(K,D)},[()=>e(yt).iat?$(e(yt).iat):"N/A",()=>e(yt).exp?$(e(yt).exp):"N/A",()=>M()?"text-red-600 dark:text-red-400":"text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]",()=>M()?"Expired":`Valid (${P()})`]),m(tt,bt)};O(L,tt=>{e(v)&&_()&&tt(ft)})}var vt=o(L,2);{var G=tt=>{var yt=mb(),bt=r(yt),wt=r(bt);wt.__click=[sb,p];var Ut=o(wt,2);Ut.__click=[ob,p];var Ot=o(Ut,2);Ot.__click=[nb,p];var Nt=o(bt,2),Pt=r(Nt);{var ot=A=>{var I=lb(),R=gt(I),it=o(r(R),2);it.__click=[db,h,n];var et=r(it);be(et,{class:"w-4 h-4 mr-1"});var K=o(et),U=o(R,2),B=r(U),T=r(B);Y(()=>{b(K,` ${e(u)?"Copied!":"Copy"}`),b(T,e(n))}),m(A,I)};O(Pt,A=>{e(p)==="header"&&A(ot)})}var kt=o(Pt,2);{var q=A=>{var I=vb(),R=gt(I),it=o(r(R),2);it.__click=[cb,h,c];var et=r(it);be(et,{class:"w-4 h-4 mr-1"});var K=o(et),U=o(R,2),B=r(U),T=r(B);Y(()=>{b(K,` ${e(u)?"Copied!":"Copy"}`),b(T,e(c))}),m(A,I)};O(kt,A=>{e(p)==="payload"&&A(q)})}var Q=o(kt,2);{var W=A=>{var I=ub(),R=gt(I),it=o(r(R),2);it.__click=[gb,h,l];var et=r(it);be(et,{class:"w-4 h-4 mr-1"});var K=o(et),U=o(R,2),B=r(U),T=r(B);pa(T,{class:"w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2 mt-0.5"});var D=o(U,2),F=r(D),Z=r(F);Y(()=>{b(K,` ${e(u)?"Copied!":"Copy"}`),b(Z,e(l))}),m(A,I)};O(Q,A=>{e(p)==="signature"&&A(W)})}Y(()=>{ge(wt,1,`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${e(p)==="header"?"border-[var(--ds-primary-500)] text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]":"border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"}`),ge(Ut,1,`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${e(p)==="payload"?"border-[var(--ds-primary-500)] text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]":"border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"}`),ge(Ot,1,`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${e(p)==="signature"?"border-[var(--ds-primary-500)] text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]":"border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"}`)}),m(tt,yt)};O(vt,tt=>{e(v)&&tt(G)})}Y(()=>Dt(xt,"rows",e(s)?4:1)),Tt(xt,()=>e(a),tt=>d(a,tt)),m(i,S),jt()}ye(["click"]);function fb(i,t,a,s,n){const c=parseFloat(e(t))||0;d(a,(c*(e(s)/100)).toFixed(2),!0),n()}function bb(i,t,a,s,n){const c=parseFloat(e(t))||0,l=parseFloat(e(a))||0;c>0&&d(s,Math.round(l/c*100*100)/100),n()}function yb(i,t,a,s,n,c,l){d(t,"125.50"),d(a,18),d(s,4),d(n,"10.04"),d(c,!0),l()}function hb(i,t,a,s,n,c,l,v,g,u){d(t,""),d(a,15),d(s,1),d(n,""),d(c,0),d(l,!1),d(v,0),d(g,0),d(u,0)}function _b(){Ee("/tools")}var kb=(i,t,a)=>d(t,a,!0),wb=w("<button> </button>"),Cb=(i,t)=>d(t,Math.max(1,e(t)-1),!0),$b=(i,t)=>d(t,e(t)+1),Sb=(i,t,a)=>t(e(a).toFixed(2)),Tb=(i,t,a)=>t(e(a).toFixed(2)),Mb=(i,t,a)=>t(e(a).toFixed(2)),Eb=w('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="btn btn-primary"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--ds-primary-400)] to-[var(--ds-primary-600)] rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Tip Calculator</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Calculate tips and split bills easily with support for tax and multiple people.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Tip Calculator</li></ol></nav> <div class="mb-6 flex flex-wrap gap-4 items-center justify-center"><button class="btn btn-primary">Load Sample Bill</button> <button class="btn btn-primary">Clear All</button></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"><div class="space-y-4"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><label for="bill-amount" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bill Amount ($)</label> <input id="bill-amount" type="number" placeholder="0.00" step="0.01" min="0" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-transparent text-lg"/></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><label for="tip-percentage" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"> </label> <input id="tip-percentage" type="range" min="0" max="50" step="1" class="w-full mb-3"/> <div class="grid grid-cols-5 gap-2"></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><label for="number-people" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Number of People</label> <div class="flex items-center gap-2"><button class="btn btn-primary btn-sm">-</button> <input id="number-people" type="number" min="1" class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-transparent"/> <button class="btn btn-primary btn-sm">+</button></div></div></div> <div class="space-y-4"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tax Options</h3> <label class="flex items-center gap-2 cursor-pointer mb-4"><input type="checkbox" class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-[var(--ds-primary-500)] dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/> <span class="text-sm text-gray-700 dark:text-gray-300">Include tax in total</span></label> <div class="space-y-3"><div><label for="tax-amount" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tax Amount ($)</label> <input id="tax-amount" type="number" placeholder="0.00" step="0.01" min="0" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-transparent"/></div> <div><label for="tax-rate" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tax Rate (%)</label> <input id="tax-rate" type="number" placeholder="0.00" step="0.1" min="0" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-transparent"/></div></div></div> <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Calculation Results</h3> <div class="space-y-3"><div class="flex justify-between items-center"><span class="text-gray-600 dark:text-gray-400">Tip Amount:</span> <div class="flex items-center gap-2"><span class="text-xl font-semibold text-gray-900 dark:text-white"> </span> <button class="btn btn-primary btn-sm"><!></button></div></div> <div class="flex justify-between items-center"><span class="text-gray-600 dark:text-gray-400">Total Amount:</span> <div class="flex items-center gap-2"><span class="text-xl font-semibold text-gray-900 dark:text-white"> </span> <button class="btn btn-primary btn-sm"><!></button></div></div> <div class="pt-3 border-t border-green-200 dark:border-green-800"><div class="flex justify-between items-center"><span class="text-gray-600 dark:text-gray-400">Per Person:</span> <div class="flex items-center gap-2"><span class="text-2xl font-bold text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"> </span> <button class="btn btn-primary btn-sm"><!></button></div></div></div></div></div></div></div> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Tip Calculation</h3> <p class="text-gray-600 dark:text-gray-400">Calculate tips with customizable percentages and preset options</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Bill Splitting</h3> <p class="text-gray-600 dark:text-gray-400">Split bills easily among multiple people with fair distribution</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Tax Support</h3> <p class="text-gray-600 dark:text-gray-400">Include tax calculations by amount or percentage for accurate totals</p></div></div></div>');function Pb(i,t){It(t,!0);let a=x(""),s=x(15),n=x(1),c=x(""),l=x(0),v=x(!1),g=x(0),u=x(0),p=x(0);const k=[10,15,18,20,25];function y(){let dt=parseFloat(e(a))||0,$t=parseFloat(e(c))||0;e(v)?dt+=$t:e(l)>0&&($t=dt*(e(l)/100),dt+=$t),d(g,dt*(e(s)/100)),d(u,dt+e(g)),d(p,e(u)/e(n))}function h(dt){navigator.clipboard.writeText(dt)}we(()=>{(e(a)||e(c))&&y()});var _=Eb(),$=r(_),M=r($),P=r(M);P.__click=[_b];var S=r(P);Ie(S,{class:"w-5 h-5 mr-2"});var N=o(M,2),f=r(N),E=r(f);Ds(E,{class:"w-10 h-10 text-white"});var C=o($,4),H=r(C);H.__click=[yb,a,s,n,c,v,y];var z=o(H,2);z.__click=[hb,a,s,n,c,l,v,g,u,p];var rt=o(C,2),pt=r(rt),lt=r(pt),mt=o(r(lt),2),ct=o(lt,2),xt=r(ct),Rt=r(xt),Vt=o(xt,2),Kt=o(Vt,2);fe(Kt,20,()=>k,dt=>dt,(dt,$t)=>{var Ft=wb();Ft.__click=[kb,s,$t];var V=r(Ft);Y(()=>{ge(Ft,1,`px-3 py-2 text-sm rounded-lg border transition-colors ${e(s)===$t?"bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] border-green-500 text-green-700 dark:text-green-300":"bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-green-400"}`),b(V,`${$t??""}%`)}),m(dt,Ft)});var Qt=o(ct,2),Wt=o(r(Qt),2),zt=r(Wt);zt.__click=[Cb,n];var Bt=o(zt,2),Lt=o(Bt,2);Lt.__click=[$b,n];var Ct=o(pt,2),X=r(Ct),_t=o(r(X),2),ut=r(_t),at=o(_t,2),L=r(at),ft=o(r(L),2);ft.__input=[bb,a,c,l,y];var vt=o(L,2),G=o(r(vt),2);G.__input=[fb,a,c,l,y];var tt=o(X,2),yt=o(r(tt),2),bt=r(yt),wt=o(r(bt),2),Ut=r(wt),Ot=r(Ut),Nt=o(Ut,2);Nt.__click=[Sb,h,g];var Pt=r(Nt);be(Pt,{class:"w-4 h-4"});var ot=o(bt,2),kt=o(r(ot),2),q=r(kt),Q=r(q),W=o(q,2);W.__click=[Tb,h,u];var A=r(W);be(A,{class:"w-4 h-4"});var I=o(ot,2),R=r(I),it=o(r(R),2),et=r(it),K=r(et),U=o(et,2);U.__click=[Mb,h,p];var B=r(U);be(B,{class:"w-4 h-4"});var T=o(rt,2),D=r(T),F=r(D),Z=r(F);Rr(Z,{class:"w-6 h-6 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"});var j=o(D,2),nt=r(j),Mt=r(nt);co(Mt,{class:"w-6 h-6 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"});var qt=o(j,2),St=r(qt),J=r(St);Ds(J,{class:"w-6 h-6 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"}),Y((dt,$t,Ft)=>{b(Rt,`Tip Percentage: ${e(s)??""}%`),b(Ot,`$${dt??""}`),b(Q,`$${$t??""}`),b(K,`$${Ft??""}`)},[()=>e(g).toFixed(2),()=>e(u).toFixed(2),()=>e(p).toFixed(2)]),Tt(mt,()=>e(a),dt=>d(a,dt)),Tt(Vt,()=>e(s),dt=>d(s,dt)),Tt(Bt,()=>e(n),dt=>d(n,dt)),We(ut,()=>e(v),dt=>d(v,dt)),Tt(ft,()=>e(c),dt=>d(c,dt)),Tt(G,()=>e(l),dt=>d(l,dt)),m(i,_),jt()}ye(["click","input"]);function Lb(i,t,a){d(t,"1704067200"),a()}function Ab(i,t,a,s){d(t,""),d(a,""),d(s,"")}function Ib(){Ee("/tools")}var jb=(i,t,a)=>t(e(a),"iso"),Nb=w('<div><label for="iso-string" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">ISO String</label> <div class="flex gap-2"><input id="iso-string" type="text" class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-mono"/> <button class="btn btn-primary btn-sm"> </button></div></div>'),Rb=(i,t,a)=>t(e(a),"timestamp"),Bb=w('<div><label for="unix-timestamp-result" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Unix Timestamp</label> <div class="flex gap-2"><input id="unix-timestamp-result" type="text" class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-mono"/> <button class="btn btn-primary btn-sm"> </button></div></div>'),Db=(i,t,a)=>t(e(a),"formatted"),Fb=w('<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Formatted Results</h3> <div class="mb-4"><label for="date-format" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date Format</label> <select id="date-format" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"><option>ISO 8601</option><option>US Format</option><option>European Format</option><option>Readable</option><option>Short Date</option><option>Time Only</option><option>Date Only</option></select></div> <div class="flex gap-2"><input type="text" class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"/> <button class="btn btn-primary"> </button></div></div>'),Hb=w(`<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="btn btn-primary"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--ds-secondary-400)] to-[var(--ds-secondary-600)] rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Unix Timestamp Converter</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Convert Unix timestamps to human-readable dates and vice versa.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Timestamp Converter</li></ol></nav> <div class="bg-gradient-to-r from-[var(--ds-secondary-100)] to-[var(--ds-secondary-50)] dark:from-[var(--ds-secondary-900)/20] dark:to-[var(--ds-secondary-900)/20] rounded-xl border border-[var(--ds-secondary-200)] dark:border-[var(--ds-secondary-800)] p-6 mb-6"><div class="flex justify-between items-center"><div><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Current Timestamp</h3> <p class="text-gray-600 dark:text-gray-400 mb-2">Current Unix timestamp and date</p> <div class="flex items-center gap-4"><span class="text-lg font-mono text-gray-900 dark:text-white"> </span> <span class="text-gray-600 dark:text-gray-400"> </span></div></div> <button class="btn btn-primary"><!> Refresh</button></div></div> <div class="mb-6 flex flex-wrap gap-4 items-center justify-center"><button class="btn btn-primary">Load Sample Timestamp</button> <button class="btn btn-primary">Clear All</button></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Unix Timestamp → Date</h3> <div class="space-y-4"><div><label for="unix-timestamp" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Unix Timestamp</label> <input id="unix-timestamp" type="text" placeholder="1704067200" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-secondary-500)] focus:border-transparent font-mono"/></div> <!></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Date → Unix Timestamp</h3> <div class="space-y-4"><div><label for="date-iso" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date (ISO format)</label> <input id="date-iso" type="datetime-local" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-secondary-500)] focus:border-transparent"/></div> <!></div></div></div> <!> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">About Unix Timestamps</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">What is a Unix Timestamp?</h4> <p class="text-sm text-gray-600 dark:text-gray-400">A Unix timestamp is the number of seconds that have elapsed since January 1, 1970
          (midnight UTC/GMT).</p></div> <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">Common Uses</h4> <p class="text-sm text-gray-600 dark:text-gray-400">Used in programming, databases, APIs, and systems for consistent date/time representation
          across timezones.</p></div></div></div> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-[var(--ds-secondary-100)] dark:bg-[var(--ds-secondary-900)/20] rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Unix Timestamps</h3> <p class="text-gray-600 dark:text-gray-400">Convert between Unix timestamps and human-readable dates instantly</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-[var(--ds-secondary-100)] dark:bg-[var(--ds-secondary-900)/20] rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Multiple Formats</h3> <p class="text-gray-600 dark:text-gray-400">Support for ISO, US, European, and custom date formats</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-[var(--ds-secondary-100)] dark:bg-[var(--ds-secondary-900)/20] rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Real-time Updates</h3> <p class="text-gray-600 dark:text-gray-400">Get current timestamp and live updates as you type</p></div></div></div>`);function Ob(i,t){It(t,!0);let a=x(""),s=x(""),n=x("iso");function c(Q,W){switch(W){case"iso":return Q.toISOString();case"us":return Q.toLocaleString("en-US");case"european":return Q.toLocaleString("en-GB");case"readable":return Q.toLocaleString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit"});case"short":return Q.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});case"time":return Q.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",second:"2-digit"});case"date":return Q.toISOString().split("T")[0];default:return Q.toISOString()}}let l=x(""),v=x(""),g=x("");function u(){d(v,Math.floor(new Date().getTime()/1e3).toString(),!0),d(a,e(v),!0),p()}function p(){if(!e(a)){d(s,""),d(g,"");return}try{const Q=parseInt(e(a)),W=new Date(Q*1e3);if(isNaN(W.getTime())){d(s,"Invalid timestamp"),d(g,"");return}d(g,W.toISOString(),!0),d(s,c(W,e(n)),!0)}catch{d(s,"Invalid timestamp"),d(g,"")}}function k(){if(!e(g)){d(a,""),d(s,"");return}try{const Q=new Date(e(g));if(isNaN(Q.getTime())){d(a,"Invalid date"),d(s,"");return}d(a,Math.floor(Q.getTime()/1e3).toString(),!0),d(s,c(Q,e(n)),!0)}catch{d(a,"Invalid date"),d(s,"")}}function y(Q,W){navigator.clipboard.writeText(Q),d(l,W,!0),setTimeout(()=>{d(l,"")},2e3)}u(),we(()=>{e(a)&&p()}),we(()=>{e(g)&&k()}),we(()=>{if(e(g)){const Q=new Date(e(g));isNaN(Q.getTime())||d(s,c(Q,e(n)),!0)}});var h=Hb(),_=r(h),$=r(_),M=r($);M.__click=[Ib];var P=r(M);Ie(P,{class:"w-5 h-5 mr-2"});var S=o($,2),N=r(S),f=r(N);Va(f,{class:"w-10 h-10 text-white"});var E=o(_,4),C=r(E),H=r(C),z=o(r(H),4),rt=r(z),pt=r(rt),lt=o(rt,2),mt=r(lt),ct=o(H,2);ct.__click=u;var xt=r(ct);Er(xt,{class:"w-4 h-4 mr-2"});var Rt=o(E,2),Vt=r(Rt);Vt.__click=[Lb,a,p];var Kt=o(Vt,2);Kt.__click=[Ab,a,s,g];var Qt=o(Rt,2),Wt=r(Qt),zt=o(r(Wt),2),Bt=r(zt),Lt=o(r(Bt),2),Ct=o(Bt,2);{var X=Q=>{var W=Nb(),A=o(r(W),2),I=r(A),R=o(I,2);R.__click=[jb,y,g];var it=r(R);Y(()=>b(it,e(l)==="iso"?"✓":"Copy")),Tt(I,()=>e(g),et=>d(g,et)),m(Q,W)};O(Ct,Q=>{e(g)&&Q(X)})}var _t=o(Wt,2),ut=o(r(_t),2),at=r(ut),L=o(r(at),2),ft=o(at,2);{var vt=Q=>{var W=Bb(),A=o(r(W),2),I=r(A),R=o(I,2);R.__click=[Rb,y,a];var it=r(R);Y(()=>b(it,e(l)==="timestamp"?"✓":"Copy")),Tt(I,()=>e(a),et=>d(a,et)),m(Q,W)};O(ft,Q=>{e(a)&&!isNaN(parseInt(e(a)))&&Q(vt)})}var G=o(Qt,2);{var tt=Q=>{var W=Fb(),A=o(r(W),2),I=o(r(A),2),R=r(I);R.value=R.__value="iso";var it=o(R);it.value=it.__value="us";var et=o(it);et.value=et.__value="european";var K=o(et);K.value=K.__value="readable";var U=o(K);U.value=U.__value="short";var B=o(U);B.value=B.__value="time";var T=o(B);T.value=T.__value="date";var D=o(A,2),F=r(D),Z=o(F,2);Z.__click=[Db,y,s];var j=r(Z);Y(()=>b(j,e(l)==="formatted"?"✓ Copied!":"Copy")),cr(I,()=>e(n),nt=>d(n,nt)),Tt(F,()=>e(s),nt=>d(s,nt)),m(Q,W)};O(G,Q=>{e(s)&&Q(tt)})}var yt=o(G,4),bt=r(yt),wt=r(bt),Ut=r(wt);Va(Ut,{class:"w-6 h-6 text-[var(--ds-secondary-600)] dark:text-[var(--ds-secondary-400)]"});var Ot=o(bt,2),Nt=r(Ot),Pt=r(Nt);be(Pt,{class:"w-6 h-6 text-[var(--ds-secondary-600)] dark:text-[var(--ds-secondary-400)]"});var ot=o(Ot,2),kt=r(ot),q=r(kt);Ve(q,{class:"w-6 h-6 text-[var(--ds-secondary-600)] dark:text-[var(--ds-secondary-400)]"}),Y(Q=>{b(pt,e(v)),b(mt,`(${Q??""})`)},[()=>new Date().toLocaleString()]),Tt(Lt,()=>e(a),Q=>d(a,Q)),Tt(L,()=>e(g),Q=>d(g,Q)),m(i,h),jt()}ye(["click"]);function zb(i,t,a){navigator.clipboard.writeText(e(t)).then(()=>{d(a,!0),setTimeout(()=>{d(a,!1)},2e3)})}function Ub(i,t,a,s,n,c,l,v,g,u,p,k,y,h,_,$,M,P,S,N,f,E,C,H,z,rt,pt,lt,mt,ct,xt,Rt,Vt,Kt,Qt,Wt,zt,Bt,Lt){d(t,""),d(a,""),d(s,""),d(n,""),d(c,""),d(l,"index,follow"),d(v,""),d(g,""),d(u,""),d(p,""),d(k,""),d(y,"website"),d(h,""),d(_,"en_US"),d($,"summary_large_image"),d(M,""),d(P,""),d(S,""),d(N,""),d(f,""),d(E,""),d(C,"#ffffff"),d(H,"width=device-width, initial-scale=1.0"),d(z,"en"),d(rt,"text/html; charset=utf-8"),d(pt,"/favicon.ico"),d(lt,""),d(mt,""),d(ct,""),d(xt,""),d(Rt,""),d(Vt,!1),d(Kt,"WebPage"),d(Qt,""),d(Wt,""),d(zt,""),d(Bt,""),d(Lt,"")}function Gb(i,t,a,s,n,c,l,v,g,u,p,k,y,h,_,$,M,P,S,N){d(t,"My Awesome Website - Home Page"),d(a,"Welcome to my awesome website! Discover amazing content, services, and resources that will help you achieve your goals."),d(s,"awesome website, web development, technology, innovation, digital solutions"),d(n,"John Doe"),d(c,"https://myawesomewebsite.com"),d(l,"index,follow"),d(v,"website"),d(g,"My Awesome Website"),d(u,"en_US"),d(p,"summary_large_image"),d(k,"@myawesomewebsite"),d(y,"@johndoe"),d(h,"#3b82f6"),d(_,"en"),d($,!0),d(M,"WebPage"),d(P,"My Awesome Website - Home Page"),d(S,e(a),!0),d(N,e(c),!0)}function qb(){Ee("/tools")}var Wb=w('<meta name="description" content="Generate SEO meta tags, Open Graph tags, Twitter cards, and JSON-LD structured data for better search engine optimization"/>'),Jb=(i,t,a)=>d(t,e(a).id,!0),Vb=w("<button><!> </button>"),Yb=w('<div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Page Title *</label> <input class="input" type="text" placeholder="Enter page title (50-60 characters recommended)"/> <p class="mt-1 text-xs text-gray-500 dark:text-gray-400"> </p></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Meta Description *</label> <textarea class="textarea" placeholder="Enter page description (150-160 characters recommended)"></textarea> <p class="mt-1 text-xs text-gray-500 dark:text-gray-400"> </p></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Keywords</label> <input type="text" placeholder="Enter keywords separated by commas" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-[var(--ds-primary-500)]"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Author</label> <input type="text" placeholder="Enter author name" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-[var(--ds-primary-500)]"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Canonical URL</label> <input type="url" placeholder="https://example.com/page" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-[var(--ds-primary-500)]"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Robots</label> <select class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-[var(--ds-primary-500)]"><option>Index, Follow</option><option>Index, No Follow</option><option>No Index, Follow</option><option>No Index, No Follow</option></select></div></div>'),Kb=w('<div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"><h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Article Specific Tags</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Published Time</label> <input type="datetime-local" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-[var(--ds-primary-500)]"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Modified Time</label> <input type="datetime-local" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-[var(--ds-primary-500)]"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Article Author</label> <input type="text" placeholder="Author name" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-[var(--ds-primary-500)]"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Article Section</label> <input type="text" placeholder="Technology, Business, etc." class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-[var(--ds-primary-500)]"/></div> <div class="md:col-span-2"><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Article Tags</label> <input type="text" placeholder="tag1, tag2, tag3" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-[var(--ds-primary-500)]"/></div></div></div>'),Qb=w('<div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">OG Title</label> <input type="text" placeholder="Enter Open Graph title" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-[var(--ds-primary-500)]"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">OG Description</label> <textarea placeholder="Enter Open Graph description" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-[var(--ds-primary-500)] resize-none"></textarea></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">OG Image URL</label> <input type="url" placeholder="https://example.com/image.jpg" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-[var(--ds-primary-500)]"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">OG Image Alt</label> <input type="text" placeholder="Describe the image for accessibility" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-[var(--ds-primary-500)]"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">OG URL</label> <input type="url" placeholder="https://example.com/page" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-[var(--ds-primary-500)]"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">OG Type</label> <select class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-[var(--ds-primary-500)]"><option>Website</option><option>Article</option><option>Product</option><option>Profile</option><option>Video</option><option>Music</option></select></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">OG Site Name</label> <input type="text" placeholder="Your website name" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-[var(--ds-primary-500)]"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">OG Locale</label> <input type="text" placeholder="en_US" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-[var(--ds-primary-500)]"/></div></div> <!>',1),Zb=w('<div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Twitter Card Type</label> <select class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-[var(--ds-primary-500)]"><option>Summary</option><option>Summary with Large Image</option><option>App</option><option>Player</option></select></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Twitter Title</label> <input type="text" placeholder="Enter Twitter card title" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-[var(--ds-primary-500)]"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Twitter Description</label> <textarea placeholder="Enter Twitter card description" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-[var(--ds-primary-500)] resize-none"></textarea></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Twitter Image URL</label> <input type="url" placeholder="https://example.com/twitter-image.jpg" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-[var(--ds-primary-500)]"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Twitter Image Alt</label> <input type="text" placeholder="Describe the Twitter image" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-[var(--ds-primary-500)]"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Twitter Site</label> <input type="text" placeholder="@yourwebsite" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-[var(--ds-primary-500)]"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Twitter Creator</label> <input type="text" placeholder="@author" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-[var(--ds-primary-500)]"/></div></div>'),Xb=w('<div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Theme Color</label> <input type="color" class="w-full h-10 px-1 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 cursor-pointer"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language</label> <input type="text" placeholder="en" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-[var(--ds-primary-500)]"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Viewport</label> <input type="text" placeholder="width=device-width, initial-scale=1.0" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-[var(--ds-primary-500)]"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Favicon</label> <input type="text" placeholder="/favicon.ico" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-[var(--ds-primary-500)]"/></div></div>'),ty=w('<div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">JSON-LD Type</label> <select class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-[var(--ds-primary-500)]"><option>Web Page</option><option>Article</option><option>Product</option><option>Organization</option><option>Person</option><option>Recipe</option><option>Event</option></select></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label> <input type="text" placeholder="Enter name/title" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-[var(--ds-primary-500)]"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label> <textarea placeholder="Enter description" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-[var(--ds-primary-500)] resize-none"></textarea></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">URL</label> <input type="url" placeholder="https://example.com" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-[var(--ds-primary-500)]"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image</label> <input type="url" placeholder="https://example.com/image.jpg" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-[var(--ds-primary-500)]"/></div></div>'),ey=w('<div class="space-y-6"><div class="flex items-center"><input id="enable-jsonld" type="checkbox" class="w-4 h-4 text-[var(--ds-primary-600)] bg-gray-100 border-gray-300 rounded focus:ring-[var(--ds-primary-500)] dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/> <label for="enable-jsonld" class="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">Enable JSON-LD Structured Data</label></div> <!></div>'),ry=w('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-violet-400 to-violet-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Meta Tag Generator</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Generate SEO meta tags, Open Graph tags, Twitter cards, and structured data</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Meta Tag Generator</li></ol></nav> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-6"><div class="flex flex-wrap border-b border-gray-200 dark:border-gray-700"></div> <div class="p-6"><!> <!> <!> <!> <!></div></div> <div class="flex flex-wrap gap-3 mb-6"><button class="btn btn-primary"><!> Load Example</button> <button class="btn btn-primary">Clear All</button></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700"><h2 class="text-xl font-semibold text-gray-900 dark:text-white">Generated Meta Tags</h2> <div class="flex gap-2"><button class="btn btn-primary btn-sm"><!> </button> <button class="btn btn-primary btn-sm">Download HTML</button></div></div> <div class="p-6"><pre class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm text-gray-700 dark:text-gray-300"><code> </code></pre></div></div></div>');function ay(i,t){It(t,!0);let a=x(""),s=x(""),n=x(""),c=x(""),l=x(""),v=x("index,follow"),g=x(""),u=x(""),p=x(""),k=x(""),y=x(""),h=x("website"),_=x(""),$=x("en_US"),M=x("summary_large_image"),P=x(""),S=x(""),N=x(""),f=x(""),E=x(""),C=x(""),H=x("#ffffff"),z=x("width=device-width, initial-scale=1.0"),rt=x("en"),pt=x("text/html; charset=utf-8"),lt=x("/favicon.ico"),mt=x(""),ct=x(""),xt=x(""),Rt=x(""),Vt=x(""),Kt=x(!1),Qt=x("WebPage"),Wt=x(""),zt=x(""),Bt=x(""),Lt=x(""),Ct=x(""),X=x(!1),_t=x("basic");we(()=>{e(a)&&!e(g)&&d(g,e(a),!0),e(a)&&!e(P)&&d(P,e(a),!0),e(s)&&!e(u)&&d(u,e(s),!0),e(s)&&!e(S)&&d(S,e(s),!0),e(l)&&!e(y)&&d(y,e(l),!0),e(p)&&!e(N)&&d(N,e(p),!0),e(k)&&!e(f)&&d(f,e(k),!0)});function ut(){let V="";if(e(a)&&(V+="<title>"+L(e(a))+"</title>",V+=`
`),e(s)&&(V+='<meta name="description" content="'+L(e(s))+'">',V+=`
`),e(n)&&(V+='<meta name="keywords" content="'+L(e(n))+'">',V+=`
`),e(c)&&(V+='<meta name="author" content="'+L(e(c))+'">',V+=`
`),e(l)&&(V+='<link rel="canonical" href="'+L(e(l))+'">',V+=`
`),e(v)&&(V+='<meta name="robots" content="'+L(e(v))+'">',V+=`
`),V+=`
<!-- Open Graph Meta Tags -->
`,V+='<meta property="og:type" content="'+L(e(h))+'">',V+=`
`,e(g)&&(V+='<meta property="og:title" content="'+L(e(g))+'">',V+=`
`),e(u)&&(V+='<meta property="og:description" content="'+L(e(u))+'">',V+=`
`),e(p)&&(V+='<meta property="og:image" content="'+L(e(p))+'">',V+=`
`),e(k)&&(V+='<meta property="og:image:alt" content="'+L(e(k))+'">',V+=`
`),e(y)&&(V+='<meta property="og:url" content="'+L(e(y))+'">',V+=`
`),e(_)&&(V+='<meta property="og:site_name" content="'+L(e(_))+'">',V+=`
`),e($)&&(V+='<meta property="og:locale" content="'+L(e($))+'">',V+=`
`),V+=`
<!-- Twitter Card Meta Tags -->
`,V+='<meta name="twitter:card" content="'+L(e(M))+'">',V+=`
`,e(P)&&(V+='<meta name="twitter:title" content="'+L(e(P))+'">',V+=`
`),e(S)&&(V+='<meta name="twitter:description" content="'+L(e(S))+'">',V+=`
`),e(N)&&(V+='<meta name="twitter:image" content="'+L(e(N))+'">',V+=`
`),e(f)&&(V+='<meta name="twitter:image:alt" content="'+L(e(f))+'">',V+=`
`),e(E)&&(V+='<meta name="twitter:site" content="'+L(e(E))+'">',V+=`
`),e(C)&&(V+='<meta name="twitter:creator" content="'+L(e(C))+'">',V+=`
`),e(h)==="article"&&(V+=`
<!-- Article Specific Meta Tags -->
`,e(mt)&&(V+='<meta property="article:published_time" content="'+L(e(mt))+'">',V+=`
`),e(ct)&&(V+='<meta property="article:modified_time" content="'+L(e(ct))+'">',V+=`
`),e(xt)&&(V+='<meta property="article:author" content="'+L(e(xt))+'">',V+=`
`),e(Rt)&&(V+='<meta property="article:section" content="'+L(e(Rt))+'">',V+=`
`),e(Vt)&&(V+='<meta property="article:tag" content="'+L(e(Vt))+'">',V+=`
`)),V+=`
<!-- Additional Meta Tags -->
`,V+='<meta charset="utf-8">',V+=`
`,V+='<meta name="viewport" content="'+L(e(z))+'">',V+=`
`,V+='<meta http-equiv="content-type" content="'+L(e(pt))+'">',V+=`
`,e(rt)&&(V+='<meta name="language" content="'+L(e(rt))+'">',V+=`
`),e(H)&&(V+='<meta name="theme-color" content="'+L(e(H))+'">',V+=`
`),e(lt)&&(V+='<link rel="icon" href="'+L(e(lt))+'">',V+=`
`),e(Kt)){V+=`
<!-- JSON-LD Structured Data -->
`;const st=at();V+='<script type="application/ld+json">'+st+"<\/script>",V+=`
`}d(Ct,V,!0)}function at(){const V={"@context":"https://schema.org","@type":e(Qt)};return e(Wt)&&(V.name=e(Wt)),e(zt)&&(V.description=e(zt)),e(Bt)&&(V.url=e(Bt)),e(Lt)&&(V.image=e(Lt)),JSON.stringify(V,null,2)}function L(V){const st=document.createElement("div");return st.textContent=V,st.innerHTML}function ft(){if(!e(Ct))return;const V=`<!DOCTYPE html>
<html lang="`+e(rt)+`">
<head>
`+e(Ct)+`</head>
<body>
  <!-- Your content goes here -->
  <h1>Welcome to `+(e(a)||"Your Website")+`</h1>
  <p>`+(e(s)||"Your description here.")+`</p>
</body>
</html>`,st=new Blob([V],{type:"text/html"}),ht=URL.createObjectURL(st),At=document.createElement("a");At.href=ht,At.download="meta-tags-example.html",document.body.appendChild(At),At.click(),document.body.removeChild(At),URL.revokeObjectURL(ht)}we(()=>{ut()});var vt=ry();Lr(V=>{var st=Wb();kr.title="Meta Tag Generator - Developer Tools",m(V,st)});var G=r(vt),tt=r(G),yt=r(tt);yt.__click=[qb];var bt=r(yt);Ie(bt,{class:"w-5 h-5"});var wt=o(tt,2),Ut=r(wt),Ot=r(Ut);Fs(Ot,{class:"w-10 h-10 text-white"});var Nt=o(G,4),Pt=r(Nt);fe(Pt,21,()=>[{id:"basic",label:"Basic SEO",icon:zs},{id:"opengraph",label:"Open Graph",icon:Fs},{id:"twitter",label:"Twitter Cards",icon:oc},{id:"additional",label:"Additional",icon:Ya},{id:"jsonld",label:"JSON-LD",icon:He}],V=>V.id,(V,st)=>{var ht=Vb();ht.__click=[Jb,_t,st];var At=r(ht);nr(At,()=>e(st).icon,(Xt,Yt)=>{Yt(Xt,{class:"w-4 h-4 mr-2"})});var Jt=o(At);Y(()=>{ge(ht,1,`flex items-center px-4 py-3 text-sm font-medium border-b-2 transition-colors ${e(_t)===e(st).id?"border-[var(--ds-primary-500)] text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]":"border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"}`),b(Jt,` ${e(st).label??""}`)}),m(V,ht)});var ot=o(Pt,2),kt=r(ot);{var q=V=>{var st=Yb(),ht=r(st),At=r(ht);Dt(At,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var Jt=o(At,2),Xt=o(Jt,2),Yt=r(Xt),ee=o(ht,2),le=r(ee);Dt(le,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var Gt=o(le,2),de=o(Gt,2),ce=r(de),ae=o(ee,2),me=r(ae);Dt(me,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var pe=o(me,2),re=o(ae,2),ve=r(re);Dt(ve,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var Ce=o(ve,2),Te=o(re,2),Ht=r(Te);Dt(Ht,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var se=o(Ht,2),xe=o(Te,2),he=r(xe);Dt(he,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var je=o(he,2),Ne=r(je);Ne.value=Ne.__value="index,follow";var Be=o(Ne);Be.value=Be.__value="index,nofollow";var De=o(Be);De.value=De.__value="noindex,follow";var _e=o(De);_e.value=_e.__value="noindex,nofollow",Y(()=>{b(Yt,`${e(a).length??""}/60 characters`),b(ce,`${e(s).length??""}/160 characters`)}),Tt(Jt,()=>e(a),Se=>d(a,Se)),Tt(Gt,()=>e(s),Se=>d(s,Se)),Tt(pe,()=>e(n),Se=>d(n,Se)),Tt(Ce,()=>e(c),Se=>d(c,Se)),Tt(se,()=>e(l),Se=>d(l,Se)),cr(je,()=>e(v),Se=>d(v,Se)),m(V,st)};O(kt,V=>{e(_t)==="basic"&&V(q)})}var Q=o(kt,2);{var W=V=>{var st=Qb(),ht=gt(st),At=r(ht),Jt=r(At);Dt(Jt,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var Xt=o(Jt,2),Yt=o(At,2),ee=r(Yt);Dt(ee,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var le=o(ee,2),Gt=o(Yt,2),de=r(Gt);Dt(de,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var ce=o(de,2),ae=o(Gt,2),me=r(ae);Dt(me,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var pe=o(me,2),re=o(ae,2),ve=r(re);Dt(ve,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var Ce=o(ve,2),Te=o(re,2),Ht=r(Te);Dt(Ht,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var se=o(Ht,2),xe=r(se);xe.value=xe.__value="website";var he=o(xe);he.value=he.__value="article";var je=o(he);je.value=je.__value="product";var Ne=o(je);Ne.value=Ne.__value="profile";var Be=o(Ne);Be.value=Be.__value="video";var De=o(Be);De.value=De.__value="music";var _e=o(Te,2),Se=r(_e);Dt(Se,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var Ge=o(Se,2),Ae=o(_e,2),Je=r(Ae);Dt(Je,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var Xe=o(Je,2),mr=o(ht,2);{var lr=Pe=>{var tr=Kb(),Ar=o(r(tr),2),pr=r(Ar),xr=r(pr);Dt(xr,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var ar=o(xr,2),ir=o(pr,2),fr=r(ir);Dt(fr,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var Ir=o(fr,2),wr=o(ir,2),Wr=r(wr);Dt(Wr,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var aa=o(Wr,2),ze=o(wr,2),Dr=r(ze);Dt(Dr,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var ia=o(Dr,2),ja=o(ze,2),sa=r(ja);Dt(sa,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var Na=o(sa,2);Tt(ar,()=>e(mt),br=>d(mt,br)),Tt(Ir,()=>e(ct),br=>d(ct,br)),Tt(aa,()=>e(xt),br=>d(xt,br)),Tt(ia,()=>e(Rt),br=>d(Rt,br)),Tt(Na,()=>e(Vt),br=>d(Vt,br)),m(Pe,tr)};O(mr,Pe=>{e(h)==="article"&&Pe(lr)})}Tt(Xt,()=>e(g),Pe=>d(g,Pe)),Tt(le,()=>e(u),Pe=>d(u,Pe)),Tt(ce,()=>e(p),Pe=>d(p,Pe)),Tt(pe,()=>e(k),Pe=>d(k,Pe)),Tt(Ce,()=>e(y),Pe=>d(y,Pe)),cr(se,()=>e(h),Pe=>d(h,Pe)),Tt(Ge,()=>e(_),Pe=>d(_,Pe)),Tt(Xe,()=>e($),Pe=>d($,Pe)),m(V,st)};O(Q,V=>{e(_t)==="opengraph"&&V(W)})}var A=o(Q,2);{var I=V=>{var st=Zb(),ht=r(st),At=r(ht);Dt(At,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var Jt=o(At,2),Xt=r(Jt);Xt.value=Xt.__value="summary";var Yt=o(Xt);Yt.value=Yt.__value="summary_large_image";var ee=o(Yt);ee.value=ee.__value="app";var le=o(ee);le.value=le.__value="player";var Gt=o(ht,2),de=r(Gt);Dt(de,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var ce=o(de,2),ae=o(Gt,2),me=r(ae);Dt(me,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var pe=o(me,2),re=o(ae,2),ve=r(re);Dt(ve,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var Ce=o(ve,2),Te=o(re,2),Ht=r(Te);Dt(Ht,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var se=o(Ht,2),xe=o(Te,2),he=r(xe);Dt(he,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var je=o(he,2),Ne=o(xe,2),Be=r(Ne);Dt(Be,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var De=o(Be,2);cr(Jt,()=>e(M),_e=>d(M,_e)),Tt(ce,()=>e(P),_e=>d(P,_e)),Tt(pe,()=>e(S),_e=>d(S,_e)),Tt(Ce,()=>e(N),_e=>d(N,_e)),Tt(se,()=>e(f),_e=>d(f,_e)),Tt(je,()=>e(E),_e=>d(E,_e)),Tt(De,()=>e(C),_e=>d(C,_e)),m(V,st)};O(A,V=>{e(_t)==="twitter"&&V(I)})}var R=o(A,2);{var it=V=>{var st=Xb(),ht=r(st),At=r(ht);Dt(At,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var Jt=o(At,2),Xt=o(ht,2),Yt=r(Xt);Dt(Yt,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var ee=o(Yt,2),le=o(Xt,2),Gt=r(le);Dt(Gt,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var de=o(Gt,2),ce=o(le,2),ae=r(ce);Dt(ae,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var me=o(ae,2);Tt(Jt,()=>e(H),pe=>d(H,pe)),Tt(ee,()=>e(rt),pe=>d(rt,pe)),Tt(de,()=>e(z),pe=>d(z,pe)),Tt(me,()=>e(lt),pe=>d(lt,pe)),m(V,st)};O(R,V=>{e(_t)==="additional"&&V(it)})}var et=o(R,2);{var K=V=>{var st=ey(),ht=r(st),At=r(ht),Jt=o(ht,2);{var Xt=Yt=>{var ee=ty(),le=r(ee),Gt=r(le);Dt(Gt,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var de=o(Gt,2),ce=r(de);ce.value=ce.__value="WebPage";var ae=o(ce);ae.value=ae.__value="Article";var me=o(ae);me.value=me.__value="Product";var pe=o(me);pe.value=pe.__value="Organization";var re=o(pe);re.value=re.__value="Person";var ve=o(re);ve.value=ve.__value="Recipe";var Ce=o(ve);Ce.value=Ce.__value="Event";var Te=o(le,2),Ht=r(Te);Dt(Ht,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var se=o(Ht,2),xe=o(Te,2),he=r(xe);Dt(he,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var je=o(he,2),Ne=o(xe,2),Be=r(Ne);Dt(Be,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var De=o(Be,2),_e=o(Ne,2),Se=r(_e);Dt(Se,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var Ge=o(Se,2);cr(de,()=>e(Qt),Ae=>d(Qt,Ae)),Tt(se,()=>e(Wt),Ae=>d(Wt,Ae)),Tt(je,()=>e(zt),Ae=>d(zt,Ae)),Tt(De,()=>e(Bt),Ae=>d(Bt,Ae)),Tt(Ge,()=>e(Lt),Ae=>d(Lt,Ae)),m(Yt,ee)};O(Jt,Yt=>{e(Kt)&&Yt(Xt)})}We(At,()=>e(Kt),Yt=>d(Kt,Yt)),m(V,st)};O(et,V=>{e(_t)==="jsonld"&&V(K)})}var U=o(Nt,2),B=r(U);B.__click=[Gb,a,s,n,c,l,v,h,_,$,M,E,C,H,rt,Kt,Qt,Wt,zt,Bt];var T=r(B);Er(T,{class:"w-4 h-4 mr-2"});var D=o(B,2);D.__click=[Ub,a,s,n,c,l,v,g,u,p,k,y,h,_,$,M,P,S,N,f,E,C,H,z,rt,pt,lt,mt,ct,xt,Rt,Vt,Kt,Qt,Wt,zt,Bt,Lt,Ct];var F=o(U,2),Z=r(F),j=o(r(Z),2),nt=r(j);nt.__click=[zb,Ct,X];var Mt=r(nt);be(Mt,{class:"w-4 h-4 mr-1"});var qt=o(Mt),St=o(nt,2);St.__click=ft;var J=o(Z,2),dt=r(J),$t=r(dt),Ft=r($t);Y(()=>{nt.disabled=!e(Ct),b(qt,` ${e(X)?"Copied!":"Copy"}`),St.disabled=!e(Ct),b(Ft,e(Ct)||"Fill in the form above to generate meta tags...")}),m(i,vt),jt()}ye(["click"]);function iy(i,t){const a=Math.max(...e(t).map(s=>s.id))+1;d(t,[...e(t),{id:a,x:0,y:4,blur:6,spread:-1,color:"#000000",opacity:20,inset:!1}],!0)}function sy(i,t){const a=Math.max(...e(t).map(s=>s.id))+1;d(t,[...e(t),{id:a,x:2,y:2,blur:4,color:"#000000",opacity:50}],!0)}function oy(i,t){d(t,e(t).map(a=>({...a,color:"#"+Math.floor(Math.random()*16777215).toString(16).padStart(6,"0")})),!0)}function ny(i,t,a,s,n,c,l,v,g){d(t,[{id:1,x:0,y:4,blur:6,spread:-1,color:"#000000",opacity:20,inset:!1}],!0),d(a,[{id:1,x:2,y:2,blur:4,color:"#000000",opacity:50}],!0),d(s,!0),d(n,!0),d(c,"#ffffff"),d(l,"#374151"),d(v,8),d(g,"Shadow Effect")}function dy(){Ee("/tools")}var ly=w('<meta name="description" content="Generate beautiful CSS box-shadow and text-shadow effects with real-time preview"/>'),cy=(i,t)=>t("card"),vy=(i,t)=>t("button"),gy=(i,t)=>t("neon"),uy=(i,t)=>t("inset"),my=(i,t)=>d(t,"box"),py=(i,t)=>d(t,"text"),xy=(i,t,a)=>t(e(a).id),fy=w('<button class="text-red-500 hover:text-red-700 dark:hover:text-red-400"><!></button>'),by=w('<div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4"><div class="flex items-center justify-between mb-4"><h3 class="text-sm font-medium text-gray-900 dark:text-white"> </h3> <!></div> <div class="grid grid-cols-2 gap-4"><div><label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">X Offset</label> <input type="range" min="-50" max="50" class="w-full"/> <span class="text-xs text-gray-500 dark:text-gray-400"> </span></div> <div><label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Y Offset</label> <input type="range" min="-50" max="50" class="w-full"/> <span class="text-xs text-gray-500 dark:text-gray-400"> </span></div> <div><label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Blur</label> <input type="range" min="0" max="100" class="w-full"/> <span class="text-xs text-gray-500 dark:text-gray-400"> </span></div> <div><label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Spread</label> <input type="range" min="-50" max="50" class="w-full"/> <span class="text-xs text-gray-500 dark:text-gray-400"> </span></div> <div><label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Color</label> <div class="flex gap-2"><input type="color" class="w-12 h-8 rounded"/> <input type="text" class="flex-1 px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"/></div></div> <div><label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Opacity</label> <input type="range" min="0" max="100" class="w-full"/> <span class="text-xs text-gray-500 dark:text-gray-400"> </span></div></div> <div class="flex items-center mt-4"><input type="checkbox" class="w-4 h-4 text-[var(--ds-primary-600)] bg-gray-100 border-gray-300 rounded focus:ring-[var(--ds-primary-500)]"/> <label class="ml-2 text-sm text-gray-700 dark:text-gray-300">Inset Shadow</label></div></div>'),yy=w('<div class="space-y-4"><!> <button class="w-full px-4 py-2 text-sm bg-[var(--ds-primary-600)] text-white rounded hover:bg-blue-700 transition-colors flex items-center justify-center"><!> Add Shadow Layer</button></div>'),hy=(i,t,a)=>t(e(a).id),_y=w('<button class="text-red-500 hover:text-red-700 dark:hover:text-red-400"><!></button>'),ky=w('<div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4"><div class="flex items-center justify-between mb-4"><h3 class="text-sm font-medium text-gray-900 dark:text-white"> </h3> <!></div> <div class="grid grid-cols-3 gap-4"><div><label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">X Offset</label> <input type="range" min="-50" max="50" class="w-full"/> <span class="text-xs text-gray-500 dark:text-gray-400"> </span></div> <div><label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Y Offset</label> <input type="range" min="-50" max="50" class="w-full"/> <span class="text-xs text-gray-500 dark:text-gray-400"> </span></div> <div><label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Blur</label> <input type="range" min="0" max="50" class="w-full"/> <span class="text-xs text-gray-500 dark:text-gray-400"> </span></div> <div class="col-span-3"><label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Color</label> <div class="flex gap-2"><input type="color" class="w-12 h-8 rounded"/> <input type="text" class="flex-1 px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"/> <input type="range" min="0" max="100" class="w-24"/> <span class="text-xs text-gray-500 dark:text-gray-400 w-12"> </span></div></div></div></div>'),wy=w('<div class="space-y-4"><!> <button class="w-full px-4 py-2 text-sm bg-[var(--ds-primary-600)] text-white rounded hover:bg-blue-700 transition-colors flex items-center justify-center"><!> Add Text Shadow Layer</button></div>'),Cy=w('<h3 class="text-2xl font-bold transition-all duration-200"> </h3>'),$y=w('<div class="p-8 rounded-lg transition-all duration-200"><!></div>'),Sy=w('<h3 class="text-2xl font-bold transition-all duration-200"> </h3>'),Ty=(i,t,a)=>t(`box-shadow: ${e(a)};`),My=(i,t,a)=>t(`text-shadow: ${e(a)};`),Ey=w('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-400 to-gray-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">CSS Shadow Generator</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Create beautiful box-shadow and text-shadow effects with real-time preview</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">CSS Shadow Generator</li></ol></nav> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-6"><div class="p-6"><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Presets</h2> <div class="flex flex-wrap gap-2"><button class="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">Card Shadow</button> <button class="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">Button Shadow</button> <button class="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">Neon Effect</button> <button class="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">Inset Shadow</button> <button class="px-3 py-1.5 text-sm bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] text-purple-700 dark:text-purple-400 rounded hover:bg-purple-200 dark:hover:bg-purple-900/30 transition-colors">🎨 Random Color</button> <button class="px-3 py-1.5 text-sm bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors">Reset All</button></div></div></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div class="space-y-6"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="flex"><button>Box Shadow</button> <button>Text Shadow</button></div> <div class="p-6"><!> <!></div></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Preview Settings</h2> <div class="space-y-4"><div class="grid grid-cols-2 gap-4"><div><label for="background-color" class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Background</label> <input id="background-color" type="color" class="w-full h-8 rounded"/></div> <div><label for="text-color" class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Text Color</label> <input id="text-color" type="color" class="w-full h-8 rounded"/></div></div> <div><label for="border-radius" class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"> </label> <input id="border-radius" type="range" min="0" max="50" class="w-full"/></div> <div><label for="preview-text" class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Preview Text</label> <input id="preview-text" type="text" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"/></div> <div class="flex items-center gap-4"><label class="flex items-center"><input type="checkbox" class="w-4 h-4 text-[var(--ds-primary-600)] bg-gray-100 border-gray-300 rounded focus:ring-[var(--ds-primary-500)]"/> <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Show Box</span></label> <label class="flex items-center"><input type="checkbox" class="w-4 h-4 text-[var(--ds-primary-600)] bg-gray-100 border-gray-300 rounded focus:ring-[var(--ds-primary-500)]"/> <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Show Text</span></label></div></div></div></div> <div class="space-y-6"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Live Preview</h2> <div class="p-8 rounded-lg flex items-center justify-center min-h-[200px] transition-all duration-200"><!></div></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">CSS Code</h2> <div class="flex gap-2"><button class="flex items-center px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"><!> </button> <button class="flex items-center px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"><!> </button> <button class="flex items-center px-3 py-1.5 text-sm bg-[var(--ds-primary-600)] text-white rounded hover:bg-blue-700 transition-colors"><!> Download</button></div></div> <div class="p-6 space-y-4"><div><h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Box Shadow</h3> <pre class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm text-gray-700 dark:text-gray-300"><code> </code></pre></div> <div><h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Text Shadow</h3> <pre class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm text-gray-700 dark:text-gray-300"><code> </code></pre></div></div></div></div></div></div>');function Py(i,t){It(t,!0);let a=x(Le([{id:1,x:0,y:4,blur:6,spread:-1,color:"#000000",opacity:20,inset:!1}])),s=x(Le([{id:1,x:2,y:2,blur:4,color:"#000000",opacity:50}])),n=x(!0),c=x(!0),l=x("#ffffff"),v=x("#374151"),g=x(8),u=x("Shadow Effect"),p=x("box"),k=x(!1);const y=ue(()=>()=>e(a).map(Gt=>{const de=Gt.color+Math.round(Gt.opacity*2.55).toString(16).padStart(2,"0"),ce=[Gt.x+"px",Gt.y+"px",Gt.blur+"px"];return Gt.spread!==0&&ce.push(Gt.spread+"px"),Gt.inset&&ce.push("inset"),`${ce.join(" ")} ${de}`}).join(", ")),h=ue(()=>()=>e(s).map(Gt=>{const de=Gt.color+Math.round(Gt.opacity*2.55).toString(16).padStart(2,"0");return`${Gt.x}px ${Gt.y}px ${Gt.blur}px ${de}`}).join(", "));function _(Gt){e(a).length>1&&d(a,e(a).filter(de=>de.id!==Gt),!0)}function $(Gt){e(s).length>1&&d(s,e(s).filter(de=>de.id!==Gt),!0)}function M(Gt){navigator.clipboard.writeText(Gt).then(()=>{d(k,!0),setTimeout(()=>{d(k,!1)},2e3)})}function P(){const Gt=`/* CSS Shadow Generator Output */

/* Box Shadow */
.box-shadow {
  box-shadow: ${e(y)};
}

/* Text Shadow */
.text-shadow {
  text-shadow: ${e(h)};
}`,de=new Blob([Gt],{type:"text/css"}),ce=URL.createObjectURL(de),ae=document.createElement("a");ae.href=ce,ae.download="shadows.css",document.body.appendChild(ae),ae.click(),document.body.removeChild(ae),URL.revokeObjectURL(ce)}function S(Gt){switch(Gt){case"card":d(a,[{id:1,x:0,y:10,blur:15,spread:-3,color:"#000000",opacity:10,inset:!1}],!0),d(g,12);break;case"button":d(a,[{id:1,x:0,y:4,blur:6,spread:-2,color:"#000000",opacity:15,inset:!1},{id:2,x:0,y:1,blur:2,spread:0,color:"#000000",opacity:10,inset:!1}],!0),d(g,6);break;case"neon":d(a,[{id:1,x:0,y:0,blur:20,spread:0,color:"#3b82f6",opacity:60,inset:!1},{id:2,x:0,y:0,blur:40,spread:0,color:"#3b82f6",opacity:40,inset:!1}],!0),d(s,[{id:1,x:0,y:0,blur:10,color:"#3b82f6",opacity:80}],!0);break;case"inset":d(a,[{id:1,x:2,y:2,blur:4,spread:0,color:"#000000",opacity:15,inset:!0}],!0);break}}var N=Ey();Lr(Gt=>{var de=ly();kr.title="CSS Shadow Generator - Developer Tools",m(Gt,de)});var f=r(N),E=r(f),C=r(E);C.__click=[dy];var H=r(C);Ie(H,{class:"w-5 h-5"});var z=o(E,2),rt=r(z),pt=r(rt);B0(pt,{class:"w-10 h-10 text-white"});var lt=o(f,4),mt=r(lt),ct=o(r(mt),2),xt=r(ct);xt.__click=[cy,S];var Rt=o(xt,2);Rt.__click=[vy,S];var Vt=o(Rt,2);Vt.__click=[gy,S];var Kt=o(Vt,2);Kt.__click=[uy,S];var Qt=o(Kt,2);Qt.__click=[oy,a];var Wt=o(Qt,2);Wt.__click=[ny,a,s,n,c,l,v,g,u];var zt=o(lt,2),Bt=r(zt),Lt=r(Bt),Ct=r(Lt),X=r(Ct);X.__click=[my,p];var _t=o(X,2);_t.__click=[py,p];var ut=o(Ct,2),at=r(ut);{var L=Gt=>{var de=yy(),ce=r(de);fe(ce,19,()=>e(a),pe=>pe.id,(pe,re,ve)=>{var Ce=by(),Te=r(Ce),Ht=r(Te),se=r(Ht),xe=o(Ht,2);{var he=qe=>{var ti=fy();ti.__click=[xy,_,re];var Vi=r(ti);gi(Vi,{class:"w-4 h-4"}),m(qe,ti)};O(xe,qe=>{e(a).length>1&&qe(he)})}var je=o(Te,2),Ne=r(je),Be=r(Ne),De=o(Be,2),_e=o(De,2),Se=r(_e),Ge=o(Ne,2),Ae=r(Ge),Je=o(Ae,2),Xe=o(Je,2),mr=r(Xe),lr=o(Ge,2),Pe=r(lr),tr=o(Pe,2),Ar=o(tr,2),pr=r(Ar),xr=o(lr,2),ar=r(xr),ir=o(ar,2),fr=o(ir,2),Ir=r(fr),wr=o(xr,2),Wr=r(wr),aa=o(Wr,2),ze=r(aa),Dr=o(ze,2),ia=o(wr,2),ja=r(ia),sa=o(ja,2),Na=o(sa,2),br=r(Na),Wi=o(je,2),Ra=r(Wi),Ji=o(Ra,2);Y(()=>{b(se,`Shadow ${e(ve)+1}`),Dt(Be,"for",`xoffset-${e(ve)??""}`),Dt(De,"id",`xoffset-${e(ve)??""}`),b(Se,`${e(re).x??""}px`),Dt(Ae,"for",`box-yoffset-${e(ve)??""}`),Dt(Je,"id",`box-yoffset-${e(ve)??""}`),b(mr,`${e(re).y??""}px`),Dt(Pe,"for",`box-blur-${e(ve)??""}`),Dt(tr,"id",`box-blur-${e(ve)??""}`),b(pr,`${e(re).blur??""}px`),Dt(ar,"for",`box-spread-${e(ve)??""}`),Dt(ir,"id",`box-spread-${e(ve)??""}`),b(Ir,`${e(re).spread??""}px`),Dt(Wr,"for",`box-color-${e(ve)??""}`),Dt(ze,"id",`box-color-${e(ve)??""}`),Dt(ja,"for",`box-opacity-${e(ve)??""}`),Dt(sa,"id",`box-opacity-${e(ve)??""}`),b(br,`${e(re).opacity??""}%`),Dt(Ra,"id",`box-inset-${e(ve)??""}`),Dt(Ji,"for",`box-inset-${e(ve)??""}`)}),Tt(De,()=>e(re).x,qe=>e(re).x=qe),Tt(Je,()=>e(re).y,qe=>e(re).y=qe),Tt(tr,()=>e(re).blur,qe=>e(re).blur=qe),Tt(ir,()=>e(re).spread,qe=>e(re).spread=qe),Tt(ze,()=>e(re).color,qe=>e(re).color=qe),Tt(Dr,()=>e(re).color,qe=>e(re).color=qe),Tt(sa,()=>e(re).opacity,qe=>e(re).opacity=qe),We(Ra,()=>e(re).inset,qe=>e(re).inset=qe),m(pe,Ce)});var ae=o(ce,2);ae.__click=[iy,a];var me=r(ae);Ai(me,{class:"w-4 h-4 mr-2"}),m(Gt,de)};O(at,Gt=>{e(p)==="box"&&Gt(L)})}var ft=o(at,2);{var vt=Gt=>{var de=wy(),ce=r(de);fe(ce,19,()=>e(s),pe=>pe.id,(pe,re,ve)=>{var Ce=ky(),Te=r(Ce),Ht=r(Te),se=r(Ht),xe=o(Ht,2);{var he=ze=>{var Dr=_y();Dr.__click=[hy,$,re];var ia=r(Dr);gi(ia,{class:"w-4 h-4"}),m(ze,Dr)};O(xe,ze=>{e(s).length>1&&ze(he)})}var je=o(Te,2),Ne=r(je),Be=r(Ne),De=o(Be,2),_e=o(De,2),Se=r(_e),Ge=o(Ne,2),Ae=r(Ge),Je=o(Ae,2),Xe=o(Je,2),mr=r(Xe),lr=o(Ge,2),Pe=r(lr),tr=o(Pe,2),Ar=o(tr,2),pr=r(Ar),xr=o(lr,2),ar=r(xr),ir=o(ar,2),fr=r(ir),Ir=o(fr,2),wr=o(Ir,2),Wr=o(wr,2),aa=r(Wr);Y(()=>{b(se,`Text Shadow ${e(ve)+1}`),Dt(Be,"for",`text-xoffset-${e(ve)??""}`),Dt(De,"id",`text-xoffset-${e(ve)??""}`),b(Se,`${e(re).x??""}px`),Dt(Ae,"for",`text-yoffset-${e(ve)??""}`),Dt(Je,"id",`text-yoffset-${e(ve)??""}`),b(mr,`${e(re).y??""}px`),Dt(Pe,"for",`text-blur-${e(ve)??""}`),Dt(tr,"id",`text-blur-${e(ve)??""}`),b(pr,`${e(re).blur??""}px`),Dt(ar,"for",`text-color-${e(ve)??""}`),Dt(fr,"id",`text-color-${e(ve)??""}`),b(aa,`${e(re).opacity??""}%`)}),Tt(De,()=>e(re).x,ze=>e(re).x=ze),Tt(Je,()=>e(re).y,ze=>e(re).y=ze),Tt(tr,()=>e(re).blur,ze=>e(re).blur=ze),Tt(fr,()=>e(re).color,ze=>e(re).color=ze),Tt(Ir,()=>e(re).color,ze=>e(re).color=ze),Tt(wr,()=>e(re).opacity,ze=>e(re).opacity=ze),m(pe,Ce)});var ae=o(ce,2);ae.__click=[sy,s];var me=r(ae);Ai(me,{class:"w-4 h-4 mr-2"}),m(Gt,de)};O(ft,Gt=>{e(p)==="text"&&Gt(vt)})}var G=o(Lt,2),tt=o(r(G),2),yt=r(tt),bt=r(yt),wt=o(r(bt),2),Ut=o(bt,2),Ot=o(r(Ut),2),Nt=o(yt,2),Pt=r(Nt),ot=r(Pt),kt=o(Pt,2),q=o(Nt,2),Q=o(r(q),2),W=o(q,2),A=r(W),I=r(A),R=o(A,2),it=r(R),et=o(Bt,2),K=r(et),U=o(r(K),2),B=r(U);{var T=Gt=>{var de=$y(),ce=r(de);{var ae=me=>{var pe=Cy(),re=r(pe);Y(()=>{Ke(pe,`color: ${e(v)??""}; text-shadow: ${e(h)??""};`),b(re,e(u))}),m(me,pe)};O(ce,me=>{e(n)&&me(ae)})}Y(()=>Ke(de,`box-shadow: ${e(y)??""}; border-radius: ${e(g)??""}px; background: white;`)),m(Gt,de)},D=Gt=>{var de=Et(),ce=gt(de);{var ae=me=>{var pe=Sy(),re=r(pe);Y(()=>{Ke(pe,`color: ${e(v)??""}; text-shadow: ${e(h)??""};`),b(re,e(u))}),m(me,pe)};O(ce,me=>{e(n)&&me(ae)},!0)}m(Gt,de)};O(B,Gt=>{e(c)?Gt(T):Gt(D,!1)})}var F=o(K,2),Z=r(F),j=o(r(Z),2),nt=r(j);nt.__click=[Ty,M,y];var Mt=r(nt);be(Mt,{class:"w-4 h-4 mr-1"});var qt=o(Mt),St=o(nt,2);St.__click=[My,M,h];var J=r(St);be(J,{class:"w-4 h-4 mr-1"});var dt=o(J),$t=o(St,2);$t.__click=P;var Ft=r($t);Xa(Ft,{class:"w-4 h-4 mr-1"});var V=o(Z,2),st=r(V),ht=o(r(st),2),At=r(ht),Jt=r(At),Xt=o(st,2),Yt=o(r(Xt),2),ee=r(Yt),le=r(ee);Y(()=>{ge(X,1,`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${e(p)==="box"?"border-[var(--ds-primary-500)] text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)] bg-blue-50 dark:bg-blue-900/10":"border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"}`),ge(_t,1,`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${e(p)==="text"?"border-[var(--ds-primary-500)] text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)] bg-blue-50 dark:bg-blue-900/10":"border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"}`),b(ot,`Border Radius: ${e(g)??""}px`),Ke(U,`background-color: ${e(l)??""};`),b(qt,` ${e(k)?"Copied!":"Copy Box"}`),b(dt,` ${e(k)?"Copied!":"Copy Text"}`),b(Jt,`box-shadow: ${e(y)??""};`),b(le,`text-shadow: ${e(h)??""};`)}),Tt(wt,()=>e(l),Gt=>d(l,Gt)),Tt(Ot,()=>e(v),Gt=>d(v,Gt)),Tt(kt,()=>e(g),Gt=>d(g,Gt)),Tt(Q,()=>e(u),Gt=>d(u,Gt)),We(I,()=>e(c),Gt=>d(c,Gt)),We(it,()=>e(n),Gt=>d(n,Gt)),m(i,N),jt()}ye(["click"]);function Ly(i,t,a,s,n){const c=e(t);d(t,e(a),!0),d(a,c,!0);const l=e(s);d(s,e(n),!0),d(n,l,!0)}function Ay(i,t,a){e(t)&&navigator.clipboard.writeText(e(t)).then(()=>{Oe.success("Copied result to clipboard"),a()})}function fn(i,t){d(t,[],!0),Oe.success("Cleared history")}function Iy(){Ee("/tools")}var jy=(i,t,a,s)=>{d(t,e(a).id,!0),s()},Ny=w('<button><!> <span class="text-sm font-medium"> </span></button>'),Ry=w("<option> </option>"),By=w("<option> </option>"),Dy=w('<div class="bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] border border-[var(--ds-primary-200)] dark:border-[var(--ds-primary-800)] rounded-xl p-4"><h3 class="text-sm font-medium text-[var(--ds-primary-800)] dark:text-[var(--ds-primary-200)] mb-2">Conversion Formulas</h3> <div class="space-y-1 text-xs text-[var(--ds-primary-700)] dark:text-[var(--ds-primary-300)]"><p>°C to °F: (°C × 9/5) + 32</p> <p>°F to °C: (°F - 32) × 5/9</p> <p>°C to K: °C + 273.15</p> <p>K to °C: K - 273.15</p></div></div>'),Fy=w('<div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 inch = 2.54 cm</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 foot = 12 inches</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 mile = 1.609 km</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 yard = 0.914 m</p></div>',1),Hy=w('<div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 kg = 2.205 lbs</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 lb = 16 oz</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 ton = 1000 kg</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 stone = 14 lbs</p></div>',1),Oy=w('<div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 gallon = 3.785 L</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 L = 1000 mL</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 cup = 236.6 mL</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 quart = 2 pints</p></div>',1),zy=w('<div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 minute = 60 seconds</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 hour = 60 minutes</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 day = 24 hours</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 week = 7 days</p></div>',1),Uy=w('<div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">100 km/h = 27.78 m/s</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">60 mph = 96.56 km/h</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 knot = 1.852 km/h</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">Mach 1 = 343 m/s</p></div>',1),Gy=w('<button class="btn btn-primary btn-sm text-red-500 hover:text-red-600">Clear</button>'),qy=w('<div class="flex flex-col items-center justify-center py-8 text-gray-500 dark:text-gray-400"><!> <p class="text-sm">No conversions yet</p></div>'),Wy=(i,t,a)=>t(e(a)),Jy=w('<button class="w-full text-left p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"><div class="text-sm font-medium text-gray-900 dark:text-white"> </div> <div class="text-sm text-gray-600 dark:text-gray-400"> </div> <div class="text-xs text-gray-500 dark:text-gray-500 mt-1"> </div></button>'),Vy=w('<div class="space-y-2 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar"></div>'),Yy=w('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="btn btn-primary"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--ds-primary-400)] to-[var(--ds-primary-600)] rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Unit Converter</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Convert between different units of measurement with precision.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Unit Converter</li></ol></nav> <div class="mb-6 flex justify-center flex-wrap gap-2"><button class="btn btn-primary btn-sm"><!> Reset</button> <button class="btn btn-primary btn-sm text-red-500 hover:text-red-600 hover:border-red-200"><!> Clear History</button></div> <div class="mb-6 overflow-x-auto pb-2"><div class="flex gap-3 min-w-max"></div></div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-2 space-y-6"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center"><!> </h2> <div class="space-y-6"><div><label for="from-value-input" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">From</label> <div class="grid grid-cols-1 md:grid-cols-2 gap-3"><input id="from-value-input" type="number" placeholder="Enter value" class="input text-lg"/> <select class="select"></select></div></div> <div class="flex justify-center"><button class="btn btn-primary btn-sm rounded-full"><!></button></div> <div><label for="to-value-input" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">To</label> <div class="grid grid-cols-1 md:grid-cols-2 gap-3"><div class="relative"><input id="to-value-input" type="text" readonly="" placeholder="Result" class="input text-lg font-medium pr-12"/> <button class="absolute right-3 top-1/2 -translate-y-1/2 btn btn-primary btn-sm" title="Copy result"><!></button></div> <select class="select"></select></div></div> <!></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Reference</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm"><!></div></div></div> <div class="space-y-6"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 sticky top-6"><div class="flex items-center justify-between mb-4"><h3 class="text-lg font-semibold text-gray-900 dark:text-white">History</h3> <!></div> <!></div></div></div> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"><div class="flex items-center gap-2 mb-2 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"><!> <h3 class="font-medium">Precision</h3></div> <p class="text-sm text-gray-600 dark:text-gray-400">High-precision calculations for accurate results every time</p></div> <div class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"><div class="flex items-center gap-2 mb-2 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"><!> <h3 class="font-medium">History</h3></div> <p class="text-sm text-gray-600 dark:text-gray-400">Automatically saves your recent conversions for quick reference</p></div> <div class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"><div class="flex items-center gap-2 mb-2 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"><!> <h3 class="font-medium">Fast</h3></div> <p class="text-sm text-gray-600 dark:text-gray-400">Instant conversion as you type with no page reloads</p></div></div></div>');function Ky(i,t){It(t,!0);const a=[{id:"length",name:"Length",icon:Q0,color:"blue"},{id:"weight",name:"Weight",icon:cc,color:"green"},{id:"temperature",name:"Temperature",icon:rc,color:"red"},{id:"volume",name:"Volume",icon:lc,color:"purple"},{id:"time",name:"Time",icon:ka,color:"yellow"},{id:"speed",name:"Speed",icon:Ve,color:"orange"}],s={length:{meter:1,kilometer:.001,centimeter:100,millimeter:1e3,mile:621371e-9,yard:1.09361,foot:3.28084,inch:39.3701,nauticalMile:539957e-9},weight:{kilogram:1,gram:1e3,milligram:1e6,pound:2.20462,ounce:35.274,ton:.001,stone:.157473},temperature:{celsius:"celsius",fahrenheit:"fahrenheit",kelvin:"kelvin"},volume:{liter:1,milliliter:1e3,gallon:.264172,quart:1.05669,pint:2.11338,cup:4.22675,fluidOunce:33.814,cubicMeter:.001},time:{second:1,millisecond:1e3,microsecond:1e6,minute:1/60,hour:1/3600,day:1/86400,week:1/604800,month:1/2592e3,year:1/31536e3},speed:{meterPerSecond:1,kilometerPerHour:3.6,milePerHour:2.23694,knot:1.94384,footPerSecond:3.28084,mach:.00291545}},n={length:{meter:"Meter (m)",kilometer:"Kilometer (km)",centimeter:"Centimeter (cm)",millimeter:"Millimeter (mm)",mile:"Mile (mi)",yard:"Yard (yd)",foot:"Foot (ft)",inch:"Inch (in)",nauticalMile:"Nautical Mile (nm)"},weight:{kilogram:"Kilogram (kg)",gram:"Gram (g)",milligram:"Milligram (mg)",pound:"Pound (lb)",ounce:"Ounce (oz)",ton:"Ton (t)",stone:"Stone (st)"},temperature:{celsius:"Celsius (°C)",fahrenheit:"Fahrenheit (°F)",kelvin:"Kelvin (K)"},volume:{liter:"Liter (L)",milliliter:"Milliliter (mL)",gallon:"Gallon (gal)",quart:"Quart (qt)",pint:"Pint (pt)",cup:"Cup (cup)",fluidOunce:"Fluid Ounce (fl oz)",cubicMeter:"Cubic Meter (m³)"},time:{second:"Second (s)",millisecond:"Millisecond (ms)",microsecond:"Microsecond (μs)",minute:"Minute (min)",hour:"Hour (hr)",day:"Day (d)",week:"Week (wk)",month:"Month (mo)",year:"Year (yr)"},speed:{meterPerSecond:"Meter/Second (m/s)",kilometerPerHour:"Kilometer/Hour (km/h)",milePerHour:"Mile/Hour (mph)",knot:"Knot (kn)",footPerSecond:"Foot/Second (ft/s)",mach:"Mach"}};let c=x("length"),l=x("1"),v=x("meter"),g=x("kilometer"),u=x(""),p=x(Le([]));const k=ue(()=>Object.keys(s[e(c)])),y=ue(()=>e(k).map(J=>({value:J,label:n[e(c)][J]})));we(()=>{if(e(l)&&!isNaN(parseFloat(e(l)))){const J=parseFloat(e(l));let dt;if(e(c)==="temperature")dt=h(J,e(v),e(g));else{const $t=s[e(c)];dt=J/$t[e(v)]*$t[e(g)]}d(u,dt.toFixed(6).replace(/\.?0+$/,""),!0)}else d(u,"")});function h(J,dt,$t){let Ft;switch(dt){case"celsius":Ft=J;break;case"fahrenheit":Ft=(J-32)*5/9;break;case"kelvin":Ft=J-273.15;break;default:throw new Error(`Unknown temperature unit: ${dt}`)}switch($t){case"celsius":return Ft;case"fahrenheit":return Ft*9/5+32;case"kelvin":return Ft+273.15;default:throw new Error(`Unknown temperature unit: ${$t}`)}}function _(){const J=n[e(c)],dt=J[e(v)],$t=J[e(g)],Ft={from:`${e(l)} ${dt}`,to:`${e(u)} ${$t}`,category:e(c),timestamp:new Date};e(p).length>0&&e(p)[0].from===Ft.from&&e(p)[0].to===Ft.to||d(p,[Ft,...e(p).slice(0,9)],!0)}function $(J){d(l,J.from.split(" ")[0],!0),d(c,J.category,!0);const dt=Object.keys(s[J.category]);d(v,dt[0],!0),d(g,dt[1],!0)}function M(){d(l,"1"),d(u,"");const J=Object.keys(s[e(c)]);d(v,J[0],!0),d(g,J[1],!0),Oe.success("Reset converter")}var P=Yy(),S=r(P),N=r(S),f=r(N);f.__click=[Iy];var E=r(f);Ie(E,{class:"w-5 h-5 mr-2"});var C=o(N,2),H=r(C),z=r(H);Rr(z,{class:"w-10 h-10 text-white"});var rt=o(S,4),pt=r(rt);pt.__click=M;var lt=r(pt);Gi(lt,{class:"w-4 h-4 mr-2"});var mt=o(pt,2);mt.__click=[fn,p];var ct=r(mt);qi(ct,{class:"w-4 h-4 mr-2"});var xt=o(rt,2),Rt=r(xt);fe(Rt,21,()=>a,J=>J.id,(J,dt)=>{var $t=Ny();$t.__click=[jy,c,dt,M];var Ft=r($t);nr(Ft,()=>e(dt).icon,(ht,At)=>{At(ht,{class:"w-4 h-4"})});var V=o(Ft,2),st=r(V);Y(()=>{ge($t,1,`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-200 ${e(c)===e(dt).id?"border-[var(--ds-primary-500)] bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] text-[var(--ds-primary-700)] dark:text-[var(--ds-primary-300)]":"border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600"}`),b(st,e(dt).name)}),m(J,$t)});var Vt=o(xt,2),Kt=r(Vt),Qt=r(Kt),Wt=r(Qt),zt=r(Wt);Rr(zt,{class:"w-5 h-5 mr-2 text-[var(--ds-primary-500)]"});var Bt=o(zt),Lt=o(Wt,2),Ct=r(Lt),X=o(r(Ct),2),_t=r(X),ut=o(_t,2);fe(ut,21,()=>e(y),Mr,(J,dt)=>{var $t=Ry(),Ft=r($t),V={};Y(()=>{b(Ft,e(dt).label),V!==(V=e(dt).value)&&($t.value=($t.__value=e(dt).value)??"")}),m(J,$t)});var at=o(Ct,2),L=r(at);L.__click=[Ly,v,g,l,u];var ft=r(L);R0(ft,{class:"w-5 h-5"});var vt=o(at,2),G=o(r(vt),2),tt=r(G),yt=r(tt),bt=o(yt,2);bt.__click=[Ay,u,_];var wt=r(bt);be(wt,{class:"w-4 h-4"});var Ut=o(tt,2);fe(Ut,21,()=>e(y),Mr,(J,dt)=>{var $t=By(),Ft=r($t),V={};Y(()=>{b(Ft,e(dt).label),V!==(V=e(dt).value)&&($t.value=($t.__value=e(dt).value)??"")}),m(J,$t)});var Ot=o(vt,2);{var Nt=J=>{var dt=Dy();m(J,dt)};O(Ot,J=>{e(c)==="temperature"&&J(Nt)})}var Pt=o(Qt,2),ot=o(r(Pt),2),kt=r(ot);{var q=J=>{var dt=Fy();m(J,dt)},Q=J=>{var dt=Et(),$t=gt(dt);{var Ft=st=>{var ht=Hy();m(st,ht)},V=st=>{var ht=Et(),At=gt(ht);{var Jt=Yt=>{var ee=Oy();m(Yt,ee)},Xt=Yt=>{var ee=Et(),le=gt(ee);{var Gt=ce=>{var ae=zy();m(ce,ae)},de=ce=>{var ae=Et(),me=gt(ae);{var pe=re=>{var ve=Uy();m(re,ve)};O(me,re=>{e(c)==="speed"&&re(pe)},!0)}m(ce,ae)};O(le,ce=>{e(c)==="time"?ce(Gt):ce(de,!1)},!0)}m(Yt,ee)};O(At,Yt=>{e(c)==="volume"?Yt(Jt):Yt(Xt,!1)},!0)}m(st,ht)};O($t,st=>{e(c)==="weight"?st(Ft):st(V,!1)},!0)}m(J,dt)};O(kt,J=>{e(c)==="length"?J(q):J(Q,!1)})}var W=o(Kt,2),A=r(W),I=r(A),R=o(r(I),2);{var it=J=>{var dt=Gy();dt.__click=[fn,p],m(J,dt)};O(R,J=>{e(p).length>0&&J(it)})}var et=o(I,2);{var K=J=>{var dt=qy(),$t=r(dt);Ka($t,{class:"w-8 h-8 mb-2 opacity-50"}),m(J,dt)},U=J=>{var dt=Vy();fe(dt,21,()=>e(p),$t=>$t.timestamp,($t,Ft)=>{var V=Jy();V.__click=[Wy,$,Ft];var st=r(V),ht=r(st),At=o(st,2),Jt=r(At),Xt=o(At,2),Yt=r(Xt);Y(ee=>{b(ht,e(Ft).from),b(Jt,`→ ${e(Ft).to??""}`),b(Yt,ee)},[()=>e(Ft).timestamp.toLocaleTimeString()]),m($t,V)}),m(J,dt)};O(et,J=>{e(p).length===0?J(K):J(U,!1)})}var B=o(Vt,2),T=r(B),D=r(T),F=r(D);Rr(F,{class:"w-5 h-5"});var Z=o(T,2),j=r(Z),nt=r(j);Ka(nt,{class:"w-5 h-5"});var Mt=o(Z,2),qt=r(Mt),St=r(qt);Ve(St,{class:"w-5 h-5"}),Y(J=>b(Bt,` Convert ${J??""}`),[()=>a.find(J=>J.id===e(c))?.name]),Tt(_t,()=>e(l),J=>d(l,J)),cr(ut,()=>e(v),J=>d(v,J)),Tt(yt,()=>e(u),J=>d(u,J)),cr(Ut,()=>e(g),J=>d(g,J)),m(i,P),jt()}ye(["click"]);function Qy(){Ee("/tools")}var Zy=w('<meta name="description" content="Calculate percentages, discounts, tips, and percentage differences with ease"/>'),Xy=(i,t,a,s)=>{d(t,e(a).id,!0),s()},t2=w('<button><!> <h3 class="font-medium text-gray-900 dark:text-white mb-1"> </h3> <p class="text-sm text-gray-600 dark:text-gray-400"> </p></button>'),e2=w("<!> ",1),r2=(i,t,a)=>t(e(a)),a2=(i,t,a)=>t(a.toString()),i2=w('<button class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"> </button>'),s2=(i,t,a)=>t(e(a)),o2=w('<div class="p-4 bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] border border-[var(--ds-primary-200)] dark:border-[var(--ds-primary-800)] rounded-lg"><div class="flex items-center justify-between"><div><p class="text-sm text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)] mb-1">Result</p> <p class="text-2xl font-bold text-[var(--ds-primary-700)] dark:text-[var(--ds-primary-300)]"> </p></div> <button class="p-2 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)] hover:text-blue-700 dark:hover:text-blue-300"><!></button></div></div>'),n2=w('<div class="space-y-6"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">What is <input type="number" class="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded mx-2"/>% of <input type="number" class="w-24 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded mx-2"/>?</label></div> <div class="flex flex-wrap gap-2"><span class="text-sm text-gray-600 dark:text-gray-400">Quick:</span> <!></div> <!></div>'),d2=(i,t,a)=>t(e(a)),l2=w('<div class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"><div class="flex items-center justify-between"><div><p class="text-sm text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)] mb-1">New Value</p> <p class="text-2xl font-bold text-green-700 dark:text-green-300"> </p> <p class="text-sm text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)] mt-1"> </p></div> <button class="p-2 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)] hover:text-green-700 dark:hover:text-green-300"><!></button></div></div>'),c2=w('<div class="space-y-6"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Increase <input type="number" class="w-24 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded mx-2"/> by <input type="number" class="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded mx-2"/>%</label></div> <!></div>'),v2=(i,t,a)=>t(e(a)),g2=w('<div class="p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg"><div class="flex items-center justify-between"><div><p class="text-sm text-orange-600 dark:text-orange-400 mb-1">New Value</p> <p class="text-2xl font-bold text-orange-700 dark:text-orange-300"> </p> <p class="text-sm text-orange-600 dark:text-orange-400 mt-1"> </p></div> <button class="p-2 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300"><!></button></div></div>'),u2=w('<div class="space-y-6"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Decrease <input type="number" class="w-24 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded mx-2"/> by <input type="number" class="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded mx-2"/>%</label></div> <!></div>'),m2=(i,t,a)=>t(e(a)+"%"),p2=w('<div class="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg"><div class="flex items-center justify-between"><div><p class="text-sm text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)] mb-1">Percentage Difference</p> <p class="text-2xl font-bold text-purple-700 dark:text-purple-300"> </p></div> <button class="p-2 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)] hover:text-purple-700 dark:hover:text-purple-300"><!></button></div></div>'),x2=w('<div class="space-y-6"><div class="grid grid-cols-2 gap-4"><div><label for="first-value" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Value</label> <input id="first-value" type="number" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"/></div> <div><label for="second-value" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Second Value</label> <input id="second-value" type="number" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"/></div></div> <!></div>'),f2=(i,t,a)=>t(e(a)),b2=w('<div class="space-y-4"><div class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"><div class="flex items-center justify-between"><div><p class="text-sm text-red-600 dark:text-red-400 mb-1">Final Price</p> <p class="text-2xl font-bold text-red-700 dark:text-red-300"> </p></div> <button class="p-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"><!></button></div></div> <div class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"><p class="text-sm text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)] mb-1">You Save</p> <p class="text-xl font-bold text-green-700 dark:text-green-300"> </p></div></div>'),y2=w('<div class="space-y-6"><div class="grid grid-cols-2 gap-4"><div><label for="original-price" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Original Price</label> <div class="relative"><span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span> <input id="original-price" type="number" class="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"/></div></div> <div><label for="discount-percent" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Discount (%)</label> <input id="discount-percent" type="number" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"/></div></div> <!></div>'),h2=(i,t,a)=>t(a.toString()),_2=w('<button class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"> </button>'),k2=(i,t,a)=>t(e(a)),w2=w('<div class="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg"><div class="flex items-center justify-between"><div><p class="text-sm text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)] mb-1">Per Person</p> <p class="text-2xl font-bold text-purple-700 dark:text-purple-300"> </p></div> <button class="p-2 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)] hover:text-purple-700 dark:hover:text-purple-300"><!></button></div></div>'),C2=w('<div class="space-y-4"><div class="grid grid-cols-2 gap-4"><div class="p-4 bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] border border-[var(--ds-primary-200)] dark:border-[var(--ds-primary-800)] rounded-lg"><p class="text-sm text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)] mb-1">Tip Amount</p> <p class="text-xl font-bold text-[var(--ds-primary-700)] dark:text-[var(--ds-primary-300)]"> </p></div> <div class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"><p class="text-sm text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)] mb-1">Total with Tip</p> <p class="text-xl font-bold text-green-700 dark:text-green-300"> </p></div></div> <!></div>'),$2=w('<div class="space-y-6"><div><label for="bill-amount" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bill Amount</label> <div class="relative"><span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span> <input id="bill-amount" type="number" class="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"/></div></div> <div class="grid grid-cols-2 gap-4"><div><label for="tip-percentage" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tip Percentage</label> <input id="tip-percentage" type="number" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"/> <div class="flex flex-wrap gap-2 mt-2"></div></div> <div><label for="number-of-people" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Number of People</label> <input id="number-of-people" type="number" min="1" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"/></div></div> <!></div>'),S2=w('<div class="space-y-2 text-sm"><p class="font-medium text-gray-900 dark:text-white">Basic Percentage</p> <p class="text-gray-600 dark:text-gray-400">Result = (Percentage × Number) ÷ 100</p></div>'),T2=w('<div class="space-y-2 text-sm"><p class="font-medium text-gray-900 dark:text-white">Increase</p> <p class="text-gray-600 dark:text-gray-400">New = Original + (Original × Percentage ÷ 100)</p></div>'),M2=w('<div class="space-y-2 text-sm"><p class="font-medium text-gray-900 dark:text-white">Decrease</p> <p class="text-gray-600 dark:text-gray-400">New = Original - (Original × Percentage ÷ 100)</p></div>'),E2=w('<div class="space-y-2 text-sm"><p class="font-medium text-gray-900 dark:text-white">Percentage Difference</p> <p class="text-gray-600 dark:text-gray-400">Diff = |Value2 - Value1| ÷ ((Value1 + Value2) ÷ 2) × 100</p></div>'),P2=w('<div class="space-y-2 text-sm"><p class="font-medium text-gray-900 dark:text-white">Discount</p> <p class="text-gray-600 dark:text-gray-400">Final = Price - (Price × Discount ÷ 100)</p> <p class="text-gray-600 dark:text-gray-400">Saved = Price × Discount ÷ 100</p></div>'),L2=w('<div class="space-y-2 text-sm"><p class="font-medium text-gray-900 dark:text-white">Tip Calculator</p> <p class="text-gray-600 dark:text-gray-400">Tip = Bill × Tip ÷ 100</p> <p class="text-gray-600 dark:text-gray-400">Total = Bill + Tip</p> <p class="text-gray-600 dark:text-gray-400">Per Person = Total ÷ Number of People</p></div>'),A2=w('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--ds-primary-400)] to-[var(--ds-primary-600)] rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Percentage Calculator</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Calculate percentages, discounts, tips, and more with precision</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Percentage Calculator</li></ol></nav> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-6"><div class="p-6"><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Choose Calculator</h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div></div></div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-2"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><div class="flex items-center justify-between mb-6"><h2 class="text-xl font-semibold text-gray-900 dark:text-white flex items-center"></h2> <div class="flex gap-2"><button class="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">Example</button> <button class="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"><!></button></div></div> <!> <!> <!> <!> <!> <!></div></div> <div class="space-y-6"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center"><!> Formulas</h3> <!></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Tips</h3> <div class="space-y-3 text-sm text-gray-600 dark:text-gray-400"><div class="flex items-start"><div class="w-2 h-2 bg-[var(--ds-primary-500)] rounded-full mt-1.5 mr-2"></div> <p>Use common percentages for quick calculations (10%, 25%, 50%, etc.)</p></div> <div class="flex items-start"><div class="w-2 h-2 bg-[var(--ds-primary-500)] rounded-full mt-1.5 mr-2"></div> <p>For tips, 15-20% is standard in most countries</p></div> <div class="flex items-start"><div class="w-2 h-2 bg-[var(--ds-primary-500)] rounded-full mt-1.5 mr-2"></div> <p>Percentage difference uses the average of two values as the base</p></div> <div class="flex items-start"><div class="w-2 h-2 bg-[var(--ds-primary-500)] rounded-full mt-1.5 mr-2"></div> <p>Double-check discount calculations to avoid errors</p></div></div></div></div></div></div>');function I2(i,t){It(t,!0);const a=[{id:"basic",name:"Basic %",icon:ss,description:"Calculate percentage of a number"},{id:"increase",name:"Increase",icon:sc,description:"Increase number by percentage"},{id:"decrease",name:"Decrease",icon:ic,description:"Decrease number by percentage"},{id:"difference",name:"Difference",icon:ss,description:"Percentage difference between numbers"},{id:"discount",name:"Discount",icon:tc,description:"Calculate discount and final price"},{id:"tip",name:"Tip Calculator",icon:Ds,description:"Calculate tip and split bill"}];let s=x("basic"),n=x(""),c=x(""),l=x(""),v=x(""),g=x(""),u=x(""),p=x(""),k=x(""),y=x(""),h=x(""),_=x(""),$=x(""),M=x(""),P=x(""),S=x("15"),N=x("1"),f=x(""),E=x(""),C=x("");const H=[5,10,15,20,25,50,75,100],z=[10,15,18,20,25];we(()=>{if(e(n)&&e(c)&&!isNaN(parseFloat(e(n)))&&!isNaN(parseFloat(e(c)))){const D=parseFloat(e(n))/100,F=parseFloat(e(c));d(l,(F*D).toFixed(2),!0)}else d(l,"")}),we(()=>{if(e(v)&&e(g)&&!isNaN(parseFloat(e(v)))&&!isNaN(parseFloat(e(g)))){const D=parseFloat(e(v)),F=parseFloat(e(g))/100;e(s)==="increase"?d(u,(D+D*F).toFixed(2),!0):e(s)==="decrease"&&d(u,(D-D*F).toFixed(2),!0)}else d(u,"")}),we(()=>{if(e(p)&&e(k)&&!isNaN(parseFloat(e(p)))&&!isNaN(parseFloat(e(k)))){const D=parseFloat(e(p)),F=parseFloat(e(k)),Z=Math.abs(F-D),j=(D+F)/2;d(y,(Z/j*100).toFixed(2),!0)}else d(y,"")}),we(()=>{if(e(h)&&e(_)&&!isNaN(parseFloat(e(h)))&&!isNaN(parseFloat(e(_)))){const D=parseFloat(e(h)),F=parseFloat(e(_))/100,Z=D*F,j=D-Z;d(M,Z.toFixed(2),!0),d($,j.toFixed(2),!0)}else d($,""),d(M,"")}),we(()=>{if(e(P)&&e(S)&&!isNaN(parseFloat(e(P)))&&!isNaN(parseFloat(e(S)))){const D=parseFloat(e(P)),F=parseFloat(e(S))/100,Z=parseInt(e(N))||1,j=D*F,nt=D+j,Mt=nt/Z;d(f,j.toFixed(2),!0),d(E,nt.toFixed(2),!0),d(C,Mt.toFixed(2),!0)}else d(f,""),d(E,""),d(C,"")});function rt(D){navigator.clipboard.writeText(D)}function pt(D){d(n,D,!0)}function lt(D){d(S,D,!0)}function mt(){switch(e(s)){case"basic":d(n,""),d(c,"");break;case"increase":case"decrease":d(v,""),d(g,"");break;case"difference":d(p,""),d(k,"");break;case"discount":d(h,""),d(_,"");break;case"tip":d(P,""),d(S,"15"),d(N,"1");break}}function ct(D){switch(D){case"basic":d(n,"25"),d(c,"200");break;case"increase":d(v,"100"),d(g,"20");break;case"decrease":d(v,"150"),d(g,"30");break;case"difference":d(p,"80"),d(k,"100");break;case"discount":d(h,"50"),d(_,"20");break;case"tip":d(P,"85.50"),d(S,"18"),d(N,"3");break}}function xt(D){return D?new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(parseFloat(D)||0):"$0.00"}var Rt=A2();Lr(D=>{var F=Zy();kr.title="Percentage Calculator - Developer Tools",m(D,F)});var Vt=r(Rt),Kt=r(Vt),Qt=r(Kt);Qt.__click=[Qy];var Wt=r(Qt);Ie(Wt,{class:"w-5 h-5"});var zt=o(Kt,2),Bt=r(zt),Lt=r(Bt);ss(Lt,{class:"w-10 h-10 text-white"});var Ct=o(Vt,4),X=r(Ct),_t=o(r(X),2);fe(_t,21,()=>a,D=>D.id,(D,F)=>{var Z=t2();Z.__click=[Xy,s,F,mt];var j=r(Z);nr(j,()=>e(F).icon,(J,dt)=>{dt(J,{class:"w-6 h-6 mb-2 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"})});var nt=o(j,2),Mt=r(nt),qt=o(nt,2),St=r(qt);Y(()=>{ge(Z,1,`p-4 rounded-lg border-2 transition-all text-left ${e(s)===e(F).id?"border-[var(--ds-primary-500)] bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20]":"border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"}`),b(Mt,e(F).name),b(St,e(F).description)}),m(D,Z)});var ut=o(Ct,2),at=r(ut),L=r(at),ft=r(L),vt=r(ft);fe(vt,21,()=>a,D=>D.id,(D,F)=>{var Z=Et(),j=gt(Z);{var nt=Mt=>{var qt=e2(),St=gt(qt);nr(St,()=>e(F).icon,(dt,$t)=>{$t(dt,{class:"w-6 h-6 mr-2"})});var J=o(St);Y(()=>b(J,` ${e(F).name??""}`)),m(Mt,qt)};O(j,Mt=>{e(F).id===e(s)&&Mt(nt)})}m(D,Z)});var G=o(vt,2),tt=r(G);tt.__click=[r2,ct,s];var yt=o(tt,2);yt.__click=mt;var bt=r(yt);Gi(bt,{class:"w-4 h-4"});var wt=o(ft,2);{var Ut=D=>{var F=n2(),Z=r(F),j=r(Z),nt=o(r(j)),Mt=o(nt,2),qt=o(Z,2),St=o(r(qt),2);fe(St,16,()=>H,$t=>$t,($t,Ft)=>{var V=i2();V.__click=[a2,pt,Ft];var st=r(V);Y(()=>b(st,`${Ft??""}%`)),m($t,V)});var J=o(qt,2);{var dt=$t=>{var Ft=o2(),V=r(Ft),st=r(V),ht=o(r(st),2),At=r(ht),Jt=o(st,2);Jt.__click=[s2,rt,l];var Xt=r(Jt);be(Xt,{class:"w-5 h-5"}),Y(()=>b(At,e(l))),m($t,Ft)};O(J,$t=>{e(l)&&$t(dt)})}Tt(nt,()=>e(n),$t=>d(n,$t)),Tt(Mt,()=>e(c),$t=>d(c,$t)),m(D,F)};O(wt,D=>{e(s)==="basic"&&D(Ut)})}var Ot=o(wt,2);{var Nt=D=>{var F=c2(),Z=r(F),j=r(Z),nt=o(r(j)),Mt=o(nt,2),qt=o(Z,2);{var St=J=>{var dt=l2(),$t=r(dt),Ft=r($t),V=o(r(Ft),2),st=r(V),ht=o(V,2),At=r(ht),Jt=o(Ft,2);Jt.__click=[d2,rt,u];var Xt=r(Jt);be(Xt,{class:"w-5 h-5"}),Y(Yt=>{b(st,e(u)),b(At,`(+${Yt??""}%)`)},[()=>((parseFloat(e(u))-parseFloat(e(v)))/parseFloat(e(v))*100).toFixed(2)]),m(J,dt)};O(qt,J=>{e(u)&&J(St)})}Tt(nt,()=>e(v),J=>d(v,J)),Tt(Mt,()=>e(g),J=>d(g,J)),m(D,F)};O(Ot,D=>{e(s)==="increase"&&D(Nt)})}var Pt=o(Ot,2);{var ot=D=>{var F=u2(),Z=r(F),j=r(Z),nt=o(r(j)),Mt=o(nt,2),qt=o(Z,2);{var St=J=>{var dt=g2(),$t=r(dt),Ft=r($t),V=o(r(Ft),2),st=r(V),ht=o(V,2),At=r(ht),Jt=o(Ft,2);Jt.__click=[v2,rt,u];var Xt=r(Jt);be(Xt,{class:"w-5 h-5"}),Y(Yt=>{b(st,e(u)),b(At,`(-${Yt??""}%)`)},[()=>((parseFloat(e(v))-parseFloat(e(u)))/parseFloat(e(v))*100).toFixed(2)]),m(J,dt)};O(qt,J=>{e(u)&&J(St)})}Tt(nt,()=>e(v),J=>d(v,J)),Tt(Mt,()=>e(g),J=>d(g,J)),m(D,F)};O(Pt,D=>{e(s)==="decrease"&&D(ot)})}var kt=o(Pt,2);{var q=D=>{var F=x2(),Z=r(F),j=r(Z),nt=o(r(j),2),Mt=o(j,2),qt=o(r(Mt),2),St=o(Z,2);{var J=dt=>{var $t=p2(),Ft=r($t),V=r(Ft),st=o(r(V),2),ht=r(st),At=o(V,2);At.__click=[m2,rt,y];var Jt=r(At);be(Jt,{class:"w-5 h-5"}),Y(()=>b(ht,`${e(y)??""}%`)),m(dt,$t)};O(St,dt=>{e(y)&&dt(J)})}Tt(nt,()=>e(p),dt=>d(p,dt)),Tt(qt,()=>e(k),dt=>d(k,dt)),m(D,F)};O(kt,D=>{e(s)==="difference"&&D(q)})}var Q=o(kt,2);{var W=D=>{var F=y2(),Z=r(F),j=r(Z),nt=o(r(j),2),Mt=o(r(nt),2),qt=o(j,2),St=o(r(qt),2),J=o(Z,2);{var dt=$t=>{var Ft=b2(),V=r(Ft),st=r(V),ht=r(st),At=o(r(ht),2),Jt=r(At),Xt=o(ht,2);Xt.__click=[f2,rt,$];var Yt=r(Xt);be(Yt,{class:"w-5 h-5"});var ee=o(V,2),le=o(r(ee),2),Gt=r(le);Y((de,ce)=>{b(Jt,de),b(Gt,ce)},[()=>xt(e($)),()=>xt(e(M))]),m($t,Ft)};O(J,$t=>{e($)&&$t(dt)})}Tt(Mt,()=>e(h),$t=>d(h,$t)),Tt(St,()=>e(_),$t=>d(_,$t)),m(D,F)};O(Q,D=>{e(s)==="discount"&&D(W)})}var A=o(Q,2);{var I=D=>{var F=$2(),Z=r(F),j=o(r(Z),2),nt=o(r(j),2),Mt=o(Z,2),qt=r(Mt),St=o(r(qt),2),J=o(St,2);fe(J,20,()=>z,st=>st,(st,ht)=>{var At=_2();At.__click=[h2,lt,ht];var Jt=r(At);Y(()=>b(Jt,`${ht??""}%`)),m(st,At)});var dt=o(qt,2),$t=o(r(dt),2),Ft=o(Mt,2);{var V=st=>{var ht=C2(),At=r(ht),Jt=r(At),Xt=o(r(Jt),2),Yt=r(Xt),ee=o(Jt,2),le=o(r(ee),2),Gt=r(le),de=o(At,2);{var ce=ae=>{var me=w2(),pe=r(me),re=r(pe),ve=o(r(re),2),Ce=r(ve),Te=o(re,2);Te.__click=[k2,rt,C];var Ht=r(Te);be(Ht,{class:"w-5 h-5"}),Y(se=>b(Ce,se),[()=>xt(e(C))]),m(ae,me)};O(de,ae=>{parseInt(e(N))>1&&ae(ce)})}Y((ae,me)=>{b(Yt,ae),b(Gt,me)},[()=>xt(e(f)),()=>xt(e(E))]),m(st,ht)};O(Ft,st=>{e(f)&&st(V)})}Tt(nt,()=>e(P),st=>d(P,st)),Tt(St,()=>e(S),st=>d(S,st)),Tt($t,()=>e(N),st=>d(N,st)),m(D,F)};O(A,D=>{e(s)==="tip"&&D(I)})}var R=o(at,2),it=r(R),et=r(it),K=r(et);Rr(K,{class:"w-5 h-5 mr-2"});var U=o(et,2);{var B=D=>{var F=S2();m(D,F)},T=D=>{var F=Et(),Z=gt(F);{var j=Mt=>{var qt=T2();m(Mt,qt)},nt=Mt=>{var qt=Et(),St=gt(qt);{var J=$t=>{var Ft=M2();m($t,Ft)},dt=$t=>{var Ft=Et(),V=gt(Ft);{var st=At=>{var Jt=E2();m(At,Jt)},ht=At=>{var Jt=Et(),Xt=gt(Jt);{var Yt=le=>{var Gt=P2();m(le,Gt)},ee=le=>{var Gt=Et(),de=gt(Gt);{var ce=ae=>{var me=L2();m(ae,me)};O(de,ae=>{e(s)==="tip"&&ae(ce)},!0)}m(le,Gt)};O(Xt,le=>{e(s)==="discount"?le(Yt):le(ee,!1)},!0)}m(At,Jt)};O(V,At=>{e(s)==="difference"?At(st):At(ht,!1)},!0)}m($t,Ft)};O(St,$t=>{e(s)==="decrease"?$t(J):$t(dt,!1)},!0)}m(Mt,qt)};O(Z,Mt=>{e(s)==="increase"?Mt(j):Mt(nt,!1)},!0)}m(D,F)};O(U,D=>{e(s)==="basic"?D(B):D(T,!1)})}m(i,Rt),jt()}ye(["click"]);function j2(i,t,a,s,n,c,l){d(t,"metric"),d(a,"175"),d(s,"70"),d(n,"30"),d(c,"male"),d(l,"moderate")}function N2(i,t,a,s,n,c){d(t,""),d(a,""),d(s,""),d(n,"male"),d(c,"moderate")}function R2(){Ee("/tools")}var B2=w('<meta name="description" content="Calculate BMI, ideal weight, BMR, and daily calorie needs with health insights"/>'),D2=(i,t)=>t("metric"),F2=(i,t)=>t("imperial"),H2=w("<option> </option>"),O2=w('<div class="pt-2 border-t border-gray-200 dark:border-gray-700"><p class="text-sm text-gray-600 dark:text-gray-400"> </p></div>'),z2=w('<div class="flex justify-between"><span class="text-gray-600 dark:text-gray-400">Est. Body Fat:</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div>'),U2=w('<div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center"><!> Metabolic Information</h3> <div class="space-y-2"><div class="flex justify-between"><span class="text-gray-600 dark:text-gray-400">BMR:</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div> <div class="flex justify-between"><span class="text-gray-600 dark:text-gray-400">Daily Calories:</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div> <!></div></div>'),G2=w('<div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center"><!> Your BMI Results</h2> <div class="text-center mb-8"><div><p> </p> <p> </p></div></div> <div class="mb-8"><div class="relative"><div class="h-8 bg-gradient-to-r from-blue-400 via-green-400 to-red-400 rounded-full relative"><div class="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-gray-900 dark:bg-white rounded-full border-2 border-white dark:border-gray-900 transition-all duration-300"></div></div> <div class="flex justify-between mt-2 text-xs text-gray-600 dark:text-gray-400"><span>15</span> <span>18.5</span> <span>25</span> <span>30</span> <span>35</span> <span>40+</span></div></div></div> <div class="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><div class="flex items-start"><!> <div><p class="font-medium text-gray-900 dark:text-white mb-1">Health Risk Assessment</p> <p class="text-sm text-gray-600 dark:text-gray-400"> </p></div></div></div></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center"><!> Ideal Weight Range</h3> <div class="space-y-2"><div class="flex justify-between"><span class="text-gray-600 dark:text-gray-400">Minimum:</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div> <div class="flex justify-between"><span class="text-gray-600 dark:text-gray-400">Maximum:</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div> <!></div></div> <!></div>',1),q2=w('<div class="flex items-start"><div class="w-2 h-2 bg-[var(--ds-primary-500)] rounded-full mt-1.5 mr-3"></div> <p class="text-sm text-gray-600 dark:text-gray-400"> </p></div>'),W2=w('<div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Health Tips</h3> <div class="space-y-3"></div></div>'),J2=w(`<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--ds-primary-400)] to-[var(--ds-primary-600)] rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">BMI Calculator</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Calculate your Body Mass Index, ideal weight, and get personalized health insights</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">BMI Calculator</li></ol></nav> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-6"><div class="p-6"><div class="flex items-center justify-between"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Measurement Units</h2> <div class="flex gap-2"><button>Metric</button> <button>Imperial</button></div></div></div></div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-2 space-y-6"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><div class="flex items-center justify-between mb-6"><h2 class="text-xl font-semibold text-gray-900 dark:text-white flex items-center"><!> Personal Information</h2> <div class="flex gap-2"><button class="btn btn-primary btn-sm">Example</button> <button class="btn btn-primary btn-sm">Reset</button></div></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label for="height-input" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"> </label> <input class="input" id="height-input" type="number"/></div> <div><label for="weight-input" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"> </label> <input class="input" id="weight-input" type="number"/></div> <input class="input" id="age-input" type="number" placeholder="30"/> <div><fieldset><legend class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gender</legend> <div class="flex gap-4"><label class="flex items-center"><input type="radio" class="w-4 h-4 text-[var(--ds-primary-600)] bg-gray-100 border-gray-300 focus:ring-[var(--ds-primary-500)]"/> <span class="ml-2 text-gray-700 dark:text-gray-300">Male</span></label> <label class="flex items-center"><input type="radio" class="w-4 h-4 text-[var(--ds-primary-600)] bg-gray-100 border-gray-300 focus:ring-[var(--ds-primary-500)]"/> <span class="ml-2 text-gray-700 dark:text-gray-300">Female</span></label></div></fieldset></div></div> <div class="mt-6"><label for="activity-level-select" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Activity Level</label> <select id="activity-level-select" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-[var(--ds-primary-500)]"></select></div></div> <!></div> <div class="space-y-6"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">BMI Categories</h3> <div class="space-y-3"><div class="flex items-center justify-between p-2 rounded bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20]"><div class="flex items-center"><div class="w-3 h-3 bg-[var(--ds-primary-500)] rounded-full mr-3"></div> <span class="text-sm text-gray-700 dark:text-gray-300">Underweight</span></div> <span class="text-sm text-gray-600 dark:text-gray-400">&lt; 18.5</span></div> <div class="flex items-center justify-between p-2 rounded bg-green-50 dark:bg-green-900/20"><div class="flex items-center"><div class="w-3 h-3 bg-green-500 rounded-full mr-3"></div> <span class="text-sm text-gray-700 dark:text-gray-300">Normal</span></div> <span class="text-sm text-gray-600 dark:text-gray-400">18.5 - 24.9</span></div> <div class="flex items-center justify-between p-2 rounded bg-yellow-50 dark:bg-yellow-900/20"><div class="flex items-center"><div class="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div> <span class="text-sm text-gray-700 dark:text-gray-300">Overweight</span></div> <span class="text-sm text-gray-600 dark:text-gray-400">25 - 29.9</span></div> <div class="flex items-center justify-between p-2 rounded bg-red-50 dark:bg-red-900/20"><div class="flex items-center"><div class="w-3 h-3 bg-red-500 rounded-full mr-3"></div> <span class="text-sm text-gray-700 dark:text-gray-300">Obese</span></div> <span class="text-sm text-gray-600 dark:text-gray-400">≥ 30</span></div></div></div> <!> <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6"><div class="flex items-start"><!> <div><h3 class="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Important Notes</h3> <ul class="text-sm text-yellow-700 dark:text-yellow-300 space-y-1"><li>• BMI is a screening tool, not a diagnostic tool</li> <li>• It doesn't account for muscle mass or body composition</li> <li>• Athletes may have high BMI but low body fat</li> <li>• Consult healthcare providers for medical advice</li> <li>• Children and teens use different BMI charts</li></ul></div></div></div></div></div></div>`);function V2(i,t){It(t,!0);const a=[];let s=x("metric"),n=x(""),c=x(""),l=x(""),v=x("male"),g=x("moderate"),u=x(0),p=x(""),k=x(""),y=x(Le({min:0,max:0})),h=x(""),_=x(0),$=x(0),M=x(0);const P=[{value:"sedentary",label:"Sedentary",multiplier:1.2,description:"Little or no exercise"},{value:"light",label:"Lightly Active",multiplier:1.375,description:"Light exercise/sports 1-3 days/week"},{value:"moderate",label:"Moderately Active",multiplier:1.55,description:"Moderate exercise/sports 3-5 days/week"},{value:"active",label:"Very Active",multiplier:1.725,description:"Hard exercise/sports 6-7 days a week"},{value:"extra",label:"Extra Active",multiplier:1.9,description:"Very hard exercise/sports & physical job"}];we(()=>{if(e(n)&&e(c)&&!isNaN(parseFloat(e(n)))&&!isNaN(parseFloat(e(c)))){let j,nt;e(s)==="metric"?(j=parseFloat(e(n))/100,nt=parseFloat(e(c))):(j=parseFloat(e(n))*.0254,nt=parseFloat(e(c))*.453592),d(u,nt/(j*j)),e(u)<18.5?(d(p,"Underweight"),d(k,"blue"),d(h,"May have nutritional deficiency and osteoporosis risk")):e(u)<25?(d(p,"Normal Weight"),d(k,"green"),d(h,"Low risk of developing health problems")):e(u)<30?(d(p,"Overweight"),d(k,"yellow"),d(h,"Increased risk of heart disease, diabetes, and high blood pressure")):e(u)<35?(d(p,"Obese Class I"),d(k,"orange"),d(h,"High risk of cardiovascular disease and diabetes")):e(u)<40?(d(p,"Obese Class II"),d(k,"red"),d(h,"Very high risk of serious health conditions")):(d(p,"Obese Class III"),d(k,"red"),d(h,"Extremely high risk of life-threatening health conditions"));const Mt=j*j;if(e(y).min=18.5*Mt,e(y).max=24.9*Mt,e(l)&&!isNaN(parseFloat(e(l)))){const qt=parseFloat(e(l));e(v)==="male"?d(_,10*nt+6.25*(j*100)-5*qt+5):d(_,10*nt+6.25*(j*100)-5*qt-161);const St=P.find(J=>J.value===e(g));St&&d($,e(_)*St.multiplier),e(v)==="male"?d(M,1.2*e(u)+.23*qt-16.2):d(M,1.2*e(u)+.23*qt-5.4)}}else d(u,0),d(p,""),d(k,""),d(y,{min:0,max:0},!0),d(h,""),d(_,0),d($,0),d(M,0)});function S(j){d(s,j,!0),d(n,""),d(c,"")}function N(){if(e(u)===0)return 0;const j=(e(u)-15)/25*100;return Math.max(0,Math.min(100,j))}function f(j){return e(s)==="metric"?`${j.toFixed(1)} kg`:`${(j*2.20462).toFixed(1)} lbs`}function E(j){return`${Math.round(j)} calories/day`}function C(){const j=[];return e(u)<18.5?(j.push("Increase calorie intake with nutrient-dense foods"),j.push("Include protein-rich foods to build muscle mass"),j.push("Consider strength training exercises"),j.push("Consult with a healthcare provider or dietitian")):e(u)>=18.5&&e(u)<25?(j.push("Maintain your current healthy lifestyle"),j.push("Continue regular physical activity (150 min/week)"),j.push("Eat a balanced diet with variety"),j.push("Get adequate sleep (7-9 hours per night)")):e(u)>=25&&e(u)<30?(j.push("Aim for gradual weight loss (1-2 lbs per week)"),j.push("Increase physical activity to 300 min/week"),j.push("Focus on portion control and mindful eating"),j.push("Reduce processed foods and sugary drinks")):(j.push("Consult healthcare provider for a comprehensive plan"),j.push("Start with small, sustainable lifestyle changes"),j.push("Consider professional nutritional guidance"),j.push("Focus on both diet and exercise modifications")),j}var H=J2();Lr(j=>{var nt=B2();kr.title="BMI Calculator - Developer Tools",m(j,nt)});var z=r(H),rt=r(z),pt=r(rt);pt.__click=[R2];var lt=r(pt);Ie(lt,{class:"w-5 h-5"});var mt=o(rt,2),ct=r(mt),xt=r(ct);Lo(xt,{class:"w-10 h-10 text-white"});var Rt=o(z,4),Vt=r(Rt),Kt=r(Vt),Qt=o(r(Kt),2),Wt=r(Qt);Wt.__click=[D2,S];var zt=o(Wt,2);zt.__click=[F2,S];var Bt=o(Rt,2),Lt=r(Bt),Ct=r(Lt),X=r(Ct),_t=r(X),ut=r(_t);co(ut,{class:"w-6 h-6 mr-2"});var at=o(_t,2),L=r(at);L.__click=[j2,s,n,c,l,v,g];var ft=o(L,2);ft.__click=[N2,n,c,l,v,g];var vt=o(X,2),G=r(vt),tt=r(G),yt=r(tt),bt=o(tt,2),wt=o(G,2),Ut=r(wt),Ot=r(Ut),Nt=o(Ut,2),Pt=o(wt,2),ot=o(Pt,2),kt=r(ot),q=o(r(kt),2),Q=r(q),W=r(Q);W.value=W.__value="male";var A=o(Q,2),I=r(A);I.value=I.__value="female";var R=o(vt,2),it=o(r(R),2);fe(it,21,()=>P,j=>j.value,(j,nt)=>{var Mt=H2(),qt=r(Mt),St={};Y(()=>{b(qt,`${e(nt).label??""} - ${e(nt).description??""}`),St!==(St=e(nt).value)&&(Mt.value=(Mt.__value=e(nt).value)??"")}),m(j,Mt)});var et=o(Ct,2);{var K=j=>{var nt=G2(),Mt=gt(nt),qt=r(Mt),St=r(qt);Lo(St,{class:"w-6 h-6 mr-2"});var J=o(qt,2),dt=r(J),$t=r(dt),Ft=r($t),V=o($t,2),st=r(V),ht=o(J,2),At=r(ht),Jt=r(At),Xt=r(Jt),Yt=o(ht,2),ee=r(Yt),le=r(ee);pa(le,{class:"w-5 h-5 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)] mt-0.5 mr-3"});var Gt=o(le,2),de=o(r(Gt),2),ce=r(de),ae=o(Mt,2),me=r(ae),pe=r(me),re=r(pe);ec(re,{class:"w-5 h-5 mr-2"});var ve=o(pe,2),Ce=r(ve),Te=o(r(Ce),2),Ht=r(Te),se=o(Ce,2),xe=o(r(se),2),he=r(xe),je=o(se,2);{var Ne=_e=>{var Se=O2(),Ge=r(Se),Ae=r(Ge);Y(Je=>b(Ae,`For height: ${e(n)??""} inches (${Je??""} ft)`),[()=>(parseFloat(e(n))/12).toFixed(1)]),m(_e,Se)};O(je,_e=>{e(s)==="imperial"&&e(n)&&_e(Ne)})}var Be=o(me,2);{var De=_e=>{var Se=U2(),Ge=r(Se),Ae=r(Ge);bd(Ae,{class:"w-5 h-5 mr-2"});var Je=o(Ge,2),Xe=r(Je),mr=o(r(Xe),2),lr=r(mr),Pe=o(Xe,2),tr=o(r(Pe),2),Ar=r(tr),pr=o(Pe,2);{var xr=ar=>{var ir=z2(),fr=o(r(ir),2),Ir=r(fr);Y(wr=>b(Ir,`${wr??""}%`),[()=>Math.max(0,e(M)).toFixed(1)]),m(ar,ir)};O(pr,ar=>{e(M)&&ar(xr)})}Y((ar,ir)=>{b(lr,`${ar??""} calories/day`),b(Ar,ir)},[()=>Math.round(e(_)),()=>E(e($))]),m(_e,Se)};O(Be,_e=>{e(_)>0&&_e(De)})}Y((_e,Se,Ge,Ae)=>{ge(dt,1,`inline-block p-6 bg-${e(k)??""}-50 dark:bg-${e(k)??""}-900/20 rounded-lg border-2 border-${e(k)??""}-200 dark:border-${e(k)??""}-800`),ge($t,1,`text-5xl font-bold text-${e(k)??""}-700 dark:text-${e(k)??""}-300 mb-2`),b(Ft,_e),ge(V,1,`text-lg font-medium text-${e(k)??""}-600 dark:text-${e(k)??""}-400`),b(st,e(p)),Ke(Xt,`left: ${Se??""}%`),b(ce,e(h)),b(Ht,Ge),b(he,Ae)},[()=>e(u).toFixed(1),N,()=>f(e(y).min),()=>f(e(y).max)]),m(j,nt)};O(et,j=>{e(u)>0&&j(K)})}var U=o(Lt,2),B=o(r(U),2);{var T=j=>{var nt=W2(),Mt=o(r(nt),2);fe(Mt,20,C,qt=>qt,(qt,St)=>{var J=q2(),dt=o(r(J),2),$t=r(dt);Y(()=>b($t,St)),m(qt,J)}),m(j,nt)};O(B,j=>{e(u)>0&&C().length>0&&j(T)})}var D=o(B,2),F=r(D),Z=r(F);pa(Z,{class:"w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-3"}),Y(()=>{ge(Wt,1,`btn ${e(s)==="metric"?"btn-primary":"btn-secondary"}`),ge(zt,1,`btn ${e(s)==="imperial"?"btn-primary":"btn-secondary"}`),b(yt,`Height (${e(s)==="metric"?"cm":"inches"})`),Dt(bt,"placeholder",e(s)==="metric"?"170":`5'7"`),b(Ot,`Weight (${e(s)==="metric"?"kg":"lbs"})`),Dt(Nt,"placeholder",e(s)==="metric"?"70":"154")}),Tt(bt,()=>e(n),j=>d(n,j)),Tt(Nt,()=>e(c),j=>d(c,j)),Tt(Pt,()=>e(l),j=>d(l,j)),Li(a,[],W,()=>e(v),j=>d(v,j)),Li(a,[],I,()=>e(v),j=>d(v,j)),cr(it,()=>e(g),j=>d(g,j)),m(i,H),jt()}ye(["click"]);function Y2(i,t,a){d(t,"1990-06-15"),d(a,new Date().toISOString().split("T")[0],!0)}function K2(i,t,a,s,n){d(t,""),d(a,new Date().toISOString().split("T")[0],!0),d(s,"exact"),n()}function Q2(){Ee("/tools")}var Z2=w('<meta name="description" content="Calculate exact age, countdown to next birthday, zodiac signs, and more"/>'),X2=w('<div class="mt-4 text-gray-600 dark:text-gray-400"> <!> </div>'),th=w('<div class="inline-block p-6 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-lg border-2 border-pink-200 dark:border-pink-800 mb-6"><div class="text-3xl mb-4">🎉🎂🎈</div> <div class="text-2xl font-bold text-pink-600 dark:text-pink-400">Happy Birthday!</div> <div class="text-pink-700 dark:text-pink-300 mt-2"> </div></div> <div class="p-4 bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] rounded-lg"><h3 class="text-lg font-medium text-[var(--ds-primary-800)] dark:text-[var(--ds-primary-200)] mb-2">Countdown to Next Birthday</h3> <div class="grid grid-cols-4 gap-2 text-center"><div><div class="text-2xl font-bold text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"> </div> <div class="text-xs text-[var(--ds-primary-700)] dark:text-[var(--ds-primary-300)]">Days</div></div> <div><div class="text-2xl font-bold text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"> </div> <div class="text-xs text-[var(--ds-primary-700)] dark:text-[var(--ds-primary-300)]">Hours</div></div> <div><div class="text-2xl font-bold text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"> </div> <div class="text-xs text-[var(--ds-primary-700)] dark:text-[var(--ds-primary-300)]">Minutes</div></div> <div><div class="text-2xl font-bold text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"> </div> <div class="text-xs text-[var(--ds-primary-700)] dark:text-[var(--ds-primary-300)]">Seconds</div></div></div></div>',1),eh=w('<div class="mt-4 text-sm text-gray-600 dark:text-gray-400"> </div>'),rh=w('<div class="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><div class="text-lg text-gray-900 dark:text-white mb-2"> </div> <div class="text-3xl font-bold text-gray-900 dark:text-white mb-2"> </div> <div class="text-sm text-gray-600 dark:text-gray-400"> </div> <!></div>'),ah=w('<div><span class="text-sm text-gray-600 dark:text-gray-400">Birth Year:</span> <span class="ml-2 text-gray-900 dark:text-white font-medium">Leap Year 🗓️</span></div>'),ih=w('<div class="mb-4"><div class="flex items-center justify-between mb-2"><span class="text-2xl"> </span> <span class="text-lg font-medium text-gray-900 dark:text-white"> </span></div> <div class="text-sm text-gray-600 dark:text-gray-400"> </div> <div class="text-sm text-gray-600 dark:text-gray-400 mt-1"> </div></div>'),sh=w('<div><div class="text-lg font-medium text-gray-900 dark:text-white mb-1">Chinese Zodiac</div> <div class="text-sm text-gray-600 dark:text-gray-400"> </div></div>'),oh=(i,t,a)=>t(a()),nh=(i,t,a,s,n)=>t(`${e(a)} years, ${e(s)} months, ${e(n)} days`),dh=w('<div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-2 space-y-6"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center"><!> Your Age</h2> <div class="text-center mb-8"><div class="inline-block p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border-2 border-[var(--ds-primary-200)] dark:border-[var(--ds-primary-800)]"><div class="text-6xl font-bold text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)] mb-4"> </div> <div class="text-lg font-medium text-[var(--ds-primary-700)] dark:text-[var(--ds-primary-300)]">Years</div> <!></div></div> <div class="grid grid-cols-2 md:grid-cols-4 gap-4"><div class="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><div class="text-2xl font-bold text-gray-900 dark:text-white"> </div> <div class="text-sm text-gray-600 dark:text-gray-400">Days</div></div> <div class="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><div class="text-2xl font-bold text-gray-900 dark:text-white"> </div> <div class="text-sm text-gray-600 dark:text-gray-400">Weeks</div></div> <div class="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><div class="text-2xl font-bold text-gray-900 dark:text-white"> </div> <div class="text-sm text-gray-600 dark:text-gray-400">Months</div></div> <div class="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><div class="text-2xl font-bold text-gray-900 dark:text-white"> </div> <div class="text-sm text-gray-600 dark:text-gray-400">Hours</div></div></div> <div class="grid grid-cols-2 gap-4 mt-4"><div class="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><div class="text-2xl font-bold text-gray-900 dark:text-white"> </div> <div class="text-sm text-gray-600 dark:text-gray-400">Minutes</div></div> <div class="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><div class="text-2xl font-bold text-gray-900 dark:text-white"> </div> <div class="text-sm text-gray-600 dark:text-gray-400">Seconds</div></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center"><!> Next Birthday</h2> <div class="text-center"><!></div></div></div> <div class="space-y-6"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center"><!> Birth Details</h3> <div class="space-y-3"><div><span class="text-sm text-gray-600 dark:text-gray-400">Day of Week:</span> <span class="ml-2 text-gray-900 dark:text-white font-medium"> </span></div> <!> <div><span class="text-sm text-gray-600 dark:text-gray-400">Age in Milliseconds:</span> <span class="ml-2 text-gray-900 dark:text-white font-medium"> </span></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center"><!> Zodiac Signs</h3> <!> <!></div> <div class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800 p-6"><h3 class="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-4 flex items-center"><!> Fun Facts</h3> <div class="space-y-3 text-sm text-purple-700 dark:text-purple-300"><div><strong> </strong> weeks old</div> <div>Lived through <strong> </strong> seasons</div> <div>Approximately <strong> </strong> hours of sleep (average)</div> <div>About <strong> </strong> meals eaten</div> <div>Heart has beaten <strong> </strong> times (average)</div></div></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Copy</h3> <div class="space-y-2"><button class="btn btn-primary w-full"><!> Copy Age Text</button> <button class="btn btn-primary w-full">Copy Detailed Age</button></div></div></div></div>'),lh=w('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="btn btn-primary"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--ds-primary-400)] to-[var(--ds-primary-600)] rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Age Calculator</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Calculate exact age, countdown to next birthday, and discover interesting facts</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Age Calculator</li></ol></nav> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-6"><div class="p-6"><div class="flex items-center justify-between mb-6"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Enter Dates</h2> <div class="flex gap-2"><button class="btn btn-primary btn-sm">Example</button> <button class="btn btn-primary btn-sm"><!> Reset</button></div></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"><input class="input" id="birth-date" type="date"/> <input class="input" id="current-date" type="date"/></div> <div class="mt-6"><fieldset><legend class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Calculation Mode</legend> <div class="flex gap-4"><label class="flex items-center"><input type="radio" class="w-4 h-4 text-[var(--ds-primary-600)] bg-gray-100 border-gray-300 focus:ring-[var(--ds-primary-500)]"/> <span class="ml-2 text-gray-700 dark:text-gray-300">Exact Age (Years, Months, Days)</span></label> <label class="flex items-center"><input type="radio" class="w-4 h-4 text-[var(--ds-primary-600)] bg-gray-100 border-gray-300 focus:ring-[var(--ds-primary-500)]"/> <span class="ml-2 text-gray-700 dark:text-gray-300">Total Difference</span></label></div></fieldset></div></div></div> <!></div>');function ch(i,t){It(t,!0);const a=[];let s=x(""),n=x(""),c=x("exact"),l=x(0),v=x(0),g=x(0),u=x(0),p=x(0),k=x(0),y=x(0),h=x(0),_=x(0),$=x(""),M=x(0),P=x(""),S=x(""),N=x(""),f=x(0),E=x(!1),C=x(!1),H=null,z=x(Le({days:0,hours:0,minutes:0,seconds:0}));const rt=[{name:"Aries",dates:"Mar 21 - Apr 19",symbol:"♈",element:"Fire"},{name:"Taurus",dates:"Apr 20 - May 20",symbol:"♉",element:"Earth"},{name:"Gemini",dates:"May 21 - Jun 20",symbol:"♊",element:"Air"},{name:"Cancer",dates:"Jun 21 - Jul 22",symbol:"♋",element:"Water"},{name:"Leo",dates:"Jul 23 - Aug 22",symbol:"♌",element:"Fire"},{name:"Virgo",dates:"Aug 23 - Sep 22",symbol:"♍",element:"Earth"},{name:"Libra",dates:"Sep 23 - Oct 22",symbol:"♎",element:"Air"},{name:"Scorpio",dates:"Oct 23 - Nov 21",symbol:"♏",element:"Water"},{name:"Sagittarius",dates:"Nov 22 - Dec 21",symbol:"♐",element:"Fire"},{name:"Capricorn",dates:"Dec 22 - Jan 19",symbol:"♑",element:"Earth"},{name:"Aquarius",dates:"Jan 20 - Feb 18",symbol:"♒",element:"Air"},{name:"Pisces",dates:"Feb 19 - Mar 20",symbol:"♓",element:"Water"}];we(()=>{e(n)||d(n,new Date().toISOString().split("T")[0],!0)}),we(()=>{if(e(s)&&e(n)){const et=new Date(e(s)),K=new Date(e(n));if(et>K){Kt();return}e(c)==="exact"?pt(et,K):lt(et,K),mt(et,K)}else Kt()}),we(()=>(e(E)&&e($)?H=setInterval(Vt,1e3):H&&(clearInterval(H),H=null),()=>{H&&clearInterval(H)}));function pt(et,K){let U=K.getFullYear()-et.getFullYear(),B=K.getMonth()-et.getMonth(),T=K.getDate()-et.getDate();if(T<0){B--;const F=new Date(K.getFullYear(),K.getMonth(),0);T+=F.getDate()}B<0&&(U--,B+=12),d(l,U,!0),d(v,B,!0),d(g,T,!0);const D=K.getTime()-et.getTime();d(f,D),d(u,Math.floor(D/(1e3*60*60*24)),!0),d(p,Math.floor(e(u)/7),!0),d(k,Math.floor(e(u)/30.44),!0),d(y,Math.floor(D/(1e3*60*60)),!0),d(h,Math.floor(D/(1e3*60)),!0),d(_,Math.floor(D/1e3),!0)}function lt(et,K){const U=K.getTime()-et.getTime();d(f,U),d(_,Math.floor(U/1e3),!0),d(h,Math.floor(e(_)/60),!0),d(y,Math.floor(e(h)/60),!0),d(u,Math.floor(e(y)/24),!0),d(p,Math.floor(e(u)/7),!0),d(k,Math.floor(e(u)/30.44),!0),d(l,Math.floor(e(u)/365.25),!0);const B=e(u)%365.25;d(v,Math.floor(B/30.44),!0),d(g,Math.floor(B%30.44),!0)}function mt(et,K){const U=new Date(K.getFullYear(),et.getMonth(),et.getDate());U<K&&U.setFullYear(K.getFullYear()+1),d($,U.toISOString().split("T")[0],!0);const B=U.getTime()-K.getTime();d(M,Math.ceil(B/(1e3*60*60*24)),!0),d(E,et.getDate()===K.getDate()&&et.getMonth()===K.getMonth(),!0),d(P,ct(et),!0),d(S,xt(et.getFullYear()),!0),d(N,["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][et.getDay()],!0),d(C,Rt(et.getFullYear()),!0)}function ct(et){const K=et.getMonth()+1,U=et.getDate();return K===3&&U>=21||K===4&&U<=19?"Aries":K===4&&U>=20||K===5&&U<=20?"Taurus":K===5&&U>=21||K===6&&U<=20?"Gemini":K===6&&U>=21||K===7&&U<=22?"Cancer":K===7&&U>=23||K===8&&U<=22?"Leo":K===8&&U>=23||K===9&&U<=22?"Virgo":K===9&&U>=23||K===10&&U<=22?"Libra":K===10&&U>=23||K===11&&U<=21?"Scorpio":K===11&&U>=22||K===12&&U<=21?"Sagittarius":K===12&&U>=22||K===1&&U<=19?"Capricorn":K===1&&U>=20||K===2&&U<=18?"Aquarius":K===2&&U>=19||K===3&&U<=20?"Pisces":""}function xt(et){return["Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat","Monkey","Rooster","Dog","Pig"][(et-4)%12]}function Rt(et){return et%4===0&&et%100!==0||et%400===0}function Vt(){if(e(E)&&e($)){const et=new Date,K=new Date(e($));K.setFullYear(et.getFullYear()+1);const U=K.getTime()-et.getTime();e(z).days=Math.floor(U/(1e3*60*60*24)),e(z).hours=Math.floor(U%(1e3*60*60*24)/(1e3*60*60)),e(z).minutes=Math.floor(U%(1e3*60*60)/(1e3*60)),e(z).seconds=Math.floor(U%(1e3*60)/1e3)}}function Kt(){d(l,0),d(v,0),d(g,0),d(u,0),d(p,0),d(k,0),d(y,0),d(h,0),d(_,0),d($,""),d(M,0),d(P,""),d(S,""),d(N,""),d(f,0),d(E,!1),d(C,!1),d(z,{days:0,hours:0,minutes:0,seconds:0},!0)}function Qt(et){navigator.clipboard.writeText(et).then(()=>{})}function Wt(){if(e(l)===0&&e(v)===0&&e(g)===0)return"0 days";const et=[];return e(l)>0&&et.push(`${e(l)} year${e(l)!==1?"s":""}`),e(v)>0&&et.push(`${e(v)} month${e(v)!==1?"s":""}`),e(g)>0&&et.push(`${e(g)} day${e(g)!==1?"s":""}`),et.join(", ")}function zt(){return rt.find(et=>et.name===e(P))}function Bt(){return e(E)?"🎉 Happy Birthday! 🎂":e(M)===1?"Tomorrow is your birthday! 🎈":e(M)<=7?`${e(M)} days until your birthday! 🎁`:`${e(M)} days until your birthday`}var Lt=lh();Lr(et=>{var K=Z2();kr.title="Age Calculator - Developer Tools",m(et,K)});var Ct=r(Lt),X=r(Ct),_t=r(X);_t.__click=[Q2];var ut=r(_t);Ie(ut,{class:"w-5 h-5 mr-2"});var at=o(X,2),L=r(at),ft=r(L);Va(ft,{class:"w-10 h-10 text-white"});var vt=o(Ct,4),G=r(vt),tt=r(G),yt=o(r(tt),2),bt=r(yt);bt.__click=[Y2,s,n];var wt=o(bt,2);wt.__click=[K2,s,n,c,Kt];var Ut=r(wt);Gi(Ut,{class:"w-4 h-4 mr-2"});var Ot=o(tt,2),Nt=r(Ot),Pt=o(Nt,2),ot=o(Ot,2),kt=r(ot),q=o(r(kt),2),Q=r(q),W=r(Q);W.value=W.__value="exact";var A=o(Q,2),I=r(A);I.value=I.__value="difference";var R=o(vt,2);{var it=et=>{var K=dh(),U=r(K),B=r(U),T=r(B),D=r(T);ka(D,{class:"w-5 h-5 mr-2 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"});var F=o(T,2),Z=r(F),j=r(Z),nt=r(j),Mt=o(j,4);{var qt=Ue=>{var Ye=X2(),sr=r(Ye),yr=o(sr);{var jr=Cr=>{var Fr=Mi(",");m(Cr,Fr)};O(yr,Cr=>{e(v)>0&&e(g)>0&&Cr(jr)})}var Jr=o(yr);Y(()=>{b(sr,`${e(v)>0?`${e(v)} month${e(v)!==1?"s":""}`:""} `),b(Jr,` ${e(g)>0?`${e(g)} day${e(g)!==1?"s":""}`:""}`)}),m(Ue,Ye)};O(Mt,Ue=>{(e(v)>0||e(g)>0)&&Ue(qt)})}var St=o(F,2),J=r(St),dt=r(J),$t=r(dt),Ft=o(J,2),V=r(Ft),st=r(V),ht=o(Ft,2),At=r(ht),Jt=r(At),Xt=o(ht,2),Yt=r(Xt),ee=r(Yt),le=o(St,2),Gt=r(le),de=r(Gt),ce=r(de),ae=o(Gt,2),me=r(ae),pe=r(me),re=o(B,2),ve=r(re),Ce=r(ve);fd(Ce,{class:"w-6 h-6 mr-2"});var Te=o(ve,2),Ht=r(Te);{var se=Ue=>{var Ye=th(),sr=gt(Ye),yr=o(r(sr),4),jr=r(yr),Jr=o(sr,2),Cr=o(r(Jr),2),Fr=r(Cr),oa=r(Fr),ha=r(oa),$r=o(Fr,2),na=r($r),Ki=r(na),fi=o($r,2),Nd=r(fi),Rd=r(Nd),Bd=o(fi,2),Dd=r(Bd),Fd=r(Dd);Y(()=>{b(jr,`You are now ${e(l)??""} years old!`),b(ha,e(z).days),b(Ki,e(z).hours),b(Rd,e(z).minutes),b(Fd,e(z).seconds)}),m(Ue,Ye)},xe=Ue=>{var Ye=rh(),sr=r(Ye),yr=r(sr),jr=o(sr,2),Jr=r(jr),Cr=o(jr,2),Fr=r(Cr),oa=o(Cr,2);{var ha=$r=>{var na=eh(),Ki=r(na);Y(fi=>b(Ki,`Next birthday: ${fi??""}`),[()=>new Date(e($)+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})]),m($r,na)};O(oa,$r=>{e($)&&$r(ha)})}Y($r=>{b(yr,$r),b(Jr,e(M)),b(Fr,`${e(M)===1?"day":"days"} remaining`)},[Bt]),m(Ue,Ye)};O(Ht,Ue=>{e(E)?Ue(se):Ue(xe,!1)})}var he=o(U,2),je=r(he),Ne=r(je),Be=r(Ne);Va(Be,{class:"w-5 h-5 mr-2"});var De=o(Ne,2),_e=r(De),Se=o(r(_e),2),Ge=r(Se),Ae=o(_e,2);{var Je=Ue=>{var Ye=ah();m(Ue,Ye)};O(Ae,Ue=>{e(C)&&Ue(Je)})}var Xe=o(Ae,2),mr=o(r(Xe),2),lr=r(mr),Pe=o(je,2),tr=r(Pe),Ar=r(tr);lo(Ar,{class:"w-5 h-5 mr-2"});var pr=o(tr,2);{var xr=Ue=>{const Ye=ue(zt);var sr=ih(),yr=r(sr),jr=r(yr),Jr=r(jr),Cr=o(jr,2),Fr=r(Cr),oa=o(yr,2),ha=r(oa),$r=o(oa,2),na=r($r);Y(()=>{b(Jr,e(Ye)?.symbol),b(Fr,e(P)),b(ha,e(Ye)?.dates),b(na,`Element: ${e(Ye)?.element??""}`)}),m(Ue,sr)};O(pr,Ue=>{e(P)&&Ue(xr)})}var ar=o(pr,2);{var ir=Ue=>{var Ye=sh(),sr=o(r(Ye),2),yr=r(sr);Y(()=>b(yr,`Year of the ${e(S)??""}`)),m(Ue,Ye)};O(ar,Ue=>{e(S)&&Ue(ir)})}var fr=o(Pe,2),Ir=r(fr),wr=r(Ir);bd(wr,{class:"w-5 h-5 mr-2"});var Wr=o(Ir,2),aa=r(Wr),ze=r(aa),Dr=r(ze),ia=o(aa,2),ja=o(r(ia)),sa=r(ja),Na=o(ia,2),br=o(r(Na)),Wi=r(br),Ra=o(Na,2),Ji=o(r(Ra)),qe=r(Ji),ti=o(Ra,2),Vi=o(r(ti)),Pd=r(Vi),Ld=o(fr,2),Ad=o(r(Ld),2),Yi=r(Ad);Yi.__click=[oh,Qt,Wt];var Id=r(Yi);be(Id,{class:"w-4 h-4 mr-2"});var jd=o(Yi,2);jd.__click=[nh,Qt,l,v,g],Y((Ue,Ye,sr,yr,jr,Jr,Cr,Fr,oa,ha,$r,na)=>{b(nt,e(l)),b($t,Ue),b(st,Ye),b(Jt,sr),b(ee,yr),b(ce,jr),b(pe,Jr),b(Ge,e(N)),b(lr,Cr),b(Dr,Fr),b(sa,oa),b(Wi,ha),b(qe,$r),b(Pd,na)},[()=>e(u).toLocaleString(),()=>e(p).toLocaleString(),()=>e(k).toLocaleString(),()=>e(y).toLocaleString(),()=>e(h).toLocaleString(),()=>e(_).toLocaleString(),()=>e(f).toLocaleString(),()=>e(p).toLocaleString(),()=>new Date(e(s)).getFullYear()+e(l)-new Date(e(s)).getFullYear(),()=>(e(u)*8).toLocaleString(),()=>(e(u)*50).toLocaleString(),()=>(e(h)*80).toLocaleString()]),m(et,K)};O(R,et=>{(e(l)>0||e(v)>0||e(g)>0)&&et(it)})}Y(()=>Dt(Nt,"max",e(n))),Tt(Nt,()=>e(s),et=>d(s,et)),Tt(Pt,()=>e(n),et=>d(n,et)),Li(a,[],W,()=>e(c),et=>d(c,et)),Li(a,[],I,()=>e(c),et=>d(c,et)),m(i,Lt),jt()}ye(["click"]);function vh(i,t){const a=Math.max(...e(t).map(s=>s.id))+1;d(t,[...e(t),{id:a,text:"",weight:1}],!0)}async function gh(i,t,a,s,n,c,l){const v=e(t).filter(y=>y.text.trim()!=="");if(v.length===0){d(a,{text:"Please add some items first!",type:"error"},!0);return}d(s,!0),d(a,null);const g=20,u=e(n)/g;for(let y=0;y<g;y++){const h=v[Math.floor(Math.random()*v.length)];d(a,{text:h.text,type:"animating"},!0),await new Promise(_=>setTimeout(_,u))}const p=c();if(p.length===0){d(a,{text:"Please add some items first!",type:"error"},!0),d(s,!1);return}d(a,{text:p.length===1?p[0].text:`${p.length} items selected`,type:"success",items:p},!0);const k={id:Date.now(),items:p.map(y=>y.text),timestamp:new Date,totalItems:v.length};d(l,[k,...e(l).slice(0,9)],!0),d(s,!1)}function uh(i,t,a,s,n){d(t,[{id:1,text:"",weight:1}],!0),d(a,null),d(s,[],!0),n()}function mh(i,t){if(e(t)&&e(t).items){const a=e(t).items.map(s=>s.text).join(", ");navigator.clipboard.writeText(a)}else e(t)&&navigator.clipboard.writeText(e(t).text)}var ph=w('<meta name="description" content="Random item picker with weighted selections, multiple picks, and history tracking"/>'),xh=()=>Ee("/tools"),fh=(i,t,a)=>t(e(a)),bh=w('<button class="p-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"><!> <div class="text-sm font-medium text-gray-900 dark:text-white"> </div> <div class="text-xs text-gray-500 dark:text-gray-400"> </div></button>'),yh=w('<div class="flex items-center gap-1"><label class="text-sm text-gray-600 dark:text-gray-400">Weight:</label> <input type="number" min="0.1" step="0.1" class="w-20 px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"/></div>'),hh=(i,t,a)=>t(e(a).id),_h=w('<div class="flex gap-3"><input type="text" placeholder="Enter item name" class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-[var(--ds-primary-500)]"/> <!> <button class="p-2 text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"><!></button></div>'),kh=w('<span class="text-sm text-gray-600 dark:text-gray-400"> </span>'),wh=w('<div class="flex items-center"><div class="animate-spin"><!></div> Picking...</div>'),Ch=w("<!> ",1),$h=w('<div class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"><p class="text-red-700 dark:text-red-300 text-center"> </p></div>'),Sh=w('<div class="text-center py-8"><div class="inline-block animate-bounce"><!></div> <p class="mt-4 text-gray-600 dark:text-gray-400 animate-pulse"> </p></div>'),Th=w('<div class="px-3 py-1 bg-white dark:bg-gray-800 rounded-full border border-green-200 dark:border-green-700"> </div>'),Mh=w('<div class="mt-4 space-y-2"></div>'),Eh=w('<div class="text-center py-8"><div class="inline-block p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border-2 border-green-200 dark:border-green-800"><!> <h3 class="text-2xl font-bold text-green-700 dark:text-green-300 mb-2"> </h3> <!></div></div>'),Ph=w('<div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><div class="flex items-center justify-between mb-4"><h2 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center"><!> Result</h2> <div class="flex gap-2"><button class="btn btn-primary btn-sm"><!> Copy</button> <button class="btn btn-primary btn-sm"><!></button></div></div> <!></div>'),Lh=w('<p class="text-gray-500 dark:text-gray-400 text-sm">No picks yet</p>'),Ah=(i,t,a)=>t(e(a)),Ih=w('<button class="w-full text-left p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"><div class="text-sm font-medium text-gray-900 dark:text-white"> <!></div> <div class="text-xs text-gray-500 dark:text-gray-400"> </div></button>'),jh=w('<div class="space-y-3 max-h-96 overflow-y-auto"></div>'),Nh=w('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--ds-primary-400)] to-[var(--ds-primary-600)] rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Random Picker</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Make random selections with weighted options and multiple picks</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Random Picker</li></ol></nav> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-6"><div class="p-6"><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Presets</h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3"></div></div></div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-2 space-y-6"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><div class="flex items-center justify-between mb-4"><h2 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center"><!> Items to Pick From</h2> <div class="flex gap-2"><button class="btn btn-primary btn-sm"><!> Add Item</button> <button class="btn btn-primary btn-sm">Clear All</button></div></div> <div class="space-y-3"></div> <div class="mt-4 flex items-center justify-between"><label class="flex items-center"><input type="checkbox" class="w-4 h-4 text-[var(--ds-primary-600)] bg-gray-100 border-gray-300 rounded focus:ring-[var(--ds-primary-500)]"/> <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Enable Weights</span></label> <!></div></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Picker Settings</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"><div><label for="number-of-picks" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Number of Picks</label> <input id="number-of-picks" type="number" min="1" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-[var(--ds-primary-500)]"/></div> <div><label for="animation-speed" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Animation Speed (ms)</label> <input id="animation-speed" type="range" min="500" max="5000" step="500" class="w-full"/> <div class="text-xs text-gray-500 dark:text-gray-400"> </div></div></div> <div class="flex items-center mb-6"><input id="allow-duplicates" type="checkbox" class="w-4 h-4 text-[var(--ds-primary-600)] bg-gray-100 border-gray-300 rounded focus:ring-[var(--ds-primary-500)]"/> <label for="allow-duplicates" class="ml-2 text-sm text-gray-700 dark:text-gray-300">Allow Duplicates (when picking multiple items)</label></div> <button class="btn btn-primary w-full"><!></button></div> <!></div> <div class="space-y-6"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">History</h3> <!></div> <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-[var(--ds-primary-200)] dark:border-[var(--ds-primary-800)] p-6"><h3 class="text-lg font-semibold text-[var(--ds-primary-800)] dark:text-[var(--ds-primary-200)] mb-4 flex items-center"><!> Pro Tips</h3> <div class="space-y-3 text-sm text-[var(--ds-primary-700)] dark:text-[var(--ds-primary-300)]"><div class="flex items-start"><div class="w-2 h-2 bg-[var(--ds-primary-500)] rounded-full mt-1.5 mr-3"></div> <p>Use weights to give some items higher chances of being selected</p></div> <div class="flex items-start"><div class="w-2 h-2 bg-[var(--ds-primary-500)] rounded-full mt-1.5 mr-3"></div> <p>Enable multiple picks for selecting more than one item at once</p></div> <div class="flex items-start"><div class="w-2 h-2 bg-[var(--ds-primary-500)] rounded-full mt-1.5 mr-3"></div> <p>History helps you track previous random selections</p></div> <div class="flex items-start"><div class="w-2 h-2 bg-[var(--ds-primary-500)] rounded-full mt-1.5 mr-3"></div> <p>Use presets for quick decision-making scenarios</p></div></div></div></div></div></div>');function Rh(i,t){It(t,!0);let a=x(Le([{id:1,text:"",weight:1},{id:2,text:"",weight:1},{id:3,text:"",weight:1}])),s=x(null),n=x(Le([])),c=x(!1),l=x(1),v=x(!1),g=x(!1),u=x(2e3);const p=[{name:"Decision Maker",icon:Ao,items:[{text:"Yes",weight:1},{text:"No",weight:1},{text:"Maybe",weight:1}]},{name:"Restaurant Picker",icon:dc,items:[{text:"Pizza",weight:1},{text:"Burger",weight:1},{text:"Sushi",weight:1},{text:"Pasta",weight:1},{text:"Thai",weight:1}]},{name:"Team Selector",icon:co,items:[{text:"Team A",weight:1},{text:"Team B",weight:1},{text:"Team C",weight:1},{text:"Team D",weight:1}]},{name:"Activity Ideas",icon:Ve,items:[{text:"Go for a walk",weight:1},{text:"Read a book",weight:1},{text:"Watch a movie",weight:1},{text:"Call a friend",weight:1},{text:"Try a new recipe",weight:1}]}];function k(B){e(a).length>1&&d(a,e(a).filter(T=>T.id!==B),!0)}function y(B){d(a,B.items.map((T,D)=>({id:D+1,text:T.text,weight:T.weight})),!0),_()}function h(){const B=e(a).filter(Z=>Z.text.trim()!=="");if(B.length===0)return[];const T=B.reduce((Z,j)=>Z+j.weight,0),D=[],F=[...B];for(let Z=0;Z<Math.min(e(l),F.length);Z++){let j=Math.random()*T,nt=0;for(let qt=0;qt<F.length;qt++)if(j-=F[qt].weight,j<=0){nt=qt;break}const Mt=F[nt];D.push(Mt),e(v)||F.splice(nt,1)}return D}function _(){d(s,null),d(c,!1)}function $(B){d(a,B.items.map((T,D)=>({id:D+1,text:T,weight:1})),!0),_()}const M=ue(()=>e(a).reduce((B,T)=>B+(parseFloat(String(T.weight))||1),0));var P=Nh();Lr(B=>{var T=ph();kr.title="Random Picker - Developer Tools",m(B,T)});var S=r(P),N=r(S),f=r(N);f.__click=[xh];var E=r(f);Ie(E,{class:"w-5 h-5"});var C=o(N,2),H=r(C),z=r(H);os(z,{class:"w-10 h-10 text-white"});var rt=o(S,4),pt=r(rt),lt=o(r(pt),2);fe(lt,21,()=>p,B=>B.name,(B,T)=>{var D=bh();D.__click=[fh,y,T];var F=r(D);nr(F,()=>e(T).icon,(qt,St)=>{St(qt,{class:"w-5 h-5 text-gray-600 dark:text-gray-400 mb-2"})});var Z=o(F,2),j=r(Z),nt=o(Z,2),Mt=r(nt);Y(()=>{b(j,e(T).name),b(Mt,`${e(T).items.length??""} items`)}),m(B,D)});var mt=o(rt,2),ct=r(mt),xt=r(ct),Rt=r(xt),Vt=r(Rt),Kt=r(Vt);J0(Kt,{class:"w-5 h-5 mr-2"});var Qt=o(Vt,2),Wt=r(Qt);Wt.__click=[vh,a];var zt=r(Wt);Ai(zt,{class:"w-4 h-4 mr-1"});var Bt=o(Wt,2);Bt.__click=[uh,a,s,n,_];var Lt=o(Rt,2);fe(Lt,21,()=>e(a),B=>B.id,(B,T,D)=>{var F=_h(),Z=r(F),j=o(Z,2);{var nt=St=>{var J=yh(),dt=r(J),$t=o(dt,2);Y(()=>{Dt(dt,"for",`weight-${e(T).id??""}`),Dt($t,"id",`weight-${e(T).id??""}`)}),Tt($t,()=>e(T).weight,Ft=>e(T).weight=Ft),m(St,J)};O(j,St=>{e(g)&&St(nt)})}var Mt=o(j,2);Mt.__click=[hh,k,T];var qt=r(Mt);gi(qt,{class:"w-4 h-4"}),Y(()=>Mt.disabled=e(a).length===1),Tt(Z,()=>e(T).text,St=>e(T).text=St),m(B,F)});var Ct=o(Lt,2),X=r(Ct),_t=r(X),ut=o(X,2);{var at=B=>{var T=kh(),D=r(T);Y(F=>b(D,`Total Weight: ${F??""}`),[()=>e(M).toFixed(1)]),m(B,T)};O(ut,B=>{e(g)&&B(at)})}var L=o(xt,2),ft=o(r(L),2),vt=r(ft),G=o(r(vt),2),tt=o(vt,2),yt=o(r(tt),2),bt=o(yt,2),wt=r(bt),Ut=o(ft,2),Ot=r(Ut),Nt=o(Ut,2);Nt.__click=[gh,a,s,c,u,h,n];var Pt=r(Nt);{var ot=B=>{var T=wh(),D=r(T),F=r(D);os(F,{class:"w-5 h-5 mr-2"}),m(B,T)},kt=B=>{var T=Ch(),D=gt(T);os(D,{class:"w-5 h-5 mr-2"});var F=o(D);Y(()=>b(F,` Pick Random Item${e(l)>1?"s":""}`)),m(B,T)};O(Pt,B=>{e(c)?B(ot):B(kt,!1)})}var q=o(L,2);{var Q=B=>{var T=Ph(),D=r(T),F=r(D),Z=r(F);fd(Z,{class:"w-5 h-5 mr-2"});var j=o(F,2),nt=r(j);nt.__click=[mh,s];var Mt=r(nt);be(Mt,{class:"w-4 h-4 mr-1"});var qt=o(nt,2);qt.__click=_;var St=r(qt);Gi(St,{class:"w-4 h-4"});var J=o(D,2);{var dt=Ft=>{var V=$h(),st=r(V),ht=r(st);Y(()=>b(ht,e(s).text)),m(Ft,V)},$t=Ft=>{var V=Et(),st=gt(V);{var ht=Jt=>{var Xt=Sh(),Yt=r(Xt),ee=r(Yt);Ao(ee,{class:"w-16 h-16 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"});var le=o(Yt,2),Gt=r(le);Y(()=>b(Gt,e(s).text)),m(Jt,Xt)},At=Jt=>{var Xt=Eh(),Yt=r(Xt),ee=r(Yt);lo(ee,{class:"w-12 h-12 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)] mx-auto mb-3"});var le=o(ee,2),Gt=r(le),de=o(le,2);{var ce=ae=>{var me=Mh();fe(me,21,()=>e(s).items,pe=>pe.text,(pe,re)=>{var ve=Th(),Ce=r(ve);Y(()=>b(Ce,e(re).text)),m(pe,ve)}),m(ae,me)};O(de,ae=>{e(s).items&&e(s).items.length>1&&ae(ce)})}Y(()=>b(Gt,e(s).text)),m(Jt,Xt)};O(st,Jt=>{e(s).type==="animating"?Jt(ht):Jt(At,!1)},!0)}m(Ft,V)};O(J,Ft=>{e(s).type==="error"?Ft(dt):Ft($t,!1)})}m(B,T)};O(q,B=>{e(s)&&B(Q)})}var W=o(ct,2),A=r(W),I=o(r(A),2);{var R=B=>{var T=Lh();m(B,T)},it=B=>{var T=jh();fe(T,21,()=>e(n),D=>D.id,(D,F)=>{var Z=Ih();Z.__click=[Ah,$,F];var j=r(Z),nt=r(j),Mt=o(nt);{var qt=dt=>{var $t=Mi();Y(()=>b($t,`+${e(F).items.length-2} more`)),m(dt,$t)};O(Mt,dt=>{e(F).items.length>2&&dt(qt)})}var St=o(j,2),J=r(St);Y((dt,$t)=>{b(nt,`${dt??""} `),b(J,`${$t??""} • ${e(F).totalItems??""} total items`)},[()=>e(F).items.slice(0,2).join(", "),()=>e(F).timestamp.toLocaleTimeString()]),m(D,Z)}),m(B,T)};O(I,B=>{e(n).length===0?B(R):B(it,!1)})}var et=o(A,2),K=r(et),U=r(K);Ve(U,{class:"w-5 h-5 mr-2"}),Y((B,T)=>{Dt(G,"max",B),b(wt,`${e(u)??""}ms`),Nt.disabled=T},[()=>e(a).filter(B=>B.text.trim()!=="").length,()=>e(c)||e(a).filter(B=>B.text.trim()!=="").length===0]),We(_t,()=>e(g),B=>d(g,B)),Tt(G,()=>e(l),B=>d(l,B)),Tt(yt,()=>e(u),B=>d(u,B)),We(Ot,()=>e(v),B=>d(v,B)),m(i,P),jt()}ye(["click"]);function si(i,t,a,s,n,c,l,v){d(t,`${e(a)} ${e(s)} ${e(n)} ${e(c)} ${e(l)}`),v()}async function Bh(i,t,a){try{await navigator.clipboard.writeText(e(t)),d(a,!0),setTimeout(()=>d(a,!1),2e3)}catch(s){console.error("Failed to copy:",s)}}function Dh(i,t,a){const s=Math.floor(Math.random()*60).toString(),n=Math.floor(Math.random()*24).toString(),c=Math.floor(Math.random()*28)+1;d(t,`${s} ${n} ${c} * *`),a()}var Fh=w('<meta name="description" content="Generate and test cron expressions with visual builder and next run times"/>'),Hh=()=>Ee("/tools"),Oh=w('<button class="p-2 rounded-lg bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)] text-xs font-semibold transition-colors" disabled>Copied!</button>'),zh=w('<button class="p-2 rounded-lg bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors relative group" title="Copy to clipboard"><!></button>'),Uh=w('<div class="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm"><!> Invalid cron expression format</div>'),Gh=w('<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><!> Description</h3> <p class="text-gray-700 dark:text-gray-300"> </p></div>'),qh=w('<div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"><!> </div>'),Wh=w('<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><!> Next Run Times</h3> <div class="space-y-2"></div></div>'),Jh=(i,t,a)=>t(e(a).expression),Vh=w('<button class="text-left p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"><div class="font-medium text-gray-900 dark:text-white text-sm"> </div> <div class="text-xs text-gray-500 dark:text-gray-400 font-mono mt-1"> </div></button>'),Yh=w(`<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--ds-primary-400)] to-[var(--ds-primary-600)] rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Cron Expression Generator</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Create and validate cron expressions with visual builder and next run times</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Cron Generator</li></ol></nav> <div class="grid lg:grid-cols-2 gap-6"><div class="space-y-6"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><div class="flex items-center justify-between mb-4"><h2 class="text-xl font-semibold text-gray-900 dark:text-white">Cron Expression</h2> <div class="flex items-center gap-2"><button class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" title="Generate Random"><!></button> <!></div></div> <div class="space-y-4"><input type="text" placeholder="* * * * *"/> <div class="text-sm text-gray-600 dark:text-gray-400"><span class="font-medium">Format:</span> [Minute] [Hour] [Day of Month] [Month] [Day of Week]</div> <!></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Manual Builder</h3> <div class="space-y-4"><div><label for="minute" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Minute (0-59)</label> <input id="minute" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--ds-primary-500)]" placeholder="0"/></div> <div><label for="hour" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hour (0-23)</label> <input id="hour" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--ds-primary-500)]" placeholder="0"/></div> <div><label for="day-of-month" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Day of Month (1-31)</label> <input id="day-of-month" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--ds-primary-500)]" placeholder="*"/></div> <div><label for="month" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Month (1-12)</label> <input id="month" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--ds-primary-500)]" placeholder="*"/></div> <div><label for="day-of-week" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Day of Week (0-6, 0=Sunday)</label> <input id="day-of-week" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--ds-primary-500)]" placeholder="*"/></div></div></div></div> <div class="space-y-6"><!> <!> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Common Presets</h3> <div class="grid grid-cols-1 sm:grid-cols-2 gap-3"></div></div> <div class="bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] rounded-xl border border-[var(--ds-primary-200)] dark:border-[var(--ds-primary-800)] p-6"><h3 class="text-lg font-semibold text-blue-900 dark:text-blue-400 mb-4 flex items-center gap-2"><!> Cron Syntax Help</h3> <div class="space-y-3 text-sm text-blue-800 dark:text-blue-300"><div><strong class="font-semibold">* (asterisk)</strong> - any value</div> <div><strong class="font-semibold">, (comma)</strong> - value list separator</div> <div><strong class="font-semibold">- (hyphen)</strong> - range of values</div> <div><strong class="font-semibold">/ (forward slash)</strong> - step values</div> <div><strong class="font-semibold">Examples:</strong> <ul class="mt-2 space-y-1 ml-4"><li>• <code class="bg-blue-100 dark:bg-blue-900/30 px-1 rounded">*/15 * * * *</code> - Every
                15 minutes</li> <li>• <code class="bg-blue-100 dark:bg-blue-900/30 px-1 rounded">0 9 * * 1-5</code> - Weekdays
                at 9 AM</li> <li>• <code class="bg-blue-100 dark:bg-blue-900/30 px-1 rounded">0 0 1 * *</code> - First
                day of every month</li></ul></div></div></div></div></div></div>`);function Kh(i,t){It(t,!0);let a=x("0 0 * * *"),s=x(Le([])),n=x(!0),c=x(!1),l=x("0"),v=x("0"),g=x("*"),u=x("*"),p=x("*");const k=[{name:"Every minute",expression:"* * * * *"},{name:"Every hour",expression:"0 * * * *"},{name:"Every day at midnight",expression:"0 0 * * *"},{name:"Every day at noon",expression:"0 12 * * *"},{name:"Every week on Monday",expression:"0 0 * * 1"},{name:"Every month on 1st",expression:"0 0 1 * *"},{name:"Every weekday at 9 AM",expression:"0 9 * * 1-5"},{name:"Every weekend at midnight",expression:"0 0 * * 0,6"},{name:"Every 15 minutes",expression:"*/15 * * * *"},{name:"Every 4 hours",expression:"0 */4 * * *"}];function y(R){try{const it=R.split(" ");if(it.length!==5)return"Invalid cron expression";const[et,K,U,B,T]=it;let D="Run";if(et==="*")D+=" every minute";else if(et.includes("/")){const F=et.split("/")[1];D+=` every ${F} minutes`}else if(et.includes(",")){const F=et.split(",").join(", ");D+=` at minute(s) ${F}`}else if(et.includes("-")){const[F,Z]=et.split("-");D+=` from minute ${F} to ${Z}`}else D+=` at minute ${et}`;if(K!=="*")if(K.includes("/")){const F=K.split("/")[1];D+=` every ${F} hours`}else if(K.includes(",")){const F=K.split(",").join(", ");D+=` at hour(s) ${F}`}else if(K.includes("-")){const[F,Z]=K.split("-");D+=` from hour ${F} to ${Z}`}else D+=` at ${K.padStart(2,"0")}:00`;if(U!=="*")if(U.includes("/")){const F=U.split("/")[1];D+=` every ${F} days`}else D+=` on day ${U}`;if(B!=="*")if(B.includes(",")){const F=B.split(",").map(Z=>h(parseInt(Z))).join(", ");D+=` in ${F}`}else D+=` in ${h(parseInt(B))}`;if(T!=="*")if(T.includes(",")){const F=T.split(",").map(Z=>_(parseInt(Z))).join(", ");D+=` on ${F}`}else D+=` on ${_(parseInt(T))}`;return D}catch{return"Invalid cron expression"}}function h(R){return["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][R-1]||R.toString()}function _(R){return["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][R]||R.toString()}function $(R,it=10){try{if(R.split(" ").length!==5)return[];const K=new Date,U=[];for(let B=0;B<it;B++){const T=new Date(K);T.setMinutes(T.getMinutes()+(B+1)*5),U.push(T.toLocaleString())}return U}catch{return[]}}function M(){const R=e(a).split(" ");R.length===5&&(it=>{var et=Qa(it,5);d(l,et[0],!0),d(v,et[1],!0),d(g,et[2],!0),d(u,et[3],!0),d(p,et[4],!0)})(R),P()}function P(){const R=e(a).split(" ");d(n,R.length===5&&R.every(it=>it.trim()!==""),!0),e(n)?d(s,$(e(a)),!0):d(s,[],!0)}function S(R){d(a,R,!0),M()}M();var N=Yh();Lr(R=>{var it=Fh();kr.title="Cron Expression Generator - Developer Tools",m(R,it)});var f=r(N),E=r(f),C=r(E);C.__click=[Hh];var H=r(C);Ie(H,{class:"w-5 h-5"});var z=o(E,2),rt=r(z),pt=r(rt);ac(pt,{class:"w-10 h-10 text-white"});var lt=o(f,4),mt=r(lt),ct=r(mt),xt=r(ct),Rt=o(r(xt),2),Vt=r(Rt);Vt.__click=[Dh,a,M];var Kt=r(Vt);Er(Kt,{class:"w-4 h-4"});var Qt=o(Vt,2);{var Wt=R=>{var it=Oh();m(R,it)},zt=R=>{var it=zh();it.__click=[Bh,a,c];var et=r(it);be(et,{class:"w-4 h-4 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"}),m(R,it)};O(Qt,R=>{e(c)?R(Wt):R(zt,!1)})}var Bt=o(xt,2),Lt=r(Bt);Lt.__input=M;var Ct=o(Lt,4);{var X=R=>{var it=Uh(),et=r(it);pa(et,{class:"w-4 h-4"}),m(R,it)};O(Ct,R=>{e(n)||R(X)})}var _t=o(ct,2),ut=o(r(_t),2),at=r(ut),L=o(r(at),2);L.__input=[si,a,l,v,g,u,p,P];var ft=o(at,2),vt=o(r(ft),2);vt.__input=[si,a,l,v,g,u,p,P];var G=o(ft,2),tt=o(r(G),2);tt.__input=[si,a,l,v,g,u,p,P];var yt=o(G,2),bt=o(r(yt),2);bt.__input=[si,a,l,v,g,u,p,P];var wt=o(yt,2),Ut=o(r(wt),2);Ut.__input=[si,a,l,v,g,u,p,P];var Ot=o(mt,2),Nt=r(Ot);{var Pt=R=>{var it=Gh(),et=r(it),K=r(et);pa(K,{class:"w-5 h-5"});var U=o(et,2),B=r(U);Y(T=>b(B,T),[()=>y(e(a))]),m(R,it)};O(Nt,R=>{e(n)&&R(Pt)})}var ot=o(Nt,2);{var kt=R=>{var it=Wh(),et=r(it),K=r(et);Va(K,{class:"w-5 h-5"});var U=o(et,2);fe(U,20,()=>e(s).slice(0,5),B=>B,(B,T)=>{var D=qh(),F=r(D);ka(F,{class:"w-4 h-4"});var Z=o(F);Y(()=>b(Z,` ${T??""}`)),m(B,D)}),m(R,it)};O(ot,R=>{e(n)&&e(s).length>0&&R(kt)})}var q=o(ot,2),Q=o(r(q),2);fe(Q,21,()=>k,R=>R.name,(R,it)=>{var et=Vh();et.__click=[Jh,S,it];var K=r(et),U=r(K),B=o(K,2),T=r(B);Y(()=>{b(U,e(it).name),b(T,e(it).expression)}),m(R,et)});var W=o(q,2),A=r(W),I=r(A);pa(I,{class:"w-5 h-5"}),Y(()=>ge(Lt,1,`w-full px-4 py-3 rounded-lg border ${e(n)?"border-gray-300 dark:border-gray-600":"border-red-300 dark:border-red-600"} bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-mono text-lg focus:outline-none focus:ring-2 focus:ring-[var(--ds-primary-500)]`)),Tt(Lt,()=>e(a),R=>d(a,R)),Tt(L,()=>e(l),R=>d(l,R)),Tt(vt,()=>e(v),R=>d(v,R)),Tt(tt,()=>e(g),R=>d(g,R)),Tt(bt,()=>e(u),R=>d(u,R)),Tt(Ut,()=>e(p),R=>d(p,R)),m(i,N),jt()}ye(["click","input"]);function Qh(i,t,a,s){d(t,""),d(a,""),d(s,null)}function Zh(i,t,a,s){d(t,"a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e"),d(a,"a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e"),s()}function Xh(i,t,a,s){d(t,"a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e"),d(a,"b591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e"),s()}function t1(){Ee("/tools")}var e1=(i,t,a)=>t(e(a),"hash1"),r1=(i,t,a)=>t(e(a),"hash2"),a1=w('<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Comparison Details</h3> <div class="space-y-4"><div class="flex items-center justify-between"><span class="text-gray-600 dark:text-gray-400">Match Status:</span> <span> </span></div> <div class="flex items-center justify-between"><span class="text-gray-600 dark:text-gray-400">Hash 1 Length:</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div> <div class="flex items-center justify-between"><span class="text-gray-600 dark:text-gray-400">Hash 2 Length:</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div> <div class="flex items-center justify-between"><span class="text-gray-600 dark:text-gray-400">Length Match:</span> <span> </span></div></div></div>'),i1=w('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--ds-secondary-400)] to-[var(--ds-secondary-600)] rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Hash Comparer</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Compare two hash values to verify data integrity and check for matches.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Hash Comparer</li></ol></nav> <div class="mb-6 flex flex-wrap gap-4 items-center justify-center"><button class="px-4 py-2 bg-[var(--ds-success-600)] text-white rounded-lg hover:bg-[var(--ds-success-700)] transition-colors">Load Matching Hashes</button> <button class="px-4 py-2 bg-[var(--ds-danger-600)] text-white rounded-lg hover:bg-[var(--ds-danger-700)] transition-colors">Load Different Hashes</button> <button class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">Clear All</button></div> <div class="mb-6"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 text-center"><div class="flex items-center justify-center gap-3"><div><!></div> <div><h3 class="text-lg font-semibold text-gray-900 dark:text-white"> </h3> <p class="text-sm text-gray-500 dark:text-gray-400"> </p></div></div></div></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><div class="flex justify-between items-center mb-4"><h3 class="text-lg font-semibold text-gray-900 dark:text-white">Hash 1</h3> <div class="flex items-center gap-2"><span class="text-sm text-gray-500 dark:text-gray-400"> </span> <button class="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"><!></button></div></div> <textarea placeholder="Enter first hash value..." class="w-full h-32 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-[var(--ds-secondary-500)] focus:border-transparent"></textarea></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><div class="flex justify-between items-center mb-4"><h3 class="text-lg font-semibold text-gray-900 dark:text-white">Hash 2</h3> <div class="flex items-center gap-2"><span class="text-sm text-gray-500 dark:text-gray-400"> </span> <button class="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"><!></button></div></div> <textarea placeholder="Enter second hash value..." class="w-full h-32 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-[var(--ds-secondary-500)] focus:border-transparent"></textarea></div></div> <!> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Common Use Cases</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">File Integrity Check</h4> <p class="text-sm text-gray-600 dark:text-gray-400">Verify downloaded files by comparing hash values with original sources</p></div> <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">Password Verification</h4> <p class="text-sm text-gray-600 dark:text-gray-400">Compare stored password hashes with user-provided password hashes</p></div> <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">Data Deduplication</h4> <p class="text-sm text-gray-600 dark:text-gray-400">Identify duplicate files or data blocks by comparing their hash values</p></div> <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">Blockchain Verification</h4> <p class="text-sm text-gray-600 dark:text-gray-400">Validate blockchain transactions and smart contract hashes</p></div></div></div> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-[var(--ds-secondary-100)] dark:bg-[var(--ds-secondary-900)/20] rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Real-time Comparison</h3> <p class="text-gray-600 dark:text-gray-400">Instantly compare hash values as you type with automatic result updates</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-[var(--ds-secondary-100)] dark:bg-[var(--ds-secondary-900)/20] rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Easy Copy & Paste</h3> <p class="text-gray-600 dark:text-gray-400">Quickly copy hash values and paste them for seamless data verification</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-[var(--ds-secondary-100)] dark:bg-[var(--ds-secondary-900)/20] rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Detailed Analysis</h3> <p class="text-gray-600 dark:text-gray-400">Get comprehensive comparison details including length and character analysis</p></div></div></div>');function s1(i,t){It(t,!0);let a=x(""),s=x(""),n=x(null),c=x("");function l(){if(!e(a).trim()&&!e(s).trim()){d(n,"empty");return}if(!e(a).trim()||!e(s).trim()){d(n,"different");return}const U=e(a).trim().toLowerCase().replace(/\s+/g,""),B=e(s).trim().toLowerCase().replace(/\s+/g,"");d(n,U===B?"match":"different",!0)}function v(U,B){navigator.clipboard.writeText(U),d(c,B,!0),setTimeout(()=>{d(c,"")},2e3)}we(()=>{e(a)&&e(s)?l():!e(a)&&!e(s)?d(n,null):d(n,"different")});const g=ue(()=>()=>{switch(e(n)){case"match":return ma;case"different":return oo;case"empty":return He;default:return Ga}}),u=ue(()=>e(g)());function p(){switch(e(n)){case"match":return"text-[var(--ds-success-600)] bg-[var(--ds-success-100)] dark:bg-[var(--ds-success-900)/20] dark:text-[var(--ds-success-400)]";case"different":return"text-[var(--ds-danger-600)] bg-[var(--ds-danger-100)] dark:bg-[var(--ds-danger-900)/20] dark:text-[var(--ds-danger-400)]";case"empty":return"text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400";default:return"text-[var(--ds-secondary-600)] bg-[var(--ds-secondary-100)] dark:bg-[var(--ds-secondary-900)/20] dark:text-[var(--ds-secondary-400)]"}}function k(){switch(e(n)){case"match":return"Hashes Match! ✓";case"different":return"Hashes Do Not Match ✗";case"empty":return"Enter hashes to compare";default:return"Ready to compare"}}var y=i1(),h=r(y),_=r(h),$=r(_);$.__click=[t1];var M=r($);Ie(M,{class:"w-5 h-5"});var P=o(_,2),S=r(P),N=r(S);Ga(N,{class:"w-10 h-10 text-white"});var f=o(h,4),E=r(f);E.__click=[Zh,a,s,l];var C=o(E,2);C.__click=[Xh,a,s,l];var H=o(C,2);H.__click=[Qh,a,s,n];var z=o(f,2),rt=r(z),pt=r(rt),lt=r(pt),mt=r(lt);nr(mt,()=>e(u),(U,B)=>{B(U,{class:"w-6 h-6"})});var ct=o(lt,2),xt=r(ct),Rt=r(xt),Vt=o(xt,2),Kt=r(Vt),Qt=o(z,2),Wt=r(Qt),zt=r(Wt),Bt=o(r(zt),2),Lt=r(Bt),Ct=r(Lt),X=o(Lt,2);X.__click=[e1,v,a];var _t=r(X);{var ut=U=>{ma(U,{class:"w-4 h-4 text-green-600"})},at=U=>{be(U,{class:"w-4 h-4"})};O(_t,U=>{e(c)==="hash1"?U(ut):U(at,!1)})}var L=o(zt,2),ft=o(Wt,2),vt=r(ft),G=o(r(vt),2),tt=r(G),yt=r(tt),bt=o(tt,2);bt.__click=[r1,v,s];var wt=r(bt);{var Ut=U=>{ma(U,{class:"w-4 h-4 text-green-600"})},Ot=U=>{be(U,{class:"w-4 h-4"})};O(wt,U=>{e(c)==="hash2"?U(Ut):U(Ot,!1)})}var Nt=o(vt,2),Pt=o(Qt,2);{var ot=U=>{var B=a1(),T=o(r(B),2),D=r(T),F=o(r(D),2),Z=r(F),j=o(D,2),nt=o(r(j),2),Mt=r(nt),qt=o(j,2),St=o(r(qt),2),J=r(St),dt=o(qt,2),$t=o(r(dt),2),Ft=r($t);Y((V,st,ht,At)=>{ge(F,1,`font-medium ${e(n)==="match"?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400"}`),b(Z,e(n)==="match"?"✓ Identical":"✗ Different"),b(Mt,`${V??""} characters`),b(J,`${st??""} characters`),ge($t,1,`font-medium ${ht??""}`),b(Ft,At)},[()=>e(a).trim().length,()=>e(s).trim().length,()=>e(a).trim().length===e(s).trim().length?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400",()=>e(a).trim().length===e(s).trim().length?"✓ Yes":"✗ No"]),m(U,B)};O(Pt,U=>{e(n)&&e(n)!=="empty"&&U(ot)})}var kt=o(Pt,4),q=r(kt),Q=r(q),W=r(Q);Ga(W,{class:"w-6 h-6 text-[var(--ds-secondary-600)] dark:text-[var(--ds-secondary-400)]"});var A=o(q,2),I=r(A),R=r(I);be(R,{class:"w-6 h-6 text-[var(--ds-secondary-600)] dark:text-[var(--ds-secondary-400)]"});var it=o(A,2),et=r(it),K=r(et);He(K,{class:"w-6 h-6 text-[var(--ds-secondary-600)] dark:text-[var(--ds-secondary-400)]"}),Y((U,B,T,D)=>{ge(lt,1,`w-12 h-12 ${U??""} rounded-lg flex items-center justify-center`),b(Rt,B),b(Kt,e(n)==="match"?"Both hash values are identical":e(n)==="different"?"Hash values are different":"Enter two hash values to compare"),b(Ct,`${e(a).length??""} characters`),X.disabled=T,b(yt,`${e(s).length??""} characters`),bt.disabled=D},[p,k,()=>!e(a).trim(),()=>!e(s).trim()]),Tt(L,()=>e(a),U=>d(a,U)),Tt(Nt,()=>e(s),U=>d(s,U)),m(i,y),jt()}ye(["click"]);function o1(i,t,a){navigator.clipboard.writeText(e(t)),d(a,"ascii"),setTimeout(()=>{d(a,"")},2e3)}function n1(i,t,a){d(t,""),d(a,"")}function d1(i,t,a){d(t,"HELLO"),a()}function l1(){Ee("/tools")}var c1=(i,t,a)=>d(t,a(),!0),v1=w('<button><div class="text-left"><h4 class="font-medium text-gray-900 dark:text-white mb-1"> </h4> <p class="text-xs text-gray-500 dark:text-gray-400"> </p></div></button>'),g1=w("<!> Copied!",1),u1=w("<!> Copy",1),m1=w('<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><div class="flex justify-between items-center mb-4"><h3 class="text-lg font-semibold text-gray-900 dark:text-white">ASCII Art Result</h3> <div class="flex gap-2"><button class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"><!></button> <button class="px-4 py-2 bg-[var(--ds-primary-600)] text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"><!> Download</button></div></div> <div class="relative"><pre class="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg font-mono text-sm text-gray-900 dark:text-white overflow-x-auto whitespace-pre"> </pre></div></div>'),p1=w(`<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--ds-primary-400)] to-[var(--ds-primary-600)] rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">ASCII Art Generator</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Convert text into ASCII art with different styles. Perfect for terminal displays and
        creative text art.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">ASCII Art Generator</li></ol></nav> <div class="mb-6 flex flex-wrap gap-4 items-center justify-center"><button class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">Load Sample Text</button> <button class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">Clear All</button></div> <div class="mb-6"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Art Style</h3> <div class="grid grid-cols-1 md:grid-cols-3 gap-4"></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><div class="flex justify-between items-center mb-4"><h3 class="text-lg font-semibold text-gray-900 dark:text-white">Input Text</h3> <span class="text-sm text-gray-500 dark:text-gray-400"> </span></div> <input type="text" placeholder="Enter text to convert to ASCII art..." class="w-full p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--ds-primary-500)] focus:border-transparent"/> <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">Maximum 10 characters recommended for best results. Supports letters, numbers, and basic
      punctuation.</p></div> <!> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Supported Characters</h3> <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"><div class="text-sm"><span class="font-medium text-gray-900 dark:text-white">Letters:</span> <span class="text-gray-600 dark:text-gray-400">A-Z</span></div> <div class="text-sm"><span class="font-medium text-gray-900 dark:text-white">Numbers:</span> <span class="text-gray-600 dark:text-gray-400">0-9</span></div> <div class="text-sm"><span class="font-medium text-gray-900 dark:text-white">Punctuation:</span> <span class="text-gray-600 dark:text-gray-400">! ? . ,</span></div> <div class="text-sm"><span class="font-medium text-gray-900 dark:text-white">Space:</span> <span class="text-gray-600 dark:text-gray-400">Supported</span></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Usage Tips</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">Best Practices</h4> <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1"><li>• Keep text short (under 10 characters)</li> <li>• Use uppercase letters for better results</li> <li>• Experiment with different styles</li> <li>• Works great in terminal applications</li></ul></div> <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">Common Uses</h4> <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1"><li>• Terminal splash screens</li> <li>• Code comments and signatures</li> <li>• Social media bio text</li> <li>• Email signatures and greetings</li></ul></div></div></div> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Multiple Styles</h3> <p class="text-gray-600 dark:text-gray-400">Choose from standard, block, and simple ASCII art styles for different use cases</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Real-time Preview</h3> <p class="text-gray-600 dark:text-gray-400">See your ASCII art generated instantly as you type with automatic updates</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-[var(--ds-primary-100)] dark:bg-[var(--ds-primary-900)/20] rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Easy Export</h3> <p class="text-gray-600 dark:text-gray-400">Copy to clipboard or download your ASCII art as a text file for easy sharing</p></div></div></div>`);function x1(i,t){It(t,!0);let a=x(""),s=x(""),n=x("standard"),c=x("");const l={standard:{name:"Standard",chars:{A:`  #  
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
|__/`}}};function v(){if(!e(a).trim()){d(s,"");return}const X=e(a).toUpperCase(),_t=l[e(n)],ut=[];for(let at=0;at<5;at++){let L="";for(let ft=0;ft<X.length;ft++){const vt=X[ft];if(_t.chars[vt]){const G=_t.chars[vt].split(`
`);G[at]?L+=G[at]+" ":L+=" ".repeat(6)+" "}else L+=" ".repeat(6)+" "}ut.push(L.trimEnd())}d(s,ut.join(`
`),!0)}function g(){const X=new Blob([e(s)],{type:"text/plain"}),_t=URL.createObjectURL(X),ut=document.createElement("a");ut.href=_t,ut.download="ascii-art.txt",ut.click(),URL.revokeObjectURL(_t)}we(()=>{v()});var u=p1(),p=r(u),k=r(p),y=r(k);y.__click=[l1];var h=r(y);Ie(h,{class:"w-5 h-5"});var _=o(k,2),$=r(_),M=r($);q0(M,{class:"w-10 h-10 text-white"});var P=o(p,4),S=r(P);S.__click=[d1,a,v];var N=o(S,2);N.__click=[n1,a,s];var f=o(P,2),E=r(f),C=o(r(E),2);fe(C,21,()=>Object.entries(l),Mr,(X,_t)=>{var ut=ue(()=>Qa(e(_t),2));let at=()=>e(ut)[0],L=()=>e(ut)[1];var ft=v1();ft.__click=[c1,n,at];var vt=r(ft),G=r(vt),tt=r(G),yt=o(G,2),bt=r(yt);Y(()=>{ge(ft,1,`p-4 border-2 rounded-lg transition-all ${e(n)===at()?"border-purple-500 bg-purple-50 dark:bg-purple-900/20":"border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"}`),b(tt,L().name),b(bt,at()==="standard"?"Classic ASCII style with standard characters":at()==="block"?"Bold block style using full Unicode blocks":"Minimal style using basic ASCII characters")}),m(X,ft)});var H=o(f,2),z=r(H),rt=o(r(z),2),pt=r(rt),lt=o(z,2);Dt(lt,"maxlength",10);var mt=o(H,2);{var ct=X=>{var _t=m1(),ut=r(_t),at=o(r(ut),2),L=r(at);L.__click=[o1,s,c];var ft=r(L);{var vt=Ot=>{var Nt=g1(),Pt=gt(Nt);ma(Pt,{class:"w-4 h-4"}),m(Ot,Nt)},G=Ot=>{var Nt=u1(),Pt=gt(Nt);be(Pt,{class:"w-4 h-4"}),m(Ot,Nt)};O(ft,Ot=>{e(c)==="ascii"?Ot(vt):Ot(G,!1)})}var tt=o(L,2);tt.__click=g;var yt=r(tt);Xa(yt,{class:"w-4 h-4"});var bt=o(ut,2),wt=r(bt),Ut=r(wt);Y(()=>b(Ut,e(s))),m(X,_t)};O(mt,X=>{e(s)&&X(ct)})}var xt=o(mt,6),Rt=r(xt),Vt=r(Rt),Kt=r(Vt);fa(Kt,{class:"w-6 h-6 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"});var Qt=o(Rt,2),Wt=r(Qt),zt=r(Wt);Ve(zt,{class:"w-6 h-6 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"});var Bt=o(Qt,2),Lt=r(Bt),Ct=r(Lt);Kr(Ct,{class:"w-6 h-6 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"}),Y(()=>b(pt,`${e(a).length??""} characters`)),Tt(lt,()=>e(a),X=>d(a,X)),m(i,u),jt()}ye(["click"]);const f1=[{path:"/tools",component:Ug,title:"Developer Tools - Fariz",description:"Free online developer tools and utilities. JSON parser, color converter, URL encoder, and more productivity tools for developers.",keywords:"developer tools, online tools, web tools, json parser, color converter, url encoder, productivity tools",robots:"index, follow"},{path:"/tools/json-parser",component:Zg,title:"JSON Parser - Fariz"},{path:"/tools/color-converter",component:mu,title:"Color Converter - Fariz"},{path:"/tools/url-encoder",component:Ou,title:"URL Encoder/Decoder - Fariz"},{path:"/tools/markdown-preview",component:Vu,title:"Markdown Preview - Fariz"},{path:"/tools/base64-converter",component:xm,title:"Base64 Converter - Fariz"},{path:"/tools/password-generator",component:Lm,title:"Password Generator - Fariz"},{path:"/tools/qr-code-generator",component:vp,title:"QR Code Generator - Fariz"},{path:"/tools/text-case-converter",component:Sp,title:"Text Case Converter - Fariz"},{path:"/tools/lorem-ipsum-generator",component:Lp,title:"Lorem Ipsum Generator - Fariz"},{path:"/tools/character-counter",component:qp,title:"Character Counter - Fariz"},{path:"/tools/text-diff",component:nx,title:"Text Diff Tool - Fariz"},{path:"/tools/url-parser",component:Tx,title:"URL Parser/Analyzer - Fariz"},{path:"/tools/css-minifier",component:Dx,title:"CSS Minifier/Beautifier - Fariz"},{path:"/tools/js-minifier",component:Kx,title:"JavaScript Minifier/Beautifier - Fariz"},{path:"/tools/html-encoder",component:vf,title:"HTML Entity Encoder/Decoder - Fariz"},{path:"/tools/slug-generator",component:yf,title:"URL Slug Generator - Fariz"},{path:"/tools/color-palette",component:Mf,title:"Color Palette Generator - Fariz"},{path:"/tools/gradient-generator",component:Hf,title:"CSS Gradient Generator - Fariz"},{path:"/tools/hash-generator",component:Vf,title:"Hash Generator - Fariz"},{path:"/tools/jwt-decoder",component:xb,title:"JWT Decoder - Fariz"},{path:"/tools/tip-calculator",component:Pb,title:"Tip Calculator - Fariz"},{path:"/tools/timestamp-converter",component:Ob,title:"Unix Timestamp Converter - Fariz"},{path:"/tools/meta-tag-generator",component:ay,title:"Meta Tag Generator - Fariz"},{path:"/tools/css-shadow-generator",component:Py,title:"CSS Shadow Generator - Fariz"},{path:"/tools/unit-converter",component:Ky,title:"Unit Converter - Fariz"},{path:"/tools/percentage-calculator",component:I2,title:"Percentage Calculator - Fariz"},{path:"/tools/bmi-calculator",component:V2,title:"BMI Calculator - Fariz"},{path:"/tools/age-calculator",component:ch,title:"Age Calculator - Fariz"},{path:"/tools/random-picker",component:Rh,title:"Random Picker - Fariz"},{path:"/tools/cron-generator",component:Kh,title:"Cron Expression Generator - Fariz"},{path:"/tools/hash-comparer",component:s1,title:"Hash Comparer - Fariz"},{path:"/tools/ascii-art-generator",component:x1,title:"ASCII Art Generator - Fariz"}],b1=[...Lg,...f1],y1=(i,t)=>{d(t,!0)};var h1=w('<div class="min-h-screen flex flex-col justify-between relative bg-[var(--ds-secondary-50)] dark:bg-[var(--ds-secondary-900)] transition-colors duration-300"><!> <!> <div class="flex-1 pt-[72px]"><div class="container mx-auto px-4 sm:px-6 lg:px-8"><!></div></div> <footer class="flex justify-center items-center text-[var(--ds-secondary-600)] dark:text-[var(--ds-secondary-400)] py-8 mt-12 border-t border-[var(--ds-secondary-200)] dark:border-[var(--ds-secondary-800)] bg-white/50 dark:bg-black/20 backdrop-blur-sm">Made with <button type="button" class="hover:cursor-pointer hover:scale-110 transition-transform duration-200"><!></button> in Surabaya.</footer></div> <!> <!>',1);function _1(i,t){It(t,!0);let a=x(!1);qr(()=>{const S=localStorage.getItem("theme"),N=window.matchMedia("(prefers-color-scheme: dark)").matches;d(a,S==="dark"||!S&&N,!0);const f=()=>{const C=localStorage.getItem("theme");d(a,C==="dark"||!C&&window.matchMedia("(prefers-color-scheme: dark)").matches,!0)};window.addEventListener("storage",f),window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",f);const E=new MutationObserver(()=>{d(a,document.documentElement.classList.contains("dark"),!0)});return E.observe(document.documentElement,{attributes:!0,attributeFilter:["class"]}),()=>{window.removeEventListener("storage",f),window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change",f),E.disconnect()}});const s=b1;let n=x(!1);const c=()=>{d(n,!1)};qr(()=>{$0(s)});var l=h1(),v=gt(l),g=r(v);bc(g,{});var u=o(g,2);xc(u,{});var p=o(u,2),k=r(p),y=r(k);A0(y,{});var h=o(p,2),_=o(r(h));_.__click=[y1,n];var $=r(_);hc($,{class:"w-5 h-5 mx-1 text-rose-600"});var M=o(v,2);Ic(M,{get isOpen(){return e(n)},onClose:c,maxW:"max-w-2xl",children:(S,N)=>{Sc(S)},$$slots:{default:!0}});var P=o(M,2);{let S=ue(()=>e(a)?"dark":"light");Lv(P,{position:"top-center",get theme(){return e(S)}})}m(i,l),jt()}ye(["click"]);const Ed=document.getElementById("app");if(!Ed)throw new Error("Could not find app element");a0(_1,{target:Ed});
