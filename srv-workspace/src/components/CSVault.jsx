import { useState } from "react";
import { TODAY, sv } from "../data";
import { M, INP, GBtn, DBtn, XBtn, Card, Tag, MD } from "./ui/Shared";

const SUBJECTS=["Operating Systems","Computer Networks","DBMS","Computer Architecture","Software Engineering","Algorithms","Web Technologies","Machine Learning","Cloud Computing","Other"];
const SCOL={"Operating Systems":"#c4b5fd","Computer Networks":"#67e8f9","DBMS":"#fde68a","Computer Architecture":"#fca5a5","Software Engineering":"#6ee7b7","Algorithms":"#58a6ff","Web Technologies":"#fdba74","Machine Learning":"#f0c040","Cloud Computing":"#86efac","Other":"#8b949e"};

export default function CSVault({notes, setNotes, uid}){  const [aid,setAid]=useState(notes[0]?.id||null);
  const [edit,setEdit]=useState(false);
  const [ec,setEc]=useState("");
  const [et,setEt]=useState("");
  const [fs,setFs]=useState("All");
  const [q,setQ]=useState("");
  const [showN,setShowN]=useState(false);
  const [nf,setNf]=useState({title:"",subj:"Operating Systems",content:""});
  
  const active=notes.find(n=>n.id===aid);
  const filt=notes.filter(n=>(fs==="All"||n.subj===fs)&&(n.title.toLowerCase().includes(q.toLowerCase())||n.content.toLowerCase().includes(q.toLowerCase())));
  
  function saveEdit(){const u=notes.map(n=>n.id===aid?{...n,title:et,content:ec,date:TODAY}:n);setNotes(u);sv(uid, "notes", u);setEdit(false);}
  function addNote(){if(!nf.title.trim())return;const n={...nf,id:Date.now(),date:TODAY};const u=[...notes,n];setNotes(u);sv(uid, "notes", u);setAid(n.id);setShowN(false);setNf({title:"",subj:"Operating Systems",content:""});}
  function delNote(id){const u=notes.filter(n=>n.id!==id);setNotes(u);sv(uid, "notes", u);setAid(u[0]?.id||null);}
  
  return(
    <div style={{display:"grid",gridTemplateColumns:"230px 1fr",gap:14,height:"100%",overflow:"hidden"}}>
      <div style={{display:"flex",flexDirection:"column",gap:8,overflow:"hidden"}}>
        <div style={{display:"flex",gap:6}}>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search..." style={{...INP,flex:1,padding:"6px 8px",fontSize:11}}/>
          <GBtn onClick={()=>setShowN(!showN)} s={{padding:"6px 10px",whiteSpace:"nowrap"}}>+</GBtn>
        </div>
        <select value={fs} onChange={e=>setFs(e.target.value)} style={{...INP,padding:"6px 8px",fontSize:10}}><option>All</option>{SUBJECTS.map(s=><option key={s}>{s}</option>)}</select>
        {showN&&(
          <Card style={{border:"1px solid #238636",display:"flex",flexDirection:"column",gap:6,padding:10}}>
            <input placeholder="Note title *" value={nf.title} onChange={e=>setNf({...nf,title:e.target.value})} style={{...INP,fontSize:11}}/>
            <select value={nf.subj} onChange={e=>setNf({...nf,subj:e.target.value})} style={{...INP,fontSize:10}}>{SUBJECTS.map(s=><option key={s}>{s}</option>)}</select>
            <GBtn onClick={addNote} s={{width:"100%"}}>Create</GBtn>
          </Card>
        )}
        <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:4}}>
          {filt.map(n=>(
            <div key={n.id} onClick={()=>{setAid(n.id);setEdit(false);}} style={{padding:10,borderRadius:6,border:"1px solid "+(aid===n.id?"#30363d":"transparent"),background:aid===n.id?"#161b22":"transparent",cursor:"pointer",position:"relative"}}>
              <div style={{...M,fontSize:12,color:aid===n.id?"#c9d1d9":"#8b949e",fontWeight:600,marginBottom:3,paddingRight:16,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{n.title}</div>
              <Tag c={SCOL[n.subj]||"#8b949e"}>{n.subj}</Tag>
              {aid===n.id&&<span style={{position:"absolute",top:8,right:8}}><XBtn onClick={e=>{e.stopPropagation();delNote(n.id)}}/></span>}
            </div>
          ))}
        </div>
      </div>
      <div style={{background:"#0d1117",border:"1px solid #21262d",borderRadius:8,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        {!active?<div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",...M,fontSize:12,color:"#6e7681"}}>Select a note or create a new one</div>
        :edit?(
          <>
            <div style={{padding:"10px 14px",borderBottom:"1px solid #21262d",display:"flex",gap:8}}>
              <input value={et} onChange={e=>setEt(e.target.value)} style={{...INP,flex:1,fontSize:14,fontWeight:700}}/>
              <GBtn onClick={saveEdit}>Save</GBtn>
              <DBtn onClick={()=>setEdit(false)}>Cancel</DBtn>
            </div>
            <textarea value={ec} onChange={e=>setEc(e.target.value)} style={{flex:1,background:"transparent",border:"none",outline:"none",padding:16,color:"#c9d1d9",...M,fontSize:12,lineHeight:1.7,resize:"none"}} placeholder="Write in Markdown..."/>
          </>
        ):(
          <>
            <div style={{padding:"12px 16px",borderBottom:"1px solid #21262d",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div><div style={{...M,fontSize:15,fontWeight:700,color:"#c9d1d9"}}>{active.title}</div><div style={{...M,fontSize:10,color:"#6e7681",marginTop:2}}>{active.subj} · {active.date}</div></div>
              <DBtn onClick={()=>{setEt(active.title);setEc(active.content);setEdit(true);}}>Edit</DBtn>
            </div>
            <div style={{flex:1,overflowY:"auto",padding:"16px 20px"}}><MD src={active.content}/></div>
          </>
        )}
      </div>
    </div>
  );
}