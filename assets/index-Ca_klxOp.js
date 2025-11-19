(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const c of s)if(c.type==="childList")for(const l of c.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function a(s){const c={};return s.integrity&&(c.integrity=s.integrity),s.referrerPolicy&&(c.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?c.credentials="include":s.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function o(s){if(s.ep)return;s.ep=!0;const c=a(s);fetch(s.href,c)}})();const Fd="5";typeof window<"u"&&((window.__svelte??={}).v??=new Set).add(Fd);const Ni=1,Ri=2,bs=4,Hd=8,Od=16,Ud=1,zd=4,qd=8,Gd=16,Wd=4,Jd=1,Vd=2,Ke=Symbol(),Yd="http://www.w3.org/1999/xhtml",Kd="http://www.w3.org/2000/svg",Qd="@attach",ys=!1;var Bi=Array.isArray,Zd=Array.prototype.indexOf,qo=Array.from,Io=Object.defineProperty,va=Object.getOwnPropertyDescriptor,Xd=Object.getOwnPropertyDescriptors,tl=Object.prototype,el=Array.prototype,hs=Object.getPrototypeOf,un=Object.isExtensible;function Ha(i){return typeof i=="function"}const Zt=()=>{};function _s(i){for(var t=0;t<i.length;t++)i[t]()}function rl(){var i,t,a=new Promise((o,s)=>{i=o,t=s});return{promise:a,resolve:i,reject:t}}function Qa(i,t){if(Array.isArray(i))return i;if(t===void 0||!(Symbol.iterator in i))return Array.from(i);const a=[];for(const o of i)if(a.push(o),a.length===t)break;return a}const hr=2,Go=4,Wo=8,Ta=16,Xr=32,Ma=64,ks=128,Sr=256,$i=512,er=1024,Mr=2048,ba=4096,Rr=8192,Ea=16384,Di=32768,La=65536,mn=1<<17,ws=1<<18,mi=1<<19,al=1<<20,jo=1<<21,Jo=1<<22,wa=1<<23,ga=Symbol("$state"),Cs=Symbol("legacy props"),il=Symbol(""),Vo=new class extends Error{name="StaleReactionError";message="The reaction that called `getAbortSignal()` was re-run or destroyed"};function ol(){throw new Error("https://svelte.dev/e/await_outside_boundary")}function Yo(i){throw new Error("https://svelte.dev/e/lifecycle_outside_component")}function nl(){throw new Error("https://svelte.dev/e/async_derived_orphan")}function sl(i){throw new Error("https://svelte.dev/e/effect_in_teardown")}function dl(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function ll(i){throw new Error("https://svelte.dev/e/effect_orphan")}function cl(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function vl(i){throw new Error("https://svelte.dev/e/props_invalid_value")}function gl(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function ul(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function ml(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}function pl(){console.warn("https://svelte.dev/e/select_multiple_invalid_value")}let fl=!1;function $s(i){return i===this.v}function Ss(i,t){return i!=i?t==t:i!==t||i!==null&&typeof i=="object"||typeof i=="function"}function Ts(i){return!Ss(i,this.v)}let xl=!1,rr=null;function Si(i){rr=i}function pn(i){return Ko().get(i)}function bl(i,t){return Ko().set(i,t),t}function yl(i){return Ko().has(i)}function Rt(i,t=!1,a){rr={p:rr,c:null,e:null,s:i,x:null,l:null}}function Bt(i){var t=rr,a=t.e;if(a!==null){t.e=null;for(var o of a)Us(o)}return rr=t.p,{}}function Ms(){return!0}function Ko(i){return rr===null&&Yo(),rr.c??=new Map(hl(rr)||void 0)}function hl(i){let t=i.p;for(;t!==null;){const a=t.c;if(a!==null)return a;t=t.p}return null}const _l=new WeakMap;function kl(i){var t=$e;if(t===null)return Ee.f|=wa,i;if((t.f&Di)===0){if((t.f&ks)===0)throw!t.parent&&i instanceof Error&&Es(i),i;t.b.error(i)}else Qo(i,t)}function Qo(i,t){for(;t!==null;){if((t.f&ks)!==0)try{t.b.error(i);return}catch(a){i=a}t=t.parent}throw i instanceof Error&&Es(i),i}function Es(i){const t=_l.get(i);t&&(Io(i,"message",{value:t.message}),Io(i,"stack",{value:t.stack}))}let da=[],Ti=[];function Ls(){var i=da;da=[],_s(i)}function wl(){var i=Ti;Ti=[],_s(i)}function Cl(){return da.length>0||Ti.length>0}function Zr(i){if(da.length===0&&!si){var t=da;queueMicrotask(()=>{t===da&&Ls()})}da.push(i)}function $l(){da.length>0&&Ls(),Ti.length>0&&wl()}function Sl(i){let t=0,a=Ja(0),o;return()=>{Hl()&&(e(a),fi(()=>(t===0&&(o=dr(()=>i(()=>di(a)))),t+=1,()=>{Zr(()=>{t-=1,t===0&&(o?.(),o=void 0,di(a))})})))}}function Tl(){const i=$e.b;return i===null&&ol(),i}function Fi(i){var t=hr|Mr,a=Ee!==null&&(Ee.f&hr)!==0?Ee:null;return $e===null||a!==null&&(a.f&Sr)!==0?t|=Sr:$e.f|=mi,{ctx:rr,deps:null,effects:null,equals:$s,f:t,fn:i,reactions:null,rv:0,v:Ke,wv:0,parent:a??$e,ac:null}}function Ml(i,t){let a=$e;a===null&&nl();var o=a.b,s=void 0,c=Ja(Ke),l=null,v=!Ee;return Ul(()=>{try{var g=i();l&&Promise.resolve(g).catch(()=>{})}catch(x){g=Promise.reject(x)}var u=()=>g;s=l?.then(u,u)??Promise.resolve(g),l=s;var p=Fe,h=o.is_pending();v&&(o.update_pending_count(1),h||p.increment());const b=(x,w=void 0)=>{l=null,h||p.activate(),w?w!==Vo&&(c.f|=wa,ci(c,w)):((c.f&wa)!==0&&(c.f^=wa),ci(c,x)),v&&(o.update_pending_count(-1),h||p.decrement()),Ns()};if(s.then(b,x=>b(null,x||"unknown")),p)return()=>{queueMicrotask(()=>p.neuter())}}),new Promise(g=>{function u(p){function h(){p===s?g(c):u(s)}p.then(h,h)}u(s)})}function ue(i){const t=Fi(i);return Ys(t),t}function Ps(i){const t=Fi(i);return t.equals=Ts,t}function As(i){var t=i.effects;if(t!==null){i.effects=null;for(var a=0;a<t.length;a+=1)gr(t[a])}}function El(i){for(var t=i.parent;t!==null;){if((t.f&hr)===0)return t;t=t.parent}return null}function Zo(i){var t,a=$e;fa(El(i));try{As(i),t=Xs(i)}finally{fa(a)}return t}function Is(i){var t=Zo(i);if(i.equals(t)||(i.v=t,i.wv=Qs()),!Pa){var a=(la||(i.f&Sr)!==0)&&i.deps!==null?ba:er;vr(i,a)}}function js(i,t,a){const o=Fi;if(t.length===0){a(i.map(o));return}var s=Fe,c=$e,l=Ll(),v=Tl();Promise.all(t.map(g=>Ml(g))).then(g=>{s?.activate(),l();try{a([...i.map(o),...g])}catch(u){(c.f&Ea)===0&&Qo(u,c)}s?.deactivate(),Ns()}).catch(g=>{v.error(g)})}function Ll(){var i=$e,t=Ee,a=rr,o=Fe;return function(){fa(i),zr(t),Si(a),o?.activate()}}function Ns(){fa(null),zr(null),Si(null)}const Zi=new Set;let Fe=null,wi=null,fn=new Set,$a=[],Hi=null,No=!1,si=!1;class Ga{current=new Map;#e=new Map;#t=new Set;#r=0;#l=null;#c=!1;#i=[];#n=[];#o=[];#a=[];#s=[];#v=[];#g=[];skipped_effects=new Set;process(t){$a=[],wi=null;for(const s of t)this.#m(s);if(this.#i.length===0&&this.#r===0){this.#u();var a=this.#o,o=this.#a;this.#o=[],this.#a=[],this.#s=[],wi=Fe,Fe=null,xn(a),xn(o),Fe===null?Fe=this:Zi.delete(this),this.#l?.resolve()}else this.#d(this.#o),this.#d(this.#a),this.#d(this.#s);for(const s of this.#i)za(s);for(const s of this.#n)za(s);this.#i=[],this.#n=[]}#m(t){t.f^=er;for(var a=t.first;a!==null;){var o=a.f,s=(o&(Xr|Ma))!==0,c=s&&(o&er)!==0,l=c||(o&Rr)!==0||this.skipped_effects.has(a);if(!l&&a.fn!==null){if(s)a.f^=er;else if((o&Go)!==0)this.#a.push(a);else if((o&er)===0)if((o&Jo)!==0){var v=a.b?.is_pending()?this.#n:this.#i;v.push(a)}else qi(a)&&((a.f&Ta)!==0&&this.#s.push(a),za(a));var g=a.first;if(g!==null){a=g;continue}}var u=a.parent;for(a=a.next;a===null&&u!==null;)a=u.next,u=u.parent}}#d(t){for(const a of t)((a.f&Mr)!==0?this.#v:this.#g).push(a),vr(a,er);t.length=0}capture(t,a){this.#e.has(t)||this.#e.set(t,a),this.current.set(t,t.v)}activate(){Fe=this}deactivate(){Fe=null,wi=null;for(const t of fn)if(fn.delete(t),t(),Fe!==null)break}neuter(){this.#c=!0}flush(){$a.length>0?Rs():this.#u(),Fe===this&&(this.#r===0&&Zi.delete(this),this.deactivate())}#u(){if(!this.#c)for(const t of this.#t)t();this.#t.clear()}increment(){this.#r+=1}decrement(){if(this.#r-=1,this.#r===0){for(const t of this.#v)vr(t,Mr),Wa(t);for(const t of this.#g)vr(t,ba),Wa(t);this.#o=[],this.#a=[],this.flush()}else this.deactivate()}add_callback(t){this.#t.add(t)}settled(){return(this.#l??=rl()).promise}static ensure(){if(Fe===null){const t=Fe=new Ga;Zi.add(Fe),si||Ga.enqueue(()=>{Fe===t&&t.flush()})}return Fe}static enqueue(t){Zr(t)}}function Pl(i){var t=si;si=!0;try{for(var a;;){if($l(),$a.length===0&&!Cl()&&(Fe?.flush(),$a.length===0))return Hi=null,a;Rs()}}finally{si=t}}function Rs(){var i=Ua;No=!0;try{var t=0;for(_n(!0);$a.length>0;){var a=Ga.ensure();if(t++>1e3){var o,s;Al()}a.process($a),ua.clear()}}finally{No=!1,_n(i),Hi=null}}function Al(){try{cl()}catch(i){Qo(i,Hi)}}let _a=null;function xn(i){var t=i.length;if(t!==0){for(var a=0;a<t;){var o=i[a++];if((o.f&(Ea|Rr))===0&&qi(o)&&(_a=[],za(o),o.deps===null&&o.first===null&&o.nodes_start===null&&(o.teardown===null&&o.ac===null?Ws(o):o.fn=null),_a?.length>0)){ua.clear();for(const s of _a)za(s);_a=[]}}_a=null}}function Wa(i){for(var t=Hi=i;t.parent!==null;){t=t.parent;var a=t.f;if(No&&t===$e&&(a&Ta)!==0)return;if((a&(Ma|Xr))!==0){if((a&er)===0)return;t.f^=er}}$a.push(t)}const ua=new Map;function Ja(i,t){var a={f:0,v:i,reactions:null,equals:$s,rv:0,wv:0};return a}function f(i,t){const a=Ja(i);return Ys(a),a}function Il(i,t=!1,a=!0){const o=Ja(i);return t||(o.equals=Ts),o}function d(i,t,a=!1){Ee!==null&&(!jr||(Ee.f&mn)!==0)&&Ms()&&(Ee.f&(hr|Ta|Jo|mn))!==0&&!Kr?.includes(i)&&ml();let o=a?Pe(t):t;return ci(i,o)}function ci(i,t){if(!i.equals(t)){var a=i.v;Pa?ua.set(i,t):ua.set(i,a),i.v=t;var o=Ga.ensure();o.capture(i,a),(i.f&hr)!==0&&((i.f&Mr)!==0&&Zo(i),vr(i,(i.f&Sr)===0?er:ba)),i.wv=Qs(),Bs(i,Mr),$e!==null&&($e.f&er)!==0&&($e.f&(Xr|Ma))===0&&($r===null?ql([i]):$r.push(i))}return t}function di(i){d(i,i.v+1)}function Bs(i,t){var a=i.reactions;if(a!==null)for(var o=a.length,s=0;s<o;s++){var c=a[s],l=c.f,v=(l&Mr)===0;v&&vr(c,t),(l&hr)!==0?Bs(c,ba):v&&((l&Ta)!==0&&_a!==null&&_a.push(c),Wa(c))}}function Pe(i){if(typeof i!="object"||i===null||ga in i)return i;const t=hs(i);if(t!==tl&&t!==el)return i;var a=new Map,o=Bi(i),s=f(0),c=Ca,l=v=>{if(Ca===c)return v();var g=Ee,u=Ca;zr(null),wn(c);var p=v();return zr(g),wn(u),p};return o&&a.set("length",f(i.length)),new Proxy(i,{defineProperty(v,g,u){(!("value"in u)||u.configurable===!1||u.enumerable===!1||u.writable===!1)&&gl();var p=a.get(g);return p===void 0?p=l(()=>{var h=f(u.value);return a.set(g,h),h}):d(p,u.value,!0),!0},deleteProperty(v,g){var u=a.get(g);if(u===void 0){if(g in v){const p=l(()=>f(Ke));a.set(g,p),di(s)}}else d(u,Ke),di(s);return!0},get(v,g,u){if(g===ga)return i;var p=a.get(g),h=g in v;if(p===void 0&&(!h||va(v,g)?.writable)&&(p=l(()=>{var x=Pe(h?v[g]:Ke),w=f(x);return w}),a.set(g,p)),p!==void 0){var b=e(p);return b===Ke?void 0:b}return Reflect.get(v,g,u)},getOwnPropertyDescriptor(v,g){var u=Reflect.getOwnPropertyDescriptor(v,g);if(u&&"value"in u){var p=a.get(g);p&&(u.value=e(p))}else if(u===void 0){var h=a.get(g),b=h?.v;if(h!==void 0&&b!==Ke)return{enumerable:!0,configurable:!0,value:b,writable:!0}}return u},has(v,g){if(g===ga)return!0;var u=a.get(g),p=u!==void 0&&u.v!==Ke||Reflect.has(v,g);if(u!==void 0||$e!==null&&(!p||va(v,g)?.writable)){u===void 0&&(u=l(()=>{var b=p?Pe(v[g]):Ke,x=f(b);return x}),a.set(g,u));var h=e(u);if(h===Ke)return!1}return p},set(v,g,u,p){var h=a.get(g),b=g in v;if(o&&g==="length")for(var x=u;x<h.v;x+=1){var w=a.get(x+"");w!==void 0?d(w,Ke):x in v&&(w=l(()=>f(Ke)),a.set(x+"",w))}if(h===void 0)(!b||va(v,g)?.writable)&&(h=l(()=>f(void 0)),d(h,Pe(u)),a.set(g,h));else{b=h.v!==Ke;var S=l(()=>Pe(u));d(h,S)}var R=Reflect.getOwnPropertyDescriptor(v,g);if(R?.set&&R.set.call(p,u),!b){if(o&&typeof g=="string"){var C=a.get("length"),T=Number(g);Number.isInteger(T)&&T>=C.v&&d(C,T+1)}di(s)}return!0},ownKeys(v){e(s);var g=Reflect.ownKeys(v).filter(h=>{var b=a.get(h);return b===void 0||b.v!==Ke});for(var[u,p]of a)p.v!==Ke&&!(u in v)&&g.push(u);return g},setPrototypeOf(){ul()}})}function bn(i){try{if(i!==null&&typeof i=="object"&&ga in i)return i[ga]}catch{}return i}function Ds(i,t){return Object.is(bn(i),bn(t))}var yn,_r,Fs,Hs,Os;function jl(){if(yn===void 0){yn=window,_r=document,Fs=/Firefox/.test(navigator.userAgent);var i=Element.prototype,t=Node.prototype,a=Text.prototype;Hs=va(t,"firstChild").get,Os=va(t,"nextSibling").get,un(i)&&(i.__click=void 0,i.__className=void 0,i.__attributes=null,i.__style=void 0,i.__e=void 0),un(a)&&(a.__t=void 0)}}function ta(i=""){return document.createTextNode(i)}function Or(i){return Hs.call(i)}function Oi(i){return Os.call(i)}function r(i,t){return Or(i)}function ut(i,t){{var a=Or(i);return a instanceof Comment&&a.data===""?Oi(a):a}}function n(i,t=1,a=!1){let o=i;for(;t--;)o=Oi(o);return o}function Nl(i){i.textContent=""}function Xo(){return!1}function Rl(i,t){if(t){const a=document.body;i.autofocus=!0,Zr(()=>{document.activeElement===a&&i.focus()})}}let hn=!1;function Bl(){hn||(hn=!0,document.addEventListener("reset",i=>{Promise.resolve().then(()=>{if(!i.defaultPrevented)for(const t of i.target.elements)t.__on_r?.()})},{capture:!0}))}function Za(i){var t=Ee,a=$e;zr(null),fa(null);try{return i()}finally{zr(t),fa(a)}}function Ui(i,t,a,o=a){i.addEventListener(t,()=>Za(a));const s=i.__on_r;s?i.__on_r=()=>{s(),o(!0)}:i.__on_r=()=>o(!0),Bl()}function Dl(i){$e===null&&Ee===null&&ll(),Ee!==null&&(Ee.f&Sr)!==0&&$e===null&&dl(),Pa&&sl()}function Fl(i,t){var a=t.last;a===null?t.last=t.first=i:(a.next=i,i.prev=a,t.last=i)}function ea(i,t,a,o=!0){var s=$e;s!==null&&(s.f&Rr)!==0&&(i|=Rr);var c={ctx:rr,deps:null,nodes_start:null,nodes_end:null,f:i|Mr,first:null,fn:t,last:null,next:null,parent:s,b:s&&s.b,prev:null,teardown:null,transitions:null,wv:0,ac:null};if(a)try{za(c),c.f|=Di}catch(g){throw gr(c),g}else t!==null&&Wa(c);if(o){var l=c;if(a&&l.deps===null&&l.teardown===null&&l.nodes_start===null&&l.first===l.last&&(l.f&mi)===0&&(l=l.first),l!==null&&(l.parent=s,s!==null&&Fl(l,s),Ee!==null&&(Ee.f&hr)!==0&&(i&Ma)===0)){var v=Ee;(v.effects??=[]).push(l)}}return c}function Hl(){return Ee!==null&&!jr}function tn(i){const t=ea(Wo,null,!1);return vr(t,er),t.teardown=i,t}function ke(i){Dl();var t=$e.f,a=!Ee&&(t&Xr)!==0&&(t&Di)===0;if(a){var o=rr;(o.e??=[]).push(i)}else return Us(i)}function Us(i){return ea(Go|al,i,!1)}function Ol(i){Ga.ensure();const t=ea(Ma|mi,i,!0);return(a={})=>new Promise(o=>{a.outro?xi(t,()=>{gr(t),o(void 0)}):(gr(t),o(void 0))})}function pi(i){return ea(Go,i,!1)}function Ul(i){return ea(Jo|mi,i,!0)}function fi(i,t=0){return ea(Wo|t,i,!0)}function K(i,t=[],a=[]){js(t,a,o=>{ea(Wo,()=>i(...o.map(e)),!0)})}function ya(i,t=0){var a=ea(Ta|t,i,!0);return a}function Ur(i,t=!0){return ea(Xr|mi,i,!0,t)}function zs(i){var t=i.teardown;if(t!==null){const a=Pa,o=Ee;kn(!0),zr(null);try{t.call(null)}finally{kn(a),zr(o)}}}function qs(i,t=!1){var a=i.first;for(i.first=i.last=null;a!==null;){const s=a.ac;s!==null&&Za(()=>{s.abort(Vo)});var o=a.next;(a.f&Ma)!==0?a.parent=null:gr(a,t),a=o}}function zl(i){for(var t=i.first;t!==null;){var a=t.next;(t.f&Xr)===0&&gr(t),t=a}}function gr(i,t=!0){var a=!1;(t||(i.f&ws)!==0)&&i.nodes_start!==null&&i.nodes_end!==null&&(Gs(i.nodes_start,i.nodes_end),a=!0),qs(i,t&&!a),Mi(i,0),vr(i,Ea);var o=i.transitions;if(o!==null)for(const c of o)c.stop();zs(i);var s=i.parent;s!==null&&s.first!==null&&Ws(i),i.next=i.prev=i.teardown=i.ctx=i.deps=i.fn=i.nodes_start=i.nodes_end=i.ac=null}function Gs(i,t){for(;i!==null;){var a=i===t?null:Oi(i);i.remove(),i=a}}function Ws(i){var t=i.parent,a=i.prev,o=i.next;a!==null&&(a.next=o),o!==null&&(o.prev=a),t!==null&&(t.first===i&&(t.first=o),t.last===i&&(t.last=a))}function xi(i,t){var a=[];en(i,a,!0),Js(a,()=>{gr(i),t&&t()})}function Js(i,t){var a=i.length;if(a>0){var o=()=>--a||t();for(var s of i)s.out(o)}else t()}function en(i,t,a){if((i.f&Rr)===0){if(i.f^=Rr,i.transitions!==null)for(const l of i.transitions)(l.is_global||a)&&t.push(l);for(var o=i.first;o!==null;){var s=o.next,c=(o.f&La)!==0||(o.f&Xr)!==0;en(o,t,c?a:!1),o=s}}}function zi(i){Vs(i,!0)}function Vs(i,t){if((i.f&Rr)!==0){i.f^=Rr,(i.f&er)===0&&(vr(i,Mr),Wa(i));for(var a=i.first;a!==null;){var o=a.next,s=(a.f&La)!==0||(a.f&Xr)!==0;Vs(a,s?t:!1),a=o}if(i.transitions!==null)for(const c of i.transitions)(c.is_global||t)&&c.in()}}let Ua=!1;function _n(i){Ua=i}let Pa=!1;function kn(i){Pa=i}let Ee=null,jr=!1;function zr(i){Ee=i}let $e=null;function fa(i){$e=i}let Kr=null;function Ys(i){Ee!==null&&(Kr===null?Kr=[i]:Kr.push(i))}let nr=null,yr=0,$r=null;function ql(i){$r=i}let Ks=1,vi=0,Ca=vi;function wn(i){Ca=i}let la=!1;function Qs(){return++Ks}function qi(i){var t=i.f;if((t&Mr)!==0)return!0;if((t&ba)!==0){var a=i.deps,o=(t&Sr)!==0;if(a!==null){var s,c,l=(t&$i)!==0,v=o&&$e!==null&&!la,g=a.length;if((l||v)&&($e===null||($e.f&Ea)===0)){var u=i,p=u.parent;for(s=0;s<g;s++)c=a[s],(l||!c?.reactions?.includes(u))&&(c.reactions??=[]).push(u);l&&(u.f^=$i),v&&p!==null&&(p.f&Sr)===0&&(u.f^=Sr)}for(s=0;s<g;s++)if(c=a[s],qi(c)&&Is(c),c.wv>i.wv)return!0}(!o||$e!==null&&!la)&&vr(i,er)}return!1}function Zs(i,t,a=!0){var o=i.reactions;if(o!==null&&!Kr?.includes(i))for(var s=0;s<o.length;s++){var c=o[s];(c.f&hr)!==0?Zs(c,t,!1):t===c&&(a?vr(c,Mr):(c.f&er)!==0&&vr(c,ba),Wa(c))}}function Xs(i){var t=nr,a=yr,o=$r,s=Ee,c=la,l=Kr,v=rr,g=jr,u=Ca,p=i.f;nr=null,yr=0,$r=null,la=(p&Sr)!==0&&(jr||!Ua||Ee===null),Ee=(p&(Xr|Ma))===0?i:null,Kr=null,Si(i.ctx),jr=!1,Ca=++vi,i.ac!==null&&(Za(()=>{i.ac.abort(Vo)}),i.ac=null);try{i.f|=jo;var h=i.fn,b=h(),x=i.deps;if(nr!==null){var w;if(Mi(i,yr),x!==null&&yr>0)for(x.length=yr+nr.length,w=0;w<nr.length;w++)x[yr+w]=nr[w];else i.deps=x=nr;if(!la||(p&hr)!==0&&i.reactions!==null)for(w=yr;w<x.length;w++)(x[w].reactions??=[]).push(i)}else x!==null&&yr<x.length&&(Mi(i,yr),x.length=yr);if(Ms()&&$r!==null&&!jr&&x!==null&&(i.f&(hr|ba|Mr))===0)for(w=0;w<$r.length;w++)Zs($r[w],i);return s!==null&&s!==i&&(vi++,$r!==null&&(o===null?o=$r:o.push(...$r))),(i.f&wa)!==0&&(i.f^=wa),b}catch(S){return kl(S)}finally{i.f^=jo,nr=t,yr=a,$r=o,Ee=s,la=c,Kr=l,Si(v),jr=g,Ca=u}}function Gl(i,t){let a=t.reactions;if(a!==null){var o=Zd.call(a,i);if(o!==-1){var s=a.length-1;s===0?a=t.reactions=null:(a[o]=a[s],a.pop())}}a===null&&(t.f&hr)!==0&&(nr===null||!nr.includes(t))&&(vr(t,ba),(t.f&(Sr|$i))===0&&(t.f^=$i),As(t),Mi(t,0))}function Mi(i,t){var a=i.deps;if(a!==null)for(var o=t;o<a.length;o++)Gl(i,a[o])}function za(i){var t=i.f;if((t&Ea)===0){vr(i,er);var a=$e,o=Ua;$e=i,Ua=!0;try{(t&Ta)!==0?zl(i):qs(i),zs(i);var s=Xs(i);i.teardown=typeof s=="function"?s:null,i.wv=Ks;var c;ys&&xl&&(i.f&Mr)!==0&&i.deps}finally{Ua=o,$e=a}}}async function Wl(){await Promise.resolve(),Pl()}function e(i){var t=i.f,a=(t&hr)!==0;if(Ee!==null&&!jr){var o=$e!==null&&($e.f&Ea)!==0;if(!o&&!Kr?.includes(i)){var s=Ee.deps;if((Ee.f&jo)!==0)i.rv<vi&&(i.rv=vi,nr===null&&s!==null&&s[yr]===i?yr++:nr===null?nr=[i]:(!la||!nr.includes(i))&&nr.push(i));else{(Ee.deps??=[]).push(i);var c=i.reactions;c===null?i.reactions=[Ee]:c.includes(Ee)||c.push(Ee)}}}else if(a&&i.deps===null&&i.effects===null){var l=i,v=l.parent;v!==null&&(v.f&Sr)===0&&(l.f^=Sr)}if(Pa){if(ua.has(i))return ua.get(i);if(a){l=i;var g=l.v;return((l.f&er)===0&&l.reactions!==null||td(l))&&(g=Zo(l)),ua.set(l,g),g}}else a&&(l=i,qi(l)&&Is(l));if((i.f&wa)!==0)throw i.v;return i.v}function td(i){if(i.v===Ke)return!0;if(i.deps===null)return!1;for(const t of i.deps)if(ua.has(t)||(t.f&hr)!==0&&td(t))return!0;return!1}function dr(i){var t=jr;try{return jr=!0,i()}finally{jr=t}}const Jl=-7169;function vr(i,t){i.f=i.f&Jl|t}const ed=new Set,Ro=new Set;function rn(i,t,a,o={}){function s(c){if(o.capture||ni.call(t,c),!c.cancelBubble)return Za(()=>a?.call(this,c))}return i.startsWith("pointer")||i.startsWith("touch")||i==="wheel"?Zr(()=>{t.addEventListener(i,s,o)}):t.addEventListener(i,s,o),s}function Ei(i,t,a,o={}){var s=rn(t,i,a,o);return()=>{i.removeEventListener(t,s,o)}}function rd(i,t,a,o,s){var c={capture:o,passive:s},l=rn(i,t,a,c);(t===document.body||t===window||t===document||t instanceof HTMLMediaElement)&&tn(()=>{t.removeEventListener(i,l,c)})}function ye(i){for(var t=0;t<i.length;t++)ed.add(i[t]);for(var a of Ro)a(i)}let Cn=null;function ni(i){var t=this,a=t.ownerDocument,o=i.type,s=i.composedPath?.()||[],c=s[0]||i.target;Cn=i;var l=0,v=Cn===i&&i.__root;if(v){var g=s.indexOf(v);if(g!==-1&&(t===document||t===window)){i.__root=t;return}var u=s.indexOf(t);if(u===-1)return;g<=u&&(l=g)}if(c=s[l]||i.target,c!==t){Io(i,"currentTarget",{configurable:!0,get(){return c||a}});var p=Ee,h=$e;zr(null),fa(null);try{for(var b,x=[];c!==null;){var w=c.assignedSlot||c.parentNode||c.host||null;try{var S=c["__"+o];if(S!=null&&(!c.disabled||i.target===c))if(Bi(S)){var[R,...C]=S;R.apply(c,[i,...C])}else S.call(c,i)}catch(T){b?x.push(T):b=T}if(i.cancelBubble||w===t||w===null)break;c=w}if(b){for(let T of x)queueMicrotask(()=>{throw T});throw b}}finally{i.__root=t,delete i.currentTarget,zr(p),fa(h)}}}function Er(i){var t;t=document.head.appendChild(ta());try{ya(()=>i(t),ws)}finally{}}function an(i){var t=document.createElement("template");return t.innerHTML=i.replaceAll("<!>","<!---->"),t.content}function Sa(i,t){var a=$e;a.nodes_start===null&&(a.nodes_start=i,a.nodes_end=t)}function k(i,t){var a=(t&Jd)!==0,o=(t&Vd)!==0,s,c=!i.startsWith("<!>");return()=>{s===void 0&&(s=an(c?i:"<!>"+i),a||(s=Or(s)));var l=o||Fs?document.importNode(s,!0):s.cloneNode(!0);if(a){var v=Or(l),g=l.lastChild;Sa(v,g)}else Sa(l,l);return l}}function Vl(i,t,a="svg"){var o=!i.startsWith("<!>"),s=`<${a}>${o?i:"<!>"+i}</${a}>`,c;return()=>{if(!c){var l=an(s),v=Or(l);c=Or(v)}var g=c.cloneNode(!0);return Sa(g,g),g}}function Lr(i,t){return Vl(i,t,"svg")}function ca(i=""){{var t=ta(i+"");return Sa(t,t),t}}function Et(){var i=document.createDocumentFragment(),t=document.createComment(""),a=ta();return i.append(t,a),Sa(t,a),i}function m(i,t){i!==null&&i.before(t)}function Yl(i){return i.endsWith("capture")&&i!=="gotpointercapture"&&i!=="lostpointercapture"}const Kl=["beforeinput","click","change","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"];function Ql(i){return Kl.includes(i)}const Zl={formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly",defaultvalue:"defaultValue",defaultchecked:"defaultChecked",srcobject:"srcObject",novalidate:"noValidate",allowfullscreen:"allowFullscreen",disablepictureinpicture:"disablePictureInPicture",disableremoteplayback:"disableRemotePlayback"};function Xl(i){return i=i.toLowerCase(),Zl[i]??i}const t0=["touchstart","touchmove"];function e0(i){return t0.includes(i)}let Li=!0;function $n(i){Li=i}function y(i,t){var a=t==null?"":typeof t=="object"?t+"":t;a!==(i.__t??=i.nodeValue)&&(i.__t=a,i.nodeValue=a+"")}function r0(i,t){return a0(i,t)}const Ba=new Map;function a0(i,{target:t,anchor:a,props:o={},events:s,context:c,intro:l=!0}){jl();var v=new Set,g=h=>{for(var b=0;b<h.length;b++){var x=h[b];if(!v.has(x)){v.add(x);var w=e0(x);t.addEventListener(x,ni,{passive:w});var S=Ba.get(x);S===void 0?(document.addEventListener(x,ni,{passive:w}),Ba.set(x,1)):Ba.set(x,S+1)}}};g(qo(ed)),Ro.add(g);var u=void 0,p=Ol(()=>{var h=a??t.appendChild(ta());return Ur(()=>{if(c){Rt({});var b=rr;b.c=c}s&&(o.$$events=s),Li=l,u=i(h,o)||{},Li=!0,c&&Bt()}),()=>{for(var b of v){t.removeEventListener(b,ni);var x=Ba.get(b);--x===0?(document.removeEventListener(b,ni),Ba.delete(b)):Ba.set(b,x)}Ro.delete(g),h!==a&&h.parentNode?.removeChild(h)}});return i0.set(u,p),u}let i0=new WeakMap;function te(i,t,...a){var o=i,s=Zt,c;ya(()=>{s!==(s=t())&&(c&&(gr(c),c=null),c=Ur(()=>s(o,...a)))},La)}function qr(i){rr===null&&Yo(),ke(()=>{const t=dr(i);if(typeof t=="function")return t})}function ad(i){rr===null&&Yo(),qr(()=>()=>dr(i))}function O(i,t,a=!1){var o=i,s=null,c=null,l=Ke,v=a?La:0,g=!1;const u=(x,w=!0)=>{g=!0,b(w,x)};var p=null;function h(){p!==null&&(p.lastChild.remove(),o.before(p),p=null);var x=l?s:c,w=l?c:s;x&&zi(x),w&&xi(w,()=>{l?c=null:s=null})}const b=(x,w)=>{if(l!==(l=x)){var S=Xo(),R=o;if(S&&(p=document.createDocumentFragment(),p.append(R=ta())),l?s??=w&&Ur(()=>w(R)):c??=w&&Ur(()=>w(R)),S){var C=Fe,T=l?s:c,E=l?c:s;T&&C.skipped_effects.delete(T),E&&C.skipped_effects.add(E),C.add_callback(h)}else h()}};ya(()=>{g=!1,t(u),g||b(null,null)},v)}function on(i,t){return t}function o0(i,t,a){for(var o=i.items,s=[],c=t.length,l=0;l<c;l++)en(t[l].e,s,!0);var v=c>0&&s.length===0&&a!==null;if(v){var g=a.parentNode;Nl(g),g.append(a),o.clear(),Hr(i,t[0].prev,t[c-1].next)}Js(s,()=>{for(var u=0;u<c;u++){var p=t[u];v||(o.delete(p.k),Hr(i,p.prev,p.next)),gr(p.e,!v)}})}function xe(i,t,a,o,s,c=null){var l=i,v={flags:t,items:new Map,first:null},g=(t&bs)!==0;if(g){var u=i;l=u.appendChild(ta())}var p=null,h=!1,b=new Map,x=Ps(()=>{var C=a();return Bi(C)?C:C==null?[]:qo(C)}),w,S;function R(){n0(S,w,v,b,l,s,t,o,a),c!==null&&(w.length===0?p?zi(p):p=Ur(()=>c(l)):p!==null&&xi(p,()=>{p=null}))}ya(()=>{S??=$e,w=e(x);var C=w.length;if(!(h&&C===0)){h=C===0;var T,E,_,L;if(Xo()){var $=new Set,H=Fe;for(E=0;E<C;E+=1){_=w[E],L=o(_,E);var U=v.items.get(L)??b.get(L);U?(t&(Ni|Ri))!==0&&id(U,_,E,t):(T=od(null,v,null,null,_,L,E,s,t,a,!0),b.set(L,T)),$.add(L)}for(const[Q,mt]of v.items)$.has(Q)||H.skipped_effects.add(mt.e);H.add_callback(R)}else R();e(x)}})}function n0(i,t,a,o,s,c,l,v,g){var u=(l&Hd)!==0,p=(l&(Ni|Ri))!==0,h=t.length,b=a.items,x=a.first,w=x,S,R=null,C,T=[],E=[],_,L,$,H;if(u)for(H=0;H<h;H+=1)_=t[H],L=v(_,H),$=b.get(L),$!==void 0&&($.a?.measure(),(C??=new Set).add($));for(H=0;H<h;H+=1){if(_=t[H],L=v(_,H),$=b.get(L),$===void 0){var U=o.get(L);if(U!==void 0){o.delete(L),b.set(L,U);var Q=R?R.next:w;Hr(a,R,U),Hr(a,U,Q),Xi(U,Q,s),R=U}else{var mt=w?w.e.nodes_start:s;R=od(mt,a,R,R===null?a.first:R.next,_,L,H,c,l,g)}b.set(L,R),T=[],E=[],w=R.next;continue}if(p&&id($,_,H,l),($.e.f&Rr)!==0&&(zi($.e),u&&($.a?.unfix(),(C??=new Set).delete($))),$!==w){if(S!==void 0&&S.has($)){if(T.length<E.length){var lt=E[0],nt;R=lt.prev;var ct=T[0],vt=T[T.length-1];for(nt=0;nt<T.length;nt+=1)Xi(T[nt],lt,s);for(nt=0;nt<E.length;nt+=1)S.delete(E[nt]);Hr(a,ct.prev,vt.next),Hr(a,R,ct),Hr(a,vt,lt),w=lt,R=vt,H-=1,T=[],E=[]}else S.delete($),Xi($,w,s),Hr(a,$.prev,$.next),Hr(a,$,R===null?a.first:R.next),Hr(a,R,$),R=$;continue}for(T=[],E=[];w!==null&&w.k!==L;)(w.e.f&Rr)===0&&(S??=new Set).add(w),E.push(w),w=w.next;if(w===null)continue;$=w}T.push($),R=$,w=$.next}if(w!==null||S!==void 0){for(var Dt=S===void 0?[]:qo(S);w!==null;)(w.e.f&Rr)===0&&Dt.push(w),w=w.next;var Wt=Dt.length;if(Wt>0){var Yt=(l&bs)!==0&&h===0?s:null;if(u){for(H=0;H<Wt;H+=1)Dt[H].a?.measure();for(H=0;H<Wt;H+=1)Dt[H].a?.fix()}o0(a,Dt,Yt)}}u&&Zr(()=>{if(C!==void 0)for($ of C)$.a?.apply()}),i.first=a.first&&a.first.e,i.last=R&&R.e;for(var Qt of o.values())gr(Qt.e);o.clear()}function id(i,t,a,o){(o&Ni)!==0&&ci(i.v,t),(o&Ri)!==0?ci(i.i,a):i.i=a}function od(i,t,a,o,s,c,l,v,g,u,p){var h=(g&Ni)!==0,b=(g&Od)===0,x=h?b?Il(s,!1,!1):Ja(s):s,w=(g&Ri)===0?l:Ja(l),S={i:w,v:x,k:c,a:null,e:null,prev:a,next:o};try{if(i===null){var R=document.createDocumentFragment();R.append(i=ta())}return S.e=Ur(()=>v(i,x,w,u),fl),S.e.prev=a&&a.e,S.e.next=o&&o.e,a===null?p||(t.first=S):(a.next=S,a.e.next=S.e),o!==null&&(o.prev=S,o.e.prev=S.e),S}finally{}}function Xi(i,t,a){for(var o=i.next?i.next.e.nodes_start:a,s=t?t.e.nodes_start:a,c=i.e.nodes_start;c!==null&&c!==o;){var l=Oi(c);s.before(c),c=l}}function Hr(i,t,a){t===null?i.first=a:(t.next=a,t.e.next=a&&a.e),a!==null&&(a.prev=t,a.e.prev=t&&t.e)}function s0(i,t,a=!1,o=!1,s=!1){var c=i,l="";K(()=>{var v=$e;if(l!==(l=t()??"")&&(v.nodes_start!==null&&(Gs(v.nodes_start,v.nodes_end),v.nodes_start=v.nodes_end=null),l!=="")){var g=l+"";a?g=`<svg>${g}</svg>`:o&&(g=`<math>${g}</math>`);var u=an(g);if((a||o)&&(u=Or(u)),Sa(Or(u),u.lastChild),a||o)for(;Or(u);)c.before(Or(u));else c.before(u)}})}function sr(i,t,a){var o=i,s,c,l=null,v=null;function g(){c&&(xi(c),c=null),l&&(l.lastChild.remove(),o.before(l),l=null),c=v,v=null}ya(()=>{if(s!==(s=t())){var u=Xo();if(s){var p=o;u&&(l=document.createDocumentFragment(),l.append(p=ta()),c&&Fe.skipped_effects.add(c)),v=Ur(()=>a(p,s))}u?Fe.add_callback(g):g()}},La)}function d0(i,t,a,o,s,c){var l,v,g=null,u=i,p;ya(()=>{const h=t()||null;var b=Kd;h!==l&&(p&&(h===null?xi(p,()=>{p=null,v=null}):h===v?zi(p):(gr(p),$n(!1))),h&&h!==v&&(p=Ur(()=>{if(g=document.createElementNS(b,h),Sa(g,g),o){var x=g.appendChild(ta());o(g,x)}$e.nodes_end=g,u.before(g)})),l=h,l&&(v=l),$n(!0))},La)}function l0(i,t){var a=void 0,o;ya(()=>{a!==(a=t())&&(o&&(gr(o),o=null),a&&(o=Ur(()=>{pi(()=>a(i))})))})}function nd(i){var t,a,o="";if(typeof i=="string"||typeof i=="number")o+=i;else if(typeof i=="object")if(Array.isArray(i)){var s=i.length;for(t=0;t<s;t++)i[t]&&(a=nd(i[t]))&&(o&&(o+=" "),o+=a)}else for(a in i)i[a]&&(o&&(o+=" "),o+=a);return o}function c0(){for(var i,t,a=0,o="",s=arguments.length;a<s;a++)(i=arguments[a])&&(t=nd(i))&&(o&&(o+=" "),o+=t);return o}function tr(i){return typeof i=="object"?c0(i):i??""}const Sn=[...` 	
\r\f \v\uFEFF`];function v0(i,t,a){var o=i==null?"":""+i;if(t&&(o=o?o+" "+t:t),a){for(var s in a)if(a[s])o=o?o+" "+s:s;else if(o.length)for(var c=s.length,l=0;(l=o.indexOf(s,l))>=0;){var v=l+c;(l===0||Sn.includes(o[l-1]))&&(v===o.length||Sn.includes(o[v]))?o=(l===0?"":o.substring(0,l))+o.substring(v+1):l=v}}return o===""?null:o}function Tn(i,t=!1){var a=t?" !important;":";",o="";for(var s in i){var c=i[s];c!=null&&c!==""&&(o+=" "+s+": "+c+a)}return o}function to(i){return i[0]!=="-"||i[1]!=="-"?i.toLowerCase():i}function g0(i,t){if(t){var a="",o,s;if(Array.isArray(t)?(o=t[0],s=t[1]):o=t,i){i=String(i).replaceAll(/\s*\/\*.*?\*\/\s*/g,"").trim();var c=!1,l=0,v=!1,g=[];o&&g.push(...Object.keys(o).map(to)),s&&g.push(...Object.keys(s).map(to));var u=0,p=-1;const S=i.length;for(var h=0;h<S;h++){var b=i[h];if(v?b==="/"&&i[h-1]==="*"&&(v=!1):c?c===b&&(c=!1):b==="/"&&i[h+1]==="*"?v=!0:b==='"'||b==="'"?c=b:b==="("?l++:b===")"&&l--,!v&&c===!1&&l===0){if(b===":"&&p===-1)p=h;else if(b===";"||h===S-1){if(p!==-1){var x=to(i.substring(u,p).trim());if(!g.includes(x)){b!==";"&&h++;var w=i.substring(u,h).trim();a+=" "+w+";"}}u=h+1,p=-1}}}}return o&&(a+=Tn(o)),s&&(a+=Tn(s,!0)),a=a.trim(),a===""?null:a}return i==null?null:String(i)}function ge(i,t,a,o,s,c){var l=i.__className;if(l!==a||l===void 0){var v=v0(a,o,c);v==null?i.removeAttribute("class"):t?i.className=v:i.setAttribute("class",v),i.__className=a}else if(c&&s!==c)for(var g in c){var u=!!c[g];(s==null||u!==!!s[g])&&i.classList.toggle(g,u)}return c}function eo(i,t={},a,o){for(var s in a){var c=a[s];t[s]!==c&&(a[s]==null?i.style.removeProperty(s):i.style.setProperty(s,c,o))}}function Qe(i,t,a,o){var s=i.__style;if(s!==t){var c=g0(t,o);c==null?i.removeAttribute("style"):i.style.cssText=c,i.__style=t}else o&&(Array.isArray(o)?(eo(i,a?.[0],o[0]),eo(i,a?.[1],o[1],"important")):eo(i,a,o));return o}function Pi(i,t,a=!1){if(i.multiple){if(t==null)return;if(!Bi(t))return pl();for(var o of i.options)o.selected=t.includes(li(o));return}for(o of i.options){var s=li(o);if(Ds(s,t)){o.selected=!0;return}}(!a||t!==void 0)&&(i.selectedIndex=-1)}function sd(i){var t=new MutationObserver(()=>{Pi(i,i.__value)});t.observe(i,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["value"]}),tn(()=>{t.disconnect()})}function cr(i,t,a=t){var o=!0;Ui(i,"change",s=>{var c=s?"[selected]":":checked",l;if(i.multiple)l=[].map.call(i.querySelectorAll(c),li);else{var v=i.querySelector(c)??i.querySelector("option:not([disabled])");l=v&&li(v)}a(l)}),pi(()=>{var s=t();if(Pi(i,s,o),o&&s===void 0){var c=i.querySelector(":checked");c!==null&&(s=li(c),a(s))}i.__value=s,o=!1}),sd(i)}function li(i){return"__value"in i?i.__value:i.value}const ei=Symbol("class"),Oa=Symbol("style"),dd=Symbol("is custom element"),ld=Symbol("is html");function cd(i,t){var a=nn(i);a.value===(a.value=t??void 0)||i.value===t&&(t!==0||i.nodeName!=="PROGRESS")||(i.value=t??"")}function u0(i,t){t?i.hasAttribute("selected")||i.setAttribute("selected",""):i.removeAttribute("selected")}function Nt(i,t,a,o){var s=nn(i);s[t]!==(s[t]=a)&&(t==="loading"&&(i[il]=a),a==null?i.removeAttribute(t):typeof a!="string"&&vd(i).includes(t)?i[t]=a:i.setAttribute(t,a))}function m0(i,t,a,o,s=!1,c=!1){var l=nn(i),v=l[dd],g=!l[ld],u=t||{},p=i.tagName==="OPTION";for(var h in t)h in a||(a[h]=null);a.class?a.class=tr(a.class):(o||a[ei])&&(a.class=null),a[Oa]&&(a.style??=null);var b=vd(i);for(const _ in a){let L=a[_];if(p&&_==="value"&&L==null){i.value=i.__value="",u[_]=L;continue}if(_==="class"){var x=i.namespaceURI==="http://www.w3.org/1999/xhtml";ge(i,x,L,o,t?.[ei],a[ei]),u[_]=L,u[ei]=a[ei];continue}if(_==="style"){Qe(i,L,t?.[Oa],a[Oa]),u[_]=L,u[Oa]=a[Oa];continue}var w=u[_];if(!(L===w&&!(L===void 0&&i.hasAttribute(_)))){u[_]=L;var S=_[0]+_[1];if(S!=="$$")if(S==="on"){const $={},H="$$"+_;let U=_.slice(2);var R=Ql(U);if(Yl(U)&&(U=U.slice(0,-7),$.capture=!0),!R&&w){if(L!=null)continue;i.removeEventListener(U,u[H],$),u[H]=null}if(L!=null)if(R)i[`__${U}`]=L,ye([U]);else{let Q=function(mt){u[_].call(this,mt)};var E=Q;u[H]=rn(U,i,Q,$)}else R&&(i[`__${U}`]=void 0)}else if(_==="style")Nt(i,_,L);else if(_==="autofocus")Rl(i,!!L);else if(!v&&(_==="__value"||_==="value"&&L!=null))i.value=i.__value=L;else if(_==="selected"&&p)u0(i,L);else{var C=_;g||(C=Xl(C));var T=C==="defaultValue"||C==="defaultChecked";if(L==null&&!v&&!T)if(l[_]=null,C==="value"||C==="checked"){let $=i;const H=t===void 0;if(C==="value"){let U=$.defaultValue;$.removeAttribute(C),$.defaultValue=U,$.value=$.__value=H?U:null}else{let U=$.defaultChecked;$.removeAttribute(C),$.defaultChecked=U,$.checked=H?U:!1}}else i.removeAttribute(_);else T||b.includes(C)&&(v||typeof L!="string")?(i[C]=L,C in l&&(l[C]=Ke)):typeof L!="function"&&Nt(i,C,L)}}}return u}function Bo(i,t,a=[],o=[],s,c=!1,l=!1){js(a,o,v=>{var g=void 0,u={},p=i.nodeName==="SELECT",h=!1;if(ya(()=>{var x=t(...v.map(e)),w=m0(i,g,x,s,c,l);h&&p&&"value"in x&&Pi(i,x.value);for(let R of Object.getOwnPropertySymbols(u))x[R]||gr(u[R]);for(let R of Object.getOwnPropertySymbols(x)){var S=x[R];R.description===Qd&&(!g||S!==g[R])&&(u[R]&&gr(u[R]),u[R]=Ur(()=>l0(i,()=>S))),w[R]=S}g=w}),p){var b=i;pi(()=>{Pi(b,g.value,!0),sd(b)})}h=!0})}function nn(i){return i.__attributes??={[dd]:i.nodeName.includes("-"),[ld]:i.namespaceURI===Yd}}var Mn=new Map;function vd(i){var t=i.getAttribute("is")||i.nodeName,a=Mn.get(t);if(a)return a;Mn.set(t,a=[]);for(var o,s=i,c=Element.prototype;c!==s;){o=Xd(s);for(var l in o)o[l].set&&a.push(l);s=hs(s)}return a}const p0=()=>performance.now(),Vr={tick:i=>requestAnimationFrame(i),now:()=>p0(),tasks:new Set};function gd(){const i=Vr.now();Vr.tasks.forEach(t=>{t.c(i)||(Vr.tasks.delete(t),t.f())}),Vr.tasks.size!==0&&Vr.tick(gd)}function f0(i){let t;return Vr.tasks.size===0&&Vr.tick(gd),{promise:new Promise(a=>{Vr.tasks.add(t={c:i,f:a})}),abort(){Vr.tasks.delete(t)}}}function yi(i,t){Za(()=>{i.dispatchEvent(new CustomEvent(t))})}function x0(i){if(i==="float")return"cssFloat";if(i==="offset")return"cssOffset";if(i.startsWith("--"))return i;const t=i.split("-");return t.length===1?t[0]:t[0]+t.slice(1).map(a=>a[0].toUpperCase()+a.slice(1)).join("")}function En(i){const t={},a=i.split(";");for(const o of a){const[s,c]=o.split(":");if(!s||c===void 0)break;const l=x0(s.trim());t[l]=c.trim()}return t}const b0=i=>i;function Ln(i,t,a,o){var s=(i&Wd)!==0,c="both",l,v=t.inert,g=t.style.overflow,u,p;function h(){return Za(()=>l??=a()(t,o?.()??{},{direction:c}))}var b={is_global:s,in(){t.inert=v,yi(t,"introstart"),u=Do(t,h(),p,1,()=>{yi(t,"introend"),u?.abort(),u=l=void 0,t.style.overflow=g})},out(R){t.inert=!0,yi(t,"outrostart"),p=Do(t,h(),u,0,()=>{yi(t,"outroend"),R?.()})},stop:()=>{u?.abort(),p?.abort()}},x=$e;if((x.transitions??=[]).push(b),Li){var w=s;if(!w){for(var S=x.parent;S&&(S.f&La)!==0;)for(;(S=S.parent)&&(S.f&Ta)===0;);w=!S||(S.f&Di)!==0}w&&pi(()=>{dr(()=>b.in())})}}function Do(i,t,a,o,s){var c=o===1;if(Ha(t)){var l,v=!1;return Zr(()=>{if(!v){var R=t({direction:c?"in":"out"});l=Do(i,R,a,o,s)}}),{abort:()=>{v=!0,l?.abort()},deactivate:()=>l.deactivate(),reset:()=>l.reset(),t:()=>l.t()}}if(a?.deactivate(),!t?.duration)return s(),{abort:Zt,deactivate:Zt,reset:Zt,t:()=>o};const{delay:g=0,css:u,tick:p,easing:h=b0}=t;var b=[];if(c&&a===void 0&&(p&&p(0,1),u)){var x=En(u(0,1));b.push(x,x)}var w=()=>1-o,S=i.animate(b,{duration:g,fill:"forwards"});return S.onfinish=()=>{S.cancel();var R=a?.t()??1-o;a?.abort();var C=o-R,T=t.duration*Math.abs(C),E=[];if(T>0){var _=!1;if(u)for(var L=Math.ceil(T/16.666666666666668),$=0;$<=L;$+=1){var H=R+C*h($/L),U=En(u(H,1-H));E.push(U),_||=U.overflow==="hidden"}_&&(i.style.overflow="hidden"),w=()=>{var Q=S.currentTime;return R+C*h(Q/T)},p&&f0(()=>{if(S.playState!=="running")return!1;var Q=w();return p(Q,1-Q),!0})}S=i.animate(E,{duration:T,fill:"forwards"}),S.onfinish=()=>{w=()=>o,p?.(o,1-o),s()}},{abort:()=>{S&&(S.cancel(),S.effect=null,S.onfinish=Zt)},deactivate:()=>{s=Zt},reset:()=>{o===0&&p?.(1,0)},t:()=>w()}}function Tt(i,t,a=t){var o=new WeakSet;Ui(i,"input",async s=>{var c=s?i.defaultValue:i.value;if(c=ao(i)?io(c):c,a(c),Fe!==null&&o.add(Fe),await Wl(),c!==(c=t())){var l=i.selectionStart,v=i.selectionEnd;i.value=c??"",v!==null&&(i.selectionStart=l,i.selectionEnd=Math.min(v,i.value.length))}}),dr(t)==null&&i.value&&(a(ao(i)?io(i.value):i.value),Fe!==null&&o.add(Fe)),fi(()=>{var s=t();if(i===document.activeElement){var c=wi??Fe;if(o.has(c))return}ao(i)&&s===io(i.value)||i.type==="date"&&!s&&!i.value||s!==i.value&&(i.value=s??"")})}const ro=new Set;function Ai(i,t,a,o,s=o){var c=a.getAttribute("type")==="checkbox",l=i;if(t!==null)for(var v of t)l=l[v]??=[];l.push(a),Ui(a,"change",()=>{var g=a.__value;c&&(g=y0(l,g,a.checked)),s(g)},()=>s(c?[]:null)),fi(()=>{var g=o();c?(g=g||[],a.checked=g.includes(a.__value)):a.checked=Ds(a.__value,g)}),tn(()=>{var g=l.indexOf(a);g!==-1&&l.splice(g,1)}),ro.has(l)||(ro.add(l),Zr(()=>{l.sort((g,u)=>g.compareDocumentPosition(u)===4?-1:1),ro.delete(l)})),Zr(()=>{})}function We(i,t,a=t){Ui(i,"change",o=>{var s=o?i.defaultChecked:i.checked;a(s)}),dr(t)==null&&a(i.checked),fi(()=>{var o=t();i.checked=!!o})}function y0(i,t,a){for(var o=new Set,s=0;s<i.length;s+=1)i[s].checked&&o.add(i[s].__value);return a||o.delete(t),Array.from(o)}function ao(i){var t=i.type;return t==="number"||t==="range"}function io(i){return i===""?null:+i}function Pn(i,t){return i===t||i?.[ga]===t}function sn(i={},t,a,o){return pi(()=>{var s,c;return fi(()=>{s=c,c=[],dr(()=>{i!==a(...c)&&(t(i,...c),s&&Pn(a(...s),i)&&t(null,...s))})}),()=>{Zr(()=>{c&&Pn(a(...c),i)&&t(null,...c)})}}),i}const Da=[];function h0(i,t=Zt){let a=null;const o=new Set;function s(v){if(Ss(i,v)&&(i=v,a)){const g=!Da.length;for(const u of o)u[1](),Da.push(u,i);if(g){for(let u=0;u<Da.length;u+=2)Da[u][0](Da[u+1]);Da.length=0}}}function c(v){s(v(i))}function l(v,g=Zt){const u=[v,g];return o.add(u),o.size===1&&(a=t(s,c)||Zt),v(i),()=>{o.delete(u),o.size===0&&a&&(a(),a=null)}}return{set:s,update:c,subscribe:l}}let hi=!1;function _0(i){var t=hi;try{return hi=!1,[i(),hi]}finally{hi=t}}const k0={get(i,t){if(!i.exclude.includes(t))return i.props[t]},set(i,t){return!1},getOwnPropertyDescriptor(i,t){if(!i.exclude.includes(t)&&t in i.props)return{enumerable:!0,configurable:!0,value:i.props[t]}},has(i,t){return i.exclude.includes(t)?!1:t in i.props},ownKeys(i){return Reflect.ownKeys(i.props).filter(t=>!i.exclude.includes(t))}};function ne(i,t,a){return new Proxy({props:i,exclude:t},k0)}const w0={get(i,t){let a=i.props.length;for(;a--;){let o=i.props[a];if(Ha(o)&&(o=o()),typeof o=="object"&&o!==null&&t in o)return o[t]}},set(i,t,a){let o=i.props.length;for(;o--;){let s=i.props[o];Ha(s)&&(s=s());const c=va(s,t);if(c&&c.set)return c.set(a),!0}return!1},getOwnPropertyDescriptor(i,t){let a=i.props.length;for(;a--;){let o=i.props[a];if(Ha(o)&&(o=o()),typeof o=="object"&&o!==null&&t in o){const s=va(o,t);return s&&!s.configurable&&(s.configurable=!0),s}}},has(i,t){if(t===ga||t===Cs)return!1;for(let a of i.props)if(Ha(a)&&(a=a()),a!=null&&t in a)return!0;return!1},ownKeys(i){const t=[];for(let a of i.props)if(Ha(a)&&(a=a()),!!a){for(const o in a)t.includes(o)||t.push(o);for(const o of Object.getOwnPropertySymbols(a))t.includes(o)||t.push(o)}return t}};function oe(...i){return new Proxy({props:i},w0)}function we(i,t,a,o){var s=(a&qd)!==0,c=(a&Gd)!==0,l=o,v=!0,g=()=>(v&&(v=!1,l=c?dr(o):o),l),u;if(s){var p=ga in i||Cs in i;u=va(i,t)?.set??(p&&t in i?T=>i[t]=T:void 0)}var h,b=!1;s?[h,b]=_0(()=>i[t]):h=i[t],h===void 0&&o!==void 0&&(h=g(),u&&(vl(),u(h)));var x;if(x=()=>{var T=i[t];return T===void 0?g():(v=!0,T)},(a&zd)===0)return x;if(u){var w=i.$$legacy;return(function(T,E){return arguments.length>0?((!E||w||b)&&u(E?x():T),T):x()})}var S=!1,R=((a&Ud)!==0?Fi:Ps)(()=>(S=!1,x()));s&&e(R);var C=$e;return(function(T,E){if(arguments.length>0){const _=E?e(R):s?Pe(T):T;return d(R,_),S=!0,l!==void 0&&(l=_),T}return Pa&&S||(C.f&Ea)!==0?R.v:e(R)})}const dn=h0({currentPath:"/",currentRoute:null,params:{}});let ud=[];function C0(i){return ud=i,(function(t){if(t.search[1]==="/"){const a=t.search.slice(1).split("&").map(function(o){return o.replace(/~and~/g,"&")}).join("?");window.history.replaceState(null,"",t.pathname.slice(0,-1)+a+t.hash)}})(window.location),Fo(),window.addEventListener("popstate",Fo),dn}function Te(i){i!==md()&&(window.history.pushState({},"",i),Fo())}function md(){return window.location.pathname}function $0(i){if(i?.title){document.title=i.title;const o=document.querySelector('meta[property="og:title"]'),s=document.querySelector('meta[name="twitter:title"]');o&&o.setAttribute("content",i.title),s&&s.setAttribute("content",i.title)}if(i?.description){const o=document.querySelector('meta[property="og:description"]'),s=document.querySelector('meta[name="twitter:description"]'),c=document.querySelector('meta[name="description"]');o&&o.setAttribute("content",i.description),s&&s.setAttribute("content",i.description),c&&c.setAttribute("content",i.description)}if(i?.keywords){const o=document.querySelector('meta[name="keywords"]');o&&o.setAttribute("content",i.keywords)}if(i?.robots){const o=document.querySelector('meta[name="robots"]');o&&o.setAttribute("content",i.robots)}const t=document.querySelector('link[rel="canonical"]');t&&t.setAttribute("href",`https://farizink.github.io${i.path}`);const a=document.querySelector('meta[property="og:url"]');a&&a.setAttribute("content",`https://farizink.github.io${i.path}`)}function Fo(){const i=md(),t=S0(i),a=M0(i,t);t&&$0(t),dn.set({currentPath:i,currentRoute:t,params:a})}function S0(i){for(const t of ud)if(T0(i,t.path))return t;return null}function T0(i,t){const a=i.split("/").filter(Boolean),o=t.split("/").filter(Boolean);return a.length!==o.length?!1:o.every((s,c)=>s.startsWith(":")||s===a[c])}function M0(i,t){if(!t)return{};const a=i.split("/").filter(Boolean),o=t.path.split("/").filter(Boolean),s={};return o.forEach((c,l)=>{if(c.startsWith(":")){const v=c.slice(1);s[v]=a[l]||""}}),s}var E0=()=>history.back(),L0=k(`<div class="flex flex-col items-center justify-center min-h-[70vh] text-center px-4"><div class="mb-8"><div class="w-32 h-32 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center mb-6"><svg class="w-16 h-16 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 21a9 9 0 110-18 9 9 0 010 18z"></path></svg></div> <h1 class="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">404</h1> <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-3">Oops! Page Not Found</h2> <p class="text-gray-600 dark:text-gray-300 max-w-md mx-auto mb-8">The page you're looking for seems to have vanished into the digital void. Let's get you back
        to safety!</p></div> <div class="flex flex-col sm:flex-row gap-4 items-center"><a href="/" class="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium transition-all transform hover:scale-105 shadow-lg"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg> Back to Home</a> <button class="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-xl font-medium transition-all"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg> Go Back</button></div> <div class="mt-12 text-sm text-gray-500 dark:text-gray-400"><p>Lost? Try checking the URL or explore our tools below</p></div></div>`);function P0(i,t){Rt(t,!0);let a=f(Pe({currentPath:"/",currentRoute:null,params:{}}));dn.subscribe(v=>{d(a,v,!0)});var o=Et(),s=ut(o);{var c=v=>{const g=ue(()=>e(a).currentRoute.component);var u=Et(),p=ut(u);sr(p,()=>e(g),(h,b)=>{b(h,{get params(){return e(a).params}})}),m(v,u)},l=v=>{var g=L0(),u=n(r(g),2),p=n(r(u),2);p.__click=[E0],m(v,g)};O(s,v=>{e(a).currentRoute?v(c):v(l,!1)})}m(i,o),Bt()}ye(["click"]);/**
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
 */const A0={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};var I0=Lr("<svg><!><!></svg>");function se(i,t){Rt(t,!0);const a=we(t,"color",3,"currentColor"),o=we(t,"size",3,24),s=we(t,"strokeWidth",3,2),c=we(t,"absoluteStrokeWidth",3,!1),l=we(t,"iconNode",19,()=>[]),v=ne(t,["$$slots","$$events","$$legacy","name","color","size","strokeWidth","absoluteStrokeWidth","iconNode","children"]);var g=I0();Bo(g,h=>({...A0,...v,width:o(),height:o(),stroke:a(),"stroke-width":h,class:["lucide-icon lucide",t.name&&`lucide-${t.name}`,t.class]}),[()=>c()?Number(s())*24/Number(o()):s()]);var u=r(g);xe(u,17,l,on,(h,b)=>{var x=ue(()=>Qa(e(b),2));let w=()=>e(x)[0],S=()=>e(x)[1];var R=Et(),C=ut(R);d0(C,w,!0,(T,E)=>{Bo(T,()=>({...S()}))}),m(h,R)});var p=n(u);te(p,()=>t.children??Zt),m(i,g),Bt()}function An(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"}]];se(i,oe({name:"activity"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function j0(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"M5 12h14"}],["path",{d:"m12 5 7 7-7 7"}]];se(i,oe({name:"arrow-right"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function N0(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"m21 16-4 4-4-4"}],["path",{d:"M17 20V4"}],["path",{d:"m3 8 4-4 4 4"}],["path",{d:"M7 4v16"}]];se(i,oe({name:"arrow-up-down"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function R0(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"}],["path",{d:"m3.3 7 8.7 5 8.7-5"}],["path",{d:"M12 22V12"}]];se(i,oe({name:"box"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function Nr(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2"}],["line",{x1:"8",x2:"16",y1:"6",y2:"6"}],["line",{x1:"16",x2:"16",y1:"14",y2:"18"}],["path",{d:"M16 10h.01"}],["path",{d:"M12 10h.01"}],["path",{d:"M8 10h.01"}],["path",{d:"M12 14h.01"}],["path",{d:"M8 14h.01"}],["path",{d:"M12 18h.01"}],["path",{d:"M8 18h.01"}]];se(i,oe({name:"calculator"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function Va(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M3 10h18"}]];se(i,oe({name:"calendar"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function B0(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16"}],["path",{d:"M18 17V9"}],["path",{d:"M13 17V5"}],["path",{d:"M8 17v-3"}]];se(i,oe({name:"chart-column"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function ma(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"M20 6 9 17l-5-5"}]];se(i,oe({name:"check"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function Ie(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"m15 18-6-6 6-6"}]];se(i,oe({name:"chevron-left"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function D0(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"m9 18 6-6-6-6"}]];se(i,oe({name:"chevron-right"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function F0(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"m18 15-6-6-6 6"}]];se(i,oe({name:"chevron-up"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function ln(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["circle",{cx:"12",cy:"12",r:"10"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16"}]];se(i,oe({name:"circle-alert"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function ka(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"M12 6v6l4 2"}],["circle",{cx:"12",cy:"12",r:"10"}]];se(i,oe({name:"clock"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function Ya(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"m16 18 6-6-6-6"}],["path",{d:"m8 6-6 6 6 6"}]];se(i,oe({name:"code"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function H0(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"}]];se(i,oe({name:"command"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function be(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"}]];se(i,oe({name:"copy"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function O0(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["rect",{width:"20",height:"14",x:"2",y:"5",rx:"2"}],["line",{x1:"2",x2:"22",y1:"10",y2:"10"}]];se(i,oe({name:"credit-card"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function In(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["rect",{width:"12",height:"12",x:"2",y:"10",rx:"2",ry:"2"}],["path",{d:"m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6"}],["path",{d:"M6 18h.01"}],["path",{d:"M10 14h.01"}],["path",{d:"M15 6h.01"}],["path",{d:"M18 9h.01"}]];se(i,oe({name:"dices"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function Ho(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["line",{x1:"12",x2:"12",y1:"2",y2:"22"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"}]];se(i,oe({name:"dollar-sign"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function Xa(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"M12 15V3"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["path",{d:"m7 10 5 5 5-5"}]];se(i,oe({name:"download"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function jn(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"}],["path",{d:"M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"}]];se(i,oe({name:"droplets"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function U0(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"}],["path",{d:"m2 2 20 20"}]];se(i,oe({name:"eye-off"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function pd(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"}],["circle",{cx:"12",cy:"12",r:"3"}]];se(i,oe({name:"eye"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function fd(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1"}],["path",{d:"M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1"}]];se(i,oe({name:"file-json"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function He(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M10 9H8"}],["path",{d:"M16 13H8"}],["path",{d:"M16 17H8"}]];se(i,oe({name:"file-text"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function xd(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["rect",{x:"3",y:"8",width:"18",height:"4",rx:"1"}],["path",{d:"M12 8v13"}],["path",{d:"M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"}],["path",{d:"M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"}]];se(i,oe({name:"gift"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function qa(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["circle",{cx:"18",cy:"18",r:"3"}],["circle",{cx:"6",cy:"6",r:"3"}],["path",{d:"M13 6h3a2 2 0 0 1 2 2v7"}],["path",{d:"M11 18H8a2 2 0 0 1-2-2V9"}]];se(i,oe({name:"git-compare"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function Oo(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"}],["path",{d:"M2 12h20"}]];se(i,oe({name:"globe"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function Qr(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["line",{x1:"4",x2:"20",y1:"9",y2:"9"}],["line",{x1:"4",x2:"20",y1:"15",y2:"15"}],["line",{x1:"10",x2:"8",y1:"3",y2:"21"}],["line",{x1:"16",x2:"14",y1:"3",y2:"21"}]];se(i,oe({name:"hash"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function bd(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"}]];se(i,oe({name:"heart"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function Ka(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{d:"M3 3v5h5"}],["path",{d:"M12 7v5l4 2"}]];se(i,oe({name:"history"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function z0(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2"}],["circle",{cx:"9",cy:"9",r:"2"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"}]];se(i,oe({name:"image"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function pa(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 16v-4"}],["path",{d:"M12 8h.01"}]];se(i,oe({name:"info"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function q0(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"}],["path",{d:"m21 2-9.6 9.6"}],["circle",{cx:"7.5",cy:"15.5",r:"5.5"}]];se(i,oe({name:"key"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function oo(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"M9 17H7A5 5 0 0 1 7 7h2"}],["path",{d:"M15 7h2a5 5 0 1 1 0 10h-2"}],["line",{x1:"8",x2:"16",y1:"12",y2:"12"}]];se(i,oe({name:"link-2"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function yd(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"}]];se(i,oe({name:"link"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function G0(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"M3 5h.01"}],["path",{d:"M3 12h.01"}],["path",{d:"M3 19h.01"}],["path",{d:"M8 5h13"}],["path",{d:"M8 12h13"}],["path",{d:"M8 19h13"}]];se(i,oe({name:"list"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function Uo(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4"}]];se(i,oe({name:"lock"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function W0(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8"}],["path",{d:"M10 19v-3.96 3.15"}],["path",{d:"M7 19h5"}],["rect",{width:"6",height:"10",x:"16",y:"12",rx:"2"}]];se(i,oe({name:"monitor-smartphone"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function J0(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"}]];se(i,oe({name:"moon"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function Yr(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"}],["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor"}]];se(i,oe({name:"palette"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function Nn(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1"}]];se(i,oe({name:"pause"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function no(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["line",{x1:"19",x2:"5",y1:"5",y2:"19"}],["circle",{cx:"6.5",cy:"6.5",r:"2.5"}],["circle",{cx:"17.5",cy:"17.5",r:"2.5"}]];se(i,oe({name:"percent"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function V0(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"}]];se(i,oe({name:"play"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function Ii(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]];se(i,oe({name:"plus"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function zo(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["rect",{width:"5",height:"5",x:"3",y:"3",rx:"1"}],["rect",{width:"5",height:"5",x:"16",y:"3",rx:"1"}],["rect",{width:"5",height:"5",x:"3",y:"16",rx:"1"}],["path",{d:"M21 16h-3a2 2 0 0 0-2 2v3"}],["path",{d:"M21 21v.01"}],["path",{d:"M12 7v3a2 2 0 0 1-2 2H7"}],["path",{d:"M3 12h.01"}],["path",{d:"M12 3h.01"}],["path",{d:"M12 16v.01"}],["path",{d:"M16 12h1"}],["path",{d:"M21 12v.01"}],["path",{d:"M12 21v-1"}]];se(i,oe({name:"qr-code"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function Tr(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]];se(i,oe({name:"refresh-cw"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function Gi(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{d:"M3 3v5h5"}]];se(i,oe({name:"rotate-ccw"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function Y0(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"}],["path",{d:"m14.5 12.5 2-2"}],["path",{d:"m11.5 9.5 2-2"}],["path",{d:"m8.5 6.5 2-2"}],["path",{d:"m17.5 15.5 2-2"}]];se(i,oe({name:"ruler"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function gi(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"m21 21-4.34-4.34"}],["circle",{cx:"11",cy:"11",r:"8"}]];se(i,oe({name:"search"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function hd(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"M14 17H5"}],["path",{d:"M19 7h-9"}],["circle",{cx:"17",cy:"17",r:"3"}],["circle",{cx:"7",cy:"7",r:"3"}]];se(i,oe({name:"settings-2"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function cn(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}]];se(i,oe({name:"shield"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function so(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"m18 14 4 4-4 4"}],["path",{d:"m18 2 4 4-4 4"}],["path",{d:"M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22"}],["path",{d:"M2 6h1.972a4 4 0 0 1 3.6 2.2"}],["path",{d:"M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45"}]];se(i,oe({name:"shuffle"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function K0(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}],["path",{d:"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"}]];se(i,oe({name:"square-pen"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function _d(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"}]];se(i,oe({name:"star"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function Q0(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["circle",{cx:"12",cy:"12",r:"4"}],["path",{d:"M12 2v2"}],["path",{d:"M12 20v2"}],["path",{d:"m4.93 4.93 1.41 1.41"}],["path",{d:"m17.66 17.66 1.41 1.41"}],["path",{d:"M2 12h2"}],["path",{d:"M20 12h2"}],["path",{d:"m6.34 17.66-1.41 1.41"}],["path",{d:"m19.07 4.93-1.41 1.41"}]];se(i,oe({name:"sun"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function Z0(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor"}]];se(i,oe({name:"tag"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function X0(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["circle",{cx:"12",cy:"12",r:"10"}],["circle",{cx:"12",cy:"12",r:"6"}],["circle",{cx:"12",cy:"12",r:"2"}]];se(i,oe({name:"target"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function tc(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"}]];se(i,oe({name:"thermometer"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function ec(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["line",{x1:"10",x2:"14",y1:"2",y2:"2"}],["line",{x1:"12",x2:"15",y1:"14",y2:"11"}],["circle",{cx:"12",cy:"14",r:"8"}]];se(i,oe({name:"timer"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function Wi(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"M10 11v6"}],["path",{d:"M14 11v6"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"}],["path",{d:"M3 6h18"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}]];se(i,oe({name:"trash-2"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function rc(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"M16 17h6v-6"}],["path",{d:"m22 17-8.5-8.5-5 5L2 7"}]];se(i,oe({name:"trending-down"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function ac(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"M16 7h6v6"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17"}]];se(i,oe({name:"trending-up"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function ic(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"}]];se(i,oe({name:"twitter"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function xa(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"M12 4v16"}],["path",{d:"M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2"}],["path",{d:"M9 20h6"}]];se(i,oe({name:"type"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function oc(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"M12 3v12"}],["path",{d:"m17 8-5-5-5 5"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}]];se(i,oe({name:"upload"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function vn(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87"}],["circle",{cx:"9",cy:"7",r:"4"}]];se(i,oe({name:"users"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function nc(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"}],["path",{d:"M7 2v20"}],["path",{d:"M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"}]];se(i,oe({name:"utensils"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function sc(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"}]];se(i,oe({name:"volume"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function dc(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["circle",{cx:"12",cy:"5",r:"3"}],["path",{d:"M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z"}]];se(i,oe({name:"weight"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function ui(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];se(i,oe({name:"x"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}function Ve(i,t){Rt(t,!0);/**
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
 */let a=ne(t,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"}]];se(i,oe({name:"zap"},()=>a,{get iconNode(){return o},children:(s,c)=>{var l=Et(),v=ut(l);te(v,()=>t.children??Zt),m(s,l)},$$slots:{default:!0}})),Bt()}const lc="/assets/1-CWzsbmm-.jpg",cc="/assets/2-DC9PoH_V.jpg";var vc=Lr('<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 559 168"><path fill="currentColor" d="m83.996 0.277c-46.249 0-83.743 37.493-83.743 83.742 0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l0.001-0.004zm38.404 120.78c-1.5 2.46-4.72 3.24-7.18 1.73-19.662-12.01-44.414-14.73-73.564-8.07-2.809 0.64-5.609-1.12-6.249-3.93-0.643-2.81 1.11-5.61 3.926-6.25 31.9-7.288 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.802c-1.89 3.072-5.91 4.042-8.98 2.152-22.51-13.836-56.823-17.843-83.448-9.761-3.453 1.043-7.1-0.903-8.148-4.35-1.04-3.453 0.907-7.093 4.354-8.143 30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-0.001zm0.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219-1.254-4.14 1.08-8.513 5.221-9.771 29.581-8.98 78.756-7.245 109.83 11.202 3.73 2.209 4.95 7.016 2.74 10.733-2.2 3.722-7.02 4.949-10.73 2.739zm94.56 3.072c-14.46-3.448-17.03-5.868-17.03-10.953 0-4.804 4.52-8.037 11.25-8.037 6.52 0 12.98 2.455 19.76 7.509 0.2 0.153 0.46 0.214 0.71 0.174 0.26-0.038 0.48-0.177 0.63-0.386l7.06-9.952c0.29-0.41 0.21-0.975-0.18-1.288-8.07-6.473-17.15-9.62-27.77-9.62-15.61 0-26.52 9.369-26.52 22.774 0 14.375 9.41 19.465 25.67 23.394 13.83 3.187 16.17 5.857 16.17 10.629 0 5.29-4.72 8.58-12.32 8.58-8.44 0-15.33-2.85-23.03-9.51-0.19-0.17-0.45-0.24-0.69-0.23-0.26 0.02-0.49 0.14-0.65 0.33l-7.92 9.42c-0.33 0.4-0.29 0.98 0.09 1.32 8.96 8 19.98 12.22 31.88 12.22 16.82 0 27.69-9.19 27.69-23.42 0.03-12.007-7.16-18.657-24.77-22.941l-0.03-0.013zm62.86-14.26c-7.29 0-13.27 2.872-18.21 8.757v-6.624c0-0.523-0.42-0.949-0.94-0.949h-12.95c-0.52 0-0.94 0.426-0.94 0.949v73.601c0 0.52 0.42 0.95 0.94 0.95h12.95c0.52 0 0.94-0.43 0.94-0.95v-23.23c4.94 5.53 10.92 8.24 18.21 8.24 13.55 0 27.27-10.43 27.27-30.369 0.02-19.943-13.7-30.376-27.26-30.376l-0.01 0.001zm12.21 30.375c0 10.149-6.25 17.239-15.21 17.239-8.85 0-15.53-7.41-15.53-17.239 0-9.83 6.68-17.238 15.53-17.238 8.81-0.001 15.21 7.247 15.21 17.237v0.001zm50.21-30.375c-17.45 0-31.12 13.436-31.12 30.592 0 16.972 13.58 30.262 30.91 30.262 17.51 0 31.22-13.39 31.22-30.479 0-17.031-13.62-30.373-31.01-30.373v-0.002zm0 47.714c-9.28 0-16.28-7.46-16.28-17.344 0-9.929 6.76-17.134 16.07-17.134 9.34 0 16.38 7.457 16.38 17.351 0 9.927-6.8 17.127-16.17 17.127zm68.27-46.53h-14.25v-14.566c0-0.522-0.42-0.948-0.94-0.948h-12.95c-0.52 0-0.95 0.426-0.95 0.948v14.566h-6.22c-0.52 0-0.94 0.426-0.94 0.949v11.127c0 0.522 0.42 0.949 0.94 0.949h6.22v28.795c0 11.63 5.79 17.53 17.22 17.53 4.64 0 8.49-0.96 12.12-3.02 0.3-0.16 0.48-0.48 0.48-0.82v-10.6c0-0.32-0.17-0.63-0.45-0.8-0.28-0.18-0.63-0.19-0.92-0.04-2.49 1.25-4.9 1.83-7.6 1.83-4.15 0-6.01-1.89-6.01-6.11v-26.76h14.25c0.52 0 0.94-0.426 0.94-0.949v-11.126c0.02-0.523-0.4-0.949-0.93-0.949l-0.01-0.006zm49.64 0.057v-1.789c0-5.263 2.02-7.61 6.54-7.61 2.7 0 4.87 0.536 7.3 1.346 0.3 0.094 0.61 0.047 0.85-0.132 0.25-0.179 0.39-0.466 0.39-0.77v-10.91c0-0.417-0.26-0.786-0.67-0.909-2.56-0.763-5.84-1.546-10.76-1.546-11.95 0-18.28 6.734-18.28 19.467v2.74h-6.22c-0.52 0-0.95 0.426-0.95 0.948v11.184c0 0.522 0.43 0.949 0.95 0.949h6.22v44.405c0 0.53 0.43 0.95 0.95 0.95h12.94c0.53 0 0.95-0.42 0.95-0.95v-44.402h12.09l18.52 44.402c-2.1 4.66-4.17 5.59-6.99 5.59-2.28 0-4.69-0.68-7.14-2.03-0.23-0.12-0.51-0.14-0.75-0.07-0.25 0.09-0.46 0.27-0.56 0.51l-4.39 9.63c-0.21 0.46-0.03 0.99 0.41 1.23 4.58 2.48 8.71 3.54 13.82 3.54 9.56 0 14.85-4.46 19.5-16.44l22.46-58.037c0.12-0.292 0.08-0.622-0.1-0.881-0.17-0.257-0.46-0.412-0.77-0.412h-13.48c-0.41 0-0.77 0.257-0.9 0.636l-13.81 39.434-15.12-39.46c-0.14-0.367-0.49-0.61-0.88-0.61h-22.12v-0.003zm-28.78-0.057h-12.95c-0.52 0-0.95 0.426-0.95 0.949v56.481c0 0.53 0.43 0.95 0.95 0.95h12.95c0.52 0 0.95-0.42 0.95-0.95v-56.477c0-0.523-0.42-0.949-0.95-0.949v-0.004zm-6.4-25.719c-5.13 0-9.29 4.152-9.29 9.281 0 5.132 4.16 9.289 9.29 9.289s9.28-4.157 9.28-9.289c0-5.128-4.16-9.281-9.28-9.281zm113.42 43.88c-5.12 0-9.11-4.115-9.11-9.112s4.04-9.159 9.16-9.159 9.11 4.114 9.11 9.107c0 4.997-4.04 9.164-9.16 9.164zm0.05-17.365c-4.67 0-8.2 3.71-8.2 8.253 0 4.541 3.51 8.201 8.15 8.201 4.67 0 8.2-3.707 8.2-8.253 0-4.541-3.51-8.201-8.15-8.201zm2.02 9.138l2.58 3.608h-2.18l-2.32-3.31h-1.99v3.31h-1.82v-9.564h4.26c2.23 0 3.69 1.137 3.69 3.051 0.01 1.568-0.9 2.526-2.21 2.905h-0.01zm-1.54-4.315h-2.37v3.025h2.37c1.18 0 1.89-0.579 1.89-1.514 0-0.984-0.71-1.511-1.89-1.511z"></path></svg>');function Rn(i,t){let a=we(t,"class",3,"w-6 h-6");var o=vc();K(()=>ge(o,0,tr(a()))),m(i,o)}const Bn="https://core.fariz.dev",ri={BASE_URL:"https://api.spotify.com/v1",TOKEN_ENDPOINT:`${Bn}/api/spotify/token`,REFRESH_ENDPOINT:`${Bn}/api/spotify/refresh`,MARKET:"ID"};var gc=k('<div class="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shadow-lg"><!></div>'),uc=k('<span class="text-gray-500 mx-1">•</span>'),mc=k('<span><a target="_blank" rel="noreferrer" class="hover:text-white hover:underline transition-colors duration-200"> </a> <!></span>'),pc=k('<div class="h-full rounded-full animate-pulse bg-white/20"></div>'),fc=k('<div class="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg transition-all duration-300"></div>'),xc=k('<div class="flex items-center gap-1 text-gray-400"><!> <span class="font-medium text-gray-300"> </span></div>'),bc=k('<span class="text-gray-400 font-medium"> </span>'),yc=k('<div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> <span class="text-green-500 font-medium">LIVE</span>',1),hc=k('<!> <span class="text-gray-400">PAUSED</span>',1),_c=k('<div><div class="p-4"><div class="flex items-center gap-4 mb-4"><div class="relative"><a target="_blank" rel="noreferrer" class="block"><img alt="" class="w-16 h-16 rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105 object-cover"/> <!></a></div> <div class="flex-1 min-w-0"><div class="font-bold text-white text-base mb-1 truncate group-hover:text-green-400 transition-colors duration-200"><a target="_blank" rel="noreferrer" class="hover:underline"> </a></div> <div class="text-sm text-gray-300 truncate"></div></div> <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300"><a href="https://open.spotify.com" rel="noreferrer" target="_blank" class="block"><!></a></div></div> <div class="space-y-3"><div class="relative"><div><div><!></div></div> <!></div> <div class="flex items-center justify-between text-xs"><div class="flex items-center gap-2"><!></div> <div class="flex items-center gap-3"><!> <div class="flex items-center gap-1"><!></div></div></div></div></div></div>'),kc=k('<div class="group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-xl border border-gray-800/50 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-gray-600/30"><div class="p-4"><div class="flex items-center gap-4 mb-4"><div class="relative"><div class="w-16 h-16 rounded-lg bg-gray-800 flex items-center justify-center"><div class="w-8 h-8 rounded bg-gray-700 animate-pulse"></div></div> <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center"><!></div></div> <div class="flex-1"><div class="font-bold text-gray-400 text-base mb-1">Not Playing</div> <div class="text-sm text-gray-500">Connect to Spotify to see current track</div></div> <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300"><a href="https://open.spotify.com" rel="noreferrer" target="_blank" class="block"><!></a></div></div> <div class="space-y-3"><div class="h-2 rounded-full bg-gray-800/30 overflow-hidden"><div class="h-full w-0 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full"></div></div> <div class="flex items-center justify-between text-xs"><div class="flex items-center gap-1 text-gray-500"><!> <span>Offline</span></div> <span class="text-gray-500">--:--</span></div></div></div></div>');function wc(i,t){Rt(t,!0);let a=f(null),o=f(!1),s=f(!1),c=Pe({album_img:null,album_url:null,artists:[],url:null,name:null,percent:0,duration_ms:0,progress_ms:0});const l={name:null,type:null};let v=f(Pe({...l})),g=Pe(new Set),u=!1;const p=(_,L)=>{if(!u)return-1;const $=window.setTimeout(()=>{g.delete($),u&&_()},L);return g.add($),$},h=()=>{u=!1,g.forEach(_=>clearTimeout(_)),g.clear()},b=()=>{if(!c.duration_ms||!c.progress_ms)return"";const _=c.duration_ms-c.progress_ms,L=Math.ceil(_/1e3/60);return L<=0?"":L===1?"1 min left":`${L} min left`},x=()=>{fetch(`${ri.BASE_URL}/me/player/devices`,{method:"GET",headers:new Headers({Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+e(a)})}).then(_=>_.status===200?_.json():!1).then(_=>{if(_.devices.length>=1){const L=_.devices.find($=>$.is_active);L!==void 0?(e(v).name=L.name,e(v).type=L.type):d(v,{...l},!0)}else d(v,{...l},!0)}).catch(_=>(console.log(_),[]))},w=()=>{fetch(ri.REFRESH_ENDPOINT).then(_=>_.json()).then(_=>{_.data!==null&&(d(a,_.data.access_token,!0),S())}).catch(_=>(console.log(_),[]))},S=()=>{u&&fetch(`${ri.BASE_URL}/me/player/currently-playing?market=${ri.MARKET}`,{method:"GET",headers:new Headers({Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+e(a)})}).then(_=>u?_.status===200?_.json():_.status===401?(w(),null):(p(()=>S(),3e3),null):null).then(_=>{if(!u||!_)return;d(s,_.is_playing,!0);const L=_.item;c.artists=L.artists,c.url=L.external_urls.spotify,c.name=L.name,c.album_img=L?.album?.images[0]?.url,c.album_url=L.album.external_urls.spotify,c.duration_ms=L.duration_ms,c.progress_ms=_.progress_ms,c.percent=_.progress_ms*100/L.duration_ms,d(o,!0),x(),p(()=>S(),1e3)}).catch(_=>{u&&(d(o,!1),console.log(_),p(()=>S(),7e3))})};qr(()=>{u=!0,fetch(ri.TOKEN_ENDPOINT).then(_=>_.json()).then(_=>{u&&_.data!==null&&(d(a,_.data.access_token,!0),S())}).catch(_=>{u&&console.log(_)})}),ad(()=>{h()});var R=Et(),C=ut(R);{var T=_=>{var L=_c(),$=r(L),H=r($),U=r(H),Q=r(U),mt=r(Q),lt=n(mt,2);{var nt=st=>{var kt=gc(),G=r(kt);V0(G,{class:"w-2.5 h-2.5 text-white"}),m(st,kt)};O(lt,st=>{e(s)&&st(nt)})}var ct=n(U,2),vt=r(ct),Dt=r(vt),Wt=r(Dt),Yt=n(vt,2);xe(Yt,21,()=>c.artists,on,(st,kt,G)=>{let Z=()=>e(kt).external_urls,W=()=>e(kt).name;var A=mc(),I=r(A),N=r(I),it=n(I,2);{var rt=Y=>{var z=uc();m(Y,z)};O(it,Y=>{G+1!==c.artists.length&&Y(rt)})}K(()=>{Nt(I,"href",Z().spotify),y(N,W())}),m(st,A)});var Qt=n(ct,2),Jt=r(Qt),zt=r(Jt);Rn(zt,{class:"h-5 w-auto text-green-500 hover:scale-110 transition-transform duration-200"});var Ft=n(H,2),At=r(Ft),Ct=r(At),tt=r(Ct),yt=r(tt);{var pt=st=>{var kt=pc();m(st,kt)};O(yt,st=>{e(s)&&st(pt)})}var at=n(Ct,2);{var P=st=>{var kt=fc();K(()=>Qe(kt,`left: calc(${c.percent??""}% - 6px);`)),m(st,kt)};O(at,st=>{e(s)&&st(P)})}var xt=n(At,2),ft=r(xt),V=r(ft);{var et=st=>{var kt=xc(),G=r(kt);W0(G,{class:"w-3 h-3 opacity-70"});var Z=n(G,2),W=r(Z);K(()=>y(W,e(v).name)),m(st,kt)};O(V,st=>{e(v).name!==null&&st(et)})}var ht=n(ft,2),bt=r(ht);{var wt=st=>{var kt=bc(),G=r(kt);K(Z=>y(G,Z),[b]),m(st,kt)};O(bt,st=>{e(s)&&b()&&st(wt)})}var Ut=n(bt,2),jt=r(Ut);{var Pt=st=>{var kt=yc();m(st,kt)},Lt=st=>{var kt=hc(),G=ut(kt);Nn(G,{class:"w-3 h-3 text-gray-400"}),m(st,kt)};O(jt,st=>{e(s)?st(Pt):st(Lt,!1)})}K(()=>{ge(L,1,`group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-xl border ${e(s)?"border-green-500/50 shadow-green-500/20":"border-gray-800/50"} overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-green-500/30`),Nt(Q,"href",c.album_url),Nt(mt,"src",c.album_img),Nt(Dt,"href",c.url),y(Wt,c.name),ge(Ct,1,`h-2 rounded-full overflow-hidden ${e(s)?"bg-gray-800":"bg-gray-800/50"}`),ge(tt,1,`h-full rounded-full transition-all duration-300 ease-out ${e(s)?"bg-gradient-to-r from-green-500 to-green-400":"bg-gradient-to-r from-gray-400 to-gray-500"}`),Qe(tt,`width: ${c.percent??""}%;`)}),m(_,L)},E=_=>{var L=kc(),$=r(L),H=r($),U=r(H),Q=n(r(U),2),mt=r(Q);ui(mt,{class:"w-3 h-3 text-gray-400"});var lt=n(U,4),nt=r(lt),ct=r(nt);Rn(ct,{class:"h-5 w-auto text-gray-400 hover:text-green-500 hover:scale-110 transition-all duration-200"});var vt=n(H,2),Dt=n(r(vt),2),Wt=r(Dt),Yt=r(Wt);Nn(Yt,{class:"w-3 h-3"}),m(_,L)};O(C,_=>{e(o)?_(T):_(E,!1)})}m(i,R),Bt()}var Cc=Lr('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"></path><path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"></path></svg>');function $c(i,t){let a=we(t,"class",3,"w-6 h-6");var o=Cc();K(()=>ge(o,0,tr(a()))),m(i,o)}var Sc=Lr('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>');function Tc(i,t){let a=we(t,"class",3,"w-6 h-6");var o=Sc();K(()=>ge(o,0,tr(a()))),m(i,o)}var Mc=Lr('<svg viewBox="0 -28.5 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid"><g><path d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z" fill="currentColor" fill-rule="nonzero"></path></g></svg>');function Ec(i,t){let a=we(t,"class",3,"w-6 h-6");var o=Mc();K(()=>ge(o,0,tr(a()))),m(i,o)}var Lc=Lr('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1333.33 1333.3" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"><path d="M666.66 0C298.48 0 0 298.47 0 666.65c0 368.19 298.48 666.65 666.66 666.65 368.22 0 666.67-298.45 666.67-666.65C1333.33 298.49 1034.88.03 666.65.03l.01-.04zm305.73 961.51c-11.94 19.58-37.57 25.8-57.16 13.77-156.52-95.61-353.57-117.26-585.63-64.24-22.36 5.09-44.65-8.92-49.75-31.29-5.12-22.37 8.84-44.66 31.26-49.75 253.95-58.02 471.78-33.04 647.51 74.35 19.59 12.02 25.8 37.57 13.77 57.16zm81.6-181.52c-15.05 24.45-47.05 32.17-71.49 17.13-179.2-110.15-452.35-142.05-664.31-77.7-27.49 8.3-56.52-7.19-64.86-34.63-8.28-27.49 7.22-56.46 34.66-64.82 242.11-73.46 543.1-37.88 748.89 88.58 24.44 15.05 32.16 47.05 17.12 71.46V780zm7.01-189.02c-214.87-127.62-569.36-139.35-774.5-77.09-32.94 9.99-67.78-8.6-77.76-41.55-9.98-32.96 8.6-67.77 41.56-77.78 235.49-71.49 626.96-57.68 874.34 89.18 29.69 17.59 39.41 55.85 21.81 85.44-17.52 29.63-55.89 39.4-85.42 21.8h-.03z" fill="currentColor" fill-rule="nonzero"></path></svg>');function Pc(i,t){let a=we(t,"class",3,"w-6 h-6");var o=Lc();K(()=>ge(o,0,tr(a()))),m(i,o)}const Ac=Array(12).fill(0);var Ic=k('<div class="sonner-loading-bar"></div>'),jc=k('<div><div class="sonner-spinner"></div></div>');function Nc(i,t){Rt(t,!0);var a=jc(),o=r(a);xe(o,23,()=>Ac,(s,c)=>`spinner-bar-${c}`,(s,c)=>{var l=Ic();m(s,l)}),K(s=>{ge(a,1,s),Nt(a,"data-visible",t.visible)},[()=>tr(["sonner-loading-wrapper",t.class].filter(Boolean).join(" "))]),m(i,a),Bt()}function Jr(...i){return i.filter(Boolean).join(" ")}const Rc=typeof document<"u",Bc=typeof window<"u"?window:void 0;function Dc(i){let t=i.activeElement;for(;t?.shadowRoot;){const a=t.shadowRoot.activeElement;if(a===t)break;t=a}return t}class Fc{#e;#t;constructor(t={}){const{window:a=Bc,document:o=a?.document}=t;a!==void 0&&(this.#e=o,this.#t=Sl(s=>{const c=Ei(a,"focusin",s),l=Ei(a,"focusout",s);return()=>{c(),l()}}))}get current(){return this.#t?.(),this.#e?Dc(this.#e):null}}new Fc;class Hc{#e;#t;constructor(t){this.#e=t,this.#t=Symbol(t)}get key(){return this.#t}exists(){return yl(this.#t)}get(){const t=pn(this.#t);if(t===void 0)throw new Error(`Context "${this.#e}" not found`);return t}getOr(t){const a=pn(this.#t);return a===void 0?t:a}set(t){return bl(this.#t,t)}}const Oc=new Hc("<Toaster/>");let Dn=0;class Uc{#e=f(Pe([]));get toasts(){return e(this.#e)}set toasts(t){d(this.#e,t,!0)}#t=f(Pe([]));get heights(){return e(this.#t)}set heights(t){d(this.#t,t,!0)}#r=t=>{const a=this.toasts.findIndex(o=>o.id===t);return a===-1?null:a};addToast=t=>{Rc&&this.toasts.unshift(t)};updateToast=({id:t,data:a,type:o,message:s})=>{const c=this.toasts.findIndex(v=>v.id===t),l=this.toasts[c];this.toasts[c]={...l,...a,id:t,title:s,type:o,updated:!0}};create=t=>{const{message:a,...o}=t,s=typeof t?.id=="number"||t.id&&t.id?.length>0?t.id:Dn++,c=t.dismissable===void 0?!0:t.dismissable,l=t.type===void 0?"default":t.type;return dr(()=>{this.toasts.find(g=>g.id===s)?this.updateToast({id:s,data:t,type:l,message:a,dismissable:c}):this.addToast({...o,id:s,title:a,dismissable:c,type:l})}),s};dismiss=t=>(dr(()=>{if(t===void 0){this.toasts=this.toasts.map(o=>({...o,dismiss:!0}));return}const a=this.toasts.findIndex(o=>o.id===t);this.toasts[a]&&(this.toasts[a]={...this.toasts[a],dismiss:!0})}),t);remove=t=>{if(t===void 0){this.toasts=[];return}const a=this.#r(t);if(a!==null)return this.toasts.splice(a,1),t};message=(t,a)=>this.create({...a,type:"default",message:t});error=(t,a)=>this.create({...a,type:"error",message:t});success=(t,a)=>this.create({...a,type:"success",message:t});info=(t,a)=>this.create({...a,type:"info",message:t});warning=(t,a)=>this.create({...a,type:"warning",message:t});loading=(t,a)=>this.create({...a,type:"loading",message:t});promise=(t,a)=>{if(!a)return;let o;a.loading!==void 0&&(o=this.create({...a,promise:t,type:"loading",message:typeof a.loading=="string"?a.loading:a.loading()}));const s=t instanceof Promise?t:t();let c=o!==void 0;return s.then(l=>{if(typeof l=="object"&&l&&"ok"in l&&typeof l.ok=="boolean"&&!l.ok){c=!1;const v=zc(l);this.create({id:o,type:"error",message:v})}else if(a.success!==void 0){c=!1;const v=typeof a.success=="function"?a.success(l):a.success;this.create({id:o,type:"success",message:v})}}).catch(l=>{if(a.error!==void 0){c=!1;const v=typeof a.error=="function"?a.error(l):a.error;this.create({id:o,type:"error",message:v})}}).finally(()=>{c&&(this.dismiss(o),o=void 0),a.finally?.()}),o};custom=(t,a)=>{const o=a?.id||Dn++;return this.create({component:t,id:o,...a}),o};removeHeight=t=>{this.heights=this.heights.filter(a=>a.toastId!==t)};setHeight=t=>{const a=this.#r(t.toastId);if(a===null){this.heights.push(t);return}this.heights[a]=t};reset=()=>{this.toasts=[],this.heights=[]}}function zc(i){return i&&typeof i=="object"&&"status"in i?`HTTP error! Status: ${i.status}`:`Error! ${i}`}const Re=new Uc;function qc(i,t){return Re.create({message:i,...t})}class Gc{#e=ue(()=>Re.toasts.filter(t=>!t.dismiss));get toasts(){return e(this.#e)}}const Wc=qc,ze=Object.assign(Wc,{success:Re.success,info:Re.info,warning:Re.warning,error:Re.error,custom:Re.custom,message:Re.message,promise:Re.promise,dismiss:Re.dismiss,loading:Re.loading,getActiveToasts:()=>Re.toasts.filter(i=>!i.dismiss)});function ji(i){return i.label!==void 0}function Jc(){let i=f(Pe(typeof document<"u"?document.hidden:!1));return ke(()=>Ei(document,"visibilitychange",()=>{d(i,document.hidden,!0)})),{get current(){return e(i)}}}const Fn=4e3,Vc=14,Yc=45,Kc=200,Qc=.05,Zc={toast:"",title:"",description:"",loader:"",closeButton:"",cancelButton:"",actionButton:"",action:"",warning:"",error:"",success:"",default:"",info:"",loading:""};function Xc(i){const[t,a]=i.split("-"),o=[];return t&&o.push(t),a&&o.push(a),o}function Hn(i){return 1/(1.5+Math.abs(i)/20)}var tv=k("<div><!></div>"),ev=(i,t,a,o,s)=>{e(t)||!e(a)||(o(),s.toast.onDismiss?.(s.toast))},rv=k('<button data-close-button=""><!></button>'),av=k('<div data-icon=""><!> <!></div>'),iv=k('<div data-description=""><!></div>'),ov=(i,t,a,o)=>{ji(t.toast.cancel)&&e(a)&&(t.toast.cancel?.onClick?.(i),o())},nv=k('<button data-button="" data-cancel=""> </button>'),sv=(i,t,a)=>{ji(t.toast.action)&&(t.toast.action?.onClick(i),!i.defaultPrevented&&a())},dv=k('<button data-button=""> </button>'),lv=k('<!> <div data-content=""><div data-title=""><!></div> <!></div> <!> <!>',1),cv=k('<li data-sonner-toast=""><!> <!></li>');function vv(i,t){Rt(t,!0);const a=G=>{var Z=Et(),W=ut(Z);{var A=N=>{var it=tv(),rt=r(it);te(rt,()=>t.loadingIcon),K(Y=>{ge(it,1,Y),Nt(it,"data-visible",e($)==="loading")},[()=>tr(Jr(e(Jt)?.loader,t.toast?.classes?.loader,"sonner-loader"))]),m(N,it)},I=N=>{{let it=ue(()=>Jr(e(Jt)?.loader,t.toast.classes?.loader)),rt=ue(()=>e($)==="loading");Nc(N,{get class(){return e(it)},get visible(){return e(rt)}})}};O(W,N=>{t.loadingIcon?N(A):N(I,!1)})}m(G,Z)};let o=we(t,"cancelButtonStyle",3,""),s=we(t,"actionButtonStyle",3,""),c=we(t,"descriptionClass",3,""),l=we(t,"unstyled",3,!1),v=we(t,"defaultRichColors",3,!1);const g={...Zc};let u=f(!1),p=f(!1),h=f(!1),b=f(!1),x=f(!1),w=f(0),S=f(0),R=t.toast.duration||t.duration||Fn,C=f(void 0),T=f(null),E=f(null);const _=ue(()=>t.index===0),L=ue(()=>t.index+1<=t.visibleToasts),$=ue(()=>t.toast.type),H=ue(()=>t.toast.dismissable!==!1),U=ue(()=>t.toast.class||""),Q=ue(()=>t.toast.descriptionClass||""),mt=ue(()=>Re.heights.findIndex(G=>G.toastId===t.toast.id)||0),lt=ue(()=>t.toast.closeButton??t.closeButton),nt=ue(()=>t.toast.duration??t.duration??Fn);let ct=null;const vt=ue(()=>t.position.split("-")),Dt=ue(()=>Re.heights.reduce((G,Z,W)=>W>=e(mt)?G:G+Z.height,0)),Wt=Jc(),Yt=ue(()=>t.toast.invert||t.invert),Qt=ue(()=>e($)==="loading"),Jt=ue(()=>({...g,...t.classes})),zt=ue(()=>t.toast.title),Ft=ue(()=>t.toast.description);let At=f(0),Ct=f(0);const tt=ue(()=>Math.round(e(mt)*Vc+e(Dt)));ke(()=>{e(zt),e(Ft);let G;t.expanded||t.expandByDefault?G=1:G=1-t.index*Qc;const Z=dr(()=>e(C));if(Z===void 0)return;Z.style.setProperty("height","auto");const W=Z.offsetHeight,A=Z.getBoundingClientRect().height,I=Math.round(A/G+Number.EPSILON&100)/100;Z.style.removeProperty("height");let N;Math.abs(I-W)<1?N=I:N=W,d(S,N,!0),dr(()=>{Re.setHeight({toastId:t.toast.id,height:N})})});function yt(){d(p,!0),d(w,e(tt),!0),Re.removeHeight(t.toast.id),setTimeout(()=>{Re.remove(t.toast.id)},Kc)}let pt;const at=ue(()=>t.toast.promise&&e($)==="loading"||t.toast.duration===Number.POSITIVE_INFINITY);function P(){d(At,new Date().getTime(),!0),pt=setTimeout(()=>{t.toast.onAutoClose?.(t.toast),yt()},R)}function xt(){if(e(Ct)<e(At)){const G=new Date().getTime()-e(At);R=R-G}d(Ct,new Date().getTime(),!0)}ke(()=>{t.toast.updated&&(clearTimeout(pt),R=e(nt),P())}),ke(()=>(e(at)||(t.expanded||t.interacting||Wt.current?xt():P()),()=>clearTimeout(pt))),qr(()=>{d(u,!0);const G=e(C)?.getBoundingClientRect().height;return d(S,G,!0),Re.setHeight({toastId:t.toast.id,height:G}),()=>{Re.removeHeight(t.toast.id)}}),ke(()=>{t.toast.delete&&dr(()=>{yt(),t.toast.onDismiss?.(t.toast)})});const ft=G=>{if(e(Qt))return;d(w,e(tt),!0);const Z=G.target;Z.setPointerCapture(G.pointerId),Z.tagName!=="BUTTON"&&(d(h,!0),ct={x:G.clientX,y:G.clientY})},V=()=>{if(e(b)||!e(H))return;ct=null;const G=Number(e(C)?.style.getPropertyValue("--swipe-amount-x").replace("px","")||0),Z=Number(e(C)?.style.getPropertyValue("--swipe-amount-y").replace("px","")||0),W=new Date().getTime()-0,A=e(T)==="x"?G:Z,I=Math.abs(A)/W;if(Math.abs(A)>=Yc||I>.11){d(w,e(tt),!0),t.toast.onDismiss?.(t.toast),e(T)==="x"?d(E,G>0?"right":"left",!0):d(E,Z>0?"down":"up",!0),yt(),d(b,!0);return}else e(C)?.style.setProperty("--swipe-amount-x","0px"),e(C)?.style.setProperty("--swipe-amount-y","0px");d(x,!1),d(h,!1),d(T,null)},et=G=>{if(!ct||!e(H)||(window.getSelection()?.toString().length??-1)>0)return;const W=G.clientY-ct.y,A=G.clientX-ct.x,I=t.swipeDirections??Xc(t.position);!e(T)&&(Math.abs(A)>1||Math.abs(W)>1)&&d(T,Math.abs(A)>Math.abs(W)?"x":"y",!0);let N={x:0,y:0};if(e(T)==="y"){if(I.includes("top")||I.includes("bottom"))if(I.includes("top")&&W<0||I.includes("bottom")&&W>0)N.y=W;else{const it=W*Hn(W);N.y=Math.abs(it)<Math.abs(W)?it:W}}else if(e(T)==="x"&&(I.includes("left")||I.includes("right")))if(I.includes("left")&&A<0||I.includes("right")&&A>0)N.x=A;else{const it=A*Hn(A);N.x=Math.abs(it)<Math.abs(A)?it:A}(Math.abs(N.x)>0||Math.abs(N.y)>0)&&d(x,!0),e(C)?.style.setProperty("--swipe-amount-x",`${N.x}px`),e(C)?.style.setProperty("--swipe-amount-y",`${N.y}px`)},ht=()=>{d(h,!1),d(T,null),ct=null},bt=ue(()=>t.toast.icon?t.toast.icon:e($)==="success"?t.successIcon:e($)==="error"?t.errorIcon:e($)==="warning"?t.warningIcon:e($)==="info"?t.infoIcon:e($)==="loading"?t.loadingIcon:null);var wt=cv();Nt(wt,"tabindex",0);let Ut;wt.__pointermove=et,wt.__pointerup=V,wt.__pointerdown=ft;var jt=r(wt);{var Pt=G=>{var Z=rv();Z.__click=[ev,Qt,H,yt,t];var W=r(Z);te(W,()=>t.closeIcon??Zt),K(A=>{Nt(Z,"aria-label",t.closeButtonAriaLabel),Nt(Z,"data-disabled",e(Qt)),ge(Z,1,A)},[()=>tr(Jr(e(Jt)?.closeButton,t.toast?.classes?.closeButton))]),m(G,Z)};O(jt,G=>{e(lt)&&!t.toast.component&&e($)!=="loading"&&t.closeIcon!==null&&G(Pt)})}var Lt=n(jt,2);{var st=G=>{const Z=ue(()=>t.toast.component);var W=Et(),A=ut(W);sr(A,()=>e(Z),(I,N)=>{N(I,oe(()=>t.toast.componentProps,{closeToast:yt}))}),m(G,W)},kt=G=>{var Z=lv(),W=ut(Z);{var A=X=>{var j=av(),dt=r(j);{var Mt=q=>{var gt=Et(),$t=ut(gt);{var Ht=ot=>{var _t=Et(),It=ut(_t);sr(It,()=>t.toast.icon,(Vt,Xt)=>{Xt(Vt,{})}),m(ot,_t)},J=ot=>{a(ot)};O($t,ot=>{t.toast.icon?ot(Ht):ot(J,!1)})}m(q,gt)};O(dt,q=>{(t.toast.promise||e($)==="loading")&&q(Mt)})}var Gt=n(dt,2);{var St=q=>{var gt=Et(),$t=ut(gt);{var Ht=ot=>{var _t=Et(),It=ut(_t);sr(It,()=>t.toast.icon,(Vt,Xt)=>{Xt(Vt,{})}),m(ot,_t)},J=ot=>{var _t=Et(),It=ut(_t);{var Vt=Kt=>{var ee=Et(),le=ut(ee);te(le,()=>t.successIcon??Zt),m(Kt,ee)},Xt=Kt=>{var ee=Et(),le=ut(ee);{var qt=ce=>{var ae=Et(),me=ut(ae);te(me,()=>t.errorIcon??Zt),m(ce,ae)},de=ce=>{var ae=Et(),me=ut(ae);{var pe=ve=>{var Ce=Et(),Me=ut(Ce);te(Me,()=>t.warningIcon??Zt),m(ve,Ce)},re=ve=>{var Ce=Et(),Me=ut(Ce);{var Ot=ie=>{var fe=Et(),he=ut(fe);te(he,()=>t.infoIcon??Zt),m(ie,fe)};O(Me,ie=>{e($)==="info"&&ie(Ot)},!0)}m(ve,Ce)};O(me,ve=>{e($)==="warning"?ve(pe):ve(re,!1)},!0)}m(ce,ae)};O(le,ce=>{e($)==="error"?ce(qt):ce(de,!1)},!0)}m(Kt,ee)};O(It,Kt=>{e($)==="success"?Kt(Vt):Kt(Xt,!1)},!0)}m(ot,_t)};O($t,ot=>{t.toast.icon?ot(Ht):ot(J,!1)})}m(q,gt)};O(Gt,q=>{t.toast.type!=="loading"&&q(St)})}K(q=>ge(j,1,q),[()=>tr(Jr(e(Jt)?.icon,t.toast?.classes?.icon))]),m(X,j)};O(W,X=>{(e($)||t.toast.icon||t.toast.promise)&&t.toast.icon!==null&&(e(bt)!==null||t.toast.icon)&&X(A)})}var I=n(W,2),N=r(I),it=r(N);{var rt=X=>{var j=Et(),dt=ut(j);{var Mt=St=>{const q=ue(()=>t.toast.title);var gt=Et(),$t=ut(gt);sr($t,()=>e(q),(Ht,J)=>{J(Ht,oe(()=>t.toast.componentProps))}),m(St,gt)},Gt=St=>{var q=ca();K(()=>y(q,t.toast.title)),m(St,q)};O(dt,St=>{typeof t.toast.title!="string"?St(Mt):St(Gt,!1)})}m(X,j)};O(it,X=>{t.toast.title&&X(rt)})}var Y=n(N,2);{var z=X=>{var j=iv(),dt=r(j);{var Mt=St=>{const q=ue(()=>t.toast.description);var gt=Et(),$t=ut(gt);sr($t,()=>e(q),(Ht,J)=>{J(Ht,oe(()=>t.toast.componentProps))}),m(St,gt)},Gt=St=>{var q=ca();K(()=>y(q,t.toast.description)),m(St,q)};O(dt,St=>{typeof t.toast.description!="string"?St(Mt):St(Gt,!1)})}K(St=>ge(j,1,St),[()=>tr(Jr(c(),e(Q),e(Jt)?.description,t.toast.classes?.description))]),m(X,j)};O(Y,X=>{t.toast.description&&X(z)})}var B=n(I,2);{var M=X=>{var j=Et(),dt=ut(j);{var Mt=St=>{var q=Et(),gt=ut(q);sr(gt,()=>t.toast.cancel,($t,Ht)=>{Ht($t,{})}),m(St,q)},Gt=St=>{var q=Et(),gt=ut(q);{var $t=Ht=>{var J=nv();J.__click=[ov,t,H,yt];var ot=r(J);K(_t=>{Qe(J,t.toast.cancelButtonStyle??o()),ge(J,1,_t),y(ot,t.toast.cancel.label)},[()=>tr(Jr(e(Jt)?.cancelButton,t.toast?.classes?.cancelButton))]),m(Ht,J)};O(gt,Ht=>{ji(t.toast.cancel)&&Ht($t)},!0)}m(St,q)};O(dt,St=>{typeof t.toast.cancel=="function"?St(Mt):St(Gt,!1)})}m(X,j)};O(B,X=>{t.toast.cancel&&X(M)})}var D=n(B,2);{var F=X=>{var j=Et(),dt=ut(j);{var Mt=St=>{var q=Et(),gt=ut(q);sr(gt,()=>t.toast.action,($t,Ht)=>{Ht($t,{})}),m(St,q)},Gt=St=>{var q=Et(),gt=ut(q);{var $t=Ht=>{var J=dv();J.__click=[sv,t,yt];var ot=r(J);K(_t=>{Qe(J,t.toast.actionButtonStyle??s()),ge(J,1,_t),y(ot,t.toast.action.label)},[()=>tr(Jr(e(Jt)?.actionButton,t.toast?.classes?.actionButton))]),m(Ht,J)};O(gt,Ht=>{ji(t.toast.action)&&Ht($t)},!0)}m(St,q)};O(dt,St=>{typeof t.toast.action=="function"?St(Mt):St(Gt,!1)})}m(X,j)};O(D,X=>{t.toast.action&&X(F)})}K(X=>ge(N,1,X),[()=>tr(Jr(e(Jt)?.title,t.toast?.classes?.title))]),m(G,Z)};O(Lt,G=>{t.toast.component?G(st):G(kt,!1)})}sn(wt,G=>d(C,G),()=>e(C)),K((G,Z,W,A)=>{ge(wt,1,G),Nt(wt,"data-rich-colors",t.toast.richColors??v()),Nt(wt,"data-styled",!(t.toast.component||t.toast.unstyled||l())),Nt(wt,"data-mounted",e(u)),Nt(wt,"data-promise",Z),Nt(wt,"data-swiped",e(x)),Nt(wt,"data-removed",e(p)),Nt(wt,"data-visible",e(L)),Nt(wt,"data-y-position",e(vt)[0]),Nt(wt,"data-x-position",e(vt)[1]),Nt(wt,"data-index",t.index),Nt(wt,"data-front",e(_)),Nt(wt,"data-swiping",e(h)),Nt(wt,"data-dismissable",e(H)),Nt(wt,"data-type",e($)),Nt(wt,"data-invert",e(Yt)),Nt(wt,"data-swipe-out",e(b)),Nt(wt,"data-swipe-direction",e(E)),Nt(wt,"data-expanded",W),Ut=Qe(wt,`${t.style} ${t.toast.style}`,Ut,A)},[()=>tr(Jr(t.class,e(U),e(Jt)?.toast,t.toast?.classes?.toast,e(Jt)?.[e($)],t.toast?.classes?.[e($)])),()=>!!t.toast.promise,()=>!!(t.expanded||t.expandByDefault&&e(u)),()=>({"--index":t.index,"--toasts-before":t.index,"--z-index":Re.toasts.length-t.index,"--offset":`${e(p)?e(w):e(tt)}px`,"--initial-height":t.expandByDefault?"auto":`${e(S)}px`})]),rd("dragend",wt,ht),m(i,wt),Bt()}ye(["pointermove","pointerup","pointerdown","click"]);var gv=Lr('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20" data-sonner-success-icon=""><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"></path></svg>');function uv(i){var t=gv();m(i,t)}var mv=Lr('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20" data-sonner-error-icon=""><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>');function pv(i){var t=mv();m(i,t)}var fv=Lr('<svg viewBox="0 0 64 64" fill="currentColor" height="20" width="20" data-sonner-warning-icon="" xmlns="http://www.w3.org/2000/svg"><path d="M32.427,7.987c2.183,0.124 4,1.165 5.096,3.281l17.936,36.208c1.739,3.66 -0.954,8.585 -5.373,8.656l-36.119,0c-4.022,-0.064 -7.322,-4.631 -5.352,-8.696l18.271,-36.207c0.342,-0.65 0.498,-0.838 0.793,-1.179c1.186,-1.375 2.483,-2.111 4.748,-2.063Zm-0.295,3.997c-0.687,0.034 -1.316,0.419 -1.659,1.017c-6.312,11.979 -12.397,24.081 -18.301,36.267c-0.546,1.225 0.391,2.797 1.762,2.863c12.06,0.195 24.125,0.195 36.185,0c1.325,-0.064 2.321,-1.584 1.769,-2.85c-5.793,-12.184 -11.765,-24.286 -17.966,-36.267c-0.366,-0.651 -0.903,-1.042 -1.79,-1.03Z"></path><path d="M33.631,40.581l-3.348,0l-0.368,-16.449l4.1,0l-0.384,16.449Zm-3.828,5.03c0,-0.609 0.197,-1.113 0.592,-1.514c0.396,-0.4 0.935,-0.601 1.618,-0.601c0.684,0 1.223,0.201 1.618,0.601c0.395,0.401 0.593,0.905 0.593,1.514c0,0.587 -0.193,1.078 -0.577,1.473c-0.385,0.395 -0.929,0.593 -1.634,0.593c-0.705,0 -1.249,-0.198 -1.634,-0.593c-0.384,-0.395 -0.576,-0.886 -0.576,-1.473Z"></path></svg>');function xv(i){var t=fv();m(i,t)}var bv=Lr('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20" data-sonner-info-icon=""><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd"></path></svg>');function yv(i){var t=bv();m(i,t)}var hv=Lr('<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-sonner-close-icon=""><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>');function _v(i){var t=hv();m(i,t)}const kv=3,kd="24px",wd="16px",wv=4e3,Cv=356,$v=14,lo="dark",_i="light";function Sv(i,t){const a={};return[i,t].forEach((o,s)=>{const c=s===1,l=c?"--mobile-offset":"--offset",v=c?wd:kd;function g(u){["top","right","bottom","left"].forEach(p=>{a[`${l}-${p}`]=typeof u=="number"?`${u}px`:u})}typeof o=="number"||typeof o=="string"?g(o):typeof o=="object"?["top","right","bottom","left"].forEach(u=>{const p=o[u];p===void 0?a[`${l}-${u}`]=v:a[`${l}-${u}`]=typeof p=="number"?`${p}px`:p}):g(v)}),a}var Tv=k("<ol></ol>"),Mv=k('<section aria-live="polite" aria-relevant="additions text" aria-atomic="false" class="svelte-nbs0zk"><!></section>');function Ev(i,t){Rt(t,!0);function a(tt){return tt!=="system"?tt:typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?lo:_i}let o=we(t,"invert",3,!1),s=we(t,"position",3,"bottom-right"),c=we(t,"hotkey",19,()=>["altKey","KeyT"]),l=we(t,"expand",3,!1),v=we(t,"closeButton",3,!1),g=we(t,"offset",3,kd),u=we(t,"mobileOffset",3,wd),p=we(t,"theme",3,"light"),h=we(t,"richColors",3,!1),b=we(t,"duration",3,wv),x=we(t,"visibleToasts",3,kv),w=we(t,"toastOptions",19,()=>({})),S=we(t,"dir",7,"auto"),R=we(t,"gap",3,$v),C=we(t,"containerAriaLabel",3,"Notifications"),T=we(t,"closeButtonAriaLabel",3,"Close toast"),E=ne(t,["$$slots","$$events","$$legacy","invert","position","hotkey","expand","closeButton","offset","mobileOffset","theme","richColors","duration","visibleToasts","toastOptions","dir","gap","loadingIcon","successIcon","errorIcon","warningIcon","closeIcon","infoIcon","containerAriaLabel","class","closeButtonAriaLabel","onblur","onfocus","onmouseenter","onmousemove","onmouseleave","ondragend","onpointerdown","onpointerup"]);function _(){if(S()!=="auto")return S();if(typeof window>"u"||typeof document>"u")return"ltr";const tt=document.documentElement.getAttribute("dir");return tt==="auto"||!tt?(dr(()=>S(window.getComputedStyle(document.documentElement).direction??"ltr")),S()):(dr(()=>S(tt)),tt)}const L=ue(()=>Array.from(new Set([s(),...Re.toasts.filter(tt=>tt.position).map(tt=>tt.position)].filter(Boolean))));let $=f(!1),H=f(!1),U=f(Pe(a(p()))),Q=f(void 0),mt=f(null),lt=f(!1);const nt=ue(()=>c().join("+").replace(/Key/g,"").replace(/Digit/g,""));ke(()=>{Re.toasts.length<=1&&d($,!1)}),ke(()=>{const tt=Re.toasts.filter(yt=>yt.dismiss&&!yt.delete);if(tt.length>0){const yt=Re.toasts.map(pt=>tt.find(P=>P.id===pt.id)?{...pt,delete:!0}:pt);Re.toasts=yt}}),ke(()=>()=>{e(Q)&&e(mt)&&(e(mt).focus({preventScroll:!0}),d(mt,null),d(lt,!1))}),qr(()=>(Re.reset(),Ei(document,"keydown",yt=>{c().every(at=>yt[at]||yt.code===at)&&(d($,!0),e(Q)?.focus()),yt.code==="Escape"&&(document.activeElement===e(Q)||e(Q)?.contains(document.activeElement))&&d($,!1)}))),ke(()=>{if(p()!=="system"&&d(U,p()),typeof window<"u"){p()==="system"&&(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?d(U,lo):d(U,_i));const tt=window.matchMedia("(prefers-color-scheme: dark)"),yt=({matches:pt})=>{d(U,pt?lo:_i,!0)};"addEventListener"in tt?tt.addEventListener("change",yt):tt.addListener(yt)}});const ct=tt=>{t.onblur?.(tt),e(lt)&&!tt.currentTarget.contains(tt.relatedTarget)&&(d(lt,!1),e(mt)&&(e(mt).focus({preventScroll:!0}),d(mt,null)))},vt=tt=>{t.onfocus?.(tt),!(tt.target instanceof HTMLElement&&tt.target.dataset.dismissable==="false")&&(e(lt)||(d(lt,!0),d(mt,tt.relatedTarget,!0)))},Dt=tt=>{t.onpointerdown?.(tt),!(tt.target instanceof HTMLElement&&tt.target.dataset.dismissable==="false")&&d(H,!0)},Wt=tt=>{t.onmouseenter?.(tt),d($,!0)},Yt=tt=>{t.onmouseleave?.(tt),e(H)||d($,!1)},Qt=tt=>{t.onmousemove?.(tt),d($,!0)},Jt=tt=>{t.ondragend?.(tt),d($,!1)},zt=tt=>{t.onpointerup?.(tt),d(H,!1)};Oc.set(new Gc);var Ft=Mv();Nt(Ft,"tabindex",-1);var At=r(Ft);{var Ct=tt=>{var yt=Et(),pt=ut(yt);xe(pt,18,()=>e(L),at=>at,(at,P,xt,ft)=>{const V=ue(()=>{const[bt,wt]=P.split("-");return{y:bt,x:wt}}),et=ue(()=>Sv(g(),u()));var ht=Tv();Bo(ht,(bt,wt)=>({tabindex:-1,dir:bt,class:t.class,"data-sonner-toaster":!0,"data-sonner-theme":e(U),"data-y-position":e(V).y,"data-x-position":e(V).x,style:t.style,onblur:ct,onfocus:vt,onmouseenter:Wt,onmousemove:Qt,onmouseleave:Yt,ondragend:Jt,onpointerdown:Dt,onpointerup:zt,...E,[Oa]:wt}),[_,()=>({"--front-toast-height":`${Re.heights[0]?.height}px`,"--width":`${Cv}px`,"--gap":`${R()}px`,"--offset-top":e(et)["--offset-top"],"--offset-right":e(et)["--offset-right"],"--offset-bottom":e(et)["--offset-bottom"],"--offset-left":e(et)["--offset-left"],"--mobile-offset-top":e(et)["--mobile-offset-top"],"--mobile-offset-right":e(et)["--mobile-offset-right"],"--mobile-offset-bottom":e(et)["--mobile-offset-bottom"],"--mobile-offset-left":e(et)["--mobile-offset-left"]})],void 0,"svelte-nbs0zk"),xe(ht,23,()=>Re.toasts.filter(bt=>!bt.position&&e(xt)===0||bt.position===P),bt=>bt.id,(bt,wt,Ut,jt)=>{{const Pt=B=>{var M=Et(),D=ut(M);{var F=j=>{var dt=Et(),Mt=ut(dt);te(Mt,()=>t.successIcon??Zt),m(j,dt)},X=j=>{var dt=Et(),Mt=ut(dt);{var Gt=St=>{uv(St)};O(Mt,St=>{t.successIcon!==null&&St(Gt)},!0)}m(j,dt)};O(D,j=>{t.successIcon?j(F):j(X,!1)})}m(B,M)},Lt=B=>{var M=Et(),D=ut(M);{var F=j=>{var dt=Et(),Mt=ut(dt);te(Mt,()=>t.errorIcon??Zt),m(j,dt)},X=j=>{var dt=Et(),Mt=ut(dt);{var Gt=St=>{pv(St)};O(Mt,St=>{t.errorIcon!==null&&St(Gt)},!0)}m(j,dt)};O(D,j=>{t.errorIcon?j(F):j(X,!1)})}m(B,M)},st=B=>{var M=Et(),D=ut(M);{var F=j=>{var dt=Et(),Mt=ut(dt);te(Mt,()=>t.warningIcon??Zt),m(j,dt)},X=j=>{var dt=Et(),Mt=ut(dt);{var Gt=St=>{xv(St)};O(Mt,St=>{t.warningIcon!==null&&St(Gt)},!0)}m(j,dt)};O(D,j=>{t.warningIcon?j(F):j(X,!1)})}m(B,M)},kt=B=>{var M=Et(),D=ut(M);{var F=j=>{var dt=Et(),Mt=ut(dt);te(Mt,()=>t.infoIcon??Zt),m(j,dt)},X=j=>{var dt=Et(),Mt=ut(dt);{var Gt=St=>{yv(St)};O(Mt,St=>{t.infoIcon!==null&&St(Gt)},!0)}m(j,dt)};O(D,j=>{t.infoIcon?j(F):j(X,!1)})}m(B,M)},G=B=>{var M=Et(),D=ut(M);{var F=j=>{var dt=Et(),Mt=ut(dt);te(Mt,()=>t.closeIcon??Zt),m(j,dt)},X=j=>{var dt=Et(),Mt=ut(dt);{var Gt=St=>{_v(St)};O(Mt,St=>{t.closeIcon!==null&&St(Gt)},!0)}m(j,dt)};O(D,j=>{t.closeIcon?j(F):j(X,!1)})}m(B,M)};let Z=ue(()=>w()?.duration??b()),W=ue(()=>w()?.class??""),A=ue(()=>w()?.descriptionClass||""),I=ue(()=>w()?.style??""),N=ue(()=>w().classes||{}),it=ue(()=>w().unstyled??!1),rt=ue(()=>w()?.cancelButtonStyle??""),Y=ue(()=>w()?.actionButtonStyle??""),z=ue(()=>w()?.closeButtonAriaLabel??T());vv(bt,{get index(){return e(Ut)},get toast(){return e(wt)},get defaultRichColors(){return h()},get duration(){return e(Z)},get class(){return e(W)},get descriptionClass(){return e(A)},get invert(){return o()},get visibleToasts(){return x()},get closeButton(){return v()},get interacting(){return e(H)},get position(){return P},get style(){return e(I)},get classes(){return e(N)},get unstyled(){return e(it)},get cancelButtonStyle(){return e(rt)},get actionButtonStyle(){return e(Y)},get closeButtonAriaLabel(){return e(z)},get expandByDefault(){return l()},get expanded(){return e($)},get loadingIcon(){return t.loadingIcon},successIcon:Pt,errorIcon:Lt,warningIcon:st,infoIcon:kt,closeIcon:G,$$slots:{successIcon:!0,errorIcon:!0,warningIcon:!0,infoIcon:!0,closeIcon:!0}})}}),sn(ht,bt=>d(Q,bt),()=>e(Q)),K(()=>ht.dir=ht.dir),m(at,ht)}),m(tt,yt)};O(At,tt=>{Re.toasts.length>0&&tt(Ct)})}K(()=>Nt(Ft,"aria-label",`${C()??""} ${e(nt)??""}`)),m(i,Ft),Bt()}const Lv=()=>{navigator.clipboard.writeText("me@fariz.dev"),ze.success("Email copied to clipboard!")};var Pv=k('<div class="flex flex-col sm:flex-row items-center gap-4 relative"><div class="group relative"><button class="flex items-center gap-3 pr-4 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 hover:border-amber-300 dark:hover:border-amber-600 h-10"><div class="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 group-hover:bg-amber-200 dark:group-hover:bg-amber-900/50 transition-colors duration-300"><!></div> <span class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">me@fariz.dev</span></button> <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">Click to copy email</div></div> <div class="flex items-center gap-2"><a href="https://github.com/farizink" target="_blank" rel="noreferrer" class="group/social relative"><div class="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-110 hover:border-gray-900 hover:bg-gray-900"><!></div> <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover/social:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">GitHub</div></a> <a href="https://discord.com/users/383164336450830336" target="_blank" rel="noreferrer" class="group/social relative"><div class="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-110 hover:border-indigo-500 hover:bg-indigo-500"><!></div> <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover/social:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">Discord</div></a> <a href="https://open.spotify.com/user/ci98z18wa1ebncapbw5hq350x" target="_blank" rel="noreferrer" class="group/social relative"><div class="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-110 hover:border-green-500 hover:bg-green-500"><!></div> <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover/social:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">Spotify</div></a></div></div>');function Av(i,t){Rt(t,!0);var a=Pv(),o=r(a),s=r(o);s.__click=[Lv];var c=r(s),l=r(c);$c(l,{class:"w-5 h-5 text-amber-600 dark:text-amber-400"});var v=n(o,2),g=r(v),u=r(g),p=r(u);Tc(p,{class:"w-5 h-5 text-gray-600 dark:text-gray-400 group-hover/social:text-white transition-colors duration-300"});var h=n(g,2),b=r(h),x=r(b);Ec(x,{class:"w-5 h-5 text-gray-600 dark:text-gray-400 group-hover/social:text-white transition-colors duration-300"});var w=n(h,2),S=r(w),R=r(S);Pc(R,{class:"w-5 h-5 text-gray-600 dark:text-gray-400 group-hover/social:text-white transition-colors duration-300"}),m(i,a),Bt()}ye(["click"]);var Iv=(i,t)=>t(),jv=(i,t)=>d(t,!1),Nv=(i,t)=>i.key==="Escape"&&d(t,!1),Rv=(i,t)=>d(t,!1),Bv=k('<div class="aspect-[3/4] h-full w-full bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse svelte-et6md"><div class="h-full w-full relative overflow-hidden svelte-et6md"><div class="absolute inset-0 bg-gradient-to-t from-gray-200/50 to-transparent dark:from-gray-600/50 svelte-et6md"></div> <div class="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 svelte-et6md"><div class="h-24 w-24 rounded-full bg-gray-300/50 dark:bg-gray-600/50 animate-pulse svelte-et6md"></div></div></div></div>'),Dv=k('<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 svelte-et6md" role="dialog" aria-modal="true" aria-label="Photo modal" tabindex="-1"><div class="relative group animate-in zoom-in duration-300 svelte-et6md" role="document" tabindex="-1"><button class="absolute hover:cursor-pointer -top-3 -right-3 z-10 w-10 h-10 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 transition-all duration-200 shadow-lg hover:scale-110 svelte-et6md" aria-label="Close photo modal"><svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" class="svelte-et6md"><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" class="svelte-et6md"></path></svg></button> <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden max-w-sm md:max-w-md lg:max-w-lg svelte-et6md"><!> <img alt="Fariz"/></div> <div class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl pointer-events-none svelte-et6md"></div></div></div>'),Fv=k('<div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center opacity-0 hover:opacity-100 transition-opacity duration-300 svelte-et6md"><p class="text-xs text-gray-400 dark:text-gray-600 italic svelte-et6md">Click my name for a surprise</p></div>'),Hv=k(`<main class="min-h-screen flex items-center justify-center px-4 py-8 relative svelte-et6md"><div class="max-w-4xl w-full svelte-et6md"><div class="text-left svelte-et6md"><div class="mb-3 svelte-et6md"><h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight svelte-et6md"><button type="button" class="cursor-text text-left w-full bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 bg-clip-text text-transparent dark:from-white dark:via-blue-200 dark:to-purple-200 dark:text-transparent animate-gradient svelte-et6md">Nizar Alfarizi Akbar</button></h1></div> <div class="mb-6 svelte-et6md"><p class="text-lg md:text-xl text-gray-600 dark:text-gray-400 svelte-et6md">known as <span class="font-bold text-blue-600 dark:text-blue-400 italic svelte-et6md">Fariz</span></p></div> <div class="mb-8 svelte-et6md"><p class="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl svelte-et6md">Software engineer based in Surabaya, Indonesia. Specializing in backend development and
          high-quality web applications. Currently building <span class="italic text-blue-600 dark:text-blue-400 svelte-et6md">"gabut"</span> projects and crushing work tasks 🙂</p></div> <div class="mb-12 svelte-et6md"><!></div> <div class="svelte-et6md"><!></div></div></div> <!> <!></main>`);function Ov(i){let t=f(!1),a=f(null),o=f(!1);const s=()=>{const _=[lc,cc];e(t)||(d(a,_[Math.floor(Math.random()*_.length)],!0),d(o,!0)),d(t,!e(t))},c=()=>{d(o,!1)};var l=Hv(),v=r(l),g=r(v),u=r(g),p=r(u),h=r(p);h.__click=[Iv,s];var b=n(u,6),x=r(b);Av(x,{});var w=n(b,2),S=r(w);wc(S,{});var R=n(v,2);{var C=_=>{var L=Dv();L.__click=[jv,t],L.__keydown=[Nv,t];var $=r(L),H=r($);H.__click=[Rv,t];var U=n(H,2),Q=r(U);{var mt=nt=>{var ct=Bv();m(nt,ct)};O(Q,nt=>{e(o)&&nt(mt)})}var lt=n(Q,2);K(()=>{Nt(lt,"src",e(a)),ge(lt,1,`w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 ${e(o)?"opacity-0":"opacity-100"}`,"svelte-et6md")}),rd("load",lt,c),m(_,L)};O(R,_=>{e(t)&&e(a)&&_(C)})}var T=n(R,2);{var E=_=>{var L=Fv();m(_,L)};O(T,_=>{e(t)||_(E)})}m(i,l)}ye(["click","keydown"]);const Uv=[{path:"/",component:Ov,title:"Fariz - Software Engineer",description:"Software engineer passionate about building innovative solutions and developer tools. Explore my projects and free online utilities.",keywords:"fariz, software engineer, developer tools, web development, programming, javascript, typescript, svelte",robots:"index, follow"}],ai=[{name:"Text & Data Processing",description:"Tools for working with text and data",tools:[{id:"json-parser",name:"JSON Parser & Formatter",description:"Format, validate, and minify JSON data with ease",icon:fd,features:["Validate JSON","Format with custom indentation","Minify JSON","Copy to clipboard"],comingSoon:!1},{id:"text-case-converter",name:"Text Case Converter",description:"Convert between different text cases",icon:xa,features:["UPPERCASE","lowercase","Title Case","camelCase","snake_case","kebab-case"],comingSoon:!1},{id:"lorem-ipsum-generator",name:"Lorem Ipsum Generator",description:"Generate placeholder text for design and testing",icon:He,features:["Multiple variations","Custom length","Paragraphs","Sentences","Words"],comingSoon:!1},{id:"character-counter",name:"Character Counter",description:"Count characters, words, and analyze text",icon:Nr,features:["Character count","Word count","Reading time","Sentences","Paragraphs"],comingSoon:!1},{id:"text-diff",name:"Text Diff Tool",description:"Compare two text blocks and highlight differences",icon:qa,features:["Side by side comparison","Highlight differences","Merge suggestions"],comingSoon:!1},{id:"url-parser",name:"URL Parser/Analyzer",description:"Parse URLs and extract components",icon:oo,features:["Protocol extraction","Domain parsing","Query parameters","Hash fragments"],comingSoon:!1},{id:"hash-generator",name:"Hash Generator",description:"Generate various hash values from text",icon:Qr,features:["MD5","SHA1","SHA256","SHA512"],comingSoon:!1},{id:"base64-converter",name:"Base64 Converter",description:"Encode and decode Base64 strings",icon:Qr,features:["Text encoding","File encoding","Batch processing","Download support"],comingSoon:!1}]},{name:"Generators & Converters",description:"Create and transform various content",tools:[{id:"qr-code-generator",name:"QR Code Generator",description:"Generate custom QR codes for URLs, text, or any data",icon:zo,features:["Custom colors","Error correction levels","Logo upload","Multiple formats"],comingSoon:!1},{id:"color-converter",name:"Color Converter",description:"Convert between different color formats",icon:Yr,features:["HEX","RGB","HSL","HSV","CMYK"],comingSoon:!1},{id:"gradient-generator",name:"CSS Gradient Generator",description:"Create beautiful CSS gradients",icon:Yr,features:["Linear gradients","Radial gradients","Color stops","CSS output"],comingSoon:!1},{id:"color-palette",name:"Color Palette Generator",description:"Generate color palettes for your projects",icon:Yr,features:["Complementary colors","Analogous colors","Export options"],comingSoon:!1},{id:"password-generator",name:"Password Generator",description:"Generate secure and random passwords",icon:Uo,features:["Custom length","Character options","Strength indicator","History"],comingSoon:!1},{id:"slug-generator",name:"Slug Generator",description:"Generate URL-friendly slugs from text",icon:oo,features:["Multiple formats","Custom separators","Lowercase options"],comingSoon:!1},{id:"timestamp-converter",name:"Timestamp Converter",description:"Convert between different timestamp formats",icon:Tr,features:["Unix timestamp","ISO format","Human readable","Multiple timezones"],comingSoon:!1}]},{name:"Web Development",description:"Essential tools for web developers",tools:[{id:"url-encoder",name:"URL Encoder/Decoder",description:"Encode and decode URLs for safe transmission",icon:oo,features:["URL encoding","URL decoding","Batch processing","Copy to clipboard"],comingSoon:!1},{id:"html-encoder",name:"HTML Encoder/Decoder",description:"Encode and decode HTML entities",icon:He,features:["HTML encoding","HTML decoding","Character escaping","Safe for XSS"],comingSoon:!1},{id:"css-minifier",name:"CSS Minifier",description:"Minify and optimize CSS code",icon:He,features:["Remove whitespace","Optimize properties","Compress output","Before/after comparison"],comingSoon:!1},{id:"js-minifier",name:"JavaScript Minifier",description:"Minify and optimize JavaScript code",icon:He,features:["Remove comments","Variable renaming","Dead code elimination","Compression"],comingSoon:!1},{id:"css-shadow-generator",name:"CSS Shadow Generator",description:"Generate CSS box shadows with visual preview",icon:Yr,features:["Multiple shadows","Inset/outset","Color picker","CSS output"],comingSoon:!1},{id:"meta-tag-generator",name:"Meta Tag Generator",description:"Generate SEO-friendly meta tags",icon:He,features:["Open Graph","Twitter Cards","JSON-LD structured data","Preview"],comingSoon:!1}]},{name:"Utilities & Calculators",description:"Helpful tools for everyday tasks",tools:[{id:"age-calculator",name:"Age Calculator",description:"Calculate exact age and time between dates",icon:Va,features:["Exact age calculation","Birthday countdown","Zodiac signs","Fun facts"],comingSoon:!1},{id:"bmi-calculator",name:"BMI Calculator",description:"Calculate Body Mass Index and health metrics",icon:Nr,features:["BMI calculation","Weight categories","Health tips","Metric/imperial units"],comingSoon:!1},{id:"percentage-calculator",name:"Percentage Calculator",description:"Calculate percentages and related values",icon:Nr,features:["Percentage of","Percentage increase/decrease","Reverse percentage","Step-by-step"],comingSoon:!1},{id:"tip-calculator",name:"Tip Calculator",description:"Calculate tips and split bills",icon:Nr,features:["Tip calculation","Bill splitting","Tax inclusion","Custom percentages"],comingSoon:!1},{id:"unit-converter",name:"Unit Converter",description:"Convert between different units of measurement",icon:Tr,features:["Length","Weight","Temperature","Area","Volume"],comingSoon:!1},{id:"random-picker",name:"Random Picker",description:"Randomly pick items from a list",icon:Ve,features:["Fair randomization","Multiple selections","Import/export lists","History"],comingSoon:!1},{id:"hash-comparer",name:"Hash Comparer",description:"Compare hash values to verify integrity",icon:Qr,features:["Multiple hash types","File support","Integrity checking","Bulk comparison"],comingSoon:!1},{id:"jwt-decoder",name:"JWT Decoder",description:"Decode and validate JWT tokens",icon:Uo,features:["Header parsing","Payload decoding","Signature validation","Pretty printing"],comingSoon:!1},{id:"cron-generator",name:"Cron Expression Generator",description:"Generate and validate cron expressions",icon:Tr,features:["Visual builder","Next run times","Expression validation","Common presets"],comingSoon:!1},{id:"ascii-art-generator",name:"ASCII Art Generator",description:"Create ASCII art from text and images",icon:He,features:["Text to ASCII","Image to ASCII","Multiple fonts","Custom styles"],comingSoon:!1},{id:"markdown-preview",name:"Markdown Preview",description:"Preview and export Markdown documents",icon:He,features:["Live preview","Export options","Syntax highlighting","Custom themes"],comingSoon:!1}]}];var zv=k('<meta name="description" content="A collection of useful developer tools including JSON formatter, color converter, password generator, and more."/>'),qv=(i,t,a)=>d(t,a,!0),Gv=k('<button> <span class="badge badge-primary ml-1"> </span></button>'),Wv=(i,t,a)=>t(e(a).id),Jv=(i,t,a)=>t(i,e(a).id),Vv=k('<span class="badge badge-warning">Coming Soon</span>'),Yv=k('<span class="badge"> </span>'),Kv=k('<span class="badge"> </span>'),Qv=k('<button class="w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset group" tabindex="0"><div class="flex items-center justify-between"><div class="flex items-center space-x-3"><div class="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 dark:from-primary-500 dark:to-primary-700 rounded-lg flex items-center justify-center flex-shrink-0"><!></div> <div class="flex-1 min-w-0"><div class="flex items-center gap-2"><h3 class="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"> </h3> <div class="badge badge-primary text-xs font-bold"> </div> <!></div> <p class="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-1 svelte-n22gmb"> </p></div></div> <!></div> <div class="flex flex-wrap gap-1 mt-3 ml-[3.5rem]"><!> <!></div></button>'),Zv=k('<div class="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="text-gray-400 mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">No tools found</h3> <p class="text-gray-600 dark:text-gray-400">Try adjusting your search terms or browse all categories.</p></div>'),Xv=k('<div class="container mx-auto px-4 py-6 max-w-4xl"><div class="text-center mb-8"><h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Developer Tools</h1> <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Essential tools for developers, designers, and power users.</p></div> <div class="max-w-md mx-auto mb-6"><div class="relative"><!> <input type="text" placeholder="Search tools..." class="input w-full !pl-10 text-sm"/></div></div> <div class="flex flex-wrap justify-center gap-1 mb-6"></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700"></div> <!></div>');function tg(i,t){Rt(t,!0);let a=f(""),o=f("All");const s=["All",...ai.map(T=>T.name)],c=ue(()=>{let T=ai.flatMap(E=>E.tools);if(e(o)!=="All"&&(T=ai.find(E=>E.name===e(o))?.tools||[]),e(a).trim()){const E=e(a).toLowerCase();T=T.filter(_=>_.name.toLowerCase().includes(E)||_.description.toLowerCase().includes(E)||_.features.some(L=>L.toLowerCase().includes(E)))}return T}),l=T=>T==="All"?ai.flatMap(E=>E.tools).length:ai.find(E=>E.name===T)?.tools.length||0;function v(T){Te(`/tools/${T}`)}function g(T,E){(T.key==="Enter"||T.key===" ")&&(T.preventDefault(),v(E))}var u=Xv();Er(T=>{var E=zv();_r.title="Developer Tools - Collection of Useful Tools",m(T,E)});var p=n(r(u),2),h=r(p),b=r(h);gi(b,{class:"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"});var x=n(b,2),w=n(p,2);xe(w,20,()=>s,T=>T,(T,E)=>{var _=Gv();_.__click=[qv,o,E];var L=r(_),$=n(L),H=r($);K(U=>{ge(_,1,`btn btn-sm ${e(o)===E?"btn-primary":"btn-secondary"}`),y(L,`${E??""} `),y(H,U)},[()=>l(E)]),m(T,_)});var S=n(w,2);xe(S,23,()=>e(c),T=>T.id,(T,E,_)=>{var L=Qv();L.__click=[Wv,v,E],L.__keydown=[Jv,g,E];var $=r(L),H=r($),U=r(H),Q=r(U);sr(Q,()=>e(E).icon,(yt,pt)=>{pt(yt,{class:"w-5 h-5 text-white"})});var mt=n(U,2),lt=r(mt),nt=r(lt),ct=r(nt),vt=n(nt,2),Dt=r(vt),Wt=n(vt,2);{var Yt=yt=>{var pt=Vv();m(yt,pt)};O(Wt,yt=>{e(E).comingSoon&&yt(Yt)})}var Qt=n(lt,2),Jt=r(Qt),zt=n(H,2);D0(zt,{class:"w-5 h-5 text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors flex-shrink-0 ml-3"});var Ft=n($,2),At=r(Ft);xe(At,16,()=>e(E).features.slice(0,4),yt=>yt,(yt,pt)=>{var at=Yv(),P=r(at);K(()=>y(P,pt)),m(yt,at)});var Ct=n(At,2);{var tt=yt=>{var pt=Kv(),at=r(pt);K(()=>y(at,`+${e(E).features.length-4}`)),m(yt,pt)};O(Ct,yt=>{e(E).features.length>4&&yt(tt)})}K(()=>{Nt(L,"aria-label",`Open ${e(E).name??""}`),y(ct,e(E).name),y(Dt,e(_)+1),y(Jt,e(E).description)}),m(T,L)});var R=n(S,2);{var C=T=>{var E=Zv(),_=r(E),L=r(_);gi(L,{class:"w-12 h-12 mx-auto"}),m(T,E)};O(R,T=>{e(c).length===0&&T(C)})}Tt(x,()=>e(a),T=>d(a,T)),m(i,u),Bt()}ye(["click","keydown"]);function eg(i,t,a,o){try{if(!e(t).trim()){d(a,"Please enter some JSON to format");return}const s=JSON.parse(e(t));d(o,JSON.stringify(s,null,2),!0),d(a,""),ze.success("JSON formatted successfully")}catch(s){d(a,s.message,!0),ze.error("Invalid JSON")}}function rg(i,t,a,o){try{if(!e(t).trim()){d(a,"Please enter some JSON to minify");return}const s=JSON.parse(e(t));d(o,JSON.stringify(s),!0),d(a,""),ze.success("JSON minified successfully")}catch(s){d(a,s.message,!0),ze.error("Invalid JSON")}}function ag(i,t){e(t)&&(navigator.clipboard.writeText(e(t)),ze.success("Copied to clipboard"))}function ig(i,t,a,o){d(t,""),d(a,""),d(o,""),ze.success("Cleared all content")}function og(i,t,a,o){d(t,JSON.stringify({name:"FarizInk",role:"Developer",skills:["Svelte","TypeScript","Tailwind"],active:!0,projects:{total:42,featured:["Portfolio","Tools"]}},null,2),!0),d(a,""),d(o,"")}function ng(){Te("/tools")}var sg=k('<div class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-2"><!> <p class="text-sm text-red-700 dark:text-red-300"> </p></div>'),dg=k('<div class="max-w-6xl mx-auto p-6 animate-fade-in"><div class="mb-8"><div class="flex items-center gap-4 mb-6"><button class="btn btn-primary"><!> Back to Tools</button></div> <div class="text-center mb-12"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-success-400 to-success-600 rounded-2xl mb-6 shadow-lg animate-scale-in"><!></div> <h1 class="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white mb-4 tracking-tight">JSON Parser</h1> <p class="text-xl text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto leading-relaxed">Parse, validate, format, and minify JSON data with syntax highlighting and error detection.</p></div></div> <div class="mb-8 flex flex-wrap gap-2 items-center justify-center"><button class="btn btn-primary btn-sm">Load Sample</button> <button class="btn btn-primary btn-sm text-red-500 hover:text-red-600"><!> Clear</button></div> <div class="mb-16"><div class="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full"><div class="flex flex-col gap-4"><div class="flex items-center justify-between"><h3 class="text-sm font-medium text-secondary-700 dark:text-secondary-300">Input JSON</h3> <div class="flex gap-2"><button class="btn btn-primary btn-sm">Format</button> <button class="btn btn-secondary btn-sm">Minify</button></div></div> <textarea placeholder="Paste your JSON here..." class="textarea font-mono text-sm h-[400px] lg:h-[600px]"></textarea> <!></div> <div class="flex flex-col gap-4"><div class="flex items-center justify-between"><h3 class="text-sm font-medium text-secondary-700 dark:text-secondary-300">Output</h3> <button class="btn btn-outline btn-sm"><!> Copy</button></div> <div class="relative h-[400px] lg:h-[600px]"><textarea readonly="" class="textarea font-mono text-sm h-full" placeholder="Result will appear here..."></textarea></div></div></div></div> <div class="grid grid-cols-1 md:grid-cols-3 gap-6"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><div class="w-12 h-12 bg-success-100 dark:bg-success-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Validation</h3> <p class="text-gray-600 dark:text-gray-400">Instantly validates your JSON and provides helpful error messages for invalid syntax.</p></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><div class="w-12 h-12 bg-success-100 dark:bg-success-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Formatting</h3> <p class="text-gray-600 dark:text-gray-400">Beautify minified JSON with proper indentation or minify it for production use.</p></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><div class="w-12 h-12 bg-success-100 dark:bg-success-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Privacy</h3> <p class="text-gray-600 dark:text-gray-400">All processing happens in your browser. No data is sent to any server.</p></div></div></div>');function lg(i,t){Rt(t,!0);let a=f(""),o=f(""),s=f("");var c=dg(),l=r(c),v=r(l),g=r(v);g.__click=[ng];var u=r(g);Ie(u,{class:"w-5 h-5 mr-2"});var p=n(v,2),h=r(p),b=r(h);fd(b,{class:"w-10 h-10 text-white"});var x=n(l,2),w=r(x);w.__click=[og,a,s,o];var S=n(w,2);S.__click=[ig,a,o,s];var R=r(S);Wi(R,{class:"w-4 h-4 mr-2"});var C=n(x,2),T=r(C),E=r(T),_=r(E),L=n(r(_),2),$=r(L);$.__click=[eg,a,s,o];var H=n($,2);H.__click=[rg,a,s,o];var U=n(_,2),Q=n(U,2);{var mt=at=>{var P=sg(),xt=r(P);ln(xt,{class:"w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5"});var ft=n(xt,2),V=r(ft);K(()=>y(V,e(s))),m(at,P)};O(Q,at=>{e(s)&&at(mt)})}var lt=n(E,2),nt=r(lt),ct=n(r(nt),2);ct.__click=[ag,o];var vt=r(ct);be(vt,{class:"w-4 h-4 mr-2"});var Dt=n(nt,2),Wt=r(Dt),Yt=n(C,2),Qt=r(Yt),Jt=r(Qt),zt=r(Jt);ma(zt,{class:"w-6 h-6 text-success-600 dark:text-success-400"});var Ft=n(Qt,2),At=r(Ft),Ct=r(At);ma(Ct,{class:"w-6 h-6 text-success-600 dark:text-success-400"});var tt=n(Ft,2),yt=r(tt),pt=r(yt);ma(pt,{class:"w-6 h-6 text-success-600 dark:text-success-400"}),K(()=>{$.disabled=!e(a),H.disabled=!e(a),ct.disabled=!e(o),cd(Wt,e(o))}),Tt(U,()=>e(a),at=>d(a,at)),m(i,c),Bt()}ye(["click"]);function On(i,t,a,o,s,c,l,v,g,u,p){const h=t(e(a).h,e(a).s,e(a).l);d(o,h,!0),d(s,c(h.r,h.g,h.b),!0),d(l,v(h.r,h.g,h.b),!0),d(g,u(h.r,h.g,h.b),!0),p(e(s),"HSL")}function cg(i,t,a){const o=Math.floor(Math.random()*256),s=Math.floor(Math.random()*256),c=Math.floor(Math.random()*256);d(t,{r:o,g:s,b:c},!0),a(),ze.success("Generated random color")}function vg(){Te("/tools")}var gg=k('<div class="flex flex-col items-center justify-center h-48 text-gray-500 dark:text-gray-400"><!> <p>No colors yet. Start converting!</p></div>'),ug=(i,t,a,o)=>{d(t,e(a).color,!0),o()},mg=k('<div class="group relative"><button type="button" class="w-full h-12 rounded-lg cursor-pointer border-2 border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-400 transition-colors"></button> <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10"> </div></div>'),pg=k('<div class="grid grid-cols-5 gap-2"></div>'),fg=(i,t,a)=>t(e(a),"HEX"),xg=k('<div class="flex items-center gap-2"><label class="w-8 text-sm font-medium text-gray-700 dark:text-gray-300 uppercase"> </label> <input type="range" min="0" max="255" class="flex-1 accent-primary-500"/> <input type="number" min="0" max="255" class="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"/></div>'),bg=(i,t,a)=>t(`rgb(${e(a).r}, ${e(a).g}, ${e(a).b})`,"RGB"),yg=k('<div class="flex items-center gap-2"><label class="w-8 text-sm font-medium text-gray-700 dark:text-gray-300 uppercase"> </label> <input type="range" min="0" class="flex-1 accent-primary-500"/> <input type="number" min="0" class="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"/></div>'),hg=(i,t,a)=>t(`hsl(${e(a).h}, ${e(a).s}%, ${e(a).l}%)`,"HSL"),_g=(i,t,a)=>t(`hsv(${e(a).h}, ${e(a).s}%, ${e(a).v}%)`,"HSV"),kg=k('<div class="flex justify-between text-sm"><span class="text-gray-600 dark:text-gray-400 uppercase"> </span> <span class="font-mono text-gray-900 dark:text-white"> </span></div>'),wg=(i,t,a)=>t(`cmyk(${e(a).c}%, ${e(a).m}%, ${e(a).y}%, ${e(a).k}%)`,"CMYK"),Cg=k('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="btn btn-primary"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Color Converter</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Convert between different color formats instantly. Perfect for designers and developers.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Color Converter</li></ol></nav> <div class="mb-6 flex justify-center"><button class="btn btn-primary btn-sm"><!> Random Color</button></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-8"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Color Preview</h2> <div class="w-full h-48 rounded-xl shadow-inner mb-4 transition-colors duration-300"></div> <div class="grid grid-cols-2 gap-4 text-sm"><div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><span class="text-gray-600 dark:text-gray-400">HEX:</span> <span class="font-mono text-gray-900 dark:text-white ml-2"> </span></div> <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><span class="text-gray-600 dark:text-gray-400">RGB:</span> <span class="font-mono text-gray-900 dark:text-white ml-2"> </span></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Colors</h2> <!></div></div> <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-8"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">HEX</h3> <div class="flex gap-2"><input class="input font-mono" placeholder="#000000"/> <button class="btn btn-secondary btn-sm"><!></button></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">RGB</h3> <div class="space-y-3"><!> <button class="btn btn-secondary w-full mt-2">Copy RGB</button></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">HSL</h3> <div class="space-y-3"><!> <button class="btn btn-secondary w-full mt-2">Copy HSL</button></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">HSV</h3> <div class="space-y-2"><div class="flex justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Hue:</span> <span class="font-mono text-gray-900 dark:text-white"> </span></div> <div class="flex justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Saturation:</span> <span class="font-mono text-gray-900 dark:text-white"> </span></div> <div class="flex justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Value:</span> <span class="font-mono text-gray-900 dark:text-white"> </span></div> <button class="btn btn-secondary w-full mt-4">Copy HSV</button></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">CMYK</h3> <div class="space-y-2"><!> <button class="btn btn-secondary w-full mt-4">Copy CMYK</button></div></div></div> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"><div class="flex items-center gap-2 mb-2 text-primary-600 dark:text-primary-400"><!> <h3 class="font-medium">Multiple Formats</h3></div> <p class="text-sm text-gray-600 dark:text-gray-400">Support for HEX, RGB, HSL, HSV, and CMYK color formats</p></div> <div class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"><div class="flex items-center gap-2 mb-2 text-primary-600 dark:text-primary-400"><!> <h3 class="font-medium">Live Conversion</h3></div> <p class="text-sm text-gray-600 dark:text-gray-400">Real-time color conversion as you type or adjust sliders</p></div> <div class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"><div class="flex items-center gap-2 mb-2 text-primary-600 dark:text-primary-400"><!> <h3 class="font-medium">Color History</h3></div> <p class="text-sm text-gray-600 dark:text-gray-400">Keep track of your recently used colors for quick access</p></div></div></div>');function $g(i,t){Rt(t,!0);let a=f("#3B82F6"),o=f(Pe({r:59,g:130,b:246})),s=f(Pe({h:217,s:91,l:60})),c=f(Pe({h:217,s:76,v:96})),l=f(Pe({c:76,m:47,y:0,k:4})),v=f(Pe([]));function g(ot){const _t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(ot);return _t?{r:parseInt(_t[1],16),g:parseInt(_t[2],16),b:parseInt(_t[3],16)}:null}function u(ot,_t,It){return"#"+((1<<24)+(ot<<16)+(_t<<8)+It).toString(16).slice(1).toUpperCase()}function p(ot,_t,It){ot/=255,_t/=255,It/=255;const Vt=Math.max(ot,_t,It),Xt=Math.min(ot,_t,It);let Kt=0,ee=0,le=(Vt+Xt)/2;if(Vt!==Xt){const qt=Vt-Xt;switch(ee=le>.5?qt/(2-Vt-Xt):qt/(Vt+Xt),Vt){case ot:Kt=((_t-It)/qt+(_t<It?6:0))/6;break;case _t:Kt=((It-ot)/qt+2)/6;break;case It:Kt=((ot-_t)/qt+4)/6;break}}return{h:Math.round(Kt*360),s:Math.round(ee*100),l:Math.round(le*100)}}function h(ot,_t,It){ot/=360,_t/=100,It/=100;let Vt,Xt,Kt;if(_t===0)Vt=Xt=Kt=It;else{const ee=(de,ce,ae)=>(ae<0&&(ae+=1),ae>1&&(ae-=1),ae<.16666666666666666?de+(ce-de)*6*ae:ae<.5?ce:ae<.6666666666666666?de+(ce-de)*(.6666666666666666-ae)*6:de),le=It<.5?It*(1+_t):It+_t-It*_t,qt=2*It-le;Vt=ee(qt,le,ot+1/3),Xt=ee(qt,le,ot),Kt=ee(qt,le,ot-1/3)}return{r:Math.round(Vt*255),g:Math.round(Xt*255),b:Math.round(Kt*255)}}function b(ot,_t,It){ot/=255,_t/=255,It/=255;const Vt=Math.max(ot,_t,It),Xt=Math.min(ot,_t,It);let Kt=0,ee=0,le=Vt;const qt=Vt-Xt;if(ee=Vt===0?0:qt/Vt,Vt!==Xt)switch(Vt){case ot:Kt=((_t-It)/qt+(_t<It?6:0))/6;break;case _t:Kt=((It-ot)/qt+2)/6;break;case It:Kt=((ot-_t)/qt+4)/6;break}return{h:Math.round(Kt*360),s:Math.round(ee*100),v:Math.round(le*100)}}function x(ot,_t,It){let Vt=1-ot/255,Xt=1-_t/255,Kt=1-It/255,ee=Math.min(Vt,Math.min(Xt,Kt));return ee===1?Vt=Xt=Kt=0:(Vt=(Vt-ee)/(1-ee),Xt=(Xt-ee)/(1-ee),Kt=(Kt-ee)/(1-ee)),{c:Math.round(Vt*100),m:Math.round(Xt*100),y:Math.round(Kt*100),k:Math.round(ee*100)}}function w(){const ot=g(e(a));ot&&(d(o,ot,!0),d(s,p(ot.r,ot.g,ot.b),!0),d(c,b(ot.r,ot.g,ot.b),!0),d(l,x(ot.r,ot.g,ot.b),!0),C(e(a),"HEX"))}function S(){d(a,u(e(o).r,e(o).g,e(o).b),!0),d(s,p(e(o).r,e(o).g,e(o).b),!0),d(c,b(e(o).r,e(o).g,e(o).b),!0),d(l,x(e(o).r,e(o).g,e(o).b),!0),C(e(a),"RGB")}function R(ot,_t){navigator.clipboard.writeText(ot),ze.success(`Copied ${_t} value`)}function C(ot,_t){e(v).length>0&&e(v)[0].color===ot||(e(v).unshift({color:ot,format:_t,timestamp:new Date}),e(v).length>10&&d(v,e(v).slice(0,10),!0))}var T=Cg(),E=r(T),_=r(E),L=r(_);L.__click=[vg];var $=r(L);Ie($,{class:"w-5 h-5 mr-2"});var H=n(_,2),U=r(H),Q=r(U);Yr(Q,{class:"w-10 h-10 text-white"});var mt=n(E,4),lt=r(mt);lt.__click=[cg,o,S];var nt=r(lt);Tr(nt,{class:"w-4 h-4 mr-2"});var ct=n(mt,2),vt=r(ct),Dt=n(r(vt),2),Wt=n(Dt,2),Yt=r(Wt),Qt=n(r(Yt),2),Jt=r(Qt),zt=n(Yt,2),Ft=n(r(zt),2),At=r(Ft),Ct=n(vt,2),tt=n(r(Ct),2);{var yt=ot=>{var _t=gg(),It=r(_t);Ka(It,{class:"w-8 h-8 mb-2 opacity-50"}),m(ot,_t)},pt=ot=>{var _t=pg();xe(_t,21,()=>e(v),It=>It.timestamp.getTime(),(It,Vt)=>{var Xt=mg(),Kt=r(Xt);Kt.__click=[ug,a,Vt,w];var ee=n(Kt,2),le=r(ee);K(()=>{Qe(Kt,`background-color: ${e(Vt).color??""}`),Nt(Kt,"aria-label",`Select color ${e(Vt).color}`),y(le,e(Vt).color)}),m(It,Xt)}),m(ot,_t)};O(tt,ot=>{e(v).length===0?ot(yt):ot(pt,!1)})}var at=n(ct,2),P=r(at),xt=n(r(P),2),ft=r(xt);ft.__input=w;var V=n(ft,2);V.__click=[fg,R,a];var et=r(V);be(et,{class:"w-4 h-4"});var ht=n(P,2),bt=n(r(ht),2),wt=r(bt);xe(wt,16,()=>["r","g","b"],ot=>ot,(ot,_t)=>{var It=xg(),Vt=r(It),Xt=r(Vt),Kt=n(Vt,2);Kt.__input=S;var ee=n(Kt,2);ee.__input=S,K(()=>{Nt(Vt,"for",`rgb-${_t}`),y(Xt,`${_t??""}:`),Nt(Kt,"id",`rgb-${_t}`)}),Tt(Kt,()=>e(o)[_t],le=>e(o)[_t]=le),Tt(ee,()=>e(o)[_t],le=>e(o)[_t]=le),m(ot,It)});var Ut=n(wt,2);Ut.__click=[bg,R,o];var jt=n(ht,2),Pt=n(r(jt),2),Lt=r(Pt);xe(Lt,16,()=>["h","s","l"],ot=>ot,(ot,_t)=>{var It=yg(),Vt=r(It),Xt=r(Vt),Kt=n(Vt,2);Kt.__input=[On,h,s,o,a,u,c,b,l,x,C];var ee=n(Kt,2);ee.__input=[On,h,s,o,a,u,c,b,l,x,C],K(()=>{Nt(Vt,"for",`hsl-${_t}`),y(Xt,`${_t??""}:`),Nt(Kt,"id",`hsl-${_t}`),Nt(Kt,"max",_t==="h"?360:100),Nt(ee,"max",_t==="h"?360:100)}),Tt(Kt,()=>e(s)[_t],le=>e(s)[_t]=le),Tt(ee,()=>e(s)[_t],le=>e(s)[_t]=le),m(ot,It)});var st=n(Lt,2);st.__click=[hg,R,s];var kt=n(jt,2),G=n(r(kt),2),Z=r(G),W=n(r(Z),2),A=r(W),I=n(Z,2),N=n(r(I),2),it=r(N),rt=n(I,2),Y=n(r(rt),2),z=r(Y),B=n(rt,2);B.__click=[_g,R,c];var M=n(kt,2),D=n(r(M),2),F=r(D);xe(F,16,()=>["c","m","y","k"],ot=>ot,(ot,_t)=>{var It=kg(),Vt=r(It),Xt=r(Vt),Kt=n(Vt,2),ee=r(Kt);K(()=>{y(Xt,`${(_t==="k"?"Key (Black)":_t)??""}:`),y(ee,`${e(l)[_t]??""}%`)}),m(ot,It)});var X=n(F,2);X.__click=[wg,R,l];var j=n(at,2),dt=r(j),Mt=r(dt),Gt=r(Mt);Yr(Gt,{class:"w-5 h-5"});var St=n(dt,2),q=r(St),gt=r(q);Ve(gt,{class:"w-5 h-5"});var $t=n(St,2),Ht=r($t),J=r(Ht);Ka(J,{class:"w-5 h-5"}),K(()=>{Qe(Dt,`background-color: ${e(a)??""}`),y(Jt,e(a)),y(At,`${e(o).r??""}, ${e(o).g??""}, ${e(o).b??""}`),y(A,`${e(c).h??""}°`),y(it,`${e(c).s??""}%`),y(z,`${e(c).v??""}%`)}),Tt(ft,()=>e(a),ot=>d(a,ot)),m(i,T),Bt()}ye(["click","input"]);function Sg(i,t,a,o){try{d(t,decodeURIComponent(e(a)),!0),d(o,encodeURIComponent(e(t)),!0)}catch{d(t,"Error: Invalid URL encoding"),d(o,"")}}function Tg(i,t,a){try{const o=e(t).split(`
`).filter(s=>s.trim());d(a,o.map(s=>{try{const c=encodeURIComponent(s),l=decodeURIComponent(c);return{original:s,encoded:c,decoded:l}}catch{return{original:s,encoded:"Error: Invalid characters",decoded:"Error: Invalid characters"}}}),!0)}catch{d(a,[],!0)}}function Mg(i,t,a,o,s,c){d(t,""),d(a,""),d(o,""),d(s,""),d(c,[],!0)}function Eg(i,t,a){const o=e(t).map(s=>`Original: ${s.original}
Encoded: ${s.encoded}
Decoded: ${s.decoded}
`).join(`
`);a(o,"batch")}function Lg(i,t){d(t,`https://example.com/search?q=hello world&category=web development
https://test.com/path/to/file?name=John Doe&age=30&city=New York
https://api.example.com/users?filter=name eq "John Smith"&sort=created_at desc
https://site.com/page?param=value with spaces&another=special!@#$%^&*()chars
https://demo.com/search?query=测试&lang=zh-CN`)}function Pg(){Te("/tools")}var Ag=(i,t)=>d(t,"single"),Ig=(i,t)=>d(t,"batch"),jg=k('<button class="btn btn-primary">Encode URL</button> <button class="btn btn-primary">Decode URL</button>',1),Ng=k('<button class="btn btn-primary">Process Batch</button> <button class="btn btn-primary">Load Sample URLs</button>',1),Rg=(i,t,a)=>{d(t,"https://example.com/search?q=hello world&category=web development"),a()},Bg=(i,t,a)=>{d(t,"https://test.com/path?name=John Doe&city=New York"),a()},Dg=(i,t,a)=>{d(t,"https://site.com/search?q=测试&lang=zh-CN"),a()},Fg=(i,t,a)=>t(e(a),"encoded"),Hg=k('<button class="btn btn-primary btn-sm"> </button>'),Og=k('<div class="absolute inset-0 flex items-center justify-center pointer-events-none"><p class="text-gray-400 dark:text-gray-600">Enter text above to see encoded result</p></div>'),Ug=(i,t,a)=>t(e(a),"decoded"),zg=k('<button class="btn btn-primary btn-sm"> </button>'),qg=k('<div class="absolute inset-0 flex items-center justify-center pointer-events-none"><p class="text-gray-400 dark:text-gray-600">Round-trip test result will appear here</p></div>'),Gg=k('<div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Input Text / URL</h2> <span class="text-sm text-gray-500 dark:text-gray-400"> </span></div> <textarea placeholder="Enter text or URL to encode/decode..." class="w-full h-64 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"></textarea> <div class="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quick Examples:</p> <div class="space-y-1"><button class="block w-full text-left text-sm text-primary-600 dark:text-primary-400 hover:underline">Query parameters with spaces</button> <button class="block w-full text-left text-sm text-primary-600 dark:text-primary-400 hover:underline">Multiple parameters with special characters</button> <button class="block w-full text-left text-sm text-primary-600 dark:text-primary-400 hover:underline">International characters (Chinese)</button></div></div></div> <div><div class="mb-4"><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Encoded URL</h2> <!></div> <div class="relative"><textarea placeholder="Encoded URL will appear here..." class="w-full h-28 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none"></textarea> <!></div></div> <div><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Decoded URL (Round-trip)</h2> <!></div> <div class="relative"><textarea placeholder="Decoded URL will appear here..." class="w-full h-28 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none"></textarea> <!></div></div></div></div>'),Wg=k('<button class="btn btn-primary btn-sm"> </button>'),Jg=k('<div class="flex items-center justify-center h-full"><p class="text-gray-400 dark:text-gray-600">Process batch URLs to see results</p></div>'),Vg=k('<div class="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0"><div class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> </div> <div class="space-y-2"><div><span class="text-xs font-medium text-gray-500 dark:text-gray-400">Original:</span> <div class="font-mono text-xs text-gray-900 dark:text-white break-all"> </div></div> <div><span class="text-xs font-medium text-primary-600 dark:text-primary-400">Encoded:</span> <div class="font-mono text-xs text-green-700 dark:text-green-300 break-all"> </div></div> <div><span class="text-xs font-medium text-primary-600 dark:text-primary-400">Decoded:</span> <div class="font-mono text-xs text-primary-700 dark:text-primary-300 break-all"> </div></div></div></div>'),Yg=k('<div class="space-y-4"></div>'),Kg=k('<div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Batch Input (one URL per line)</h2> <span class="text-sm text-gray-500 dark:text-gray-400"> </span></div> <textarea placeholder="Enter multiple URLs or text strings, one per line..." class="w-full h-96 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"></textarea></div> <div><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Batch Results</h2> <!></div> <div class="h-96 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 p-4"><!></div></div></div>'),Qg=k(`<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="btn btn-primary"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">URL Encoder/Decoder</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Encode and decode URLs safely. Perfect for handling special characters and international
        content.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">URL Encoder/Decoder</li></ol></nav> <div class="mb-6"><div class="flex justify-center"><div class="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1"><button>Single URL</button> <button>Batch Processing</button></div></div></div> <div class="mb-6 flex flex-wrap gap-4 items-center justify-center"><!> <button class="btn btn-primary">Clear All</button></div> <!> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Safe Encoding</h3> <p class="text-gray-600 dark:text-gray-400">Properly encodes special characters, spaces, and international characters for safe URL
        transmission</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Batch Processing</h3> <p class="text-gray-600 dark:text-gray-400">Process multiple URLs at once with batch mode for efficient workflow</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Round-trip Testing</h3> <p class="text-gray-600 dark:text-gray-400">Automatic round-trip testing ensures your URLs decode back to the original text</p></div></div></div>`);function Zg(i,t){Rt(t,!0);let a=f(""),o=f(""),s=f(""),c=f(""),l=f(Pe([])),v=f(""),g=f("single");function u(){try{d(o,encodeURIComponent(e(a)),!0),d(s,decodeURIComponent(e(o)),!0)}catch{d(o,""),d(s,"")}}function p(pt,at){navigator.clipboard.writeText(pt),d(v,at,!0),setTimeout(()=>{d(v,"")},2e3)}ke(()=>{e(a)&&e(g)==="single"&&u()});var h=Qg(),b=r(h),x=r(b),w=r(x);w.__click=[Pg];var S=r(w);Ie(S,{class:"w-5 h-5 mr-2"});var R=n(x,2),C=r(R),T=r(C);yd(T,{class:"w-10 h-10 text-white"});var E=n(b,4),_=r(E),L=r(_),$=r(L);$.__click=[Ag,g];var H=n($,2);H.__click=[Ig,g];var U=n(E,2),Q=r(U);{var mt=pt=>{var at=jg(),P=ut(at);P.__click=u;var xt=n(P,2);xt.__click=[Sg,s,a,o],m(pt,at)},lt=pt=>{var at=Ng(),P=ut(at);P.__click=[Tg,c,l];var xt=n(P,2);xt.__click=[Lg,c],m(pt,at)};O(Q,pt=>{e(g)==="single"?pt(mt):pt(lt,!1)})}var nt=n(Q,2);nt.__click=[Mg,a,o,s,c,l];var ct=n(U,2);{var vt=pt=>{var at=Gg(),P=r(at),xt=r(P),ft=n(r(xt),2),V=r(ft),et=n(xt,2),ht=n(et,2),bt=n(r(ht),2),wt=r(bt);wt.__click=[Rg,a,u];var Ut=n(wt,2);Ut.__click=[Bg,a,u];var jt=n(Ut,2);jt.__click=[Dg,a,u];var Pt=n(P,2),Lt=r(Pt),st=r(Lt),kt=n(r(st),2);{var G=F=>{var X=Hg();X.__click=[Fg,p,o];var j=r(X);K(()=>y(j,e(v)==="encoded"?"✓ Copied!":"Copy")),m(F,X)};O(kt,F=>{e(o)&&F(G)})}var Z=n(st,2),W=r(Z),A=n(W,2);{var I=F=>{var X=Og();m(F,X)};O(A,F=>{e(o)||F(I)})}var N=n(Lt,2),it=r(N),rt=n(r(it),2);{var Y=F=>{var X=zg();X.__click=[Ug,p,s];var j=r(X);K(()=>y(j,e(v)==="decoded"?"✓ Copied!":"Copy")),m(F,X)};O(rt,F=>{e(s)&&F(Y)})}var z=n(it,2),B=r(z),M=n(B,2);{var D=F=>{var X=qg();m(F,X)};O(M,F=>{e(s)||F(D)})}K(()=>y(V,`${e(a).length??""} characters`)),Tt(et,()=>e(a),F=>d(a,F)),Tt(W,()=>e(o),F=>d(o,F)),Tt(B,()=>e(s),F=>d(s,F)),m(pt,at)},Dt=pt=>{var at=Kg(),P=r(at),xt=r(P),ft=n(r(xt),2),V=r(ft),et=n(xt,2),ht=n(P,2),bt=r(ht),wt=n(r(bt),2);{var Ut=kt=>{var G=Wg();G.__click=[Eg,l,p];var Z=r(G);K(()=>y(Z,e(v)==="batch"?"✓ Copied!":"Copy All")),m(kt,G)};O(wt,kt=>{e(l).length>0&&kt(Ut)})}var jt=n(bt,2),Pt=r(jt);{var Lt=kt=>{var G=Jg();m(kt,G)},st=kt=>{var G=Yg();xe(G,23,()=>e(l),(Z,W)=>Z.original+W,(Z,W,A)=>{var I=Vg(),N=r(I),it=r(N),rt=n(N,2),Y=r(rt),z=n(r(Y),2),B=r(z),M=n(Y,2),D=n(r(M),2),F=r(D),X=n(M,2),j=n(r(X),2),dt=r(j);K(()=>{y(it,`#${e(A)+1}`),y(B,e(W).original),y(F,e(W).encoded),y(dt,e(W).decoded)}),m(Z,I)}),m(kt,G)};O(Pt,kt=>{e(l).length===0?kt(Lt):kt(st,!1)})}K(kt=>y(V,`${kt??""} URLs`),[()=>e(c).split(`
`).filter(kt=>kt.trim()).length]),Tt(et,()=>e(c),kt=>d(c,kt)),m(pt,at)};O(ct,pt=>{e(g)==="single"?pt(vt):pt(Dt,!1)})}var Wt=n(ct,2),Yt=r(Wt),Qt=r(Yt),Jt=r(Qt);cn(Jt,{class:"w-6 h-6 text-primary-600 dark:text-primary-400"});var zt=n(Yt,2),Ft=r(zt),At=r(Ft);Ve(At,{class:"w-6 h-6 text-primary-600 dark:text-primary-400"});var Ct=n(zt,2),tt=r(Ct),yt=r(tt);O0(yt,{class:"w-6 h-6 text-primary-600 dark:text-primary-400"}),K(()=>{ge($,1,`px-4 py-2 rounded-md text-sm font-medium transition-colors ${e(g)==="single"?"bg-primary-100 dark:bg-primary-900/20 text-green-700 dark:text-green-300":"text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"}`),ge(H,1,`px-4 py-2 rounded-md text-sm font-medium transition-colors ${e(g)==="batch"?"bg-primary-100 dark:bg-primary-900/20 text-green-700 dark:text-green-300":"text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"}`)}),m(i,h),Bt()}ye(["click"]);function Xg(i,t,a,o){d(t,""),d(a,""),o()}function tu(i,t,a){navigator.clipboard.writeText(e(t)),d(a,"html"),setTimeout(()=>{d(a,"")},2e3)}function eu(i,t,a){navigator.clipboard.writeText(e(t)),d(a,"markdown"),setTimeout(()=>{d(a,"")},2e3)}function ru(i,t,a){d(t,`# Project Documentation

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

*Last updated: `+new Date().toLocaleDateString()+"*"),a()}function au(){Te("/tools")}var iu=k(`<div class="max-w-7xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Markdown Preview</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Preview and write markdown with live formatting. Perfect for documentation and content
        creation.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Markdown Preview</li></ol></nav> <div class="mb-6 flex flex-wrap gap-4 items-center justify-center"><button class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">Load Sample</button> <button class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">Clear All</button> <button class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"> </button> <button class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-blue-700 transition-colors"> </button> <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">Export HTML</button></div> <div class="mb-6 flex justify-center gap-6 text-sm text-gray-600 dark:text-gray-400"><div class="flex items-center gap-1"><!> <span> </span></div> <div class="flex items-center gap-1"><!> <span> </span></div> <div class="flex items-center gap-1"><!> <span> </span></div></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"><div class="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600"><div class="flex items-center justify-between"><h2 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2"><!> Markdown Editor</h2> <span class="text-sm text-gray-500 dark:text-gray-400">.md</span></div></div> <div class="p-6"><textarea placeholder="Start typing your markdown here..." class="w-full h-96 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"></textarea></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"><div class="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600"><div class="flex items-center justify-between"><h2 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2"><!> Live Preview</h2> <span class="text-sm text-gray-500 dark:text-gray-400">HTML</span></div></div> <div class="p-6 h-96 overflow-y-auto"><div class="prose prose-sm sm:prose-base dark:prose-invert max-w-none"><!></div></div></div></div> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Live Preview</h3> <p class="text-gray-600 dark:text-gray-400">Real-time markdown rendering as you type with instant visual feedback</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Syntax Highlighting</h3> <p class="text-gray-600 dark:text-gray-400">Beautiful code blocks with syntax highlighting for multiple programming languages</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Export Options</h3> <p class="text-gray-600 dark:text-gray-400">Export your markdown as styled HTML with one click for easy sharing</p></div></div></div>`);function ou(i,t){Rt(t,!0);let a=f(`# Welcome to Markdown Preview

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

Happy markdown editing! 🎉`),o=f(""),s=f(""),c=f(0),l=f(0),v=f(0);function g(B){let M=B;M=M.replace(/^### (.*$)/gim,'<h3 class="text-xl font-semibold mb-3 mt-6">$1</h3>'),M=M.replace(/^## (.*$)/gim,'<h2 class="text-2xl font-semibold mb-4 mt-8">$1</h2>'),M=M.replace(/^# (.*$)/gim,'<h1 class="text-3xl font-bold mb-6 mt-8">$1</h1>'),M=M.replace(/\*\*(.+?)\*\*/g,'<strong class="font-semibold">$1</strong>'),M=M.replace(/\*(.+?)\*/g,'<em class="italic">$1</em>'),M=M.replace(/_(.+?)_/g,'<em class="italic">$1</em>'),M=M.replace(/~~(.+?)~~/g,'<del class="line-through">$1</del>'),M=M.replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2" class="text-primary-600 dark:text-primary-400 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>'),M=M.replace(/`([^`]+)`/g,'<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono text-red-600 dark:text-red-400">$1</code>'),M=M.replace(/```(\w+)?\n([\s\S]*?)```/g,(X,j,dt)=>`<div class="bg-gray-900 text-gray-100 rounded-lg p-4 my-4 overflow-x-auto">
        <div class="text-xs text-gray-400 mb-2 font-mono">${j||"text"}</div>
        <pre class="font-mono text-sm"><code>${u(dt.trim())}</code></pre>
      </div>`),M=M.replace(/^> (.*$)/gim,'<blockquote class="border-l-4 border-gray-300 dark:border-gray-600 pl-4 py-2 my-4 italic text-gray-700 dark:text-gray-300">$1</blockquote>'),M=M.replace(/^> (.+?)\n> (.+?)\n> (.+?)$/gim,'<blockquote class="border-l-4 border-gray-300 dark:border-gray-600 pl-4 py-2 my-4 italic text-gray-700 dark:text-gray-300">$1<br>$2<br>$3</blockquote>'),M=M.replace(/^\* (.+)$/gim,'<li class="ml-4">• $1</li>'),M=M.replace(/^- (.+)$/gim,'<li class="ml-4">• $1</li>'),M=M.replace(/^\d+\. (.+)$/gim,'<li class="ml-4 list-decimal list-inside">$1</li>'),M=M.replace(/^---$/gim,'<hr class="my-8 border-gray-300 dark:border-gray-600">'),M=M.replace(/^\*\*\*$/gim,'<hr class="my-8 border-gray-300 dark:border-gray-600">'),M=M.replace(/\n\n/g,'</p><p class="mb-4">'),M='<p class="mb-4">'+M+"</p>",M=M.replace(/<p class="mb-4"><\/p>/g,""),M=M.replace(/<p class="mb-4"><h/g,"<h"),M=M.replace(/<\/h[1-6]><\/p>/g,"</h$1>"),M=M.replace(/<p class="mb-4"><blockquote/g,"<blockquote"),M=M.replace(/<\/blockquote><\/p>/g,"</blockquote>"),M=M.replace(/<p class="mb-4"><div/g,"<div"),M=M.replace(/<\/div><\/p>/g,"</div>"),M=M.replace(/<p class="mb-4"><hr/g,"<hr"),M=M.replace(/<\/p><li/g,"<li"),M=M.replace(/<\/li><\/p>/g,"</li>"),M=M.replace(/\$\$([^$]+)\$\$/g,'<div class="bg-gray-100 dark:bg-gray-800 p-4 my-4 rounded text-center font-mono text-lg">$1</div>'),M=M.replace(/\$([^$]+)\$/g,'<span class="font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">$1</span>'),M=M.replace(/- \[ \] (.+)$/gim,'<div class="flex items-center gap-2 ml-4"><input type="checkbox" disabled class="rounded"> <span>$1</span></div>'),M=M.replace(/- \[x\] (.+)$/gim,'<div class="flex items-center gap-2 ml-4"><input type="checkbox" checked disabled class="rounded"> <span>$1</span></div>');const D=/\|(.+)\|\n\|(.+)\|\n((?:\|.+\|\n?)*)/gim;M=M.replace(D,(X,j,dt,Mt)=>{const Gt=j.split("|").map(q=>`<th class="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left bg-gray-50 dark:bg-gray-800">${q.trim()}</th>`).join(""),St=Mt.split(`
`).filter(q=>q.trim()).map(q=>`<tr>${q.split("|").slice(1,-1).map($t=>`<td class="border border-gray-300 dark:border-gray-600 px-4 py-2">${$t.trim()}</td>`).join("")}</tr>`).join("");return`<div class="overflow-x-auto my-4"><table class="w-full border-collapse border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
        <thead><tr>${Gt}</tr></thead>
        <tbody>${St}</tbody>
      </table></div>`});const F={":)":"😊",":-)":"😊",":(":"😢",":-(":"😢",":D":"😃",":-D":"😃",":P":"😛",":-P":"😛",";)":"😉",";-)":"😉",":heart:":"❤️",":+1:":"👍",":-1:":"👎",":fire:":"🔥",":star:":"⭐",":check:":"✅",":x:":"❌",":warning:":"⚠️",":rocket:":"🚀"};for(const[X,j]of Object.entries(F))M=M.replace(new RegExp(X.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"g"),j);return M}function u(B){const M=document.createElement("div");return M.textContent=B,M.innerHTML}function p(){d(o,g(e(a)),!0),h()}function h(){const B=e(a).split(`
`);d(v,B.length,!0),d(l,e(a).length,!0),d(c,e(a).trim()?e(a).trim().split(/\s+/).length:0,!0)}function b(){const M='<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Markdown Export</title><script src="https://cdn.tailwindcss.com">'+"<\/script>"+'</head><body class="max-w-4xl mx-auto p-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"><div class="prose prose-lg dark:prose-invert max-w-none">'+e(o)+"</div></body></html>",D=new Blob([M],{type:"text/html"}),F=URL.createObjectURL(D),X=document.createElement("a");X.href=F,X.download="markdown-export.html",X.click(),URL.revokeObjectURL(F)}ke(()=>{p()});var x=iu(),w=r(x),S=r(w),R=r(S);R.__click=[au];var C=r(R);Ie(C,{class:"w-5 h-5"});var T=n(S,2),E=r(T),_=r(E);He(_,{class:"w-10 h-10 text-white"});var L=n(w,4),$=r(L);$.__click=[ru,a,p];var H=n($,2);H.__click=[Xg,a,o,h];var U=n(H,2);U.__click=[eu,a,s];var Q=r(U),mt=n(U,2);mt.__click=[tu,o,s];var lt=r(mt),nt=n(mt,2);nt.__click=b;var ct=n(L,2),vt=r(ct),Dt=r(vt);He(Dt,{class:"w-4 h-4"});var Wt=n(Dt,2),Yt=r(Wt),Qt=n(vt,2),Jt=r(Qt);He(Jt,{class:"w-4 h-4"});var zt=n(Jt,2),Ft=r(zt),At=n(Qt,2),Ct=r(At);He(Ct,{class:"w-4 h-4"});var tt=n(Ct,2),yt=r(tt),pt=n(ct,2),at=r(pt),P=r(at),xt=r(P),ft=r(xt),V=r(ft);K0(V,{class:"w-5 h-5"});var et=n(P,2),ht=r(et),bt=n(at,2),wt=r(bt),Ut=r(wt),jt=r(Ut),Pt=r(jt);pd(Pt,{class:"w-5 h-5"});var Lt=n(wt,2),st=r(Lt),kt=r(st);s0(kt,()=>e(o));var G=n(pt,2),Z=r(G),W=r(Z),A=r(W);Ve(A,{class:"w-6 h-6 text-primary-600 dark:text-primary-400"});var I=n(Z,2),N=r(I),it=r(N);Ya(it,{class:"w-6 h-6 text-primary-600 dark:text-primary-400"});var rt=n(I,2),Y=r(rt),z=r(Y);Xa(z,{class:"w-6 h-6 text-primary-600 dark:text-primary-400"}),K(()=>{y(Q,e(s)==="markdown"?"✓ Copied!":"Copy Markdown"),y(lt,e(s)==="html"?"✓ Copied!":"Copy HTML"),y(Yt,`${e(c)??""} words`),y(Ft,`${e(l)??""} characters`),y(yt,`${e(v)??""} lines`)}),Tt(ht,()=>e(a),B=>d(a,B)),m(i,x),Bt()}ye(["click"]);function nu(i,t,a){const s=i.target.files?.[0];s&&(d(t,s.name,!0),a(s))}function su(i,t){if(e(t)){const a=`data:application/octet-stream;base64,${e(t).encoded}`,o=document.createElement("a");o.href=a,o.download=e(t).name+".b64",o.click()}}function du(i,t,a,o,s,c,l){d(t,""),d(a,""),d(o,""),d(s,""),d(c,""),d(l,null)}function lu(i,t,a){d(t,"Hello, World! This is a sample text for Base64 encoding."),a()}function cu(i,t,a){d(t,"SGVsbG8sIFdvcmxkISBUaGlzIGlzIGEgc2FtcGxlIHRleHQgZm9yIEJhc2U2NCBlbmNvZGluZy4="),a()}function vu(){Te("/tools")}var gu=(i,t)=>d(t,"text"),uu=(i,t)=>d(t,"file"),mu=k('<div class="mb-4 p-4 bg-danger-100 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 rounded-lg"><p class="text-danger-700 dark:text-danger-400 font-medium"> </p></div>'),pu=(i,t,a)=>t(e(a),"encoded"),fu=k('<button class="btn btn-primary btn-sm"> </button>'),xu=(i,t,a)=>t(e(a),"decoded"),bu=k('<button class="btn btn-primary btn-sm"> </button>'),yu=k('<div class="mb-6 flex flex-wrap gap-4 items-center justify-center"><button class="btn btn-primary">Encode to Base64</button> <button class="btn btn-primary">Decode from Base64</button> <button class="btn btn-primary btn-sm">Load Sample Text</button> <button class="btn btn-primary btn-sm">Load Sample Base64</button> <button class="btn btn-primary btn-sm">Clear All</button></div> <!> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div><textarea class="textarea" placeholder="Enter text or Base64 string to encode/decode..."></textarea> <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right"> </p></div> <div><div class="mb-4"><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Base64 Result</h2> <!></div> <textarea class="textarea" placeholder="Base64 encoded text will appear here..."></textarea></div> <div><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Decoded Result</h2> <!></div> <textarea class="textarea" placeholder="Decoded text will appear here..."></textarea></div></div></div>',1),hu=k('<div class="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><p class="text-sm font-medium text-gray-700 dark:text-gray-300"> </p></div>'),_u=k('<div class="text-center py-8"><div class="inline-flex items-center gap-2"><div class="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div> <span class="text-gray-600 dark:text-gray-400">Processing file...</span></div></div>'),ku=k('<div class="mb-4 p-4 bg-danger-100 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 rounded-lg"><p class="text-danger-700 dark:text-danger-400 font-medium"> </p></div>'),wu=(i,t,a)=>e(t)&&a(e(t).encoded,"file-encoded"),Cu=k('<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Conversion Result</h3> <div class="space-y-4"><div><span class="text-sm font-medium text-gray-700 dark:text-gray-300">File Name:</span> <p class="text-gray-900 dark:text-white font-mono text-sm"> </p></div> <div><span class="text-sm font-medium text-gray-700 dark:text-gray-300">Original Size:</span> <p class="text-gray-900 dark:text-white"> </p></div> <div><span class="text-sm font-medium text-gray-700 dark:text-gray-300">Base64 Length:</span> <p class="text-gray-900 dark:text-white"> </p></div> <div><div class="flex justify-between items-center mb-2"><span class="text-sm font-medium text-gray-700 dark:text-gray-300">Base64 Data:</span> <div class="flex gap-2"><button class="btn btn-primary btn-sm"> </button> <button class="btn btn-primary btn-sm">Download</button></div></div> <textarea class="textarea"></textarea></div></div></div>'),$u=k('<div class="max-w-2xl mx-auto"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upload File for Base64 Conversion</h2> <div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center"><!> <label for="file-upload" class="cursor-pointer"><span class="text-primary-600 dark:text-blue-400 hover:underline font-medium">Click to upload</span> <span class="text-gray-600 dark:text-gray-400">or drag and drop</span></label> <input class="input hidden" id="file-upload" type="file"/> <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">Supports any file type</p></div> <!></div> <!> <!> <!></div>'),Su=k(`<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="btn btn-primary"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Base64 Converter</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Encode and decode Base64 strings with support for text and file conversion.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Base64 Converter</li></ol></nav> <div class="mb-6"><div class="flex justify-center"><div class="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1"><button>Text Converter</button> <button>File Converter</button></div></div></div> <!> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Secure Encoding</h3> <p class="text-gray-600 dark:text-gray-400">Encode text and files to Base64 format with proper UTF-8 handling for international
        characters</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">File Support</h3> <p class="text-gray-600 dark:text-gray-400">Convert any file type to Base64 and download the encoded data for easy sharing</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Fast Processing</h3> <p class="text-gray-600 dark:text-gray-400">Instant encoding and decoding with efficient algorithms for both text and binary data</p></div></div></div>`);function Tu(i,t){Rt(t,!0);let a=f(""),o=f(""),s=f(""),c=f("text"),l=f(!1),v=f(""),g=f(""),u=f(null),p=f("");function h(){try{d(o,btoa(unescape(encodeURIComponent(e(a)))),!0),d(s,""),d(v,"")}catch{d(v,"Failed to encode text. Please check your input."),d(o,"")}}function b(){try{d(s,decodeURIComponent(escape(atob(e(a)))),!0),d(o,""),d(v,"")}catch{d(v,"Invalid Base64 string. Please check your input."),d(s,"")}}function x(pt){d(l,!0),d(v,"");const at=new FileReader;at.onload=P=>{try{const ft=(P.target?.result).split(",")[1];d(u,{name:pt.name,size:pt.size,encoded:ft},!0),d(l,!1)}catch{d(v,"Failed to process file."),d(l,!1)}},at.onerror=()=>{d(v,"Failed to read file."),d(l,!1)},at.readAsDataURL(pt)}function w(pt,at){navigator.clipboard.writeText(pt),d(p,at,!0),setTimeout(()=>{d(p,"")},2e3)}function S(pt){if(pt===0)return"0 Bytes";const at=1024,P=["Bytes","KB","MB","GB"],xt=Math.floor(Math.log(pt)/Math.log(at));return parseFloat((pt/Math.pow(at,xt)).toFixed(2))+" "+P[xt]}var R=Su(),C=r(R),T=r(C),E=r(T);E.__click=[vu];var _=r(E);Ie(_,{class:"w-5 h-5 mr-2"});var L=n(T,2),$=r(L),H=r($);Qr(H,{class:"w-10 h-10 text-white"});var U=n(C,4),Q=r(U),mt=r(Q),lt=r(mt);lt.__click=[gu,c];var nt=n(lt,2);nt.__click=[uu,c];var ct=n(U,2);{var vt=pt=>{var at=yu(),P=ut(at),xt=r(P);xt.__click=h;var ft=n(xt,2);ft.__click=b;var V=n(ft,2);V.__click=[lu,a,h];var et=n(V,2);et.__click=[cu,a,b];var ht=n(et,2);ht.__click=[du,a,o,s,v,g,u];var bt=n(P,2);{var wt=B=>{var M=mu(),D=r(M),F=r(D);K(()=>y(F,`Error: ${e(v)??""}`)),m(B,M)};O(bt,B=>{e(v)&&B(wt)})}var Ut=n(bt,2),jt=r(Ut),Pt=r(jt);Nt(Pt,"rows",16);var Lt=n(Pt,2),st=r(Lt),kt=n(jt,2),G=r(kt),Z=r(G),W=n(r(Z),2);{var A=B=>{var M=fu();M.__click=[pu,w,o];var D=r(M);K(()=>y(D,e(p)==="encoded"?"✓ Copied!":"Copy")),m(B,M)};O(W,B=>{e(o)&&B(A)})}var I=n(Z,2);Nt(I,"rows",7);var N=n(G,2),it=r(N),rt=n(r(it),2);{var Y=B=>{var M=bu();M.__click=[xu,w,s];var D=r(M);K(()=>y(D,e(p)==="decoded"?"✓ Copied!":"Copy")),m(B,M)};O(rt,B=>{e(s)&&B(Y)})}var z=n(it,2);Nt(z,"rows",7),K(()=>y(st,`${e(a).length??""} characters`)),Tt(Pt,()=>e(a),B=>d(a,B)),Tt(I,()=>e(o),B=>d(o,B)),Tt(z,()=>e(s),B=>d(s,B)),m(pt,at)},Dt=pt=>{var at=$u(),P=r(at),xt=n(r(P),2),ft=r(xt);oc(ft,{class:"w-12 h-12 mx-auto mb-4 text-gray-400"});var V=n(ft,4);V.__change=[nu,g,x];var et=n(xt,2);{var ht=st=>{var kt=hu(),G=r(kt),Z=r(G);K(()=>y(Z,`Selected file: ${e(g)??""}`)),m(st,kt)};O(et,st=>{e(g)&&st(ht)})}var bt=n(P,2);{var wt=st=>{var kt=_u();m(st,kt)};O(bt,st=>{e(l)&&st(wt)})}var Ut=n(bt,2);{var jt=st=>{var kt=ku(),G=r(kt),Z=r(G);K(()=>y(Z,`Error: ${e(v)??""}`)),m(st,kt)};O(Ut,st=>{e(v)&&st(jt)})}var Pt=n(Ut,2);{var Lt=st=>{var kt=Cu(),G=n(r(kt),2),Z=r(G),W=n(r(Z),2),A=r(W),I=n(Z,2),N=n(r(I),2),it=r(N),rt=n(I,2),Y=n(r(rt),2),z=r(Y),B=n(rt,2),M=r(B),D=n(r(M),2),F=r(D);F.__click=[wu,u,w];var X=r(F),j=n(F,2);j.__click=[su,u];var dt=n(M,2);Nt(dt,"rows",8),K(Mt=>{y(A,e(u).name),y(it,Mt),y(z,`${e(u).encoded.length??""} characters`),y(X,e(p)==="file-encoded"?"✓ Copied!":"Copy"),cd(dt,e(u).encoded)},[()=>S(e(u).size)]),m(st,kt)};O(Pt,st=>{e(u)&&st(Lt)})}m(pt,at)};O(ct,pt=>{e(c)==="text"?pt(vt):pt(Dt,!1)})}var Wt=n(ct,2),Yt=r(Wt),Qt=r(Yt),Jt=r(Qt);cn(Jt,{class:"w-6 h-6 text-primary-600 dark:text-primary-400"});var zt=n(Yt,2),Ft=r(zt),At=r(Ft);He(At,{class:"w-6 h-6 text-primary-600 dark:text-primary-400"});var Ct=n(zt,2),tt=r(Ct),yt=r(tt);Ve(yt,{class:"w-6 h-6 text-primary-600 dark:text-primary-400"}),K(()=>{ge(lt,1,`px-4 py-2 rounded-md text-sm font-medium transition-colors ${e(c)==="text"?"bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300":"text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"}`),ge(nt,1,`px-4 py-2 rounded-md text-sm font-medium transition-colors ${e(c)==="file"?"bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300":"text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"}`)}),m(i,R),Bt()}ye(["click","change"]);function Mu(i,t){e(t)&&(navigator.clipboard.writeText(e(t)),ze.success("Password copied to clipboard"))}function Un(i,t,a){d(t,""),d(a,[],!0),ze.success("Cleared history")}function Eu(){Te("/tools")}var Lu=(i,t)=>t(5),Pu=(i,t,a)=>t(a),Au=k('<button class="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 capitalize"> </button>'),Iu=k("<span> </span>"),ju=k('<div class="mt-4"><div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden"><div></div></div></div>'),Nu=k('<div class="mb-6"><input placeholder="Enter custom characters..." class="input font-mono text-sm"/></div>'),Ru=k('<button class="text-sm text-red-500 hover:text-red-600">Clear</button>'),Bu=k('<div class="flex flex-col items-center justify-center py-8 text-gray-500 dark:text-gray-400"><!> <p class="text-sm">No passwords generated yet</p></div>'),Du=(i,t,a)=>t(e(a).password),Fu=k('<div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg group hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"><div class="flex items-start justify-between mb-2"><div class="flex-1 mr-2 min-w-0"><div class="font-mono text-sm text-gray-900 dark:text-white break-all"> </div> <div class="flex items-center justify-between mt-2"><span class="text-xs text-gray-500 dark:text-gray-400"> </span> <div class="flex items-center gap-2"><span> </span> <button class="text-gray-400 hover:text-red-500 transition-colors"><!></button></div></div></div></div></div>'),Hu=k('<div class="space-y-2 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar"></div>'),Ou=k(`<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="btn btn-primary"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-danger-400 to-danger-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Password Generator</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Generate secure and random passwords with customizable options for maximum security.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Password Generator</li></ol></nav> <div class="mb-6 flex justify-center flex-wrap gap-2"><button class="btn btn-primary btn-sm">Generate 5</button> <button class="btn btn-primary btn-sm text-red-500 hover:text-red-600"><!> Clear</button></div> <div class="mb-6 flex justify-center"><div class="inline-flex rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1 shadow-sm"></div></div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-2 space-y-6"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><div class="flex items-center justify-between mb-4"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Generated Password</h2> <div class="flex items-center gap-2"><!> <button class="btn btn-secondary btn-sm"><!> Copy</button></div></div> <div class="relative"><input readonly="" placeholder="Click 'Generate Password' to create a secure password" class="input font-mono text-lg"/></div> <!></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">Password Settings</h2> <div class="mb-6"><div class="flex justify-between items-center mb-2"><label for="password-length-slider" class="text-sm font-medium text-gray-700 dark:text-gray-300">Password Length</label> <span class="text-sm font-semibold text-gray-900 dark:text-white"> </span></div> <input id="password-length-slider" type="range" min="4" max="64" class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-danger-500"/> <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1"><span>4</span> <span>32</span> <span>64</span></div></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"><label class="flex items-center space-x-3 cursor-pointer"><input type="checkbox" class="w-4 h-4 text-danger-600 bg-gray-100 border-gray-300 rounded focus:ring-danger-500"/> <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Uppercase (A-Z)</span></label> <label class="flex items-center space-x-3 cursor-pointer"><input type="checkbox" class="w-4 h-4 text-danger-600 bg-gray-100 border-gray-300 rounded focus:ring-danger-500"/> <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Lowercase (a-z)</span></label> <label class="flex items-center space-x-3 cursor-pointer"><input type="checkbox" class="w-4 h-4 text-danger-600 bg-gray-100 border-gray-300 rounded focus:ring-danger-500"/> <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Numbers (0-9)</span></label> <label class="flex items-center space-x-3 cursor-pointer"><input type="checkbox" class="w-4 h-4 text-danger-600 bg-gray-100 border-gray-300 rounded focus:ring-danger-500"/> <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Symbols (!@#$%)</span></label> <label class="flex items-center space-x-3 cursor-pointer"><input type="checkbox" class="w-4 h-4 text-danger-600 bg-gray-100 border-gray-300 rounded focus:ring-danger-500"/> <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Custom Characters</span></label></div> <!> <div class="space-y-4 mb-6 border-t border-gray-200 dark:border-gray-700 pt-6"><label class="flex items-center space-x-3 cursor-pointer"><input type="checkbox" class="w-4 h-4 text-danger-600 bg-gray-100 border-gray-300 rounded focus:ring-danger-500"/> <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Exclude Similar Characters (i, l, 1, L, o, 0, O)</span></label> <label class="flex items-center space-x-3 cursor-pointer"><input type="checkbox" class="w-4 h-4 text-danger-600 bg-gray-100 border-gray-300 rounded focus:ring-danger-500"/> <span class="text-sm font-medium text-gray-700 dark:text-gray-300"></span></label></div> <div class="flex flex-wrap gap-3"><button class="btn btn-primary btn-lg w-full"><!> Generate Password</button></div></div></div> <div><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 sticky top-6"><div class="flex justify-between items-center mb-4"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">History</h2> <!></div> <!></div></div></div> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"><div class="flex items-center gap-2 mb-2 text-danger-600 dark:text-danger-400"><!> <h3 class="font-medium">Strong Security</h3></div> <p class="text-sm text-gray-600 dark:text-gray-400">Generate cryptographically secure passwords with customizable complexity</p></div> <div class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"><div class="flex items-center gap-2 mb-2 text-danger-600 dark:text-danger-400"><!> <h3 class="font-medium">Customizable Options</h3></div> <p class="text-sm text-gray-600 dark:text-gray-400">Fine-tune character sets, length, and exclusions for your specific needs</p></div> <div class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"><div class="flex items-center gap-2 mb-2 text-danger-600 dark:text-danger-400"><!> <h3 class="font-medium">Password History</h3></div> <p class="text-sm text-gray-600 dark:text-gray-400">Keep track of generated passwords with strength analysis</p></div></div></div>`);function Uu(i,t){Rt(t,!0);let a=f(""),o=f(16),s=f(!0),c=f(!0),l=f(!0),v=f(!0),g=f(!1),u=f(!1),p=f(Pe([])),h=f(""),b=f(!1);const x="ABCDEFGHIJKLMNOPQRSTUVWXYZ",w="abcdefghijklmnopqrstuvwxyz",S="0123456789",R="!@#$%^&*()_+-=[]{}|;:,.<>?",C="il1Lo0O",T="{}[]()/\\'\"`~,;.<>";function E(){let Ot="";if(e(s)&&(Ot+=x),e(c)&&(Ot+=w),e(l)&&(Ot+=S),e(v)&&(Ot+=R),e(b)&&(Ot+=e(h)),e(g)&&(Ot=Ot.split("").filter(fe=>!C.includes(fe)).join("")),e(u)&&(Ot=Ot.split("").filter(fe=>!T.includes(fe)).join("")),Ot===""){d(a,""),ze.error("Please select at least one character type");return}let ie="";for(let fe=0;fe<e(o);fe++)ie+=Ot.charAt(Math.floor(Math.random()*Ot.length));d(a,ie,!0),_(ie)}function _(Ot){const ie=L(Ot);e(p).unshift({password:Ot,timestamp:new Date,strength:ie}),e(p).length>10&&d(p,e(p).slice(0,10),!0)}function L(Ot){if(Ot.length===0)return"none";let ie=0;return Ot.length>=8&&ie++,Ot.length>=12&&ie++,Ot.length>=16&&ie++,/[a-z]/.test(Ot)&&ie++,/[A-Z]/.test(Ot)&&ie++,/[0-9]/.test(Ot)&&ie++,/[^a-zA-Z0-9]/.test(Ot)&&ie++,ie<=2?"weak":ie<=4?"medium":ie<=6?"strong":"very-strong"}function $(Ot){switch(Ot){case"weak":return"text-danger-500";case"medium":return"text-warning-500";case"strong":return"text-success-500";case"very-strong":return"text-success-600";default:return"text-gray-500"}}function H(Ot){switch(Ot){case"weak":return"bg-danger-100 dark:bg-danger-900/20";case"medium":return"bg-warning-100 dark:bg-warning-900/20";case"strong":return"bg-success-100 dark:bg-success-900/20";case"very-strong":return"bg-success-200 dark:bg-success-900/30";default:return"bg-gray-100 dark:bg-gray-800"}}function U(Ot){navigator.clipboard.writeText(Ot),ze.success("Password copied to clipboard")}function Q(Ot){switch(Ot){case"weak":return"Weak";case"medium":return"Medium";case"strong":return"Strong";case"very-strong":return"Very Strong";default:return"No Password"}}function mt(Ot){for(let ie=0;ie<Ot;ie++)E();ze.success(`Generated ${Ot} passwords`)}function lt(Ot){switch(Ot){case"strong":d(o,16),d(s,!0),d(c,!0),d(l,!0),d(v,!0),d(g,!0),d(u,!1);break;case"memorable":d(o,12),d(s,!0),d(c,!0),d(l,!0),d(v,!1),d(g,!1),d(u,!1);break;case"pin":d(o,4),d(s,!1),d(c,!1),d(l,!0),d(v,!1),d(g,!1),d(u,!1);break;case"passphrase":d(o,32),d(s,!1),d(c,!0),d(l,!1),d(v,!0),d(g,!1),d(u,!1),d(h," -_"),d(b,!0);break}E(),ze.success(`Applied ${Ot} preset`)}ke(()=>{E()});var nt=Ou(),ct=r(nt),vt=r(ct),Dt=r(vt);Dt.__click=[Eu];var Wt=r(Dt);Ie(Wt,{class:"w-5 h-5 mr-2"});var Yt=n(vt,2),Qt=r(Yt),Jt=r(Qt);Uo(Jt,{class:"w-10 h-10 text-white"});var zt=n(ct,4),Ft=r(zt);Ft.__click=[Lu,mt];var At=n(Ft,2);At.__click=[Un,a,p];var Ct=r(At);Wi(Ct,{class:"w-4 h-4 mr-2"});var tt=n(zt,2),yt=r(tt);xe(yt,20,()=>["strong","memorable","pin","passphrase"],Ot=>Ot,(Ot,ie)=>{var fe=Au();fe.__click=[Pu,lt,ie];var he=r(fe);K(()=>y(he,ie)),m(Ot,fe)});var pt=n(tt,2),at=r(pt),P=r(at),xt=r(P),ft=n(r(xt),2),V=r(ft);{var et=Ot=>{var ie=Iu(),fe=r(ie);K((he,je)=>{ge(ie,1,`text-sm font-medium ${he??""}`),y(fe,je)},[()=>$(L(e(a))),()=>Q(L(e(a)))]),m(Ot,ie)};O(V,Ot=>{e(a)&&Ot(et)})}var ht=n(V,2);ht.__click=[Mu,a];var bt=r(ht);be(bt,{class:"w-4 h-4 mr-2"});var wt=n(xt,2),Ut=r(wt),jt=n(wt,2);{var Pt=Ot=>{var ie=ju(),fe=r(ie),he=r(fe);K(je=>ge(he,1,`h-full transition-all duration-300 ${je??""}`),[()=>L(e(a))==="weak"?"bg-danger-500 w-1/4":L(e(a))==="medium"?"bg-warning-500 w-2/4":L(e(a))==="strong"?"bg-success-500 w-3/4":"bg-success-600 w-full"]),m(Ot,ie)};O(jt,Ot=>{e(a)&&Ot(Pt)})}var Lt=n(P,2),st=n(r(Lt),2),kt=r(st),G=n(r(kt),2),Z=r(G),W=n(kt,2),A=n(st,2),I=r(A),N=r(I),it=n(I,2),rt=r(it),Y=n(it,2),z=r(Y),B=n(Y,2),M=r(B),D=n(B,2),F=r(D),X=n(A,2);{var j=Ot=>{var ie=Nu(),fe=r(ie);Tt(fe,()=>e(h),he=>d(h,he)),m(Ot,ie)};O(X,Ot=>{e(b)&&Ot(j)})}var dt=n(X,2),Mt=r(dt),Gt=r(Mt),St=n(Mt,2),q=r(St),gt=n(q,2);gt.textContent="Exclude Ambiguous Characters ({ } [ ] ( ) / \\ ' \" ` ~ , ; . < >)";var $t=n(dt,2),Ht=r($t);Ht.__click=E;var J=r(Ht);Tr(J,{class:"w-4 h-4 mr-2"});var ot=n(at,2),_t=r(ot),It=r(_t),Vt=n(r(It),2);{var Xt=Ot=>{var ie=Ru();ie.__click=[Un,a,p],m(Ot,ie)};O(Vt,Ot=>{e(p).length>0&&Ot(Xt)})}var Kt=n(It,2);{var ee=Ot=>{var ie=Bu(),fe=r(ie);Ka(fe,{class:"w-8 h-8 mb-2 opacity-50"}),m(Ot,ie)},le=Ot=>{var ie=Hu();xe(ie,21,()=>e(p),fe=>fe.timestamp.getTime(),(fe,he)=>{var je=Fu(),Ne=r(je),Be=r(Ne),De=r(Be),_e=r(De),Se=n(De,2),qe=r(Se),Ae=r(qe),Je=n(qe,2),Ze=r(Je),ur=r(Ze),lr=n(Ze,2);lr.__click=[Du,U,he];var Le=r(lr);be(Le,{class:"w-3.5 h-3.5"}),K((Xe,Pr,mr,pr)=>{y(_e,e(he).password),y(Ae,Xe),ge(Ze,1,`text-xs px-2 py-0.5 rounded-full ${Pr??""} ${mr??""}`),y(ur,pr)},[()=>e(he).timestamp.toLocaleTimeString(),()=>H(e(he).strength),()=>$(e(he).strength),()=>Q(e(he).strength)]),m(fe,je)}),m(Ot,ie)};O(Kt,Ot=>{e(p).length===0?Ot(ee):Ot(le,!1)})}var qt=n(pt,2),de=r(qt),ce=r(de),ae=r(ce);cn(ae,{class:"w-5 h-5"});var me=n(de,2),pe=r(me),re=r(pe);hd(re,{class:"w-5 h-5"});var ve=n(me,2),Ce=r(ve),Me=r(Ce);Ka(Me,{class:"w-5 h-5"}),K(()=>y(Z,e(o))),Tt(Ut,()=>e(a),Ot=>d(a,Ot)),Tt(W,()=>e(o),Ot=>d(o,Ot)),We(N,()=>e(s),Ot=>d(s,Ot)),We(rt,()=>e(c),Ot=>d(c,Ot)),We(z,()=>e(l),Ot=>d(l,Ot)),We(M,()=>e(v),Ot=>d(v,Ot)),We(F,()=>e(b),Ot=>d(b,Ot)),We(Gt,()=>e(g),Ot=>d(g,Ot)),We(q,()=>e(u),Ot=>d(u,Ot)),m(i,nt),Bt()}ye(["click"]);function zu(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var Fa={},co,zn;function qu(){return zn||(zn=1,co=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),co}var vo={},sa={},qn;function Aa(){if(qn)return sa;qn=1;let i;const t=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return sa.getSymbolSize=function(o){if(!o)throw new Error('"version" cannot be null or undefined');if(o<1||o>40)throw new Error('"version" should be in range from 1 to 40');return o*4+17},sa.getSymbolTotalCodewords=function(o){return t[o]},sa.getBCHDigit=function(a){let o=0;for(;a!==0;)o++,a>>>=1;return o},sa.setToSJISFunction=function(o){if(typeof o!="function")throw new Error('"toSJISFunc" is not a valid function.');i=o},sa.isKanjiModeEnabled=function(){return typeof i<"u"},sa.toSJIS=function(o){return i(o)},sa}var go={},Gn;function gn(){return Gn||(Gn=1,(function(i){i.L={bit:1},i.M={bit:0},i.Q={bit:3},i.H={bit:2};function t(a){if(typeof a!="string")throw new Error("Param is not a string");switch(a.toLowerCase()){case"l":case"low":return i.L;case"m":case"medium":return i.M;case"q":case"quartile":return i.Q;case"h":case"high":return i.H;default:throw new Error("Unknown EC Level: "+a)}}i.isValid=function(o){return o&&typeof o.bit<"u"&&o.bit>=0&&o.bit<4},i.from=function(o,s){if(i.isValid(o))return o;try{return t(o)}catch{return s}}})(go)),go}var uo,Wn;function Gu(){if(Wn)return uo;Wn=1;function i(){this.buffer=[],this.length=0}return i.prototype={get:function(t){const a=Math.floor(t/8);return(this.buffer[a]>>>7-t%8&1)===1},put:function(t,a){for(let o=0;o<a;o++)this.putBit((t>>>a-o-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(t){const a=Math.floor(this.length/8);this.buffer.length<=a&&this.buffer.push(0),t&&(this.buffer[a]|=128>>>this.length%8),this.length++}},uo=i,uo}var mo,Jn;function Wu(){if(Jn)return mo;Jn=1;function i(t){if(!t||t<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=t,this.data=new Uint8Array(t*t),this.reservedBit=new Uint8Array(t*t)}return i.prototype.set=function(t,a,o,s){const c=t*this.size+a;this.data[c]=o,s&&(this.reservedBit[c]=!0)},i.prototype.get=function(t,a){return this.data[t*this.size+a]},i.prototype.xor=function(t,a,o){this.data[t*this.size+a]^=o},i.prototype.isReserved=function(t,a){return this.reservedBit[t*this.size+a]},mo=i,mo}var po={},Vn;function Ju(){return Vn||(Vn=1,(function(i){const t=Aa().getSymbolSize;i.getRowColCoords=function(o){if(o===1)return[];const s=Math.floor(o/7)+2,c=t(o),l=c===145?26:Math.ceil((c-13)/(2*s-2))*2,v=[c-7];for(let g=1;g<s-1;g++)v[g]=v[g-1]-l;return v.push(6),v.reverse()},i.getPositions=function(o){const s=[],c=i.getRowColCoords(o),l=c.length;for(let v=0;v<l;v++)for(let g=0;g<l;g++)v===0&&g===0||v===0&&g===l-1||v===l-1&&g===0||s.push([c[v],c[g]]);return s}})(po)),po}var fo={},Yn;function Vu(){if(Yn)return fo;Yn=1;const i=Aa().getSymbolSize,t=7;return fo.getPositions=function(o){const s=i(o);return[[0,0],[s-t,0],[0,s-t]]},fo}var xo={},Kn;function Yu(){return Kn||(Kn=1,(function(i){i.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const t={N1:3,N2:3,N3:40,N4:10};i.isValid=function(s){return s!=null&&s!==""&&!isNaN(s)&&s>=0&&s<=7},i.from=function(s){return i.isValid(s)?parseInt(s,10):void 0},i.getPenaltyN1=function(s){const c=s.size;let l=0,v=0,g=0,u=null,p=null;for(let h=0;h<c;h++){v=g=0,u=p=null;for(let b=0;b<c;b++){let x=s.get(h,b);x===u?v++:(v>=5&&(l+=t.N1+(v-5)),u=x,v=1),x=s.get(b,h),x===p?g++:(g>=5&&(l+=t.N1+(g-5)),p=x,g=1)}v>=5&&(l+=t.N1+(v-5)),g>=5&&(l+=t.N1+(g-5))}return l},i.getPenaltyN2=function(s){const c=s.size;let l=0;for(let v=0;v<c-1;v++)for(let g=0;g<c-1;g++){const u=s.get(v,g)+s.get(v,g+1)+s.get(v+1,g)+s.get(v+1,g+1);(u===4||u===0)&&l++}return l*t.N2},i.getPenaltyN3=function(s){const c=s.size;let l=0,v=0,g=0;for(let u=0;u<c;u++){v=g=0;for(let p=0;p<c;p++)v=v<<1&2047|s.get(u,p),p>=10&&(v===1488||v===93)&&l++,g=g<<1&2047|s.get(p,u),p>=10&&(g===1488||g===93)&&l++}return l*t.N3},i.getPenaltyN4=function(s){let c=0;const l=s.data.length;for(let g=0;g<l;g++)c+=s.data[g];return Math.abs(Math.ceil(c*100/l/5)-10)*t.N4};function a(o,s,c){switch(o){case i.Patterns.PATTERN000:return(s+c)%2===0;case i.Patterns.PATTERN001:return s%2===0;case i.Patterns.PATTERN010:return c%3===0;case i.Patterns.PATTERN011:return(s+c)%3===0;case i.Patterns.PATTERN100:return(Math.floor(s/2)+Math.floor(c/3))%2===0;case i.Patterns.PATTERN101:return s*c%2+s*c%3===0;case i.Patterns.PATTERN110:return(s*c%2+s*c%3)%2===0;case i.Patterns.PATTERN111:return(s*c%3+(s+c)%2)%2===0;default:throw new Error("bad maskPattern:"+o)}}i.applyMask=function(s,c){const l=c.size;for(let v=0;v<l;v++)for(let g=0;g<l;g++)c.isReserved(g,v)||c.xor(g,v,a(s,g,v))},i.getBestMask=function(s,c){const l=Object.keys(i.Patterns).length;let v=0,g=1/0;for(let u=0;u<l;u++){c(u),i.applyMask(u,s);const p=i.getPenaltyN1(s)+i.getPenaltyN2(s)+i.getPenaltyN3(s)+i.getPenaltyN4(s);i.applyMask(u,s),p<g&&(g=p,v=u)}return v}})(xo)),xo}var ki={},Qn;function Cd(){if(Qn)return ki;Qn=1;const i=gn(),t=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],a=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return ki.getBlocksCount=function(s,c){switch(c){case i.L:return t[(s-1)*4+0];case i.M:return t[(s-1)*4+1];case i.Q:return t[(s-1)*4+2];case i.H:return t[(s-1)*4+3];default:return}},ki.getTotalCodewordsCount=function(s,c){switch(c){case i.L:return a[(s-1)*4+0];case i.M:return a[(s-1)*4+1];case i.Q:return a[(s-1)*4+2];case i.H:return a[(s-1)*4+3];default:return}},ki}var bo={},ii={},Zn;function Ku(){if(Zn)return ii;Zn=1;const i=new Uint8Array(512),t=new Uint8Array(256);return(function(){let o=1;for(let s=0;s<255;s++)i[s]=o,t[o]=s,o<<=1,o&256&&(o^=285);for(let s=255;s<512;s++)i[s]=i[s-255]})(),ii.log=function(o){if(o<1)throw new Error("log("+o+")");return t[o]},ii.exp=function(o){return i[o]},ii.mul=function(o,s){return o===0||s===0?0:i[t[o]+t[s]]},ii}var Xn;function Qu(){return Xn||(Xn=1,(function(i){const t=Ku();i.mul=function(o,s){const c=new Uint8Array(o.length+s.length-1);for(let l=0;l<o.length;l++)for(let v=0;v<s.length;v++)c[l+v]^=t.mul(o[l],s[v]);return c},i.mod=function(o,s){let c=new Uint8Array(o);for(;c.length-s.length>=0;){const l=c[0];for(let g=0;g<s.length;g++)c[g]^=t.mul(s[g],l);let v=0;for(;v<c.length&&c[v]===0;)v++;c=c.slice(v)}return c},i.generateECPolynomial=function(o){let s=new Uint8Array([1]);for(let c=0;c<o;c++)s=i.mul(s,new Uint8Array([1,t.exp(c)]));return s}})(bo)),bo}var yo,ts;function Zu(){if(ts)return yo;ts=1;const i=Qu();function t(a){this.genPoly=void 0,this.degree=a,this.degree&&this.initialize(this.degree)}return t.prototype.initialize=function(o){this.degree=o,this.genPoly=i.generateECPolynomial(this.degree)},t.prototype.encode=function(o){if(!this.genPoly)throw new Error("Encoder not initialized");const s=new Uint8Array(o.length+this.degree);s.set(o);const c=i.mod(s,this.genPoly),l=this.degree-c.length;if(l>0){const v=new Uint8Array(this.degree);return v.set(c,l),v}return c},yo=t,yo}var ho={},_o={},ko={},es;function $d(){return es||(es=1,ko.isValid=function(t){return!isNaN(t)&&t>=1&&t<=40}),ko}var Fr={},rs;function Sd(){if(rs)return Fr;rs=1;const i="[0-9]+",t="[A-Z $%*+\\-./:]+";let a="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";a=a.replace(/u/g,"\\u");const o="(?:(?![A-Z0-9 $%*+\\-./:]|"+a+`)(?:.|[\r
]))+`;Fr.KANJI=new RegExp(a,"g"),Fr.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),Fr.BYTE=new RegExp(o,"g"),Fr.NUMERIC=new RegExp(i,"g"),Fr.ALPHANUMERIC=new RegExp(t,"g");const s=new RegExp("^"+a+"$"),c=new RegExp("^"+i+"$"),l=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return Fr.testKanji=function(g){return s.test(g)},Fr.testNumeric=function(g){return c.test(g)},Fr.testAlphanumeric=function(g){return l.test(g)},Fr}var as;function Ia(){return as||(as=1,(function(i){const t=$d(),a=Sd();i.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},i.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},i.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},i.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},i.MIXED={bit:-1},i.getCharCountIndicator=function(c,l){if(!c.ccBits)throw new Error("Invalid mode: "+c);if(!t.isValid(l))throw new Error("Invalid version: "+l);return l>=1&&l<10?c.ccBits[0]:l<27?c.ccBits[1]:c.ccBits[2]},i.getBestModeForData=function(c){return a.testNumeric(c)?i.NUMERIC:a.testAlphanumeric(c)?i.ALPHANUMERIC:a.testKanji(c)?i.KANJI:i.BYTE},i.toString=function(c){if(c&&c.id)return c.id;throw new Error("Invalid mode")},i.isValid=function(c){return c&&c.bit&&c.ccBits};function o(s){if(typeof s!="string")throw new Error("Param is not a string");switch(s.toLowerCase()){case"numeric":return i.NUMERIC;case"alphanumeric":return i.ALPHANUMERIC;case"kanji":return i.KANJI;case"byte":return i.BYTE;default:throw new Error("Unknown mode: "+s)}}i.from=function(c,l){if(i.isValid(c))return c;try{return o(c)}catch{return l}}})(_o)),_o}var is;function Xu(){return is||(is=1,(function(i){const t=Aa(),a=Cd(),o=gn(),s=Ia(),c=$d(),l=7973,v=t.getBCHDigit(l);function g(b,x,w){for(let S=1;S<=40;S++)if(x<=i.getCapacity(S,w,b))return S}function u(b,x){return s.getCharCountIndicator(b,x)+4}function p(b,x){let w=0;return b.forEach(function(S){const R=u(S.mode,x);w+=R+S.getBitsLength()}),w}function h(b,x){for(let w=1;w<=40;w++)if(p(b,w)<=i.getCapacity(w,x,s.MIXED))return w}i.from=function(x,w){return c.isValid(x)?parseInt(x,10):w},i.getCapacity=function(x,w,S){if(!c.isValid(x))throw new Error("Invalid QR Code version");typeof S>"u"&&(S=s.BYTE);const R=t.getSymbolTotalCodewords(x),C=a.getTotalCodewordsCount(x,w),T=(R-C)*8;if(S===s.MIXED)return T;const E=T-u(S,x);switch(S){case s.NUMERIC:return Math.floor(E/10*3);case s.ALPHANUMERIC:return Math.floor(E/11*2);case s.KANJI:return Math.floor(E/13);case s.BYTE:default:return Math.floor(E/8)}},i.getBestVersionForData=function(x,w){let S;const R=o.from(w,o.M);if(Array.isArray(x)){if(x.length>1)return h(x,R);if(x.length===0)return 1;S=x[0]}else S=x;return g(S.mode,S.getLength(),R)},i.getEncodedBits=function(x){if(!c.isValid(x)||x<7)throw new Error("Invalid QR Code version");let w=x<<12;for(;t.getBCHDigit(w)-v>=0;)w^=l<<t.getBCHDigit(w)-v;return x<<12|w}})(ho)),ho}var wo={},os;function tm(){if(os)return wo;os=1;const i=Aa(),t=1335,a=21522,o=i.getBCHDigit(t);return wo.getEncodedBits=function(c,l){const v=c.bit<<3|l;let g=v<<10;for(;i.getBCHDigit(g)-o>=0;)g^=t<<i.getBCHDigit(g)-o;return(v<<10|g)^a},wo}var Co={},$o,ns;function em(){if(ns)return $o;ns=1;const i=Ia();function t(a){this.mode=i.NUMERIC,this.data=a.toString()}return t.getBitsLength=function(o){return 10*Math.floor(o/3)+(o%3?o%3*3+1:0)},t.prototype.getLength=function(){return this.data.length},t.prototype.getBitsLength=function(){return t.getBitsLength(this.data.length)},t.prototype.write=function(o){let s,c,l;for(s=0;s+3<=this.data.length;s+=3)c=this.data.substr(s,3),l=parseInt(c,10),o.put(l,10);const v=this.data.length-s;v>0&&(c=this.data.substr(s),l=parseInt(c,10),o.put(l,v*3+1))},$o=t,$o}var So,ss;function rm(){if(ss)return So;ss=1;const i=Ia(),t=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function a(o){this.mode=i.ALPHANUMERIC,this.data=o}return a.getBitsLength=function(s){return 11*Math.floor(s/2)+6*(s%2)},a.prototype.getLength=function(){return this.data.length},a.prototype.getBitsLength=function(){return a.getBitsLength(this.data.length)},a.prototype.write=function(s){let c;for(c=0;c+2<=this.data.length;c+=2){let l=t.indexOf(this.data[c])*45;l+=t.indexOf(this.data[c+1]),s.put(l,11)}this.data.length%2&&s.put(t.indexOf(this.data[c]),6)},So=a,So}var To,ds;function am(){if(ds)return To;ds=1;const i=Ia();function t(a){this.mode=i.BYTE,typeof a=="string"?this.data=new TextEncoder().encode(a):this.data=new Uint8Array(a)}return t.getBitsLength=function(o){return o*8},t.prototype.getLength=function(){return this.data.length},t.prototype.getBitsLength=function(){return t.getBitsLength(this.data.length)},t.prototype.write=function(a){for(let o=0,s=this.data.length;o<s;o++)a.put(this.data[o],8)},To=t,To}var Mo,ls;function im(){if(ls)return Mo;ls=1;const i=Ia(),t=Aa();function a(o){this.mode=i.KANJI,this.data=o}return a.getBitsLength=function(s){return s*13},a.prototype.getLength=function(){return this.data.length},a.prototype.getBitsLength=function(){return a.getBitsLength(this.data.length)},a.prototype.write=function(o){let s;for(s=0;s<this.data.length;s++){let c=t.toSJIS(this.data[s]);if(c>=33088&&c<=40956)c-=33088;else if(c>=57408&&c<=60351)c-=49472;else throw new Error("Invalid SJIS character: "+this.data[s]+`
Make sure your charset is UTF-8`);c=(c>>>8&255)*192+(c&255),o.put(c,13)}},Mo=a,Mo}var Eo={exports:{}},cs;function om(){return cs||(cs=1,(function(i){var t={single_source_shortest_paths:function(a,o,s){var c={},l={};l[o]=0;var v=t.PriorityQueue.make();v.push(o,0);for(var g,u,p,h,b,x,w,S,R;!v.empty();){g=v.pop(),u=g.value,h=g.cost,b=a[u]||{};for(p in b)b.hasOwnProperty(p)&&(x=b[p],w=h+x,S=l[p],R=typeof l[p]>"u",(R||S>w)&&(l[p]=w,v.push(p,w),c[p]=u))}if(typeof s<"u"&&typeof l[s]>"u"){var C=["Could not find a path from ",o," to ",s,"."].join("");throw new Error(C)}return c},extract_shortest_path_from_predecessor_list:function(a,o){for(var s=[],c=o;c;)s.push(c),a[c],c=a[c];return s.reverse(),s},find_path:function(a,o,s){var c=t.single_source_shortest_paths(a,o,s);return t.extract_shortest_path_from_predecessor_list(c,s)},PriorityQueue:{make:function(a){var o=t.PriorityQueue,s={},c;a=a||{};for(c in o)o.hasOwnProperty(c)&&(s[c]=o[c]);return s.queue=[],s.sorter=a.sorter||o.default_sorter,s},default_sorter:function(a,o){return a.cost-o.cost},push:function(a,o){var s={value:a,cost:o};this.queue.push(s),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};i.exports=t})(Eo)),Eo.exports}var vs;function nm(){return vs||(vs=1,(function(i){const t=Ia(),a=em(),o=rm(),s=am(),c=im(),l=Sd(),v=Aa(),g=om();function u(C){return unescape(encodeURIComponent(C)).length}function p(C,T,E){const _=[];let L;for(;(L=C.exec(E))!==null;)_.push({data:L[0],index:L.index,mode:T,length:L[0].length});return _}function h(C){const T=p(l.NUMERIC,t.NUMERIC,C),E=p(l.ALPHANUMERIC,t.ALPHANUMERIC,C);let _,L;return v.isKanjiModeEnabled()?(_=p(l.BYTE,t.BYTE,C),L=p(l.KANJI,t.KANJI,C)):(_=p(l.BYTE_KANJI,t.BYTE,C),L=[]),T.concat(E,_,L).sort(function(H,U){return H.index-U.index}).map(function(H){return{data:H.data,mode:H.mode,length:H.length}})}function b(C,T){switch(T){case t.NUMERIC:return a.getBitsLength(C);case t.ALPHANUMERIC:return o.getBitsLength(C);case t.KANJI:return c.getBitsLength(C);case t.BYTE:return s.getBitsLength(C)}}function x(C){return C.reduce(function(T,E){const _=T.length-1>=0?T[T.length-1]:null;return _&&_.mode===E.mode?(T[T.length-1].data+=E.data,T):(T.push(E),T)},[])}function w(C){const T=[];for(let E=0;E<C.length;E++){const _=C[E];switch(_.mode){case t.NUMERIC:T.push([_,{data:_.data,mode:t.ALPHANUMERIC,length:_.length},{data:_.data,mode:t.BYTE,length:_.length}]);break;case t.ALPHANUMERIC:T.push([_,{data:_.data,mode:t.BYTE,length:_.length}]);break;case t.KANJI:T.push([_,{data:_.data,mode:t.BYTE,length:u(_.data)}]);break;case t.BYTE:T.push([{data:_.data,mode:t.BYTE,length:u(_.data)}])}}return T}function S(C,T){const E={},_={start:{}};let L=["start"];for(let $=0;$<C.length;$++){const H=C[$],U=[];for(let Q=0;Q<H.length;Q++){const mt=H[Q],lt=""+$+Q;U.push(lt),E[lt]={node:mt,lastCount:0},_[lt]={};for(let nt=0;nt<L.length;nt++){const ct=L[nt];E[ct]&&E[ct].node.mode===mt.mode?(_[ct][lt]=b(E[ct].lastCount+mt.length,mt.mode)-b(E[ct].lastCount,mt.mode),E[ct].lastCount+=mt.length):(E[ct]&&(E[ct].lastCount=mt.length),_[ct][lt]=b(mt.length,mt.mode)+4+t.getCharCountIndicator(mt.mode,T))}}L=U}for(let $=0;$<L.length;$++)_[L[$]].end=0;return{map:_,table:E}}function R(C,T){let E;const _=t.getBestModeForData(C);if(E=t.from(T,_),E!==t.BYTE&&E.bit<_.bit)throw new Error('"'+C+'" cannot be encoded with mode '+t.toString(E)+`.
 Suggested mode is: `+t.toString(_));switch(E===t.KANJI&&!v.isKanjiModeEnabled()&&(E=t.BYTE),E){case t.NUMERIC:return new a(C);case t.ALPHANUMERIC:return new o(C);case t.KANJI:return new c(C);case t.BYTE:return new s(C)}}i.fromArray=function(T){return T.reduce(function(E,_){return typeof _=="string"?E.push(R(_,null)):_.data&&E.push(R(_.data,_.mode)),E},[])},i.fromString=function(T,E){const _=h(T,v.isKanjiModeEnabled()),L=w(_),$=S(L,E),H=g.find_path($.map,"start","end"),U=[];for(let Q=1;Q<H.length-1;Q++)U.push($.table[H[Q]].node);return i.fromArray(x(U))},i.rawSplit=function(T){return i.fromArray(h(T,v.isKanjiModeEnabled()))}})(Co)),Co}var gs;function sm(){if(gs)return vo;gs=1;const i=Aa(),t=gn(),a=Gu(),o=Wu(),s=Ju(),c=Vu(),l=Yu(),v=Cd(),g=Zu(),u=Xu(),p=tm(),h=Ia(),b=nm();function x($,H){const U=$.size,Q=c.getPositions(H);for(let mt=0;mt<Q.length;mt++){const lt=Q[mt][0],nt=Q[mt][1];for(let ct=-1;ct<=7;ct++)if(!(lt+ct<=-1||U<=lt+ct))for(let vt=-1;vt<=7;vt++)nt+vt<=-1||U<=nt+vt||(ct>=0&&ct<=6&&(vt===0||vt===6)||vt>=0&&vt<=6&&(ct===0||ct===6)||ct>=2&&ct<=4&&vt>=2&&vt<=4?$.set(lt+ct,nt+vt,!0,!0):$.set(lt+ct,nt+vt,!1,!0))}}function w($){const H=$.size;for(let U=8;U<H-8;U++){const Q=U%2===0;$.set(U,6,Q,!0),$.set(6,U,Q,!0)}}function S($,H){const U=s.getPositions(H);for(let Q=0;Q<U.length;Q++){const mt=U[Q][0],lt=U[Q][1];for(let nt=-2;nt<=2;nt++)for(let ct=-2;ct<=2;ct++)nt===-2||nt===2||ct===-2||ct===2||nt===0&&ct===0?$.set(mt+nt,lt+ct,!0,!0):$.set(mt+nt,lt+ct,!1,!0)}}function R($,H){const U=$.size,Q=u.getEncodedBits(H);let mt,lt,nt;for(let ct=0;ct<18;ct++)mt=Math.floor(ct/3),lt=ct%3+U-8-3,nt=(Q>>ct&1)===1,$.set(mt,lt,nt,!0),$.set(lt,mt,nt,!0)}function C($,H,U){const Q=$.size,mt=p.getEncodedBits(H,U);let lt,nt;for(lt=0;lt<15;lt++)nt=(mt>>lt&1)===1,lt<6?$.set(lt,8,nt,!0):lt<8?$.set(lt+1,8,nt,!0):$.set(Q-15+lt,8,nt,!0),lt<8?$.set(8,Q-lt-1,nt,!0):lt<9?$.set(8,15-lt-1+1,nt,!0):$.set(8,15-lt-1,nt,!0);$.set(Q-8,8,1,!0)}function T($,H){const U=$.size;let Q=-1,mt=U-1,lt=7,nt=0;for(let ct=U-1;ct>0;ct-=2)for(ct===6&&ct--;;){for(let vt=0;vt<2;vt++)if(!$.isReserved(mt,ct-vt)){let Dt=!1;nt<H.length&&(Dt=(H[nt]>>>lt&1)===1),$.set(mt,ct-vt,Dt),lt--,lt===-1&&(nt++,lt=7)}if(mt+=Q,mt<0||U<=mt){mt-=Q,Q=-Q;break}}}function E($,H,U){const Q=new a;U.forEach(function(vt){Q.put(vt.mode.bit,4),Q.put(vt.getLength(),h.getCharCountIndicator(vt.mode,$)),vt.write(Q)});const mt=i.getSymbolTotalCodewords($),lt=v.getTotalCodewordsCount($,H),nt=(mt-lt)*8;for(Q.getLengthInBits()+4<=nt&&Q.put(0,4);Q.getLengthInBits()%8!==0;)Q.putBit(0);const ct=(nt-Q.getLengthInBits())/8;for(let vt=0;vt<ct;vt++)Q.put(vt%2?17:236,8);return _(Q,$,H)}function _($,H,U){const Q=i.getSymbolTotalCodewords(H),mt=v.getTotalCodewordsCount(H,U),lt=Q-mt,nt=v.getBlocksCount(H,U),ct=Q%nt,vt=nt-ct,Dt=Math.floor(Q/nt),Wt=Math.floor(lt/nt),Yt=Wt+1,Qt=Dt-Wt,Jt=new g(Qt);let zt=0;const Ft=new Array(nt),At=new Array(nt);let Ct=0;const tt=new Uint8Array($.buffer);for(let xt=0;xt<nt;xt++){const ft=xt<vt?Wt:Yt;Ft[xt]=tt.slice(zt,zt+ft),At[xt]=Jt.encode(Ft[xt]),zt+=ft,Ct=Math.max(Ct,ft)}const yt=new Uint8Array(Q);let pt=0,at,P;for(at=0;at<Ct;at++)for(P=0;P<nt;P++)at<Ft[P].length&&(yt[pt++]=Ft[P][at]);for(at=0;at<Qt;at++)for(P=0;P<nt;P++)yt[pt++]=At[P][at];return yt}function L($,H,U,Q){let mt;if(Array.isArray($))mt=b.fromArray($);else if(typeof $=="string"){let Dt=H;if(!Dt){const Wt=b.rawSplit($);Dt=u.getBestVersionForData(Wt,U)}mt=b.fromString($,Dt||40)}else throw new Error("Invalid data");const lt=u.getBestVersionForData(mt,U);if(!lt)throw new Error("The amount of data is too big to be stored in a QR Code");if(!H)H=lt;else if(H<lt)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+lt+`.
`);const nt=E(H,U,mt),ct=i.getSymbolSize(H),vt=new o(ct);return x(vt,H),w(vt),S(vt,H),C(vt,U,0),H>=7&&R(vt,H),T(vt,nt),isNaN(Q)&&(Q=l.getBestMask(vt,C.bind(null,vt,U))),l.applyMask(Q,vt),C(vt,U,Q),{modules:vt,version:H,errorCorrectionLevel:U,maskPattern:Q,segments:mt}}return vo.create=function(H,U){if(typeof H>"u"||H==="")throw new Error("No input text");let Q=t.M,mt,lt;return typeof U<"u"&&(Q=t.from(U.errorCorrectionLevel,t.M),mt=u.from(U.version),lt=l.from(U.maskPattern),U.toSJISFunc&&i.setToSJISFunction(U.toSJISFunc)),L(H,mt,Q,lt)},vo}var Lo={},Po={},us;function Td(){return us||(us=1,(function(i){function t(a){if(typeof a=="number"&&(a=a.toString()),typeof a!="string")throw new Error("Color should be defined as hex string");let o=a.slice().replace("#","").split("");if(o.length<3||o.length===5||o.length>8)throw new Error("Invalid hex color: "+a);(o.length===3||o.length===4)&&(o=Array.prototype.concat.apply([],o.map(function(c){return[c,c]}))),o.length===6&&o.push("F","F");const s=parseInt(o.join(""),16);return{r:s>>24&255,g:s>>16&255,b:s>>8&255,a:s&255,hex:"#"+o.slice(0,6).join("")}}i.getOptions=function(o){o||(o={}),o.color||(o.color={});const s=typeof o.margin>"u"||o.margin===null||o.margin<0?4:o.margin,c=o.width&&o.width>=21?o.width:void 0,l=o.scale||4;return{width:c,scale:c?4:l,margin:s,color:{dark:t(o.color.dark||"#000000ff"),light:t(o.color.light||"#ffffffff")},type:o.type,rendererOpts:o.rendererOpts||{}}},i.getScale=function(o,s){return s.width&&s.width>=o+s.margin*2?s.width/(o+s.margin*2):s.scale},i.getImageWidth=function(o,s){const c=i.getScale(o,s);return Math.floor((o+s.margin*2)*c)},i.qrToImageData=function(o,s,c){const l=s.modules.size,v=s.modules.data,g=i.getScale(l,c),u=Math.floor((l+c.margin*2)*g),p=c.margin*g,h=[c.color.light,c.color.dark];for(let b=0;b<u;b++)for(let x=0;x<u;x++){let w=(b*u+x)*4,S=c.color.light;if(b>=p&&x>=p&&b<u-p&&x<u-p){const R=Math.floor((b-p)/g),C=Math.floor((x-p)/g);S=h[v[R*l+C]?1:0]}o[w++]=S.r,o[w++]=S.g,o[w++]=S.b,o[w]=S.a}}})(Po)),Po}var ms;function dm(){return ms||(ms=1,(function(i){const t=Td();function a(s,c,l){s.clearRect(0,0,c.width,c.height),c.style||(c.style={}),c.height=l,c.width=l,c.style.height=l+"px",c.style.width=l+"px"}function o(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}i.render=function(c,l,v){let g=v,u=l;typeof g>"u"&&(!l||!l.getContext)&&(g=l,l=void 0),l||(u=o()),g=t.getOptions(g);const p=t.getImageWidth(c.modules.size,g),h=u.getContext("2d"),b=h.createImageData(p,p);return t.qrToImageData(b.data,c,g),a(h,u,p),h.putImageData(b,0,0),u},i.renderToDataURL=function(c,l,v){let g=v;typeof g>"u"&&(!l||!l.getContext)&&(g=l,l=void 0),g||(g={});const u=i.render(c,l,g),p=g.type||"image/png",h=g.rendererOpts||{};return u.toDataURL(p,h.quality)}})(Lo)),Lo}var Ao={},ps;function lm(){if(ps)return Ao;ps=1;const i=Td();function t(s,c){const l=s.a/255,v=c+'="'+s.hex+'"';return l<1?v+" "+c+'-opacity="'+l.toFixed(2).slice(1)+'"':v}function a(s,c,l){let v=s+c;return typeof l<"u"&&(v+=" "+l),v}function o(s,c,l){let v="",g=0,u=!1,p=0;for(let h=0;h<s.length;h++){const b=Math.floor(h%c),x=Math.floor(h/c);!b&&!u&&(u=!0),s[h]?(p++,h>0&&b>0&&s[h-1]||(v+=u?a("M",b+l,.5+x+l):a("m",g,0),g=0,u=!1),b+1<c&&s[h+1]||(v+=a("h",p),p=0)):g++}return v}return Ao.render=function(c,l,v){const g=i.getOptions(l),u=c.modules.size,p=c.modules.data,h=u+g.margin*2,b=g.color.light.a?"<path "+t(g.color.light,"fill")+' d="M0 0h'+h+"v"+h+'H0z"/>':"",x="<path "+t(g.color.dark,"stroke")+' d="'+o(p,u,g.margin)+'"/>',w='viewBox="0 0 '+h+" "+h+'"',R='<svg xmlns="http://www.w3.org/2000/svg" '+(g.width?'width="'+g.width+'" height="'+g.width+'" ':"")+w+' shape-rendering="crispEdges">'+b+x+`</svg>
`;return typeof v=="function"&&v(null,R),R},Ao}var fs;function cm(){if(fs)return Fa;fs=1;const i=qu(),t=sm(),a=dm(),o=lm();function s(c,l,v,g,u){const p=[].slice.call(arguments,1),h=p.length,b=typeof p[h-1]=="function";if(!b&&!i())throw new Error("Callback required as last argument");if(b){if(h<2)throw new Error("Too few arguments provided");h===2?(u=v,v=l,l=g=void 0):h===3&&(l.getContext&&typeof u>"u"?(u=g,g=void 0):(u=g,g=v,v=l,l=void 0))}else{if(h<1)throw new Error("Too few arguments provided");return h===1?(v=l,l=g=void 0):h===2&&!l.getContext&&(g=v,v=l,l=void 0),new Promise(function(x,w){try{const S=t.create(v,g);x(c(S,l,g))}catch(S){w(S)}})}try{const x=t.create(v,g);u(null,c(x,l,g))}catch(x){u(x)}}return Fa.create=t.create,Fa.toCanvas=s.bind(null,a.render),Fa.toDataURL=s.bind(null,a.renderToDataURL),Fa.toString=s.bind(null,function(c,l,v){return o.render(c,v)}),Fa}var vm=cm();const gm=zu(vm);function um(i,t){e(t)&&fetch(e(t)).then(a=>a.blob()).then(a=>{const o=new ClipboardItem({"image/png":a});navigator.clipboard.write([o]),ze.success("QR Code copied to clipboard")}).catch(()=>{ze.error("Failed to copy QR Code")})}function mm(i,t,a,o,s,c,l,v,g){d(t,""),d(a,""),d(o,""),d(s,"300"),d(c,"#FFFFFF"),d(l,"#000000"),d(v,"M"),d(g,!0),ze.success("Form reset")}function pm(){Te("/tools")}var fm=k('<p class="mt-1 text-sm text-danger-500"> </p>'),xm=k("<option> </option>"),bm=k('<div class="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col items-center"><div class="mb-6 p-4 bg-white rounded-lg shadow-sm"><img alt="Generated QR Code" class="max-w-full h-auto rounded"/></div> <div class="flex flex-wrap gap-3 justify-center w-full"><button class="btn btn-primary btn-block sm:w-auto"><!> Download PNG</button> <button class="btn btn-secondary btn-block sm:w-auto"><!> Copy Image</button></div></div>'),ym=k('<div class="bg-danger-100 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 rounded-xl p-6"><p class="text-danger-600 dark:text-danger-400 text-center"> </p></div>'),hm=k('<div class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-12 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400"><!> <p class="text-center">Enter text and click "Generate" to create your QR code</p></div>'),_m=k('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="btn btn-primary"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-success-400 to-success-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">QR Code Generator</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Generate custom QR codes for URLs, text, or any data with customizable options.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">QR Code Generator</li></ol></nav> <div class="mb-6 flex justify-center flex-wrap gap-2"><button class="btn btn-primary btn-sm"><!> Generate</button> <button class="btn btn-primary btn-sm">Reset</button></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-8"><div class="space-y-6"><div><label for="text-input" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Text or URL</label> <textarea id="text-input" placeholder="Enter text, URL, or any data to encode..." rows="4"></textarea> <!></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-6"><div class="flex items-center gap-2 mb-2 text-gray-900 dark:text-white"><!> <h3 class="text-lg font-semibold">Customization</h3></div> <div><div class="flex justify-between items-center mb-2"><label for="size" class="text-sm font-medium text-gray-700 dark:text-gray-300"> </label></div> <input id="size" type="range" min="100" max="500" step="50" class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-success-500"/></div> <div class="grid grid-cols-2 gap-4"><div><label for="bg-color" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Background</label> <input id="bg-color" type="color" class="input h-12 p-1 w-full"/></div> <div><label for="fg-color" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Foreground</label> <input id="fg-color" type="color" class="input h-12 p-1 w-full"/></div></div> <div><label for="error-correction" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Error Correction Level</label> <select id="error-correction" class="select"></select></div> <div class="flex items-center"><input type="checkbox" id="include-margin" class="w-4 h-4 text-success-600 bg-gray-100 border-gray-300 rounded focus:ring-success-500 dark:focus:ring-success-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/> <label for="include-margin" class="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">Include margin</label></div></div></div> <div class="space-y-6"><div><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Generated QR Code</h3> <!></div> <div class="bg-success-100 dark:bg-success-900/20 border border-success-200 dark:border-success-800 rounded-xl p-4"><div class="flex items-center gap-2 mb-2 text-success-800 dark:text-success-200"><!> <h4 class="text-sm font-semibold">Tips</h4></div> <ul class="text-sm text-success-700 dark:text-success-300 space-y-1 list-disc list-inside"><li>QR codes can store up to 4,296 alphanumeric characters</li> <li>Higher error correction levels create more complex but more robust codes</li> <li>Test your QR code before using it in production</li> <li>Ensure good contrast between foreground and background colors</li></ul></div></div></div></div>');function km(i,t){Rt(t,!0);let a=f(""),o=f(""),s=f(""),c=f("300"),l=f("#FFFFFF"),v=f("#000000"),g=f("M"),u=f(!0);const p=[{value:"L",label:"Low (7%)"},{value:"M",label:"Medium (15%)"},{value:"Q",label:"Quartile (25%)"},{value:"H",label:"High (30%)"}];async function h(){if(!e(a).trim()){d(s,"Please enter some text or URL"),d(o,"");return}try{const st={width:parseInt(e(c)),margin:e(u)?4:0,color:{dark:e(v),light:e(l)},errorCorrectionLevel:e(g)};d(o,await gm.toDataURL(e(a),st),!0),d(s,""),ze.success("QR Code generated successfully")}catch(st){d(s,"Failed to generate QR code"),d(o,""),console.error("QR Code generation error:",st),ze.error("Failed to generate QR code")}}function b(){if(!e(o))return;const st=document.createElement("a");st.download="qrcode.png",st.href=e(o),st.click(),ze.success("QR Code downloaded")}qr(()=>{d(a,"https://farizink.dev"),h()});var x=_m(),w=r(x),S=r(w),R=r(S);R.__click=[pm];var C=r(R);Ie(C,{class:"w-5 h-5 mr-2"});var T=n(S,2),E=r(T),_=r(E);zo(_,{class:"w-10 h-10 text-white"});var L=n(w,4),$=r(L);$.__click=h;var H=r($);Tr(H,{class:"w-4 h-4 mr-2"});var U=n($,2);U.__click=[mm,a,o,s,c,l,v,g,u];var Q=n(L,2),mt=r(Q),lt=r(mt),nt=n(r(lt),2),ct=n(nt,2);{var vt=st=>{var kt=fm(),G=r(kt);K(()=>y(G,e(s))),m(st,kt)};O(ct,st=>{e(s)&&st(vt)})}var Dt=n(lt,2),Wt=r(Dt),Yt=r(Wt);hd(Yt,{class:"w-5 h-5"});var Qt=n(Wt,2),Jt=r(Qt),zt=r(Jt),Ft=r(zt),At=n(Jt,2),Ct=n(Qt,2),tt=r(Ct),yt=n(r(tt),2),pt=n(tt,2),at=n(r(pt),2),P=n(Ct,2),xt=n(r(P),2);xe(xt,21,()=>p,st=>st.value,(st,kt)=>{var G=xm(),Z=r(G),W={};K(()=>{y(Z,e(kt).label),W!==(W=e(kt).value)&&(G.value=(G.__value=e(kt).value)??"")}),m(st,G)});var ft=n(P,2),V=r(ft),et=n(mt,2),ht=r(et),bt=n(r(ht),2);{var wt=st=>{var kt=bm(),G=r(kt),Z=r(G),W=n(G,2),A=r(W);A.__click=b;var I=r(A);Xa(I,{class:"w-4 h-4 mr-2"});var N=n(A,2);N.__click=[um,o];var it=r(N);be(it,{class:"w-4 h-4 mr-2"}),K(()=>{Nt(Z,"src",e(o)),Qe(Z,`max-width: ${e(c)??""}px; max-height: ${e(c)??""}px;`)}),m(st,kt)},Ut=st=>{var kt=Et(),G=ut(kt);{var Z=A=>{var I=ym(),N=r(I),it=r(N);K(()=>y(it,e(s))),m(A,I)},W=A=>{var I=hm(),N=r(I);zo(N,{class:"w-12 h-12 mb-4 opacity-50"}),m(A,I)};O(G,A=>{e(s)?A(Z):A(W,!1)},!0)}m(st,kt)};O(bt,st=>{e(o)?st(wt):st(Ut,!1)})}var jt=n(ht,2),Pt=r(jt),Lt=r(Pt);pa(Lt,{class:"w-4 h-4"}),K(()=>{ge(nt,1,`textarea ${e(s)?"border-danger-500 focus:border-danger-500 focus:ring-danger-500":""}`),y(Ft,`Size: ${e(c)??""}px`)}),Tt(nt,()=>e(a),st=>d(a,st)),Tt(At,()=>e(c),st=>d(c,st)),Tt(yt,()=>e(l),st=>d(l,st)),Tt(at,()=>e(v),st=>d(v,st)),cr(xt,()=>e(g),st=>d(g,st)),We(V,()=>e(u),st=>d(u,st)),m(i,x),Bt()}ye(["click"]);function wm(i,t,a){navigator.clipboard.writeText(e(t)).then(()=>{d(a,!0),setTimeout(()=>{d(a,!1)},2e3)})}function Cm(i,t,a){d(t,""),d(a,"")}function $m(i,t,a){const o=e(t);d(t,e(a),!0),d(a,o,!0)}function Sm(){Te("/tools")}var Tm=k('<meta name="description" content="Convert text between different cases: uppercase, lowercase, title case, camelCase, snake_case, kebab-case, and more"/>'),Mm=(i,t,a)=>d(t,a(),!0),Em=k('<div class="absolute top-1 right-1"><div class="w-2 h-2 bg-secondary-500 rounded-full"></div></div>'),Lm=k('<button type="button"><div class="flex items-center justify-center mb-2"><!></div> <div class="text-sm font-medium text-gray-900 dark:text-white capitalize mb-1"> </div> <div class="text-xs text-gray-500 dark:text-gray-400 font-mono text-center"> </div> <!></button>'),Pm=k('<div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"><div class="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-600 dark:text-gray-400"><div><span class="font-medium">Characters:</span> </div> <div><span class="font-medium">No spaces:</span> </div> <div><span class="font-medium">Words:</span> </div> <div><span class="font-medium">Sentences:</span> </div> <div><span class="font-medium">Lines:</span> </div></div></div>'),Am=(i,t,a)=>{d(t,"Hello World! This is a SAMPLE text for TESTING."),d(a,"uppercase")},Im=(i,t)=>d(t,"uppercase"),jm=(i,t)=>d(t,"lowercase"),Nm=(i,t)=>d(t,"title"),Rm=k('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="btn btn-primary"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Text Case Converter</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Convert text between different case formats with ease</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Text Case Converter</li></ol></nav> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6"><h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Select Case Type</h2> <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3"></div></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><div class="flex items-center justify-between mb-4"><h2 class="text-xl font-semibold text-gray-900 dark:text-white">Input Text</h2> <button class="btn btn-primary btn-sm">Clear</button></div> <textarea class="textarea" placeholder="Enter your text here..."></textarea> <!></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><div class="flex items-center justify-between mb-4"><h2 class="text-xl font-semibold text-gray-900 dark:text-white">Converted Text</h2> <div class="flex items-center gap-2"><button class="btn btn-primary btn-sm" title="Swap input and output"><!></button> <button class="btn btn-primary btn-sm"><!> </button></div></div> <textarea class="textarea" placeholder="Converted text will appear here..."></textarea> <div class="mt-4 flex gap-2"><button class="btn btn-primary w-full">Download as File</button></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2> <div class="grid grid-cols-2 md:grid-cols-4 gap-3"><button class="btn btn-primary btn-sm">Load Sample Text</button> <button class="btn btn-primary btn-sm">UPPERCASE</button> <button class="btn btn-primary btn-sm">lowercase</button> <button class="btn btn-primary btn-sm">Title Case</button></div></div></div>');function Bm(i,t){Rt(t,!0);let a=f(""),o=f(""),s=f(!1),c=f("uppercase");const l={uppercase:P=>P.toUpperCase(),lowercase:P=>P.toLowerCase(),title:P=>P.replace(/\w\S*/g,xt=>xt.charAt(0).toUpperCase()+xt.substr(1).toLowerCase()),camelCase:P=>P.replace(/(?:^\w|[A-Z]|\b\w)/g,(xt,ft)=>ft===0?xt.toLowerCase():xt.toUpperCase()).replace(/\s+/g,""),snakeCase:P=>P.toLowerCase().replace(/\W+/g," ").split(/ |\B(?=[A-Z])/).join("_"),kebabCase:P=>P.toLowerCase().replace(/\W+/g," ").split(/ |\B(?=[A-Z])/).join("-"),pascalCase:P=>P.replace(/(?:^\w|[A-Z]|\b\w)/g,xt=>xt.toUpperCase()).replace(/\s+/g,""),sentence:P=>P.charAt(0).toUpperCase()+P.slice(1).toLowerCase(),alternating:P=>P.split("").map((xt,ft)=>ft%2===0?xt.toLowerCase():xt.toUpperCase()).join(""),inverse:P=>P.split("").map(xt=>xt===xt.toUpperCase()?xt.toLowerCase():xt.toUpperCase()).join("")};function v(){if(!e(a).trim()){d(o,"");return}const P=l[e(c)];d(o,P(e(a)),!0)}ke(()=>{e(a)?v():d(o,"")});function g(){const P=new Blob([e(o)],{type:"text/plain"}),xt=URL.createObjectURL(P),ft=document.createElement("a");ft.href=xt,ft.download=`text-${e(c)}.txt`,document.body.appendChild(ft),ft.click(),document.body.removeChild(ft),URL.revokeObjectURL(xt)}const u=ue(()=>e(a)?{characters:e(a).length,charactersNoSpaces:e(a).replace(/\s/g,"").length,words:e(a).trim()?e(a).trim().split(/\s+/).length:0,sentences:e(a).trim()?e(a).split(/[.!?]+/).filter(P=>P.trim().length>0).length:0,lines:e(a).split(`
`).length}:null);var p=Rm();Er(P=>{var xt=Tm();_r.title="Text Case Converter - Developer Tools",m(P,xt)});var h=r(p),b=r(h),x=r(b);x.__click=[Sm];var w=r(x);Ie(w,{class:"w-5 h-5 mr-2"});var S=n(b,2),R=r(S),C=r(R);xa(C,{class:"w-10 h-10 text-white"});var T=n(h,4),E=n(r(T),2);xe(E,21,()=>Object.entries(l),([P])=>P,(P,xt)=>{var ft=ue(()=>Qa(e(xt),1));let V=()=>e(ft)[0];const et=ue(()=>({uppercase:"HELLO WORLD",lowercase:"hello world",title:"Hello World",camelCase:"helloWorld",snakeCase:"hello_world",kebabCase:"hello-world",pascalCase:"HelloWorld",sentence:"Hello world",alternating:"hElLo wOrLd",inverse:"HELLO WORLD"}));var ht=Lm();ht.__click=[Mm,c,V];var bt=r(ht),wt=r(bt);{let G=ue(()=>e(c)===V()?"text-secondary-600 dark:text-secondary-400":"text-gray-600 dark:text-gray-400");xa(wt,{get class(){return`w-5 h-5 ${e(G)??""}`}})}var Ut=n(bt,2),jt=r(Ut),Pt=n(Ut,2),Lt=r(Pt),st=n(Pt,2);{var kt=G=>{var Z=Em();m(G,Z)};O(st,G=>{e(c)===V()&&G(kt)})}K(G=>{ge(ht,1,`relative p-3 rounded-lg border-2 transition-all ${e(c)===V()?"border-secondary-500 bg-secondary-100 dark:bg-secondary-900/20":"border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"}`),y(jt,G),y(Lt,e(et)[V()])},[()=>V().replace(/([A-Z])/g," $1").trim()]),m(P,ht)});var _=n(T,2),L=r(_),$=r(L),H=n(r($),2);H.__click=[Cm,a,o];var U=n($,2),Q=n(U,2);{var mt=P=>{var xt=Pm(),ft=r(xt),V=r(ft),et=n(r(V)),ht=n(V,2),bt=n(r(ht)),wt=n(ht,2),Ut=n(r(wt)),jt=n(wt,2),Pt=n(r(jt)),Lt=n(jt,2),st=n(r(Lt));K(()=>{y(et,` ${e(u).characters??""}`),y(bt,` ${e(u).charactersNoSpaces??""}`),y(Ut,` ${e(u).words??""}`),y(Pt,` ${e(u).sentences??""}`),y(st,` ${e(u).lines??""}`)}),m(P,xt)};O(Q,P=>{e(u)&&P(mt)})}var lt=n(L,2),nt=r(lt),ct=n(r(nt),2),vt=r(ct);vt.__click=[$m,a,o];var Dt=r(vt);j0(Dt,{class:"w-4 h-4 rotate-180"});var Wt=n(vt,2);Wt.__click=[wm,o,s];var Yt=r(Wt);be(Yt,{class:"w-4 h-4 mr-1"});var Qt=n(Yt),Jt=n(nt,2),zt=n(Jt,2),Ft=r(zt);Ft.__click=g;var At=n(_,2),Ct=n(r(At),2),tt=r(Ct);tt.__click=[Am,a,c];var yt=n(tt,2);yt.__click=[Im,c];var pt=n(yt,2);pt.__click=[jm,c];var at=n(pt,2);at.__click=[Nm,c],K(()=>{vt.disabled=!e(a)||!e(o),Wt.disabled=!e(o),y(Qt,` ${e(s)?"Copied!":"Copy"}`),Ft.disabled=!e(o)}),Tt(U,()=>e(a),P=>d(a,P)),Tt(Jt,()=>e(o),P=>d(o,P)),m(i,p),Bt()}ye(["click"]);function Dm(i,t,a){navigator.clipboard.writeText(e(t)).then(()=>{d(a,!0),setTimeout(()=>{d(a,!1)},2e3)})}function Fm(){Te("/tools")}var Hm=k('<meta name="description" content="Generate Lorem Ipsum placeholder text for design and testing purposes"/>'),Om=k('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Lorem Ipsum Generator</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Generate placeholder text for your designs and prototypes</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Lorem Ipsum Generator</li></ol></nav> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6"><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"><div><label for="amount-input" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Amount</label> <input class="input" id="amount-input" type="number" min="1" max="100"/></div> <div><label for="unit-select" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Unit</label> <select id="unit-select" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"><option>Paragraphs</option><option>Sentences</option><option>Words</option></select></div> <div class="flex items-end"><label class="flex items-center cursor-pointer"><input type="checkbox" class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/> <span class="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">Start with "Lorem ipsum"</span></label></div> <div class="flex items-end"><button class="btn btn-primary w-full"><!> Generate</button></div></div> <div class="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400"><div class="flex items-center"><!> <span> </span></div> <div class="flex items-center"><!> <span> </span></div> <div class="flex items-center"><!> <span> </span></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><div class="flex items-center justify-between mb-4"><h2 class="text-xl font-semibold text-gray-900 dark:text-white">Generated Text</h2> <div class="flex gap-2"><button class="btn btn-primary btn-sm"><!> </button> <button class="btn btn-primary btn-sm">Download</button></div></div> <div class="prose prose-gray dark:prose-invert max-w-none"><div class="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed"> </div></div></div></div>');function Um(i,t){Rt(t,!0);let a=f(5),o=f("paragraphs"),s=f(!0),c=f(""),l=f(!1);const v=["lorem","ipsum","dolor","sit","amet","consectetur","adipiscing","elit","sed","do","eiusmod","tempor","incididunt","ut","labore","et","dolore","magna","aliqua","enim","ad","minim","veniam","quis","nostrud","exercitation","ullamco","laboris","nisi","ut","aliquip","ex","ea","commodo","consequat","duis","aute","irure","dolor","in","reprehenderit","voluptate","velit","esse","cillum","fugiat","nulla","pariatur","excepteur","sint","occaecat","cupidatat","non","proident","sunt","in","culpa","qui","officia","deserunt","mollit","anim","id","est","laborum"],g=["at","vero","eos","et","accusamus","et","iusto","odio","dignissimos","ducimus","qui","blanditiis","praesentium","voluptatum","deleniti","atque","corrupti","quos","dolores","et","quas","molestias","excepturi","sint","obcaecati","cupiditate","non","provident","similique","sunt","in","culpa","qui","officia","deserunt","mollitia","animi","id","est","laborum","et","dolorum","fuga","et","harum","quidem","rerum","facilis","est","et","expedita","distinctio","nam","libero","tempore","cum","soluta","nobis","est","eligendi","optio","cumque","nihil","impedit","quo","porro","quisquam","est","qui","minus","id","quod","maxime","placeat","facere","possimus","omnis","voluptas","assumenda","est","omnis","dolor","repellendus","temporibus","autem","quibusdam","et","aut","consequatur","vel","illum","qui","dolorem","eum","fugiat","quo","voluptas","nulla","pariatur","at","vero","eos","et","accusamus","et","iusto","odio","dignissimos","ducimus","qui","blanditiis","praesentium","voluptatum"];function u(){const A=[...v,...g];return A[Math.floor(Math.random()*A.length)]}function p(){const A=Math.floor(Math.random()*10)+5,I=[];for(let N=0;N<A;N++){const it=u();I.push(N===0?it.charAt(0).toUpperCase()+it.slice(1):it)}return I.join(" ")+"."}function h(){const A=Math.floor(Math.random()*5)+3,I=[];for(let N=0;N<A;N++)I.push(p());return I.join(" ")}function b(){let A="";if(e(s)&&e(o)!=="words"){A=`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

`;const I=Math.max(0,e(a)-1);switch(e(o)){case"paragraphs":for(let N=0;N<I;N++)A+=h()+`

`;break;case"sentences":for(let N=0;N<I;N++)A+=p()+" ";break;case"words":A=x(e(a));break}}else switch(e(o)){case"paragraphs":for(let I=0;I<e(a);I++)A+=h()+`

`;break;case"sentences":for(let I=0;I<e(a);I++)A+=p()+" ";break;case"words":A=x(e(a));break}d(c,A.trim(),!0)}function x(A){const I=[];for(let N=0;N<A;N++){const it=u();I.push(N===0?it.charAt(0).toUpperCase()+it.slice(1):it)}return I.join(" ")+"."}function w(){const A=new Blob([e(c)],{type:"text/plain"}),I=URL.createObjectURL(A),N=document.createElement("a");N.href=I,N.download="lorem-ipsum.txt",document.body.appendChild(N),N.click(),document.body.removeChild(N),URL.revokeObjectURL(I)}b();var S=Om();Er(A=>{var I=Hm();_r.title="Lorem Ipsum Generator - Developer Tools",m(A,I)});var R=r(S),C=r(R),T=r(C);T.__click=[Fm];var E=r(T);Ie(E,{class:"w-5 h-5"});var _=n(C,2),L=r(_),$=r(L);He($,{class:"w-10 h-10 text-white"});var H=n(R,4),U=r(H),Q=r(U),mt=n(r(Q),2),lt=n(Q,2),nt=n(r(lt),2),ct=r(nt);ct.value=ct.__value="paragraphs";var vt=n(ct);vt.value=vt.__value="sentences";var Dt=n(vt);Dt.value=Dt.__value="words";var Wt=n(lt,2),Yt=r(Wt),Qt=r(Yt),Jt=n(Wt,2),zt=r(Jt);zt.__click=b;var Ft=r(zt);Tr(Ft,{class:"w-4 h-4 mr-2"});var At=n(U,2),Ct=r(At),tt=r(Ct);He(tt,{class:"w-4 h-4 mr-1"});var yt=n(tt,2),pt=r(yt),at=n(Ct,2),P=r(at);xa(P,{class:"w-4 h-4 mr-1"});var xt=n(P,2),ft=r(xt),V=n(at,2),et=r(V);Qr(et,{class:"w-4 h-4 mr-1"});var ht=n(et,2),bt=r(ht),wt=n(H,2),Ut=r(wt),jt=n(r(Ut),2),Pt=r(jt);Pt.__click=[Dm,c,l];var Lt=r(Pt);be(Lt,{class:"w-4 h-4 mr-1"});var st=n(Lt),kt=n(Pt,2);kt.__click=w;var G=n(Ut,2),Z=r(G),W=r(Z);K((A,I,N)=>{y(pt,`${A??""} words`),y(ft,`${I??""} sentences`),y(bt,`${N??""} paragraphs`),y(st,` ${e(l)?"Copied!":"Copy"}`),y(W,e(c))},[()=>e(c).split(/\s+/).filter(A=>A.length>0).length,()=>e(c).split(/[.!?]+/).filter(A=>A.trim().length>0).length,()=>e(c).split(/\n\n+/).filter(A=>A.trim().length>0).length]),Tt(mt,()=>e(a),A=>d(a,A)),cr(nt,()=>e(o),A=>d(o,A)),We(Qt,()=>e(s),A=>d(s,A)),m(i,S),Bt()}ye(["click"]);function zm(i,t){d(t,"")}function qm(i,t){d(t,`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

This sample text contains 123 numbers and various punctuation marks! It's designed to test the character counter functionality comprehensively.`)}function Gm(){Te("/tools")}var Wm=k('<meta name="description" content="Count characters, words, and analyze text with detailed statistics including reading time and frequency analysis"/>'),Jm=k('<div class="flex items-center justify-between text-sm"><span class="text-gray-600 dark:text-gray-400"> </span> <div class="flex items-center gap-2"><div class="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div></div></div> <span class="text-gray-600 dark:text-gray-400 min-w-[60px] text-right"> </span></div></div>'),Vm=k('<div class="mt-4 space-y-2"></div>'),Ym=k('<div class="space-y-3"><div class="flex items-center justify-between p-3 bg-primary-100 dark:bg-primary-900/20 rounded-lg"><div class="flex items-center"><!> <span class="text-sm font-medium text-gray-900 dark:text-white">Characters</span></div> <span class="text-lg font-bold text-primary-600 dark:text-primary-400"> </span></div> <div class="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"><div class="flex items-center"><!> <span class="text-sm font-medium text-gray-900 dark:text-white">Words</span></div> <span class="text-lg font-bold text-primary-600 dark:text-primary-400"> </span></div> <div class="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg"><div class="flex items-center"><!> <span class="text-sm font-medium text-gray-900 dark:text-white">Sentences</span></div> <span class="text-lg font-bold text-primary-600 dark:text-primary-400"> </span></div> <div class="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg"><div class="flex items-center"><!> <span class="text-sm font-medium text-gray-900 dark:text-white">Reading Time</span></div> <span class="text-lg font-bold text-orange-600 dark:text-orange-400"> </span></div></div>'),Km=k('<p class="text-gray-500 dark:text-gray-400 text-center py-8">Enter text to see statistics</p>'),Qm=(i,t,a)=>t(e(a)),Zm=k('<div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><span class="text-sm font-medium text-gray-900 dark:text-white capitalize"> </span> <span class="text-sm text-gray-600 dark:text-gray-400"> </span></div>'),Xm=k('<div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mt-6"><div class="flex items-center justify-between mb-4"><h3 class="text-lg font-semibold text-gray-900 dark:text-white">Most Frequent Words</h3> <!></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"></div></div>'),tp=k('<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Character Breakdown</h3> <div class="space-y-2"><div class="flex justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Letters</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div> <div class="flex justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Numbers</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div> <div class="flex justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Spaces</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div> <div class="flex justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Punctuation</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div> <div class="flex justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Special chars</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Reading Time</h3> <div class="space-y-3"><div class="flex items-center justify-between"><div class="flex items-center"><!> <span class="text-sm text-gray-600 dark:text-gray-400">Slow (130 WPM)</span></div> <span class="font-medium text-gray-900 dark:text-white"> </span></div> <div class="flex items-center justify-between"><div class="flex items-center"><!> <span class="text-sm text-gray-600 dark:text-gray-400">Average (200 WPM)</span></div> <span class="font-medium text-gray-900 dark:text-white"> </span></div> <div class="flex items-center justify-between"><div class="flex items-center"><!> <span class="text-sm text-gray-600 dark:text-gray-400">Fast (300 WPM)</span></div> <span class="font-medium text-gray-900 dark:text-white"> </span></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Structure Analysis</h3> <div class="space-y-2"><div class="flex justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Paragraphs</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div> <div class="flex justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Lines</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div> <div class="flex justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Unique words</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div> <div class="flex justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Avg word length</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div></div></div></div> <!>',1),ep=k('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="btn btn-primary"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Character Counter</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Count characters, words, and analyze text with detailed statistics</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Character Counter</li></ol></nav> <div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-2"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><div class="flex items-center justify-between mb-4"><h2 class="text-xl font-semibold text-gray-900 dark:text-white">Input Text</h2> <div class="flex items-center gap-2"><button class="btn btn-primary btn-sm">Load Sample</button> <button class="btn btn-primary btn-sm">Clear</button></div></div> <textarea class="textarea" placeholder="Enter your text here to count characters, words, and analyze..."></textarea> <!></div></div> <div class="space-y-6"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Stats</h2> <!></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Actions</h2> <div class="space-y-3"><button class="btn btn-primary w-full"><!> Copy Text</button> <button class="btn btn-primary w-full"><!> Download Report</button></div></div></div></div> <!></div>');function rp(i,t){Rt(t,!0);let a=f("");const o=ue(()=>e(a)?{totalChars:e(a).length,charsNoSpaces:e(a).replace(/\s/g,"").length,charsIncludingSpaces:e(a).length,words:e(a).trim()?e(a).trim().split(/\s+/).length:0,uniqueWords:e(a).trim()?new Set(e(a).toLowerCase().trim().split(/\s+/)).size:0,sentences:e(a).trim()?e(a).split(/[\\.!?]+/).filter(Ct=>Ct.trim().length>0).length:0,paragraphs:e(a).trim()?e(a).split(/\n\n+/).filter(Ct=>Ct.trim().length>0).length:0,lines:e(a).split(`
`).length,readingTimeSlow:Math.ceil(e(a).trim().split(/\s+/).length/130),readingTimeAvg:Math.ceil(e(a).trim().split(/\s+/).length/200),readingTimeFast:Math.ceil(e(a).trim().split(/\s+/).length/300),letters:(e(a).match(/[a-zA-Z]/g)||[]).length,numbers:(e(a).match(/[0-9]/g)||[]).length,spaces:(e(a).match(/\s/g)||[]).length,punctuation:(e(a).match(/[.,!?;:'"\-()[\]{}]/g)||[]).length,specialChars:e(a).length-(e(a).match(/[a-zA-Z0-9\s.,!?;:'"\-()[\]{}]/g)||[]).length,wordFrequency:e(a).trim()?s(e(a).toLowerCase()):{}}:null);function s(Ct){const tt=Ct.split(/\s+/),yt={};tt.forEach(at=>{const P=at.replace(/[.,!?;:'"()[\]{}]/g,"");P.length>0&&(yt[P]=(yt[P]||0)+1)});const pt=Object.entries(yt).sort((at,P)=>P[1]-at[1]).slice(0,10);return Object.fromEntries(pt)}function c(Ct){navigator.clipboard.writeText(Ct)}function l(){if(!e(o))return;const Ct=`Character Counter Report
====================

Text Length: ${e(o).totalChars} characters
Words: ${e(o).words} words
Sentences: ${e(o).sentences} sentences
Paragraphs: ${e(o).paragraphs} paragraphs

Detailed Breakdown:
- Characters (with spaces): ${e(o).charsIncludingSpaces}
- Characters (no spaces): ${e(o).charsNoSpaces}
- Letters: ${e(o).letters}
- Numbers: ${e(o).numbers}
- Spaces: ${e(o).spaces}
- Punctuation: ${e(o).punctuation}
- Special characters: ${e(o).specialChars}
- Lines: ${e(o).lines}
- Unique words: ${e(o).uniqueWords}

Reading Time:
- Slow reader (130 WPM): ${e(o).readingTimeSlow} minutes
- Average reader (200 WPM): ${e(o).readingTimeAvg} minutes
- Fast reader (300 WPM): ${e(o).readingTimeFast} minutes

${Object.keys(e(o).wordFrequency).length>0?`
Top 10 Most Frequent Words:
${Object.entries(e(o).wordFrequency).map(([at,P])=>`- ${at}: ${P} times`).join(`
`)}
`:""}

Original Text:
${e(a)}
`,tt=new Blob([Ct],{type:"text/plain"}),yt=URL.createObjectURL(tt),pt=document.createElement("a");pt.href=yt,pt.download="character-counter-report.txt",document.body.appendChild(pt),pt.click(),document.body.removeChild(pt),URL.revokeObjectURL(yt)}const v=[{name:"Twitter",limit:280},{name:"SMS",limit:160},{name:"LinkedIn Post",limit:3e3},{name:"Facebook Post",limit:63206},{name:"Instagram Caption",limit:2200}];var g=ep();Er(Ct=>{var tt=Wm();_r.title="Character Counter - Developer Tools",m(Ct,tt)});var u=r(g),p=r(u),h=r(p);h.__click=[Gm];var b=r(h);Ie(b,{class:"w-5 h-5 mr-2"});var x=n(p,2),w=r(x),S=r(w);Nr(S,{class:"w-10 h-10 text-white"});var R=n(u,4),C=r(R),T=r(C),E=r(T),_=n(r(E),2),L=r(_);L.__click=[qm,a];var $=n(L,2);$.__click=[zm,a];var H=n(E,2);Nt(H,"rows",16);var U=n(H,2);{var Q=Ct=>{var tt=Vm();xe(tt,21,()=>v,yt=>yt.name,(yt,pt)=>{const at=ue(()=>e(o).totalChars/e(pt).limit*100);var P=Jm(),xt=r(P),ft=r(xt),V=n(xt,2),et=r(V),ht=r(et),bt=n(et,2),wt=r(bt);K(Ut=>{y(ft,e(pt).name),ge(ht,1,`h-2 rounded-full transition-all ${e(at)>100?"bg-red-500":e(at)>80?"bg-yellow-500":"bg-green-500"}`),Qe(ht,`width: ${Ut??""}%`),y(wt,`${e(o).totalChars??""}/${e(pt).limit??""}`)},[()=>Math.min(e(at),100)]),m(yt,P)}),m(Ct,tt)};O(U,Ct=>{e(o)&&e(o).totalChars>0&&Ct(Q)})}var mt=n(C,2),lt=r(mt),nt=n(r(lt),2);{var ct=Ct=>{var tt=Ym(),yt=r(tt),pt=r(yt),at=r(pt);xa(at,{class:"w-5 h-5 text-primary-600 dark:text-primary-400 mr-2"});var P=n(pt,2),xt=r(P),ft=n(yt,2),V=r(ft),et=r(V);He(et,{class:"w-5 h-5 text-primary-600 dark:text-primary-400 mr-2"});var ht=n(V,2),bt=r(ht),wt=n(ft,2),Ut=r(wt),jt=r(Ut);Qr(jt,{class:"w-5 h-5 text-primary-600 dark:text-primary-400 mr-2"});var Pt=n(Ut,2),Lt=r(Pt),st=n(wt,2),kt=r(st),G=r(kt);ka(G,{class:"w-5 h-5 text-orange-600 dark:text-orange-400 mr-2"});var Z=n(kt,2),W=r(Z);K(()=>{y(xt,e(o).totalChars),y(bt,e(o).words),y(Lt,e(o).sentences),y(W,`${e(o).readingTimeAvg??""}m`)}),m(Ct,tt)},vt=Ct=>{var tt=Km();m(Ct,tt)};O(nt,Ct=>{e(o)?Ct(ct):Ct(vt,!1)})}var Dt=n(lt,2),Wt=n(r(Dt),2),Yt=r(Wt);Yt.__click=[Qm,c,a];var Qt=r(Yt);be(Qt,{class:"w-4 h-4 mr-2"});var Jt=n(Yt,2);Jt.__click=l;var zt=r(Jt);Nr(zt,{class:"w-4 h-4 mr-2"});var Ft=n(R,2);{var At=Ct=>{var tt=tp(),yt=ut(tt),pt=r(yt),at=n(r(pt),2),P=r(at),xt=n(r(P),2),ft=r(xt),V=n(P,2),et=n(r(V),2),ht=r(et),bt=n(V,2),wt=n(r(bt),2),Ut=r(wt),jt=n(bt,2),Pt=n(r(jt),2),Lt=r(Pt),st=n(jt,2),kt=n(r(st),2),G=r(kt),Z=n(pt,2),W=n(r(Z),2),A=r(W),I=r(A),N=r(I);ka(N,{class:"w-4 h-4 text-gray-400 mr-2"});var it=n(I,2),rt=r(it),Y=n(A,2),z=r(Y),B=r(z);ka(B,{class:"w-4 h-4 text-gray-400 mr-2"});var M=n(z,2),D=r(M),F=n(Y,2),X=r(F),j=r(X);ka(j,{class:"w-4 h-4 text-gray-400 mr-2"});var dt=n(X,2),Mt=r(dt),Gt=n(Z,2),St=n(r(Gt),2),q=r(St),gt=n(r(q),2),$t=r(gt),Ht=n(q,2),J=n(r(Ht),2),ot=r(J),_t=n(Ht,2),It=n(r(_t),2),Vt=r(It),Xt=n(_t,2),Kt=n(r(Xt),2),ee=r(Kt),le=n(yt,2);{var qt=de=>{var ce=Xm(),ae=r(ce),me=n(r(ae),2);B0(me,{class:"w-5 h-5 text-gray-400"});var pe=n(ae,2);xe(pe,21,()=>Object.entries(e(o).wordFrequency),([re,ve])=>re,(re,ve)=>{var Ce=ue(()=>Qa(e(ve),2));let Me=()=>e(Ce)[0],Ot=()=>e(Ce)[1];var ie=Zm(),fe=r(ie),he=r(fe),je=n(fe,2),Ne=r(je);K(()=>{y(he,Me()),y(Ne,`${Ot()??""}x`)}),m(re,ie)}),m(de,ce)};O(le,de=>{Object.keys(e(o).wordFrequency).length>0&&de(qt)})}K(de=>{y(ft,e(o).letters),y(ht,e(o).numbers),y(Ut,e(o).spaces),y(Lt,e(o).punctuation),y(G,e(o).specialChars),y(rt,`${e(o).readingTimeSlow??""} min`),y(D,`${e(o).readingTimeAvg??""} min`),y(Mt,`${e(o).readingTimeFast??""} min`),y($t,e(o).paragraphs),y(ot,e(o).lines),y(Vt,e(o).uniqueWords),y(ee,de)},[()=>e(o).words>0?(e(o).charsNoSpaces/e(o).words).toFixed(1):0]),m(Ct,tt)};O(Ft,Ct=>{e(o)&&Ct(At)})}K(()=>{Yt.disabled=!e(a),Jt.disabled=!e(o)}),Tt(H,()=>e(a),Ct=>d(a,Ct)),m(i,g),Bt()}ye(["click"]);function ap(i,t,a,o){d(t,`function calculateSum(a, b) {
  return a + b;
}

const result = calculateSum(5, 3);
console.log(result);`),d(a,`function calculateSum(a, b, c) {
  return a + b + c;
}

const result = calculateSum(5, 3, 2);
console.log('Result:', result);`),o()}function ip(i,t,a,o){d(t,""),d(a,""),d(o,null)}function op(){Te("/tools")}var np=k('<button class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-blue-700 transition-colors"> </button> <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">Download Diff</button>',1),sp=k('<div class="flex gap-4 text-sm"><span class="text-primary-600 dark:text-primary-400"> </span> <span class="text-red-600 dark:text-red-400"> </span> <span class="text-gray-600 dark:text-gray-400"> </span></div>'),dp=k('<span class="text-xs text-gray-500 dark:text-gray-400 w-8 text-right"> </span>'),lp=k('<span class="text-xs text-gray-500 dark:text-gray-400 w-8 text-right"> </span>'),cp=k('<div class="flex items-start gap-2 py-1"><!> <span class="text-primary-600 dark:text-primary-400">+</span> <pre class="text-sm text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded flex-1"> </pre></div>'),vp=k('<div class="flex items-start gap-2 py-1"><!> <span class="text-red-600 dark:text-red-400">-</span> <pre class="text-sm text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded flex-1"> </pre></div> <!>',1),gp=k('<span class="text-xs text-gray-500 dark:text-gray-400 w-8 text-right"> </span>'),up=k('<div class="flex items-start gap-2 py-1"><!> <span class="text-gray-400 dark:text-gray-600"></span> <pre class="text-sm text-gray-700 dark:text-gray-300 px-2 py-1 rounded flex-1"> </pre></div>'),mp=k('<span class="text-xs text-gray-500 dark:text-gray-400 w-8 text-right"> </span>'),pp=k('<div class="flex items-start gap-2 py-1"><!> <span class="text-primary-600 dark:text-primary-400">+</span> <pre class="text-sm text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded flex-1"> </pre></div>'),fp=k('<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><div class="flex justify-between items-center mb-4"><h3 class="text-lg font-semibold text-gray-900 dark:text-white">Diff Result</h3> <!></div> <div class="overflow-x-auto"><div class="min-w-full"><!> <!> <!></div></div></div>'),xp=k(`<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Text Diff Tool</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Compare two text blocks and highlight differences with detailed analysis.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Text Diff Tool</li></ol></nav> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Diff Options</h3> <div class="flex flex-wrap gap-4"><label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" class="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/> <span class="text-sm text-gray-700 dark:text-gray-300">Show line numbers</span></label> <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" class="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/> <span class="text-sm text-gray-700 dark:text-gray-300">Ignore whitespace</span></label> <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" class="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/> <span class="text-sm text-gray-700 dark:text-gray-300">Ignore case</span></label></div></div> <div class="mb-6 flex flex-wrap gap-4 items-center justify-center"><button class="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"> </button> <button class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">Load Sample Text</button> <button class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">Clear All</button> <!></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"><div><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Original Text</h2> <span class="text-sm text-gray-500 dark:text-gray-400"> </span></div> <textarea placeholder="Enter the original text here..." class="w-full h-96 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"></textarea></div> <div><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Modified Text</h2> <span class="text-sm text-gray-500 dark:text-gray-400"> </span></div> <textarea placeholder="Enter the modified text here..." class="w-full h-96 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"></textarea></div></div> <!> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Side by Side Comparison</h3> <p class="text-gray-600 dark:text-gray-400">Compare two text blocks and easily identify added, removed, and unchanged lines</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Flexible Options</h3> <p class="text-gray-600 dark:text-gray-400">Configure diff comparison with options to ignore whitespace, case sensitivity, and line
        numbers</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Export & Share</h3> <p class="text-gray-600 dark:text-gray-400">Copy diff results to clipboard or download as a text file for easy sharing</p></div></div></div>`);function bp(i,t){Rt(t,!0);let a=f(""),o=f(""),s=f(null),c=f(!0),l=f(!1),v=f(!1),g=f(""),u=f(!1);function p(){d(u,!0);try{let W=e(a).split(`
`),A=e(o).split(`
`);e(l)&&(W=W.map(it=>it.trim()),A=A.map(it=>it.trim())),e(v)&&(W=W.map(it=>it.toLowerCase()),A=A.map(it=>it.toLowerCase()));const I={added:[],removed:[],unchanged:[]},N=Math.max(W.length,A.length);for(let it=0;it<N;it++){const rt=W[it]||"",Y=A[it]||"";it>=W.length?I.added.push(Y):it>=A.length?I.removed.push(rt):rt===Y?I.unchanged.push(rt):(I.removed.push(rt),I.added.push(Y))}d(s,I,!0)}catch(W){console.error("Error calculating diff:",W)}finally{d(u,!1)}}function h(){if(!e(s))return;let W="";if(e(s).removed?.forEach((A,I)=>{W+=`- ${A}
`,e(s)?.added?.[I]&&(W+=`+ ${e(s).added[I]}
`)}),e(s).unchanged?.forEach(A=>{W+=`  ${A}
`}),e(s).added.length>e(s).removed.length)for(let A=e(s).removed.length;A<e(s).added.length;A++)W+=`+ ${e(s).added[A]}
`;navigator.clipboard.writeText(W),d(g,"diff"),setTimeout(()=>{d(g,"")},2e3)}function b(){if(!e(s))return;let W="";if(e(s).removed?.forEach((it,rt)=>{W+=`- ${it}
`,e(s)?.added?.[rt]&&(W+=`+ ${e(s).added[rt]}
`)}),e(s).unchanged?.forEach(it=>{W+=`  ${it}
`}),e(s).added.length>e(s).removed.length)for(let it=e(s).removed.length;it<e(s).added.length;it++)W+=`+ ${e(s).added[it]}
`;const A=new Blob([W],{type:"text/plain"}),I=URL.createObjectURL(A),N=document.createElement("a");N.href=I,N.download="diff-result.txt",N.click(),URL.revokeObjectURL(I)}function x(){return e(s)?{added:e(s).added.length,removed:e(s).removed.length,unchanged:e(s).unchanged.length,total:e(s).added.length+e(s).removed.length+e(s).unchanged.length}:null}var w=xp(),S=r(w),R=r(S),C=r(R);C.__click=[op];var T=r(C);Ie(T,{class:"w-5 h-5"});var E=n(R,2),_=r(E),L=r(_);qa(L,{class:"w-10 h-10 text-white"});var $=n(S,4),H=n(r($),2),U=r(H),Q=r(U),mt=n(U,2),lt=r(mt),nt=n(mt,2),ct=r(nt),vt=n($,2),Dt=r(vt);Dt.__click=p;var Wt=r(Dt),Yt=n(Dt,2);Yt.__click=[ap,a,o,p];var Qt=n(Yt,2);Qt.__click=[ip,a,o,s];var Jt=n(Qt,2);{var zt=W=>{var A=np(),I=ut(A);I.__click=h;var N=r(I),it=n(I,2);it.__click=b,K(()=>y(N,e(g)==="diff"?"✓ Copied!":"Copy Diff")),m(W,A)};O(Jt,W=>{e(s)&&W(zt)})}var Ft=n(vt,2),At=r(Ft),Ct=r(At),tt=n(r(Ct),2),yt=r(tt),pt=n(Ct,2),at=n(At,2),P=r(at),xt=n(r(P),2),ft=r(xt),V=n(P,2),et=n(Ft,2);{var ht=W=>{var A=fp(),I=r(A),N=n(r(I),2);{var it=D=>{var F=sp(),X=r(F),j=r(X),dt=n(X,2),Mt=r(dt),Gt=n(dt,2),St=r(Gt);K((q,gt,$t)=>{y(j,`+${q??""} added`),y(Mt,`-${gt??""} removed`),y(St,`${$t??""} unchanged`)},[()=>x().added,()=>x().removed,()=>x().unchanged]),m(D,F)};O(N,D=>{x()&&D(it)})}var rt=n(I,2),Y=r(rt),z=r(Y);xe(z,19,()=>e(s).removed,(D,F)=>D+F+"removed",(D,F,X)=>{var j=vp(),dt=ut(j),Mt=r(dt);{var Gt=Ht=>{var J=dp(),ot=r(J);K(()=>y(ot,e(X)+1)),m(Ht,J)};O(Mt,Ht=>{e(c)&&Ht(Gt)})}var St=n(Mt,4),q=r(St),gt=n(dt,2);{var $t=Ht=>{var J=cp(),ot=r(J);{var _t=Xt=>{var Kt=lp(),ee=r(Kt);K(()=>y(ee,e(X)+1)),m(Xt,Kt)};O(ot,Xt=>{e(c)&&Xt(_t)})}var It=n(ot,4),Vt=r(It);K(()=>y(Vt,e(s).added[e(X)]||" ")),m(Ht,J)};O(gt,Ht=>{e(s).added[e(X)]&&Ht($t)})}K(()=>y(q,e(F)||" ")),m(D,j)});var B=n(z,2);xe(B,19,()=>e(s).unchanged,(D,F)=>D+F+"unchanged",(D,F,X)=>{var j=up(),dt=r(j);{var Mt=q=>{var gt=gp(),$t=r(gt);K(()=>y($t,e(s).removed.length+e(X)+1)),m(q,gt)};O(dt,q=>{e(c)&&q(Mt)})}var Gt=n(dt,4),St=r(Gt);K(()=>y(St,e(F)||" ")),m(D,j)});var M=n(B,2);xe(M,19,()=>e(s).added.slice(e(s).removed.length),(D,F)=>D+F+"added",(D,F,X)=>{var j=pp(),dt=r(j);{var Mt=q=>{var gt=mp(),$t=r(gt);K(()=>y($t,e(s).removed.length+e(s).unchanged.length+e(X)+1)),m(q,gt)};O(dt,q=>{e(c)&&q(Mt)})}var Gt=n(dt,4),St=r(Gt);K(()=>y(St,e(F)||" ")),m(D,j)}),m(W,A)};O(et,W=>{e(s)&&W(ht)})}var bt=n(et,2),wt=r(bt),Ut=r(wt),jt=r(Ut);qa(jt,{class:"w-6 h-6 text-orange-600 dark:text-orange-400"});var Pt=n(wt,2),Lt=r(Pt),st=r(Lt);He(st,{class:"w-6 h-6 text-orange-600 dark:text-orange-400"});var kt=n(Pt,2),G=r(kt),Z=r(G);Ve(Z,{class:"w-6 h-6 text-orange-600 dark:text-orange-400"}),K((W,A)=>{Dt.disabled=e(u)||!e(a)||!e(o),y(Wt,e(u)?"Calculating...":"Compare Text"),y(yt,`${W??""} lines`),y(ft,`${A??""} lines`)},[()=>e(a).split(`
`).length,()=>e(o).split(`
`).length]),We(Q,()=>e(c),W=>d(c,W)),We(lt,()=>e(l),W=>d(l,W)),We(ct,()=>e(v),W=>d(v,W)),Tt(pt,()=>e(a),W=>d(a,W)),Tt(V,()=>e(o),W=>d(o,W)),m(i,w),Bt()}ye(["click"]);function yp(i,t,a){d(t,"https://example.com:8080/path/to/page?query=search&category=tools&sort=popular#section-1"),a()}function hp(i,t,a,o){d(t,""),d(a,null),d(o,"")}function _p(){Te("/tools")}var kp=(i,t)=>i.key==="Enter"&&t(),wp=k('<div class="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"><p class="text-red-700 dark:text-red-400 font-medium"> </p></div>'),Cp=(i,t,a)=>e(t)&&a(e(t).protocol),$p=(i,t,a)=>e(t)&&a(e(t).hostname),Sp=(i,t,a)=>e(t)&&a(e(t).port),Tp=(i,t,a)=>e(t)&&a(e(t).pathname),Mp=(i,t,a)=>e(t)&&a(e(t).hash||""),Ep=(i,t,a)=>e(t)&&a(e(t).origin),Lp=(i,t,a)=>e(t)&&a(e(t).host),Pp=(i,t,a)=>e(t)&&a(e(t).search||""),Ap=(i,t,a)=>t(e(a).key),Ip=(i,t,a)=>t(e(a).value),jp=k('<tr class="border-b border-gray-100 dark:border-gray-800"><td class="py-2 px-3"><code class="text-sm text-gray-900 dark:text-white"> </code></td><td class="py-2 px-3"><code class="text-sm text-gray-900 dark:text-white truncate max-w-xs"> </code></td><td class="py-2 px-3 text-center"><div class="flex justify-center gap-2"><button class="btn btn-primary btn-sm" title="Copy parameter name"><!></button> <button class="btn btn-primary btn-sm" title="Copy parameter value"><!></button></div></td></tr>'),Np=k('<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><div class="flex justify-between items-center mb-4"><h3 class="text-lg font-semibold text-gray-900 dark:text-white">Query Parameters</h3> <span class="text-sm text-gray-500 dark:text-gray-400"> </span></div> <div class="overflow-x-auto"><table class="w-full"><thead><tr class="border-b border-gray-200 dark:border-gray-700"><th class="text-left py-2 px-3 text-sm font-medium text-gray-700 dark:text-gray-300">Parameter</th><th class="text-left py-2 px-3 text-sm font-medium text-gray-700 dark:text-gray-300">Value</th><th class="text-center py-2 px-3 text-sm font-medium text-gray-700 dark:text-gray-300">Actions</th></tr></thead><tbody></tbody></table></div></div>'),Rp=k('<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Basic Components</h3> <div class="space-y-3"><div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><span class="text-sm font-medium text-gray-700 dark:text-gray-300">Protocol</span> <div class="flex items-center gap-2"><code class="text-sm text-gray-900 dark:text-white"> </code> <button class="btn btn-primary btn-sm"><!></button></div></div> <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><span class="text-sm font-medium text-gray-700 dark:text-gray-300">Hostname</span> <div class="flex items-center gap-2"><code class="text-sm text-gray-900 dark:text-white"> </code> <button class="btn btn-primary btn-sm"><!></button></div></div> <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><span class="text-sm font-medium text-gray-700 dark:text-gray-300">Port</span> <div class="flex items-center gap-2"><code class="text-sm text-gray-900 dark:text-white"> </code> <button class="btn btn-primary btn-sm"><!></button></div></div> <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><span class="text-sm font-medium text-gray-700 dark:text-gray-300">Path</span> <div class="flex items-center gap-2"><code class="text-sm text-gray-900 dark:text-white truncate max-w-xs"> </code> <button class="btn btn-primary btn-sm"><!></button></div></div> <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><span class="text-sm font-medium text-gray-700 dark:text-gray-300">Hash</span> <div class="flex items-center gap-2"><code class="text-sm text-gray-900 dark:text-white truncate max-w-xs"> </code> <button class="btn btn-primary btn-sm"><!></button></div></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Complete Components</h3> <div class="space-y-3"><div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><span class="text-sm font-medium text-gray-700 dark:text-gray-300">Origin</span> <div class="flex items-center gap-2"><code class="text-sm text-gray-900 dark:text-white truncate max-w-xs"> </code> <button class="btn btn-primary btn-sm"><!></button></div></div> <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><span class="text-sm font-medium text-gray-700 dark:text-gray-300">Host</span> <div class="flex items-center gap-2"><code class="text-sm text-gray-900 dark:text-white truncate max-w-xs"> </code> <button class="btn btn-primary btn-sm"><!></button></div></div> <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><span class="text-sm font-medium text-gray-700 dark:text-gray-300">Search Query</span> <div class="flex items-center gap-2"><code class="text-sm text-gray-900 dark:text-white truncate max-w-xs"> </code> <button class="btn btn-primary btn-sm"><!></button></div></div></div></div></div> <!>',1),Bp=k(`<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="btn btn-primary"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">URL Parser/Analyzer</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Parse URLs and extract components including domain, path, query parameters, and hash
        fragments.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">URL Parser</li></ol></nav> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Enter URL</h2> <div class="flex gap-4 mb-4"><input type="text" placeholder="https://example.com/path?query=value#section" class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"/> <button class="btn btn-primary">Parse URL</button></div> <div class="flex gap-4"><button class="btn btn-primary">Load Sample URL</button> <button class="btn btn-primary">Clear</button></div></div> <!> <!> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Extract Domain</h3> <p class="text-gray-600 dark:text-gray-400">Extract domain, subdomain, and port information from any URL</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Path Analysis</h3> <p class="text-gray-600 dark:text-gray-400">Analyze URL paths, query parameters, and hash fragments</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Query Parameters</h3> <p class="text-gray-600 dark:text-gray-400">Parse and extract all query parameters with their values</p></div></div></div>`);function Dp(i,t){Rt(t,!0);let a=f(""),o=f(null),s=f("");function c(){if(!e(a).trim()){d(s,"Please enter a URL to parse"),d(o,null);return}try{let zt=e(a).trim();!zt.match(/^https?:\/\//)&&!zt.match(/^ftp:\/\//)&&(zt="https://"+zt);const Ft=new URL(zt),At=[];Ft.searchParams.forEach((Ct,tt)=>{At.push({key:tt,value:Ct})}),d(o,{protocol:Ft.protocol,hostname:Ft.hostname,port:Ft.port||(Ft.protocol==="https:"?"443":"80"),pathname:Ft.pathname,search:Ft.search,hash:Ft.hash,origin:Ft.origin,host:Ft.host,searchParams:At},!0),d(s,"")}catch{d(s,"Invalid URL format. Please enter a valid URL."),d(o,null)}}function l(zt){navigator.clipboard.writeText(zt)}var v=Bp(),g=r(v),u=r(g),p=r(u);p.__click=[_p];var h=r(p);Ie(h,{class:"w-5 h-5 mr-2"});var b=n(u,2),x=r(b),w=r(x);yd(w,{class:"w-10 h-10 text-white"});var S=n(g,4),R=n(r(S),2),C=r(R);C.__keydown=[kp,c];var T=n(C,2);T.__click=c;var E=n(R,2),_=r(E);_.__click=[yp,a,c];var L=n(_,2);L.__click=[hp,a,o,s];var $=n(S,2);{var H=zt=>{var Ft=wp(),At=r(Ft),Ct=r(At);K(()=>y(Ct,e(s))),m(zt,Ft)};O($,zt=>{e(s)&&zt(H)})}var U=n($,2);{var Q=zt=>{var Ft=Rp(),At=ut(Ft),Ct=r(At),tt=n(r(Ct),2),yt=r(tt),pt=n(r(yt),2),at=r(pt),P=r(at),xt=n(at,2);xt.__click=[Cp,o,l];var ft=r(xt);be(ft,{class:"w-4 h-4"});var V=n(yt,2),et=n(r(V),2),ht=r(et),bt=r(ht),wt=n(ht,2);wt.__click=[$p,o,l];var Ut=r(wt);be(Ut,{class:"w-4 h-4"});var jt=n(V,2),Pt=n(r(jt),2),Lt=r(Pt),st=r(Lt),kt=n(Lt,2);kt.__click=[Sp,o,l];var G=r(kt);be(G,{class:"w-4 h-4"});var Z=n(jt,2),W=n(r(Z),2),A=r(W),I=r(A),N=n(A,2);N.__click=[Tp,o,l];var it=r(N);be(it,{class:"w-4 h-4"});var rt=n(Z,2),Y=n(r(rt),2),z=r(Y),B=r(z),M=n(z,2);M.__click=[Mp,o,l];var D=r(M);be(D,{class:"w-4 h-4"});var F=n(Ct,2),X=n(r(F),2),j=r(X),dt=n(r(j),2),Mt=r(dt),Gt=r(Mt),St=n(Mt,2);St.__click=[Ep,o,l];var q=r(St);be(q,{class:"w-4 h-4"});var gt=n(j,2),$t=n(r(gt),2),Ht=r($t),J=r(Ht),ot=n(Ht,2);ot.__click=[Lp,o,l];var _t=r(ot);be(_t,{class:"w-4 h-4"});var It=n(gt,2),Vt=n(r(It),2),Xt=r(Vt),Kt=r(Xt),ee=n(Xt,2);ee.__click=[Pp,o,l];var le=r(ee);be(le,{class:"w-4 h-4"});var qt=n(At,2);{var de=ce=>{var ae=Np(),me=r(ae),pe=n(r(me),2),re=r(pe),ve=n(me,2),Ce=r(ve),Me=n(r(Ce));xe(Me,23,()=>e(o).searchParams,(Ot,ie)=>Ot.key+ie,(Ot,ie)=>{var fe=jp(),he=r(fe),je=r(he),Ne=r(je),Be=n(he),De=r(Be),_e=r(De),Se=n(Be),qe=r(Se),Ae=r(qe);Ae.__click=[Ap,l,ie];var Je=r(Ae);be(Je,{class:"w-4 h-4"});var Ze=n(Ae,2);Ze.__click=[Ip,l,ie];var ur=r(Ze);be(ur,{class:"w-4 h-4"}),K(()=>{y(Ne,e(ie).key),y(_e,e(ie).value)}),m(Ot,fe)}),K(()=>y(re,`${e(o).searchParams.length??""} parameters`)),m(ce,ae)};O(qt,ce=>{e(o).searchParams.length>0&&ce(de)})}K(()=>{y(P,e(o).protocol),y(bt,e(o).hostname),y(st,e(o).port),y(I,e(o).pathname),y(B,e(o).hash||"(none)"),y(Gt,e(o).origin),y(J,e(o).host),y(Kt,e(o).search||"(none)")}),m(zt,Ft)};O(U,zt=>{e(o)&&zt(Q)})}var mt=n(U,2),lt=r(mt),nt=r(lt),ct=r(nt);Oo(ct,{class:"w-6 h-6 text-primary-600 dark:text-primary-400"});var vt=n(lt,2),Dt=r(vt),Wt=r(Dt);He(Wt,{class:"w-6 h-6 text-primary-600 dark:text-primary-400"});var Yt=n(vt,2),Qt=r(Yt),Jt=r(Qt);Ve(Jt,{class:"w-6 h-6 text-primary-600 dark:text-primary-400"}),Tt(C,()=>e(a),zt=>d(a,zt)),m(i,v),Bt()}ye(["click","keydown"]);function Fp(i,t,a,o){d(t,`/* Sample CSS styles */
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
}`),d(a,!0),o()}function Hp(i,t,a,o,s,c){d(t,""),d(a,""),d(o,0),d(s,0),d(c,0)}function Op(){Te("/tools")}var Up=(i,t)=>d(t,!1),zp=(i,t)=>d(t,!0),qp=(i,t,a)=>t(e(a),"output"),Gp=k('<button class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-blue-700 transition-colors"> </button> <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">Download CSS</button>',1),Wp=k('<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-6"><div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center"><div><p class="text-sm text-gray-600 dark:text-gray-400">Original Size</p> <p class="text-lg font-semibold text-gray-900 dark:text-white"> </p></div> <div><p class="text-sm text-gray-600 dark:text-gray-400">Processed Size</p> <p class="text-lg font-semibold text-gray-900 dark:text-white"> </p></div> <div><p class="text-sm text-gray-600 dark:text-gray-400">Size Change</p> <p> </p></div> <div><p class="text-sm text-gray-600 dark:text-gray-400">Compression</p> <p class="text-lg font-semibold text-gray-900 dark:text-white"> </p></div></div></div>'),Jp=k('<div class="absolute inset-0 flex items-center justify-center pointer-events-none"><p class="text-gray-400 dark:text-gray-600"> </p></div>'),Vp=k('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">CSS Minifier/Beautifier</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Minify and format CSS code to optimize performance and improve readability.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">CSS Minifier</li></ol></nav> <div class="mb-6 flex justify-center"><div class="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1"><button>Beautify CSS</button> <button>Minify CSS</button></div></div> <div class="mb-6 flex flex-wrap gap-4 items-center justify-center"><button class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">Load Sample CSS</button> <button class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">Clear All</button> <!></div> <!> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Input CSS</h2> <span class="text-sm text-gray-500 dark:text-gray-400"> </span></div> <textarea placeholder="Enter your CSS code here..." class="w-full h-96 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"></textarea></div> <div><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white"> </h2> <span class="text-sm text-gray-500 dark:text-gray-400"> </span></div> <div class="relative"><textarea class="w-full h-96 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none"></textarea> <!></div></div></div> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Minify CSS</h3> <p class="text-gray-600 dark:text-gray-400">Reduce file size by removing whitespace, comments, and unnecessary characters</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Beautify CSS</h3> <p class="text-gray-600 dark:text-gray-400">Format CSS with proper indentation and line breaks for better readability</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Export Results</h3> <p class="text-gray-600 dark:text-gray-400">Copy to clipboard or download processed CSS as a file for immediate use</p></div></div></div>');function Yp(i,t){Rt(t,!0);let a=f(""),o=f(""),s=f(!1),c=f(""),l=f(0),v=f(0),g=f(0);function u(){if(!e(a).trim()){d(o,""),d(l,0),d(v,0),d(g,0);return}if(d(l,new Blob([e(a)]).size,!0),e(s)){let G=e(a).replace(/\/\*[\s\S]*?\*\//g,"").replace(/\s+/g," ").replace(/\s*{\s*/g,"{").replace(/\s*}\s*/g,"}").replace(/\s*;\s*/g,";").replace(/\s*:\s*/g,":").replace(/\s*,\s*/g,",").replace(/;}/g,"}").trim();d(o,G,!0),d(v,new Blob([G]).size,!0)}else{let G=e(a).replace(/}/g,`}
`).replace(/;/g,`;
`).split(`
`).map((Z,W,A)=>{let I=Z.trim();if(!I)return"";let N=0,it=0;for(let rt=0;rt<W;rt++)A[rt].includes("{")&&it++,A[rt].includes("}")&&it--;return N=Math.max(0,it),I==="}"&&(N=Math.max(0,N-1)),"  ".repeat(N)+I}).filter(Z=>Z.trim()).join(`
`);d(o,G,!0),d(v,new Blob([G]).size,!0)}d(g,e(l)>0?Math.round((e(l)-e(v))/e(l)*100):0,!0)}function p(G,Z){navigator.clipboard.writeText(G),d(c,Z,!0),setTimeout(()=>{d(c,"")},2e3)}function h(){const G=new Blob([e(o)],{type:"text/css"}),Z=URL.createObjectURL(G),W=document.createElement("a");W.href=Z,W.download=e(s)?"styles.min.css":"styles.css",W.click(),URL.revokeObjectURL(Z)}function b(G){if(G===0)return"0 Bytes";const Z=1024,W=["Bytes","KB","MB","GB"],A=Math.floor(Math.log(G)/Math.log(Z));return parseFloat((G/Math.pow(Z,A)).toFixed(2))+" "+W[A]}ke(()=>{e(a)&&u()});var x=Vp(),w=r(x),S=r(w),R=r(S);R.__click=[Op];var C=r(R);Ie(C,{class:"w-5 h-5"});var T=n(S,2),E=r(T),_=r(E);Ya(_,{class:"w-10 h-10 text-white"});var L=n(w,4),$=r(L),H=r($);H.__click=[Up,s];var U=n(H,2);U.__click=[zp,s];var Q=n(L,2),mt=r(Q);mt.__click=[Fp,a,s,u];var lt=n(mt,2);lt.__click=[Hp,a,o,l,v,g];var nt=n(lt,2);{var ct=G=>{var Z=Gp(),W=ut(Z);W.__click=[qp,p,o];var A=r(W),I=n(W,2);I.__click=h,K(()=>y(A,e(c)==="output"?"✓ Copied!":"Copy Result")),m(G,Z)};O(nt,G=>{e(o)&&G(ct)})}var vt=n(Q,2);{var Dt=G=>{var Z=Wp(),W=r(Z),A=r(W),I=n(r(A),2),N=r(I),it=n(A,2),rt=n(r(it),2),Y=r(rt),z=n(it,2),B=n(r(z),2),M=r(B),D=n(z,2),F=n(r(D),2),X=r(F);K((j,dt,Mt)=>{y(N,j),y(Y,dt),ge(B,1,`text-lg font-semibold ${e(v)<e(l)?"text-green-600":"text-red-600"} dark:text-${e(v)<e(l)?"green-400":"red-400"}`),y(M,`${e(v)<e(l)?"-":"+"}${Mt??""}`),y(X,`${e(g)??""}%`)},[()=>b(e(l)),()=>b(e(v)),()=>b(Math.abs(e(v)-e(l)))]),m(G,Z)};O(vt,G=>{e(l)>0&&G(Dt)})}var Wt=n(vt,2),Yt=r(Wt),Qt=r(Yt),Jt=n(r(Qt),2),zt=r(Jt),Ft=n(Qt,2),At=n(Yt,2),Ct=r(At),tt=r(Ct),yt=r(tt),pt=n(tt,2),at=r(pt),P=n(Ct,2),xt=r(P),ft=n(xt,2);{var V=G=>{var Z=Jp(),W=r(Z),A=r(W);K(()=>y(A,`Enter CSS code to see ${e(s)?"minified":"beautified"} result`)),m(G,Z)};O(ft,G=>{e(o)||G(V)})}var et=n(Wt,2),ht=r(et),bt=r(ht),wt=r(bt);Ve(wt,{class:"w-6 h-6 text-primary-600 dark:text-primary-400"});var Ut=n(ht,2),jt=r(Ut),Pt=r(jt);He(Pt,{class:"w-6 h-6 text-primary-600 dark:text-primary-400"});var Lt=n(Ut,2),st=r(Lt),kt=r(st);Xa(kt,{class:"w-6 h-6 text-primary-600 dark:text-primary-400"}),K(()=>{ge(H,1,`px-4 py-2 rounded-md text-sm font-medium transition-colors ${e(s)?"text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white":"bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300"}`),ge(U,1,`px-4 py-2 rounded-md text-sm font-medium transition-colors ${e(s)?"bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300":"text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"}`),y(zt,`${e(a).length??""} characters`),y(yt,`${e(s)?"Minified":"Beautified"} CSS`),y(at,`${e(o).length??""} characters`),Nt(xt,"placeholder",`${e(s)?"Minified":"Beautified"} CSS will appear here...`)}),Tt(Ft,()=>e(a),G=>d(a,G)),Tt(xt,()=>e(o),G=>d(o,G)),m(i,x),Bt()}ye(["click"]);function Kp(i,t,a,o){d(t,`// Sample JavaScript function
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
console.log('Total amount:', result.total);`),d(a,!0),o()}function Qp(i,t,a,o,s,c,l){d(t,""),d(a,""),d(o,0),d(s,0),d(c,0),d(l,"")}function Zp(){Te("/tools")}var Xp=(i,t)=>d(t,!1),tf=(i,t)=>d(t,!0),ef=(i,t,a)=>t(e(a),"output"),rf=k('<button class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-blue-700 transition-colors"> </button> <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">Download JavaScript</button>',1),af=k('<div class="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"><p class="text-red-700 dark:text-red-400 font-medium"> </p></div>'),of=k('<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-6"><div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center"><div><p class="text-sm text-gray-600 dark:text-gray-400">Original Size</p> <p class="text-lg font-semibold text-gray-900 dark:text-white"> </p></div> <div><p class="text-sm text-gray-600 dark:text-gray-400">Processed Size</p> <p class="text-lg font-semibold text-gray-900 dark:text-white"> </p></div> <div><p class="text-sm text-gray-600 dark:text-gray-400">Size Change</p> <p> </p></div> <div><p class="text-sm text-gray-600 dark:text-gray-400">Compression</p> <p class="text-lg font-semibold text-gray-900 dark:text-white"> </p></div></div></div>'),nf=k('<div class="absolute inset-0 flex items-center justify-center pointer-events-none"><p class="text-gray-400 dark:text-gray-600"> </p></div>'),sf=k('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">JavaScript Minifier/Beautifier</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Minify and format JavaScript code to optimize performance and improve readability.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">JavaScript Minifier</li></ol></nav> <div class="mb-6 flex justify-center"><div class="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1"><button>Beautify JavaScript</button> <button>Minify JavaScript</button></div></div> <div class="mb-6 flex flex-wrap gap-4 items-center justify-center"><button class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">Load Sample JavaScript</button> <button class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">Clear All</button> <!></div> <!> <!> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Input JavaScript</h2> <span class="text-sm text-gray-500 dark:text-gray-400"> </span></div> <textarea placeholder="Enter your JavaScript code here..." class="w-full h-96 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"></textarea></div> <div><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white"> </h2> <span class="text-sm text-gray-500 dark:text-gray-400"> </span></div> <div class="relative"><textarea class="w-full h-96 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none"></textarea> <!></div></div></div> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Minify JavaScript</h3> <p class="text-gray-600 dark:text-gray-400">Reduce file size by removing whitespace, comments, and unnecessary characters</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Beautify JavaScript</h3> <p class="text-gray-600 dark:text-gray-400">Format JavaScript with proper indentation and line breaks for better readability</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Export Results</h3> <p class="text-gray-600 dark:text-gray-400">Copy to clipboard or download processed JavaScript as a file for immediate use</p></div></div></div>');function df(i,t){Rt(t,!0);let a=f(""),o=f(""),s=f(!1),c=f(""),l=f(0),v=f(0),g=f(0),u=f("");function p(){if(!e(a).trim()){d(o,""),d(l,0),d(v,0),d(g,0),d(u,"");return}d(l,new Blob([e(a)]).size,!0);try{if(e(s)){let A=e(a).replace(/(?:^|\n|\r)\s*\/\/.*$/gm,"").replace(/\/\*[\s\S]*?\*\//g,"").replace(/\s+/g," ").replace(/\s*([+\-*/=<>!&|,;:{}()[\]])\s*/g,"$1").trim();d(o,A,!0),d(v,new Blob([A]).size,!0)}else{let A=e(a).replace(/([+\-*/=<>!&|,;:{}()[\]])/g," $1 ").replace(/\s+/g," ").replace(/;/g,`;
`).replace(/{/g,`{
`).replace(/}/g,`
}
`).split(`
`).map((I,N,it)=>{let rt=I.trim();if(!rt)return"";let Y=0,z=0;for(let B=0;B<N;B++){const M=it[B].trim();M==="{"&&z++,M==="}"&&z--}return Y=Math.max(0,z),rt==="}"&&(Y=Math.max(0,Y-1)),"  ".repeat(Y)+rt}).filter(I=>I.trim()).join(`
`);d(o,A,!0),d(v,new Blob([A]).size,!0)}d(g,e(l)>0?Math.round((e(l)-e(v))/e(l)*100):0,!0),d(u,"")}catch{d(u,"Error processing JavaScript. Please check your syntax."),d(o,"")}}function h(A,I){navigator.clipboard.writeText(A),d(c,I,!0),setTimeout(()=>{d(c,"")},2e3)}function b(){const A=new Blob([e(o)],{type:"text/javascript"}),I=URL.createObjectURL(A),N=document.createElement("a");N.href=I,N.download=e(s)?"script.min.js":"script.js",N.click(),URL.revokeObjectURL(I)}function x(A){if(A===0)return"0 Bytes";const I=1024,N=["Bytes","KB","MB","GB"],it=Math.floor(Math.log(A)/Math.log(I));return parseFloat((A/Math.pow(I,it)).toFixed(2))+" "+N[it]}ke(()=>{e(a)&&p()});var w=sf(),S=r(w),R=r(S),C=r(R);C.__click=[Zp];var T=r(C);Ie(T,{class:"w-5 h-5"});var E=n(R,2),_=r(E),L=r(_);Ya(L,{class:"w-10 h-10 text-white"});var $=n(S,4),H=r($),U=r(H);U.__click=[Xp,s];var Q=n(U,2);Q.__click=[tf,s];var mt=n($,2),lt=r(mt);lt.__click=[Kp,a,s,p];var nt=n(lt,2);nt.__click=[Qp,a,o,l,v,g,u];var ct=n(nt,2);{var vt=A=>{var I=rf(),N=ut(I);N.__click=[ef,h,o];var it=r(N),rt=n(N,2);rt.__click=b,K(()=>y(it,e(c)==="output"?"✓ Copied!":"Copy Result")),m(A,I)};O(ct,A=>{e(o)&&A(vt)})}var Dt=n(mt,2);{var Wt=A=>{var I=af(),N=r(I),it=r(N);K(()=>y(it,e(u))),m(A,I)};O(Dt,A=>{e(u)&&A(Wt)})}var Yt=n(Dt,2);{var Qt=A=>{var I=of(),N=r(I),it=r(N),rt=n(r(it),2),Y=r(rt),z=n(it,2),B=n(r(z),2),M=r(B),D=n(z,2),F=n(r(D),2),X=r(F),j=n(D,2),dt=n(r(j),2),Mt=r(dt);K((Gt,St,q)=>{y(Y,Gt),y(M,St),ge(F,1,`text-lg font-semibold ${e(v)<e(l)?"text-green-600":"text-red-600"} dark:text-${e(v)<e(l)?"green-400":"red-400"}`),y(X,`${e(v)<e(l)?"-":"+"}${q??""}`),y(Mt,`${e(g)??""}%`)},[()=>x(e(l)),()=>x(e(v)),()=>x(Math.abs(e(v)-e(l)))]),m(A,I)};O(Yt,A=>{e(l)>0&&A(Qt)})}var Jt=n(Yt,2),zt=r(Jt),Ft=r(zt),At=n(r(Ft),2),Ct=r(At),tt=n(Ft,2),yt=n(zt,2),pt=r(yt),at=r(pt),P=r(at),xt=n(at,2),ft=r(xt),V=n(pt,2),et=r(V),ht=n(et,2);{var bt=A=>{var I=nf(),N=r(I),it=r(N);K(()=>y(it,`Enter JavaScript code to see ${e(s)?"minified":"beautified"} result`)),m(A,I)};O(ht,A=>{e(o)||A(bt)})}var wt=n(Jt,2),Ut=r(wt),jt=r(Ut),Pt=r(jt);Ve(Pt,{class:"w-6 h-6 text-yellow-600 dark:text-yellow-400"});var Lt=n(Ut,2),st=r(Lt),kt=r(st);He(kt,{class:"w-6 h-6 text-yellow-600 dark:text-yellow-400"});var G=n(Lt,2),Z=r(G),W=r(Z);Xa(W,{class:"w-6 h-6 text-yellow-600 dark:text-yellow-400"}),K(()=>{ge(U,1,`px-4 py-2 rounded-md text-sm font-medium transition-colors ${e(s)?"text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white":"bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300"}`),ge(Q,1,`px-4 py-2 rounded-md text-sm font-medium transition-colors ${e(s)?"bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300":"text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"}`),y(Ct,`${e(a).length??""} characters`),y(P,`${e(s)?"Minified":"Beautified"} JavaScript`),y(ft,`${e(o).length??""} characters`),Nt(et,"placeholder",`${e(s)?"Minified":"Beautified"} JavaScript will appear here...`)}),Tt(tt,()=>e(a),A=>d(a,A)),Tt(et,()=>e(o),A=>d(o,A)),m(i,w),Bt()}ye(["click"]);function lf(i,t,a,o){d(t,`<div class="container">
  <h1>Hello World!</h1>
  <p>This is a <strong>sample</strong> text with <em>HTML</em> tags.</p>
</div>`),d(a,"encode"),o()}function cf(i,t,a,o){d(t,`&lt;div class=&quot;container&quot;&gt;
  &lt;h1&gt;Hello World!&lt;/h1&gt;
  &lt;p&gt;This is a &lt;strong&gt;sample&lt;/strong&gt; text with &lt;em&gt;HTML&lt;/em&gt; tags.&lt;/p&gt;
&lt;/div&gt;`),d(a,"decode"),o()}function vf(i,t,a,o){d(t,""),d(a,""),d(o,"")}function gf(){Te("/tools")}var uf=(i,t)=>d(t,"encode"),mf=(i,t)=>d(t,"decode"),pf=(i,t,a,o,s)=>t(e(a)==="encode"?e(o):e(s),"result"),ff=k('<button class="px-3 py-1 text-sm bg-rose-600 text-white rounded hover:bg-rose-700 transition-colors"> </button>'),xf=k('<div class="absolute inset-0 flex items-center justify-center pointer-events-none"><p class="text-gray-400 dark:text-gray-600">Enter text above to see encoded result</p></div>'),bf=k('<textarea placeholder="Encoded HTML will appear here..." class="w-full h-64 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none"></textarea> <!>',1),yf=k('<div class="absolute inset-0 flex items-center justify-center pointer-events-none"><p class="text-gray-400 dark:text-gray-600">Enter HTML entities above to see decoded result</p></div>'),hf=k('<textarea placeholder="Decoded HTML will appear here..." class="w-full h-64 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none"></textarea> <!>',1),_f=k(`<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-rose-400 to-rose-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">HTML Entity Encoder/Decoder</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Convert HTML entities and special characters for safe display and storage.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">HTML Encoder</li></ol></nav> <div class="mb-6"><div class="flex justify-center"><div class="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1"><button>Encode HTML</button> <button>Decode HTML</button></div></div></div> <div class="mb-6 flex flex-wrap gap-4 items-center justify-center"><button class="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"> </button> <button class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">Load Sample Text</button> <button class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">Load Sample Encoded</button> <button class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">Clear All</button></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Input</h2> <span class="text-sm text-gray-500 dark:text-gray-400"> </span></div> <textarea class="w-full h-64 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"></textarea></div> <div><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white"> </h2> <!></div> <div class="relative"><!></div></div></div> <div class="mt-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Common HTML Entities</h3> <div class="overflow-x-auto"><table class="w-full text-sm"><thead><tr class="border-b border-gray-200 dark:border-gray-700"><th class="text-left py-2 px-3 font-medium text-gray-700 dark:text-gray-300">Character</th><th class="text-left py-2 px-3 font-medium text-gray-700 dark:text-gray-300">Entity Name</th><th class="text-left py-2 px-3 font-medium text-gray-700 dark:text-gray-300">Entity Number</th><th class="text-left py-2 px-3 font-medium text-gray-700 dark:text-gray-300">Description</th></tr></thead><tbody><tr class="border-b border-gray-100 dark:border-gray-800"><td class="py-2 px-3 font-mono">&lt;</td><td class="py-2 px-3 font-mono">&amp;lt;</td><td class="py-2 px-3 font-mono">&amp;#60;</td><td class="py-2 px-3 text-gray-600 dark:text-gray-400">Less than</td></tr><tr class="border-b border-gray-100 dark:border-gray-800"><td class="py-2 px-3 font-mono">&gt;</td><td class="py-2 px-3 font-mono">&amp;gt;</td><td class="py-2 px-3 font-mono">&amp;#62;</td><td class="py-2 px-3 text-gray-600 dark:text-gray-400">Greater than</td></tr><tr class="border-b border-gray-100 dark:border-gray-800"><td class="py-2 px-3 font-mono">&amp;</td><td class="py-2 px-3 font-mono">&amp;amp;</td><td class="py-2 px-3 font-mono">&amp;#38;</td><td class="py-2 px-3 text-gray-600 dark:text-gray-400">Ampersand</td></tr><tr class="border-b border-gray-100 dark:border-gray-800"><td class="py-2 px-3 font-mono">"</td><td class="py-2 px-3 font-mono">&amp;quot;</td><td class="py-2 px-3 font-mono">&amp;#34;</td><td class="py-2 px-3 text-gray-600 dark:text-gray-400">Quotation mark</td></tr><tr class="border-b border-gray-100 dark:border-gray-800"><td class="py-2 px-3 font-mono">'</td><td class="py-2 px-3 font-mono">&amp;apos;</td><td class="py-2 px-3 font-mono">&amp;#39;</td><td class="py-2 px-3 text-gray-600 dark:text-gray-400">Apostrophe</td></tr><tr class="border-b border-gray-100 dark:border-gray-800"><td class="py-2 px-3 font-mono"></td><td class="py-2 px-3 font-mono">&amp;nbsp;</td><td class="py-2 px-3 font-mono">&amp;#160;</td><td class="py-2 px-3 text-gray-600 dark:text-gray-400">Non-breaking space</td></tr></tbody></table></div></div> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-rose-100 dark:bg-rose-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Encode HTML</h3> <p class="text-gray-600 dark:text-gray-400">Convert HTML tags and special characters to entities for safe display</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-rose-100 dark:bg-rose-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Decode HTML</h3> <p class="text-gray-600 dark:text-gray-400">Convert HTML entities back to readable characters</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-rose-100 dark:bg-rose-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Unicode Support</h3> <p class="text-gray-600 dark:text-gray-400">Full support for Unicode characters and special symbols</p></div></div></div>`);function kf(i,t){Rt(t,!0);let a=f(""),o=f(""),s=f(""),c=f(""),l=f("encode");function v(){const Lt=document.createElement("div");Lt.textContent=e(a),d(o,Lt.innerHTML,!0),d(s,"")}function g(){const Lt=document.createElement("div");Lt.innerHTML=e(a),d(s,Lt.textContent||Lt.innerText||"",!0),d(o,"")}function u(Lt,st){navigator.clipboard.writeText(Lt),d(c,st,!0),setTimeout(()=>{d(c,"")},2e3)}var p=_f(),h=r(p),b=r(h),x=r(b);x.__click=[gf];var w=r(x);Ie(w,{class:"w-5 h-5"});var S=n(b,2),R=r(S),C=r(R);Ya(C,{class:"w-10 h-10 text-white"});var T=n(h,4),E=r(T),_=r(E),L=r(_);L.__click=[uf,l];var $=n(L,2);$.__click=[mf,l];var H=n(T,2),U=r(H);U.__click=function(...Lt){(e(l)==="encode"?v:g)?.apply(this,Lt)};var Q=r(U),mt=n(U,2);mt.__click=[lf,a,l,v];var lt=n(mt,2);lt.__click=[cf,a,l,g];var nt=n(lt,2);nt.__click=[vf,a,o,s];var ct=n(H,2),vt=r(ct),Dt=r(vt),Wt=n(r(Dt),2),Yt=r(Wt),Qt=n(Dt,2),Jt=n(vt,2),zt=r(Jt),Ft=r(zt),At=r(Ft),Ct=n(Ft,2);{var tt=Lt=>{var st=ff();st.__click=[pf,u,l,o,s];var kt=r(st);K(()=>y(kt,e(c)==="result"?"✓ Copied!":"Copy")),m(Lt,st)};O(Ct,Lt=>{(e(l)==="encode"&&e(o)||e(l)==="decode"&&e(s))&&Lt(tt)})}var yt=n(zt,2),pt=r(yt);{var at=Lt=>{var st=bf(),kt=ut(st),G=n(kt,2);{var Z=W=>{var A=xf();m(W,A)};O(G,W=>{e(o)||W(Z)})}Tt(kt,()=>e(o),W=>d(o,W)),m(Lt,st)},P=Lt=>{var st=hf(),kt=ut(st),G=n(kt,2);{var Z=W=>{var A=yf();m(W,A)};O(G,W=>{e(s)||W(Z)})}Tt(kt,()=>e(s),W=>d(s,W)),m(Lt,st)};O(pt,Lt=>{e(l)==="encode"?Lt(at):Lt(P,!1)})}var xt=n(ct,4),ft=r(xt),V=r(ft),et=r(V);Ya(et,{class:"w-6 h-6 text-rose-600 dark:text-rose-400"});var ht=n(ft,2),bt=r(ht),wt=r(bt);He(wt,{class:"w-6 h-6 text-rose-600 dark:text-rose-400"});var Ut=n(ht,2),jt=r(Ut),Pt=r(jt);Ve(Pt,{class:"w-6 h-6 text-rose-600 dark:text-rose-400"}),K(Lt=>{ge(L,1,`px-4 py-2 rounded-md text-sm font-medium transition-colors ${e(l)==="encode"?"bg-rose-100 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300":"text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"}`),ge($,1,`px-4 py-2 rounded-md text-sm font-medium transition-colors ${e(l)==="decode"?"bg-rose-100 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300":"text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"}`),U.disabled=Lt,y(Q,e(l)==="encode"?"Encode HTML":"Decode HTML"),y(Yt,`${e(a).length??""} characters`),Nt(Qt,"placeholder",`Enter ${e(l)==="encode"?"HTML code or text":"HTML entities"} to ${e(l)==="encode"?"encode":"decode"}...`),y(At,`${e(l)==="encode"?"Encoded":"Decoded"} Result`)},[()=>!e(a).trim()]),Tt(Qt,()=>e(a),Lt=>d(a,Lt)),m(i,p),Bt()}ye(["click"]);function wf(i,t,a){d(t,"How to Create Amazing URL Slugs for Your Blog Posts and Articles"),a()}function Cf(i,t,a){d(t,""),d(a,"")}function $f(){Te("/tools")}var Sf=(i,t,a)=>t(e(a)),Tf=k('<button class="btn btn-primary btn-sm"> </button>'),Mf=k('<div class="absolute inset-0 flex items-center justify-center pointer-events-none"><p class="text-gray-400 dark:text-gray-600">Enter text above to generate slug</p></div>'),Ef=k('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">URL Slug Generator</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Create URL-friendly slugs from text with customizable separators and options.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">URL Slug Generator</li></ol></nav> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Slug Options</h3> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4"><div><label for="separator-select" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Separator</label> <select id="separator-select" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"><option>Hyphen (-)</option><option>Underscore (_)</option><option>No separator</option></select></div> <div><label for="max-length-input" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Max Length</label> <input id="max-length-input" type="number" min="0" max="500" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"/></div></div> <div class="flex flex-wrap gap-4"><label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" class="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 dark:focus:ring-emerald-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/> <span class="text-sm text-gray-700 dark:text-gray-300">Convert to lowercase</span></label> <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" class="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 dark:focus:ring-emerald-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/> <span class="text-sm text-gray-700 dark:text-gray-300">Remove stop words</span></label></div></div> <div class="mb-6 flex flex-wrap gap-4 items-center justify-center"><button class="btn btn-primary">Generate Slug</button> <button class="btn btn-primary">Load Sample Text</button> <button class="btn btn-primary">Clear All</button></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"><div><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Input Text</h2> <span class="text-sm text-gray-500 dark:text-gray-400"> </span></div> <textarea class="textarea" placeholder="Enter your text here to generate a URL-friendly slug..."></textarea></div> <div><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Generated Slug</h2> <!></div> <div class="relative"><input type="text" placeholder="Generated slug will appear here..." class="w-full p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"/> <!></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Common Examples</h3> <div class="space-y-3"><div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Blog Post Title</p> <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">"How to Create Amazing URL Slugs for Your Blog Posts"</p> <p class="font-mono text-sm text-emerald-600 dark:text-emerald-400">how-to-create-amazing-url-slugs-for-your-blog-posts</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Product Name</p> <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">"Super Pro Max 3000 Widget with Advanced Features"</p> <p class="font-mono text-sm text-emerald-600 dark:text-emerald-400">super-pro-max-3000-widget-with-advanced-features</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Article Title</p> <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">"The Ultimate Guide to Web Development in 2024"</p> <p class="font-mono text-sm text-emerald-600 dark:text-emerald-400">ultimate-guide-web-development-2024</p></div></div></div> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">URL-Friendly Slugs</h3> <p class="text-gray-600 dark:text-gray-400">Create clean, readable URLs that are SEO-friendly and user-friendly</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Custom Separators</h3> <p class="text-gray-600 dark:text-gray-400">Choose between hyphens, underscores, or no separators for your slugs</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Smart Processing</h3> <p class="text-gray-600 dark:text-gray-400">Remove special characters, stop words, and apply length limits automatically</p></div></div></div>');function Lf(i,t){Rt(t,!0);let a=f(""),o=f(""),s=f("-"),c=f(!0),l=f(!1),v=f(100),g=f("");const u=new Set(["a","an","the","and","or","but","in","on","at","to","for","of","with","by","is","are","was","were","be","been","being","have","has","had","do","does","did","will","would","could","should","may","might","must","can","this","that","these","those"]);function p(){if(!e(a).trim()){d(o,"");return}let I=e(a);e(c)&&(I=I.toLowerCase()),e(l)&&(I=I.split(/\s+/).filter(N=>!u.has(N.toLowerCase())).join(" ")),I=I.replace(/[^\w\s-_]/g,""),I=I.replace(/[\s_]+/g,e(s)),I=I.replace(new RegExp(`${e(s)}+`,"g"),e(s)),I=I.replace(new RegExp(`^${e(s)}+|${e(s)}+$`,"g"),""),e(v)>0&&(I=I.substring(0,e(v)),I=I.replace(new RegExp(`${e(s)}$`),"")),d(o,I,!0)}function h(I){navigator.clipboard.writeText(I),d(g,"slug"),setTimeout(()=>{d(g,"")},2e3)}ke(()=>{e(a)&&p()});var b=Ef(),x=r(b),w=r(x),S=r(w);S.__click=[$f];var R=r(S);Ie(R,{class:"w-5 h-5"});var C=n(w,2),T=r(C),E=r(T);xa(E,{class:"w-10 h-10 text-white"});var _=n(x,4),L=n(r(_),2),$=r(L),H=n(r($),2),U=r(H);U.value=U.__value="-";var Q=n(U);Q.value=Q.__value="_";var mt=n(Q);mt.value=mt.__value="";var lt=n($,2),nt=n(r(lt),2),ct=n(L,2),vt=r(ct),Dt=r(vt),Wt=n(vt,2),Yt=r(Wt),Qt=n(_,2),Jt=r(Qt);Jt.__click=p;var zt=n(Jt,2);zt.__click=[wf,a,p];var Ft=n(zt,2);Ft.__click=[Cf,a,o];var At=n(Qt,2),Ct=r(At),tt=r(Ct),yt=n(r(tt),2),pt=r(yt),at=n(tt,2),P=n(Ct,2),xt=r(P),ft=n(r(xt),2);{var V=I=>{var N=Tf();N.__click=[Sf,h,o];var it=r(N);K(()=>y(it,e(g)==="slug"?"✓ Copied!":"Copy")),m(I,N)};O(ft,I=>{e(o)&&I(V)})}var et=n(xt,2),ht=r(et),bt=n(ht,2);{var wt=I=>{var N=Mf();m(I,N)};O(bt,I=>{e(o)||I(wt)})}var Ut=n(At,4),jt=r(Ut),Pt=r(jt),Lt=r(Pt);xa(Lt,{class:"w-6 h-6 text-emerald-600 dark:text-emerald-400"});var st=n(jt,2),kt=r(st),G=r(kt);He(G,{class:"w-6 h-6 text-emerald-600 dark:text-emerald-400"});var Z=n(st,2),W=r(Z),A=r(W);Ve(A,{class:"w-6 h-6 text-emerald-600 dark:text-emerald-400"}),K(I=>{Jt.disabled=I,y(pt,`${e(a).length??""} characters`)},[()=>!e(a).trim()]),cr(H,()=>e(s),I=>d(s,I)),Tt(nt,()=>e(v),I=>d(v,I)),We(Dt,()=>e(c),I=>d(c,I)),We(Yt,()=>e(l),I=>d(l,I)),Tt(at,()=>e(a),I=>d(a,I)),Tt(ht,()=>e(o),I=>d(o,I)),m(i,b),Bt()}ye(["click"]);function Pf(i,t,a,o){d(t,"#8B5CF6"),d(a,"triadic"),o()}function Af(){Te("/tools")}var If=(i,t,a)=>t(e(a).hex),jf=(i,t,a)=>t(`hsl(${e(a).hsl})`),Nf=(i,t,a)=>t(`rgb(${e(a).rgb})`),Rf=k('<div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"><div class="h-24 w-full"></div> <div class="p-3"><h4 class="font-medium text-gray-900 dark:text-white mb-2"> </h4> <div class="space-y-1 text-xs"><div class="flex justify-between items-center"><span class="text-gray-600 dark:text-gray-400">HEX:</span> <button class="font-mono text-gray-900 dark:text-white hover:text-pink-600 dark:hover:text-pink-400 transition-colors" title="Copy HEX"> </button></div> <div class="flex justify-between items-center"><span class="text-gray-600 dark:text-gray-400">HSL:</span> <button class="font-mono text-gray-900 dark:text-white hover:text-pink-600 dark:hover:text-pink-400 transition-colors text-xs" title="Copy HSL"> </button></div> <div class="flex justify-between items-center"><span class="text-gray-600 dark:text-gray-400">RGB:</span> <button class="font-mono text-gray-900 dark:text-white hover:text-pink-600 dark:hover:text-pink-400 transition-colors text-xs" title="Copy RGB"> </button></div></div></div></div>'),Bf=k('<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Generated Palette</h3> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"></div></div>'),Df=k(`<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl mb-4" style="background: linear-gradient(to bottom right, var(--color-palette-pink-light), var(--color-palette-pink))"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Color Palette Generator</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Generate harmonious color palettes with complementary, triadic, and analogous colors.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Color Palette Generator</li></ol></nav> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"><div><label for="base-color-picker" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Base Color</label> <div class="flex gap-2"><input class="input" id="base-color-picker" type="color" placeholder="#3B82F6"/> <button class="btn btn-primary"><!></button></div></div> <div><label for="palette-type-select" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Palette Type</label> <select id="palette-type-select" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"><option>Complementary</option><option>Triadic</option><option>Analogous</option><option>Monochromatic</option></select></div> <div class="flex items-end"><button class="btn btn-primary w-full">Load Sample Palette</button></div></div></div> <!> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Palette Types</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">Complementary</h4> <p class="text-sm text-gray-600 dark:text-gray-400">Two colors opposite each other on the color wheel. Creates high contrast and visual
          interest.</p></div> <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">Triadic</h4> <p class="text-sm text-gray-600 dark:text-gray-400">Three colors evenly spaced on the color wheel. Creates vibrant, balanced color schemes.</p></div> <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">Analogous</h4> <p class="text-sm text-gray-600 dark:text-gray-400">Colors adjacent to each other on the color wheel. Creates harmonious and pleasing
          combinations.</p></div> <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">Monochromatic</h4> <p class="text-sm text-gray-600 dark:text-gray-400">Variations of a single color with different lightness values. Creates subtle and
          sophisticated looks.</p></div></div></div> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-pink-100 dark:bg-pink-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Color Harmony</h3> <p class="text-gray-600 dark:text-gray-400">Generate color schemes based on color theory principles for professional designs</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-pink-100 dark:bg-pink-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Multiple Formats</h3> <p class="text-gray-600 dark:text-gray-400">Export colors in HEX, RGB, and HSL formats for use in any design tool</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-pink-100 dark:bg-pink-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Instant Preview</h3> <p class="text-gray-600 dark:text-gray-400">See your color palette in real-time as you adjust settings</p></div></div></div>`);function Ff(i,t){Rt(t,!0);let a=f("#3B82F6"),o=f("complementary"),s=f(Pe([]));function c(ft){const V=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(ft);return V?{r:parseInt(V[1],16),g:parseInt(V[2],16),b:parseInt(V[3],16)}:{r:0,g:0,b:0}}function l(ft,V,et){ft/=255,V/=255,et/=255;const ht=Math.max(ft,V,et),bt=Math.min(ft,V,et);let wt=0,Ut=0,jt=(ht+bt)/2;if(ht!==bt){const Pt=ht-bt;switch(Ut=jt>.5?Pt/(2-ht-bt):Pt/(ht+bt),ht){case ft:wt=((V-et)/Pt+(V<et?6:0))/6;break;case V:wt=((et-ft)/Pt+2)/6;break;case et:wt=((ft-V)/Pt+4)/6;break}}return{h:Math.round(wt*360),s:Math.round(Ut*100),l:Math.round(jt*100)}}function v(ft,V,et){ft=ft/360,V=V/100,et=et/100;let ht,bt,wt;if(V===0)ht=bt=wt=et;else{const jt=(st,kt,G)=>(G<0&&(G+=1),G>1&&(G-=1),G<.16666666666666666?st+(kt-st)*6*G:G<.5?kt:G<.6666666666666666?st+(kt-st)*(.6666666666666666-G)*6:st),Pt=et<.5?et*(1+V):et+V-et*V,Lt=2*et-Pt;ht=jt(Lt,Pt,ft+1/3),bt=jt(Lt,Pt,ft),wt=jt(Lt,Pt,ft-1/3)}const Ut=jt=>{const Pt=Math.round(jt*255).toString(16);return Pt.length===1?"0"+Pt:Pt};return`#${Ut(ht)}${Ut(bt)}${Ut(wt)}`.toUpperCase()}function g(){const ft=c(e(a)),V=l(ft.r,ft.g,ft.b);let et=[];switch(e(o)){case"complementary":et=[{hex:e(a),name:"Base",hsl:`${V.h}, ${V.s}%, ${V.l}%`,rgb:`${ft.r}, ${ft.g}, ${ft.b}`},{hex:v((V.h+180)%360,V.s,V.l),name:"Complementary",hsl:`${(V.h+180)%360}, ${V.s}%, ${V.l}%`,rgb:""}];break;case"triadic":et=[{hex:e(a),name:"Base",hsl:`${V.h}, ${V.s}%, ${V.l}%`,rgb:`${ft.r}, ${ft.g}, ${ft.b}`},{hex:v((V.h+120)%360,V.s,V.l),name:"Triadic 1",hsl:`${(V.h+120)%360}, ${V.s}%, ${V.l}%`,rgb:""},{hex:v((V.h+240)%360,V.s,V.l),name:"Triadic 2",hsl:`${(V.h+240)%360}, ${V.s}%, ${V.l}%`,rgb:""}];break;case"analogous":et=[{hex:v((V.h-30+360)%360,V.s,V.l),name:"Analogous 1",hsl:`${(V.h-30+360)%360}, ${V.s}%, ${V.l}%`,rgb:""},{hex:e(a),name:"Base",hsl:`${V.h}, ${V.s}%, ${V.l}%`,rgb:`${ft.r}, ${ft.g}, ${ft.b}`},{hex:v((V.h+30)%360,V.s,V.l),name:"Analogous 2",hsl:`${(V.h+30)%360}, ${V.s}%, ${V.l}%`,rgb:""}];break;case"monochromatic":et=[{hex:v(V.h,V.s,20),name:"Dark",hsl:`${V.h}, ${V.s}%, 20%`,rgb:""},{hex:v(V.h,V.s,40),name:"Dark Medium",hsl:`${V.h}, ${V.s}%, 40%`,rgb:""},{hex:v(V.h,V.s,60),name:"Medium",hsl:`${V.h}, ${V.s}%, 60%`,rgb:""},{hex:v(V.h,V.s,80),name:"Light Medium",hsl:`${V.h}, ${V.s}%, 80%`,rgb:""},{hex:v(V.h,V.s,95),name:"Light",hsl:`${V.h}, ${V.s}%, 95%`,rgb:""}];break}et=et.map(ht=>{if(!ht.rgb){const bt=c(ht.hex);return{...ht,rgb:`${bt.r}, ${bt.g}, ${bt.b}`}}return ht}),d(s,et,!0)}function u(){const ft="0123456789ABCDEF";let V="#";for(let et=0;et<6;et++)V+=ft[Math.floor(Math.random()*16)];d(a,V,!0)}function p(ft){navigator.clipboard.writeText(ft)}ke(()=>{e(a)&&e(o)&&g()});var h=Df(),b=r(h),x=r(b),w=r(x);w.__click=[Af];var S=r(w);Ie(S,{class:"w-5 h-5"});var R=n(x,2),C=r(R),T=r(C);Yr(T,{class:"w-10 h-10 text-white"});var E=n(b,4),_=r(E),L=r(_),$=n(r(L),2),H=r($),U=n(H,2);U.__click=u;var Q=r(U);Tr(Q,{class:"w-4 h-4"});var mt=n(L,2),lt=n(r(mt),2),nt=r(lt);nt.value=nt.__value="complementary";var ct=n(nt);ct.value=ct.__value="triadic";var vt=n(ct);vt.value=vt.__value="analogous";var Dt=n(vt);Dt.value=Dt.__value="monochromatic";var Wt=n(mt,2),Yt=r(Wt);Yt.__click=[Pf,a,o,g];var Qt=n(E,2);{var Jt=ft=>{var V=Bf(),et=n(r(V),2);xe(et,23,()=>e(s),(ht,bt)=>ht.hex+bt,(ht,bt)=>{var wt=Rf(),Ut=r(wt),jt=n(Ut,2),Pt=r(jt),Lt=r(Pt),st=n(Pt,2),kt=r(st),G=n(r(kt),2);G.__click=[If,p,bt];var Z=r(G),W=n(kt,2),A=n(r(W),2);A.__click=[jf,p,bt];var I=r(A),N=n(W,2),it=n(r(N),2);it.__click=[Nf,p,bt];var rt=r(it);K(()=>{Qe(Ut,`background-color: ${e(bt).hex??""}`),y(Lt,e(bt).name),y(Z,e(bt).hex),y(I,e(bt).hsl),y(rt,e(bt).rgb)}),m(ht,wt)}),m(ft,V)};O(Qt,ft=>{e(s).length>0&&ft(Jt)})}var zt=n(Qt,4),Ft=r(zt),At=r(Ft),Ct=r(At);Yr(Ct,{class:"w-6 h-6 text-pink-600 dark:text-pink-400"});var tt=n(Ft,2),yt=r(tt),pt=r(yt);be(pt,{class:"w-6 h-6 text-pink-600 dark:text-pink-400"});var at=n(tt,2),P=r(at),xt=r(P);Ve(xt,{class:"w-6 h-6 text-pink-600 dark:text-pink-400"}),Tt(H,()=>e(a),ft=>d(a,ft)),cr(lt,()=>e(o),ft=>d(o,ft)),m(i,h),Bt()}ye(["click"]);function Hf(i,t,a){const o=e(t).length>0?Math.round((e(t)[e(t).length-1].position+e(t)[0].position)/2):50;d(t,[...e(t),{color:"#000000",position:Math.min(100,Math.max(0,o))}],!0),a()}function Of(){Te("/tools")}var Uf=k("<option>↑ Top</option> <option>↗ Top Right</option> <option>→ Right</option> <option>↘ Bottom Right</option> <option>↓ Bottom</option> <option>↙ Bottom Left</option> <option>← Left</option> <option>↖ Top Left</option>",1),zf=k("<option>Circle</option> <option>Ellipse</option>",1),qf=k("<option>0°</option> <option>45°</option> <option>90°</option> <option>135°</option> <option>180°</option> <option>225°</option> <option>270°</option> <option>315°</option>",1),Gf=k('<button class="p-1 text-red-600 hover:text-red-700 transition-colors"><!></button>'),Wf=k('<div class="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><input type="color" class="w-12 h-8 border border-gray-300 dark:border-gray-600 rounded cursor-pointer"/> <input type="text" placeholder="#000000" class="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"/> <div class="flex items-center gap-1"><input type="range" min="0" max="100" class="w-20"/> <span class="text-sm text-gray-600 dark:text-gray-400 w-10"> </span></div> <!></div>'),Jf=(i,t,a)=>t(e(a),"css"),Vf=(i,t,a)=>t(e(a)),Yf=k('<button class="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-blue-400 transition-colors"><div class="h-16 w-full rounded mb-2"></div> <p class="text-sm font-medium text-gray-900 dark:text-white"> </p></button>'),Kf=k('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">CSS Gradient Generator</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Create beautiful CSS gradients with live preview and easy customization.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">CSS Gradient Generator</li></ol></nav> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Preview</h3> <div class="h-48 w-full rounded-lg shadow-inner"></div></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Gradient Settings</h3> <div class="space-y-4"><div><label for="gradient-type-select" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gradient Type</label> <select id="gradient-type-select" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"><option>Linear</option><option>Radial</option><option>Conic</option></select></div> <div><label for="gradient-direction" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"> </label> <select id="gradient-direction" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"><!></select></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><div class="flex justify-between items-center mb-4"><h3 class="text-lg font-semibold text-gray-900 dark:text-white">Color Stops</h3> <button class="px-3 py-1 bg-primary-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1"><!> Add Stop</button></div> <div class="space-y-3"></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><div class="flex justify-between items-center mb-4"><h3 class="text-lg font-semibold text-gray-900 dark:text-white">CSS Code</h3> <div class="flex gap-2"><button class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-blue-700 transition-colors"> </button> <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">Download CSS</button></div></div> <pre class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg font-mono text-sm text-gray-900 dark:text-white overflow-x-auto"> </pre></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Preset Gradients</h3> <div class="grid grid-cols-2 md:grid-cols-4 gap-4"></div></div> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Multiple Gradient Types</h3> <p class="text-gray-600 dark:text-gray-400">Create linear, radial, and conic gradients with customizable directions</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Live Preview</h3> <p class="text-gray-600 dark:text-gray-400">See your gradient in real-time as you adjust colors and positions</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">CSS Export</h3> <p class="text-gray-600 dark:text-gray-400">Copy clean CSS code or download as a file for immediate use</p></div></div></div>');function Qf(i,t){Rt(t,!0);let a=f("linear"),o=f("90deg"),s=f(Pe([{color:"#667eea",position:0},{color:"#764ba2",position:100}])),c=f(""),l=f("");const v=[{name:"Sunset",type:"linear",direction:"45deg",stops:[{color:"#ff6b6b",position:0},{color:"#feca57",position:100}]},{name:"Ocean",type:"linear",direction:"135deg",stops:[{color:"#667eea",position:0},{color:"#764ba2",position:100}]},{name:"Forest",type:"linear",direction:"90deg",stops:[{color:"#38ef7d",position:0},{color:"#11998e",position:100}]},{name:"Fire",type:"radial",direction:"circle",stops:[{color:"#f12711",position:0},{color:"#f5af19",position:100}]}];function g(){const Y=e(w).map(z=>`${z.color} ${z.position}%`).join(", ");e(a)==="linear"?d(c,`background: linear-gradient(${e(o)}, ${Y});`):e(a)==="radial"?d(c,`background: radial-gradient(${e(o)}, ${Y});`):e(a)==="conic"&&d(c,`background: conic-gradient(from ${e(o)}, ${Y});`)}function u(Y){e(s).length>2&&(d(s,e(s).filter((z,B)=>B!==Y),!0),g())}function p(Y,z,B){const M=[...e(s)];z==="color"?M[Y].color=B:M[Y].position=Math.min(100,Math.max(0,B)),d(s,M,!0),g()}function h(Y){d(a,Y.type,!0),d(o,Y.direction,!0),d(s,[...Y.stops],!0),g()}function b(Y,z){navigator.clipboard.writeText(Y),d(l,z,!0),setTimeout(()=>{d(l,"")},2e3)}function x(){const Y=new Blob([e(c)],{type:"text/css"}),z=URL.createObjectURL(Y),B=document.createElement("a");B.href=z,B.download="gradient.css",B.click(),URL.revokeObjectURL(z)}const w=ue(()=>[...e(s)].sort((Y,z)=>Y.position-z.position)),S=ue(()=>()=>{const Y=e(w).map(z=>`${z.color} ${z.position}%`).join(", ");return e(a)==="linear"?`linear-gradient(${e(o)}, ${Y})`:e(a)==="radial"?`radial-gradient(${e(o)}, ${Y})`:`linear-gradient(${e(o)}, ${Y})`});ke(()=>{g()});var R=Kf(),C=r(R),T=r(C),E=r(T);E.__click=[Of];var _=r(E);Ie(_,{class:"w-5 h-5"});var L=n(T,2),$=r(L),H=r($);jn(H,{class:"w-10 h-10 text-white"});var U=n(C,4),Q=n(r(U),2),mt=n(U,2),lt=r(mt),nt=n(r(lt),2),ct=r(nt),vt=n(r(ct),2),Dt=r(vt);Dt.value=Dt.__value="linear";var Wt=n(Dt);Wt.value=Wt.__value="radial";var Yt=n(Wt);Yt.value=Yt.__value="conic";var Qt=n(ct,2),Jt=r(Qt),zt=r(Jt),Ft=n(Jt,2),At=r(Ft);{var Ct=Y=>{var z=Uf(),B=ut(z);B.value=B.__value="0deg";var M=n(B,2);M.value=M.__value="45deg";var D=n(M,2);D.value=D.__value="90deg";var F=n(D,2);F.value=F.__value="135deg";var X=n(F,2);X.value=X.__value="180deg";var j=n(X,2);j.value=j.__value="225deg";var dt=n(j,2);dt.value=dt.__value="270deg";var Mt=n(dt,2);Mt.value=Mt.__value="315deg",m(Y,z)},tt=Y=>{var z=Et(),B=ut(z);{var M=F=>{var X=zf(),j=ut(X);j.value=j.__value="circle";var dt=n(j,2);dt.value=dt.__value="ellipse",m(F,X)},D=F=>{var X=qf(),j=ut(X);j.value=j.__value="0deg";var dt=n(j,2);dt.value=dt.__value="45deg";var Mt=n(dt,2);Mt.value=Mt.__value="90deg";var Gt=n(Mt,2);Gt.value=Gt.__value="135deg";var St=n(Gt,2);St.value=St.__value="180deg";var q=n(St,2);q.value=q.__value="225deg";var gt=n(q,2);gt.value=gt.__value="270deg";var $t=n(gt,2);$t.value=$t.__value="315deg",m(F,X)};O(B,F=>{e(a)==="radial"?F(M):F(D,!1)},!0)}m(Y,z)};O(At,Y=>{e(a)==="linear"?Y(Ct):Y(tt,!1)})}var yt=n(lt,2),pt=r(yt),at=n(r(pt),2);at.__click=[Hf,s,g];var P=r(at);Ii(P,{class:"w-4 h-4"});var xt=n(pt,2);xe(xt,23,()=>e(s),(Y,z)=>Y.color+z,(Y,z,B)=>{var M=Wf(),D=r(M);D.__input=()=>p(e(B),"color",e(z).color);var F=n(D,2);F.__input=()=>p(e(B),"color",e(z).color);var X=n(F,2),j=r(X);j.__input=q=>p(e(B),"position",parseInt(q.target.value));var dt=n(j,2),Mt=r(dt),Gt=n(X,2);{var St=q=>{var gt=Gf();gt.__click=()=>u(e(B));var $t=r(gt);Wi($t,{class:"w-4 h-4"}),m(q,gt)};O(Gt,q=>{e(s).length>2&&q(St)})}K(()=>y(Mt,`${e(z).position??""}%`)),Tt(D,()=>e(z).color,q=>e(z).color=q),Tt(F,()=>e(z).color,q=>e(z).color=q),Tt(j,()=>e(z).position,q=>e(z).position=q),m(Y,M)});var ft=n(mt,2),V=r(ft),et=n(r(V),2),ht=r(et);ht.__click=[Jf,b,c];var bt=r(ht),wt=n(ht,2);wt.__click=x;var Ut=n(V,2),jt=r(Ut),Pt=n(ft,2),Lt=n(r(Pt),2);xe(Lt,23,()=>v,(Y,z)=>Y.name+z,(Y,z)=>{var B=Yf();B.__click=[Vf,h,z];var M=r(B),D=n(M,2),F=r(D);K(X=>{Qe(M,`background: ${X??""}`),y(F,e(z).name)},[()=>e(z).type==="linear"?`linear-gradient(${e(z).direction}, ${e(z).stops.map(X=>`${X.color} ${X.position}%`).join(", ")})`:`radial-gradient(${e(z).direction}, ${e(z).stops.map(X=>`${X.color} ${X.position}%`).join(", ")})`]),m(Y,B)});var st=n(Pt,2),kt=r(st),G=r(kt),Z=r(G);jn(Z,{class:"w-6 h-6 text-primary-600 dark:text-primary-400"});var W=n(kt,2),A=r(W),I=r(A);be(I,{class:"w-6 h-6 text-primary-600 dark:text-primary-400"});var N=n(W,2),it=r(N),rt=r(it);Ve(rt,{class:"w-6 h-6 text-primary-600 dark:text-primary-400"}),K(Y=>{Qe(Q,`background: ${Y??""}`),y(zt,e(a)==="linear"?"Direction":"Shape"),y(bt,e(l)==="css"?"✓ Copied!":"Copy CSS"),y(jt,e(c))},[()=>e(S)()]),cr(vt,()=>e(a),Y=>d(a,Y)),cr(Ft,()=>e(o),Y=>d(o,Y)),m(i,R),Bt()}ye(["click","input"]);function Zf(i,t,a){d(t,"Hello, World! This is a sample text for hash generation."),a()}function Xf(i,t,a){d(t,""),d(a,{},!0)}function tx(){Te("/tools")}var ex=(i,t,a,o)=>t(a(),o()),rx=k('<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><div class="flex justify-between items-center mb-3"><div class="flex items-center gap-3"><div class="w-10 h-10 bg-secondary-100 dark:bg-secondary-900/20 rounded-lg flex items-center justify-center"><!></div> <div><h3 class="text-lg font-semibold text-gray-900 dark:text-white"> </h3> <p class="text-sm text-gray-500 dark:text-gray-400"> </p></div></div> <button class="px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors"> </button></div> <div class="relative"><div class="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg font-mono text-sm text-gray-900 dark:text-white break-all"> </div></div></div>'),ax=k('<div class="space-y-4 mb-6"></div>'),ix=k('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Hash Generator</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Generate MD5, SHA1, SHA256, and SHA512 hashes for text and data verification.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Hash Generator</li></ol></nav> <div class="mb-6 flex flex-wrap gap-4 items-center justify-center"><button class="px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Generate Hashes</button> <button class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">Load Sample Text</button> <button class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">Clear All</button></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><div class="flex justify-between items-center mb-4"><h3 class="text-lg font-semibold text-gray-900 dark:text-white">Input Text</h3> <span class="text-sm text-gray-500 dark:text-gray-400"> </span></div> <textarea placeholder="Enter text to generate hashes..." class="w-full h-32 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"></textarea></div> <!> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">About Hash Algorithms</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">MD5</h4> <p class="text-sm text-gray-600 dark:text-gray-400">128-bit hash function. Fast but not cryptographically secure for sensitive data.</p></div> <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">SHA-1</h4> <p class="text-sm text-gray-600 dark:text-gray-400">160-bit hash function. Deprecated for security purposes but still used for compatibility.</p></div> <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">SHA-256</h4> <p class="text-sm text-gray-600 dark:text-gray-400">256-bit hash function. Secure and widely used for blockchain and data integrity.</p></div> <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">SHA-512</h4> <p class="text-sm text-gray-600 dark:text-gray-400">512-bit hash function. Highest security level, suitable for critical applications.</p></div></div></div> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-amber-100 dark:bg-amber-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Multiple Algorithms</h3> <p class="text-gray-600 dark:text-gray-400">Generate MD5, SHA1, SHA256, and SHA512 hashes for different security needs</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-amber-100 dark:bg-amber-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Data Verification</h3> <p class="text-gray-600 dark:text-gray-400">Verify file integrity and authenticate data transfers with cryptographic hashes</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-amber-100 dark:bg-amber-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Instant Results</h3> <p class="text-gray-600 dark:text-gray-400">Generate hashes instantly with real-time updates as you type</p></div></div></div>');function ox(i,t){Rt(t,!0);let a=f(""),o=f(Pe({})),s=f("");async function c(At,Ct){return new TextEncoder().encode(At),Ct==="md5"?await l(At,"md5"):Ct==="sha1"?await l(At,"sha1"):Ct==="sha256"?await l(At,"sha256"):Ct==="sha512"?await l(At,"sha512"):""}async function l(At,Ct){let tt=0;for(let P=0;P<At.length;P++){const xt=At.charCodeAt(P);tt=(tt<<5)-tt+xt,tt=tt&tt}const pt={md5:32,sha1:40,sha256:64,sha512:128}[Ct]||64;let at=Math.abs(tt).toString(16);for(;at.length<pt;)at=at.padEnd(pt,at);return at.substring(0,pt)}async function v(){if(!e(a).trim()){d(o,{},!0);return}const At=["md5","sha1","sha256","sha512"],Ct={};for(const tt of At)Ct[tt]=await c(e(a),tt);d(o,Ct,!0)}function g(At,Ct){navigator.clipboard.writeText(At),d(s,Ct,!0),setTimeout(()=>{d(s,"")},2e3)}ke(()=>{e(a)&&v()});var u=ix(),p=r(u),h=r(p),b=r(h);b.__click=[tx];var x=r(b);Ie(x,{class:"w-5 h-5"});var w=n(h,2),S=r(w),R=r(S);Qr(R,{class:"w-10 h-10 text-white"});var C=n(p,4),T=r(C);T.__click=v;var E=n(T,2);E.__click=[Zf,a,v];var _=n(E,2);_.__click=[Xf,a,o];var L=n(C,2),$=r(L),H=n(r($),2),U=r(H),Q=n($,2),mt=n(L,2);{var lt=At=>{var Ct=ax();xe(Ct,21,()=>Object.entries(e(o)),([tt,yt])=>tt,(tt,yt)=>{var pt=ue(()=>Qa(e(yt),2));let at=()=>e(pt)[0],P=()=>e(pt)[1];var xt=rx(),ft=r(xt),V=r(ft),et=r(V),ht=r(et);Qr(ht,{class:"w-5 h-5 text-secondary-600 dark:text-secondary-400"});var bt=n(et,2),wt=r(bt),Ut=r(wt),jt=n(wt,2),Pt=r(jt),Lt=n(V,2);Lt.__click=[ex,g,P,at];var st=r(Lt),kt=n(ft,2),G=r(kt),Z=r(G);K(W=>{y(Ut,W),y(Pt,`${P().length??""} characters • ${P().length*4} bits`),y(st,e(s)===at()?"✓ Copied!":"Copy Hash"),y(Z,P())},[()=>at().toUpperCase()]),m(tt,xt)}),m(At,Ct)};O(mt,At=>{Object.keys(e(o)).length>0&&At(lt)})}var nt=n(mt,4),ct=r(nt),vt=r(ct),Dt=r(vt);Qr(Dt,{class:"w-6 h-6 text-amber-600 dark:text-amber-400"});var Wt=n(ct,2),Yt=r(Wt),Qt=r(Yt);He(Qt,{class:"w-6 h-6 text-secondary-600 dark:text-secondary-400"});var Jt=n(Wt,2),zt=r(Jt),Ft=r(zt);Ve(Ft,{class:"w-6 h-6 text-secondary-600 dark:text-secondary-400"}),K(At=>{T.disabled=At,y(U,`${e(a).length??""} characters`)},[()=>!e(a).trim()]),Tt(Q,()=>e(a),At=>d(a,At)),m(i,u),Bt()}ye(["click"]);function nx(i,t,a,o,s,c){d(t,""),a(),d(o,""),d(s,null),d(c,"header")}function sx(i,t){d(t,"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE3MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c")}function dx(){Te("/tools")}var lx=k('<meta name="description" content="Securely decode and analyze JWT tokens. View header, payload, and check token validity"/>'),cx=(i,t)=>d(t,!e(t)),vx=k('<!> <span class="text-sm text-green-700 dark:text-green-300">Valid JWT format</span>',1),gx=k('<!> <span class="text-sm text-red-700 dark:text-red-300">Invalid JWT format</span>',1),ux=k("<div><!></div>"),mx=k('<div class="flex items-start p-3 mt-3 rounded-md bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800"><!> <span class="text-sm text-yellow-700 dark:text-yellow-300"> </span></div>'),px=k('<div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-6"><div class="p-6"><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center"><!> Token Information</h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"><div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md"><p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Subject</p> <p class="text-sm font-medium text-gray-900 dark:text-white"> </p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md"><p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Issued At</p> <p class="text-sm font-medium text-gray-900 dark:text-white"> </p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md"><p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Expires At</p> <p class="text-sm font-medium text-gray-900 dark:text-white"> </p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md"><p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Status</p> <p> </p></div></div></div></div>'),fx=(i,t)=>d(t,"header"),xx=(i,t)=>d(t,"payload"),bx=(i,t)=>d(t,"signature"),yx=(i,t,a)=>t(e(a)),hx=k('<div class="flex items-center justify-between mb-4"><h3 class="text-lg font-medium text-gray-900 dark:text-white">Decoded Header</h3> <button class="flex items-center px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"><!> </button></div> <pre class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm text-gray-700 dark:text-gray-300"><code> </code></pre>',1),_x=(i,t,a)=>t(e(a)),kx=k('<div class="flex items-center justify-between mb-4"><h3 class="text-lg font-medium text-gray-900 dark:text-white">Decoded Payload</h3> <button class="flex items-center px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"><!> </button></div> <pre class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm text-gray-700 dark:text-gray-300"><code> </code></pre>',1),wx=(i,t,a)=>t(e(a)),Cx=k(`<div class="flex items-center justify-between mb-4"><h3 class="text-lg font-medium text-gray-900 dark:text-white">Signature</h3> <button class="flex items-center px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"><!> </button></div> <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4"><div class="flex items-start"><!> <div><p class="text-sm text-yellow-700 dark:text-yellow-300 font-medium mb-1">Security Note</p> <p class="text-xs text-yellow-600 dark:text-yellow-400">The signature cannot be verified in the browser for security reasons. Always
                  verify JWT signatures on your server using a proper secret key.</p></div></div></div> <pre class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm text-gray-700 dark:text-gray-300 break-all"><code> </code></pre>`,1),$x=k('<div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="flex flex-wrap border-b border-gray-200 dark:border-gray-700"><button>Header</button> <button>Payload</button> <button>Signature</button></div> <div class="p-6"><!> <!> <!></div></div>'),Sx=k('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-slate-400 to-slate-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">JWT Decoder</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Decode and analyze JSON Web Tokens (JWT) safely in your browser</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">JWT Decoder</li></ol></nav> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-6"><div class="p-6"><div class="mb-4"><label for="jwt-token-input" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">JWT Token</label> <div class="relative"><textarea id="jwt-token-input" placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" class="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-mono text-sm resize-none"></textarea> <button class="absolute right-2 top-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"><!></button></div> <div class="flex items-center justify-between mt-2"><p class="text-xs text-gray-500 dark:text-gray-400">Token will be decoded in real-time. No data is sent to any server.</p> <div class="flex gap-2"><button class="flex items-center px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"><!> Load Example</button> <button class="flex items-center px-3 py-1 text-xs bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors">Clear</button></div></div></div> <!> <!></div></div> <!> <!></div>');function Tx(i,t){Rt(t,!0);let a=f(""),o=f(!1),s=f(""),c=f(""),l=f(""),v=f(null),g=f(""),u=f(!1),p=f("header");ke(()=>{e(a)?h():b()});function h(){try{const et=e(a).split(".");if(et.length!==3)throw new Error("Invalid JWT format. JWT must have 3 parts separated by dots.");try{const ht=atob(et[0]),bt=JSON.parse(ht);d(s,JSON.stringify(bt,null,2),!0)}catch{throw new Error("Invalid header format. Cannot decode base64 or parse JSON.")}try{const ht=atob(et[1]),bt=JSON.parse(ht);d(c,JSON.stringify(bt,null,2),!0),bt.exp&&(Math.floor(Date.now()/1e3)>bt.exp?d(g,"Warning: This token has expired!"):d(g,""))}catch{throw new Error("Invalid payload format. Cannot decode base64 or parse JSON.")}d(l,et[2],!0),d(v,!0)}catch(et){d(g,et instanceof Error?et.message:"Failed to decode JWT token",!0),b(),d(v,!1)}}function b(){d(s,""),d(c,""),d(l,""),d(v,null)}function x(et){navigator.clipboard.writeText(et).then(()=>{d(u,!0),setTimeout(()=>{d(u,!1)},2e3)})}function w(){if(!e(c))return null;try{return JSON.parse(e(c))}catch{return null}}function S(et){return new Date(et*1e3).toLocaleString()}function R(){const et=w();return!et||!et.exp?!1:Math.floor(Date.now()/1e3)>et.exp}function C(){const et=w();if(!et||!et.exp)return"N/A";const ht=Math.floor(Date.now()/1e3),bt=et.exp-ht;if(bt<=0)return"Expired";const wt=Math.floor(bt/86400),Ut=Math.floor(bt%86400/3600),jt=Math.floor(bt%3600/60);return wt>0?`${wt}d ${Ut}h ${jt}m`:Ut>0?`${Ut}h ${jt}m`:`${jt}m`}var T=Sx();Er(et=>{var ht=lx();_r.title="JWT Decoder - Developer Tools",m(et,ht)});var E=r(T),_=r(E),L=r(_);L.__click=[dx];var $=r(L);Ie($,{class:"w-5 h-5"});var H=n(_,2),U=r(H),Q=r(U);q0(Q,{class:"w-10 h-10 text-white"});var mt=n(E,4),lt=r(mt),nt=r(lt),ct=n(r(nt),2),vt=r(ct),Dt=n(vt,2);Dt.__click=[cx,o];var Wt=r(Dt);{var Yt=et=>{U0(et,{class:"w-5 h-5"})},Qt=et=>{pd(et,{class:"w-5 h-5"})};O(Wt,et=>{e(o)?et(Yt):et(Qt,!1)})}var Jt=n(ct,2),zt=n(r(Jt),2),Ft=r(zt);Ft.__click=[sx,a];var At=r(Ft);Tr(At,{class:"w-3 h-3 mr-1"});var Ct=n(Ft,2);Ct.__click=[nx,a,b,g,v,p];var tt=n(nt,2);{var yt=et=>{var ht=ux(),bt=r(ht);{var wt=jt=>{var Pt=vx(),Lt=ut(Pt);ma(Lt,{class:"w-5 h-5 text-primary-600 dark:text-primary-400 mr-2"}),m(jt,Pt)},Ut=jt=>{var Pt=gx(),Lt=ut(Pt);ui(Lt,{class:"w-5 h-5 text-red-600 dark:text-red-400 mr-2"}),m(jt,Pt)};O(bt,jt=>{e(v)?jt(wt):jt(Ut,!1)})}K(()=>ge(ht,1,`flex items-center p-3 rounded-md ${e(v)?"bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800":"bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"}`)),m(et,ht)};O(tt,et=>{e(v)!==null&&et(yt)})}var pt=n(tt,2);{var at=et=>{var ht=mx(),bt=r(ht);ln(bt,{class:"w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2 mt-0.5"});var wt=n(bt,2),Ut=r(wt);K(()=>y(Ut,e(g))),m(et,ht)};O(pt,et=>{e(g)&&et(at)})}var P=n(mt,2);{var xt=et=>{const ht=ue(w);var bt=px(),wt=r(bt),Ut=r(wt),jt=r(Ut);pa(jt,{class:"w-5 h-5 mr-2"});var Pt=n(Ut,2),Lt=r(Pt),st=n(r(Lt),2),kt=r(st),G=n(Lt,2),Z=n(r(G),2),W=r(Z),A=n(G,2),I=n(r(A),2),N=r(I),it=n(A,2),rt=n(r(it),2),Y=r(rt);K((z,B,M,D)=>{y(kt,e(ht).sub||"N/A"),y(W,z),y(N,B),ge(rt,1,`text-sm font-medium ${M??""}`),y(Y,D)},[()=>e(ht).iat?S(e(ht).iat):"N/A",()=>e(ht).exp?S(e(ht).exp):"N/A",()=>R()?"text-red-600 dark:text-red-400":"text-primary-600 dark:text-primary-400",()=>R()?"Expired":`Valid (${C()})`]),m(et,bt)};O(P,et=>{e(v)&&w()&&et(xt)})}var ft=n(P,2);{var V=et=>{var ht=$x(),bt=r(ht),wt=r(bt);wt.__click=[fx,p];var Ut=n(wt,2);Ut.__click=[xx,p];var jt=n(Ut,2);jt.__click=[bx,p];var Pt=n(bt,2),Lt=r(Pt);{var st=A=>{var I=hx(),N=ut(I),it=n(r(N),2);it.__click=[yx,x,s];var rt=r(it);be(rt,{class:"w-4 h-4 mr-1"});var Y=n(rt),z=n(N,2),B=r(z),M=r(B);K(()=>{y(Y,` ${e(u)?"Copied!":"Copy"}`),y(M,e(s))}),m(A,I)};O(Lt,A=>{e(p)==="header"&&A(st)})}var kt=n(Lt,2);{var G=A=>{var I=kx(),N=ut(I),it=n(r(N),2);it.__click=[_x,x,c];var rt=r(it);be(rt,{class:"w-4 h-4 mr-1"});var Y=n(rt),z=n(N,2),B=r(z),M=r(B);K(()=>{y(Y,` ${e(u)?"Copied!":"Copy"}`),y(M,e(c))}),m(A,I)};O(kt,A=>{e(p)==="payload"&&A(G)})}var Z=n(kt,2);{var W=A=>{var I=Cx(),N=ut(I),it=n(r(N),2);it.__click=[wx,x,l];var rt=r(it);be(rt,{class:"w-4 h-4 mr-1"});var Y=n(rt),z=n(N,2),B=r(z),M=r(B);pa(M,{class:"w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2 mt-0.5"});var D=n(z,2),F=r(D),X=r(F);K(()=>{y(Y,` ${e(u)?"Copied!":"Copy"}`),y(X,e(l))}),m(A,I)};O(Z,A=>{e(p)==="signature"&&A(W)})}K(()=>{ge(wt,1,`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${e(p)==="header"?"border-primary-500 text-primary-600 dark:text-primary-400":"border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"}`),ge(Ut,1,`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${e(p)==="payload"?"border-primary-500 text-primary-600 dark:text-primary-400":"border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"}`),ge(jt,1,`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${e(p)==="signature"?"border-primary-500 text-primary-600 dark:text-primary-400":"border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"}`)}),m(et,ht)};O(ft,et=>{e(v)&&et(V)})}K(()=>Nt(vt,"rows",e(o)?4:1)),Tt(vt,()=>e(a),et=>d(a,et)),m(i,T),Bt()}ye(["click"]);function Mx(i,t,a,o,s){const c=parseFloat(e(t))||0;d(a,(c*(e(o)/100)).toFixed(2),!0),s()}function Ex(i,t,a,o,s){const c=parseFloat(e(t))||0,l=parseFloat(e(a))||0;c>0&&d(o,Math.round(l/c*100*100)/100),s()}function Lx(i,t,a,o,s,c,l){d(t,"125.50"),d(a,18),d(o,4),d(s,"10.04"),d(c,!0),l()}function Px(i,t,a,o,s,c,l,v,g,u){d(t,""),d(a,15),d(o,1),d(s,""),d(c,0),d(l,!1),d(v,0),d(g,0),d(u,0)}function Ax(){Te("/tools")}var Ix=(i,t,a)=>d(t,a,!0),jx=k("<button> </button>"),Nx=(i,t)=>d(t,Math.max(1,e(t)-1),!0),Rx=(i,t)=>d(t,e(t)+1),Bx=(i,t,a)=>t(e(a).toFixed(2)),Dx=(i,t,a)=>t(e(a).toFixed(2)),Fx=(i,t,a)=>t(e(a).toFixed(2)),Hx=k('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="btn btn-primary"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Tip Calculator</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Calculate tips and split bills easily with support for tax and multiple people.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Tip Calculator</li></ol></nav> <div class="mb-6 flex flex-wrap gap-4 items-center justify-center"><button class="btn btn-primary">Load Sample Bill</button> <button class="btn btn-primary">Clear All</button></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"><div class="space-y-4"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><label for="bill-amount" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bill Amount ($)</label> <input id="bill-amount" type="number" placeholder="0.00" step="0.01" min="0" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"/></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><label for="tip-percentage" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"> </label> <input id="tip-percentage" type="range" min="0" max="50" step="1" class="w-full mb-3"/> <div class="grid grid-cols-5 gap-2"></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><label for="number-people" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Number of People</label> <div class="flex items-center gap-2"><button class="btn btn-primary btn-sm">-</button> <input id="number-people" type="number" min="1" class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center focus:ring-2 focus:ring-primary-500 focus:border-transparent"/> <button class="btn btn-primary btn-sm">+</button></div></div></div> <div class="space-y-4"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tax Options</h3> <label class="flex items-center gap-2 cursor-pointer mb-4"><input type="checkbox" class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/> <span class="text-sm text-gray-700 dark:text-gray-300">Include tax in total</span></label> <div class="space-y-3"><div><label for="tax-amount" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tax Amount ($)</label> <input id="tax-amount" type="number" placeholder="0.00" step="0.01" min="0" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"/></div> <div><label for="tax-rate" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tax Rate (%)</label> <input id="tax-rate" type="number" placeholder="0.00" step="0.1" min="0" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"/></div></div></div> <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Calculation Results</h3> <div class="space-y-3"><div class="flex justify-between items-center"><span class="text-gray-600 dark:text-gray-400">Tip Amount:</span> <div class="flex items-center gap-2"><span class="text-xl font-semibold text-gray-900 dark:text-white"> </span> <button class="btn btn-primary btn-sm"><!></button></div></div> <div class="flex justify-between items-center"><span class="text-gray-600 dark:text-gray-400">Total Amount:</span> <div class="flex items-center gap-2"><span class="text-xl font-semibold text-gray-900 dark:text-white"> </span> <button class="btn btn-primary btn-sm"><!></button></div></div> <div class="pt-3 border-t border-green-200 dark:border-green-800"><div class="flex justify-between items-center"><span class="text-gray-600 dark:text-gray-400">Per Person:</span> <div class="flex items-center gap-2"><span class="text-2xl font-bold text-primary-600 dark:text-primary-400"> </span> <button class="btn btn-primary btn-sm"><!></button></div></div></div></div></div></div></div> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Tip Calculation</h3> <p class="text-gray-600 dark:text-gray-400">Calculate tips with customizable percentages and preset options</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Bill Splitting</h3> <p class="text-gray-600 dark:text-gray-400">Split bills easily among multiple people with fair distribution</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Tax Support</h3> <p class="text-gray-600 dark:text-gray-400">Include tax calculations by amount or percentage for accurate totals</p></div></div></div>');function Ox(i,t){Rt(t,!0);let a=f(""),o=f(15),s=f(1),c=f(""),l=f(0),v=f(!1),g=f(0),u=f(0),p=f(0);const h=[10,15,18,20,25];function b(){let gt=parseFloat(e(a))||0,$t=parseFloat(e(c))||0;e(v)?gt+=$t:e(l)>0&&($t=gt*(e(l)/100),gt+=$t),d(g,gt*(e(o)/100)),d(u,gt+e(g)),d(p,e(u)/e(s))}function x(gt){navigator.clipboard.writeText(gt)}ke(()=>{(e(a)||e(c))&&b()});var w=Hx(),S=r(w),R=r(S),C=r(R);C.__click=[Ax];var T=r(C);Ie(T,{class:"w-5 h-5 mr-2"});var E=n(R,2),_=r(E),L=r(_);Ho(L,{class:"w-10 h-10 text-white"});var $=n(S,4),H=r($);H.__click=[Lx,a,o,s,c,v,b];var U=n(H,2);U.__click=[Px,a,o,s,c,l,v,g,u,p];var Q=n($,2),mt=r(Q),lt=r(mt),nt=n(r(lt),2),ct=n(lt,2),vt=r(ct),Dt=r(vt),Wt=n(vt,2),Yt=n(Wt,2);xe(Yt,20,()=>h,gt=>gt,(gt,$t)=>{var Ht=jx();Ht.__click=[Ix,o,$t];var J=r(Ht);K(()=>{ge(Ht,1,`px-3 py-2 text-sm rounded-lg border transition-colors ${e(o)===$t?"bg-primary-100 dark:bg-primary-900/20 border-green-500 text-green-700 dark:text-green-300":"bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-green-400"}`),y(J,`${$t??""}%`)}),m(gt,Ht)});var Qt=n(ct,2),Jt=n(r(Qt),2),zt=r(Jt);zt.__click=[Nx,s];var Ft=n(zt,2),At=n(Ft,2);At.__click=[Rx,s];var Ct=n(mt,2),tt=r(Ct),yt=n(r(tt),2),pt=r(yt),at=n(yt,2),P=r(at),xt=n(r(P),2);xt.__input=[Ex,a,c,l,b];var ft=n(P,2),V=n(r(ft),2);V.__input=[Mx,a,c,l,b];var et=n(tt,2),ht=n(r(et),2),bt=r(ht),wt=n(r(bt),2),Ut=r(wt),jt=r(Ut),Pt=n(Ut,2);Pt.__click=[Bx,x,g];var Lt=r(Pt);be(Lt,{class:"w-4 h-4"});var st=n(bt,2),kt=n(r(st),2),G=r(kt),Z=r(G),W=n(G,2);W.__click=[Dx,x,u];var A=r(W);be(A,{class:"w-4 h-4"});var I=n(st,2),N=r(I),it=n(r(N),2),rt=r(it),Y=r(rt),z=n(rt,2);z.__click=[Fx,x,p];var B=r(z);be(B,{class:"w-4 h-4"});var M=n(Q,2),D=r(M),F=r(D),X=r(F);Nr(X,{class:"w-6 h-6 text-primary-600 dark:text-primary-400"});var j=n(D,2),dt=r(j),Mt=r(dt);vn(Mt,{class:"w-6 h-6 text-primary-600 dark:text-primary-400"});var Gt=n(j,2),St=r(Gt),q=r(St);Ho(q,{class:"w-6 h-6 text-primary-600 dark:text-primary-400"}),K((gt,$t,Ht)=>{y(Dt,`Tip Percentage: ${e(o)??""}%`),y(jt,`$${gt??""}`),y(Z,`$${$t??""}`),y(Y,`$${Ht??""}`)},[()=>e(g).toFixed(2),()=>e(u).toFixed(2),()=>e(p).toFixed(2)]),Tt(nt,()=>e(a),gt=>d(a,gt)),Tt(Wt,()=>e(o),gt=>d(o,gt)),Tt(Ft,()=>e(s),gt=>d(s,gt)),We(pt,()=>e(v),gt=>d(v,gt)),Tt(xt,()=>e(c),gt=>d(c,gt)),Tt(V,()=>e(l),gt=>d(l,gt)),m(i,w),Bt()}ye(["click","input"]);function Ux(i,t,a){d(t,"1704067200"),a()}function zx(i,t,a,o){d(t,""),d(a,""),d(o,"")}function qx(){Te("/tools")}var Gx=(i,t,a)=>t(e(a),"iso"),Wx=k('<div><label for="iso-string" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">ISO String</label> <div class="flex gap-2"><input id="iso-string" type="text" class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-mono"/> <button class="btn btn-primary btn-sm"> </button></div></div>'),Jx=(i,t,a)=>t(e(a),"timestamp"),Vx=k('<div><label for="unix-timestamp-result" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Unix Timestamp</label> <div class="flex gap-2"><input id="unix-timestamp-result" type="text" class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-mono"/> <button class="btn btn-primary btn-sm"> </button></div></div>'),Yx=(i,t,a)=>t(e(a),"formatted"),Kx=k('<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Formatted Results</h3> <div class="mb-4"><label for="date-format" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date Format</label> <select id="date-format" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"><option>ISO 8601</option><option>US Format</option><option>European Format</option><option>Readable</option><option>Short Date</option><option>Time Only</option><option>Date Only</option></select></div> <div class="flex gap-2"><input type="text" class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"/> <button class="btn btn-primary"> </button></div></div>'),Qx=k(`<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="btn btn-primary"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Unix Timestamp Converter</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Convert Unix timestamps to human-readable dates and vice versa.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Timestamp Converter</li></ol></nav> <div class="bg-gradient-to-r from-secondary-100 to-secondary-50 dark:from-secondary-900/20 dark:to-secondary-900/20 rounded-xl border border-secondary-200 dark:border-secondary-800 p-6 mb-6"><div class="flex justify-between items-center"><div><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Current Timestamp</h3> <p class="text-gray-600 dark:text-gray-400 mb-2">Current Unix timestamp and date</p> <div class="flex items-center gap-4"><span class="text-lg font-mono text-gray-900 dark:text-white"> </span> <span class="text-gray-600 dark:text-gray-400"> </span></div></div> <button class="btn btn-primary"><!> Refresh</button></div></div> <div class="mb-6 flex flex-wrap gap-4 items-center justify-center"><button class="btn btn-primary">Load Sample Timestamp</button> <button class="btn btn-primary">Clear All</button></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Unix Timestamp → Date</h3> <div class="space-y-4"><div><label for="unix-timestamp" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Unix Timestamp</label> <input id="unix-timestamp" type="text" placeholder="1704067200" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary-500 focus:border-transparent font-mono"/></div> <!></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Date → Unix Timestamp</h3> <div class="space-y-4"><div><label for="date-iso" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date (ISO format)</label> <input id="date-iso" type="datetime-local" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary-500 focus:border-transparent"/></div> <!></div></div></div> <!> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">About Unix Timestamps</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">What is a Unix Timestamp?</h4> <p class="text-sm text-gray-600 dark:text-gray-400">A Unix timestamp is the number of seconds that have elapsed since January 1, 1970
          (midnight UTC/GMT).</p></div> <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">Common Uses</h4> <p class="text-sm text-gray-600 dark:text-gray-400">Used in programming, databases, APIs, and systems for consistent date/time representation
          across timezones.</p></div></div></div> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-secondary-100 dark:bg-secondary-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Unix Timestamps</h3> <p class="text-gray-600 dark:text-gray-400">Convert between Unix timestamps and human-readable dates instantly</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-secondary-100 dark:bg-secondary-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Multiple Formats</h3> <p class="text-gray-600 dark:text-gray-400">Support for ISO, US, European, and custom date formats</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-secondary-100 dark:bg-secondary-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Real-time Updates</h3> <p class="text-gray-600 dark:text-gray-400">Get current timestamp and live updates as you type</p></div></div></div>`);function Zx(i,t){Rt(t,!0);let a=f(""),o=f(""),s=f("iso");function c(Z,W){switch(W){case"iso":return Z.toISOString();case"us":return Z.toLocaleString("en-US");case"european":return Z.toLocaleString("en-GB");case"readable":return Z.toLocaleString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit"});case"short":return Z.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});case"time":return Z.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",second:"2-digit"});case"date":return Z.toISOString().split("T")[0];default:return Z.toISOString()}}let l=f(""),v=f(""),g=f("");function u(){d(v,Math.floor(new Date().getTime()/1e3).toString(),!0),d(a,e(v),!0),p()}function p(){if(!e(a)){d(o,""),d(g,"");return}try{const Z=parseInt(e(a)),W=new Date(Z*1e3);if(isNaN(W.getTime())){d(o,"Invalid timestamp"),d(g,"");return}d(g,W.toISOString(),!0),d(o,c(W,e(s)),!0)}catch{d(o,"Invalid timestamp"),d(g,"")}}function h(){if(!e(g)){d(a,""),d(o,"");return}try{const Z=new Date(e(g));if(isNaN(Z.getTime())){d(a,"Invalid date"),d(o,"");return}d(a,Math.floor(Z.getTime()/1e3).toString(),!0),d(o,c(Z,e(s)),!0)}catch{d(a,"Invalid date"),d(o,"")}}function b(Z,W){navigator.clipboard.writeText(Z),d(l,W,!0),setTimeout(()=>{d(l,"")},2e3)}u(),ke(()=>{e(a)&&p()}),ke(()=>{e(g)&&h()}),ke(()=>{if(e(g)){const Z=new Date(e(g));isNaN(Z.getTime())||d(o,c(Z,e(s)),!0)}});var x=Qx(),w=r(x),S=r(w),R=r(S);R.__click=[qx];var C=r(R);Ie(C,{class:"w-5 h-5 mr-2"});var T=n(S,2),E=r(T),_=r(E);Va(_,{class:"w-10 h-10 text-white"});var L=n(w,4),$=r(L),H=r($),U=n(r(H),4),Q=r(U),mt=r(Q),lt=n(Q,2),nt=r(lt),ct=n(H,2);ct.__click=u;var vt=r(ct);Tr(vt,{class:"w-4 h-4 mr-2"});var Dt=n(L,2),Wt=r(Dt);Wt.__click=[Ux,a,p];var Yt=n(Wt,2);Yt.__click=[zx,a,o,g];var Qt=n(Dt,2),Jt=r(Qt),zt=n(r(Jt),2),Ft=r(zt),At=n(r(Ft),2),Ct=n(Ft,2);{var tt=Z=>{var W=Wx(),A=n(r(W),2),I=r(A),N=n(I,2);N.__click=[Gx,b,g];var it=r(N);K(()=>y(it,e(l)==="iso"?"✓":"Copy")),Tt(I,()=>e(g),rt=>d(g,rt)),m(Z,W)};O(Ct,Z=>{e(g)&&Z(tt)})}var yt=n(Jt,2),pt=n(r(yt),2),at=r(pt),P=n(r(at),2),xt=n(at,2);{var ft=Z=>{var W=Vx(),A=n(r(W),2),I=r(A),N=n(I,2);N.__click=[Jx,b,a];var it=r(N);K(()=>y(it,e(l)==="timestamp"?"✓":"Copy")),Tt(I,()=>e(a),rt=>d(a,rt)),m(Z,W)};O(xt,Z=>{e(a)&&!isNaN(parseInt(e(a)))&&Z(ft)})}var V=n(Qt,2);{var et=Z=>{var W=Kx(),A=n(r(W),2),I=n(r(A),2),N=r(I);N.value=N.__value="iso";var it=n(N);it.value=it.__value="us";var rt=n(it);rt.value=rt.__value="european";var Y=n(rt);Y.value=Y.__value="readable";var z=n(Y);z.value=z.__value="short";var B=n(z);B.value=B.__value="time";var M=n(B);M.value=M.__value="date";var D=n(A,2),F=r(D),X=n(F,2);X.__click=[Yx,b,o];var j=r(X);K(()=>y(j,e(l)==="formatted"?"✓ Copied!":"Copy")),cr(I,()=>e(s),dt=>d(s,dt)),Tt(F,()=>e(o),dt=>d(o,dt)),m(Z,W)};O(V,Z=>{e(o)&&Z(et)})}var ht=n(V,4),bt=r(ht),wt=r(bt),Ut=r(wt);Va(Ut,{class:"w-6 h-6 text-secondary-600 dark:text-secondary-400"});var jt=n(bt,2),Pt=r(jt),Lt=r(Pt);be(Lt,{class:"w-6 h-6 text-secondary-600 dark:text-secondary-400"});var st=n(jt,2),kt=r(st),G=r(kt);Ve(G,{class:"w-6 h-6 text-secondary-600 dark:text-secondary-400"}),K(Z=>{y(mt,e(v)),y(nt,`(${Z??""})`)},[()=>new Date().toLocaleString()]),Tt(At,()=>e(a),Z=>d(a,Z)),Tt(P,()=>e(g),Z=>d(g,Z)),m(i,x),Bt()}ye(["click"]);function Xx(i,t,a){navigator.clipboard.writeText(e(t)).then(()=>{d(a,!0),setTimeout(()=>{d(a,!1)},2e3)})}function tb(i,t,a,o,s,c,l,v,g,u,p,h,b,x,w,S,R,C,T,E,_,L,$,H,U,Q,mt,lt,nt,ct,vt,Dt,Wt,Yt,Qt,Jt,zt,Ft,At){d(t,""),d(a,""),d(o,""),d(s,""),d(c,""),d(l,"index,follow"),d(v,""),d(g,""),d(u,""),d(p,""),d(h,""),d(b,"website"),d(x,""),d(w,"en_US"),d(S,"summary_large_image"),d(R,""),d(C,""),d(T,""),d(E,""),d(_,""),d(L,""),d($,"#ffffff"),d(H,"width=device-width, initial-scale=1.0"),d(U,"en"),d(Q,"text/html; charset=utf-8"),d(mt,"/favicon.ico"),d(lt,""),d(nt,""),d(ct,""),d(vt,""),d(Dt,""),d(Wt,!1),d(Yt,"WebPage"),d(Qt,""),d(Jt,""),d(zt,""),d(Ft,""),d(At,"")}function eb(i,t,a,o,s,c,l,v,g,u,p,h,b,x,w,S,R,C,T,E){d(t,"My Awesome Website - Home Page"),d(a,"Welcome to my awesome website! Discover amazing content, services, and resources that will help you achieve your goals."),d(o,"awesome website, web development, technology, innovation, digital solutions"),d(s,"John Doe"),d(c,"https://myawesomewebsite.com"),d(l,"index,follow"),d(v,"website"),d(g,"My Awesome Website"),d(u,"en_US"),d(p,"summary_large_image"),d(h,"@myawesomewebsite"),d(b,"@johndoe"),d(x,"#3b82f6"),d(w,"en"),d(S,!0),d(R,"WebPage"),d(C,"My Awesome Website - Home Page"),d(T,e(a),!0),d(E,e(c),!0)}function rb(){Te("/tools")}var ab=k('<meta name="description" content="Generate SEO meta tags, Open Graph tags, Twitter cards, and JSON-LD structured data for better search engine optimization"/>'),ib=(i,t,a)=>d(t,e(a).id,!0),ob=k("<button><!> </button>"),nb=k('<div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Page Title *</label> <input class="input" type="text" placeholder="Enter page title (50-60 characters recommended)"/> <p class="mt-1 text-xs text-gray-500 dark:text-gray-400"> </p></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Meta Description *</label> <textarea class="textarea" placeholder="Enter page description (150-160 characters recommended)"></textarea> <p class="mt-1 text-xs text-gray-500 dark:text-gray-400"> </p></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Keywords</label> <input type="text" placeholder="Enter keywords separated by commas" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Author</label> <input type="text" placeholder="Enter author name" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Canonical URL</label> <input type="url" placeholder="https://example.com/page" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Robots</label> <select class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"><option>Index, Follow</option><option>Index, No Follow</option><option>No Index, Follow</option><option>No Index, No Follow</option></select></div></div>'),sb=k('<div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"><h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Article Specific Tags</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Published Time</label> <input type="datetime-local" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Modified Time</label> <input type="datetime-local" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Article Author</label> <input type="text" placeholder="Author name" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Article Section</label> <input type="text" placeholder="Technology, Business, etc." class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"/></div> <div class="md:col-span-2"><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Article Tags</label> <input type="text" placeholder="tag1, tag2, tag3" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"/></div></div></div>'),db=k('<div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">OG Title</label> <input type="text" placeholder="Enter Open Graph title" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">OG Description</label> <textarea placeholder="Enter Open Graph description" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"></textarea></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">OG Image URL</label> <input type="url" placeholder="https://example.com/image.jpg" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">OG Image Alt</label> <input type="text" placeholder="Describe the image for accessibility" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">OG URL</label> <input type="url" placeholder="https://example.com/page" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">OG Type</label> <select class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"><option>Website</option><option>Article</option><option>Product</option><option>Profile</option><option>Video</option><option>Music</option></select></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">OG Site Name</label> <input type="text" placeholder="Your website name" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">OG Locale</label> <input type="text" placeholder="en_US" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"/></div></div> <!>',1),lb=k('<div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Twitter Card Type</label> <select class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"><option>Summary</option><option>Summary with Large Image</option><option>App</option><option>Player</option></select></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Twitter Title</label> <input type="text" placeholder="Enter Twitter card title" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Twitter Description</label> <textarea placeholder="Enter Twitter card description" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"></textarea></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Twitter Image URL</label> <input type="url" placeholder="https://example.com/twitter-image.jpg" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Twitter Image Alt</label> <input type="text" placeholder="Describe the Twitter image" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Twitter Site</label> <input type="text" placeholder="@yourwebsite" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Twitter Creator</label> <input type="text" placeholder="@author" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"/></div></div>'),cb=k('<div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Theme Color</label> <input type="color" class="w-full h-10 px-1 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 cursor-pointer"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language</label> <input type="text" placeholder="en" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Viewport</label> <input type="text" placeholder="width=device-width, initial-scale=1.0" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Favicon</label> <input type="text" placeholder="/favicon.ico" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"/></div></div>'),vb=k('<div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">JSON-LD Type</label> <select class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"><option>Web Page</option><option>Article</option><option>Product</option><option>Organization</option><option>Person</option><option>Recipe</option><option>Event</option></select></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label> <input type="text" placeholder="Enter name/title" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label> <textarea placeholder="Enter description" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"></textarea></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">URL</label> <input type="url" placeholder="https://example.com" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image</label> <input type="url" placeholder="https://example.com/image.jpg" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"/></div></div>'),gb=k('<div class="space-y-6"><div class="flex items-center"><input id="enable-jsonld" type="checkbox" class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/> <label for="enable-jsonld" class="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">Enable JSON-LD Structured Data</label></div> <!></div>'),ub=k('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-violet-400 to-violet-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Meta Tag Generator</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Generate SEO meta tags, Open Graph tags, Twitter cards, and structured data</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Meta Tag Generator</li></ol></nav> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-6"><div class="flex flex-wrap border-b border-gray-200 dark:border-gray-700"></div> <div class="p-6"><!> <!> <!> <!> <!></div></div> <div class="flex flex-wrap gap-3 mb-6"><button class="btn btn-primary"><!> Load Example</button> <button class="btn btn-primary">Clear All</button></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700"><h2 class="text-xl font-semibold text-gray-900 dark:text-white">Generated Meta Tags</h2> <div class="flex gap-2"><button class="btn btn-primary btn-sm"><!> </button> <button class="btn btn-primary btn-sm">Download HTML</button></div></div> <div class="p-6"><pre class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm text-gray-700 dark:text-gray-300"><code> </code></pre></div></div></div>');function mb(i,t){Rt(t,!0);let a=f(""),o=f(""),s=f(""),c=f(""),l=f(""),v=f("index,follow"),g=f(""),u=f(""),p=f(""),h=f(""),b=f(""),x=f("website"),w=f(""),S=f("en_US"),R=f("summary_large_image"),C=f(""),T=f(""),E=f(""),_=f(""),L=f(""),$=f(""),H=f("#ffffff"),U=f("width=device-width, initial-scale=1.0"),Q=f("en"),mt=f("text/html; charset=utf-8"),lt=f("/favicon.ico"),nt=f(""),ct=f(""),vt=f(""),Dt=f(""),Wt=f(""),Yt=f(!1),Qt=f("WebPage"),Jt=f(""),zt=f(""),Ft=f(""),At=f(""),Ct=f(""),tt=f(!1),yt=f("basic");ke(()=>{e(a)&&!e(g)&&d(g,e(a),!0),e(a)&&!e(C)&&d(C,e(a),!0),e(o)&&!e(u)&&d(u,e(o),!0),e(o)&&!e(T)&&d(T,e(o),!0),e(l)&&!e(b)&&d(b,e(l),!0),e(p)&&!e(E)&&d(E,e(p),!0),e(h)&&!e(_)&&d(_,e(h),!0)});function pt(){let J="";if(e(a)&&(J+="<title>"+P(e(a))+"</title>",J+=`
`),e(o)&&(J+='<meta name="description" content="'+P(e(o))+'">',J+=`
`),e(s)&&(J+='<meta name="keywords" content="'+P(e(s))+'">',J+=`
`),e(c)&&(J+='<meta name="author" content="'+P(e(c))+'">',J+=`
`),e(l)&&(J+='<link rel="canonical" href="'+P(e(l))+'">',J+=`
`),e(v)&&(J+='<meta name="robots" content="'+P(e(v))+'">',J+=`
`),J+=`
<!-- Open Graph Meta Tags -->
`,J+='<meta property="og:type" content="'+P(e(x))+'">',J+=`
`,e(g)&&(J+='<meta property="og:title" content="'+P(e(g))+'">',J+=`
`),e(u)&&(J+='<meta property="og:description" content="'+P(e(u))+'">',J+=`
`),e(p)&&(J+='<meta property="og:image" content="'+P(e(p))+'">',J+=`
`),e(h)&&(J+='<meta property="og:image:alt" content="'+P(e(h))+'">',J+=`
`),e(b)&&(J+='<meta property="og:url" content="'+P(e(b))+'">',J+=`
`),e(w)&&(J+='<meta property="og:site_name" content="'+P(e(w))+'">',J+=`
`),e(S)&&(J+='<meta property="og:locale" content="'+P(e(S))+'">',J+=`
`),J+=`
<!-- Twitter Card Meta Tags -->
`,J+='<meta name="twitter:card" content="'+P(e(R))+'">',J+=`
`,e(C)&&(J+='<meta name="twitter:title" content="'+P(e(C))+'">',J+=`
`),e(T)&&(J+='<meta name="twitter:description" content="'+P(e(T))+'">',J+=`
`),e(E)&&(J+='<meta name="twitter:image" content="'+P(e(E))+'">',J+=`
`),e(_)&&(J+='<meta name="twitter:image:alt" content="'+P(e(_))+'">',J+=`
`),e(L)&&(J+='<meta name="twitter:site" content="'+P(e(L))+'">',J+=`
`),e($)&&(J+='<meta name="twitter:creator" content="'+P(e($))+'">',J+=`
`),e(x)==="article"&&(J+=`
<!-- Article Specific Meta Tags -->
`,e(nt)&&(J+='<meta property="article:published_time" content="'+P(e(nt))+'">',J+=`
`),e(ct)&&(J+='<meta property="article:modified_time" content="'+P(e(ct))+'">',J+=`
`),e(vt)&&(J+='<meta property="article:author" content="'+P(e(vt))+'">',J+=`
`),e(Dt)&&(J+='<meta property="article:section" content="'+P(e(Dt))+'">',J+=`
`),e(Wt)&&(J+='<meta property="article:tag" content="'+P(e(Wt))+'">',J+=`
`)),J+=`
<!-- Additional Meta Tags -->
`,J+='<meta charset="utf-8">',J+=`
`,J+='<meta name="viewport" content="'+P(e(U))+'">',J+=`
`,J+='<meta http-equiv="content-type" content="'+P(e(mt))+'">',J+=`
`,e(Q)&&(J+='<meta name="language" content="'+P(e(Q))+'">',J+=`
`),e(H)&&(J+='<meta name="theme-color" content="'+P(e(H))+'">',J+=`
`),e(lt)&&(J+='<link rel="icon" href="'+P(e(lt))+'">',J+=`
`),e(Yt)){J+=`
<!-- JSON-LD Structured Data -->
`;const ot=at();J+='<script type="application/ld+json">'+ot+"<\/script>",J+=`
`}d(Ct,J,!0)}function at(){const J={"@context":"https://schema.org","@type":e(Qt)};return e(Jt)&&(J.name=e(Jt)),e(zt)&&(J.description=e(zt)),e(Ft)&&(J.url=e(Ft)),e(At)&&(J.image=e(At)),JSON.stringify(J,null,2)}function P(J){const ot=document.createElement("div");return ot.textContent=J,ot.innerHTML}function xt(){if(!e(Ct))return;const J=`<!DOCTYPE html>
<html lang="`+e(Q)+`">
<head>
`+e(Ct)+`</head>
<body>
  <!-- Your content goes here -->
  <h1>Welcome to `+(e(a)||"Your Website")+`</h1>
  <p>`+(e(o)||"Your description here.")+`</p>
</body>
</html>`,ot=new Blob([J],{type:"text/html"}),_t=URL.createObjectURL(ot),It=document.createElement("a");It.href=_t,It.download="meta-tags-example.html",document.body.appendChild(It),It.click(),document.body.removeChild(It),URL.revokeObjectURL(_t)}ke(()=>{pt()});var ft=ub();Er(J=>{var ot=ab();_r.title="Meta Tag Generator - Developer Tools",m(J,ot)});var V=r(ft),et=r(V),ht=r(et);ht.__click=[rb];var bt=r(ht);Ie(bt,{class:"w-5 h-5"});var wt=n(et,2),Ut=r(wt),jt=r(Ut);Oo(jt,{class:"w-10 h-10 text-white"});var Pt=n(V,4),Lt=r(Pt);xe(Lt,21,()=>[{id:"basic",label:"Basic SEO",icon:gi},{id:"opengraph",label:"Open Graph",icon:Oo},{id:"twitter",label:"Twitter Cards",icon:ic},{id:"additional",label:"Additional",icon:Ya},{id:"jsonld",label:"JSON-LD",icon:He}],J=>J.id,(J,ot)=>{var _t=ob();_t.__click=[ib,yt,ot];var It=r(_t);sr(It,()=>e(ot).icon,(Xt,Kt)=>{Kt(Xt,{class:"w-4 h-4 mr-2"})});var Vt=n(It);K(()=>{ge(_t,1,`flex items-center px-4 py-3 text-sm font-medium border-b-2 transition-colors ${e(yt)===e(ot).id?"border-primary-500 text-primary-600 dark:text-primary-400":"border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"}`),y(Vt,` ${e(ot).label??""}`)}),m(J,_t)});var st=n(Lt,2),kt=r(st);{var G=J=>{var ot=nb(),_t=r(ot),It=r(_t);Nt(It,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var Vt=n(It,2),Xt=n(Vt,2),Kt=r(Xt),ee=n(_t,2),le=r(ee);Nt(le,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var qt=n(le,2),de=n(qt,2),ce=r(de),ae=n(ee,2),me=r(ae);Nt(me,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var pe=n(me,2),re=n(ae,2),ve=r(re);Nt(ve,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var Ce=n(ve,2),Me=n(re,2),Ot=r(Me);Nt(Ot,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var ie=n(Ot,2),fe=n(Me,2),he=r(fe);Nt(he,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var je=n(he,2),Ne=r(je);Ne.value=Ne.__value="index,follow";var Be=n(Ne);Be.value=Be.__value="index,nofollow";var De=n(Be);De.value=De.__value="noindex,follow";var _e=n(De);_e.value=_e.__value="noindex,nofollow",K(()=>{y(Kt,`${e(a).length??""}/60 characters`),y(ce,`${e(o).length??""}/160 characters`)}),Tt(Vt,()=>e(a),Se=>d(a,Se)),Tt(qt,()=>e(o),Se=>d(o,Se)),Tt(pe,()=>e(s),Se=>d(s,Se)),Tt(Ce,()=>e(c),Se=>d(c,Se)),Tt(ie,()=>e(l),Se=>d(l,Se)),cr(je,()=>e(v),Se=>d(v,Se)),m(J,ot)};O(kt,J=>{e(yt)==="basic"&&J(G)})}var Z=n(kt,2);{var W=J=>{var ot=db(),_t=ut(ot),It=r(_t),Vt=r(It);Nt(Vt,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var Xt=n(Vt,2),Kt=n(It,2),ee=r(Kt);Nt(ee,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var le=n(ee,2),qt=n(Kt,2),de=r(qt);Nt(de,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var ce=n(de,2),ae=n(qt,2),me=r(ae);Nt(me,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var pe=n(me,2),re=n(ae,2),ve=r(re);Nt(ve,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var Ce=n(ve,2),Me=n(re,2),Ot=r(Me);Nt(Ot,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var ie=n(Ot,2),fe=r(ie);fe.value=fe.__value="website";var he=n(fe);he.value=he.__value="article";var je=n(he);je.value=je.__value="product";var Ne=n(je);Ne.value=Ne.__value="profile";var Be=n(Ne);Be.value=Be.__value="video";var De=n(Be);De.value=De.__value="music";var _e=n(Me,2),Se=r(_e);Nt(Se,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var qe=n(Se,2),Ae=n(_e,2),Je=r(Ae);Nt(Je,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var Ze=n(Je,2),ur=n(_t,2);{var lr=Le=>{var Xe=sb(),Pr=n(r(Xe),2),mr=r(Pr),pr=r(mr);Nt(pr,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var ar=n(pr,2),ir=n(mr,2),fr=r(ir);Nt(fr,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var Ar=n(fr,2),kr=n(ir,2),Gr=r(kr);Nt(Gr,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var ra=n(Gr,2),Oe=n(kr,2),Br=r(Oe);Nt(Br,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var aa=n(Br,2),ja=n(Oe,2),ia=r(ja);Nt(ia,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var Na=n(ia,2);Tt(ar,()=>e(nt),xr=>d(nt,xr)),Tt(Ar,()=>e(ct),xr=>d(ct,xr)),Tt(ra,()=>e(vt),xr=>d(vt,xr)),Tt(aa,()=>e(Dt),xr=>d(Dt,xr)),Tt(Na,()=>e(Wt),xr=>d(Wt,xr)),m(Le,Xe)};O(ur,Le=>{e(x)==="article"&&Le(lr)})}Tt(Xt,()=>e(g),Le=>d(g,Le)),Tt(le,()=>e(u),Le=>d(u,Le)),Tt(ce,()=>e(p),Le=>d(p,Le)),Tt(pe,()=>e(h),Le=>d(h,Le)),Tt(Ce,()=>e(b),Le=>d(b,Le)),cr(ie,()=>e(x),Le=>d(x,Le)),Tt(qe,()=>e(w),Le=>d(w,Le)),Tt(Ze,()=>e(S),Le=>d(S,Le)),m(J,ot)};O(Z,J=>{e(yt)==="opengraph"&&J(W)})}var A=n(Z,2);{var I=J=>{var ot=lb(),_t=r(ot),It=r(_t);Nt(It,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var Vt=n(It,2),Xt=r(Vt);Xt.value=Xt.__value="summary";var Kt=n(Xt);Kt.value=Kt.__value="summary_large_image";var ee=n(Kt);ee.value=ee.__value="app";var le=n(ee);le.value=le.__value="player";var qt=n(_t,2),de=r(qt);Nt(de,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var ce=n(de,2),ae=n(qt,2),me=r(ae);Nt(me,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var pe=n(me,2),re=n(ae,2),ve=r(re);Nt(ve,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var Ce=n(ve,2),Me=n(re,2),Ot=r(Me);Nt(Ot,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var ie=n(Ot,2),fe=n(Me,2),he=r(fe);Nt(he,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var je=n(he,2),Ne=n(fe,2),Be=r(Ne);Nt(Be,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var De=n(Be,2);cr(Vt,()=>e(R),_e=>d(R,_e)),Tt(ce,()=>e(C),_e=>d(C,_e)),Tt(pe,()=>e(T),_e=>d(T,_e)),Tt(Ce,()=>e(E),_e=>d(E,_e)),Tt(ie,()=>e(_),_e=>d(_,_e)),Tt(je,()=>e(L),_e=>d(L,_e)),Tt(De,()=>e($),_e=>d($,_e)),m(J,ot)};O(A,J=>{e(yt)==="twitter"&&J(I)})}var N=n(A,2);{var it=J=>{var ot=cb(),_t=r(ot),It=r(_t);Nt(It,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var Vt=n(It,2),Xt=n(_t,2),Kt=r(Xt);Nt(Kt,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var ee=n(Kt,2),le=n(Xt,2),qt=r(le);Nt(qt,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var de=n(qt,2),ce=n(le,2),ae=r(ce);Nt(ae,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var me=n(ae,2);Tt(Vt,()=>e(H),pe=>d(H,pe)),Tt(ee,()=>e(Q),pe=>d(Q,pe)),Tt(de,()=>e(U),pe=>d(U,pe)),Tt(me,()=>e(lt),pe=>d(lt,pe)),m(J,ot)};O(N,J=>{e(yt)==="additional"&&J(it)})}var rt=n(N,2);{var Y=J=>{var ot=gb(),_t=r(ot),It=r(_t),Vt=n(_t,2);{var Xt=Kt=>{var ee=vb(),le=r(ee),qt=r(le);Nt(qt,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var de=n(qt,2),ce=r(de);ce.value=ce.__value="WebPage";var ae=n(ce);ae.value=ae.__value="Article";var me=n(ae);me.value=me.__value="Product";var pe=n(me);pe.value=pe.__value="Organization";var re=n(pe);re.value=re.__value="Person";var ve=n(re);ve.value=ve.__value="Recipe";var Ce=n(ve);Ce.value=Ce.__value="Event";var Me=n(le,2),Ot=r(Me);Nt(Ot,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var ie=n(Ot,2),fe=n(Me,2),he=r(fe);Nt(he,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var je=n(he,2),Ne=n(fe,2),Be=r(Ne);Nt(Be,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var De=n(Be,2),_e=n(Ne,2),Se=r(_e);Nt(Se,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var qe=n(Se,2);cr(de,()=>e(Qt),Ae=>d(Qt,Ae)),Tt(ie,()=>e(Jt),Ae=>d(Jt,Ae)),Tt(je,()=>e(zt),Ae=>d(zt,Ae)),Tt(De,()=>e(Ft),Ae=>d(Ft,Ae)),Tt(qe,()=>e(At),Ae=>d(At,Ae)),m(Kt,ee)};O(Vt,Kt=>{e(Yt)&&Kt(Xt)})}We(It,()=>e(Yt),Kt=>d(Yt,Kt)),m(J,ot)};O(rt,J=>{e(yt)==="jsonld"&&J(Y)})}var z=n(Pt,2),B=r(z);B.__click=[eb,a,o,s,c,l,v,x,w,S,R,L,$,H,Q,Yt,Qt,Jt,zt,Ft];var M=r(B);Tr(M,{class:"w-4 h-4 mr-2"});var D=n(B,2);D.__click=[tb,a,o,s,c,l,v,g,u,p,h,b,x,w,S,R,C,T,E,_,L,$,H,U,Q,mt,lt,nt,ct,vt,Dt,Wt,Yt,Qt,Jt,zt,Ft,At,Ct];var F=n(z,2),X=r(F),j=n(r(X),2),dt=r(j);dt.__click=[Xx,Ct,tt];var Mt=r(dt);be(Mt,{class:"w-4 h-4 mr-1"});var Gt=n(Mt),St=n(dt,2);St.__click=xt;var q=n(X,2),gt=r(q),$t=r(gt),Ht=r($t);K(()=>{dt.disabled=!e(Ct),y(Gt,` ${e(tt)?"Copied!":"Copy"}`),St.disabled=!e(Ct),y(Ht,e(Ct)||"Fill in the form above to generate meta tags...")}),m(i,ft),Bt()}ye(["click"]);function pb(i,t){const a=Math.max(...e(t).map(o=>o.id))+1;d(t,[...e(t),{id:a,x:0,y:4,blur:6,spread:-1,color:"#000000",opacity:20,inset:!1}],!0)}function fb(i,t){const a=Math.max(...e(t).map(o=>o.id))+1;d(t,[...e(t),{id:a,x:2,y:2,blur:4,color:"#000000",opacity:50}],!0)}function xb(i,t){d(t,e(t).map(a=>({...a,color:"#"+Math.floor(Math.random()*16777215).toString(16).padStart(6,"0")})),!0)}function bb(i,t,a,o,s,c,l,v,g){d(t,[{id:1,x:0,y:4,blur:6,spread:-1,color:"#000000",opacity:20,inset:!1}],!0),d(a,[{id:1,x:2,y:2,blur:4,color:"#000000",opacity:50}],!0),d(o,!0),d(s,!0),d(c,"#ffffff"),d(l,"#374151"),d(v,8),d(g,"Shadow Effect")}function yb(){Te("/tools")}var hb=k('<meta name="description" content="Generate beautiful CSS box-shadow and text-shadow effects with real-time preview"/>'),_b=(i,t)=>t("card"),kb=(i,t)=>t("button"),wb=(i,t)=>t("neon"),Cb=(i,t)=>t("inset"),$b=(i,t)=>d(t,"box"),Sb=(i,t)=>d(t,"text"),Tb=(i,t,a)=>t(e(a).id),Mb=k('<button class="text-red-500 hover:text-red-700 dark:hover:text-red-400"><!></button>'),Eb=k('<div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4"><div class="flex items-center justify-between mb-4"><h3 class="text-sm font-medium text-gray-900 dark:text-white"> </h3> <!></div> <div class="grid grid-cols-2 gap-4"><div><label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">X Offset</label> <input type="range" min="-50" max="50" class="w-full"/> <span class="text-xs text-gray-500 dark:text-gray-400"> </span></div> <div><label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Y Offset</label> <input type="range" min="-50" max="50" class="w-full"/> <span class="text-xs text-gray-500 dark:text-gray-400"> </span></div> <div><label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Blur</label> <input type="range" min="0" max="100" class="w-full"/> <span class="text-xs text-gray-500 dark:text-gray-400"> </span></div> <div><label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Spread</label> <input type="range" min="-50" max="50" class="w-full"/> <span class="text-xs text-gray-500 dark:text-gray-400"> </span></div> <div><label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Color</label> <div class="flex gap-2"><input type="color" class="w-12 h-8 rounded"/> <input type="text" class="flex-1 px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"/></div></div> <div><label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Opacity</label> <input type="range" min="0" max="100" class="w-full"/> <span class="text-xs text-gray-500 dark:text-gray-400"> </span></div></div> <div class="flex items-center mt-4"><input type="checkbox" class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"/> <label class="ml-2 text-sm text-gray-700 dark:text-gray-300">Inset Shadow</label></div></div>'),Lb=k('<div class="space-y-4"><!> <button class="w-full px-4 py-2 text-sm bg-primary-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center justify-center"><!> Add Shadow Layer</button></div>'),Pb=(i,t,a)=>t(e(a).id),Ab=k('<button class="text-red-500 hover:text-red-700 dark:hover:text-red-400"><!></button>'),Ib=k('<div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4"><div class="flex items-center justify-between mb-4"><h3 class="text-sm font-medium text-gray-900 dark:text-white"> </h3> <!></div> <div class="grid grid-cols-3 gap-4"><div><label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">X Offset</label> <input type="range" min="-50" max="50" class="w-full"/> <span class="text-xs text-gray-500 dark:text-gray-400"> </span></div> <div><label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Y Offset</label> <input type="range" min="-50" max="50" class="w-full"/> <span class="text-xs text-gray-500 dark:text-gray-400"> </span></div> <div><label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Blur</label> <input type="range" min="0" max="50" class="w-full"/> <span class="text-xs text-gray-500 dark:text-gray-400"> </span></div> <div class="col-span-3"><label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Color</label> <div class="flex gap-2"><input type="color" class="w-12 h-8 rounded"/> <input type="text" class="flex-1 px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"/> <input type="range" min="0" max="100" class="w-24"/> <span class="text-xs text-gray-500 dark:text-gray-400 w-12"> </span></div></div></div></div>'),jb=k('<div class="space-y-4"><!> <button class="w-full px-4 py-2 text-sm bg-primary-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center justify-center"><!> Add Text Shadow Layer</button></div>'),Nb=k('<h3 class="text-2xl font-bold transition-all duration-200"> </h3>'),Rb=k('<div class="p-8 rounded-lg transition-all duration-200"><!></div>'),Bb=k('<h3 class="text-2xl font-bold transition-all duration-200"> </h3>'),Db=(i,t,a)=>t(`box-shadow: ${e(a)};`),Fb=(i,t,a)=>t(`text-shadow: ${e(a)};`),Hb=k('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-400 to-gray-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">CSS Shadow Generator</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Create beautiful box-shadow and text-shadow effects with real-time preview</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">CSS Shadow Generator</li></ol></nav> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-6"><div class="p-6"><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Presets</h2> <div class="flex flex-wrap gap-2"><button class="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">Card Shadow</button> <button class="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">Button Shadow</button> <button class="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">Neon Effect</button> <button class="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">Inset Shadow</button> <button class="px-3 py-1.5 text-sm bg-primary-100 dark:bg-primary-900/20 text-purple-700 dark:text-purple-400 rounded hover:bg-purple-200 dark:hover:bg-purple-900/30 transition-colors">🎨 Random Color</button> <button class="px-3 py-1.5 text-sm bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors">Reset All</button></div></div></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div class="space-y-6"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="flex"><button>Box Shadow</button> <button>Text Shadow</button></div> <div class="p-6"><!> <!></div></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Preview Settings</h2> <div class="space-y-4"><div class="grid grid-cols-2 gap-4"><div><label for="background-color" class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Background</label> <input id="background-color" type="color" class="w-full h-8 rounded"/></div> <div><label for="text-color" class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Text Color</label> <input id="text-color" type="color" class="w-full h-8 rounded"/></div></div> <div><label for="border-radius" class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"> </label> <input id="border-radius" type="range" min="0" max="50" class="w-full"/></div> <div><label for="preview-text" class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Preview Text</label> <input id="preview-text" type="text" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"/></div> <div class="flex items-center gap-4"><label class="flex items-center"><input type="checkbox" class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"/> <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Show Box</span></label> <label class="flex items-center"><input type="checkbox" class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"/> <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Show Text</span></label></div></div></div></div> <div class="space-y-6"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Live Preview</h2> <div class="p-8 rounded-lg flex items-center justify-center min-h-[200px] transition-all duration-200"><!></div></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">CSS Code</h2> <div class="flex gap-2"><button class="flex items-center px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"><!> </button> <button class="flex items-center px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"><!> </button> <button class="flex items-center px-3 py-1.5 text-sm bg-primary-600 text-white rounded hover:bg-blue-700 transition-colors"><!> Download</button></div></div> <div class="p-6 space-y-4"><div><h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Box Shadow</h3> <pre class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm text-gray-700 dark:text-gray-300"><code> </code></pre></div> <div><h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Text Shadow</h3> <pre class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm text-gray-700 dark:text-gray-300"><code> </code></pre></div></div></div></div></div></div>');function Ob(i,t){Rt(t,!0);let a=f(Pe([{id:1,x:0,y:4,blur:6,spread:-1,color:"#000000",opacity:20,inset:!1}])),o=f(Pe([{id:1,x:2,y:2,blur:4,color:"#000000",opacity:50}])),s=f(!0),c=f(!0),l=f("#ffffff"),v=f("#374151"),g=f(8),u=f("Shadow Effect"),p=f("box"),h=f(!1);const b=ue(()=>()=>e(a).map(qt=>{const de=qt.color+Math.round(qt.opacity*2.55).toString(16).padStart(2,"0"),ce=[qt.x+"px",qt.y+"px",qt.blur+"px"];return qt.spread!==0&&ce.push(qt.spread+"px"),qt.inset&&ce.push("inset"),`${ce.join(" ")} ${de}`}).join(", ")),x=ue(()=>()=>e(o).map(qt=>{const de=qt.color+Math.round(qt.opacity*2.55).toString(16).padStart(2,"0");return`${qt.x}px ${qt.y}px ${qt.blur}px ${de}`}).join(", "));function w(qt){e(a).length>1&&d(a,e(a).filter(de=>de.id!==qt),!0)}function S(qt){e(o).length>1&&d(o,e(o).filter(de=>de.id!==qt),!0)}function R(qt){navigator.clipboard.writeText(qt).then(()=>{d(h,!0),setTimeout(()=>{d(h,!1)},2e3)})}function C(){const qt=`/* CSS Shadow Generator Output */

/* Box Shadow */
.box-shadow {
  box-shadow: ${e(b)};
}

/* Text Shadow */
.text-shadow {
  text-shadow: ${e(x)};
}`,de=new Blob([qt],{type:"text/css"}),ce=URL.createObjectURL(de),ae=document.createElement("a");ae.href=ce,ae.download="shadows.css",document.body.appendChild(ae),ae.click(),document.body.removeChild(ae),URL.revokeObjectURL(ce)}function T(qt){switch(qt){case"card":d(a,[{id:1,x:0,y:10,blur:15,spread:-3,color:"#000000",opacity:10,inset:!1}],!0),d(g,12);break;case"button":d(a,[{id:1,x:0,y:4,blur:6,spread:-2,color:"#000000",opacity:15,inset:!1},{id:2,x:0,y:1,blur:2,spread:0,color:"#000000",opacity:10,inset:!1}],!0),d(g,6);break;case"neon":d(a,[{id:1,x:0,y:0,blur:20,spread:0,color:"#3b82f6",opacity:60,inset:!1},{id:2,x:0,y:0,blur:40,spread:0,color:"#3b82f6",opacity:40,inset:!1}],!0),d(o,[{id:1,x:0,y:0,blur:10,color:"#3b82f6",opacity:80}],!0);break;case"inset":d(a,[{id:1,x:2,y:2,blur:4,spread:0,color:"#000000",opacity:15,inset:!0}],!0);break}}var E=Hb();Er(qt=>{var de=hb();_r.title="CSS Shadow Generator - Developer Tools",m(qt,de)});var _=r(E),L=r(_),$=r(L);$.__click=[yb];var H=r($);Ie(H,{class:"w-5 h-5"});var U=n(L,2),Q=r(U),mt=r(Q);R0(mt,{class:"w-10 h-10 text-white"});var lt=n(_,4),nt=r(lt),ct=n(r(nt),2),vt=r(ct);vt.__click=[_b,T];var Dt=n(vt,2);Dt.__click=[kb,T];var Wt=n(Dt,2);Wt.__click=[wb,T];var Yt=n(Wt,2);Yt.__click=[Cb,T];var Qt=n(Yt,2);Qt.__click=[xb,a];var Jt=n(Qt,2);Jt.__click=[bb,a,o,s,c,l,v,g,u];var zt=n(lt,2),Ft=r(zt),At=r(Ft),Ct=r(At),tt=r(Ct);tt.__click=[$b,p];var yt=n(tt,2);yt.__click=[Sb,p];var pt=n(Ct,2),at=r(pt);{var P=qt=>{var de=Lb(),ce=r(de);xe(ce,19,()=>e(a),pe=>pe.id,(pe,re,ve)=>{var Ce=Eb(),Me=r(Ce),Ot=r(Me),ie=r(Ot),fe=n(Ot,2);{var he=Ge=>{var ti=Mb();ti.__click=[Tb,w,re];var Yi=r(ti);ui(Yi,{class:"w-4 h-4"}),m(Ge,ti)};O(fe,Ge=>{e(a).length>1&&Ge(he)})}var je=n(Me,2),Ne=r(je),Be=r(Ne),De=n(Be,2),_e=n(De,2),Se=r(_e),qe=n(Ne,2),Ae=r(qe),Je=n(Ae,2),Ze=n(Je,2),ur=r(Ze),lr=n(qe,2),Le=r(lr),Xe=n(Le,2),Pr=n(Xe,2),mr=r(Pr),pr=n(lr,2),ar=r(pr),ir=n(ar,2),fr=n(ir,2),Ar=r(fr),kr=n(pr,2),Gr=r(kr),ra=n(Gr,2),Oe=r(ra),Br=n(Oe,2),aa=n(kr,2),ja=r(aa),ia=n(ja,2),Na=n(ia,2),xr=r(Na),Ji=n(je,2),Ra=r(Ji),Vi=n(Ra,2);K(()=>{y(ie,`Shadow ${e(ve)+1}`),Nt(Be,"for",`xoffset-${e(ve)??""}`),Nt(De,"id",`xoffset-${e(ve)??""}`),y(Se,`${e(re).x??""}px`),Nt(Ae,"for",`box-yoffset-${e(ve)??""}`),Nt(Je,"id",`box-yoffset-${e(ve)??""}`),y(ur,`${e(re).y??""}px`),Nt(Le,"for",`box-blur-${e(ve)??""}`),Nt(Xe,"id",`box-blur-${e(ve)??""}`),y(mr,`${e(re).blur??""}px`),Nt(ar,"for",`box-spread-${e(ve)??""}`),Nt(ir,"id",`box-spread-${e(ve)??""}`),y(Ar,`${e(re).spread??""}px`),Nt(Gr,"for",`box-color-${e(ve)??""}`),Nt(Oe,"id",`box-color-${e(ve)??""}`),Nt(ja,"for",`box-opacity-${e(ve)??""}`),Nt(ia,"id",`box-opacity-${e(ve)??""}`),y(xr,`${e(re).opacity??""}%`),Nt(Ra,"id",`box-inset-${e(ve)??""}`),Nt(Vi,"for",`box-inset-${e(ve)??""}`)}),Tt(De,()=>e(re).x,Ge=>e(re).x=Ge),Tt(Je,()=>e(re).y,Ge=>e(re).y=Ge),Tt(Xe,()=>e(re).blur,Ge=>e(re).blur=Ge),Tt(ir,()=>e(re).spread,Ge=>e(re).spread=Ge),Tt(Oe,()=>e(re).color,Ge=>e(re).color=Ge),Tt(Br,()=>e(re).color,Ge=>e(re).color=Ge),Tt(ia,()=>e(re).opacity,Ge=>e(re).opacity=Ge),We(Ra,()=>e(re).inset,Ge=>e(re).inset=Ge),m(pe,Ce)});var ae=n(ce,2);ae.__click=[pb,a];var me=r(ae);Ii(me,{class:"w-4 h-4 mr-2"}),m(qt,de)};O(at,qt=>{e(p)==="box"&&qt(P)})}var xt=n(at,2);{var ft=qt=>{var de=jb(),ce=r(de);xe(ce,19,()=>e(o),pe=>pe.id,(pe,re,ve)=>{var Ce=Ib(),Me=r(Ce),Ot=r(Me),ie=r(Ot),fe=n(Ot,2);{var he=Oe=>{var Br=Ab();Br.__click=[Pb,S,re];var aa=r(Br);ui(aa,{class:"w-4 h-4"}),m(Oe,Br)};O(fe,Oe=>{e(o).length>1&&Oe(he)})}var je=n(Me,2),Ne=r(je),Be=r(Ne),De=n(Be,2),_e=n(De,2),Se=r(_e),qe=n(Ne,2),Ae=r(qe),Je=n(Ae,2),Ze=n(Je,2),ur=r(Ze),lr=n(qe,2),Le=r(lr),Xe=n(Le,2),Pr=n(Xe,2),mr=r(Pr),pr=n(lr,2),ar=r(pr),ir=n(ar,2),fr=r(ir),Ar=n(fr,2),kr=n(Ar,2),Gr=n(kr,2),ra=r(Gr);K(()=>{y(ie,`Text Shadow ${e(ve)+1}`),Nt(Be,"for",`text-xoffset-${e(ve)??""}`),Nt(De,"id",`text-xoffset-${e(ve)??""}`),y(Se,`${e(re).x??""}px`),Nt(Ae,"for",`text-yoffset-${e(ve)??""}`),Nt(Je,"id",`text-yoffset-${e(ve)??""}`),y(ur,`${e(re).y??""}px`),Nt(Le,"for",`text-blur-${e(ve)??""}`),Nt(Xe,"id",`text-blur-${e(ve)??""}`),y(mr,`${e(re).blur??""}px`),Nt(ar,"for",`text-color-${e(ve)??""}`),Nt(fr,"id",`text-color-${e(ve)??""}`),y(ra,`${e(re).opacity??""}%`)}),Tt(De,()=>e(re).x,Oe=>e(re).x=Oe),Tt(Je,()=>e(re).y,Oe=>e(re).y=Oe),Tt(Xe,()=>e(re).blur,Oe=>e(re).blur=Oe),Tt(fr,()=>e(re).color,Oe=>e(re).color=Oe),Tt(Ar,()=>e(re).color,Oe=>e(re).color=Oe),Tt(kr,()=>e(re).opacity,Oe=>e(re).opacity=Oe),m(pe,Ce)});var ae=n(ce,2);ae.__click=[fb,o];var me=r(ae);Ii(me,{class:"w-4 h-4 mr-2"}),m(qt,de)};O(xt,qt=>{e(p)==="text"&&qt(ft)})}var V=n(At,2),et=n(r(V),2),ht=r(et),bt=r(ht),wt=n(r(bt),2),Ut=n(bt,2),jt=n(r(Ut),2),Pt=n(ht,2),Lt=r(Pt),st=r(Lt),kt=n(Lt,2),G=n(Pt,2),Z=n(r(G),2),W=n(G,2),A=r(W),I=r(A),N=n(A,2),it=r(N),rt=n(Ft,2),Y=r(rt),z=n(r(Y),2),B=r(z);{var M=qt=>{var de=Rb(),ce=r(de);{var ae=me=>{var pe=Nb(),re=r(pe);K(()=>{Qe(pe,`color: ${e(v)??""}; text-shadow: ${e(x)??""};`),y(re,e(u))}),m(me,pe)};O(ce,me=>{e(s)&&me(ae)})}K(()=>Qe(de,`box-shadow: ${e(b)??""}; border-radius: ${e(g)??""}px; background: white;`)),m(qt,de)},D=qt=>{var de=Et(),ce=ut(de);{var ae=me=>{var pe=Bb(),re=r(pe);K(()=>{Qe(pe,`color: ${e(v)??""}; text-shadow: ${e(x)??""};`),y(re,e(u))}),m(me,pe)};O(ce,me=>{e(s)&&me(ae)},!0)}m(qt,de)};O(B,qt=>{e(c)?qt(M):qt(D,!1)})}var F=n(Y,2),X=r(F),j=n(r(X),2),dt=r(j);dt.__click=[Db,R,b];var Mt=r(dt);be(Mt,{class:"w-4 h-4 mr-1"});var Gt=n(Mt),St=n(dt,2);St.__click=[Fb,R,x];var q=r(St);be(q,{class:"w-4 h-4 mr-1"});var gt=n(q),$t=n(St,2);$t.__click=C;var Ht=r($t);Xa(Ht,{class:"w-4 h-4 mr-1"});var J=n(X,2),ot=r(J),_t=n(r(ot),2),It=r(_t),Vt=r(It),Xt=n(ot,2),Kt=n(r(Xt),2),ee=r(Kt),le=r(ee);K(()=>{ge(tt,1,`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${e(p)==="box"?"border-primary-500 text-primary-600 dark:text-primary-400 bg-blue-50 dark:bg-blue-900/10":"border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"}`),ge(yt,1,`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${e(p)==="text"?"border-primary-500 text-primary-600 dark:text-primary-400 bg-blue-50 dark:bg-blue-900/10":"border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"}`),y(st,`Border Radius: ${e(g)??""}px`),Qe(z,`background-color: ${e(l)??""};`),y(Gt,` ${e(h)?"Copied!":"Copy Box"}`),y(gt,` ${e(h)?"Copied!":"Copy Text"}`),y(Vt,`box-shadow: ${e(b)??""};`),y(le,`text-shadow: ${e(x)??""};`)}),Tt(wt,()=>e(l),qt=>d(l,qt)),Tt(jt,()=>e(v),qt=>d(v,qt)),Tt(kt,()=>e(g),qt=>d(g,qt)),Tt(Z,()=>e(u),qt=>d(u,qt)),We(I,()=>e(c),qt=>d(c,qt)),We(it,()=>e(s),qt=>d(s,qt)),m(i,E),Bt()}ye(["click"]);function Ub(i,t,a,o,s){const c=e(t);d(t,e(a),!0),d(a,c,!0);const l=e(o);d(o,e(s),!0),d(s,l,!0)}function zb(i,t,a){e(t)&&navigator.clipboard.writeText(e(t)).then(()=>{ze.success("Copied result to clipboard"),a()})}function xs(i,t){d(t,[],!0),ze.success("Cleared history")}function qb(){Te("/tools")}var Gb=(i,t,a,o)=>{d(t,e(a).id,!0),o()},Wb=k('<button><!> <span class="text-sm font-medium"> </span></button>'),Jb=k("<option> </option>"),Vb=k("<option> </option>"),Yb=k('<div class="bg-primary-100 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-xl p-4"><h3 class="text-sm font-medium text-primary-800 dark:text-primary-200 mb-2">Conversion Formulas</h3> <div class="space-y-1 text-xs text-primary-700 dark:text-primary-300"><p>°C to °F: (°C × 9/5) + 32</p> <p>°F to °C: (°F - 32) × 5/9</p> <p>°C to K: °C + 273.15</p> <p>K to °C: K - 273.15</p></div></div>'),Kb=k('<div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 inch = 2.54 cm</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 foot = 12 inches</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 mile = 1.609 km</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 yard = 0.914 m</p></div>',1),Qb=k('<div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 kg = 2.205 lbs</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 lb = 16 oz</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 ton = 1000 kg</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 stone = 14 lbs</p></div>',1),Zb=k('<div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 gallon = 3.785 L</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 L = 1000 mL</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 cup = 236.6 mL</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 quart = 2 pints</p></div>',1),Xb=k('<div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 minute = 60 seconds</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 hour = 60 minutes</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 day = 24 hours</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 week = 7 days</p></div>',1),ty=k('<div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">100 km/h = 27.78 m/s</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">60 mph = 96.56 km/h</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 knot = 1.852 km/h</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">Mach 1 = 343 m/s</p></div>',1),ey=k('<button class="btn btn-primary btn-sm text-red-500 hover:text-red-600">Clear</button>'),ry=k('<div class="flex flex-col items-center justify-center py-8 text-gray-500 dark:text-gray-400"><!> <p class="text-sm">No conversions yet</p></div>'),ay=(i,t,a)=>t(e(a)),iy=k('<button class="w-full text-left p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"><div class="text-sm font-medium text-gray-900 dark:text-white"> </div> <div class="text-sm text-gray-600 dark:text-gray-400"> </div> <div class="text-xs text-gray-500 dark:text-gray-500 mt-1"> </div></button>'),oy=k('<div class="space-y-2 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar"></div>'),ny=k('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="btn btn-primary"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Unit Converter</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Convert between different units of measurement with precision.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Unit Converter</li></ol></nav> <div class="mb-6 flex justify-center flex-wrap gap-2"><button class="btn btn-primary btn-sm"><!> Reset</button> <button class="btn btn-primary btn-sm text-red-500 hover:text-red-600 hover:border-red-200"><!> Clear History</button></div> <div class="mb-6 overflow-x-auto pb-2"><div class="flex gap-3 min-w-max"></div></div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-2 space-y-6"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center"><!> </h2> <div class="space-y-6"><div><label for="from-value-input" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">From</label> <div class="grid grid-cols-1 md:grid-cols-2 gap-3"><input id="from-value-input" type="number" placeholder="Enter value" class="input text-lg"/> <select class="select"></select></div></div> <div class="flex justify-center"><button class="btn btn-primary btn-sm rounded-full"><!></button></div> <div><label for="to-value-input" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">To</label> <div class="grid grid-cols-1 md:grid-cols-2 gap-3"><div class="relative"><input id="to-value-input" type="text" readonly="" placeholder="Result" class="input text-lg font-medium pr-12"/> <button class="absolute right-3 top-1/2 -translate-y-1/2 btn btn-primary btn-sm" title="Copy result"><!></button></div> <select class="select"></select></div></div> <!></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Reference</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm"><!></div></div></div> <div class="space-y-6"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 sticky top-6"><div class="flex items-center justify-between mb-4"><h3 class="text-lg font-semibold text-gray-900 dark:text-white">History</h3> <!></div> <!></div></div></div> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"><div class="flex items-center gap-2 mb-2 text-primary-600 dark:text-primary-400"><!> <h3 class="font-medium">Precision</h3></div> <p class="text-sm text-gray-600 dark:text-gray-400">High-precision calculations for accurate results every time</p></div> <div class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"><div class="flex items-center gap-2 mb-2 text-primary-600 dark:text-primary-400"><!> <h3 class="font-medium">History</h3></div> <p class="text-sm text-gray-600 dark:text-gray-400">Automatically saves your recent conversions for quick reference</p></div> <div class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"><div class="flex items-center gap-2 mb-2 text-primary-600 dark:text-primary-400"><!> <h3 class="font-medium">Fast</h3></div> <p class="text-sm text-gray-600 dark:text-gray-400">Instant conversion as you type with no page reloads</p></div></div></div>');function sy(i,t){Rt(t,!0);const a=[{id:"length",name:"Length",icon:Y0,color:"blue"},{id:"weight",name:"Weight",icon:dc,color:"green"},{id:"temperature",name:"Temperature",icon:tc,color:"red"},{id:"volume",name:"Volume",icon:sc,color:"purple"},{id:"time",name:"Time",icon:ka,color:"yellow"},{id:"speed",name:"Speed",icon:Ve,color:"orange"}],o={length:{meter:1,kilometer:.001,centimeter:100,millimeter:1e3,mile:621371e-9,yard:1.09361,foot:3.28084,inch:39.3701,nauticalMile:539957e-9},weight:{kilogram:1,gram:1e3,milligram:1e6,pound:2.20462,ounce:35.274,ton:.001,stone:.157473},temperature:{celsius:"celsius",fahrenheit:"fahrenheit",kelvin:"kelvin"},volume:{liter:1,milliliter:1e3,gallon:.264172,quart:1.05669,pint:2.11338,cup:4.22675,fluidOunce:33.814,cubicMeter:.001},time:{second:1,millisecond:1e3,microsecond:1e6,minute:1/60,hour:1/3600,day:1/86400,week:1/604800,month:1/2592e3,year:1/31536e3},speed:{meterPerSecond:1,kilometerPerHour:3.6,milePerHour:2.23694,knot:1.94384,footPerSecond:3.28084,mach:.00291545}},s={length:{meter:"Meter (m)",kilometer:"Kilometer (km)",centimeter:"Centimeter (cm)",millimeter:"Millimeter (mm)",mile:"Mile (mi)",yard:"Yard (yd)",foot:"Foot (ft)",inch:"Inch (in)",nauticalMile:"Nautical Mile (nm)"},weight:{kilogram:"Kilogram (kg)",gram:"Gram (g)",milligram:"Milligram (mg)",pound:"Pound (lb)",ounce:"Ounce (oz)",ton:"Ton (t)",stone:"Stone (st)"},temperature:{celsius:"Celsius (°C)",fahrenheit:"Fahrenheit (°F)",kelvin:"Kelvin (K)"},volume:{liter:"Liter (L)",milliliter:"Milliliter (mL)",gallon:"Gallon (gal)",quart:"Quart (qt)",pint:"Pint (pt)",cup:"Cup (cup)",fluidOunce:"Fluid Ounce (fl oz)",cubicMeter:"Cubic Meter (m³)"},time:{second:"Second (s)",millisecond:"Millisecond (ms)",microsecond:"Microsecond (μs)",minute:"Minute (min)",hour:"Hour (hr)",day:"Day (d)",week:"Week (wk)",month:"Month (mo)",year:"Year (yr)"},speed:{meterPerSecond:"Meter/Second (m/s)",kilometerPerHour:"Kilometer/Hour (km/h)",milePerHour:"Mile/Hour (mph)",knot:"Knot (kn)",footPerSecond:"Foot/Second (ft/s)",mach:"Mach"}};let c=f("length"),l=f("1"),v=f("meter"),g=f("kilometer"),u=f(""),p=f(Pe([]));const h=ue(()=>Object.keys(o[e(c)])),b=ue(()=>e(h).map(q=>({value:q,label:s[e(c)][q]})));ke(()=>{if(e(l)&&!isNaN(parseFloat(e(l)))){const q=parseFloat(e(l));let gt;if(e(c)==="temperature")gt=x(q,e(v),e(g));else{const $t=o[e(c)];gt=q/$t[e(v)]*$t[e(g)]}d(u,gt.toFixed(6).replace(/\.?0+$/,""),!0)}else d(u,"")});function x(q,gt,$t){let Ht;switch(gt){case"celsius":Ht=q;break;case"fahrenheit":Ht=(q-32)*5/9;break;case"kelvin":Ht=q-273.15;break;default:throw new Error(`Unknown temperature unit: ${gt}`)}switch($t){case"celsius":return Ht;case"fahrenheit":return Ht*9/5+32;case"kelvin":return Ht+273.15;default:throw new Error(`Unknown temperature unit: ${$t}`)}}function w(){const q=s[e(c)],gt=q[e(v)],$t=q[e(g)],Ht={from:`${e(l)} ${gt}`,to:`${e(u)} ${$t}`,category:e(c),timestamp:new Date};e(p).length>0&&e(p)[0].from===Ht.from&&e(p)[0].to===Ht.to||d(p,[Ht,...e(p).slice(0,9)],!0)}function S(q){d(l,q.from.split(" ")[0],!0),d(c,q.category,!0);const gt=Object.keys(o[q.category]);d(v,gt[0],!0),d(g,gt[1],!0)}function R(){d(l,"1"),d(u,"");const q=Object.keys(o[e(c)]);d(v,q[0],!0),d(g,q[1],!0),ze.success("Reset converter")}var C=ny(),T=r(C),E=r(T),_=r(E);_.__click=[qb];var L=r(_);Ie(L,{class:"w-5 h-5 mr-2"});var $=n(E,2),H=r($),U=r(H);Nr(U,{class:"w-10 h-10 text-white"});var Q=n(T,4),mt=r(Q);mt.__click=R;var lt=r(mt);Gi(lt,{class:"w-4 h-4 mr-2"});var nt=n(mt,2);nt.__click=[xs,p];var ct=r(nt);Wi(ct,{class:"w-4 h-4 mr-2"});var vt=n(Q,2),Dt=r(vt);xe(Dt,21,()=>a,q=>q.id,(q,gt)=>{var $t=Wb();$t.__click=[Gb,c,gt,R];var Ht=r($t);sr(Ht,()=>e(gt).icon,(_t,It)=>{It(_t,{class:"w-4 h-4"})});var J=n(Ht,2),ot=r(J);K(()=>{ge($t,1,`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-200 ${e(c)===e(gt).id?"border-primary-500 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300":"border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600"}`),y(ot,e(gt).name)}),m(q,$t)});var Wt=n(vt,2),Yt=r(Wt),Qt=r(Yt),Jt=r(Qt),zt=r(Jt);Nr(zt,{class:"w-5 h-5 mr-2 text-primary-500"});var Ft=n(zt),At=n(Jt,2),Ct=r(At),tt=n(r(Ct),2),yt=r(tt),pt=n(yt,2);xe(pt,21,()=>e(b),q=>q.value,(q,gt)=>{var $t=Jb(),Ht=r($t),J={};K(()=>{y(Ht,e(gt).label),J!==(J=e(gt).value)&&($t.value=($t.__value=e(gt).value)??"")}),m(q,$t)});var at=n(Ct,2),P=r(at);P.__click=[Ub,v,g,l,u];var xt=r(P);N0(xt,{class:"w-5 h-5"});var ft=n(at,2),V=n(r(ft),2),et=r(V),ht=r(et),bt=n(ht,2);bt.__click=[zb,u,w];var wt=r(bt);be(wt,{class:"w-4 h-4"});var Ut=n(et,2);xe(Ut,21,()=>e(b),q=>q.value,(q,gt)=>{var $t=Vb(),Ht=r($t),J={};K(()=>{y(Ht,e(gt).label),J!==(J=e(gt).value)&&($t.value=($t.__value=e(gt).value)??"")}),m(q,$t)});var jt=n(ft,2);{var Pt=q=>{var gt=Yb();m(q,gt)};O(jt,q=>{e(c)==="temperature"&&q(Pt)})}var Lt=n(Qt,2),st=n(r(Lt),2),kt=r(st);{var G=q=>{var gt=Kb();m(q,gt)},Z=q=>{var gt=Et(),$t=ut(gt);{var Ht=ot=>{var _t=Qb();m(ot,_t)},J=ot=>{var _t=Et(),It=ut(_t);{var Vt=Kt=>{var ee=Zb();m(Kt,ee)},Xt=Kt=>{var ee=Et(),le=ut(ee);{var qt=ce=>{var ae=Xb();m(ce,ae)},de=ce=>{var ae=Et(),me=ut(ae);{var pe=re=>{var ve=ty();m(re,ve)};O(me,re=>{e(c)==="speed"&&re(pe)},!0)}m(ce,ae)};O(le,ce=>{e(c)==="time"?ce(qt):ce(de,!1)},!0)}m(Kt,ee)};O(It,Kt=>{e(c)==="volume"?Kt(Vt):Kt(Xt,!1)},!0)}m(ot,_t)};O($t,ot=>{e(c)==="weight"?ot(Ht):ot(J,!1)},!0)}m(q,gt)};O(kt,q=>{e(c)==="length"?q(G):q(Z,!1)})}var W=n(Yt,2),A=r(W),I=r(A),N=n(r(I),2);{var it=q=>{var gt=ey();gt.__click=[xs,p],m(q,gt)};O(N,q=>{e(p).length>0&&q(it)})}var rt=n(I,2);{var Y=q=>{var gt=ry(),$t=r(gt);Ka($t,{class:"w-8 h-8 mb-2 opacity-50"}),m(q,gt)},z=q=>{var gt=oy();xe(gt,21,()=>e(p),$t=>$t.timestamp,($t,Ht)=>{var J=iy();J.__click=[ay,S,Ht];var ot=r(J),_t=r(ot),It=n(ot,2),Vt=r(It),Xt=n(It,2),Kt=r(Xt);K(ee=>{y(_t,e(Ht).from),y(Vt,`→ ${e(Ht).to??""}`),y(Kt,ee)},[()=>e(Ht).timestamp.toLocaleTimeString()]),m($t,J)}),m(q,gt)};O(rt,q=>{e(p).length===0?q(Y):q(z,!1)})}var B=n(Wt,2),M=r(B),D=r(M),F=r(D);Nr(F,{class:"w-5 h-5"});var X=n(M,2),j=r(X),dt=r(j);Ka(dt,{class:"w-5 h-5"});var Mt=n(X,2),Gt=r(Mt),St=r(Gt);Ve(St,{class:"w-5 h-5"}),K(q=>y(Ft,` Convert ${q??""}`),[()=>a.find(q=>q.id===e(c))?.name]),Tt(yt,()=>e(l),q=>d(l,q)),cr(pt,()=>e(v),q=>d(v,q)),Tt(ht,()=>e(u),q=>d(u,q)),cr(Ut,()=>e(g),q=>d(g,q)),m(i,C),Bt()}ye(["click"]);function dy(){Te("/tools")}var ly=k('<meta name="description" content="Calculate percentages, discounts, tips, and percentage differences with ease"/>'),cy=(i,t,a,o)=>{d(t,e(a).id,!0),o()},vy=k('<button><!> <h3 class="font-medium text-gray-900 dark:text-white mb-1"> </h3> <p class="text-sm text-gray-600 dark:text-gray-400"> </p></button>'),gy=k("<!> ",1),uy=(i,t,a)=>t(e(a)),my=(i,t,a)=>t(a.toString()),py=k('<button class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"> </button>'),fy=(i,t,a)=>t(e(a)),xy=k('<div class="p-4 bg-primary-100 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg"><div class="flex items-center justify-between"><div><p class="text-sm text-primary-600 dark:text-primary-400 mb-1">Result</p> <p class="text-2xl font-bold text-primary-700 dark:text-primary-300"> </p></div> <button class="p-2 text-primary-600 dark:text-primary-400 hover:text-blue-700 dark:hover:text-blue-300"><!></button></div></div>'),by=k('<div class="space-y-6"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">What is <input type="number" class="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded mx-2"/>% of <input type="number" class="w-24 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded mx-2"/>?</label></div> <div class="flex flex-wrap gap-2"><span class="text-sm text-gray-600 dark:text-gray-400">Quick:</span> <!></div> <!></div>'),yy=(i,t,a)=>t(e(a)),hy=k('<div class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"><div class="flex items-center justify-between"><div><p class="text-sm text-primary-600 dark:text-primary-400 mb-1">New Value</p> <p class="text-2xl font-bold text-green-700 dark:text-green-300"> </p> <p class="text-sm text-primary-600 dark:text-primary-400 mt-1"> </p></div> <button class="p-2 text-primary-600 dark:text-primary-400 hover:text-green-700 dark:hover:text-green-300"><!></button></div></div>'),_y=k('<div class="space-y-6"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Increase <input type="number" class="w-24 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded mx-2"/> by <input type="number" class="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded mx-2"/>%</label></div> <!></div>'),ky=(i,t,a)=>t(e(a)),wy=k('<div class="p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg"><div class="flex items-center justify-between"><div><p class="text-sm text-orange-600 dark:text-orange-400 mb-1">New Value</p> <p class="text-2xl font-bold text-orange-700 dark:text-orange-300"> </p> <p class="text-sm text-orange-600 dark:text-orange-400 mt-1"> </p></div> <button class="p-2 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300"><!></button></div></div>'),Cy=k('<div class="space-y-6"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Decrease <input type="number" class="w-24 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded mx-2"/> by <input type="number" class="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded mx-2"/>%</label></div> <!></div>'),$y=(i,t,a)=>t(e(a)+"%"),Sy=k('<div class="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg"><div class="flex items-center justify-between"><div><p class="text-sm text-primary-600 dark:text-primary-400 mb-1">Percentage Difference</p> <p class="text-2xl font-bold text-purple-700 dark:text-purple-300"> </p></div> <button class="p-2 text-primary-600 dark:text-primary-400 hover:text-purple-700 dark:hover:text-purple-300"><!></button></div></div>'),Ty=k('<div class="space-y-6"><div class="grid grid-cols-2 gap-4"><div><label for="first-value" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Value</label> <input id="first-value" type="number" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"/></div> <div><label for="second-value" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Second Value</label> <input id="second-value" type="number" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"/></div></div> <!></div>'),My=(i,t,a)=>t(e(a)),Ey=k('<div class="space-y-4"><div class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"><div class="flex items-center justify-between"><div><p class="text-sm text-red-600 dark:text-red-400 mb-1">Final Price</p> <p class="text-2xl font-bold text-red-700 dark:text-red-300"> </p></div> <button class="p-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"><!></button></div></div> <div class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"><p class="text-sm text-primary-600 dark:text-primary-400 mb-1">You Save</p> <p class="text-xl font-bold text-green-700 dark:text-green-300"> </p></div></div>'),Ly=k('<div class="space-y-6"><div class="grid grid-cols-2 gap-4"><div><label for="original-price" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Original Price</label> <div class="relative"><span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span> <input id="original-price" type="number" class="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"/></div></div> <div><label for="discount-percent" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Discount (%)</label> <input id="discount-percent" type="number" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"/></div></div> <!></div>'),Py=(i,t,a)=>t(a.toString()),Ay=k('<button class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"> </button>'),Iy=(i,t,a)=>t(e(a)),jy=k('<div class="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg"><div class="flex items-center justify-between"><div><p class="text-sm text-primary-600 dark:text-primary-400 mb-1">Per Person</p> <p class="text-2xl font-bold text-purple-700 dark:text-purple-300"> </p></div> <button class="p-2 text-primary-600 dark:text-primary-400 hover:text-purple-700 dark:hover:text-purple-300"><!></button></div></div>'),Ny=k('<div class="space-y-4"><div class="grid grid-cols-2 gap-4"><div class="p-4 bg-primary-100 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg"><p class="text-sm text-primary-600 dark:text-primary-400 mb-1">Tip Amount</p> <p class="text-xl font-bold text-primary-700 dark:text-primary-300"> </p></div> <div class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"><p class="text-sm text-primary-600 dark:text-primary-400 mb-1">Total with Tip</p> <p class="text-xl font-bold text-green-700 dark:text-green-300"> </p></div></div> <!></div>'),Ry=k('<div class="space-y-6"><div><label for="bill-amount" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bill Amount</label> <div class="relative"><span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span> <input id="bill-amount" type="number" class="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"/></div></div> <div class="grid grid-cols-2 gap-4"><div><label for="tip-percentage" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tip Percentage</label> <input id="tip-percentage" type="number" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"/> <div class="flex flex-wrap gap-2 mt-2"></div></div> <div><label for="number-of-people" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Number of People</label> <input id="number-of-people" type="number" min="1" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"/></div></div> <!></div>'),By=k('<div class="space-y-2 text-sm"><p class="font-medium text-gray-900 dark:text-white">Basic Percentage</p> <p class="text-gray-600 dark:text-gray-400">Result = (Percentage × Number) ÷ 100</p></div>'),Dy=k('<div class="space-y-2 text-sm"><p class="font-medium text-gray-900 dark:text-white">Increase</p> <p class="text-gray-600 dark:text-gray-400">New = Original + (Original × Percentage ÷ 100)</p></div>'),Fy=k('<div class="space-y-2 text-sm"><p class="font-medium text-gray-900 dark:text-white">Decrease</p> <p class="text-gray-600 dark:text-gray-400">New = Original - (Original × Percentage ÷ 100)</p></div>'),Hy=k('<div class="space-y-2 text-sm"><p class="font-medium text-gray-900 dark:text-white">Percentage Difference</p> <p class="text-gray-600 dark:text-gray-400">Diff = |Value2 - Value1| ÷ ((Value1 + Value2) ÷ 2) × 100</p></div>'),Oy=k('<div class="space-y-2 text-sm"><p class="font-medium text-gray-900 dark:text-white">Discount</p> <p class="text-gray-600 dark:text-gray-400">Final = Price - (Price × Discount ÷ 100)</p> <p class="text-gray-600 dark:text-gray-400">Saved = Price × Discount ÷ 100</p></div>'),Uy=k('<div class="space-y-2 text-sm"><p class="font-medium text-gray-900 dark:text-white">Tip Calculator</p> <p class="text-gray-600 dark:text-gray-400">Tip = Bill × Tip ÷ 100</p> <p class="text-gray-600 dark:text-gray-400">Total = Bill + Tip</p> <p class="text-gray-600 dark:text-gray-400">Per Person = Total ÷ Number of People</p></div>'),zy=k('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Percentage Calculator</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Calculate percentages, discounts, tips, and more with precision</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Percentage Calculator</li></ol></nav> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-6"><div class="p-6"><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Choose Calculator</h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div></div></div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-2"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><div class="flex items-center justify-between mb-6"><h2 class="text-xl font-semibold text-gray-900 dark:text-white flex items-center"></h2> <div class="flex gap-2"><button class="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">Example</button> <button class="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"><!></button></div></div> <!> <!> <!> <!> <!> <!></div></div> <div class="space-y-6"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center"><!> Formulas</h3> <!></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Tips</h3> <div class="space-y-3 text-sm text-gray-600 dark:text-gray-400"><div class="flex items-start"><div class="w-2 h-2 bg-primary-500 rounded-full mt-1.5 mr-2"></div> <p>Use common percentages for quick calculations (10%, 25%, 50%, etc.)</p></div> <div class="flex items-start"><div class="w-2 h-2 bg-primary-500 rounded-full mt-1.5 mr-2"></div> <p>For tips, 15-20% is standard in most countries</p></div> <div class="flex items-start"><div class="w-2 h-2 bg-primary-500 rounded-full mt-1.5 mr-2"></div> <p>Percentage difference uses the average of two values as the base</p></div> <div class="flex items-start"><div class="w-2 h-2 bg-primary-500 rounded-full mt-1.5 mr-2"></div> <p>Double-check discount calculations to avoid errors</p></div></div></div></div></div></div>');function qy(i,t){Rt(t,!0);const a=[{id:"basic",name:"Basic %",icon:no,description:"Calculate percentage of a number"},{id:"increase",name:"Increase",icon:ac,description:"Increase number by percentage"},{id:"decrease",name:"Decrease",icon:rc,description:"Decrease number by percentage"},{id:"difference",name:"Difference",icon:no,description:"Percentage difference between numbers"},{id:"discount",name:"Discount",icon:Z0,description:"Calculate discount and final price"},{id:"tip",name:"Tip Calculator",icon:Ho,description:"Calculate tip and split bill"}];let o=f("basic"),s=f(""),c=f(""),l=f(""),v=f(""),g=f(""),u=f(""),p=f(""),h=f(""),b=f(""),x=f(""),w=f(""),S=f(""),R=f(""),C=f(""),T=f("15"),E=f("1"),_=f(""),L=f(""),$=f("");const H=[5,10,15,20,25,50,75,100],U=[10,15,18,20,25];ke(()=>{if(e(s)&&e(c)&&!isNaN(parseFloat(e(s)))&&!isNaN(parseFloat(e(c)))){const D=parseFloat(e(s))/100,F=parseFloat(e(c));d(l,(F*D).toFixed(2),!0)}else d(l,"")}),ke(()=>{if(e(v)&&e(g)&&!isNaN(parseFloat(e(v)))&&!isNaN(parseFloat(e(g)))){const D=parseFloat(e(v)),F=parseFloat(e(g))/100;e(o)==="increase"?d(u,(D+D*F).toFixed(2),!0):e(o)==="decrease"&&d(u,(D-D*F).toFixed(2),!0)}else d(u,"")}),ke(()=>{if(e(p)&&e(h)&&!isNaN(parseFloat(e(p)))&&!isNaN(parseFloat(e(h)))){const D=parseFloat(e(p)),F=parseFloat(e(h)),X=Math.abs(F-D),j=(D+F)/2;d(b,(X/j*100).toFixed(2),!0)}else d(b,"")}),ke(()=>{if(e(x)&&e(w)&&!isNaN(parseFloat(e(x)))&&!isNaN(parseFloat(e(w)))){const D=parseFloat(e(x)),F=parseFloat(e(w))/100,X=D*F,j=D-X;d(R,X.toFixed(2),!0),d(S,j.toFixed(2),!0)}else d(S,""),d(R,"")}),ke(()=>{if(e(C)&&e(T)&&!isNaN(parseFloat(e(C)))&&!isNaN(parseFloat(e(T)))){const D=parseFloat(e(C)),F=parseFloat(e(T))/100,X=parseInt(e(E))||1,j=D*F,dt=D+j,Mt=dt/X;d(_,j.toFixed(2),!0),d(L,dt.toFixed(2),!0),d($,Mt.toFixed(2),!0)}else d(_,""),d(L,""),d($,"")});function Q(D){navigator.clipboard.writeText(D)}function mt(D){d(s,D,!0)}function lt(D){d(T,D,!0)}function nt(){switch(e(o)){case"basic":d(s,""),d(c,"");break;case"increase":case"decrease":d(v,""),d(g,"");break;case"difference":d(p,""),d(h,"");break;case"discount":d(x,""),d(w,"");break;case"tip":d(C,""),d(T,"15"),d(E,"1");break}}function ct(D){switch(D){case"basic":d(s,"25"),d(c,"200");break;case"increase":d(v,"100"),d(g,"20");break;case"decrease":d(v,"150"),d(g,"30");break;case"difference":d(p,"80"),d(h,"100");break;case"discount":d(x,"50"),d(w,"20");break;case"tip":d(C,"85.50"),d(T,"18"),d(E,"3");break}}function vt(D){return D?new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(parseFloat(D)||0):"$0.00"}var Dt=zy();Er(D=>{var F=ly();_r.title="Percentage Calculator - Developer Tools",m(D,F)});var Wt=r(Dt),Yt=r(Wt),Qt=r(Yt);Qt.__click=[dy];var Jt=r(Qt);Ie(Jt,{class:"w-5 h-5"});var zt=n(Yt,2),Ft=r(zt),At=r(Ft);no(At,{class:"w-10 h-10 text-white"});var Ct=n(Wt,4),tt=r(Ct),yt=n(r(tt),2);xe(yt,21,()=>a,D=>D.id,(D,F)=>{var X=vy();X.__click=[cy,o,F,nt];var j=r(X);sr(j,()=>e(F).icon,(q,gt)=>{gt(q,{class:"w-6 h-6 mb-2 text-primary-600 dark:text-primary-400"})});var dt=n(j,2),Mt=r(dt),Gt=n(dt,2),St=r(Gt);K(()=>{ge(X,1,`p-4 rounded-lg border-2 transition-all text-left ${e(o)===e(F).id?"border-primary-500 bg-primary-100 dark:bg-primary-900/20":"border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"}`),y(Mt,e(F).name),y(St,e(F).description)}),m(D,X)});var pt=n(Ct,2),at=r(pt),P=r(at),xt=r(P),ft=r(xt);xe(ft,21,()=>a,D=>D.id,(D,F)=>{var X=Et(),j=ut(X);{var dt=Mt=>{var Gt=gy(),St=ut(Gt);sr(St,()=>e(F).icon,(gt,$t)=>{$t(gt,{class:"w-6 h-6 mr-2"})});var q=n(St);K(()=>y(q,` ${e(F).name??""}`)),m(Mt,Gt)};O(j,Mt=>{e(F).id===e(o)&&Mt(dt)})}m(D,X)});var V=n(ft,2),et=r(V);et.__click=[uy,ct,o];var ht=n(et,2);ht.__click=nt;var bt=r(ht);Gi(bt,{class:"w-4 h-4"});var wt=n(xt,2);{var Ut=D=>{var F=by(),X=r(F),j=r(X),dt=n(r(j)),Mt=n(dt,2),Gt=n(X,2),St=n(r(Gt),2);xe(St,16,()=>H,$t=>$t,($t,Ht)=>{var J=py();J.__click=[my,mt,Ht];var ot=r(J);K(()=>y(ot,`${Ht??""}%`)),m($t,J)});var q=n(Gt,2);{var gt=$t=>{var Ht=xy(),J=r(Ht),ot=r(J),_t=n(r(ot),2),It=r(_t),Vt=n(ot,2);Vt.__click=[fy,Q,l];var Xt=r(Vt);be(Xt,{class:"w-5 h-5"}),K(()=>y(It,e(l))),m($t,Ht)};O(q,$t=>{e(l)&&$t(gt)})}Tt(dt,()=>e(s),$t=>d(s,$t)),Tt(Mt,()=>e(c),$t=>d(c,$t)),m(D,F)};O(wt,D=>{e(o)==="basic"&&D(Ut)})}var jt=n(wt,2);{var Pt=D=>{var F=_y(),X=r(F),j=r(X),dt=n(r(j)),Mt=n(dt,2),Gt=n(X,2);{var St=q=>{var gt=hy(),$t=r(gt),Ht=r($t),J=n(r(Ht),2),ot=r(J),_t=n(J,2),It=r(_t),Vt=n(Ht,2);Vt.__click=[yy,Q,u];var Xt=r(Vt);be(Xt,{class:"w-5 h-5"}),K(Kt=>{y(ot,e(u)),y(It,`(+${Kt??""}%)`)},[()=>((parseFloat(e(u))-parseFloat(e(v)))/parseFloat(e(v))*100).toFixed(2)]),m(q,gt)};O(Gt,q=>{e(u)&&q(St)})}Tt(dt,()=>e(v),q=>d(v,q)),Tt(Mt,()=>e(g),q=>d(g,q)),m(D,F)};O(jt,D=>{e(o)==="increase"&&D(Pt)})}var Lt=n(jt,2);{var st=D=>{var F=Cy(),X=r(F),j=r(X),dt=n(r(j)),Mt=n(dt,2),Gt=n(X,2);{var St=q=>{var gt=wy(),$t=r(gt),Ht=r($t),J=n(r(Ht),2),ot=r(J),_t=n(J,2),It=r(_t),Vt=n(Ht,2);Vt.__click=[ky,Q,u];var Xt=r(Vt);be(Xt,{class:"w-5 h-5"}),K(Kt=>{y(ot,e(u)),y(It,`(-${Kt??""}%)`)},[()=>((parseFloat(e(v))-parseFloat(e(u)))/parseFloat(e(v))*100).toFixed(2)]),m(q,gt)};O(Gt,q=>{e(u)&&q(St)})}Tt(dt,()=>e(v),q=>d(v,q)),Tt(Mt,()=>e(g),q=>d(g,q)),m(D,F)};O(Lt,D=>{e(o)==="decrease"&&D(st)})}var kt=n(Lt,2);{var G=D=>{var F=Ty(),X=r(F),j=r(X),dt=n(r(j),2),Mt=n(j,2),Gt=n(r(Mt),2),St=n(X,2);{var q=gt=>{var $t=Sy(),Ht=r($t),J=r(Ht),ot=n(r(J),2),_t=r(ot),It=n(J,2);It.__click=[$y,Q,b];var Vt=r(It);be(Vt,{class:"w-5 h-5"}),K(()=>y(_t,`${e(b)??""}%`)),m(gt,$t)};O(St,gt=>{e(b)&&gt(q)})}Tt(dt,()=>e(p),gt=>d(p,gt)),Tt(Gt,()=>e(h),gt=>d(h,gt)),m(D,F)};O(kt,D=>{e(o)==="difference"&&D(G)})}var Z=n(kt,2);{var W=D=>{var F=Ly(),X=r(F),j=r(X),dt=n(r(j),2),Mt=n(r(dt),2),Gt=n(j,2),St=n(r(Gt),2),q=n(X,2);{var gt=$t=>{var Ht=Ey(),J=r(Ht),ot=r(J),_t=r(ot),It=n(r(_t),2),Vt=r(It),Xt=n(_t,2);Xt.__click=[My,Q,S];var Kt=r(Xt);be(Kt,{class:"w-5 h-5"});var ee=n(J,2),le=n(r(ee),2),qt=r(le);K((de,ce)=>{y(Vt,de),y(qt,ce)},[()=>vt(e(S)),()=>vt(e(R))]),m($t,Ht)};O(q,$t=>{e(S)&&$t(gt)})}Tt(Mt,()=>e(x),$t=>d(x,$t)),Tt(St,()=>e(w),$t=>d(w,$t)),m(D,F)};O(Z,D=>{e(o)==="discount"&&D(W)})}var A=n(Z,2);{var I=D=>{var F=Ry(),X=r(F),j=n(r(X),2),dt=n(r(j),2),Mt=n(X,2),Gt=r(Mt),St=n(r(Gt),2),q=n(St,2);xe(q,20,()=>U,ot=>ot,(ot,_t)=>{var It=Ay();It.__click=[Py,lt,_t];var Vt=r(It);K(()=>y(Vt,`${_t??""}%`)),m(ot,It)});var gt=n(Gt,2),$t=n(r(gt),2),Ht=n(Mt,2);{var J=ot=>{var _t=Ny(),It=r(_t),Vt=r(It),Xt=n(r(Vt),2),Kt=r(Xt),ee=n(Vt,2),le=n(r(ee),2),qt=r(le),de=n(It,2);{var ce=ae=>{var me=jy(),pe=r(me),re=r(pe),ve=n(r(re),2),Ce=r(ve),Me=n(re,2);Me.__click=[Iy,Q,$];var Ot=r(Me);be(Ot,{class:"w-5 h-5"}),K(ie=>y(Ce,ie),[()=>vt(e($))]),m(ae,me)};O(de,ae=>{parseInt(e(E))>1&&ae(ce)})}K((ae,me)=>{y(Kt,ae),y(qt,me)},[()=>vt(e(_)),()=>vt(e(L))]),m(ot,_t)};O(Ht,ot=>{e(_)&&ot(J)})}Tt(dt,()=>e(C),ot=>d(C,ot)),Tt(St,()=>e(T),ot=>d(T,ot)),Tt($t,()=>e(E),ot=>d(E,ot)),m(D,F)};O(A,D=>{e(o)==="tip"&&D(I)})}var N=n(at,2),it=r(N),rt=r(it),Y=r(rt);Nr(Y,{class:"w-5 h-5 mr-2"});var z=n(rt,2);{var B=D=>{var F=By();m(D,F)},M=D=>{var F=Et(),X=ut(F);{var j=Mt=>{var Gt=Dy();m(Mt,Gt)},dt=Mt=>{var Gt=Et(),St=ut(Gt);{var q=$t=>{var Ht=Fy();m($t,Ht)},gt=$t=>{var Ht=Et(),J=ut(Ht);{var ot=It=>{var Vt=Hy();m(It,Vt)},_t=It=>{var Vt=Et(),Xt=ut(Vt);{var Kt=le=>{var qt=Oy();m(le,qt)},ee=le=>{var qt=Et(),de=ut(qt);{var ce=ae=>{var me=Uy();m(ae,me)};O(de,ae=>{e(o)==="tip"&&ae(ce)},!0)}m(le,qt)};O(Xt,le=>{e(o)==="discount"?le(Kt):le(ee,!1)},!0)}m(It,Vt)};O(J,It=>{e(o)==="difference"?It(ot):It(_t,!1)},!0)}m($t,Ht)};O(St,$t=>{e(o)==="decrease"?$t(q):$t(gt,!1)},!0)}m(Mt,Gt)};O(X,Mt=>{e(o)==="increase"?Mt(j):Mt(dt,!1)},!0)}m(D,F)};O(z,D=>{e(o)==="basic"?D(B):D(M,!1)})}m(i,Dt),Bt()}ye(["click"]);function Gy(i,t,a,o,s,c,l){d(t,"metric"),d(a,"175"),d(o,"70"),d(s,"30"),d(c,"male"),d(l,"moderate")}function Wy(i,t,a,o,s,c){d(t,""),d(a,""),d(o,""),d(s,"male"),d(c,"moderate")}function Jy(){Te("/tools")}var Vy=k('<meta name="description" content="Calculate BMI, ideal weight, BMR, and daily calorie needs with health insights"/>'),Yy=(i,t)=>t("metric"),Ky=(i,t)=>t("imperial"),Qy=k("<option> </option>"),Zy=k('<div class="pt-2 border-t border-gray-200 dark:border-gray-700"><p class="text-sm text-gray-600 dark:text-gray-400"> </p></div>'),Xy=k('<div class="flex justify-between"><span class="text-gray-600 dark:text-gray-400">Est. Body Fat:</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div>'),th=k('<div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center"><!> Metabolic Information</h3> <div class="space-y-2"><div class="flex justify-between"><span class="text-gray-600 dark:text-gray-400">BMR:</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div> <div class="flex justify-between"><span class="text-gray-600 dark:text-gray-400">Daily Calories:</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div> <!></div></div>'),eh=k('<div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center"><!> Your BMI Results</h2> <div class="text-center mb-8"><div><p> </p> <p> </p></div></div> <div class="mb-8"><div class="relative"><div class="h-8 bg-gradient-to-r from-blue-400 via-green-400 to-red-400 rounded-full relative"><div class="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-gray-900 dark:bg-white rounded-full border-2 border-white dark:border-gray-900 transition-all duration-300"></div></div> <div class="flex justify-between mt-2 text-xs text-gray-600 dark:text-gray-400"><span>15</span> <span>18.5</span> <span>25</span> <span>30</span> <span>35</span> <span>40+</span></div></div></div> <div class="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><div class="flex items-start"><!> <div><p class="font-medium text-gray-900 dark:text-white mb-1">Health Risk Assessment</p> <p class="text-sm text-gray-600 dark:text-gray-400"> </p></div></div></div></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center"><!> Ideal Weight Range</h3> <div class="space-y-2"><div class="flex justify-between"><span class="text-gray-600 dark:text-gray-400">Minimum:</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div> <div class="flex justify-between"><span class="text-gray-600 dark:text-gray-400">Maximum:</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div> <!></div></div> <!></div>',1),rh=k('<div class="flex items-start"><div class="w-2 h-2 bg-primary-500 rounded-full mt-1.5 mr-3"></div> <p class="text-sm text-gray-600 dark:text-gray-400"> </p></div>'),ah=k('<div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Health Tips</h3> <div class="space-y-3"></div></div>'),ih=k(`<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">BMI Calculator</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Calculate your Body Mass Index, ideal weight, and get personalized health insights</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">BMI Calculator</li></ol></nav> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-6"><div class="p-6"><div class="flex items-center justify-between"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Measurement Units</h2> <div class="flex gap-2"><button>Metric</button> <button>Imperial</button></div></div></div></div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-2 space-y-6"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><div class="flex items-center justify-between mb-6"><h2 class="text-xl font-semibold text-gray-900 dark:text-white flex items-center"><!> Personal Information</h2> <div class="flex gap-2"><button class="btn btn-primary btn-sm">Example</button> <button class="btn btn-primary btn-sm">Reset</button></div></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label for="height-input" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"> </label> <input class="input" id="height-input" type="number"/></div> <div><label for="weight-input" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"> </label> <input class="input" id="weight-input" type="number"/></div> <input class="input" id="age-input" type="number" placeholder="30"/> <div><fieldset><legend class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gender</legend> <div class="flex gap-4"><label class="flex items-center"><input type="radio" class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500"/> <span class="ml-2 text-gray-700 dark:text-gray-300">Male</span></label> <label class="flex items-center"><input type="radio" class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500"/> <span class="ml-2 text-gray-700 dark:text-gray-300">Female</span></label></div></fieldset></div></div> <div class="mt-6"><label for="activity-level-select" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Activity Level</label> <select id="activity-level-select" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"></select></div></div> <!></div> <div class="space-y-6"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">BMI Categories</h3> <div class="space-y-3"><div class="flex items-center justify-between p-2 rounded bg-primary-100 dark:bg-primary-900/20"><div class="flex items-center"><div class="w-3 h-3 bg-primary-500 rounded-full mr-3"></div> <span class="text-sm text-gray-700 dark:text-gray-300">Underweight</span></div> <span class="text-sm text-gray-600 dark:text-gray-400">&lt; 18.5</span></div> <div class="flex items-center justify-between p-2 rounded bg-green-50 dark:bg-green-900/20"><div class="flex items-center"><div class="w-3 h-3 bg-green-500 rounded-full mr-3"></div> <span class="text-sm text-gray-700 dark:text-gray-300">Normal</span></div> <span class="text-sm text-gray-600 dark:text-gray-400">18.5 - 24.9</span></div> <div class="flex items-center justify-between p-2 rounded bg-yellow-50 dark:bg-yellow-900/20"><div class="flex items-center"><div class="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div> <span class="text-sm text-gray-700 dark:text-gray-300">Overweight</span></div> <span class="text-sm text-gray-600 dark:text-gray-400">25 - 29.9</span></div> <div class="flex items-center justify-between p-2 rounded bg-red-50 dark:bg-red-900/20"><div class="flex items-center"><div class="w-3 h-3 bg-red-500 rounded-full mr-3"></div> <span class="text-sm text-gray-700 dark:text-gray-300">Obese</span></div> <span class="text-sm text-gray-600 dark:text-gray-400">≥ 30</span></div></div></div> <!> <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6"><div class="flex items-start"><!> <div><h3 class="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Important Notes</h3> <ul class="text-sm text-yellow-700 dark:text-yellow-300 space-y-1"><li>• BMI is a screening tool, not a diagnostic tool</li> <li>• It doesn't account for muscle mass or body composition</li> <li>• Athletes may have high BMI but low body fat</li> <li>• Consult healthcare providers for medical advice</li> <li>• Children and teens use different BMI charts</li></ul></div></div></div></div></div></div>`);function oh(i,t){Rt(t,!0);const a=[];let o=f("metric"),s=f(""),c=f(""),l=f(""),v=f("male"),g=f("moderate"),u=f(0),p=f(""),h=f(""),b=f(Pe({min:0,max:0})),x=f(""),w=f(0),S=f(0),R=f(0);const C=[{value:"sedentary",label:"Sedentary",multiplier:1.2,description:"Little or no exercise"},{value:"light",label:"Lightly Active",multiplier:1.375,description:"Light exercise/sports 1-3 days/week"},{value:"moderate",label:"Moderately Active",multiplier:1.55,description:"Moderate exercise/sports 3-5 days/week"},{value:"active",label:"Very Active",multiplier:1.725,description:"Hard exercise/sports 6-7 days a week"},{value:"extra",label:"Extra Active",multiplier:1.9,description:"Very hard exercise/sports & physical job"}];ke(()=>{if(e(s)&&e(c)&&!isNaN(parseFloat(e(s)))&&!isNaN(parseFloat(e(c)))){let j,dt;e(o)==="metric"?(j=parseFloat(e(s))/100,dt=parseFloat(e(c))):(j=parseFloat(e(s))*.0254,dt=parseFloat(e(c))*.453592),d(u,dt/(j*j)),e(u)<18.5?(d(p,"Underweight"),d(h,"blue"),d(x,"May have nutritional deficiency and osteoporosis risk")):e(u)<25?(d(p,"Normal Weight"),d(h,"green"),d(x,"Low risk of developing health problems")):e(u)<30?(d(p,"Overweight"),d(h,"yellow"),d(x,"Increased risk of heart disease, diabetes, and high blood pressure")):e(u)<35?(d(p,"Obese Class I"),d(h,"orange"),d(x,"High risk of cardiovascular disease and diabetes")):e(u)<40?(d(p,"Obese Class II"),d(h,"red"),d(x,"Very high risk of serious health conditions")):(d(p,"Obese Class III"),d(h,"red"),d(x,"Extremely high risk of life-threatening health conditions"));const Mt=j*j;if(e(b).min=18.5*Mt,e(b).max=24.9*Mt,e(l)&&!isNaN(parseFloat(e(l)))){const Gt=parseFloat(e(l));e(v)==="male"?d(w,10*dt+6.25*(j*100)-5*Gt+5):d(w,10*dt+6.25*(j*100)-5*Gt-161);const St=C.find(q=>q.value===e(g));St&&d(S,e(w)*St.multiplier),e(v)==="male"?d(R,1.2*e(u)+.23*Gt-16.2):d(R,1.2*e(u)+.23*Gt-5.4)}}else d(u,0),d(p,""),d(h,""),d(b,{min:0,max:0},!0),d(x,""),d(w,0),d(S,0),d(R,0)});function T(j){d(o,j,!0),d(s,""),d(c,"")}function E(){if(e(u)===0)return 0;const j=(e(u)-15)/25*100;return Math.max(0,Math.min(100,j))}function _(j){return e(o)==="metric"?`${j.toFixed(1)} kg`:`${(j*2.20462).toFixed(1)} lbs`}function L(j){return`${Math.round(j)} calories/day`}function $(){const j=[];return e(u)<18.5?(j.push("Increase calorie intake with nutrient-dense foods"),j.push("Include protein-rich foods to build muscle mass"),j.push("Consider strength training exercises"),j.push("Consult with a healthcare provider or dietitian")):e(u)>=18.5&&e(u)<25?(j.push("Maintain your current healthy lifestyle"),j.push("Continue regular physical activity (150 min/week)"),j.push("Eat a balanced diet with variety"),j.push("Get adequate sleep (7-9 hours per night)")):e(u)>=25&&e(u)<30?(j.push("Aim for gradual weight loss (1-2 lbs per week)"),j.push("Increase physical activity to 300 min/week"),j.push("Focus on portion control and mindful eating"),j.push("Reduce processed foods and sugary drinks")):(j.push("Consult healthcare provider for a comprehensive plan"),j.push("Start with small, sustainable lifestyle changes"),j.push("Consider professional nutritional guidance"),j.push("Focus on both diet and exercise modifications")),j}var H=ih();Er(j=>{var dt=Vy();_r.title="BMI Calculator - Developer Tools",m(j,dt)});var U=r(H),Q=r(U),mt=r(Q);mt.__click=[Jy];var lt=r(mt);Ie(lt,{class:"w-5 h-5"});var nt=n(Q,2),ct=r(nt),vt=r(ct);An(vt,{class:"w-10 h-10 text-white"});var Dt=n(U,4),Wt=r(Dt),Yt=r(Wt),Qt=n(r(Yt),2),Jt=r(Qt);Jt.__click=[Yy,T];var zt=n(Jt,2);zt.__click=[Ky,T];var Ft=n(Dt,2),At=r(Ft),Ct=r(At),tt=r(Ct),yt=r(tt),pt=r(yt);vn(pt,{class:"w-6 h-6 mr-2"});var at=n(yt,2),P=r(at);P.__click=[Gy,o,s,c,l,v,g];var xt=n(P,2);xt.__click=[Wy,s,c,l,v,g];var ft=n(tt,2),V=r(ft),et=r(V),ht=r(et),bt=n(et,2),wt=n(V,2),Ut=r(wt),jt=r(Ut),Pt=n(Ut,2),Lt=n(wt,2),st=n(Lt,2),kt=r(st),G=n(r(kt),2),Z=r(G),W=r(Z);W.value=W.__value="male";var A=n(Z,2),I=r(A);I.value=I.__value="female";var N=n(ft,2),it=n(r(N),2);xe(it,21,()=>C,j=>j.value,(j,dt)=>{var Mt=Qy(),Gt=r(Mt),St={};K(()=>{y(Gt,`${e(dt).label??""} - ${e(dt).description??""}`),St!==(St=e(dt).value)&&(Mt.value=(Mt.__value=e(dt).value)??"")}),m(j,Mt)});var rt=n(Ct,2);{var Y=j=>{var dt=eh(),Mt=ut(dt),Gt=r(Mt),St=r(Gt);An(St,{class:"w-6 h-6 mr-2"});var q=n(Gt,2),gt=r(q),$t=r(gt),Ht=r($t),J=n($t,2),ot=r(J),_t=n(q,2),It=r(_t),Vt=r(It),Xt=r(Vt),Kt=n(_t,2),ee=r(Kt),le=r(ee);pa(le,{class:"w-5 h-5 text-primary-600 dark:text-primary-400 mt-0.5 mr-3"});var qt=n(le,2),de=n(r(qt),2),ce=r(de),ae=n(Mt,2),me=r(ae),pe=r(me),re=r(pe);X0(re,{class:"w-5 h-5 mr-2"});var ve=n(pe,2),Ce=r(ve),Me=n(r(Ce),2),Ot=r(Me),ie=n(Ce,2),fe=n(r(ie),2),he=r(fe),je=n(ie,2);{var Ne=_e=>{var Se=Zy(),qe=r(Se),Ae=r(qe);K(Je=>y(Ae,`For height: ${e(s)??""} inches (${Je??""} ft)`),[()=>(parseFloat(e(s))/12).toFixed(1)]),m(_e,Se)};O(je,_e=>{e(o)==="imperial"&&e(s)&&_e(Ne)})}var Be=n(me,2);{var De=_e=>{var Se=th(),qe=r(Se),Ae=r(qe);bd(Ae,{class:"w-5 h-5 mr-2"});var Je=n(qe,2),Ze=r(Je),ur=n(r(Ze),2),lr=r(ur),Le=n(Ze,2),Xe=n(r(Le),2),Pr=r(Xe),mr=n(Le,2);{var pr=ar=>{var ir=Xy(),fr=n(r(ir),2),Ar=r(fr);K(kr=>y(Ar,`${kr??""}%`),[()=>Math.max(0,e(R)).toFixed(1)]),m(ar,ir)};O(mr,ar=>{e(R)&&ar(pr)})}K((ar,ir)=>{y(lr,`${ar??""} calories/day`),y(Pr,ir)},[()=>Math.round(e(w)),()=>L(e(S))]),m(_e,Se)};O(Be,_e=>{e(w)>0&&_e(De)})}K((_e,Se,qe,Ae)=>{ge(gt,1,`inline-block p-6 bg-${e(h)??""}-50 dark:bg-${e(h)??""}-900/20 rounded-lg border-2 border-${e(h)??""}-200 dark:border-${e(h)??""}-800`),ge($t,1,`text-5xl font-bold text-${e(h)??""}-700 dark:text-${e(h)??""}-300 mb-2`),y(Ht,_e),ge(J,1,`text-lg font-medium text-${e(h)??""}-600 dark:text-${e(h)??""}-400`),y(ot,e(p)),Qe(Xt,`left: ${Se??""}%`),y(ce,e(x)),y(Ot,qe),y(he,Ae)},[()=>e(u).toFixed(1),E,()=>_(e(b).min),()=>_(e(b).max)]),m(j,dt)};O(rt,j=>{e(u)>0&&j(Y)})}var z=n(At,2),B=n(r(z),2);{var M=j=>{var dt=ah(),Mt=n(r(dt),2);xe(Mt,20,$,Gt=>Gt,(Gt,St)=>{var q=rh(),gt=n(r(q),2),$t=r(gt);K(()=>y($t,St)),m(Gt,q)}),m(j,dt)};O(B,j=>{e(u)>0&&$().length>0&&j(M)})}var D=n(B,2),F=r(D),X=r(F);pa(X,{class:"w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-3"}),K(()=>{ge(Jt,1,`btn ${e(o)==="metric"?"btn-primary":"btn-secondary"}`),ge(zt,1,`btn ${e(o)==="imperial"?"btn-primary":"btn-secondary"}`),y(ht,`Height (${e(o)==="metric"?"cm":"inches"})`),Nt(bt,"placeholder",e(o)==="metric"?"170":`5'7"`),y(jt,`Weight (${e(o)==="metric"?"kg":"lbs"})`),Nt(Pt,"placeholder",e(o)==="metric"?"70":"154")}),Tt(bt,()=>e(s),j=>d(s,j)),Tt(Pt,()=>e(c),j=>d(c,j)),Tt(Lt,()=>e(l),j=>d(l,j)),Ai(a,[],W,()=>e(v),j=>d(v,j)),Ai(a,[],I,()=>e(v),j=>d(v,j)),cr(it,()=>e(g),j=>d(g,j)),m(i,H),Bt()}ye(["click"]);function nh(i,t,a){d(t,"1990-06-15"),d(a,new Date().toISOString().split("T")[0],!0)}function sh(i,t,a,o,s){d(t,""),d(a,new Date().toISOString().split("T")[0],!0),d(o,"exact"),s()}function dh(){Te("/tools")}var lh=k('<meta name="description" content="Calculate exact age, countdown to next birthday, zodiac signs, and more"/>'),ch=k('<div class="mt-4 text-gray-600 dark:text-gray-400"> <!> </div>'),vh=k('<div class="inline-block p-6 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-lg border-2 border-pink-200 dark:border-pink-800 mb-6"><div class="text-3xl mb-4">🎉🎂🎈</div> <div class="text-2xl font-bold text-pink-600 dark:text-pink-400">Happy Birthday!</div> <div class="text-pink-700 dark:text-pink-300 mt-2"> </div></div> <div class="p-4 bg-primary-100 dark:bg-primary-900/20 rounded-lg"><h3 class="text-lg font-medium text-primary-800 dark:text-primary-200 mb-2">Countdown to Next Birthday</h3> <div class="grid grid-cols-4 gap-2 text-center"><div><div class="text-2xl font-bold text-primary-600 dark:text-primary-400"> </div> <div class="text-xs text-primary-700 dark:text-primary-300">Days</div></div> <div><div class="text-2xl font-bold text-primary-600 dark:text-primary-400"> </div> <div class="text-xs text-primary-700 dark:text-primary-300">Hours</div></div> <div><div class="text-2xl font-bold text-primary-600 dark:text-primary-400"> </div> <div class="text-xs text-primary-700 dark:text-primary-300">Minutes</div></div> <div><div class="text-2xl font-bold text-primary-600 dark:text-primary-400"> </div> <div class="text-xs text-primary-700 dark:text-primary-300">Seconds</div></div></div></div>',1),gh=k('<div class="mt-4 text-sm text-gray-600 dark:text-gray-400"> </div>'),uh=k('<div class="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><div class="text-lg text-gray-900 dark:text-white mb-2"> </div> <div class="text-3xl font-bold text-gray-900 dark:text-white mb-2"> </div> <div class="text-sm text-gray-600 dark:text-gray-400"> </div> <!></div>'),mh=k('<div><span class="text-sm text-gray-600 dark:text-gray-400">Birth Year:</span> <span class="ml-2 text-gray-900 dark:text-white font-medium">Leap Year 🗓️</span></div>'),ph=k('<div class="mb-4"><div class="flex items-center justify-between mb-2"><span class="text-2xl"> </span> <span class="text-lg font-medium text-gray-900 dark:text-white"> </span></div> <div class="text-sm text-gray-600 dark:text-gray-400"> </div> <div class="text-sm text-gray-600 dark:text-gray-400 mt-1"> </div></div>'),fh=k('<div><div class="text-lg font-medium text-gray-900 dark:text-white mb-1">Chinese Zodiac</div> <div class="text-sm text-gray-600 dark:text-gray-400"> </div></div>'),xh=(i,t,a)=>t(a()),bh=(i,t,a,o,s)=>t(`${e(a)} years, ${e(o)} months, ${e(s)} days`),yh=k('<div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-2 space-y-6"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center"><!> Your Age</h2> <div class="text-center mb-8"><div class="inline-block p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border-2 border-primary-200 dark:border-primary-800"><div class="text-6xl font-bold text-primary-600 dark:text-primary-400 mb-4"> </div> <div class="text-lg font-medium text-primary-700 dark:text-primary-300">Years</div> <!></div></div> <div class="grid grid-cols-2 md:grid-cols-4 gap-4"><div class="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><div class="text-2xl font-bold text-gray-900 dark:text-white"> </div> <div class="text-sm text-gray-600 dark:text-gray-400">Days</div></div> <div class="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><div class="text-2xl font-bold text-gray-900 dark:text-white"> </div> <div class="text-sm text-gray-600 dark:text-gray-400">Weeks</div></div> <div class="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><div class="text-2xl font-bold text-gray-900 dark:text-white"> </div> <div class="text-sm text-gray-600 dark:text-gray-400">Months</div></div> <div class="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><div class="text-2xl font-bold text-gray-900 dark:text-white"> </div> <div class="text-sm text-gray-600 dark:text-gray-400">Hours</div></div></div> <div class="grid grid-cols-2 gap-4 mt-4"><div class="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><div class="text-2xl font-bold text-gray-900 dark:text-white"> </div> <div class="text-sm text-gray-600 dark:text-gray-400">Minutes</div></div> <div class="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><div class="text-2xl font-bold text-gray-900 dark:text-white"> </div> <div class="text-sm text-gray-600 dark:text-gray-400">Seconds</div></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center"><!> Next Birthday</h2> <div class="text-center"><!></div></div></div> <div class="space-y-6"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center"><!> Birth Details</h3> <div class="space-y-3"><div><span class="text-sm text-gray-600 dark:text-gray-400">Day of Week:</span> <span class="ml-2 text-gray-900 dark:text-white font-medium"> </span></div> <!> <div><span class="text-sm text-gray-600 dark:text-gray-400">Age in Milliseconds:</span> <span class="ml-2 text-gray-900 dark:text-white font-medium"> </span></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center"><!> Zodiac Signs</h3> <!> <!></div> <div class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800 p-6"><h3 class="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-4 flex items-center"><!> Fun Facts</h3> <div class="space-y-3 text-sm text-purple-700 dark:text-purple-300"><div><strong> </strong> weeks old</div> <div>Lived through <strong> </strong> seasons</div> <div>Approximately <strong> </strong> hours of sleep (average)</div> <div>About <strong> </strong> meals eaten</div> <div>Heart has beaten <strong> </strong> times (average)</div></div></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Copy</h3> <div class="space-y-2"><button class="btn btn-primary w-full"><!> Copy Age Text</button> <button class="btn btn-primary w-full">Copy Detailed Age</button></div></div></div></div>'),hh=k('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="btn btn-primary"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Age Calculator</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Calculate exact age, countdown to next birthday, and discover interesting facts</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Age Calculator</li></ol></nav> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-6"><div class="p-6"><div class="flex items-center justify-between mb-6"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Enter Dates</h2> <div class="flex gap-2"><button class="btn btn-primary btn-sm">Example</button> <button class="btn btn-primary btn-sm"><!> Reset</button></div></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"><input class="input" id="birth-date" type="date"/> <input class="input" id="current-date" type="date"/></div> <div class="mt-6"><fieldset><legend class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Calculation Mode</legend> <div class="flex gap-4"><label class="flex items-center"><input type="radio" class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500"/> <span class="ml-2 text-gray-700 dark:text-gray-300">Exact Age (Years, Months, Days)</span></label> <label class="flex items-center"><input type="radio" class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500"/> <span class="ml-2 text-gray-700 dark:text-gray-300">Total Difference</span></label></div></fieldset></div></div></div> <!></div>');function _h(i,t){Rt(t,!0);const a=[];let o=f(""),s=f(""),c=f("exact"),l=f(0),v=f(0),g=f(0),u=f(0),p=f(0),h=f(0),b=f(0),x=f(0),w=f(0),S=f(""),R=f(0),C=f(""),T=f(""),E=f(""),_=f(0),L=f(!1),$=f(!1),H=null,U=f(Pe({days:0,hours:0,minutes:0,seconds:0}));const Q=[{name:"Aries",dates:"Mar 21 - Apr 19",symbol:"♈",element:"Fire"},{name:"Taurus",dates:"Apr 20 - May 20",symbol:"♉",element:"Earth"},{name:"Gemini",dates:"May 21 - Jun 20",symbol:"♊",element:"Air"},{name:"Cancer",dates:"Jun 21 - Jul 22",symbol:"♋",element:"Water"},{name:"Leo",dates:"Jul 23 - Aug 22",symbol:"♌",element:"Fire"},{name:"Virgo",dates:"Aug 23 - Sep 22",symbol:"♍",element:"Earth"},{name:"Libra",dates:"Sep 23 - Oct 22",symbol:"♎",element:"Air"},{name:"Scorpio",dates:"Oct 23 - Nov 21",symbol:"♏",element:"Water"},{name:"Sagittarius",dates:"Nov 22 - Dec 21",symbol:"♐",element:"Fire"},{name:"Capricorn",dates:"Dec 22 - Jan 19",symbol:"♑",element:"Earth"},{name:"Aquarius",dates:"Jan 20 - Feb 18",symbol:"♒",element:"Air"},{name:"Pisces",dates:"Feb 19 - Mar 20",symbol:"♓",element:"Water"}];ke(()=>{e(s)||d(s,new Date().toISOString().split("T")[0],!0)}),ke(()=>{if(e(o)&&e(s)){const rt=new Date(e(o)),Y=new Date(e(s));if(rt>Y){Yt();return}e(c)==="exact"?mt(rt,Y):lt(rt,Y),nt(rt,Y)}else Yt()}),ke(()=>(e(L)&&e(S)?H=setInterval(Wt,1e3):H&&(clearInterval(H),H=null),()=>{H&&clearInterval(H)}));function mt(rt,Y){let z=Y.getFullYear()-rt.getFullYear(),B=Y.getMonth()-rt.getMonth(),M=Y.getDate()-rt.getDate();if(M<0){B--;const F=new Date(Y.getFullYear(),Y.getMonth(),0);M+=F.getDate()}B<0&&(z--,B+=12),d(l,z,!0),d(v,B,!0),d(g,M,!0);const D=Y.getTime()-rt.getTime();d(_,D),d(u,Math.floor(D/(1e3*60*60*24)),!0),d(p,Math.floor(e(u)/7),!0),d(h,Math.floor(e(u)/30.44),!0),d(b,Math.floor(D/(1e3*60*60)),!0),d(x,Math.floor(D/(1e3*60)),!0),d(w,Math.floor(D/1e3),!0)}function lt(rt,Y){const z=Y.getTime()-rt.getTime();d(_,z),d(w,Math.floor(z/1e3),!0),d(x,Math.floor(e(w)/60),!0),d(b,Math.floor(e(x)/60),!0),d(u,Math.floor(e(b)/24),!0),d(p,Math.floor(e(u)/7),!0),d(h,Math.floor(e(u)/30.44),!0),d(l,Math.floor(e(u)/365.25),!0);const B=e(u)%365.25;d(v,Math.floor(B/30.44),!0),d(g,Math.floor(B%30.44),!0)}function nt(rt,Y){const z=new Date(Y.getFullYear(),rt.getMonth(),rt.getDate());z<Y&&z.setFullYear(Y.getFullYear()+1),d(S,z.toISOString().split("T")[0],!0);const B=z.getTime()-Y.getTime();d(R,Math.ceil(B/(1e3*60*60*24)),!0),d(L,rt.getDate()===Y.getDate()&&rt.getMonth()===Y.getMonth(),!0),d(C,ct(rt),!0),d(T,vt(rt.getFullYear()),!0),d(E,["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][rt.getDay()],!0),d($,Dt(rt.getFullYear()),!0)}function ct(rt){const Y=rt.getMonth()+1,z=rt.getDate();return Y===3&&z>=21||Y===4&&z<=19?"Aries":Y===4&&z>=20||Y===5&&z<=20?"Taurus":Y===5&&z>=21||Y===6&&z<=20?"Gemini":Y===6&&z>=21||Y===7&&z<=22?"Cancer":Y===7&&z>=23||Y===8&&z<=22?"Leo":Y===8&&z>=23||Y===9&&z<=22?"Virgo":Y===9&&z>=23||Y===10&&z<=22?"Libra":Y===10&&z>=23||Y===11&&z<=21?"Scorpio":Y===11&&z>=22||Y===12&&z<=21?"Sagittarius":Y===12&&z>=22||Y===1&&z<=19?"Capricorn":Y===1&&z>=20||Y===2&&z<=18?"Aquarius":Y===2&&z>=19||Y===3&&z<=20?"Pisces":""}function vt(rt){return["Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat","Monkey","Rooster","Dog","Pig"][(rt-4)%12]}function Dt(rt){return rt%4===0&&rt%100!==0||rt%400===0}function Wt(){if(e(L)&&e(S)){const rt=new Date,Y=new Date(e(S));Y.setFullYear(rt.getFullYear()+1);const z=Y.getTime()-rt.getTime();e(U).days=Math.floor(z/(1e3*60*60*24)),e(U).hours=Math.floor(z%(1e3*60*60*24)/(1e3*60*60)),e(U).minutes=Math.floor(z%(1e3*60*60)/(1e3*60)),e(U).seconds=Math.floor(z%(1e3*60)/1e3)}}function Yt(){d(l,0),d(v,0),d(g,0),d(u,0),d(p,0),d(h,0),d(b,0),d(x,0),d(w,0),d(S,""),d(R,0),d(C,""),d(T,""),d(E,""),d(_,0),d(L,!1),d($,!1),d(U,{days:0,hours:0,minutes:0,seconds:0},!0)}function Qt(rt){navigator.clipboard.writeText(rt).then(()=>{})}function Jt(){if(e(l)===0&&e(v)===0&&e(g)===0)return"0 days";const rt=[];return e(l)>0&&rt.push(`${e(l)} year${e(l)!==1?"s":""}`),e(v)>0&&rt.push(`${e(v)} month${e(v)!==1?"s":""}`),e(g)>0&&rt.push(`${e(g)} day${e(g)!==1?"s":""}`),rt.join(", ")}function zt(){return Q.find(rt=>rt.name===e(C))}function Ft(){return e(L)?"🎉 Happy Birthday! 🎂":e(R)===1?"Tomorrow is your birthday! 🎈":e(R)<=7?`${e(R)} days until your birthday! 🎁`:`${e(R)} days until your birthday`}var At=hh();Er(rt=>{var Y=lh();_r.title="Age Calculator - Developer Tools",m(rt,Y)});var Ct=r(At),tt=r(Ct),yt=r(tt);yt.__click=[dh];var pt=r(yt);Ie(pt,{class:"w-5 h-5 mr-2"});var at=n(tt,2),P=r(at),xt=r(P);Va(xt,{class:"w-10 h-10 text-white"});var ft=n(Ct,4),V=r(ft),et=r(V),ht=n(r(et),2),bt=r(ht);bt.__click=[nh,o,s];var wt=n(bt,2);wt.__click=[sh,o,s,c,Yt];var Ut=r(wt);Gi(Ut,{class:"w-4 h-4 mr-2"});var jt=n(et,2),Pt=r(jt),Lt=n(Pt,2),st=n(jt,2),kt=r(st),G=n(r(kt),2),Z=r(G),W=r(Z);W.value=W.__value="exact";var A=n(Z,2),I=r(A);I.value=I.__value="difference";var N=n(ft,2);{var it=rt=>{var Y=yh(),z=r(Y),B=r(z),M=r(B),D=r(M);ka(D,{class:"w-5 h-5 mr-2 text-primary-600 dark:text-primary-400"});var F=n(M,2),X=r(F),j=r(X),dt=r(j),Mt=n(j,4);{var Gt=Ue=>{var Ye=ch(),or=r(Ye),br=n(or);{var Ir=wr=>{var Dr=ca(",");m(wr,Dr)};O(br,wr=>{e(v)>0&&e(g)>0&&wr(Ir)})}var Wr=n(br);K(()=>{y(or,`${e(v)>0?`${e(v)} month${e(v)!==1?"s":""}`:""} `),y(Wr,` ${e(g)>0?`${e(g)} day${e(g)!==1?"s":""}`:""}`)}),m(Ue,Ye)};O(Mt,Ue=>{(e(v)>0||e(g)>0)&&Ue(Gt)})}var St=n(F,2),q=r(St),gt=r(q),$t=r(gt),Ht=n(q,2),J=r(Ht),ot=r(J),_t=n(Ht,2),It=r(_t),Vt=r(It),Xt=n(_t,2),Kt=r(Xt),ee=r(Kt),le=n(St,2),qt=r(le),de=r(qt),ce=r(de),ae=n(qt,2),me=r(ae),pe=r(me),re=n(B,2),ve=r(re),Ce=r(ve);xd(Ce,{class:"w-6 h-6 mr-2"});var Me=n(ve,2),Ot=r(Me);{var ie=Ue=>{var Ye=vh(),or=ut(Ye),br=n(r(or),4),Ir=r(br),Wr=n(or,2),wr=n(r(Wr),2),Dr=r(wr),oa=r(Dr),ha=r(oa),Cr=n(Dr,2),na=r(Cr),Qi=r(na),bi=n(Cr,2),jd=r(bi),Nd=r(jd),Rd=n(bi,2),Bd=r(Rd),Dd=r(Bd);K(()=>{y(Ir,`You are now ${e(l)??""} years old!`),y(ha,e(U).days),y(Qi,e(U).hours),y(Nd,e(U).minutes),y(Dd,e(U).seconds)}),m(Ue,Ye)},fe=Ue=>{var Ye=uh(),or=r(Ye),br=r(or),Ir=n(or,2),Wr=r(Ir),wr=n(Ir,2),Dr=r(wr),oa=n(wr,2);{var ha=Cr=>{var na=gh(),Qi=r(na);K(bi=>y(Qi,`Next birthday: ${bi??""}`),[()=>new Date(e(S)+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})]),m(Cr,na)};O(oa,Cr=>{e(S)&&Cr(ha)})}K(Cr=>{y(br,Cr),y(Wr,e(R)),y(Dr,`${e(R)===1?"day":"days"} remaining`)},[Ft]),m(Ue,Ye)};O(Ot,Ue=>{e(L)?Ue(ie):Ue(fe,!1)})}var he=n(z,2),je=r(he),Ne=r(je),Be=r(Ne);Va(Be,{class:"w-5 h-5 mr-2"});var De=n(Ne,2),_e=r(De),Se=n(r(_e),2),qe=r(Se),Ae=n(_e,2);{var Je=Ue=>{var Ye=mh();m(Ue,Ye)};O(Ae,Ue=>{e($)&&Ue(Je)})}var Ze=n(Ae,2),ur=n(r(Ze),2),lr=r(ur),Le=n(je,2),Xe=r(Le),Pr=r(Xe);_d(Pr,{class:"w-5 h-5 mr-2"});var mr=n(Xe,2);{var pr=Ue=>{const Ye=ue(zt);var or=ph(),br=r(or),Ir=r(br),Wr=r(Ir),wr=n(Ir,2),Dr=r(wr),oa=n(br,2),ha=r(oa),Cr=n(oa,2),na=r(Cr);K(()=>{y(Wr,e(Ye)?.symbol),y(Dr,e(C)),y(ha,e(Ye)?.dates),y(na,`Element: ${e(Ye)?.element??""}`)}),m(Ue,or)};O(mr,Ue=>{e(C)&&Ue(pr)})}var ar=n(mr,2);{var ir=Ue=>{var Ye=fh(),or=n(r(Ye),2),br=r(or);K(()=>y(br,`Year of the ${e(T)??""}`)),m(Ue,Ye)};O(ar,Ue=>{e(T)&&Ue(ir)})}var fr=n(Le,2),Ar=r(fr),kr=r(Ar);bd(kr,{class:"w-5 h-5 mr-2"});var Gr=n(Ar,2),ra=r(Gr),Oe=r(ra),Br=r(Oe),aa=n(ra,2),ja=n(r(aa)),ia=r(ja),Na=n(aa,2),xr=n(r(Na)),Ji=r(xr),Ra=n(Na,2),Vi=n(r(Ra)),Ge=r(Vi),ti=n(Ra,2),Yi=n(r(ti)),Ed=r(Yi),Ld=n(fr,2),Pd=n(r(Ld),2),Ki=r(Pd);Ki.__click=[xh,Qt,Jt];var Ad=r(Ki);be(Ad,{class:"w-4 h-4 mr-2"});var Id=n(Ki,2);Id.__click=[bh,Qt,l,v,g],K((Ue,Ye,or,br,Ir,Wr,wr,Dr,oa,ha,Cr,na)=>{y(dt,e(l)),y($t,Ue),y(ot,Ye),y(Vt,or),y(ee,br),y(ce,Ir),y(pe,Wr),y(qe,e(E)),y(lr,wr),y(Br,Dr),y(ia,oa),y(Ji,ha),y(Ge,Cr),y(Ed,na)},[()=>e(u).toLocaleString(),()=>e(p).toLocaleString(),()=>e(h).toLocaleString(),()=>e(b).toLocaleString(),()=>e(x).toLocaleString(),()=>e(w).toLocaleString(),()=>e(_).toLocaleString(),()=>e(p).toLocaleString(),()=>new Date(e(o)).getFullYear()+e(l)-new Date(e(o)).getFullYear(),()=>(e(u)*8).toLocaleString(),()=>(e(u)*50).toLocaleString(),()=>(e(x)*80).toLocaleString()]),m(rt,Y)};O(N,rt=>{(e(l)>0||e(v)>0||e(g)>0)&&rt(it)})}K(()=>Nt(Pt,"max",e(s))),Tt(Pt,()=>e(o),rt=>d(o,rt)),Tt(Lt,()=>e(s),rt=>d(s,rt)),Ai(a,[],W,()=>e(c),rt=>d(c,rt)),Ai(a,[],I,()=>e(c),rt=>d(c,rt)),m(i,At),Bt()}ye(["click"]);function kh(i,t){const a=Math.max(...e(t).map(o=>o.id))+1;d(t,[...e(t),{id:a,text:"",weight:1}],!0)}async function wh(i,t,a,o,s,c,l){const v=e(t).filter(b=>b.text.trim()!=="");if(v.length===0){d(a,{text:"Please add some items first!",type:"error"},!0);return}d(o,!0),d(a,null);const g=20,u=e(s)/g;for(let b=0;b<g;b++){const x=v[Math.floor(Math.random()*v.length)];d(a,{text:x.text,type:"animating"},!0),await new Promise(w=>setTimeout(w,u))}const p=c();if(p.length===0){d(a,{text:"Please add some items first!",type:"error"},!0),d(o,!1);return}d(a,{text:p.length===1?p[0].text:`${p.length} items selected`,type:"success",items:p},!0);const h={id:Date.now(),items:p.map(b=>b.text),timestamp:new Date,totalItems:v.length};d(l,[h,...e(l).slice(0,9)],!0),d(o,!1)}function Ch(i,t,a,o,s){d(t,[{id:1,text:"",weight:1}],!0),d(a,null),d(o,[],!0),s()}function $h(i,t){if(e(t)&&e(t).items){const a=e(t).items.map(o=>o.text).join(", ");navigator.clipboard.writeText(a)}else e(t)&&navigator.clipboard.writeText(e(t).text)}var Sh=k('<meta name="description" content="Random item picker with weighted selections, multiple picks, and history tracking"/>'),Th=()=>Te("/tools"),Mh=(i,t,a)=>t(e(a)),Eh=k('<button class="p-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"><!> <div class="text-sm font-medium text-gray-900 dark:text-white"> </div> <div class="text-xs text-gray-500 dark:text-gray-400"> </div></button>'),Lh=k('<div class="flex items-center gap-1"><label class="text-sm text-gray-600 dark:text-gray-400">Weight:</label> <input type="number" min="0.1" step="0.1" class="w-20 px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"/></div>'),Ph=(i,t,a)=>t(e(a).id),Ah=k('<div class="flex gap-3"><input type="text" placeholder="Enter item name" class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"/> <!> <button class="p-2 text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"><!></button></div>'),Ih=k('<span class="text-sm text-gray-600 dark:text-gray-400"> </span>'),jh=k('<div class="flex items-center"><div class="animate-spin"><!></div> Picking...</div>'),Nh=k("<!> ",1),Rh=k('<div class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"><p class="text-red-700 dark:text-red-300 text-center"> </p></div>'),Bh=k('<div class="text-center py-8"><div class="inline-block animate-bounce"><!></div> <p class="mt-4 text-gray-600 dark:text-gray-400 animate-pulse"> </p></div>'),Dh=k('<div class="px-3 py-1 bg-white dark:bg-gray-800 rounded-full border border-green-200 dark:border-green-700"> </div>'),Fh=k('<div class="mt-4 space-y-2"></div>'),Hh=k('<div class="text-center py-8"><div class="inline-block p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border-2 border-green-200 dark:border-green-800"><!> <h3 class="text-2xl font-bold text-green-700 dark:text-green-300 mb-2"> </h3> <!></div></div>'),Oh=k('<div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><div class="flex items-center justify-between mb-4"><h2 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center"><!> Result</h2> <div class="flex gap-2"><button class="btn btn-primary btn-sm"><!> Copy</button> <button class="btn btn-primary btn-sm"><!></button></div></div> <!></div>'),Uh=k('<p class="text-gray-500 dark:text-gray-400 text-sm">No picks yet</p>'),zh=(i,t,a)=>t(e(a)),qh=k('<button class="w-full text-left p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"><div class="text-sm font-medium text-gray-900 dark:text-white"> <!></div> <div class="text-xs text-gray-500 dark:text-gray-400"> </div></button>'),Gh=k('<div class="space-y-3 max-h-96 overflow-y-auto"></div>'),Wh=k('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Random Picker</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Make random selections with weighted options and multiple picks</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Random Picker</li></ol></nav> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-6"><div class="p-6"><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Presets</h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3"></div></div></div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-2 space-y-6"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><div class="flex items-center justify-between mb-4"><h2 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center"><!> Items to Pick From</h2> <div class="flex gap-2"><button class="btn btn-primary btn-sm"><!> Add Item</button> <button class="btn btn-primary btn-sm">Clear All</button></div></div> <div class="space-y-3"></div> <div class="mt-4 flex items-center justify-between"><label class="flex items-center"><input type="checkbox" class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"/> <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Enable Weights</span></label> <!></div></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Picker Settings</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"><div><label for="number-of-picks" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Number of Picks</label> <input id="number-of-picks" type="number" min="1" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"/></div> <div><label for="animation-speed" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Animation Speed (ms)</label> <input id="animation-speed" type="range" min="500" max="5000" step="500" class="w-full"/> <div class="text-xs text-gray-500 dark:text-gray-400"> </div></div></div> <div class="flex items-center mb-6"><input id="allow-duplicates" type="checkbox" class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"/> <label for="allow-duplicates" class="ml-2 text-sm text-gray-700 dark:text-gray-300">Allow Duplicates (when picking multiple items)</label></div> <button class="btn btn-primary w-full"><!></button></div> <!></div> <div class="space-y-6"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">History</h3> <!></div> <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-primary-200 dark:border-primary-800 p-6"><h3 class="text-lg font-semibold text-primary-800 dark:text-primary-200 mb-4 flex items-center"><!> Pro Tips</h3> <div class="space-y-3 text-sm text-primary-700 dark:text-primary-300"><div class="flex items-start"><div class="w-2 h-2 bg-primary-500 rounded-full mt-1.5 mr-3"></div> <p>Use weights to give some items higher chances of being selected</p></div> <div class="flex items-start"><div class="w-2 h-2 bg-primary-500 rounded-full mt-1.5 mr-3"></div> <p>Enable multiple picks for selecting more than one item at once</p></div> <div class="flex items-start"><div class="w-2 h-2 bg-primary-500 rounded-full mt-1.5 mr-3"></div> <p>History helps you track previous random selections</p></div> <div class="flex items-start"><div class="w-2 h-2 bg-primary-500 rounded-full mt-1.5 mr-3"></div> <p>Use presets for quick decision-making scenarios</p></div></div></div></div></div></div>');function Jh(i,t){Rt(t,!0);let a=f(Pe([{id:1,text:"",weight:1},{id:2,text:"",weight:1},{id:3,text:"",weight:1}])),o=f(null),s=f(Pe([])),c=f(!1),l=f(1),v=f(!1),g=f(!1),u=f(2e3);const p=[{name:"Decision Maker",icon:In,items:[{text:"Yes",weight:1},{text:"No",weight:1},{text:"Maybe",weight:1}]},{name:"Restaurant Picker",icon:nc,items:[{text:"Pizza",weight:1},{text:"Burger",weight:1},{text:"Sushi",weight:1},{text:"Pasta",weight:1},{text:"Thai",weight:1}]},{name:"Team Selector",icon:vn,items:[{text:"Team A",weight:1},{text:"Team B",weight:1},{text:"Team C",weight:1},{text:"Team D",weight:1}]},{name:"Activity Ideas",icon:Ve,items:[{text:"Go for a walk",weight:1},{text:"Read a book",weight:1},{text:"Watch a movie",weight:1},{text:"Call a friend",weight:1},{text:"Try a new recipe",weight:1}]}];function h(B){e(a).length>1&&d(a,e(a).filter(M=>M.id!==B),!0)}function b(B){d(a,B.items.map((M,D)=>({id:D+1,text:M.text,weight:M.weight})),!0),w()}function x(){const B=e(a).filter(X=>X.text.trim()!=="");if(B.length===0)return[];const M=B.reduce((X,j)=>X+j.weight,0),D=[],F=[...B];for(let X=0;X<Math.min(e(l),F.length);X++){let j=Math.random()*M,dt=0;for(let Gt=0;Gt<F.length;Gt++)if(j-=F[Gt].weight,j<=0){dt=Gt;break}const Mt=F[dt];D.push(Mt),e(v)||F.splice(dt,1)}return D}function w(){d(o,null),d(c,!1)}function S(B){d(a,B.items.map((M,D)=>({id:D+1,text:M,weight:1})),!0),w()}const R=ue(()=>e(a).reduce((B,M)=>B+(parseFloat(String(M.weight))||1),0));var C=Wh();Er(B=>{var M=Sh();_r.title="Random Picker - Developer Tools",m(B,M)});var T=r(C),E=r(T),_=r(E);_.__click=[Th];var L=r(_);Ie(L,{class:"w-5 h-5"});var $=n(E,2),H=r($),U=r(H);so(U,{class:"w-10 h-10 text-white"});var Q=n(T,4),mt=r(Q),lt=n(r(mt),2);xe(lt,21,()=>p,B=>B.name,(B,M)=>{var D=Eh();D.__click=[Mh,b,M];var F=r(D);sr(F,()=>e(M).icon,(Gt,St)=>{St(Gt,{class:"w-5 h-5 text-gray-600 dark:text-gray-400 mb-2"})});var X=n(F,2),j=r(X),dt=n(X,2),Mt=r(dt);K(()=>{y(j,e(M).name),y(Mt,`${e(M).items.length??""} items`)}),m(B,D)});var nt=n(Q,2),ct=r(nt),vt=r(ct),Dt=r(vt),Wt=r(Dt),Yt=r(Wt);G0(Yt,{class:"w-5 h-5 mr-2"});var Qt=n(Wt,2),Jt=r(Qt);Jt.__click=[kh,a];var zt=r(Jt);Ii(zt,{class:"w-4 h-4 mr-1"});var Ft=n(Jt,2);Ft.__click=[Ch,a,o,s,w];var At=n(Dt,2);xe(At,21,()=>e(a),B=>B.id,(B,M,D)=>{var F=Ah(),X=r(F),j=n(X,2);{var dt=St=>{var q=Lh(),gt=r(q),$t=n(gt,2);K(()=>{Nt(gt,"for",`weight-${e(M).id??""}`),Nt($t,"id",`weight-${e(M).id??""}`)}),Tt($t,()=>e(M).weight,Ht=>e(M).weight=Ht),m(St,q)};O(j,St=>{e(g)&&St(dt)})}var Mt=n(j,2);Mt.__click=[Ph,h,M];var Gt=r(Mt);ui(Gt,{class:"w-4 h-4"}),K(()=>Mt.disabled=e(a).length===1),Tt(X,()=>e(M).text,St=>e(M).text=St),m(B,F)});var Ct=n(At,2),tt=r(Ct),yt=r(tt),pt=n(tt,2);{var at=B=>{var M=Ih(),D=r(M);K(F=>y(D,`Total Weight: ${F??""}`),[()=>e(R).toFixed(1)]),m(B,M)};O(pt,B=>{e(g)&&B(at)})}var P=n(vt,2),xt=n(r(P),2),ft=r(xt),V=n(r(ft),2),et=n(ft,2),ht=n(r(et),2),bt=n(ht,2),wt=r(bt),Ut=n(xt,2),jt=r(Ut),Pt=n(Ut,2);Pt.__click=[wh,a,o,c,u,x,s];var Lt=r(Pt);{var st=B=>{var M=jh(),D=r(M),F=r(D);so(F,{class:"w-5 h-5 mr-2"}),m(B,M)},kt=B=>{var M=Nh(),D=ut(M);so(D,{class:"w-5 h-5 mr-2"});var F=n(D);K(()=>y(F,` Pick Random Item${e(l)>1?"s":""}`)),m(B,M)};O(Lt,B=>{e(c)?B(st):B(kt,!1)})}var G=n(P,2);{var Z=B=>{var M=Oh(),D=r(M),F=r(D),X=r(F);xd(X,{class:"w-5 h-5 mr-2"});var j=n(F,2),dt=r(j);dt.__click=[$h,o];var Mt=r(dt);be(Mt,{class:"w-4 h-4 mr-1"});var Gt=n(dt,2);Gt.__click=w;var St=r(Gt);Gi(St,{class:"w-4 h-4"});var q=n(D,2);{var gt=Ht=>{var J=Rh(),ot=r(J),_t=r(ot);K(()=>y(_t,e(o).text)),m(Ht,J)},$t=Ht=>{var J=Et(),ot=ut(J);{var _t=Vt=>{var Xt=Bh(),Kt=r(Xt),ee=r(Kt);In(ee,{class:"w-16 h-16 text-primary-600 dark:text-primary-400"});var le=n(Kt,2),qt=r(le);K(()=>y(qt,e(o).text)),m(Vt,Xt)},It=Vt=>{var Xt=Hh(),Kt=r(Xt),ee=r(Kt);_d(ee,{class:"w-12 h-12 text-primary-600 dark:text-primary-400 mx-auto mb-3"});var le=n(ee,2),qt=r(le),de=n(le,2);{var ce=ae=>{var me=Fh();xe(me,21,()=>e(o).items,pe=>pe.text,(pe,re)=>{var ve=Dh(),Ce=r(ve);K(()=>y(Ce,e(re).text)),m(pe,ve)}),m(ae,me)};O(de,ae=>{e(o).items&&e(o).items.length>1&&ae(ce)})}K(()=>y(qt,e(o).text)),m(Vt,Xt)};O(ot,Vt=>{e(o).type==="animating"?Vt(_t):Vt(It,!1)},!0)}m(Ht,J)};O(q,Ht=>{e(o).type==="error"?Ht(gt):Ht($t,!1)})}m(B,M)};O(G,B=>{e(o)&&B(Z)})}var W=n(ct,2),A=r(W),I=n(r(A),2);{var N=B=>{var M=Uh();m(B,M)},it=B=>{var M=Gh();xe(M,21,()=>e(s),D=>D.id,(D,F)=>{var X=qh();X.__click=[zh,S,F];var j=r(X),dt=r(j),Mt=n(dt);{var Gt=gt=>{var $t=ca();K(()=>y($t,`+${e(F).items.length-2} more`)),m(gt,$t)};O(Mt,gt=>{e(F).items.length>2&&gt(Gt)})}var St=n(j,2),q=r(St);K((gt,$t)=>{y(dt,`${gt??""} `),y(q,`${$t??""} • ${e(F).totalItems??""} total items`)},[()=>e(F).items.slice(0,2).join(", "),()=>e(F).timestamp.toLocaleTimeString()]),m(D,X)}),m(B,M)};O(I,B=>{e(s).length===0?B(N):B(it,!1)})}var rt=n(A,2),Y=r(rt),z=r(Y);Ve(z,{class:"w-5 h-5 mr-2"}),K((B,M)=>{Nt(V,"max",B),y(wt,`${e(u)??""}ms`),Pt.disabled=M},[()=>e(a).filter(B=>B.text.trim()!=="").length,()=>e(c)||e(a).filter(B=>B.text.trim()!=="").length===0]),We(yt,()=>e(g),B=>d(g,B)),Tt(V,()=>e(l),B=>d(l,B)),Tt(ht,()=>e(u),B=>d(u,B)),We(jt,()=>e(v),B=>d(v,B)),m(i,C),Bt()}ye(["click"]);function oi(i,t,a,o,s,c,l,v){d(t,`${e(a)} ${e(o)} ${e(s)} ${e(c)} ${e(l)}`),v()}async function Vh(i,t,a){try{await navigator.clipboard.writeText(e(t)),d(a,!0),setTimeout(()=>d(a,!1),2e3)}catch(o){console.error("Failed to copy:",o)}}function Yh(i,t,a){const o=Math.floor(Math.random()*60).toString(),s=Math.floor(Math.random()*24).toString(),c=Math.floor(Math.random()*28)+1;d(t,`${o} ${s} ${c} * *`),a()}var Kh=k('<meta name="description" content="Generate and test cron expressions with visual builder and next run times"/>'),Qh=()=>Te("/tools"),Zh=k('<button class="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-xs font-semibold transition-colors" disabled>Copied!</button>'),Xh=k('<button class="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/20 hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors relative group" title="Copy to clipboard"><!></button>'),t2=k('<div class="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm"><!> Invalid cron expression format</div>'),e2=k('<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><!> Description</h3> <p class="text-gray-700 dark:text-gray-300"> </p></div>'),r2=k('<div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"><!> </div>'),a2=k('<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><!> Next Run Times</h3> <div class="space-y-2"></div></div>'),i2=(i,t,a)=>t(e(a).expression),o2=k('<button class="text-left p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"><div class="font-medium text-gray-900 dark:text-white text-sm"> </div> <div class="text-xs text-gray-500 dark:text-gray-400 font-mono mt-1"> </div></button>'),n2=k(`<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Cron Expression Generator</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Create and validate cron expressions with visual builder and next run times</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Cron Generator</li></ol></nav> <div class="grid lg:grid-cols-2 gap-6"><div class="space-y-6"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><div class="flex items-center justify-between mb-4"><h2 class="text-xl font-semibold text-gray-900 dark:text-white">Cron Expression</h2> <div class="flex items-center gap-2"><button class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" title="Generate Random"><!></button> <!></div></div> <div class="space-y-4"><input type="text" placeholder="* * * * *"/> <div class="text-sm text-gray-600 dark:text-gray-400"><span class="font-medium">Format:</span> [Minute] [Hour] [Day of Month] [Month] [Day of Week]</div> <!></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Manual Builder</h3> <div class="space-y-4"><div><label for="minute" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Minute (0-59)</label> <input id="minute" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="0"/></div> <div><label for="hour" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hour (0-23)</label> <input id="hour" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="0"/></div> <div><label for="day-of-month" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Day of Month (1-31)</label> <input id="day-of-month" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="*"/></div> <div><label for="month" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Month (1-12)</label> <input id="month" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="*"/></div> <div><label for="day-of-week" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Day of Week (0-6, 0=Sunday)</label> <input id="day-of-week" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="*"/></div></div></div></div> <div class="space-y-6"><!> <!> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Common Presets</h3> <div class="grid grid-cols-1 sm:grid-cols-2 gap-3"></div></div> <div class="bg-primary-100 dark:bg-primary-900/20 rounded-xl border border-primary-200 dark:border-primary-800 p-6"><h3 class="text-lg font-semibold text-blue-900 dark:text-blue-400 mb-4 flex items-center gap-2"><!> Cron Syntax Help</h3> <div class="space-y-3 text-sm text-blue-800 dark:text-blue-300"><div><strong class="font-semibold">* (asterisk)</strong> - any value</div> <div><strong class="font-semibold">, (comma)</strong> - value list separator</div> <div><strong class="font-semibold">- (hyphen)</strong> - range of values</div> <div><strong class="font-semibold">/ (forward slash)</strong> - step values</div> <div><strong class="font-semibold">Examples:</strong> <ul class="mt-2 space-y-1 ml-4"><li>• <code class="bg-blue-100 dark:bg-blue-900/30 px-1 rounded">*/15 * * * *</code> - Every
                15 minutes</li> <li>• <code class="bg-blue-100 dark:bg-blue-900/30 px-1 rounded">0 9 * * 1-5</code> - Weekdays
                at 9 AM</li> <li>• <code class="bg-blue-100 dark:bg-blue-900/30 px-1 rounded">0 0 1 * *</code> - First
                day of every month</li></ul></div></div></div></div></div></div>`);function s2(i,t){Rt(t,!0);let a=f("0 0 * * *"),o=f(Pe([])),s=f(!0),c=f(!1),l=f("0"),v=f("0"),g=f("*"),u=f("*"),p=f("*");const h=[{name:"Every minute",expression:"* * * * *"},{name:"Every hour",expression:"0 * * * *"},{name:"Every day at midnight",expression:"0 0 * * *"},{name:"Every day at noon",expression:"0 12 * * *"},{name:"Every week on Monday",expression:"0 0 * * 1"},{name:"Every month on 1st",expression:"0 0 1 * *"},{name:"Every weekday at 9 AM",expression:"0 9 * * 1-5"},{name:"Every weekend at midnight",expression:"0 0 * * 0,6"},{name:"Every 15 minutes",expression:"*/15 * * * *"},{name:"Every 4 hours",expression:"0 */4 * * *"}];function b(N){try{const it=N.split(" ");if(it.length!==5)return"Invalid cron expression";const[rt,Y,z,B,M]=it;let D="Run";if(rt==="*")D+=" every minute";else if(rt.includes("/")){const F=rt.split("/")[1];D+=` every ${F} minutes`}else if(rt.includes(",")){const F=rt.split(",").join(", ");D+=` at minute(s) ${F}`}else if(rt.includes("-")){const[F,X]=rt.split("-");D+=` from minute ${F} to ${X}`}else D+=` at minute ${rt}`;if(Y!=="*")if(Y.includes("/")){const F=Y.split("/")[1];D+=` every ${F} hours`}else if(Y.includes(",")){const F=Y.split(",").join(", ");D+=` at hour(s) ${F}`}else if(Y.includes("-")){const[F,X]=Y.split("-");D+=` from hour ${F} to ${X}`}else D+=` at ${Y.padStart(2,"0")}:00`;if(z!=="*")if(z.includes("/")){const F=z.split("/")[1];D+=` every ${F} days`}else D+=` on day ${z}`;if(B!=="*")if(B.includes(",")){const F=B.split(",").map(X=>x(parseInt(X))).join(", ");D+=` in ${F}`}else D+=` in ${x(parseInt(B))}`;if(M!=="*")if(M.includes(",")){const F=M.split(",").map(X=>w(parseInt(X))).join(", ");D+=` on ${F}`}else D+=` on ${w(parseInt(M))}`;return D}catch{return"Invalid cron expression"}}function x(N){return["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][N-1]||N.toString()}function w(N){return["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][N]||N.toString()}function S(N,it=10){try{if(N.split(" ").length!==5)return[];const Y=new Date,z=[];for(let B=0;B<it;B++){const M=new Date(Y);M.setMinutes(M.getMinutes()+(B+1)*5),z.push(M.toLocaleString())}return z}catch{return[]}}function R(){const N=e(a).split(" ");N.length===5&&(it=>{var rt=Qa(it,5);d(l,rt[0],!0),d(v,rt[1],!0),d(g,rt[2],!0),d(u,rt[3],!0),d(p,rt[4],!0)})(N),C()}function C(){const N=e(a).split(" ");d(s,N.length===5&&N.every(it=>it.trim()!==""),!0),e(s)?d(o,S(e(a)),!0):d(o,[],!0)}function T(N){d(a,N,!0),R()}R();var E=n2();Er(N=>{var it=Kh();_r.title="Cron Expression Generator - Developer Tools",m(N,it)});var _=r(E),L=r(_),$=r(L);$.__click=[Qh];var H=r($);Ie(H,{class:"w-5 h-5"});var U=n(L,2),Q=r(U),mt=r(Q);ec(mt,{class:"w-10 h-10 text-white"});var lt=n(_,4),nt=r(lt),ct=r(nt),vt=r(ct),Dt=n(r(vt),2),Wt=r(Dt);Wt.__click=[Yh,a,R];var Yt=r(Wt);Tr(Yt,{class:"w-4 h-4"});var Qt=n(Wt,2);{var Jt=N=>{var it=Zh();m(N,it)},zt=N=>{var it=Xh();it.__click=[Vh,a,c];var rt=r(it);be(rt,{class:"w-4 h-4 text-primary-600 dark:text-primary-400"}),m(N,it)};O(Qt,N=>{e(c)?N(Jt):N(zt,!1)})}var Ft=n(vt,2),At=r(Ft);At.__input=R;var Ct=n(At,4);{var tt=N=>{var it=t2(),rt=r(it);pa(rt,{class:"w-4 h-4"}),m(N,it)};O(Ct,N=>{e(s)||N(tt)})}var yt=n(ct,2),pt=n(r(yt),2),at=r(pt),P=n(r(at),2);P.__input=[oi,a,l,v,g,u,p,C];var xt=n(at,2),ft=n(r(xt),2);ft.__input=[oi,a,l,v,g,u,p,C];var V=n(xt,2),et=n(r(V),2);et.__input=[oi,a,l,v,g,u,p,C];var ht=n(V,2),bt=n(r(ht),2);bt.__input=[oi,a,l,v,g,u,p,C];var wt=n(ht,2),Ut=n(r(wt),2);Ut.__input=[oi,a,l,v,g,u,p,C];var jt=n(nt,2),Pt=r(jt);{var Lt=N=>{var it=e2(),rt=r(it),Y=r(rt);pa(Y,{class:"w-5 h-5"});var z=n(rt,2),B=r(z);K(M=>y(B,M),[()=>b(e(a))]),m(N,it)};O(Pt,N=>{e(s)&&N(Lt)})}var st=n(Pt,2);{var kt=N=>{var it=a2(),rt=r(it),Y=r(rt);Va(Y,{class:"w-5 h-5"});var z=n(rt,2);xe(z,20,()=>e(o).slice(0,5),B=>B,(B,M)=>{var D=r2(),F=r(D);ka(F,{class:"w-4 h-4"});var X=n(F);K(()=>y(X,` ${M??""}`)),m(B,D)}),m(N,it)};O(st,N=>{e(s)&&e(o).length>0&&N(kt)})}var G=n(st,2),Z=n(r(G),2);xe(Z,21,()=>h,N=>N.name,(N,it)=>{var rt=o2();rt.__click=[i2,T,it];var Y=r(rt),z=r(Y),B=n(Y,2),M=r(B);K(()=>{y(z,e(it).name),y(M,e(it).expression)}),m(N,rt)});var W=n(G,2),A=r(W),I=r(A);pa(I,{class:"w-5 h-5"}),K(()=>ge(At,1,`w-full px-4 py-3 rounded-lg border ${e(s)?"border-gray-300 dark:border-gray-600":"border-red-300 dark:border-red-600"} bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-mono text-lg focus:outline-none focus:ring-2 focus:ring-primary-500`)),Tt(At,()=>e(a),N=>d(a,N)),Tt(P,()=>e(l),N=>d(l,N)),Tt(ft,()=>e(v),N=>d(v,N)),Tt(et,()=>e(g),N=>d(g,N)),Tt(bt,()=>e(u),N=>d(u,N)),Tt(Ut,()=>e(p),N=>d(p,N)),m(i,E),Bt()}ye(["click","input"]);function d2(i,t,a,o){d(t,""),d(a,""),d(o,null)}function l2(i,t,a,o){d(t,"a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e"),d(a,"a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e"),o()}function c2(i,t,a,o){d(t,"a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e"),d(a,"b591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e"),o()}function v2(){Te("/tools")}var g2=(i,t,a)=>t(e(a),"hash1"),u2=(i,t,a)=>t(e(a),"hash2"),m2=k('<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Comparison Details</h3> <div class="space-y-4"><div class="flex items-center justify-between"><span class="text-gray-600 dark:text-gray-400">Match Status:</span> <span> </span></div> <div class="flex items-center justify-between"><span class="text-gray-600 dark:text-gray-400">Hash 1 Length:</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div> <div class="flex items-center justify-between"><span class="text-gray-600 dark:text-gray-400">Hash 2 Length:</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div> <div class="flex items-center justify-between"><span class="text-gray-600 dark:text-gray-400">Length Match:</span> <span> </span></div></div></div>'),p2=k('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Hash Comparer</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Compare two hash values to verify data integrity and check for matches.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Hash Comparer</li></ol></nav> <div class="mb-6 flex flex-wrap gap-4 items-center justify-center"><button class="px-4 py-2 bg-success-600 text-white rounded-lg hover:bg-success-700 transition-colors">Load Matching Hashes</button> <button class="px-4 py-2 bg-danger-600 text-white rounded-lg hover:bg-danger-700 transition-colors">Load Different Hashes</button> <button class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">Clear All</button></div> <div class="mb-6"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 text-center"><div class="flex items-center justify-center gap-3"><div><!></div> <div><h3 class="text-lg font-semibold text-gray-900 dark:text-white"> </h3> <p class="text-sm text-gray-500 dark:text-gray-400"> </p></div></div></div></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><div class="flex justify-between items-center mb-4"><h3 class="text-lg font-semibold text-gray-900 dark:text-white">Hash 1</h3> <div class="flex items-center gap-2"><span class="text-sm text-gray-500 dark:text-gray-400"> </span> <button class="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"><!></button></div></div> <textarea placeholder="Enter first hash value..." class="w-full h-32 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"></textarea></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><div class="flex justify-between items-center mb-4"><h3 class="text-lg font-semibold text-gray-900 dark:text-white">Hash 2</h3> <div class="flex items-center gap-2"><span class="text-sm text-gray-500 dark:text-gray-400"> </span> <button class="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"><!></button></div></div> <textarea placeholder="Enter second hash value..." class="w-full h-32 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"></textarea></div></div> <!> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Common Use Cases</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">File Integrity Check</h4> <p class="text-sm text-gray-600 dark:text-gray-400">Verify downloaded files by comparing hash values with original sources</p></div> <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">Password Verification</h4> <p class="text-sm text-gray-600 dark:text-gray-400">Compare stored password hashes with user-provided password hashes</p></div> <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">Data Deduplication</h4> <p class="text-sm text-gray-600 dark:text-gray-400">Identify duplicate files or data blocks by comparing their hash values</p></div> <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">Blockchain Verification</h4> <p class="text-sm text-gray-600 dark:text-gray-400">Validate blockchain transactions and smart contract hashes</p></div></div></div> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-secondary-100 dark:bg-secondary-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Real-time Comparison</h3> <p class="text-gray-600 dark:text-gray-400">Instantly compare hash values as you type with automatic result updates</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-secondary-100 dark:bg-secondary-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Easy Copy & Paste</h3> <p class="text-gray-600 dark:text-gray-400">Quickly copy hash values and paste them for seamless data verification</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-secondary-100 dark:bg-secondary-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Detailed Analysis</h3> <p class="text-gray-600 dark:text-gray-400">Get comprehensive comparison details including length and character analysis</p></div></div></div>');function f2(i,t){Rt(t,!0);let a=f(""),o=f(""),s=f(null),c=f("");function l(){if(!e(a).trim()&&!e(o).trim()){d(s,"empty");return}if(!e(a).trim()||!e(o).trim()){d(s,"different");return}const z=e(a).trim().toLowerCase().replace(/\s+/g,""),B=e(o).trim().toLowerCase().replace(/\s+/g,"");d(s,z===B?"match":"different",!0)}function v(z,B){navigator.clipboard.writeText(z),d(c,B,!0),setTimeout(()=>{d(c,"")},2e3)}ke(()=>{e(a)&&e(o)?l():!e(a)&&!e(o)?d(s,null):d(s,"different")});const g=ue(()=>()=>{switch(e(s)){case"match":return ma;case"different":return ln;case"empty":return He;default:return qa}}),u=ue(()=>e(g)());function p(){switch(e(s)){case"match":return"text-success-600 bg-success-100 dark:bg-success-900/20 dark:text-success-400";case"different":return"text-danger-600 bg-danger-100 dark:bg-danger-900/20 dark:text-danger-400";case"empty":return"text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400";default:return"text-secondary-600 bg-secondary-100 dark:bg-secondary-900/20 dark:text-secondary-400"}}function h(){switch(e(s)){case"match":return"Hashes Match! ✓";case"different":return"Hashes Do Not Match ✗";case"empty":return"Enter hashes to compare";default:return"Ready to compare"}}var b=p2(),x=r(b),w=r(x),S=r(w);S.__click=[v2];var R=r(S);Ie(R,{class:"w-5 h-5"});var C=n(w,2),T=r(C),E=r(T);qa(E,{class:"w-10 h-10 text-white"});var _=n(x,4),L=r(_);L.__click=[l2,a,o,l];var $=n(L,2);$.__click=[c2,a,o,l];var H=n($,2);H.__click=[d2,a,o,s];var U=n(_,2),Q=r(U),mt=r(Q),lt=r(mt),nt=r(lt);sr(nt,()=>e(u),(z,B)=>{B(z,{class:"w-6 h-6"})});var ct=n(lt,2),vt=r(ct),Dt=r(vt),Wt=n(vt,2),Yt=r(Wt),Qt=n(U,2),Jt=r(Qt),zt=r(Jt),Ft=n(r(zt),2),At=r(Ft),Ct=r(At),tt=n(At,2);tt.__click=[g2,v,a];var yt=r(tt);{var pt=z=>{ma(z,{class:"w-4 h-4 text-green-600"})},at=z=>{be(z,{class:"w-4 h-4"})};O(yt,z=>{e(c)==="hash1"?z(pt):z(at,!1)})}var P=n(zt,2),xt=n(Jt,2),ft=r(xt),V=n(r(ft),2),et=r(V),ht=r(et),bt=n(et,2);bt.__click=[u2,v,o];var wt=r(bt);{var Ut=z=>{ma(z,{class:"w-4 h-4 text-green-600"})},jt=z=>{be(z,{class:"w-4 h-4"})};O(wt,z=>{e(c)==="hash2"?z(Ut):z(jt,!1)})}var Pt=n(ft,2),Lt=n(Qt,2);{var st=z=>{var B=m2(),M=n(r(B),2),D=r(M),F=n(r(D),2),X=r(F),j=n(D,2),dt=n(r(j),2),Mt=r(dt),Gt=n(j,2),St=n(r(Gt),2),q=r(St),gt=n(Gt,2),$t=n(r(gt),2),Ht=r($t);K((J,ot,_t,It)=>{ge(F,1,`font-medium ${e(s)==="match"?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400"}`),y(X,e(s)==="match"?"✓ Identical":"✗ Different"),y(Mt,`${J??""} characters`),y(q,`${ot??""} characters`),ge($t,1,`font-medium ${_t??""}`),y(Ht,It)},[()=>e(a).trim().length,()=>e(o).trim().length,()=>e(a).trim().length===e(o).trim().length?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400",()=>e(a).trim().length===e(o).trim().length?"✓ Yes":"✗ No"]),m(z,B)};O(Lt,z=>{e(s)&&e(s)!=="empty"&&z(st)})}var kt=n(Lt,4),G=r(kt),Z=r(G),W=r(Z);qa(W,{class:"w-6 h-6 text-secondary-600 dark:text-secondary-400"});var A=n(G,2),I=r(A),N=r(I);be(N,{class:"w-6 h-6 text-secondary-600 dark:text-secondary-400"});var it=n(A,2),rt=r(it),Y=r(rt);He(Y,{class:"w-6 h-6 text-secondary-600 dark:text-secondary-400"}),K((z,B,M,D)=>{ge(lt,1,`w-12 h-12 ${z??""} rounded-lg flex items-center justify-center`),y(Dt,B),y(Yt,e(s)==="match"?"Both hash values are identical":e(s)==="different"?"Hash values are different":"Enter two hash values to compare"),y(Ct,`${e(a).length??""} characters`),tt.disabled=M,y(ht,`${e(o).length??""} characters`),bt.disabled=D},[p,h,()=>!e(a).trim(),()=>!e(o).trim()]),Tt(P,()=>e(a),z=>d(a,z)),Tt(Pt,()=>e(o),z=>d(o,z)),m(i,b),Bt()}ye(["click"]);function x2(i,t,a){navigator.clipboard.writeText(e(t)),d(a,"ascii"),setTimeout(()=>{d(a,"")},2e3)}function b2(i,t,a){d(t,""),d(a,"")}function y2(i,t,a){d(t,"HELLO"),a()}function h2(){Te("/tools")}var _2=(i,t,a)=>d(t,a(),!0),k2=k('<button><div class="text-left"><h4 class="font-medium text-gray-900 dark:text-white mb-1"> </h4> <p class="text-xs text-gray-500 dark:text-gray-400"> </p></div></button>'),w2=k("<!> Copied!",1),C2=k("<!> Copy",1),$2=k('<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><div class="flex justify-between items-center mb-4"><h3 class="text-lg font-semibold text-gray-900 dark:text-white">ASCII Art Result</h3> <div class="flex gap-2"><button class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"><!></button> <button class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"><!> Download</button></div></div> <div class="relative"><pre class="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg font-mono text-sm text-gray-900 dark:text-white overflow-x-auto whitespace-pre"> </pre></div></div>'),S2=k(`<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">ASCII Art Generator</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Convert text into ASCII art with different styles. Perfect for terminal displays and
        creative text art.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">ASCII Art Generator</li></ol></nav> <div class="mb-6 flex flex-wrap gap-4 items-center justify-center"><button class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">Load Sample Text</button> <button class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">Clear All</button></div> <div class="mb-6"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Art Style</h3> <div class="grid grid-cols-1 md:grid-cols-3 gap-4"></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><div class="flex justify-between items-center mb-4"><h3 class="text-lg font-semibold text-gray-900 dark:text-white">Input Text</h3> <span class="text-sm text-gray-500 dark:text-gray-400"> </span></div> <input type="text" placeholder="Enter text to convert to ASCII art..." class="w-full p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"/> <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">Maximum 10 characters recommended for best results. Supports letters, numbers, and basic
      punctuation.</p></div> <!> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Supported Characters</h3> <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"><div class="text-sm"><span class="font-medium text-gray-900 dark:text-white">Letters:</span> <span class="text-gray-600 dark:text-gray-400">A-Z</span></div> <div class="text-sm"><span class="font-medium text-gray-900 dark:text-white">Numbers:</span> <span class="text-gray-600 dark:text-gray-400">0-9</span></div> <div class="text-sm"><span class="font-medium text-gray-900 dark:text-white">Punctuation:</span> <span class="text-gray-600 dark:text-gray-400">! ? . ,</span></div> <div class="text-sm"><span class="font-medium text-gray-900 dark:text-white">Space:</span> <span class="text-gray-600 dark:text-gray-400">Supported</span></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Usage Tips</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">Best Practices</h4> <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1"><li>• Keep text short (under 10 characters)</li> <li>• Use uppercase letters for better results</li> <li>• Experiment with different styles</li> <li>• Works great in terminal applications</li></ul></div> <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">Common Uses</h4> <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1"><li>• Terminal splash screens</li> <li>• Code comments and signatures</li> <li>• Social media bio text</li> <li>• Email signatures and greetings</li></ul></div></div></div> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Multiple Styles</h3> <p class="text-gray-600 dark:text-gray-400">Choose from standard, block, and simple ASCII art styles for different use cases</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Real-time Preview</h3> <p class="text-gray-600 dark:text-gray-400">See your ASCII art generated instantly as you type with automatic updates</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Easy Export</h3> <p class="text-gray-600 dark:text-gray-400">Copy to clipboard or download your ASCII art as a text file for easy sharing</p></div></div></div>`);function T2(i,t){Rt(t,!0);let a=f(""),o=f(""),s=f("standard"),c=f("");const l={standard:{name:"Standard",chars:{A:`  #  
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
|__/`}}};function v(){if(!e(a).trim()){d(o,"");return}const tt=e(a).toUpperCase(),yt=l[e(s)],pt=[];for(let at=0;at<5;at++){let P="";for(let xt=0;xt<tt.length;xt++){const ft=tt[xt];if(yt.chars[ft]){const V=yt.chars[ft].split(`
`);V[at]?P+=V[at]+" ":P+=" ".repeat(6)+" "}else P+=" ".repeat(6)+" "}pt.push(P.trimEnd())}d(o,pt.join(`
`),!0)}function g(){const tt=new Blob([e(o)],{type:"text/plain"}),yt=URL.createObjectURL(tt),pt=document.createElement("a");pt.href=yt,pt.download="ascii-art.txt",pt.click(),URL.revokeObjectURL(yt)}ke(()=>{v()});var u=S2(),p=r(u),h=r(p),b=r(h);b.__click=[h2];var x=r(b);Ie(x,{class:"w-5 h-5"});var w=n(h,2),S=r(w),R=r(S);z0(R,{class:"w-10 h-10 text-white"});var C=n(p,4),T=r(C);T.__click=[y2,a,v];var E=n(T,2);E.__click=[b2,a,o];var _=n(C,2),L=r(_),$=n(r(L),2);xe($,21,()=>Object.entries(l),on,(tt,yt)=>{var pt=ue(()=>Qa(e(yt),2));let at=()=>e(pt)[0],P=()=>e(pt)[1];var xt=k2();xt.__click=[_2,s,at];var ft=r(xt),V=r(ft),et=r(V),ht=n(V,2),bt=r(ht);K(()=>{ge(xt,1,`p-4 border-2 rounded-lg transition-all ${e(s)===at()?"border-purple-500 bg-purple-50 dark:bg-purple-900/20":"border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"}`),y(et,P().name),y(bt,at()==="standard"?"Classic ASCII style with standard characters":at()==="block"?"Bold block style using full Unicode blocks":"Minimal style using basic ASCII characters")}),m(tt,xt)});var H=n(_,2),U=r(H),Q=n(r(U),2),mt=r(Q),lt=n(U,2);Nt(lt,"maxlength",10);var nt=n(H,2);{var ct=tt=>{var yt=$2(),pt=r(yt),at=n(r(pt),2),P=r(at);P.__click=[x2,o,c];var xt=r(P);{var ft=jt=>{var Pt=w2(),Lt=ut(Pt);ma(Lt,{class:"w-4 h-4"}),m(jt,Pt)},V=jt=>{var Pt=C2(),Lt=ut(Pt);be(Lt,{class:"w-4 h-4"}),m(jt,Pt)};O(xt,jt=>{e(c)==="ascii"?jt(ft):jt(V,!1)})}var et=n(P,2);et.__click=g;var ht=r(et);Xa(ht,{class:"w-4 h-4"});var bt=n(pt,2),wt=r(bt),Ut=r(wt);K(()=>y(Ut,e(o))),m(tt,yt)};O(nt,tt=>{e(o)&&tt(ct)})}var vt=n(nt,6),Dt=r(vt),Wt=r(Dt),Yt=r(Wt);xa(Yt,{class:"w-6 h-6 text-primary-600 dark:text-primary-400"});var Qt=n(Dt,2),Jt=r(Qt),zt=r(Jt);Ve(zt,{class:"w-6 h-6 text-primary-600 dark:text-primary-400"});var Ft=n(Qt,2),At=r(Ft),Ct=r(At);Yr(Ct,{class:"w-6 h-6 text-primary-600 dark:text-primary-400"}),K(()=>y(mt,`${e(a).length??""} characters`)),Tt(lt,()=>e(a),tt=>d(a,tt)),m(i,u),Bt()}ye(["click"]);const M2=[{path:"/tools",component:tg,title:"Developer Tools - Fariz",description:"Free online developer tools and utilities. JSON parser, color converter, URL encoder, and more productivity tools for developers.",keywords:"developer tools, online tools, web tools, json parser, color converter, url encoder, productivity tools",robots:"index, follow"},{path:"/tools/json-parser",component:lg,title:"JSON Parser - Fariz"},{path:"/tools/color-converter",component:$g,title:"Color Converter - Fariz"},{path:"/tools/url-encoder",component:Zg,title:"URL Encoder/Decoder - Fariz"},{path:"/tools/markdown-preview",component:ou,title:"Markdown Preview - Fariz"},{path:"/tools/base64-converter",component:Tu,title:"Base64 Converter - Fariz"},{path:"/tools/password-generator",component:Uu,title:"Password Generator - Fariz"},{path:"/tools/qr-code-generator",component:km,title:"QR Code Generator - Fariz"},{path:"/tools/text-case-converter",component:Bm,title:"Text Case Converter - Fariz"},{path:"/tools/lorem-ipsum-generator",component:Um,title:"Lorem Ipsum Generator - Fariz"},{path:"/tools/character-counter",component:rp,title:"Character Counter - Fariz"},{path:"/tools/text-diff",component:bp,title:"Text Diff Tool - Fariz"},{path:"/tools/url-parser",component:Dp,title:"URL Parser/Analyzer - Fariz"},{path:"/tools/css-minifier",component:Yp,title:"CSS Minifier/Beautifier - Fariz"},{path:"/tools/js-minifier",component:df,title:"JavaScript Minifier/Beautifier - Fariz"},{path:"/tools/html-encoder",component:kf,title:"HTML Entity Encoder/Decoder - Fariz"},{path:"/tools/slug-generator",component:Lf,title:"URL Slug Generator - Fariz"},{path:"/tools/color-palette",component:Ff,title:"Color Palette Generator - Fariz"},{path:"/tools/gradient-generator",component:Qf,title:"CSS Gradient Generator - Fariz"},{path:"/tools/hash-generator",component:ox,title:"Hash Generator - Fariz"},{path:"/tools/jwt-decoder",component:Tx,title:"JWT Decoder - Fariz"},{path:"/tools/tip-calculator",component:Ox,title:"Tip Calculator - Fariz"},{path:"/tools/timestamp-converter",component:Zx,title:"Unix Timestamp Converter - Fariz"},{path:"/tools/meta-tag-generator",component:mb,title:"Meta Tag Generator - Fariz"},{path:"/tools/css-shadow-generator",component:Ob,title:"CSS Shadow Generator - Fariz"},{path:"/tools/unit-converter",component:sy,title:"Unit Converter - Fariz"},{path:"/tools/percentage-calculator",component:qy,title:"Percentage Calculator - Fariz"},{path:"/tools/bmi-calculator",component:oh,title:"BMI Calculator - Fariz"},{path:"/tools/age-calculator",component:_h,title:"Age Calculator - Fariz"},{path:"/tools/random-picker",component:Jh,title:"Random Picker - Fariz"},{path:"/tools/cron-generator",component:s2,title:"Cron Expression Generator - Fariz"},{path:"/tools/hash-comparer",component:f2,title:"Hash Comparer - Fariz"},{path:"/tools/ascii-art-generator",component:T2,title:"ASCII Art Generator - Fariz"}],Ci=[...Uv,...M2];var E2=(i,t)=>{i.target===i.currentTarget&&t()},L2=(i,t)=>i.key==="Escape"&&t(),P2=(i,t,a)=>t(e(a)),A2=(i,t,a)=>(i.key==="Enter"||i.key===" ")&&t(e(a)),I2=k('<div class="text-sm text-secondary-500 dark:text-secondary-400 mt-1"> </div>'),j2=k('<div class="text-sm text-secondary-400 dark:text-secondary-500 mt-1 line-clamp-2 svelte-1bm0yy4"> </div>'),N2=k('<div role="option"><div class="flex items-center justify-between"><div class="flex-1 min-w-0"><div class="font-medium text-secondary-900 dark:text-secondary-50 truncate"> </div> <!> <!></div> <div class="ml-4 text-xs text-secondary-400 dark:text-secondary-500"><!></div></div></div>'),R2=k('<div class="py-2"></div>'),B2=k('<div class="px-4 py-8 text-center text-secondary-500 dark:text-secondary-400"><!> <div> </div></div>'),D2=k('<div class="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-start justify-center pt-[20vh]" role="dialog" aria-modal="true" aria-labelledby="command-palette-title" tabindex="-1"><div class="bg-white dark:bg-secondary-800 rounded-lg shadow-2xl w-full max-w-2xl mx-4 border border-secondary-200 dark:border-secondary-700 overflow-hidden" role="document"><div class="flex items-center px-4 py-3 border-b border-secondary-200 dark:border-secondary-700"><!> <input id="command-palette-search" type="text" placeholder="Type a command or search..." class="flex-1 bg-transparent outline-none text-secondary-900 dark:text-secondary-50 placeholder-secondary-500 dark:placeholder-secondary-500"/> <div class="flex items-center gap-1 text-xs text-secondary-500"><div class="flex items-center gap-1 px-2 py-1 bg-secondary-100 dark:bg-secondary-700 rounded"><!> <span>K</span></div> <span class="mx-1">to open</span></div></div> <div class="max-h-96 overflow-y-auto command-palette-list"><!></div> <div class="px-4 py-2 bg-secondary-50 dark:bg-secondary-900 border-t border-secondary-200 dark:border-secondary-700 text-xs text-secondary-500 dark:text-secondary-400"><div class="flex items-center justify-between"><div class="flex items-center gap-4"><div class="flex items-center gap-1"><kbd class="px-1.5 py-0.5 bg-white dark:bg-secondary-800 rounded border border-secondary-300 dark:border-secondary-600">↑↓</kbd> <span>to navigate</span></div> <div class="flex items-center gap-1"><kbd class="px-1.5 py-0.5 bg-white dark:bg-secondary-800 rounded border border-secondary-300 dark:border-secondary-600">↵</kbd> <span>to select</span></div> <div class="flex items-center gap-1"><kbd class="px-1.5 py-0.5 bg-white dark:bg-secondary-800 rounded border border-secondary-300 dark:border-secondary-600">esc</kbd> <span>to close</span></div></div></div></div></div></div>');function F2(i,t){Rt(t,!0);let a=we(t,"isOpen",15,!1),o=f(""),s=f(0),c=f(Pe(Ci));function l(){a(!1),d(o,""),d(s,0)}function v(b){Te(b.path),l()}ke(()=>{if(e(o).trim()==="")d(c,Ci,!0);else{const b=e(o).toLowerCase();d(c,Ci.filter(x=>{const w=x.title?.toLowerCase()||"",S=x.path.toLowerCase(),R=x.description?.toLowerCase()||"",C=S.split("/").pop()?.replace(/-/g," ")||"";return w.includes(b)||S.includes(b)||R.includes(b)||C.includes(b)}),!0)}d(s,0)});function g(){setTimeout(()=>{const b=document.querySelector('[data-selected="true"]'),x=document.querySelector(".command-palette-list");if(b&&x){const w=x.getBoundingClientRect(),S=b.getBoundingClientRect();(S.top<w.top||S.bottom>w.bottom)&&b.scrollIntoView({behavior:"smooth",block:"nearest"})}},50)}ke(()=>{a()&&e(c).length>0&&g()}),ke(()=>{a()&&setTimeout(()=>{const b=document.getElementById("command-palette-search");b&&b.focus(),e(c).length>0&&(d(s,0),setTimeout(()=>{g()},150))},100)});var u=Et(),p=ut(u);{var h=b=>{var x=D2();x.__click=[E2,l],x.__keydown=[L2,l];var w=r(x),S=r(w),R=r(S);gi(R,{class:"w-5 h-5 text-secondary-500 mr-3"});var C=n(R,2),T=n(C,2),E=r(T),_=r(E);H0(_,{class:"w-3 h-3"});var L=n(S,2),$=r(L);{var H=Q=>{var mt=R2();xe(mt,23,()=>e(c),lt=>lt.path,(lt,nt,ct)=>{var vt=N2();vt.__click=[P2,v,nt],vt.__keydown=[A2,v,nt];var Dt=r(vt),Wt=r(Dt),Yt=r(Wt),Qt=r(Yt),Jt=n(Yt,2);{var zt=at=>{var P=I2(),xt=r(P);K(()=>y(xt,e(nt).path)),m(at,P)};O(Jt,at=>{e(nt).path!=="/"&&e(nt).path!=="/projects"&&e(nt).path!=="/tools"&&at(zt)})}var Ft=n(Jt,2);{var At=at=>{var P=j2(),xt=r(P);K(()=>y(xt,e(nt).description)),m(at,P)};O(Ft,at=>{e(nt).description&&e(nt).path!=="/"&&e(nt).path!=="/tools"&&at(At)})}var Ct=n(Wt,2),tt=r(Ct);{var yt=at=>{var P=ca("Home");m(at,P)},pt=at=>{var P=Et(),xt=ut(P);{var ft=et=>{var ht=ca("Projects");m(et,ht)},V=et=>{var ht=Et(),bt=ut(ht);{var wt=jt=>{var Pt=ca("Tools");m(jt,Pt)},Ut=jt=>{var Pt=ca("Tool");m(jt,Pt)};O(bt,jt=>{e(nt).path==="/tools"?jt(wt):jt(Ut,!1)},!0)}m(et,ht)};O(xt,et=>{e(nt).path==="/projects"?et(ft):et(V,!1)},!0)}m(at,P)};O(tt,at=>{e(nt).path==="/"?at(yt):at(pt,!1)})}K(at=>{ge(vt,1,`px-4 py-3 cursor-pointer transition-colors border-l-2 border-transparent ${e(ct)===e(s)?"bg-secondary-100 dark:bg-secondary-700 border-primary-500":"hover:bg-secondary-50 dark:hover:bg-secondary-600"}`),Nt(vt,"aria-selected",e(ct)===e(s)),Nt(vt,"data-selected",e(ct)===e(s)),Nt(vt,"tabindex",e(ct)===0?0:-1),y(Qt,at)},[()=>e(nt).title?.replace(" - Fariz","")||e(nt).path]),m(lt,vt)}),m(Q,mt)},U=Q=>{var mt=B2(),lt=r(mt);gi(lt,{class:"w-8 h-8 mx-auto mb-2 opacity-50"});var nt=n(lt,2),ct=r(nt);K(()=>y(ct,`No results found for "${e(o)??""}"`)),m(Q,mt)};O($,Q=>{e(c).length>0?Q(H):Q(U,!1)})}Tt(C,()=>e(o),Q=>d(o,Q)),m(b,x)};O(p,b=>{a()&&b(h)})}m(i,u),Bt()}ye(["click","keydown"]);function H2(i,t){d(t,!e(t));const a=document.documentElement;e(t)?(a.classList.add("dark"),localStorage.setItem("theme","dark")):(a.classList.remove("dark"),localStorage.setItem("theme","light"))}var O2=(i,t)=>t(i,"/"),U2=(i,t)=>t(i,"/tools"),z2=k('<!> <div class="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 px-3 py-2 transition-all duration-300"><div class="flex items-center gap-1"><a href="/" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-white hover:bg-primary-50 dark:hover:bg-primary-900 rounded-lg transition-all">Home</a> <a href="/tools" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-white hover:bg-primary-50 dark:hover:bg-primary-900 rounded-lg transition-all">Tools</a> <button class="w-10 h-8 rounded-lg bg-primary-600 hover:bg-primary-700 flex items-center justify-center transition-all transform hover:scale-105"><!></button></div></div>',1);function q2(i,t){Rt(t,!0);let a=f(!1),o=f(!1);function s(C,T){C.preventDefault(),Te(T)}function c(C){if((C.ctrlKey||C.metaKey)&&C.key==="k"){C.preventDefault(),d(o,!e(o)),e(o)&&setTimeout(()=>{const T=document.querySelector(".command-palette-list");if(T){const E=T.querySelectorAll('[role="option"]');E.length>0&&l(E,0)}},150);return}if(e(o)){const T=document.querySelector(".command-palette-list");if(T){const E=T.querySelectorAll('[role="option"]');let _=-1;switch(E.forEach((L,$)=>{L.getAttribute("data-selected")==="true"&&(_=$)}),C.key){case"ArrowDown":{C.preventDefault();const L=Math.min(_+1,E.length-1);l(E,L);break}case"ArrowUp":{C.preventDefault();const L=Math.max(_-1,0);l(E,L);break}case"Enter":C.preventDefault(),_>=0&&E[_]&&E[_].click();break;case"Escape":C.preventDefault(),d(o,!1);break}}}}function l(C,T){C.forEach(E=>{E.classList.remove("bg-secondary-100","dark:bg-secondary-700","border-primary-500"),E.classList.add("border-transparent"),E.setAttribute("data-selected","false")}),C[T]&&(C[T].classList.add("bg-secondary-100","dark:bg-secondary-700","border-primary-500"),C[T].classList.remove("border-transparent"),C[T].setAttribute("data-selected","true"),C[T].scrollIntoView({behavior:"smooth",block:"nearest"}))}qr(()=>{const C=localStorage.getItem("theme"),T=window.matchMedia("(prefers-color-scheme: dark)").matches;return d(a,C==="dark"||!C&&T,!0),e(a)?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark"),document.addEventListener("keydown",c),()=>{document.removeEventListener("keydown",c)}});var v=z2(),g=ut(v);F2(g,{get isOpen(){return e(o)},set isOpen(C){d(o,C,!0)}});var u=n(g,2),p=r(u),h=r(p);h.__click=[O2,s];var b=n(h,2);b.__click=[U2,s];var x=n(b,2);x.__click=[H2,a];var w=r(x);{var S=C=>{Q0(C,{class:"w-4 h-4 text-white"})},R=C=>{J0(C,{class:"w-4 h-4 text-white"})};O(w,C=>{e(a)?C(S):C(R,!1)})}K(()=>Nt(x,"title",e(a)?"Switch to light mode":"Switch to dark mode")),m(i,v),Bt()}ye(["click"]);function G2(){window.scrollTo({top:0,behavior:"smooth"})}var W2=k('<button title="Scroll to top"><!></button>');function J2(i,t){Rt(t,!0);let a=f(!1);function o(){const l=window.pageYOffset||document.documentElement.scrollTop;d(a,l>300)}qr(()=>(window.addEventListener("scroll",o),()=>{window.removeEventListener("scroll",o)}));var s=W2();s.__click=[G2];var c=r(s);F0(c,{class:"w-6 h-6 group-hover:-translate-y-0.5 transition-transform"}),K(()=>ge(s,1,`!p-0 btn btn-primary fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full shadow-2xl hover:shadow-3xl group flex items-center justify-center transition-all duration-300 ${e(a)?"opacity-100 translate-y-0":"opacity-0 translate-y-16 pointer-events-none"}`)),m(i,s),Bt()}ye(["click"]);var V2=k('<div class="pixel-background svelte-azucis"><canvas class="svelte-azucis"></canvas></div>');function Y2(i,t){Rt(t,!0);let a,o=null,s=[],c,l=!1,v;const g=15,u=3,p=["#e2e8f0","#cbd5e1","#94a3b8","#64748b"];function h(){if(!a)return;s=[];const _=Math.ceil(a.width/g),L=Math.ceil(a.height/g);for(let $=0;$<_;$++)for(let H=0;H<L;H++){const U=$*g+(Math.random()-.5)*5,Q=H*g+(Math.random()-.5)*5;s.push({x:U,y:Q,size:0,targetSize:Math.random()*u,opacity:0,targetOpacity:Math.random()*.6+.2,color:p[Math.floor(Math.random()*p.length)],speed:Math.random()*.02+.01,phase:Math.random()*Math.PI*2})}}function b(_,L){const H=Math.sin(L*.003+_.phase)>0;_.targetSize=H?u:.1,_.size+=(_.targetSize-_.size)*(_.speed*3),_.targetOpacity=H?Math.random()*.4+.4:.05,_.opacity+=(_.targetOpacity-_.opacity)*(_.speed*4)}function x(_){if(!o||_.size<.1)return;o.globalAlpha=_.opacity,o.fillStyle=_.color;const L=_.size/2;o.fillRect(_.x-L,_.y-L,_.size,_.size)}function w(_){!l||!o||!a||(o.clearRect(0,0,a.width,a.height),s.forEach(L=>{b(L,_),x(L)}),c=requestAnimationFrame(w))}function S(){if(!a)return;const _=a.getBoundingClientRect();a.width=_.width,a.height=_.height,h()}function R(){l||(l=!0,c=requestAnimationFrame(w))}function C(){l=!1,c!==void 0&&(cancelAnimationFrame(c),c=void 0)}qr(()=>{if(!a)return;const _=a.getContext("2d");if(!_)return;o=_,S();const L=setTimeout(R,100);return v=new ResizeObserver(S),v.observe(a),()=>{clearTimeout(L),v&&(v.disconnect(),v=void 0),C()}}),ad(()=>{C(),v&&(v.disconnect(),v=void 0),o=null});var T=V2(),E=r(T);sn(E,_=>a=_,()=>a),m(i,T),Bt()}var K2=Lr('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"></path></svg>');function Q2(i,t){let a=we(t,"class",3,"w-6 h-6");var o=K2();K(()=>ge(o,0,tr(a()))),m(i,o)}const Z2="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20aria-hidden='true'%20role='img'%20class='iconify%20iconify--logos'%20width='26.6'%20height='32'%20preserveAspectRatio='xMidYMid%20meet'%20viewBox='0%200%20256%20308'%3e%3cpath%20fill='%23FF3E00'%20d='M239.682%2040.707C211.113-.182%20154.69-12.301%20113.895%2013.69L42.247%2059.356a82.198%2082.198%200%200%200-37.135%2055.056a86.566%2086.566%200%200%200%208.536%2055.576a82.425%2082.425%200%200%200-12.296%2030.719a87.596%2087.596%200%200%200%2014.964%2066.244c28.574%2040.893%2084.997%2053.007%20125.787%2027.016l71.648-45.664a82.182%2082.182%200%200%200%2037.135-55.057a86.601%2086.601%200%200%200-8.53-55.577a82.409%2082.409%200%200%200%2012.29-30.718a87.573%2087.573%200%200%200-14.963-66.244'%3e%3c/path%3e%3cpath%20fill='%23FFF'%20d='M106.889%20270.841c-23.102%206.007-47.497-3.036-61.103-22.648a52.685%2052.685%200%200%201-9.003-39.85a49.978%2049.978%200%200%201%201.713-6.693l1.35-4.115l3.671%202.697a92.447%2092.447%200%200%200%2028.036%2014.007l2.663.808l-.245%202.659a16.067%2016.067%200%200%200%202.89%2010.656a17.143%2017.143%200%200%200%2018.397%206.828a15.786%2015.786%200%200%200%204.403-1.935l71.67-45.672a14.922%2014.922%200%200%200%206.734-9.977a15.923%2015.923%200%200%200-2.713-12.011a17.156%2017.156%200%200%200-18.404-6.832a15.78%2015.78%200%200%200-4.396%201.933l-27.35%2017.434a52.298%2052.298%200%200%201-14.553%206.391c-23.101%206.007-47.497-3.036-61.101-22.649a52.681%2052.681%200%200%201-9.004-39.849a49.428%2049.428%200%200%201%2022.34-33.114l71.664-45.677a52.218%2052.218%200%200%201%2014.563-6.398c23.101-6.007%2047.497%203.036%2061.101%2022.648a52.685%2052.685%200%200%201%209.004%2039.85a50.559%2050.559%200%200%201-1.713%206.692l-1.35%204.116l-3.67-2.693a92.373%2092.373%200%200%200-28.037-14.013l-2.664-.809l.246-2.658a16.099%2016.099%200%200%200-2.89-10.656a17.143%2017.143%200%200%200-18.398-6.828a15.786%2015.786%200%200%200-4.402%201.935l-71.67%2045.674a14.898%2014.898%200%200%200-6.73%209.975a15.9%2015.9%200%200%200%202.709%2012.012a17.156%2017.156%200%200%200%2018.404%206.832a15.841%2015.841%200%200%200%204.402-1.935l27.345-17.427a52.147%2052.147%200%200%201%2014.552-6.397c23.101-6.006%2047.497%203.037%2061.102%2022.65a52.681%2052.681%200%200%201%209.003%2039.848a49.453%2049.453%200%200%201-22.34%2033.12l-71.664%2045.673a52.218%2052.218%200%200%201-14.563%206.398'%3e%3c/path%3e%3c/svg%3e",X2=(i,t)=>{d(t,e(t)+1)};var t1=k('<button class="btn-counter svelte-dfcawr"> </button>');function e1(i){let t=f(0);var a=t1();a.__click=[X2,t];var o=r(a);K(()=>y(o,`count is ${e(t)??""}`)),m(i,a)}ye(["click"]);var r1=k('<div id="thanks-container" class="svelte-ywuqfn"><div class="thanks-content svelte-ywuqfn"><div class="flex gap-2 justify-center"><a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer" class="svelte-ywuqfn"><img src="/vite.svg" class="logo svelte-ywuqfn" alt="Vite Logo"/></a> <a href="https://svelte.dev" target="_blank" rel="noopener noreferrer" class="svelte-ywuqfn"><img class="logo svelte svelte-ywuqfn" alt="Svelte Logo"/></a></div> <h1 class="svelte-ywuqfn">Vite + Svelte</h1> <div class="card svelte-ywuqfn"><!></div> <p>Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank" rel="noopener noreferrer" class="svelte-ywuqfn">SvelteKit</a>, the official Svelte app framework powered by Vite!</p> <p class="read-the-docs svelte-ywuqfn">Click on the Vite and Svelte logos to learn more</p></div></div>');function a1(i){var t=r1(),a=r(t),o=r(a),s=n(r(o),2),c=r(s),l=n(o,4),v=r(l);e1(v),K(()=>Nt(c,"src",Z2)),m(i,t)}const i1=i=>i;function o1(i){const t=i-1;return t*t*t+1}function n1(i,{delay:t=0,duration:a=400,easing:o=i1}={}){const s=+getComputedStyle(i).opacity;return{delay:t,duration:a,easing:o,css:c=>`opacity: ${c*s}`}}function s1(i,{delay:t=0,duration:a=400,easing:o=o1,start:s=0,opacity:c=0}={}){const l=getComputedStyle(i),v=+l.opacity,g=l.transform==="none"?"":l.transform,u=1-s,p=v*(1-c);return{delay:t,duration:a,easing:o,css:(h,b)=>`
			transform: ${g} scale(${1-u*b});
			opacity: ${v-p*b}
		`}}function d1(i,t,a){t()&&(i.key==="Enter"||i.key===" ")&&a()}var l1=k('<div class="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center" aria-labelledby="modal-title" role="dialog" aria-modal="true"><div class="fixed inset-0 bg-gray-500/75 dark:bg-gray-800/75 transition-opacity backdrop-blur-xs" role="button" tabindex="0"></div> <div class="flex items-center sm:items-center justify-center min-h-full w-full p-4 text-center sm:p-0"><div><!></div></div></div>');function c1(i,t){Rt(t,!0);let a=we(t,"isOpen",3,!1),o=we(t,"isRaw",3,!1),s=we(t,"maxW",3,"max-w-full"),c=we(t,"forceClose",3,!0),l=we(t,"onClose",3,()=>{});function v(){l()()}var g=Et(),u=ut(g);{var p=h=>{var b=l1(),x=r(b);x.__click=function(...C){(c()?v:null)?.apply(this,C)},x.__keydown=[d1,c,v];var w=n(x,2),S=r(w),R=r(S);te(R,()=>t.children??Zt),K(()=>ge(S,1,`relative bg-white dark:bg-gray-900 rounded-lg ${o()?"p-0":"p-4"} text-left overflow-hidden shadow-xl transform transition-all my-8 w-full ${s()??""}`)),Ln(3,x,()=>n1),Ln(3,S,()=>s1,()=>({duration:300})),m(h,b)};O(u,h=>{a()&&h(p)})}m(i,g),Bt()}ye(["click","keydown"]);const v1=(i,t)=>{d(t,!0)};var g1=k('<div class="min-h-screen flex flex-col justify-between relative bg-secondary-50 dark:bg-secondary-900 transition-colors duration-300"><!> <!> <!> <div class="flex-1"><div class="container mx-auto px-4 sm:px-6 lg:px-8"><!></div></div> <footer class="flex justify-center items-center text-secondary-600 dark:text-secondary-400 py-8 mt-12 border-t border-secondary-200 dark:border-secondary-800 bg-white/50 dark:bg-black/20 backdrop-blur-sm">Made with <button type="button" class="hover:cursor-pointer hover:scale-110 transition-transform duration-200"><!></button> in Surabaya.</footer></div> <!> <!>',1);function u1(i,t){Rt(t,!0);let a=f(!1);qr(()=>{const E=localStorage.getItem("theme"),_=window.matchMedia("(prefers-color-scheme: dark)").matches;d(a,E==="dark"||!E&&_,!0);const L=()=>{const H=localStorage.getItem("theme");d(a,H==="dark"||!H&&window.matchMedia("(prefers-color-scheme: dark)").matches,!0)};window.addEventListener("storage",L),window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",L);const $=new MutationObserver(()=>{d(a,document.documentElement.classList.contains("dark"),!0)});return $.observe(document.documentElement,{attributes:!0,attributeFilter:["class"]}),()=>{window.removeEventListener("storage",L),window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change",L),$.disconnect()}});const o=Ci;let s=f(!1);const c=()=>{d(s,!1)};qr(()=>{C0(o)});var l=g1(),v=ut(l),g=r(v);Y2(g,{});var u=n(g,2);q2(u,{});var p=n(u,2);J2(p,{});var h=n(p,2),b=r(h),x=r(b);P0(x,{});var w=n(h,2),S=n(r(w));S.__click=[v1,s];var R=r(S);Q2(R,{class:"w-5 h-5 mx-1 text-rose-600"});var C=n(v,2);c1(C,{get isOpen(){return e(s)},onClose:c,maxW:"max-w-2xl",children:(E,_)=>{a1(E)},$$slots:{default:!0}});var T=n(C,2);{let E=ue(()=>e(a)?"dark":"light");Ev(T,{position:"top-center",get theme(){return e(E)}})}m(i,l),Bt()}ye(["click"]);const Md=document.getElementById("app");if(!Md)throw new Error("Could not find app element");r0(u1,{target:Md});
