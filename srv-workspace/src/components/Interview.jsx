import { useState } from "react";
import { sv } from "../data";
import { M, INP, Tag, Card, ProgBar } from "./ui/Shared";

const SD_STATUS_C={"not_started":"#6e7681",in_progress:"#fde68a",done:"#6ee7b7"};

export default function Interview({hrQ, setHrQ, patterns, setPatterns, sysdesign, setSysdesign, uid}) {
  // YOU ARE LIKELY MISSING THESE THREE LINES:
  const [tab, setTab] = useState("hr");
  const [q, setQ] = useState("");
  const [fc, setFc] = useState("All");

  // ... the rest of your code (hr_cats, filtHR, togHR, etc.)
  const hr_cats=[...new Set(hrQ.map(h=>h.cat))];
  const filtHR=hrQ.filter(h=>(fc==="All"||h.cat===fc)&&h.q.toLowerCase().includes(q.toLowerCase()));
  
  const togHR=(id,field)=>{const u=hrQ.map(h=>h.id===id?{...h,[field]:!h[field]}:h);setHrQ(u);sv(uid, "hrq", u);};

const togPat=(id)=>{const u=patterns.map(p=>p.id===id?{...p,done:!p.done}:p);setPatterns(u);sv(uid, "patterns", u);};

const togSD=(id,status)=>{const u=sysdesign.map(s=>s.id===id?{...s,status}:s);setSysdesign(u);sv(uid, "sysdesign", u);};
  const donePat=patterns.filter(p=>p.done).length;
  const doneSD=sysdesign.filter(s=>s.status==="done").length;
  const doneHR=hrQ.filter(h=>h.done).length;
  
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12,height:"100%",overflow:"hidden"}}>
      <div style={{display:"flex",gap:4,borderBottom:"1px solid #21262d",flexShrink:0}}>
        {[["hr",`HR Questions (${doneHR}/${hrQ.length})`],["pat",`DSA Patterns (${donePat}/${patterns.length})`],["sd",`System Design (${doneSD}/${sysdesign.length})`]].map(([id,label])=>(
          <button key={id} onClick={()=>setTab(id)} style={{background:"transparent",border:"none",borderBottom:"2px solid "+(tab===id?"#58a6ff":"transparent"),padding:"10px 16px",color:tab===id?"#58a6ff":"#8b949e",...M,fontSize:11,cursor:"pointer"}}>{label}</button>
        ))}
      </div>
      {tab==="hr"&&(
        <div style={{display:"flex",flexDirection:"column",gap:10,overflow:"hidden",flex:1}}>
          <div style={{display:"flex",gap:8,flexShrink:0}}>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search questions..." style={{...INP,flex:1}}/>
            <select value={fc} onChange={e=>setFc(e.target.value)} style={INP}><option>All</option>{hr_cats.map(c=><option key={c}>{c}</option>)}</select>
            <div style={{...M,fontSize:11,color:"#6e7681",alignSelf:"center",whiteSpace:"nowrap"}}>{doneHR}/{hrQ.length} practiced</div>
          </div>
          <ProgBar pct={doneHR/hrQ.length*100} color="#6ee7b7" h={5}/>
          <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:6}}>
            {filtHR.map(h=>(
              <div key={h.id} style={{background:h.done?"#0d1f0d":"#0d1117",border:"1px solid "+(h.done?"#1a3a1a":"#21262d"),borderRadius:8,padding:"10px 14px",display:"flex",gap:10,alignItems:"flex-start"}}>
                <input type="checkbox" checked={h.done} onChange={()=>togHR(h.id,"done")} style={{marginTop:2,cursor:"pointer",accentColor:"#238636"}}/>
                <div style={{flex:1}}>
                  <div style={{...M,fontSize:12,color:h.done?"#57ab5a":"#c9d1d9",fontWeight:600,marginBottom:4}}>{h.q}</div>
                  {h.notes&&<div style={{...M,fontSize:11,color:"#8b949e",lineHeight:1.5}}>💡 {h.notes}</div>}
                </div>
                <div style={{display:"flex",gap:6,alignItems:"center",flexShrink:0}}>
                  <Tag c="#6e7681">{h.cat}</Tag>
                  <span onClick={()=>togHR(h.id,"star")} style={{cursor:"pointer",color:h.star?"#f0c040":"#3d444d",fontSize:14}}>★</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {tab==="pat"&&(
        <div style={{flex:1,overflowY:"auto",display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:10,alignContent:"start"}}>
          {patterns.map(p=>(
            <Card key={p.id} style={{border:"1px solid "+(p.done?"#1a3a1a":"#21262d"),background:p.done?"#0d1f0d":"#0d1117"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                <div style={{...M,fontSize:13,fontWeight:700,color:p.done?"#57ab5a":"#c9d1d9"}}>{p.name}</div>
                <div style={{display:"flex",gap:6,alignItems:"center"}}>
                  <Tag c="#6e7681">{p.cat}</Tag>
                  <input type="checkbox" checked={p.done} onChange={()=>togPat(p.id)} style={{cursor:"pointer",accentColor:"#238636"}}/>
                </div>
              </div>
              <div style={{...M,fontSize:11,color:"#8b949e",lineHeight:1.5,marginBottom:8}}>{p.desc}</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                {p.probs.map(pr=><Tag key={pr} c="#58a6ff">{pr}</Tag>)}
              </div>
            </Card>
          ))}
        </div>
      )}
      {tab==="sd"&&(
        <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:8}}>
          <div style={{display:"flex",gap:8,flexShrink:0,flexWrap:"wrap"}}>
            {[["not_started","Not Started","#6e7681"],["in_progress","In Progress","#fde68a"],["done","Done","#6ee7b7"]].map(([s,l,c])=>(
              <div key={s} style={{...M,fontSize:11,color:c}}>{l}: {sysdesign.filter(x=>x.status===s).length}</div>
            ))}
          </div>
          {sysdesign.map(s=>(
            <Card key={s.id} style={{border:`1px solid ${SD_STATUS_C[s.status]}44`,background:s.status==="done"?"#0d1f0d":s.status==="in_progress"?"#1a1400":"#0d1117"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                <div>
                  <div style={{...M,fontSize:13,fontWeight:700,color:"#c9d1d9",marginBottom:3}}>{s.topic}</div>
                  <Tag c={s.diff==="Hard"?"#fca5a5":s.diff==="Medium"?"#fde68a":"#6ee7b7"}>{s.diff}</Tag>
                </div>
                <div style={{display:"flex",gap:4}}>
                  {[["not_started","●"],["in_progress","◑"],["done","✓"]].map(([st,ic])=>(
                    <button key={st} onClick={()=>togSD(s.id,st)} style={{background:s.status===st?SD_STATUS_C[st]+"22":"transparent",border:`1px solid ${s.status===st?SD_STATUS_C[st]:"#30363d"}`,borderRadius:4,padding:"3px 8px",color:SD_STATUS_C[st],...M,fontSize:11,cursor:"pointer"}}>{ic}</button>
                  ))}
                </div>
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                {s.concepts.map(c=><Tag key={c} c="#8b949e">{c}</Tag>)}
              </div>
              {s.notes&&<div style={{...M,fontSize:11,color:"#8b949e",marginTop:8,lineHeight:1.5}}>📝 {s.notes}</div>}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}