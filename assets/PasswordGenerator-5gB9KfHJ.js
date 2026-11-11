import{z as R,F as ze,j as ga,e as ba,f as z,h as G,o,c as i,m as e,i as A,E as U,B as O,b as u,u as k,t as _,r as x,a as Z,C as va,ax as fa,ak as $e,y as N,O as je,l as ya,P as Se,k as wa}from"./vendor-DPNPh1Tm.js";import{T as ka}from"./ToolLayout-DHfRHZFP.js";import{l as Ee,I as xa,b as K,C as J,A as Pe,i as Q,H as W,g as _a}from"./router-CiOO4rnf.js";import"./index-B8evTkEz.js";import"./notifications-Be3jXyr0.js";const F=a=>crypto.getRandomValues(a),X=2**32;function L(a,d=F){if(!Number.isInteger(a)||a<1||a>X)throw new RangeError(`randomInt: n must be an integer in 1..2^32, got ${a}`);const n=X-X%a,b=new Uint32Array(1);for(;;){d(b);const p=b[0];if(p<n)return p%a}}function za(a,d=F){for(let n=a.length-1;n>0;n--){const b=L(n+1,d);[a[n],a[b]]=[a[b],a[n]]}return a}const $a="ABCDEFGHIJKLMNOPQRSTUVWXYZ",ja="abcdefghijklmnopqrstuvwxyz",Sa="0123456789",Ea="!@#$%^&*()-_=+[]{};:,.<>?/~",De="Il1|O0o`'\"";function Pa(a){return[...new Set([...a])]}function Oe(a){const d=y=>/\s/.test(y)||a.excludeAmbiguous===!0&&De.includes(y),n=new Set,b=[],p=y=>{const I=Pa(y).filter(q=>!d(q)&&!n.has(q));I.forEach(q=>n.add(q)),I.length>0&&b.push(I)};return a.upper&&p($a),a.lower&&p(ja),a.digits&&p(Sa),a.symbols&&p(Ea),a.custom&&p(a.custom),b}function Aa(a){return Oe(a).flat().join("")}function qa(a,d=F){const n=Oe(a);if(n.length===0)throw new Error("Enable at least one character type.");if(!Number.isInteger(a.length)||a.length<n.length)throw new Error(`Length must be at least ${n.length} to include every enabled character type.`);const b=n.flat(),p=n.map(y=>y[L(y.length,d)]);for(;p.length<a.length;)p.push(b[L(b.length,d)]);return za(p,d).join("")}function Ca(a,d,n=F){if(d.length<2)throw new Error("The word list is empty.");if(!Number.isInteger(a.words)||a.words<1)throw new Error("Use at least one word.");let p=Array.from({length:a.words},()=>{const y=d[L(d.length,n)];return a.capitalize?y.charAt(0).toUpperCase()+y.slice(1):y}).join(a.separator);return a.appendDigit&&(p+=String(L(10,n))),p}function Ae(a){return a.mode==="chars"?a.charsetSize>1&&a.length>0?a.length*Math.log2(a.charsetSize):0:a.listSize<2||a.words<1?0:a.words*Math.log2(a.listSize)+(a.appendDigit?Math.log2(10):0)}function Da(a){const d=Math.max(0,Math.min(1,a/128));return a<40?{band:"weak",label:"Weak",ratio:d}:a<60?{band:"fair",label:"Fair",ratio:d}:a<80?{band:"strong",label:"Strong",ratio:d}:{band:"very-strong",label:"Very strong",ratio:d}}const Oa=`
able about above absent accept access accident account acid across act action active actor
actual adapt add address adjust admire admit adult advance advice affair afford afraid after
again age agent agree ahead aim air airport alarm album alert alien alive alley allow almost
alone along already also alter always amazing amber amount amuse anchor ancient angle animal
ankle annual answer antenna anvil any apart apple apply april apron arch arctic area arena argue
arm armor army around arrange arrive arrow art article artist ash aside ask aspect asset assist
atom attach attend attic auction audio august aunt author auto autumn avenue average avocado
avoid awake award aware away awesome axis baby bacon badge bag bake baker balance balcony ball
bamboo banana band banjo bank banner bar barber bargain barley barn barrel base basic basket
bath battery battle beach beacon bead beam bean bear beard beat beauty beaver become bed bee
beef before begin behave behind believe bell belong below belt bench benefit berry best better
between beyond bicycle bid big bike bill bind bird birth biscuit bit bitter black blade blame
blank blanket blast blaze blend bless blink block blossom blouse blue blur board boat body boil
bold bolt bone bonus book boost boot border borrow boss bottle bottom bounce box boy bracket
brain brake branch brass brave bread break breeze brick bridge brief bright brim bring brisk
broad bronze brook broom brother brown brush bubble bucket buddy budget buffalo build bulb bulk
bundle bunker burden burger bus bush butter button buyer buzz cabin cable cactus cage cake call
calm camel camera camp canal candle candy canoe canvas canyon capable capital captain car carbon
card cargo carpet carrot carry cart case cash castle casual cat catalog catch cattle cause
cave ceiling celery cello cement census cereal certain chair chalk champion change channel
chapter charge chart chase cheap check cheese chef cherry chess chest chicken chief child
chimney choice choose chorus chunk church cider cinema circle citizen city civil claim clap
clarify class claw clay clean clerk clever click client cliff climb clinic clip clock close
cloth cloud clown club clump cluster coach coast coconut code coffee coil coin collect color
column combine comfort comic common company concert conduct confirm connect consider control
convince cook cool copper copy coral core corn correct cost cotton couch country couple course
cousin cover coyote crack cradle craft crane crash crater crawl crayon cream credit creek crew
cricket crisp critic crop cross crowd crown crucial cruise crumble crunch crush crystal cube
culture cup cupboard curious current curtain curve cushion custom cute cycle daily dairy daisy
damp dance danger daring dash daughter dawn day deal debate decade december decide decline decor
decorate deer defend define degree delay deliver demand denim depart depend deposit depth deputy
derive desert design desk detail detect develop device devote diagram dial diamond diary diesel
diet differ digital dignity dilemma dinner dinosaur direct dirt disagree discover dish dismiss
display distance divert divide dizzy doctor document dog doll dolphin domain donate donkey donor
door dose double dove draft dragon drama drastic draw dream dress drift drill drink drip drive
drop drum dry duck dune during dust duty dwarf dynamic eager eagle early earn earth easily east
easy echo ecology economy edge edit educate effort egg eight either elbow elder electric elegant
element elephant elevator elite else embark embody embrace emerge emotion employ empower empty
enable enact end endless endorse enemy energy enforce engage engine enhance enjoy enlist enough
enrich enroll ensure enter entire entry envelope episode equal equip era erase erode erosion
error erupt escape essay essence estate eternal evening event evidence evoke evolve exact example
excess exchange excite exclude excuse execute exercise exhaust exhibit exile exist exit exotic
expand expect expire explain expose express extend extra eye eyebrow fabric face faculty fade
faint faith fall false fame family famous fan fancy fantasy farm fashion father fatigue fault
favorite feature february federal fee feed feel female fence festival fetch fever few fiber
fiction field figure file film filter final find fine finger finish fire firm first fiscal
fish fit fitness fix flag flame flash flat flavor flee flight flip float flock floor flower
fluid flush fly foam focus fog foil fold follow food foot force forest forget fork fortune
forum forward fossil foster found fox fragile frame frequent fresh friend fringe frog front
frost frown frozen fruit fuel fun funny furnace fury future gadget gain galaxy gallery game gap
garage garbage garden garlic garment gas gasp gate gather gauge gaze general genius genre gentle
genuine gesture ghost giant gift giggle ginger giraffe girl give glad glance glare glass glide
glimpse globe gloom glory glove glow glue goat goddess gold good goose gorilla gospel gossip
govern gown grab grace grain grant grape grass gravity great green grid grief grit grocery group
grow grunt guard guess guide guilt guitar gym habit hair half hammer hamster hand happy harbor
hard harsh harvest hat have hawk hazard head health heart heavy hedgehog height hello helmet
help hen hero hidden high hill hint hip hire history hobby hockey hold hole holiday hollow
home honey hood hope horn horse hospital host hotel hour hover hub huge human humble humor
hundred hungry hunt hurdle hurry hurt husband hybrid ice icon idea identify idle ignore ill
illness image imitate immense immune impact impose improve impulse inch include income increase
index indicate indoor industry infant inflict inform inhale inherit initial inject injury inner
innocent input inquiry insect inside inspire install intact interest into invest invite involve
iron island isolate issue item ivory jacket jaguar jar jazz jealous jeans jelly jewel job join
joke journey joy judge juice jump jungle junior junk just kangaroo keen keep ketchup key kick
kid kidney kind kingdom kiss kit kitchen kite kitten kiwi knee knife knock know lab label labor
ladder lady lake lamp language laptop large later latin laugh laundry lava law lawn lawsuit
layer lazy leader leaf learn leave lecture left leg legal legend leisure lemon lend length lens
leopard lesson letter level liberty library license life lift light like limb limit link lion
liquid list little live lizard load loan lobster local lock logic lonely long loop lottery loud
lounge love loyal lucky luggage lumber lunar lunch luxury lyrics machine mad magic magnet maid
mail main major make mammal man manage mandate mango mansion manual maple marble march margin
marine market marriage mask mass master match material math matrix matter maximum maze meadow
mean measure meat mechanic medal media melody melt member memory mention menu mercy merge merit
merry mesh message metal method middle midnight milk million mimic mind minimum minor minute
miracle mirror misery miss mistake mix mixed mixture mobile model modify mom moment monitor
monkey monster month moon moral more morning mosquito mother motion motor mountain mouse move
movie much muffin mule multiply muscle museum mushroom music must mutual myself mystery myth
naive name napkin narrow nation nature near neck need needle neglect neighbor neither nephew
nerve nest net network neutral never news next nice night noble noise nominee noodle normal
north nose notable note nothing notice novel now nuclear number nurse nut oak obey object oblige
obscure observe obtain obvious occur ocean october odor off offer office often oil okay old olive
olympic omit once one onion online only open opera opinion oppose option orange orbit orchard
order ordinary organ orient original orphan ostrich other outdoor outer output outside oval oven
over own owner oxygen oyster ozone pact paddle page pair palace palm panda panel panic panther
paper parade parent park parrot party pass patch path patient patrol pattern pause pave payment
peace peanut pear peasant pelican pen penalty pencil people pepper perfect permit person pet
phone photo phrase physical piano picnic picture piece pig pigeon pill pilot pink pioneer pipe
pitch pizza place planet plastic plate play please pledge pluck plug plunge poem poet point polar
pole police pond pony pool popular portion position possible post potato pottery poverty powder
power practice praise predict prefer prepare present pretty prevent price pride primary print
priority private prize problem process produce profit program project promote proof property
prosper protect proud provide public pudding pull pulp pulse pumpkin punch pupil puppy purchase
purity purpose purse push put puzzle pyramid quality quantum quarter question quick quit quiz
quote rabbit raccoon race rack radar radio rail rain raise rally ramp ranch random range rapid
rare rate rather raven raw razor ready real reason rebel rebuild recall receive recipe record
recycle reduce reflect reform refuse region regret regular reject relax release relief rely
remain remember remind remove render renew rent reopen repair repeat replace report require
rescue resemble resist resource response result retire retreat return reunion reveal review
reward rhythm rib ribbon rice rich ride ridge right rigid ring ripple risk ritual rival river
road roast robot robust rocket romance roof rookie room rose rotate rough round route royal
rubber rude rug rule run runway rural sad saddle sadness safe sail salad salmon salon salt
salute same sample sand satisfy sauce sausage save say scale scan scatter scene scheme school
science scissors scorpion scout scrap screen script scrub sea search season seat second secret
section security seed seek segment select sell seminar senior sense sentence series service
session settle setup seven shadow shaft shallow share shed shell sheriff shield shift shine
ship shiver shock shoe shop short shoulder shove shrimp shrug shuffle shy sibling sick side
sight sign silent silk silly silver similar simple since sing siren sister situate six size
skate sketch ski skill skin skirt skull slab slam sleep slender slice slide slight slim slogan
slot slow slush small smart smile smoke smooth snack snake snap sniff snow soap soccer social
sock soda soft solar soldier solid solution solve someone song soon sorry sort soul sound soup
source south space spare spatial spawn speak special speed spell spend sphere spice spider
spike spin spirit split spoil sponsor spoon sport spot spray spread spring spy square squeeze
squirrel stable stadium staff stage stairs stamp stand start state stay steak steel stem step
stereo stick still sting stock stomach stone stool story stove strategy street strike strong
struggle student stuff stumble style subject submit subway success such sudden suffer sugar
suggest suit summer sun sunny sunset super supply supreme sure surface surge surprise surround
survey suspect sustain swallow swamp swap swarm swear sweet swift swim swing switch sword symbol
symptom syrup system table tackle tag tail talent talk tank tape target task taste tattoo taxi
teach team tell ten tenant tennis tent term test text thank that theme then theory there they
thing this thought three thrive throw thumb thunder ticket tide tiger tilt timber time tiny tip
tired tissue title toast today toddler toe together toilet token tomato tomorrow tone tongue
tonight tool tooth top topic topple torch tornado tortoise toss total tourist toward tower
town toy track trade traffic tragic train transfer trap trash travel tray treat tree trend
trial tribe trick trigger trim trip trophy trouble truck true truly trumpet trust truth try
tube tuition tumble tuna tunnel turkey turn turtle twelve twenty twice twin twist two type
typical umbrella unable unaware uncle uncover under undo unfair unfold unhappy uniform unique
unit universe unknown unlock until unusual unveil update upgrade uphold upon upper upset urban
urge usage use used useful useless usual utility vacant vacuum vague valid valley valve van
vanish vapor various vast vault vehicle velvet vendor venture venue verb verify version very
vessel veteran viable vibrant victory video view village vintage violin virtual virus visa
visit visual vital vivid vocal voice void volcano volume vote voyage wage wagon wait walk wall
walnut want warm warrior wash wasp waste water wave way wealth wear weasel weather web wedding
weekend weird welcome west wet whale what wheat wheel when where whip whisper wide width wife
wild will win window wine wing wink winner winter wire wisdom wise wish witness wolf woman
wonder wood wool word work world worry worth wrap wreck wrestle wrist write wrong yard year
yellow you young youth zebra zero zone zoo
`,B=Object.freeze([...new Set(Oa.split(/\s+/).map(a=>a.trim().toLowerCase()).filter(a=>/^[a-z]{3,8}$/.test(a)))]);var Ia=z('<p class="text-body text-negative" role="alert"> </p>'),Ma=z("<span> </span>"),Ra=z('<output class="block rounded-md bg-sunken px-5 py-4 font-mono text-title break-all text-ink"></output>'),Ga=z('<!> <div class="flex flex-col gap-2"><span class="fz-field-label" aria-hidden="true">Separator</span> <!></div> <div class="flex flex-col gap-3"><!> <!></div> <p class="text-body-sm text-ink-muted"> </p>',1),Ba=z('<!> <div class="grid gap-3 sm:grid-cols-2"><!> <!> <!> <!></div> <!> <!> <p class="text-body-sm text-ink-muted"> </p>',1),La=z('Copy<span class="sr-only"></span>',1),qe=z('<li class="flex items-center gap-3 rounded-md bg-sunken py-1.5 pr-1.5 pl-4"><span class="min-w-0 flex-1 font-mono text-body-sm break-all text-ink"> </span> <!></li>'),Ce=z('<ul class="flex flex-col gap-2"></ul>'),Ta=z('<p class="text-body-sm text-ink-muted">Pick from a few candidates with the same settings.</p>'),Ua=z('Copy<span class="sr-only"> </span>',1),Na=z(`<section class="flex flex-col gap-5 rounded-lg bg-card p-6" aria-labelledby="pw-result-title"><div class="flex flex-wrap items-center justify-between gap-3"><h2 id="pw-result-title" class="text-label text-ink-muted"> </h2> <div class="w-full sm:w-72"><!></div></div> <!> <div class="flex flex-wrap items-center gap-3"><!> <!></div> <div class="flex flex-col gap-2"><div class="flex flex-wrap items-baseline justify-between gap-2"><p class="text-body text-ink"><span> </span> <span class="text-ink-muted"> </span></p> <p class="text-body-sm text-ink-muted"><!></p></div> <div class="h-2 overflow-hidden rounded-pill bg-sunken" aria-hidden="true"><div></div></div> <p class="text-body-sm text-ink-muted">Under 40 bits weak · 40–59 fair · 60–79 strong · 80+ very strong. Entropy measures the generator, so it
        assumes an attacker knows these settings.</p></div></section> <div class="grid gap-4 lg:grid-cols-[3fr_2fr]"><section class="flex flex-col gap-6 rounded-lg bg-card p-6" aria-labelledby="pw-options-title"><h2 id="pw-options-title" class="text-label text-ink-muted">Options</h2> <div class="flex flex-col gap-2" role="group" aria-labelledby="pw-presets-label"><span id="pw-presets-label" class="fz-field-label">Presets</span> <div class="flex flex-wrap gap-2"></div></div> <!></section> <div class="flex flex-col gap-4"><section class="flex flex-col gap-4 rounded-lg bg-card p-6" aria-labelledby="pw-batch-title"><div class="flex flex-wrap items-center justify-between gap-3"><h2 id="pw-batch-title" class="text-label text-ink-muted">Several at once</h2> <!></div> <!></section> <section class="flex flex-col gap-4 rounded-lg bg-card p-6" aria-labelledby="pw-history-title"><div class="flex flex-wrap items-center justify-between gap-3"><h2 id="pw-history-title" class="text-label text-ink-muted">Copied this visit</h2> <!></div> <!> <p class="text-body-sm text-ink-muted">Kept in memory only, never saved. Gone when you leave or reload the page.</p></section></div></div>`,1);function Za(a,d){ba(d,!0);const n={mode:"chars",length:20,upper:!0,lower:!0,digits:!0,symbols:!0,excludeAmbiguous:!1,custom:"",words:6,separator:"-",capitalize:!1,appendDigit:!1},b=[{id:"strong",label:"Strong",settings:{...n}},{id:"readable",label:"Easy to read",settings:{...n,length:16,symbols:!1,excludeAmbiguous:!0}},{id:"max",label:"Maximum",settings:{...n,length:64}},{id:"passphrase",label:"Passphrase",settings:{...n,mode:"passphrase"}},{id:"memorable",label:"Memorable",settings:{...n,mode:"passphrase",words:5,separator:" ",capitalize:!0,appendDigit:!0}}],p=[{value:"chars",label:"Characters"},{value:"passphrase",label:"Passphrase"}],y=[{value:"-",label:"Hyphen"},{value:".",label:"Dot"},{value:"_",label:"Underscore"},{value:" ",label:"Space"},{value:"",label:"None"}],I=5,q=10;let t=R(ze({...n})),ee=R(0),ae=R(!1),re=R(0),C=R(ze([]));const te=k(()=>({length:e(t).length,upper:e(t).upper,lower:e(t).lower,digits:e(t).digits,symbols:e(t).symbols,custom:e(t).custom,excludeAmbiguous:e(t).excludeAmbiguous})),S=k(()=>e(t).mode==="passphrase"),H=k(()=>Aa(e(te)).length);function se(){return e(S)?Ca({words:e(t).words,separator:e(t).separator,capitalize:e(t).capitalize,appendDigit:e(t).appendDigit},B):qa(e(te))}const D=k(()=>{e(ee);try{return{value:se(),error:""}}catch(v){return{value:"",error:v instanceof Error?v.message:String(v)}}}),oe=k(()=>{if(e(re),!e(ae))return[];try{return Array.from({length:I},se)}catch{return[]}}),ie=k(()=>e(S)?Ae({mode:"passphrase",words:e(t).words,listSize:B.length,appendDigit:e(t).appendDigit}):Ae({mode:"chars",length:e(t).length,charsetSize:e(H)})),T=k(()=>Da(e(ie))),ne=k(()=>b.find(v=>Object.keys(n).every(M=>v.settings[M]===e(t)[M]))?.id);function Ie(v){N(t,{...v},!0)}function le(v){N(C,[v,...e(C).filter(M=>M!==v)].slice(0,q),!0)}function Me(){N(ae,!0),je(re)}function Re(v){return/[a-z]/i.test(v)?"":/\d/.test(v)?"text-accent-text":"text-ink-muted"}ka(a,{title:"Password Generator",description:"Random passwords and word passphrases made in your browser with the Web Crypto API. Nothing is sent or saved.",get icon(){return fa},color:"warning",children:(v,M)=>{var ce=Na(),de=G(ce),ue=i(de),pe=i(ue),Ge=i(pe),Be=o(pe,2),Le=i(Be);Ee(Le,{label:"Generator type",get options(){return p},get value(){return e(t).mode},set value(r){e(t).mode=r}});var he=o(ue,2);{var Te=r=>{var s=Ia(),l=i(s);_(()=>x(l,`▼ ${e(D).error??""}`)),u(r,s)},Ue=r=>{var s=Ra();U(s,21,()=>[...e(D).value],Se,(l,c)=>{var h=Ma(),f=i(h);_(g=>{Z(h,1,g),x(f,e(c))},[()=>ya(Re(e(c)))]),u(l,h)}),_(()=>wa(s,"aria-label",e(S)?"Generated passphrase":"Generated password")),u(r,s)};A(he,r=>{e(D).error?r(Te):r(Ue,-1)})}var me=o(he,2),ge=i(me);{var Ne=r=>{J(r,{get value(){return e(D).value},oncopy:le,children:(s,l)=>{var c=O("Copy");u(s,c)},$$slots:{default:!0}})};A(ge,r=>{e(D).value&&r(Ne)})}var We=o(ge,2);{let r=k(()=>e(S)?"Generate a new passphrase":"Generate a new password");xa(We,{get label(){return e(r)},onclick:()=>je(ee),children:(s,l)=>{$e(s,{})}})}var Fe=o(me,2),be=i(Fe),ve=i(be),Y=i(ve),He=i(Y),Ye=o(Y,2),Ve=i(Ye),Ze=o(ve,2),Ke=i(Ze);{var Je=r=>{var s=O();_(()=>x(s,`${e(t).words??""} words × log2(${B.length??""})${e(t).appendDigit?" + log2(10)":""}`)),u(r,s)},Qe=r=>{var s=O();_(()=>x(s,`${e(t).length??""} chars × log2(${e(H)??""})`)),u(r,s)};A(Ke,r=>{e(S)?r(Je):r(Qe,-1)})}var Xe=o(be,2),fe=i(Xe),ea=o(de,2),ye=i(ea),we=o(i(ye),2),aa=o(i(we),2);U(aa,21,()=>b,r=>r.id,(r,s)=>{{let l=k(()=>e(ne)===e(s).id?"primary":"secondary"),c=k(()=>e(ne)===e(s).id);K(r,{size:"sm",get variant(){return e(l)},get"aria-pressed"(){return e(c)},onclick:()=>Ie(e(s).settings),children:(h,f)=>{var g=O();_(()=>x(g,e(s).label)),u(h,g)},$$slots:{default:!0}})}});var ra=o(we,2);{var ta=r=>{var s=Ga(),l=G(s);Pe(l,{label:"Words",min:3,max:12,marks:["3","12"],get value(){return e(t).words},set value(w){e(t).words=w}});var c=o(l,2),h=o(i(c),2);Ee(h,{label:"Separator",get options(){return y},get value(){return e(t).separator},set value(w){e(t).separator=w}});var f=o(c,2),g=i(f);Q(g,{label:"Capitalize words",get checked(){return e(t).capitalize},set checked(w){e(t).capitalize=w}});var E=o(g,2);Q(E,{label:"Add a digit at the end",description:"Adds about 3.3 bits; helps with sites that demand a number",get checked(){return e(t).appendDigit},set checked(w){e(t).appendDigit=w}});var $=o(f,2),j=i($);_(w=>x(j,`Words are drawn from a list of ${B.length??""} common English words, each one adding about
          ${w??""} bits.`),[()=>Math.log2(B.length).toFixed(1)]),u(r,s)},sa=r=>{var s=Ba(),l=G(s);Pe(l,{label:"Length",min:8,max:128,marks:["8","128"],get value(){return e(t).length},set value(m){e(t).length=m}});var c=o(l,2),h=i(c);W(h,{label:"Uppercase",description:"A–Z",get checked(){return e(t).upper},set checked(m){e(t).upper=m}});var f=o(h,2);W(f,{label:"Lowercase",description:"a–z",get checked(){return e(t).lower},set checked(m){e(t).lower=m}});var g=o(f,2);W(g,{label:"Digits",description:"0–9",get checked(){return e(t).digits},set checked(m){e(t).digits=m}});var E=o(g,2);W(E,{label:"Symbols",description:"!@#$%^&* …",get checked(){return e(t).symbols},set checked(m){e(t).symbols=m}});var $=o(c,2);{let m=k(()=>`Leaves out ${De.split("").join(" ")}`);Q($,{label:"Exclude look-alikes",get description(){return e(m)},get checked(){return e(t).excludeAmbiguous},set checked(V){e(t).excludeAmbiguous=V}})}var j=o($,2);_a(j,{label:"Extra characters",optional:!0,mono:!0,hint:"Added as their own group; at least one will appear. Duplicates and spaces are ignored.",autocomplete:"off",spellcheck:!1,get value(){return e(t).custom},set value(m){e(t).custom=m}});var w=o(j,2),P=i(w);_(()=>x(P,`Every enabled group appears at least once; the rest is drawn from all ${e(H)??""} characters and shuffled.`)),u(r,s)};A(ra,r=>{e(S)?r(ta):r(sa,-1)})}var oa=o(ye,2),ke=i(oa),xe=i(ke),ia=o(i(xe),2);{const r=l=>{$e(l,{class:"size-4"})};let s=k(()=>!!e(D).error);K(ia,{size:"sm",variant:"secondary",onclick:Me,get disabled(){return e(s)},icon:r,children:(l,c)=>{var h=O();h.nodeValue="Generate 5",u(l,h)},$$slots:{icon:!0,default:!0}})}var na=o(xe,2);{var la=r=>{var s=Ce();U(s,21,()=>e(oe),Se,(l,c,h)=>{var f=qe(),g=i(f),E=i(g),$=o(g,2);J($,{get value(){return e(c)},oncopy:le,children:(j,w)=>{var P=La(),m=o(G(P));m.textContent=`option ${h+1}`,u(j,P)},$$slots:{default:!0}}),_(()=>x(E,e(c))),u(l,f)}),u(r,s)},ca=r=>{var s=Ta();u(r,s)};A(na,r=>{e(oe).length>0?r(la):r(ca,-1)})}var da=o(ke,2),_e=i(da),ua=o(i(_e),2);{var pa=r=>{K(r,{size:"sm",variant:"ghost",onclick:()=>N(C,[],!0),children:(s,l)=>{var c=O("Clear");u(s,c)},$$slots:{default:!0}})};A(ua,r=>{e(C).length>0&&r(pa)})}var ha=o(_e,2);{var ma=r=>{var s=Ce();U(s,22,()=>e(C),l=>l,(l,c,h)=>{var f=qe(),g=i(f),E=i(g),$=o(g,2);J($,{get value(){return c},children:(j,w)=>{var P=Ua(),m=o(G(P)),V=i(m);_(()=>x(V,`copied item ${e(h)+1}`)),u(j,P)},$$slots:{default:!0}}),_(()=>x(E,c)),u(l,f)}),u(r,s)};A(ha,r=>{e(C).length>0&&r(ma)})}_((r,s)=>{x(Ge,e(S)?"Your passphrase":"Your password"),Z(Y,1,`font-medium ${e(T).band==="weak"?"text-negative":"text-ink"}`),x(He,e(T).label),x(Ve,`· ${r??""} bits of entropy`),Z(fe,1,`h-full rounded-pill transition-[width] duration-base ease-smooth ${e(T).band==="weak"?"bg-negative":"bg-accent"}`),va(fe,`width: ${s??""}%`)},[()=>Math.round(e(ie)),()=>Math.max(e(T).ratio*100,2)]),u(v,ce)},$$slots:{default:!0}}),ga()}export{Za as default};
