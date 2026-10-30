/* Caleidos — prototipo estático. Sin API, dependencias ni credenciales reales. */
'use strict';

const STORAGE_KEY = 'caleidos.contracts.v1';
const SESSION_KEY = 'caleidos.session.v1';
const PHASES = ['Legal', 'Comercial', 'Finanzas', 'Gerencia'];
const ROLE_NAMES = {legal:'Área Legal', commercial:'Comercial', finance:'Adm. y Finanzas', management:'Gerencia General', admin:'Administrador'};
const PHASE_ROLES = ['legal', 'commercial', 'finance', 'management'];
const BASE_USERS = [
  {id:'commercial',name:'Valeria Soto',email:'comercial@caleidos.pe',role:'commercial',active:true},
  {id:'legal',name:'Diego Mendoza',email:'legal@caleidos.pe',role:'legal',active:true},
  {id:'finance',name:'Alejandro Torres',email:'finanzas@caleidos.pe',role:'finance',active:true},
  {id:'management',name:'Laura García',email:'gerencia@caleidos.pe',role:'management',active:true},
  {id:'admin',name:'Andrea Ruiz',email:'admin@caleidos.pe',role:'admin',active:true}
];
const ICONS = {
  grid:'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z',
  file:'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M8 13h8 M8 17h5',
  checkfile:'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M8 15l3 3 5-6',
  chat:'M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z M8 10h8 M8 14h5',
  folder:'M3 7V5a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M3 9h18',
  clock:'M12 8v4l3 2 M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',
  flow:'M9 3h6v5H9z M3 16h6v5H3z M15 16h6v5h-6z M12 8v4 M6 16v-4h12v4',
  users:'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M16 3a4 4 0 0 1 0 8 M22 21v-2a4 4 0 0 0-3-3.87 M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
  plus:'M12 5v14 M5 12h14',
  search:'M21 21l-4.35-4.35 M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
  bell:'M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9 M10 21h4',
  chevron:'m9 5 7 7-7 7',
  down:'m6 9 6 6 6-6',
  arrow:'M5 12h14 m-5-5 5 5-5 5',
  back:'M19 12H5 m5-5-5 5 5 5',
  check:'m5 12 4 4L19 6',
  close:'m6 6 12 12 M6 18 18 6',
  calendar:'M8 2v4 M16 2v4 M3 10h18 M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2',
  download:'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3',
  upload:'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 8l5-5 5 5 M12 3v12',
  shield:'M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11 M9 12l2 2 4-4',
  scale:'M12 3v18 M6 21h12 M4 7h16 M7 4l-4 8h8z M17 4l-4 8h8z',
  briefcase:'M9 6V4h6v2 M3 6h18v14H3z M3 11c6 4 12 4 18 0 M10 12h4v4h-4z',
  wallet:'M21 8V5a2 2 0 0 0-2-2H5a3 3 0 0 0 0 6h16v12H5a3 3 0 0 1-3-3V6 M21 12h-5v5h5 M17 14.5h.1',
  pen:'m12 19 8-8-7-7-8 8-2 9z M13 4l2-2 7 7-2 2 M5 12l7 7 M3 21l5-1',
  spark:'m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z M21 2v4 M19 4h4',
  help:'M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3 M12 17h.01 M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',
  logout:'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9',
  eye:'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7 M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0',
  compare:'M8 3v18 M3 7l5-4 5 4 M16 21V3 M11 17l5 4 5-4',
  send:'m22 2-7 20-4-9-9-4z M22 2 11 13',
  lock:'M5 10h14v11H5z M8 10V6a4 4 0 0 1 8 0v4',
  menu:'M3 6h18 M3 12h18 M3 18h18',
  trend:'m3 17 6-6 4 4 8-10 M15 5h6v6',
  filter:'M4 6h16 M7 12h10 M10 18h4',
  refresh:'M20 7v5h-5 M4 17v-5h5 M6.1 6.1a8 8 0 0 1 13.2 2.8 M4.7 15.1a8 8 0 0 0 13.2 2.8',
  info:'M12 11v6 M12 7h.01 M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0'
};
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const esc = value => String(value ?? '').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const icon = (name, cls='') => `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="${ICONS[name] || ICONS.file}"/></svg>`;
const initials = name => name.split(/\s+/).filter(Boolean).slice(0,2).map(n=>n[0]).join('').toUpperCase();
const money = c => new Intl.NumberFormat('es-PE',{style:'currency',currency:c.currency || 'USD',maximumFractionDigits:0}).format(c.amount);
const date = (v, full=false) => new Intl.DateTimeFormat('es-PE',{day:'2-digit',month:full?'long':'short',year:full?'numeric':undefined,timeZone:'America/Lima'}).format(new Date(v.includes('T')?v:`${v}T12:00:00-05:00`));
const datetime = v => new Intl.DateTimeFormat('es-PE',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit',timeZone:'America/Lima'}).format(new Date(v));
const now = () => new Date().toISOString();
const localDay = () => new Intl.DateTimeFormat('en-CA',{year:'numeric',month:'2-digit',day:'2-digit',timeZone:'America/Lima'}).format(new Date());
const uuid = () => globalThis.crypto?.randomUUID?.() || `id-${Date.now()}-${Math.random().toString(36).slice(2)}`;
const BRAND = `<svg class="brand-mark" viewBox="0 0 40 40" aria-hidden="true"><path d="M20 3 32 15 20 20 15 8Z" fill="#375b43"/><path d="m37 20-12 12-5-12 12-5Z" fill="#9ab778"/><path d="M20 37 8 25l12-5 5 12Z" fill="#375b43"/><path d="M3 20 15 8l5 12-12 5Z" fill="#9ab778"/></svg><div><div class="brand-name">caleidos<span class="green">.</span></div><div class="brand-sub">GESTIÓN CONTRACTUAL</div></div>`;
const PHASE_ICONS = ['scale','briefcase','wallet','pen'];

function seedState(){
  const sample = [
    ['Acme Corporation','Migración de infraestructura cloud','Migración Cloud',48000,0,'review',3,'2026-10-28'],
    ['Interbank','Servicios administrados AWS','Servicios administrados',72000,2,'review',2,'2026-10-27'],
    ['Rimac Seguros','Consultoría de arquitectura cloud','Consultoría tecnológica',28500,1,'review',2,'2026-10-26'],
    ['Grupo Romero','Implementación de plataforma digital','Desarrollo de software',56000,1,'observed',3,'2026-10-25'],
    ['Alicorp','Soporte y continuidad operativa','Soporte y mantenimiento',36000,4,'approved',1,'2026-10-24'],
    ['Pacífico Seguros','Modernización de aplicaciones','Desarrollo de software',64500,3,'review',2,'2026-10-23'],
    ['Mibanco','Evaluación de seguridad en la nube','Consultoría tecnológica',18500,0,'review',1,'2026-10-22'],
    ['Entel Perú','Optimización de infraestructura AWS','Migración Cloud',42000,0,'observed',2,'2026-10-21'],
    ['Ferreycorp','Gestión de servicios cloud','Servicios administrados',54000,4,'signed',2,'2026-10-20'],
    ['Casa Andina','Soporte de plataformas digitales','Soporte y mantenimiento',24000,4,'sent',1,'2026-10-19'],
    ['Belcorp','Consultoría de transformación digital','Consultoría tecnológica',39000,4,'approved',2,'2026-10-18'],
    ['La Positiva','Migración de entorno productivo','Migración Cloud',46500,4,'signed',1,'2026-10-17']
  ];
  const contracts = sample.map((s,i)=>{
    const [client,title,service,amount,stage,status,version,created]=s;
    const c={id:`CL-2026-${String(12-i).padStart(4,'0')}`,client,title,service,amount,currency:'USD',stage,status,created:`${created}T09:20:00-05:00`,updated:`${created}T11:30:00-05:00`,start:'2026-11-01',end:'2027-10-31',email:`contacto@${client.toLowerCase().replace(/[^a-z]/g,'')}.example`,description:`Prestación de ${service.toLowerCase()} para ${client}, de acuerdo con el alcance y los entregables establecidos.`,owner:'Valeria Soto',approvals:[],versions:[],observations:[],events:[]};
    for(let p=0;p<stage;p++) c.approvals.push({phase:p,user:BASE_USERS.find(u=>u.role===PHASE_ROLES[p]).name,at:`${created}T10:${(p+1)*10}:00-05:00`,version});
    for(let v=1;v<=version;v++) c.versions.push({number:v,id:`seed-${i}-${v}`,name:`${client.toLowerCase().replace(/\s/g,'-')}_contrato_v${v}.pdf`,size:0,at:c.created,user:'Valeria Soto',summary:v===1?'Documento inicial de la solicitud.':v===version?'Actualización del alcance y condiciones de pago.':'Ajustes a las cláusulas de confidencialidad.',text:`CONTRATO DE ${service.toUpperCase()}\nCliente: ${client}\nAlcance: ${v===1?'servicio inicial de consultoría':title}.\nMonto: USD ${amount.toLocaleString('en-US')}.\nForma de pago: ${v===1?'a 60 días de la factura':'a 30 días de la factura'}.\nVigencia: del 01/11/2026 al 31/10/2027.\nConfidencialidad: ${v<2?'12 meses':'24 meses'} desde la finalización.`,demo:true});
    c.events.push({id:uuid(),at:c.created,user:'Valeria Soto',role:'commercial',action:'Solicitud registrada',detail:'Se adjuntó la primera versión del contrato. Revisión asignada a Legal.',type:'created'});
    c.approvals.forEach(a=>c.events.push({id:uuid(),at:a.at,user:a.user,role:PHASE_ROLES[a.phase],action:`Aprobación de ${PHASES[a.phase]}`,detail:`Versión ${version} validada. ${a.phase===3?'Se completaron las cuatro aprobaciones.':`Se asignó la revisión a ${PHASES[a.phase+1]}.`}`,type:'approved'}));
    if(status==='observed'){
      c.observations.push({id:uuid(),text:i===3?'Precisar los entregables de la segunda fase y actualizar el plazo de pago a 30 días.':'El cliente solicita ampliar la cláusula de confidencialidad a 24 meses e incluir el alcance del soporte.',category:i===3?'Condiciones comerciales':'Cláusulas legales',user:i===3?'Valeria Soto':'Diego Mendoza',role:PHASE_ROLES[stage],at:c.updated,version,resolved:false});
      c.events.push({id:uuid(),at:c.updated,user:i===3?'Valeria Soto':'Diego Mendoza',role:PHASE_ROLES[stage],action:'Correcciones solicitadas',detail:'Se registraron observaciones. Comercial debe adjuntar una nueva versión.',type:'observed'});
    }
    if(status==='sent') c.events.push({id:uuid(),at:c.updated,user:'Valeria Soto',role:'commercial',action:'Envío al cliente simulado',detail:`Contrato listo para firma de ${client}.`,type:'sent'});
    if(status==='signed'){c.signature={method:'Firma manual',at:c.updated,user:'Valeria Soto'};c.events.push({id:uuid(),at:c.updated,user:'Valeria Soto',role:'commercial',action:'Firma registrada (demo)',detail:'Se completó el proceso de firma del contrato.',type:'signed'});}
    return c;
  });
  return {schema:1,users:BASE_USERS.map(u=>({...u})),contracts,notificationsRead:false};
}

let storageAvailable=true;
let state;
try{const saved=JSON.parse(localStorage.getItem(STORAGE_KEY));state=saved?.schema===1&&Array.isArray(saved.contracts)&&Array.isArray(saved.users)?saved:seedState();}catch{state=seedState();storageAvailable=false;}
let currentUser=null;
try{currentUser=state.users.find(u=>u.id===sessionStorage.getItem(SESSION_KEY)&&u.active)||null;}catch{/* Sesión en memoria cuando el almacenamiento no está disponible. */}
let route={page:'dashboard',id:null,tab:'summary'};
let contractFilter='all', phaseFilter='', serviceFilter='', searchTerm='', currentPage=1;
let notificationsOpen=false, modalCleanup=null, previousFocus=null;
const transientFiles=new Map();

function save(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));return true;}catch{storageAvailable=false;toast('El navegador no permite guardar los cambios. Se conservarán durante esta sesión.','error');return false;}}
function setSession(user,remember=false){currentUser=user;try{sessionStorage.setItem(SESSION_KEY,user.id);if(remember)localStorage.setItem('caleidos.last-email',user.email);else localStorage.removeItem('caleidos.last-email');}catch{} }
function toast(message,type='success'){clearTimeout(toast.timer);$('#toast-root').innerHTML=`<div class="toast ${type==='error'?'error':''}">${icon(type==='error'?'info':'check')}<span>${esc(message)}</span></div>`;toast.timer=setTimeout(()=>{$('#toast-root').innerHTML='';},5000);}
function currentContract(){return state.contracts.find(c=>c.id===route.id);}
function isCommercial(){return currentUser?.role==='commercial';}
function canCreate(){return isCommercial()||currentUser?.role==='admin';}
function canReview(c){return c.status==='review'&&PHASE_ROLES[c.stage]===currentUser?.role;}
function canVersion(c){return isCommercial()&&['review','observed','approved','sent'].includes(c.status);}
function needsMe(c){return canReview(c)||(isCommercial()&&c.status==='observed');}
function ownerFor(c){return c.status==='observed'?state.users.find(u=>u.role==='commercial'&&u.active):state.users.find(u=>u.role===PHASE_ROLES[c.stage]&&u.active);}
function statusLabel(c){return ({review:`Revisión ${PHASES[c.stage]}`,observed:'Con observaciones',approved:'Aprobado',sent:'Pendiente de firma',signed:'Firmado'})[c.status]||'Registrado';}
function badge(c){return `<span class="badge ${c.status}">${esc(statusLabel(c))}</span>`;}
function pendingCount(){return state.contracts.filter(needsMe).length;}
function addEvent(c,action,detail,type){c.updated=now();c.events.push({id:uuid(),at:c.updated,user:currentUser.name,role:currentUser.role,action,detail,type});state.notificationsRead=false;}
function sortedEvents(){return state.contracts.flatMap(c=>c.events.map(e=>({...e,contractId:c.id,client:c.client}))).sort((a,b)=>new Date(b.at)-new Date(a.at));}

