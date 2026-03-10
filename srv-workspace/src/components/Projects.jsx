import { useState } from "react";
import { sv } from "../data";
import { M, INP, GBtn, DBtn, XBtn, Tag, Card, ProgBar } from "./ui/Shared";

const PSTATUS_C={"Complete":"#6ee7b7","In Progress":"#fde68a","Idea":"#67e8f9","On Hold":"#fca5a5"};

export default function Projects({projects, setProjects, uid}){  const [sel,setSel]=useState(null);
  const [showF,setShowF]=useState(false);
  const [form,setForm]=useState({name:"",desc:"",tech:"",status:"In Progress",type:"Personal",github:"",demo:"",role:"Solo",team:1,progress:0});
  
  function add(){if(!form.name.trim())return;const p={...form,id:Date.now(),tech:typeof form.tech==="string"?form.tech.split(",").map(t=>t.trim()).filter(Boolean):form.tech};const u=[...projects,p];setProjects(u);sv(uid, "projects", u);setShowF(false);setForm({name:"",desc:"",tech:"",status:"In Progress",type:"Personal",github:"",demo:"",role:"Solo",team:1,progress:0});}
  function del(id){const u=projects.filter(p=>p.id!==id);setProjects(u);sv(uid, "projects", u);if(sel?.id===id)setSel(null);}
  
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12,height:"100%",overflow:"hidden"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
        <div style={{display:"flex",gap:8}}>
          {["All","Major Project","Minor Project","Personal","Open Source"].map(t=>(
            <DBtn key={t} s={{fontSize:10,padding:"4px 10px"}}>{t}</DBtn>
          ))}
        </div>
        <GBtn onClick={()=>setShowF(!showF)}>{showF?"Cancel":"+ Add Project"}</GBtn>
      </div>
      {showF&&(
        <Card style={{border:"1px solid #238636"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
            <input placeholder="Project name *" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} style={{...INP,gridColumn:"span 2"}}/>
            <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})} style={INP}>{["Personal","Major Project","Minor Project","Open Source"].map(t=><option key={t}>{t}</option>)}</select>
            <textarea placeholder="Description..." value={form.desc} onChange={e=>setForm({...form,desc:e.target.value})} style={{...INP,gridColumn:"span 3",minHeight:56,resize:"vertical"}}/>
            <input placeholder="Tech stack (comma separated)" value={form.tech} onChange={e=>setForm({...form,tech:e.target.value})} style={{...INP,gridColumn:"span 2"}}/>
            <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})} style={INP}>{["In Progress","Complete","Idea","On Hold"].map(s=><option key={s}>{s}</option>)}</select>
            <input placeholder="GitHub URL" value={form.github} onChange={e=>setForm({...form,github:e.target.value})} style={INP}/>
            <input placeholder="Demo URL" value={form.demo} onChange={e=>setForm({...form,demo:e.target.value})} style={INP}/>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <input placeholder="Role" value={form.role} onChange={e=>setForm({...form,role:e.target.value})} style={{...INP,flex:1}}/>
              <input type="number" placeholder="Team" value={form.team} onChange={e=>setForm({...form,team:parseInt(e.target.value)||1})} style={{...INP,width:64}}/>
            </div>
            <div style={{gridColumn:"span 3",display:"flex",alignItems:"center",gap:12}}>
              <span style={{...M,fontSize:11,color:"#8b949e"}}>Progress: {form.progress}%</span>
              <input type="range" min={0} max={100} value={form.progress} onChange={e=>setForm({...form,progress:parseInt(e.target.value)})} style={{flex:1}}/>
              <GBtn onClick={add}>Save Project</GBtn>
            </div>
          </div>
        </Card>
      )}
      <div style={{flex:1,overflowY:"auto",display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:12,alignContent:"start"}}>
        {projects.map(p=>(
          <div key={p.id} onClick={()=>setSel(sel?.id===p.id?null:p)} style={{background:"#0d1117",border:"1px solid "+(sel?.id===p.id?"#58a6ff":"#21262d"),borderRadius:8,padding:16,cursor:"pointer",transition:"border-color 0.15s",position:"relative"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
              <div>
                <div style={{...M,fontSize:14,fontWeight:700,color:"#c9d1d9",marginBottom:3}}>{p.name}</div>
                <Tag c="#8b949e">{p.type}</Tag>
              </div>
              <div style={{display:"flex",gap:6,alignItems:"center"}}>
                <Tag c={PSTATUS_C[p.status]||"#8b949e"}>{p.status}</Tag>
                <XBtn onClick={e=>{e.stopPropagation();del(p.id);}}/>
              </div>
            </div>
            <div style={{...M,fontSize:11,color:"#8b949e",lineHeight:1.5,marginBottom:10}}>{p.desc?.slice(0,120)}{p.desc?.length>120?"...":""}</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:10}}>
              {(Array.isArray(p.tech)?p.tech:[]).map(t=><Tag key={t} c="#58a6ff">{t}</Tag>)}
            </div>
            <ProgBar pct={p.progress} color={p.progress===100?"#6ee7b7":"#58a6ff"} h={5}/>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
              <span style={{...M,fontSize:10,color:"#6e7681"}}>{p.role} · Team of {p.team}</span>
              <span style={{...M,fontSize:10,color:"#6e7681"}}>{p.progress}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}