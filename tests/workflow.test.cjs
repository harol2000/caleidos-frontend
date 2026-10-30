/* Pruebas de reglas de negocio usando el motor real del frontend, sin dependencias. */
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const {webcrypto}=require('node:crypto');
const source=fs.readFileSync(path.join(__dirname,'../app.js'),'utf8').split('// Inicio de la aplicación.')[0];
function fixture(){
  const storage={getItem:()=>null,setItem:()=>{},removeItem:()=>{}};
  const context=vm.createContext({localStorage:storage,sessionStorage:storage,crypto:webcrypto,Blob,TextDecoder,URL,setTimeout,clearTimeout,console,document:{addEventListener:()=>{}},window:{addEventListener:()=>{}}});
  vm.runInContext(source,context);
  const run=code=>vm.runInContext(code,context);
  run("currentUser=state.users.find(u=>u.role==='legal');let c=state.contracts.find(c=>c.stage===0&&c.status==='review');");
  return run;
}
test('los datos de demostración cumplen los estados y tienen fechas válidas',()=>{
  const run=fixture();assert.equal(run('state.contracts.length'),12);
  assert.equal(run('state.contracts.every(c=>c.events.every(e=>!Number.isNaN(new Date(e.at).getTime())))'),true);
  assert.equal(run("state.contracts.filter(c=>['approved','sent','signed'].includes(c.status)).every(c=>c.approvals.length===4&&c.stage===4)"),true);
});
test('no se puede aprobar fuera de la fase o con el rol de administrador',()=>{
  const run=fixture();
  for(const role of ['commercial','finance','management','admin']){
    run(`currentUser=state.users.find(u=>u.role==='${role}');`);
    assert.throws(()=>run('approveReview(c)'),/responsable/);
  }
  assert.equal(run('c.stage'),0);assert.equal(run('c.approvals.length'),0);
});
test('cuatro validaciones secuenciales son necesarias para aprobar',()=>{
  const run=fixture();
  ['legal','commercial','finance','management'].forEach((role,i)=>{
    run(`currentUser=state.users.find(u=>u.role==='${role}');approveReview(c);`);
    assert.equal(run('c.stage'),i+1);assert.equal(run('c.approvals.length'),i+1);
    assert.equal(run('c.status'),i===3?'approved':'review');
  });
  assert.throws(()=>run('approveReview(c)'),/responsable/);
});
test('solicitar correcciones bloquea la aprobación y conserva el autor',()=>{
  const run=fixture();
  assert.throws(()=>run("recordObservation(c,'   ','Legal')"),/Describe/);
  run("recordObservation(c,'Revisar cláusula de pago','Condiciones financieras');");
  assert.equal(run('c.status'),'observed');assert.equal(run('c.observations.at(-1).user'),'Diego Mendoza');
  assert.throws(()=>run('approveReview(c)'),/responsable/);
});
test('solo Comercial puede corregir y una versión no puede saltar una fase pendiente',()=>{
  const run=fixture();
  assert.throws(()=>run("applyVersion(c,{number:4},[2])"),/Comercial/);
  run("currentUser=state.users.find(u=>u.role==='commercial');");
  assert.throws(()=>run("applyVersion(c,{number:4},[])"),/área/);
  run("applyVersion(c,{number:4,id:'test',at:now(),user:currentUser.name,summary:'Cambio de pago',text:'Pago a 30 días'},[2]);");
  assert.equal(run('c.stage'),0);assert.equal(run('c.status'),'review');
});
test('un cambio financiero conserva las aprobaciones anteriores y exige las posteriores',()=>{
  const run=fixture();
  run("c=state.contracts.find(c=>c.status==='approved');currentUser=state.users.find(u=>u.role==='commercial');applyVersion(c,{number:c.versions.length+1,id:'test',at:now(),user:currentUser.name,summary:'Pago actualizado',text:'Pago a 15 días'},[2]);");
  assert.equal(run('c.stage'),2);assert.equal(run('c.approvals.length'),2);assert.equal(run('c.status'),'review');
  run("currentUser=state.users.find(u=>u.role==='finance');approveReview(c);");assert.equal(run('c.status'),'review');
  run("currentUser=state.users.find(u=>u.role==='management');approveReview(c);");assert.equal(run('c.status'),'approved');
});
test('la observación del cliente regresa al área indicada y se atiende con una versión',()=>{
  const run=fixture();
  run("c=state.contracts.find(c=>c.status==='sent');currentUser=state.users.find(u=>u.role==='commercial');recordObservation(c,'Modificar el plazo','Observación del cliente',true,2);");
  assert.equal(run('c.stage'),2);assert.equal(run('c.approvals.length'),2);assert.equal(run('c.status'),'observed');
  run("applyVersion(c,{number:2,id:'test',at:now(),user:currentUser.name,summary:'Plazo modificado',text:'Pago a 15 días'},[2]);");
  assert.equal(run('c.observations.at(-1).resolved'),true);assert.equal(run('c.observations.at(-1).resolvedVersion'),2);
});
test('los contratos firmados no admiten nuevas versiones',()=>{
  const run=fixture();run("c=state.contracts.find(c=>c.status==='signed');currentUser=state.users.find(u=>u.role==='commercial');");
  assert.throws(()=>run("applyVersion(c,{number:3},[0])"),/abierto/);
});
test('la comparación identifica líneas añadidas y eliminadas y escapa HTML',()=>{
  const run=fixture();
  run("let diff=diffText('Pago a 60 días.\\nVigencia: 12 meses.','Pago a 30 días.\\nVigencia: 12 meses.');");
  assert.equal(run("diff.left.filter(l=>l.type==='removed').length"),1);
  assert.equal(run("diff.right.filter(l=>l.type==='added').length"),1);
  assert.equal(run("esc('<script> & \"x\"')"),'&lt;script&gt; &amp; &quot;x&quot;');
});
test('validación PDF rechaza extensión, tamaño y contenido incorrectos',async()=>{
  const run=fixture();
  await assert.rejects(run("validatePdf({name:'archivo.txt',size:10})"),/formato PDF/);
  await assert.rejects(run("validatePdf({name:'archivo.pdf',size:11*1024*1024})"),/10 MB/);
  await assert.rejects(run("validatePdf(Object.assign(new Blob(['texto']),{name:'falso.pdf'}))"),/cabecera/);
  await run("validatePdf(Object.assign(new Blob(['%PDF-1.4\\ncontenido']),{name:'valido.pdf'}))");
});