function navigate(page,id=null,tab='summary'){
  closeModal();notificationsOpen=false;
  if(page==='users'&&currentUser?.role!=='admin'){toast('La gestión de usuarios está disponible para Administración.','error');return;}
  if(page==='new'&&!canCreate()){toast('El registro de solicitudes corresponde a Comercial o Administración.','error');return;}
  route={page,id,tab};searchTerm='';currentPage=1;
  const hash=page==='detail'?`#/contract/${encodeURIComponent(id)}/${tab}`:`#/${page}`;
  history.replaceState(null,'',hash);
  render();window.scrollTo({top:0,behavior:'instant'});
}

function routeFromHash(){
  const parts=location.hash.replace(/^#\/?/,'').split('/');
  const allowed=['dashboard','contracts','reviews','observations','documents','timeline','workflow','users','new'];
  if(parts[0]==='contract'&&state.contracts.some(c=>c.id===decodeURIComponent(parts[1]||'')))route={page:'detail',id:decodeURIComponent(parts[1]),tab:['summary','versions','observations','history'].includes(parts[2])?parts[2]:'summary'};
  else if(allowed.includes(parts[0]))route={page:parts[0],id:null,tab:'summary'};
  if((route.page==='users'&&currentUser?.role!=='admin')||(route.page==='new'&&!canCreate()))route={page:'dashboard',id:null,tab:'summary'};
}

function loginView(){
  let lastEmail='';try{lastEmail=localStorage.getItem('caleidos.last-email')||'';}catch{}
  $('#app').innerHTML=`<main class="login-screen" id="main"><section class="login-left"><div class="brand login-brand">${BRAND}</div><div class="login-content"><div class="eyebrow">UN ESPACIO. CADA ACUERDO.</div><h1>Qué bueno verte<br>de nuevo.</h1><p>Todo lo que necesitas para que tus contratos<br>avancen, en un solo lugar.</p><form id="login-form"><div class="field"><label for="login-email">Correo electrónico</label><input id="login-email" type="email" name="email" autocomplete="username" value="${esc(lastEmail||'comercial@caleidos.pe')}" placeholder="tu.nombre@caleidos.pe" required></div><div class="field"><label for="login-password">Contraseña</label><div class="password-wrap"><input id="login-password" type="password" name="password" value="demo1234" autocomplete="current-password" required minlength="8"><button class="icon-btn" type="button" data-action="toggle-password" aria-label="Mostrar contraseña" aria-pressed="false">${icon('eye','sm')}</button></div></div><div class="login-remember"><label><input name="remember" type="checkbox" ${lastEmail?'checked':''}> Recordar mi correo</label><button class="text-link text-xs" type="button" data-action="login-help">¿Necesitas ayuda?</button></div><div id="login-error" class="form-error hidden" role="alert"></div><button class="btn btn-primary btn-large w-full" type="submit">Entrar al espacio ${icon('arrow','sm')}</button></form><div class="demo-credentials"><h3 class="flex gap-6">${icon('spark','sm')} Explora el prototipo</h3><p>Elige un perfil de prueba. La contraseña de todos es <code>demo1234</code>.</p><label class="sr-only" for="demo-profile">Perfil de demostración</label><select id="demo-profile">${state.users.filter(u=>u.active).map(u=>`<option value="${esc(u.id)}" ${u.email===lastEmail?'selected':''}>${esc(ROLE_NAMES[u.role])} · ${esc(u.name)}</option>`).join('')}</select></div></div><div class="login-bottom"><span>© 2026 Caleidos. Cada acuerdo cuenta.</span><span>Prototipo interactivo · v1.0</span></div></section><section class="login-right" aria-label="Gestión contractual Caleidos"><div class="login-illustration" aria-hidden="true"><div class="illus-orbit"></div><div class="illus-document"><div class="illus-line"></div><div class="illus-line"></div><div class="illus-line"></div><div class="illus-line"></div><div class="illus-line"></div><div class="illus-stamp">${icon('check')}</div></div><div class="illus-small">${icon('shield')}</div><div class="illus-float">${icon('check')} Un paso más cerca del sí</div></div><h2>Menos vueltas.<br><span>Más acuerdos.</span></h2><p>Conecta a tu equipo, simplifica las revisiones y dale claridad a cada etapa de tus contratos.</p><div class="login-flow"><span>Legal</span>${icon('arrow')}<span>Comercial</span>${icon('arrow')}<span>Finanzas</span>${icon('arrow')}<span>Gerencia</span></div><div class="login-right-bottom">${icon('lock')} Demo local · Sin conexión a servidores</div></section></main>`;
  $('#demo-profile').addEventListener('change',e=>{const u=state.users.find(u=>u.id===e.target.value);$('#login-email').value=u.email;$('#login-password').value='demo1234';$('#login-error').classList.add('hidden');});
  $('#login-form').addEventListener('submit',e=>{
    e.preventDefault();const form=new FormData(e.currentTarget);const u=state.users.find(u=>u.email.toLowerCase()===String(form.get('email')).trim().toLowerCase()&&u.active);
    if(!u||form.get('password')!=='demo1234'){const el=$('#login-error');el.textContent='Revisa el correo y la contraseña. Usa uno de los perfiles demo disponibles.';el.classList.remove('hidden');return;}
    setSession(u,form.get('remember')==='on');routeFromHash();render();window.scrollTo({top:0,behavior:'instant'});if(!storageAvailable)toast('Los datos solo se conservarán durante esta sesión.','error');
  });
}

function sidebar(){
  const nav=[['dashboard','grid','Panel general'],['contracts','file','Contratos',state.contracts.length],['reviews','checkfile','Mis revisiones',pendingCount()],['observations','chat','Observaciones',state.contracts.flatMap(c=>c.observations).filter(o=>!o.resolved).length],['documents','folder','Documentos'],['timeline','clock','Trazabilidad']];
  return `<div class="mobile-overlay" data-action="close-menu"></div><aside class="sidebar" aria-label="Navegación principal"><a class="brand" href="#/dashboard" data-nav="dashboard" aria-label="Caleidos, inicio">${BRAND}</a><div class="workspace-label"><span>C</span> Workspace de Caleidos ${icon('down','sm')}</div><div class="nav-label">ESPACIO DE TRABAJO</div><nav class="nav-group">${nav.map(([page,i,label,count])=>`<a href="#/${page}" data-nav="${page}" class="nav-item ${route.page===page||(page==='contracts'&&['detail','new'].includes(route.page))?'active':''}" ${route.page===page?'aria-current="page"':''}>${icon(i)}<span>${label}</span>${count?`<span class="nav-count ${page==='reviews'?'orange':''}">${count}</span>`:''}</a>`).join('')}</nav><div class="nav-label">ADMINISTRACIÓN</div><nav class="nav-group"><a href="#/workflow" data-nav="workflow" class="nav-item ${route.page==='workflow'?'active':''}">${icon('flow')}<span>Flujo de aprobación</span></a>${currentUser.role==='admin'?`<a href="#/users" data-nav="users" class="nav-item ${route.page==='users'?'active':''}">${icon('users')}<span>Usuarios y roles</span></a>`:''}</nav><div class="sidebar-bottom"><div class="sidebar-note"><div class="note-icon">${icon('spark','sm')}</div><strong>Cada acuerdo cuenta.</strong><p>Un flujo conectado para que las<br>mejores ideas sigan avanzando.</p><button class="text-link" data-action="help">Conoce tu espacio ${icon('arrow','sm')}</button></div><div class="user-panel"><div class="flex gap-8"><span class="avatar tone-${PHASE_ROLES.indexOf(currentUser.role)+1}">${initials(currentUser.name)}</span><div class="spacer"><strong>${esc(currentUser.name)}</strong><small>${esc(ROLE_NAMES[currentUser.role])}</small></div><button class="icon-btn" data-action="logout" title="Cerrar sesión" aria-label="Cerrar sesión">${icon('logout','sm')}</button></div><label class="profile-switch" for="role-switch">Vista demo <select id="role-switch" aria-label="Cambiar perfil de demostración">${state.users.filter(u=>u.active).map(u=>`<option value="${esc(u.id)}" ${u.id===currentUser.id?'selected':''}>${esc(ROLE_NAMES[u.role])} · ${esc(u.name)}</option>`).join('')}</select></label></div></div></aside>`;
}

function topbar(){
  const title={dashboard:'Panel general',contracts:'Contratos',reviews:'Mis revisiones',observations:'Observaciones',documents:'Documentos',timeline:'Trazabilidad',workflow:'Flujo de aprobación',users:'Usuarios y roles',new:'Nueva solicitud',detail:'Detalle del contrato'}[route.page];
  return `<header class="topbar"><button class="icon-btn mobile-menu" data-action="open-menu" aria-label="Abrir navegación">${icon('menu')}</button><div class="breadcrumb"><span>Workspace</span>${icon('chevron','sm')}<strong>${title}</strong></div><form class="top-search" id="global-search" role="search">${icon('search','sm')}<label class="sr-only" for="global-query">Buscar un contrato</label><input id="global-query" name="query" placeholder="Buscar un contrato…" autocomplete="off"><kbd class="key-hint">Ctrl K</kbd></form><span class="demo-tag">MODO DEMO</span><span class="top-divider"></span><button class="icon-btn help-btn" data-action="help" aria-label="Ayuda del prototipo">${icon('help')}</button><button class="icon-btn notification-btn" data-action="notifications" aria-label="Notificaciones" aria-expanded="${notificationsOpen}">${icon('bell')}${!state.notificationsRead?'<span class="notification-dot"></span>':''}</button><span class="avatar square tone-4" title="${esc(currentUser.name)}">${initials(currentUser.name)}</span></header>`;
}

function footer(){return `<footer class="page-footer"><span>Caleidos · Gestión contractual <span class="muted">/</span> Hecho para avanzar juntos.</span><span><span class="live-dot"></span> Prototipo · Datos guardados en este navegador</span></footer>`;}
function heading(eyebrow,title,subtitle,actions=''){return `<div class="page-heading"><div><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><p>${subtitle}</p></div>${actions?`<div class="page-actions">${actions}</div>`:''}</div>`;}
function newButton(){return canCreate()?`<button class="btn btn-primary" data-nav="new">${icon('plus','sm')} Nueva solicitud</button>`:'';}
function empty(title,message,action=''){return `<div class="empty-state"><div class="empty-symbol">${icon('folder','lg')}</div><h3>${title}</h3><p>${message}</p>${action}</div>`;}

function dashboard(){
  const cs=state.contracts, review=cs.filter(c=>c.status==='review').length,observed=cs.filter(c=>c.status==='observed').length,approved=cs.filter(c=>['approved','sent','signed'].includes(c.status)).length;
  const stats=[['Total de contratos',cs.length,'file','Visibilidad de principio a fin','En tu workspace'],['En revisión',review,'clock','En el flujo de aprobación','En proceso'],['Con observaciones',observed,'chat','Pendientes de subsanación','Requieren atención'],['Aprobados',approved,'checkfile','Incluye enviados y firmados','Cuatro validaciones']];
  return `${heading('TU ESPACIO, AL DÍA',`Hola, ${esc(currentUser.name.split(' ')[0])}<span class="green">.</span> Todo a la vista.`, 'Cada contrato, cada avance. Así se mueve tu equipo hoy.',`<span class="date-button">${icon('calendar','sm')}${date(localDay(),true)}</span>${newButton()}`)}<div class="stats-grid">${stats.map(([label,n,i,desc,note],idx)=>`<article class="stat-card"><div class="stat-top"><span>${label}</span><span class="stat-icon">${icon(i,'sm')}</span></div><div class="stat-number">${String(n).padStart(2,'0')}</div><div class="stat-bottom"><strong class="${idx===1||idx===2?'orange':''}">${note}</strong></div><div class="stat-bottom" style="margin-top:5px">${desc}</div><svg class="stat-graph" viewBox="0 0 70 32" aria-hidden="true"><path d="M2 29 12 22 23 25 34 12 45 17 57 7 68 3" fill="none" stroke="${['#9ebc8c','#d5bd8a','#d7ad97','#8fb789'][idx]}" stroke-width="1.5"/><path d="M2 29 12 22 23 25 34 12 45 17 57 7 68 3V32H2Z" fill="${['#f1f6eb','#fcf8ef','#fcf5f0','#eff6ec'][idx]}"/></svg></article>`).join('')}</div><div class="dashboard-middle"><section class="card flow-card"><div class="card-header"><div><h2>Un flujo que sigue avanzando</h2><p>Legal → Comercial → Finanzas → Gerencia</p></div><button class="text-link" data-nav="workflow">Ver flujo ${icon('arrow','sm')}</button></div><div class="flow-summary"><strong>${review}</strong><p>contratos en revisión<br>por las áreas responsables</p><span class="spacer"></span><span class="badge approved no-dot">4 etapas conectadas</span></div><div class="flow-track">${PHASES.map((p,i)=>`<button class="flow-stage" data-action="phase-filter" data-phase="${i}" aria-label="Ver contratos en revisión de ${p}"><div class="stage-symbol">${icon(PHASE_ICONS[i])}</div><h3>${p}</h3><p>${['Revisión de cláusulas','Validación del alcance','Validación financiera','Aprobación final'][i]}</p><span class="stage-count">${cs.filter(c=>c.status==='review'&&c.stage===i).length} ${cs.filter(c=>c.status==='review'&&c.stage===i).length===1?'contrato':'contratos'}</span></button>`).join('')}</div><div class="flow-note">${icon('shield','sm')} Cada aprobación queda registrada. Cada versión tiene su historia.</div></section><section class="card activity-card"><div class="card-header"><div><h2>Últimos movimientos</h2><p>Pequeños pasos, grandes acuerdos.</p></div><button class="icon-btn" data-nav="timeline" aria-label="Ver toda la actividad">${icon('arrow','sm')}</button></div><div class="activity-list">${sortedEvents().slice(0,4).map(activityItem).join('')}</div></section></div>${pendingCount()?`<div class="attention-banner"><div class="banner-icon">${icon('spark')}</div><div><p>${pendingCount()} ${pendingCount()===1?'contrato necesita':'contratos necesitan'} tu siguiente paso</p><small>Tu equipo cuenta contigo para seguir avanzando.</small></div><button class="text-link" data-nav="reviews">Ir a mis revisiones ${icon('arrow','sm')}</button></div>`:''}<section class="card table-card"><div class="card-header"><div><h2>Contratos recientes</h2><p>Lo más nuevo en tu espacio de trabajo.</p></div><div class="flex gap-16"><button class="text-link" data-action="export-contracts">${icon('download','sm')} Exportar</button><button class="text-link" data-action="all-contracts">Ver todos ${icon('arrow','sm')}</button></div></div>${contractTable([...cs].sort((a,b)=>new Date(b.created)-new Date(a.created)).slice(0,5))}<div class="table-bottom"><p>Mostrando los 5 contratos más recientes</p><span class="flex gap-6">${icon('lock','sm')} Acceso según tu rol</span></div></section>`;
}

function activityItem(e){return `<div class="activity-item"><div class="activity-icon ${e.type==='observed'?'orange':['signed','sent'].includes(e.type)?'blue':''}">${icon(e.type==='observed'?'chat':['approved','signed'].includes(e.type)?'check':e.type==='sent'?'send':'file','sm')}</div><div class="activity-text"><p><strong>${esc(e.user.split(' ')[0])}</strong> · ${esc(e.action.toLowerCase())}</p><small><button class="text-link text-xs" style="font-size:9px;padding:0" data-contract="${esc(e.contractId)}">${esc(e.client)}</button> <span>· ${date(e.at)}</span></small></div></div>`;}

function contractTable(contracts){
  if(!contracts.length)return empty('Ningún contrato por aquí','Prueba con otro filtro o registra una nueva solicitud.');
  return `<div class="table-wrap"><table class="contracts-table"><thead><tr><th scope="col">CONTRATO / CLIENTE</th><th scope="col">SERVICIO</th><th scope="col">MONTO</th><th scope="col">ESTADO</th><th scope="col">RESPONSABLE</th><th scope="col">REGISTRO</th><th scope="col"><span class="sr-only">Abrir</span></th></tr></thead><tbody>${contracts.map(c=>{const u=ownerFor(c);return `<tr><td><div class="contract-cell"><span class="client-icon">${initials(c.client)}</span><div><button class="contract-title" data-contract="${esc(c.id)}" title="${esc(c.title)}">${esc(c.client)}</button><span class="contract-code">${esc(c.id)} <span>· v${c.versions.length}</span></span></div></div></td><td>${esc(c.service)}</td><td><span class="amount">${money(c)}</span></td><td>${badge(c)}</td><td>${u?`<span class="responsible"><span class="avatar mini-avatar tone-${PHASE_ROLES.indexOf(u.role)+1}">${initials(u.name)}</span>${esc(u.name.split(' ')[0])}</span>`:`<span class="muted">${c.status==='signed'?'Completado':'Comercial'}</span>`}</td><td>${date(c.created)}</td><td><button class="icon-btn" data-contract="${esc(c.id)}" aria-label="Abrir contrato de ${esc(c.client)}">${icon('chevron','sm')}</button></td></tr>`;}).join('')}</tbody></table></div>`;
}

function filteredContracts(){return state.contracts.filter(c=>{
  const match=contractFilter==='all'||contractFilter==='review'&&c.status==='review'||contractFilter==='observed'&&c.status==='observed'||contractFilter==='approved'&&['approved','sent'].includes(c.status)||contractFilter==='signed'&&c.status==='signed';
  return match&&(!phaseFilter||String(c.stage)===phaseFilter&&c.status==='review')&&(!serviceFilter||c.service===serviceFilter)&&`${c.id} ${c.client} ${c.title} ${c.service}`.toLowerCase().includes(searchTerm.toLowerCase());
}).sort((a,b)=>new Date(b.created)-new Date(a.created));}

function contractsPage(){
  const list=filteredContracts(), pages=Math.max(1,Math.ceil(list.length/6));currentPage=Math.min(currentPage,pages);
  const counts={all:state.contracts.length,review:state.contracts.filter(c=>c.status==='review').length,observed:state.contracts.filter(c=>c.status==='observed').length,approved:state.contracts.filter(c=>['approved','sent'].includes(c.status)).length,signed:state.contracts.filter(c=>c.status==='signed').length};
  return `${heading('CADA ACUERDO, EN SU LUGAR','Contratos','De la primera solicitud a la última firma. Sigue cada paso.',newButton())}<div class="tabs" role="tablist" aria-label="Estado de contratos">${[['all','Todos'],['review','En revisión'],['observed','Observados'],['approved','Aprobados'],['signed','Firmados']].map(([id,label])=>`<button class="tab ${contractFilter===id?'active':''}" role="tab" aria-selected="${contractFilter===id}" data-filter="${id}">${label}<span class="tab-count">${counts[id]}</span></button>`).join('')}</div><div class="toolbar"><label class="search-field">${icon('search','sm')}<span class="sr-only">Buscar contratos</span><input id="contract-search" type="search" placeholder="Buscar cliente, contrato o servicio…" value="${esc(searchTerm)}"></label><select id="phase-filter" class="filter-select" aria-label="Filtrar por fase"><option value="">Todas las áreas</option>${PHASES.map((p,i)=>`<option value="${i}" ${phaseFilter===String(i)?'selected':''}>${p}</option>`).join('')}</select><select id="service-filter" class="filter-select" aria-label="Filtrar por servicio"><option value="">Todos los servicios</option>${[...new Set(state.contracts.map(c=>c.service))].map(s=>`<option ${serviceFilter===s?'selected':''}>${esc(s)}</option>`).join('')}</select><span class="spacer"></span><button class="btn btn-secondary" data-action="export-contracts">${icon('download','sm')} Exportar CSV</button></div><section class="card table-card" id="contract-results">${contractResults(list,pages)}</section>`;
}

function contractResults(list=filteredContracts(),pages=Math.max(1,Math.ceil(list.length/6))){currentPage=Math.min(currentPage,pages);return `${contractTable(list.slice((currentPage-1)*6,currentPage*6))}<div class="table-bottom"><p>${list.length?`${(currentPage-1)*6+1}–${Math.min(currentPage*6,list.length)} de ${list.length}`:'0'} contratos</p><div class="pagination"><button data-page="${currentPage-1}" ${currentPage===1?'disabled':''} aria-label="Página anterior">‹</button>${Array.from({length:pages},(_,i)=>`<button class="${currentPage===i+1?'active':''}" data-page="${i+1}" aria-label="Página ${i+1}" ${currentPage===i+1?'aria-current="page"':''}>${i+1}</button>`).join('')}<button data-page="${currentPage+1}" ${currentPage===pages?'disabled':''} aria-label="Página siguiente">›</button></div></div>`;}

function reviewsPage(){
  const cs=state.contracts.filter(needsMe);
  return `${heading('TU SIGUIENTE PASO IMPORTA','Mis revisiones',`${cs.length} ${cs.length===1?'contrato espera':'contratos esperan'} tu atención como ${esc(ROLE_NAMES[currentUser.role])}.`)}<div class="role-notice">${icon('shield')}<span>${currentUser.role==='admin'?'Administración supervisa el flujo. Las aprobaciones corresponden a los responsables de Legal, Comercial, Finanzas y Gerencia.':'Solo puedes validar contratos asignados a tu área en la fase activa.'} Puedes explorar otros perfiles desde «Vista demo», al pie del menú.</span></div>${cs.length?`<div class="review-grid">${cs.map(c=>`<article class="card review-card"><div class="flex between"><span class="review-code">${esc(c.id)}</span>${badge(c)}</div><h3>${esc(c.client)}</h3><p>${esc(c.title)}</p><div class="review-amount">${money(c)}</div><p>${esc(c.service)}</p><div class="review-meta"><span>Versión ${c.versions.length}</span><span>${date(c.created)}</span></div><button class="btn btn-primary" data-contract="${esc(c.id)}">${c.status==='observed'?'Subsanar observaciones':'Revisar contrato'} ${icon('arrow','sm')}</button></article>`).join('')}</div>`:`<section class="card">${empty('Todo al día por aquí','Cuando un contrato llegue a tu área, aparecerá en este espacio.',`<button class="btn btn-secondary" data-action="all-contracts">Explorar contratos ${icon('arrow','sm')}</button>`)}</section>`}`;
}

function uploadField(id='contract-file'){return `<label class="upload-zone" for="${id}"><span class="upload-symbol">${icon('upload')}</span><strong>Arrastra tu contrato o haz clic para adjuntar</strong><p>Documento PDF · Máximo 10 MB</p><span class="file-name" id="${id}-name"></span><input id="${id}" name="file" type="file" accept=".pdf,application/pdf" required aria-label="Adjuntar contrato en formato PDF"></label>`;}

function newPage(){return `<button class="back-link" data-nav="contracts">${icon('back','sm')} Volver a contratos</button>${heading('DA EL PRIMER PASO','Nueva solicitud','Una buena gestión comienza con la información correcta.')}<form id="new-contract-form"><div class="form-layout"><div><section class="card form-section"><div class="section-title"><span class="section-number">01</span><div><h2>Datos del contrato</h2><p>Completa la información principal de la solicitud.</p></div></div><div class="form-grid"><div class="field full"><label for="title">Nombre del contrato <span class="required">*</span></label><input id="title" name="title" maxlength="160" placeholder="Ej. Servicios administrados de infraestructura AWS" required></div><div class="field"><label for="client">Cliente <span class="required">*</span></label><input id="client" name="client" maxlength="100" placeholder="Nombre o razón social" required></div><div class="field"><label for="client-email">Correo del cliente <span class="required">*</span></label><input id="client-email" name="email" type="email" maxlength="150" placeholder="contacto@empresa.com" required></div><div class="field"><label for="service">Tipo de servicio <span class="required">*</span></label><select id="service" name="service" required><option value="">Selecciona un servicio</option>${['Consultoría tecnológica','Migración Cloud','Servicios administrados','Desarrollo de software','Soporte y mantenimiento'].map(s=>`<option>${s}</option>`).join('')}</select></div><div class="field"><label for="amount">Monto del contrato <span class="required">*</span></label><div class="flex gap-8"><select name="currency" aria-label="Moneda" style="width:87px;flex-shrink:0"><option value="USD">USD $</option><option value="PEN">PEN S/</option></select><input id="amount" name="amount" type="number" min="0.01" max="999999999" step="0.01" placeholder="0.00" required></div></div><div class="field"><label for="start">Inicio de vigencia <span class="required">*</span></label><input id="start" name="start" type="date" required></div><div class="field"><label for="end">Fin de vigencia <span class="required">*</span></label><input id="end" name="end" type="date" required></div><div class="field full"><label for="description">Descripción y alcance</label><textarea id="description" name="description" maxlength="2000" placeholder="Describe brevemente el objetivo, alcance y entregables…"></textarea></div></div></section><section class="card form-section"><div class="section-title"><span class="section-number">02</span><div><h2>Documento contractual</h2><p>Esta será la primera versión de tu contrato.</p></div></div>${uploadField()}<div class="field mt-24"><label for="contract-text">Texto de las cláusulas para comparar versiones</label><textarea id="contract-text" name="text" rows="5" maxlength="20000" placeholder="Pega aquí el texto o las cláusulas clave de tu contrato (opcional)."></textarea><small>La comparación usa este texto. El prototipo no extrae automáticamente el contenido del PDF.</small></div><div id="new-error" class="form-error hidden" role="alert"></div></section><div class="form-actions"><button type="button" class="btn btn-secondary" data-nav="contracts">Cancelar</button><button type="submit" class="btn btn-primary" id="submit-contract">Registrar y enviar a Legal ${icon('arrow','sm')}</button></div></div><aside class="card form-summary"><div class="summary-heading"><h3>El camino de tu contrato</h3><p>Una vez registrado, la revisión seguirá esta secuencia.</p></div><div class="vertical-flow">${PHASES.map((p,i)=>`<div class="vertical-stage"><span class="stage-num">0${i+1}</span><div><strong>${p}</strong><small>${['Cláusulas y cumplimiento','Alcance y condiciones','Montos y viabilidad','Validación final'][i]}</small></div></div>`).join('')}</div><div class="summary-footnote">${icon('lock','sm')} El contrato solo será aprobado al completar las cuatro validaciones.</div></aside></div></form>`;}

function detailPage(){
  const c=currentContract();if(!c)return empty('Contrato no encontrado','Regresa al listado para seleccionar un contrato.');
  return `<button class="back-link" data-nav="contracts">${icon('back','sm')} Volver a contratos</button><div class="page-heading detail-heading"><div><div class="eyebrow">${esc(c.id)}</div><h1>${esc(c.title)}</h1><div class="detail-subtitle"><span>${esc(c.client)}</span><span>·</span><span>Versión ${c.versions.length}</span>${badge(c)}</div></div><div class="page-actions"><button class="btn btn-secondary" data-action="view-pdf" data-id="${esc(c.id)}" data-version="${c.versions.length}">${icon('eye','sm')} Ver documento</button>${canVersion(c)?`<button class="btn btn-primary" data-action="new-version">${icon('upload','sm')} Nueva versión</button>`:''}</div></div><section class="card approval-stepper" aria-label="Progreso de aprobación">${PHASES.map((p,i)=>{const a=c.approvals.find(a=>a.phase===i);return `<div class="approval-step ${a?'done':i===c.stage?'current':''}"><div class="step-circle">${a?icon('check','sm'):String(i+1).padStart(2,'0')}</div><div><h3>${p}</h3><p>${a?'Aprobado · '+a.user.split(' ')[0]:i===c.stage?c.status==='observed'?'En subsanación':'Revisión activa':'Por revisar'}</p></div></div>`;}).join('')}</section><div class="tabs" role="tablist" aria-label="Secciones del contrato">${[['summary','Resumen'],['versions','Documentos y versiones'],['observations','Observaciones'],['history','Trazabilidad']].map(([id,label])=>`<button class="tab ${route.tab===id?'active':''}" data-detail-tab="${id}" role="tab" aria-selected="${route.tab===id}">${label}${id==='observations'&&c.observations.length?`<span class="tab-count">${c.observations.length}</span>`:''}</button>`).join('')}</div>${route.tab==='summary'?detailSummary(c):route.tab==='versions'?detailVersions(c):route.tab==='observations'?detailObservations(c):`<section class="card">${timelineHtml(c.events.map(e=>({...e,contractId:c.id,client:c.client})).sort((a,b)=>new Date(b.at)-new Date(a.at)),false)}</section>`}`;
}

function detailSummary(c){return `<div class="detail-layout"><div><section class="card detail-info"><h2>Los detalles del acuerdo</h2><div class="info-grid">${[['Cliente',c.client],['Tipo de servicio',c.service],['Monto del contrato',money(c)],['Solicitante',c.owner],['Inicio de vigencia',date(c.start,true)],['Fin de vigencia',date(c.end,true)],['Correo del cliente',c.email],['Fecha de registro',date(c.created,true)]].map(([label,value])=>`<div class="info-item"><small>${label}</small><p>${esc(value)}</p></div>`).join('')}<div class="info-item full"><small>Descripción y alcance</small><p>${esc(c.description||'Sin descripción adicional.')}</p></div></div></section><section class="card detail-info mt-24"><h2>Última actualización</h2><div class="flex align-start gap-12"><span class="avatar tone-4">${initials(c.events.at(-1).user)}</span><div><p class="text-sm">${esc(c.events.at(-1).action)}</p><p class="text-xs muted mt-8" style="line-height:1.8">${esc(c.events.at(-1).detail)}</p><p class="text-xs muted mt-8">${esc(c.events.at(-1).user)} · ${datetime(c.events.at(-1).at)}</p></div></div></section></div>${decisionCard(c)}</div>`;}

function decisionCard(c){
  let title,text,buttons='',symbol='shield';
  if(canReview(c)){title='Tu validación es el siguiente paso';text=`Revisa la versión ${c.versions.length} antes de aprobar. Puedes solicitar correcciones si encuentras observaciones.`;buttons=`<button class="btn btn-primary" data-action="approve">${icon('check','sm')} Aprobar revisión</button><button class="btn btn-secondary" data-action="observe">${icon('chat','sm')} Solicitar correcciones</button>`;}
  else if(c.status==='observed'){title='Hay detalles por resolver';text='Comercial debe atender las observaciones y adjuntar una nueva versión para retomar el flujo.';symbol='chat';buttons=`<button class="btn btn-secondary" data-detail-tab="observations">Ver observaciones ${icon('arrow','sm')}</button>${isCommercial()?'<button class="btn btn-primary" data-action="new-version">Subir versión corregida</button>':''}`;}
  else if(c.status==='approved'){title='Todo listo para el siguiente sí';text='Las cuatro áreas validaron el contrato. Ya puedes preparar su envío al cliente.';symbol='checkfile';if(isCommercial())buttons=`<button class="btn btn-primary" data-action="send-client">${icon('send','sm')} Preparar envío al cliente</button><button class="btn btn-secondary" data-action="client-observation">Observación del cliente</button>`;}
  else if(c.status==='sent'){title='A un paso del acuerdo';text='El contrato está pendiente de firma. Registra la conformidad o las observaciones del cliente.';symbol='pen';if(isCommercial())buttons=`<button class="btn btn-primary" data-action="sign">${icon('pen','sm')} Registrar firma demo</button><button class="btn btn-secondary" data-action="client-observation">Observación del cliente</button>`;}
  else if(c.status==='signed'){title='Un nuevo acuerdo, cerrado';text=`Firma registrada por ${c.signature?.user||'Comercial'} mediante ${c.signature?.method?.toLowerCase()||'firma de demostración'}.`;symbol='check';buttons=`<button class="btn btn-secondary" data-action="download-pdf" data-id="${esc(c.id)}" data-version="${c.versions.length}">${icon('download','sm')} Descargar documento</button>`;}
  else{title=`En manos de ${PHASES[c.stage]}`;text=`La fase activa corresponde a ${PHASES[c.stage]}. Su responsable debe aprobar o solicitar correcciones para continuar.`;}
  return `<aside class="card decision-card"><div class="decision-icon">${icon(symbol)}</div><div class="decision-body"><h3>${title}</h3><p>${text}</p>${buttons}<small>${c.status==='signed'?'Registro de demostración. No genera una firma electrónica.':'Cada acción se registra con usuario, fecha, hora y versión.'}</small></div></aside>`;
}

function detailVersions(c){return `<div class="flex between wrap gap-12 mb-16"><div class="inline-notice" style="flex:1;margin:0">${icon('compare')}<span>Compara el texto registrado en cada versión. Los PDF se conservan por separado; no se realiza una comparación visual automática.</span></div>${c.versions.length>1?'<button class="btn btn-secondary" data-action="compare">'+icon('compare','sm')+' Comparar versiones</button>':''}</div><div class="version-list">${[...c.versions].reverse().map((v,i)=>`<article class="version-row"><div class="pdf-icon">PDF</div><div class="version-content"><strong>${esc(v.name)} ${i===0?'<span class="badge approved no-dot" style="margin-left:6px">Actual</span>':''}</strong><p>Versión ${v.number} · ${esc(v.user)} · ${datetime(v.at)}${v.demo?' · Documento de ejemplo':''}</p><p>${esc(v.summary)}</p></div><div class="flex gap-6"><button class="icon-btn" data-action="view-pdf" data-id="${esc(c.id)}" data-version="${v.number}" aria-label="Ver versión ${v.number}">${icon('eye','sm')}</button><button class="icon-btn" data-action="download-pdf" data-id="${esc(c.id)}" data-version="${v.number}" aria-label="Descargar versión ${v.number}">${icon('download','sm')}</button></div></article>`).join('')}</div>`;}

function detailObservations(c){return `${canReview(c)?'<div class="flex mb-16" style="justify-content:flex-end"><button class="btn btn-primary" data-action="observe">'+icon('plus','sm')+' Registrar observación</button></div>':''}${c.observations.length? [...c.observations].reverse().map(o=>observationCard(o,c,false)).join(''):`<section class="card">${empty('Sin observaciones','Los comentarios y las solicitudes de corrección aparecerán aquí.')}</section>`}`;}
function observationCard(o,c,link=true){return `<article class="card observation-card"><div class="flex between gap-12"><div class="flex gap-10 gap-12"><span class="avatar tone-${PHASE_ROLES.indexOf(o.role)+1}">${initials(o.user)}</span><div><h3>${esc(o.user)}</h3><p class="text-xs muted mt-8" style="margin-top:4px">${esc(o.category)} · v${o.version}</p></div></div><span class="badge ${o.resolved?'approved':'observed'}">${o.resolved?'Atendida':'Pendiente'}</span></div><p class="observation-text">${esc(o.text)}</p><div class="observation-foot"><span>${datetime(o.at)}${o.resolved?` · Atendida en v${o.resolvedVersion}`:''}</span>${link?`<button class="text-link" data-contract="${esc(c.id)}" data-tab="observations">${esc(c.client)} ${icon('arrow','sm')}</button>`:`<span>${esc(c.id)}</span>`}</div></article>`;}

function observationsPage(){const obs=state.contracts.flatMap(c=>c.observations.map(o=>({o,c}))).sort((a,b)=>Number(a.o.resolved)-Number(b.o.resolved)||new Date(b.o.at)-new Date(a.o.at));return `${heading('CADA COMENTARIO NOS ACERCA','Observaciones','El contexto que necesitas para resolver y seguir avanzando.')}<div class="toolbar"><label class="search-field">${icon('search','sm')}<span class="sr-only">Buscar observaciones</span><input id="observation-search" type="search" placeholder="Buscar por cliente o comentario…"></label><select class="filter-select" id="observation-filter" aria-label="Estado de observación"><option value="all">Todas las observaciones</option><option value="pending">Pendientes</option><option value="resolved">Atendidas</option></select></div><div id="observation-results">${obs.length?obs.map(({o,c})=>observationCard(o,c)).join(''):`<section class="card">${empty('Cada detalle, resuelto','Las observaciones de los revisores y del cliente aparecerán aquí.')}</section>`}</div>`;}

function documentsPage(){return `${heading('LA VERSIÓN CORRECTA, SIEMPRE','Documentos','Un solo lugar para los documentos y sus distintas versiones.')}<div class="toolbar"><label class="search-field">${icon('search','sm')}<span class="sr-only">Buscar documentos</span><input id="document-search" type="search" placeholder="Buscar documento o cliente…"></label><span class="text-xs muted">${state.contracts.reduce((n,c)=>n+c.versions.length,0)} versiones · ${state.contracts.length} contratos</span></div><div class="document-grid" id="document-results">${documentCards('')}</div>`;}
function documentCards(query){const cs=state.contracts.filter(c=>`${c.client} ${c.title} ${c.versions.at(-1).name}`.toLowerCase().includes(query.toLowerCase()));return cs.length?cs.map(c=>{const v=c.versions.at(-1);return `<article class="card document-card"><div class="flex between"><span class="pdf-icon">PDF</span><span class="badge neutral no-dot">v${v.number} · ${c.versions.length} ${c.versions.length===1?'versión':'versiones'}</span></div><h3>${esc(c.client)}</h3><p>${esc(c.title)}</p><p style="margin-top:8px">${esc(c.id)} · ${date(v.at)}</p><div class="document-actions"><button class="btn btn-secondary btn-small" data-action="view-pdf" data-id="${esc(c.id)}" data-version="${v.number}">${icon('eye','sm')} Ver PDF</button><button class="btn btn-ghost btn-small" data-contract="${esc(c.id)}" data-tab="versions">Versiones ${icon('arrow','sm')}</button></div></article>`;}).join(''):empty('Sin documentos coincidentes','Intenta buscar con el nombre de otro cliente.');}

function timelineHtml(events,links=true){return events.length?`<div class="timeline">${events.map(e=>`<article class="timeline-entry"><span class="avatar tone-${PHASE_ROLES.indexOf(e.role)+1}">${initials(e.user)}</span><div class="timeline-content"><h3>${esc(e.action)} ${links?`<button class="text-link" style="font-size:11px;margin-left:8px" data-contract="${esc(e.contractId)}">${esc(e.client)} ${icon('arrow','sm')}</button>`:''}</h3><p>${esc(e.detail)}</p><time datetime="${esc(e.at)}">${esc(e.user)} · ${esc(ROLE_NAMES[e.role]||'Cliente')} · ${datetime(e.at)}</time></div></article>`).join('')}</div>`:empty('Todavía no hay movimientos','Cada acción del equipo quedará registrada aquí.');}
function timelinePage(){return `${heading('NINGÚN PASO SE PIERDE','Trazabilidad','La historia completa de cada contrato, en orden y con contexto.',`<button class="btn btn-secondary" data-action="export-timeline">${icon('download','sm')} Exportar historial</button>`)}<div class="toolbar"><label class="search-field">${icon('search','sm')}<span class="sr-only">Buscar en el historial</span><input id="timeline-search" type="search" placeholder="Buscar cliente, usuario o movimiento…"></label><select class="filter-select" id="timeline-role" aria-label="Filtrar historial por área"><option value="">Todas las áreas</option>${Object.entries(ROLE_NAMES).map(([r,n])=>`<option value="${r}">${n}</option>`).join('')}</select></div><section class="card" id="timeline-results">${timelineHtml(sortedEvents())}</section>`;}

function workflowPage(){return `${heading('CLARIDAD EN CADA ETAPA','Así avanza un acuerdo','Cuatro áreas conectadas. Una secuencia de aprobación transparente.')}<div class="workflow-grid">${PHASES.map((p,i)=>{const u=state.users.find(u=>u.role===PHASE_ROLES[i]&&u.active)||BASE_USERS.find(u=>u.role===PHASE_ROLES[i]);return `<article class="card workflow-card"><div class="flex between workflow-num"><span>ETAPA 0${i+1}</span>${icon(PHASE_ICONS[i])}</div><h3>${p}</h3><p>${['Revisa las cláusulas, obligaciones y el cumplimiento normativo del contrato.','Valida el alcance del servicio, los entregables y las condiciones comerciales.','Verifica los montos, condiciones de pago y la viabilidad financiera.','Otorga la validación final y autoriza el envío del documento al cliente.'][i]}</p><div class="responsible"><span class="avatar tone-${i+1}">${initials(u.name)}</span><div>${esc(u.name)}<p style="font-size:9px;margin-top:3px">Responsable del área</p></div></div></article>`;}).join('')}</div><section class="card routing-panel"><div class="flex gap-8 mb-16"><span class="decision-icon">${icon('spark')}</span><h2>Corregir sin volver a empezar</h2></div><p>Al subir una versión, Comercial identifica las áreas afectadas por el cambio. El contrato regresa a la primera de esas áreas y continúa en orden. Las validaciones anteriores se conservan; esa etapa y las posteriores vuelven a revisar.</p><div class="routing-example"><div><strong>Por ejemplo: cambia la forma de pago</strong>Comercial marca «Finanzas» como área afectada y adjunta el PDF corregido con sus cláusulas actualizadas.</div>${icon('arrow')}<div><strong>La revisión retoma desde Finanzas</strong>Legal y Comercial mantienen su validación. Finanzas y Gerencia revisan la nueva versión, en ese orden.</div></div><div class="inline-notice mt-24" style="margin-bottom:0">${icon('info')}<span>En este MVP el enrutamiento depende de las áreas seleccionadas. La detección semántica de cambios y las firmas digitales reales requieren una integración posterior.</span></div></section><section class="card routing-panel mt-24"><h2>Las reglas que mantienen el orden</h2><div class="help-grid mt-24"><div class="help-item"><strong>Un responsable a la vez</strong>Solo el área de la fase activa puede aprobar o solicitar correcciones.</div><div class="help-item"><strong>Cuatro validaciones para aprobar</strong>El estado «Aprobado» se habilita al completar Legal, Comercial, Finanzas y Gerencia.</div><div class="help-item"><strong>Observaciones con contexto</strong>Cada comentario conserva autor, fecha, categoría y versión del documento.</div><div class="help-item"><strong>Cada versión tiene su historia</strong>Los documentos anteriores y la trazabilidad siguen disponibles para consulta.</div></div></section>`;}

function usersPage(){return `${heading('LAS PERSONAS DETRÁS DE CADA SÍ','Usuarios y roles','Perfiles de demostración y permisos dentro del espacio de trabajo.',`<button class="btn btn-primary" data-action="add-user">${icon('plus','sm')} Nuevo usuario demo</button>`)}<div class="role-notice">${icon('info')}<span>Estos perfiles simulan permisos en el navegador. Todos usan la contraseña <strong>demo1234</strong>. No son cuentas reales.</span></div><section class="card table-card user-table"><div class="table-wrap"><table class="contracts-table"><thead><tr><th>USUARIO</th><th>CORREO</th><th>ROL</th><th>ESTADO</th><th>ACCIÓN</th></tr></thead><tbody>${state.users.map(u=>`<tr class="${u.active?'':'inactive'}"><td><div class="flex gap-12"><span class="avatar tone-${PHASE_ROLES.indexOf(u.role)+1}">${initials(u.name)}</span><span>${esc(u.name)}</span></div></td><td>${esc(u.email)}</td><td>${esc(ROLE_NAMES[u.role])}</td><td><span class="badge ${u.active?'approved':'neutral'}">${u.active?'Activo':'Inactivo'}</span></td><td><button class="btn btn-secondary btn-small" data-action="toggle-user" data-user="${esc(u.id)}" ${u.id===currentUser.id?'disabled title="Tu sesión debe permanecer activa"':''}>${u.active?'Desactivar':'Activar'}</button></td></tr>`).join('')}</tbody></table></div></section><section class="card mt-24"><div class="card-header" style="padding-bottom:20px"><div><h2>Un permiso para cada responsabilidad</h2><p>Todos los perfiles pueden consultar contratos, documentos e historial.</p></div></div><div class="table-wrap">${permissionsTable()}</div></section>`;}
function permissionsTable(){const rows=[['Registrar solicitud',[false,true,false,false,true]],['Aprobar fase activa',[true,true,true,true,false]],['Subsanar y subir versión',[false,true,false,false,false]],['Preparar envío y registrar firma',[false,true,false,false,false]],['Administrar usuarios',[false,false,false,false,true]]];return `<table class="permissions-table"><thead><tr><th>PERMISO</th>${['Legal','Comercial','Finanzas','Gerencia','Admin.'].map(p=>`<th>${p}</th>`).join('')}</tr></thead><tbody>${rows.map(([title,vals])=>`<tr><td>${title}</td>${vals.map(v=>`<td>${v?`${icon('check')}<span class="sr-only">Permitido</span>`:'<span aria-label="Sin permiso">—</span>'}</td>`).join('')}</tr>`).join('')}</tbody></table>`;}

function render(){
  if(!currentUser){loginView();return;}
  if(route.page==='users'&&currentUser.role!=='admin')route.page='dashboard';
  history.replaceState(null,'',route.page==='detail'?`#/contract/${encodeURIComponent(route.id)}/${route.tab}`:`#/${route.page}`);
  const pages={dashboard,contracts:contractsPage,reviews:reviewsPage,observations:observationsPage,documents:documentsPage,timeline:timelinePage,workflow:workflowPage,users:usersPage,new:newPage,detail:detailPage};
  $('#app').innerHTML=`<div class="app-shell">${sidebar()}${topbar()}<main class="main" id="main" tabindex="-1">${(pages[route.page]||dashboard)()}${footer()}</main></div>`;
  document.title=`${{dashboard:'Panel general',contracts:'Contratos',reviews:'Mis revisiones',new:'Nueva solicitud',detail:currentContract()?.client,documents:'Documentos',observations:'Observaciones',timeline:'Trazabilidad',workflow:'Flujo de aprobación',users:'Usuarios y roles'}[route.page]||'Gestión contractual'} · Caleidos`;
  bindPage();if(notificationsOpen)renderNotifications();
}

/* Reglas del flujo. La autorización es una simulación local, no una barrera de seguridad. */
function approveReview(c){
  if(!canReview(c))throw new Error('Solo el responsable de la fase activa puede aprobar esta revisión.');
  if(!Array.from({length:c.stage},(_,i)=>i).every(i=>c.approvals.some(a=>a.phase===i)))throw new Error('Faltan las validaciones de las áreas anteriores.');
  const phase=c.stage;
  c.approvals=c.approvals.filter(a=>a.phase!==phase);
  c.approvals.push({phase,user:currentUser.name,at:now(),version:c.versions.length});
  c.stage=phase+1;
  c.status=c.stage===4&&PHASES.every((_,i)=>c.approvals.some(a=>a.phase===i))?'approved':'review';
  addEvent(c,`Aprobación de ${PHASES[phase]}`,`Versión ${c.versions.length} validada. ${c.status==='approved'?'Las cuatro áreas aprobaron el contrato. Está listo para enviar al cliente.':`La revisión continúa en ${PHASES[c.stage]}.`}`,'approved');
}

function recordObservation(c,text,category,fromClient=false,affected=0){
  if(fromClient?!(isCommercial()&&['approved','sent'].includes(c.status)):!canReview(c))throw new Error('Tu perfil no puede registrar observaciones en esta fase.');
  if(!text.trim())throw new Error('Describe la observación antes de continuar.');
  if(fromClient){if(!Number.isInteger(affected)||affected<0||affected>3)throw new Error('Selecciona un área válida.');c.stage=affected;c.approvals=c.approvals.filter(a=>a.phase<affected);}
  c.observations.push({id:uuid(),text:text.trim(),category,user:currentUser.name,role:fromClient?'client':currentUser.role,at:now(),version:c.versions.length,resolved:false,fromClient});
  c.status='observed';
  addEvent(c,fromClient?'Observación del cliente registrada':'Correcciones solicitadas',`${category}: ${text.trim()}${fromClient?` Revisión requerida desde ${PHASES[affected]}.`:''}`,'observed');
}

function applyVersion(c,version,areas){
  if(!canVersion(c))throw new Error('Solo Comercial puede subir una nueva versión de un contrato abierto.');
  if(!areas.length||areas.some(a=>!Number.isInteger(a)||a<0||a>3))throw new Error('Selecciona al menos un área afectada.');
  const earliest=Math.min(c.stage,...areas),retained=c.approvals.filter(a=>a.phase<earliest);
  c.versions.push(version);c.approvals=retained;c.stage=earliest;c.status='review';
  c.observations.filter(o=>!o.resolved).forEach(o=>{o.resolved=true;o.resolvedVersion=version.number;o.resolvedAt=version.at;});
  addEvent(c,`Nueva versión ${version.number} registrada`,`${version.summary} Revisión desde ${PHASES[earliest]}. ${retained.length?`Se conservaron las aprobaciones de ${retained.map(a=>PHASES[a.phase]).join(', ')}.`:'Se requiere validar las cuatro etapas.'}`,'version');
}

function bindPage(){
  $('#role-switch')?.addEventListener('change',e=>{const u=state.users.find(u=>u.id===e.target.value&&u.active);if(!u)return;closeModal();setSession(u);if(route.page==='new'||route.page==='users')route={page:'dashboard',id:null,tab:'summary'};render();toast(`Vista de demostración: ${ROLE_NAMES[u.role]}.`);});
  $('#global-search')?.addEventListener('submit',e=>{e.preventDefault();const query=String(new FormData(e.currentTarget).get('query')).trim();contractFilter='all';phaseFilter='';serviceFilter='';navigate('contracts');searchTerm=query;render();});
  $('#contract-search')?.addEventListener('input',e=>{searchTerm=e.target.value;currentPage=1;$('#contract-results').innerHTML=contractResults();});
  $('#phase-filter')?.addEventListener('change',e=>{phaseFilter=e.target.value;currentPage=1;$('#contract-results').innerHTML=contractResults();});
  $('#service-filter')?.addEventListener('change',e=>{serviceFilter=e.target.value;currentPage=1;$('#contract-results').innerHTML=contractResults();});
  $('#document-search')?.addEventListener('input',e=>{$('#document-results').innerHTML=documentCards(e.target.value);});
  const filterObs=()=>{const q=($('#observation-search')?.value||'').toLowerCase(),s=$('#observation-filter')?.value;const obs=state.contracts.flatMap(c=>c.observations.map(o=>({o,c}))).filter(({o,c})=>`${o.text} ${c.client} ${o.user}`.toLowerCase().includes(q)&&(s==='all'||(s==='pending'?!o.resolved:o.resolved))).sort((a,b)=>Number(a.o.resolved)-Number(b.o.resolved)||new Date(b.o.at)-new Date(a.o.at));$('#observation-results').innerHTML=obs.length?obs.map(({o,c})=>observationCard(o,c)).join(''):`<section class="card">${empty('No encontramos observaciones','Prueba con otro término o estado.')}</section>`;};
  $('#observation-search')?.addEventListener('input',filterObs);$('#observation-filter')?.addEventListener('change',filterObs);
  const filterTimeline=()=>{const q=($('#timeline-search')?.value||'').toLowerCase(),r=$('#timeline-role')?.value;const es=sortedEvents().filter(e=>`${e.client} ${e.user} ${e.action} ${e.detail}`.toLowerCase().includes(q)&&(!r||e.role===r));$('#timeline-results').innerHTML=timelineHtml(es);};
  $('#timeline-search')?.addEventListener('input',filterTimeline);$('#timeline-role')?.addEventListener('change',filterTimeline);
  $('#new-contract-form')?.addEventListener('submit',createContract);
  $('#start')?.addEventListener('change',e=>{$('#end').min=e.target.value;});
  bindUploads(document);
}

function bindUploads(root){
  $$('input[type="file"]',root).forEach(input=>{
    input.addEventListener('change',()=>{const file=input.files[0],label=$(`#${input.id}-name`);if(label)label.textContent=file?`${file.name} · ${(file.size/1024/1024).toFixed(2)} MB`:'';input.setCustomValidity('');});
    const zone=input.closest('.upload-zone');if(!zone)return;
    zone.addEventListener('dragover',e=>{e.preventDefault();zone.classList.add('drag-over');});
    zone.addEventListener('dragleave',()=>zone.classList.remove('drag-over'));
    zone.addEventListener('drop',e=>{e.preventDefault();zone.classList.remove('drag-over');if(e.dataTransfer.files.length){try{input.files=e.dataTransfer.files;input.dispatchEvent(new Event('change'));}catch{toast('Usa el selector para adjuntar tu PDF.');}}});
  });
}

async function validatePdf(file){
  if(!file)throw new Error('Adjunta el documento PDF para continuar.');
  if(!/\.pdf$/i.test(file.name))throw new Error('El documento debe tener formato PDF (.pdf).');
  if(file.size>10*1024*1024)throw new Error('El PDF supera el límite de 10 MB.');
  const head=new TextDecoder('ascii').decode(await file.slice(0,1024).arrayBuffer());
  if(!head.includes('%PDF-'))throw new Error('El archivo no contiene una cabecera PDF válida. Selecciona un documento PDF.');
}

async function createContract(e){
  e.preventDefault();if(!canCreate())return;
  const form=e.currentTarget,data=new FormData(form),error=$('#new-error'),button=$('#submit-contract');
  error.classList.add('hidden');button.disabled=true;
  try{
    for(const key of ['title','client','email','service'])if(!String(data.get(key)||'').trim())throw new Error('Completa todos los campos obligatorios.');
    if(!data.get('start')||!data.get('end')||String(data.get('end'))<String(data.get('start')))throw new Error('El fin de vigencia debe ser igual o posterior a la fecha de inicio.');
    if(!Number.isFinite(Number(data.get('amount')))||Number(data.get('amount'))<=0)throw new Error('Ingresa un monto mayor a cero.');
    const file=data.get('file');await validatePdf(file);
    const at=now(),year=localDay().slice(0,4),next=Math.max(0,...state.contracts.filter(c=>c.id.startsWith(`CL-${year}-`)).map(c=>Number(c.id.split('-').at(-1))))+1;
    const version={number:1,id:uuid(),name:file.name,size:file.size,at,user:currentUser.name,summary:'Documento inicial de la solicitud.',text:String(data.get('text')||'').trim(),demo:false};
    const stored=await storePdf(version.id,file);
    const c={id:`CL-${year}-${String(next).padStart(4,'0')}`,title:String(data.get('title')).trim(),client:String(data.get('client')).trim(),email:String(data.get('email')).trim(),service:String(data.get('service')),amount:Number(data.get('amount')),currency:String(data.get('currency')),start:String(data.get('start')),end:String(data.get('end')),description:String(data.get('description')).trim(),created:at,updated:at,owner:currentUser.name,status:'review',stage:0,approvals:[],versions:[version],observations:[],events:[]};
    addEvent(c,'Solicitud registrada','Se adjuntó la versión 1 del contrato. Revisión asignada a Legal.','created');
    state.contracts.unshift(c);save();contractFilter='all';navigate('detail',c.id);
    toast(stored?'Solicitud registrada. El contrato ya está en revisión de Legal.':'Solicitud registrada. El PDF estará disponible durante esta sesión.','success');
  }catch(err){error.textContent=err.message;error.classList.remove('hidden');error.scrollIntoView({block:'nearest'});}finally{button.disabled=false;}
}

function openModal(title,body,footer='',wide=false){
  closeModal();previousFocus=document.activeElement;
  $('#modal-root').innerHTML=`<div class="modal-backdrop"><section class="modal ${wide?'wide':''}" role="dialog" aria-modal="true" aria-labelledby="modal-title" tabindex="-1"><header class="modal-header"><h2 id="modal-title">${title}</h2><button class="icon-btn" data-action="close-modal" aria-label="Cerrar ventana">${icon('close')}</button></header><div class="modal-body">${body}</div>${footer?`<footer class="modal-footer">${footer}</footer>`:''}</section></div>`;
  document.body.style.overflow='hidden';
  $('.modal').focus();
  bindUploads($('.modal'));
}
function closeModal(){if(modalCleanup){modalCleanup();modalCleanup=null;}$('#modal-root').innerHTML='';document.body.style.overflow='';if(previousFocus?.isConnected)previousFocus.focus();previousFocus=null;}
function modalError(message){let el=$('#modal-error');if(!el){el=document.createElement('div');el.id='modal-error';el.className='form-error';el.setAttribute('role','alert');$('.modal-body')?.append(el);}el.textContent=message;el.scrollIntoView({block:'nearest'});}
const cancelButton = () => '<button class="btn btn-secondary" data-action="close-modal">Cancelar</button>';

function approveModal(){const c=currentContract();if(!c||!canReview(c)){toast('Solo el área responsable puede aprobar esta fase.','error');return;}openModal(`Validar revisión de ${PHASES[c.stage]}`,`<p class="modal-description">Estás aprobando la <strong>versión ${c.versions.length}</strong> del contrato de <strong>${esc(c.client)}</strong>.</p><div class="inline-notice" style="margin:0">${icon('flow')}<span>${c.stage===3?'Esta es la última validación. El contrato pasará a «Aprobado».':`El contrato avanzará automáticamente a ${PHASES[c.stage+1]}.`} Tu nombre y la fecha quedarán en el historial.</span></div>`,`${cancelButton()}<button class="btn btn-primary" data-action="confirm-approve">${icon('check','sm')} Confirmar aprobación</button>`);}

function observationModal(fromClient=false){
  const c=currentContract();if(!c)return;
  if(fromClient?!(isCommercial()&&['approved','sent'].includes(c.status)):!canReview(c)){toast('Tu perfil no puede registrar esta observación.','error');return;}
  openModal(fromClient?'Registrar observación del cliente':'Cada detalle ayuda a mejorar',`<p class="modal-description">${fromClient?'Registra el comentario recibido del cliente e identifica desde qué área debe revisarse.':'Explica qué debe corregirse en el documento. Comercial recibirá la solicitud de subsanación.'}</p><form id="observation-form"><div class="field"><label for="obs-category">Categoría</label><select id="obs-category" name="category">${['Cláusulas legales','Condiciones comerciales','Condiciones financieras','Alcance del servicio','Observación del cliente','Otros'].map(s=>`<option ${fromClient&&s==='Observación del cliente'?'selected':''}>${s}</option>`).join('')}</select></div>${fromClient?`<div class="field"><label for="obs-area">Primera área afectada</label><select id="obs-area" name="affected">${PHASES.map((p,i)=>`<option value="${i}">${p}</option>`).join('')}</select><small>Esta etapa y las posteriores deberán validar de nuevo.</small></div>`:''}<div class="field"><label for="obs-text">Observación <span class="required">*</span></label><textarea id="obs-text" name="text" rows="5" maxlength="3000" required placeholder="Describe el punto a revisar y la corrección esperada…"></textarea></div></form>`,`${cancelButton()}<button type="submit" form="observation-form" class="btn btn-primary">${icon('chat','sm')} Registrar observación</button>`);
  $('#observation-form').addEventListener('submit',e=>{e.preventDefault();try{const data=new FormData(e.currentTarget);recordObservation(c,String(data.get('text')),String(data.get('category')),fromClient,Number(data.get('affected')||0));save();navigate('detail',c.id,'observations');toast('Observación registrada. El contrato queda pendiente de subsanación.');}catch(err){modalError(err.message);}});
}

function versionModal(){
  const c=currentContract();if(!c||!canVersion(c)){toast('Solo Comercial puede subir una nueva versión.','error');return;}
  openModal('Una nueva versión, un paso adelante',`<p class="modal-description">Adjunta la versión ${c.versions.length+1} de <strong>${esc(c.client)}</strong> y señala qué áreas deben revisar los cambios.</p><form id="version-form">${uploadField('version-file')}<div class="field mt-24"><label for="version-summary">Resumen de cambios <span class="required">*</span></label><input id="version-summary" name="summary" maxlength="300" required placeholder="Ej. Se actualizó el plazo de pago a 30 días."></div><fieldset style="border:0;padding:0;margin:18px 0"><legend class="field-label">Áreas afectadas <span class="required">*</span></legend><div class="checkbox-grid">${PHASES.map((p,i)=>`<label class="check-label"><input type="checkbox" name="area" value="${i}" ${i===Math.min(c.stage,3)?'checked':''}> ${p}</label>`).join('')}</div><p class="text-xs muted mt-8" style="line-height:1.8">El flujo volverá a la primera área afectada. Una revisión pendiente anterior también debe completarse.</p></fieldset><div class="field"><label for="version-text">Texto actualizado de las cláusulas</label><textarea id="version-text" name="text" rows="6" maxlength="20000" placeholder="Pega el texto actualizado para compararlo con la versión anterior.">${esc(c.versions.at(-1).text||'')}</textarea><small>Edita el texto para que la comparación muestre los cambios reales. No se extrae texto del PDF.</small></div></form>`,`${cancelButton()}<button type="submit" form="version-form" class="btn btn-primary" id="save-version">${icon('upload','sm')} Subir y retomar revisión</button>`);
  $('#version-form').addEventListener('submit',async e=>{
    e.preventDefault();const button=$('#save-version');button.disabled=true;
    try{const data=new FormData(e.currentTarget),areas=data.getAll('area').map(Number);if(!areas.length)throw new Error('Selecciona al menos un área afectada.');if(!String(data.get('summary')).trim())throw new Error('Describe los cambios de esta versión.');const file=data.get('file');await validatePdf(file);const v={number:c.versions.length+1,id:uuid(),name:file.name,size:file.size,at:now(),user:currentUser.name,summary:String(data.get('summary')).trim(),text:String(data.get('text')).trim(),demo:false};const stored=await storePdf(v.id,file);applyVersion(c,v,areas);save();navigate('detail',c.id,'versions');toast(`Versión ${v.number} registrada. La revisión continúa desde ${PHASES[c.stage]}.${stored?'':' PDF disponible durante esta sesión.'}`);}catch(err){modalError(err.message);}finally{button.disabled=false;}
  });
}

function sendModal(){
  const c=currentContract();if(!c||!isCommercial()||c.status!=='approved')return;
  openModal('El siguiente paso: tu cliente',`<p class="modal-description">El contrato ya tiene las cuatro validaciones. Prepara un registro de envío para el cliente.</p><form id="send-form"><div class="field"><label for="send-email">Correo del destinatario</label><input id="send-email" name="email" type="email" value="${esc(c.email)}" required maxlength="150"></div><div class="field"><label>Documento</label><div class="version-row"><span class="pdf-icon">PDF</span><span class="text-sm">${esc(c.client)} · Versión ${c.versions.length}</span></div></div><div class="inline-notice" style="margin:0">${icon('info')}<span>Este botón simula el envío y actualiza el estado. No se envían correos electrónicos ni documentos fuera de este navegador.</span></div></form>`,`${cancelButton()}<button type="submit" form="send-form" class="btn btn-primary">${icon('send','sm')} Simular envío al cliente</button>`);
  $('#send-form').addEventListener('submit',e=>{e.preventDefault();if(!isCommercial()||c.status!=='approved')return;c.email=String(new FormData(e.currentTarget).get('email')).trim();c.status='sent';addEvent(c,'Envío al cliente simulado',`Se registró ${c.email} como destinatario de la versión ${c.versions.length}. No se envió ningún correo real.`,'sent');save();closeModal();render();toast('Envío simulado. El contrato queda pendiente de firma.');});
}

function signModal(){
  const c=currentContract();if(!c||!isCommercial()||c.status!=='sent')return;
  openModal('Un nuevo acuerdo para celebrar',`<p class="modal-description">Registra la modalidad de firma para completar el recorrido de este contrato en la demostración.</p><form id="sign-form"><div class="field"><label for="sign-method">Modalidad de firma</label><select id="sign-method" name="method"><option>Firma manual</option><option>Herramienta de firma digital del cliente</option><option>Firma digital de Gerencia</option></select></div><div class="inline-notice" style="margin:0">${icon('info')}<span>Se creará un registro de demostración. No se aplica una firma electrónica ni se modifica el PDF original.</span></div></form>`,`${cancelButton()}<button type="submit" form="sign-form" class="btn btn-primary">${icon('check','sm')} Completar firma demo</button>`);
  $('#sign-form').addEventListener('submit',e=>{e.preventDefault();if(!isCommercial()||c.status!=='sent')return;const method=String(new FormData(e.currentTarget).get('method'));c.status='signed';c.signature={method,at:now(),user:currentUser.name};addEvent(c,'Firma registrada (demo)',`Modalidad: ${method}. Registro de demostración; el PDF original no se modificó.`,'signed');save();closeModal();render();toast('¡Acuerdo completado! La firma demo quedó en el historial.');});
}

/* Archivos locales: IndexedDB evita guardar documentos grandes en localStorage. */
let dbPromise;
function openDatabase(){
  if(!dbPromise)dbPromise=new Promise(resolve=>{
    if(!globalThis.indexedDB){resolve(null);return;}
    try{const request=indexedDB.open('caleidos-documents-v1',1);request.onupgradeneeded=()=>{if(!request.result.objectStoreNames.contains('pdfs'))request.result.createObjectStore('pdfs');};request.onsuccess=()=>{const db=request.result;db.onversionchange=()=>db.close();resolve(db);};request.onerror=()=>resolve(null);request.onblocked=()=>resolve(null);}catch{resolve(null);}
  });return dbPromise;
}
async function storePdf(id,file){
  transientFiles.set(id,file);
  const db=await openDatabase();if(!db)return false;
  return new Promise(resolve=>{try{const tx=db.transaction('pdfs','readwrite');tx.objectStore('pdfs').put(file,id);tx.oncomplete=()=>resolve(true);tx.onerror=()=>resolve(false);tx.onabort=()=>resolve(false);}catch{resolve(false);}});
}
async function getPdf(c,v){
  if(v.demo)return makeDemoPdf(c,v);
  if(transientFiles.has(v.id))return transientFiles.get(v.id);
  const db=await openDatabase();if(!db)return null;
  return new Promise(resolve=>{try{const req=db.transaction('pdfs','readonly').objectStore('pdfs').get(v.id);req.onsuccess=()=>resolve(req.result||null);req.onerror=()=>resolve(null);}catch{resolve(null);}});
}

function makeDemoPdf(c,v){
  const ascii=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^\x20-\x7E\n]/g,' ');
  const raw=ascii(`CALEIDOS | DOCUMENTO DE DEMOSTRACION\n\n${c.id} - VERSION ${v.number}\n${c.title}\n\n${v.text||`Cliente: ${c.client}\nServicio: ${c.service}\nMonto: ${money(c)}\nVigencia: ${c.start} a ${c.end}`}\n\nResumen: ${v.summary}\n\nEste PDF es un ejemplo ficticio del prototipo.\nNo constituye un contrato legal ni contiene una firma real.`);
  const lines=raw.split('\n').flatMap(line=>line.match(/.{1,83}(?:\s|$)|.{1,83}/g)||['']);
  const chunks=[];for(let i=0;i<lines.length;i+=43)chunks.push(lines.slice(i,i+43));
  const objects=['','<< /Type /Catalog /Pages 2 0 R >>','','<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>'];
  const kids=[];
  chunks.forEach((chunk,i)=>{const page=objects.length,content=page+1;kids.push(`${page} 0 R`);objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R >> >> /Contents ${content} 0 R >>`);const commands=`BT /F1 10 Tf 48 790 Td 16 TL\n${chunk.map((line,j)=>`${j?'T* ':''}(${line.replace(/[\\()]/g,'\\$&')}) Tj`).join('\n')}\nET`;objects.push(`<< /Length ${commands.length} >>\nstream\n${commands}\nendstream`);});
  objects[2]=`<< /Type /Pages /Kids [${kids.join(' ')}] /Count ${kids.length} >>`;
  let pdf='%PDF-1.4\n',offsets=[0];for(let i=1;i<objects.length;i++){offsets[i]=pdf.length;pdf+=`${i} 0 obj\n${objects[i]}\nendobj\n`;}
  const xref=pdf.length;pdf+=`xref\n0 ${objects.length}\n0000000000 65535 f \n${offsets.slice(1).map(n=>`${String(n).padStart(10,'0')} 00000 n \n`).join('')}trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return new Blob([pdf],{type:'application/pdf'});
}

function downloadBlob(blob,name){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.style.display='none';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);}
async function pdfAction(id,number,download=false){
  const c=state.contracts.find(c=>c.id===id),v=c?.versions.find(v=>v.number===Number(number));if(!c||!v)return;
  const blob=await getPdf(c,v);if(!blob){toast('El PDF no está disponible en este navegador. Vuelve a adjuntarlo como una nueva versión.','error');return;}
  if(download){downloadBlob(blob,v.name);toast('Documento preparado para descargar.');return;}
  const url=URL.createObjectURL(blob);
  const hasText=Boolean(v.text);
  openModal(`Documento · Versión ${v.number}`,`<div class="flex between wrap gap-12 mb-16"><p class="text-xs muted" style="overflow-wrap:anywhere">${esc(c.client)} · ${esc(v.name)}${v.demo?' · PDF de ejemplo':''}</p><a class="text-link" href="${url}" target="_blank" rel="noopener">Abrir PDF original ${icon('arrow','sm')}</a></div>${hasText?`<div class="tabs" role="tablist" aria-label="Vista del documento" style="margin-bottom:16px"><button class="tab active" role="tab" aria-selected="true" data-action="pdf-toggle" data-pane="text">Vista rápida</button><button class="tab" role="tab" aria-selected="false" data-action="pdf-toggle" data-pane="original">PDF original</button></div><div id="pdf-text"><div class="inline-notice">${icon('info','sm')}<span>Texto registrado para esta versión. Consulta el PDF original para verificar todo el documento.</span></div><div class="document-paper"><div class="eyebrow green">CALEIDOS · ${esc(c.id)} · V${v.number}</div><h3>${esc(c.title)}</h3><pre>${esc(v.text)}</pre><div class="document-paper-foot">${v.demo?'Documento ficticio de demostración.':'Vista rápida del texto introducido manualmente.'}</div></div></div>`:''}<div id="pdf-original" class="${hasText?'hidden':''}"><p class="text-xs muted mb-16" style="line-height:1.7">Si el visor no carga, usa «Abrir PDF original» o «Descargar PDF» para consultarlo en tu lector.</p><object class="pdf-frame" data="${url}" type="application/pdf" aria-label="Vista previa del contrato PDF"><p>Tu navegador no muestra PDF integrados. <a href="${url}" download="${esc(v.name)}">Descargar el documento</a> para abrirlo.</p></object></div>`,`<button class="btn btn-secondary" data-action="close-modal">Cerrar</button><button class="btn btn-primary" data-action="download-pdf" data-id="${esc(c.id)}" data-version="${v.number}">${icon('download','sm')} Descargar PDF</button>`,true);
  modalCleanup=()=>URL.revokeObjectURL(url);
}

