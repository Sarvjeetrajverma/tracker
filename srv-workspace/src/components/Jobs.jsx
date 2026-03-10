import { useState } from "react";
import { sv } from "../data";
import { M, INP, GBtn, DBtn, XBtn, Lbl } from "./ui/Shared";

const KCOLS=["Wishlist","Applied","OA / Test","Interview","Offer","Rejected"];
const KCOL={Wishlist:"#6ee7b7",Applied:"#67e8f9","OA / Test":"#fde68a",Interview:"#c4b5fd",Offer:"#86efac",Rejected:"#fca5a5"};

export default function Jobs({apps, setApps, uid}){  const [drag,setDrag]=useState(null);
  const [over,setOver]=useState(null);
  const [addCol,setAddCol]=useState(null);
  const [detail,setDetail]=useState(null);
  const [form,setForm]=useState({company:"",role:"",deadline:"",notes:"",link:""});
  
  function addApp(col){if(!form.company.trim())return;const u=[...apps,{...form,id:Date.now(),col}];setApps(u);sv(uid, "apps", u);setForm({company:"",role:"",deadline:"",notes:"",link:""});setAddCol(null);}
  function move(id,col){const u=apps.map(a=>a.id===id?{...a,col}:a);setApps(u);sv(uid, "apps", u);}
  function del(id){const u=apps.filter(a=>a.id!==id);setApps(u);sv(uid, "apps", u);if(detail?.id===id)setDetail(null);}
  
  const today=new Date().toISOString().slice(0,10);
  const stats=KCOLS.map(c=>({col:c,n:apps.filter(a=>a.col===c).length}));
  
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12,height:"100%",overflow:"hidden"}}>
      <div style={{display:"flex",gap:10,flexShrink:0}}>
        {stats.map(({col,n})=><div key={col} style={{display:"flex",alignItems:"center",gap:6,background:"#161b22",border:"1px solid #21262d",borderRadius:6,padding:"6px 12px"}}><div style={{width:7,height:7,borderRadius:"50%",background:KCOL[col]}}/><span style={{...M,fontSize:11,color:"#c9d1d9"}}>{col}</span><span style={{...M,fontSize:11,fontWeight:700,color:KCOL[col]}}>{n}</span></div>)}
        <div style={{flex:1}}/>
        <span style={{...M,fontSize:11,color:"#8b949e",alignSelf:"center"}}>Total: {apps.length} · Offers: {apps.filter(a=>a.col==="Offer").length}</span>
      </div>
      <div style={{display:"flex",gap:10,flex:1,overflowX:"auto",overflowY:"hidden"}}>
        {KCOLS.map(col=>{
          const cards=apps.filter(a=>a.col===col);
          const ac=KCOL[col];
          return(
            <div key={col} onDragOver={e=>{e.preventDefault();setOver(col);}} onDrop={()=>{if(drag)move(drag.id,col);setDrag(null);setOver(null);}}
              style={{flex:"0 0 195px",display:"flex",flexDirection:"column",gap:8,background:over===col?"#161b22":"#0d1117",border:"1px solid "+(over===col?ac+"66":"#21262d"),borderRadius:8,padding:12,transition:"all 0.15s"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:2}}>
                <div style={{display:"flex",alignItems:"center",gap:7}}><div style={{width:8,height:8,borderRadius:"50%",background:ac}}/><span style={{...M,fontSize:11,fontWeight:700,color:"#c9d1d9"}}>{col}</span></div>
                <span style={{...M,fontSize:11,color:"#6e7681"}}>{cards.length}</span>
              </div>
              <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:6}}>
                {cards.map(a=>{
                  const od=a.deadline&&a.deadline<today&&col!=="Offer"&&col!=="Rejected";
                  return(
                    <div key={a.id} draggable onDragStart={()=>setDrag(a)} onDragEnd={()=>{setDrag(null);setOver(null);}} onClick={()=>setDetail(detail?.id===a.id?null:a)}
                      style={{background:"#161b22",border:"1px solid "+(detail?.id===a.id?ac:"#21262d"),borderRadius:6,padding:10,cursor:"grab",position:"relative"}}>
                      <div style={{...M,fontSize:12,fontWeight:700,color:"#c9d1d9",marginBottom:2,paddingRight:16}}>{a.company}</div>
                      {a.role&&<div style={{...M,fontSize:10,color:"#8b949e",marginBottom:3}}>{a.role}</div>}
                      {a.deadline&&<div style={{...M,fontSize:10,color:od?"#fca5a5":"#6e7681"}}>📅 {a.deadline}{od?" ⚠️":""}</div>}
                      <span style={{position:"absolute",top:6,right:6}} onClick={e=>{e.stopPropagation();del(a.id);}}><XBtn onClick={()=>{}}/></span>
                    </div>
                  );
                })}
              </div>
              {addCol===col?(
                <div style={{display:"flex",flexDirection:"column",gap:5,background:"#161b22",borderRadius:6,padding:8,border:`1px solid ${ac}44`}}>
                  <input placeholder="Company *" value={form.company} onChange={e=>setForm({...form,company:e.target.value})} style={{...INP,fontSize:11,padding:"5px 7px"}}/>
                  <input placeholder="Role" value={form.role} onChange={e=>setForm({...form,role:e.target.value})} style={{...INP,fontSize:11,padding:"5px 7px"}}/>
                  <input type="date" value={form.deadline} onChange={e=>setForm({...form,deadline:e.target.value})} style={{...INP,fontSize:11,padding:"5px 7px"}}/>
                  <input placeholder="Notes" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} style={{...INP,fontSize:11,padding:"5px 7px"}}/>
                  <div style={{display:"flex",gap:4}}>
                    <GBtn onClick={()=>addApp(col)} s={{flex:1,padding:"4px"}}>Add</GBtn>
                    <DBtn onClick={()=>setAddCol(null)} s={{flex:1,padding:"4px"}}>×</DBtn>
                  </div>
                </div>
              ):(
                <button onClick={()=>{setAddCol(col);setForm({company:"",role:"",deadline:"",notes:"",link:""});}} style={{background:"transparent",border:"1px dashed #30363d",borderRadius:6,padding:7,color:"#6e7681",...M,fontSize:11,cursor:"pointer",width:"100%"}}>+ Add</button>
              )}
            </div>
          );
        })}
        {detail&&(
          <div style={{flex:"0 0 230px",background:"#0d1117",border:"1px solid #21262d",borderRadius:8,padding:16,overflowY:"auto",flexDirection:"column",display:"flex",gap:10}}>
            <div style={{display:"flex",justifyContent:"space-between"}}><div style={{...M,fontSize:14,fontWeight:700,color:"#c9d1d9"}}>{detail.company}</div><XBtn onClick={()=>setDetail(null)}/></div>
            {[["Role",detail.role],["Deadline",detail.deadline],["Notes",detail.notes],["Link",detail.link]].map(([l,v])=>v?(
              <div key={l}><Lbl>{l.toUpperCase()}</Lbl><div style={{...M,fontSize:11,color:"#8b949e"}}>{v}</div></div>
            ):null)}
            <div><Lbl>MOVE TO</Lbl><div style={{display:"flex",flexDirection:"column",gap:4}}>{KCOLS.filter(c=>c!==detail.col).map(c=>(
              <button key={c} onClick={()=>{move(detail.id,c);setDetail({...detail,col:c});}} style={{background:"#161b22",border:"1px solid #21262d",borderRadius:4,padding:"5px 8px",color:"#8b949e",...M,fontSize:10,cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",gap:6}}>
                <span style={{width:6,height:6,borderRadius:"50%",background:KCOL[c],display:"inline-block"}}/>{c}
              </button>
            ))}</div></div>
          </div>
        )}
      </div>
    </div>
  );
}