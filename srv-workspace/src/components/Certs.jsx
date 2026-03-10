import { useState } from "react";
import { sv } from "../data";
import { M, INP, GBtn, XBtn, Card, Tag, Circle } from "./ui/Shared";

const CERT_CATS=["Cloud","Language","AI/ML","Web Dev","Data","DevOps","DSA","Other"];
const CERT_STATUS_C={"Completed":"#6ee7b7","In Progress":"#fde68a","Not Started":"#6e7681"};

export default function Certs({certs, setCerts, uid}){  const [showF,setShowF]=useState(false);
  const [form,setForm]=useState({name:"",platform:"",cat:"Web Dev",progress:0,target:"",status:"Not Started",notes:""});
  
  function add(){if(!form.name.trim())return;const u=[...certs,{...form,id:Date.now()}];setCerts(u);sv(uid, "certs", u);setShowF(false);setForm({name:"",platform:"",cat:"Web Dev",progress:0,target:"",status:"Not Started",notes:""});}
  function del(id){const u=certs.filter(c=>c.id!==id);setCerts(u);sv(uid, "certs", u);}
  function updProg(id,progress){const u=certs.map(c=>c.id===id?{...c,progress,status:progress===100?"Completed":progress>0?"In Progress":"Not Started"}:c);setCerts(u);sv(uid, "certs", u);}
  
  const done=certs.filter(c=>c.status==="Completed").length;
  const ip=certs.filter(c=>c.status==="In Progress").length;
  
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12,height:"100%",overflow:"hidden"}}>
      <div style={{display:"flex",gap:10,alignItems:"center",flexShrink:0}}>
        <div style={{display:"flex",gap:8}}>
          {[["Completed",done,"#6ee7b7"],["In Progress",ip,"#fde68a"],["Not Started",certs.length-done-ip,"#6e7681"]].map(([l,v,c])=>(
            <div key={l} style={{...M,fontSize:11,color:c}}>{l}: <strong>{v}</strong></div>
          ))}
        </div>
        <div style={{flex:1}}/>
        <GBtn onClick={()=>setShowF(!showF)}>{showF?"Cancel":"+ Add Certification"}</GBtn>
      </div>
      {showF&&(
        <Card style={{border:"1px solid #238636"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
            <input placeholder="Certification name *" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} style={{...INP,gridColumn:"span 2"}}/>
            <select value={form.cat} onChange={e=>setForm({...form,cat:e.target.value})} style={INP}>{CERT_CATS.map(c=><option key={c}>{c}</option>)}</select>
            <input placeholder="Platform (Coursera, AWS, NPTEL...)" value={form.platform} onChange={e=>setForm({...form,platform:e.target.value})} style={INP}/>
            <input type="date" value={form.target} onChange={e=>setForm({...form,target:e.target.value})} style={INP}/>
            <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})} style={INP}>{["Not Started","In Progress","Completed"].map(s=><option key={s}>{s}</option>)}</select>
            <textarea placeholder="Notes..." value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} style={{...INP,gridColumn:"span 3",minHeight:48,resize:"vertical"}}/>
            <div style={{gridColumn:"span 3",display:"flex",alignItems:"center",gap:12}}>
              <span style={{...M,fontSize:11,color:"#8b949e"}}>Progress: {form.progress}%</span>
              <input type="range" min={0} max={100} value={form.progress} onChange={e=>setForm({...form,progress:parseInt(e.target.value)})} style={{flex:1}}/>
              <GBtn onClick={add}>Save</GBtn>
            </div>
          </div>
        </Card>
      )}
      <div style={{flex:1,overflowY:"auto",display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:12,alignContent:"start"}}>
        {certs.map(c=>(
          <Card key={c.id} style={{border:`1px solid ${CERT_STATUS_C[c.status]}44`,background:c.status==="Completed"?"#0d1f0d":"#0d1117"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
              <div style={{flex:1,paddingRight:8}}>
                <div style={{...M,fontSize:13,fontWeight:700,color:"#c9d1d9",marginBottom:4}}>{c.name}</div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  <Tag c={CERT_STATUS_C[c.status]}>{c.status}</Tag>
                  <Tag c="#8b949e">{c.cat}</Tag>
                  {c.platform&&<Tag c="#6e7681">{c.platform}</Tag>}
                </div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <div style={{textAlign:"center"}}>
                  <Circle pct={c.progress} size={52} color={c.status==="Completed"?"#6ee7b7":c.status==="In Progress"?"#fde68a":"#6e7681"}/>
                </div>
                <XBtn onClick={()=>del(c.id)}/>
              </div>
            </div>
            {c.notes&&<div style={{...M,fontSize:11,color:"#8b949e",lineHeight:1.5,marginBottom:8}}>{c.notes}</div>}
            {c.target&&<div style={{...M,fontSize:10,color:"#6e7681",marginBottom:8}}>🎯 Target: {c.target}</div>}
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <input type="range" min={0} max={100} value={c.progress} onChange={e=>updProg(c.id,parseInt(e.target.value))} style={{flex:1}}/>
              <span style={{...M,fontSize:11,color:CERT_STATUS_C[c.status],fontWeight:700,width:36}}>{c.progress}%</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}