/* Comparación línea a línea del texto introducido, usando subsecuencia común. */
function diffText(oldText,newText){
  const toLines=s=>{const lines=s.replace(/\r/g,'').split('\n');return lines.length>300?[...lines.slice(0,299),lines.slice(299).join('\n')]:lines;};
  const a=toLines(oldText),b=toLines(newText),dp=Array.from({length:a.length+1},()=>new Uint16Array(b.length+1));
  for(let i=a.length-1;i>=0;i--)for(let j=b.length-1;j>=0;j--)dp[i][j]=a[i]===b[j]?dp[i+1][j+1]+1:Math.max(dp[i+1][j],dp[i][j+1]);
  let i=0,j=0;const left=[],right=[];
  while(i<a.length||j<b.length){
    if(i<a.length&&j<b.length&&a[i]===b[j]){left.push({text:a[i++],type:''});right.push({text:b[j++],type:''});}
    else if(i<a.length&&(j>=b.length||dp[i+1][j]>=dp[i][j+1])){left.push({text:a[i++],type:'removed'});right.push({text:'',type:''});}
    else{left.push({text:'',type:''});right.push({text:b[j++],type:'added'});}
  }return {left,right};
}
function comparisonHtml(c,oldNumber,newNumber){
  const a=c.versions.find(v=>v.number===Number(oldNumber)),b=c.versions.find(v=>v.number===Number(newNumber));
  if(a===b)return '<div class="inline-notice">Selecciona dos versiones distintas para ver los cambios.</div>';
  if(!a?.text&&!b?.text)return empty('Estas versiones no tienen texto registrado','Puedes consultar sus PDF. Para comparar cambios, incluye el texto de las cláusulas al subir una versión.');
  const diff=diffText(a?.text||'',b?.text||'');
  return `<div class="diff-grid">${[[a,diff.left],[b,diff.right]].map(([v,lines])=>`<div class="diff-pane"><div class="diff-title">Versión ${v.number} · ${esc(v.user)}</div><div class="diff-lines">${lines.map(l=>`<div class="diff-line ${l.type}">${esc(l.text)||'&nbsp;'}</div>`).join('')}</div></div>`).join('')}</div><p class="diff-legend"><span style="color:#b47961">− Texto retirado</span> <span style="margin-left:15px;color:#78974f">+ Texto agregado</span><br>Comparación del texto registrado manualmente. Verifica también el contenido de los PDF.</p>`;
}
function compareModal(){const c=currentContract();if(!c||c.versions.length<2)return;openModal('Lo que cambió, a la vista',`<div class="diff-controls"><div class="field"><label for="compare-old">Versión anterior</label><select id="compare-old">${c.versions.map(v=>`<option value="${v.number}" ${v.number===c.versions.length-1?'selected':''}>Versión ${v.number}</option>`).join('')}</select></div><div class="field"><label for="compare-new">Versión a comparar</label><select id="compare-new">${c.versions.map(v=>`<option value="${v.number}" ${v.number===c.versions.length?'selected':''}>Versión ${v.number}</option>`).join('')}</select></div></div><div id="diff-result">${comparisonHtml(c,c.versions.length-1,c.versions.length)}</div>`,`<button class="btn btn-secondary" data-action="close-modal">Cerrar comparación</button>`,true);const update=()=>{$('#diff-result').innerHTML=comparisonHtml(c,$('#compare-old').value,$('#compare-new').value);};$('#compare-old').addEventListener('change',update);$('#compare-new').addEventListener('change',update);}

