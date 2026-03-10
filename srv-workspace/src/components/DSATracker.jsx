import { useState } from "react";
import { TODAY, sv } from "../data";
import { M, INP, Card, Lbl, GBtn, Tag, XBtn } from "./ui/Shared";

const DSA_TOPICS=["Array","String","Linked List","Stack/Queue","Tree","Graph","Dynamic Programming","Greedy","Binary Search","Backtracking","Heap","Trie","Math","Bit Manipulation","Sliding Window","Two Pointer","Divide & Conquer","Other"];
const DIFF_C={Easy:"#6ee7b7",Medium:"#fde68a",Hard:"#fca5a5"};

export default function DSATracker({problems, setProblems, uid}){
  const [q,setQ]=useState("");
  const [ft,setFt]=useState("All");
  const [fd,setFd]=useState("All");
  const [sel,setSel]=useState(null);
  const [showF,setShowF]=useState(false);
  const [form,setForm]=useState({title:"",topic:"Array",diff:"Medium",platform:"LeetCode",time:"",space:"",notes:"",date:TODAY,star:false});
  
  const filt=problems.filter(p=>(ft==="All"||p.topic===ft)&&(fd==="All"||p.diff===fd)&&(p.title.toLowerCase().includes(q.toLowerCase())||p.notes.toLowerCase().includes(q.toLowerCase())));
  const tcnt=DSA_TOPICS.reduce((a,t)=>{a[t]=problems.filter(p=>p.topic===t).length;return a;},{});
  const stats={t:problems.length,e:problems.filter(p=>p.diff==="Easy").length,m:problems.filter(p=>p.diff==="Medium").length,h:problems.filter(p=>p.diff==="Hard").length};
  
  function add(){if(!form.title.trim())return;const u=[...problems,{...form,id:Date.now()}];setProblems(u);sv(uid, "dsa", u);setShowF(false);setForm({title:"",topic:"Array",diff:"Medium",platform:"LeetCode",time:"",space:"",notes:"",date:TODAY,star:false});}
  function del(id){const u=problems.filter(p=>p.id!==id);setProblems(u);sv(uid, "dsa", u);if(sel?.id===id)setSel(null);}
  function star(id){const u=problems.map(p=>p.id===id?{...p,star:!p.star}:p);setProblems(u);sv(uid, "dsa", u);}
  
  return(
    <div style={{display:"grid",gridTemplateColumns:"190px 1fr",gap:14,height:"100%",overflow:"hidden"}}>
      <div style={{display:"flex",flexDirection:"column",gap:12,overflow:"hidden"}}>
        <Card>
          <Lbl>PROGRESS</Lbl>
          {[["Total",stats.t,"#c9d1d9"],["Easy",stats.e,"#6ee7b7"],["Medium",stats.m,"#fde68a"],["Hard",stats.h,"#fca5a5"]].map(([l,v,c])=>(
            <div key={l} style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{...M,fontSize:11,color:"#8b949e"}}>{l}</span><span style={{...M,fontSize:14,fontWeight:700,color:c}}>{v}</span></div>
          ))}
          <div style={{height:6,background:"#21262d",borderRadius:3,overflow:"hidden",display:"flex",marginTop:8}}>
            {stats.t>0&&<><div style={{flex:stats.e,background:"#6ee7b7"}}/><div style={{flex:stats.m,background:"#fde68a"}}/><div style={{flex:stats.h,background:"#fca5a5"}}/></>}
          </div>
        </Card>
        <Card style={{flex:1,overflowY:"auto"}}>
          <Lbl>BY TOPIC</Lbl>
          {DSA_TOPICS.filter(t=>tcnt[t]>0).map(t=>(
            <div key={t} onClick={()=>setFt(ft===t?"All":t)} style={{display:"flex",justifyContent:"space-between",padding:"3px 6px",borderRadius:4,cursor:"pointer",background:ft===t?"#161b22":"transparent",marginBottom:2}}>
              <span style={{...M,fontSize:10,color:ft===t?"#58a6ff":"#8b949e",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:130}}>{t}</span>
              <span style={{...M,fontSize:11,color:"#6e7681"}}>{tcnt[t]}</span>
            </div>
          ))}
        </Card>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10,overflow:"hidden"}}>
        <div style={{display:"flex",gap:8}}>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search problems..." style={{...INP,flex:1}}/>
          <select value={fd} onChange={e=>setFd(e.target.value)} style={INP}>{["All","Easy","Medium","Hard"].map(d=><option key={d}>{d}</option>)}</select>
          <GBtn onClick={()=>setShowF(!showF)} s={{whiteSpace:"nowrap"}}>{showF?"Cancel":"+ Log Problem"}</GBtn>
        </div>
        {showF&&(
          <Card style={{border:"1px solid #238636"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              <input placeholder="Title *" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} style={INP}/>
              <input placeholder="Platform" value={form.platform} onChange={e=>setForm({...form,platform:e.target.value})} style={INP}/>
              <select value={form.topic} onChange={e=>setForm({...form,topic:e.target.value})} style={INP}>{DSA_TOPICS.map(t=><option key={t}>{t}</option>)}</select>
              <select value={form.diff} onChange={e=>setForm({...form,diff:e.target.value})} style={INP}>{["Easy","Medium","Hard"].map(d=><option key={d}>{d}</option>)}</select>
              <input placeholder="Time complexity e.g. O(n log n)" value={form.time} onChange={e=>setForm({...form,time:e.target.value})} style={INP}/>
              <input placeholder="Space complexity e.g. O(n)" value={form.space} onChange={e=>setForm({...form,space:e.target.value})} style={INP}/>
              <textarea placeholder="Notes, approach, edge cases..." value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} style={{...INP,gridColumn:"span 2",minHeight:56,resize:"vertical"}}/>
              <div style={{gridColumn:"span 2",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <label style={{...M,fontSize:11,color:"#8b949e",display:"flex",alignItems:"center",gap:6,cursor:"pointer"}}><input type="checkbox" checked={form.star} onChange={e=>setForm({...form,star:e.target.checked})}/>★ Star</label>
                <GBtn onClick={add}>Save Problem</GBtn>
              </div>
            </div>
          </Card>
        )}
        <div style={{display:"grid",gridTemplateColumns:sel?"1fr 320px":"1fr",gap:12,flex:1,overflow:"hidden",minHeight:0}}>
          <div style={{overflowY:"auto",border:"1px solid #21262d",borderRadius:8}}>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead><tr style={{background:"#161b22"}}>
                {["","#","Title","Topic","Diff","Platform","Date",""].map((h,i)=><th key={i} style={{...M,padding:"8px 10px",textAlign:"left",fontSize:10,color:"#6e7681",letterSpacing:"0.08em",borderBottom:"1px solid #21262d",whiteSpace:"nowrap"}}>{h}</th>)}
              </tr></thead>
              <tbody>
                {filt.length===0&&<tr><td colSpan={8} style={{...M,padding:30,textAlign:"center",color:"#6e7681",fontSize:12}}>No problems found.</td></tr>}
                {filt.map((p,i)=>(
                  <tr key={p.id} onClick={()=>setSel(sel?.id===p.id?null:p)} style={{background:sel?.id===p.id?"#161b22":"transparent",cursor:"pointer",borderBottom:"1px solid #0d1117"}}>
                    <td style={{padding:"8px 10px"}}><span onClick={e=>{e.stopPropagation();star(p.id)}} style={{cursor:"pointer",color:p.star?"#f0c040":"#3d444d",fontSize:14}}>★</span></td>
                    <td style={{...M,padding:"8px 6px",fontSize:11,color:"#6e7681"}}>{i+1}</td>
                    <td style={{...M,padding:"8px 10px",fontSize:12,color:"#58a6ff",fontWeight:600}}>{p.title}</td>
                    <td style={{...M,padding:"8px 10px",fontSize:10,color:"#8b949e"}}>{p.topic}</td>
                    <td style={{padding:"8px 10px"}}><Tag c={DIFF_C[p.diff]}>{p.diff}</Tag></td>
                    <td style={{...M,padding:"8px 10px",fontSize:10,color:"#8b949e"}}>{p.platform}</td>
                    <td style={{...M,padding:"8px 10px",fontSize:10,color:"#6e7681"}}>{p.date}</td>
                    <td style={{padding:"8px 6px"}}><XBtn onClick={e=>{e.stopPropagation();del(p.id)}}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {sel&&(
            <Card style={{overflowY:"auto"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                <div><div style={{...M,fontSize:14,fontWeight:700,color:"#58a6ff"}}>{sel.title}</div><div style={{...M,fontSize:10,color:"#6e7681",marginTop:2}}>{sel.platform} · {sel.date}</div></div>
                <XBtn onClick={()=>setSel(null)}/>
              </div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}><Tag c={DIFF_C[sel.diff]}>{sel.diff}</Tag><Tag c="#8b949e">{sel.topic}</Tag></div>
              {sel.time&&<div style={{marginBottom:8}}><Lbl>TIME COMPLEXITY</Lbl><div style={{...M,fontSize:13,color:"#6ee7b7",background:"#0d2818",border:"1px solid #1a3a2a",padding:"6px 10px",borderRadius:4}}>{sel.time}</div></div>}
              {sel.space&&<div style={{marginBottom:8}}><Lbl>SPACE COMPLEXITY</Lbl><div style={{...M,fontSize:13,color:"#67e8f9",background:"#0d1f26",border:"1px solid #1a3040",padding:"6px 10px",borderRadius:4}}>{sel.space}</div></div>}
              {sel.notes&&<div><Lbl>NOTES</Lbl><div style={{...M,fontSize:11,color:"#c9d1d9",lineHeight:1.7,background:"#161b22",padding:10,borderRadius:4}}>{sel.notes}</div></div>}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}