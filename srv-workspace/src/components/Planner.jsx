import { useState } from "react";
import { TODAY, sv } from "../data";
import { M, INP, GBtn, XBtn, Card, Tag, ProgBar } from "./ui/Shared";

const TODO_CATS=["DSA","Studies","Project","Interview","Cloud","Networking","Health","Other"];
const PRI_C={High:"#fca5a5",Medium:"#fde68a",Low:"#6ee7b7"};

export default function Planner({todos, setTodos, uid}){  const [date,setDate]=useState(TODAY);
  const [showF,setShowF]=useState(false);
  const [form,setForm]=useState({text:"",cat:"DSA",pri:"Medium",est:30});
  
  const dayTodos=todos.filter(t=>t.date===date);
  const done=dayTodos.filter(t=>t.done).length;
  
  function add(){if(!form.text.trim())return;const u=[...todos,{...form,id:Date.now(),date,done:false}];setTodos(u);sv(uid,"todos",u);setShowF(false);setForm({text:"",cat:"DSA",pri:"Medium",est:30});}
  function tog(id){const u=todos.map(t=>t.id===id?{...t,done:!t.done}:t);setTodos(u);sv(uid,"todos",u);}
  function del(id){const u=todos.filter(t=>t.id!==id);setTodos(u);sv(uid,"todos",u);}
  
  const totalEst=dayTodos.reduce((s,t)=>s+t.est,0);
  const doneEst=dayTodos.filter(t=>t.done).reduce((s,t)=>s+t.est,0);
  const byPri={High:dayTodos.filter(t=>t.pri==="High"),Medium:dayTodos.filter(t=>t.pri==="Medium"),Low:dayTodos.filter(t=>t.pri==="Low")};
  
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12,height:"100%",overflow:"hidden"}}>
      <div style={{display:"flex",gap:10,alignItems:"center",flexShrink:0}}>
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} style={{...INP,width:"auto"}}/>
        <div style={{flex:1}}>
          <ProgBar pct={dayTodos.length?done/dayTodos.length*100:0} color="#6ee7b7" h={8}/>
        </div>
        <span style={{...M,fontSize:11,color:"#8b949e",whiteSpace:"nowrap"}}>{done}/{dayTodos.length} · {doneEst}/{totalEst}min</span>
        <GBtn onClick={()=>setShowF(!showF)}>{showF?"Cancel":"+ Add Task"}</GBtn>
      </div>
      {showF&&(
        <Card style={{border:"1px solid #238636"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr auto auto auto auto",gap:8,alignItems:"center"}}>
            <input placeholder="Task description *" value={form.text} onChange={e=>setForm({...form,text:e.target.value})} style={INP} onKeyDown={e=>e.key==="Enter"&&add()}/>
            <select value={form.cat} onChange={e=>setForm({...form,cat:e.target.value})} style={{...INP,width:"auto"}}>{TODO_CATS.map(c=><option key={c}>{c}</option>)}</select>
            <select value={form.pri} onChange={e=>setForm({...form,pri:e.target.value})} style={{...INP,width:"auto"}}>{["High","Medium","Low"].map(p=><option key={p}>{p}</option>)}</select>
            <div style={{display:"flex",alignItems:"center",gap:6}}><input type="number" value={form.est} onChange={e=>setForm({...form,est:parseInt(e.target.value)||15})} style={{...INP,width:64}}/><span style={{...M,fontSize:11,color:"#6e7681"}}>min</span></div>
            <GBtn onClick={add}>Add</GBtn>
          </div>
        </Card>
      )}
      <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:14}}>
        {["High","Medium","Low"].map(pri=>byPri[pri].length>0&&(
          <div key={pri}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:PRI_C[pri]}}/>
              <span style={{...M,fontSize:11,color:PRI_C[pri],fontWeight:700}}>{pri} Priority</span>
              <span style={{...M,fontSize:10,color:"#6e7681"}}>{byPri[pri].filter(t=>t.done).length}/{byPri[pri].length}</span>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:5}}>
              {byPri[pri].map(t=>(
                <div key={t.id} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:t.done?"#0d1f0d":"#0d1117",border:"1px solid "+(t.done?"#1a3a1a":"#21262d"),borderRadius:8,transition:"all 0.15s"}}>
                  <input type="checkbox" checked={t.done} onChange={()=>tog(t.id)} style={{cursor:"pointer",accentColor:"#238636",width:15,height:15}}/>
                  <span style={{...M,fontSize:12,color:t.done?"#57ab5a":"#c9d1d9",flex:1,textDecoration:t.done?"line-through":"none"}}>{t.text}</span>
                  <div style={{display:"flex",gap:6,alignItems:"center",flexShrink:0}}>
                    <Tag c="#8b949e">{t.cat}</Tag>
                    <Tag c="#6e7681">{t.est}m</Tag>
                    <XBtn onClick={()=>del(t.id)}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {dayTodos.length===0&&(
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flex:1,gap:10}}>
            <div style={{fontSize:40}}>📋</div>
            <div style={{...M,fontSize:13,color:"#6e7681"}}>No tasks for {date}. Add your first task!</div>
            <GBtn onClick={()=>setShowF(true)}>+ Add Task</GBtn>
          </div>
        )}
      </div>
    </div>
  );
}