function exportCsv(rows,filename){const csv='\uFEFF'+rows.map(row=>row.map(cell=>{let v=String(cell??'');if(/^[=+@\-\t\r]/.test(v))v="'"+v;return `"${v.replace(/"/g,'""')}"`;}).join(';')).join('\r\n');downloadBlob(new Blob([csv],{type:'text/csv;charset=utf-8;'}),filename);toast('Archivo CSV preparado para descargar.');}
function exportContracts(){const cs=route.page==='contracts'?filteredContracts():state.contracts;exportCsv([['Código','Cliente','Contrato','Servicio','Monto','Moneda','Estado','Área activa','Versión','Inicio','Fin','Registro'],...cs.map(c=>[c.id,c.client,c.title,c.service,c.amount,c.currency,statusLabel(c),PHASES[c.stage]||'Completado',c.versions.length,c.start,c.end,datetime(c.created)])],`caleidos-contratos-${localDay()}.csv`);}

function renderNotifications(){
  $('.notifications-panel')?.remove();if(!notificationsOpen)return;
  const es=sortedEvents().slice(0,6);
  const panel=document.createElement('section');panel.className='notifications-panel';panel.setAttribute('aria-label','Notificaciones');panel.innerHTML=`<div class="card-header"><h2>Así se mueve tu equipo</h2><button class="icon-btn" data-action="notifications" aria-label="Cerrar notificaciones">${icon('close','sm')}</button></div><div class="activity-list">${es.map(activityItem).join('')}</div><div style="padding:14px 23px;border-top:1px solid var(--line)"><button class="text-link" data-nav="timeline">Ver toda la actividad ${icon('arrow','sm')}</button></div>`;$('.app-shell').append(panel);
}

