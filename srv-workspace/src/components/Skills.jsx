import { useState } from "react";
import { sv } from "../data";
import { M, INP, GBtn, XBtn, Card, Tag, ProgBar } from "./ui/Shared";

const SKILL_CATS=["Language","Framework","Database","Tool","DevOps","Cloud","CS Core","AI/ML","Other"];
const STATUS_C={strong:"#6ee7b7",good:"#58a6ff",learning:"#fde68a",beginner:"#fca5a5"};
const LVL_C=(l)=>l>=80?"#6ee7b7":l>=60?"#58a6ff":l>=40?"#fde68a":"#fca5a5";

export default function Skills({skills, setSkills, uid}){  const [fc,setFc]=useState("All");
  const [showF,setShowF]=useState(false);
  const [form,setForm]=useState({name:"",cat:"Language",lvl:50,note:"",status:"learning"});
  
  const filt=skills.filter(s=>fc==="All"||s.cat===fc);
  
  function add(){if(!form.name.trim())return;const u=[...skills,{...form,id:Date.now()}];setSkills(u);sv(uid, "skills", u);setShowF(false);setForm({name:"",cat:"Language",lvl:50,note:"",status:"learning"});}
  function del(id){const u=skills.filter(s=>s.id!==id);setSkills(u);sv(uid, "skills", u);}
  function updLvl(id,lvl){const u=skills.map(s=>s.id===id?{...s,lvl}:s);setSkills(u);sv(uid, "skills", u);}
  
  const avg=skills.length?Math.round(skills.reduce((a,s)=>a+s.lvl,0)/skills.length):0;
  
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12,height:"100%",overflow:"hidden"}}>
      <div style={{display:"flex",gap:8,alignItems:"center",flexShrink:0,flexWrap:"wrap"}}>
        {["All",...SKILL_CATS].map(c=>(
          <button key={c} onClick={()=>setFc(c)} style={{background:fc===c?"#161b22":"transparent",border:"1px solid "+(fc===c?"#58a6ff":"#30363d"),borderRadius:6,padding:"5px 12px",color:fc===c?"#58a6ff":"#8b949e",...M,fontSize:10,cursor:"pointer"}}>{c}</button>
        ))}
        <div style={{flex:1}}/>
        <span style={{...M,fontSize:12,color:"#6e7681"}}>Avg: <span style={{color:LVL_C(avg),fontWeight:700}}>{avg}%</span></span>
        <GBtn onClick={()=>setShowF(!showF)} s={{whiteSpace:"nowrap"}}>{showF?"Cancel":"+ Add Skill"}</GBtn>
      </div>
      {showF&&(
        <Card style={{border:"1px solid #238636"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,alignItems:"center"}}>
            <input placeholder="Skill name *" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} style={INP}/>
            <select value={form.cat} onChange={e=>setForm({...form,cat:e.target.value})} style={INP}>{SKILL_CATS.map(c=><option key={c}>{c}</option>)}</select>
            <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})} style={INP}>{["beginner","learning","good","strong"].map(s=><option key={s}>{s}</option>)}</select>
            <input placeholder="Notes..." value={form.note} onChange={e=>setForm({...form,note:e.target.value})} style={{...INP,gridColumn:"span 2"}}/>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <input type="range" min={0} max={100} value={form.lvl} onChange={e=>setForm({...form,lvl:parseInt(e.target.value)})} style={{flex:1}}/>
              <span style={{...M,fontSize:12,color:LVL_C(form.lvl),fontWeight:700,width:36}}>{form.lvl}%</span>
            </div>
            <div style={{gridColumn:"span 3",display:"flex",justifyContent:"flex-end"}}><GBtn onClick={add}>Add Skill</GBtn></div>
          </div>
        </Card>
      )}
      <div style={{flex:1,overflowY:"auto",display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:10,alignContent:"start"}}>
        {filt.map(s=>(
          <Card key={s.id} style={{position:"relative"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
              <div><div style={{...M,fontSize:13,fontWeight:700,color:"#c9d1d9"}}>{s.name}</div><Tag c={STATUS_C[s.status]||"#8b949e"}>{s.status}</Tag></div>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <span style={{...M,fontSize:18,fontWeight:700,color:LVL_C(s.lvl)}}>{s.lvl}%</span>
                <XBtn onClick={()=>del(s.id)}/>
              </div>
            </div>
            {s.note&&<div style={{...M,fontSize:10,color:"#8b949e",marginBottom:8,lineHeight:1.5}}>{s.note}</div>}
            <ProgBar pct={s.lvl} color={LVL_C(s.lvl)} h={7}/>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:6}}>
              <Tag c="#6e7681">{s.cat}</Tag>
              <input type="range" min={0} max={100} value={s.lvl} onChange={e=>updLvl(s.id,parseInt(e.target.value))} style={{width:80}} onClick={e=>e.stopPropagation()}/>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}