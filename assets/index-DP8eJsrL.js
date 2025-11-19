(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const c of n)if(c.type==="childList")for(const d of c.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function a(n){const c={};return n.integrity&&(c.integrity=n.integrity),n.referrerPolicy&&(c.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?c.credentials="include":n.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function i(n){if(n.ep)return;n.ep=!0;const c=a(n);fetch(n.href,c)}})();const ql="5";typeof window<"u"&&((window.__svelte??={}).v??=new Set).add(ql);const Fo=1,Ho=2,bn=4,Gl=8,Wl=16,Jl=1,Vl=4,Yl=8,Kl=16,Ql=4,Zl=1,Xl=2,Qt=Symbol(),ed="http://www.w3.org/1999/xhtml",td="http://www.w3.org/2000/svg",rd="@attach",pn=!1;var Oo=Array.isArray,ad=Array.prototype.indexOf,qi=Array.from,ji=Object.defineProperty,ca=Object.getOwnPropertyDescriptor,od=Object.getOwnPropertyDescriptors,id=Object.prototype,sd=Array.prototype,mn=Object.getPrototypeOf,gs=Object.isExtensible;function Ua(o){return typeof o=="function"}const Ze=()=>{};function hn(o){for(var e=0;e<o.length;e++)o[e]()}function nd(){var o,e,a=new Promise((i,n)=>{o=i,e=n});return{promise:a,resolve:o,reject:e}}function Qa(o,e){if(Array.isArray(o))return o;if(e===void 0||!(Symbol.iterator in o))return Array.from(o);const a=[];for(const i of o)if(a.push(i),a.length===e)break;return a}const _r=2,Gi=4,Wi=8,Pa=16,Zr=32,La=64,yn=128,Sr=256,$o=512,tr=1024,Tr=2048,ma=4096,jr=8192,Aa=16384,zo=32768,ja=65536,us=1<<17,_n=1<<18,uo=1<<19,ld=1<<20,Ni=1<<21,Ji=1<<22,wa=1<<23,va=Symbol("$state"),kn=Symbol("legacy props"),dd=Symbol(""),Vi=new class extends Error{name="StaleReactionError";message="The reaction that called `getAbortSignal()` was re-run or destroyed"};function cd(){throw new Error("https://svelte.dev/e/await_outside_boundary")}function Yi(o){throw new Error("https://svelte.dev/e/lifecycle_outside_component")}function vd(){throw new Error("https://svelte.dev/e/async_derived_orphan")}function gd(o){throw new Error("https://svelte.dev/e/effect_in_teardown")}function ud(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function xd(o){throw new Error("https://svelte.dev/e/effect_orphan")}function fd(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function bd(o){throw new Error("https://svelte.dev/e/props_invalid_value")}function pd(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function md(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function hd(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}function yd(){console.warn("https://svelte.dev/e/select_multiple_invalid_value")}let _d=!1;function wn(o){return o===this.v}function Cn(o,e){return o!=o?e==e:o!==e||o!==null&&typeof o=="object"||typeof o=="function"}function $n(o){return!Cn(o,this.v)}let kd=!1,rr=null;function So(o){rr=o}function xs(o){return Ki().get(o)}function wd(o,e){return Ki().set(o,e),e}function Cd(o){return Ki().has(o)}function Ie(o,e=!1,a){rr={p:rr,c:null,e:null,s:o,x:null,l:null}}function Re(o){var e=rr,a=e.e;if(a!==null){e.e=null;for(var i of a)Hn(i)}return rr=e.p,{}}function Sn(){return!0}function Ki(o){return rr===null&&Yi(),rr.c??=new Map($d(rr)||void 0)}function $d(o){let e=o.p;for(;e!==null;){const a=e.c;if(a!==null)return a;e=e.p}return null}const Sd=new WeakMap;function Td(o){var e=St;if(e===null)return Et.f|=wa,o;if((e.f&zo)===0){if((e.f&yn)===0)throw!e.parent&&o instanceof Error&&Tn(o),o;e.b.error(o)}else Qi(o,e)}function Qi(o,e){for(;e!==null;){if((e.f&yn)!==0)try{e.b.error(o);return}catch(a){o=a}e=e.parent}throw o instanceof Error&&Tn(o),o}function Tn(o){const e=Sd.get(o);e&&(ji(o,"message",{value:e.message}),ji(o,"stack",{value:e.stack}))}let la=[],To=[];function Mn(){var o=la;la=[],hn(o)}function Md(){var o=To;To=[],hn(o)}function Ed(){return la.length>0||To.length>0}function Kr(o){if(la.length===0&&!so){var e=la;queueMicrotask(()=>{e===la&&Mn()})}la.push(o)}function Pd(){la.length>0&&Mn(),To.length>0&&Md()}function Ld(o){let e=0,a=Ya(0),i;return()=>{Gd()&&(t(a),fo(()=>(e===0&&(i=lr(()=>o(()=>no(a)))),e+=1,()=>{Kr(()=>{e-=1,e===0&&(i?.(),i=void 0,no(a))})})))}}function Ad(){const o=St.b;return o===null&&cd(),o}function Uo(o){var e=_r|Tr,a=Et!==null&&(Et.f&_r)!==0?Et:null;return St===null||a!==null&&(a.f&Sr)!==0?e|=Sr:St.f|=uo,{ctx:rr,deps:null,effects:null,equals:wn,f:e,fn:o,reactions:null,rv:0,v:Qt,wv:0,parent:a??St,ac:null}}function jd(o,e){let a=St;a===null&&vd();var i=a.b,n=void 0,c=Ya(Qt),d=null,v=!Et;return Jd(()=>{try{var g=o();d&&Promise.resolve(g).catch(()=>{})}catch(m){g=Promise.reject(m)}var u=()=>g;n=d?.then(u,u)??Promise.resolve(g),d=n;var f=Ft,k=i.is_pending();v&&(i.update_pending_count(1),k||f.increment());const h=(m,_=void 0)=>{d=null,k||f.activate(),_?_!==Vi&&(c.f|=wa,co(c,_)):((c.f&wa)!==0&&(c.f^=wa),co(c,m)),v&&(i.update_pending_count(-1),k||f.decrement()),jn()};if(n.then(h,m=>h(null,m||"unknown")),f)return()=>{queueMicrotask(()=>f.neuter())}}),new Promise(g=>{function u(f){function k(){f===n?g(c):u(n)}f.then(k,k)}u(n)})}function xt(o){const e=Uo(o);return Jn(e),e}function En(o){const e=Uo(o);return e.equals=$n,e}function Pn(o){var e=o.effects;if(e!==null){o.effects=null;for(var a=0;a<e.length;a+=1)gr(e[a])}}function Nd(o){for(var e=o.parent;e!==null;){if((e.f&_r)===0)return e;e=e.parent}return null}function Zi(o){var e,a=St;pa(Nd(o));try{Pn(o),e=Qn(o)}finally{pa(a)}return e}function Ln(o){var e=Zi(o);if(o.equals(e)||(o.v=e,o.wv=Yn()),!Na){var a=(da||(o.f&Sr)!==0)&&o.deps!==null?ma:tr;vr(o,a)}}function An(o,e,a){const i=Uo;if(e.length===0){a(o.map(i));return}var n=Ft,c=St,d=Id(),v=Ad();Promise.all(e.map(g=>jd(g))).then(g=>{n?.activate(),d();try{a([...o.map(i),...g])}catch(u){(c.f&Aa)===0&&Qi(u,c)}n?.deactivate(),jn()}).catch(g=>{v.error(g)})}function Id(){var o=St,e=Et,a=rr,i=Ft;return function(){pa(o),zr(e),So(a),i?.activate()}}function jn(){pa(null),zr(null),So(null)}const ri=new Set;let Ft=null,ko=null,fs=new Set,Sa=[],qo=null,Ii=!1,so=!1;class Ja{current=new Map;#t=new Map;#e=new Set;#r=0;#d=null;#c=!1;#o=[];#s=[];#i=[];#a=[];#n=[];#v=[];#g=[];skipped_effects=new Set;process(e){Sa=[],ko=null;for(const n of e)this.#x(n);if(this.#o.length===0&&this.#r===0){this.#u();var a=this.#i,i=this.#a;this.#i=[],this.#a=[],this.#n=[],ko=Ft,Ft=null,bs(a),bs(i),Ft===null?Ft=this:ri.delete(this),this.#d?.resolve()}else this.#l(this.#i),this.#l(this.#a),this.#l(this.#n);for(const n of this.#o)Wa(n);for(const n of this.#s)Wa(n);this.#o=[],this.#s=[]}#x(e){e.f^=tr;for(var a=e.first;a!==null;){var i=a.f,n=(i&(Zr|La))!==0,c=n&&(i&tr)!==0,d=c||(i&jr)!==0||this.skipped_effects.has(a);if(!d&&a.fn!==null){if(n)a.f^=tr;else if((i&Gi)!==0)this.#a.push(a);else if((i&tr)===0)if((i&Ji)!==0){var v=a.b?.is_pending()?this.#s:this.#o;v.push(a)}else Vo(a)&&((a.f&Pa)!==0&&this.#n.push(a),Wa(a));var g=a.first;if(g!==null){a=g;continue}}var u=a.parent;for(a=a.next;a===null&&u!==null;)a=u.next,u=u.parent}}#l(e){for(const a of e)((a.f&Tr)!==0?this.#v:this.#g).push(a),vr(a,tr);e.length=0}capture(e,a){this.#t.has(e)||this.#t.set(e,a),this.current.set(e,e.v)}activate(){Ft=this}deactivate(){Ft=null,ko=null;for(const e of fs)if(fs.delete(e),e(),Ft!==null)break}neuter(){this.#c=!0}flush(){Sa.length>0?Nn():this.#u(),Ft===this&&(this.#r===0&&ri.delete(this),this.deactivate())}#u(){if(!this.#c)for(const e of this.#e)e();this.#e.clear()}increment(){this.#r+=1}decrement(){if(this.#r-=1,this.#r===0){for(const e of this.#v)vr(e,Tr),Va(e);for(const e of this.#g)vr(e,ma),Va(e);this.#i=[],this.#a=[],this.flush()}else this.deactivate()}add_callback(e){this.#e.add(e)}settled(){return(this.#d??=nd()).promise}static ensure(){if(Ft===null){const e=Ft=new Ja;ri.add(Ft),so||Ja.enqueue(()=>{Ft===e&&e.flush()})}return Ft}static enqueue(e){Kr(e)}}function Rd(o){var e=so;so=!0;try{for(var a;;){if(Pd(),Sa.length===0&&!Ed()&&(Ft?.flush(),Sa.length===0))return qo=null,a;Nn()}}finally{so=e}}function Nn(){var o=Ga;Ii=!0;try{var e=0;for(ys(!0);Sa.length>0;){var a=Ja.ensure();if(e++>1e3){var i,n;Bd()}a.process(Sa),ga.clear()}}finally{Ii=!1,ys(o),qo=null}}function Bd(){try{fd()}catch(o){Qi(o,qo)}}let _a=null;function bs(o){var e=o.length;if(e!==0){for(var a=0;a<e;){var i=o[a++];if((i.f&(Aa|jr))===0&&Vo(i)&&(_a=[],Wa(i),i.deps===null&&i.first===null&&i.nodes_start===null&&(i.teardown===null&&i.ac===null?qn(i):i.fn=null),_a?.length>0)){ga.clear();for(const n of _a)Wa(n);_a=[]}}_a=null}}function Va(o){for(var e=qo=o;e.parent!==null;){e=e.parent;var a=e.f;if(Ii&&e===St&&(a&Pa)!==0)return;if((a&(La|Zr))!==0){if((a&tr)===0)return;e.f^=tr}}Sa.push(e)}const ga=new Map;function Ya(o,e){var a={f:0,v:o,reactions:null,equals:wn,rv:0,wv:0};return a}function p(o,e){const a=Ya(o);return Jn(a),a}function Dd(o,e=!1,a=!0){const i=Ya(o);return e||(i.equals=$n),i}function l(o,e,a=!1){Et!==null&&(!Ar||(Et.f&us)!==0)&&Sn()&&(Et.f&(_r|Pa|Ji|us))!==0&&!Vr?.includes(o)&&hd();let i=a?Lt(e):e;return co(o,i)}function co(o,e){if(!o.equals(e)){var a=o.v;Na?ga.set(o,e):ga.set(o,a),o.v=e;var i=Ja.ensure();i.capture(o,a),(o.f&_r)!==0&&((o.f&Tr)!==0&&Zi(o),vr(o,(o.f&Sr)===0?tr:ma)),o.wv=Yn(),In(o,Tr),St!==null&&(St.f&tr)!==0&&(St.f&(Zr|La))===0&&($r===null?Yd([o]):$r.push(o))}return e}function no(o){l(o,o.v+1)}function In(o,e){var a=o.reactions;if(a!==null)for(var i=a.length,n=0;n<i;n++){var c=a[n],d=c.f,v=(d&Tr)===0;v&&vr(c,e),(d&_r)!==0?In(c,ma):v&&((d&Pa)!==0&&_a!==null&&_a.push(c),Va(c))}}function Lt(o){if(typeof o!="object"||o===null||va in o)return o;const e=mn(o);if(e!==id&&e!==sd)return o;var a=new Map,i=Oo(o),n=p(0),c=Ca,d=v=>{if(Ca===c)return v();var g=Et,u=Ca;zr(null),ks(c);var f=v();return zr(g),ks(u),f};return i&&a.set("length",p(o.length)),new Proxy(o,{defineProperty(v,g,u){(!("value"in u)||u.configurable===!1||u.enumerable===!1||u.writable===!1)&&pd();var f=a.get(g);return f===void 0?f=d(()=>{var k=p(u.value);return a.set(g,k),k}):l(f,u.value,!0),!0},deleteProperty(v,g){var u=a.get(g);if(u===void 0){if(g in v){const f=d(()=>p(Qt));a.set(g,f),no(n)}}else l(u,Qt),no(n);return!0},get(v,g,u){if(g===va)return o;var f=a.get(g),k=g in v;if(f===void 0&&(!k||ca(v,g)?.writable)&&(f=d(()=>{var m=Lt(k?v[g]:Qt),_=p(m);return _}),a.set(g,f)),f!==void 0){var h=t(f);return h===Qt?void 0:h}return Reflect.get(v,g,u)},getOwnPropertyDescriptor(v,g){var u=Reflect.getOwnPropertyDescriptor(v,g);if(u&&"value"in u){var f=a.get(g);f&&(u.value=t(f))}else if(u===void 0){var k=a.get(g),h=k?.v;if(k!==void 0&&h!==Qt)return{enumerable:!0,configurable:!0,value:h,writable:!0}}return u},has(v,g){if(g===va)return!0;var u=a.get(g),f=u!==void 0&&u.v!==Qt||Reflect.has(v,g);if(u!==void 0||St!==null&&(!f||ca(v,g)?.writable)){u===void 0&&(u=d(()=>{var h=f?Lt(v[g]):Qt,m=p(h);return m}),a.set(g,u));var k=t(u);if(k===Qt)return!1}return f},set(v,g,u,f){var k=a.get(g),h=g in v;if(i&&g==="length")for(var m=u;m<k.v;m+=1){var _=a.get(m+"");_!==void 0?l(_,Qt):m in v&&(_=d(()=>p(Qt)),a.set(m+"",_))}if(k===void 0)(!h||ca(v,g)?.writable)&&(k=d(()=>p(void 0)),l(k,Lt(u)),a.set(g,k));else{h=k.v!==Qt;var $=d(()=>Lt(u));l(k,$)}var M=Reflect.getOwnPropertyDescriptor(v,g);if(M?.set&&M.set.call(f,u),!h){if(i&&typeof g=="string"){var E=a.get("length"),R=Number(g);Number.isInteger(R)&&R>=E.v&&l(E,R+1)}no(n)}return!0},ownKeys(v){t(n);var g=Reflect.ownKeys(v).filter(k=>{var h=a.get(k);return h===void 0||h.v!==Qt});for(var[u,f]of a)f.v!==Qt&&!(u in v)&&g.push(u);return g},setPrototypeOf(){md()}})}function ps(o){try{if(o!==null&&typeof o=="object"&&va in o)return o[va]}catch{}return o}function Rn(o,e){return Object.is(ps(o),ps(e))}var ms,Mr,Bn,Dn,Fn;function Fd(){if(ms===void 0){ms=window,Mr=document,Bn=/Firefox/.test(navigator.userAgent);var o=Element.prototype,e=Node.prototype,a=Text.prototype;Dn=ca(e,"firstChild").get,Fn=ca(e,"nextSibling").get,gs(o)&&(o.__click=void 0,o.__className=void 0,o.__attributes=null,o.__style=void 0,o.__e=void 0),gs(a)&&(a.__t=void 0)}}function Xr(o=""){return document.createTextNode(o)}function Hr(o){return Dn.call(o)}function Go(o){return Fn.call(o)}function r(o,e){return Hr(o)}function ge(o,e){{var a=Hr(o);return a instanceof Comment&&a.data===""?Go(a):a}}function s(o,e=1,a=!1){let i=o;for(;e--;)i=Go(i);return i}function Hd(o){o.textContent=""}function Xi(){return!1}function Od(o,e){if(e){const a=document.body;o.autofocus=!0,Kr(()=>{document.activeElement===a&&o.focus()})}}let hs=!1;function zd(){hs||(hs=!0,document.addEventListener("reset",o=>{Promise.resolve().then(()=>{if(!o.defaultPrevented)for(const e of o.target.elements)e.__on_r?.()})},{capture:!0}))}function Za(o){var e=Et,a=St;zr(null),pa(null);try{return o()}finally{zr(e),pa(a)}}function Wo(o,e,a,i=a){o.addEventListener(e,()=>Za(a));const n=o.__on_r;n?o.__on_r=()=>{n(),i(!0)}:o.__on_r=()=>i(!0),zd()}function Ud(o){St===null&&Et===null&&xd(),Et!==null&&(Et.f&Sr)!==0&&St===null&&ud(),Na&&gd()}function qd(o,e){var a=e.last;a===null?e.last=e.first=o:(a.next=o,o.prev=a,e.last=o)}function ea(o,e,a,i=!0){var n=St;n!==null&&(n.f&jr)!==0&&(o|=jr);var c={ctx:rr,deps:null,nodes_start:null,nodes_end:null,f:o|Tr,first:null,fn:e,last:null,next:null,parent:n,b:n&&n.b,prev:null,teardown:null,transitions:null,wv:0,ac:null};if(a)try{Wa(c),c.f|=zo}catch(g){throw gr(c),g}else e!==null&&Va(c);if(i){var d=c;if(a&&d.deps===null&&d.teardown===null&&d.nodes_start===null&&d.first===d.last&&(d.f&uo)===0&&(d=d.first),d!==null&&(d.parent=n,n!==null&&qd(d,n),Et!==null&&(Et.f&_r)!==0&&(o&La)===0)){var v=Et;(v.effects??=[]).push(d)}}return c}function Gd(){return Et!==null&&!Ar}function es(o){const e=ea(Wi,null,!1);return vr(e,tr),e.teardown=o,e}function Ct(o){Ud();var e=St.f,a=!Et&&(e&Zr)!==0&&(e&zo)===0;if(a){var i=rr;(i.e??=[]).push(o)}else return Hn(o)}function Hn(o){return ea(Gi|ld,o,!1)}function Wd(o){Ja.ensure();const e=ea(La|uo,o,!0);return(a={})=>new Promise(i=>{a.outro?bo(e,()=>{gr(e),i(void 0)}):(gr(e),i(void 0))})}function xo(o){return ea(Gi,o,!1)}function Jd(o){return ea(Ji|uo,o,!0)}function fo(o,e=0){return ea(Wi|e,o,!0)}function Y(o,e=[],a=[]){An(e,a,i=>{ea(Wi,()=>o(...i.map(t)),!0)})}function ha(o,e=0){var a=ea(Pa|e,o,!0);return a}function Or(o,e=!0){return ea(Zr|uo,o,!0,e)}function On(o){var e=o.teardown;if(e!==null){const a=Na,i=Et;_s(!0),zr(null);try{e.call(null)}finally{_s(a),zr(i)}}}function zn(o,e=!1){var a=o.first;for(o.first=o.last=null;a!==null;){const n=a.ac;n!==null&&Za(()=>{n.abort(Vi)});var i=a.next;(a.f&La)!==0?a.parent=null:gr(a,e),a=i}}function Vd(o){for(var e=o.first;e!==null;){var a=e.next;(e.f&Zr)===0&&gr(e),e=a}}function gr(o,e=!0){var a=!1;(e||(o.f&_n)!==0)&&o.nodes_start!==null&&o.nodes_end!==null&&(Un(o.nodes_start,o.nodes_end),a=!0),zn(o,e&&!a),Mo(o,0),vr(o,Aa);var i=o.transitions;if(i!==null)for(const c of i)c.stop();On(o);var n=o.parent;n!==null&&n.first!==null&&qn(o),o.next=o.prev=o.teardown=o.ctx=o.deps=o.fn=o.nodes_start=o.nodes_end=o.ac=null}function Un(o,e){for(;o!==null;){var a=o===e?null:Go(o);o.remove(),o=a}}function qn(o){var e=o.parent,a=o.prev,i=o.next;a!==null&&(a.next=i),i!==null&&(i.prev=a),e!==null&&(e.first===o&&(e.first=i),e.last===o&&(e.last=a))}function bo(o,e){var a=[];ts(o,a,!0),Gn(a,()=>{gr(o),e&&e()})}function Gn(o,e){var a=o.length;if(a>0){var i=()=>--a||e();for(var n of o)n.out(i)}else e()}function ts(o,e,a){if((o.f&jr)===0){if(o.f^=jr,o.transitions!==null)for(const d of o.transitions)(d.is_global||a)&&e.push(d);for(var i=o.first;i!==null;){var n=i.next,c=(i.f&ja)!==0||(i.f&Zr)!==0;ts(i,e,c?a:!1),i=n}}}function Jo(o){Wn(o,!0)}function Wn(o,e){if((o.f&jr)!==0){o.f^=jr,(o.f&tr)===0&&(vr(o,Tr),Va(o));for(var a=o.first;a!==null;){var i=a.next,n=(a.f&ja)!==0||(a.f&Zr)!==0;Wn(a,n?e:!1),a=i}if(o.transitions!==null)for(const c of o.transitions)(c.is_global||e)&&c.in()}}let Ga=!1;function ys(o){Ga=o}let Na=!1;function _s(o){Na=o}let Et=null,Ar=!1;function zr(o){Et=o}let St=null;function pa(o){St=o}let Vr=null;function Jn(o){Et!==null&&(Vr===null?Vr=[o]:Vr.push(o))}let sr=null,yr=0,$r=null;function Yd(o){$r=o}let Vn=1,vo=0,Ca=vo;function ks(o){Ca=o}let da=!1;function Yn(){return++Vn}function Vo(o){var e=o.f;if((e&Tr)!==0)return!0;if((e&ma)!==0){var a=o.deps,i=(e&Sr)!==0;if(a!==null){var n,c,d=(e&$o)!==0,v=i&&St!==null&&!da,g=a.length;if((d||v)&&(St===null||(St.f&Aa)===0)){var u=o,f=u.parent;for(n=0;n<g;n++)c=a[n],(d||!c?.reactions?.includes(u))&&(c.reactions??=[]).push(u);d&&(u.f^=$o),v&&f!==null&&(f.f&Sr)===0&&(u.f^=Sr)}for(n=0;n<g;n++)if(c=a[n],Vo(c)&&Ln(c),c.wv>o.wv)return!0}(!i||St!==null&&!da)&&vr(o,tr)}return!1}function Kn(o,e,a=!0){var i=o.reactions;if(i!==null&&!Vr?.includes(o))for(var n=0;n<i.length;n++){var c=i[n];(c.f&_r)!==0?Kn(c,e,!1):e===c&&(a?vr(c,Tr):(c.f&tr)!==0&&vr(c,ma),Va(c))}}function Qn(o){var e=sr,a=yr,i=$r,n=Et,c=da,d=Vr,v=rr,g=Ar,u=Ca,f=o.f;sr=null,yr=0,$r=null,da=(f&Sr)!==0&&(Ar||!Ga||Et===null),Et=(f&(Zr|La))===0?o:null,Vr=null,So(o.ctx),Ar=!1,Ca=++vo,o.ac!==null&&(Za(()=>{o.ac.abort(Vi)}),o.ac=null);try{o.f|=Ni;var k=o.fn,h=k(),m=o.deps;if(sr!==null){var _;if(Mo(o,yr),m!==null&&yr>0)for(m.length=yr+sr.length,_=0;_<sr.length;_++)m[yr+_]=sr[_];else o.deps=m=sr;if(!da||(f&_r)!==0&&o.reactions!==null)for(_=yr;_<m.length;_++)(m[_].reactions??=[]).push(o)}else m!==null&&yr<m.length&&(Mo(o,yr),m.length=yr);if(Sn()&&$r!==null&&!Ar&&m!==null&&(o.f&(_r|ma|Tr))===0)for(_=0;_<$r.length;_++)Kn($r[_],o);return n!==null&&n!==o&&(vo++,$r!==null&&(i===null?i=$r:i.push(...$r))),(o.f&wa)!==0&&(o.f^=wa),h}catch($){return Td($)}finally{o.f^=Ni,sr=e,yr=a,$r=i,Et=n,da=c,Vr=d,So(v),Ar=g,Ca=u}}function Kd(o,e){let a=e.reactions;if(a!==null){var i=ad.call(a,o);if(i!==-1){var n=a.length-1;n===0?a=e.reactions=null:(a[i]=a[n],a.pop())}}a===null&&(e.f&_r)!==0&&(sr===null||!sr.includes(e))&&(vr(e,ma),(e.f&(Sr|$o))===0&&(e.f^=$o),Pn(e),Mo(e,0))}function Mo(o,e){var a=o.deps;if(a!==null)for(var i=e;i<a.length;i++)Kd(o,a[i])}function Wa(o){var e=o.f;if((e&Aa)===0){vr(o,tr);var a=St,i=Ga;St=o,Ga=!0;try{(e&Pa)!==0?Vd(o):zn(o),On(o);var n=Qn(o);o.teardown=typeof n=="function"?n:null,o.wv=Vn;var c;pn&&kd&&(o.f&Tr)!==0&&o.deps}finally{Ga=i,St=a}}}async function Qd(){await Promise.resolve(),Rd()}function t(o){var e=o.f,a=(e&_r)!==0;if(Et!==null&&!Ar){var i=St!==null&&(St.f&Aa)!==0;if(!i&&!Vr?.includes(o)){var n=Et.deps;if((Et.f&Ni)!==0)o.rv<vo&&(o.rv=vo,sr===null&&n!==null&&n[yr]===o?yr++:sr===null?sr=[o]:(!da||!sr.includes(o))&&sr.push(o));else{(Et.deps??=[]).push(o);var c=o.reactions;c===null?o.reactions=[Et]:c.includes(Et)||c.push(Et)}}}else if(a&&o.deps===null&&o.effects===null){var d=o,v=d.parent;v!==null&&(v.f&Sr)===0&&(d.f^=Sr)}if(Na){if(ga.has(o))return ga.get(o);if(a){d=o;var g=d.v;return((d.f&tr)===0&&d.reactions!==null||Zn(d))&&(g=Zi(d)),ga.set(d,g),g}}else a&&(d=o,Vo(d)&&Ln(d));if((o.f&wa)!==0)throw o.v;return o.v}function Zn(o){if(o.v===Qt)return!0;if(o.deps===null)return!1;for(const e of o.deps)if(ga.has(e)||(e.f&_r)!==0&&Zn(e))return!0;return!1}function lr(o){var e=Ar;try{return Ar=!0,o()}finally{Ar=e}}const Zd=-7169;function vr(o,e){o.f=o.f&Zd|e}const Xn=new Set,Ri=new Set;function rs(o,e,a,i={}){function n(c){if(i.capture||io.call(e,c),!c.cancelBubble)return Za(()=>a?.call(this,c))}return o.startsWith("pointer")||o.startsWith("touch")||o==="wheel"?Kr(()=>{e.addEventListener(o,n,i)}):e.addEventListener(o,n,i),n}function Eo(o,e,a,i={}){var n=rs(e,o,a,i);return()=>{o.removeEventListener(e,n,i)}}function el(o,e,a,i,n){var c={capture:i,passive:n},d=rs(o,e,a,c);(e===document.body||e===window||e===document||e instanceof HTMLMediaElement)&&es(()=>{e.removeEventListener(o,d,c)})}function yt(o){for(var e=0;e<o.length;e++)Xn.add(o[e]);for(var a of Ri)a(o)}let ws=null;function io(o){var e=this,a=e.ownerDocument,i=o.type,n=o.composedPath?.()||[],c=n[0]||o.target;ws=o;var d=0,v=ws===o&&o.__root;if(v){var g=n.indexOf(v);if(g!==-1&&(e===document||e===window)){o.__root=e;return}var u=n.indexOf(e);if(u===-1)return;g<=u&&(d=g)}if(c=n[d]||o.target,c!==e){ji(o,"currentTarget",{configurable:!0,get(){return c||a}});var f=Et,k=St;zr(null),pa(null);try{for(var h,m=[];c!==null;){var _=c.assignedSlot||c.parentNode||c.host||null;try{var $=c["__"+i];if($!=null&&(!c.disabled||o.target===c))if(Oo($)){var[M,...E]=$;M.apply(c,[o,...E])}else $.call(c,o)}catch(R){h?m.push(R):h=R}if(o.cancelBubble||_===e||_===null)break;c=_}if(h){for(let R of m)queueMicrotask(()=>{throw R});throw h}}finally{o.__root=e,delete o.currentTarget,zr(f),pa(k)}}}function Ir(o){var e;e=document.head.appendChild(Xr());try{ha(()=>o(e),_n)}finally{}}function as(o){var e=document.createElement("template");return e.innerHTML=o.replaceAll("<!>","<!---->"),e.content}function Ta(o,e){var a=St;a.nodes_start===null&&(a.nodes_start=o,a.nodes_end=e)}function w(o,e){var a=(e&Zl)!==0,i=(e&Xl)!==0,n,c=!o.startsWith("<!>");return()=>{n===void 0&&(n=as(c?o:"<!>"+o),a||(n=Hr(n)));var d=i||Bn?document.importNode(n,!0):n.cloneNode(!0);if(a){var v=Hr(d),g=d.lastChild;Ta(v,g)}else Ta(d,d);return d}}function Xd(o,e,a="svg"){var i=!o.startsWith("<!>"),n=`<${a}>${i?o:"<!>"+o}</${a}>`,c;return()=>{if(!c){var d=as(n),v=Hr(d);c=Hr(v)}var g=c.cloneNode(!0);return Ta(g,g),g}}function ur(o,e){return Xd(o,e,"svg")}function Po(o=""){{var e=Xr(o+"");return Ta(e,e),e}}function Ee(){var o=document.createDocumentFragment(),e=document.createComment(""),a=Xr();return o.append(e,a),Ta(e,a),o}function x(o,e){o!==null&&o.before(e)}function e0(o){return o.endsWith("capture")&&o!=="gotpointercapture"&&o!=="lostpointercapture"}const t0=["beforeinput","click","change","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"];function r0(o){return t0.includes(o)}const a0={formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly",defaultvalue:"defaultValue",defaultchecked:"defaultChecked",srcobject:"srcObject",novalidate:"noValidate",allowfullscreen:"allowFullscreen",disablepictureinpicture:"disablePictureInPicture",disableremoteplayback:"disableRemotePlayback"};function o0(o){return o=o.toLowerCase(),a0[o]??o}const i0=["touchstart","touchmove"];function s0(o){return i0.includes(o)}let Lo=!0;function Cs(o){Lo=o}function y(o,e){var a=e==null?"":typeof e=="object"?e+"":e;a!==(o.__t??=o.nodeValue)&&(o.__t=a,o.nodeValue=a+"")}function n0(o,e){return l0(o,e)}const Ha=new Map;function l0(o,{target:e,anchor:a,props:i={},events:n,context:c,intro:d=!0}){Fd();var v=new Set,g=k=>{for(var h=0;h<k.length;h++){var m=k[h];if(!v.has(m)){v.add(m);var _=s0(m);e.addEventListener(m,io,{passive:_});var $=Ha.get(m);$===void 0?(document.addEventListener(m,io,{passive:_}),Ha.set(m,1)):Ha.set(m,$+1)}}};g(qi(Xn)),Ri.add(g);var u=void 0,f=Wd(()=>{var k=a??e.appendChild(Xr());return Or(()=>{if(c){Ie({});var h=rr;h.c=c}n&&(i.$$events=n),Lo=d,u=o(k,i)||{},Lo=!0,c&&Re()}),()=>{for(var h of v){e.removeEventListener(h,io);var m=Ha.get(h);--m===0?(document.removeEventListener(h,io),Ha.delete(h)):Ha.set(h,m)}Ri.delete(g),k!==a&&k.parentNode?.removeChild(k)}});return d0.set(u,f),u}let d0=new WeakMap;function et(o,e,...a){var i=o,n=Ze,c;ha(()=>{n!==(n=e())&&(c&&(gr(c),c=null),c=Or(()=>n(i,...a)))},ja)}function Ur(o){rr===null&&Yi(),Ct(()=>{const e=lr(o);if(typeof e=="function")return e})}function tl(o){rr===null&&Yi(),Ur(()=>()=>lr(o))}function H(o,e,a=!1){var i=o,n=null,c=null,d=Qt,v=a?ja:0,g=!1;const u=(m,_=!0)=>{g=!0,h(_,m)};var f=null;function k(){f!==null&&(f.lastChild.remove(),i.before(f),f=null);var m=d?n:c,_=d?c:n;m&&Jo(m),_&&bo(_,()=>{d?c=null:n=null})}const h=(m,_)=>{if(d!==(d=m)){var $=Xi(),M=i;if($&&(f=document.createDocumentFragment(),f.append(M=Xr())),d?n??=_&&Or(()=>_(M)):c??=_&&Or(()=>_(M)),$){var E=Ft,R=d?n:c,V=d?c:n;R&&E.skipped_effects.delete(R),V&&E.skipped_effects.add(V),E.add_callback(k)}else k()}};ha(()=>{g=!1,e(u),g||h(null,null)},v)}function Nr(o,e){return e}function c0(o,e,a){for(var i=o.items,n=[],c=e.length,d=0;d<c;d++)ts(e[d].e,n,!0);var v=c>0&&n.length===0&&a!==null;if(v){var g=a.parentNode;Hd(g),g.append(a),i.clear(),Fr(o,e[0].prev,e[c-1].next)}Gn(n,()=>{for(var u=0;u<c;u++){var f=e[u];v||(i.delete(f.k),Fr(o,f.prev,f.next)),gr(f.e,!v)}})}function mt(o,e,a,i,n,c=null){var d=o,v={flags:e,items:new Map,first:null},g=(e&bn)!==0;if(g){var u=o;d=u.appendChild(Xr())}var f=null,k=!1,h=new Map,m=En(()=>{var E=a();return Oo(E)?E:E==null?[]:qi(E)}),_,$;function M(){v0($,_,v,h,d,n,e,i,a),c!==null&&(_.length===0?f?Jo(f):f=Or(()=>c(d)):f!==null&&bo(f,()=>{f=null}))}ha(()=>{$??=St,_=t(m);var E=_.length;if(!(k&&E===0)){k=E===0;var R,V,b,T;if(Xi()){var C=new Set,B=Ft;for(V=0;V<E;V+=1){b=_[V],T=i(b,V);var z=v.items.get(T)??h.get(T);z?(e&(Fo|Ho))!==0&&rl(z,b,V,e):(R=al(null,v,null,null,b,T,V,n,e,a,!0),h.set(T,R)),C.add(T)}for(const[te,ue]of v.items)C.has(te)||B.skipped_effects.add(ue.e);B.add_callback(M)}else M();t(m)}})}function v0(o,e,a,i,n,c,d,v,g){var u=(d&Gl)!==0,f=(d&(Fo|Ho))!==0,k=e.length,h=a.items,m=a.first,_=m,$,M=null,E,R=[],V=[],b,T,C,B;if(u)for(B=0;B<k;B+=1)b=e[B],T=v(b,B),C=h.get(T),C!==void 0&&(C.a?.measure(),(E??=new Set).add(C));for(B=0;B<k;B+=1){if(b=e[B],T=v(b,B),C=h.get(T),C===void 0){var z=i.get(T);if(z!==void 0){i.delete(T),h.set(T,z);var te=M?M.next:_;Fr(a,M,z),Fr(a,z,te),ai(z,te,n),M=z}else{var ue=_?_.e.nodes_start:n;M=al(ue,a,M,M===null?a.first:M.next,b,T,B,c,d,g)}h.set(T,M),R=[],V=[],_=M.next;continue}if(f&&rl(C,b,B,d),(C.e.f&jr)!==0&&(Jo(C.e),u&&(C.a?.unfix(),(E??=new Set).delete(C))),C!==_){if($!==void 0&&$.has(C)){if(R.length<V.length){var de=V[0],xe;M=de.prev;var ce=R[0],fe=R[R.length-1];for(xe=0;xe<R.length;xe+=1)ai(R[xe],de,n);for(xe=0;xe<V.length;xe+=1)$.delete(V[xe]);Fr(a,ce.prev,fe.next),Fr(a,M,ce),Fr(a,fe,de),_=de,M=fe,B-=1,R=[],V=[]}else $.delete(C),ai(C,_,n),Fr(a,C.prev,C.next),Fr(a,C,M===null?a.first:M.next),Fr(a,M,C),M=C;continue}for(R=[],V=[];_!==null&&_.k!==T;)(_.e.f&jr)===0&&($??=new Set).add(_),V.push(_),_=_.next;if(_===null)continue;C=_}R.push(C),M=C,_=C.next}if(_!==null||$!==void 0){for(var Be=$===void 0?[]:qi($);_!==null;)(_.e.f&jr)===0&&Be.push(_),_=_.next;var Ve=Be.length;if(Ve>0){var Ye=(d&bn)!==0&&k===0?n:null;if(u){for(B=0;B<Ve;B+=1)Be[B].a?.measure();for(B=0;B<Ve;B+=1)Be[B].a?.fix()}c0(a,Be,Ye)}}u&&Kr(()=>{if(E!==void 0)for(C of E)C.a?.apply()}),o.first=a.first&&a.first.e,o.last=M&&M.e;for(var Qe of i.values())gr(Qe.e);i.clear()}function rl(o,e,a,i){(i&Fo)!==0&&co(o.v,e),(i&Ho)!==0?co(o.i,a):o.i=a}function al(o,e,a,i,n,c,d,v,g,u,f){var k=(g&Fo)!==0,h=(g&Wl)===0,m=k?h?Dd(n,!1,!1):Ya(n):n,_=(g&Ho)===0?d:Ya(d),$={i:_,v:m,k:c,a:null,e:null,prev:a,next:i};try{if(o===null){var M=document.createDocumentFragment();M.append(o=Xr())}return $.e=Or(()=>v(o,m,_,u),_d),$.e.prev=a&&a.e,$.e.next=i&&i.e,a===null?f||(e.first=$):(a.next=$,a.e.next=$.e),i!==null&&(i.prev=$,i.e.prev=$.e),$}finally{}}function ai(o,e,a){for(var i=o.next?o.next.e.nodes_start:a,n=e?e.e.nodes_start:a,c=o.e.nodes_start;c!==null&&c!==i;){var d=Go(c);n.before(c),c=d}}function Fr(o,e,a){e===null?o.first=a:(e.next=a,e.e.next=a&&a.e),a!==null&&(a.prev=e,a.e.prev=e&&e.e)}function g0(o,e,a=!1,i=!1,n=!1){var c=o,d="";Y(()=>{var v=St;if(d!==(d=e()??"")&&(v.nodes_start!==null&&(Un(v.nodes_start,v.nodes_end),v.nodes_start=v.nodes_end=null),d!=="")){var g=d+"";a?g=`<svg>${g}</svg>`:i&&(g=`<math>${g}</math>`);var u=as(g);if((a||i)&&(u=Hr(u)),Ta(Hr(u),u.lastChild),a||i)for(;Hr(u);)c.before(Hr(u));else c.before(u)}})}function nr(o,e,a){var i=o,n,c,d=null,v=null;function g(){c&&(bo(c),c=null),d&&(d.lastChild.remove(),i.before(d),d=null),c=v,v=null}ha(()=>{if(n!==(n=e())){var u=Xi();if(n){var f=i;u&&(d=document.createDocumentFragment(),d.append(f=Xr()),c&&Ft.skipped_effects.add(c)),v=Or(()=>a(f,n))}u?Ft.add_callback(g):g()}},ja)}function u0(o,e,a,i,n,c){var d,v,g=null,u=o,f;ha(()=>{const k=e()||null;var h=td;k!==d&&(f&&(k===null?bo(f,()=>{f=null,v=null}):k===v?Jo(f):(gr(f),Cs(!1))),k&&k!==v&&(f=Or(()=>{if(g=document.createElementNS(h,k),Ta(g,g),i){var m=g.appendChild(Xr());i(g,m)}St.nodes_end=g,u.before(g)})),d=k,d&&(v=d),Cs(!0))},ja)}function x0(o,e){var a=void 0,i;ha(()=>{a!==(a=e())&&(i&&(gr(i),i=null),a&&(i=Or(()=>{xo(()=>a(o))})))})}function ol(o){var e,a,i="";if(typeof o=="string"||typeof o=="number")i+=o;else if(typeof o=="object")if(Array.isArray(o)){var n=o.length;for(e=0;e<n;e++)o[e]&&(a=ol(o[e]))&&(i&&(i+=" "),i+=a)}else for(a in o)o[a]&&(i&&(i+=" "),i+=a);return i}function f0(){for(var o,e,a=0,i="",n=arguments.length;a<n;a++)(o=arguments[a])&&(e=ol(o))&&(i&&(i+=" "),i+=e);return i}function Zt(o){return typeof o=="object"?f0(o):o??""}const $s=[...` 	
\r\f \v\uFEFF`];function b0(o,e,a){var i=o==null?"":""+o;if(e&&(i=i?i+" "+e:e),a){for(var n in a)if(a[n])i=i?i+" "+n:n;else if(i.length)for(var c=n.length,d=0;(d=i.indexOf(n,d))>=0;){var v=d+c;(d===0||$s.includes(i[d-1]))&&(v===i.length||$s.includes(i[v]))?i=(d===0?"":i.substring(0,d))+i.substring(v+1):d=v}}return i===""?null:i}function Ss(o,e=!1){var a=e?" !important;":";",i="";for(var n in o){var c=o[n];c!=null&&c!==""&&(i+=" "+n+": "+c+a)}return i}function oi(o){return o[0]!=="-"||o[1]!=="-"?o.toLowerCase():o}function p0(o,e){if(e){var a="",i,n;if(Array.isArray(e)?(i=e[0],n=e[1]):i=e,o){o=String(o).replaceAll(/\s*\/\*.*?\*\/\s*/g,"").trim();var c=!1,d=0,v=!1,g=[];i&&g.push(...Object.keys(i).map(oi)),n&&g.push(...Object.keys(n).map(oi));var u=0,f=-1;const $=o.length;for(var k=0;k<$;k++){var h=o[k];if(v?h==="/"&&o[k-1]==="*"&&(v=!1):c?c===h&&(c=!1):h==="/"&&o[k+1]==="*"?v=!0:h==='"'||h==="'"?c=h:h==="("?d++:h===")"&&d--,!v&&c===!1&&d===0){if(h===":"&&f===-1)f=k;else if(h===";"||k===$-1){if(f!==-1){var m=oi(o.substring(u,f).trim());if(!g.includes(m)){h!==";"&&k++;var _=o.substring(u,k).trim();a+=" "+_+";"}}u=k+1,f=-1}}}}return i&&(a+=Ss(i)),n&&(a+=Ss(n,!0)),a=a.trim(),a===""?null:a}return o==null?null:String(o)}function ut(o,e,a,i,n,c){var d=o.__className;if(d!==a||d===void 0){var v=b0(a,i,c);v==null?o.removeAttribute("class"):e?o.className=v:o.setAttribute("class",v),o.__className=a}else if(c&&n!==c)for(var g in c){var u=!!c[g];(n==null||u!==!!n[g])&&o.classList.toggle(g,u)}return c}function ii(o,e={},a,i){for(var n in a){var c=a[n];e[n]!==c&&(a[n]==null?o.style.removeProperty(n):o.style.setProperty(n,c,i))}}function Yt(o,e,a,i){var n=o.__style;if(n!==e){var c=p0(e,i);c==null?o.removeAttribute("style"):o.style.cssText=c,o.__style=e}else i&&(Array.isArray(i)?(ii(o,a?.[0],i[0]),ii(o,a?.[1],i[1],"important")):ii(o,a,i));return i}function Ao(o,e,a=!1){if(o.multiple){if(e==null)return;if(!Oo(e))return yd();for(var i of o.options)i.selected=e.includes(lo(i));return}for(i of o.options){var n=lo(i);if(Rn(n,e)){i.selected=!0;return}}(!a||e!==void 0)&&(o.selectedIndex=-1)}function il(o){var e=new MutationObserver(()=>{Ao(o,o.__value)});e.observe(o,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["value"]}),es(()=>{e.disconnect()})}function cr(o,e,a=e){var i=!0;Wo(o,"change",n=>{var c=n?"[selected]":":checked",d;if(o.multiple)d=[].map.call(o.querySelectorAll(c),lo);else{var v=o.querySelector(c)??o.querySelector("option:not([disabled])");d=v&&lo(v)}a(d)}),xo(()=>{var n=e();if(Ao(o,n,i),i&&n===void 0){var c=o.querySelector(":checked");c!==null&&(n=lo(c),a(n))}o.__value=n,i=!1}),il(o)}function lo(o){return"__value"in o?o.__value:o.value}const to=Symbol("class"),qa=Symbol("style"),sl=Symbol("is custom element"),nl=Symbol("is html");function ll(o,e){var a=os(o);a.value===(a.value=e??void 0)||o.value===e&&(e!==0||o.nodeName!=="PROGRESS")||(o.value=e??"")}function m0(o,e){e?o.hasAttribute("selected")||o.setAttribute("selected",""):o.removeAttribute("selected")}function De(o,e,a,i){var n=os(o);n[e]!==(n[e]=a)&&(e==="loading"&&(o[dd]=a),a==null?o.removeAttribute(e):typeof a!="string"&&dl(o).includes(e)?o[e]=a:o.setAttribute(e,a))}function h0(o,e,a,i,n=!1,c=!1){var d=os(o),v=d[sl],g=!d[nl],u=e||{},f=o.tagName==="OPTION";for(var k in e)k in a||(a[k]=null);a.class?a.class=Zt(a.class):(i||a[to])&&(a.class=null),a[qa]&&(a.style??=null);var h=dl(o);for(const b in a){let T=a[b];if(f&&b==="value"&&T==null){o.value=o.__value="",u[b]=T;continue}if(b==="class"){var m=o.namespaceURI==="http://www.w3.org/1999/xhtml";ut(o,m,T,i,e?.[to],a[to]),u[b]=T,u[to]=a[to];continue}if(b==="style"){Yt(o,T,e?.[qa],a[qa]),u[b]=T,u[qa]=a[qa];continue}var _=u[b];if(!(T===_&&!(T===void 0&&o.hasAttribute(b)))){u[b]=T;var $=b[0]+b[1];if($!=="$$")if($==="on"){const C={},B="$$"+b;let z=b.slice(2);var M=r0(z);if(e0(z)&&(z=z.slice(0,-7),C.capture=!0),!M&&_){if(T!=null)continue;o.removeEventListener(z,u[B],C),u[B]=null}if(T!=null)if(M)o[`__${z}`]=T,yt([z]);else{let te=function(ue){u[b].call(this,ue)};var V=te;u[B]=rs(z,o,te,C)}else M&&(o[`__${z}`]=void 0)}else if(b==="style")De(o,b,T);else if(b==="autofocus")Od(o,!!T);else if(!v&&(b==="__value"||b==="value"&&T!=null))o.value=o.__value=T;else if(b==="selected"&&f)m0(o,T);else{var E=b;g||(E=o0(E));var R=E==="defaultValue"||E==="defaultChecked";if(T==null&&!v&&!R)if(d[b]=null,E==="value"||E==="checked"){let C=o;const B=e===void 0;if(E==="value"){let z=C.defaultValue;C.removeAttribute(E),C.defaultValue=z,C.value=C.__value=B?z:null}else{let z=C.defaultChecked;C.removeAttribute(E),C.defaultChecked=z,C.checked=B?z:!1}}else o.removeAttribute(b);else R||h.includes(E)&&(v||typeof T!="string")?(o[E]=T,E in d&&(d[E]=Qt)):typeof T!="function"&&De(o,E,T)}}}return u}function Bi(o,e,a=[],i=[],n,c=!1,d=!1){An(a,i,v=>{var g=void 0,u={},f=o.nodeName==="SELECT",k=!1;if(ha(()=>{var m=e(...v.map(t)),_=h0(o,g,m,n,c,d);k&&f&&"value"in m&&Ao(o,m.value);for(let M of Object.getOwnPropertySymbols(u))m[M]||gr(u[M]);for(let M of Object.getOwnPropertySymbols(m)){var $=m[M];M.description===rd&&(!g||$!==g[M])&&(u[M]&&gr(u[M]),u[M]=Or(()=>x0(o,()=>$))),_[M]=$}g=_}),f){var h=o;xo(()=>{Ao(h,g.value,!0),il(h)})}k=!0})}function os(o){return o.__attributes??={[sl]:o.nodeName.includes("-"),[nl]:o.namespaceURI===ed}}var Ts=new Map;function dl(o){var e=o.getAttribute("is")||o.nodeName,a=Ts.get(e);if(a)return a;Ts.set(e,a=[]);for(var i,n=o,c=Element.prototype;c!==n;){i=od(n);for(var d in i)i[d].set&&a.push(d);n=mn(n)}return a}const y0=()=>performance.now(),Jr={tick:o=>requestAnimationFrame(o),now:()=>y0(),tasks:new Set};function cl(){const o=Jr.now();Jr.tasks.forEach(e=>{e.c(o)||(Jr.tasks.delete(e),e.f())}),Jr.tasks.size!==0&&Jr.tick(cl)}function _0(o){let e;return Jr.tasks.size===0&&Jr.tick(cl),{promise:new Promise(a=>{Jr.tasks.add(e={c:o,f:a})}),abort(){Jr.tasks.delete(e)}}}function mo(o,e){Za(()=>{o.dispatchEvent(new CustomEvent(e))})}function k0(o){if(o==="float")return"cssFloat";if(o==="offset")return"cssOffset";if(o.startsWith("--"))return o;const e=o.split("-");return e.length===1?e[0]:e[0]+e.slice(1).map(a=>a[0].toUpperCase()+a.slice(1)).join("")}function Ms(o){const e={},a=o.split(";");for(const i of a){const[n,c]=i.split(":");if(!n||c===void 0)break;const d=k0(n.trim());e[d]=c.trim()}return e}const w0=o=>o;function Es(o,e,a,i){var n=(o&Ql)!==0,c="both",d,v=e.inert,g=e.style.overflow,u,f;function k(){return Za(()=>d??=a()(e,i?.()??{},{direction:c}))}var h={is_global:n,in(){e.inert=v,mo(e,"introstart"),u=Di(e,k(),f,1,()=>{mo(e,"introend"),u?.abort(),u=d=void 0,e.style.overflow=g})},out(M){e.inert=!0,mo(e,"outrostart"),f=Di(e,k(),u,0,()=>{mo(e,"outroend"),M?.()})},stop:()=>{u?.abort(),f?.abort()}},m=St;if((m.transitions??=[]).push(h),Lo){var _=n;if(!_){for(var $=m.parent;$&&($.f&ja)!==0;)for(;($=$.parent)&&($.f&Pa)===0;);_=!$||($.f&zo)!==0}_&&xo(()=>{lr(()=>h.in())})}}function Di(o,e,a,i,n){var c=i===1;if(Ua(e)){var d,v=!1;return Kr(()=>{if(!v){var M=e({direction:c?"in":"out"});d=Di(o,M,a,i,n)}}),{abort:()=>{v=!0,d?.abort()},deactivate:()=>d.deactivate(),reset:()=>d.reset(),t:()=>d.t()}}if(a?.deactivate(),!e?.duration)return n(),{abort:Ze,deactivate:Ze,reset:Ze,t:()=>i};const{delay:g=0,css:u,tick:f,easing:k=w0}=e;var h=[];if(c&&a===void 0&&(f&&f(0,1),u)){var m=Ms(u(0,1));h.push(m,m)}var _=()=>1-i,$=o.animate(h,{duration:g,fill:"forwards"});return $.onfinish=()=>{$.cancel();var M=a?.t()??1-i;a?.abort();var E=i-M,R=e.duration*Math.abs(E),V=[];if(R>0){var b=!1;if(u)for(var T=Math.ceil(R/16.666666666666668),C=0;C<=T;C+=1){var B=M+E*k(C/T),z=Ms(u(B,1-B));V.push(z),b||=z.overflow==="hidden"}b&&(o.style.overflow="hidden"),_=()=>{var te=$.currentTime;return M+E*k(te/R)},f&&_0(()=>{if($.playState!=="running")return!1;var te=_();return f(te,1-te),!0})}$=o.animate(V,{duration:R,fill:"forwards"}),$.onfinish=()=>{_=()=>i,f?.(i,1-i),n()}},{abort:()=>{$&&($.cancel(),$.effect=null,$.onfinish=Ze)},deactivate:()=>{n=Ze},reset:()=>{i===0&&f?.(1,0)},t:()=>_()}}function Se(o,e,a=e){var i=new WeakSet;Wo(o,"input",async n=>{var c=n?o.defaultValue:o.value;if(c=ni(o)?li(c):c,a(c),Ft!==null&&i.add(Ft),await Qd(),c!==(c=e())){var d=o.selectionStart,v=o.selectionEnd;o.value=c??"",v!==null&&(o.selectionStart=d,o.selectionEnd=Math.min(v,o.value.length))}}),lr(e)==null&&o.value&&(a(ni(o)?li(o.value):o.value),Ft!==null&&i.add(Ft)),fo(()=>{var n=e();if(o===document.activeElement){var c=ko??Ft;if(i.has(c))return}ni(o)&&n===li(o.value)||o.type==="date"&&!n&&!o.value||n!==o.value&&(o.value=n??"")})}const si=new Set;function jo(o,e,a,i,n=i){var c=a.getAttribute("type")==="checkbox",d=o;if(e!==null)for(var v of e)d=d[v]??=[];d.push(a),Wo(a,"change",()=>{var g=a.__value;c&&(g=C0(d,g,a.checked)),n(g)},()=>n(c?[]:null)),fo(()=>{var g=i();c?(g=g||[],a.checked=g.includes(a.__value)):a.checked=Rn(a.__value,g)}),es(()=>{var g=d.indexOf(a);g!==-1&&d.splice(g,1)}),si.has(d)||(si.add(d),Kr(()=>{d.sort((g,u)=>g.compareDocumentPosition(u)===4?-1:1),si.delete(d)})),Kr(()=>{})}function Gt(o,e,a=e){Wo(o,"change",i=>{var n=i?o.defaultChecked:o.checked;a(n)}),lr(e)==null&&a(o.checked),fo(()=>{var i=e();o.checked=!!i})}function C0(o,e,a){for(var i=new Set,n=0;n<o.length;n+=1)o[n].checked&&i.add(o[n].__value);return a||i.delete(e),Array.from(i)}function ni(o){var e=o.type;return e==="number"||e==="range"}function li(o){return o===""?null:+o}function Ps(o,e){return o===e||o?.[va]===e}function is(o={},e,a,i){return xo(()=>{var n,c;return fo(()=>{n=c,c=[],lr(()=>{o!==a(...c)&&(e(o,...c),n&&Ps(a(...n),o)&&e(null,...n))})}),()=>{Kr(()=>{c&&Ps(a(...c),o)&&e(null,...c)})}}),o}const Oa=[];function $0(o,e=Ze){let a=null;const i=new Set;function n(v){if(Cn(o,v)&&(o=v,a)){const g=!Oa.length;for(const u of i)u[1](),Oa.push(u,o);if(g){for(let u=0;u<Oa.length;u+=2)Oa[u][0](Oa[u+1]);Oa.length=0}}}function c(v){n(v(o))}function d(v,g=Ze){const u=[v,g];return i.add(u),i.size===1&&(a=e(n,c)||Ze),v(o),()=>{i.delete(u),i.size===0&&a&&(a(),a=null)}}return{set:n,update:c,subscribe:d}}let ho=!1;function S0(o){var e=ho;try{return ho=!1,[o(),ho]}finally{ho=e}}const T0={get(o,e){if(!o.exclude.includes(e))return o.props[e]},set(o,e){return!1},getOwnPropertyDescriptor(o,e){if(!o.exclude.includes(e)&&e in o.props)return{enumerable:!0,configurable:!0,value:o.props[e]}},has(o,e){return o.exclude.includes(e)?!1:e in o.props},ownKeys(o){return Reflect.ownKeys(o.props).filter(e=>!o.exclude.includes(e))}};function st(o,e,a){return new Proxy({props:o,exclude:e},T0)}const M0={get(o,e){let a=o.props.length;for(;a--;){let i=o.props[a];if(Ua(i)&&(i=i()),typeof i=="object"&&i!==null&&e in i)return i[e]}},set(o,e,a){let i=o.props.length;for(;i--;){let n=o.props[i];Ua(n)&&(n=n());const c=ca(n,e);if(c&&c.set)return c.set(a),!0}return!1},getOwnPropertyDescriptor(o,e){let a=o.props.length;for(;a--;){let i=o.props[a];if(Ua(i)&&(i=i()),typeof i=="object"&&i!==null&&e in i){const n=ca(i,e);return n&&!n.configurable&&(n.configurable=!0),n}}},has(o,e){if(e===va||e===kn)return!1;for(let a of o.props)if(Ua(a)&&(a=a()),a!=null&&e in a)return!0;return!1},ownKeys(o){const e=[];for(let a of o.props)if(Ua(a)&&(a=a()),!!a){for(const i in a)e.includes(i)||e.push(i);for(const i of Object.getOwnPropertySymbols(a))e.includes(i)||e.push(i)}return e}};function it(...o){return new Proxy({props:o},M0)}function wt(o,e,a,i){var n=(a&Yl)!==0,c=(a&Kl)!==0,d=i,v=!0,g=()=>(v&&(v=!1,d=c?lr(i):i),d),u;if(n){var f=va in o||kn in o;u=ca(o,e)?.set??(f&&e in o?R=>o[e]=R:void 0)}var k,h=!1;n?[k,h]=S0(()=>o[e]):k=o[e],k===void 0&&i!==void 0&&(k=g(),u&&(bd(),u(k)));var m;if(m=()=>{var R=o[e];return R===void 0?g():(v=!0,R)},(a&Vl)===0)return m;if(u){var _=o.$$legacy;return(function(R,V){return arguments.length>0?((!V||_||h)&&u(V?m():R),R):m()})}var $=!1,M=((a&Jl)!==0?Uo:En)(()=>($=!1,m()));n&&t(M);var E=St;return(function(R,V){if(arguments.length>0){const b=V?t(M):n?Lt(R):R;return l(M,b),$=!0,d!==void 0&&(d=b),R}return Na&&$||(E.f&Aa)!==0?M.v:t(M)})}const ss=$0({currentPath:"/",currentRoute:null,params:{}});let vl=[];function E0(o){return vl=o,(function(e){if(e.search[1]==="/"){const a=e.search.slice(1).split("&").map(function(i){return i.replace(/~and~/g,"&")}).join("?");window.history.replaceState(null,"",e.pathname.slice(0,-1)+a+e.hash)}})(window.location),Fi(),window.addEventListener("popstate",Fi),ss}function vt(o){o!==gl()&&(window.history.pushState({},"",o),Fi())}function gl(){return window.location.pathname}function P0(o){if(o?.title){document.title=o.title;const i=document.querySelector('meta[property="og:title"]'),n=document.querySelector('meta[name="twitter:title"]');i&&i.setAttribute("content",o.title),n&&n.setAttribute("content",o.title)}if(o?.description){const i=document.querySelector('meta[property="og:description"]'),n=document.querySelector('meta[name="twitter:description"]'),c=document.querySelector('meta[name="description"]');i&&i.setAttribute("content",o.description),n&&n.setAttribute("content",o.description),c&&c.setAttribute("content",o.description)}if(o?.keywords){const i=document.querySelector('meta[name="keywords"]');i&&i.setAttribute("content",o.keywords)}if(o?.robots){const i=document.querySelector('meta[name="robots"]');i&&i.setAttribute("content",o.robots)}const e=document.querySelector('link[rel="canonical"]');e&&e.setAttribute("href",`https://farizink.github.io${o.path}`);const a=document.querySelector('meta[property="og:url"]');a&&a.setAttribute("content",`https://farizink.github.io${o.path}`)}function Fi(){const o=gl(),e=L0(o),a=j0(o,e);e&&P0(e),ss.set({currentPath:o,currentRoute:e,params:a})}function L0(o){for(const e of vl)if(A0(o,e.path))return e;return null}function A0(o,e){const a=o.split("/").filter(Boolean),i=e.split("/").filter(Boolean);return a.length!==i.length?!1:i.every((n,c)=>n.startsWith(":")||n===a[c])}function j0(o,e){if(!e)return{};const a=o.split("/").filter(Boolean),i=e.path.split("/").filter(Boolean),n={};return i.forEach((c,d)=>{if(c.startsWith(":")){const v=c.slice(1);n[v]=a[d]||""}}),n}var N0=()=>history.back(),I0=w(`<div class="flex flex-col items-center justify-center min-h-[70vh] text-center px-4"><div class="mb-8"><div class="w-32 h-32 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center mb-6"><svg class="w-16 h-16 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 21a9 9 0 110-18 9 9 0 010 18z"></path></svg></div> <h1 class="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">404</h1> <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-3">Oops! Page Not Found</h2> <p class="text-gray-600 dark:text-gray-300 max-w-md mx-auto mb-8">The page you're looking for seems to have vanished into the digital void. Let's get you back
        to safety!</p></div> <div class="flex flex-col sm:flex-row gap-4 items-center"><a href="/" class="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium transition-all transform hover:scale-105 shadow-lg"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg> Back to Home</a> <button class="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-xl font-medium transition-all"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg> Go Back</button></div> <div class="mt-12 text-sm text-gray-500 dark:text-gray-400"><p>Lost? Try checking the URL or explore our tools below</p></div></div>`);function R0(o,e){Ie(e,!0);let a=p(Lt({currentPath:"/",currentRoute:null,params:{}}));ss.subscribe(v=>{l(a,v,!0)});var i=Ee(),n=ge(i);{var c=v=>{const g=xt(()=>t(a).currentRoute.component);var u=Ee(),f=ge(u);nr(f,()=>t(g),(k,h)=>{h(k,{get params(){return t(a).params}})}),x(v,u)},d=v=>{var g=I0(),u=s(r(g),2),f=s(r(u),2);f.__click=[N0],x(v,g)};H(n,v=>{t(a).currentRoute?v(c):v(d,!1)})}x(o,i),Re()}yt(["click"]);/**
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
 */const B0={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};var D0=ur("<svg><!><!></svg>");function nt(o,e){Ie(e,!0);const a=wt(e,"color",3,"currentColor"),i=wt(e,"size",3,24),n=wt(e,"strokeWidth",3,2),c=wt(e,"absoluteStrokeWidth",3,!1),d=wt(e,"iconNode",19,()=>[]),v=st(e,["$$slots","$$events","$$legacy","name","color","size","strokeWidth","absoluteStrokeWidth","iconNode","children"]);var g=D0();Bi(g,k=>({...B0,...v,width:i(),height:i(),stroke:a(),"stroke-width":k,class:["lucide-icon lucide",e.name&&`lucide-${e.name}`,e.class]}),[()=>c()?Number(n())*24/Number(i()):n()]);var u=r(g);mt(u,17,d,Nr,(k,h)=>{var m=xt(()=>Qa(t(h),2));let _=()=>t(m)[0],$=()=>t(m)[1];var M=Ee(),E=ge(M);u0(E,_,!0,(R,V)=>{Bi(R,()=>({...$()}))}),x(k,M)});var f=s(u);et(f,()=>e.children??Ze),x(o,g),Re()}function Hi(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"}]];nt(o,it({name:"activity"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function ul(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M5 12h14"}],["path",{d:"m12 5 7 7-7 7"}]];nt(o,it({name:"arrow-right"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function xl(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"m21 16-4 4-4-4"}],["path",{d:"M17 20V4"}],["path",{d:"m3 8 4-4 4 4"}],["path",{d:"M7 4v16"}]];nt(o,it({name:"arrow-up-down"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function fl(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"}],["path",{d:"m3.3 7 8.7 5 8.7-5"}],["path",{d:"M12 22V12"}]];nt(o,it({name:"box"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function ua(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2"}],["line",{x1:"8",x2:"16",y1:"6",y2:"6"}],["line",{x1:"16",x2:"16",y1:"14",y2:"18"}],["path",{d:"M16 10h.01"}],["path",{d:"M12 10h.01"}],["path",{d:"M8 10h.01"}],["path",{d:"M12 14h.01"}],["path",{d:"M8 14h.01"}],["path",{d:"M12 18h.01"}],["path",{d:"M8 18h.01"}]];nt(o,it({name:"calculator"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function Ma(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M3 10h18"}]];nt(o,it({name:"calendar"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function F0(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16"}],["path",{d:"M18 17V9"}],["path",{d:"M13 17V5"}],["path",{d:"M8 17v-3"}]];nt(o,it({name:"chart-column"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function xa(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M20 6 9 17l-5-5"}]];nt(o,it({name:"check"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function jt(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"m15 18-6-6 6-6"}]];nt(o,it({name:"chevron-left"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function ns(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["circle",{cx:"12",cy:"12",r:"10"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16"}]];nt(o,it({name:"circle-alert"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function ka(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M12 6v6l4 2"}],["circle",{cx:"12",cy:"12",r:"10"}]];nt(o,it({name:"clock"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function Yr(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"m16 18 6-6-6-6"}],["path",{d:"m8 6-6 6 6 6"}]];nt(o,it({name:"code"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function ht(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"}]];nt(o,it({name:"copy"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function H0(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["rect",{width:"20",height:"14",x:"2",y:"5",rx:"2"}],["line",{x1:"2",x2:"22",y1:"10",y2:"10"}]];nt(o,it({name:"credit-card"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function Ls(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["rect",{width:"12",height:"12",x:"2",y:"10",rx:"2",ry:"2"}],["path",{d:"m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6"}],["path",{d:"M6 18h.01"}],["path",{d:"M10 14h.01"}],["path",{d:"M15 6h.01"}],["path",{d:"M18 9h.01"}]];nt(o,it({name:"dices"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function No(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["line",{x1:"12",x2:"12",y1:"2",y2:"22"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"}]];nt(o,it({name:"dollar-sign"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function Xa(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M12 15V3"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["path",{d:"m7 10 5 5 5-5"}]];nt(o,it({name:"download"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function Oi(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"}],["path",{d:"M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"}]];nt(o,it({name:"droplets"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function O0(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M15 3h6v6"}],["path",{d:"M10 14 21 3"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}]];nt(o,it({name:"external-link"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function z0(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"}],["path",{d:"m2 2 20 20"}]];nt(o,it({name:"eye-off"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function bl(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"}],["circle",{cx:"12",cy:"12",r:"3"}]];nt(o,it({name:"eye"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function pl(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1"}],["path",{d:"M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1"}]];nt(o,it({name:"file-json"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function Jt(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M10 9H8"}],["path",{d:"M16 13H8"}],["path",{d:"M16 17H8"}]];nt(o,it({name:"file-text"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function ml(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["rect",{x:"3",y:"8",width:"18",height:"4",rx:"1"}],["path",{d:"M12 8v13"}],["path",{d:"M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"}],["path",{d:"M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"}]];nt(o,it({name:"gift"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function $a(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["circle",{cx:"18",cy:"18",r:"3"}],["circle",{cx:"6",cy:"6",r:"3"}],["path",{d:"M13 6h3a2 2 0 0 1 2 2v7"}],["path",{d:"M11 18H8a2 2 0 0 1-2-2V9"}]];nt(o,it({name:"git-compare"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function U0(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["circle",{cx:"12",cy:"18",r:"3"}],["circle",{cx:"6",cy:"6",r:"3"}],["circle",{cx:"18",cy:"6",r:"3"}],["path",{d:"M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9"}],["path",{d:"M12 12v3"}]];nt(o,it({name:"git-fork"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function q0(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"}],["path",{d:"M9 18c-4.51 2-5-2-7-2"}]];nt(o,it({name:"github"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function Io(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"}],["path",{d:"M2 12h20"}]];nt(o,it({name:"globe"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function fa(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["line",{x1:"4",x2:"20",y1:"9",y2:"9"}],["line",{x1:"4",x2:"20",y1:"15",y2:"15"}],["line",{x1:"10",x2:"8",y1:"3",y2:"21"}],["line",{x1:"16",x2:"14",y1:"3",y2:"21"}]];nt(o,it({name:"hash"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function hl(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"}]];nt(o,it({name:"heart"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function Ka(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{d:"M3 3v5h5"}],["path",{d:"M12 7v5l4 2"}]];nt(o,it({name:"history"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function yl(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2"}],["circle",{cx:"9",cy:"9",r:"2"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"}]];nt(o,it({name:"image"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function ba(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 16v-4"}],["path",{d:"M12 8h.01"}]];nt(o,it({name:"info"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function _l(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"}],["path",{d:"m21 2-9.6 9.6"}],["circle",{cx:"7.5",cy:"15.5",r:"5.5"}]];nt(o,it({name:"key"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function Ro(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"}]];nt(o,it({name:"link"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function G0(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M3 5h.01"}],["path",{d:"M3 12h.01"}],["path",{d:"M3 19h.01"}],["path",{d:"M8 5h13"}],["path",{d:"M8 12h13"}],["path",{d:"M8 19h13"}]];nt(o,it({name:"list"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function kl(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4"}]];nt(o,it({name:"lock"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function W0(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8"}],["path",{d:"M10 19v-3.96 3.15"}],["path",{d:"M7 19h5"}],["rect",{width:"6",height:"10",x:"16",y:"12",rx:"2"}]];nt(o,it({name:"monitor-smartphone"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function J0(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"}]];nt(o,it({name:"moon"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function Ea(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"}],["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor"}]];nt(o,it({name:"palette"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function As(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1"}]];nt(o,it({name:"pause"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function wo(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["line",{x1:"19",x2:"5",y1:"5",y2:"19"}],["circle",{cx:"6.5",cy:"6.5",r:"2.5"}],["circle",{cx:"17.5",cy:"17.5",r:"2.5"}]];nt(o,it({name:"percent"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function V0(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"}]];nt(o,it({name:"play"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function Bo(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]];nt(o,it({name:"plus"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function zi(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["rect",{width:"5",height:"5",x:"3",y:"3",rx:"1"}],["rect",{width:"5",height:"5",x:"16",y:"3",rx:"1"}],["rect",{width:"5",height:"5",x:"3",y:"16",rx:"1"}],["path",{d:"M21 16h-3a2 2 0 0 0-2 2v3"}],["path",{d:"M21 21v.01"}],["path",{d:"M12 7v3a2 2 0 0 1-2 2H7"}],["path",{d:"M3 12h.01"}],["path",{d:"M12 3h.01"}],["path",{d:"M12 16v.01"}],["path",{d:"M16 12h1"}],["path",{d:"M21 12v.01"}],["path",{d:"M12 21v-1"}]];nt(o,it({name:"qr-code"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function ta(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]];nt(o,it({name:"refresh-cw"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function Yo(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{d:"M3 3v5h5"}]];nt(o,it({name:"rotate-ccw"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function Y0(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"}],["path",{d:"m14.5 12.5 2-2"}],["path",{d:"m11.5 9.5 2-2"}],["path",{d:"m8.5 6.5 2-2"}],["path",{d:"m17.5 15.5 2-2"}]];nt(o,it({name:"ruler"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function Ui(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"m21 21-4.34-4.34"}],["circle",{cx:"11",cy:"11",r:"8"}]];nt(o,it({name:"search"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function wl(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M14 17H5"}],["path",{d:"M19 7h-9"}],["circle",{cx:"17",cy:"17",r:"3"}],["circle",{cx:"7",cy:"7",r:"3"}]];nt(o,it({name:"settings-2"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function ls(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}]];nt(o,it({name:"shield"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function Co(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"m18 14 4 4-4 4"}],["path",{d:"m18 2 4 4-4 4"}],["path",{d:"M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22"}],["path",{d:"M2 6h1.972a4 4 0 0 1 3.6 2.2"}],["path",{d:"M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45"}]];nt(o,it({name:"shuffle"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function K0(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}],["path",{d:"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"}]];nt(o,it({name:"square-pen"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function ds(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"}]];nt(o,it({name:"star"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function Q0(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["circle",{cx:"12",cy:"12",r:"4"}],["path",{d:"M12 2v2"}],["path",{d:"M12 20v2"}],["path",{d:"m4.93 4.93 1.41 1.41"}],["path",{d:"m17.66 17.66 1.41 1.41"}],["path",{d:"M2 12h2"}],["path",{d:"M20 12h2"}],["path",{d:"m6.34 17.66-1.41 1.41"}],["path",{d:"m19.07 4.93-1.41 1.41"}]];nt(o,it({name:"sun"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function Z0(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor"}]];nt(o,it({name:"tag"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function X0(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["circle",{cx:"12",cy:"12",r:"10"}],["circle",{cx:"12",cy:"12",r:"6"}],["circle",{cx:"12",cy:"12",r:"2"}]];nt(o,it({name:"target"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function ec(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"}]];nt(o,it({name:"thermometer"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function Cl(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["line",{x1:"10",x2:"14",y1:"2",y2:"2"}],["line",{x1:"12",x2:"15",y1:"14",y2:"11"}],["circle",{cx:"12",cy:"14",r:"8"}]];nt(o,it({name:"timer"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function Ko(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M10 11v6"}],["path",{d:"M14 11v6"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"}],["path",{d:"M3 6h18"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}]];nt(o,it({name:"trash-2"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function tc(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M16 17h6v-6"}],["path",{d:"m22 17-8.5-8.5-5 5L2 7"}]];nt(o,it({name:"trending-down"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function rc(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M16 7h6v6"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17"}]];nt(o,it({name:"trending-up"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function ac(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"}]];nt(o,it({name:"twitter"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function Qr(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M12 4v16"}],["path",{d:"M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2"}],["path",{d:"M9 20h6"}]];nt(o,it({name:"type"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function oc(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M12 3v12"}],["path",{d:"m17 8-5-5-5 5"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}]];nt(o,it({name:"upload"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function cs(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87"}],["circle",{cx:"9",cy:"7",r:"4"}]];nt(o,it({name:"users"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function ic(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"}],["path",{d:"M7 2v20"}],["path",{d:"M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"}]];nt(o,it({name:"utensils"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function sc(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"}]];nt(o,it({name:"volume"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function nc(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["circle",{cx:"12",cy:"5",r:"3"}],["path",{d:"M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z"}]];nt(o,it({name:"weight"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function lc(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"}]];nt(o,it({name:"wrench"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function go(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];nt(o,it({name:"x"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function Kt(o,e){Ie(e,!0);/**
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
 */let a=st(e,["$$slots","$$events","$$legacy"]);const i=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"}]];nt(o,it({name:"zap"},()=>a,{get iconNode(){return i},children:(n,c)=>{var d=Ee(),v=ge(d);et(v,()=>e.children??Ze),x(n,d)},$$slots:{default:!0}})),Re()}function dc(o,e){l(e,!t(e));const a=document.documentElement;t(e)?(a.classList.add("dark"),localStorage.setItem("theme","dark")):(a.classList.remove("dark"),localStorage.setItem("theme","light"))}var cc=(o,e)=>e(o,"/"),vc=(o,e)=>e(o,"/projects"),gc=(o,e)=>e(o,"/tools"),uc=w('<nav class="mb-8 w-full backdrop-blur-xs py-4 fixed top-0 z-40"><div class="flex justify-between items-center px-6"><div class="flex space-x-6"><a href="/" class="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors font-medium">Home</a> <a href="/projects" class="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors font-medium">Projects</a> <a href="/tools" class="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors font-medium">Tools</a></div> <button class="hover:cursor-pointer p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"><!></button></div></nav>');function xc(o,e){Ie(e,!0);let a=p(!1);function i(_,$){_.preventDefault(),vt($)}Ur(()=>{const _=localStorage.getItem("theme"),$=window.matchMedia("(prefers-color-scheme: dark)").matches;l(a,_==="dark"||!_&&$,!0),t(a)?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")});var n=uc(),c=r(n),d=r(c),v=r(d);v.__click=[cc,i];var g=s(v,2);g.__click=[vc,i];var u=s(g,2);u.__click=[gc,i];var f=s(d,2);f.__click=[dc,a];var k=r(f);{var h=_=>{Q0(_,{class:"w-5 h-5"})},m=_=>{J0(_,{class:"w-5 h-5"})};H(k,_=>{t(a)?_(h):_(m,!1)})}Y(()=>De(f,"title",t(a)?"Switch to light mode":"Switch to dark mode")),x(o,n),Re()}yt(["click"]);var fc=w('<div class="pixel-background svelte-azucis"><canvas class="svelte-azucis"></canvas></div>');function bc(o,e){Ie(e,!0);let a,i=null,n=[],c,d=!1,v;const g=15,u=3,f=["#e2e8f0","#cbd5e1","#94a3b8","#64748b"];function k(){if(!a)return;n=[];const b=Math.ceil(a.width/g),T=Math.ceil(a.height/g);for(let C=0;C<b;C++)for(let B=0;B<T;B++){const z=C*g+(Math.random()-.5)*5,te=B*g+(Math.random()-.5)*5;n.push({x:z,y:te,size:0,targetSize:Math.random()*u,opacity:0,targetOpacity:Math.random()*.6+.2,color:f[Math.floor(Math.random()*f.length)],speed:Math.random()*.02+.01,phase:Math.random()*Math.PI*2})}}function h(b,T){const B=Math.sin(T*.003+b.phase)>0;b.targetSize=B?u:.1,b.size+=(b.targetSize-b.size)*(b.speed*3),b.targetOpacity=B?Math.random()*.4+.4:.05,b.opacity+=(b.targetOpacity-b.opacity)*(b.speed*4)}function m(b){if(!i||b.size<.1)return;i.globalAlpha=b.opacity,i.fillStyle=b.color;const T=b.size/2;i.fillRect(b.x-T,b.y-T,b.size,b.size)}function _(b){!d||!i||!a||(i.clearRect(0,0,a.width,a.height),n.forEach(T=>{h(T,b),m(T)}),c=requestAnimationFrame(_))}function $(){if(!a)return;const b=a.getBoundingClientRect();a.width=b.width,a.height=b.height,k()}function M(){d||(d=!0,c=requestAnimationFrame(_))}function E(){d=!1,c!==void 0&&(cancelAnimationFrame(c),c=void 0)}Ur(()=>{if(!a)return;const b=a.getContext("2d");if(!b)return;i=b,$();const T=setTimeout(M,100);return v=new ResizeObserver($),v.observe(a),()=>{clearTimeout(T),v&&(v.disconnect(),v=void 0),E()}}),tl(()=>{E(),v&&(v.disconnect(),v=void 0),i=null});var R=fc(),V=r(R);is(V,b=>a=b,()=>a),x(o,R),Re()}var pc=ur('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"></path></svg>');function mc(o,e){let a=wt(e,"class",3,"w-6 h-6");var i=pc();Y(()=>ut(i,0,Zt(a()))),x(o,i)}const hc="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20aria-hidden='true'%20role='img'%20class='iconify%20iconify--logos'%20width='26.6'%20height='32'%20preserveAspectRatio='xMidYMid%20meet'%20viewBox='0%200%20256%20308'%3e%3cpath%20fill='%23FF3E00'%20d='M239.682%2040.707C211.113-.182%20154.69-12.301%20113.895%2013.69L42.247%2059.356a82.198%2082.198%200%200%200-37.135%2055.056a86.566%2086.566%200%200%200%208.536%2055.576a82.425%2082.425%200%200%200-12.296%2030.719a87.596%2087.596%200%200%200%2014.964%2066.244c28.574%2040.893%2084.997%2053.007%20125.787%2027.016l71.648-45.664a82.182%2082.182%200%200%200%2037.135-55.057a86.601%2086.601%200%200%200-8.53-55.577a82.409%2082.409%200%200%200%2012.29-30.718a87.573%2087.573%200%200%200-14.963-66.244'%3e%3c/path%3e%3cpath%20fill='%23FFF'%20d='M106.889%20270.841c-23.102%206.007-47.497-3.036-61.103-22.648a52.685%2052.685%200%200%201-9.003-39.85a49.978%2049.978%200%200%201%201.713-6.693l1.35-4.115l3.671%202.697a92.447%2092.447%200%200%200%2028.036%2014.007l2.663.808l-.245%202.659a16.067%2016.067%200%200%200%202.89%2010.656a17.143%2017.143%200%200%200%2018.397%206.828a15.786%2015.786%200%200%200%204.403-1.935l71.67-45.672a14.922%2014.922%200%200%200%206.734-9.977a15.923%2015.923%200%200%200-2.713-12.011a17.156%2017.156%200%200%200-18.404-6.832a15.78%2015.78%200%200%200-4.396%201.933l-27.35%2017.434a52.298%2052.298%200%200%201-14.553%206.391c-23.101%206.007-47.497-3.036-61.101-22.649a52.681%2052.681%200%200%201-9.004-39.849a49.428%2049.428%200%200%201%2022.34-33.114l71.664-45.677a52.218%2052.218%200%200%201%2014.563-6.398c23.101-6.007%2047.497%203.036%2061.101%2022.648a52.685%2052.685%200%200%201%209.004%2039.85a50.559%2050.559%200%200%201-1.713%206.692l-1.35%204.116l-3.67-2.693a92.373%2092.373%200%200%200-28.037-14.013l-2.664-.809l.246-2.658a16.099%2016.099%200%200%200-2.89-10.656a17.143%2017.143%200%200%200-18.398-6.828a15.786%2015.786%200%200%200-4.402%201.935l-71.67%2045.674a14.898%2014.898%200%200%200-6.73%209.975a15.9%2015.9%200%200%200%202.709%2012.012a17.156%2017.156%200%200%200%2018.404%206.832a15.841%2015.841%200%200%200%204.402-1.935l27.345-17.427a52.147%2052.147%200%200%201%2014.552-6.397c23.101-6.006%2047.497%203.037%2061.102%2022.65a52.681%2052.681%200%200%201%209.003%2039.848a49.453%2049.453%200%200%201-22.34%2033.12l-71.664%2045.673a52.218%2052.218%200%200%201-14.563%206.398'%3e%3c/path%3e%3c/svg%3e",yc=(o,e)=>{l(e,t(e)+1)};var _c=w('<button class="btn-counter svelte-dfcawr"> </button>');function kc(o){let e=p(0);var a=_c();a.__click=[yc,e];var i=r(a);Y(()=>y(i,`count is ${t(e)??""}`)),x(o,a)}yt(["click"]);var wc=w('<div id="thanks-container" class="svelte-ywuqfn"><div class="thanks-content svelte-ywuqfn"><div class="flex gap-2 justify-center"><a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer" class="svelte-ywuqfn"><img src="/vite.svg" class="logo svelte-ywuqfn" alt="Vite Logo"/></a> <a href="https://svelte.dev" target="_blank" rel="noopener noreferrer" class="svelte-ywuqfn"><img class="logo svelte svelte-ywuqfn" alt="Svelte Logo"/></a></div> <h1 class="svelte-ywuqfn">Vite + Svelte</h1> <div class="card svelte-ywuqfn"><!></div> <p>Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank" rel="noopener noreferrer" class="svelte-ywuqfn">SvelteKit</a>, the official Svelte app framework powered by Vite!</p> <p class="read-the-docs svelte-ywuqfn">Click on the Vite and Svelte logos to learn more</p></div></div>');function Cc(o){var e=wc(),a=r(e),i=r(a),n=s(r(i),2),c=r(n),d=s(i,4),v=r(d);kc(v),Y(()=>De(c,"src",hc)),x(o,e)}const $c=o=>o;function Sc(o){const e=o-1;return e*e*e+1}function Tc(o,{delay:e=0,duration:a=400,easing:i=$c}={}){const n=+getComputedStyle(o).opacity;return{delay:e,duration:a,easing:i,css:c=>`opacity: ${c*n}`}}function Mc(o,{delay:e=0,duration:a=400,easing:i=Sc,start:n=0,opacity:c=0}={}){const d=getComputedStyle(o),v=+d.opacity,g=d.transform==="none"?"":d.transform,u=1-n,f=v*(1-c);return{delay:e,duration:a,easing:i,css:(k,h)=>`
			transform: ${g} scale(${1-u*h});
			opacity: ${v-f*h}
		`}}function Ec(o,e,a){e()&&(o.key==="Enter"||o.key===" ")&&a()}var Pc=w('<div class="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center" aria-labelledby="modal-title" role="dialog" aria-modal="true"><div class="fixed inset-0 bg-gray-500/75 dark:bg-gray-800/75 transition-opacity backdrop-blur-xs" role="button" tabindex="0"></div> <div class="flex items-center sm:items-center justify-center min-h-full w-full p-4 text-center sm:p-0"><div><!></div></div></div>');function Lc(o,e){Ie(e,!0);let a=wt(e,"isOpen",3,!1),i=wt(e,"isRaw",3,!1),n=wt(e,"maxW",3,"max-w-full"),c=wt(e,"forceClose",3,!0),d=wt(e,"onClose",3,()=>{});function v(){d()()}var g=Ee(),u=ge(g);{var f=k=>{var h=Pc(),m=r(h);m.__click=function(...E){(c()?v:null)?.apply(this,E)},m.__keydown=[Ec,c,v];var _=s(m,2),$=r(_),M=r($);et(M,()=>e.children??Ze),Y(()=>ut($,1,`relative bg-white dark:bg-gray-900 rounded-lg ${i()?"p-0":"p-4"} text-left overflow-hidden shadow-xl transform transition-all my-8 w-full ${n()??""}`)),Es(3,m,()=>Tc),Es(3,$,()=>Mc,()=>({duration:300})),x(k,h)};H(u,k=>{a()&&k(f)})}x(o,g),Re()}yt(["click","keydown"]);const Ac=Array(12).fill(0);var jc=w('<div class="sonner-loading-bar"></div>'),Nc=w('<div><div class="sonner-spinner"></div></div>');function Ic(o,e){Ie(e,!0);var a=Nc(),i=r(a);mt(i,23,()=>Ac,(n,c)=>`spinner-bar-${c}`,(n,c)=>{var d=jc();x(n,d)}),Y(n=>{ut(a,1,n),De(a,"data-visible",e.visible)},[()=>Zt(["sonner-loading-wrapper",e.class].filter(Boolean).join(" "))]),x(o,a),Re()}function Wr(...o){return o.filter(Boolean).join(" ")}const Rc=typeof document<"u",Bc=typeof window<"u"?window:void 0;function Dc(o){let e=o.activeElement;for(;e?.shadowRoot;){const a=e.shadowRoot.activeElement;if(a===e)break;e=a}return e}class Fc{#t;#e;constructor(e={}){const{window:a=Bc,document:i=a?.document}=e;a!==void 0&&(this.#t=i,this.#e=Ld(n=>{const c=Eo(a,"focusin",n),d=Eo(a,"focusout",n);return()=>{c(),d()}}))}get current(){return this.#e?.(),this.#t?Dc(this.#t):null}}new Fc;class Hc{#t;#e;constructor(e){this.#t=e,this.#e=Symbol(e)}get key(){return this.#e}exists(){return Cd(this.#e)}get(){const e=xs(this.#e);if(e===void 0)throw new Error(`Context "${this.#t}" not found`);return e}getOr(e){const a=xs(this.#e);return a===void 0?e:a}set(e){return wd(this.#e,e)}}const Oc=new Hc("<Toaster/>");let js=0;class zc{#t=p(Lt([]));get toasts(){return t(this.#t)}set toasts(e){l(this.#t,e,!0)}#e=p(Lt([]));get heights(){return t(this.#e)}set heights(e){l(this.#e,e,!0)}#r=e=>{const a=this.toasts.findIndex(i=>i.id===e);return a===-1?null:a};addToast=e=>{Rc&&this.toasts.unshift(e)};updateToast=({id:e,data:a,type:i,message:n})=>{const c=this.toasts.findIndex(v=>v.id===e),d=this.toasts[c];this.toasts[c]={...d,...a,id:e,title:n,type:i,updated:!0}};create=e=>{const{message:a,...i}=e,n=typeof e?.id=="number"||e.id&&e.id?.length>0?e.id:js++,c=e.dismissable===void 0?!0:e.dismissable,d=e.type===void 0?"default":e.type;return lr(()=>{this.toasts.find(g=>g.id===n)?this.updateToast({id:n,data:e,type:d,message:a,dismissable:c}):this.addToast({...i,id:n,title:a,dismissable:c,type:d})}),n};dismiss=e=>(lr(()=>{if(e===void 0){this.toasts=this.toasts.map(i=>({...i,dismiss:!0}));return}const a=this.toasts.findIndex(i=>i.id===e);this.toasts[a]&&(this.toasts[a]={...this.toasts[a],dismiss:!0})}),e);remove=e=>{if(e===void 0){this.toasts=[];return}const a=this.#r(e);if(a!==null)return this.toasts.splice(a,1),e};message=(e,a)=>this.create({...a,type:"default",message:e});error=(e,a)=>this.create({...a,type:"error",message:e});success=(e,a)=>this.create({...a,type:"success",message:e});info=(e,a)=>this.create({...a,type:"info",message:e});warning=(e,a)=>this.create({...a,type:"warning",message:e});loading=(e,a)=>this.create({...a,type:"loading",message:e});promise=(e,a)=>{if(!a)return;let i;a.loading!==void 0&&(i=this.create({...a,promise:e,type:"loading",message:typeof a.loading=="string"?a.loading:a.loading()}));const n=e instanceof Promise?e:e();let c=i!==void 0;return n.then(d=>{if(typeof d=="object"&&d&&"ok"in d&&typeof d.ok=="boolean"&&!d.ok){c=!1;const v=Uc(d);this.create({id:i,type:"error",message:v})}else if(a.success!==void 0){c=!1;const v=typeof a.success=="function"?a.success(d):a.success;this.create({id:i,type:"success",message:v})}}).catch(d=>{if(a.error!==void 0){c=!1;const v=typeof a.error=="function"?a.error(d):a.error;this.create({id:i,type:"error",message:v})}}).finally(()=>{c&&(this.dismiss(i),i=void 0),a.finally?.()}),i};custom=(e,a)=>{const i=a?.id||js++;return this.create({component:e,id:i,...a}),i};removeHeight=e=>{this.heights=this.heights.filter(a=>a.toastId!==e)};setHeight=e=>{const a=this.#r(e.toastId);if(a===null){this.heights.push(e);return}this.heights[a]=e};reset=()=>{this.toasts=[],this.heights=[]}}function Uc(o){return o&&typeof o=="object"&&"status"in o?`HTTP error! Status: ${o.status}`:`Error! ${o}`}const Rt=new zc;function qc(o,e){return Rt.create({message:o,...e})}class Gc{#t=xt(()=>Rt.toasts.filter(e=>!e.dismiss));get toasts(){return t(this.#t)}}const Wc=qc,Ht=Object.assign(Wc,{success:Rt.success,info:Rt.info,warning:Rt.warning,error:Rt.error,custom:Rt.custom,message:Rt.message,promise:Rt.promise,dismiss:Rt.dismiss,loading:Rt.loading,getActiveToasts:()=>Rt.toasts.filter(o=>!o.dismiss)});function Do(o){return o.label!==void 0}function Jc(){let o=p(Lt(typeof document<"u"?document.hidden:!1));return Ct(()=>Eo(document,"visibilitychange",()=>{l(o,document.hidden,!0)})),{get current(){return t(o)}}}const Ns=4e3,Vc=14,Yc=45,Kc=200,Qc=.05,Zc={toast:"",title:"",description:"",loader:"",closeButton:"",cancelButton:"",actionButton:"",action:"",warning:"",error:"",success:"",default:"",info:"",loading:""};function Xc(o){const[e,a]=o.split("-"),i=[];return e&&i.push(e),a&&i.push(a),i}function Is(o){return 1/(1.5+Math.abs(o)/20)}var ev=w("<div><!></div>"),tv=(o,e,a,i,n)=>{t(e)||!t(a)||(i(),n.toast.onDismiss?.(n.toast))},rv=w('<button data-close-button=""><!></button>'),av=w('<div data-icon=""><!> <!></div>'),ov=w('<div data-description=""><!></div>'),iv=(o,e,a,i)=>{Do(e.toast.cancel)&&t(a)&&(e.toast.cancel?.onClick?.(o),i())},sv=w('<button data-button="" data-cancel=""> </button>'),nv=(o,e,a)=>{Do(e.toast.action)&&(e.toast.action?.onClick(o),!o.defaultPrevented&&a())},lv=w('<button data-button=""> </button>'),dv=w('<!> <div data-content=""><div data-title=""><!></div> <!></div> <!> <!>',1),cv=w('<li data-sonner-toast=""><!> <!></li>');function vv(o,e){Ie(e,!0);const a=q=>{var Q=Ee(),G=ge(Q);{var P=N=>{var ae=ev(),ee=r(ae);et(ee,()=>e.loadingIcon),Y(K=>{ut(ae,1,K),De(ae,"data-visible",t(C)==="loading")},[()=>Zt(Wr(t(We)?.loader,e.toast?.classes?.loader,"sonner-loader"))]),x(N,ae)},L=N=>{{let ae=xt(()=>Wr(t(We)?.loader,e.toast.classes?.loader)),ee=xt(()=>t(C)==="loading");Ic(N,{get class(){return t(ae)},get visible(){return t(ee)}})}};H(G,N=>{e.loadingIcon?N(P):N(L,!1)})}x(q,Q)};let i=wt(e,"cancelButtonStyle",3,""),n=wt(e,"actionButtonStyle",3,""),c=wt(e,"descriptionClass",3,""),d=wt(e,"unstyled",3,!1),v=wt(e,"defaultRichColors",3,!1);const g={...Zc};let u=p(!1),f=p(!1),k=p(!1),h=p(!1),m=p(!1),_=p(0),$=p(0),M=e.toast.duration||e.duration||Ns,E=p(void 0),R=p(null),V=p(null);const b=xt(()=>e.index===0),T=xt(()=>e.index+1<=e.visibleToasts),C=xt(()=>e.toast.type),B=xt(()=>e.toast.dismissable!==!1),z=xt(()=>e.toast.class||""),te=xt(()=>e.toast.descriptionClass||""),ue=xt(()=>Rt.heights.findIndex(q=>q.toastId===e.toast.id)||0),de=xt(()=>e.toast.closeButton??e.closeButton),xe=xt(()=>e.toast.duration??e.duration??Ns);let ce=null;const fe=xt(()=>e.position.split("-")),Be=xt(()=>Rt.heights.reduce((q,Q,G)=>G>=t(ue)?q:q+Q.height,0)),Ve=Jc(),Ye=xt(()=>e.toast.invert||e.invert),Qe=xt(()=>t(C)==="loading"),We=xt(()=>({...g,...e.classes})),ze=xt(()=>e.toast.title),je=xt(()=>e.toast.description);let Le=p(0),Ce=p(0);const re=xt(()=>Math.round(t(ue)*Vc+t(Be)));Ct(()=>{t(ze),t(je);let q;e.expanded||e.expandByDefault?q=1:q=1-e.index*Qc;const Q=lr(()=>t(E));if(Q===void 0)return;Q.style.setProperty("height","auto");const G=Q.offsetHeight,P=Q.getBoundingClientRect().height,L=Math.round(P/q+Number.EPSILON&100)/100;Q.style.removeProperty("height");let N;Math.abs(L-G)<1?N=L:N=G,l($,N,!0),lr(()=>{Rt.setHeight({toastId:e.toast.id,height:N})})});function Te(){l(f,!0),l(_,t(re),!0),Rt.removeHeight(e.toast.id),setTimeout(()=>{Rt.remove(e.toast.id)},Kc)}let me;const oe=xt(()=>e.toast.promise&&t(C)==="loading"||e.toast.duration===Number.POSITIVE_INFINITY);function j(){l(Le,new Date().getTime(),!0),me=setTimeout(()=>{e.toast.onAutoClose?.(e.toast),Te()},M)}function be(){if(t(Ce)<t(Le)){const q=new Date().getTime()-t(Le);M=M-q}l(Ce,new Date().getTime(),!0)}Ct(()=>{e.toast.updated&&(clearTimeout(me),M=t(xe),j())}),Ct(()=>(t(oe)||(e.expanded||e.interacting||Ve.current?be():j()),()=>clearTimeout(me))),Ur(()=>{l(u,!0);const q=t(E)?.getBoundingClientRect().height;return l($,q,!0),Rt.setHeight({toastId:e.toast.id,height:q}),()=>{Rt.removeHeight(e.toast.id)}}),Ct(()=>{e.toast.delete&&lr(()=>{Te(),e.toast.onDismiss?.(e.toast)})});const ve=q=>{if(t(Qe))return;l(_,t(re),!0);const Q=q.target;Q.setPointerCapture(q.pointerId),Q.tagName!=="BUTTON"&&(l(k,!0),ce={x:q.clientX,y:q.clientY})},U=()=>{if(t(h)||!t(B))return;ce=null;const q=Number(t(E)?.style.getPropertyValue("--swipe-amount-x").replace("px","")||0),Q=Number(t(E)?.style.getPropertyValue("--swipe-amount-y").replace("px","")||0),G=new Date().getTime()-0,P=t(R)==="x"?q:Q,L=Math.abs(P)/G;if(Math.abs(P)>=Yc||L>.11){l(_,t(re),!0),e.toast.onDismiss?.(e.toast),t(R)==="x"?l(V,q>0?"right":"left",!0):l(V,Q>0?"down":"up",!0),Te(),l(h,!0);return}else t(E)?.style.setProperty("--swipe-amount-x","0px"),t(E)?.style.setProperty("--swipe-amount-y","0px");l(m,!1),l(k,!1),l(R,null)},X=q=>{if(!ce||!t(B)||(window.getSelection()?.toString().length??-1)>0)return;const G=q.clientY-ce.y,P=q.clientX-ce.x,L=e.swipeDirections??Xc(e.position);!t(R)&&(Math.abs(P)>1||Math.abs(G)>1)&&l(R,Math.abs(P)>Math.abs(G)?"x":"y",!0);let N={x:0,y:0};if(t(R)==="y"){if(L.includes("top")||L.includes("bottom"))if(L.includes("top")&&G<0||L.includes("bottom")&&G>0)N.y=G;else{const ae=G*Is(G);N.y=Math.abs(ae)<Math.abs(G)?ae:G}}else if(t(R)==="x"&&(L.includes("left")||L.includes("right")))if(L.includes("left")&&P<0||L.includes("right")&&P>0)N.x=P;else{const ae=P*Is(P);N.x=Math.abs(ae)<Math.abs(P)?ae:P}(Math.abs(N.x)>0||Math.abs(N.y)>0)&&l(m,!0),t(E)?.style.setProperty("--swipe-amount-x",`${N.x}px`),t(E)?.style.setProperty("--swipe-amount-y",`${N.y}px`)},he=()=>{l(k,!1),l(R,null),ce=null},pe=xt(()=>e.toast.icon?e.toast.icon:t(C)==="success"?e.successIcon:t(C)==="error"?e.errorIcon:t(C)==="warning"?e.warningIcon:t(C)==="info"?e.infoIcon:t(C)==="loading"?e.loadingIcon:null);var ke=cv();De(ke,"tabindex",0);let Ue;ke.__pointermove=X,ke.__pointerup=U,ke.__pointerdown=ve;var Oe=r(ke);{var Ne=q=>{var Q=rv();Q.__click=[tv,Qe,B,Te,e];var G=r(Q);et(G,()=>e.closeIcon??Ze),Y(P=>{De(Q,"aria-label",e.closeButtonAriaLabel),De(Q,"data-disabled",t(Qe)),ut(Q,1,P)},[()=>Zt(Wr(t(We)?.closeButton,e.toast?.classes?.closeButton))]),x(q,Q)};H(Oe,q=>{t(de)&&!e.toast.component&&t(C)!=="loading"&&e.closeIcon!==null&&q(Ne)})}var Pe=s(Oe,2);{var se=q=>{const Q=xt(()=>e.toast.component);var G=Ee(),P=ge(G);nr(P,()=>t(Q),(L,N)=>{N(L,it(()=>e.toast.componentProps,{closeToast:Te}))}),x(q,G)},_e=q=>{var Q=dv(),G=ge(Q);{var P=Z=>{var A=av(),ne=r(A);{var Me=W=>{var le=Ee(),we=ge(le);{var Fe=ie=>{var ye=Ee(),Ae=ge(ye);nr(Ae,()=>e.toast.icon,(Je,Xe)=>{Xe(Je,{})}),x(ie,ye)},J=ie=>{a(ie)};H(we,ie=>{e.toast.icon?ie(Fe):ie(J,!1)})}x(W,le)};H(ne,W=>{(e.toast.promise||t(C)==="loading")&&W(Me)})}var Ge=s(ne,2);{var $e=W=>{var le=Ee(),we=ge(le);{var Fe=ie=>{var ye=Ee(),Ae=ge(ye);nr(Ae,()=>e.toast.icon,(Je,Xe)=>{Xe(Je,{})}),x(ie,ye)},J=ie=>{var ye=Ee(),Ae=ge(ye);{var Je=Ke=>{var tt=Ee(),dt=ge(tt);et(dt,()=>e.successIcon??Ze),x(Ke,tt)},Xe=Ke=>{var tt=Ee(),dt=ge(tt);{var qe=ct=>{var at=Ee(),ft=ge(at);et(ft,()=>e.errorIcon??Ze),x(ct,at)},lt=ct=>{var at=Ee(),ft=ge(at);{var bt=gt=>{var $t=Ee(),Mt=ge($t);et(Mt,()=>e.warningIcon??Ze),x(gt,$t)},rt=gt=>{var $t=Ee(),Mt=ge($t);{var He=ot=>{var pt=Ee(),_t=ge(pt);et(_t,()=>e.infoIcon??Ze),x(ot,pt)};H(Mt,ot=>{t(C)==="info"&&ot(He)},!0)}x(gt,$t)};H(ft,gt=>{t(C)==="warning"?gt(bt):gt(rt,!1)},!0)}x(ct,at)};H(dt,ct=>{t(C)==="error"?ct(qe):ct(lt,!1)},!0)}x(Ke,tt)};H(Ae,Ke=>{t(C)==="success"?Ke(Je):Ke(Xe,!1)},!0)}x(ie,ye)};H(we,ie=>{e.toast.icon?ie(Fe):ie(J,!1)})}x(W,le)};H(Ge,W=>{e.toast.type!=="loading"&&W($e)})}Y(W=>ut(A,1,W),[()=>Zt(Wr(t(We)?.icon,e.toast?.classes?.icon))]),x(Z,A)};H(G,Z=>{(t(C)||e.toast.icon||e.toast.promise)&&e.toast.icon!==null&&(t(pe)!==null||e.toast.icon)&&Z(P)})}var L=s(G,2),N=r(L),ae=r(N);{var ee=Z=>{var A=Ee(),ne=ge(A);{var Me=$e=>{const W=xt(()=>e.toast.title);var le=Ee(),we=ge(le);nr(we,()=>t(W),(Fe,J)=>{J(Fe,it(()=>e.toast.componentProps))}),x($e,le)},Ge=$e=>{var W=Po();Y(()=>y(W,e.toast.title)),x($e,W)};H(ne,$e=>{typeof e.toast.title!="string"?$e(Me):$e(Ge,!1)})}x(Z,A)};H(ae,Z=>{e.toast.title&&Z(ee)})}var K=s(N,2);{var O=Z=>{var A=ov(),ne=r(A);{var Me=$e=>{const W=xt(()=>e.toast.description);var le=Ee(),we=ge(le);nr(we,()=>t(W),(Fe,J)=>{J(Fe,it(()=>e.toast.componentProps))}),x($e,le)},Ge=$e=>{var W=Po();Y(()=>y(W,e.toast.description)),x($e,W)};H(ne,$e=>{typeof e.toast.description!="string"?$e(Me):$e(Ge,!1)})}Y($e=>ut(A,1,$e),[()=>Zt(Wr(c(),t(te),t(We)?.description,e.toast.classes?.description))]),x(Z,A)};H(K,Z=>{e.toast.description&&Z(O)})}var I=s(L,2);{var S=Z=>{var A=Ee(),ne=ge(A);{var Me=$e=>{var W=Ee(),le=ge(W);nr(le,()=>e.toast.cancel,(we,Fe)=>{Fe(we,{})}),x($e,W)},Ge=$e=>{var W=Ee(),le=ge(W);{var we=Fe=>{var J=sv();J.__click=[iv,e,B,Te];var ie=r(J);Y(ye=>{Yt(J,e.toast.cancelButtonStyle??i()),ut(J,1,ye),y(ie,e.toast.cancel.label)},[()=>Zt(Wr(t(We)?.cancelButton,e.toast?.classes?.cancelButton))]),x(Fe,J)};H(le,Fe=>{Do(e.toast.cancel)&&Fe(we)},!0)}x($e,W)};H(ne,$e=>{typeof e.toast.cancel=="function"?$e(Me):$e(Ge,!1)})}x(Z,A)};H(I,Z=>{e.toast.cancel&&Z(S)})}var D=s(I,2);{var F=Z=>{var A=Ee(),ne=ge(A);{var Me=$e=>{var W=Ee(),le=ge(W);nr(le,()=>e.toast.action,(we,Fe)=>{Fe(we,{})}),x($e,W)},Ge=$e=>{var W=Ee(),le=ge(W);{var we=Fe=>{var J=lv();J.__click=[nv,e,Te];var ie=r(J);Y(ye=>{Yt(J,e.toast.actionButtonStyle??n()),ut(J,1,ye),y(ie,e.toast.action.label)},[()=>Zt(Wr(t(We)?.actionButton,e.toast?.classes?.actionButton))]),x(Fe,J)};H(le,Fe=>{Do(e.toast.action)&&Fe(we)},!0)}x($e,W)};H(ne,$e=>{typeof e.toast.action=="function"?$e(Me):$e(Ge,!1)})}x(Z,A)};H(D,Z=>{e.toast.action&&Z(F)})}Y(Z=>ut(N,1,Z),[()=>Zt(Wr(t(We)?.title,e.toast?.classes?.title))]),x(q,Q)};H(Pe,q=>{e.toast.component?q(se):q(_e,!1)})}is(ke,q=>l(E,q),()=>t(E)),Y((q,Q,G,P)=>{ut(ke,1,q),De(ke,"data-rich-colors",e.toast.richColors??v()),De(ke,"data-styled",!(e.toast.component||e.toast.unstyled||d())),De(ke,"data-mounted",t(u)),De(ke,"data-promise",Q),De(ke,"data-swiped",t(m)),De(ke,"data-removed",t(f)),De(ke,"data-visible",t(T)),De(ke,"data-y-position",t(fe)[0]),De(ke,"data-x-position",t(fe)[1]),De(ke,"data-index",e.index),De(ke,"data-front",t(b)),De(ke,"data-swiping",t(k)),De(ke,"data-dismissable",t(B)),De(ke,"data-type",t(C)),De(ke,"data-invert",t(Ye)),De(ke,"data-swipe-out",t(h)),De(ke,"data-swipe-direction",t(V)),De(ke,"data-expanded",G),Ue=Yt(ke,`${e.style} ${e.toast.style}`,Ue,P)},[()=>Zt(Wr(e.class,t(z),t(We)?.toast,e.toast?.classes?.toast,t(We)?.[t(C)],e.toast?.classes?.[t(C)])),()=>!!e.toast.promise,()=>!!(e.expanded||e.expandByDefault&&t(u)),()=>({"--index":e.index,"--toasts-before":e.index,"--z-index":Rt.toasts.length-e.index,"--offset":`${t(f)?t(_):t(re)}px`,"--initial-height":e.expandByDefault?"auto":`${t($)}px`})]),el("dragend",ke,he),x(o,ke),Re()}yt(["pointermove","pointerup","pointerdown","click"]);var gv=ur('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20" data-sonner-success-icon=""><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"></path></svg>');function uv(o){var e=gv();x(o,e)}var xv=ur('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20" data-sonner-error-icon=""><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>');function fv(o){var e=xv();x(o,e)}var bv=ur('<svg viewBox="0 0 64 64" fill="currentColor" height="20" width="20" data-sonner-warning-icon="" xmlns="http://www.w3.org/2000/svg"><path d="M32.427,7.987c2.183,0.124 4,1.165 5.096,3.281l17.936,36.208c1.739,3.66 -0.954,8.585 -5.373,8.656l-36.119,0c-4.022,-0.064 -7.322,-4.631 -5.352,-8.696l18.271,-36.207c0.342,-0.65 0.498,-0.838 0.793,-1.179c1.186,-1.375 2.483,-2.111 4.748,-2.063Zm-0.295,3.997c-0.687,0.034 -1.316,0.419 -1.659,1.017c-6.312,11.979 -12.397,24.081 -18.301,36.267c-0.546,1.225 0.391,2.797 1.762,2.863c12.06,0.195 24.125,0.195 36.185,0c1.325,-0.064 2.321,-1.584 1.769,-2.85c-5.793,-12.184 -11.765,-24.286 -17.966,-36.267c-0.366,-0.651 -0.903,-1.042 -1.79,-1.03Z"></path><path d="M33.631,40.581l-3.348,0l-0.368,-16.449l4.1,0l-0.384,16.449Zm-3.828,5.03c0,-0.609 0.197,-1.113 0.592,-1.514c0.396,-0.4 0.935,-0.601 1.618,-0.601c0.684,0 1.223,0.201 1.618,0.601c0.395,0.401 0.593,0.905 0.593,1.514c0,0.587 -0.193,1.078 -0.577,1.473c-0.385,0.395 -0.929,0.593 -1.634,0.593c-0.705,0 -1.249,-0.198 -1.634,-0.593c-0.384,-0.395 -0.576,-0.886 -0.576,-1.473Z"></path></svg>');function pv(o){var e=bv();x(o,e)}var mv=ur('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20" data-sonner-info-icon=""><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd"></path></svg>');function hv(o){var e=mv();x(o,e)}var yv=ur('<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-sonner-close-icon=""><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>');function _v(o){var e=yv();x(o,e)}const kv=3,$l="24px",Sl="16px",wv=4e3,Cv=356,$v=14,di="dark",yo="light";function Sv(o,e){const a={};return[o,e].forEach((i,n)=>{const c=n===1,d=c?"--mobile-offset":"--offset",v=c?Sl:$l;function g(u){["top","right","bottom","left"].forEach(f=>{a[`${d}-${f}`]=typeof u=="number"?`${u}px`:u})}typeof i=="number"||typeof i=="string"?g(i):typeof i=="object"?["top","right","bottom","left"].forEach(u=>{const f=i[u];f===void 0?a[`${d}-${u}`]=v:a[`${d}-${u}`]=typeof f=="number"?`${f}px`:f}):g(v)}),a}var Tv=w("<ol></ol>"),Mv=w('<section aria-live="polite" aria-relevant="additions text" aria-atomic="false" class="svelte-nbs0zk"><!></section>');function Ev(o,e){Ie(e,!0);function a(re){return re!=="system"?re:typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?di:yo}let i=wt(e,"invert",3,!1),n=wt(e,"position",3,"bottom-right"),c=wt(e,"hotkey",19,()=>["altKey","KeyT"]),d=wt(e,"expand",3,!1),v=wt(e,"closeButton",3,!1),g=wt(e,"offset",3,$l),u=wt(e,"mobileOffset",3,Sl),f=wt(e,"theme",3,"light"),k=wt(e,"richColors",3,!1),h=wt(e,"duration",3,wv),m=wt(e,"visibleToasts",3,kv),_=wt(e,"toastOptions",19,()=>({})),$=wt(e,"dir",7,"auto"),M=wt(e,"gap",3,$v),E=wt(e,"containerAriaLabel",3,"Notifications"),R=wt(e,"closeButtonAriaLabel",3,"Close toast"),V=st(e,["$$slots","$$events","$$legacy","invert","position","hotkey","expand","closeButton","offset","mobileOffset","theme","richColors","duration","visibleToasts","toastOptions","dir","gap","loadingIcon","successIcon","errorIcon","warningIcon","closeIcon","infoIcon","containerAriaLabel","class","closeButtonAriaLabel","onblur","onfocus","onmouseenter","onmousemove","onmouseleave","ondragend","onpointerdown","onpointerup"]);function b(){if($()!=="auto")return $();if(typeof window>"u"||typeof document>"u")return"ltr";const re=document.documentElement.getAttribute("dir");return re==="auto"||!re?(lr(()=>$(window.getComputedStyle(document.documentElement).direction??"ltr")),$()):(lr(()=>$(re)),re)}const T=xt(()=>Array.from(new Set([n(),...Rt.toasts.filter(re=>re.position).map(re=>re.position)].filter(Boolean))));let C=p(!1),B=p(!1),z=p(Lt(a(f()))),te=p(void 0),ue=p(null),de=p(!1);const xe=xt(()=>c().join("+").replace(/Key/g,"").replace(/Digit/g,""));Ct(()=>{Rt.toasts.length<=1&&l(C,!1)}),Ct(()=>{const re=Rt.toasts.filter(Te=>Te.dismiss&&!Te.delete);if(re.length>0){const Te=Rt.toasts.map(me=>re.find(j=>j.id===me.id)?{...me,delete:!0}:me);Rt.toasts=Te}}),Ct(()=>()=>{t(te)&&t(ue)&&(t(ue).focus({preventScroll:!0}),l(ue,null),l(de,!1))}),Ur(()=>(Rt.reset(),Eo(document,"keydown",Te=>{c().every(oe=>Te[oe]||Te.code===oe)&&(l(C,!0),t(te)?.focus()),Te.code==="Escape"&&(document.activeElement===t(te)||t(te)?.contains(document.activeElement))&&l(C,!1)}))),Ct(()=>{if(f()!=="system"&&l(z,f()),typeof window<"u"){f()==="system"&&(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?l(z,di):l(z,yo));const re=window.matchMedia("(prefers-color-scheme: dark)"),Te=({matches:me})=>{l(z,me?di:yo,!0)};"addEventListener"in re?re.addEventListener("change",Te):re.addListener(Te)}});const ce=re=>{e.onblur?.(re),t(de)&&!re.currentTarget.contains(re.relatedTarget)&&(l(de,!1),t(ue)&&(t(ue).focus({preventScroll:!0}),l(ue,null)))},fe=re=>{e.onfocus?.(re),!(re.target instanceof HTMLElement&&re.target.dataset.dismissable==="false")&&(t(de)||(l(de,!0),l(ue,re.relatedTarget,!0)))},Be=re=>{e.onpointerdown?.(re),!(re.target instanceof HTMLElement&&re.target.dataset.dismissable==="false")&&l(B,!0)},Ve=re=>{e.onmouseenter?.(re),l(C,!0)},Ye=re=>{e.onmouseleave?.(re),t(B)||l(C,!1)},Qe=re=>{e.onmousemove?.(re),l(C,!0)},We=re=>{e.ondragend?.(re),l(C,!1)},ze=re=>{e.onpointerup?.(re),l(B,!1)};Oc.set(new Gc);var je=Mv();De(je,"tabindex",-1);var Le=r(je);{var Ce=re=>{var Te=Ee(),me=ge(Te);mt(me,18,()=>t(T),oe=>oe,(oe,j,be,ve)=>{const U=xt(()=>{const[pe,ke]=j.split("-");return{y:pe,x:ke}}),X=xt(()=>Sv(g(),u()));var he=Tv();Bi(he,(pe,ke)=>({tabindex:-1,dir:pe,class:e.class,"data-sonner-toaster":!0,"data-sonner-theme":t(z),"data-y-position":t(U).y,"data-x-position":t(U).x,style:e.style,onblur:ce,onfocus:fe,onmouseenter:Ve,onmousemove:Qe,onmouseleave:Ye,ondragend:We,onpointerdown:Be,onpointerup:ze,...V,[qa]:ke}),[b,()=>({"--front-toast-height":`${Rt.heights[0]?.height}px`,"--width":`${Cv}px`,"--gap":`${M()}px`,"--offset-top":t(X)["--offset-top"],"--offset-right":t(X)["--offset-right"],"--offset-bottom":t(X)["--offset-bottom"],"--offset-left":t(X)["--offset-left"],"--mobile-offset-top":t(X)["--mobile-offset-top"],"--mobile-offset-right":t(X)["--mobile-offset-right"],"--mobile-offset-bottom":t(X)["--mobile-offset-bottom"],"--mobile-offset-left":t(X)["--mobile-offset-left"]})],void 0,"svelte-nbs0zk"),mt(he,23,()=>Rt.toasts.filter(pe=>!pe.position&&t(be)===0||pe.position===j),pe=>pe.id,(pe,ke,Ue,Oe)=>{{const Ne=I=>{var S=Ee(),D=ge(S);{var F=A=>{var ne=Ee(),Me=ge(ne);et(Me,()=>e.successIcon??Ze),x(A,ne)},Z=A=>{var ne=Ee(),Me=ge(ne);{var Ge=$e=>{uv($e)};H(Me,$e=>{e.successIcon!==null&&$e(Ge)},!0)}x(A,ne)};H(D,A=>{e.successIcon?A(F):A(Z,!1)})}x(I,S)},Pe=I=>{var S=Ee(),D=ge(S);{var F=A=>{var ne=Ee(),Me=ge(ne);et(Me,()=>e.errorIcon??Ze),x(A,ne)},Z=A=>{var ne=Ee(),Me=ge(ne);{var Ge=$e=>{fv($e)};H(Me,$e=>{e.errorIcon!==null&&$e(Ge)},!0)}x(A,ne)};H(D,A=>{e.errorIcon?A(F):A(Z,!1)})}x(I,S)},se=I=>{var S=Ee(),D=ge(S);{var F=A=>{var ne=Ee(),Me=ge(ne);et(Me,()=>e.warningIcon??Ze),x(A,ne)},Z=A=>{var ne=Ee(),Me=ge(ne);{var Ge=$e=>{pv($e)};H(Me,$e=>{e.warningIcon!==null&&$e(Ge)},!0)}x(A,ne)};H(D,A=>{e.warningIcon?A(F):A(Z,!1)})}x(I,S)},_e=I=>{var S=Ee(),D=ge(S);{var F=A=>{var ne=Ee(),Me=ge(ne);et(Me,()=>e.infoIcon??Ze),x(A,ne)},Z=A=>{var ne=Ee(),Me=ge(ne);{var Ge=$e=>{hv($e)};H(Me,$e=>{e.infoIcon!==null&&$e(Ge)},!0)}x(A,ne)};H(D,A=>{e.infoIcon?A(F):A(Z,!1)})}x(I,S)},q=I=>{var S=Ee(),D=ge(S);{var F=A=>{var ne=Ee(),Me=ge(ne);et(Me,()=>e.closeIcon??Ze),x(A,ne)},Z=A=>{var ne=Ee(),Me=ge(ne);{var Ge=$e=>{_v($e)};H(Me,$e=>{e.closeIcon!==null&&$e(Ge)},!0)}x(A,ne)};H(D,A=>{e.closeIcon?A(F):A(Z,!1)})}x(I,S)};let Q=xt(()=>_()?.duration??h()),G=xt(()=>_()?.class??""),P=xt(()=>_()?.descriptionClass||""),L=xt(()=>_()?.style??""),N=xt(()=>_().classes||{}),ae=xt(()=>_().unstyled??!1),ee=xt(()=>_()?.cancelButtonStyle??""),K=xt(()=>_()?.actionButtonStyle??""),O=xt(()=>_()?.closeButtonAriaLabel??R());vv(pe,{get index(){return t(Ue)},get toast(){return t(ke)},get defaultRichColors(){return k()},get duration(){return t(Q)},get class(){return t(G)},get descriptionClass(){return t(P)},get invert(){return i()},get visibleToasts(){return m()},get closeButton(){return v()},get interacting(){return t(B)},get position(){return j},get style(){return t(L)},get classes(){return t(N)},get unstyled(){return t(ae)},get cancelButtonStyle(){return t(ee)},get actionButtonStyle(){return t(K)},get closeButtonAriaLabel(){return t(O)},get expandByDefault(){return d()},get expanded(){return t(C)},get loadingIcon(){return e.loadingIcon},successIcon:Ne,errorIcon:Pe,warningIcon:se,infoIcon:_e,closeIcon:q,$$slots:{successIcon:!0,errorIcon:!0,warningIcon:!0,infoIcon:!0,closeIcon:!0}})}}),is(he,pe=>l(te,pe),()=>t(te)),Y(()=>he.dir=he.dir),x(oe,he)}),x(re,Te)};H(Le,re=>{Rt.toasts.length>0&&re(Ce)})}Y(()=>De(je,"aria-label",`${E()??""} ${t(xe)??""}`)),x(o,je),Re()}const Pv="/assets/1-CWzsbmm-.jpg",Lv="/assets/2-DC9PoH_V.jpg";var Av=ur('<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 559 168"><path fill="currentColor" d="m83.996 0.277c-46.249 0-83.743 37.493-83.743 83.742 0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l0.001-0.004zm38.404 120.78c-1.5 2.46-4.72 3.24-7.18 1.73-19.662-12.01-44.414-14.73-73.564-8.07-2.809 0.64-5.609-1.12-6.249-3.93-0.643-2.81 1.11-5.61 3.926-6.25 31.9-7.288 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.802c-1.89 3.072-5.91 4.042-8.98 2.152-22.51-13.836-56.823-17.843-83.448-9.761-3.453 1.043-7.1-0.903-8.148-4.35-1.04-3.453 0.907-7.093 4.354-8.143 30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-0.001zm0.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219-1.254-4.14 1.08-8.513 5.221-9.771 29.581-8.98 78.756-7.245 109.83 11.202 3.73 2.209 4.95 7.016 2.74 10.733-2.2 3.722-7.02 4.949-10.73 2.739zm94.56 3.072c-14.46-3.448-17.03-5.868-17.03-10.953 0-4.804 4.52-8.037 11.25-8.037 6.52 0 12.98 2.455 19.76 7.509 0.2 0.153 0.46 0.214 0.71 0.174 0.26-0.038 0.48-0.177 0.63-0.386l7.06-9.952c0.29-0.41 0.21-0.975-0.18-1.288-8.07-6.473-17.15-9.62-27.77-9.62-15.61 0-26.52 9.369-26.52 22.774 0 14.375 9.41 19.465 25.67 23.394 13.83 3.187 16.17 5.857 16.17 10.629 0 5.29-4.72 8.58-12.32 8.58-8.44 0-15.33-2.85-23.03-9.51-0.19-0.17-0.45-0.24-0.69-0.23-0.26 0.02-0.49 0.14-0.65 0.33l-7.92 9.42c-0.33 0.4-0.29 0.98 0.09 1.32 8.96 8 19.98 12.22 31.88 12.22 16.82 0 27.69-9.19 27.69-23.42 0.03-12.007-7.16-18.657-24.77-22.941l-0.03-0.013zm62.86-14.26c-7.29 0-13.27 2.872-18.21 8.757v-6.624c0-0.523-0.42-0.949-0.94-0.949h-12.95c-0.52 0-0.94 0.426-0.94 0.949v73.601c0 0.52 0.42 0.95 0.94 0.95h12.95c0.52 0 0.94-0.43 0.94-0.95v-23.23c4.94 5.53 10.92 8.24 18.21 8.24 13.55 0 27.27-10.43 27.27-30.369 0.02-19.943-13.7-30.376-27.26-30.376l-0.01 0.001zm12.21 30.375c0 10.149-6.25 17.239-15.21 17.239-8.85 0-15.53-7.41-15.53-17.239 0-9.83 6.68-17.238 15.53-17.238 8.81-0.001 15.21 7.247 15.21 17.237v0.001zm50.21-30.375c-17.45 0-31.12 13.436-31.12 30.592 0 16.972 13.58 30.262 30.91 30.262 17.51 0 31.22-13.39 31.22-30.479 0-17.031-13.62-30.373-31.01-30.373v-0.002zm0 47.714c-9.28 0-16.28-7.46-16.28-17.344 0-9.929 6.76-17.134 16.07-17.134 9.34 0 16.38 7.457 16.38 17.351 0 9.927-6.8 17.127-16.17 17.127zm68.27-46.53h-14.25v-14.566c0-0.522-0.42-0.948-0.94-0.948h-12.95c-0.52 0-0.95 0.426-0.95 0.948v14.566h-6.22c-0.52 0-0.94 0.426-0.94 0.949v11.127c0 0.522 0.42 0.949 0.94 0.949h6.22v28.795c0 11.63 5.79 17.53 17.22 17.53 4.64 0 8.49-0.96 12.12-3.02 0.3-0.16 0.48-0.48 0.48-0.82v-10.6c0-0.32-0.17-0.63-0.45-0.8-0.28-0.18-0.63-0.19-0.92-0.04-2.49 1.25-4.9 1.83-7.6 1.83-4.15 0-6.01-1.89-6.01-6.11v-26.76h14.25c0.52 0 0.94-0.426 0.94-0.949v-11.126c0.02-0.523-0.4-0.949-0.93-0.949l-0.01-0.006zm49.64 0.057v-1.789c0-5.263 2.02-7.61 6.54-7.61 2.7 0 4.87 0.536 7.3 1.346 0.3 0.094 0.61 0.047 0.85-0.132 0.25-0.179 0.39-0.466 0.39-0.77v-10.91c0-0.417-0.26-0.786-0.67-0.909-2.56-0.763-5.84-1.546-10.76-1.546-11.95 0-18.28 6.734-18.28 19.467v2.74h-6.22c-0.52 0-0.95 0.426-0.95 0.948v11.184c0 0.522 0.43 0.949 0.95 0.949h6.22v44.405c0 0.53 0.43 0.95 0.95 0.95h12.94c0.53 0 0.95-0.42 0.95-0.95v-44.402h12.09l18.52 44.402c-2.1 4.66-4.17 5.59-6.99 5.59-2.28 0-4.69-0.68-7.14-2.03-0.23-0.12-0.51-0.14-0.75-0.07-0.25 0.09-0.46 0.27-0.56 0.51l-4.39 9.63c-0.21 0.46-0.03 0.99 0.41 1.23 4.58 2.48 8.71 3.54 13.82 3.54 9.56 0 14.85-4.46 19.5-16.44l22.46-58.037c0.12-0.292 0.08-0.622-0.1-0.881-0.17-0.257-0.46-0.412-0.77-0.412h-13.48c-0.41 0-0.77 0.257-0.9 0.636l-13.81 39.434-15.12-39.46c-0.14-0.367-0.49-0.61-0.88-0.61h-22.12v-0.003zm-28.78-0.057h-12.95c-0.52 0-0.95 0.426-0.95 0.949v56.481c0 0.53 0.43 0.95 0.95 0.95h12.95c0.52 0 0.95-0.42 0.95-0.95v-56.477c0-0.523-0.42-0.949-0.95-0.949v-0.004zm-6.4-25.719c-5.13 0-9.29 4.152-9.29 9.281 0 5.132 4.16 9.289 9.29 9.289s9.28-4.157 9.28-9.289c0-5.128-4.16-9.281-9.28-9.281zm113.42 43.88c-5.12 0-9.11-4.115-9.11-9.112s4.04-9.159 9.16-9.159 9.11 4.114 9.11 9.107c0 4.997-4.04 9.164-9.16 9.164zm0.05-17.365c-4.67 0-8.2 3.71-8.2 8.253 0 4.541 3.51 8.201 8.15 8.201 4.67 0 8.2-3.707 8.2-8.253 0-4.541-3.51-8.201-8.15-8.201zm2.02 9.138l2.58 3.608h-2.18l-2.32-3.31h-1.99v3.31h-1.82v-9.564h4.26c2.23 0 3.69 1.137 3.69 3.051 0.01 1.568-0.9 2.526-2.21 2.905h-0.01zm-1.54-4.315h-2.37v3.025h2.37c1.18 0 1.89-0.579 1.89-1.514 0-0.984-0.71-1.511-1.89-1.511z"></path></svg>');function Rs(o,e){let a=wt(e,"class",3,"w-6 h-6");var i=Av();Y(()=>ut(i,0,Zt(a()))),x(o,i)}const Bs="https://core.fariz.dev",ro={BASE_URL:"https://api.spotify.com/v1",TOKEN_ENDPOINT:`${Bs}/api/spotify/token`,REFRESH_ENDPOINT:`${Bs}/api/spotify/refresh`,MARKET:"ID"};var jv=w('<div class="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shadow-lg"><!></div>'),Nv=w('<span class="text-gray-500 mx-1">•</span>'),Iv=w('<span><a target="_blank" rel="noreferrer" class="hover:text-white hover:underline transition-colors duration-200"> </a> <!></span>'),Rv=w('<div class="h-full rounded-full animate-pulse bg-white/20"></div>'),Bv=w('<div class="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg transition-all duration-300"></div>'),Dv=w('<div class="flex items-center gap-1 text-gray-400"><!> <span class="font-medium text-gray-300"> </span></div>'),Fv=w('<span class="text-gray-400 font-medium"> </span>'),Hv=w('<div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> <span class="text-green-500 font-medium">LIVE</span>',1),Ov=w('<!> <span class="text-gray-400">PAUSED</span>',1),zv=w('<div><div class="p-4"><div class="flex items-center gap-4 mb-4"><div class="relative"><a target="_blank" rel="noreferrer" class="block"><img alt="" class="w-16 h-16 rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105 object-cover"/> <!></a></div> <div class="flex-1 min-w-0"><div class="font-bold text-white text-base mb-1 truncate group-hover:text-green-400 transition-colors duration-200"><a target="_blank" rel="noreferrer" class="hover:underline"> </a></div> <div class="text-sm text-gray-300 truncate"></div></div> <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300"><a href="https://open.spotify.com" rel="noreferrer" target="_blank" class="block"><!></a></div></div> <div class="space-y-3"><div class="relative"><div><div><!></div></div> <!></div> <div class="flex items-center justify-between text-xs"><div class="flex items-center gap-2"><!></div> <div class="flex items-center gap-3"><!> <div class="flex items-center gap-1"><!></div></div></div></div></div></div>'),Uv=w('<div class="group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-xl border border-gray-800/50 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-gray-600/30"><div class="p-4"><div class="flex items-center gap-4 mb-4"><div class="relative"><div class="w-16 h-16 rounded-lg bg-gray-800 flex items-center justify-center"><div class="w-8 h-8 rounded bg-gray-700 animate-pulse"></div></div> <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center"><!></div></div> <div class="flex-1"><div class="font-bold text-gray-400 text-base mb-1">Not Playing</div> <div class="text-sm text-gray-500">Connect to Spotify to see current track</div></div> <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300"><a href="https://open.spotify.com" rel="noreferrer" target="_blank" class="block"><!></a></div></div> <div class="space-y-3"><div class="h-2 rounded-full bg-gray-800/30 overflow-hidden"><div class="h-full w-0 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full"></div></div> <div class="flex items-center justify-between text-xs"><div class="flex items-center gap-1 text-gray-500"><!> <span>Offline</span></div> <span class="text-gray-500">--:--</span></div></div></div></div>');function qv(o,e){Ie(e,!0);let a=p(null),i=p(!1),n=p(!1),c=Lt({album_img:null,album_url:null,artists:[],url:null,name:null,percent:0,duration_ms:0,progress_ms:0});const d={name:null,type:null};let v=p(Lt({...d})),g=Lt(new Set),u=!1;const f=(b,T)=>{if(!u)return-1;const C=window.setTimeout(()=>{g.delete(C),u&&b()},T);return g.add(C),C},k=()=>{u=!1,g.forEach(b=>clearTimeout(b)),g.clear()},h=()=>{if(!c.duration_ms||!c.progress_ms)return"";const b=c.duration_ms-c.progress_ms,T=Math.ceil(b/1e3/60);return T<=0?"":T===1?"1 min left":`${T} min left`},m=()=>{fetch(`${ro.BASE_URL}/me/player/devices`,{method:"GET",headers:new Headers({Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+t(a)})}).then(b=>b.status===200?b.json():!1).then(b=>{if(b.devices.length>=1){const T=b.devices.find(C=>C.is_active);T!==void 0?(t(v).name=T.name,t(v).type=T.type):l(v,{...d},!0)}else l(v,{...d},!0)}).catch(b=>(console.log(b),[]))},_=()=>{fetch(ro.REFRESH_ENDPOINT).then(b=>b.json()).then(b=>{b.data!==null&&(l(a,b.data.access_token,!0),$())}).catch(b=>(console.log(b),[]))},$=()=>{u&&fetch(`${ro.BASE_URL}/me/player/currently-playing?market=${ro.MARKET}`,{method:"GET",headers:new Headers({Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+t(a)})}).then(b=>u?b.status===200?b.json():b.status===401?(_(),null):(f(()=>$(),3e3),null):null).then(b=>{if(!u||!b)return;l(n,b.is_playing,!0);const T=b.item;c.artists=T.artists,c.url=T.external_urls.spotify,c.name=T.name,c.album_img=T?.album?.images[0]?.url,c.album_url=T.album.external_urls.spotify,c.duration_ms=T.duration_ms,c.progress_ms=b.progress_ms,c.percent=b.progress_ms*100/T.duration_ms,l(i,!0),m(),f(()=>$(),1e3)}).catch(b=>{u&&(l(i,!1),console.log(b),f(()=>$(),7e3))})};Ur(()=>{u=!0,fetch(ro.TOKEN_ENDPOINT).then(b=>b.json()).then(b=>{u&&b.data!==null&&(l(a,b.data.access_token,!0),$())}).catch(b=>{u&&console.log(b)})}),tl(()=>{k()});var M=Ee(),E=ge(M);{var R=b=>{var T=zv(),C=r(T),B=r(C),z=r(B),te=r(z),ue=r(te),de=s(ue,2);{var xe=se=>{var _e=jv(),q=r(_e);V0(q,{class:"w-2.5 h-2.5 text-white"}),x(se,_e)};H(de,se=>{t(n)&&se(xe)})}var ce=s(z,2),fe=r(ce),Be=r(fe),Ve=r(Be),Ye=s(fe,2);mt(Ye,21,()=>c.artists,Nr,(se,_e,q)=>{let Q=()=>t(_e).external_urls,G=()=>t(_e).name;var P=Iv(),L=r(P),N=r(L),ae=s(L,2);{var ee=K=>{var O=Nv();x(K,O)};H(ae,K=>{q+1!==c.artists.length&&K(ee)})}Y(()=>{De(L,"href",Q().spotify),y(N,G())}),x(se,P)});var Qe=s(ce,2),We=r(Qe),ze=r(We);Rs(ze,{class:"h-5 w-auto text-green-500 hover:scale-110 transition-transform duration-200"});var je=s(B,2),Le=r(je),Ce=r(Le),re=r(Ce),Te=r(re);{var me=se=>{var _e=Rv();x(se,_e)};H(Te,se=>{t(n)&&se(me)})}var oe=s(Ce,2);{var j=se=>{var _e=Bv();Y(()=>Yt(_e,`left: calc(${c.percent??""}% - 6px);`)),x(se,_e)};H(oe,se=>{t(n)&&se(j)})}var be=s(Le,2),ve=r(be),U=r(ve);{var X=se=>{var _e=Dv(),q=r(_e);W0(q,{class:"w-3 h-3 opacity-70"});var Q=s(q,2),G=r(Q);Y(()=>y(G,t(v).name)),x(se,_e)};H(U,se=>{t(v).name!==null&&se(X)})}var he=s(ve,2),pe=r(he);{var ke=se=>{var _e=Fv(),q=r(_e);Y(Q=>y(q,Q),[h]),x(se,_e)};H(pe,se=>{t(n)&&h()&&se(ke)})}var Ue=s(pe,2),Oe=r(Ue);{var Ne=se=>{var _e=Hv();x(se,_e)},Pe=se=>{var _e=Ov(),q=ge(_e);As(q,{class:"w-3 h-3 text-gray-400"}),x(se,_e)};H(Oe,se=>{t(n)?se(Ne):se(Pe,!1)})}Y(()=>{ut(T,1,`group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-xl border ${t(n)?"border-green-500/50 shadow-green-500/20":"border-gray-800/50"} overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-green-500/30`),De(te,"href",c.album_url),De(ue,"src",c.album_img),De(Be,"href",c.url),y(Ve,c.name),ut(Ce,1,`h-2 rounded-full overflow-hidden ${t(n)?"bg-gray-800":"bg-gray-800/50"}`),ut(re,1,`h-full rounded-full transition-all duration-300 ease-out ${t(n)?"bg-gradient-to-r from-green-500 to-green-400":"bg-gradient-to-r from-gray-400 to-gray-500"}`),Yt(re,`width: ${c.percent??""}%;`)}),x(b,T)},V=b=>{var T=Uv(),C=r(T),B=r(C),z=r(B),te=s(r(z),2),ue=r(te);go(ue,{class:"w-3 h-3 text-gray-400"});var de=s(z,4),xe=r(de),ce=r(xe);Rs(ce,{class:"h-5 w-auto text-gray-400 hover:text-green-500 hover:scale-110 transition-all duration-200"});var fe=s(B,2),Be=s(r(fe),2),Ve=r(Be),Ye=r(Ve);As(Ye,{class:"w-3 h-3"}),x(b,T)};H(E,b=>{t(i)?b(R):b(V,!1)})}x(o,M),Re()}var Gv=ur('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"></path><path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"></path></svg>');function Tl(o,e){let a=wt(e,"class",3,"w-6 h-6");var i=Gv();Y(()=>ut(i,0,Zt(a()))),x(o,i)}var Wv=ur('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"></path></svg>');function Jv(o,e){let a=wt(e,"class",3,"w-6 h-6");var i=Wv();Y(()=>ut(i,0,Zt(a()))),x(o,i)}var Vv=ur('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>');function Ml(o,e){let a=wt(e,"class",3,"w-6 h-6");var i=Vv();Y(()=>ut(i,0,Zt(a()))),x(o,i)}var Yv=ur('<svg viewBox="0 -28.5 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid"><g><path d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z" fill="currentColor" fill-rule="nonzero"></path></g></svg>');function Kv(o,e){let a=wt(e,"class",3,"w-6 h-6");var i=Yv();Y(()=>ut(i,0,Zt(a()))),x(o,i)}var Qv=ur('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1333.33 1333.3" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"><path d="M666.66 0C298.48 0 0 298.47 0 666.65c0 368.19 298.48 666.65 666.66 666.65 368.22 0 666.67-298.45 666.67-666.65C1333.33 298.49 1034.88.03 666.65.03l.01-.04zm305.73 961.51c-11.94 19.58-37.57 25.8-57.16 13.77-156.52-95.61-353.57-117.26-585.63-64.24-22.36 5.09-44.65-8.92-49.75-31.29-5.12-22.37 8.84-44.66 31.26-49.75 253.95-58.02 471.78-33.04 647.51 74.35 19.59 12.02 25.8 37.57 13.77 57.16zm81.6-181.52c-15.05 24.45-47.05 32.17-71.49 17.13-179.2-110.15-452.35-142.05-664.31-77.7-27.49 8.3-56.52-7.19-64.86-34.63-8.28-27.49 7.22-56.46 34.66-64.82 242.11-73.46 543.1-37.88 748.89 88.58 24.44 15.05 32.16 47.05 17.12 71.46V780zm7.01-189.02c-214.87-127.62-569.36-139.35-774.5-77.09-32.94 9.99-67.78-8.6-77.76-41.55-9.98-32.96 8.6-67.77 41.56-77.78 235.49-71.49 626.96-57.68 874.34 89.18 29.69 17.59 39.41 55.85 21.81 85.44-17.52 29.63-55.89 39.4-85.42 21.8h-.03z" fill="currentColor" fill-rule="nonzero"></path></svg>');function Zv(o,e){let a=wt(e,"class",3,"w-6 h-6");var i=Qv();Y(()=>ut(i,0,Zt(a()))),x(o,i)}const Xv=()=>{navigator.clipboard.writeText("me@fariz.dev"),Ht.success("Email copied to clipboard!")};var eg=w('<div class="flex flex-col sm:flex-row items-center gap-4 relative"><div class="group relative"><button class="flex items-center gap-3 pr-4 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 hover:border-amber-300 dark:hover:border-amber-600 h-10"><div class="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 group-hover:bg-amber-200 dark:group-hover:bg-amber-900/50 transition-colors duration-300"><!></div> <span class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">me@fariz.dev</span></button> <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">Click to copy email</div></div> <div class="flex items-center gap-2"><a href="https://github.com/farizink" target="_blank" rel="noreferrer" class="group/social relative"><div class="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-110 hover:border-gray-900 hover:bg-gray-900"><!></div> <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover/social:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">GitHub</div></a> <a href="https://discord.com/users/383164336450830336" target="_blank" rel="noreferrer" class="group/social relative"><div class="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-110 hover:border-indigo-500 hover:bg-indigo-500"><!></div> <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover/social:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">Discord</div></a> <a href="https://open.spotify.com/user/ci98z18wa1ebncapbw5hq350x" target="_blank" rel="noreferrer" class="group/social relative"><div class="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-110 hover:border-green-500 hover:bg-green-500"><!></div> <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover/social:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">Spotify</div></a></div></div>');function tg(o,e){Ie(e,!0);var a=eg(),i=r(a),n=r(i);n.__click=[Xv];var c=r(n),d=r(c);Tl(d,{class:"w-5 h-5 text-amber-600 dark:text-amber-400"});var v=s(i,2),g=r(v),u=r(g),f=r(u);Ml(f,{class:"w-5 h-5 text-gray-600 dark:text-gray-400 group-hover/social:text-white transition-colors duration-300"});var k=s(g,2),h=r(k),m=r(h);Kv(m,{class:"w-5 h-5 text-gray-600 dark:text-gray-400 group-hover/social:text-white transition-colors duration-300"});var _=s(k,2),$=r(_),M=r($);Zv(M,{class:"w-5 h-5 text-gray-600 dark:text-gray-400 group-hover/social:text-white transition-colors duration-300"}),x(o,a),Re()}yt(["click"]);var rg=(o,e)=>e(),ag=(o,e)=>l(e,!1),og=(o,e)=>o.key==="Escape"&&l(e,!1),ig=(o,e)=>l(e,!1),sg=w('<div class="aspect-[3/4] h-full w-full bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse svelte-et6md"><div class="h-full w-full relative overflow-hidden svelte-et6md"><div class="absolute inset-0 bg-gradient-to-t from-gray-200/50 to-transparent dark:from-gray-600/50 svelte-et6md"></div> <div class="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 svelte-et6md"><div class="h-24 w-24 rounded-full bg-gray-300/50 dark:bg-gray-600/50 animate-pulse svelte-et6md"></div></div></div></div>'),ng=w('<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 svelte-et6md" role="dialog" aria-modal="true" aria-label="Photo modal" tabindex="-1"><div class="relative group animate-in zoom-in duration-300 svelte-et6md" role="document" tabindex="-1"><button class="absolute hover:cursor-pointer -top-3 -right-3 z-10 w-10 h-10 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 transition-all duration-200 shadow-lg hover:scale-110 svelte-et6md" aria-label="Close photo modal"><svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" class="svelte-et6md"><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" class="svelte-et6md"></path></svg></button> <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden max-w-sm md:max-w-md lg:max-w-lg svelte-et6md"><!> <img alt="Fariz"/></div> <div class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl pointer-events-none svelte-et6md"></div></div></div>'),lg=w('<div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center opacity-0 hover:opacity-100 transition-opacity duration-300 svelte-et6md"><p class="text-xs text-gray-400 dark:text-gray-600 italic svelte-et6md">Click my name for a surprise</p></div>'),dg=w(`<main class="min-h-screen flex items-center justify-center px-4 py-8 relative svelte-et6md"><div class="max-w-4xl w-full svelte-et6md"><div class="text-left svelte-et6md"><div class="mb-3 svelte-et6md"><h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight svelte-et6md"><button type="button" class="cursor-text text-left w-full bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 bg-clip-text text-transparent dark:from-white dark:via-blue-200 dark:to-purple-200 dark:text-transparent animate-gradient svelte-et6md">Nizar Alfarizi Akbar</button></h1></div> <div class="mb-6 svelte-et6md"><p class="text-lg md:text-xl text-gray-600 dark:text-gray-400 svelte-et6md">known as <span class="font-bold text-blue-600 dark:text-blue-400 italic svelte-et6md">Fariz</span></p></div> <div class="mb-8 svelte-et6md"><p class="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl svelte-et6md">Software engineer based in Surabaya, Indonesia. Specializing in backend development and
          high-quality web applications. Currently building <span class="italic text-blue-600 dark:text-blue-400 svelte-et6md">"gabut"</span> projects and crushing work tasks 🙂</p></div> <div class="mb-12 svelte-et6md"><!></div> <div class="svelte-et6md"><!></div></div></div> <!> <!></main>`);function cg(o){let e=p(!1),a=p(null),i=p(!1);const n=()=>{const b=[Pv,Lv];t(e)||(l(a,b[Math.floor(Math.random()*b.length)],!0),l(i,!0)),l(e,!t(e))},c=()=>{l(i,!1)};var d=dg(),v=r(d),g=r(v),u=r(g),f=r(u),k=r(f);k.__click=[rg,n];var h=s(u,6),m=r(h);tg(m,{});var _=s(h,2),$=r(_);qv($,{});var M=s(v,2);{var E=b=>{var T=ng();T.__click=[ag,e],T.__keydown=[og,e];var C=r(T),B=r(C);B.__click=[ig,e];var z=s(B,2),te=r(z);{var ue=xe=>{var ce=sg();x(xe,ce)};H(te,xe=>{t(i)&&xe(ue)})}var de=s(te,2);Y(()=>{De(de,"src",t(a)),ut(de,1,`w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 ${t(i)?"opacity-0":"opacity-100"}`,"svelte-et6md")}),el("load",de,c),x(b,T)};H(M,b=>{t(e)&&t(a)&&b(E)})}var R=s(M,2);{var V=b=>{var T=lg();x(b,T)};H(R,b=>{t(e)||b(V)})}x(o,d)}yt(["click","keydown"]);var vg=w('<div class="card h-full"><div class="animate-pulse"><div class="mb-6"><div class="h-8 bg-[var(--ds-secondary-200)] dark:bg-[var(--ds-secondary-700)] rounded-lg mb-3 w-3/4"></div></div> <div class="space-y-3 mb-6"><div class="h-4 bg-[var(--ds-secondary-100)] dark:bg-[var(--ds-secondary-800)] rounded w-full"></div> <div class="h-4 bg-[var(--ds-secondary-100)] dark:bg-[var(--ds-secondary-800)] rounded w-5/6"></div> <div class="h-4 bg-[var(--ds-secondary-100)] dark:bg-[var(--ds-secondary-800)] rounded w-4/6"></div></div> <div class="flex flex-wrap gap-2 mb-6"><div class="h-6 bg-[var(--ds-secondary-200)] dark:bg-[var(--ds-secondary-700)] rounded-full w-16"></div> <div class="h-6 bg-[var(--ds-secondary-200)] dark:bg-[var(--ds-secondary-700)] rounded-full w-20"></div> <div class="h-6 bg-[var(--ds-secondary-200)] dark:bg-[var(--ds-secondary-700)] rounded-full w-14"></div></div> <div class="flex justify-between items-center pt-6 border-t border-[var(--ds-secondary-200)] dark:border-[var(--ds-secondary-700)]"><div class="flex items-center gap-4"><div class="h-4 bg-[var(--ds-secondary-200)] dark:bg-[var(--ds-secondary-700)] rounded w-16"></div> <div class="h-4 bg-[var(--ds-secondary-200)] dark:bg-[var(--ds-secondary-700)] rounded w-12"></div></div> <div class="h-3 bg-[var(--ds-secondary-200)] dark:bg-[var(--ds-secondary-700)] rounded w-20"></div></div></div></div>'),gg=w('<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"></div>'),ug=w('<div class="card max-w-md mx-auto text-center"><div class="flex flex-col items-center justify-center text-[var(--ds-secondary-600)] dark:text-[var(--ds-secondary-400)]"><p class="mb-6 text-lg"> </p> <button class="btn btn-primary btn-lg">Try Again</button></div></div>'),xg=w('<span class="bg-[var(--ds-primary-50)] dark:bg-[var(--ds-primary-900)]/30 text-[var(--ds-primary-700)] dark:text-[var(--ds-primary-300)] px-3 py-1 rounded-full text-xs font-medium border border-[var(--ds-primary-100)] dark:border-[var(--ds-primary-800)]"> </span>'),fg=w('<span class="text-[var(--ds-secondary-500)] dark:text-[var(--ds-secondary-500)] text-xs px-2 py-1 font-medium"> </span>'),bg=w('<div class="flex flex-wrap gap-2 mb-6 relative z-10"><!> <!></div>'),pg=w('<span class="flex items-center gap-2"><span class="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-white dark:ring-[var(--ds-secondary-800)]"></span> <span class="font-medium"> </span></span>'),mg=w('<span class="flex items-center gap-1.5 group/star"><!> <span class="font-medium"> </span></span>'),hg=w('<span class="flex items-center gap-1.5"><!> <span class="font-medium"> </span></span>'),yg=w('<div class="card card-elevated card-hover group h-full flex flex-col"><div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--ds-primary-500)]/10 to-[var(--ds-primary-600)]/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div> <div class="mb-4 relative z-10"><div class="flex items-start justify-between mb-3"><h3 class="text-xl font-bold tracking-tight"><a target="_blank" rel="noopener noreferrer" class="text-[var(--ds-secondary-900)] dark:text-white hover:text-[var(--ds-primary-600)] dark:hover:text-[var(--ds-primary-400)] transition-colors duration-200 flex items-center gap-2 group/link"><!> <!></a></h3></div></div> <p class="text-[var(--ds-secondary-600)] dark:text-[var(--ds-secondary-400)] mb-6 leading-relaxed flex-grow relative z-10"> </p> <!> <div class="flex justify-between items-center mt-auto pt-6 border-t border-[var(--ds-secondary-200)] dark:border-[var(--ds-secondary-700)] text-sm text-[var(--ds-secondary-500)] dark:text-[var(--ds-secondary-400)] relative z-10"><div class="flex items-center gap-5"><!> <!> <!></div> <span class="text-xs font-medium opacity-70"> </span></div></div>'),_g=w('<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"></div>'),kg=w(`<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen animate-fade-in"><div class="text-center mb-16"><h1 class="text-4xl md:text-5xl font-bold text-[var(--ds-secondary-900)] dark:text-white mb-6 tracking-tight">Projects</h1> <p class="text-xl text-[var(--ds-secondary-600)] dark:text-[var(--ds-secondary-400)] max-w-2xl mx-auto leading-relaxed">Explore my latest work and open-source contributions on GitHub. From web applications to
      developer tools.</p></div> <!></main>`);function wg(o,e){Ie(e,!0);let a=p(Lt([])),i=p(!1),n=p("");const c={JavaScript:"#f1e05a",TypeScript:"#2b7489",Python:"#3572A5",Java:"#b07219",HTML:"#e34c26",CSS:"#563d7c",PHP:"#4F5D95",Vue:"#4FC08D",Svelte:"#ff3e00",React:"#61dafb",Go:"#00ADD8",Rust:"#dea584","C++":"#f34b7d",C:"#555555"};async function d(){try{l(i,!0),l(n,"");const h=await fetch("https://api.github.com/users/FarizInk/repos?sort=updated&per_page=12",{headers:{Accept:"application/vnd.github.v3+json","User-Agent":"Portfolio-Website"}});if(!h.ok)throw new Error(`Failed to fetch repositories: ${h.status}`);const m=await h.json();l(a,m.filter(_=>!_.fork),!0)}catch(h){console.error("Fetch error:",h),l(n,h instanceof Error?h.message:"An error occurred while fetching repositories",!0)}finally{l(i,!1)}}function v(h){const m=new Date(h),$=Math.abs(new Date().getTime()-m.getTime()),M=Math.ceil($/(1e3*60*60*24));return M===1?"yesterday":M<30?`${M} days ago`:M<365?`${Math.floor(M/30)} months ago`:`${Math.floor(M/365)} years ago`}Ur(()=>{d()});var g=kg(),u=s(r(g),2);{var f=h=>{var m=gg();mt(m,20,()=>Array(6),_=>_,(_,$)=>{var M=vg();x(_,M)}),x(h,m)},k=h=>{var m=Ee(),_=ge(m);{var $=E=>{var R=ug(),V=r(R),b=r(V),T=r(b),C=s(b,2);C.__click=d,Y(()=>y(T,`Error: ${t(n)??""}`)),x(E,R)},M=E=>{var R=_g();mt(R,21,()=>t(a),V=>V.id,(V,b)=>{var T=yg(),C=s(r(T),2),B=r(C),z=r(B),te=r(z),ue=r(te);q0(ue,{class:"w-5 h-5"});var de=s(ue),xe=s(de);O0(xe,{class:"w-4 h-4 opacity-0 group-hover/link:opacity-100 transition-opacity duration-200"});var ce=s(C,2),fe=r(ce),Be=s(ce,2);{var Ve=oe=>{var j=bg(),be=r(j);mt(be,16,()=>t(b).topics.slice(0,3),X=>X,(X,he)=>{var pe=xg(),ke=r(pe);Y(()=>y(ke,he)),x(X,pe)});var ve=s(be,2);{var U=X=>{var he=fg(),pe=r(he);Y(()=>y(pe,`+${t(b).topics.length-3} more`)),x(X,he)};H(ve,X=>{t(b).topics.length>3&&X(U)})}x(oe,j)};H(Be,oe=>{t(b).topics&&t(b).topics.length>0&&oe(Ve)})}var Ye=s(Be,2),Qe=r(Ye),We=r(Qe);{var ze=oe=>{var j=pg(),be=r(j),ve=s(be,2),U=r(ve);Y(()=>{Yt(be,`background-color: ${c[t(b).language]||"#888"}`),y(U,t(b).language)}),x(oe,j)};H(We,oe=>{t(b).language&&oe(ze)})}var je=s(We,2);{var Le=oe=>{var j=mg(),be=r(j);ds(be,{class:"w-4 h-4 text-yellow-500 group-hover/star:fill-current transition-all duration-200"});var ve=s(be,2),U=r(ve);Y(()=>y(U,t(b).stargazers_count)),x(oe,j)};H(je,oe=>{t(b).stargazers_count>0&&oe(Le)})}var Ce=s(je,2);{var re=oe=>{var j=hg(),be=r(j);U0(be,{class:"w-4 h-4"});var ve=s(be,2),U=r(ve);Y(()=>y(U,t(b).forks_count)),x(oe,j)};H(Ce,oe=>{t(b).forks_count>0&&oe(re)})}var Te=s(Qe,2),me=r(Te);Y(oe=>{De(te,"href",t(b).html_url),y(de,` ${t(b).name??""} `),y(fe,t(b).description||"No description available"),y(me,oe)},[()=>v(t(b).updated_at)]),x(V,T)}),x(E,R)};H(_,E=>{t(n)?E($):E(M,!1)},!0)}x(h,m)};H(u,h=>{t(i)?h(f):h(k,!1)})}x(o,g),Re()}yt(["click"]);var Cg=ur(`<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1668.56 1221.19" xml:space="preserve" fill="currentColor"><g transform="translate(52.390088,-25.058597)"><path d="M283.94,167.31l386.39,516.64L281.5,1104h87.51l340.42-367.76L984.48,1104h297.8L874.15,558.3l361.92-390.99
		h-87.51l-313.51,338.7l-253.31-338.7H283.94z M412.63,231.77h136.81l604.13,807.76h-136.81L412.63,231.77z"></path></g></svg>`);function $g(o,e){let a=wt(e,"class",3,"w-6 h-6");var i=Cg();Y(()=>ut(i,0,Zt(a()))),x(o,i)}const Sg=()=>{navigator.clipboard.writeText("john.doe@example.com"),Ht.success("Email copied to clipboard!")};var Tg=w(`<main class="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8"><div class="max-w-7xl mx-auto"><div class="text-center mb-8"><h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">John Doe</h1> <p class="text-lg text-gray-600 dark:text-gray-400">Full Stack Developer & UI/UX Enthusiast</p></div> <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-auto"><div class="md:col-span-2 md:row-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"><div class="flex items-center gap-3 mb-4"><div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center"><span class="text-white text-xl font-bold">JD</span></div> <div><h2 class="text-xl font-bold text-gray-900 dark:text-white">About Me</h2> <p class="text-sm text-gray-600 dark:text-gray-400">Software Engineer</p></div></div> <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">Passionate full-stack developer with 5+ years of experience building web applications. I
          love creating intuitive user interfaces and solving complex problems with elegant code
          solutions.</p> <div class="flex flex-wrap gap-2"><span class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">JavaScript</span> <span class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm">TypeScript</span> <span class="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm">React</span> <span class="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm">Node.js</span></div></div> <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"><div class="flex items-center gap-3 mb-4"><!> <h3 class="font-semibold text-gray-900 dark:text-white">Contact</h3></div> <button class="btn btn-outline btn-sm">john.doe@example.com</button></div> <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"><div class="flex items-center gap-3 mb-4"><svg class="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> <h3 class="font-semibold text-gray-900 dark:text-white">Location</h3></div> <p class="text-sm text-gray-600 dark:text-gray-400">San Francisco, CA</p></div> <div class="md:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"><div class="flex items-center gap-3 mb-4"><svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg> <h3 class="font-semibold text-gray-900 dark:text-white">Experience</h3></div> <div class="space-y-3"><div class="flex justify-between items-start"><div><p class="font-medium text-gray-900 dark:text-white">Senior Frontend Developer</p> <p class="text-sm text-gray-600 dark:text-gray-400">TechCorp Inc.</p></div> <span class="text-xs text-gray-500 dark:text-gray-500">2021 - Present</span></div> <div class="flex justify-between items-start"><div><p class="font-medium text-gray-900 dark:text-white">Full Stack Developer</p> <p class="text-sm text-gray-600 dark:text-gray-400">StartupXYZ</p></div> <span class="text-xs text-gray-500 dark:text-gray-500">2019 - 2021</span></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"><div class="flex items-center gap-3 mb-4"><svg class="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg> <h3 class="font-semibold text-gray-900 dark:text-white">Education</h3></div> <div class="space-y-2"><p class="font-medium text-gray-900 dark:text-white text-sm">BS Computer Science</p> <p class="text-xs text-gray-600 dark:text-gray-400">Stanford University</p> <p class="text-xs text-gray-500 dark:text-gray-500">2015 - 2019</p></div></div> <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"><div class="flex items-center gap-3 mb-4"><svg class="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg> <h3 class="font-semibold text-gray-900 dark:text-white">Skills</h3></div> <div class="flex flex-wrap gap-1"><span class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">React</span> <span class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">Vue</span> <span class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">Node.js</span> <span class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">Python</span> <span class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">Docker</span></div></div> <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"><div class="flex items-center gap-3 mb-4"><svg class="w-5 h-5 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg> <h3 class="font-semibold text-gray-900 dark:text-white">Hobbies</h3></div> <div class="space-y-2"><div class="flex items-center gap-2"><svg class="w-4 h-4 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg> <span class="text-sm text-gray-600 dark:text-gray-400">Coffee enthusiast</span></div> <div class="flex items-center gap-2"><svg class="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg> <span class="text-sm text-gray-600 dark:text-gray-400">Guitar player</span></div></div></div> <div class="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-white"><div class="flex items-center gap-3 mb-4"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 01.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 01-.806 1.946 3.42 3.42 0 00-3.138 3.138 3.42 3.42 0 01-1.946.806 3.42 3.42 0 00-4.438 0 3.42 3.42 0 01-1.946-.806 3.42 3.42 0 00-3.138-3.138 3.42 3.42 0 01-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 01.806-1.946 3.42 3.42 0 003.138-3.138z"></path></svg> <h3 class="font-semibold">Achievements</h3></div> <div class="space-y-2"><p class="text-sm font-medium">🏆 Best Innovation Award 2023</p> <p class="text-sm font-medium">🌟 1000+ GitHub Stars</p> <p class="text-sm font-medium">📚 Published Tech Author</p></div></div> <div class="md:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"><div class="flex items-center gap-3 mb-4"><h3 class="font-semibold text-gray-900 dark:text-white">Connect With Me</h3></div> <div class="flex gap-4"><a href="https://github.com/farizink" target="_blank" rel="noopener noreferrer" class="p-3 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"><!></a> <a href="https://www.linkedin.com/in/farizink" target="_blank" rel="noopener noreferrer" class="p-3 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"><!></a> <a href="https://x.com/farizink" target="_blank" rel="noopener noreferrer" class="p-3 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"><!></a></div></div> <div class="bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-white"><div class="flex items-center gap-3 mb-4"><div class="w-3 h-3 bg-white rounded-full animate-pulse"></div> <h3 class="font-semibold">Available for Work</h3></div> <p class="text-sm">Open to exciting opportunities and freelance projects!</p></div></div></div></main>`);function Mg(o,e){Ie(e,!0);var a=Tg(),i=r(a),n=s(r(i),2),c=s(r(n),2),d=r(c),v=r(d);Tl(v,{class:"w-5 h-5 text-blue-600 dark:text-blue-400"});var g=s(d,2);g.__click=[Sg];var u=s(c,14),f=s(r(u),2),k=r(f),h=r(k);Ml(h,{class:"w-5 h-5 text-gray-700 dark:text-gray-300"});var m=s(k,2),_=r(m);Jv(_,{class:"w-5 h-5 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"});var $=s(m,2),M=r($);$g(M,{class:"w-5 h-5 text-gray-700 dark:text-gray-300 hover:text-blue-400 dark:hover:text-blue-300"}),x(o,a),Re()}yt(["click"]);const Eg=[{path:"/",component:cg,title:"Fariz - Software Engineer & Developer Tools Creator",description:"Software engineer passionate about building innovative solutions and developer tools. Explore my projects and free online utilities.",keywords:"fariz, software engineer, developer tools, web development, programming, javascript, typescript, svelte",robots:"index, follow"},{path:"/projects",component:wg,title:"Projects - Fariz",description:"Explore my software development projects and open-source contributions. Building innovative solutions with modern technologies.",keywords:"software projects, web development projects, open source, programming portfolio, github projects",robots:"index, follow"},{path:"/example-bento-profile",component:Mg,title:"Bento Profile Example - Fariz",description:"Modern bento grid layout personal profile example with cards, skills, and contact information.",keywords:"bento grid, profile example, personal portfolio, modern design, responsive layout",robots:"noindex, nofollow"}];var Pg=(o,e,a)=>l(e,t(a),!0),Lg=w("<button> </button>"),Ag=w('<div class="text-center py-12"><div class="inline-flex items-center justify-center p-4 mb-4 rounded-full bg-[var(--ds-secondary-100)] dark:bg-[var(--ds-secondary-800)] text-[var(--ds-secondary-400)]"><!></div> <h3 class="text-lg font-medium text-[var(--ds-secondary-900)] dark:text-white mb-2">No tools found</h3> <p class="text-[var(--ds-secondary-500)] dark:text-[var(--ds-secondary-400)]">Try adjusting your search or category filter.</p></div>'),jg=(o,e,a)=>e(t(a).id),Ng=w('<span class="px-2 py-1 text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full border border-yellow-200 dark:border-yellow-800">Popular</span>'),Ig=w('<button class="text-left w-full h-full group focus:outline-none"><div class="card card-elevated card-hover h-full flex flex-col relative overflow-hidden"><div class="flex items-start justify-between mb-4 relative z-10"><div class="p-3 rounded-xl text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800"><!></div> <!></div> <h3 class="text-xl font-bold text-[var(--ds-secondary-900)] dark:text-white mb-2 group-hover:text-[var(--ds-primary-600)] dark:group-hover:text-[var(--ds-primary-400)] transition-colors duration-200"> </h3> <p class="text-[var(--ds-secondary-600)] dark:text-[var(--ds-secondary-400)] mb-6 leading-relaxed flex-grow"> </p> <div class="flex items-center text-sm font-medium text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)] mt-auto">Open Tool <!></div></div></button>'),Rg=w('<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>'),Bg=w('<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen animate-fade-in"><div class="text-center mb-16"><div class="inline-flex items-center justify-center p-3 mb-6 rounded-2xl bg-[var(--ds-primary-50)] dark:bg-[var(--ds-primary-900)]/30 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"><!></div> <h1 class="text-4xl md:text-5xl font-bold text-[var(--ds-secondary-900)] dark:text-white mb-6 tracking-tight">Developer Tools</h1> <p class="text-xl text-[var(--ds-secondary-600)] dark:text-[var(--ds-secondary-400)] max-w-2xl mx-auto leading-relaxed">A collection of useful tools for developers and designers. Fast, secure, and easy to use.</p></div> <div class="relative max-w-2xl mx-auto mb-12"><div class="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--ds-secondary-400)] pointer-events-none"><!></div> <input type="search" placeholder="Search tools..." class="input pl-11 shadow-sm text-lg"/></div> <div class="flex flex-wrap justify-center gap-3 mb-12"></div> <!></main>');function Dg(o,e){Ie(e,!0);let a=p("");const i=[{name:"Text & Data Processing",description:"Tools for working with text and data",tools:[{id:"json-parser",name:"JSON Parser & Formatter",description:"Format, validate, and minify JSON data with ease",icon:pl,features:["Validate JSON","Format with custom indentation","Minify JSON","Copy to clipboard"],comingSoon:!1},{id:"text-case-converter",name:"Text Case Converter",description:"Convert between different text cases",icon:Qr,features:["UPPERCASE","lowercase","Title Case","camelCase","snake_case","kebab-case"],comingSoon:!1},{id:"lorem-ipsum-generator",name:"Lorem Ipsum Generator",description:"Generate placeholder text for design and testing",icon:Jt,features:["Multiple variations","Custom length","Paragraphs","Sentences","Words"],comingSoon:!1},{id:"character-counter",name:"Character Counter",description:"Count characters, words, and analyze text",icon:ua,features:["Character count","Word count","Reading time","Sentences","Paragraphs"],comingSoon:!1},{id:"text-diff",name:"Text Diff Tool",description:"Compare two text blocks and highlight differences",icon:$a,features:["Side by side comparison","Highlight differences","Merge suggestions"],comingSoon:!1},{id:"url-parser",name:"URL Parser/Analyzer",description:"Parse URLs and extract components",icon:Ro,features:["Extract domain","Path analysis","Query parameters","Hash fragments"],comingSoon:!1}]},{name:"Web Development",description:"Essential tools for web developers",tools:[{id:"url-encoder",name:"URL Encoder/Decoder",description:"Encode and decode URLs safely",icon:Ro,features:["URL encode","URL decode","Batch processing","Safe for special characters"],comingSoon:!1},{id:"markdown-preview",name:"Markdown Preview",description:"Preview and write markdown with live formatting",icon:Jt,features:["Live preview","Syntax highlighting","Export to HTML","CommonMark support"],comingSoon:!1},{id:"base64-converter",name:"Base64 Converter",description:"Encode and decode Base64 strings",icon:fa,features:["String to Base64","Base64 to string","File support","Batch conversion"],comingSoon:!1},{id:"css-minifier",name:"CSS Minifier/Beautifier",description:"Minify and format CSS code",icon:Yr,features:["Minify CSS","Beautify CSS","Copy to clipboard","Download result"],comingSoon:!1},{id:"js-minifier",name:"JavaScript Minifier/Beautifier",description:"Minify and format JavaScript code",icon:Yr,features:["Minify JS","Beautify JS","Syntax validation","Copy to clipboard"],comingSoon:!1},{id:"html-encoder",name:"HTML Entity Encoder/Decoder",description:"Convert HTML entities and special characters",icon:Yr,features:["Encode HTML","Decode HTML","Special characters","Unicode support"],comingSoon:!1},{id:"slug-generator",name:"URL Slug Generator",description:"Create URL-friendly slugs from text",icon:Qr,features:["URL-friendly slugs","Custom separators","Lowercase conversion","Special character removal"],comingSoon:!1},{id:"meta-tag-generator",name:"Meta Tag Generator",description:"Generate SEO meta tags for websites",icon:Io,features:["SEO tags","Open Graph","Twitter Cards","JSON-LD structured data"],comingSoon:!1}]},{name:"Encoding & Security",description:"Encoding, decoding, and security tools",tools:[{id:"password-generator",name:"Password Generator",description:"Generate secure and random passwords",icon:kl,features:["Customizable length","Character sets","Password strength","Copy to clipboard"],comingSoon:!1},{id:"qr-code-generator",name:"QR Code Generator",description:"Generate custom QR codes for URLs and text",icon:zi,features:["Custom size and colors","Error correction levels","Download as image","Copy to clipboard"],comingSoon:!1},{id:"hash-generator",name:"Hash Generator",description:"Generate MD5, SHA1, SHA256 hashes",icon:fa,features:["MD5","SHA1","SHA256","SHA512","Multiple formats"],comingSoon:!1},{id:"hash-comparer",name:"Hash Comparer",description:"Compare two hash values for verification",icon:$a,features:["Real-time comparison","Supports all hash types","Detailed analysis","Easy copy/paste"],comingSoon:!1},{id:"jwt-decoder",name:"JWT Decoder",description:"Decode JWT tokens safely",icon:_l,features:["Header decoding","Payload decoding","Signature validation","Pretty print"],comingSoon:!1}]},{name:"Color & Design",description:"Tools for designers and color management",tools:[{id:"color-converter",name:"Color Converter",description:"Convert between different color formats",icon:Ea,features:["HEX to RGB","RGB to HEX","HSL support","Color picker"],comingSoon:!1},{id:"color-palette",name:"Color Palette Generator",description:"Generate harmonious color palettes",icon:Ea,features:["Complementary colors","Triadic palettes","Analogous colors","Export palettes"],comingSoon:!1},{id:"gradient-generator",name:"CSS Gradient Generator",description:"Create CSS gradients with preview",icon:Oi,features:["Linear gradients","Radial gradients","Multiple stops","CSS export"],comingSoon:!1},{id:"css-shadow-generator",name:"CSS Shadow Generator",description:"Generate box-shadow and text-shadow CSS",icon:fl,features:["Box shadows","Text shadows","Multiple shadows","CSS export"],comingSoon:!1},{id:"ascii-art-generator",name:"ASCII Art Generator",description:"Convert text into ASCII art with different styles",icon:yl,features:["Multiple art styles","Real-time preview","Easy export","Character support"],comingSoon:!1}]},{name:"Math & Calculation",description:"Useful calculation and math tools",tools:[{id:"tip-calculator",name:"Tip Calculator",description:"Calculate tips and split bills",icon:No,features:["Tip calculation","Bill splitting","Custom percentages","Tax calculation"],comingSoon:!1},{id:"unit-converter",name:"Unit Converter",description:"Convert between metric and imperial units",icon:xl,features:["Length conversion","Weight conversion","Temperature","Volume conversion"],comingSoon:!1},{id:"percentage-calculator",name:"Percentage Calculator",description:"Calculate percentages and discounts",icon:wo,features:["Percentage calculation","Discount calculator","Tax calculator","Tip calculator"],comingSoon:!1},{id:"bmi-calculator",name:"BMI Calculator",description:"Calculate Body Mass Index",icon:Hi,features:["BMI calculation","Health indicators","Weight categories","Ideal weight range"],comingSoon:!1},{id:"age-calculator",name:"Age Calculator",description:"Calculate exact age from birth date",icon:Ma,features:["Exact age","Years, months, days","Next birthday countdown","Zodiac sign"],comingSoon:!1}]},{name:"Utility Tools",description:"General purpose utility tools",tools:[{id:"random-picker",name:"Random Picker",description:"Random item picker from lists",icon:Co,features:["Random selection","Weighted picks","Multiple items","History tracking"],comingSoon:!1},{id:"cron-generator",name:"Cron Expression Generator",description:"Generate and test cron expressions",icon:Cl,features:["Visual cron builder","Expression testing","Next run times","Presets"],comingSoon:!1},{id:"timestamp-converter",name:"Unix Timestamp Converter",description:"Convert timestamps to human-readable dates",icon:Ma,features:["Unix timestamps","ISO dates","Multiple formats","Current timestamp"],comingSoon:!1}]}];let n=p("All");const c=["All",...i.map(b=>b.name)],d=xt(()=>{let b=i.flatMap(T=>T.tools);if(t(n)!=="All"&&(b=i.find(T=>T.name===t(n))?.tools||[]),t(a)){const T=t(a).toLowerCase();b=b.filter(C=>C.name.toLowerCase().includes(T)||C.description.toLowerCase().includes(T)||C.features.some(B=>B.toLowerCase().includes(T)))}return b});function v(b){b==="json-parser"?vt("/tools/json-parser"):b==="color-converter"?vt("/tools/color-converter"):b==="url-encoder"?vt("/tools/url-encoder"):b==="markdown-preview"?vt("/tools/markdown-preview"):b==="base64-converter"?vt("/tools/base64-converter"):b==="password-generator"?vt("/tools/password-generator"):b==="qr-code-generator"?vt("/tools/qr-code-generator"):b==="text-diff"?vt("/tools/text-diff"):b==="url-parser"?vt("/tools/url-parser"):b==="css-minifier"?vt("/tools/css-minifier"):b==="js-minifier"?vt("/tools/js-minifier"):b==="html-encoder"?vt("/tools/html-encoder"):b==="slug-generator"?vt("/tools/slug-generator"):b==="hash-generator"?vt("/tools/hash-generator"):b==="color-palette"?vt("/tools/color-palette"):b==="gradient-generator"?vt("/tools/gradient-generator"):b==="tip-calculator"?vt("/tools/tip-calculator"):b==="timestamp-converter"?vt("/tools/timestamp-converter"):b==="lorem-ipsum-generator"?vt("/tools/lorem-ipsum-generator"):b==="text-case-converter"?vt("/tools/text-case-converter"):b==="character-counter"?vt("/tools/character-counter"):b==="meta-tag-generator"?vt("/tools/meta-tag-generator"):b==="jwt-decoder"?vt("/tools/jwt-decoder"):b==="css-shadow-generator"?vt("/tools/css-shadow-generator"):b==="unit-converter"?vt("/tools/unit-converter"):b==="percentage-calculator"?vt("/tools/percentage-calculator"):b==="bmi-calculator"?vt("/tools/bmi-calculator"):b==="age-calculator"?vt("/tools/age-calculator"):b==="random-picker"?vt("/tools/random-picker"):b==="cron-generator"?vt("/tools/cron-generator"):b==="hash-comparer"?vt("/tools/hash-comparer"):b==="ascii-art-generator"&&vt("/tools/ascii-art-generator")}var g=Bg(),u=r(g),f=r(u),k=r(f);lc(k,{class:"w-8 h-8"});var h=s(u,2),m=r(h),_=r(m);Ui(_,{class:"w-5 h-5"});var $=s(m,2),M=s(h,2);mt(M,21,()=>c,Nr,(b,T)=>{var C=Lg();C.__click=[Pg,n,T];var B=r(C);Y(()=>{ut(C,1,`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${t(n)===t(T)?"bg-[var(--ds-primary-600)] text-white shadow-md shadow-[var(--ds-primary-500)]/20":"bg-white dark:bg-[var(--ds-secondary-800)] text-[var(--ds-secondary-600)] dark:text-[var(--ds-secondary-400)] hover:bg-[var(--ds-secondary-50)] dark:hover:bg-[var(--ds-secondary-700)] border border-[var(--ds-secondary-200)] dark:border-[var(--ds-secondary-700)]"}`),y(B,t(T))}),x(b,C)});var E=s(M,2);{var R=b=>{var T=Ag(),C=r(T),B=r(C);Ui(B,{class:"w-8 h-8"}),x(b,T)},V=b=>{var T=Rg();mt(T,21,()=>t(d),C=>C.id,(C,B)=>{var z=Ig();z.__click=[jg,v,B];var te=r(z),ue=r(te),de=r(ue),xe=r(de);nr(xe,()=>t(B).icon,(je,Le)=>{Le(je,{class:"w-6 h-6"})});var ce=s(de,2);{var fe=je=>{var Le=Ng();x(je,Le)};H(ce,je=>{t(B).popular&&je(fe)})}var Be=s(ue,2),Ve=r(Be),Ye=s(Be,2),Qe=r(Ye),We=s(Ye,2),ze=s(r(We));ul(ze,{class:"w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200"}),Y(()=>{y(Ve,t(B).name),y(Qe,t(B).description)}),x(C,z)}),x(b,T)};H(E,b=>{t(d).length===0?b(R):b(V,!1)})}Se($,()=>t(a),b=>l(a,b)),x(o,g),Re()}yt(["click"]);function Fg(o,e,a,i){try{if(!t(e).trim()){l(a,"Please enter some JSON to format");return}const n=JSON.parse(t(e));l(i,JSON.stringify(n,null,2),!0),l(a,""),Ht.success("JSON formatted successfully")}catch(n){l(a,n.message,!0),Ht.error("Invalid JSON")}}function Hg(o,e,a,i){try{if(!t(e).trim()){l(a,"Please enter some JSON to minify");return}const n=JSON.parse(t(e));l(i,JSON.stringify(n),!0),l(a,""),Ht.success("JSON minified successfully")}catch(n){l(a,n.message,!0),Ht.error("Invalid JSON")}}function Og(o,e){t(e)&&(navigator.clipboard.writeText(t(e)),Ht.success("Copied to clipboard"))}function zg(o,e,a,i){l(e,""),l(a,""),l(i,""),Ht.success("Cleared all content")}function Ug(o,e,a,i){l(e,JSON.stringify({name:"FarizInk",role:"Developer",skills:["Svelte","TypeScript","Tailwind"],active:!0,projects:{total:42,featured:["Portfolio","Tools"]}},null,2),!0),l(a,""),l(i,"")}function qg(){vt("/tools")}var Gg=w('<div class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-2"><!> <p class="text-sm text-red-700 dark:text-red-300"> </p></div>'),Wg=w('<div class="max-w-6xl mx-auto p-6 animate-fade-in"><div class="mb-8"><div class="flex items-center gap-4 mb-6"><button class="btn btn-outline btn-sm"><!> Back to Tools</button></div> <div class="text-center mb-12"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl mb-6 shadow-lg animate-scale-in"><!></div> <h1 class="text-4xl md:text-5xl font-bold text-[var(--ds-secondary-900)] dark:text-white mb-4 tracking-tight">JSON Parser</h1> <p class="text-xl text-[var(--ds-secondary-600)] dark:text-[var(--ds-secondary-400)] max-w-2xl mx-auto leading-relaxed">Parse, validate, format, and minify JSON data with syntax highlighting and error detection.</p></div></div> <div class="mb-8 flex flex-wrap gap-2 items-center justify-center bg-white/50 dark:bg-white/5 p-4 rounded-2xl border border-[var(--ds-secondary-200)] dark:border-[var(--ds-secondary-800)]"><button class="btn btn-outline btn-sm">Load Sample</button> <button class="btn btn-outline btn-sm text-red-500 hover:text-red-600"><!> Clear</button></div> <div class="mb-16"><div class="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full"><div class="flex flex-col gap-4"><div class="flex items-center justify-between"><h3 class="text-sm font-medium text-[var(--ds-secondary-700)] dark:text-[var(--ds-secondary-300)]">Input JSON</h3> <div class="flex gap-2"><button class="btn btn-primary btn-sm">Format</button> <button class="btn btn-secondary btn-sm">Minify</button></div></div> <textarea placeholder="Paste your JSON here..." class="textarea font-mono text-sm h-[400px] lg:h-[600px]"></textarea> <!></div> <div class="flex flex-col gap-4"><div class="flex items-center justify-between"><h3 class="text-sm font-medium text-[var(--ds-secondary-700)] dark:text-[var(--ds-secondary-300)]">Output</h3> <button class="btn btn-outline btn-sm"><!> Copy</button></div> <div class="relative h-[400px] lg:h-[600px]"><textarea readonly="" class="textarea font-mono text-sm h-full" placeholder="Result will appear here..."></textarea></div></div></div></div> <div class="grid grid-cols-1 md:grid-cols-3 gap-6"><div class="card"><div class="flex items-center gap-2 mb-2 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"><!> <h3 class="font-medium">Validation</h3></div> <p class="text-sm text-[var(--ds-secondary-600)] dark:text-[var(--ds-secondary-400)]">Instantly validates your JSON and provides helpful error messages for invalid syntax.</p></div> <div class="card"><div class="flex items-center gap-2 mb-2 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"><!> <h3 class="font-medium">Formatting</h3></div> <p class="text-sm text-[var(--ds-secondary-600)] dark:text-[var(--ds-secondary-400)]">Beautify minified JSON with proper indentation or minify it for production use.</p></div> <div class="card"><div class="flex items-center gap-2 mb-2 text-[var(--ds-primary-600)] dark:text-[var(--ds-primary-400)]"><!> <h3 class="font-medium">Privacy</h3></div> <p class="text-sm text-[var(--ds-secondary-600)] dark:text-[var(--ds-secondary-400)]">All processing happens in your browser. No data is sent to any server.</p></div></div></div>');function Jg(o,e){Ie(e,!0);let a=p(""),i=p(""),n=p("");var c=Wg(),d=r(c),v=r(d),g=r(v);g.__click=[qg];var u=r(g);jt(u,{class:"w-4 h-4 mr-2"});var f=s(v,2),k=r(f),h=r(k);pl(h,{class:"w-10 h-10 text-white"});var m=s(d,2),_=r(m);_.__click=[Ug,a,n,i];var $=s(_,2);$.__click=[zg,a,i,n];var M=r($);Ko(M,{class:"w-4 h-4 mr-2"});var E=s(m,2),R=r(E),V=r(R),b=r(V),T=s(r(b),2),C=r(T);C.__click=[Fg,a,n,i];var B=s(C,2);B.__click=[Hg,a,n,i];var z=s(b,2),te=s(z,2);{var ue=oe=>{var j=Gg(),be=r(j);ns(be,{class:"w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5"});var ve=s(be,2),U=r(ve);Y(()=>y(U,t(n))),x(oe,j)};H(te,oe=>{t(n)&&oe(ue)})}var de=s(V,2),xe=r(de),ce=s(r(xe),2);ce.__click=[Og,i];var fe=r(ce);ht(fe,{class:"w-4 h-4 mr-2"});var Be=s(xe,2),Ve=r(Be),Ye=s(E,2),Qe=r(Ye),We=r(Qe),ze=r(We);xa(ze,{class:"w-5 h-5"});var je=s(Qe,2),Le=r(je),Ce=r(Le);xa(Ce,{class:"w-5 h-5"});var re=s(je,2),Te=r(re),me=r(Te);xa(me,{class:"w-5 h-5"}),Y(()=>{C.disabled=!t(a),B.disabled=!t(a),ce.disabled=!t(i),ll(Ve,t(i))}),Se(z,()=>t(a),oe=>l(a,oe)),x(o,c),Re()}yt(["click"]);function Ds(o,e,a,i,n,c,d,v,g,u,f){const k=e(t(a).h,t(a).s,t(a).l);l(i,k,!0),l(n,c(k.r,k.g,k.b),!0),l(d,v(k.r,k.g,k.b),!0),l(g,u(k.r,k.g,k.b),!0),f(t(n),"HSL")}function Vg(o,e,a){const i=Math.floor(Math.random()*256),n=Math.floor(Math.random()*256),c=Math.floor(Math.random()*256);l(e,{r:i,g:n,b:c},!0),a(),Ht.success("Generated random color")}function Yg(){vt("/tools")}var Kg=w('<div class="flex flex-col items-center justify-center h-48 text-gray-500 dark:text-gray-400"><!> <p>No colors yet. Start converting!</p></div>'),Qg=(o,e,a,i)=>{l(e,t(a).color,!0),i()},Zg=w('<div class="group relative"><button type="button" class="w-full h-12 rounded-lg cursor-pointer border-2 border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-400 transition-colors"></button> <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10"> </div></div>'),Xg=w('<div class="grid grid-cols-5 gap-2"></div>'),eu=(o,e,a)=>e(t(a),"HEX"),tu=w('<div class="flex items-center gap-2"><label class="w-8 text-sm font-medium text-gray-700 dark:text-gray-300 uppercase"> </label> <input type="range" min="0" max="255" class="flex-1 accent-purple-500"/> <input type="number" min="0" max="255" class="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"/></div>'),ru=(o,e,a)=>e(`rgb(${t(a).r}, ${t(a).g}, ${t(a).b})`,"RGB"),au=w('<div class="flex items-center gap-2"><label class="w-8 text-sm font-medium text-gray-700 dark:text-gray-300 uppercase"> </label> <input type="range" min="0" class="flex-1 accent-purple-500"/> <input type="number" min="0" class="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"/></div>'),ou=(o,e,a)=>e(`hsl(${t(a).h}, ${t(a).s}%, ${t(a).l}%)`,"HSL"),iu=(o,e,a)=>e(`hsv(${t(a).h}, ${t(a).s}%, ${t(a).v}%)`,"HSV"),su=w('<div class="flex justify-between text-sm"><span class="text-gray-600 dark:text-gray-400 uppercase"> </span> <span class="font-mono text-gray-900 dark:text-white"> </span></div>'),nu=(o,e,a)=>e(`cmyk(${t(a).c}%, ${t(a).m}%, ${t(a).y}%, ${t(a).k}%)`,"CMYK"),lu=w('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Color Converter</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Convert between different color formats instantly. Perfect for designers and developers.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Color Converter</li></ol></nav> <div class="mb-6 flex justify-center"><button class="btn btn-primary btn-sm"><!> Random Color</button></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-8"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Color Preview</h2> <div class="w-full h-48 rounded-xl shadow-inner mb-4 transition-colors duration-300"></div> <div class="grid grid-cols-2 gap-4 text-sm"><div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><span class="text-gray-600 dark:text-gray-400">HEX:</span> <span class="font-mono text-gray-900 dark:text-white ml-2"> </span></div> <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><span class="text-gray-600 dark:text-gray-400">RGB:</span> <span class="font-mono text-gray-900 dark:text-white ml-2"> </span></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Colors</h2> <!></div></div> <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-8"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">HEX</h3> <div class="flex gap-2"><input class="input font-mono" placeholder="#000000"/> <button class="btn btn-secondary btn-sm"><!></button></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">RGB</h3> <div class="space-y-3"><!> <button class="btn btn-secondary w-full mt-2">Copy RGB</button></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">HSL</h3> <div class="space-y-3"><!> <button class="btn btn-secondary w-full mt-2">Copy HSL</button></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">HSV</h3> <div class="space-y-2"><div class="flex justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Hue:</span> <span class="font-mono text-gray-900 dark:text-white"> </span></div> <div class="flex justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Saturation:</span> <span class="font-mono text-gray-900 dark:text-white"> </span></div> <div class="flex justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Value:</span> <span class="font-mono text-gray-900 dark:text-white"> </span></div> <button class="btn btn-secondary w-full mt-4">Copy HSV</button></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">CMYK</h3> <div class="space-y-2"><!> <button class="btn btn-secondary w-full mt-4">Copy CMYK</button></div></div></div> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"><div class="flex items-center gap-2 mb-2 text-purple-600 dark:text-purple-400"><!> <h3 class="font-medium">Multiple Formats</h3></div> <p class="text-sm text-gray-600 dark:text-gray-400">Support for HEX, RGB, HSL, HSV, and CMYK color formats</p></div> <div class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"><div class="flex items-center gap-2 mb-2 text-purple-600 dark:text-purple-400"><!> <h3 class="font-medium">Live Conversion</h3></div> <p class="text-sm text-gray-600 dark:text-gray-400">Real-time color conversion as you type or adjust sliders</p></div> <div class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"><div class="flex items-center gap-2 mb-2 text-purple-600 dark:text-purple-400"><!> <h3 class="font-medium">Color History</h3></div> <p class="text-sm text-gray-600 dark:text-gray-400">Keep track of your recently used colors for quick access</p></div></div></div>');function du(o,e){Ie(e,!0);let a=p("#3B82F6"),i=p(Lt({r:59,g:130,b:246})),n=p(Lt({h:217,s:91,l:60})),c=p(Lt({h:217,s:76,v:96})),d=p(Lt({c:76,m:47,y:0,k:4})),v=p(Lt([]));function g(ie){const ye=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(ie);return ye?{r:parseInt(ye[1],16),g:parseInt(ye[2],16),b:parseInt(ye[3],16)}:null}function u(ie,ye,Ae){return"#"+((1<<24)+(ie<<16)+(ye<<8)+Ae).toString(16).slice(1).toUpperCase()}function f(ie,ye,Ae){ie/=255,ye/=255,Ae/=255;const Je=Math.max(ie,ye,Ae),Xe=Math.min(ie,ye,Ae);let Ke=0,tt=0,dt=(Je+Xe)/2;if(Je!==Xe){const qe=Je-Xe;switch(tt=dt>.5?qe/(2-Je-Xe):qe/(Je+Xe),Je){case ie:Ke=((ye-Ae)/qe+(ye<Ae?6:0))/6;break;case ye:Ke=((Ae-ie)/qe+2)/6;break;case Ae:Ke=((ie-ye)/qe+4)/6;break}}return{h:Math.round(Ke*360),s:Math.round(tt*100),l:Math.round(dt*100)}}function k(ie,ye,Ae){ie/=360,ye/=100,Ae/=100;let Je,Xe,Ke;if(ye===0)Je=Xe=Ke=Ae;else{const tt=(lt,ct,at)=>(at<0&&(at+=1),at>1&&(at-=1),at<.16666666666666666?lt+(ct-lt)*6*at:at<.5?ct:at<.6666666666666666?lt+(ct-lt)*(.6666666666666666-at)*6:lt),dt=Ae<.5?Ae*(1+ye):Ae+ye-Ae*ye,qe=2*Ae-dt;Je=tt(qe,dt,ie+1/3),Xe=tt(qe,dt,ie),Ke=tt(qe,dt,ie-1/3)}return{r:Math.round(Je*255),g:Math.round(Xe*255),b:Math.round(Ke*255)}}function h(ie,ye,Ae){ie/=255,ye/=255,Ae/=255;const Je=Math.max(ie,ye,Ae),Xe=Math.min(ie,ye,Ae);let Ke=0,tt=0,dt=Je;const qe=Je-Xe;if(tt=Je===0?0:qe/Je,Je!==Xe)switch(Je){case ie:Ke=((ye-Ae)/qe+(ye<Ae?6:0))/6;break;case ye:Ke=((Ae-ie)/qe+2)/6;break;case Ae:Ke=((ie-ye)/qe+4)/6;break}return{h:Math.round(Ke*360),s:Math.round(tt*100),v:Math.round(dt*100)}}function m(ie,ye,Ae){let Je=1-ie/255,Xe=1-ye/255,Ke=1-Ae/255,tt=Math.min(Je,Math.min(Xe,Ke));return tt===1?Je=Xe=Ke=0:(Je=(Je-tt)/(1-tt),Xe=(Xe-tt)/(1-tt),Ke=(Ke-tt)/(1-tt)),{c:Math.round(Je*100),m:Math.round(Xe*100),y:Math.round(Ke*100),k:Math.round(tt*100)}}function _(){const ie=g(t(a));ie&&(l(i,ie,!0),l(n,f(ie.r,ie.g,ie.b),!0),l(c,h(ie.r,ie.g,ie.b),!0),l(d,m(ie.r,ie.g,ie.b),!0),E(t(a),"HEX"))}function $(){l(a,u(t(i).r,t(i).g,t(i).b),!0),l(n,f(t(i).r,t(i).g,t(i).b),!0),l(c,h(t(i).r,t(i).g,t(i).b),!0),l(d,m(t(i).r,t(i).g,t(i).b),!0),E(t(a),"RGB")}function M(ie,ye){navigator.clipboard.writeText(ie),Ht.success(`Copied ${ye} value`)}function E(ie,ye){t(v).length>0&&t(v)[0].color===ie||(t(v).unshift({color:ie,format:ye,timestamp:new Date}),t(v).length>10&&l(v,t(v).slice(0,10),!0))}var R=lu(),V=r(R),b=r(V),T=r(b);T.__click=[Yg];var C=r(T);jt(C,{class:"w-5 h-5"});var B=s(b,2),z=r(B),te=r(z);Ea(te,{class:"w-10 h-10 text-white"});var ue=s(V,4),de=r(ue);de.__click=[Vg,i,$];var xe=r(de);ta(xe,{class:"w-4 h-4 mr-2"});var ce=s(ue,2),fe=r(ce),Be=s(r(fe),2),Ve=s(Be,2),Ye=r(Ve),Qe=s(r(Ye),2),We=r(Qe),ze=s(Ye,2),je=s(r(ze),2),Le=r(je),Ce=s(fe,2),re=s(r(Ce),2);{var Te=ie=>{var ye=Kg(),Ae=r(ye);Ka(Ae,{class:"w-8 h-8 mb-2 opacity-50"}),x(ie,ye)},me=ie=>{var ye=Xg();mt(ye,21,()=>t(v),Ae=>Ae.timestamp.getTime(),(Ae,Je)=>{var Xe=Zg(),Ke=r(Xe);Ke.__click=[Qg,a,Je,_];var tt=s(Ke,2),dt=r(tt);Y(()=>{Yt(Ke,`background-color: ${t(Je).color??""}`),De(Ke,"aria-label",`Select color ${t(Je).color}`),y(dt,t(Je).color)}),x(Ae,Xe)}),x(ie,ye)};H(re,ie=>{t(v).length===0?ie(Te):ie(me,!1)})}var oe=s(ce,2),j=r(oe),be=s(r(j),2),ve=r(be);ve.__input=_;var U=s(ve,2);U.__click=[eu,M,a];var X=r(U);ht(X,{class:"w-4 h-4"});var he=s(j,2),pe=s(r(he),2),ke=r(pe);mt(ke,16,()=>["r","g","b"],Nr,(ie,ye)=>{var Ae=tu(),Je=r(Ae),Xe=r(Je),Ke=s(Je,2);Ke.__input=$;var tt=s(Ke,2);tt.__input=$,Y(()=>{De(Je,"for",`rgb-${ye}`),y(Xe,`${ye??""}:`),De(Ke,"id",`rgb-${ye}`)}),Se(Ke,()=>t(i)[ye],dt=>t(i)[ye]=dt),Se(tt,()=>t(i)[ye],dt=>t(i)[ye]=dt),x(ie,Ae)});var Ue=s(ke,2);Ue.__click=[ru,M,i];var Oe=s(he,2),Ne=s(r(Oe),2),Pe=r(Ne);mt(Pe,16,()=>["h","s","l"],Nr,(ie,ye)=>{var Ae=au(),Je=r(Ae),Xe=r(Je),Ke=s(Je,2);Ke.__input=[Ds,k,n,i,a,u,c,h,d,m,E];var tt=s(Ke,2);tt.__input=[Ds,k,n,i,a,u,c,h,d,m,E],Y(()=>{De(Je,"for",`hsl-${ye}`),y(Xe,`${ye??""}:`),De(Ke,"id",`hsl-${ye}`),De(Ke,"max",ye==="h"?360:100),De(tt,"max",ye==="h"?360:100)}),Se(Ke,()=>t(n)[ye],dt=>t(n)[ye]=dt),Se(tt,()=>t(n)[ye],dt=>t(n)[ye]=dt),x(ie,Ae)});var se=s(Pe,2);se.__click=[ou,M,n];var _e=s(Oe,2),q=s(r(_e),2),Q=r(q),G=s(r(Q),2),P=r(G),L=s(Q,2),N=s(r(L),2),ae=r(N),ee=s(L,2),K=s(r(ee),2),O=r(K),I=s(ee,2);I.__click=[iu,M,c];var S=s(_e,2),D=s(r(S),2),F=r(D);mt(F,16,()=>["c","m","y","k"],Nr,(ie,ye)=>{var Ae=su(),Je=r(Ae),Xe=r(Je),Ke=s(Je,2),tt=r(Ke);Y(()=>{y(Xe,`${(ye==="k"?"Key (Black)":ye)??""}:`),y(tt,`${t(d)[ye]??""}%`)}),x(ie,Ae)});var Z=s(F,2);Z.__click=[nu,M,d];var A=s(oe,2),ne=r(A),Me=r(ne),Ge=r(Me);Ea(Ge,{class:"w-5 h-5"});var $e=s(ne,2),W=r($e),le=r(W);Kt(le,{class:"w-5 h-5"});var we=s($e,2),Fe=r(we),J=r(Fe);Ka(J,{class:"w-5 h-5"}),Y(()=>{Yt(Be,`background-color: ${t(a)??""}`),y(We,t(a)),y(Le,`${t(i).r??""}, ${t(i).g??""}, ${t(i).b??""}`),y(P,`${t(c).h??""}°`),y(ae,`${t(c).s??""}%`),y(O,`${t(c).v??""}%`)}),Se(ve,()=>t(a),ie=>l(a,ie)),x(o,R),Re()}yt(["click","input"]);function cu(o,e,a,i){try{l(e,decodeURIComponent(t(a)),!0),l(i,encodeURIComponent(t(e)),!0)}catch{l(e,"Error: Invalid URL encoding"),l(i,"")}}function vu(o,e,a){try{const i=t(e).split(`
`).filter(n=>n.trim());l(a,i.map(n=>{try{const c=encodeURIComponent(n),d=decodeURIComponent(c);return{original:n,encoded:c,decoded:d}}catch{return{original:n,encoded:"Error: Invalid characters",decoded:"Error: Invalid characters"}}}),!0)}catch{l(a,[],!0)}}function gu(o,e,a,i,n,c){l(e,""),l(a,""),l(i,""),l(n,""),l(c,[],!0)}function uu(o,e,a){const i=t(e).map(n=>`Original: ${n.original}
Encoded: ${n.encoded}
Decoded: ${n.decoded}
`).join(`
`);a(i,"batch")}function xu(o,e){l(e,`https://example.com/search?q=hello world&category=web development
https://test.com/path/to/file?name=John Doe&age=30&city=New York
https://api.example.com/users?filter=name eq "John Smith"&sort=created_at desc
https://site.com/page?param=value with spaces&another=special!@#$%^&*()chars
https://demo.com/search?query=测试&lang=zh-CN`)}function fu(){vt("/tools")}var bu=(o,e)=>l(e,"single"),pu=(o,e)=>l(e,"batch"),mu=w('<button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">Encode URL</button> <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Decode URL</button>',1),hu=w('<button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">Process Batch</button> <button class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">Load Sample URLs</button>',1),yu=(o,e,a)=>{l(e,"https://example.com/search?q=hello world&category=web development"),a()},_u=(o,e,a)=>{l(e,"https://test.com/path?name=John Doe&city=New York"),a()},ku=(o,e,a)=>{l(e,"https://site.com/search?q=测试&lang=zh-CN"),a()},wu=(o,e,a)=>e(t(a),"encoded"),Cu=w('<button class="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"> </button>'),$u=w('<div class="absolute inset-0 flex items-center justify-center pointer-events-none"><p class="text-gray-400 dark:text-gray-600">Enter text above to see encoded result</p></div>'),Su=(o,e,a)=>e(t(a),"decoded"),Tu=w('<button class="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"> </button>'),Mu=w('<div class="absolute inset-0 flex items-center justify-center pointer-events-none"><p class="text-gray-400 dark:text-gray-600">Round-trip test result will appear here</p></div>'),Eu=w('<div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Input Text / URL</h2> <span class="text-sm text-gray-500 dark:text-gray-400"> </span></div> <textarea placeholder="Enter text or URL to encode/decode..." class="w-full h-64 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent"></textarea> <div class="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quick Examples:</p> <div class="space-y-1"><button class="block w-full text-left text-sm text-green-600 dark:text-green-400 hover:underline">Query parameters with spaces</button> <button class="block w-full text-left text-sm text-green-600 dark:text-green-400 hover:underline">Multiple parameters with special characters</button> <button class="block w-full text-left text-sm text-green-600 dark:text-green-400 hover:underline">International characters (Chinese)</button></div></div></div> <div><div class="mb-4"><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Encoded URL</h2> <!></div> <div class="relative"><textarea placeholder="Encoded URL will appear here..." class="w-full h-28 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none"></textarea> <!></div></div> <div><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Decoded URL (Round-trip)</h2> <!></div> <div class="relative"><textarea placeholder="Decoded URL will appear here..." class="w-full h-28 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none"></textarea> <!></div></div></div></div>'),Pu=w('<button class="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"> </button>'),Lu=w('<div class="flex items-center justify-center h-full"><p class="text-gray-400 dark:text-gray-600">Process batch URLs to see results</p></div>'),Au=w('<div class="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0"><div class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> </div> <div class="space-y-2"><div><span class="text-xs font-medium text-gray-500 dark:text-gray-400">Original:</span> <div class="font-mono text-xs text-gray-900 dark:text-white break-all"> </div></div> <div><span class="text-xs font-medium text-green-600 dark:text-green-400">Encoded:</span> <div class="font-mono text-xs text-green-700 dark:text-green-300 break-all"> </div></div> <div><span class="text-xs font-medium text-blue-600 dark:text-blue-400">Decoded:</span> <div class="font-mono text-xs text-blue-700 dark:text-blue-300 break-all"> </div></div></div></div>'),ju=w('<div class="space-y-4"></div>'),Nu=w('<div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Batch Input (one URL per line)</h2> <span class="text-sm text-gray-500 dark:text-gray-400"> </span></div> <textarea placeholder="Enter multiple URLs or text strings, one per line..." class="w-full h-96 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent"></textarea></div> <div><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Batch Results</h2> <!></div> <div class="h-96 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 p-4"><!></div></div></div>'),Iu=w(`<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">URL Encoder/Decoder</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Encode and decode URLs safely. Perfect for handling special characters and international
        content.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">URL Encoder/Decoder</li></ol></nav> <div class="mb-6"><div class="flex justify-center"><div class="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1"><button>Single URL</button> <button>Batch Processing</button></div></div></div> <div class="mb-6 flex flex-wrap gap-4 items-center justify-center"><!> <button class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">Clear All</button></div> <!> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Safe Encoding</h3> <p class="text-gray-600 dark:text-gray-400">Properly encodes special characters, spaces, and international characters for safe URL
        transmission</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Batch Processing</h3> <p class="text-gray-600 dark:text-gray-400">Process multiple URLs at once with batch mode for efficient workflow</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Round-trip Testing</h3> <p class="text-gray-600 dark:text-gray-400">Automatic round-trip testing ensures your URLs decode back to the original text</p></div></div></div>`);function Ru(o,e){Ie(e,!0);let a=p(""),i=p(""),n=p(""),c=p(""),d=p(Lt([])),v=p(""),g=p("single");function u(){try{l(i,encodeURIComponent(t(a)),!0),l(n,decodeURIComponent(t(i)),!0)}catch{l(i,""),l(n,"")}}function f(me,oe){navigator.clipboard.writeText(me),l(v,oe,!0),setTimeout(()=>{l(v,"")},2e3)}Ct(()=>{t(a)&&t(g)==="single"&&u()});var k=Iu(),h=r(k),m=r(h),_=r(m);_.__click=[fu];var $=r(_);jt($,{class:"w-5 h-5"});var M=s(m,2),E=r(M),R=r(E);Ro(R,{class:"w-10 h-10 text-white"});var V=s(h,4),b=r(V),T=r(b),C=r(T);C.__click=[bu,g];var B=s(C,2);B.__click=[pu,g];var z=s(V,2),te=r(z);{var ue=me=>{var oe=mu(),j=ge(oe);j.__click=u;var be=s(j,2);be.__click=[cu,n,a,i],x(me,oe)},de=me=>{var oe=hu(),j=ge(oe);j.__click=[vu,c,d];var be=s(j,2);be.__click=[xu,c],x(me,oe)};H(te,me=>{t(g)==="single"?me(ue):me(de,!1)})}var xe=s(te,2);xe.__click=[gu,a,i,n,c,d];var ce=s(z,2);{var fe=me=>{var oe=Eu(),j=r(oe),be=r(j),ve=s(r(be),2),U=r(ve),X=s(be,2),he=s(X,2),pe=s(r(he),2),ke=r(pe);ke.__click=[yu,a,u];var Ue=s(ke,2);Ue.__click=[_u,a,u];var Oe=s(Ue,2);Oe.__click=[ku,a,u];var Ne=s(j,2),Pe=r(Ne),se=r(Pe),_e=s(r(se),2);{var q=F=>{var Z=Cu();Z.__click=[wu,f,i];var A=r(Z);Y(()=>y(A,t(v)==="encoded"?"✓ Copied!":"Copy")),x(F,Z)};H(_e,F=>{t(i)&&F(q)})}var Q=s(se,2),G=r(Q),P=s(G,2);{var L=F=>{var Z=$u();x(F,Z)};H(P,F=>{t(i)||F(L)})}var N=s(Pe,2),ae=r(N),ee=s(r(ae),2);{var K=F=>{var Z=Tu();Z.__click=[Su,f,n];var A=r(Z);Y(()=>y(A,t(v)==="decoded"?"✓ Copied!":"Copy")),x(F,Z)};H(ee,F=>{t(n)&&F(K)})}var O=s(ae,2),I=r(O),S=s(I,2);{var D=F=>{var Z=Mu();x(F,Z)};H(S,F=>{t(n)||F(D)})}Y(()=>y(U,`${t(a).length??""} characters`)),Se(X,()=>t(a),F=>l(a,F)),Se(G,()=>t(i),F=>l(i,F)),Se(I,()=>t(n),F=>l(n,F)),x(me,oe)},Be=me=>{var oe=Nu(),j=r(oe),be=r(j),ve=s(r(be),2),U=r(ve),X=s(be,2),he=s(j,2),pe=r(he),ke=s(r(pe),2);{var Ue=_e=>{var q=Pu();q.__click=[uu,d,f];var Q=r(q);Y(()=>y(Q,t(v)==="batch"?"✓ Copied!":"Copy All")),x(_e,q)};H(ke,_e=>{t(d).length>0&&_e(Ue)})}var Oe=s(pe,2),Ne=r(Oe);{var Pe=_e=>{var q=Lu();x(_e,q)},se=_e=>{var q=ju();mt(q,23,()=>t(d),(Q,G)=>Q.original+G,(Q,G,P)=>{var L=Au(),N=r(L),ae=r(N),ee=s(N,2),K=r(ee),O=s(r(K),2),I=r(O),S=s(K,2),D=s(r(S),2),F=r(D),Z=s(S,2),A=s(r(Z),2),ne=r(A);Y(()=>{y(ae,`#${t(P)+1}`),y(I,t(G).original),y(F,t(G).encoded),y(ne,t(G).decoded)}),x(Q,L)}),x(_e,q)};H(Ne,_e=>{t(d).length===0?_e(Pe):_e(se,!1)})}Y(_e=>y(U,`${_e??""} URLs`),[()=>t(c).split(`
`).filter(_e=>_e.trim()).length]),Se(X,()=>t(c),_e=>l(c,_e)),x(me,oe)};H(ce,me=>{t(g)==="single"?me(fe):me(Be,!1)})}var Ve=s(ce,2),Ye=r(Ve),Qe=r(Ye),We=r(Qe);ls(We,{class:"w-6 h-6 text-green-600 dark:text-green-400"});var ze=s(Ye,2),je=r(ze),Le=r(je);Kt(Le,{class:"w-6 h-6 text-green-600 dark:text-green-400"});var Ce=s(ze,2),re=r(Ce),Te=r(re);H0(Te,{class:"w-6 h-6 text-green-600 dark:text-green-400"}),Y(()=>{ut(C,1,`px-4 py-2 rounded-md text-sm font-medium transition-colors ${t(g)==="single"?"bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300":"text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"}`),ut(B,1,`px-4 py-2 rounded-md text-sm font-medium transition-colors ${t(g)==="batch"?"bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300":"text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"}`)}),x(o,k),Re()}yt(["click"]);function Bu(o,e,a,i){l(e,""),l(a,""),i()}function Du(o,e,a){navigator.clipboard.writeText(t(e)),l(a,"html"),setTimeout(()=>{l(a,"")},2e3)}function Fu(o,e,a){navigator.clipboard.writeText(t(e)),l(a,"markdown"),setTimeout(()=>{l(a,"")},2e3)}function Hu(o,e,a){l(e,`# Project Documentation

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

*Last updated: `+new Date().toLocaleDateString()+"*"),a()}function Ou(){vt("/tools")}var zu=w(`<div class="max-w-7xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Markdown Preview</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Preview and write markdown with live formatting. Perfect for documentation and content
        creation.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Markdown Preview</li></ol></nav> <div class="mb-6 flex flex-wrap gap-4 items-center justify-center"><button class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">Load Sample</button> <button class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">Clear All</button> <button class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"> </button> <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"> </button> <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">Export HTML</button></div> <div class="mb-6 flex justify-center gap-6 text-sm text-gray-600 dark:text-gray-400"><div class="flex items-center gap-1"><!> <span> </span></div> <div class="flex items-center gap-1"><!> <span> </span></div> <div class="flex items-center gap-1"><!> <span> </span></div></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"><div class="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600"><div class="flex items-center justify-between"><h2 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2"><!> Markdown Editor</h2> <span class="text-sm text-gray-500 dark:text-gray-400">.md</span></div></div> <div class="p-6"><textarea placeholder="Start typing your markdown here..." class="w-full h-96 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"></textarea></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"><div class="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600"><div class="flex items-center justify-between"><h2 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2"><!> Live Preview</h2> <span class="text-sm text-gray-500 dark:text-gray-400">HTML</span></div></div> <div class="p-6 h-96 overflow-y-auto"><div class="prose prose-sm sm:prose-base dark:prose-invert max-w-none"><!></div></div></div></div> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Live Preview</h3> <p class="text-gray-600 dark:text-gray-400">Real-time markdown rendering as you type with instant visual feedback</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Syntax Highlighting</h3> <p class="text-gray-600 dark:text-gray-400">Beautiful code blocks with syntax highlighting for multiple programming languages</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Export Options</h3> <p class="text-gray-600 dark:text-gray-400">Export your markdown as styled HTML with one click for easy sharing</p></div></div></div>`);function Uu(o,e){Ie(e,!0);let a=p(`# Welcome to Markdown Preview

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

Happy markdown editing! 🎉`),i=p(""),n=p(""),c=p(0),d=p(0),v=p(0);function g(I){let S=I;S=S.replace(/^### (.*$)/gim,'<h3 class="text-xl font-semibold mb-3 mt-6">$1</h3>'),S=S.replace(/^## (.*$)/gim,'<h2 class="text-2xl font-semibold mb-4 mt-8">$1</h2>'),S=S.replace(/^# (.*$)/gim,'<h1 class="text-3xl font-bold mb-6 mt-8">$1</h1>'),S=S.replace(/\*\*(.+?)\*\*/g,'<strong class="font-semibold">$1</strong>'),S=S.replace(/\*(.+?)\*/g,'<em class="italic">$1</em>'),S=S.replace(/_(.+?)_/g,'<em class="italic">$1</em>'),S=S.replace(/~~(.+?)~~/g,'<del class="line-through">$1</del>'),S=S.replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>'),S=S.replace(/`([^`]+)`/g,'<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono text-red-600 dark:text-red-400">$1</code>'),S=S.replace(/```(\w+)?\n([\s\S]*?)```/g,(Z,A,ne)=>`<div class="bg-gray-900 text-gray-100 rounded-lg p-4 my-4 overflow-x-auto">
        <div class="text-xs text-gray-400 mb-2 font-mono">${A||"text"}</div>
        <pre class="font-mono text-sm"><code>${u(ne.trim())}</code></pre>
      </div>`),S=S.replace(/^> (.*$)/gim,'<blockquote class="border-l-4 border-gray-300 dark:border-gray-600 pl-4 py-2 my-4 italic text-gray-700 dark:text-gray-300">$1</blockquote>'),S=S.replace(/^> (.+?)\n> (.+?)\n> (.+?)$/gim,'<blockquote class="border-l-4 border-gray-300 dark:border-gray-600 pl-4 py-2 my-4 italic text-gray-700 dark:text-gray-300">$1<br>$2<br>$3</blockquote>'),S=S.replace(/^\* (.+)$/gim,'<li class="ml-4">• $1</li>'),S=S.replace(/^- (.+)$/gim,'<li class="ml-4">• $1</li>'),S=S.replace(/^\d+\. (.+)$/gim,'<li class="ml-4 list-decimal list-inside">$1</li>'),S=S.replace(/^---$/gim,'<hr class="my-8 border-gray-300 dark:border-gray-600">'),S=S.replace(/^\*\*\*$/gim,'<hr class="my-8 border-gray-300 dark:border-gray-600">'),S=S.replace(/\n\n/g,'</p><p class="mb-4">'),S='<p class="mb-4">'+S+"</p>",S=S.replace(/<p class="mb-4"><\/p>/g,""),S=S.replace(/<p class="mb-4"><h/g,"<h"),S=S.replace(/<\/h[1-6]><\/p>/g,"</h$1>"),S=S.replace(/<p class="mb-4"><blockquote/g,"<blockquote"),S=S.replace(/<\/blockquote><\/p>/g,"</blockquote>"),S=S.replace(/<p class="mb-4"><div/g,"<div"),S=S.replace(/<\/div><\/p>/g,"</div>"),S=S.replace(/<p class="mb-4"><hr/g,"<hr"),S=S.replace(/<\/p><li/g,"<li"),S=S.replace(/<\/li><\/p>/g,"</li>"),S=S.replace(/\$\$([^$]+)\$\$/g,'<div class="bg-gray-100 dark:bg-gray-800 p-4 my-4 rounded text-center font-mono text-lg">$1</div>'),S=S.replace(/\$([^$]+)\$/g,'<span class="font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">$1</span>'),S=S.replace(/- \[ \] (.+)$/gim,'<div class="flex items-center gap-2 ml-4"><input type="checkbox" disabled class="rounded"> <span>$1</span></div>'),S=S.replace(/- \[x\] (.+)$/gim,'<div class="flex items-center gap-2 ml-4"><input type="checkbox" checked disabled class="rounded"> <span>$1</span></div>');const D=/\|(.+)\|\n\|(.+)\|\n((?:\|.+\|\n?)*)/gim;S=S.replace(D,(Z,A,ne,Me)=>{const Ge=A.split("|").map(W=>`<th class="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left bg-gray-50 dark:bg-gray-800">${W.trim()}</th>`).join(""),$e=Me.split(`
`).filter(W=>W.trim()).map(W=>`<tr>${W.split("|").slice(1,-1).map(we=>`<td class="border border-gray-300 dark:border-gray-600 px-4 py-2">${we.trim()}</td>`).join("")}</tr>`).join("");return`<div class="overflow-x-auto my-4"><table class="w-full border-collapse border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
        <thead><tr>${Ge}</tr></thead>
        <tbody>${$e}</tbody>
      </table></div>`});const F={":)":"😊",":-)":"😊",":(":"😢",":-(":"😢",":D":"😃",":-D":"😃",":P":"😛",":-P":"😛",";)":"😉",";-)":"😉",":heart:":"❤️",":+1:":"👍",":-1:":"👎",":fire:":"🔥",":star:":"⭐",":check:":"✅",":x:":"❌",":warning:":"⚠️",":rocket:":"🚀"};for(const[Z,A]of Object.entries(F))S=S.replace(new RegExp(Z.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"g"),A);return S}function u(I){const S=document.createElement("div");return S.textContent=I,S.innerHTML}function f(){l(i,g(t(a)),!0),k()}function k(){const I=t(a).split(`
`);l(v,I.length,!0),l(d,t(a).length,!0),l(c,t(a).trim()?t(a).trim().split(/\s+/).length:0,!0)}function h(){const S='<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Markdown Export</title><script src="https://cdn.tailwindcss.com">'+"<\/script>"+'</head><body class="max-w-4xl mx-auto p-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"><div class="prose prose-lg dark:prose-invert max-w-none">'+t(i)+"</div></body></html>",D=new Blob([S],{type:"text/html"}),F=URL.createObjectURL(D),Z=document.createElement("a");Z.href=F,Z.download="markdown-export.html",Z.click(),URL.revokeObjectURL(F)}Ct(()=>{f()});var m=zu(),_=r(m),$=r(_),M=r($);M.__click=[Ou];var E=r(M);jt(E,{class:"w-5 h-5"});var R=s($,2),V=r(R),b=r(V);Jt(b,{class:"w-10 h-10 text-white"});var T=s(_,4),C=r(T);C.__click=[Hu,a,f];var B=s(C,2);B.__click=[Bu,a,i,k];var z=s(B,2);z.__click=[Fu,a,n];var te=r(z),ue=s(z,2);ue.__click=[Du,i,n];var de=r(ue),xe=s(ue,2);xe.__click=h;var ce=s(T,2),fe=r(ce),Be=r(fe);Jt(Be,{class:"w-4 h-4"});var Ve=s(Be,2),Ye=r(Ve),Qe=s(fe,2),We=r(Qe);Jt(We,{class:"w-4 h-4"});var ze=s(We,2),je=r(ze),Le=s(Qe,2),Ce=r(Le);Jt(Ce,{class:"w-4 h-4"});var re=s(Ce,2),Te=r(re),me=s(ce,2),oe=r(me),j=r(oe),be=r(j),ve=r(be),U=r(ve);K0(U,{class:"w-5 h-5"});var X=s(j,2),he=r(X),pe=s(oe,2),ke=r(pe),Ue=r(ke),Oe=r(Ue),Ne=r(Oe);bl(Ne,{class:"w-5 h-5"});var Pe=s(ke,2),se=r(Pe),_e=r(se);g0(_e,()=>t(i));var q=s(me,2),Q=r(q),G=r(Q),P=r(G);Kt(P,{class:"w-6 h-6 text-indigo-600 dark:text-indigo-400"});var L=s(Q,2),N=r(L),ae=r(N);Yr(ae,{class:"w-6 h-6 text-indigo-600 dark:text-indigo-400"});var ee=s(L,2),K=r(ee),O=r(K);Xa(O,{class:"w-6 h-6 text-indigo-600 dark:text-indigo-400"}),Y(()=>{y(te,t(n)==="markdown"?"✓ Copied!":"Copy Markdown"),y(de,t(n)==="html"?"✓ Copied!":"Copy HTML"),y(Ye,`${t(c)??""} words`),y(je,`${t(d)??""} characters`),y(Te,`${t(v)??""} lines`)}),Se(he,()=>t(a),I=>l(a,I)),x(o,m),Re()}yt(["click"]);function qu(o,e,a){const n=o.target.files?.[0];n&&(l(e,n.name,!0),a(n))}function Gu(o,e){if(t(e)){const a=`data:application/octet-stream;base64,${t(e).encoded}`,i=document.createElement("a");i.href=a,i.download=t(e).name+".b64",i.click()}}function Wu(o,e,a,i,n,c,d){l(e,""),l(a,""),l(i,""),l(n,""),l(c,""),l(d,null)}function Ju(o,e,a){l(e,"Hello, World! This is a sample text for Base64 encoding."),a()}function Vu(o,e,a){l(e,"SGVsbG8sIFdvcmxkISBUaGlzIGlzIGEgc2FtcGxlIHRleHQgZm9yIEJhc2U2NCBlbmNvZGluZy4="),a()}function Yu(){vt("/tools")}var Ku=(o,e)=>l(e,"text"),Qu=(o,e)=>l(e,"file"),Zu=w('<div class="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"><p class="text-red-700 dark:text-red-400 font-medium"> </p></div>'),Xu=(o,e,a)=>e(t(a),"encoded"),ex=w('<button class="btn btn-primary btn-sm"> </button>'),tx=(o,e,a)=>e(t(a),"decoded"),rx=w('<button class="btn btn-primary btn-sm"> </button>'),ax=w('<div class="mb-6 flex flex-wrap gap-4 items-center justify-center"><button class="btn btn-primary">Encode to Base64</button> <button class="btn btn-primary">Decode from Base64</button> <button class="btn btn-primary">Load Sample Text</button> <button class="btn btn-primary">Load Sample Base64</button> <button class="btn btn-primary">Clear All</button></div> <!> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div><textarea class="textarea" placeholder="Enter text or Base64 string to encode/decode..."></textarea> <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right"> </p></div> <div><div class="mb-4"><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Base64 Result</h2> <!></div> <textarea class="textarea" placeholder="Base64 encoded text will appear here..."></textarea></div> <div><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Decoded Result</h2> <!></div> <textarea class="textarea" placeholder="Decoded text will appear here..."></textarea></div></div></div>',1),ox=w('<div class="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><p class="text-sm font-medium text-gray-700 dark:text-gray-300"> </p></div>'),ix=w('<div class="text-center py-8"><div class="inline-flex items-center gap-2"><div class="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div> <span class="text-gray-600 dark:text-gray-400">Processing file...</span></div></div>'),sx=w('<div class="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"><p class="text-red-700 dark:text-red-400 font-medium"> </p></div>'),nx=(o,e,a)=>t(e)&&a(t(e).encoded,"file-encoded"),lx=w('<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Conversion Result</h3> <div class="space-y-4"><div><span class="text-sm font-medium text-gray-700 dark:text-gray-300">File Name:</span> <p class="text-gray-900 dark:text-white font-mono text-sm"> </p></div> <div><span class="text-sm font-medium text-gray-700 dark:text-gray-300">Original Size:</span> <p class="text-gray-900 dark:text-white"> </p></div> <div><span class="text-sm font-medium text-gray-700 dark:text-gray-300">Base64 Length:</span> <p class="text-gray-900 dark:text-white"> </p></div> <div><div class="flex justify-between items-center mb-2"><span class="text-sm font-medium text-gray-700 dark:text-gray-300">Base64 Data:</span> <div class="flex gap-2"><button class="btn btn-primary btn-sm"> </button> <button class="btn btn-primary btn-sm">Download</button></div></div> <textarea class="textarea"></textarea></div></div></div>'),dx=w('<div class="max-w-2xl mx-auto"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upload File for Base64 Conversion</h2> <div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center"><!> <label for="file-upload" class="cursor-pointer"><span class="text-blue-600 dark:text-blue-400 hover:underline font-medium">Click to upload</span> <span class="text-gray-600 dark:text-gray-400">or drag and drop</span></label> <input class="input hidden" id="file-upload" type="file"/> <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">Supports any file type</p></div> <!></div> <!> <!> <!></div>'),cx=w(`<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Base64 Converter</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Encode and decode Base64 strings with support for text and file conversion.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Base64 Converter</li></ol></nav> <div class="mb-6"><div class="flex justify-center"><div class="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1"><button>Text Converter</button> <button>File Converter</button></div></div></div> <!> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Secure Encoding</h3> <p class="text-gray-600 dark:text-gray-400">Encode text and files to Base64 format with proper UTF-8 handling for international
        characters</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">File Support</h3> <p class="text-gray-600 dark:text-gray-400">Convert any file type to Base64 and download the encoded data for easy sharing</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Fast Processing</h3> <p class="text-gray-600 dark:text-gray-400">Instant encoding and decoding with efficient algorithms for both text and binary data</p></div></div></div>`);function vx(o,e){Ie(e,!0);let a=p(""),i=p(""),n=p(""),c=p("text"),d=p(!1),v=p(""),g=p(""),u=p(null),f=p("");function k(){try{l(i,btoa(unescape(encodeURIComponent(t(a)))),!0),l(n,""),l(v,"")}catch{l(v,"Failed to encode text. Please check your input."),l(i,"")}}function h(){try{l(n,decodeURIComponent(escape(atob(t(a)))),!0),l(i,""),l(v,"")}catch{l(v,"Invalid Base64 string. Please check your input."),l(n,"")}}function m(me){l(d,!0),l(v,"");const oe=new FileReader;oe.onload=j=>{try{const ve=(j.target?.result).split(",")[1];l(u,{name:me.name,size:me.size,encoded:ve},!0),l(d,!1)}catch{l(v,"Failed to process file."),l(d,!1)}},oe.onerror=()=>{l(v,"Failed to read file."),l(d,!1)},oe.readAsDataURL(me)}function _(me,oe){navigator.clipboard.writeText(me),l(f,oe,!0),setTimeout(()=>{l(f,"")},2e3)}function $(me){if(me===0)return"0 Bytes";const oe=1024,j=["Bytes","KB","MB","GB"],be=Math.floor(Math.log(me)/Math.log(oe));return parseFloat((me/Math.pow(oe,be)).toFixed(2))+" "+j[be]}var M=cx(),E=r(M),R=r(E),V=r(R);V.__click=[Yu];var b=r(V);jt(b,{class:"w-5 h-5"});var T=s(R,2),C=r(T),B=r(C);fa(B,{class:"w-10 h-10 text-white"});var z=s(E,4),te=r(z),ue=r(te),de=r(ue);de.__click=[Ku,c];var xe=s(de,2);xe.__click=[Qu,c];var ce=s(z,2);{var fe=me=>{var oe=ax(),j=ge(oe),be=r(j);be.__click=k;var ve=s(be,2);ve.__click=h;var U=s(ve,2);U.__click=[Ju,a,k];var X=s(U,2);X.__click=[Vu,a,h];var he=s(X,2);he.__click=[Wu,a,i,n,v,g,u];var pe=s(j,2);{var ke=I=>{var S=Zu(),D=r(S),F=r(D);Y(()=>y(F,`Error: ${t(v)??""}`)),x(I,S)};H(pe,I=>{t(v)&&I(ke)})}var Ue=s(pe,2),Oe=r(Ue),Ne=r(Oe);De(Ne,"rows",16);var Pe=s(Ne,2),se=r(Pe),_e=s(Oe,2),q=r(_e),Q=r(q),G=s(r(Q),2);{var P=I=>{var S=ex();S.__click=[Xu,_,i];var D=r(S);Y(()=>y(D,t(f)==="encoded"?"✓ Copied!":"Copy")),x(I,S)};H(G,I=>{t(i)&&I(P)})}var L=s(Q,2);De(L,"rows",7);var N=s(q,2),ae=r(N),ee=s(r(ae),2);{var K=I=>{var S=rx();S.__click=[tx,_,n];var D=r(S);Y(()=>y(D,t(f)==="decoded"?"✓ Copied!":"Copy")),x(I,S)};H(ee,I=>{t(n)&&I(K)})}var O=s(ae,2);De(O,"rows",7),Y(()=>y(se,`${t(a).length??""} characters`)),Se(Ne,()=>t(a),I=>l(a,I)),Se(L,()=>t(i),I=>l(i,I)),Se(O,()=>t(n),I=>l(n,I)),x(me,oe)},Be=me=>{var oe=dx(),j=r(oe),be=s(r(j),2),ve=r(be);oc(ve,{class:"w-12 h-12 mx-auto mb-4 text-gray-400"});var U=s(ve,4);U.__change=[qu,g,m];var X=s(be,2);{var he=se=>{var _e=ox(),q=r(_e),Q=r(q);Y(()=>y(Q,`Selected file: ${t(g)??""}`)),x(se,_e)};H(X,se=>{t(g)&&se(he)})}var pe=s(j,2);{var ke=se=>{var _e=ix();x(se,_e)};H(pe,se=>{t(d)&&se(ke)})}var Ue=s(pe,2);{var Oe=se=>{var _e=sx(),q=r(_e),Q=r(q);Y(()=>y(Q,`Error: ${t(v)??""}`)),x(se,_e)};H(Ue,se=>{t(v)&&se(Oe)})}var Ne=s(Ue,2);{var Pe=se=>{var _e=lx(),q=s(r(_e),2),Q=r(q),G=s(r(Q),2),P=r(G),L=s(Q,2),N=s(r(L),2),ae=r(N),ee=s(L,2),K=s(r(ee),2),O=r(K),I=s(ee,2),S=r(I),D=s(r(S),2),F=r(D);F.__click=[nx,u,_];var Z=r(F),A=s(F,2);A.__click=[Gu,u];var ne=s(S,2);De(ne,"rows",8),Y(Me=>{y(P,t(u).name),y(ae,Me),y(O,`${t(u).encoded.length??""} characters`),y(Z,t(f)==="file-encoded"?"✓ Copied!":"Copy"),ll(ne,t(u).encoded)},[()=>$(t(u).size)]),x(se,_e)};H(Ne,se=>{t(u)&&se(Pe)})}x(me,oe)};H(ce,me=>{t(c)==="text"?me(fe):me(Be,!1)})}var Ve=s(ce,2),Ye=r(Ve),Qe=r(Ye),We=r(Qe);ls(We,{class:"w-6 h-6 text-yellow-600 dark:text-yellow-400"});var ze=s(Ye,2),je=r(ze),Le=r(je);Jt(Le,{class:"w-6 h-6 text-yellow-600 dark:text-yellow-400"});var Ce=s(ze,2),re=r(Ce),Te=r(re);Kt(Te,{class:"w-6 h-6 text-yellow-600 dark:text-yellow-400"}),Y(()=>{ut(de,1,`px-4 py-2 rounded-md text-sm font-medium transition-colors ${t(c)==="text"?"bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300":"text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"}`),ut(xe,1,`px-4 py-2 rounded-md text-sm font-medium transition-colors ${t(c)==="file"?"bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300":"text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"}`)}),x(o,M),Re()}yt(["click","change"]);function gx(o,e){t(e)&&(navigator.clipboard.writeText(t(e)),Ht.success("Password copied to clipboard"))}function Fs(o,e,a){l(e,""),l(a,[],!0),Ht.success("Cleared history")}function ux(){vt("/tools")}var xx=(o,e)=>e(5),fx=(o,e,a)=>e(a),bx=w('<button class="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 capitalize"> </button>'),px=w("<span> </span>"),mx=w('<div class="mt-4"><div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden"><div></div></div></div>'),hx=w('<div class="mb-6"><input placeholder="Enter custom characters..." class="input font-mono text-sm"/></div>'),yx=w('<button class="text-sm text-red-500 hover:text-red-600">Clear</button>'),_x=w('<div class="flex flex-col items-center justify-center py-8 text-gray-500 dark:text-gray-400"><!> <p class="text-sm">No passwords generated yet</p></div>'),kx=(o,e,a)=>e(t(a).password),wx=w('<div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg group hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"><div class="flex items-start justify-between mb-2"><div class="flex-1 mr-2 min-w-0"><div class="font-mono text-sm text-gray-900 dark:text-white break-all"> </div> <div class="flex items-center justify-between mt-2"><span class="text-xs text-gray-500 dark:text-gray-400"> </span> <div class="flex items-center gap-2"><span> </span> <button class="text-gray-400 hover:text-red-500 transition-colors"><!></button></div></div></div></div></div>'),Cx=w('<div class="space-y-2 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar"></div>'),$x=w(`<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Password Generator</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Generate secure and random passwords with customizable options for maximum security.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Password Generator</li></ol></nav> <div class="mb-6 flex justify-center flex-wrap gap-2"><button class="btn btn-outline btn-sm">Generate 5</button> <button class="btn btn-outline btn-sm text-red-500 hover:text-red-600 hover:border-red-200"><!> Clear</button></div> <div class="mb-6 flex justify-center"><div class="inline-flex rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1 shadow-sm"></div></div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-2 space-y-6"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><div class="flex items-center justify-between mb-4"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Generated Password</h2> <div class="flex items-center gap-2"><!> <button class="btn btn-secondary btn-sm"><!> Copy</button></div></div> <div class="relative"><input readonly="" placeholder="Click 'Generate Password' to create a secure password" class="input font-mono text-lg"/></div> <!></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">Password Settings</h2> <div class="mb-6"><div class="flex justify-between items-center mb-2"><label for="password-length-slider" class="text-sm font-medium text-gray-700 dark:text-gray-300">Password Length</label> <span class="text-sm font-semibold text-gray-900 dark:text-white"> </span></div> <input id="password-length-slider" type="range" min="4" max="64" class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500"/> <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1"><span>4</span> <span>32</span> <span>64</span></div></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"><label class="flex items-center space-x-3 cursor-pointer"><input type="checkbox" class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"/> <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Uppercase (A-Z)</span></label> <label class="flex items-center space-x-3 cursor-pointer"><input type="checkbox" class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"/> <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Lowercase (a-z)</span></label> <label class="flex items-center space-x-3 cursor-pointer"><input type="checkbox" class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"/> <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Numbers (0-9)</span></label> <label class="flex items-center space-x-3 cursor-pointer"><input type="checkbox" class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"/> <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Symbols (!@#$%)</span></label> <label class="flex items-center space-x-3 cursor-pointer"><input type="checkbox" class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"/> <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Custom Characters</span></label></div> <!> <div class="space-y-4 mb-6 border-t border-gray-200 dark:border-gray-700 pt-6"><label class="flex items-center space-x-3 cursor-pointer"><input type="checkbox" class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"/> <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Exclude Similar Characters (i, l, 1, L, o, 0, O)</span></label> <label class="flex items-center space-x-3 cursor-pointer"><input type="checkbox" class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"/> <span class="text-sm font-medium text-gray-700 dark:text-gray-300"></span></label></div> <div class="flex flex-wrap gap-3"><button class="btn btn-primary btn-lg w-full"><!> Generate Password</button></div></div></div> <div><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 sticky top-6"><div class="flex justify-between items-center mb-4"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">History</h2> <!></div> <!></div></div></div> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"><div class="flex items-center gap-2 mb-2 text-red-600 dark:text-red-400"><!> <h3 class="font-medium">Strong Security</h3></div> <p class="text-sm text-gray-600 dark:text-gray-400">Generate cryptographically secure passwords with customizable complexity</p></div> <div class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"><div class="flex items-center gap-2 mb-2 text-red-600 dark:text-red-400"><!> <h3 class="font-medium">Customizable Options</h3></div> <p class="text-sm text-gray-600 dark:text-gray-400">Fine-tune character sets, length, and exclusions for your specific needs</p></div> <div class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"><div class="flex items-center gap-2 mb-2 text-red-600 dark:text-red-400"><!> <h3 class="font-medium">Password History</h3></div> <p class="text-sm text-gray-600 dark:text-gray-400">Keep track of generated passwords with strength analysis</p></div></div></div>`);function Sx(o,e){Ie(e,!0);let a=p(""),i=p(16),n=p(!0),c=p(!0),d=p(!0),v=p(!0),g=p(!1),u=p(!1),f=p(Lt([])),k=p(""),h=p(!1);const m="ABCDEFGHIJKLMNOPQRSTUVWXYZ",_="abcdefghijklmnopqrstuvwxyz",$="0123456789",M="!@#$%^&*()_+-=[]{}|;:,.<>?",E="il1Lo0O",R="{}[]()/\\'\"`~,;.<>";function V(){let He="";if(t(n)&&(He+=m),t(c)&&(He+=_),t(d)&&(He+=$),t(v)&&(He+=M),t(h)&&(He+=t(k)),t(g)&&(He=He.split("").filter(pt=>!E.includes(pt)).join("")),t(u)&&(He=He.split("").filter(pt=>!R.includes(pt)).join("")),He===""){l(a,""),Ht.error("Please select at least one character type");return}let ot="";for(let pt=0;pt<t(i);pt++)ot+=He.charAt(Math.floor(Math.random()*He.length));l(a,ot,!0),b(ot)}function b(He){const ot=T(He);t(f).unshift({password:He,timestamp:new Date,strength:ot}),t(f).length>10&&l(f,t(f).slice(0,10),!0)}function T(He){if(He.length===0)return"none";let ot=0;return He.length>=8&&ot++,He.length>=12&&ot++,He.length>=16&&ot++,/[a-z]/.test(He)&&ot++,/[A-Z]/.test(He)&&ot++,/[0-9]/.test(He)&&ot++,/[^a-zA-Z0-9]/.test(He)&&ot++,ot<=2?"weak":ot<=4?"medium":ot<=6?"strong":"very-strong"}function C(He){switch(He){case"weak":return"text-red-500";case"medium":return"text-yellow-500";case"strong":return"text-green-500";case"very-strong":return"text-green-600";default:return"text-gray-500"}}function B(He){switch(He){case"weak":return"bg-red-100 dark:bg-red-900/20";case"medium":return"bg-yellow-100 dark:bg-yellow-900/20";case"strong":return"bg-green-100 dark:bg-green-900/20";case"very-strong":return"bg-green-200 dark:bg-green-900/30";default:return"bg-gray-100 dark:bg-gray-800"}}function z(He){navigator.clipboard.writeText(He),Ht.success("Password copied to clipboard")}function te(He){switch(He){case"weak":return"Weak";case"medium":return"Medium";case"strong":return"Strong";case"very-strong":return"Very Strong";default:return"No Password"}}function ue(He){for(let ot=0;ot<He;ot++)V();Ht.success(`Generated ${He} passwords`)}function de(He){switch(He){case"strong":l(i,16),l(n,!0),l(c,!0),l(d,!0),l(v,!0),l(g,!0),l(u,!1);break;case"memorable":l(i,12),l(n,!0),l(c,!0),l(d,!0),l(v,!1),l(g,!1),l(u,!1);break;case"pin":l(i,4),l(n,!1),l(c,!1),l(d,!0),l(v,!1),l(g,!1),l(u,!1);break;case"passphrase":l(i,32),l(n,!1),l(c,!0),l(d,!1),l(v,!0),l(g,!1),l(u,!1),l(k," -_"),l(h,!0);break}V(),Ht.success(`Applied ${He} preset`)}Ct(()=>{V()});var xe=$x(),ce=r(xe),fe=r(ce),Be=r(fe);Be.__click=[ux];var Ve=r(Be);jt(Ve,{class:"w-5 h-5"});var Ye=s(fe,2),Qe=r(Ye),We=r(Qe);kl(We,{class:"w-10 h-10 text-white"});var ze=s(ce,4),je=r(ze);je.__click=[xx,ue];var Le=s(je,2);Le.__click=[Fs,a,f];var Ce=r(Le);Ko(Ce,{class:"w-4 h-4 mr-2"});var re=s(ze,2),Te=r(re);mt(Te,20,()=>["strong","memorable","pin","passphrase"],Nr,(He,ot)=>{var pt=bx();pt.__click=[fx,de,ot];var _t=r(pt);Y(()=>y(_t,ot)),x(He,pt)});var me=s(re,2),oe=r(me),j=r(oe),be=r(j),ve=s(r(be),2),U=r(ve);{var X=He=>{var ot=px(),pt=r(ot);Y((_t,Nt)=>{ut(ot,1,`text-sm font-medium ${_t??""}`),y(pt,Nt)},[()=>C(T(t(a))),()=>te(T(t(a)))]),x(He,ot)};H(U,He=>{t(a)&&He(X)})}var he=s(U,2);he.__click=[gx,a];var pe=r(he);ht(pe,{class:"w-4 h-4 mr-2"});var ke=s(be,2),Ue=r(ke),Oe=s(ke,2);{var Ne=He=>{var ot=mx(),pt=r(ot),_t=r(pt);Y(Nt=>ut(_t,1,`h-full transition-all duration-300 ${Nt??""}`),[()=>T(t(a))==="weak"?"bg-red-500 w-1/4":T(t(a))==="medium"?"bg-yellow-500 w-2/4":T(t(a))==="strong"?"bg-green-500 w-3/4":"bg-green-600 w-full"]),x(He,ot)};H(Oe,He=>{t(a)&&He(Ne)})}var Pe=s(j,2),se=s(r(Pe),2),_e=r(se),q=s(r(_e),2),Q=r(q),G=s(_e,2),P=s(se,2),L=r(P),N=r(L),ae=s(L,2),ee=r(ae),K=s(ae,2),O=r(K),I=s(K,2),S=r(I),D=s(I,2),F=r(D),Z=s(P,2);{var A=He=>{var ot=hx(),pt=r(ot);Se(pt,()=>t(k),_t=>l(k,_t)),x(He,ot)};H(Z,He=>{t(h)&&He(A)})}var ne=s(Z,2),Me=r(ne),Ge=r(Me),$e=s(Me,2),W=r($e),le=s(W,2);le.textContent="Exclude Ambiguous Characters ({ } [ ] ( ) / \\ ' \" ` ~ , ; . < >)";var we=s(ne,2),Fe=r(we);Fe.__click=V;var J=r(Fe);ta(J,{class:"w-4 h-4 mr-2"});var ie=s(oe,2),ye=r(ie),Ae=r(ye),Je=s(r(Ae),2);{var Xe=He=>{var ot=yx();ot.__click=[Fs,a,f],x(He,ot)};H(Je,He=>{t(f).length>0&&He(Xe)})}var Ke=s(Ae,2);{var tt=He=>{var ot=_x(),pt=r(ot);Ka(pt,{class:"w-8 h-8 mb-2 opacity-50"}),x(He,ot)},dt=He=>{var ot=Cx();mt(ot,21,()=>t(f),pt=>pt.timestamp.getTime(),(pt,_t)=>{var Nt=wx(),It=r(Nt),Bt=r(It),Dt=r(Bt),kt=r(Dt),Tt=s(Dt,2),Ut=r(Tt),At=r(Ut),Wt=s(Ut,2),Xt=r(Wt),xr=r(Xt),dr=s(Xt,2);dr.__click=[kx,z,_t];var Pt=r(dr);ht(Pt,{class:"w-3.5 h-3.5"}),Y((er,Er,fr,br)=>{y(kt,t(_t).password),y(At,er),ut(Xt,1,`text-xs px-2 py-0.5 rounded-full ${Er??""} ${fr??""}`),y(xr,br)},[()=>t(_t).timestamp.toLocaleTimeString(),()=>B(t(_t).strength),()=>C(t(_t).strength),()=>te(t(_t).strength)]),x(pt,Nt)}),x(He,ot)};H(Ke,He=>{t(f).length===0?He(tt):He(dt,!1)})}var qe=s(me,2),lt=r(qe),ct=r(lt),at=r(ct);ls(at,{class:"w-5 h-5"});var ft=s(lt,2),bt=r(ft),rt=r(bt);wl(rt,{class:"w-5 h-5"});var gt=s(ft,2),$t=r(gt),Mt=r($t);Ka(Mt,{class:"w-5 h-5"}),Y(()=>y(Q,t(i))),Se(Ue,()=>t(a),He=>l(a,He)),Se(G,()=>t(i),He=>l(i,He)),Gt(N,()=>t(n),He=>l(n,He)),Gt(ee,()=>t(c),He=>l(c,He)),Gt(O,()=>t(d),He=>l(d,He)),Gt(S,()=>t(v),He=>l(v,He)),Gt(F,()=>t(h),He=>l(h,He)),Gt(Ge,()=>t(g),He=>l(g,He)),Gt(W,()=>t(u),He=>l(u,He)),x(o,xe),Re()}yt(["click"]);function Tx(o){return o&&o.__esModule&&Object.prototype.hasOwnProperty.call(o,"default")?o.default:o}var za={},ci,Hs;function Mx(){return Hs||(Hs=1,ci=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),ci}var vi={},na={},Os;function Ia(){if(Os)return na;Os=1;let o;const e=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return na.getSymbolSize=function(i){if(!i)throw new Error('"version" cannot be null or undefined');if(i<1||i>40)throw new Error('"version" should be in range from 1 to 40');return i*4+17},na.getSymbolTotalCodewords=function(i){return e[i]},na.getBCHDigit=function(a){let i=0;for(;a!==0;)i++,a>>>=1;return i},na.setToSJISFunction=function(i){if(typeof i!="function")throw new Error('"toSJISFunc" is not a valid function.');o=i},na.isKanjiModeEnabled=function(){return typeof o<"u"},na.toSJIS=function(i){return o(i)},na}var gi={},zs;function vs(){return zs||(zs=1,(function(o){o.L={bit:1},o.M={bit:0},o.Q={bit:3},o.H={bit:2};function e(a){if(typeof a!="string")throw new Error("Param is not a string");switch(a.toLowerCase()){case"l":case"low":return o.L;case"m":case"medium":return o.M;case"q":case"quartile":return o.Q;case"h":case"high":return o.H;default:throw new Error("Unknown EC Level: "+a)}}o.isValid=function(i){return i&&typeof i.bit<"u"&&i.bit>=0&&i.bit<4},o.from=function(i,n){if(o.isValid(i))return i;try{return e(i)}catch{return n}}})(gi)),gi}var ui,Us;function Ex(){if(Us)return ui;Us=1;function o(){this.buffer=[],this.length=0}return o.prototype={get:function(e){const a=Math.floor(e/8);return(this.buffer[a]>>>7-e%8&1)===1},put:function(e,a){for(let i=0;i<a;i++)this.putBit((e>>>a-i-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(e){const a=Math.floor(this.length/8);this.buffer.length<=a&&this.buffer.push(0),e&&(this.buffer[a]|=128>>>this.length%8),this.length++}},ui=o,ui}var xi,qs;function Px(){if(qs)return xi;qs=1;function o(e){if(!e||e<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=e,this.data=new Uint8Array(e*e),this.reservedBit=new Uint8Array(e*e)}return o.prototype.set=function(e,a,i,n){const c=e*this.size+a;this.data[c]=i,n&&(this.reservedBit[c]=!0)},o.prototype.get=function(e,a){return this.data[e*this.size+a]},o.prototype.xor=function(e,a,i){this.data[e*this.size+a]^=i},o.prototype.isReserved=function(e,a){return this.reservedBit[e*this.size+a]},xi=o,xi}var fi={},Gs;function Lx(){return Gs||(Gs=1,(function(o){const e=Ia().getSymbolSize;o.getRowColCoords=function(i){if(i===1)return[];const n=Math.floor(i/7)+2,c=e(i),d=c===145?26:Math.ceil((c-13)/(2*n-2))*2,v=[c-7];for(let g=1;g<n-1;g++)v[g]=v[g-1]-d;return v.push(6),v.reverse()},o.getPositions=function(i){const n=[],c=o.getRowColCoords(i),d=c.length;for(let v=0;v<d;v++)for(let g=0;g<d;g++)v===0&&g===0||v===0&&g===d-1||v===d-1&&g===0||n.push([c[v],c[g]]);return n}})(fi)),fi}var bi={},Ws;function Ax(){if(Ws)return bi;Ws=1;const o=Ia().getSymbolSize,e=7;return bi.getPositions=function(i){const n=o(i);return[[0,0],[n-e,0],[0,n-e]]},bi}var pi={},Js;function jx(){return Js||(Js=1,(function(o){o.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const e={N1:3,N2:3,N3:40,N4:10};o.isValid=function(n){return n!=null&&n!==""&&!isNaN(n)&&n>=0&&n<=7},o.from=function(n){return o.isValid(n)?parseInt(n,10):void 0},o.getPenaltyN1=function(n){const c=n.size;let d=0,v=0,g=0,u=null,f=null;for(let k=0;k<c;k++){v=g=0,u=f=null;for(let h=0;h<c;h++){let m=n.get(k,h);m===u?v++:(v>=5&&(d+=e.N1+(v-5)),u=m,v=1),m=n.get(h,k),m===f?g++:(g>=5&&(d+=e.N1+(g-5)),f=m,g=1)}v>=5&&(d+=e.N1+(v-5)),g>=5&&(d+=e.N1+(g-5))}return d},o.getPenaltyN2=function(n){const c=n.size;let d=0;for(let v=0;v<c-1;v++)for(let g=0;g<c-1;g++){const u=n.get(v,g)+n.get(v,g+1)+n.get(v+1,g)+n.get(v+1,g+1);(u===4||u===0)&&d++}return d*e.N2},o.getPenaltyN3=function(n){const c=n.size;let d=0,v=0,g=0;for(let u=0;u<c;u++){v=g=0;for(let f=0;f<c;f++)v=v<<1&2047|n.get(u,f),f>=10&&(v===1488||v===93)&&d++,g=g<<1&2047|n.get(f,u),f>=10&&(g===1488||g===93)&&d++}return d*e.N3},o.getPenaltyN4=function(n){let c=0;const d=n.data.length;for(let g=0;g<d;g++)c+=n.data[g];return Math.abs(Math.ceil(c*100/d/5)-10)*e.N4};function a(i,n,c){switch(i){case o.Patterns.PATTERN000:return(n+c)%2===0;case o.Patterns.PATTERN001:return n%2===0;case o.Patterns.PATTERN010:return c%3===0;case o.Patterns.PATTERN011:return(n+c)%3===0;case o.Patterns.PATTERN100:return(Math.floor(n/2)+Math.floor(c/3))%2===0;case o.Patterns.PATTERN101:return n*c%2+n*c%3===0;case o.Patterns.PATTERN110:return(n*c%2+n*c%3)%2===0;case o.Patterns.PATTERN111:return(n*c%3+(n+c)%2)%2===0;default:throw new Error("bad maskPattern:"+i)}}o.applyMask=function(n,c){const d=c.size;for(let v=0;v<d;v++)for(let g=0;g<d;g++)c.isReserved(g,v)||c.xor(g,v,a(n,g,v))},o.getBestMask=function(n,c){const d=Object.keys(o.Patterns).length;let v=0,g=1/0;for(let u=0;u<d;u++){c(u),o.applyMask(u,n);const f=o.getPenaltyN1(n)+o.getPenaltyN2(n)+o.getPenaltyN3(n)+o.getPenaltyN4(n);o.applyMask(u,n),f<g&&(g=f,v=u)}return v}})(pi)),pi}var _o={},Vs;function El(){if(Vs)return _o;Vs=1;const o=vs(),e=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],a=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return _o.getBlocksCount=function(n,c){switch(c){case o.L:return e[(n-1)*4+0];case o.M:return e[(n-1)*4+1];case o.Q:return e[(n-1)*4+2];case o.H:return e[(n-1)*4+3];default:return}},_o.getTotalCodewordsCount=function(n,c){switch(c){case o.L:return a[(n-1)*4+0];case o.M:return a[(n-1)*4+1];case o.Q:return a[(n-1)*4+2];case o.H:return a[(n-1)*4+3];default:return}},_o}var mi={},ao={},Ys;function Nx(){if(Ys)return ao;Ys=1;const o=new Uint8Array(512),e=new Uint8Array(256);return(function(){let i=1;for(let n=0;n<255;n++)o[n]=i,e[i]=n,i<<=1,i&256&&(i^=285);for(let n=255;n<512;n++)o[n]=o[n-255]})(),ao.log=function(i){if(i<1)throw new Error("log("+i+")");return e[i]},ao.exp=function(i){return o[i]},ao.mul=function(i,n){return i===0||n===0?0:o[e[i]+e[n]]},ao}var Ks;function Ix(){return Ks||(Ks=1,(function(o){const e=Nx();o.mul=function(i,n){const c=new Uint8Array(i.length+n.length-1);for(let d=0;d<i.length;d++)for(let v=0;v<n.length;v++)c[d+v]^=e.mul(i[d],n[v]);return c},o.mod=function(i,n){let c=new Uint8Array(i);for(;c.length-n.length>=0;){const d=c[0];for(let g=0;g<n.length;g++)c[g]^=e.mul(n[g],d);let v=0;for(;v<c.length&&c[v]===0;)v++;c=c.slice(v)}return c},o.generateECPolynomial=function(i){let n=new Uint8Array([1]);for(let c=0;c<i;c++)n=o.mul(n,new Uint8Array([1,e.exp(c)]));return n}})(mi)),mi}var hi,Qs;function Rx(){if(Qs)return hi;Qs=1;const o=Ix();function e(a){this.genPoly=void 0,this.degree=a,this.degree&&this.initialize(this.degree)}return e.prototype.initialize=function(i){this.degree=i,this.genPoly=o.generateECPolynomial(this.degree)},e.prototype.encode=function(i){if(!this.genPoly)throw new Error("Encoder not initialized");const n=new Uint8Array(i.length+this.degree);n.set(i);const c=o.mod(n,this.genPoly),d=this.degree-c.length;if(d>0){const v=new Uint8Array(this.degree);return v.set(c,d),v}return c},hi=e,hi}var yi={},_i={},ki={},Zs;function Pl(){return Zs||(Zs=1,ki.isValid=function(e){return!isNaN(e)&&e>=1&&e<=40}),ki}var Dr={},Xs;function Ll(){if(Xs)return Dr;Xs=1;const o="[0-9]+",e="[A-Z $%*+\\-./:]+";let a="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";a=a.replace(/u/g,"\\u");const i="(?:(?![A-Z0-9 $%*+\\-./:]|"+a+`)(?:.|[\r
]))+`;Dr.KANJI=new RegExp(a,"g"),Dr.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),Dr.BYTE=new RegExp(i,"g"),Dr.NUMERIC=new RegExp(o,"g"),Dr.ALPHANUMERIC=new RegExp(e,"g");const n=new RegExp("^"+a+"$"),c=new RegExp("^"+o+"$"),d=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return Dr.testKanji=function(g){return n.test(g)},Dr.testNumeric=function(g){return c.test(g)},Dr.testAlphanumeric=function(g){return d.test(g)},Dr}var en;function Ra(){return en||(en=1,(function(o){const e=Pl(),a=Ll();o.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},o.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},o.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},o.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},o.MIXED={bit:-1},o.getCharCountIndicator=function(c,d){if(!c.ccBits)throw new Error("Invalid mode: "+c);if(!e.isValid(d))throw new Error("Invalid version: "+d);return d>=1&&d<10?c.ccBits[0]:d<27?c.ccBits[1]:c.ccBits[2]},o.getBestModeForData=function(c){return a.testNumeric(c)?o.NUMERIC:a.testAlphanumeric(c)?o.ALPHANUMERIC:a.testKanji(c)?o.KANJI:o.BYTE},o.toString=function(c){if(c&&c.id)return c.id;throw new Error("Invalid mode")},o.isValid=function(c){return c&&c.bit&&c.ccBits};function i(n){if(typeof n!="string")throw new Error("Param is not a string");switch(n.toLowerCase()){case"numeric":return o.NUMERIC;case"alphanumeric":return o.ALPHANUMERIC;case"kanji":return o.KANJI;case"byte":return o.BYTE;default:throw new Error("Unknown mode: "+n)}}o.from=function(c,d){if(o.isValid(c))return c;try{return i(c)}catch{return d}}})(_i)),_i}var tn;function Bx(){return tn||(tn=1,(function(o){const e=Ia(),a=El(),i=vs(),n=Ra(),c=Pl(),d=7973,v=e.getBCHDigit(d);function g(h,m,_){for(let $=1;$<=40;$++)if(m<=o.getCapacity($,_,h))return $}function u(h,m){return n.getCharCountIndicator(h,m)+4}function f(h,m){let _=0;return h.forEach(function($){const M=u($.mode,m);_+=M+$.getBitsLength()}),_}function k(h,m){for(let _=1;_<=40;_++)if(f(h,_)<=o.getCapacity(_,m,n.MIXED))return _}o.from=function(m,_){return c.isValid(m)?parseInt(m,10):_},o.getCapacity=function(m,_,$){if(!c.isValid(m))throw new Error("Invalid QR Code version");typeof $>"u"&&($=n.BYTE);const M=e.getSymbolTotalCodewords(m),E=a.getTotalCodewordsCount(m,_),R=(M-E)*8;if($===n.MIXED)return R;const V=R-u($,m);switch($){case n.NUMERIC:return Math.floor(V/10*3);case n.ALPHANUMERIC:return Math.floor(V/11*2);case n.KANJI:return Math.floor(V/13);case n.BYTE:default:return Math.floor(V/8)}},o.getBestVersionForData=function(m,_){let $;const M=i.from(_,i.M);if(Array.isArray(m)){if(m.length>1)return k(m,M);if(m.length===0)return 1;$=m[0]}else $=m;return g($.mode,$.getLength(),M)},o.getEncodedBits=function(m){if(!c.isValid(m)||m<7)throw new Error("Invalid QR Code version");let _=m<<12;for(;e.getBCHDigit(_)-v>=0;)_^=d<<e.getBCHDigit(_)-v;return m<<12|_}})(yi)),yi}var wi={},rn;function Dx(){if(rn)return wi;rn=1;const o=Ia(),e=1335,a=21522,i=o.getBCHDigit(e);return wi.getEncodedBits=function(c,d){const v=c.bit<<3|d;let g=v<<10;for(;o.getBCHDigit(g)-i>=0;)g^=e<<o.getBCHDigit(g)-i;return(v<<10|g)^a},wi}var Ci={},$i,an;function Fx(){if(an)return $i;an=1;const o=Ra();function e(a){this.mode=o.NUMERIC,this.data=a.toString()}return e.getBitsLength=function(i){return 10*Math.floor(i/3)+(i%3?i%3*3+1:0)},e.prototype.getLength=function(){return this.data.length},e.prototype.getBitsLength=function(){return e.getBitsLength(this.data.length)},e.prototype.write=function(i){let n,c,d;for(n=0;n+3<=this.data.length;n+=3)c=this.data.substr(n,3),d=parseInt(c,10),i.put(d,10);const v=this.data.length-n;v>0&&(c=this.data.substr(n),d=parseInt(c,10),i.put(d,v*3+1))},$i=e,$i}var Si,on;function Hx(){if(on)return Si;on=1;const o=Ra(),e=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function a(i){this.mode=o.ALPHANUMERIC,this.data=i}return a.getBitsLength=function(n){return 11*Math.floor(n/2)+6*(n%2)},a.prototype.getLength=function(){return this.data.length},a.prototype.getBitsLength=function(){return a.getBitsLength(this.data.length)},a.prototype.write=function(n){let c;for(c=0;c+2<=this.data.length;c+=2){let d=e.indexOf(this.data[c])*45;d+=e.indexOf(this.data[c+1]),n.put(d,11)}this.data.length%2&&n.put(e.indexOf(this.data[c]),6)},Si=a,Si}var Ti,sn;function Ox(){if(sn)return Ti;sn=1;const o=Ra();function e(a){this.mode=o.BYTE,typeof a=="string"?this.data=new TextEncoder().encode(a):this.data=new Uint8Array(a)}return e.getBitsLength=function(i){return i*8},e.prototype.getLength=function(){return this.data.length},e.prototype.getBitsLength=function(){return e.getBitsLength(this.data.length)},e.prototype.write=function(a){for(let i=0,n=this.data.length;i<n;i++)a.put(this.data[i],8)},Ti=e,Ti}var Mi,nn;function zx(){if(nn)return Mi;nn=1;const o=Ra(),e=Ia();function a(i){this.mode=o.KANJI,this.data=i}return a.getBitsLength=function(n){return n*13},a.prototype.getLength=function(){return this.data.length},a.prototype.getBitsLength=function(){return a.getBitsLength(this.data.length)},a.prototype.write=function(i){let n;for(n=0;n<this.data.length;n++){let c=e.toSJIS(this.data[n]);if(c>=33088&&c<=40956)c-=33088;else if(c>=57408&&c<=60351)c-=49472;else throw new Error("Invalid SJIS character: "+this.data[n]+`
Make sure your charset is UTF-8`);c=(c>>>8&255)*192+(c&255),i.put(c,13)}},Mi=a,Mi}var Ei={exports:{}},ln;function Ux(){return ln||(ln=1,(function(o){var e={single_source_shortest_paths:function(a,i,n){var c={},d={};d[i]=0;var v=e.PriorityQueue.make();v.push(i,0);for(var g,u,f,k,h,m,_,$,M;!v.empty();){g=v.pop(),u=g.value,k=g.cost,h=a[u]||{};for(f in h)h.hasOwnProperty(f)&&(m=h[f],_=k+m,$=d[f],M=typeof d[f]>"u",(M||$>_)&&(d[f]=_,v.push(f,_),c[f]=u))}if(typeof n<"u"&&typeof d[n]>"u"){var E=["Could not find a path from ",i," to ",n,"."].join("");throw new Error(E)}return c},extract_shortest_path_from_predecessor_list:function(a,i){for(var n=[],c=i;c;)n.push(c),a[c],c=a[c];return n.reverse(),n},find_path:function(a,i,n){var c=e.single_source_shortest_paths(a,i,n);return e.extract_shortest_path_from_predecessor_list(c,n)},PriorityQueue:{make:function(a){var i=e.PriorityQueue,n={},c;a=a||{};for(c in i)i.hasOwnProperty(c)&&(n[c]=i[c]);return n.queue=[],n.sorter=a.sorter||i.default_sorter,n},default_sorter:function(a,i){return a.cost-i.cost},push:function(a,i){var n={value:a,cost:i};this.queue.push(n),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};o.exports=e})(Ei)),Ei.exports}var dn;function qx(){return dn||(dn=1,(function(o){const e=Ra(),a=Fx(),i=Hx(),n=Ox(),c=zx(),d=Ll(),v=Ia(),g=Ux();function u(E){return unescape(encodeURIComponent(E)).length}function f(E,R,V){const b=[];let T;for(;(T=E.exec(V))!==null;)b.push({data:T[0],index:T.index,mode:R,length:T[0].length});return b}function k(E){const R=f(d.NUMERIC,e.NUMERIC,E),V=f(d.ALPHANUMERIC,e.ALPHANUMERIC,E);let b,T;return v.isKanjiModeEnabled()?(b=f(d.BYTE,e.BYTE,E),T=f(d.KANJI,e.KANJI,E)):(b=f(d.BYTE_KANJI,e.BYTE,E),T=[]),R.concat(V,b,T).sort(function(B,z){return B.index-z.index}).map(function(B){return{data:B.data,mode:B.mode,length:B.length}})}function h(E,R){switch(R){case e.NUMERIC:return a.getBitsLength(E);case e.ALPHANUMERIC:return i.getBitsLength(E);case e.KANJI:return c.getBitsLength(E);case e.BYTE:return n.getBitsLength(E)}}function m(E){return E.reduce(function(R,V){const b=R.length-1>=0?R[R.length-1]:null;return b&&b.mode===V.mode?(R[R.length-1].data+=V.data,R):(R.push(V),R)},[])}function _(E){const R=[];for(let V=0;V<E.length;V++){const b=E[V];switch(b.mode){case e.NUMERIC:R.push([b,{data:b.data,mode:e.ALPHANUMERIC,length:b.length},{data:b.data,mode:e.BYTE,length:b.length}]);break;case e.ALPHANUMERIC:R.push([b,{data:b.data,mode:e.BYTE,length:b.length}]);break;case e.KANJI:R.push([b,{data:b.data,mode:e.BYTE,length:u(b.data)}]);break;case e.BYTE:R.push([{data:b.data,mode:e.BYTE,length:u(b.data)}])}}return R}function $(E,R){const V={},b={start:{}};let T=["start"];for(let C=0;C<E.length;C++){const B=E[C],z=[];for(let te=0;te<B.length;te++){const ue=B[te],de=""+C+te;z.push(de),V[de]={node:ue,lastCount:0},b[de]={};for(let xe=0;xe<T.length;xe++){const ce=T[xe];V[ce]&&V[ce].node.mode===ue.mode?(b[ce][de]=h(V[ce].lastCount+ue.length,ue.mode)-h(V[ce].lastCount,ue.mode),V[ce].lastCount+=ue.length):(V[ce]&&(V[ce].lastCount=ue.length),b[ce][de]=h(ue.length,ue.mode)+4+e.getCharCountIndicator(ue.mode,R))}}T=z}for(let C=0;C<T.length;C++)b[T[C]].end=0;return{map:b,table:V}}function M(E,R){let V;const b=e.getBestModeForData(E);if(V=e.from(R,b),V!==e.BYTE&&V.bit<b.bit)throw new Error('"'+E+'" cannot be encoded with mode '+e.toString(V)+`.
 Suggested mode is: `+e.toString(b));switch(V===e.KANJI&&!v.isKanjiModeEnabled()&&(V=e.BYTE),V){case e.NUMERIC:return new a(E);case e.ALPHANUMERIC:return new i(E);case e.KANJI:return new c(E);case e.BYTE:return new n(E)}}o.fromArray=function(R){return R.reduce(function(V,b){return typeof b=="string"?V.push(M(b,null)):b.data&&V.push(M(b.data,b.mode)),V},[])},o.fromString=function(R,V){const b=k(R,v.isKanjiModeEnabled()),T=_(b),C=$(T,V),B=g.find_path(C.map,"start","end"),z=[];for(let te=1;te<B.length-1;te++)z.push(C.table[B[te]].node);return o.fromArray(m(z))},o.rawSplit=function(R){return o.fromArray(k(R,v.isKanjiModeEnabled()))}})(Ci)),Ci}var cn;function Gx(){if(cn)return vi;cn=1;const o=Ia(),e=vs(),a=Ex(),i=Px(),n=Lx(),c=Ax(),d=jx(),v=El(),g=Rx(),u=Bx(),f=Dx(),k=Ra(),h=qx();function m(C,B){const z=C.size,te=c.getPositions(B);for(let ue=0;ue<te.length;ue++){const de=te[ue][0],xe=te[ue][1];for(let ce=-1;ce<=7;ce++)if(!(de+ce<=-1||z<=de+ce))for(let fe=-1;fe<=7;fe++)xe+fe<=-1||z<=xe+fe||(ce>=0&&ce<=6&&(fe===0||fe===6)||fe>=0&&fe<=6&&(ce===0||ce===6)||ce>=2&&ce<=4&&fe>=2&&fe<=4?C.set(de+ce,xe+fe,!0,!0):C.set(de+ce,xe+fe,!1,!0))}}function _(C){const B=C.size;for(let z=8;z<B-8;z++){const te=z%2===0;C.set(z,6,te,!0),C.set(6,z,te,!0)}}function $(C,B){const z=n.getPositions(B);for(let te=0;te<z.length;te++){const ue=z[te][0],de=z[te][1];for(let xe=-2;xe<=2;xe++)for(let ce=-2;ce<=2;ce++)xe===-2||xe===2||ce===-2||ce===2||xe===0&&ce===0?C.set(ue+xe,de+ce,!0,!0):C.set(ue+xe,de+ce,!1,!0)}}function M(C,B){const z=C.size,te=u.getEncodedBits(B);let ue,de,xe;for(let ce=0;ce<18;ce++)ue=Math.floor(ce/3),de=ce%3+z-8-3,xe=(te>>ce&1)===1,C.set(ue,de,xe,!0),C.set(de,ue,xe,!0)}function E(C,B,z){const te=C.size,ue=f.getEncodedBits(B,z);let de,xe;for(de=0;de<15;de++)xe=(ue>>de&1)===1,de<6?C.set(de,8,xe,!0):de<8?C.set(de+1,8,xe,!0):C.set(te-15+de,8,xe,!0),de<8?C.set(8,te-de-1,xe,!0):de<9?C.set(8,15-de-1+1,xe,!0):C.set(8,15-de-1,xe,!0);C.set(te-8,8,1,!0)}function R(C,B){const z=C.size;let te=-1,ue=z-1,de=7,xe=0;for(let ce=z-1;ce>0;ce-=2)for(ce===6&&ce--;;){for(let fe=0;fe<2;fe++)if(!C.isReserved(ue,ce-fe)){let Be=!1;xe<B.length&&(Be=(B[xe]>>>de&1)===1),C.set(ue,ce-fe,Be),de--,de===-1&&(xe++,de=7)}if(ue+=te,ue<0||z<=ue){ue-=te,te=-te;break}}}function V(C,B,z){const te=new a;z.forEach(function(fe){te.put(fe.mode.bit,4),te.put(fe.getLength(),k.getCharCountIndicator(fe.mode,C)),fe.write(te)});const ue=o.getSymbolTotalCodewords(C),de=v.getTotalCodewordsCount(C,B),xe=(ue-de)*8;for(te.getLengthInBits()+4<=xe&&te.put(0,4);te.getLengthInBits()%8!==0;)te.putBit(0);const ce=(xe-te.getLengthInBits())/8;for(let fe=0;fe<ce;fe++)te.put(fe%2?17:236,8);return b(te,C,B)}function b(C,B,z){const te=o.getSymbolTotalCodewords(B),ue=v.getTotalCodewordsCount(B,z),de=te-ue,xe=v.getBlocksCount(B,z),ce=te%xe,fe=xe-ce,Be=Math.floor(te/xe),Ve=Math.floor(de/xe),Ye=Ve+1,Qe=Be-Ve,We=new g(Qe);let ze=0;const je=new Array(xe),Le=new Array(xe);let Ce=0;const re=new Uint8Array(C.buffer);for(let be=0;be<xe;be++){const ve=be<fe?Ve:Ye;je[be]=re.slice(ze,ze+ve),Le[be]=We.encode(je[be]),ze+=ve,Ce=Math.max(Ce,ve)}const Te=new Uint8Array(te);let me=0,oe,j;for(oe=0;oe<Ce;oe++)for(j=0;j<xe;j++)oe<je[j].length&&(Te[me++]=je[j][oe]);for(oe=0;oe<Qe;oe++)for(j=0;j<xe;j++)Te[me++]=Le[j][oe];return Te}function T(C,B,z,te){let ue;if(Array.isArray(C))ue=h.fromArray(C);else if(typeof C=="string"){let Be=B;if(!Be){const Ve=h.rawSplit(C);Be=u.getBestVersionForData(Ve,z)}ue=h.fromString(C,Be||40)}else throw new Error("Invalid data");const de=u.getBestVersionForData(ue,z);if(!de)throw new Error("The amount of data is too big to be stored in a QR Code");if(!B)B=de;else if(B<de)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+de+`.
`);const xe=V(B,z,ue),ce=o.getSymbolSize(B),fe=new i(ce);return m(fe,B),_(fe),$(fe,B),E(fe,z,0),B>=7&&M(fe,B),R(fe,xe),isNaN(te)&&(te=d.getBestMask(fe,E.bind(null,fe,z))),d.applyMask(te,fe),E(fe,z,te),{modules:fe,version:B,errorCorrectionLevel:z,maskPattern:te,segments:ue}}return vi.create=function(B,z){if(typeof B>"u"||B==="")throw new Error("No input text");let te=e.M,ue,de;return typeof z<"u"&&(te=e.from(z.errorCorrectionLevel,e.M),ue=u.from(z.version),de=d.from(z.maskPattern),z.toSJISFunc&&o.setToSJISFunction(z.toSJISFunc)),T(B,ue,te,de)},vi}var Pi={},Li={},vn;function Al(){return vn||(vn=1,(function(o){function e(a){if(typeof a=="number"&&(a=a.toString()),typeof a!="string")throw new Error("Color should be defined as hex string");let i=a.slice().replace("#","").split("");if(i.length<3||i.length===5||i.length>8)throw new Error("Invalid hex color: "+a);(i.length===3||i.length===4)&&(i=Array.prototype.concat.apply([],i.map(function(c){return[c,c]}))),i.length===6&&i.push("F","F");const n=parseInt(i.join(""),16);return{r:n>>24&255,g:n>>16&255,b:n>>8&255,a:n&255,hex:"#"+i.slice(0,6).join("")}}o.getOptions=function(i){i||(i={}),i.color||(i.color={});const n=typeof i.margin>"u"||i.margin===null||i.margin<0?4:i.margin,c=i.width&&i.width>=21?i.width:void 0,d=i.scale||4;return{width:c,scale:c?4:d,margin:n,color:{dark:e(i.color.dark||"#000000ff"),light:e(i.color.light||"#ffffffff")},type:i.type,rendererOpts:i.rendererOpts||{}}},o.getScale=function(i,n){return n.width&&n.width>=i+n.margin*2?n.width/(i+n.margin*2):n.scale},o.getImageWidth=function(i,n){const c=o.getScale(i,n);return Math.floor((i+n.margin*2)*c)},o.qrToImageData=function(i,n,c){const d=n.modules.size,v=n.modules.data,g=o.getScale(d,c),u=Math.floor((d+c.margin*2)*g),f=c.margin*g,k=[c.color.light,c.color.dark];for(let h=0;h<u;h++)for(let m=0;m<u;m++){let _=(h*u+m)*4,$=c.color.light;if(h>=f&&m>=f&&h<u-f&&m<u-f){const M=Math.floor((h-f)/g),E=Math.floor((m-f)/g);$=k[v[M*d+E]?1:0]}i[_++]=$.r,i[_++]=$.g,i[_++]=$.b,i[_]=$.a}}})(Li)),Li}var gn;function Wx(){return gn||(gn=1,(function(o){const e=Al();function a(n,c,d){n.clearRect(0,0,c.width,c.height),c.style||(c.style={}),c.height=d,c.width=d,c.style.height=d+"px",c.style.width=d+"px"}function i(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}o.render=function(c,d,v){let g=v,u=d;typeof g>"u"&&(!d||!d.getContext)&&(g=d,d=void 0),d||(u=i()),g=e.getOptions(g);const f=e.getImageWidth(c.modules.size,g),k=u.getContext("2d"),h=k.createImageData(f,f);return e.qrToImageData(h.data,c,g),a(k,u,f),k.putImageData(h,0,0),u},o.renderToDataURL=function(c,d,v){let g=v;typeof g>"u"&&(!d||!d.getContext)&&(g=d,d=void 0),g||(g={});const u=o.render(c,d,g),f=g.type||"image/png",k=g.rendererOpts||{};return u.toDataURL(f,k.quality)}})(Pi)),Pi}var Ai={},un;function Jx(){if(un)return Ai;un=1;const o=Al();function e(n,c){const d=n.a/255,v=c+'="'+n.hex+'"';return d<1?v+" "+c+'-opacity="'+d.toFixed(2).slice(1)+'"':v}function a(n,c,d){let v=n+c;return typeof d<"u"&&(v+=" "+d),v}function i(n,c,d){let v="",g=0,u=!1,f=0;for(let k=0;k<n.length;k++){const h=Math.floor(k%c),m=Math.floor(k/c);!h&&!u&&(u=!0),n[k]?(f++,k>0&&h>0&&n[k-1]||(v+=u?a("M",h+d,.5+m+d):a("m",g,0),g=0,u=!1),h+1<c&&n[k+1]||(v+=a("h",f),f=0)):g++}return v}return Ai.render=function(c,d,v){const g=o.getOptions(d),u=c.modules.size,f=c.modules.data,k=u+g.margin*2,h=g.color.light.a?"<path "+e(g.color.light,"fill")+' d="M0 0h'+k+"v"+k+'H0z"/>':"",m="<path "+e(g.color.dark,"stroke")+' d="'+i(f,u,g.margin)+'"/>',_='viewBox="0 0 '+k+" "+k+'"',M='<svg xmlns="http://www.w3.org/2000/svg" '+(g.width?'width="'+g.width+'" height="'+g.width+'" ':"")+_+' shape-rendering="crispEdges">'+h+m+`</svg>
`;return typeof v=="function"&&v(null,M),M},Ai}var xn;function Vx(){if(xn)return za;xn=1;const o=Mx(),e=Gx(),a=Wx(),i=Jx();function n(c,d,v,g,u){const f=[].slice.call(arguments,1),k=f.length,h=typeof f[k-1]=="function";if(!h&&!o())throw new Error("Callback required as last argument");if(h){if(k<2)throw new Error("Too few arguments provided");k===2?(u=v,v=d,d=g=void 0):k===3&&(d.getContext&&typeof u>"u"?(u=g,g=void 0):(u=g,g=v,v=d,d=void 0))}else{if(k<1)throw new Error("Too few arguments provided");return k===1?(v=d,d=g=void 0):k===2&&!d.getContext&&(g=v,v=d,d=void 0),new Promise(function(m,_){try{const $=e.create(v,g);m(c($,d,g))}catch($){_($)}})}try{const m=e.create(v,g);u(null,c(m,d,g))}catch(m){u(m)}}return za.create=e.create,za.toCanvas=n.bind(null,a.render),za.toDataURL=n.bind(null,a.renderToDataURL),za.toString=n.bind(null,function(c,d,v){return i.render(c,v)}),za}var Yx=Vx();const Kx=Tx(Yx);function Qx(o,e){t(e)&&fetch(t(e)).then(a=>a.blob()).then(a=>{const i=new ClipboardItem({"image/png":a});navigator.clipboard.write([i]),Ht.success("QR Code copied to clipboard")}).catch(()=>{Ht.error("Failed to copy QR Code")})}function Zx(o,e,a,i,n,c,d,v,g){l(e,""),l(a,""),l(i,""),l(n,"300"),l(c,"#FFFFFF"),l(d,"#000000"),l(v,"M"),l(g,!0),Ht.success("Form reset")}function Xx(){vt("/tools")}var ef=w('<p class="mt-1 text-sm text-red-500"> </p>'),tf=w("<option> </option>"),rf=w('<div class="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col items-center"><div class="mb-6 p-4 bg-white rounded-lg shadow-sm"><img alt="Generated QR Code" class="max-w-full h-auto rounded"/></div> <div class="flex flex-wrap gap-3 justify-center w-full"><button class="btn btn-primary btn-block sm:w-auto"><!> Download PNG</button> <button class="btn btn-secondary btn-block sm:w-auto"><!> Copy Image</button></div></div>'),af=w('<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6"><p class="text-red-600 dark:text-red-400 text-center"> </p></div>'),of=w('<div class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-12 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400"><!> <p class="text-center">Enter text and click "Generate" to create your QR code</p></div>'),sf=w('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">QR Code Generator</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Generate custom QR codes for URLs, text, or any data with customizable options.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">QR Code Generator</li></ol></nav> <div class="mb-6 flex justify-center flex-wrap gap-2"><button class="btn btn-primary btn-sm"><!> Generate</button> <button class="btn btn-outline btn-sm">Reset</button></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-8"><div class="space-y-6"><div><label for="text-input" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Text or URL</label> <textarea id="text-input" placeholder="Enter text, URL, or any data to encode..." rows="4"></textarea> <!></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-6"><div class="flex items-center gap-2 mb-2 text-gray-900 dark:text-white"><!> <h3 class="text-lg font-semibold">Customization</h3></div> <div><div class="flex justify-between items-center mb-2"><label for="size" class="text-sm font-medium text-gray-700 dark:text-gray-300"> </label></div> <input id="size" type="range" min="100" max="500" step="50" class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"/></div> <div class="grid grid-cols-2 gap-4"><div><label for="bg-color" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Background</label> <input id="bg-color" type="color" class="input h-12 p-1 w-full"/></div> <div><label for="fg-color" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Foreground</label> <input id="fg-color" type="color" class="input h-12 p-1 w-full"/></div></div> <div><label for="error-correction" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Error Correction Level</label> <select id="error-correction" class="select"></select></div> <div class="flex items-center"><input type="checkbox" id="include-margin" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/> <label for="include-margin" class="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">Include margin</label></div></div></div> <div class="space-y-6"><div><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Generated QR Code</h3> <!></div> <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4"><div class="flex items-center gap-2 mb-2 text-blue-800 dark:text-blue-200"><!> <h4 class="text-sm font-semibold">Tips</h4></div> <ul class="text-sm text-blue-700 dark:text-blue-300 space-y-1 list-disc list-inside"><li>QR codes can store up to 4,296 alphanumeric characters</li> <li>Higher error correction levels create more complex but more robust codes</li> <li>Test your QR code before using it in production</li> <li>Ensure good contrast between foreground and background colors</li></ul></div></div></div></div>');function nf(o,e){Ie(e,!0);let a=p(""),i=p(""),n=p(""),c=p("300"),d=p("#FFFFFF"),v=p("#000000"),g=p("M"),u=p(!0);const f=[{value:"L",label:"Low (7%)"},{value:"M",label:"Medium (15%)"},{value:"Q",label:"Quartile (25%)"},{value:"H",label:"High (30%)"}];async function k(){if(!t(a).trim()){l(n,"Please enter some text or URL"),l(i,"");return}try{const se={width:parseInt(t(c)),margin:t(u)?4:0,color:{dark:t(v),light:t(d)},errorCorrectionLevel:t(g)};l(i,await Kx.toDataURL(t(a),se),!0),l(n,""),Ht.success("QR Code generated successfully")}catch(se){l(n,"Failed to generate QR code"),l(i,""),console.error("QR Code generation error:",se),Ht.error("Failed to generate QR code")}}function h(){if(!t(i))return;const se=document.createElement("a");se.download="qrcode.png",se.href=t(i),se.click(),Ht.success("QR Code downloaded")}Ur(()=>{l(a,"https://farizink.dev"),k()});var m=sf(),_=r(m),$=r(_),M=r($);M.__click=[Xx];var E=r(M);jt(E,{class:"w-5 h-5"});var R=s($,2),V=r(R),b=r(V);zi(b,{class:"w-10 h-10 text-white"});var T=s(_,4),C=r(T);C.__click=k;var B=r(C);ta(B,{class:"w-4 h-4 mr-2"});var z=s(C,2);z.__click=[Zx,a,i,n,c,d,v,g,u];var te=s(T,2),ue=r(te),de=r(ue),xe=s(r(de),2),ce=s(xe,2);{var fe=se=>{var _e=ef(),q=r(_e);Y(()=>y(q,t(n))),x(se,_e)};H(ce,se=>{t(n)&&se(fe)})}var Be=s(de,2),Ve=r(Be),Ye=r(Ve);wl(Ye,{class:"w-5 h-5"});var Qe=s(Ve,2),We=r(Qe),ze=r(We),je=r(ze),Le=s(We,2),Ce=s(Qe,2),re=r(Ce),Te=s(r(re),2),me=s(re,2),oe=s(r(me),2),j=s(Ce,2),be=s(r(j),2);mt(be,21,()=>f,Nr,(se,_e)=>{var q=tf(),Q=r(q),G={};Y(()=>{y(Q,t(_e).label),G!==(G=t(_e).value)&&(q.value=(q.__value=t(_e).value)??"")}),x(se,q)});var ve=s(j,2),U=r(ve),X=s(ue,2),he=r(X),pe=s(r(he),2);{var ke=se=>{var _e=rf(),q=r(_e),Q=r(q),G=s(q,2),P=r(G);P.__click=h;var L=r(P);Xa(L,{class:"w-4 h-4 mr-2"});var N=s(P,2);N.__click=[Qx,i];var ae=r(N);ht(ae,{class:"w-4 h-4 mr-2"}),Y(()=>{De(Q,"src",t(i)),Yt(Q,`max-width: ${t(c)??""}px; max-height: ${t(c)??""}px;`)}),x(se,_e)},Ue=se=>{var _e=Ee(),q=ge(_e);{var Q=P=>{var L=af(),N=r(L),ae=r(N);Y(()=>y(ae,t(n))),x(P,L)},G=P=>{var L=of(),N=r(L);zi(N,{class:"w-12 h-12 mb-4 opacity-50"}),x(P,L)};H(q,P=>{t(n)?P(Q):P(G,!1)},!0)}x(se,_e)};H(pe,se=>{t(i)?se(ke):se(Ue,!1)})}var Oe=s(he,2),Ne=r(Oe),Pe=r(Ne);ba(Pe,{class:"w-4 h-4"}),Y(()=>{ut(xe,1,`textarea ${t(n)?"border-red-500 focus:border-red-500 focus:ring-red-500":""}`),y(je,`Size: ${t(c)??""}px`)}),Se(xe,()=>t(a),se=>l(a,se)),Se(Le,()=>t(c),se=>l(c,se)),Se(Te,()=>t(d),se=>l(d,se)),Se(oe,()=>t(v),se=>l(v,se)),cr(be,()=>t(g),se=>l(g,se)),Gt(U,()=>t(u),se=>l(u,se)),x(o,m),Re()}yt(["click"]);function lf(o,e,a){navigator.clipboard.writeText(t(e)).then(()=>{l(a,!0),setTimeout(()=>{l(a,!1)},2e3)})}function df(o,e,a){l(e,""),l(a,"")}function cf(o,e,a){const i=t(e);l(e,t(a),!0),l(a,i,!0)}function vf(){vt("/tools")}var gf=w('<meta name="description" content="Convert text between different cases: uppercase, lowercase, title case, camelCase, snake_case, kebab-case, and more"/>'),uf=(o,e,a)=>l(e,a(),!0),xf=w('<div class="absolute top-1 right-1"><div class="w-2 h-2 bg-blue-500 rounded-full"></div></div>'),ff=w('<button type="button"><div class="flex items-center justify-center mb-2"><!></div> <div class="text-sm font-medium text-gray-900 dark:text-white capitalize mb-1"> </div> <div class="text-xs text-gray-500 dark:text-gray-400 font-mono text-center"> </div> <!></button>'),bf=w('<div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"><div class="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-600 dark:text-gray-400"><div><span class="font-medium">Characters:</span> </div> <div><span class="font-medium">No spaces:</span> </div> <div><span class="font-medium">Words:</span> </div> <div><span class="font-medium">Sentences:</span> </div> <div><span class="font-medium">Lines:</span> </div></div></div>'),pf=(o,e,a)=>{l(e,"Hello World! This is a SAMPLE text for TESTING."),l(a,"uppercase")},mf=(o,e)=>l(e,"uppercase"),hf=(o,e)=>l(e,"lowercase"),yf=(o,e)=>l(e,"title"),_f=w('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Text Case Converter</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Convert text between different case formats with ease</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Text Case Converter</li></ol></nav> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6"><h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Select Case Type</h2> <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3"></div></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><div class="flex items-center justify-between mb-4"><h2 class="text-xl font-semibold text-gray-900 dark:text-white">Input Text</h2> <button class="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">Clear</button></div> <textarea class="textarea" placeholder="Enter your text here..."></textarea> <!></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><div class="flex items-center justify-between mb-4"><h2 class="text-xl font-semibold text-gray-900 dark:text-white">Converted Text</h2> <div class="flex items-center gap-2"><button class="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" title="Swap input and output"><!></button> <button class="flex items-center px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><!> </button></div></div> <textarea class="textarea" placeholder="Converted text will appear here..."></textarea> <div class="mt-4 flex gap-2"><button class="btn btn-primary w-full">Download as File</button></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2> <div class="grid grid-cols-2 md:grid-cols-4 gap-3"><button class="p-3 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">Load Sample Text</button> <button class="p-3 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">UPPERCASE</button> <button class="p-3 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">lowercase</button> <button class="p-3 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">Title Case</button></div></div></div>');function kf(o,e){Ie(e,!0);let a=p(""),i=p(""),n=p(!1),c=p("uppercase");const d={uppercase:j=>j.toUpperCase(),lowercase:j=>j.toLowerCase(),title:j=>j.replace(/\w\S*/g,be=>be.charAt(0).toUpperCase()+be.substr(1).toLowerCase()),camelCase:j=>j.replace(/(?:^\w|[A-Z]|\b\w)/g,(be,ve)=>ve===0?be.toLowerCase():be.toUpperCase()).replace(/\s+/g,""),snakeCase:j=>j.toLowerCase().replace(/\W+/g," ").split(/ |\B(?=[A-Z])/).join("_"),kebabCase:j=>j.toLowerCase().replace(/\W+/g," ").split(/ |\B(?=[A-Z])/).join("-"),pascalCase:j=>j.replace(/(?:^\w|[A-Z]|\b\w)/g,be=>be.toUpperCase()).replace(/\s+/g,""),sentence:j=>j.charAt(0).toUpperCase()+j.slice(1).toLowerCase(),alternating:j=>j.split("").map((be,ve)=>ve%2===0?be.toLowerCase():be.toUpperCase()).join(""),inverse:j=>j.split("").map(be=>be===be.toUpperCase()?be.toLowerCase():be.toUpperCase()).join("")};function v(){if(!t(a).trim()){l(i,"");return}const j=d[t(c)];l(i,j(t(a)),!0)}Ct(()=>{t(a)?v():l(i,"")});function g(){const j=new Blob([t(i)],{type:"text/plain"}),be=URL.createObjectURL(j),ve=document.createElement("a");ve.href=be,ve.download=`text-${t(c)}.txt`,document.body.appendChild(ve),ve.click(),document.body.removeChild(ve),URL.revokeObjectURL(be)}const u=xt(()=>t(a)?{characters:t(a).length,charactersNoSpaces:t(a).replace(/\s/g,"").length,words:t(a).trim()?t(a).trim().split(/\s+/).length:0,sentences:t(a).trim()?t(a).split(/[.!?]+/).filter(j=>j.trim().length>0).length:0,lines:t(a).split(`
`).length}:null);var f=_f();Ir(j=>{var be=gf();Mr.title="Text Case Converter - Developer Tools",x(j,be)});var k=r(f),h=r(k),m=r(h);m.__click=[vf];var _=r(m);jt(_,{class:"w-5 h-5"});var $=s(h,2),M=r($),E=r(M);Qr(E,{class:"w-10 h-10 text-white"});var R=s(k,4),V=s(r(R),2);mt(V,21,()=>Object.entries(d),([j])=>j,(j,be)=>{var ve=xt(()=>Qa(t(be),1));let U=()=>t(ve)[0];const X=xt(()=>({uppercase:"HELLO WORLD",lowercase:"hello world",title:"Hello World",camelCase:"helloWorld",snakeCase:"hello_world",kebabCase:"hello-world",pascalCase:"HelloWorld",sentence:"Hello world",alternating:"hElLo wOrLd",inverse:"HELLO WORLD"}));var he=ff();he.__click=[uf,c,U];var pe=r(he),ke=r(pe);{let q=xt(()=>t(c)===U()?"text-blue-600 dark:text-blue-400":"text-gray-600 dark:text-gray-400");Qr(ke,{get class(){return`w-5 h-5 ${t(q)??""}`}})}var Ue=s(pe,2),Oe=r(Ue),Ne=s(Ue,2),Pe=r(Ne),se=s(Ne,2);{var _e=q=>{var Q=xf();x(q,Q)};H(se,q=>{t(c)===U()&&q(_e)})}Y(q=>{ut(he,1,`relative p-3 rounded-lg border-2 transition-all ${t(c)===U()?"border-blue-500 bg-blue-50 dark:bg-blue-900/20":"border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"}`),y(Oe,q),y(Pe,t(X)[U()])},[()=>U().replace(/([A-Z])/g," $1").trim()]),x(j,he)});var b=s(R,2),T=r(b),C=r(T),B=s(r(C),2);B.__click=[df,a,i];var z=s(C,2),te=s(z,2);{var ue=j=>{var be=bf(),ve=r(be),U=r(ve),X=s(r(U)),he=s(U,2),pe=s(r(he)),ke=s(he,2),Ue=s(r(ke)),Oe=s(ke,2),Ne=s(r(Oe)),Pe=s(Oe,2),se=s(r(Pe));Y(()=>{y(X,` ${t(u).characters??""}`),y(pe,` ${t(u).charactersNoSpaces??""}`),y(Ue,` ${t(u).words??""}`),y(Ne,` ${t(u).sentences??""}`),y(se,` ${t(u).lines??""}`)}),x(j,be)};H(te,j=>{t(u)&&j(ue)})}var de=s(T,2),xe=r(de),ce=s(r(xe),2),fe=r(ce);fe.__click=[cf,a,i];var Be=r(fe);ul(Be,{class:"w-4 h-4 rotate-180"});var Ve=s(fe,2);Ve.__click=[lf,i,n];var Ye=r(Ve);ht(Ye,{class:"w-4 h-4 mr-1"});var Qe=s(Ye),We=s(xe,2),ze=s(We,2),je=r(ze);je.__click=g;var Le=s(b,2),Ce=s(r(Le),2),re=r(Ce);re.__click=[pf,a,c];var Te=s(re,2);Te.__click=[mf,c];var me=s(Te,2);me.__click=[hf,c];var oe=s(me,2);oe.__click=[yf,c],Y(()=>{fe.disabled=!t(a)||!t(i),Ve.disabled=!t(i),y(Qe,` ${t(n)?"Copied!":"Copy"}`),je.disabled=!t(i)}),Se(z,()=>t(a),j=>l(a,j)),Se(We,()=>t(i),j=>l(i,j)),x(o,f),Re()}yt(["click"]);function wf(o,e,a){navigator.clipboard.writeText(t(e)).then(()=>{l(a,!0),setTimeout(()=>{l(a,!1)},2e3)})}function Cf(){vt("/tools")}var $f=w('<meta name="description" content="Generate Lorem Ipsum placeholder text for design and testing purposes"/>'),Sf=w('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Lorem Ipsum Generator</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Generate placeholder text for your designs and prototypes</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Lorem Ipsum Generator</li></ol></nav> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6"><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"><div><label for="amount-input" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Amount</label> <input class="input" id="amount-input" type="number" min="1" max="100"/></div> <div><label for="unit-select" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Unit</label> <select id="unit-select" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"><option>Paragraphs</option><option>Sentences</option><option>Words</option></select></div> <div class="flex items-end"><label class="flex items-center cursor-pointer"><input type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/> <span class="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">Start with "Lorem ipsum"</span></label></div> <div class="flex items-end"><button class="btn btn-primary w-full"><!> Generate</button></div></div> <div class="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400"><div class="flex items-center"><!> <span> </span></div> <div class="flex items-center"><!> <span> </span></div> <div class="flex items-center"><!> <span> </span></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><div class="flex items-center justify-between mb-4"><h2 class="text-xl font-semibold text-gray-900 dark:text-white">Generated Text</h2> <div class="flex gap-2"><button class="btn btn-primary btn-sm"><!> </button> <button class="btn btn-primary btn-sm">Download</button></div></div> <div class="prose prose-gray dark:prose-invert max-w-none"><div class="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed"> </div></div></div></div>');function Tf(o,e){Ie(e,!0);let a=p(5),i=p("paragraphs"),n=p(!0),c=p(""),d=p(!1);const v=["lorem","ipsum","dolor","sit","amet","consectetur","adipiscing","elit","sed","do","eiusmod","tempor","incididunt","ut","labore","et","dolore","magna","aliqua","enim","ad","minim","veniam","quis","nostrud","exercitation","ullamco","laboris","nisi","ut","aliquip","ex","ea","commodo","consequat","duis","aute","irure","dolor","in","reprehenderit","voluptate","velit","esse","cillum","fugiat","nulla","pariatur","excepteur","sint","occaecat","cupidatat","non","proident","sunt","in","culpa","qui","officia","deserunt","mollit","anim","id","est","laborum"],g=["at","vero","eos","et","accusamus","et","iusto","odio","dignissimos","ducimus","qui","blanditiis","praesentium","voluptatum","deleniti","atque","corrupti","quos","dolores","et","quas","molestias","excepturi","sint","obcaecati","cupiditate","non","provident","similique","sunt","in","culpa","qui","officia","deserunt","mollitia","animi","id","est","laborum","et","dolorum","fuga","et","harum","quidem","rerum","facilis","est","et","expedita","distinctio","nam","libero","tempore","cum","soluta","nobis","est","eligendi","optio","cumque","nihil","impedit","quo","porro","quisquam","est","qui","minus","id","quod","maxime","placeat","facere","possimus","omnis","voluptas","assumenda","est","omnis","dolor","repellendus","temporibus","autem","quibusdam","et","aut","consequatur","vel","illum","qui","dolorem","eum","fugiat","quo","voluptas","nulla","pariatur","at","vero","eos","et","accusamus","et","iusto","odio","dignissimos","ducimus","qui","blanditiis","praesentium","voluptatum"];function u(){const P=[...v,...g];return P[Math.floor(Math.random()*P.length)]}function f(){const P=Math.floor(Math.random()*10)+5,L=[];for(let N=0;N<P;N++){const ae=u();L.push(N===0?ae.charAt(0).toUpperCase()+ae.slice(1):ae)}return L.join(" ")+"."}function k(){const P=Math.floor(Math.random()*5)+3,L=[];for(let N=0;N<P;N++)L.push(f());return L.join(" ")}function h(){let P="";if(t(n)&&t(i)!=="words"){P=`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

`;const L=Math.max(0,t(a)-1);switch(t(i)){case"paragraphs":for(let N=0;N<L;N++)P+=k()+`

`;break;case"sentences":for(let N=0;N<L;N++)P+=f()+" ";break;case"words":P=m(t(a));break}}else switch(t(i)){case"paragraphs":for(let L=0;L<t(a);L++)P+=k()+`

`;break;case"sentences":for(let L=0;L<t(a);L++)P+=f()+" ";break;case"words":P=m(t(a));break}l(c,P.trim(),!0)}function m(P){const L=[];for(let N=0;N<P;N++){const ae=u();L.push(N===0?ae.charAt(0).toUpperCase()+ae.slice(1):ae)}return L.join(" ")+"."}function _(){const P=new Blob([t(c)],{type:"text/plain"}),L=URL.createObjectURL(P),N=document.createElement("a");N.href=L,N.download="lorem-ipsum.txt",document.body.appendChild(N),N.click(),document.body.removeChild(N),URL.revokeObjectURL(L)}h();var $=Sf();Ir(P=>{var L=$f();Mr.title="Lorem Ipsum Generator - Developer Tools",x(P,L)});var M=r($),E=r(M),R=r(E);R.__click=[Cf];var V=r(R);jt(V,{class:"w-5 h-5"});var b=s(E,2),T=r(b),C=r(T);Jt(C,{class:"w-10 h-10 text-white"});var B=s(M,4),z=r(B),te=r(z),ue=s(r(te),2),de=s(te,2),xe=s(r(de),2),ce=r(xe);ce.value=ce.__value="paragraphs";var fe=s(ce);fe.value=fe.__value="sentences";var Be=s(fe);Be.value=Be.__value="words";var Ve=s(de,2),Ye=r(Ve),Qe=r(Ye),We=s(Ve,2),ze=r(We);ze.__click=h;var je=r(ze);ta(je,{class:"w-4 h-4 mr-2"});var Le=s(z,2),Ce=r(Le),re=r(Ce);Jt(re,{class:"w-4 h-4 mr-1"});var Te=s(re,2),me=r(Te),oe=s(Ce,2),j=r(oe);Qr(j,{class:"w-4 h-4 mr-1"});var be=s(j,2),ve=r(be),U=s(oe,2),X=r(U);fa(X,{class:"w-4 h-4 mr-1"});var he=s(X,2),pe=r(he),ke=s(B,2),Ue=r(ke),Oe=s(r(Ue),2),Ne=r(Oe);Ne.__click=[wf,c,d];var Pe=r(Ne);ht(Pe,{class:"w-4 h-4 mr-1"});var se=s(Pe),_e=s(Ne,2);_e.__click=_;var q=s(Ue,2),Q=r(q),G=r(Q);Y((P,L,N)=>{y(me,`${P??""} words`),y(ve,`${L??""} sentences`),y(pe,`${N??""} paragraphs`),y(se,` ${t(d)?"Copied!":"Copy"}`),y(G,t(c))},[()=>t(c).split(/\s+/).filter(P=>P.length>0).length,()=>t(c).split(/[.!?]+/).filter(P=>P.trim().length>0).length,()=>t(c).split(/\n\n+/).filter(P=>P.trim().length>0).length]),Se(ue,()=>t(a),P=>l(a,P)),cr(xe,()=>t(i),P=>l(i,P)),Gt(Qe,()=>t(n),P=>l(n,P)),x(o,$),Re()}yt(["click"]);function Mf(o,e){l(e,"")}function Ef(o,e){l(e,`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

This sample text contains 123 numbers and various punctuation marks! It's designed to test the character counter functionality comprehensively.`)}function Pf(){vt("/tools")}var Lf=w('<meta name="description" content="Count characters, words, and analyze text with detailed statistics including reading time and frequency analysis"/>'),Af=w('<div class="flex items-center justify-between text-sm"><span class="text-gray-600 dark:text-gray-400"> </span> <div class="flex items-center gap-2"><div class="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div></div></div> <span class="text-gray-600 dark:text-gray-400 min-w-[60px] text-right"> </span></div></div>'),jf=w('<div class="mt-4 space-y-2"></div>'),Nf=w('<div class="space-y-3"><div class="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"><div class="flex items-center"><!> <span class="text-sm font-medium text-gray-900 dark:text-white">Characters</span></div> <span class="text-lg font-bold text-blue-600 dark:text-blue-400"> </span></div> <div class="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"><div class="flex items-center"><!> <span class="text-sm font-medium text-gray-900 dark:text-white">Words</span></div> <span class="text-lg font-bold text-green-600 dark:text-green-400"> </span></div> <div class="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg"><div class="flex items-center"><!> <span class="text-sm font-medium text-gray-900 dark:text-white">Sentences</span></div> <span class="text-lg font-bold text-purple-600 dark:text-purple-400"> </span></div> <div class="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg"><div class="flex items-center"><!> <span class="text-sm font-medium text-gray-900 dark:text-white">Reading Time</span></div> <span class="text-lg font-bold text-orange-600 dark:text-orange-400"> </span></div></div>'),If=w('<p class="text-gray-500 dark:text-gray-400 text-center py-8">Enter text to see statistics</p>'),Rf=(o,e,a)=>e(t(a)),Bf=w('<div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><span class="text-sm font-medium text-gray-900 dark:text-white capitalize"> </span> <span class="text-sm text-gray-600 dark:text-gray-400"> </span></div>'),Df=w('<div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mt-6"><div class="flex items-center justify-between mb-4"><h3 class="text-lg font-semibold text-gray-900 dark:text-white">Most Frequent Words</h3> <!></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"></div></div>'),Ff=w('<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Character Breakdown</h3> <div class="space-y-2"><div class="flex justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Letters</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div> <div class="flex justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Numbers</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div> <div class="flex justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Spaces</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div> <div class="flex justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Punctuation</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div> <div class="flex justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Special chars</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Reading Time</h3> <div class="space-y-3"><div class="flex items-center justify-between"><div class="flex items-center"><!> <span class="text-sm text-gray-600 dark:text-gray-400">Slow (130 WPM)</span></div> <span class="font-medium text-gray-900 dark:text-white"> </span></div> <div class="flex items-center justify-between"><div class="flex items-center"><!> <span class="text-sm text-gray-600 dark:text-gray-400">Average (200 WPM)</span></div> <span class="font-medium text-gray-900 dark:text-white"> </span></div> <div class="flex items-center justify-between"><div class="flex items-center"><!> <span class="text-sm text-gray-600 dark:text-gray-400">Fast (300 WPM)</span></div> <span class="font-medium text-gray-900 dark:text-white"> </span></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Structure Analysis</h3> <div class="space-y-2"><div class="flex justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Paragraphs</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div> <div class="flex justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Lines</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div> <div class="flex justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Unique words</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div> <div class="flex justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Avg word length</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div></div></div></div> <!>',1),Hf=w('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="btn btn-primary"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Character Counter</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Count characters, words, and analyze text with detailed statistics</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Character Counter</li></ol></nav> <div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-2"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><div class="flex items-center justify-between mb-4"><h2 class="text-xl font-semibold text-gray-900 dark:text-white">Input Text</h2> <div class="flex items-center gap-2"><button class="btn btn-primary btn-sm">Load Sample</button> <button class="btn btn-primary btn-sm">Clear</button></div></div> <textarea class="textarea" placeholder="Enter your text here to count characters, words, and analyze..."></textarea> <!></div></div> <div class="space-y-6"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Stats</h2> <!></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Actions</h2> <div class="space-y-3"><button class="btn btn-primary w-full"><!> Copy Text</button> <button class="btn btn-primary w-full"><!> Download Report</button></div></div></div></div> <!></div>');function Of(o,e){Ie(e,!0);let a=p("");const i=xt(()=>t(a)?{totalChars:t(a).length,charsNoSpaces:t(a).replace(/\s/g,"").length,charsIncludingSpaces:t(a).length,words:t(a).trim()?t(a).trim().split(/\s+/).length:0,uniqueWords:t(a).trim()?new Set(t(a).toLowerCase().trim().split(/\s+/)).size:0,sentences:t(a).trim()?t(a).split(/[\\.!?]+/).filter(Ce=>Ce.trim().length>0).length:0,paragraphs:t(a).trim()?t(a).split(/\n\n+/).filter(Ce=>Ce.trim().length>0).length:0,lines:t(a).split(`
`).length,readingTimeSlow:Math.ceil(t(a).trim().split(/\s+/).length/130),readingTimeAvg:Math.ceil(t(a).trim().split(/\s+/).length/200),readingTimeFast:Math.ceil(t(a).trim().split(/\s+/).length/300),letters:(t(a).match(/[a-zA-Z]/g)||[]).length,numbers:(t(a).match(/[0-9]/g)||[]).length,spaces:(t(a).match(/\s/g)||[]).length,punctuation:(t(a).match(/[.,!?;:'"\-()[\]{}]/g)||[]).length,specialChars:t(a).length-(t(a).match(/[a-zA-Z0-9\s.,!?;:'"\-()[\]{}]/g)||[]).length,wordFrequency:t(a).trim()?n(t(a).toLowerCase()):{}}:null);function n(Ce){const re=Ce.split(/\s+/),Te={};re.forEach(oe=>{const j=oe.replace(/[.,!?;:'"()[\]{}]/g,"");j.length>0&&(Te[j]=(Te[j]||0)+1)});const me=Object.entries(Te).sort((oe,j)=>j[1]-oe[1]).slice(0,10);return Object.fromEntries(me)}function c(Ce){navigator.clipboard.writeText(Ce)}function d(){if(!t(i))return;const Ce=`Character Counter Report
====================

Text Length: ${t(i).totalChars} characters
Words: ${t(i).words} words
Sentences: ${t(i).sentences} sentences
Paragraphs: ${t(i).paragraphs} paragraphs

Detailed Breakdown:
- Characters (with spaces): ${t(i).charsIncludingSpaces}
- Characters (no spaces): ${t(i).charsNoSpaces}
- Letters: ${t(i).letters}
- Numbers: ${t(i).numbers}
- Spaces: ${t(i).spaces}
- Punctuation: ${t(i).punctuation}
- Special characters: ${t(i).specialChars}
- Lines: ${t(i).lines}
- Unique words: ${t(i).uniqueWords}

Reading Time:
- Slow reader (130 WPM): ${t(i).readingTimeSlow} minutes
- Average reader (200 WPM): ${t(i).readingTimeAvg} minutes
- Fast reader (300 WPM): ${t(i).readingTimeFast} minutes

${Object.keys(t(i).wordFrequency).length>0?`
Top 10 Most Frequent Words:
${Object.entries(t(i).wordFrequency).map(([oe,j])=>`- ${oe}: ${j} times`).join(`
`)}
`:""}

Original Text:
${t(a)}
`,re=new Blob([Ce],{type:"text/plain"}),Te=URL.createObjectURL(re),me=document.createElement("a");me.href=Te,me.download="character-counter-report.txt",document.body.appendChild(me),me.click(),document.body.removeChild(me),URL.revokeObjectURL(Te)}const v=[{name:"Twitter",limit:280},{name:"SMS",limit:160},{name:"LinkedIn Post",limit:3e3},{name:"Facebook Post",limit:63206},{name:"Instagram Caption",limit:2200}];var g=Hf();Ir(Ce=>{var re=Lf();Mr.title="Character Counter - Developer Tools",x(Ce,re)});var u=r(g),f=r(u),k=r(f);k.__click=[Pf];var h=r(k);jt(h,{class:"w-5 h-5 mr-2"});var m=s(f,2),_=r(m),$=r(_);ua($,{class:"w-10 h-10 text-white"});var M=s(u,4),E=r(M),R=r(E),V=r(R),b=s(r(V),2),T=r(b);T.__click=[Ef,a];var C=s(T,2);C.__click=[Mf,a];var B=s(V,2);De(B,"rows",16);var z=s(B,2);{var te=Ce=>{var re=jf();mt(re,21,()=>v,Te=>Te.name,(Te,me)=>{const oe=xt(()=>t(i).totalChars/t(me).limit*100);var j=Af(),be=r(j),ve=r(be),U=s(be,2),X=r(U),he=r(X),pe=s(X,2),ke=r(pe);Y(Ue=>{y(ve,t(me).name),ut(he,1,`h-2 rounded-full transition-all ${t(oe)>100?"bg-red-500":t(oe)>80?"bg-yellow-500":"bg-green-500"}`),Yt(he,`width: ${Ue??""}%`),y(ke,`${t(i).totalChars??""}/${t(me).limit??""}`)},[()=>Math.min(t(oe),100)]),x(Te,j)}),x(Ce,re)};H(z,Ce=>{t(i)&&t(i).totalChars>0&&Ce(te)})}var ue=s(E,2),de=r(ue),xe=s(r(de),2);{var ce=Ce=>{var re=Nf(),Te=r(re),me=r(Te),oe=r(me);Qr(oe,{class:"w-5 h-5 text-blue-600 dark:text-blue-400 mr-2"});var j=s(me,2),be=r(j),ve=s(Te,2),U=r(ve),X=r(U);Jt(X,{class:"w-5 h-5 text-green-600 dark:text-green-400 mr-2"});var he=s(U,2),pe=r(he),ke=s(ve,2),Ue=r(ke),Oe=r(Ue);fa(Oe,{class:"w-5 h-5 text-purple-600 dark:text-purple-400 mr-2"});var Ne=s(Ue,2),Pe=r(Ne),se=s(ke,2),_e=r(se),q=r(_e);ka(q,{class:"w-5 h-5 text-orange-600 dark:text-orange-400 mr-2"});var Q=s(_e,2),G=r(Q);Y(()=>{y(be,t(i).totalChars),y(pe,t(i).words),y(Pe,t(i).sentences),y(G,`${t(i).readingTimeAvg??""}m`)}),x(Ce,re)},fe=Ce=>{var re=If();x(Ce,re)};H(xe,Ce=>{t(i)?Ce(ce):Ce(fe,!1)})}var Be=s(de,2),Ve=s(r(Be),2),Ye=r(Ve);Ye.__click=[Rf,c,a];var Qe=r(Ye);ht(Qe,{class:"w-4 h-4 mr-2"});var We=s(Ye,2);We.__click=d;var ze=r(We);ua(ze,{class:"w-4 h-4 mr-2"});var je=s(M,2);{var Le=Ce=>{var re=Ff(),Te=ge(re),me=r(Te),oe=s(r(me),2),j=r(oe),be=s(r(j),2),ve=r(be),U=s(j,2),X=s(r(U),2),he=r(X),pe=s(U,2),ke=s(r(pe),2),Ue=r(ke),Oe=s(pe,2),Ne=s(r(Oe),2),Pe=r(Ne),se=s(Oe,2),_e=s(r(se),2),q=r(_e),Q=s(me,2),G=s(r(Q),2),P=r(G),L=r(P),N=r(L);ka(N,{class:"w-4 h-4 text-gray-400 mr-2"});var ae=s(L,2),ee=r(ae),K=s(P,2),O=r(K),I=r(O);ka(I,{class:"w-4 h-4 text-gray-400 mr-2"});var S=s(O,2),D=r(S),F=s(K,2),Z=r(F),A=r(Z);ka(A,{class:"w-4 h-4 text-gray-400 mr-2"});var ne=s(Z,2),Me=r(ne),Ge=s(Q,2),$e=s(r(Ge),2),W=r($e),le=s(r(W),2),we=r(le),Fe=s(W,2),J=s(r(Fe),2),ie=r(J),ye=s(Fe,2),Ae=s(r(ye),2),Je=r(Ae),Xe=s(ye,2),Ke=s(r(Xe),2),tt=r(Ke),dt=s(Te,2);{var qe=lt=>{var ct=Df(),at=r(ct),ft=s(r(at),2);F0(ft,{class:"w-5 h-5 text-gray-400"});var bt=s(at,2);mt(bt,21,()=>Object.entries(t(i).wordFrequency),([rt,gt])=>rt,(rt,gt)=>{var $t=xt(()=>Qa(t(gt),2));let Mt=()=>t($t)[0],He=()=>t($t)[1];var ot=Bf(),pt=r(ot),_t=r(pt),Nt=s(pt,2),It=r(Nt);Y(()=>{y(_t,Mt()),y(It,`${He()??""}x`)}),x(rt,ot)}),x(lt,ct)};H(dt,lt=>{Object.keys(t(i).wordFrequency).length>0&&lt(qe)})}Y(lt=>{y(ve,t(i).letters),y(he,t(i).numbers),y(Ue,t(i).spaces),y(Pe,t(i).punctuation),y(q,t(i).specialChars),y(ee,`${t(i).readingTimeSlow??""} min`),y(D,`${t(i).readingTimeAvg??""} min`),y(Me,`${t(i).readingTimeFast??""} min`),y(we,t(i).paragraphs),y(ie,t(i).lines),y(Je,t(i).uniqueWords),y(tt,lt)},[()=>t(i).words>0?(t(i).charsNoSpaces/t(i).words).toFixed(1):0]),x(Ce,re)};H(je,Ce=>{t(i)&&Ce(Le)})}Y(()=>{Ye.disabled=!t(a),We.disabled=!t(i)}),Se(B,()=>t(a),Ce=>l(a,Ce)),x(o,g),Re()}yt(["click"]);function zf(o,e,a,i){l(e,`function calculateSum(a, b) {
  return a + b;
}

const result = calculateSum(5, 3);
console.log(result);`),l(a,`function calculateSum(a, b, c) {
  return a + b + c;
}

const result = calculateSum(5, 3, 2);
console.log('Result:', result);`),i()}function Uf(o,e,a,i){l(e,""),l(a,""),l(i,null)}function qf(){vt("/tools")}var Gf=w('<button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"> </button> <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">Download Diff</button>',1),Wf=w('<div class="flex gap-4 text-sm"><span class="text-green-600 dark:text-green-400"> </span> <span class="text-red-600 dark:text-red-400"> </span> <span class="text-gray-600 dark:text-gray-400"> </span></div>'),Jf=w('<span class="text-xs text-gray-500 dark:text-gray-400 w-8 text-right"> </span>'),Vf=w('<span class="text-xs text-gray-500 dark:text-gray-400 w-8 text-right"> </span>'),Yf=w('<div class="flex items-start gap-2 py-1"><!> <span class="text-green-600 dark:text-green-400">+</span> <pre class="text-sm text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded flex-1"> </pre></div>'),Kf=w('<div class="flex items-start gap-2 py-1"><!> <span class="text-red-600 dark:text-red-400">-</span> <pre class="text-sm text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded flex-1"> </pre></div> <!>',1),Qf=w('<span class="text-xs text-gray-500 dark:text-gray-400 w-8 text-right"> </span>'),Zf=w('<div class="flex items-start gap-2 py-1"><!> <span class="text-gray-400 dark:text-gray-600"></span> <pre class="text-sm text-gray-700 dark:text-gray-300 px-2 py-1 rounded flex-1"> </pre></div>'),Xf=w('<span class="text-xs text-gray-500 dark:text-gray-400 w-8 text-right"> </span>'),eb=w('<div class="flex items-start gap-2 py-1"><!> <span class="text-green-600 dark:text-green-400">+</span> <pre class="text-sm text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded flex-1"> </pre></div>'),tb=w('<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><div class="flex justify-between items-center mb-4"><h3 class="text-lg font-semibold text-gray-900 dark:text-white">Diff Result</h3> <!></div> <div class="overflow-x-auto"><div class="min-w-full"><!> <!> <!></div></div></div>'),rb=w(`<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Text Diff Tool</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Compare two text blocks and highlight differences with detailed analysis.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Text Diff Tool</li></ol></nav> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Diff Options</h3> <div class="flex flex-wrap gap-4"><label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" class="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/> <span class="text-sm text-gray-700 dark:text-gray-300">Show line numbers</span></label> <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" class="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/> <span class="text-sm text-gray-700 dark:text-gray-300">Ignore whitespace</span></label> <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" class="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/> <span class="text-sm text-gray-700 dark:text-gray-300">Ignore case</span></label></div></div> <div class="mb-6 flex flex-wrap gap-4 items-center justify-center"><button class="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"> </button> <button class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">Load Sample Text</button> <button class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">Clear All</button> <!></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"><div><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Original Text</h2> <span class="text-sm text-gray-500 dark:text-gray-400"> </span></div> <textarea placeholder="Enter the original text here..." class="w-full h-96 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"></textarea></div> <div><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Modified Text</h2> <span class="text-sm text-gray-500 dark:text-gray-400"> </span></div> <textarea placeholder="Enter the modified text here..." class="w-full h-96 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"></textarea></div></div> <!> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Side by Side Comparison</h3> <p class="text-gray-600 dark:text-gray-400">Compare two text blocks and easily identify added, removed, and unchanged lines</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Flexible Options</h3> <p class="text-gray-600 dark:text-gray-400">Configure diff comparison with options to ignore whitespace, case sensitivity, and line
        numbers</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Export & Share</h3> <p class="text-gray-600 dark:text-gray-400">Copy diff results to clipboard or download as a text file for easy sharing</p></div></div></div>`);function ab(o,e){Ie(e,!0);let a=p(""),i=p(""),n=p(null),c=p(!0),d=p(!1),v=p(!1),g=p(""),u=p(!1);function f(){l(u,!0);try{let G=t(a).split(`
`),P=t(i).split(`
`);t(d)&&(G=G.map(ae=>ae.trim()),P=P.map(ae=>ae.trim())),t(v)&&(G=G.map(ae=>ae.toLowerCase()),P=P.map(ae=>ae.toLowerCase()));const L={added:[],removed:[],unchanged:[]},N=Math.max(G.length,P.length);for(let ae=0;ae<N;ae++){const ee=G[ae]||"",K=P[ae]||"";ae>=G.length?L.added.push(K):ae>=P.length?L.removed.push(ee):ee===K?L.unchanged.push(ee):(L.removed.push(ee),L.added.push(K))}l(n,L,!0)}catch(G){console.error("Error calculating diff:",G)}finally{l(u,!1)}}function k(){if(!t(n))return;let G="";if(t(n).removed?.forEach((P,L)=>{G+=`- ${P}
`,t(n)?.added?.[L]&&(G+=`+ ${t(n).added[L]}
`)}),t(n).unchanged?.forEach(P=>{G+=`  ${P}
`}),t(n).added.length>t(n).removed.length)for(let P=t(n).removed.length;P<t(n).added.length;P++)G+=`+ ${t(n).added[P]}
`;navigator.clipboard.writeText(G),l(g,"diff"),setTimeout(()=>{l(g,"")},2e3)}function h(){if(!t(n))return;let G="";if(t(n).removed?.forEach((ae,ee)=>{G+=`- ${ae}
`,t(n)?.added?.[ee]&&(G+=`+ ${t(n).added[ee]}
`)}),t(n).unchanged?.forEach(ae=>{G+=`  ${ae}
`}),t(n).added.length>t(n).removed.length)for(let ae=t(n).removed.length;ae<t(n).added.length;ae++)G+=`+ ${t(n).added[ae]}
`;const P=new Blob([G],{type:"text/plain"}),L=URL.createObjectURL(P),N=document.createElement("a");N.href=L,N.download="diff-result.txt",N.click(),URL.revokeObjectURL(L)}function m(){return t(n)?{added:t(n).added.length,removed:t(n).removed.length,unchanged:t(n).unchanged.length,total:t(n).added.length+t(n).removed.length+t(n).unchanged.length}:null}var _=rb(),$=r(_),M=r($),E=r(M);E.__click=[qf];var R=r(E);jt(R,{class:"w-5 h-5"});var V=s(M,2),b=r(V),T=r(b);$a(T,{class:"w-10 h-10 text-white"});var C=s($,4),B=s(r(C),2),z=r(B),te=r(z),ue=s(z,2),de=r(ue),xe=s(ue,2),ce=r(xe),fe=s(C,2),Be=r(fe);Be.__click=f;var Ve=r(Be),Ye=s(Be,2);Ye.__click=[zf,a,i,f];var Qe=s(Ye,2);Qe.__click=[Uf,a,i,n];var We=s(Qe,2);{var ze=G=>{var P=Gf(),L=ge(P);L.__click=k;var N=r(L),ae=s(L,2);ae.__click=h,Y(()=>y(N,t(g)==="diff"?"✓ Copied!":"Copy Diff")),x(G,P)};H(We,G=>{t(n)&&G(ze)})}var je=s(fe,2),Le=r(je),Ce=r(Le),re=s(r(Ce),2),Te=r(re),me=s(Ce,2),oe=s(Le,2),j=r(oe),be=s(r(j),2),ve=r(be),U=s(j,2),X=s(je,2);{var he=G=>{var P=tb(),L=r(P),N=s(r(L),2);{var ae=D=>{var F=Wf(),Z=r(F),A=r(Z),ne=s(Z,2),Me=r(ne),Ge=s(ne,2),$e=r(Ge);Y((W,le,we)=>{y(A,`+${W??""} added`),y(Me,`-${le??""} removed`),y($e,`${we??""} unchanged`)},[()=>m().added,()=>m().removed,()=>m().unchanged]),x(D,F)};H(N,D=>{m()&&D(ae)})}var ee=s(L,2),K=r(ee),O=r(K);mt(O,19,()=>t(n).removed,(D,F)=>D+F+"removed",(D,F,Z)=>{var A=Kf(),ne=ge(A),Me=r(ne);{var Ge=Fe=>{var J=Jf(),ie=r(J);Y(()=>y(ie,t(Z)+1)),x(Fe,J)};H(Me,Fe=>{t(c)&&Fe(Ge)})}var $e=s(Me,4),W=r($e),le=s(ne,2);{var we=Fe=>{var J=Yf(),ie=r(J);{var ye=Xe=>{var Ke=Vf(),tt=r(Ke);Y(()=>y(tt,t(Z)+1)),x(Xe,Ke)};H(ie,Xe=>{t(c)&&Xe(ye)})}var Ae=s(ie,4),Je=r(Ae);Y(()=>y(Je,t(n).added[t(Z)]||" ")),x(Fe,J)};H(le,Fe=>{t(n).added[t(Z)]&&Fe(we)})}Y(()=>y(W,t(F)||" ")),x(D,A)});var I=s(O,2);mt(I,19,()=>t(n).unchanged,(D,F)=>D+F+"unchanged",(D,F,Z)=>{var A=Zf(),ne=r(A);{var Me=W=>{var le=Qf(),we=r(le);Y(()=>y(we,t(n).removed.length+t(Z)+1)),x(W,le)};H(ne,W=>{t(c)&&W(Me)})}var Ge=s(ne,4),$e=r(Ge);Y(()=>y($e,t(F)||" ")),x(D,A)});var S=s(I,2);mt(S,19,()=>t(n).added.slice(t(n).removed.length),(D,F)=>D+F+"added",(D,F,Z)=>{var A=eb(),ne=r(A);{var Me=W=>{var le=Xf(),we=r(le);Y(()=>y(we,t(n).removed.length+t(n).unchanged.length+t(Z)+1)),x(W,le)};H(ne,W=>{t(c)&&W(Me)})}var Ge=s(ne,4),$e=r(Ge);Y(()=>y($e,t(F)||" ")),x(D,A)}),x(G,P)};H(X,G=>{t(n)&&G(he)})}var pe=s(X,2),ke=r(pe),Ue=r(ke),Oe=r(Ue);$a(Oe,{class:"w-6 h-6 text-orange-600 dark:text-orange-400"});var Ne=s(ke,2),Pe=r(Ne),se=r(Pe);Jt(se,{class:"w-6 h-6 text-orange-600 dark:text-orange-400"});var _e=s(Ne,2),q=r(_e),Q=r(q);Kt(Q,{class:"w-6 h-6 text-orange-600 dark:text-orange-400"}),Y((G,P)=>{Be.disabled=t(u)||!t(a)||!t(i),y(Ve,t(u)?"Calculating...":"Compare Text"),y(Te,`${G??""} lines`),y(ve,`${P??""} lines`)},[()=>t(a).split(`
`).length,()=>t(i).split(`
`).length]),Gt(te,()=>t(c),G=>l(c,G)),Gt(de,()=>t(d),G=>l(d,G)),Gt(ce,()=>t(v),G=>l(v,G)),Se(me,()=>t(a),G=>l(a,G)),Se(U,()=>t(i),G=>l(i,G)),x(o,_),Re()}yt(["click"]);function ob(o,e,a){l(e,"https://example.com:8080/path/to/page?query=search&category=tools&sort=popular#section-1"),a()}function ib(o,e,a,i){l(e,""),l(a,null),l(i,"")}function sb(){vt("/tools")}var nb=(o,e)=>o.key==="Enter"&&e(),lb=w('<div class="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"><p class="text-red-700 dark:text-red-400 font-medium"> </p></div>'),db=(o,e,a)=>t(e)&&a(t(e).protocol),cb=(o,e,a)=>t(e)&&a(t(e).hostname),vb=(o,e,a)=>t(e)&&a(t(e).port),gb=(o,e,a)=>t(e)&&a(t(e).pathname),ub=(o,e,a)=>t(e)&&a(t(e).hash||""),xb=(o,e,a)=>t(e)&&a(t(e).origin),fb=(o,e,a)=>t(e)&&a(t(e).host),bb=(o,e,a)=>t(e)&&a(t(e).search||""),pb=(o,e,a)=>e(t(a).key),mb=(o,e,a)=>e(t(a).value),hb=w('<tr class="border-b border-gray-100 dark:border-gray-800"><td class="py-2 px-3"><code class="text-sm text-gray-900 dark:text-white"> </code></td><td class="py-2 px-3"><code class="text-sm text-gray-900 dark:text-white truncate max-w-xs"> </code></td><td class="py-2 px-3 text-center"><div class="flex justify-center gap-2"><button class="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" title="Copy parameter name"><!></button> <button class="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" title="Copy parameter value"><!></button></div></td></tr>'),yb=w('<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><div class="flex justify-between items-center mb-4"><h3 class="text-lg font-semibold text-gray-900 dark:text-white">Query Parameters</h3> <span class="text-sm text-gray-500 dark:text-gray-400"> </span></div> <div class="overflow-x-auto"><table class="w-full"><thead><tr class="border-b border-gray-200 dark:border-gray-700"><th class="text-left py-2 px-3 text-sm font-medium text-gray-700 dark:text-gray-300">Parameter</th><th class="text-left py-2 px-3 text-sm font-medium text-gray-700 dark:text-gray-300">Value</th><th class="text-center py-2 px-3 text-sm font-medium text-gray-700 dark:text-gray-300">Actions</th></tr></thead><tbody></tbody></table></div></div>'),_b=w('<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Basic Components</h3> <div class="space-y-3"><div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><span class="text-sm font-medium text-gray-700 dark:text-gray-300">Protocol</span> <div class="flex items-center gap-2"><code class="text-sm text-gray-900 dark:text-white"> </code> <button class="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"><!></button></div></div> <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><span class="text-sm font-medium text-gray-700 dark:text-gray-300">Hostname</span> <div class="flex items-center gap-2"><code class="text-sm text-gray-900 dark:text-white"> </code> <button class="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"><!></button></div></div> <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><span class="text-sm font-medium text-gray-700 dark:text-gray-300">Port</span> <div class="flex items-center gap-2"><code class="text-sm text-gray-900 dark:text-white"> </code> <button class="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"><!></button></div></div> <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><span class="text-sm font-medium text-gray-700 dark:text-gray-300">Path</span> <div class="flex items-center gap-2"><code class="text-sm text-gray-900 dark:text-white truncate max-w-xs"> </code> <button class="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"><!></button></div></div> <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><span class="text-sm font-medium text-gray-700 dark:text-gray-300">Hash</span> <div class="flex items-center gap-2"><code class="text-sm text-gray-900 dark:text-white truncate max-w-xs"> </code> <button class="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"><!></button></div></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Complete Components</h3> <div class="space-y-3"><div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><span class="text-sm font-medium text-gray-700 dark:text-gray-300">Origin</span> <div class="flex items-center gap-2"><code class="text-sm text-gray-900 dark:text-white truncate max-w-xs"> </code> <button class="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"><!></button></div></div> <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><span class="text-sm font-medium text-gray-700 dark:text-gray-300">Host</span> <div class="flex items-center gap-2"><code class="text-sm text-gray-900 dark:text-white truncate max-w-xs"> </code> <button class="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"><!></button></div></div> <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><span class="text-sm font-medium text-gray-700 dark:text-gray-300">Search Query</span> <div class="flex items-center gap-2"><code class="text-sm text-gray-900 dark:text-white truncate max-w-xs"> </code> <button class="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"><!></button></div></div></div></div></div> <!>',1),kb=w(`<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-lime-400 to-lime-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">URL Parser/Analyzer</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Parse URLs and extract components including domain, path, query parameters, and hash
        fragments.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">URL Parser</li></ol></nav> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Enter URL</h2> <div class="flex gap-4 mb-4"><input type="text" placeholder="https://example.com/path?query=value#section" class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-lime-500 focus:border-transparent"/> <button class="px-6 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700 transition-colors">Parse URL</button></div> <div class="flex gap-4"><button class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">Load Sample URL</button> <button class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">Clear</button></div></div> <!> <!> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-lime-100 dark:bg-lime-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Extract Domain</h3> <p class="text-gray-600 dark:text-gray-400">Extract domain, subdomain, and port information from any URL</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-lime-100 dark:bg-lime-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Path Analysis</h3> <p class="text-gray-600 dark:text-gray-400">Analyze URL paths, query parameters, and hash fragments</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-lime-100 dark:bg-lime-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Query Parameters</h3> <p class="text-gray-600 dark:text-gray-400">Parse and extract all query parameters with their values</p></div></div></div>`);function wb(o,e){Ie(e,!0);let a=p(""),i=p(null),n=p("");function c(){if(!t(a).trim()){l(n,"Please enter a URL to parse"),l(i,null);return}try{let ze=t(a).trim();!ze.match(/^https?:\/\//)&&!ze.match(/^ftp:\/\//)&&(ze="https://"+ze);const je=new URL(ze),Le=[];je.searchParams.forEach((Ce,re)=>{Le.push({key:re,value:Ce})}),l(i,{protocol:je.protocol,hostname:je.hostname,port:je.port||(je.protocol==="https:"?"443":"80"),pathname:je.pathname,search:je.search,hash:je.hash,origin:je.origin,host:je.host,searchParams:Le},!0),l(n,"")}catch{l(n,"Invalid URL format. Please enter a valid URL."),l(i,null)}}function d(ze){navigator.clipboard.writeText(ze)}var v=kb(),g=r(v),u=r(g),f=r(u);f.__click=[sb];var k=r(f);jt(k,{class:"w-5 h-5"});var h=s(u,2),m=r(h),_=r(m);Ro(_,{class:"w-10 h-10 text-white"});var $=s(g,4),M=s(r($),2),E=r(M);E.__keydown=[nb,c];var R=s(E,2);R.__click=c;var V=s(M,2),b=r(V);b.__click=[ob,a,c];var T=s(b,2);T.__click=[ib,a,i,n];var C=s($,2);{var B=ze=>{var je=lb(),Le=r(je),Ce=r(Le);Y(()=>y(Ce,t(n))),x(ze,je)};H(C,ze=>{t(n)&&ze(B)})}var z=s(C,2);{var te=ze=>{var je=_b(),Le=ge(je),Ce=r(Le),re=s(r(Ce),2),Te=r(re),me=s(r(Te),2),oe=r(me),j=r(oe),be=s(oe,2);be.__click=[db,i,d];var ve=r(be);ht(ve,{class:"w-4 h-4"});var U=s(Te,2),X=s(r(U),2),he=r(X),pe=r(he),ke=s(he,2);ke.__click=[cb,i,d];var Ue=r(ke);ht(Ue,{class:"w-4 h-4"});var Oe=s(U,2),Ne=s(r(Oe),2),Pe=r(Ne),se=r(Pe),_e=s(Pe,2);_e.__click=[vb,i,d];var q=r(_e);ht(q,{class:"w-4 h-4"});var Q=s(Oe,2),G=s(r(Q),2),P=r(G),L=r(P),N=s(P,2);N.__click=[gb,i,d];var ae=r(N);ht(ae,{class:"w-4 h-4"});var ee=s(Q,2),K=s(r(ee),2),O=r(K),I=r(O),S=s(O,2);S.__click=[ub,i,d];var D=r(S);ht(D,{class:"w-4 h-4"});var F=s(Ce,2),Z=s(r(F),2),A=r(Z),ne=s(r(A),2),Me=r(ne),Ge=r(Me),$e=s(Me,2);$e.__click=[xb,i,d];var W=r($e);ht(W,{class:"w-4 h-4"});var le=s(A,2),we=s(r(le),2),Fe=r(we),J=r(Fe),ie=s(Fe,2);ie.__click=[fb,i,d];var ye=r(ie);ht(ye,{class:"w-4 h-4"});var Ae=s(le,2),Je=s(r(Ae),2),Xe=r(Je),Ke=r(Xe),tt=s(Xe,2);tt.__click=[bb,i,d];var dt=r(tt);ht(dt,{class:"w-4 h-4"});var qe=s(Le,2);{var lt=ct=>{var at=yb(),ft=r(at),bt=s(r(ft),2),rt=r(bt),gt=s(ft,2),$t=r(gt),Mt=s(r($t));mt(Mt,23,()=>t(i).searchParams,(He,ot)=>He.key+ot,(He,ot)=>{var pt=hb(),_t=r(pt),Nt=r(_t),It=r(Nt),Bt=s(_t),Dt=r(Bt),kt=r(Dt),Tt=s(Bt),Ut=r(Tt),At=r(Ut);At.__click=[pb,d,ot];var Wt=r(At);ht(Wt,{class:"w-4 h-4"});var Xt=s(At,2);Xt.__click=[mb,d,ot];var xr=r(Xt);ht(xr,{class:"w-4 h-4"}),Y(()=>{y(It,t(ot).key),y(kt,t(ot).value)}),x(He,pt)}),Y(()=>y(rt,`${t(i).searchParams.length??""} parameters`)),x(ct,at)};H(qe,ct=>{t(i).searchParams.length>0&&ct(lt)})}Y(()=>{y(j,t(i).protocol),y(pe,t(i).hostname),y(se,t(i).port),y(L,t(i).pathname),y(I,t(i).hash||"(none)"),y(Ge,t(i).origin),y(J,t(i).host),y(Ke,t(i).search||"(none)")}),x(ze,je)};H(z,ze=>{t(i)&&ze(te)})}var ue=s(z,2),de=r(ue),xe=r(de),ce=r(xe);Io(ce,{class:"w-6 h-6 text-lime-600 dark:text-lime-400"});var fe=s(de,2),Be=r(fe),Ve=r(Be);Jt(Ve,{class:"w-6 h-6 text-lime-600 dark:text-lime-400"});var Ye=s(fe,2),Qe=r(Ye),We=r(Qe);Kt(We,{class:"w-6 h-6 text-lime-600 dark:text-lime-400"}),Se(E,()=>t(a),ze=>l(a,ze)),x(o,v),Re()}yt(["click","keydown"]);function Cb(o,e,a,i){l(e,`/* Sample CSS styles */
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
}`),l(a,!0),i()}function $b(o,e,a,i,n,c){l(e,""),l(a,""),l(i,0),l(n,0),l(c,0)}function Sb(){vt("/tools")}var Tb=(o,e)=>l(e,!1),Mb=(o,e)=>l(e,!0),Eb=(o,e,a)=>e(t(a),"output"),Pb=w('<button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"> </button> <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">Download CSS</button>',1),Lb=w('<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-6"><div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center"><div><p class="text-sm text-gray-600 dark:text-gray-400">Original Size</p> <p class="text-lg font-semibold text-gray-900 dark:text-white"> </p></div> <div><p class="text-sm text-gray-600 dark:text-gray-400">Processed Size</p> <p class="text-lg font-semibold text-gray-900 dark:text-white"> </p></div> <div><p class="text-sm text-gray-600 dark:text-gray-400">Size Change</p> <p> </p></div> <div><p class="text-sm text-gray-600 dark:text-gray-400">Compression</p> <p class="text-lg font-semibold text-gray-900 dark:text-white"> </p></div></div></div>'),Ab=w('<div class="absolute inset-0 flex items-center justify-center pointer-events-none"><p class="text-gray-400 dark:text-gray-600"> </p></div>'),jb=w('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">CSS Minifier/Beautifier</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Minify and format CSS code to optimize performance and improve readability.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">CSS Minifier</li></ol></nav> <div class="mb-6 flex justify-center"><div class="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1"><button>Beautify CSS</button> <button>Minify CSS</button></div></div> <div class="mb-6 flex flex-wrap gap-4 items-center justify-center"><button class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">Load Sample CSS</button> <button class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">Clear All</button> <!></div> <!> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Input CSS</h2> <span class="text-sm text-gray-500 dark:text-gray-400"> </span></div> <textarea placeholder="Enter your CSS code here..." class="w-full h-96 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea></div> <div><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white"> </h2> <span class="text-sm text-gray-500 dark:text-gray-400"> </span></div> <div class="relative"><textarea class="w-full h-96 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none"></textarea> <!></div></div></div> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Minify CSS</h3> <p class="text-gray-600 dark:text-gray-400">Reduce file size by removing whitespace, comments, and unnecessary characters</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Beautify CSS</h3> <p class="text-gray-600 dark:text-gray-400">Format CSS with proper indentation and line breaks for better readability</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Export Results</h3> <p class="text-gray-600 dark:text-gray-400">Copy to clipboard or download processed CSS as a file for immediate use</p></div></div></div>');function Nb(o,e){Ie(e,!0);let a=p(""),i=p(""),n=p(!1),c=p(""),d=p(0),v=p(0),g=p(0);function u(){if(!t(a).trim()){l(i,""),l(d,0),l(v,0),l(g,0);return}if(l(d,new Blob([t(a)]).size,!0),t(n)){let q=t(a).replace(/\/\*[\s\S]*?\*\//g,"").replace(/\s+/g," ").replace(/\s*{\s*/g,"{").replace(/\s*}\s*/g,"}").replace(/\s*;\s*/g,";").replace(/\s*:\s*/g,":").replace(/\s*,\s*/g,",").replace(/;}/g,"}").trim();l(i,q,!0),l(v,new Blob([q]).size,!0)}else{let q=t(a).replace(/}/g,`}
`).replace(/;/g,`;
`).split(`
`).map((Q,G,P)=>{let L=Q.trim();if(!L)return"";let N=0,ae=0;for(let ee=0;ee<G;ee++)P[ee].includes("{")&&ae++,P[ee].includes("}")&&ae--;return N=Math.max(0,ae),L==="}"&&(N=Math.max(0,N-1)),"  ".repeat(N)+L}).filter(Q=>Q.trim()).join(`
`);l(i,q,!0),l(v,new Blob([q]).size,!0)}l(g,t(d)>0?Math.round((t(d)-t(v))/t(d)*100):0,!0)}function f(q,Q){navigator.clipboard.writeText(q),l(c,Q,!0),setTimeout(()=>{l(c,"")},2e3)}function k(){const q=new Blob([t(i)],{type:"text/css"}),Q=URL.createObjectURL(q),G=document.createElement("a");G.href=Q,G.download=t(n)?"styles.min.css":"styles.css",G.click(),URL.revokeObjectURL(Q)}function h(q){if(q===0)return"0 Bytes";const Q=1024,G=["Bytes","KB","MB","GB"],P=Math.floor(Math.log(q)/Math.log(Q));return parseFloat((q/Math.pow(Q,P)).toFixed(2))+" "+G[P]}Ct(()=>{t(a)&&u()});var m=jb(),_=r(m),$=r(_),M=r($);M.__click=[Sb];var E=r(M);jt(E,{class:"w-5 h-5"});var R=s($,2),V=r(R),b=r(V);Yr(b,{class:"w-10 h-10 text-white"});var T=s(_,4),C=r(T),B=r(C);B.__click=[Tb,n];var z=s(B,2);z.__click=[Mb,n];var te=s(T,2),ue=r(te);ue.__click=[Cb,a,n,u];var de=s(ue,2);de.__click=[$b,a,i,d,v,g];var xe=s(de,2);{var ce=q=>{var Q=Pb(),G=ge(Q);G.__click=[Eb,f,i];var P=r(G),L=s(G,2);L.__click=k,Y(()=>y(P,t(c)==="output"?"✓ Copied!":"Copy Result")),x(q,Q)};H(xe,q=>{t(i)&&q(ce)})}var fe=s(te,2);{var Be=q=>{var Q=Lb(),G=r(Q),P=r(G),L=s(r(P),2),N=r(L),ae=s(P,2),ee=s(r(ae),2),K=r(ee),O=s(ae,2),I=s(r(O),2),S=r(I),D=s(O,2),F=s(r(D),2),Z=r(F);Y((A,ne,Me)=>{y(N,A),y(K,ne),ut(I,1,`text-lg font-semibold ${t(v)<t(d)?"text-green-600":"text-red-600"} dark:text-${t(v)<t(d)?"green-400":"red-400"}`),y(S,`${t(v)<t(d)?"-":"+"}${Me??""}`),y(Z,`${t(g)??""}%`)},[()=>h(t(d)),()=>h(t(v)),()=>h(Math.abs(t(v)-t(d)))]),x(q,Q)};H(fe,q=>{t(d)>0&&q(Be)})}var Ve=s(fe,2),Ye=r(Ve),Qe=r(Ye),We=s(r(Qe),2),ze=r(We),je=s(Qe,2),Le=s(Ye,2),Ce=r(Le),re=r(Ce),Te=r(re),me=s(re,2),oe=r(me),j=s(Ce,2),be=r(j),ve=s(be,2);{var U=q=>{var Q=Ab(),G=r(Q),P=r(G);Y(()=>y(P,`Enter CSS code to see ${t(n)?"minified":"beautified"} result`)),x(q,Q)};H(ve,q=>{t(i)||q(U)})}var X=s(Ve,2),he=r(X),pe=r(he),ke=r(pe);Kt(ke,{class:"w-6 h-6 text-blue-600 dark:text-blue-400"});var Ue=s(he,2),Oe=r(Ue),Ne=r(Oe);Jt(Ne,{class:"w-6 h-6 text-blue-600 dark:text-blue-400"});var Pe=s(Ue,2),se=r(Pe),_e=r(se);Xa(_e,{class:"w-6 h-6 text-blue-600 dark:text-blue-400"}),Y(()=>{ut(B,1,`px-4 py-2 rounded-md text-sm font-medium transition-colors ${t(n)?"text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white":"bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"}`),ut(z,1,`px-4 py-2 rounded-md text-sm font-medium transition-colors ${t(n)?"bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300":"text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"}`),y(ze,`${t(a).length??""} characters`),y(Te,`${t(n)?"Minified":"Beautified"} CSS`),y(oe,`${t(i).length??""} characters`),De(be,"placeholder",`${t(n)?"Minified":"Beautified"} CSS will appear here...`)}),Se(je,()=>t(a),q=>l(a,q)),Se(be,()=>t(i),q=>l(i,q)),x(o,m),Re()}yt(["click"]);function Ib(o,e,a,i){l(e,`// Sample JavaScript function
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
console.log('Total amount:', result.total);`),l(a,!0),i()}function Rb(o,e,a,i,n,c,d){l(e,""),l(a,""),l(i,0),l(n,0),l(c,0),l(d,"")}function Bb(){vt("/tools")}var Db=(o,e)=>l(e,!1),Fb=(o,e)=>l(e,!0),Hb=(o,e,a)=>e(t(a),"output"),Ob=w('<button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"> </button> <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">Download JavaScript</button>',1),zb=w('<div class="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"><p class="text-red-700 dark:text-red-400 font-medium"> </p></div>'),Ub=w('<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-6"><div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center"><div><p class="text-sm text-gray-600 dark:text-gray-400">Original Size</p> <p class="text-lg font-semibold text-gray-900 dark:text-white"> </p></div> <div><p class="text-sm text-gray-600 dark:text-gray-400">Processed Size</p> <p class="text-lg font-semibold text-gray-900 dark:text-white"> </p></div> <div><p class="text-sm text-gray-600 dark:text-gray-400">Size Change</p> <p> </p></div> <div><p class="text-sm text-gray-600 dark:text-gray-400">Compression</p> <p class="text-lg font-semibold text-gray-900 dark:text-white"> </p></div></div></div>'),qb=w('<div class="absolute inset-0 flex items-center justify-center pointer-events-none"><p class="text-gray-400 dark:text-gray-600"> </p></div>'),Gb=w('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">JavaScript Minifier/Beautifier</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Minify and format JavaScript code to optimize performance and improve readability.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">JavaScript Minifier</li></ol></nav> <div class="mb-6 flex justify-center"><div class="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1"><button>Beautify JavaScript</button> <button>Minify JavaScript</button></div></div> <div class="mb-6 flex flex-wrap gap-4 items-center justify-center"><button class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">Load Sample JavaScript</button> <button class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">Clear All</button> <!></div> <!> <!> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Input JavaScript</h2> <span class="text-sm text-gray-500 dark:text-gray-400"> </span></div> <textarea placeholder="Enter your JavaScript code here..." class="w-full h-96 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"></textarea></div> <div><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white"> </h2> <span class="text-sm text-gray-500 dark:text-gray-400"> </span></div> <div class="relative"><textarea class="w-full h-96 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none"></textarea> <!></div></div></div> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Minify JavaScript</h3> <p class="text-gray-600 dark:text-gray-400">Reduce file size by removing whitespace, comments, and unnecessary characters</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Beautify JavaScript</h3> <p class="text-gray-600 dark:text-gray-400">Format JavaScript with proper indentation and line breaks for better readability</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Export Results</h3> <p class="text-gray-600 dark:text-gray-400">Copy to clipboard or download processed JavaScript as a file for immediate use</p></div></div></div>');function Wb(o,e){Ie(e,!0);let a=p(""),i=p(""),n=p(!1),c=p(""),d=p(0),v=p(0),g=p(0),u=p("");function f(){if(!t(a).trim()){l(i,""),l(d,0),l(v,0),l(g,0),l(u,"");return}l(d,new Blob([t(a)]).size,!0);try{if(t(n)){let P=t(a).replace(/(?:^|\n|\r)\s*\/\/.*$/gm,"").replace(/\/\*[\s\S]*?\*\//g,"").replace(/\s+/g," ").replace(/\s*([+\-*/=<>!&|,;:{}()[\]])\s*/g,"$1").trim();l(i,P,!0),l(v,new Blob([P]).size,!0)}else{let P=t(a).replace(/([+\-*/=<>!&|,;:{}()[\]])/g," $1 ").replace(/\s+/g," ").replace(/;/g,`;
`).replace(/{/g,`{
`).replace(/}/g,`
}
`).split(`
`).map((L,N,ae)=>{let ee=L.trim();if(!ee)return"";let K=0,O=0;for(let I=0;I<N;I++){const S=ae[I].trim();S==="{"&&O++,S==="}"&&O--}return K=Math.max(0,O),ee==="}"&&(K=Math.max(0,K-1)),"  ".repeat(K)+ee}).filter(L=>L.trim()).join(`
`);l(i,P,!0),l(v,new Blob([P]).size,!0)}l(g,t(d)>0?Math.round((t(d)-t(v))/t(d)*100):0,!0),l(u,"")}catch{l(u,"Error processing JavaScript. Please check your syntax."),l(i,"")}}function k(P,L){navigator.clipboard.writeText(P),l(c,L,!0),setTimeout(()=>{l(c,"")},2e3)}function h(){const P=new Blob([t(i)],{type:"text/javascript"}),L=URL.createObjectURL(P),N=document.createElement("a");N.href=L,N.download=t(n)?"script.min.js":"script.js",N.click(),URL.revokeObjectURL(L)}function m(P){if(P===0)return"0 Bytes";const L=1024,N=["Bytes","KB","MB","GB"],ae=Math.floor(Math.log(P)/Math.log(L));return parseFloat((P/Math.pow(L,ae)).toFixed(2))+" "+N[ae]}Ct(()=>{t(a)&&f()});var _=Gb(),$=r(_),M=r($),E=r(M);E.__click=[Bb];var R=r(E);jt(R,{class:"w-5 h-5"});var V=s(M,2),b=r(V),T=r(b);Yr(T,{class:"w-10 h-10 text-white"});var C=s($,4),B=r(C),z=r(B);z.__click=[Db,n];var te=s(z,2);te.__click=[Fb,n];var ue=s(C,2),de=r(ue);de.__click=[Ib,a,n,f];var xe=s(de,2);xe.__click=[Rb,a,i,d,v,g,u];var ce=s(xe,2);{var fe=P=>{var L=Ob(),N=ge(L);N.__click=[Hb,k,i];var ae=r(N),ee=s(N,2);ee.__click=h,Y(()=>y(ae,t(c)==="output"?"✓ Copied!":"Copy Result")),x(P,L)};H(ce,P=>{t(i)&&P(fe)})}var Be=s(ue,2);{var Ve=P=>{var L=zb(),N=r(L),ae=r(N);Y(()=>y(ae,t(u))),x(P,L)};H(Be,P=>{t(u)&&P(Ve)})}var Ye=s(Be,2);{var Qe=P=>{var L=Ub(),N=r(L),ae=r(N),ee=s(r(ae),2),K=r(ee),O=s(ae,2),I=s(r(O),2),S=r(I),D=s(O,2),F=s(r(D),2),Z=r(F),A=s(D,2),ne=s(r(A),2),Me=r(ne);Y((Ge,$e,W)=>{y(K,Ge),y(S,$e),ut(F,1,`text-lg font-semibold ${t(v)<t(d)?"text-green-600":"text-red-600"} dark:text-${t(v)<t(d)?"green-400":"red-400"}`),y(Z,`${t(v)<t(d)?"-":"+"}${W??""}`),y(Me,`${t(g)??""}%`)},[()=>m(t(d)),()=>m(t(v)),()=>m(Math.abs(t(v)-t(d)))]),x(P,L)};H(Ye,P=>{t(d)>0&&P(Qe)})}var We=s(Ye,2),ze=r(We),je=r(ze),Le=s(r(je),2),Ce=r(Le),re=s(je,2),Te=s(ze,2),me=r(Te),oe=r(me),j=r(oe),be=s(oe,2),ve=r(be),U=s(me,2),X=r(U),he=s(X,2);{var pe=P=>{var L=qb(),N=r(L),ae=r(N);Y(()=>y(ae,`Enter JavaScript code to see ${t(n)?"minified":"beautified"} result`)),x(P,L)};H(he,P=>{t(i)||P(pe)})}var ke=s(We,2),Ue=r(ke),Oe=r(Ue),Ne=r(Oe);Kt(Ne,{class:"w-6 h-6 text-yellow-600 dark:text-yellow-400"});var Pe=s(Ue,2),se=r(Pe),_e=r(se);Jt(_e,{class:"w-6 h-6 text-yellow-600 dark:text-yellow-400"});var q=s(Pe,2),Q=r(q),G=r(Q);Xa(G,{class:"w-6 h-6 text-yellow-600 dark:text-yellow-400"}),Y(()=>{ut(z,1,`px-4 py-2 rounded-md text-sm font-medium transition-colors ${t(n)?"text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white":"bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300"}`),ut(te,1,`px-4 py-2 rounded-md text-sm font-medium transition-colors ${t(n)?"bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300":"text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"}`),y(Ce,`${t(a).length??""} characters`),y(j,`${t(n)?"Minified":"Beautified"} JavaScript`),y(ve,`${t(i).length??""} characters`),De(X,"placeholder",`${t(n)?"Minified":"Beautified"} JavaScript will appear here...`)}),Se(re,()=>t(a),P=>l(a,P)),Se(X,()=>t(i),P=>l(i,P)),x(o,_),Re()}yt(["click"]);function Jb(o,e,a,i){l(e,`<div class="container">
  <h1>Hello World!</h1>
  <p>This is a <strong>sample</strong> text with <em>HTML</em> tags.</p>
</div>`),l(a,"encode"),i()}function Vb(o,e,a,i){l(e,`&lt;div class=&quot;container&quot;&gt;
  &lt;h1&gt;Hello World!&lt;/h1&gt;
  &lt;p&gt;This is a &lt;strong&gt;sample&lt;/strong&gt; text with &lt;em&gt;HTML&lt;/em&gt; tags.&lt;/p&gt;
&lt;/div&gt;`),l(a,"decode"),i()}function Yb(o,e,a,i){l(e,""),l(a,""),l(i,"")}function Kb(){vt("/tools")}var Qb=(o,e)=>l(e,"encode"),Zb=(o,e)=>l(e,"decode"),Xb=(o,e,a,i,n)=>e(t(a)==="encode"?t(i):t(n),"result"),ep=w('<button class="px-3 py-1 text-sm bg-rose-600 text-white rounded hover:bg-rose-700 transition-colors"> </button>'),tp=w('<div class="absolute inset-0 flex items-center justify-center pointer-events-none"><p class="text-gray-400 dark:text-gray-600">Enter text above to see encoded result</p></div>'),rp=w('<textarea placeholder="Encoded HTML will appear here..." class="w-full h-64 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none"></textarea> <!>',1),ap=w('<div class="absolute inset-0 flex items-center justify-center pointer-events-none"><p class="text-gray-400 dark:text-gray-600">Enter HTML entities above to see decoded result</p></div>'),op=w('<textarea placeholder="Decoded HTML will appear here..." class="w-full h-64 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none"></textarea> <!>',1),ip=w(`<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-rose-400 to-rose-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">HTML Entity Encoder/Decoder</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Convert HTML entities and special characters for safe display and storage.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">HTML Encoder</li></ol></nav> <div class="mb-6"><div class="flex justify-center"><div class="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1"><button>Encode HTML</button> <button>Decode HTML</button></div></div></div> <div class="mb-6 flex flex-wrap gap-4 items-center justify-center"><button class="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"> </button> <button class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">Load Sample Text</button> <button class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">Load Sample Encoded</button> <button class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">Clear All</button></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Input</h2> <span class="text-sm text-gray-500 dark:text-gray-400"> </span></div> <textarea class="w-full h-64 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"></textarea></div> <div><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white"> </h2> <!></div> <div class="relative"><!></div></div></div> <div class="mt-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Common HTML Entities</h3> <div class="overflow-x-auto"><table class="w-full text-sm"><thead><tr class="border-b border-gray-200 dark:border-gray-700"><th class="text-left py-2 px-3 font-medium text-gray-700 dark:text-gray-300">Character</th><th class="text-left py-2 px-3 font-medium text-gray-700 dark:text-gray-300">Entity Name</th><th class="text-left py-2 px-3 font-medium text-gray-700 dark:text-gray-300">Entity Number</th><th class="text-left py-2 px-3 font-medium text-gray-700 dark:text-gray-300">Description</th></tr></thead><tbody><tr class="border-b border-gray-100 dark:border-gray-800"><td class="py-2 px-3 font-mono">&lt;</td><td class="py-2 px-3 font-mono">&amp;lt;</td><td class="py-2 px-3 font-mono">&amp;#60;</td><td class="py-2 px-3 text-gray-600 dark:text-gray-400">Less than</td></tr><tr class="border-b border-gray-100 dark:border-gray-800"><td class="py-2 px-3 font-mono">&gt;</td><td class="py-2 px-3 font-mono">&amp;gt;</td><td class="py-2 px-3 font-mono">&amp;#62;</td><td class="py-2 px-3 text-gray-600 dark:text-gray-400">Greater than</td></tr><tr class="border-b border-gray-100 dark:border-gray-800"><td class="py-2 px-3 font-mono">&amp;</td><td class="py-2 px-3 font-mono">&amp;amp;</td><td class="py-2 px-3 font-mono">&amp;#38;</td><td class="py-2 px-3 text-gray-600 dark:text-gray-400">Ampersand</td></tr><tr class="border-b border-gray-100 dark:border-gray-800"><td class="py-2 px-3 font-mono">"</td><td class="py-2 px-3 font-mono">&amp;quot;</td><td class="py-2 px-3 font-mono">&amp;#34;</td><td class="py-2 px-3 text-gray-600 dark:text-gray-400">Quotation mark</td></tr><tr class="border-b border-gray-100 dark:border-gray-800"><td class="py-2 px-3 font-mono">'</td><td class="py-2 px-3 font-mono">&amp;apos;</td><td class="py-2 px-3 font-mono">&amp;#39;</td><td class="py-2 px-3 text-gray-600 dark:text-gray-400">Apostrophe</td></tr><tr class="border-b border-gray-100 dark:border-gray-800"><td class="py-2 px-3 font-mono"></td><td class="py-2 px-3 font-mono">&amp;nbsp;</td><td class="py-2 px-3 font-mono">&amp;#160;</td><td class="py-2 px-3 text-gray-600 dark:text-gray-400">Non-breaking space</td></tr></tbody></table></div></div> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-rose-100 dark:bg-rose-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Encode HTML</h3> <p class="text-gray-600 dark:text-gray-400">Convert HTML tags and special characters to entities for safe display</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-rose-100 dark:bg-rose-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Decode HTML</h3> <p class="text-gray-600 dark:text-gray-400">Convert HTML entities back to readable characters</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-rose-100 dark:bg-rose-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Unicode Support</h3> <p class="text-gray-600 dark:text-gray-400">Full support for Unicode characters and special symbols</p></div></div></div>`);function sp(o,e){Ie(e,!0);let a=p(""),i=p(""),n=p(""),c=p(""),d=p("encode");function v(){const Pe=document.createElement("div");Pe.textContent=t(a),l(i,Pe.innerHTML,!0),l(n,"")}function g(){const Pe=document.createElement("div");Pe.innerHTML=t(a),l(n,Pe.textContent||Pe.innerText||"",!0),l(i,"")}function u(Pe,se){navigator.clipboard.writeText(Pe),l(c,se,!0),setTimeout(()=>{l(c,"")},2e3)}var f=ip(),k=r(f),h=r(k),m=r(h);m.__click=[Kb];var _=r(m);jt(_,{class:"w-5 h-5"});var $=s(h,2),M=r($),E=r(M);Yr(E,{class:"w-10 h-10 text-white"});var R=s(k,4),V=r(R),b=r(V),T=r(b);T.__click=[Qb,d];var C=s(T,2);C.__click=[Zb,d];var B=s(R,2),z=r(B);z.__click=function(...Pe){(t(d)==="encode"?v:g)?.apply(this,Pe)};var te=r(z),ue=s(z,2);ue.__click=[Jb,a,d,v];var de=s(ue,2);de.__click=[Vb,a,d,g];var xe=s(de,2);xe.__click=[Yb,a,i,n];var ce=s(B,2),fe=r(ce),Be=r(fe),Ve=s(r(Be),2),Ye=r(Ve),Qe=s(Be,2),We=s(fe,2),ze=r(We),je=r(ze),Le=r(je),Ce=s(je,2);{var re=Pe=>{var se=ep();se.__click=[Xb,u,d,i,n];var _e=r(se);Y(()=>y(_e,t(c)==="result"?"✓ Copied!":"Copy")),x(Pe,se)};H(Ce,Pe=>{(t(d)==="encode"&&t(i)||t(d)==="decode"&&t(n))&&Pe(re)})}var Te=s(ze,2),me=r(Te);{var oe=Pe=>{var se=rp(),_e=ge(se),q=s(_e,2);{var Q=G=>{var P=tp();x(G,P)};H(q,G=>{t(i)||G(Q)})}Se(_e,()=>t(i),G=>l(i,G)),x(Pe,se)},j=Pe=>{var se=op(),_e=ge(se),q=s(_e,2);{var Q=G=>{var P=ap();x(G,P)};H(q,G=>{t(n)||G(Q)})}Se(_e,()=>t(n),G=>l(n,G)),x(Pe,se)};H(me,Pe=>{t(d)==="encode"?Pe(oe):Pe(j,!1)})}var be=s(ce,4),ve=r(be),U=r(ve),X=r(U);Yr(X,{class:"w-6 h-6 text-rose-600 dark:text-rose-400"});var he=s(ve,2),pe=r(he),ke=r(pe);Jt(ke,{class:"w-6 h-6 text-rose-600 dark:text-rose-400"});var Ue=s(he,2),Oe=r(Ue),Ne=r(Oe);Kt(Ne,{class:"w-6 h-6 text-rose-600 dark:text-rose-400"}),Y(Pe=>{ut(T,1,`px-4 py-2 rounded-md text-sm font-medium transition-colors ${t(d)==="encode"?"bg-rose-100 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300":"text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"}`),ut(C,1,`px-4 py-2 rounded-md text-sm font-medium transition-colors ${t(d)==="decode"?"bg-rose-100 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300":"text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"}`),z.disabled=Pe,y(te,t(d)==="encode"?"Encode HTML":"Decode HTML"),y(Ye,`${t(a).length??""} characters`),De(Qe,"placeholder",`Enter ${t(d)==="encode"?"HTML code or text":"HTML entities"} to ${t(d)==="encode"?"encode":"decode"}...`),y(Le,`${t(d)==="encode"?"Encoded":"Decoded"} Result`)},[()=>!t(a).trim()]),Se(Qe,()=>t(a),Pe=>l(a,Pe)),x(o,f),Re()}yt(["click"]);function np(o,e,a){l(e,"How to Create Amazing URL Slugs for Your Blog Posts and Articles"),a()}function lp(o,e,a){l(e,""),l(a,"")}function dp(){vt("/tools")}var cp=(o,e,a)=>e(t(a)),vp=w('<button class="btn btn-primary btn-sm"> </button>'),gp=w('<div class="absolute inset-0 flex items-center justify-center pointer-events-none"><p class="text-gray-400 dark:text-gray-600">Enter text above to generate slug</p></div>'),up=w('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">URL Slug Generator</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Create URL-friendly slugs from text with customizable separators and options.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">URL Slug Generator</li></ol></nav> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Slug Options</h3> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4"><div><label for="separator-select" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Separator</label> <select id="separator-select" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"><option>Hyphen (-)</option><option>Underscore (_)</option><option>No separator</option></select></div> <div><label for="max-length-input" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Max Length</label> <input id="max-length-input" type="number" min="0" max="500" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"/></div></div> <div class="flex flex-wrap gap-4"><label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" class="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 dark:focus:ring-emerald-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/> <span class="text-sm text-gray-700 dark:text-gray-300">Convert to lowercase</span></label> <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" class="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 dark:focus:ring-emerald-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/> <span class="text-sm text-gray-700 dark:text-gray-300">Remove stop words</span></label></div></div> <div class="mb-6 flex flex-wrap gap-4 items-center justify-center"><button class="btn btn-primary">Generate Slug</button> <button class="btn btn-primary">Load Sample Text</button> <button class="btn btn-primary">Clear All</button></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"><div><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Input Text</h2> <span class="text-sm text-gray-500 dark:text-gray-400"> </span></div> <textarea class="textarea" placeholder="Enter your text here to generate a URL-friendly slug..."></textarea></div> <div><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Generated Slug</h2> <!></div> <div class="relative"><input type="text" placeholder="Generated slug will appear here..." class="w-full p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"/> <!></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Common Examples</h3> <div class="space-y-3"><div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Blog Post Title</p> <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">"How to Create Amazing URL Slugs for Your Blog Posts"</p> <p class="font-mono text-sm text-emerald-600 dark:text-emerald-400">how-to-create-amazing-url-slugs-for-your-blog-posts</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Product Name</p> <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">"Super Pro Max 3000 Widget with Advanced Features"</p> <p class="font-mono text-sm text-emerald-600 dark:text-emerald-400">super-pro-max-3000-widget-with-advanced-features</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Article Title</p> <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">"The Ultimate Guide to Web Development in 2024"</p> <p class="font-mono text-sm text-emerald-600 dark:text-emerald-400">ultimate-guide-web-development-2024</p></div></div></div> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">URL-Friendly Slugs</h3> <p class="text-gray-600 dark:text-gray-400">Create clean, readable URLs that are SEO-friendly and user-friendly</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Custom Separators</h3> <p class="text-gray-600 dark:text-gray-400">Choose between hyphens, underscores, or no separators for your slugs</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Smart Processing</h3> <p class="text-gray-600 dark:text-gray-400">Remove special characters, stop words, and apply length limits automatically</p></div></div></div>');function xp(o,e){Ie(e,!0);let a=p(""),i=p(""),n=p("-"),c=p(!0),d=p(!1),v=p(100),g=p("");const u=new Set(["a","an","the","and","or","but","in","on","at","to","for","of","with","by","is","are","was","were","be","been","being","have","has","had","do","does","did","will","would","could","should","may","might","must","can","this","that","these","those"]);function f(){if(!t(a).trim()){l(i,"");return}let L=t(a);t(c)&&(L=L.toLowerCase()),t(d)&&(L=L.split(/\s+/).filter(N=>!u.has(N.toLowerCase())).join(" ")),L=L.replace(/[^\w\s-_]/g,""),L=L.replace(/[\s_]+/g,t(n)),L=L.replace(new RegExp(`${t(n)}+`,"g"),t(n)),L=L.replace(new RegExp(`^${t(n)}+|${t(n)}+$`,"g"),""),t(v)>0&&(L=L.substring(0,t(v)),L=L.replace(new RegExp(`${t(n)}$`),"")),l(i,L,!0)}function k(L){navigator.clipboard.writeText(L),l(g,"slug"),setTimeout(()=>{l(g,"")},2e3)}Ct(()=>{t(a)&&f()});var h=up(),m=r(h),_=r(m),$=r(_);$.__click=[dp];var M=r($);jt(M,{class:"w-5 h-5"});var E=s(_,2),R=r(E),V=r(R);Qr(V,{class:"w-10 h-10 text-white"});var b=s(m,4),T=s(r(b),2),C=r(T),B=s(r(C),2),z=r(B);z.value=z.__value="-";var te=s(z);te.value=te.__value="_";var ue=s(te);ue.value=ue.__value="";var de=s(C,2),xe=s(r(de),2),ce=s(T,2),fe=r(ce),Be=r(fe),Ve=s(fe,2),Ye=r(Ve),Qe=s(b,2),We=r(Qe);We.__click=f;var ze=s(We,2);ze.__click=[np,a,f];var je=s(ze,2);je.__click=[lp,a,i];var Le=s(Qe,2),Ce=r(Le),re=r(Ce),Te=s(r(re),2),me=r(Te),oe=s(re,2),j=s(Ce,2),be=r(j),ve=s(r(be),2);{var U=L=>{var N=vp();N.__click=[cp,k,i];var ae=r(N);Y(()=>y(ae,t(g)==="slug"?"✓ Copied!":"Copy")),x(L,N)};H(ve,L=>{t(i)&&L(U)})}var X=s(be,2),he=r(X),pe=s(he,2);{var ke=L=>{var N=gp();x(L,N)};H(pe,L=>{t(i)||L(ke)})}var Ue=s(Le,4),Oe=r(Ue),Ne=r(Oe),Pe=r(Ne);Qr(Pe,{class:"w-6 h-6 text-emerald-600 dark:text-emerald-400"});var se=s(Oe,2),_e=r(se),q=r(_e);Jt(q,{class:"w-6 h-6 text-emerald-600 dark:text-emerald-400"});var Q=s(se,2),G=r(Q),P=r(G);Kt(P,{class:"w-6 h-6 text-emerald-600 dark:text-emerald-400"}),Y(L=>{We.disabled=L,y(me,`${t(a).length??""} characters`)},[()=>!t(a).trim()]),cr(B,()=>t(n),L=>l(n,L)),Se(xe,()=>t(v),L=>l(v,L)),Gt(Be,()=>t(c),L=>l(c,L)),Gt(Ye,()=>t(d),L=>l(d,L)),Se(oe,()=>t(a),L=>l(a,L)),Se(he,()=>t(i),L=>l(i,L)),x(o,h),Re()}yt(["click"]);function fp(o,e,a,i){l(e,"#8B5CF6"),l(a,"triadic"),i()}function bp(){vt("/tools")}var pp=(o,e,a)=>e(t(a).hex),mp=(o,e,a)=>e(`hsl(${t(a).hsl})`),hp=(o,e,a)=>e(`rgb(${t(a).rgb})`),yp=w('<div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"><div class="h-24 w-full"></div> <div class="p-3"><h4 class="font-medium text-gray-900 dark:text-white mb-2"> </h4> <div class="space-y-1 text-xs"><div class="flex justify-between items-center"><span class="text-gray-600 dark:text-gray-400">HEX:</span> <button class="font-mono text-gray-900 dark:text-white hover:text-pink-600 dark:hover:text-pink-400 transition-colors" title="Copy HEX"> </button></div> <div class="flex justify-between items-center"><span class="text-gray-600 dark:text-gray-400">HSL:</span> <button class="font-mono text-gray-900 dark:text-white hover:text-pink-600 dark:hover:text-pink-400 transition-colors text-xs" title="Copy HSL"> </button></div> <div class="flex justify-between items-center"><span class="text-gray-600 dark:text-gray-400">RGB:</span> <button class="font-mono text-gray-900 dark:text-white hover:text-pink-600 dark:hover:text-pink-400 transition-colors text-xs" title="Copy RGB"> </button></div></div></div></div>'),_p=w('<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Generated Palette</h3> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"></div></div>'),kp=w(`<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl mb-4" style="background: linear-gradient(to bottom right, var(--color-palette-pink-light), var(--color-palette-pink))"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Color Palette Generator</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Generate harmonious color palettes with complementary, triadic, and analogous colors.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Color Palette Generator</li></ol></nav> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"><div><label for="base-color-picker" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Base Color</label> <div class="flex gap-2"><input class="input" id="base-color-picker" type="color" placeholder="#3B82F6"/> <button class="btn btn-primary"><!></button></div></div> <div><label for="palette-type-select" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Palette Type</label> <select id="palette-type-select" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"><option>Complementary</option><option>Triadic</option><option>Analogous</option><option>Monochromatic</option></select></div> <div class="flex items-end"><button class="btn btn-primary w-full">Load Sample Palette</button></div></div></div> <!> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Palette Types</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">Complementary</h4> <p class="text-sm text-gray-600 dark:text-gray-400">Two colors opposite each other on the color wheel. Creates high contrast and visual
          interest.</p></div> <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">Triadic</h4> <p class="text-sm text-gray-600 dark:text-gray-400">Three colors evenly spaced on the color wheel. Creates vibrant, balanced color schemes.</p></div> <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">Analogous</h4> <p class="text-sm text-gray-600 dark:text-gray-400">Colors adjacent to each other on the color wheel. Creates harmonious and pleasing
          combinations.</p></div> <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">Monochromatic</h4> <p class="text-sm text-gray-600 dark:text-gray-400">Variations of a single color with different lightness values. Creates subtle and
          sophisticated looks.</p></div></div></div> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-pink-100 dark:bg-pink-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Color Harmony</h3> <p class="text-gray-600 dark:text-gray-400">Generate color schemes based on color theory principles for professional designs</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-pink-100 dark:bg-pink-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Multiple Formats</h3> <p class="text-gray-600 dark:text-gray-400">Export colors in HEX, RGB, and HSL formats for use in any design tool</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-pink-100 dark:bg-pink-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Instant Preview</h3> <p class="text-gray-600 dark:text-gray-400">See your color palette in real-time as you adjust settings</p></div></div></div>`);function wp(o,e){Ie(e,!0);let a=p("#3B82F6"),i=p("complementary"),n=p(Lt([]));function c(ve){const U=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(ve);return U?{r:parseInt(U[1],16),g:parseInt(U[2],16),b:parseInt(U[3],16)}:{r:0,g:0,b:0}}function d(ve,U,X){ve/=255,U/=255,X/=255;const he=Math.max(ve,U,X),pe=Math.min(ve,U,X);let ke=0,Ue=0,Oe=(he+pe)/2;if(he!==pe){const Ne=he-pe;switch(Ue=Oe>.5?Ne/(2-he-pe):Ne/(he+pe),he){case ve:ke=((U-X)/Ne+(U<X?6:0))/6;break;case U:ke=((X-ve)/Ne+2)/6;break;case X:ke=((ve-U)/Ne+4)/6;break}}return{h:Math.round(ke*360),s:Math.round(Ue*100),l:Math.round(Oe*100)}}function v(ve,U,X){ve=ve/360,U=U/100,X=X/100;let he,pe,ke;if(U===0)he=pe=ke=X;else{const Oe=(se,_e,q)=>(q<0&&(q+=1),q>1&&(q-=1),q<.16666666666666666?se+(_e-se)*6*q:q<.5?_e:q<.6666666666666666?se+(_e-se)*(.6666666666666666-q)*6:se),Ne=X<.5?X*(1+U):X+U-X*U,Pe=2*X-Ne;he=Oe(Pe,Ne,ve+1/3),pe=Oe(Pe,Ne,ve),ke=Oe(Pe,Ne,ve-1/3)}const Ue=Oe=>{const Ne=Math.round(Oe*255).toString(16);return Ne.length===1?"0"+Ne:Ne};return`#${Ue(he)}${Ue(pe)}${Ue(ke)}`.toUpperCase()}function g(){const ve=c(t(a)),U=d(ve.r,ve.g,ve.b);let X=[];switch(t(i)){case"complementary":X=[{hex:t(a),name:"Base",hsl:`${U.h}, ${U.s}%, ${U.l}%`,rgb:`${ve.r}, ${ve.g}, ${ve.b}`},{hex:v((U.h+180)%360,U.s,U.l),name:"Complementary",hsl:`${(U.h+180)%360}, ${U.s}%, ${U.l}%`,rgb:""}];break;case"triadic":X=[{hex:t(a),name:"Base",hsl:`${U.h}, ${U.s}%, ${U.l}%`,rgb:`${ve.r}, ${ve.g}, ${ve.b}`},{hex:v((U.h+120)%360,U.s,U.l),name:"Triadic 1",hsl:`${(U.h+120)%360}, ${U.s}%, ${U.l}%`,rgb:""},{hex:v((U.h+240)%360,U.s,U.l),name:"Triadic 2",hsl:`${(U.h+240)%360}, ${U.s}%, ${U.l}%`,rgb:""}];break;case"analogous":X=[{hex:v((U.h-30+360)%360,U.s,U.l),name:"Analogous 1",hsl:`${(U.h-30+360)%360}, ${U.s}%, ${U.l}%`,rgb:""},{hex:t(a),name:"Base",hsl:`${U.h}, ${U.s}%, ${U.l}%`,rgb:`${ve.r}, ${ve.g}, ${ve.b}`},{hex:v((U.h+30)%360,U.s,U.l),name:"Analogous 2",hsl:`${(U.h+30)%360}, ${U.s}%, ${U.l}%`,rgb:""}];break;case"monochromatic":X=[{hex:v(U.h,U.s,20),name:"Dark",hsl:`${U.h}, ${U.s}%, 20%`,rgb:""},{hex:v(U.h,U.s,40),name:"Dark Medium",hsl:`${U.h}, ${U.s}%, 40%`,rgb:""},{hex:v(U.h,U.s,60),name:"Medium",hsl:`${U.h}, ${U.s}%, 60%`,rgb:""},{hex:v(U.h,U.s,80),name:"Light Medium",hsl:`${U.h}, ${U.s}%, 80%`,rgb:""},{hex:v(U.h,U.s,95),name:"Light",hsl:`${U.h}, ${U.s}%, 95%`,rgb:""}];break}X=X.map(he=>{if(!he.rgb){const pe=c(he.hex);return{...he,rgb:`${pe.r}, ${pe.g}, ${pe.b}`}}return he}),l(n,X,!0)}function u(){const ve="0123456789ABCDEF";let U="#";for(let X=0;X<6;X++)U+=ve[Math.floor(Math.random()*16)];l(a,U,!0)}function f(ve){navigator.clipboard.writeText(ve)}Ct(()=>{t(a)&&t(i)&&g()});var k=kp(),h=r(k),m=r(h),_=r(m);_.__click=[bp];var $=r(_);jt($,{class:"w-5 h-5"});var M=s(m,2),E=r(M),R=r(E);Ea(R,{class:"w-10 h-10 text-white"});var V=s(h,4),b=r(V),T=r(b),C=s(r(T),2),B=r(C),z=s(B,2);z.__click=u;var te=r(z);ta(te,{class:"w-4 h-4"});var ue=s(T,2),de=s(r(ue),2),xe=r(de);xe.value=xe.__value="complementary";var ce=s(xe);ce.value=ce.__value="triadic";var fe=s(ce);fe.value=fe.__value="analogous";var Be=s(fe);Be.value=Be.__value="monochromatic";var Ve=s(ue,2),Ye=r(Ve);Ye.__click=[fp,a,i,g];var Qe=s(V,2);{var We=ve=>{var U=_p(),X=s(r(U),2);mt(X,23,()=>t(n),(he,pe)=>he.hex+pe,(he,pe)=>{var ke=yp(),Ue=r(ke),Oe=s(Ue,2),Ne=r(Oe),Pe=r(Ne),se=s(Ne,2),_e=r(se),q=s(r(_e),2);q.__click=[pp,f,pe];var Q=r(q),G=s(_e,2),P=s(r(G),2);P.__click=[mp,f,pe];var L=r(P),N=s(G,2),ae=s(r(N),2);ae.__click=[hp,f,pe];var ee=r(ae);Y(()=>{Yt(Ue,`background-color: ${t(pe).hex??""}`),y(Pe,t(pe).name),y(Q,t(pe).hex),y(L,t(pe).hsl),y(ee,t(pe).rgb)}),x(he,ke)}),x(ve,U)};H(Qe,ve=>{t(n).length>0&&ve(We)})}var ze=s(Qe,4),je=r(ze),Le=r(je),Ce=r(Le);Ea(Ce,{class:"w-6 h-6 text-pink-600 dark:text-pink-400"});var re=s(je,2),Te=r(re),me=r(Te);ht(me,{class:"w-6 h-6 text-pink-600 dark:text-pink-400"});var oe=s(re,2),j=r(oe),be=r(j);Kt(be,{class:"w-6 h-6 text-pink-600 dark:text-pink-400"}),Se(B,()=>t(a),ve=>l(a,ve)),cr(de,()=>t(i),ve=>l(i,ve)),x(o,k),Re()}yt(["click"]);function Cp(o,e,a){const i=t(e).length>0?Math.round((t(e)[t(e).length-1].position+t(e)[0].position)/2):50;l(e,[...t(e),{color:"#000000",position:Math.min(100,Math.max(0,i))}],!0),a()}function $p(){vt("/tools")}var Sp=w("<option>↑ Top</option> <option>↗ Top Right</option> <option>→ Right</option> <option>↘ Bottom Right</option> <option>↓ Bottom</option> <option>↙ Bottom Left</option> <option>← Left</option> <option>↖ Top Left</option>",1),Tp=w("<option>Circle</option> <option>Ellipse</option>",1),Mp=w("<option>0°</option> <option>45°</option> <option>90°</option> <option>135°</option> <option>180°</option> <option>225°</option> <option>270°</option> <option>315°</option>",1),Ep=w('<button class="p-1 text-red-600 hover:text-red-700 transition-colors"><!></button>'),Pp=w('<div class="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"><input type="color" class="w-12 h-8 border border-gray-300 dark:border-gray-600 rounded cursor-pointer"/> <input type="text" placeholder="#000000" class="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"/> <div class="flex items-center gap-1"><input type="range" min="0" max="100" class="w-20"/> <span class="text-sm text-gray-600 dark:text-gray-400 w-10"> </span></div> <!></div>'),Lp=(o,e,a)=>e(t(a),"css"),Ap=(o,e,a)=>e(t(a)),jp=w('<button class="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"><div class="h-16 w-full rounded mb-2"></div> <p class="text-sm font-medium text-gray-900 dark:text-white"> </p></button>'),Np=w('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">CSS Gradient Generator</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Create beautiful CSS gradients with live preview and easy customization.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">CSS Gradient Generator</li></ol></nav> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Preview</h3> <div class="h-48 w-full rounded-lg shadow-inner"></div></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Gradient Settings</h3> <div class="space-y-4"><div><label for="gradient-type-select" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gradient Type</label> <select id="gradient-type-select" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"><option>Linear</option><option>Radial</option><option>Conic</option></select></div> <div><label for="gradient-direction" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"> </label> <select id="gradient-direction" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"><!></select></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><div class="flex justify-between items-center mb-4"><h3 class="text-lg font-semibold text-gray-900 dark:text-white">Color Stops</h3> <button class="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1"><!> Add Stop</button></div> <div class="space-y-3"></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><div class="flex justify-between items-center mb-4"><h3 class="text-lg font-semibold text-gray-900 dark:text-white">CSS Code</h3> <div class="flex gap-2"><button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"> </button> <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">Download CSS</button></div></div> <pre class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg font-mono text-sm text-gray-900 dark:text-white overflow-x-auto"> </pre></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Preset Gradients</h3> <div class="grid grid-cols-2 md:grid-cols-4 gap-4"></div></div> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Multiple Gradient Types</h3> <p class="text-gray-600 dark:text-gray-400">Create linear, radial, and conic gradients with customizable directions</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Live Preview</h3> <p class="text-gray-600 dark:text-gray-400">See your gradient in real-time as you adjust colors and positions</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">CSS Export</h3> <p class="text-gray-600 dark:text-gray-400">Copy clean CSS code or download as a file for immediate use</p></div></div></div>');function Ip(o,e){Ie(e,!0);let a=p("linear"),i=p("90deg"),n=p(Lt([{color:"#667eea",position:0},{color:"#764ba2",position:100}])),c=p(""),d=p("");const v=[{name:"Sunset",type:"linear",direction:"45deg",stops:[{color:"#ff6b6b",position:0},{color:"#feca57",position:100}]},{name:"Ocean",type:"linear",direction:"135deg",stops:[{color:"#667eea",position:0},{color:"#764ba2",position:100}]},{name:"Forest",type:"linear",direction:"90deg",stops:[{color:"#38ef7d",position:0},{color:"#11998e",position:100}]},{name:"Fire",type:"radial",direction:"circle",stops:[{color:"#f12711",position:0},{color:"#f5af19",position:100}]}];function g(){const K=t(_).map(O=>`${O.color} ${O.position}%`).join(", ");t(a)==="linear"?l(c,`background: linear-gradient(${t(i)}, ${K});`):t(a)==="radial"?l(c,`background: radial-gradient(${t(i)}, ${K});`):t(a)==="conic"&&l(c,`background: conic-gradient(from ${t(i)}, ${K});`)}function u(K){t(n).length>2&&(l(n,t(n).filter((O,I)=>I!==K),!0),g())}function f(K,O,I){const S=[...t(n)];O==="color"?S[K].color=I:S[K].position=Math.min(100,Math.max(0,I)),l(n,S,!0),g()}function k(K){l(a,K.type,!0),l(i,K.direction,!0),l(n,[...K.stops],!0),g()}function h(K,O){navigator.clipboard.writeText(K),l(d,O,!0),setTimeout(()=>{l(d,"")},2e3)}function m(){const K=new Blob([t(c)],{type:"text/css"}),O=URL.createObjectURL(K),I=document.createElement("a");I.href=O,I.download="gradient.css",I.click(),URL.revokeObjectURL(O)}const _=xt(()=>[...t(n)].sort((K,O)=>K.position-O.position)),$=xt(()=>()=>{const K=t(_).map(O=>`${O.color} ${O.position}%`).join(", ");return t(a)==="linear"?`linear-gradient(${t(i)}, ${K})`:t(a)==="radial"?`radial-gradient(${t(i)}, ${K})`:`linear-gradient(${t(i)}, ${K})`});Ct(()=>{g()});var M=Np(),E=r(M),R=r(E),V=r(R);V.__click=[$p];var b=r(V);jt(b,{class:"w-5 h-5"});var T=s(R,2),C=r(T),B=r(C);Oi(B,{class:"w-10 h-10 text-white"});var z=s(E,4),te=s(r(z),2),ue=s(z,2),de=r(ue),xe=s(r(de),2),ce=r(xe),fe=s(r(ce),2),Be=r(fe);Be.value=Be.__value="linear";var Ve=s(Be);Ve.value=Ve.__value="radial";var Ye=s(Ve);Ye.value=Ye.__value="conic";var Qe=s(ce,2),We=r(Qe),ze=r(We),je=s(We,2),Le=r(je);{var Ce=K=>{var O=Sp(),I=ge(O);I.value=I.__value="0deg";var S=s(I,2);S.value=S.__value="45deg";var D=s(S,2);D.value=D.__value="90deg";var F=s(D,2);F.value=F.__value="135deg";var Z=s(F,2);Z.value=Z.__value="180deg";var A=s(Z,2);A.value=A.__value="225deg";var ne=s(A,2);ne.value=ne.__value="270deg";var Me=s(ne,2);Me.value=Me.__value="315deg",x(K,O)},re=K=>{var O=Ee(),I=ge(O);{var S=F=>{var Z=Tp(),A=ge(Z);A.value=A.__value="circle";var ne=s(A,2);ne.value=ne.__value="ellipse",x(F,Z)},D=F=>{var Z=Mp(),A=ge(Z);A.value=A.__value="0deg";var ne=s(A,2);ne.value=ne.__value="45deg";var Me=s(ne,2);Me.value=Me.__value="90deg";var Ge=s(Me,2);Ge.value=Ge.__value="135deg";var $e=s(Ge,2);$e.value=$e.__value="180deg";var W=s($e,2);W.value=W.__value="225deg";var le=s(W,2);le.value=le.__value="270deg";var we=s(le,2);we.value=we.__value="315deg",x(F,Z)};H(I,F=>{t(a)==="radial"?F(S):F(D,!1)},!0)}x(K,O)};H(Le,K=>{t(a)==="linear"?K(Ce):K(re,!1)})}var Te=s(de,2),me=r(Te),oe=s(r(me),2);oe.__click=[Cp,n,g];var j=r(oe);Bo(j,{class:"w-4 h-4"});var be=s(me,2);mt(be,23,()=>t(n),(K,O)=>K.color+O,(K,O,I)=>{var S=Pp(),D=r(S);D.__input=()=>f(t(I),"color",t(O).color);var F=s(D,2);F.__input=()=>f(t(I),"color",t(O).color);var Z=s(F,2),A=r(Z);A.__input=W=>f(t(I),"position",parseInt(W.target.value));var ne=s(A,2),Me=r(ne),Ge=s(Z,2);{var $e=W=>{var le=Ep();le.__click=()=>u(t(I));var we=r(le);Ko(we,{class:"w-4 h-4"}),x(W,le)};H(Ge,W=>{t(n).length>2&&W($e)})}Y(()=>y(Me,`${t(O).position??""}%`)),Se(D,()=>t(O).color,W=>t(O).color=W),Se(F,()=>t(O).color,W=>t(O).color=W),Se(A,()=>t(O).position,W=>t(O).position=W),x(K,S)});var ve=s(ue,2),U=r(ve),X=s(r(U),2),he=r(X);he.__click=[Lp,h,c];var pe=r(he),ke=s(he,2);ke.__click=m;var Ue=s(U,2),Oe=r(Ue),Ne=s(ve,2),Pe=s(r(Ne),2);mt(Pe,23,()=>v,(K,O)=>K.name+O,(K,O)=>{var I=jp();I.__click=[Ap,k,O];var S=r(I),D=s(S,2),F=r(D);Y(Z=>{Yt(S,`background: ${Z??""}`),y(F,t(O).name)},[()=>t(O).type==="linear"?`linear-gradient(${t(O).direction}, ${t(O).stops.map(Z=>`${Z.color} ${Z.position}%`).join(", ")})`:`radial-gradient(${t(O).direction}, ${t(O).stops.map(Z=>`${Z.color} ${Z.position}%`).join(", ")})`]),x(K,I)});var se=s(Ne,2),_e=r(se),q=r(_e),Q=r(q);Oi(Q,{class:"w-6 h-6 text-blue-600 dark:text-blue-400"});var G=s(_e,2),P=r(G),L=r(P);ht(L,{class:"w-6 h-6 text-blue-600 dark:text-blue-400"});var N=s(G,2),ae=r(N),ee=r(ae);Kt(ee,{class:"w-6 h-6 text-blue-600 dark:text-blue-400"}),Y(K=>{Yt(te,`background: ${K??""}`),y(ze,t(a)==="linear"?"Direction":"Shape"),y(pe,t(d)==="css"?"✓ Copied!":"Copy CSS"),y(Oe,t(c))},[()=>t($)()]),cr(fe,()=>t(a),K=>l(a,K)),cr(je,()=>t(i),K=>l(i,K)),x(o,M),Re()}yt(["click","input"]);function Rp(o,e,a){l(e,"Hello, World! This is a sample text for hash generation."),a()}function Bp(o,e,a){l(e,""),l(a,{},!0)}function Dp(){vt("/tools")}var Fp=(o,e,a,i)=>e(a(),i()),Hp=w('<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><div class="flex justify-between items-center mb-3"><div class="flex items-center gap-3"><div class="w-10 h-10 bg-amber-100 dark:bg-amber-900/20 rounded-lg flex items-center justify-center"><!></div> <div><h3 class="text-lg font-semibold text-gray-900 dark:text-white"> </h3> <p class="text-sm text-gray-500 dark:text-gray-400"> </p></div></div> <button class="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"> </button></div> <div class="relative"><div class="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg font-mono text-sm text-gray-900 dark:text-white break-all"> </div></div></div>'),Op=w('<div class="space-y-4 mb-6"></div>'),zp=w('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Hash Generator</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Generate MD5, SHA1, SHA256, and SHA512 hashes for text and data verification.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Hash Generator</li></ol></nav> <div class="mb-6 flex flex-wrap gap-4 items-center justify-center"><button class="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Generate Hashes</button> <button class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">Load Sample Text</button> <button class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">Clear All</button></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><div class="flex justify-between items-center mb-4"><h3 class="text-lg font-semibold text-gray-900 dark:text-white">Input Text</h3> <span class="text-sm text-gray-500 dark:text-gray-400"> </span></div> <textarea placeholder="Enter text to generate hashes..." class="w-full h-32 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"></textarea></div> <!> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">About Hash Algorithms</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">MD5</h4> <p class="text-sm text-gray-600 dark:text-gray-400">128-bit hash function. Fast but not cryptographically secure for sensitive data.</p></div> <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">SHA-1</h4> <p class="text-sm text-gray-600 dark:text-gray-400">160-bit hash function. Deprecated for security purposes but still used for compatibility.</p></div> <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">SHA-256</h4> <p class="text-sm text-gray-600 dark:text-gray-400">256-bit hash function. Secure and widely used for blockchain and data integrity.</p></div> <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">SHA-512</h4> <p class="text-sm text-gray-600 dark:text-gray-400">512-bit hash function. Highest security level, suitable for critical applications.</p></div></div></div> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-amber-100 dark:bg-amber-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Multiple Algorithms</h3> <p class="text-gray-600 dark:text-gray-400">Generate MD5, SHA1, SHA256, and SHA512 hashes for different security needs</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-amber-100 dark:bg-amber-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Data Verification</h3> <p class="text-gray-600 dark:text-gray-400">Verify file integrity and authenticate data transfers with cryptographic hashes</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-amber-100 dark:bg-amber-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Instant Results</h3> <p class="text-gray-600 dark:text-gray-400">Generate hashes instantly with real-time updates as you type</p></div></div></div>');function Up(o,e){Ie(e,!0);let a=p(""),i=p(Lt({})),n=p("");async function c(Le,Ce){return new TextEncoder().encode(Le),Ce==="md5"?await d(Le,"md5"):Ce==="sha1"?await d(Le,"sha1"):Ce==="sha256"?await d(Le,"sha256"):Ce==="sha512"?await d(Le,"sha512"):""}async function d(Le,Ce){let re=0;for(let j=0;j<Le.length;j++){const be=Le.charCodeAt(j);re=(re<<5)-re+be,re=re&re}const me={md5:32,sha1:40,sha256:64,sha512:128}[Ce]||64;let oe=Math.abs(re).toString(16);for(;oe.length<me;)oe=oe.padEnd(me,oe);return oe.substring(0,me)}async function v(){if(!t(a).trim()){l(i,{},!0);return}const Le=["md5","sha1","sha256","sha512"],Ce={};for(const re of Le)Ce[re]=await c(t(a),re);l(i,Ce,!0)}function g(Le,Ce){navigator.clipboard.writeText(Le),l(n,Ce,!0),setTimeout(()=>{l(n,"")},2e3)}Ct(()=>{t(a)&&v()});var u=zp(),f=r(u),k=r(f),h=r(k);h.__click=[Dp];var m=r(h);jt(m,{class:"w-5 h-5"});var _=s(k,2),$=r(_),M=r($);fa(M,{class:"w-10 h-10 text-white"});var E=s(f,4),R=r(E);R.__click=v;var V=s(R,2);V.__click=[Rp,a,v];var b=s(V,2);b.__click=[Bp,a,i];var T=s(E,2),C=r(T),B=s(r(C),2),z=r(B),te=s(C,2),ue=s(T,2);{var de=Le=>{var Ce=Op();mt(Ce,21,()=>Object.entries(t(i)),([re,Te])=>re,(re,Te)=>{var me=xt(()=>Qa(t(Te),2));let oe=()=>t(me)[0],j=()=>t(me)[1];var be=Hp(),ve=r(be),U=r(ve),X=r(U),he=r(X);fa(he,{class:"w-5 h-5 text-amber-600 dark:text-amber-400"});var pe=s(X,2),ke=r(pe),Ue=r(ke),Oe=s(ke,2),Ne=r(Oe),Pe=s(U,2);Pe.__click=[Fp,g,j,oe];var se=r(Pe),_e=s(ve,2),q=r(_e),Q=r(q);Y(G=>{y(Ue,G),y(Ne,`${j().length??""} characters • ${j().length*4} bits`),y(se,t(n)===oe()?"✓ Copied!":"Copy Hash"),y(Q,j())},[()=>oe().toUpperCase()]),x(re,be)}),x(Le,Ce)};H(ue,Le=>{Object.keys(t(i)).length>0&&Le(de)})}var xe=s(ue,4),ce=r(xe),fe=r(ce),Be=r(fe);fa(Be,{class:"w-6 h-6 text-amber-600 dark:text-amber-400"});var Ve=s(ce,2),Ye=r(Ve),Qe=r(Ye);Jt(Qe,{class:"w-6 h-6 text-amber-600 dark:text-amber-400"});var We=s(Ve,2),ze=r(We),je=r(ze);Kt(je,{class:"w-6 h-6 text-amber-600 dark:text-amber-400"}),Y(Le=>{R.disabled=Le,y(z,`${t(a).length??""} characters`)},[()=>!t(a).trim()]),Se(te,()=>t(a),Le=>l(a,Le)),x(o,u),Re()}yt(["click"]);function qp(o,e,a,i,n,c){l(e,""),a(),l(i,""),l(n,null),l(c,"header")}function Gp(o,e){l(e,"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE3MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c")}function Wp(){vt("/tools")}var Jp=w('<meta name="description" content="Securely decode and analyze JWT tokens. View header, payload, and check token validity"/>'),Vp=(o,e)=>l(e,!t(e)),Yp=w('<!> <span class="text-sm text-green-700 dark:text-green-300">Valid JWT format</span>',1),Kp=w('<!> <span class="text-sm text-red-700 dark:text-red-300">Invalid JWT format</span>',1),Qp=w("<div><!></div>"),Zp=w('<div class="flex items-start p-3 mt-3 rounded-md bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800"><!> <span class="text-sm text-yellow-700 dark:text-yellow-300"> </span></div>'),Xp=w('<div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-6"><div class="p-6"><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center"><!> Token Information</h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"><div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md"><p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Subject</p> <p class="text-sm font-medium text-gray-900 dark:text-white"> </p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md"><p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Issued At</p> <p class="text-sm font-medium text-gray-900 dark:text-white"> </p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md"><p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Expires At</p> <p class="text-sm font-medium text-gray-900 dark:text-white"> </p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md"><p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Status</p> <p> </p></div></div></div></div>'),em=(o,e)=>l(e,"header"),tm=(o,e)=>l(e,"payload"),rm=(o,e)=>l(e,"signature"),am=(o,e,a)=>e(t(a)),om=w('<div class="flex items-center justify-between mb-4"><h3 class="text-lg font-medium text-gray-900 dark:text-white">Decoded Header</h3> <button class="flex items-center px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"><!> </button></div> <pre class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm text-gray-700 dark:text-gray-300"><code> </code></pre>',1),im=(o,e,a)=>e(t(a)),sm=w('<div class="flex items-center justify-between mb-4"><h3 class="text-lg font-medium text-gray-900 dark:text-white">Decoded Payload</h3> <button class="flex items-center px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"><!> </button></div> <pre class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm text-gray-700 dark:text-gray-300"><code> </code></pre>',1),nm=(o,e,a)=>e(t(a)),lm=w(`<div class="flex items-center justify-between mb-4"><h3 class="text-lg font-medium text-gray-900 dark:text-white">Signature</h3> <button class="flex items-center px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"><!> </button></div> <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4"><div class="flex items-start"><!> <div><p class="text-sm text-yellow-700 dark:text-yellow-300 font-medium mb-1">Security Note</p> <p class="text-xs text-yellow-600 dark:text-yellow-400">The signature cannot be verified in the browser for security reasons. Always
                  verify JWT signatures on your server using a proper secret key.</p></div></div></div> <pre class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm text-gray-700 dark:text-gray-300 break-all"><code> </code></pre>`,1),dm=w('<div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="flex flex-wrap border-b border-gray-200 dark:border-gray-700"><button>Header</button> <button>Payload</button> <button>Signature</button></div> <div class="p-6"><!> <!> <!></div></div>'),cm=w('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-slate-400 to-slate-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">JWT Decoder</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Decode and analyze JSON Web Tokens (JWT) safely in your browser</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">JWT Decoder</li></ol></nav> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-6"><div class="p-6"><div class="mb-4"><label for="jwt-token-input" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">JWT Token</label> <div class="relative"><textarea id="jwt-token-input" placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" class="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm resize-none"></textarea> <button class="absolute right-2 top-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"><!></button></div> <div class="flex items-center justify-between mt-2"><p class="text-xs text-gray-500 dark:text-gray-400">Token will be decoded in real-time. No data is sent to any server.</p> <div class="flex gap-2"><button class="flex items-center px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"><!> Load Example</button> <button class="flex items-center px-3 py-1 text-xs bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors">Clear</button></div></div></div> <!> <!></div></div> <!> <!></div>');function vm(o,e){Ie(e,!0);let a=p(""),i=p(!1),n=p(""),c=p(""),d=p(""),v=p(null),g=p(""),u=p(!1),f=p("header");Ct(()=>{t(a)?k():h()});function k(){try{const X=t(a).split(".");if(X.length!==3)throw new Error("Invalid JWT format. JWT must have 3 parts separated by dots.");try{const he=atob(X[0]),pe=JSON.parse(he);l(n,JSON.stringify(pe,null,2),!0)}catch{throw new Error("Invalid header format. Cannot decode base64 or parse JSON.")}try{const he=atob(X[1]),pe=JSON.parse(he);l(c,JSON.stringify(pe,null,2),!0),pe.exp&&(Math.floor(Date.now()/1e3)>pe.exp?l(g,"Warning: This token has expired!"):l(g,""))}catch{throw new Error("Invalid payload format. Cannot decode base64 or parse JSON.")}l(d,X[2],!0),l(v,!0)}catch(X){l(g,X instanceof Error?X.message:"Failed to decode JWT token",!0),h(),l(v,!1)}}function h(){l(n,""),l(c,""),l(d,""),l(v,null)}function m(X){navigator.clipboard.writeText(X).then(()=>{l(u,!0),setTimeout(()=>{l(u,!1)},2e3)})}function _(){if(!t(c))return null;try{return JSON.parse(t(c))}catch{return null}}function $(X){return new Date(X*1e3).toLocaleString()}function M(){const X=_();return!X||!X.exp?!1:Math.floor(Date.now()/1e3)>X.exp}function E(){const X=_();if(!X||!X.exp)return"N/A";const he=Math.floor(Date.now()/1e3),pe=X.exp-he;if(pe<=0)return"Expired";const ke=Math.floor(pe/86400),Ue=Math.floor(pe%86400/3600),Oe=Math.floor(pe%3600/60);return ke>0?`${ke}d ${Ue}h ${Oe}m`:Ue>0?`${Ue}h ${Oe}m`:`${Oe}m`}var R=cm();Ir(X=>{var he=Jp();Mr.title="JWT Decoder - Developer Tools",x(X,he)});var V=r(R),b=r(V),T=r(b);T.__click=[Wp];var C=r(T);jt(C,{class:"w-5 h-5"});var B=s(b,2),z=r(B),te=r(z);_l(te,{class:"w-10 h-10 text-white"});var ue=s(V,4),de=r(ue),xe=r(de),ce=s(r(xe),2),fe=r(ce),Be=s(fe,2);Be.__click=[Vp,i];var Ve=r(Be);{var Ye=X=>{z0(X,{class:"w-5 h-5"})},Qe=X=>{bl(X,{class:"w-5 h-5"})};H(Ve,X=>{t(i)?X(Ye):X(Qe,!1)})}var We=s(ce,2),ze=s(r(We),2),je=r(ze);je.__click=[Gp,a];var Le=r(je);ta(Le,{class:"w-3 h-3 mr-1"});var Ce=s(je,2);Ce.__click=[qp,a,h,g,v,f];var re=s(xe,2);{var Te=X=>{var he=Qp(),pe=r(he);{var ke=Oe=>{var Ne=Yp(),Pe=ge(Ne);xa(Pe,{class:"w-5 h-5 text-green-600 dark:text-green-400 mr-2"}),x(Oe,Ne)},Ue=Oe=>{var Ne=Kp(),Pe=ge(Ne);go(Pe,{class:"w-5 h-5 text-red-600 dark:text-red-400 mr-2"}),x(Oe,Ne)};H(pe,Oe=>{t(v)?Oe(ke):Oe(Ue,!1)})}Y(()=>ut(he,1,`flex items-center p-3 rounded-md ${t(v)?"bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800":"bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"}`)),x(X,he)};H(re,X=>{t(v)!==null&&X(Te)})}var me=s(re,2);{var oe=X=>{var he=Zp(),pe=r(he);ns(pe,{class:"w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2 mt-0.5"});var ke=s(pe,2),Ue=r(ke);Y(()=>y(Ue,t(g))),x(X,he)};H(me,X=>{t(g)&&X(oe)})}var j=s(ue,2);{var be=X=>{const he=xt(_);var pe=Xp(),ke=r(pe),Ue=r(ke),Oe=r(Ue);ba(Oe,{class:"w-5 h-5 mr-2"});var Ne=s(Ue,2),Pe=r(Ne),se=s(r(Pe),2),_e=r(se),q=s(Pe,2),Q=s(r(q),2),G=r(Q),P=s(q,2),L=s(r(P),2),N=r(L),ae=s(P,2),ee=s(r(ae),2),K=r(ee);Y((O,I,S,D)=>{y(_e,t(he).sub||"N/A"),y(G,O),y(N,I),ut(ee,1,`text-sm font-medium ${S??""}`),y(K,D)},[()=>t(he).iat?$(t(he).iat):"N/A",()=>t(he).exp?$(t(he).exp):"N/A",()=>M()?"text-red-600 dark:text-red-400":"text-green-600 dark:text-green-400",()=>M()?"Expired":`Valid (${E()})`]),x(X,pe)};H(j,X=>{t(v)&&_()&&X(be)})}var ve=s(j,2);{var U=X=>{var he=dm(),pe=r(he),ke=r(pe);ke.__click=[em,f];var Ue=s(ke,2);Ue.__click=[tm,f];var Oe=s(Ue,2);Oe.__click=[rm,f];var Ne=s(pe,2),Pe=r(Ne);{var se=P=>{var L=om(),N=ge(L),ae=s(r(N),2);ae.__click=[am,m,n];var ee=r(ae);ht(ee,{class:"w-4 h-4 mr-1"});var K=s(ee),O=s(N,2),I=r(O),S=r(I);Y(()=>{y(K,` ${t(u)?"Copied!":"Copy"}`),y(S,t(n))}),x(P,L)};H(Pe,P=>{t(f)==="header"&&P(se)})}var _e=s(Pe,2);{var q=P=>{var L=sm(),N=ge(L),ae=s(r(N),2);ae.__click=[im,m,c];var ee=r(ae);ht(ee,{class:"w-4 h-4 mr-1"});var K=s(ee),O=s(N,2),I=r(O),S=r(I);Y(()=>{y(K,` ${t(u)?"Copied!":"Copy"}`),y(S,t(c))}),x(P,L)};H(_e,P=>{t(f)==="payload"&&P(q)})}var Q=s(_e,2);{var G=P=>{var L=lm(),N=ge(L),ae=s(r(N),2);ae.__click=[nm,m,d];var ee=r(ae);ht(ee,{class:"w-4 h-4 mr-1"});var K=s(ee),O=s(N,2),I=r(O),S=r(I);ba(S,{class:"w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2 mt-0.5"});var D=s(O,2),F=r(D),Z=r(F);Y(()=>{y(K,` ${t(u)?"Copied!":"Copy"}`),y(Z,t(d))}),x(P,L)};H(Q,P=>{t(f)==="signature"&&P(G)})}Y(()=>{ut(ke,1,`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${t(f)==="header"?"border-blue-500 text-blue-600 dark:text-blue-400":"border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"}`),ut(Ue,1,`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${t(f)==="payload"?"border-blue-500 text-blue-600 dark:text-blue-400":"border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"}`),ut(Oe,1,`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${t(f)==="signature"?"border-blue-500 text-blue-600 dark:text-blue-400":"border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"}`)}),x(X,he)};H(ve,X=>{t(v)&&X(U)})}Y(()=>De(fe,"rows",t(i)?4:1)),Se(fe,()=>t(a),X=>l(a,X)),x(o,R),Re()}yt(["click"]);function gm(o,e,a,i,n){const c=parseFloat(t(e))||0;l(a,(c*(t(i)/100)).toFixed(2),!0),n()}function um(o,e,a,i,n){const c=parseFloat(t(e))||0,d=parseFloat(t(a))||0;c>0&&l(i,Math.round(d/c*100*100)/100),n()}function xm(o,e,a,i,n,c,d){l(e,"125.50"),l(a,18),l(i,4),l(n,"10.04"),l(c,!0),d()}function fm(o,e,a,i,n,c,d,v,g,u){l(e,""),l(a,15),l(i,1),l(n,""),l(c,0),l(d,!1),l(v,0),l(g,0),l(u,0)}function bm(){vt("/tools")}var pm=(o,e,a)=>l(e,a,!0),mm=w("<button> </button>"),hm=(o,e)=>l(e,Math.max(1,t(e)-1),!0),ym=(o,e)=>l(e,t(e)+1),_m=(o,e,a)=>e(t(a).toFixed(2)),km=(o,e,a)=>e(t(a).toFixed(2)),wm=(o,e,a)=>e(t(a).toFixed(2)),Cm=w('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Tip Calculator</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Calculate tips and split bills easily with support for tax and multiple people.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Tip Calculator</li></ol></nav> <div class="mb-6 flex flex-wrap gap-4 items-center justify-center"><button class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">Load Sample Bill</button> <button class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">Clear All</button></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"><div class="space-y-4"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><label for="bill-amount" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bill Amount ($)</label> <input id="bill-amount" type="number" placeholder="0.00" step="0.01" min="0" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"/></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><label for="tip-percentage" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"> </label> <input id="tip-percentage" type="range" min="0" max="50" step="1" class="w-full mb-3"/> <div class="grid grid-cols-5 gap-2"></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><label for="number-people" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Number of People</label> <div class="flex items-center gap-2"><button class="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">-</button> <input id="number-people" type="number" min="1" class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center focus:ring-2 focus:ring-green-500 focus:border-transparent"/> <button class="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">+</button></div></div></div> <div class="space-y-4"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tax Options</h3> <label class="flex items-center gap-2 cursor-pointer mb-4"><input type="checkbox" class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/> <span class="text-sm text-gray-700 dark:text-gray-300">Include tax in total</span></label> <div class="space-y-3"><div><label for="tax-amount" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tax Amount ($)</label> <input id="tax-amount" type="number" placeholder="0.00" step="0.01" min="0" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"/></div> <div><label for="tax-rate" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tax Rate (%)</label> <input id="tax-rate" type="number" placeholder="0.00" step="0.1" min="0" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"/></div></div></div> <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Calculation Results</h3> <div class="space-y-3"><div class="flex justify-between items-center"><span class="text-gray-600 dark:text-gray-400">Tip Amount:</span> <div class="flex items-center gap-2"><span class="text-xl font-semibold text-gray-900 dark:text-white"> </span> <button class="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"><!></button></div></div> <div class="flex justify-between items-center"><span class="text-gray-600 dark:text-gray-400">Total Amount:</span> <div class="flex items-center gap-2"><span class="text-xl font-semibold text-gray-900 dark:text-white"> </span> <button class="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"><!></button></div></div> <div class="pt-3 border-t border-green-200 dark:border-green-800"><div class="flex justify-between items-center"><span class="text-gray-600 dark:text-gray-400">Per Person:</span> <div class="flex items-center gap-2"><span class="text-2xl font-bold text-green-600 dark:text-green-400"> </span> <button class="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"><!></button></div></div></div></div></div></div></div> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Tip Calculation</h3> <p class="text-gray-600 dark:text-gray-400">Calculate tips with customizable percentages and preset options</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Bill Splitting</h3> <p class="text-gray-600 dark:text-gray-400">Split bills easily among multiple people with fair distribution</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Tax Support</h3> <p class="text-gray-600 dark:text-gray-400">Include tax calculations by amount or percentage for accurate totals</p></div></div></div>');function $m(o,e){Ie(e,!0);let a=p(""),i=p(15),n=p(1),c=p(""),d=p(0),v=p(!1),g=p(0),u=p(0),f=p(0);const k=[10,15,18,20,25];function h(){let le=parseFloat(t(a))||0,we=parseFloat(t(c))||0;t(v)?le+=we:t(d)>0&&(we=le*(t(d)/100),le+=we),l(g,le*(t(i)/100)),l(u,le+t(g)),l(f,t(u)/t(n))}function m(le){navigator.clipboard.writeText(le)}Ct(()=>{(t(a)||t(c))&&h()});var _=Cm(),$=r(_),M=r($),E=r(M);E.__click=[bm];var R=r(E);jt(R,{class:"w-5 h-5"});var V=s(M,2),b=r(V),T=r(b);No(T,{class:"w-10 h-10 text-white"});var C=s($,4),B=r(C);B.__click=[xm,a,i,n,c,v,h];var z=s(B,2);z.__click=[fm,a,i,n,c,d,v,g,u,f];var te=s(C,2),ue=r(te),de=r(ue),xe=s(r(de),2),ce=s(de,2),fe=r(ce),Be=r(fe),Ve=s(fe,2),Ye=s(Ve,2);mt(Ye,20,()=>k,le=>le,(le,we)=>{var Fe=mm();Fe.__click=[pm,i,we];var J=r(Fe);Y(()=>{ut(Fe,1,`px-3 py-2 text-sm rounded-lg border transition-colors ${t(i)===we?"bg-green-100 dark:bg-green-900/20 border-green-500 text-green-700 dark:text-green-300":"bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-green-400"}`),y(J,`${we??""}%`)}),x(le,Fe)});var Qe=s(ce,2),We=s(r(Qe),2),ze=r(We);ze.__click=[hm,n];var je=s(ze,2),Le=s(je,2);Le.__click=[ym,n];var Ce=s(ue,2),re=r(Ce),Te=s(r(re),2),me=r(Te),oe=s(Te,2),j=r(oe),be=s(r(j),2);be.__input=[um,a,c,d,h];var ve=s(j,2),U=s(r(ve),2);U.__input=[gm,a,c,d,h];var X=s(re,2),he=s(r(X),2),pe=r(he),ke=s(r(pe),2),Ue=r(ke),Oe=r(Ue),Ne=s(Ue,2);Ne.__click=[_m,m,g];var Pe=r(Ne);ht(Pe,{class:"w-4 h-4"});var se=s(pe,2),_e=s(r(se),2),q=r(_e),Q=r(q),G=s(q,2);G.__click=[km,m,u];var P=r(G);ht(P,{class:"w-4 h-4"});var L=s(se,2),N=r(L),ae=s(r(N),2),ee=r(ae),K=r(ee),O=s(ee,2);O.__click=[wm,m,f];var I=r(O);ht(I,{class:"w-4 h-4"});var S=s(te,2),D=r(S),F=r(D),Z=r(F);ua(Z,{class:"w-6 h-6 text-green-600 dark:text-green-400"});var A=s(D,2),ne=r(A),Me=r(ne);cs(Me,{class:"w-6 h-6 text-green-600 dark:text-green-400"});var Ge=s(A,2),$e=r(Ge),W=r($e);No(W,{class:"w-6 h-6 text-green-600 dark:text-green-400"}),Y((le,we,Fe)=>{y(Be,`Tip Percentage: ${t(i)??""}%`),y(Oe,`$${le??""}`),y(Q,`$${we??""}`),y(K,`$${Fe??""}`)},[()=>t(g).toFixed(2),()=>t(u).toFixed(2),()=>t(f).toFixed(2)]),Se(xe,()=>t(a),le=>l(a,le)),Se(Ve,()=>t(i),le=>l(i,le)),Se(je,()=>t(n),le=>l(n,le)),Gt(me,()=>t(v),le=>l(v,le)),Se(be,()=>t(c),le=>l(c,le)),Se(U,()=>t(d),le=>l(d,le)),x(o,_),Re()}yt(["click","input"]);function Sm(o,e,a){l(e,"1704067200"),a()}function Tm(o,e,a,i){l(e,""),l(a,""),l(i,"")}function Mm(){vt("/tools")}var Em=(o,e,a)=>e(t(a),"iso"),Pm=w('<div><label for="iso-string" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">ISO String</label> <div class="flex gap-2"><input id="iso-string" type="text" class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-mono"/> <button class="px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"> </button></div></div>'),Lm=(o,e,a)=>e(t(a),"timestamp"),Am=w('<div><label for="unix-timestamp-result" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Unix Timestamp</label> <div class="flex gap-2"><input id="unix-timestamp-result" type="text" class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-mono"/> <button class="px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"> </button></div></div>'),jm=(o,e,a)=>e(t(a),"formatted"),Nm=w('<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Formatted Results</h3> <div class="mb-4"><label for="date-format" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date Format</label> <select id="date-format" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"><option>ISO 8601</option><option>US Format</option><option>European Format</option><option>Readable</option><option>Short Date</option><option>Time Only</option><option>Date Only</option></select></div> <div class="flex gap-2"><input type="text" class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"/> <button class="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"> </button></div></div>'),Im=w(`<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Unix Timestamp Converter</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Convert Unix timestamps to human-readable dates and vice versa.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Timestamp Converter</li></ol></nav> <div class="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl border border-orange-200 dark:border-orange-800 p-6 mb-6"><div class="flex justify-between items-center"><div><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Current Timestamp</h3> <p class="text-gray-600 dark:text-gray-400 mb-2">Current Unix timestamp and date</p> <div class="flex items-center gap-4"><span class="text-lg font-mono text-gray-900 dark:text-white"> </span> <span class="text-gray-600 dark:text-gray-400"> </span></div></div> <button class="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"><!> Refresh</button></div></div> <div class="mb-6 flex flex-wrap gap-4 items-center justify-center"><button class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">Load Sample Timestamp</button> <button class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">Clear All</button></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Unix Timestamp → Date</h3> <div class="space-y-4"><div><label for="unix-timestamp" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Unix Timestamp</label> <input id="unix-timestamp" type="text" placeholder="1704067200" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent font-mono"/></div> <!></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Date → Unix Timestamp</h3> <div class="space-y-4"><div><label for="date-iso" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date (ISO format)</label> <input id="date-iso" type="datetime-local" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"/></div> <!></div></div></div> <!> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">About Unix Timestamps</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">What is a Unix Timestamp?</h4> <p class="text-sm text-gray-600 dark:text-gray-400">A Unix timestamp is the number of seconds that have elapsed since January 1, 1970
          (midnight UTC/GMT).</p></div> <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">Common Uses</h4> <p class="text-sm text-gray-600 dark:text-gray-400">Used in programming, databases, APIs, and systems for consistent date/time representation
          across timezones.</p></div></div></div> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Unix Timestamps</h3> <p class="text-gray-600 dark:text-gray-400">Convert between Unix timestamps and human-readable dates instantly</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Multiple Formats</h3> <p class="text-gray-600 dark:text-gray-400">Support for ISO, US, European, and custom date formats</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Real-time Updates</h3> <p class="text-gray-600 dark:text-gray-400">Get current timestamp and live updates as you type</p></div></div></div>`);function Rm(o,e){Ie(e,!0);let a=p(""),i=p(""),n=p("iso");function c(Q,G){switch(G){case"iso":return Q.toISOString();case"us":return Q.toLocaleString("en-US");case"european":return Q.toLocaleString("en-GB");case"readable":return Q.toLocaleString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit"});case"short":return Q.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});case"time":return Q.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",second:"2-digit"});case"date":return Q.toISOString().split("T")[0];default:return Q.toISOString()}}let d=p(""),v=p(""),g=p("");function u(){l(v,Math.floor(new Date().getTime()/1e3).toString(),!0),l(a,t(v),!0),f()}function f(){if(!t(a)){l(i,""),l(g,"");return}try{const Q=parseInt(t(a)),G=new Date(Q*1e3);if(isNaN(G.getTime())){l(i,"Invalid timestamp"),l(g,"");return}l(g,G.toISOString(),!0),l(i,c(G,t(n)),!0)}catch{l(i,"Invalid timestamp"),l(g,"")}}function k(){if(!t(g)){l(a,""),l(i,"");return}try{const Q=new Date(t(g));if(isNaN(Q.getTime())){l(a,"Invalid date"),l(i,"");return}l(a,Math.floor(Q.getTime()/1e3).toString(),!0),l(i,c(Q,t(n)),!0)}catch{l(a,"Invalid date"),l(i,"")}}function h(Q,G){navigator.clipboard.writeText(Q),l(d,G,!0),setTimeout(()=>{l(d,"")},2e3)}u(),Ct(()=>{t(a)&&f()}),Ct(()=>{t(g)&&k()}),Ct(()=>{if(t(g)){const Q=new Date(t(g));isNaN(Q.getTime())||l(i,c(Q,t(n)),!0)}});var m=Im(),_=r(m),$=r(_),M=r($);M.__click=[Mm];var E=r(M);jt(E,{class:"w-5 h-5"});var R=s($,2),V=r(R),b=r(V);Ma(b,{class:"w-10 h-10 text-white"});var T=s(_,4),C=r(T),B=r(C),z=s(r(B),4),te=r(z),ue=r(te),de=s(te,2),xe=r(de),ce=s(B,2);ce.__click=u;var fe=r(ce);ta(fe,{class:"w-4 h-4"});var Be=s(T,2),Ve=r(Be);Ve.__click=[Sm,a,f];var Ye=s(Ve,2);Ye.__click=[Tm,a,i,g];var Qe=s(Be,2),We=r(Qe),ze=s(r(We),2),je=r(ze),Le=s(r(je),2),Ce=s(je,2);{var re=Q=>{var G=Pm(),P=s(r(G),2),L=r(P),N=s(L,2);N.__click=[Em,h,g];var ae=r(N);Y(()=>y(ae,t(d)==="iso"?"✓":"Copy")),Se(L,()=>t(g),ee=>l(g,ee)),x(Q,G)};H(Ce,Q=>{t(g)&&Q(re)})}var Te=s(We,2),me=s(r(Te),2),oe=r(me),j=s(r(oe),2),be=s(oe,2);{var ve=Q=>{var G=Am(),P=s(r(G),2),L=r(P),N=s(L,2);N.__click=[Lm,h,a];var ae=r(N);Y(()=>y(ae,t(d)==="timestamp"?"✓":"Copy")),Se(L,()=>t(a),ee=>l(a,ee)),x(Q,G)};H(be,Q=>{t(a)&&!isNaN(parseInt(t(a)))&&Q(ve)})}var U=s(Qe,2);{var X=Q=>{var G=Nm(),P=s(r(G),2),L=s(r(P),2),N=r(L);N.value=N.__value="iso";var ae=s(N);ae.value=ae.__value="us";var ee=s(ae);ee.value=ee.__value="european";var K=s(ee);K.value=K.__value="readable";var O=s(K);O.value=O.__value="short";var I=s(O);I.value=I.__value="time";var S=s(I);S.value=S.__value="date";var D=s(P,2),F=r(D),Z=s(F,2);Z.__click=[jm,h,i];var A=r(Z);Y(()=>y(A,t(d)==="formatted"?"✓ Copied!":"Copy")),cr(L,()=>t(n),ne=>l(n,ne)),Se(F,()=>t(i),ne=>l(i,ne)),x(Q,G)};H(U,Q=>{t(i)&&Q(X)})}var he=s(U,4),pe=r(he),ke=r(pe),Ue=r(ke);Ma(Ue,{class:"w-6 h-6 text-orange-600 dark:text-orange-400"});var Oe=s(pe,2),Ne=r(Oe),Pe=r(Ne);ht(Pe,{class:"w-6 h-6 text-orange-600 dark:text-orange-400"});var se=s(Oe,2),_e=r(se),q=r(_e);Kt(q,{class:"w-6 h-6 text-orange-600 dark:text-orange-400"}),Y(Q=>{y(ue,t(v)),y(xe,`(${Q??""})`)},[()=>new Date().toLocaleString()]),Se(Le,()=>t(a),Q=>l(a,Q)),Se(j,()=>t(g),Q=>l(g,Q)),x(o,m),Re()}yt(["click"]);function Bm(o,e,a){navigator.clipboard.writeText(t(e)).then(()=>{l(a,!0),setTimeout(()=>{l(a,!1)},2e3)})}function Dm(o,e,a,i,n,c,d,v,g,u,f,k,h,m,_,$,M,E,R,V,b,T,C,B,z,te,ue,de,xe,ce,fe,Be,Ve,Ye,Qe,We,ze,je,Le){l(e,""),l(a,""),l(i,""),l(n,""),l(c,""),l(d,"index,follow"),l(v,""),l(g,""),l(u,""),l(f,""),l(k,""),l(h,"website"),l(m,""),l(_,"en_US"),l($,"summary_large_image"),l(M,""),l(E,""),l(R,""),l(V,""),l(b,""),l(T,""),l(C,"#ffffff"),l(B,"width=device-width, initial-scale=1.0"),l(z,"en"),l(te,"text/html; charset=utf-8"),l(ue,"/favicon.ico"),l(de,""),l(xe,""),l(ce,""),l(fe,""),l(Be,""),l(Ve,!1),l(Ye,"WebPage"),l(Qe,""),l(We,""),l(ze,""),l(je,""),l(Le,"")}function Fm(o,e,a,i,n,c,d,v,g,u,f,k,h,m,_,$,M,E,R,V){l(e,"My Awesome Website - Home Page"),l(a,"Welcome to my awesome website! Discover amazing content, services, and resources that will help you achieve your goals."),l(i,"awesome website, web development, technology, innovation, digital solutions"),l(n,"John Doe"),l(c,"https://myawesomewebsite.com"),l(d,"index,follow"),l(v,"website"),l(g,"My Awesome Website"),l(u,"en_US"),l(f,"summary_large_image"),l(k,"@myawesomewebsite"),l(h,"@johndoe"),l(m,"#3b82f6"),l(_,"en"),l($,!0),l(M,"WebPage"),l(E,"My Awesome Website - Home Page"),l(R,t(a),!0),l(V,t(c),!0)}function Hm(){vt("/tools")}var Om=w('<meta name="description" content="Generate SEO meta tags, Open Graph tags, Twitter cards, and JSON-LD structured data for better search engine optimization"/>'),zm=(o,e,a)=>l(e,t(a).id,!0),Um=w("<button><!> </button>"),qm=w('<div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Page Title *</label> <input class="input" type="text" placeholder="Enter page title (50-60 characters recommended)"/> <p class="mt-1 text-xs text-gray-500 dark:text-gray-400"> </p></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Meta Description *</label> <textarea class="textarea" placeholder="Enter page description (150-160 characters recommended)"></textarea> <p class="mt-1 text-xs text-gray-500 dark:text-gray-400"> </p></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Keywords</label> <input type="text" placeholder="Enter keywords separated by commas" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Author</label> <input type="text" placeholder="Enter author name" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Canonical URL</label> <input type="url" placeholder="https://example.com/page" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Robots</label> <select class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"><option>Index, Follow</option><option>Index, No Follow</option><option>No Index, Follow</option><option>No Index, No Follow</option></select></div></div>'),Gm=w('<div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"><h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Article Specific Tags</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Published Time</label> <input type="datetime-local" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Modified Time</label> <input type="datetime-local" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Article Author</label> <input type="text" placeholder="Author name" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Article Section</label> <input type="text" placeholder="Technology, Business, etc." class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/></div> <div class="md:col-span-2"><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Article Tags</label> <input type="text" placeholder="tag1, tag2, tag3" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/></div></div></div>'),Wm=w('<div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">OG Title</label> <input type="text" placeholder="Enter Open Graph title" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">OG Description</label> <textarea placeholder="Enter Open Graph description" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"></textarea></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">OG Image URL</label> <input type="url" placeholder="https://example.com/image.jpg" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">OG Image Alt</label> <input type="text" placeholder="Describe the image for accessibility" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">OG URL</label> <input type="url" placeholder="https://example.com/page" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">OG Type</label> <select class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"><option>Website</option><option>Article</option><option>Product</option><option>Profile</option><option>Video</option><option>Music</option></select></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">OG Site Name</label> <input type="text" placeholder="Your website name" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">OG Locale</label> <input type="text" placeholder="en_US" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/></div></div> <!>',1),Jm=w('<div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Twitter Card Type</label> <select class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"><option>Summary</option><option>Summary with Large Image</option><option>App</option><option>Player</option></select></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Twitter Title</label> <input type="text" placeholder="Enter Twitter card title" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Twitter Description</label> <textarea placeholder="Enter Twitter card description" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"></textarea></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Twitter Image URL</label> <input type="url" placeholder="https://example.com/twitter-image.jpg" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Twitter Image Alt</label> <input type="text" placeholder="Describe the Twitter image" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Twitter Site</label> <input type="text" placeholder="@yourwebsite" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Twitter Creator</label> <input type="text" placeholder="@author" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/></div></div>'),Vm=w('<div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Theme Color</label> <input type="color" class="w-full h-10 px-1 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 cursor-pointer"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language</label> <input type="text" placeholder="en" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Viewport</label> <input type="text" placeholder="width=device-width, initial-scale=1.0" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Favicon</label> <input type="text" placeholder="/favicon.ico" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/></div></div>'),Ym=w('<div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">JSON-LD Type</label> <select class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"><option>Web Page</option><option>Article</option><option>Product</option><option>Organization</option><option>Person</option><option>Recipe</option><option>Event</option></select></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label> <input type="text" placeholder="Enter name/title" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label> <textarea placeholder="Enter description" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"></textarea></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">URL</label> <input type="url" placeholder="https://example.com" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/></div> <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image</label> <input type="url" placeholder="https://example.com/image.jpg" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/></div></div>'),Km=w('<div class="space-y-6"><div class="flex items-center"><input id="enable-jsonld" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/> <label for="enable-jsonld" class="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">Enable JSON-LD Structured Data</label></div> <!></div>'),Qm=w('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-violet-400 to-violet-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Meta Tag Generator</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Generate SEO meta tags, Open Graph tags, Twitter cards, and structured data</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Meta Tag Generator</li></ol></nav> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-6"><div class="flex flex-wrap border-b border-gray-200 dark:border-gray-700"></div> <div class="p-6"><!> <!> <!> <!> <!></div></div> <div class="flex flex-wrap gap-3 mb-6"><button class="btn btn-primary"><!> Load Example</button> <button class="btn btn-primary">Clear All</button></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700"><h2 class="text-xl font-semibold text-gray-900 dark:text-white">Generated Meta Tags</h2> <div class="flex gap-2"><button class="btn btn-primary btn-sm"><!> </button> <button class="btn btn-primary btn-sm">Download HTML</button></div></div> <div class="p-6"><pre class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm text-gray-700 dark:text-gray-300"><code> </code></pre></div></div></div>');function Zm(o,e){Ie(e,!0);let a=p(""),i=p(""),n=p(""),c=p(""),d=p(""),v=p("index,follow"),g=p(""),u=p(""),f=p(""),k=p(""),h=p(""),m=p("website"),_=p(""),$=p("en_US"),M=p("summary_large_image"),E=p(""),R=p(""),V=p(""),b=p(""),T=p(""),C=p(""),B=p("#ffffff"),z=p("width=device-width, initial-scale=1.0"),te=p("en"),ue=p("text/html; charset=utf-8"),de=p("/favicon.ico"),xe=p(""),ce=p(""),fe=p(""),Be=p(""),Ve=p(""),Ye=p(!1),Qe=p("WebPage"),We=p(""),ze=p(""),je=p(""),Le=p(""),Ce=p(""),re=p(!1),Te=p("basic");Ct(()=>{t(a)&&!t(g)&&l(g,t(a),!0),t(a)&&!t(E)&&l(E,t(a),!0),t(i)&&!t(u)&&l(u,t(i),!0),t(i)&&!t(R)&&l(R,t(i),!0),t(d)&&!t(h)&&l(h,t(d),!0),t(f)&&!t(V)&&l(V,t(f),!0),t(k)&&!t(b)&&l(b,t(k),!0)});function me(){let J="";if(t(a)&&(J+="<title>"+j(t(a))+"</title>",J+=`
`),t(i)&&(J+='<meta name="description" content="'+j(t(i))+'">',J+=`
`),t(n)&&(J+='<meta name="keywords" content="'+j(t(n))+'">',J+=`
`),t(c)&&(J+='<meta name="author" content="'+j(t(c))+'">',J+=`
`),t(d)&&(J+='<link rel="canonical" href="'+j(t(d))+'">',J+=`
`),t(v)&&(J+='<meta name="robots" content="'+j(t(v))+'">',J+=`
`),J+=`
<!-- Open Graph Meta Tags -->
`,J+='<meta property="og:type" content="'+j(t(m))+'">',J+=`
`,t(g)&&(J+='<meta property="og:title" content="'+j(t(g))+'">',J+=`
`),t(u)&&(J+='<meta property="og:description" content="'+j(t(u))+'">',J+=`
`),t(f)&&(J+='<meta property="og:image" content="'+j(t(f))+'">',J+=`
`),t(k)&&(J+='<meta property="og:image:alt" content="'+j(t(k))+'">',J+=`
`),t(h)&&(J+='<meta property="og:url" content="'+j(t(h))+'">',J+=`
`),t(_)&&(J+='<meta property="og:site_name" content="'+j(t(_))+'">',J+=`
`),t($)&&(J+='<meta property="og:locale" content="'+j(t($))+'">',J+=`
`),J+=`
<!-- Twitter Card Meta Tags -->
`,J+='<meta name="twitter:card" content="'+j(t(M))+'">',J+=`
`,t(E)&&(J+='<meta name="twitter:title" content="'+j(t(E))+'">',J+=`
`),t(R)&&(J+='<meta name="twitter:description" content="'+j(t(R))+'">',J+=`
`),t(V)&&(J+='<meta name="twitter:image" content="'+j(t(V))+'">',J+=`
`),t(b)&&(J+='<meta name="twitter:image:alt" content="'+j(t(b))+'">',J+=`
`),t(T)&&(J+='<meta name="twitter:site" content="'+j(t(T))+'">',J+=`
`),t(C)&&(J+='<meta name="twitter:creator" content="'+j(t(C))+'">',J+=`
`),t(m)==="article"&&(J+=`
<!-- Article Specific Meta Tags -->
`,t(xe)&&(J+='<meta property="article:published_time" content="'+j(t(xe))+'">',J+=`
`),t(ce)&&(J+='<meta property="article:modified_time" content="'+j(t(ce))+'">',J+=`
`),t(fe)&&(J+='<meta property="article:author" content="'+j(t(fe))+'">',J+=`
`),t(Be)&&(J+='<meta property="article:section" content="'+j(t(Be))+'">',J+=`
`),t(Ve)&&(J+='<meta property="article:tag" content="'+j(t(Ve))+'">',J+=`
`)),J+=`
<!-- Additional Meta Tags -->
`,J+='<meta charset="utf-8">',J+=`
`,J+='<meta name="viewport" content="'+j(t(z))+'">',J+=`
`,J+='<meta http-equiv="content-type" content="'+j(t(ue))+'">',J+=`
`,t(te)&&(J+='<meta name="language" content="'+j(t(te))+'">',J+=`
`),t(B)&&(J+='<meta name="theme-color" content="'+j(t(B))+'">',J+=`
`),t(de)&&(J+='<link rel="icon" href="'+j(t(de))+'">',J+=`
`),t(Ye)){J+=`
<!-- JSON-LD Structured Data -->
`;const ie=oe();J+='<script type="application/ld+json">'+ie+"<\/script>",J+=`
`}l(Ce,J,!0)}function oe(){const J={"@context":"https://schema.org","@type":t(Qe)};return t(We)&&(J.name=t(We)),t(ze)&&(J.description=t(ze)),t(je)&&(J.url=t(je)),t(Le)&&(J.image=t(Le)),JSON.stringify(J,null,2)}function j(J){const ie=document.createElement("div");return ie.textContent=J,ie.innerHTML}function be(){if(!t(Ce))return;const J=`<!DOCTYPE html>
<html lang="`+t(te)+`">
<head>
`+t(Ce)+`</head>
<body>
  <!-- Your content goes here -->
  <h1>Welcome to `+(t(a)||"Your Website")+`</h1>
  <p>`+(t(i)||"Your description here.")+`</p>
</body>
</html>`,ie=new Blob([J],{type:"text/html"}),ye=URL.createObjectURL(ie),Ae=document.createElement("a");Ae.href=ye,Ae.download="meta-tags-example.html",document.body.appendChild(Ae),Ae.click(),document.body.removeChild(Ae),URL.revokeObjectURL(ye)}Ct(()=>{me()});var ve=Qm();Ir(J=>{var ie=Om();Mr.title="Meta Tag Generator - Developer Tools",x(J,ie)});var U=r(ve),X=r(U),he=r(X);he.__click=[Hm];var pe=r(he);jt(pe,{class:"w-5 h-5"});var ke=s(X,2),Ue=r(ke),Oe=r(Ue);Io(Oe,{class:"w-10 h-10 text-white"});var Ne=s(U,4),Pe=r(Ne);mt(Pe,21,()=>[{id:"basic",label:"Basic SEO",icon:Ui},{id:"opengraph",label:"Open Graph",icon:Io},{id:"twitter",label:"Twitter Cards",icon:ac},{id:"additional",label:"Additional",icon:Yr},{id:"jsonld",label:"JSON-LD",icon:Jt}],J=>J.id,(J,ie)=>{var ye=Um();ye.__click=[zm,Te,ie];var Ae=r(ye);nr(Ae,()=>t(ie).icon,(Xe,Ke)=>{Ke(Xe,{class:"w-4 h-4 mr-2"})});var Je=s(Ae);Y(()=>{ut(ye,1,`flex items-center px-4 py-3 text-sm font-medium border-b-2 transition-colors ${t(Te)===t(ie).id?"border-blue-500 text-blue-600 dark:text-blue-400":"border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"}`),y(Je,` ${t(ie).label??""}`)}),x(J,ye)});var se=s(Pe,2),_e=r(se);{var q=J=>{var ie=qm(),ye=r(ie),Ae=r(ye);De(Ae,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var Je=s(Ae,2),Xe=s(Je,2),Ke=r(Xe),tt=s(ye,2),dt=r(tt);De(dt,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var qe=s(dt,2),lt=s(qe,2),ct=r(lt),at=s(tt,2),ft=r(at);De(ft,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var bt=s(ft,2),rt=s(at,2),gt=r(rt);De(gt,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var $t=s(gt,2),Mt=s(rt,2),He=r(Mt);De(He,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var ot=s(He,2),pt=s(Mt,2),_t=r(pt);De(_t,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var Nt=s(_t,2),It=r(Nt);It.value=It.__value="index,follow";var Bt=s(It);Bt.value=Bt.__value="index,nofollow";var Dt=s(Bt);Dt.value=Dt.__value="noindex,follow";var kt=s(Dt);kt.value=kt.__value="noindex,nofollow",Y(()=>{y(Ke,`${t(a).length??""}/60 characters`),y(ct,`${t(i).length??""}/160 characters`)}),Se(Je,()=>t(a),Tt=>l(a,Tt)),Se(qe,()=>t(i),Tt=>l(i,Tt)),Se(bt,()=>t(n),Tt=>l(n,Tt)),Se($t,()=>t(c),Tt=>l(c,Tt)),Se(ot,()=>t(d),Tt=>l(d,Tt)),cr(Nt,()=>t(v),Tt=>l(v,Tt)),x(J,ie)};H(_e,J=>{t(Te)==="basic"&&J(q)})}var Q=s(_e,2);{var G=J=>{var ie=Wm(),ye=ge(ie),Ae=r(ye),Je=r(Ae);De(Je,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var Xe=s(Je,2),Ke=s(Ae,2),tt=r(Ke);De(tt,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var dt=s(tt,2),qe=s(Ke,2),lt=r(qe);De(lt,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var ct=s(lt,2),at=s(qe,2),ft=r(at);De(ft,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var bt=s(ft,2),rt=s(at,2),gt=r(rt);De(gt,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var $t=s(gt,2),Mt=s(rt,2),He=r(Mt);De(He,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var ot=s(He,2),pt=r(ot);pt.value=pt.__value="website";var _t=s(pt);_t.value=_t.__value="article";var Nt=s(_t);Nt.value=Nt.__value="product";var It=s(Nt);It.value=It.__value="profile";var Bt=s(It);Bt.value=Bt.__value="video";var Dt=s(Bt);Dt.value=Dt.__value="music";var kt=s(Mt,2),Tt=r(kt);De(Tt,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var Ut=s(Tt,2),At=s(kt,2),Wt=r(At);De(Wt,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var Xt=s(Wt,2),xr=s(ye,2);{var dr=Pt=>{var er=Gm(),Er=s(r(er),2),fr=r(Er),br=r(fr);De(br,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var ar=s(br,2),or=s(fr,2),pr=r(or);De(pr,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var Pr=s(pr,2),kr=s(or,2),qr=r(kr);De(qr,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var ra=s(qr,2),Ot=s(kr,2),Rr=r(Ot);De(Rr,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var aa=s(Rr,2),Ba=s(Ot,2),oa=r(Ba);De(oa,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var Da=s(oa,2);Se(ar,()=>t(xe),mr=>l(xe,mr)),Se(Pr,()=>t(ce),mr=>l(ce,mr)),Se(ra,()=>t(fe),mr=>l(fe,mr)),Se(aa,()=>t(Be),mr=>l(Be,mr)),Se(Da,()=>t(Ve),mr=>l(Ve,mr)),x(Pt,er)};H(xr,Pt=>{t(m)==="article"&&Pt(dr)})}Se(Xe,()=>t(g),Pt=>l(g,Pt)),Se(dt,()=>t(u),Pt=>l(u,Pt)),Se(ct,()=>t(f),Pt=>l(f,Pt)),Se(bt,()=>t(k),Pt=>l(k,Pt)),Se($t,()=>t(h),Pt=>l(h,Pt)),cr(ot,()=>t(m),Pt=>l(m,Pt)),Se(Ut,()=>t(_),Pt=>l(_,Pt)),Se(Xt,()=>t($),Pt=>l($,Pt)),x(J,ie)};H(Q,J=>{t(Te)==="opengraph"&&J(G)})}var P=s(Q,2);{var L=J=>{var ie=Jm(),ye=r(ie),Ae=r(ye);De(Ae,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var Je=s(Ae,2),Xe=r(Je);Xe.value=Xe.__value="summary";var Ke=s(Xe);Ke.value=Ke.__value="summary_large_image";var tt=s(Ke);tt.value=tt.__value="app";var dt=s(tt);dt.value=dt.__value="player";var qe=s(ye,2),lt=r(qe);De(lt,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var ct=s(lt,2),at=s(qe,2),ft=r(at);De(ft,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var bt=s(ft,2),rt=s(at,2),gt=r(rt);De(gt,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var $t=s(gt,2),Mt=s(rt,2),He=r(Mt);De(He,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var ot=s(He,2),pt=s(Mt,2),_t=r(pt);De(_t,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var Nt=s(_t,2),It=s(pt,2),Bt=r(It);De(Bt,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var Dt=s(Bt,2);cr(Je,()=>t(M),kt=>l(M,kt)),Se(ct,()=>t(E),kt=>l(E,kt)),Se(bt,()=>t(R),kt=>l(R,kt)),Se($t,()=>t(V),kt=>l(V,kt)),Se(ot,()=>t(b),kt=>l(b,kt)),Se(Nt,()=>t(T),kt=>l(T,kt)),Se(Dt,()=>t(C),kt=>l(C,kt)),x(J,ie)};H(P,J=>{t(Te)==="twitter"&&J(L)})}var N=s(P,2);{var ae=J=>{var ie=Vm(),ye=r(ie),Ae=r(ye);De(Ae,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var Je=s(Ae,2),Xe=s(ye,2),Ke=r(Xe);De(Ke,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var tt=s(Ke,2),dt=s(Xe,2),qe=r(dt);De(qe,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var lt=s(qe,2),ct=s(dt,2),at=r(ct);De(at,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var ft=s(at,2);Se(Je,()=>t(B),bt=>l(B,bt)),Se(tt,()=>t(te),bt=>l(te,bt)),Se(lt,()=>t(z),bt=>l(z,bt)),Se(ft,()=>t(de),bt=>l(de,bt)),x(J,ie)};H(N,J=>{t(Te)==="additional"&&J(ae)})}var ee=s(N,2);{var K=J=>{var ie=Km(),ye=r(ie),Ae=r(ye),Je=s(ye,2);{var Xe=Ke=>{var tt=Ym(),dt=r(tt),qe=r(dt);De(qe,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var lt=s(qe,2),ct=r(lt);ct.value=ct.__value="WebPage";var at=s(ct);at.value=at.__value="Article";var ft=s(at);ft.value=ft.__value="Product";var bt=s(ft);bt.value=bt.__value="Organization";var rt=s(bt);rt.value=rt.__value="Person";var gt=s(rt);gt.value=gt.__value="Recipe";var $t=s(gt);$t.value=$t.__value="Event";var Mt=s(dt,2),He=r(Mt);De(He,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var ot=s(He,2),pt=s(Mt,2),_t=r(pt);De(_t,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var Nt=s(_t,2),It=s(pt,2),Bt=r(It);De(Bt,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var Dt=s(Bt,2),kt=s(It,2),Tt=r(kt);De(Tt,"for",`auto-id-${Math.random().toString(36).substr(2,9)??""}`);var Ut=s(Tt,2);cr(lt,()=>t(Qe),At=>l(Qe,At)),Se(ot,()=>t(We),At=>l(We,At)),Se(Nt,()=>t(ze),At=>l(ze,At)),Se(Dt,()=>t(je),At=>l(je,At)),Se(Ut,()=>t(Le),At=>l(Le,At)),x(Ke,tt)};H(Je,Ke=>{t(Ye)&&Ke(Xe)})}Gt(Ae,()=>t(Ye),Ke=>l(Ye,Ke)),x(J,ie)};H(ee,J=>{t(Te)==="jsonld"&&J(K)})}var O=s(Ne,2),I=r(O);I.__click=[Fm,a,i,n,c,d,v,m,_,$,M,T,C,B,te,Ye,Qe,We,ze,je];var S=r(I);ta(S,{class:"w-4 h-4 mr-2"});var D=s(I,2);D.__click=[Dm,a,i,n,c,d,v,g,u,f,k,h,m,_,$,M,E,R,V,b,T,C,B,z,te,ue,de,xe,ce,fe,Be,Ve,Ye,Qe,We,ze,je,Le,Ce];var F=s(O,2),Z=r(F),A=s(r(Z),2),ne=r(A);ne.__click=[Bm,Ce,re];var Me=r(ne);ht(Me,{class:"w-4 h-4 mr-1"});var Ge=s(Me),$e=s(ne,2);$e.__click=be;var W=s(Z,2),le=r(W),we=r(le),Fe=r(we);Y(()=>{ne.disabled=!t(Ce),y(Ge,` ${t(re)?"Copied!":"Copy"}`),$e.disabled=!t(Ce),y(Fe,t(Ce)||"Fill in the form above to generate meta tags...")}),x(o,ve),Re()}yt(["click"]);function Xm(o,e){const a=Math.max(...t(e).map(i=>i.id))+1;l(e,[...t(e),{id:a,x:0,y:4,blur:6,spread:-1,color:"#000000",opacity:20,inset:!1}],!0)}function eh(o,e){const a=Math.max(...t(e).map(i=>i.id))+1;l(e,[...t(e),{id:a,x:2,y:2,blur:4,color:"#000000",opacity:50}],!0)}function th(o,e){l(e,t(e).map(a=>({...a,color:"#"+Math.floor(Math.random()*16777215).toString(16).padStart(6,"0")})),!0)}function rh(o,e,a,i,n,c,d,v,g){l(e,[{id:1,x:0,y:4,blur:6,spread:-1,color:"#000000",opacity:20,inset:!1}],!0),l(a,[{id:1,x:2,y:2,blur:4,color:"#000000",opacity:50}],!0),l(i,!0),l(n,!0),l(c,"#ffffff"),l(d,"#374151"),l(v,8),l(g,"Shadow Effect")}function ah(){vt("/tools")}var oh=w('<meta name="description" content="Generate beautiful CSS box-shadow and text-shadow effects with real-time preview"/>'),ih=(o,e)=>e("card"),sh=(o,e)=>e("button"),nh=(o,e)=>e("neon"),lh=(o,e)=>e("inset"),dh=(o,e)=>l(e,"box"),ch=(o,e)=>l(e,"text"),vh=(o,e,a)=>e(t(a).id),gh=w('<button class="text-red-500 hover:text-red-700 dark:hover:text-red-400"><!></button>'),uh=w('<div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4"><div class="flex items-center justify-between mb-4"><h3 class="text-sm font-medium text-gray-900 dark:text-white"> </h3> <!></div> <div class="grid grid-cols-2 gap-4"><div><label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">X Offset</label> <input type="range" min="-50" max="50" class="w-full"/> <span class="text-xs text-gray-500 dark:text-gray-400"> </span></div> <div><label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Y Offset</label> <input type="range" min="-50" max="50" class="w-full"/> <span class="text-xs text-gray-500 dark:text-gray-400"> </span></div> <div><label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Blur</label> <input type="range" min="0" max="100" class="w-full"/> <span class="text-xs text-gray-500 dark:text-gray-400"> </span></div> <div><label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Spread</label> <input type="range" min="-50" max="50" class="w-full"/> <span class="text-xs text-gray-500 dark:text-gray-400"> </span></div> <div><label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Color</label> <div class="flex gap-2"><input type="color" class="w-12 h-8 rounded"/> <input type="text" class="flex-1 px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"/></div></div> <div><label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Opacity</label> <input type="range" min="0" max="100" class="w-full"/> <span class="text-xs text-gray-500 dark:text-gray-400"> </span></div></div> <div class="flex items-center mt-4"><input type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"/> <label class="ml-2 text-sm text-gray-700 dark:text-gray-300">Inset Shadow</label></div></div>'),xh=w('<div class="space-y-4"><!> <button class="w-full px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center justify-center"><!> Add Shadow Layer</button></div>'),fh=(o,e,a)=>e(t(a).id),bh=w('<button class="text-red-500 hover:text-red-700 dark:hover:text-red-400"><!></button>'),ph=w('<div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4"><div class="flex items-center justify-between mb-4"><h3 class="text-sm font-medium text-gray-900 dark:text-white"> </h3> <!></div> <div class="grid grid-cols-3 gap-4"><div><label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">X Offset</label> <input type="range" min="-50" max="50" class="w-full"/> <span class="text-xs text-gray-500 dark:text-gray-400"> </span></div> <div><label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Y Offset</label> <input type="range" min="-50" max="50" class="w-full"/> <span class="text-xs text-gray-500 dark:text-gray-400"> </span></div> <div><label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Blur</label> <input type="range" min="0" max="50" class="w-full"/> <span class="text-xs text-gray-500 dark:text-gray-400"> </span></div> <div class="col-span-3"><label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Color</label> <div class="flex gap-2"><input type="color" class="w-12 h-8 rounded"/> <input type="text" class="flex-1 px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"/> <input type="range" min="0" max="100" class="w-24"/> <span class="text-xs text-gray-500 dark:text-gray-400 w-12"> </span></div></div></div></div>'),mh=w('<div class="space-y-4"><!> <button class="w-full px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center justify-center"><!> Add Text Shadow Layer</button></div>'),hh=w('<h3 class="text-2xl font-bold transition-all duration-200"> </h3>'),yh=w('<div class="p-8 rounded-lg transition-all duration-200"><!></div>'),_h=w('<h3 class="text-2xl font-bold transition-all duration-200"> </h3>'),kh=(o,e,a)=>e(`box-shadow: ${t(a)};`),wh=(o,e,a)=>e(`text-shadow: ${t(a)};`),Ch=w('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-400 to-gray-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">CSS Shadow Generator</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Create beautiful box-shadow and text-shadow effects with real-time preview</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">CSS Shadow Generator</li></ol></nav> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-6"><div class="p-6"><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Presets</h2> <div class="flex flex-wrap gap-2"><button class="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">Card Shadow</button> <button class="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">Button Shadow</button> <button class="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">Neon Effect</button> <button class="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">Inset Shadow</button> <button class="px-3 py-1.5 text-sm bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded hover:bg-purple-200 dark:hover:bg-purple-900/30 transition-colors">🎨 Random Color</button> <button class="px-3 py-1.5 text-sm bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors">Reset All</button></div></div></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div class="space-y-6"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="flex"><button>Box Shadow</button> <button>Text Shadow</button></div> <div class="p-6"><!> <!></div></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Preview Settings</h2> <div class="space-y-4"><div class="grid grid-cols-2 gap-4"><div><label for="background-color" class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Background</label> <input id="background-color" type="color" class="w-full h-8 rounded"/></div> <div><label for="text-color" class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Text Color</label> <input id="text-color" type="color" class="w-full h-8 rounded"/></div></div> <div><label for="border-radius" class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"> </label> <input id="border-radius" type="range" min="0" max="50" class="w-full"/></div> <div><label for="preview-text" class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Preview Text</label> <input id="preview-text" type="text" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"/></div> <div class="flex items-center gap-4"><label class="flex items-center"><input type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"/> <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Show Box</span></label> <label class="flex items-center"><input type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"/> <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Show Text</span></label></div></div></div></div> <div class="space-y-6"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Live Preview</h2> <div class="p-8 rounded-lg flex items-center justify-center min-h-[200px] transition-all duration-200"><!></div></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">CSS Code</h2> <div class="flex gap-2"><button class="flex items-center px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"><!> </button> <button class="flex items-center px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"><!> </button> <button class="flex items-center px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"><!> Download</button></div></div> <div class="p-6 space-y-4"><div><h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Box Shadow</h3> <pre class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm text-gray-700 dark:text-gray-300"><code> </code></pre></div> <div><h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Text Shadow</h3> <pre class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm text-gray-700 dark:text-gray-300"><code> </code></pre></div></div></div></div></div></div>');function $h(o,e){Ie(e,!0);let a=p(Lt([{id:1,x:0,y:4,blur:6,spread:-1,color:"#000000",opacity:20,inset:!1}])),i=p(Lt([{id:1,x:2,y:2,blur:4,color:"#000000",opacity:50}])),n=p(!0),c=p(!0),d=p("#ffffff"),v=p("#374151"),g=p(8),u=p("Shadow Effect"),f=p("box"),k=p(!1);const h=xt(()=>()=>t(a).map(qe=>{const lt=qe.color+Math.round(qe.opacity*2.55).toString(16).padStart(2,"0"),ct=[qe.x+"px",qe.y+"px",qe.blur+"px"];return qe.spread!==0&&ct.push(qe.spread+"px"),qe.inset&&ct.push("inset"),`${ct.join(" ")} ${lt}`}).join(", ")),m=xt(()=>()=>t(i).map(qe=>{const lt=qe.color+Math.round(qe.opacity*2.55).toString(16).padStart(2,"0");return`${qe.x}px ${qe.y}px ${qe.blur}px ${lt}`}).join(", "));function _(qe){t(a).length>1&&l(a,t(a).filter(lt=>lt.id!==qe),!0)}function $(qe){t(i).length>1&&l(i,t(i).filter(lt=>lt.id!==qe),!0)}function M(qe){navigator.clipboard.writeText(qe).then(()=>{l(k,!0),setTimeout(()=>{l(k,!1)},2e3)})}function E(){const qe=`/* CSS Shadow Generator Output */

/* Box Shadow */
.box-shadow {
  box-shadow: ${t(h)};
}

/* Text Shadow */
.text-shadow {
  text-shadow: ${t(m)};
}`,lt=new Blob([qe],{type:"text/css"}),ct=URL.createObjectURL(lt),at=document.createElement("a");at.href=ct,at.download="shadows.css",document.body.appendChild(at),at.click(),document.body.removeChild(at),URL.revokeObjectURL(ct)}function R(qe){switch(qe){case"card":l(a,[{id:1,x:0,y:10,blur:15,spread:-3,color:"#000000",opacity:10,inset:!1}],!0),l(g,12);break;case"button":l(a,[{id:1,x:0,y:4,blur:6,spread:-2,color:"#000000",opacity:15,inset:!1},{id:2,x:0,y:1,blur:2,spread:0,color:"#000000",opacity:10,inset:!1}],!0),l(g,6);break;case"neon":l(a,[{id:1,x:0,y:0,blur:20,spread:0,color:"#3b82f6",opacity:60,inset:!1},{id:2,x:0,y:0,blur:40,spread:0,color:"#3b82f6",opacity:40,inset:!1}],!0),l(i,[{id:1,x:0,y:0,blur:10,color:"#3b82f6",opacity:80}],!0);break;case"inset":l(a,[{id:1,x:2,y:2,blur:4,spread:0,color:"#000000",opacity:15,inset:!0}],!0);break}}var V=Ch();Ir(qe=>{var lt=oh();Mr.title="CSS Shadow Generator - Developer Tools",x(qe,lt)});var b=r(V),T=r(b),C=r(T);C.__click=[ah];var B=r(C);jt(B,{class:"w-5 h-5"});var z=s(T,2),te=r(z),ue=r(te);fl(ue,{class:"w-10 h-10 text-white"});var de=s(b,4),xe=r(de),ce=s(r(xe),2),fe=r(ce);fe.__click=[ih,R];var Be=s(fe,2);Be.__click=[sh,R];var Ve=s(Be,2);Ve.__click=[nh,R];var Ye=s(Ve,2);Ye.__click=[lh,R];var Qe=s(Ye,2);Qe.__click=[th,a];var We=s(Qe,2);We.__click=[rh,a,i,n,c,d,v,g,u];var ze=s(de,2),je=r(ze),Le=r(je),Ce=r(Le),re=r(Ce);re.__click=[dh,f];var Te=s(re,2);Te.__click=[ch,f];var me=s(Ce,2),oe=r(me);{var j=qe=>{var lt=xh(),ct=r(lt);mt(ct,19,()=>t(a),bt=>bt.id,(bt,rt,gt)=>{var $t=uh(),Mt=r($t),He=r(Mt),ot=r(He),pt=s(He,2);{var _t=qt=>{var eo=gh();eo.__click=[vh,_,rt];var Xo=r(eo);go(Xo,{class:"w-4 h-4"}),x(qt,eo)};H(pt,qt=>{t(a).length>1&&qt(_t)})}var Nt=s(Mt,2),It=r(Nt),Bt=r(It),Dt=s(Bt,2),kt=s(Dt,2),Tt=r(kt),Ut=s(It,2),At=r(Ut),Wt=s(At,2),Xt=s(Wt,2),xr=r(Xt),dr=s(Ut,2),Pt=r(dr),er=s(Pt,2),Er=s(er,2),fr=r(Er),br=s(dr,2),ar=r(br),or=s(ar,2),pr=s(or,2),Pr=r(pr),kr=s(br,2),qr=r(kr),ra=s(qr,2),Ot=r(ra),Rr=s(Ot,2),aa=s(kr,2),Ba=r(aa),oa=s(Ba,2),Da=s(oa,2),mr=r(Da),Qo=s(Nt,2),Fa=r(Qo),Zo=s(Fa,2);Y(()=>{y(ot,`Shadow ${t(gt)+1}`),De(Bt,"for",`xoffset-${t(gt)??""}`),De(Dt,"id",`xoffset-${t(gt)??""}`),y(Tt,`${t(rt).x??""}px`),De(At,"for",`box-yoffset-${t(gt)??""}`),De(Wt,"id",`box-yoffset-${t(gt)??""}`),y(xr,`${t(rt).y??""}px`),De(Pt,"for",`box-blur-${t(gt)??""}`),De(er,"id",`box-blur-${t(gt)??""}`),y(fr,`${t(rt).blur??""}px`),De(ar,"for",`box-spread-${t(gt)??""}`),De(or,"id",`box-spread-${t(gt)??""}`),y(Pr,`${t(rt).spread??""}px`),De(qr,"for",`box-color-${t(gt)??""}`),De(Ot,"id",`box-color-${t(gt)??""}`),De(Ba,"for",`box-opacity-${t(gt)??""}`),De(oa,"id",`box-opacity-${t(gt)??""}`),y(mr,`${t(rt).opacity??""}%`),De(Fa,"id",`box-inset-${t(gt)??""}`),De(Zo,"for",`box-inset-${t(gt)??""}`)}),Se(Dt,()=>t(rt).x,qt=>t(rt).x=qt),Se(Wt,()=>t(rt).y,qt=>t(rt).y=qt),Se(er,()=>t(rt).blur,qt=>t(rt).blur=qt),Se(or,()=>t(rt).spread,qt=>t(rt).spread=qt),Se(Ot,()=>t(rt).color,qt=>t(rt).color=qt),Se(Rr,()=>t(rt).color,qt=>t(rt).color=qt),Se(oa,()=>t(rt).opacity,qt=>t(rt).opacity=qt),Gt(Fa,()=>t(rt).inset,qt=>t(rt).inset=qt),x(bt,$t)});var at=s(ct,2);at.__click=[Xm,a];var ft=r(at);Bo(ft,{class:"w-4 h-4 mr-2"}),x(qe,lt)};H(oe,qe=>{t(f)==="box"&&qe(j)})}var be=s(oe,2);{var ve=qe=>{var lt=mh(),ct=r(lt);mt(ct,19,()=>t(i),bt=>bt.id,(bt,rt,gt)=>{var $t=ph(),Mt=r($t),He=r(Mt),ot=r(He),pt=s(He,2);{var _t=Ot=>{var Rr=bh();Rr.__click=[fh,$,rt];var aa=r(Rr);go(aa,{class:"w-4 h-4"}),x(Ot,Rr)};H(pt,Ot=>{t(i).length>1&&Ot(_t)})}var Nt=s(Mt,2),It=r(Nt),Bt=r(It),Dt=s(Bt,2),kt=s(Dt,2),Tt=r(kt),Ut=s(It,2),At=r(Ut),Wt=s(At,2),Xt=s(Wt,2),xr=r(Xt),dr=s(Ut,2),Pt=r(dr),er=s(Pt,2),Er=s(er,2),fr=r(Er),br=s(dr,2),ar=r(br),or=s(ar,2),pr=r(or),Pr=s(pr,2),kr=s(Pr,2),qr=s(kr,2),ra=r(qr);Y(()=>{y(ot,`Text Shadow ${t(gt)+1}`),De(Bt,"for",`text-xoffset-${t(gt)??""}`),De(Dt,"id",`text-xoffset-${t(gt)??""}`),y(Tt,`${t(rt).x??""}px`),De(At,"for",`text-yoffset-${t(gt)??""}`),De(Wt,"id",`text-yoffset-${t(gt)??""}`),y(xr,`${t(rt).y??""}px`),De(Pt,"for",`text-blur-${t(gt)??""}`),De(er,"id",`text-blur-${t(gt)??""}`),y(fr,`${t(rt).blur??""}px`),De(ar,"for",`text-color-${t(gt)??""}`),De(pr,"id",`text-color-${t(gt)??""}`),y(ra,`${t(rt).opacity??""}%`)}),Se(Dt,()=>t(rt).x,Ot=>t(rt).x=Ot),Se(Wt,()=>t(rt).y,Ot=>t(rt).y=Ot),Se(er,()=>t(rt).blur,Ot=>t(rt).blur=Ot),Se(pr,()=>t(rt).color,Ot=>t(rt).color=Ot),Se(Pr,()=>t(rt).color,Ot=>t(rt).color=Ot),Se(kr,()=>t(rt).opacity,Ot=>t(rt).opacity=Ot),x(bt,$t)});var at=s(ct,2);at.__click=[eh,i];var ft=r(at);Bo(ft,{class:"w-4 h-4 mr-2"}),x(qe,lt)};H(be,qe=>{t(f)==="text"&&qe(ve)})}var U=s(Le,2),X=s(r(U),2),he=r(X),pe=r(he),ke=s(r(pe),2),Ue=s(pe,2),Oe=s(r(Ue),2),Ne=s(he,2),Pe=r(Ne),se=r(Pe),_e=s(Pe,2),q=s(Ne,2),Q=s(r(q),2),G=s(q,2),P=r(G),L=r(P),N=s(P,2),ae=r(N),ee=s(je,2),K=r(ee),O=s(r(K),2),I=r(O);{var S=qe=>{var lt=yh(),ct=r(lt);{var at=ft=>{var bt=hh(),rt=r(bt);Y(()=>{Yt(bt,`color: ${t(v)??""}; text-shadow: ${t(m)??""};`),y(rt,t(u))}),x(ft,bt)};H(ct,ft=>{t(n)&&ft(at)})}Y(()=>Yt(lt,`box-shadow: ${t(h)??""}; border-radius: ${t(g)??""}px; background: white;`)),x(qe,lt)},D=qe=>{var lt=Ee(),ct=ge(lt);{var at=ft=>{var bt=_h(),rt=r(bt);Y(()=>{Yt(bt,`color: ${t(v)??""}; text-shadow: ${t(m)??""};`),y(rt,t(u))}),x(ft,bt)};H(ct,ft=>{t(n)&&ft(at)},!0)}x(qe,lt)};H(I,qe=>{t(c)?qe(S):qe(D,!1)})}var F=s(K,2),Z=r(F),A=s(r(Z),2),ne=r(A);ne.__click=[kh,M,h];var Me=r(ne);ht(Me,{class:"w-4 h-4 mr-1"});var Ge=s(Me),$e=s(ne,2);$e.__click=[wh,M,m];var W=r($e);ht(W,{class:"w-4 h-4 mr-1"});var le=s(W),we=s($e,2);we.__click=E;var Fe=r(we);Xa(Fe,{class:"w-4 h-4 mr-1"});var J=s(Z,2),ie=r(J),ye=s(r(ie),2),Ae=r(ye),Je=r(Ae),Xe=s(ie,2),Ke=s(r(Xe),2),tt=r(Ke),dt=r(tt);Y(()=>{ut(re,1,`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${t(f)==="box"?"border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/10":"border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"}`),ut(Te,1,`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${t(f)==="text"?"border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/10":"border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"}`),y(se,`Border Radius: ${t(g)??""}px`),Yt(O,`background-color: ${t(d)??""};`),y(Ge,` ${t(k)?"Copied!":"Copy Box"}`),y(le,` ${t(k)?"Copied!":"Copy Text"}`),y(Je,`box-shadow: ${t(h)??""};`),y(dt,`text-shadow: ${t(m)??""};`)}),Se(ke,()=>t(d),qe=>l(d,qe)),Se(Oe,()=>t(v),qe=>l(v,qe)),Se(_e,()=>t(g),qe=>l(g,qe)),Se(Q,()=>t(u),qe=>l(u,qe)),Gt(L,()=>t(c),qe=>l(c,qe)),Gt(ae,()=>t(n),qe=>l(n,qe)),x(o,V),Re()}yt(["click"]);function Sh(o,e,a,i,n){const c=t(e);l(e,t(a),!0),l(a,c,!0);const d=t(i);l(i,t(n),!0),l(n,d,!0)}function Th(o,e,a){t(e)&&navigator.clipboard.writeText(t(e)).then(()=>{Ht.success("Copied result to clipboard"),a()})}function fn(o,e){l(e,[],!0),Ht.success("Cleared history")}function Mh(){vt("/tools")}var Eh=(o,e,a,i)=>{l(e,t(a).id,!0),i()},Ph=w('<button><!> <span class="text-sm font-medium"> </span></button>'),Lh=w("<option> </option>"),Ah=w("<option> </option>"),jh=w('<div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4"><h3 class="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">Conversion Formulas</h3> <div class="space-y-1 text-xs text-blue-700 dark:text-blue-300"><p>°C to °F: (°C × 9/5) + 32</p> <p>°F to °C: (°F - 32) × 5/9</p> <p>°C to K: °C + 273.15</p> <p>K to °C: K - 273.15</p></div></div>'),Nh=w('<div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 inch = 2.54 cm</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 foot = 12 inches</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 mile = 1.609 km</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 yard = 0.914 m</p></div>',1),Ih=w('<div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 kg = 2.205 lbs</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 lb = 16 oz</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 ton = 1000 kg</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 stone = 14 lbs</p></div>',1),Rh=w('<div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 gallon = 3.785 L</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 L = 1000 mL</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 cup = 236.6 mL</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 quart = 2 pints</p></div>',1),Bh=w('<div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 minute = 60 seconds</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 hour = 60 minutes</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 day = 24 hours</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 week = 7 days</p></div>',1),Dh=w('<div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">100 km/h = 27.78 m/s</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">60 mph = 96.56 km/h</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">1 knot = 1.852 km/h</p></div> <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p class="font-medium text-gray-900 dark:text-white">Mach 1 = 343 m/s</p></div>',1),Fh=w('<button class="text-sm text-red-500 hover:text-red-600">Clear</button>'),Hh=w('<div class="flex flex-col items-center justify-center py-8 text-gray-500 dark:text-gray-400"><!> <p class="text-sm">No conversions yet</p></div>'),Oh=(o,e,a)=>e(t(a)),zh=w('<button class="w-full text-left p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"><div class="text-sm font-medium text-gray-900 dark:text-white"> </div> <div class="text-sm text-gray-600 dark:text-gray-400"> </div> <div class="text-xs text-gray-500 dark:text-gray-500 mt-1"> </div></button>'),Uh=w('<div class="space-y-2 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar"></div>'),qh=w('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Unit Converter</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Convert between different units of measurement with precision.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Unit Converter</li></ol></nav> <div class="mb-6 flex justify-center flex-wrap gap-2"><button class="btn btn-outline btn-sm"><!> Reset</button> <button class="btn btn-outline btn-sm text-red-500 hover:text-red-600 hover:border-red-200"><!> Clear History</button></div> <div class="mb-6 overflow-x-auto pb-2"><div class="flex gap-3 min-w-max"></div></div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-2 space-y-6"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center"><!> </h2> <div class="space-y-6"><div><label for="from-value-input" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">From</label> <div class="grid grid-cols-1 md:grid-cols-2 gap-3"><input id="from-value-input" type="number" placeholder="Enter value" class="input text-lg"/> <select class="select"></select></div></div> <div class="flex justify-center"><button class="btn btn-secondary btn-sm rounded-full"><!></button></div> <div><label for="to-value-input" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">To</label> <div class="grid grid-cols-1 md:grid-cols-2 gap-3"><div class="relative"><input id="to-value-input" type="text" readonly="" placeholder="Result" class="input text-lg font-medium pr-12"/> <button class="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-blue-500 transition-colors" title="Copy result"><!></button></div> <select class="select"></select></div></div> <!></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Reference</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm"><!></div></div></div> <div class="space-y-6"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 sticky top-6"><div class="flex items-center justify-between mb-4"><h3 class="text-lg font-semibold text-gray-900 dark:text-white">History</h3> <!></div> <!></div></div></div> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"><div class="flex items-center gap-2 mb-2 text-blue-600 dark:text-blue-400"><!> <h3 class="font-medium">Precision</h3></div> <p class="text-sm text-gray-600 dark:text-gray-400">High-precision calculations for accurate results every time</p></div> <div class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"><div class="flex items-center gap-2 mb-2 text-blue-600 dark:text-blue-400"><!> <h3 class="font-medium">History</h3></div> <p class="text-sm text-gray-600 dark:text-gray-400">Automatically saves your recent conversions for quick reference</p></div> <div class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"><div class="flex items-center gap-2 mb-2 text-blue-600 dark:text-blue-400"><!> <h3 class="font-medium">Fast</h3></div> <p class="text-sm text-gray-600 dark:text-gray-400">Instant conversion as you type with no page reloads</p></div></div></div>');function Gh(o,e){Ie(e,!0);const a=[{id:"length",name:"Length",icon:Y0,color:"blue"},{id:"weight",name:"Weight",icon:nc,color:"green"},{id:"temperature",name:"Temperature",icon:ec,color:"red"},{id:"volume",name:"Volume",icon:sc,color:"purple"},{id:"time",name:"Time",icon:ka,color:"yellow"},{id:"speed",name:"Speed",icon:Kt,color:"orange"}],i={length:{meter:1,kilometer:.001,centimeter:100,millimeter:1e3,mile:621371e-9,yard:1.09361,foot:3.28084,inch:39.3701,nauticalMile:539957e-9},weight:{kilogram:1,gram:1e3,milligram:1e6,pound:2.20462,ounce:35.274,ton:.001,stone:.157473},temperature:{celsius:"celsius",fahrenheit:"fahrenheit",kelvin:"kelvin"},volume:{liter:1,milliliter:1e3,gallon:.264172,quart:1.05669,pint:2.11338,cup:4.22675,fluidOunce:33.814,cubicMeter:.001},time:{second:1,millisecond:1e3,microsecond:1e6,minute:1/60,hour:1/3600,day:1/86400,week:1/604800,month:1/2592e3,year:1/31536e3},speed:{meterPerSecond:1,kilometerPerHour:3.6,milePerHour:2.23694,knot:1.94384,footPerSecond:3.28084,mach:.00291545}},n={length:{meter:"Meter (m)",kilometer:"Kilometer (km)",centimeter:"Centimeter (cm)",millimeter:"Millimeter (mm)",mile:"Mile (mi)",yard:"Yard (yd)",foot:"Foot (ft)",inch:"Inch (in)",nauticalMile:"Nautical Mile (nm)"},weight:{kilogram:"Kilogram (kg)",gram:"Gram (g)",milligram:"Milligram (mg)",pound:"Pound (lb)",ounce:"Ounce (oz)",ton:"Ton (t)",stone:"Stone (st)"},temperature:{celsius:"Celsius (°C)",fahrenheit:"Fahrenheit (°F)",kelvin:"Kelvin (K)"},volume:{liter:"Liter (L)",milliliter:"Milliliter (mL)",gallon:"Gallon (gal)",quart:"Quart (qt)",pint:"Pint (pt)",cup:"Cup (cup)",fluidOunce:"Fluid Ounce (fl oz)",cubicMeter:"Cubic Meter (m³)"},time:{second:"Second (s)",millisecond:"Millisecond (ms)",microsecond:"Microsecond (μs)",minute:"Minute (min)",hour:"Hour (hr)",day:"Day (d)",week:"Week (wk)",month:"Month (mo)",year:"Year (yr)"},speed:{meterPerSecond:"Meter/Second (m/s)",kilometerPerHour:"Kilometer/Hour (km/h)",milePerHour:"Mile/Hour (mph)",knot:"Knot (kn)",footPerSecond:"Foot/Second (ft/s)",mach:"Mach"}};let c=p("length"),d=p("1"),v=p("meter"),g=p("kilometer"),u=p(""),f=p(Lt([]));const k=xt(()=>Object.keys(i[t(c)])),h=xt(()=>t(k).map(W=>({value:W,label:n[t(c)][W]})));Ct(()=>{if(t(d)&&!isNaN(parseFloat(t(d)))){const W=parseFloat(t(d));let le;if(t(c)==="temperature")le=m(W,t(v),t(g));else{const we=i[t(c)];le=W/we[t(v)]*we[t(g)]}l(u,le.toFixed(6).replace(/\.?0+$/,""),!0)}else l(u,"")});function m(W,le,we){let Fe;switch(le){case"celsius":Fe=W;break;case"fahrenheit":Fe=(W-32)*5/9;break;case"kelvin":Fe=W-273.15;break;default:throw new Error(`Unknown temperature unit: ${le}`)}switch(we){case"celsius":return Fe;case"fahrenheit":return Fe*9/5+32;case"kelvin":return Fe+273.15;default:throw new Error(`Unknown temperature unit: ${we}`)}}function _(){const W=n[t(c)],le=W[t(v)],we=W[t(g)],Fe={from:`${t(d)} ${le}`,to:`${t(u)} ${we}`,category:t(c),timestamp:new Date};t(f).length>0&&t(f)[0].from===Fe.from&&t(f)[0].to===Fe.to||l(f,[Fe,...t(f).slice(0,9)],!0)}function $(W){l(d,W.from.split(" ")[0],!0),l(c,W.category,!0);const le=Object.keys(i[W.category]);l(v,le[0],!0),l(g,le[1],!0)}function M(){l(d,"1"),l(u,"");const W=Object.keys(i[t(c)]);l(v,W[0],!0),l(g,W[1],!0),Ht.success("Reset converter")}var E=qh(),R=r(E),V=r(R),b=r(V);b.__click=[Mh];var T=r(b);jt(T,{class:"w-5 h-5"});var C=s(V,2),B=r(C),z=r(B);ua(z,{class:"w-10 h-10 text-white"});var te=s(R,4),ue=r(te);ue.__click=M;var de=r(ue);Yo(de,{class:"w-4 h-4 mr-2"});var xe=s(ue,2);xe.__click=[fn,f];var ce=r(xe);Ko(ce,{class:"w-4 h-4 mr-2"});var fe=s(te,2),Be=r(fe);mt(Be,21,()=>a,W=>W.id,(W,le)=>{var we=Ph();we.__click=[Eh,c,le,M];var Fe=r(we);nr(Fe,()=>t(le).icon,(ye,Ae)=>{Ae(ye,{class:"w-4 h-4"})});var J=s(Fe,2),ie=r(J);Y(()=>{ut(we,1,`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-200 ${t(c)===t(le).id?"border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300":"border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600"}`),y(ie,t(le).name)}),x(W,we)});var Ve=s(fe,2),Ye=r(Ve),Qe=r(Ye),We=r(Qe),ze=r(We);ua(ze,{class:"w-5 h-5 mr-2 text-blue-500"});var je=s(ze),Le=s(We,2),Ce=r(Le),re=s(r(Ce),2),Te=r(re),me=s(Te,2);mt(me,21,()=>t(h),Nr,(W,le)=>{var we=Lh(),Fe=r(we),J={};Y(()=>{y(Fe,t(le).label),J!==(J=t(le).value)&&(we.value=(we.__value=t(le).value)??"")}),x(W,we)});var oe=s(Ce,2),j=r(oe);j.__click=[Sh,v,g,d,u];var be=r(j);xl(be,{class:"w-5 h-5"});var ve=s(oe,2),U=s(r(ve),2),X=r(U),he=r(X),pe=s(he,2);pe.__click=[Th,u,_];var ke=r(pe);ht(ke,{class:"w-4 h-4"});var Ue=s(X,2);mt(Ue,21,()=>t(h),Nr,(W,le)=>{var we=Ah(),Fe=r(we),J={};Y(()=>{y(Fe,t(le).label),J!==(J=t(le).value)&&(we.value=(we.__value=t(le).value)??"")}),x(W,we)});var Oe=s(ve,2);{var Ne=W=>{var le=jh();x(W,le)};H(Oe,W=>{t(c)==="temperature"&&W(Ne)})}var Pe=s(Qe,2),se=s(r(Pe),2),_e=r(se);{var q=W=>{var le=Nh();x(W,le)},Q=W=>{var le=Ee(),we=ge(le);{var Fe=ie=>{var ye=Ih();x(ie,ye)},J=ie=>{var ye=Ee(),Ae=ge(ye);{var Je=Ke=>{var tt=Rh();x(Ke,tt)},Xe=Ke=>{var tt=Ee(),dt=ge(tt);{var qe=ct=>{var at=Bh();x(ct,at)},lt=ct=>{var at=Ee(),ft=ge(at);{var bt=rt=>{var gt=Dh();x(rt,gt)};H(ft,rt=>{t(c)==="speed"&&rt(bt)},!0)}x(ct,at)};H(dt,ct=>{t(c)==="time"?ct(qe):ct(lt,!1)},!0)}x(Ke,tt)};H(Ae,Ke=>{t(c)==="volume"?Ke(Je):Ke(Xe,!1)},!0)}x(ie,ye)};H(we,ie=>{t(c)==="weight"?ie(Fe):ie(J,!1)},!0)}x(W,le)};H(_e,W=>{t(c)==="length"?W(q):W(Q,!1)})}var G=s(Ye,2),P=r(G),L=r(P),N=s(r(L),2);{var ae=W=>{var le=Fh();le.__click=[fn,f],x(W,le)};H(N,W=>{t(f).length>0&&W(ae)})}var ee=s(L,2);{var K=W=>{var le=Hh(),we=r(le);Ka(we,{class:"w-8 h-8 mb-2 opacity-50"}),x(W,le)},O=W=>{var le=Uh();mt(le,21,()=>t(f),we=>we.timestamp,(we,Fe)=>{var J=zh();J.__click=[Oh,$,Fe];var ie=r(J),ye=r(ie),Ae=s(ie,2),Je=r(Ae),Xe=s(Ae,2),Ke=r(Xe);Y(tt=>{y(ye,t(Fe).from),y(Je,`→ ${t(Fe).to??""}`),y(Ke,tt)},[()=>t(Fe).timestamp.toLocaleTimeString()]),x(we,J)}),x(W,le)};H(ee,W=>{t(f).length===0?W(K):W(O,!1)})}var I=s(Ve,2),S=r(I),D=r(S),F=r(D);ua(F,{class:"w-5 h-5"});var Z=s(S,2),A=r(Z),ne=r(A);Ka(ne,{class:"w-5 h-5"});var Me=s(Z,2),Ge=r(Me),$e=r(Ge);Kt($e,{class:"w-5 h-5"}),Y(W=>y(je,` Convert ${W??""}`),[()=>a.find(W=>W.id===t(c))?.name]),Se(Te,()=>t(d),W=>l(d,W)),cr(me,()=>t(v),W=>l(v,W)),Se(he,()=>t(u),W=>l(u,W)),cr(Ue,()=>t(g),W=>l(g,W)),x(o,E),Re()}yt(["click"]);function Wh(){vt("/tools")}var Jh=w('<meta name="description" content="Calculate percentages, discounts, tips, and percentage differences with ease"/>'),Vh=(o,e,a,i)=>{l(e,t(a).id,!0),i()},Yh=w('<button><!> <h3 class="font-medium text-gray-900 dark:text-white mb-1"> </h3> <p class="text-sm text-gray-600 dark:text-gray-400"> </p></button>'),Kh=w("<!> ",1),Qh=(o,e,a)=>e(t(a)),Zh=(o,e,a)=>e(a.toString()),Xh=w('<button class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"> </button>'),e2=(o,e,a)=>e(t(a)),t2=w('<div class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"><div class="flex items-center justify-between"><div><p class="text-sm text-blue-600 dark:text-blue-400 mb-1">Result</p> <p class="text-2xl font-bold text-blue-700 dark:text-blue-300"> </p></div> <button class="p-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"><!></button></div></div>'),r2=w('<div class="space-y-6"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">What is <input type="number" class="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded mx-2"/>% of <input type="number" class="w-24 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded mx-2"/>?</label></div> <div class="flex flex-wrap gap-2"><span class="text-sm text-gray-600 dark:text-gray-400">Quick:</span> <!></div> <!></div>'),a2=(o,e,a)=>e(t(a)),o2=w('<div class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"><div class="flex items-center justify-between"><div><p class="text-sm text-green-600 dark:text-green-400 mb-1">New Value</p> <p class="text-2xl font-bold text-green-700 dark:text-green-300"> </p> <p class="text-sm text-green-600 dark:text-green-400 mt-1"> </p></div> <button class="p-2 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"><!></button></div></div>'),i2=w('<div class="space-y-6"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Increase <input type="number" class="w-24 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded mx-2"/> by <input type="number" class="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded mx-2"/>%</label></div> <!></div>'),s2=(o,e,a)=>e(t(a)),n2=w('<div class="p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg"><div class="flex items-center justify-between"><div><p class="text-sm text-orange-600 dark:text-orange-400 mb-1">New Value</p> <p class="text-2xl font-bold text-orange-700 dark:text-orange-300"> </p> <p class="text-sm text-orange-600 dark:text-orange-400 mt-1"> </p></div> <button class="p-2 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300"><!></button></div></div>'),l2=w('<div class="space-y-6"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Decrease <input type="number" class="w-24 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded mx-2"/> by <input type="number" class="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded mx-2"/>%</label></div> <!></div>'),d2=(o,e,a)=>e(t(a)+"%"),c2=w('<div class="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg"><div class="flex items-center justify-between"><div><p class="text-sm text-purple-600 dark:text-purple-400 mb-1">Percentage Difference</p> <p class="text-2xl font-bold text-purple-700 dark:text-purple-300"> </p></div> <button class="p-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"><!></button></div></div>'),v2=w('<div class="space-y-6"><div class="grid grid-cols-2 gap-4"><div><label for="first-value" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Value</label> <input id="first-value" type="number" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"/></div> <div><label for="second-value" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Second Value</label> <input id="second-value" type="number" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"/></div></div> <!></div>'),g2=(o,e,a)=>e(t(a)),u2=w('<div class="space-y-4"><div class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"><div class="flex items-center justify-between"><div><p class="text-sm text-red-600 dark:text-red-400 mb-1">Final Price</p> <p class="text-2xl font-bold text-red-700 dark:text-red-300"> </p></div> <button class="p-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"><!></button></div></div> <div class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"><p class="text-sm text-green-600 dark:text-green-400 mb-1">You Save</p> <p class="text-xl font-bold text-green-700 dark:text-green-300"> </p></div></div>'),x2=w('<div class="space-y-6"><div class="grid grid-cols-2 gap-4"><div><label for="original-price" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Original Price</label> <div class="relative"><span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span> <input id="original-price" type="number" class="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"/></div></div> <div><label for="discount-percent" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Discount (%)</label> <input id="discount-percent" type="number" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"/></div></div> <!></div>'),f2=(o,e,a)=>e(a.toString()),b2=w('<button class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"> </button>'),p2=(o,e,a)=>e(t(a)),m2=w('<div class="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg"><div class="flex items-center justify-between"><div><p class="text-sm text-purple-600 dark:text-purple-400 mb-1">Per Person</p> <p class="text-2xl font-bold text-purple-700 dark:text-purple-300"> </p></div> <button class="p-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"><!></button></div></div>'),h2=w('<div class="space-y-4"><div class="grid grid-cols-2 gap-4"><div class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"><p class="text-sm text-blue-600 dark:text-blue-400 mb-1">Tip Amount</p> <p class="text-xl font-bold text-blue-700 dark:text-blue-300"> </p></div> <div class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"><p class="text-sm text-green-600 dark:text-green-400 mb-1">Total with Tip</p> <p class="text-xl font-bold text-green-700 dark:text-green-300"> </p></div></div> <!></div>'),y2=w('<div class="space-y-6"><div><label for="bill-amount" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bill Amount</label> <div class="relative"><span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span> <input id="bill-amount" type="number" class="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"/></div></div> <div class="grid grid-cols-2 gap-4"><div><label for="tip-percentage" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tip Percentage</label> <input id="tip-percentage" type="number" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"/> <div class="flex flex-wrap gap-2 mt-2"></div></div> <div><label for="number-of-people" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Number of People</label> <input id="number-of-people" type="number" min="1" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"/></div></div> <!></div>'),_2=w('<div class="space-y-2 text-sm"><p class="font-medium text-gray-900 dark:text-white">Basic Percentage</p> <p class="text-gray-600 dark:text-gray-400">Result = (Percentage × Number) ÷ 100</p></div>'),k2=w('<div class="space-y-2 text-sm"><p class="font-medium text-gray-900 dark:text-white">Increase</p> <p class="text-gray-600 dark:text-gray-400">New = Original + (Original × Percentage ÷ 100)</p></div>'),w2=w('<div class="space-y-2 text-sm"><p class="font-medium text-gray-900 dark:text-white">Decrease</p> <p class="text-gray-600 dark:text-gray-400">New = Original - (Original × Percentage ÷ 100)</p></div>'),C2=w('<div class="space-y-2 text-sm"><p class="font-medium text-gray-900 dark:text-white">Percentage Difference</p> <p class="text-gray-600 dark:text-gray-400">Diff = |Value2 - Value1| ÷ ((Value1 + Value2) ÷ 2) × 100</p></div>'),$2=w('<div class="space-y-2 text-sm"><p class="font-medium text-gray-900 dark:text-white">Discount</p> <p class="text-gray-600 dark:text-gray-400">Final = Price - (Price × Discount ÷ 100)</p> <p class="text-gray-600 dark:text-gray-400">Saved = Price × Discount ÷ 100</p></div>'),S2=w('<div class="space-y-2 text-sm"><p class="font-medium text-gray-900 dark:text-white">Tip Calculator</p> <p class="text-gray-600 dark:text-gray-400">Tip = Bill × Tip ÷ 100</p> <p class="text-gray-600 dark:text-gray-400">Total = Bill + Tip</p> <p class="text-gray-600 dark:text-gray-400">Per Person = Total ÷ Number of People</p></div>'),T2=w('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Percentage Calculator</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Calculate percentages, discounts, tips, and more with precision</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Percentage Calculator</li></ol></nav> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-6"><div class="p-6"><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Choose Calculator</h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div></div></div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-2"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><div class="flex items-center justify-between mb-6"><h2 class="text-xl font-semibold text-gray-900 dark:text-white flex items-center"></h2> <div class="flex gap-2"><button class="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">Example</button> <button class="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"><!></button></div></div> <!> <!> <!> <!> <!> <!></div></div> <div class="space-y-6"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center"><!> Formulas</h3> <!></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Tips</h3> <div class="space-y-3 text-sm text-gray-600 dark:text-gray-400"><div class="flex items-start"><div class="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2"></div> <p>Use common percentages for quick calculations (10%, 25%, 50%, etc.)</p></div> <div class="flex items-start"><div class="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2"></div> <p>For tips, 15-20% is standard in most countries</p></div> <div class="flex items-start"><div class="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2"></div> <p>Percentage difference uses the average of two values as the base</p></div> <div class="flex items-start"><div class="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2"></div> <p>Double-check discount calculations to avoid errors</p></div></div></div></div></div></div>');function M2(o,e){Ie(e,!0);const a=[{id:"basic",name:"Basic %",icon:wo,description:"Calculate percentage of a number"},{id:"increase",name:"Increase",icon:rc,description:"Increase number by percentage"},{id:"decrease",name:"Decrease",icon:tc,description:"Decrease number by percentage"},{id:"difference",name:"Difference",icon:wo,description:"Percentage difference between numbers"},{id:"discount",name:"Discount",icon:Z0,description:"Calculate discount and final price"},{id:"tip",name:"Tip Calculator",icon:No,description:"Calculate tip and split bill"}];let i=p("basic"),n=p(""),c=p(""),d=p(""),v=p(""),g=p(""),u=p(""),f=p(""),k=p(""),h=p(""),m=p(""),_=p(""),$=p(""),M=p(""),E=p(""),R=p("15"),V=p("1"),b=p(""),T=p(""),C=p("");const B=[5,10,15,20,25,50,75,100],z=[10,15,18,20,25];Ct(()=>{if(t(n)&&t(c)&&!isNaN(parseFloat(t(n)))&&!isNaN(parseFloat(t(c)))){const D=parseFloat(t(n))/100,F=parseFloat(t(c));l(d,(F*D).toFixed(2),!0)}else l(d,"")}),Ct(()=>{if(t(v)&&t(g)&&!isNaN(parseFloat(t(v)))&&!isNaN(parseFloat(t(g)))){const D=parseFloat(t(v)),F=parseFloat(t(g))/100;t(i)==="increase"?l(u,(D+D*F).toFixed(2),!0):t(i)==="decrease"&&l(u,(D-D*F).toFixed(2),!0)}else l(u,"")}),Ct(()=>{if(t(f)&&t(k)&&!isNaN(parseFloat(t(f)))&&!isNaN(parseFloat(t(k)))){const D=parseFloat(t(f)),F=parseFloat(t(k)),Z=Math.abs(F-D),A=(D+F)/2;l(h,(Z/A*100).toFixed(2),!0)}else l(h,"")}),Ct(()=>{if(t(m)&&t(_)&&!isNaN(parseFloat(t(m)))&&!isNaN(parseFloat(t(_)))){const D=parseFloat(t(m)),F=parseFloat(t(_))/100,Z=D*F,A=D-Z;l(M,Z.toFixed(2),!0),l($,A.toFixed(2),!0)}else l($,""),l(M,"")}),Ct(()=>{if(t(E)&&t(R)&&!isNaN(parseFloat(t(E)))&&!isNaN(parseFloat(t(R)))){const D=parseFloat(t(E)),F=parseFloat(t(R))/100,Z=parseInt(t(V))||1,A=D*F,ne=D+A,Me=ne/Z;l(b,A.toFixed(2),!0),l(T,ne.toFixed(2),!0),l(C,Me.toFixed(2),!0)}else l(b,""),l(T,""),l(C,"")});function te(D){navigator.clipboard.writeText(D)}function ue(D){l(n,D,!0)}function de(D){l(R,D,!0)}function xe(){switch(t(i)){case"basic":l(n,""),l(c,"");break;case"increase":case"decrease":l(v,""),l(g,"");break;case"difference":l(f,""),l(k,"");break;case"discount":l(m,""),l(_,"");break;case"tip":l(E,""),l(R,"15"),l(V,"1");break}}function ce(D){switch(D){case"basic":l(n,"25"),l(c,"200");break;case"increase":l(v,"100"),l(g,"20");break;case"decrease":l(v,"150"),l(g,"30");break;case"difference":l(f,"80"),l(k,"100");break;case"discount":l(m,"50"),l(_,"20");break;case"tip":l(E,"85.50"),l(R,"18"),l(V,"3");break}}function fe(D){return D?new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(parseFloat(D)||0):"$0.00"}var Be=T2();Ir(D=>{var F=Jh();Mr.title="Percentage Calculator - Developer Tools",x(D,F)});var Ve=r(Be),Ye=r(Ve),Qe=r(Ye);Qe.__click=[Wh];var We=r(Qe);jt(We,{class:"w-5 h-5"});var ze=s(Ye,2),je=r(ze),Le=r(je);wo(Le,{class:"w-10 h-10 text-white"});var Ce=s(Ve,4),re=r(Ce),Te=s(r(re),2);mt(Te,21,()=>a,D=>D.id,(D,F)=>{var Z=Yh();Z.__click=[Vh,i,F,xe];var A=r(Z);nr(A,()=>t(F).icon,(W,le)=>{le(W,{class:"w-6 h-6 mb-2 text-blue-600 dark:text-blue-400"})});var ne=s(A,2),Me=r(ne),Ge=s(ne,2),$e=r(Ge);Y(()=>{ut(Z,1,`p-4 rounded-lg border-2 transition-all text-left ${t(i)===t(F).id?"border-blue-500 bg-blue-50 dark:bg-blue-900/20":"border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"}`),y(Me,t(F).name),y($e,t(F).description)}),x(D,Z)});var me=s(Ce,2),oe=r(me),j=r(oe),be=r(j),ve=r(be);mt(ve,21,()=>a,D=>D.id,(D,F)=>{var Z=Ee(),A=ge(Z);{var ne=Me=>{var Ge=Kh(),$e=ge(Ge);nr($e,()=>t(F).icon,(le,we)=>{we(le,{class:"w-6 h-6 mr-2"})});var W=s($e);Y(()=>y(W,` ${t(F).name??""}`)),x(Me,Ge)};H(A,Me=>{t(F).id===t(i)&&Me(ne)})}x(D,Z)});var U=s(ve,2),X=r(U);X.__click=[Qh,ce,i];var he=s(X,2);he.__click=xe;var pe=r(he);Yo(pe,{class:"w-4 h-4"});var ke=s(be,2);{var Ue=D=>{var F=r2(),Z=r(F),A=r(Z),ne=s(r(A)),Me=s(ne,2),Ge=s(Z,2),$e=s(r(Ge),2);mt($e,16,()=>B,we=>we,(we,Fe)=>{var J=Xh();J.__click=[Zh,ue,Fe];var ie=r(J);Y(()=>y(ie,`${Fe??""}%`)),x(we,J)});var W=s(Ge,2);{var le=we=>{var Fe=t2(),J=r(Fe),ie=r(J),ye=s(r(ie),2),Ae=r(ye),Je=s(ie,2);Je.__click=[e2,te,d];var Xe=r(Je);ht(Xe,{class:"w-5 h-5"}),Y(()=>y(Ae,t(d))),x(we,Fe)};H(W,we=>{t(d)&&we(le)})}Se(ne,()=>t(n),we=>l(n,we)),Se(Me,()=>t(c),we=>l(c,we)),x(D,F)};H(ke,D=>{t(i)==="basic"&&D(Ue)})}var Oe=s(ke,2);{var Ne=D=>{var F=i2(),Z=r(F),A=r(Z),ne=s(r(A)),Me=s(ne,2),Ge=s(Z,2);{var $e=W=>{var le=o2(),we=r(le),Fe=r(we),J=s(r(Fe),2),ie=r(J),ye=s(J,2),Ae=r(ye),Je=s(Fe,2);Je.__click=[a2,te,u];var Xe=r(Je);ht(Xe,{class:"w-5 h-5"}),Y(Ke=>{y(ie,t(u)),y(Ae,`(+${Ke??""}%)`)},[()=>((parseFloat(t(u))-parseFloat(t(v)))/parseFloat(t(v))*100).toFixed(2)]),x(W,le)};H(Ge,W=>{t(u)&&W($e)})}Se(ne,()=>t(v),W=>l(v,W)),Se(Me,()=>t(g),W=>l(g,W)),x(D,F)};H(Oe,D=>{t(i)==="increase"&&D(Ne)})}var Pe=s(Oe,2);{var se=D=>{var F=l2(),Z=r(F),A=r(Z),ne=s(r(A)),Me=s(ne,2),Ge=s(Z,2);{var $e=W=>{var le=n2(),we=r(le),Fe=r(we),J=s(r(Fe),2),ie=r(J),ye=s(J,2),Ae=r(ye),Je=s(Fe,2);Je.__click=[s2,te,u];var Xe=r(Je);ht(Xe,{class:"w-5 h-5"}),Y(Ke=>{y(ie,t(u)),y(Ae,`(-${Ke??""}%)`)},[()=>((parseFloat(t(v))-parseFloat(t(u)))/parseFloat(t(v))*100).toFixed(2)]),x(W,le)};H(Ge,W=>{t(u)&&W($e)})}Se(ne,()=>t(v),W=>l(v,W)),Se(Me,()=>t(g),W=>l(g,W)),x(D,F)};H(Pe,D=>{t(i)==="decrease"&&D(se)})}var _e=s(Pe,2);{var q=D=>{var F=v2(),Z=r(F),A=r(Z),ne=s(r(A),2),Me=s(A,2),Ge=s(r(Me),2),$e=s(Z,2);{var W=le=>{var we=c2(),Fe=r(we),J=r(Fe),ie=s(r(J),2),ye=r(ie),Ae=s(J,2);Ae.__click=[d2,te,h];var Je=r(Ae);ht(Je,{class:"w-5 h-5"}),Y(()=>y(ye,`${t(h)??""}%`)),x(le,we)};H($e,le=>{t(h)&&le(W)})}Se(ne,()=>t(f),le=>l(f,le)),Se(Ge,()=>t(k),le=>l(k,le)),x(D,F)};H(_e,D=>{t(i)==="difference"&&D(q)})}var Q=s(_e,2);{var G=D=>{var F=x2(),Z=r(F),A=r(Z),ne=s(r(A),2),Me=s(r(ne),2),Ge=s(A,2),$e=s(r(Ge),2),W=s(Z,2);{var le=we=>{var Fe=u2(),J=r(Fe),ie=r(J),ye=r(ie),Ae=s(r(ye),2),Je=r(Ae),Xe=s(ye,2);Xe.__click=[g2,te,$];var Ke=r(Xe);ht(Ke,{class:"w-5 h-5"});var tt=s(J,2),dt=s(r(tt),2),qe=r(dt);Y((lt,ct)=>{y(Je,lt),y(qe,ct)},[()=>fe(t($)),()=>fe(t(M))]),x(we,Fe)};H(W,we=>{t($)&&we(le)})}Se(Me,()=>t(m),we=>l(m,we)),Se($e,()=>t(_),we=>l(_,we)),x(D,F)};H(Q,D=>{t(i)==="discount"&&D(G)})}var P=s(Q,2);{var L=D=>{var F=y2(),Z=r(F),A=s(r(Z),2),ne=s(r(A),2),Me=s(Z,2),Ge=r(Me),$e=s(r(Ge),2),W=s($e,2);mt(W,20,()=>z,ie=>ie,(ie,ye)=>{var Ae=b2();Ae.__click=[f2,de,ye];var Je=r(Ae);Y(()=>y(Je,`${ye??""}%`)),x(ie,Ae)});var le=s(Ge,2),we=s(r(le),2),Fe=s(Me,2);{var J=ie=>{var ye=h2(),Ae=r(ye),Je=r(Ae),Xe=s(r(Je),2),Ke=r(Xe),tt=s(Je,2),dt=s(r(tt),2),qe=r(dt),lt=s(Ae,2);{var ct=at=>{var ft=m2(),bt=r(ft),rt=r(bt),gt=s(r(rt),2),$t=r(gt),Mt=s(rt,2);Mt.__click=[p2,te,C];var He=r(Mt);ht(He,{class:"w-5 h-5"}),Y(ot=>y($t,ot),[()=>fe(t(C))]),x(at,ft)};H(lt,at=>{parseInt(t(V))>1&&at(ct)})}Y((at,ft)=>{y(Ke,at),y(qe,ft)},[()=>fe(t(b)),()=>fe(t(T))]),x(ie,ye)};H(Fe,ie=>{t(b)&&ie(J)})}Se(ne,()=>t(E),ie=>l(E,ie)),Se($e,()=>t(R),ie=>l(R,ie)),Se(we,()=>t(V),ie=>l(V,ie)),x(D,F)};H(P,D=>{t(i)==="tip"&&D(L)})}var N=s(oe,2),ae=r(N),ee=r(ae),K=r(ee);ua(K,{class:"w-5 h-5 mr-2"});var O=s(ee,2);{var I=D=>{var F=_2();x(D,F)},S=D=>{var F=Ee(),Z=ge(F);{var A=Me=>{var Ge=k2();x(Me,Ge)},ne=Me=>{var Ge=Ee(),$e=ge(Ge);{var W=we=>{var Fe=w2();x(we,Fe)},le=we=>{var Fe=Ee(),J=ge(Fe);{var ie=Ae=>{var Je=C2();x(Ae,Je)},ye=Ae=>{var Je=Ee(),Xe=ge(Je);{var Ke=dt=>{var qe=$2();x(dt,qe)},tt=dt=>{var qe=Ee(),lt=ge(qe);{var ct=at=>{var ft=S2();x(at,ft)};H(lt,at=>{t(i)==="tip"&&at(ct)},!0)}x(dt,qe)};H(Xe,dt=>{t(i)==="discount"?dt(Ke):dt(tt,!1)},!0)}x(Ae,Je)};H(J,Ae=>{t(i)==="difference"?Ae(ie):Ae(ye,!1)},!0)}x(we,Fe)};H($e,we=>{t(i)==="decrease"?we(W):we(le,!1)},!0)}x(Me,Ge)};H(Z,Me=>{t(i)==="increase"?Me(A):Me(ne,!1)},!0)}x(D,F)};H(O,D=>{t(i)==="basic"?D(I):D(S,!1)})}x(o,Be),Re()}yt(["click"]);function E2(o,e,a,i,n,c,d){l(e,"metric"),l(a,"175"),l(i,"70"),l(n,"30"),l(c,"male"),l(d,"moderate")}function P2(o,e,a,i,n,c){l(e,""),l(a,""),l(i,""),l(n,"male"),l(c,"moderate")}function L2(){vt("/tools")}var A2=w('<meta name="description" content="Calculate BMI, ideal weight, BMR, and daily calorie needs with health insights"/>'),j2=(o,e)=>e("metric"),N2=(o,e)=>e("imperial"),I2=w("<option> </option>"),R2=w('<div class="pt-2 border-t border-gray-200 dark:border-gray-700"><p class="text-sm text-gray-600 dark:text-gray-400"> </p></div>'),B2=w('<div class="flex justify-between"><span class="text-gray-600 dark:text-gray-400">Est. Body Fat:</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div>'),D2=w('<div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center"><!> Metabolic Information</h3> <div class="space-y-2"><div class="flex justify-between"><span class="text-gray-600 dark:text-gray-400">BMR:</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div> <div class="flex justify-between"><span class="text-gray-600 dark:text-gray-400">Daily Calories:</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div> <!></div></div>'),F2=w('<div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center"><!> Your BMI Results</h2> <div class="text-center mb-8"><div><p> </p> <p> </p></div></div> <div class="mb-8"><div class="relative"><div class="h-8 bg-gradient-to-r from-blue-400 via-green-400 to-red-400 rounded-full relative"><div class="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-gray-900 dark:bg-white rounded-full border-2 border-white dark:border-gray-900 transition-all duration-300"></div></div> <div class="flex justify-between mt-2 text-xs text-gray-600 dark:text-gray-400"><span>15</span> <span>18.5</span> <span>25</span> <span>30</span> <span>35</span> <span>40+</span></div></div></div> <div class="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><div class="flex items-start"><!> <div><p class="font-medium text-gray-900 dark:text-white mb-1">Health Risk Assessment</p> <p class="text-sm text-gray-600 dark:text-gray-400"> </p></div></div></div></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center"><!> Ideal Weight Range</h3> <div class="space-y-2"><div class="flex justify-between"><span class="text-gray-600 dark:text-gray-400">Minimum:</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div> <div class="flex justify-between"><span class="text-gray-600 dark:text-gray-400">Maximum:</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div> <!></div></div> <!></div>',1),H2=w('<div class="flex items-start"><div class="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-3"></div> <p class="text-sm text-gray-600 dark:text-gray-400"> </p></div>'),O2=w('<div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Health Tips</h3> <div class="space-y-3"></div></div>'),z2=w(`<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">BMI Calculator</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Calculate your Body Mass Index, ideal weight, and get personalized health insights</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">BMI Calculator</li></ol></nav> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-6"><div class="p-6"><div class="flex items-center justify-between"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Measurement Units</h2> <div class="flex gap-2"><button>Metric</button> <button>Imperial</button></div></div></div></div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-2 space-y-6"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><div class="flex items-center justify-between mb-6"><h2 class="text-xl font-semibold text-gray-900 dark:text-white flex items-center"><!> Personal Information</h2> <div class="flex gap-2"><button class="btn btn-primary btn-sm">Example</button> <button class="btn btn-primary btn-sm">Reset</button></div></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label for="height-input" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"> </label> <input class="input" id="height-input" type="number"/></div> <div><label for="weight-input" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"> </label> <input class="input" id="weight-input" type="number"/></div> <input class="input" id="age-input" type="number" placeholder="30"/> <div><fieldset><legend class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gender</legend> <div class="flex gap-4"><label class="flex items-center"><input type="radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"/> <span class="ml-2 text-gray-700 dark:text-gray-300">Male</span></label> <label class="flex items-center"><input type="radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"/> <span class="ml-2 text-gray-700 dark:text-gray-300">Female</span></label></div></fieldset></div></div> <div class="mt-6"><label for="activity-level-select" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Activity Level</label> <select id="activity-level-select" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></select></div></div> <!></div> <div class="space-y-6"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">BMI Categories</h3> <div class="space-y-3"><div class="flex items-center justify-between p-2 rounded bg-blue-50 dark:bg-blue-900/20"><div class="flex items-center"><div class="w-3 h-3 bg-blue-500 rounded-full mr-3"></div> <span class="text-sm text-gray-700 dark:text-gray-300">Underweight</span></div> <span class="text-sm text-gray-600 dark:text-gray-400">&lt; 18.5</span></div> <div class="flex items-center justify-between p-2 rounded bg-green-50 dark:bg-green-900/20"><div class="flex items-center"><div class="w-3 h-3 bg-green-500 rounded-full mr-3"></div> <span class="text-sm text-gray-700 dark:text-gray-300">Normal</span></div> <span class="text-sm text-gray-600 dark:text-gray-400">18.5 - 24.9</span></div> <div class="flex items-center justify-between p-2 rounded bg-yellow-50 dark:bg-yellow-900/20"><div class="flex items-center"><div class="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div> <span class="text-sm text-gray-700 dark:text-gray-300">Overweight</span></div> <span class="text-sm text-gray-600 dark:text-gray-400">25 - 29.9</span></div> <div class="flex items-center justify-between p-2 rounded bg-red-50 dark:bg-red-900/20"><div class="flex items-center"><div class="w-3 h-3 bg-red-500 rounded-full mr-3"></div> <span class="text-sm text-gray-700 dark:text-gray-300">Obese</span></div> <span class="text-sm text-gray-600 dark:text-gray-400">≥ 30</span></div></div></div> <!> <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6"><div class="flex items-start"><!> <div><h3 class="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Important Notes</h3> <ul class="text-sm text-yellow-700 dark:text-yellow-300 space-y-1"><li>• BMI is a screening tool, not a diagnostic tool</li> <li>• It doesn't account for muscle mass or body composition</li> <li>• Athletes may have high BMI but low body fat</li> <li>• Consult healthcare providers for medical advice</li> <li>• Children and teens use different BMI charts</li></ul></div></div></div></div></div></div>`);function U2(o,e){Ie(e,!0);const a=[];let i=p("metric"),n=p(""),c=p(""),d=p(""),v=p("male"),g=p("moderate"),u=p(0),f=p(""),k=p(""),h=p(Lt({min:0,max:0})),m=p(""),_=p(0),$=p(0),M=p(0);const E=[{value:"sedentary",label:"Sedentary",multiplier:1.2,description:"Little or no exercise"},{value:"light",label:"Lightly Active",multiplier:1.375,description:"Light exercise/sports 1-3 days/week"},{value:"moderate",label:"Moderately Active",multiplier:1.55,description:"Moderate exercise/sports 3-5 days/week"},{value:"active",label:"Very Active",multiplier:1.725,description:"Hard exercise/sports 6-7 days a week"},{value:"extra",label:"Extra Active",multiplier:1.9,description:"Very hard exercise/sports & physical job"}];Ct(()=>{if(t(n)&&t(c)&&!isNaN(parseFloat(t(n)))&&!isNaN(parseFloat(t(c)))){let A,ne;t(i)==="metric"?(A=parseFloat(t(n))/100,ne=parseFloat(t(c))):(A=parseFloat(t(n))*.0254,ne=parseFloat(t(c))*.453592),l(u,ne/(A*A)),t(u)<18.5?(l(f,"Underweight"),l(k,"blue"),l(m,"May have nutritional deficiency and osteoporosis risk")):t(u)<25?(l(f,"Normal Weight"),l(k,"green"),l(m,"Low risk of developing health problems")):t(u)<30?(l(f,"Overweight"),l(k,"yellow"),l(m,"Increased risk of heart disease, diabetes, and high blood pressure")):t(u)<35?(l(f,"Obese Class I"),l(k,"orange"),l(m,"High risk of cardiovascular disease and diabetes")):t(u)<40?(l(f,"Obese Class II"),l(k,"red"),l(m,"Very high risk of serious health conditions")):(l(f,"Obese Class III"),l(k,"red"),l(m,"Extremely high risk of life-threatening health conditions"));const Me=A*A;if(t(h).min=18.5*Me,t(h).max=24.9*Me,t(d)&&!isNaN(parseFloat(t(d)))){const Ge=parseFloat(t(d));t(v)==="male"?l(_,10*ne+6.25*(A*100)-5*Ge+5):l(_,10*ne+6.25*(A*100)-5*Ge-161);const $e=E.find(W=>W.value===t(g));$e&&l($,t(_)*$e.multiplier),t(v)==="male"?l(M,1.2*t(u)+.23*Ge-16.2):l(M,1.2*t(u)+.23*Ge-5.4)}}else l(u,0),l(f,""),l(k,""),l(h,{min:0,max:0},!0),l(m,""),l(_,0),l($,0),l(M,0)});function R(A){l(i,A,!0),l(n,""),l(c,"")}function V(){if(t(u)===0)return 0;const A=(t(u)-15)/25*100;return Math.max(0,Math.min(100,A))}function b(A){return t(i)==="metric"?`${A.toFixed(1)} kg`:`${(A*2.20462).toFixed(1)} lbs`}function T(A){return`${Math.round(A)} calories/day`}function C(){const A=[];return t(u)<18.5?(A.push("Increase calorie intake with nutrient-dense foods"),A.push("Include protein-rich foods to build muscle mass"),A.push("Consider strength training exercises"),A.push("Consult with a healthcare provider or dietitian")):t(u)>=18.5&&t(u)<25?(A.push("Maintain your current healthy lifestyle"),A.push("Continue regular physical activity (150 min/week)"),A.push("Eat a balanced diet with variety"),A.push("Get adequate sleep (7-9 hours per night)")):t(u)>=25&&t(u)<30?(A.push("Aim for gradual weight loss (1-2 lbs per week)"),A.push("Increase physical activity to 300 min/week"),A.push("Focus on portion control and mindful eating"),A.push("Reduce processed foods and sugary drinks")):(A.push("Consult healthcare provider for a comprehensive plan"),A.push("Start with small, sustainable lifestyle changes"),A.push("Consider professional nutritional guidance"),A.push("Focus on both diet and exercise modifications")),A}var B=z2();Ir(A=>{var ne=A2();Mr.title="BMI Calculator - Developer Tools",x(A,ne)});var z=r(B),te=r(z),ue=r(te);ue.__click=[L2];var de=r(ue);jt(de,{class:"w-5 h-5"});var xe=s(te,2),ce=r(xe),fe=r(ce);Hi(fe,{class:"w-10 h-10 text-white"});var Be=s(z,4),Ve=r(Be),Ye=r(Ve),Qe=s(r(Ye),2),We=r(Qe);We.__click=[j2,R];var ze=s(We,2);ze.__click=[N2,R];var je=s(Be,2),Le=r(je),Ce=r(Le),re=r(Ce),Te=r(re),me=r(Te);cs(me,{class:"w-6 h-6 mr-2"});var oe=s(Te,2),j=r(oe);j.__click=[E2,i,n,c,d,v,g];var be=s(j,2);be.__click=[P2,n,c,d,v,g];var ve=s(re,2),U=r(ve),X=r(U),he=r(X),pe=s(X,2),ke=s(U,2),Ue=r(ke),Oe=r(Ue),Ne=s(Ue,2),Pe=s(ke,2),se=s(Pe,2),_e=r(se),q=s(r(_e),2),Q=r(q),G=r(Q);G.value=G.__value="male";var P=s(Q,2),L=r(P);L.value=L.__value="female";var N=s(ve,2),ae=s(r(N),2);mt(ae,21,()=>E,A=>A.value,(A,ne)=>{var Me=I2(),Ge=r(Me),$e={};Y(()=>{y(Ge,`${t(ne).label??""} - ${t(ne).description??""}`),$e!==($e=t(ne).value)&&(Me.value=(Me.__value=t(ne).value)??"")}),x(A,Me)});var ee=s(Ce,2);{var K=A=>{var ne=F2(),Me=ge(ne),Ge=r(Me),$e=r(Ge);Hi($e,{class:"w-6 h-6 mr-2"});var W=s(Ge,2),le=r(W),we=r(le),Fe=r(we),J=s(we,2),ie=r(J),ye=s(W,2),Ae=r(ye),Je=r(Ae),Xe=r(Je),Ke=s(ye,2),tt=r(Ke),dt=r(tt);ba(dt,{class:"w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3"});var qe=s(dt,2),lt=s(r(qe),2),ct=r(lt),at=s(Me,2),ft=r(at),bt=r(ft),rt=r(bt);X0(rt,{class:"w-5 h-5 mr-2"});var gt=s(bt,2),$t=r(gt),Mt=s(r($t),2),He=r(Mt),ot=s($t,2),pt=s(r(ot),2),_t=r(pt),Nt=s(ot,2);{var It=kt=>{var Tt=R2(),Ut=r(Tt),At=r(Ut);Y(Wt=>y(At,`For height: ${t(n)??""} inches (${Wt??""} ft)`),[()=>(parseFloat(t(n))/12).toFixed(1)]),x(kt,Tt)};H(Nt,kt=>{t(i)==="imperial"&&t(n)&&kt(It)})}var Bt=s(ft,2);{var Dt=kt=>{var Tt=D2(),Ut=r(Tt),At=r(Ut);hl(At,{class:"w-5 h-5 mr-2"});var Wt=s(Ut,2),Xt=r(Wt),xr=s(r(Xt),2),dr=r(xr),Pt=s(Xt,2),er=s(r(Pt),2),Er=r(er),fr=s(Pt,2);{var br=ar=>{var or=B2(),pr=s(r(or),2),Pr=r(pr);Y(kr=>y(Pr,`${kr??""}%`),[()=>Math.max(0,t(M)).toFixed(1)]),x(ar,or)};H(fr,ar=>{t(M)&&ar(br)})}Y((ar,or)=>{y(dr,`${ar??""} calories/day`),y(Er,or)},[()=>Math.round(t(_)),()=>T(t($))]),x(kt,Tt)};H(Bt,kt=>{t(_)>0&&kt(Dt)})}Y((kt,Tt,Ut,At)=>{ut(le,1,`inline-block p-6 bg-${t(k)??""}-50 dark:bg-${t(k)??""}-900/20 rounded-lg border-2 border-${t(k)??""}-200 dark:border-${t(k)??""}-800`),ut(we,1,`text-5xl font-bold text-${t(k)??""}-700 dark:text-${t(k)??""}-300 mb-2`),y(Fe,kt),ut(J,1,`text-lg font-medium text-${t(k)??""}-600 dark:text-${t(k)??""}-400`),y(ie,t(f)),Yt(Xe,`left: ${Tt??""}%`),y(ct,t(m)),y(He,Ut),y(_t,At)},[()=>t(u).toFixed(1),V,()=>b(t(h).min),()=>b(t(h).max)]),x(A,ne)};H(ee,A=>{t(u)>0&&A(K)})}var O=s(Le,2),I=s(r(O),2);{var S=A=>{var ne=O2(),Me=s(r(ne),2);mt(Me,20,C,Ge=>Ge,(Ge,$e)=>{var W=H2(),le=s(r(W),2),we=r(le);Y(()=>y(we,$e)),x(Ge,W)}),x(A,ne)};H(I,A=>{t(u)>0&&C().length>0&&A(S)})}var D=s(I,2),F=r(D),Z=r(F);ba(Z,{class:"w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-3"}),Y(()=>{ut(We,1,`btn ${t(i)==="metric"?"btn-primary":"btn-secondary"}`),ut(ze,1,`btn ${t(i)==="imperial"?"btn-primary":"btn-secondary"}`),y(he,`Height (${t(i)==="metric"?"cm":"inches"})`),De(pe,"placeholder",t(i)==="metric"?"170":`5'7"`),y(Oe,`Weight (${t(i)==="metric"?"kg":"lbs"})`),De(Ne,"placeholder",t(i)==="metric"?"70":"154")}),Se(pe,()=>t(n),A=>l(n,A)),Se(Ne,()=>t(c),A=>l(c,A)),Se(Pe,()=>t(d),A=>l(d,A)),jo(a,[],G,()=>t(v),A=>l(v,A)),jo(a,[],L,()=>t(v),A=>l(v,A)),cr(ae,()=>t(g),A=>l(g,A)),x(o,B),Re()}yt(["click"]);function q2(o,e,a){l(e,"1990-06-15"),l(a,new Date().toISOString().split("T")[0],!0)}function G2(o,e,a,i,n){l(e,""),l(a,new Date().toISOString().split("T")[0],!0),l(i,"exact"),n()}var W2=w('<meta name="description" content="Calculate exact age, countdown to next birthday, zodiac signs, and more"/>'),J2=()=>vt("/tools"),V2=w('<div class="mt-4 text-gray-600 dark:text-gray-400"> <!> </div>'),Y2=w('<div class="inline-block p-6 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-lg border-2 border-pink-200 dark:border-pink-800 mb-6"><div class="text-3xl mb-4">🎉🎂🎈</div> <div class="text-2xl font-bold text-pink-600 dark:text-pink-400">Happy Birthday!</div> <div class="text-pink-700 dark:text-pink-300 mt-2"> </div></div> <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"><h3 class="text-lg font-medium text-blue-800 dark:text-blue-200 mb-2">Countdown to Next Birthday</h3> <div class="grid grid-cols-4 gap-2 text-center"><div><div class="text-2xl font-bold text-blue-600 dark:text-blue-400"> </div> <div class="text-xs text-blue-700 dark:text-blue-300">Days</div></div> <div><div class="text-2xl font-bold text-blue-600 dark:text-blue-400"> </div> <div class="text-xs text-blue-700 dark:text-blue-300">Hours</div></div> <div><div class="text-2xl font-bold text-blue-600 dark:text-blue-400"> </div> <div class="text-xs text-blue-700 dark:text-blue-300">Minutes</div></div> <div><div class="text-2xl font-bold text-blue-600 dark:text-blue-400"> </div> <div class="text-xs text-blue-700 dark:text-blue-300">Seconds</div></div></div></div>',1),K2=w('<div class="mt-4 text-sm text-gray-600 dark:text-gray-400"> </div>'),Q2=w('<div class="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><div class="text-lg text-gray-900 dark:text-white mb-2"> </div> <div class="text-3xl font-bold text-gray-900 dark:text-white mb-2"> </div> <div class="text-sm text-gray-600 dark:text-gray-400"> </div> <!></div>'),Z2=w('<div><span class="text-sm text-gray-600 dark:text-gray-400">Birth Year:</span> <span class="ml-2 text-gray-900 dark:text-white font-medium">Leap Year 🗓️</span></div>'),X2=w('<div class="mb-4"><div class="flex items-center justify-between mb-2"><span class="text-2xl"> </span> <span class="text-lg font-medium text-gray-900 dark:text-white"> </span></div> <div class="text-sm text-gray-600 dark:text-gray-400"> </div> <div class="text-sm text-gray-600 dark:text-gray-400 mt-1"> </div></div>'),ey=w('<div><div class="text-lg font-medium text-gray-900 dark:text-white mb-1">Chinese Zodiac</div> <div class="text-sm text-gray-600 dark:text-gray-400"> </div></div>'),ty=(o,e,a)=>e(a()),ry=(o,e,a,i,n)=>e(`${t(a)} years, ${t(i)} months, ${t(n)} days`),ay=w('<div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-2 space-y-6"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center"><!> Your Age</h2> <div class="text-center mb-8"><div class="inline-block p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border-2 border-blue-200 dark:border-blue-800"><div class="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4"> </div> <div class="text-lg text-blue-700 dark:text-blue-300">Years</div> <!></div></div> <div class="grid grid-cols-2 md:grid-cols-4 gap-4"><div class="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><div class="text-2xl font-bold text-gray-900 dark:text-white"> </div> <div class="text-sm text-gray-600 dark:text-gray-400">Days</div></div> <div class="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><div class="text-2xl font-bold text-gray-900 dark:text-white"> </div> <div class="text-sm text-gray-600 dark:text-gray-400">Weeks</div></div> <div class="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><div class="text-2xl font-bold text-gray-900 dark:text-white"> </div> <div class="text-sm text-gray-600 dark:text-gray-400">Months</div></div> <div class="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><div class="text-2xl font-bold text-gray-900 dark:text-white"> </div> <div class="text-sm text-gray-600 dark:text-gray-400">Hours</div></div></div> <div class="grid grid-cols-2 gap-4 mt-4"><div class="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><div class="text-2xl font-bold text-gray-900 dark:text-white"> </div> <div class="text-sm text-gray-600 dark:text-gray-400">Minutes</div></div> <div class="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><div class="text-2xl font-bold text-gray-900 dark:text-white"> </div> <div class="text-sm text-gray-600 dark:text-gray-400">Seconds</div></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center"><!> Next Birthday</h2> <div class="text-center"><!></div></div></div> <div class="space-y-6"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center"><!> Birth Details</h3> <div class="space-y-3"><div><span class="text-sm text-gray-600 dark:text-gray-400">Day of Week:</span> <span class="ml-2 text-gray-900 dark:text-white font-medium"> </span></div> <!> <div><span class="text-sm text-gray-600 dark:text-gray-400">Age in Milliseconds:</span> <span class="ml-2 text-gray-900 dark:text-white font-medium"> </span></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center"><!> Zodiac Signs</h3> <!> <!></div> <div class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800 p-6"><h3 class="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-4 flex items-center"><!> Fun Facts</h3> <div class="space-y-3 text-sm text-purple-700 dark:text-purple-300"><div><strong> </strong> weeks old</div> <div>Lived through <strong> </strong> seasons</div> <div>Approximately <strong> </strong> hours of sleep (average)</div> <div>About <strong> </strong> meals eaten</div> <div>Heart has beaten <strong> </strong> times (average)</div></div></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Copy</h3> <div class="space-y-2"><button class="btn btn-primary w-full"><!> Copy Age Text</button> <button class="btn btn-primary w-full">Copy Detailed Age</button></div></div></div></div>'),oy=w('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Age Calculator</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Calculate exact age, countdown to next birthday, and discover interesting facts</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Age Calculator</li></ol></nav> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-6"><div class="p-6"><div class="flex items-center justify-between mb-6"><h2 class="text-lg font-semibold text-gray-900 dark:text-white">Enter Dates</h2> <div class="flex gap-2"><button class="btn btn-primary btn-sm">Example</button> <button class="btn btn-primary btn-sm"><!> Reset</button></div></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"><input class="input" id="birth-date" type="date"/> <input class="input" id="current-date" type="date"/></div> <div class="mt-6"><fieldset><legend class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Calculation Mode</legend> <div class="flex gap-4"><label class="flex items-center"><input type="radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"/> <span class="ml-2 text-gray-700 dark:text-gray-300">Exact Age (Years, Months, Days)</span></label> <label class="flex items-center"><input type="radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"/> <span class="ml-2 text-gray-700 dark:text-gray-300">Total Difference</span></label></div></fieldset></div></div></div> <!></div>');function iy(o,e){Ie(e,!0);const a=[];let i=p(""),n=p(""),c=p("exact"),d=p(0),v=p(0),g=p(0),u=p(0),f=p(0),k=p(0),h=p(0),m=p(0),_=p(0),$=p(""),M=p(0),E=p(""),R=p(""),V=p(""),b=p(0),T=p(!1),C=p(!1),B=null,z=p(Lt({days:0,hours:0,minutes:0,seconds:0}));const te=[{name:"Aries",dates:"Mar 21 - Apr 19",symbol:"♈",element:"Fire"},{name:"Taurus",dates:"Apr 20 - May 20",symbol:"♉",element:"Earth"},{name:"Gemini",dates:"May 21 - Jun 20",symbol:"♊",element:"Air"},{name:"Cancer",dates:"Jun 21 - Jul 22",symbol:"♋",element:"Water"},{name:"Leo",dates:"Jul 23 - Aug 22",symbol:"♌",element:"Fire"},{name:"Virgo",dates:"Aug 23 - Sep 22",symbol:"♍",element:"Earth"},{name:"Libra",dates:"Sep 23 - Oct 22",symbol:"♎",element:"Air"},{name:"Scorpio",dates:"Oct 23 - Nov 21",symbol:"♏",element:"Water"},{name:"Sagittarius",dates:"Nov 22 - Dec 21",symbol:"♐",element:"Fire"},{name:"Capricorn",dates:"Dec 22 - Jan 19",symbol:"♑",element:"Earth"},{name:"Aquarius",dates:"Jan 20 - Feb 18",symbol:"♒",element:"Air"},{name:"Pisces",dates:"Feb 19 - Mar 20",symbol:"♓",element:"Water"}];Ct(()=>{t(n)||l(n,new Date().toISOString().split("T")[0],!0)}),Ct(()=>{if(t(i)&&t(n)){const ee=new Date(t(i)),K=new Date(t(n));if(ee>K){Ye();return}t(c)==="exact"?ue(ee,K):de(ee,K),xe(ee,K)}else Ye()}),Ct(()=>(t(T)&&t($)?B=setInterval(Ve,1e3):B&&(clearInterval(B),B=null),()=>{B&&clearInterval(B)}));function ue(ee,K){let O=K.getFullYear()-ee.getFullYear(),I=K.getMonth()-ee.getMonth(),S=K.getDate()-ee.getDate();if(S<0){I--;const F=new Date(K.getFullYear(),K.getMonth(),0);S+=F.getDate()}I<0&&(O--,I+=12),l(d,O,!0),l(v,I,!0),l(g,S,!0);const D=K.getTime()-ee.getTime();l(b,D),l(u,Math.floor(D/(1e3*60*60*24)),!0),l(f,Math.floor(t(u)/7),!0),l(k,Math.floor(t(u)/30.44),!0),l(h,Math.floor(D/(1e3*60*60)),!0),l(m,Math.floor(D/(1e3*60)),!0),l(_,Math.floor(D/1e3),!0)}function de(ee,K){const O=K.getTime()-ee.getTime();l(b,O),l(_,Math.floor(O/1e3),!0),l(m,Math.floor(t(_)/60),!0),l(h,Math.floor(t(m)/60),!0),l(u,Math.floor(t(h)/24),!0),l(f,Math.floor(t(u)/7),!0),l(k,Math.floor(t(u)/30.44),!0),l(d,Math.floor(t(u)/365.25),!0);const I=t(u)%365.25;l(v,Math.floor(I/30.44),!0),l(g,Math.floor(I%30.44),!0)}function xe(ee,K){const O=new Date(K.getFullYear(),ee.getMonth(),ee.getDate());O<K&&O.setFullYear(K.getFullYear()+1),l($,O.toISOString().split("T")[0],!0);const I=O.getTime()-K.getTime();l(M,Math.ceil(I/(1e3*60*60*24)),!0),l(T,ee.getDate()===K.getDate()&&ee.getMonth()===K.getMonth(),!0),l(E,ce(ee),!0),l(R,fe(ee.getFullYear()),!0),l(V,["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][ee.getDay()],!0),l(C,Be(ee.getFullYear()),!0)}function ce(ee){const K=ee.getMonth()+1,O=ee.getDate();return K===3&&O>=21||K===4&&O<=19?"Aries":K===4&&O>=20||K===5&&O<=20?"Taurus":K===5&&O>=21||K===6&&O<=20?"Gemini":K===6&&O>=21||K===7&&O<=22?"Cancer":K===7&&O>=23||K===8&&O<=22?"Leo":K===8&&O>=23||K===9&&O<=22?"Virgo":K===9&&O>=23||K===10&&O<=22?"Libra":K===10&&O>=23||K===11&&O<=21?"Scorpio":K===11&&O>=22||K===12&&O<=21?"Sagittarius":K===12&&O>=22||K===1&&O<=19?"Capricorn":K===1&&O>=20||K===2&&O<=18?"Aquarius":K===2&&O>=19||K===3&&O<=20?"Pisces":""}function fe(ee){return["Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat","Monkey","Rooster","Dog","Pig"][(ee-4)%12]}function Be(ee){return ee%4===0&&ee%100!==0||ee%400===0}function Ve(){if(t(T)&&t($)){const ee=new Date,K=new Date(t($));K.setFullYear(ee.getFullYear()+1);const O=K.getTime()-ee.getTime();t(z).days=Math.floor(O/(1e3*60*60*24)),t(z).hours=Math.floor(O%(1e3*60*60*24)/(1e3*60*60)),t(z).minutes=Math.floor(O%(1e3*60*60)/(1e3*60)),t(z).seconds=Math.floor(O%(1e3*60)/1e3)}}function Ye(){l(d,0),l(v,0),l(g,0),l(u,0),l(f,0),l(k,0),l(h,0),l(m,0),l(_,0),l($,""),l(M,0),l(E,""),l(R,""),l(V,""),l(b,0),l(T,!1),l(C,!1),l(z,{days:0,hours:0,minutes:0,seconds:0},!0)}function Qe(ee){navigator.clipboard.writeText(ee).then(()=>{})}function We(){if(t(d)===0&&t(v)===0&&t(g)===0)return"0 days";const ee=[];return t(d)>0&&ee.push(`${t(d)} year${t(d)!==1?"s":""}`),t(v)>0&&ee.push(`${t(v)} month${t(v)!==1?"s":""}`),t(g)>0&&ee.push(`${t(g)} day${t(g)!==1?"s":""}`),ee.join(", ")}function ze(){return te.find(ee=>ee.name===t(E))}function je(){return t(T)?"🎉 Happy Birthday! 🎂":t(M)===1?"Tomorrow is your birthday! 🎈":t(M)<=7?`${t(M)} days until your birthday! 🎁`:`${t(M)} days until your birthday`}var Le=oy();Ir(ee=>{var K=W2();Mr.title="Age Calculator - Developer Tools",x(ee,K)});var Ce=r(Le),re=r(Ce),Te=r(re);Te.__click=[J2];var me=r(Te);jt(me,{class:"w-5 h-5"});var oe=s(re,2),j=r(oe),be=r(j);Ma(be,{class:"w-10 h-10 text-white"});var ve=s(Ce,4),U=r(ve),X=r(U),he=s(r(X),2),pe=r(he);pe.__click=[q2,i,n];var ke=s(pe,2);ke.__click=[G2,i,n,c,Ye];var Ue=r(ke);Yo(Ue,{class:"w-4 h-4 mr-2"});var Oe=s(X,2),Ne=r(Oe),Pe=s(Ne,2),se=s(Oe,2),_e=r(se),q=s(r(_e),2),Q=r(q),G=r(Q);G.value=G.__value="exact";var P=s(Q,2),L=r(P);L.value=L.__value="difference";var N=s(ve,2);{var ae=ee=>{var K=ay(),O=r(K),I=r(O),S=r(I),D=r(S);ka(D,{class:"w-6 h-6 mr-2"});var F=s(S,2),Z=r(F),A=r(Z),ne=r(A),Me=s(A,4);{var Ge=zt=>{var Vt=V2(),ir=r(Vt),hr=s(ir);{var Lr=wr=>{var Br=Po(",");x(wr,Br)};H(hr,wr=>{t(v)>0&&t(g)>0&&wr(Lr)})}var Gr=s(hr);Y(()=>{y(ir,`${t(v)>0?`${t(v)} month${t(v)!==1?"s":""}`:""} `),y(Gr,` ${t(g)>0?`${t(g)} day${t(g)!==1?"s":""}`:""}`)}),x(zt,Vt)};H(Me,zt=>{(t(v)>0||t(g)>0)&&zt(Ge)})}var $e=s(F,2),W=r($e),le=r(W),we=r(le),Fe=s(W,2),J=r(Fe),ie=r(J),ye=s(Fe,2),Ae=r(ye),Je=r(Ae),Xe=s(ye,2),Ke=r(Xe),tt=r(Ke),dt=s($e,2),qe=r(dt),lt=r(qe),ct=r(lt),at=s(qe,2),ft=r(at),bt=r(ft),rt=s(I,2),gt=r(rt),$t=r(gt);ml($t,{class:"w-6 h-6 mr-2"});var Mt=s(gt,2),He=r(Mt);{var ot=zt=>{var Vt=Y2(),ir=ge(Vt),hr=s(r(ir),4),Lr=r(hr),Gr=s(ir,2),wr=s(r(Gr),2),Br=r(wr),ia=r(Br),ya=r(ia),Cr=s(Br,2),sa=r(Cr),ti=r(sa),po=s(Cr,2),Fl=r(po),Hl=r(Fl),Ol=s(po,2),zl=r(Ol),Ul=r(zl);Y(()=>{y(Lr,`You are now ${t(d)??""} years old!`),y(ya,t(z).days),y(ti,t(z).hours),y(Hl,t(z).minutes),y(Ul,t(z).seconds)}),x(zt,Vt)},pt=zt=>{var Vt=Q2(),ir=r(Vt),hr=r(ir),Lr=s(ir,2),Gr=r(Lr),wr=s(Lr,2),Br=r(wr),ia=s(wr,2);{var ya=Cr=>{var sa=K2(),ti=r(sa);Y(po=>y(ti,`Next birthday: ${po??""}`),[()=>new Date(t($)+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})]),x(Cr,sa)};H(ia,Cr=>{t($)&&Cr(ya)})}Y(Cr=>{y(hr,Cr),y(Gr,t(M)),y(Br,`${t(M)===1?"day":"days"} remaining`)},[je]),x(zt,Vt)};H(He,zt=>{t(T)?zt(ot):zt(pt,!1)})}var _t=s(O,2),Nt=r(_t),It=r(Nt),Bt=r(It);Ma(Bt,{class:"w-5 h-5 mr-2"});var Dt=s(It,2),kt=r(Dt),Tt=s(r(kt),2),Ut=r(Tt),At=s(kt,2);{var Wt=zt=>{var Vt=Z2();x(zt,Vt)};H(At,zt=>{t(C)&&zt(Wt)})}var Xt=s(At,2),xr=s(r(Xt),2),dr=r(xr),Pt=s(Nt,2),er=r(Pt),Er=r(er);ds(Er,{class:"w-5 h-5 mr-2"});var fr=s(er,2);{var br=zt=>{const Vt=xt(ze);var ir=X2(),hr=r(ir),Lr=r(hr),Gr=r(Lr),wr=s(Lr,2),Br=r(wr),ia=s(hr,2),ya=r(ia),Cr=s(ia,2),sa=r(Cr);Y(()=>{y(Gr,t(Vt)?.symbol),y(Br,t(E)),y(ya,t(Vt)?.dates),y(sa,`Element: ${t(Vt)?.element??""}`)}),x(zt,ir)};H(fr,zt=>{t(E)&&zt(br)})}var ar=s(fr,2);{var or=zt=>{var Vt=ey(),ir=s(r(Vt),2),hr=r(ir);Y(()=>y(hr,`Year of the ${t(R)??""}`)),x(zt,Vt)};H(ar,zt=>{t(R)&&zt(or)})}var pr=s(Pt,2),Pr=r(pr),kr=r(Pr);hl(kr,{class:"w-5 h-5 mr-2"});var qr=s(Pr,2),ra=r(qr),Ot=r(ra),Rr=r(Ot),aa=s(ra,2),Ba=s(r(aa)),oa=r(Ba),Da=s(aa,2),mr=s(r(Da)),Qo=r(mr),Fa=s(Da,2),Zo=s(r(Fa)),qt=r(Zo),eo=s(Fa,2),Xo=s(r(eo)),Nl=r(Xo),Il=s(pr,2),Rl=s(r(Il),2),ei=r(Rl);ei.__click=[ty,Qe,We];var Bl=r(ei);ht(Bl,{class:"w-4 h-4 mr-2"});var Dl=s(ei,2);Dl.__click=[ry,Qe,d,v,g],Y((zt,Vt,ir,hr,Lr,Gr,wr,Br,ia,ya,Cr,sa)=>{y(ne,t(d)),y(we,zt),y(ie,Vt),y(Je,ir),y(tt,hr),y(ct,Lr),y(bt,Gr),y(Ut,t(V)),y(dr,wr),y(Rr,Br),y(oa,ia),y(Qo,ya),y(qt,Cr),y(Nl,sa)},[()=>t(u).toLocaleString(),()=>t(f).toLocaleString(),()=>t(k).toLocaleString(),()=>t(h).toLocaleString(),()=>t(m).toLocaleString(),()=>t(_).toLocaleString(),()=>t(b).toLocaleString(),()=>t(f).toLocaleString(),()=>new Date(t(i)).getFullYear()+t(d)-new Date(t(i)).getFullYear(),()=>(t(u)*8).toLocaleString(),()=>(t(u)*50).toLocaleString(),()=>(t(m)*80).toLocaleString()]),x(ee,K)};H(N,ee=>{(t(d)>0||t(v)>0||t(g)>0)&&ee(ae)})}Y(()=>De(Ne,"max",t(n))),Se(Ne,()=>t(i),ee=>l(i,ee)),Se(Pe,()=>t(n),ee=>l(n,ee)),jo(a,[],G,()=>t(c),ee=>l(c,ee)),jo(a,[],L,()=>t(c),ee=>l(c,ee)),x(o,Le),Re()}yt(["click"]);function sy(o,e){const a=Math.max(...t(e).map(i=>i.id))+1;l(e,[...t(e),{id:a,text:"",weight:1}],!0)}async function ny(o,e,a,i,n,c,d){const v=t(e).filter(h=>h.text.trim()!=="");if(v.length===0){l(a,{text:"Please add some items first!",type:"error"},!0);return}l(i,!0),l(a,null);const g=20,u=t(n)/g;for(let h=0;h<g;h++){const m=v[Math.floor(Math.random()*v.length)];l(a,{text:m.text,type:"animating"},!0),await new Promise(_=>setTimeout(_,u))}const f=c();if(f.length===0){l(a,{text:"Please add some items first!",type:"error"},!0),l(i,!1);return}l(a,{text:f.length===1?f[0].text:`${f.length} items selected`,type:"success",items:f},!0);const k={id:Date.now(),items:f.map(h=>h.text),timestamp:new Date,totalItems:v.length};l(d,[k,...t(d).slice(0,9)],!0),l(i,!1)}function ly(o,e,a,i,n){l(e,[{id:1,text:"",weight:1}],!0),l(a,null),l(i,[],!0),n()}function dy(o,e){if(t(e)&&t(e).items){const a=t(e).items.map(i=>i.text).join(", ");navigator.clipboard.writeText(a)}else t(e)&&navigator.clipboard.writeText(t(e).text)}var cy=w('<meta name="description" content="Random item picker with weighted selections, multiple picks, and history tracking"/>'),vy=()=>vt("/tools"),gy=(o,e,a)=>e(t(a)),uy=w('<button class="p-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"><!> <div class="text-sm font-medium text-gray-900 dark:text-white"> </div> <div class="text-xs text-gray-500 dark:text-gray-400"> </div></button>'),xy=w('<div class="flex items-center gap-1"><label class="text-sm text-gray-600 dark:text-gray-400">Weight:</label> <input type="number" min="0.1" step="0.1" class="w-20 px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"/></div>'),fy=(o,e,a)=>e(t(a).id),by=w('<div class="flex gap-3"><input type="text" placeholder="Enter item name" class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/> <!> <button class="p-2 text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"><!></button></div>'),py=w('<span class="text-sm text-gray-600 dark:text-gray-400"> </span>'),my=w('<div class="flex items-center"><div class="animate-spin"><!></div> Picking...</div>'),hy=w("<!> ",1),yy=w('<div class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"><p class="text-red-700 dark:text-red-300 text-center"> </p></div>'),_y=w('<div class="text-center py-8"><div class="inline-block animate-bounce"><!></div> <p class="mt-4 text-gray-600 dark:text-gray-400 animate-pulse"> </p></div>'),ky=w('<div class="px-3 py-1 bg-white dark:bg-gray-800 rounded-full border border-green-200 dark:border-green-700"> </div>'),wy=w('<div class="mt-4 space-y-2"></div>'),Cy=w('<div class="text-center py-8"><div class="inline-block p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border-2 border-green-200 dark:border-green-800"><!> <h3 class="text-2xl font-bold text-green-700 dark:text-green-300 mb-2"> </h3> <!></div></div>'),$y=w('<div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><div class="flex items-center justify-between mb-4"><h2 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center"><!> Result</h2> <div class="flex gap-2"><button class="btn btn-primary btn-sm"><!> Copy</button> <button class="btn btn-primary btn-sm"><!></button></div></div> <!></div>'),Sy=w('<p class="text-gray-500 dark:text-gray-400 text-sm">No picks yet</p>'),Ty=(o,e,a)=>e(t(a)),My=w('<button class="w-full text-left p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"><div class="text-sm font-medium text-gray-900 dark:text-white"> <!></div> <div class="text-xs text-gray-500 dark:text-gray-400"> </div></button>'),Ey=w('<div class="space-y-3 max-h-96 overflow-y-auto"></div>'),Py=w('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Random Picker</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Make random selections with weighted options and multiple picks</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Random Picker</li></ol></nav> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-6"><div class="p-6"><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Presets</h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3"></div></div></div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-2 space-y-6"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><div class="flex items-center justify-between mb-4"><h2 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center"><!> Items to Pick From</h2> <div class="flex gap-2"><button class="btn btn-primary btn-sm"><!> Add Item</button> <button class="btn btn-primary btn-sm">Clear All</button></div></div> <div class="space-y-3"></div> <div class="mt-4 flex items-center justify-between"><label class="flex items-center"><input type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"/> <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Enable Weights</span></label> <!></div></div> <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Picker Settings</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"><div><label for="number-of-picks" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Number of Picks</label> <input id="number-of-picks" type="number" min="1" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/></div> <div><label for="animation-speed" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Animation Speed (ms)</label> <input id="animation-speed" type="range" min="500" max="5000" step="500" class="w-full"/> <div class="text-xs text-gray-500 dark:text-gray-400"> </div></div></div> <div class="flex items-center mb-6"><input id="allow-duplicates" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"/> <label for="allow-duplicates" class="ml-2 text-sm text-gray-700 dark:text-gray-300">Allow Duplicates (when picking multiple items)</label></div> <button class="btn btn-primary w-full"><!></button></div> <!></div> <div class="space-y-6"><div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">History</h3> <!></div> <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800 p-6"><h3 class="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4 flex items-center"><!> Pro Tips</h3> <div class="space-y-3 text-sm text-blue-700 dark:text-blue-300"><div class="flex items-start"><div class="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-3"></div> <p>Use weights to give some items higher chances of being selected</p></div> <div class="flex items-start"><div class="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-3"></div> <p>Enable multiple picks for selecting more than one item at once</p></div> <div class="flex items-start"><div class="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-3"></div> <p>History helps you track previous random selections</p></div> <div class="flex items-start"><div class="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-3"></div> <p>Use presets for quick decision-making scenarios</p></div></div></div></div></div></div>');function Ly(o,e){Ie(e,!0);let a=p(Lt([{id:1,text:"",weight:1},{id:2,text:"",weight:1},{id:3,text:"",weight:1}])),i=p(null),n=p(Lt([])),c=p(!1),d=p(1),v=p(!1),g=p(!1),u=p(2e3);const f=[{name:"Decision Maker",icon:Ls,items:[{text:"Yes",weight:1},{text:"No",weight:1},{text:"Maybe",weight:1}]},{name:"Restaurant Picker",icon:ic,items:[{text:"Pizza",weight:1},{text:"Burger",weight:1},{text:"Sushi",weight:1},{text:"Pasta",weight:1},{text:"Thai",weight:1}]},{name:"Team Selector",icon:cs,items:[{text:"Team A",weight:1},{text:"Team B",weight:1},{text:"Team C",weight:1},{text:"Team D",weight:1}]},{name:"Activity Ideas",icon:Kt,items:[{text:"Go for a walk",weight:1},{text:"Read a book",weight:1},{text:"Watch a movie",weight:1},{text:"Call a friend",weight:1},{text:"Try a new recipe",weight:1}]}];function k(I){t(a).length>1&&l(a,t(a).filter(S=>S.id!==I),!0)}function h(I){l(a,I.items.map((S,D)=>({id:D+1,text:S.text,weight:S.weight})),!0),_()}function m(){const I=t(a).filter(Z=>Z.text.trim()!=="");if(I.length===0)return[];const S=I.reduce((Z,A)=>Z+A.weight,0),D=[],F=[...I];for(let Z=0;Z<Math.min(t(d),F.length);Z++){let A=Math.random()*S,ne=0;for(let Ge=0;Ge<F.length;Ge++)if(A-=F[Ge].weight,A<=0){ne=Ge;break}const Me=F[ne];D.push(Me),t(v)||F.splice(ne,1)}return D}function _(){l(i,null),l(c,!1)}function $(I){l(a,I.items.map((S,D)=>({id:D+1,text:S,weight:1})),!0),_()}const M=xt(()=>t(a).reduce((I,S)=>I+(parseFloat(String(S.weight))||1),0));var E=Py();Ir(I=>{var S=cy();Mr.title="Random Picker - Developer Tools",x(I,S)});var R=r(E),V=r(R),b=r(V);b.__click=[vy];var T=r(b);jt(T,{class:"w-5 h-5"});var C=s(V,2),B=r(C),z=r(B);Co(z,{class:"w-10 h-10 text-white"});var te=s(R,4),ue=r(te),de=s(r(ue),2);mt(de,21,()=>f,I=>I.name,(I,S)=>{var D=uy();D.__click=[gy,h,S];var F=r(D);nr(F,()=>t(S).icon,(Ge,$e)=>{$e(Ge,{class:"w-5 h-5 text-gray-600 dark:text-gray-400 mb-2"})});var Z=s(F,2),A=r(Z),ne=s(Z,2),Me=r(ne);Y(()=>{y(A,t(S).name),y(Me,`${t(S).items.length??""} items`)}),x(I,D)});var xe=s(te,2),ce=r(xe),fe=r(ce),Be=r(fe),Ve=r(Be),Ye=r(Ve);G0(Ye,{class:"w-5 h-5 mr-2"});var Qe=s(Ve,2),We=r(Qe);We.__click=[sy,a];var ze=r(We);Bo(ze,{class:"w-4 h-4 mr-1"});var je=s(We,2);je.__click=[ly,a,i,n,_];var Le=s(Be,2);mt(Le,21,()=>t(a),I=>I.id,(I,S,D)=>{var F=by(),Z=r(F),A=s(Z,2);{var ne=$e=>{var W=xy(),le=r(W),we=s(le,2);Y(()=>{De(le,"for",`weight-${t(S).id??""}`),De(we,"id",`weight-${t(S).id??""}`)}),Se(we,()=>t(S).weight,Fe=>t(S).weight=Fe),x($e,W)};H(A,$e=>{t(g)&&$e(ne)})}var Me=s(A,2);Me.__click=[fy,k,S];var Ge=r(Me);go(Ge,{class:"w-4 h-4"}),Y(()=>Me.disabled=t(a).length===1),Se(Z,()=>t(S).text,$e=>t(S).text=$e),x(I,F)});var Ce=s(Le,2),re=r(Ce),Te=r(re),me=s(re,2);{var oe=I=>{var S=py(),D=r(S);Y(F=>y(D,`Total Weight: ${F??""}`),[()=>t(M).toFixed(1)]),x(I,S)};H(me,I=>{t(g)&&I(oe)})}var j=s(fe,2),be=s(r(j),2),ve=r(be),U=s(r(ve),2),X=s(ve,2),he=s(r(X),2),pe=s(he,2),ke=r(pe),Ue=s(be,2),Oe=r(Ue),Ne=s(Ue,2);Ne.__click=[ny,a,i,c,u,m,n];var Pe=r(Ne);{var se=I=>{var S=my(),D=r(S),F=r(D);Co(F,{class:"w-5 h-5 mr-2"}),x(I,S)},_e=I=>{var S=hy(),D=ge(S);Co(D,{class:"w-5 h-5 mr-2"});var F=s(D);Y(()=>y(F,` Pick Random Item${t(d)>1?"s":""}`)),x(I,S)};H(Pe,I=>{t(c)?I(se):I(_e,!1)})}var q=s(j,2);{var Q=I=>{var S=$y(),D=r(S),F=r(D),Z=r(F);ml(Z,{class:"w-5 h-5 mr-2"});var A=s(F,2),ne=r(A);ne.__click=[dy,i];var Me=r(ne);ht(Me,{class:"w-4 h-4 mr-1"});var Ge=s(ne,2);Ge.__click=_;var $e=r(Ge);Yo($e,{class:"w-4 h-4"});var W=s(D,2);{var le=Fe=>{var J=yy(),ie=r(J),ye=r(ie);Y(()=>y(ye,t(i).text)),x(Fe,J)},we=Fe=>{var J=Ee(),ie=ge(J);{var ye=Je=>{var Xe=_y(),Ke=r(Xe),tt=r(Ke);Ls(tt,{class:"w-16 h-16 text-blue-600 dark:text-blue-400"});var dt=s(Ke,2),qe=r(dt);Y(()=>y(qe,t(i).text)),x(Je,Xe)},Ae=Je=>{var Xe=Cy(),Ke=r(Xe),tt=r(Ke);ds(tt,{class:"w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-3"});var dt=s(tt,2),qe=r(dt),lt=s(dt,2);{var ct=at=>{var ft=wy();mt(ft,21,()=>t(i).items,bt=>bt.text,(bt,rt)=>{var gt=ky(),$t=r(gt);Y(()=>y($t,t(rt).text)),x(bt,gt)}),x(at,ft)};H(lt,at=>{t(i).items&&t(i).items.length>1&&at(ct)})}Y(()=>y(qe,t(i).text)),x(Je,Xe)};H(ie,Je=>{t(i).type==="animating"?Je(ye):Je(Ae,!1)},!0)}x(Fe,J)};H(W,Fe=>{t(i).type==="error"?Fe(le):Fe(we,!1)})}x(I,S)};H(q,I=>{t(i)&&I(Q)})}var G=s(ce,2),P=r(G),L=s(r(P),2);{var N=I=>{var S=Sy();x(I,S)},ae=I=>{var S=Ey();mt(S,21,()=>t(n),D=>D.id,(D,F)=>{var Z=My();Z.__click=[Ty,$,F];var A=r(Z),ne=r(A),Me=s(ne);{var Ge=le=>{var we=Po();Y(()=>y(we,`+${t(F).items.length-2} more`)),x(le,we)};H(Me,le=>{t(F).items.length>2&&le(Ge)})}var $e=s(A,2),W=r($e);Y((le,we)=>{y(ne,`${le??""} `),y(W,`${we??""} • ${t(F).totalItems??""} total items`)},[()=>t(F).items.slice(0,2).join(", "),()=>t(F).timestamp.toLocaleTimeString()]),x(D,Z)}),x(I,S)};H(L,I=>{t(n).length===0?I(N):I(ae,!1)})}var ee=s(P,2),K=r(ee),O=r(K);Kt(O,{class:"w-5 h-5 mr-2"}),Y((I,S)=>{De(U,"max",I),y(ke,`${t(u)??""}ms`),Ne.disabled=S},[()=>t(a).filter(I=>I.text.trim()!=="").length,()=>t(c)||t(a).filter(I=>I.text.trim()!=="").length===0]),Gt(Te,()=>t(g),I=>l(g,I)),Se(U,()=>t(d),I=>l(d,I)),Se(he,()=>t(u),I=>l(u,I)),Gt(Oe,()=>t(v),I=>l(v,I)),x(o,E),Re()}yt(["click"]);function oo(o,e,a,i,n,c,d,v){l(e,`${t(a)} ${t(i)} ${t(n)} ${t(c)} ${t(d)}`),v()}async function Ay(o,e,a){try{await navigator.clipboard.writeText(t(e)),l(a,!0),setTimeout(()=>l(a,!1),2e3)}catch(i){console.error("Failed to copy:",i)}}function jy(o,e,a){const i=Math.floor(Math.random()*60).toString(),n=Math.floor(Math.random()*24).toString(),c=Math.floor(Math.random()*28)+1;l(e,`${i} ${n} ${c} * *`),a()}var Ny=w('<meta name="description" content="Generate and test cron expressions with visual builder and next run times"/>'),Iy=()=>vt("/tools"),Ry=w('<button class="p-2 rounded-lg bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs font-semibold transition-colors" disabled>Copied!</button>'),By=w('<button class="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20 hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors relative group" title="Copy to clipboard"><!></button>'),Dy=w('<div class="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm"><!> Invalid cron expression format</div>'),Fy=w('<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><!> Description</h3> <p class="text-gray-700 dark:text-gray-300"> </p></div>'),Hy=w('<div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"><!> </div>'),Oy=w('<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><!> Next Run Times</h3> <div class="space-y-2"></div></div>'),zy=(o,e,a)=>e(t(a).expression),Uy=w('<button class="text-left p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"><div class="font-medium text-gray-900 dark:text-white text-sm"> </div> <div class="text-xs text-gray-500 dark:text-gray-400 font-mono mt-1"> </div></button>'),qy=w(`<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Cron Expression Generator</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Create and validate cron expressions with visual builder and next run times</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Cron Generator</li></ol></nav> <div class="grid lg:grid-cols-2 gap-6"><div class="space-y-6"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><div class="flex items-center justify-between mb-4"><h2 class="text-xl font-semibold text-gray-900 dark:text-white">Cron Expression</h2> <div class="flex items-center gap-2"><button class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" title="Generate Random"><!></button> <!></div></div> <div class="space-y-4"><input type="text" placeholder="* * * * *"/> <div class="text-sm text-gray-600 dark:text-gray-400"><span class="font-medium">Format:</span> [Minute] [Hour] [Day of Month] [Month] [Day of Week]</div> <!></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Manual Builder</h3> <div class="space-y-4"><div><label for="minute" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Minute (0-59)</label> <input id="minute" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="0"/></div> <div><label for="hour" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hour (0-23)</label> <input id="hour" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="0"/></div> <div><label for="day-of-month" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Day of Month (1-31)</label> <input id="day-of-month" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="*"/></div> <div><label for="month" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Month (1-12)</label> <input id="month" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="*"/></div> <div><label for="day-of-week" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Day of Week (0-6, 0=Sunday)</label> <input id="day-of-week" type="text" class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="*"/></div></div></div></div> <div class="space-y-6"><!> <!> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Common Presets</h3> <div class="grid grid-cols-1 sm:grid-cols-2 gap-3"></div></div> <div class="bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-6"><h3 class="text-lg font-semibold text-blue-900 dark:text-blue-400 mb-4 flex items-center gap-2"><!> Cron Syntax Help</h3> <div class="space-y-3 text-sm text-blue-800 dark:text-blue-300"><div><strong class="font-semibold">* (asterisk)</strong> - any value</div> <div><strong class="font-semibold">, (comma)</strong> - value list separator</div> <div><strong class="font-semibold">- (hyphen)</strong> - range of values</div> <div><strong class="font-semibold">/ (forward slash)</strong> - step values</div> <div><strong class="font-semibold">Examples:</strong> <ul class="mt-2 space-y-1 ml-4"><li>• <code class="bg-blue-100 dark:bg-blue-900/30 px-1 rounded">*/15 * * * *</code> - Every
                15 minutes</li> <li>• <code class="bg-blue-100 dark:bg-blue-900/30 px-1 rounded">0 9 * * 1-5</code> - Weekdays
                at 9 AM</li> <li>• <code class="bg-blue-100 dark:bg-blue-900/30 px-1 rounded">0 0 1 * *</code> - First
                day of every month</li></ul></div></div></div></div></div></div>`);function Gy(o,e){Ie(e,!0);let a=p("0 0 * * *"),i=p(Lt([])),n=p(!0),c=p(!1),d=p("0"),v=p("0"),g=p("*"),u=p("*"),f=p("*");const k=[{name:"Every minute",expression:"* * * * *"},{name:"Every hour",expression:"0 * * * *"},{name:"Every day at midnight",expression:"0 0 * * *"},{name:"Every day at noon",expression:"0 12 * * *"},{name:"Every week on Monday",expression:"0 0 * * 1"},{name:"Every month on 1st",expression:"0 0 1 * *"},{name:"Every weekday at 9 AM",expression:"0 9 * * 1-5"},{name:"Every weekend at midnight",expression:"0 0 * * 0,6"},{name:"Every 15 minutes",expression:"*/15 * * * *"},{name:"Every 4 hours",expression:"0 */4 * * *"}];function h(N){try{const ae=N.split(" ");if(ae.length!==5)return"Invalid cron expression";const[ee,K,O,I,S]=ae;let D="Run";if(ee==="*")D+=" every minute";else if(ee.includes("/")){const F=ee.split("/")[1];D+=` every ${F} minutes`}else if(ee.includes(",")){const F=ee.split(",").join(", ");D+=` at minute(s) ${F}`}else if(ee.includes("-")){const[F,Z]=ee.split("-");D+=` from minute ${F} to ${Z}`}else D+=` at minute ${ee}`;if(K!=="*")if(K.includes("/")){const F=K.split("/")[1];D+=` every ${F} hours`}else if(K.includes(",")){const F=K.split(",").join(", ");D+=` at hour(s) ${F}`}else if(K.includes("-")){const[F,Z]=K.split("-");D+=` from hour ${F} to ${Z}`}else D+=` at ${K.padStart(2,"0")}:00`;if(O!=="*")if(O.includes("/")){const F=O.split("/")[1];D+=` every ${F} days`}else D+=` on day ${O}`;if(I!=="*")if(I.includes(",")){const F=I.split(",").map(Z=>m(parseInt(Z))).join(", ");D+=` in ${F}`}else D+=` in ${m(parseInt(I))}`;if(S!=="*")if(S.includes(",")){const F=S.split(",").map(Z=>_(parseInt(Z))).join(", ");D+=` on ${F}`}else D+=` on ${_(parseInt(S))}`;return D}catch{return"Invalid cron expression"}}function m(N){return["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][N-1]||N.toString()}function _(N){return["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][N]||N.toString()}function $(N,ae=10){try{if(N.split(" ").length!==5)return[];const K=new Date,O=[];for(let I=0;I<ae;I++){const S=new Date(K);S.setMinutes(S.getMinutes()+(I+1)*5),O.push(S.toLocaleString())}return O}catch{return[]}}function M(){const N=t(a).split(" ");N.length===5&&(ae=>{var ee=Qa(ae,5);l(d,ee[0],!0),l(v,ee[1],!0),l(g,ee[2],!0),l(u,ee[3],!0),l(f,ee[4],!0)})(N),E()}function E(){const N=t(a).split(" ");l(n,N.length===5&&N.every(ae=>ae.trim()!==""),!0),t(n)?l(i,$(t(a)),!0):l(i,[],!0)}function R(N){l(a,N,!0),M()}M();var V=qy();Ir(N=>{var ae=Ny();Mr.title="Cron Expression Generator - Developer Tools",x(N,ae)});var b=r(V),T=r(b),C=r(T);C.__click=[Iy];var B=r(C);jt(B,{class:"w-5 h-5"});var z=s(T,2),te=r(z),ue=r(te);Cl(ue,{class:"w-10 h-10 text-white"});var de=s(b,4),xe=r(de),ce=r(xe),fe=r(ce),Be=s(r(fe),2),Ve=r(Be);Ve.__click=[jy,a,M];var Ye=r(Ve);ta(Ye,{class:"w-4 h-4"});var Qe=s(Ve,2);{var We=N=>{var ae=Ry();x(N,ae)},ze=N=>{var ae=By();ae.__click=[Ay,a,c];var ee=r(ae);ht(ee,{class:"w-4 h-4 text-blue-600 dark:text-blue-400"}),x(N,ae)};H(Qe,N=>{t(c)?N(We):N(ze,!1)})}var je=s(fe,2),Le=r(je);Le.__input=M;var Ce=s(Le,4);{var re=N=>{var ae=Dy(),ee=r(ae);ba(ee,{class:"w-4 h-4"}),x(N,ae)};H(Ce,N=>{t(n)||N(re)})}var Te=s(ce,2),me=s(r(Te),2),oe=r(me),j=s(r(oe),2);j.__input=[oo,a,d,v,g,u,f,E];var be=s(oe,2),ve=s(r(be),2);ve.__input=[oo,a,d,v,g,u,f,E];var U=s(be,2),X=s(r(U),2);X.__input=[oo,a,d,v,g,u,f,E];var he=s(U,2),pe=s(r(he),2);pe.__input=[oo,a,d,v,g,u,f,E];var ke=s(he,2),Ue=s(r(ke),2);Ue.__input=[oo,a,d,v,g,u,f,E];var Oe=s(xe,2),Ne=r(Oe);{var Pe=N=>{var ae=Fy(),ee=r(ae),K=r(ee);ba(K,{class:"w-5 h-5"});var O=s(ee,2),I=r(O);Y(S=>y(I,S),[()=>h(t(a))]),x(N,ae)};H(Ne,N=>{t(n)&&N(Pe)})}var se=s(Ne,2);{var _e=N=>{var ae=Oy(),ee=r(ae),K=r(ee);Ma(K,{class:"w-5 h-5"});var O=s(ee,2);mt(O,20,()=>t(i).slice(0,5),I=>I,(I,S)=>{var D=Hy(),F=r(D);ka(F,{class:"w-4 h-4"});var Z=s(F);Y(()=>y(Z,` ${S??""}`)),x(I,D)}),x(N,ae)};H(se,N=>{t(n)&&t(i).length>0&&N(_e)})}var q=s(se,2),Q=s(r(q),2);mt(Q,21,()=>k,N=>N.name,(N,ae)=>{var ee=Uy();ee.__click=[zy,R,ae];var K=r(ee),O=r(K),I=s(K,2),S=r(I);Y(()=>{y(O,t(ae).name),y(S,t(ae).expression)}),x(N,ee)});var G=s(q,2),P=r(G),L=r(P);ba(L,{class:"w-5 h-5"}),Y(()=>ut(Le,1,`w-full px-4 py-3 rounded-lg border ${t(n)?"border-gray-300 dark:border-gray-600":"border-red-300 dark:border-red-600"} bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-mono text-lg focus:outline-none focus:ring-2 focus:ring-blue-500`)),Se(Le,()=>t(a),N=>l(a,N)),Se(j,()=>t(d),N=>l(d,N)),Se(ve,()=>t(v),N=>l(v,N)),Se(X,()=>t(g),N=>l(g,N)),Se(pe,()=>t(u),N=>l(u,N)),Se(Ue,()=>t(f),N=>l(f,N)),x(o,V),Re()}yt(["click","input"]);function Wy(o,e,a,i){l(e,""),l(a,""),l(i,null)}function Jy(o,e,a,i){l(e,"a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e"),l(a,"a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e"),i()}function Vy(o,e,a,i){l(e,"a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e"),l(a,"b591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e"),i()}function Yy(){vt("/tools")}var Ky=(o,e,a)=>e(t(a),"hash1"),Qy=(o,e,a)=>e(t(a),"hash2"),Zy=w('<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Comparison Details</h3> <div class="space-y-4"><div class="flex items-center justify-between"><span class="text-gray-600 dark:text-gray-400">Match Status:</span> <span> </span></div> <div class="flex items-center justify-between"><span class="text-gray-600 dark:text-gray-400">Hash 1 Length:</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div> <div class="flex items-center justify-between"><span class="text-gray-600 dark:text-gray-400">Hash 2 Length:</span> <span class="font-medium text-gray-900 dark:text-white"> </span></div> <div class="flex items-center justify-between"><span class="text-gray-600 dark:text-gray-400">Length Match:</span> <span> </span></div></div></div>'),Xy=w('<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Hash Comparer</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Compare two hash values to verify data integrity and check for matches.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">Hash Comparer</li></ol></nav> <div class="mb-6 flex flex-wrap gap-4 items-center justify-center"><button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">Load Matching Hashes</button> <button class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">Load Different Hashes</button> <button class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">Clear All</button></div> <div class="mb-6"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 text-center"><div class="flex items-center justify-center gap-3"><div><!></div> <div><h3 class="text-lg font-semibold text-gray-900 dark:text-white"> </h3> <p class="text-sm text-gray-500 dark:text-gray-400"> </p></div></div></div></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><div class="flex justify-between items-center mb-4"><h3 class="text-lg font-semibold text-gray-900 dark:text-white">Hash 1</h3> <div class="flex items-center gap-2"><span class="text-sm text-gray-500 dark:text-gray-400"> </span> <button class="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"><!></button></div></div> <textarea placeholder="Enter first hash value..." class="w-full h-32 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><div class="flex justify-between items-center mb-4"><h3 class="text-lg font-semibold text-gray-900 dark:text-white">Hash 2</h3> <div class="flex items-center gap-2"><span class="text-sm text-gray-500 dark:text-gray-400"> </span> <button class="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"><!></button></div></div> <textarea placeholder="Enter second hash value..." class="w-full h-32 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea></div></div> <!> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Common Use Cases</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">File Integrity Check</h4> <p class="text-sm text-gray-600 dark:text-gray-400">Verify downloaded files by comparing hash values with original sources</p></div> <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">Password Verification</h4> <p class="text-sm text-gray-600 dark:text-gray-400">Compare stored password hashes with user-provided password hashes</p></div> <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">Data Deduplication</h4> <p class="text-sm text-gray-600 dark:text-gray-400">Identify duplicate files or data blocks by comparing their hash values</p></div> <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">Blockchain Verification</h4> <p class="text-sm text-gray-600 dark:text-gray-400">Validate blockchain transactions and smart contract hashes</p></div></div></div> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Real-time Comparison</h3> <p class="text-gray-600 dark:text-gray-400">Instantly compare hash values as you type with automatic result updates</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Easy Copy & Paste</h3> <p class="text-gray-600 dark:text-gray-400">Quickly copy hash values and paste them for seamless data verification</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Detailed Analysis</h3> <p class="text-gray-600 dark:text-gray-400">Get comprehensive comparison details including length and character analysis</p></div></div></div>');function e1(o,e){Ie(e,!0);let a=p(""),i=p(""),n=p(null),c=p("");function d(){if(!t(a).trim()&&!t(i).trim()){l(n,"empty");return}if(!t(a).trim()||!t(i).trim()){l(n,"different");return}const O=t(a).trim().toLowerCase().replace(/\s+/g,""),I=t(i).trim().toLowerCase().replace(/\s+/g,"");l(n,O===I?"match":"different",!0)}function v(O,I){navigator.clipboard.writeText(O),l(c,I,!0),setTimeout(()=>{l(c,"")},2e3)}Ct(()=>{t(a)&&t(i)?d():!t(a)&&!t(i)?l(n,null):l(n,"different")});const g=xt(()=>()=>{switch(t(n)){case"match":return xa;case"different":return ns;case"empty":return Jt;default:return $a}}),u=xt(()=>t(g)());function f(){switch(t(n)){case"match":return"text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400";case"different":return"text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400";case"empty":return"text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400";default:return"text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400"}}function k(){switch(t(n)){case"match":return"Hashes Match! ✓";case"different":return"Hashes Do Not Match ✗";case"empty":return"Enter hashes to compare";default:return"Ready to compare"}}var h=Xy(),m=r(h),_=r(m),$=r(_);$.__click=[Yy];var M=r($);jt(M,{class:"w-5 h-5"});var E=s(_,2),R=r(E),V=r(R);$a(V,{class:"w-10 h-10 text-white"});var b=s(m,4),T=r(b);T.__click=[Jy,a,i,d];var C=s(T,2);C.__click=[Vy,a,i,d];var B=s(C,2);B.__click=[Wy,a,i,n];var z=s(b,2),te=r(z),ue=r(te),de=r(ue),xe=r(de);nr(xe,()=>t(u),(O,I)=>{I(O,{class:"w-6 h-6"})});var ce=s(de,2),fe=r(ce),Be=r(fe),Ve=s(fe,2),Ye=r(Ve),Qe=s(z,2),We=r(Qe),ze=r(We),je=s(r(ze),2),Le=r(je),Ce=r(Le),re=s(Le,2);re.__click=[Ky,v,a];var Te=r(re);{var me=O=>{xa(O,{class:"w-4 h-4 text-green-600"})},oe=O=>{ht(O,{class:"w-4 h-4"})};H(Te,O=>{t(c)==="hash1"?O(me):O(oe,!1)})}var j=s(ze,2),be=s(We,2),ve=r(be),U=s(r(ve),2),X=r(U),he=r(X),pe=s(X,2);pe.__click=[Qy,v,i];var ke=r(pe);{var Ue=O=>{xa(O,{class:"w-4 h-4 text-green-600"})},Oe=O=>{ht(O,{class:"w-4 h-4"})};H(ke,O=>{t(c)==="hash2"?O(Ue):O(Oe,!1)})}var Ne=s(ve,2),Pe=s(Qe,2);{var se=O=>{var I=Zy(),S=s(r(I),2),D=r(S),F=s(r(D),2),Z=r(F),A=s(D,2),ne=s(r(A),2),Me=r(ne),Ge=s(A,2),$e=s(r(Ge),2),W=r($e),le=s(Ge,2),we=s(r(le),2),Fe=r(we);Y((J,ie,ye,Ae)=>{ut(F,1,`font-medium ${t(n)==="match"?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400"}`),y(Z,t(n)==="match"?"✓ Identical":"✗ Different"),y(Me,`${J??""} characters`),y(W,`${ie??""} characters`),ut(we,1,`font-medium ${ye??""}`),y(Fe,Ae)},[()=>t(a).trim().length,()=>t(i).trim().length,()=>t(a).trim().length===t(i).trim().length?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400",()=>t(a).trim().length===t(i).trim().length?"✓ Yes":"✗ No"]),x(O,I)};H(Pe,O=>{t(n)&&t(n)!=="empty"&&O(se)})}var _e=s(Pe,4),q=r(_e),Q=r(q),G=r(Q);$a(G,{class:"w-6 h-6 text-blue-600 dark:text-blue-400"});var P=s(q,2),L=r(P),N=r(L);ht(N,{class:"w-6 h-6 text-blue-600 dark:text-blue-400"});var ae=s(P,2),ee=r(ae),K=r(ee);Jt(K,{class:"w-6 h-6 text-blue-600 dark:text-blue-400"}),Y((O,I,S,D)=>{ut(de,1,`w-12 h-12 ${O??""} rounded-lg flex items-center justify-center`),y(Be,I),y(Ye,t(n)==="match"?"Both hash values are identical":t(n)==="different"?"Hash values are different":"Enter two hash values to compare"),y(Ce,`${t(a).length??""} characters`),re.disabled=S,y(he,`${t(i).length??""} characters`),pe.disabled=D},[f,k,()=>!t(a).trim(),()=>!t(i).trim()]),Se(j,()=>t(a),O=>l(a,O)),Se(Ne,()=>t(i),O=>l(i,O)),x(o,h),Re()}yt(["click"]);function t1(o,e,a){navigator.clipboard.writeText(t(e)),l(a,"ascii"),setTimeout(()=>{l(a,"")},2e3)}function r1(o,e,a){l(e,""),l(a,"")}function a1(o,e,a){l(e,"HELLO"),a()}function o1(){vt("/tools")}var i1=(o,e,a)=>l(e,a(),!0),s1=w('<button><div class="text-left"><h4 class="font-medium text-gray-900 dark:text-white mb-1"> </h4> <p class="text-xs text-gray-500 dark:text-gray-400"> </p></div></button>'),n1=w("<!> Copied!",1),l1=w("<!> Copy",1),d1=w('<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><div class="flex justify-between items-center mb-4"><h3 class="text-lg font-semibold text-gray-900 dark:text-white">ASCII Art Result</h3> <div class="flex gap-2"><button class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"><!></button> <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"><!> Download</button></div></div> <div class="relative"><pre class="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg font-mono text-sm text-gray-900 dark:text-white overflow-x-auto whitespace-pre"> </pre></div></div>'),c1=w(`<div class="max-w-6xl mx-auto p-6"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><button class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><!> Back to Tools</button></div> <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl mb-4"><!></div> <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">ASCII Art Generator</h1> <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Convert text into ASCII art with different styles. Perfect for terminal displays and
        creative text art.</p></div></div> <nav class="mb-8"><ol class="flex items-center justify-center space-x-2 text-sm"><li><a href="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Home</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li><a href="/tools" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Tools</a></li> <li class="text-gray-300 dark:text-gray-600">/</li> <li class="text-gray-900 dark:text-white font-medium">ASCII Art Generator</li></ol></nav> <div class="mb-6 flex flex-wrap gap-4 items-center justify-center"><button class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">Load Sample Text</button> <button class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">Clear All</button></div> <div class="mb-6"><div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Art Style</h3> <div class="grid grid-cols-1 md:grid-cols-3 gap-4"></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><div class="flex justify-between items-center mb-4"><h3 class="text-lg font-semibold text-gray-900 dark:text-white">Input Text</h3> <span class="text-sm text-gray-500 dark:text-gray-400"> </span></div> <input type="text" placeholder="Enter text to convert to ASCII art..." class="w-full p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"/> <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">Maximum 10 characters recommended for best results. Supports letters, numbers, and basic
      punctuation.</p></div> <!> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Supported Characters</h3> <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"><div class="text-sm"><span class="font-medium text-gray-900 dark:text-white">Letters:</span> <span class="text-gray-600 dark:text-gray-400">A-Z</span></div> <div class="text-sm"><span class="font-medium text-gray-900 dark:text-white">Numbers:</span> <span class="text-gray-600 dark:text-gray-400">0-9</span></div> <div class="text-sm"><span class="font-medium text-gray-900 dark:text-white">Punctuation:</span> <span class="text-gray-600 dark:text-gray-400">! ? . ,</span></div> <div class="text-sm"><span class="font-medium text-gray-900 dark:text-white">Space:</span> <span class="text-gray-600 dark:text-gray-400">Supported</span></div></div></div> <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Usage Tips</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">Best Practices</h4> <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1"><li>• Keep text short (under 10 characters)</li> <li>• Use uppercase letters for better results</li> <li>• Experiment with different styles</li> <li>• Works great in terminal applications</li></ul></div> <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><h4 class="font-medium text-gray-900 dark:text-white mb-2">Common Uses</h4> <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1"><li>• Terminal splash screens</li> <li>• Code comments and signatures</li> <li>• Social media bio text</li> <li>• Email signatures and greetings</li></ul></div></div></div> <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Multiple Styles</h3> <p class="text-gray-600 dark:text-gray-400">Choose from standard, block, and simple ASCII art styles for different use cases</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Real-time Preview</h3> <p class="text-gray-600 dark:text-gray-400">See your ASCII art generated instantly as you type with automatic updates</p></div> <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-4"><!></div> <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Easy Export</h3> <p class="text-gray-600 dark:text-gray-400">Copy to clipboard or download your ASCII art as a text file for easy sharing</p></div></div></div>`);function v1(o,e){Ie(e,!0);let a=p(""),i=p(""),n=p("standard"),c=p("");const d={standard:{name:"Standard",chars:{A:`  #  
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
|__/`}}};function v(){if(!t(a).trim()){l(i,"");return}const re=t(a).toUpperCase(),Te=d[t(n)],me=[];for(let oe=0;oe<5;oe++){let j="";for(let be=0;be<re.length;be++){const ve=re[be];if(Te.chars[ve]){const U=Te.chars[ve].split(`
`);U[oe]?j+=U[oe]+" ":j+=" ".repeat(6)+" "}else j+=" ".repeat(6)+" "}me.push(j.trimEnd())}l(i,me.join(`
`),!0)}function g(){const re=new Blob([t(i)],{type:"text/plain"}),Te=URL.createObjectURL(re),me=document.createElement("a");me.href=Te,me.download="ascii-art.txt",me.click(),URL.revokeObjectURL(Te)}Ct(()=>{v()});var u=c1(),f=r(u),k=r(f),h=r(k);h.__click=[o1];var m=r(h);jt(m,{class:"w-5 h-5"});var _=s(k,2),$=r(_),M=r($);yl(M,{class:"w-10 h-10 text-white"});var E=s(f,4),R=r(E);R.__click=[a1,a,v];var V=s(R,2);V.__click=[r1,a,i];var b=s(E,2),T=r(b),C=s(r(T),2);mt(C,21,()=>Object.entries(d),Nr,(re,Te)=>{var me=xt(()=>Qa(t(Te),2));let oe=()=>t(me)[0],j=()=>t(me)[1];var be=s1();be.__click=[i1,n,oe];var ve=r(be),U=r(ve),X=r(U),he=s(U,2),pe=r(he);Y(()=>{ut(be,1,`p-4 border-2 rounded-lg transition-all ${t(n)===oe()?"border-purple-500 bg-purple-50 dark:bg-purple-900/20":"border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"}`),y(X,j().name),y(pe,oe()==="standard"?"Classic ASCII style with standard characters":oe()==="block"?"Bold block style using full Unicode blocks":"Minimal style using basic ASCII characters")}),x(re,be)});var B=s(b,2),z=r(B),te=s(r(z),2),ue=r(te),de=s(z,2);De(de,"maxlength",10);var xe=s(B,2);{var ce=re=>{var Te=d1(),me=r(Te),oe=s(r(me),2),j=r(oe);j.__click=[t1,i,c];var be=r(j);{var ve=Oe=>{var Ne=n1(),Pe=ge(Ne);xa(Pe,{class:"w-4 h-4"}),x(Oe,Ne)},U=Oe=>{var Ne=l1(),Pe=ge(Ne);ht(Pe,{class:"w-4 h-4"}),x(Oe,Ne)};H(be,Oe=>{t(c)==="ascii"?Oe(ve):Oe(U,!1)})}var X=s(j,2);X.__click=g;var he=r(X);Xa(he,{class:"w-4 h-4"});var pe=s(me,2),ke=r(pe),Ue=r(ke);Y(()=>y(Ue,t(i))),x(re,Te)};H(xe,re=>{t(i)&&re(ce)})}var fe=s(xe,6),Be=r(fe),Ve=r(Be),Ye=r(Ve);Qr(Ye,{class:"w-6 h-6 text-purple-600 dark:text-purple-400"});var Qe=s(Be,2),We=r(Qe),ze=r(We);Kt(ze,{class:"w-6 h-6 text-purple-600 dark:text-purple-400"});var je=s(Qe,2),Le=r(je),Ce=r(Le);Ea(Ce,{class:"w-6 h-6 text-purple-600 dark:text-purple-400"}),Y(()=>y(ue,`${t(a).length??""} characters`)),Se(de,()=>t(a),re=>l(a,re)),x(o,u),Re()}yt(["click"]);const g1=[{path:"/tools",component:Dg,title:"Developer Tools - Fariz",description:"Free online developer tools and utilities. JSON parser, color converter, URL encoder, and more productivity tools for developers.",keywords:"developer tools, online tools, web tools, json parser, color converter, url encoder, productivity tools",robots:"index, follow"},{path:"/tools/json-parser",component:Jg,title:"JSON Parser - Fariz"},{path:"/tools/color-converter",component:du,title:"Color Converter - Fariz"},{path:"/tools/url-encoder",component:Ru,title:"URL Encoder/Decoder - Fariz"},{path:"/tools/markdown-preview",component:Uu,title:"Markdown Preview - Fariz"},{path:"/tools/base64-converter",component:vx,title:"Base64 Converter - Fariz"},{path:"/tools/password-generator",component:Sx,title:"Password Generator - Fariz"},{path:"/tools/qr-code-generator",component:nf,title:"QR Code Generator - Fariz"},{path:"/tools/text-case-converter",component:kf,title:"Text Case Converter - Fariz"},{path:"/tools/lorem-ipsum-generator",component:Tf,title:"Lorem Ipsum Generator - Fariz"},{path:"/tools/character-counter",component:Of,title:"Character Counter - Fariz"},{path:"/tools/text-diff",component:ab,title:"Text Diff Tool - Fariz"},{path:"/tools/url-parser",component:wb,title:"URL Parser/Analyzer - Fariz"},{path:"/tools/css-minifier",component:Nb,title:"CSS Minifier/Beautifier - Fariz"},{path:"/tools/js-minifier",component:Wb,title:"JavaScript Minifier/Beautifier - Fariz"},{path:"/tools/html-encoder",component:sp,title:"HTML Entity Encoder/Decoder - Fariz"},{path:"/tools/slug-generator",component:xp,title:"URL Slug Generator - Fariz"},{path:"/tools/color-palette",component:wp,title:"Color Palette Generator - Fariz"},{path:"/tools/gradient-generator",component:Ip,title:"CSS Gradient Generator - Fariz"},{path:"/tools/hash-generator",component:Up,title:"Hash Generator - Fariz"},{path:"/tools/jwt-decoder",component:vm,title:"JWT Decoder - Fariz"},{path:"/tools/tip-calculator",component:$m,title:"Tip Calculator - Fariz"},{path:"/tools/timestamp-converter",component:Rm,title:"Unix Timestamp Converter - Fariz"},{path:"/tools/meta-tag-generator",component:Zm,title:"Meta Tag Generator - Fariz"},{path:"/tools/css-shadow-generator",component:$h,title:"CSS Shadow Generator - Fariz"},{path:"/tools/unit-converter",component:Gh,title:"Unit Converter - Fariz"},{path:"/tools/percentage-calculator",component:M2,title:"Percentage Calculator - Fariz"},{path:"/tools/bmi-calculator",component:U2,title:"BMI Calculator - Fariz"},{path:"/tools/age-calculator",component:iy,title:"Age Calculator - Fariz"},{path:"/tools/random-picker",component:Ly,title:"Random Picker - Fariz"},{path:"/tools/cron-generator",component:Gy,title:"Cron Expression Generator - Fariz"},{path:"/tools/hash-comparer",component:e1,title:"Hash Comparer - Fariz"},{path:"/tools/ascii-art-generator",component:v1,title:"ASCII Art Generator - Fariz"}],u1=[...Eg,...g1],x1=(o,e)=>{l(e,!0)};var f1=w('<div class="min-h-screen flex flex-col justify-between relative bg-[var(--ds-secondary-50)] dark:bg-[var(--ds-secondary-900)] transition-colors duration-300"><!> <!> <div class="flex-1 pt-[72px]"><div class="container mx-auto px-4 sm:px-6 lg:px-8"><!></div></div> <footer class="flex justify-center items-center text-[var(--ds-secondary-600)] dark:text-[var(--ds-secondary-400)] py-8 mt-12 border-t border-[var(--ds-secondary-200)] dark:border-[var(--ds-secondary-800)] bg-white/50 dark:bg-black/20 backdrop-blur-sm">Made with <button type="button" class="hover:cursor-pointer hover:scale-110 transition-transform duration-200"><!></button> in Surabaya.</footer></div> <!> <!>',1);function b1(o,e){Ie(e,!0);let a=p(!1);Ur(()=>{const R=localStorage.getItem("theme"),V=window.matchMedia("(prefers-color-scheme: dark)").matches;l(a,R==="dark"||!R&&V,!0);const b=()=>{const C=localStorage.getItem("theme");l(a,C==="dark"||!C&&window.matchMedia("(prefers-color-scheme: dark)").matches,!0)};window.addEventListener("storage",b),window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",b);const T=new MutationObserver(()=>{l(a,document.documentElement.classList.contains("dark"),!0)});return T.observe(document.documentElement,{attributes:!0,attributeFilter:["class"]}),()=>{window.removeEventListener("storage",b),window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change",b),T.disconnect()}});const i=u1;let n=p(!1);const c=()=>{l(n,!1)};Ur(()=>{E0(i)});var d=f1(),v=ge(d),g=r(v);bc(g,{});var u=s(g,2);xc(u,{});var f=s(u,2),k=r(f),h=r(k);R0(h,{});var m=s(f,2),_=s(r(m));_.__click=[x1,n];var $=r(_);mc($,{class:"w-5 h-5 mx-1 text-rose-600"});var M=s(v,2);Lc(M,{get isOpen(){return t(n)},onClose:c,maxW:"max-w-2xl",children:(R,V)=>{Cc(R)},$$slots:{default:!0}});var E=s(M,2);{let R=xt(()=>t(a)?"dark":"light");Ev(E,{position:"top-center",get theme(){return t(R)}})}x(o,d),Re()}yt(["click"]);const jl=document.getElementById("app");if(!jl)throw new Error("Could not find app element");n0(b1,{target:jl});