function helpModal(){openModal('Tu espacio para avanzar juntos',`<p class="modal-description">Este prototipo permite recorrer el ciclo contractual de Caleidos sin instalar herramientas ni conectar un servidor.</p><div class="help-grid"><div class="help-item">${icon('plus')}<strong>1. Registra un contrato</strong>Desde Comercial, completa sus datos y adjunta un PDF.</div><div class="help-item">${icon('users')}<strong>2. Cambia de perfil</strong>Usa «Vista demo» al pie del menú para entrar como Legal, Comercial, Finanzas o Gerencia.</div><div class="help-item">${icon('checkfile')}<strong>3. Revisa y valida</strong>Aprueba la fase activa o solicita correcciones con una observación.</div><div class="help-item">${icon('compare')}<strong>4. Compara y continúa</strong>Comercial sube una versión corregida y elige las áreas afectadas.</div></div><details class="help-details"><summary>Qué incluye esta demostración</summary><p>Acceso con cuentas de prueba, permisos visuales por rol, adjuntos PDF locales, aprobaciones, versiones, comparación de texto, observaciones, historial y exportación CSV. Los datos se guardan en el navegador. No hay autenticación segura, correos, base de datos compartida ni firma electrónica real.</p></details><details class="help-details"><summary>¿Cómo recuperar el acceso?</summary><p>Selecciona un perfil de prueba en el inicio de sesión. Todos usan demo1234. El administrador puede crear o activar otros usuarios demo.</p></details><details class="help-details"><summary>Restablecer los datos de prueba</summary><p>Esta acción borra los contratos y PDF guardados por este prototipo en este navegador y recupera los ejemplos originales.</p><button class="btn btn-danger btn-small mt-16" data-action="reset">Restablecer demostración</button></details>`,`<button class="btn btn-primary" data-action="close-modal">Entendido ${icon('check','sm')}</button>`,true);}

function addUserModal(){
  if(currentUser?.role!=='admin')return;
  openModal('Una persona más para avanzar',`<p class="modal-description">Crea un perfil local de demostración. Su contraseña será <strong>demo1234</strong>.</p><form id="user-form"><div class="field"><label for="user-name">Nombre completo</label><input id="user-name" name="name" required maxlength="80" placeholder="Nombre y apellido"></div><div class="field"><label for="user-email">Correo electrónico</label><input id="user-email" name="email" type="email" required maxlength="150" placeholder="nombre@caleidos.pe"></div><div class="field"><label for="user-role">Rol asignado</label><select id="user-role" name="role">${Object.entries(ROLE_NAMES).map(([r,n])=>`<option value="${r}">${n}</option>`).join('')}</select></div></form>`,`${cancelButton()}<button type="submit" form="user-form" class="btn btn-primary">Crear usuario demo</button>`);
  $('#user-form').addEventListener('submit',e=>{e.preventDefault();if(currentUser.role!=='admin')return;const data=new FormData(e.currentTarget),email=String(data.get('email')).trim().toLowerCase(),name=String(data.get('name')).trim(),role=String(data.get('role'));if(!name){modalError('Ingresa un nombre.');return;}if(state.users.some(u=>u.email.toLowerCase()===email)){modalError('Ya existe un usuario con ese correo.');return;}if(!ROLE_NAMES[role])return;state.users.push({id:uuid(),name,email,role,active:true});save();closeModal();render();toast('Perfil creado. Ya puedes seleccionarlo en la vista demo.');});
}

function resetModal(){openModal('Volver al punto de partida',`<p class="modal-description">Se eliminarán los contratos, usuarios y PDF locales de esta demostración. Recuperarás los 12 contratos de ejemplo.</p>`,`${cancelButton()}<button class="btn btn-danger" data-action="confirm-reset">Sí, restablecer la demo</button>`);}

document.addEventListener('click',async e=>{
  const nav=e.target.closest('[data-nav]');if(nav){e.preventDefault();navigate(nav.dataset.nav);return;}
  const contract=e.target.closest('[data-contract]');if(contract){e.preventDefault();navigate('detail',contract.dataset.contract,contract.dataset.tab||'summary');return;}
  const tab=e.target.closest('[data-detail-tab]');if(tab){navigate('detail',route.id,tab.dataset.detailTab);return;}
  const filter=e.target.closest('[data-filter]');if(filter){contractFilter=filter.dataset.filter;phaseFilter='';currentPage=1;render();return;}
  const page=e.target.closest('[data-page]');if(page&&!page.disabled){currentPage=Number(page.dataset.page);$('#contract-results').innerHTML=contractResults();return;}
  const button=e.target.closest('[data-action]');
  if(!button){if(e.target.classList.contains('modal-backdrop'))closeModal();if(notificationsOpen&&!e.target.closest('.notifications-panel')){notificationsOpen=false;renderNotifications();$('.notification-btn')?.setAttribute('aria-expanded','false');}return;}
  const action=button.dataset.action,c=currentContract();
  try{
    switch(action){
      case 'toggle-password':{const input=$('#login-password'),show=input.type==='password';input.type=show?'text':'password';button.setAttribute('aria-pressed',String(show));button.setAttribute('aria-label',show?'Ocultar contraseña':'Mostrar contraseña');break;}
      case 'login-help':openModal('Un acceso para cada área',`<p class="modal-description">Elige uno de los perfiles de prueba del formulario de acceso. Todos usan la contraseña <strong>demo1234</strong>.</p><p class="text-sm muted" style="line-height:1.8">Este es un prototipo sin backend. No envía correos de recuperación ni utiliza credenciales reales.</p>`,`<button class="btn btn-primary" data-action="close-modal">Entendido</button>`);break;
      case 'logout':currentUser=null;try{sessionStorage.removeItem(SESSION_KEY);}catch{}route={page:'dashboard',id:null,tab:'summary'};history.replaceState(null,'','#/dashboard');render();break;
      case 'open-menu':$('.sidebar').classList.add('open');$('.mobile-overlay').classList.add('show');break;
      case 'close-menu':$('.sidebar').classList.remove('open');$('.mobile-overlay').classList.remove('show');break;
      case 'help':helpModal();break;
      case 'close-modal':closeModal();break;
      case 'all-contracts':contractFilter='all';phaseFilter='';serviceFilter='';navigate('contracts');break;
      case 'phase-filter':contractFilter='review';phaseFilter=button.dataset.phase;serviceFilter='';navigate('contracts');break;
      case 'export-contracts':exportContracts();break;
      case 'export-timeline':exportCsv([['Fecha y hora','Contrato','Cliente','Usuario','Área','Acción','Detalle'],...sortedEvents().map(e=>[datetime(e.at),e.contractId,e.client,e.user,ROLE_NAMES[e.role]||'Cliente',e.action,e.detail])],`caleidos-historial-${localDay()}.csv`);break;
      case 'notifications':notificationsOpen=!notificationsOpen;if(notificationsOpen){state.notificationsRead=true;save();$('.notification-dot')?.remove();}renderNotifications();$('.notification-btn')?.setAttribute('aria-expanded',String(notificationsOpen));break;
      case 'approve':approveModal();break;
      case 'confirm-approve':if(!c)break;approveReview(c);save();closeModal();render();toast(c.status==='approved'?'Cuatro validaciones completadas. El contrato está aprobado.':`Revisión aprobada. El contrato avanza a ${PHASES[c.stage]}.`);break;
      case 'observe':observationModal();break;
      case 'client-observation':observationModal(true);break;
      case 'new-version':versionModal();break;
      case 'compare':compareModal();break;
      case 'view-pdf':await pdfAction(button.dataset.id,button.dataset.version);break;
      case 'download-pdf':await pdfAction(button.dataset.id,button.dataset.version,true);break;
      case 'pdf-toggle':{const text=button.dataset.pane==='text';$('#pdf-text')?.classList.toggle('hidden',!text);$('#pdf-original')?.classList.toggle('hidden',text);$$('[data-action="pdf-toggle"]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-selected',String(b===button));});break;}
      case 'send-client':sendModal();break;
      case 'sign':signModal();break;
      case 'add-user':addUserModal();break;
      case 'toggle-user':{if(currentUser?.role!=='admin')break;const u=state.users.find(u=>u.id===button.dataset.user);if(!u||u.id===currentUser.id)break;if(u.active&&state.users.filter(v=>v.role===u.role&&v.active).length===1){toast('Debe quedar al menos un perfil activo por área. Crea otro usuario de este rol antes de desactivarlo.','error');break;}u.active=!u.active;save();render();toast(`Usuario ${u.active?'activado':'desactivado'}.`);break;}
      case 'reset':resetModal();break;
      case 'confirm-reset':{const db=await openDatabase();if(db)await new Promise((resolve,reject)=>{const tx=db.transaction('pdfs','readwrite');tx.objectStore('pdfs').clear();tx.oncomplete=resolve;tx.onerror=()=>reject(new Error('No se pudieron eliminar los documentos locales. Inténtalo de nuevo.'));});transientFiles.clear();state=seedState();setSession(state.users[0]);save();closeModal();navigate('dashboard');toast('Todo listo. Recuperamos los datos de demostración.');break;}
    }
  }catch(err){toast(err.message||'No se pudo completar la acción. Inténtalo de nuevo.','error');}
});

document.addEventListener('keydown',e=>{
  if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();$('#global-query')?.focus();return;}
  const modal=$('.modal');
  if(e.key==='Escape'){if(modal)closeModal();else if(notificationsOpen){notificationsOpen=false;renderNotifications();$('.notification-btn')?.setAttribute('aria-expanded','false');}else{$('.sidebar')?.classList.remove('open');$('.mobile-overlay')?.classList.remove('show');}}
  if(modal&&e.key==='Tab'){
    const focusables=$$('button:not(:disabled),a[href],input:not(:disabled),select:not(:disabled),textarea:not(:disabled),[tabindex="0"]',modal).filter(el=>el.getClientRects().length);
    if(!focusables.length){e.preventDefault();return;}
    const first=focusables[0],last=focusables.at(-1);
    if(e.shiftKey&&(document.activeElement===first||document.activeElement===modal)){e.preventDefault();last.focus();}else if(!e.shiftKey&&(document.activeElement===last||document.activeElement===modal)){e.preventDefault();first.focus();}
  }
});
window.addEventListener('hashchange',()=>{if(currentUser){closeModal();routeFromHash();render();}});

// Inicio de la aplicación.
if(currentUser)routeFromHash();
render();
