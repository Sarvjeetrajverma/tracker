
import { TODAY } from "../data";
import { M, Card, Lbl, ProgBar, Circle, Tag } from "./ui/Shared";

const TIPS=[
  "Master 2-3 DSA patterns per week. Quality > quantity.",
  "Your GitHub commit history IS your resume. Push code daily.",
  "System design is the differentiator in 2026 SWE interviews.",
  "Practice your 'Tell me about yourself' until it's natural.",
  "Networking is not optional. Connect on LinkedIn every day.",
  "AWS Cloud Practitioner takes 2 weeks prep. High ROI cert.",
  "Every rejection is data. Analyze, improve, apply again.",
  "Build in public — document your major project progress.",
  "Consistency > intensity. 2 hours daily beats 14 hours Sunday.",
  "Read 1 system design article before every sleep.",
];

export default function Home({dsaList,appList,todoList,skillList,certList,projList}){
  const today=new Date();
  const tip=TIPS[today.getDate()%TIPS.length];
  const dsaDone=dsaList.length;
  const appCount=appList.length;
  const offerCount=appList.filter(a=>a.col==="Offer").length;
  const skillAvg=skillList.length?Math.round(skillList.reduce((s,k)=>s+k.lvl,0)/skillList.length):0;
  const certDone=certList.filter(c=>c.status==="Completed").length;
  const projDone=projList.filter(p=>p.status==="Complete").length;
  const todayTodos=todoList.filter(t=>t.date===TODAY);
  const doneToday=todayTodos.filter(t=>t.done).length;
  const upcoming=appList.filter(a=>a.deadline>=TODAY&&a.col!=="Offer"&&a.col!=="Rejected").sort((a,b)=>a.deadline.localeCompare(b.deadline)).slice(0,4);
  const readiness=Math.round((Math.min(dsaDone/100,1)*30)+(Math.min(appCount/10,1)*15)+(skillAvg/100*25)+(certDone/certList.length*15)+(projDone/projList.length*15));
  const readColor=readiness>=70?"#6ee7b7":readiness>=45?"#fde68a":"#fca5a5";

  return(
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gridTemplateRows:"auto auto auto",gap:14,height:"100%",overflowY:"auto"}}>
      <div style={{gridColumn:"1/-1",background:"linear-gradient(135deg,#0d1f0d 0%,#0d1117 50%,#0d1f26 100%)",border:"1px solid #238636",borderRadius:10,padding:"18px 24px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div>
          <div style={{...M,fontSize:20,fontWeight:700,color:"#e6edf3",marginBottom:4}}>👨‍💻 Final Year B.Tech CCSE Dashboard</div>
          <div style={{...M,fontSize:11,color:"#8b949e"}}>Session ended Feb 2026 · Post-graduation placement tracker · {today.toDateString()}</div>
        </div>
        <div style={{textAlign:"center",flexShrink:0}}>
          <Circle pct={readiness} size={80} color={readColor}/>
          <div style={{...M,fontSize:9,color:"#6e7681",marginTop:4}}>READINESS SCORE</div>
        </div>
      </div>
      
      {[
        {label:"DSA Solved",value:dsaDone,sub:"problems",color:"#58a6ff",icon:"⚡"},
        {label:"Applications",value:appCount,sub:`${offerCount} offer${offerCount!==1?"s":""}`,color:"#6ee7b7",icon:"🗂"},
        {label:"Avg Skill Level",value:`${skillAvg}%`,sub:"across all skills",color:"#c4b5fd",icon:"🛠"},
        {label:"Today's Tasks",value:`${doneToday}/${todayTodos.length}`,sub:"completed",color:"#fde68a",icon:"📅"},
        {label:"Certifications",value:certDone,sub:`of ${certList.length} done`,color:"#fdba74",icon:"📜"},
        {label:"Projects",value:projDone,sub:`of ${projList.length} complete`,color:"#67e8f9",icon:"💼"},
      ].map(({label,value,sub,color,icon})=>(
        <Card key={label} style={{display:"flex",alignItems:"center",gap:14}}>
          <div style={{fontSize:28,flexShrink:0}}>{icon}</div>
          <div>
            <div style={{...M,fontSize:22,fontWeight:700,color}}>{value}</div>
            <div style={{...M,fontSize:11,color:"#c9d1d9",fontWeight:600}}>{label}</div>
            <div style={{...M,fontSize:10,color:"#6e7681"}}>{sub}</div>
          </div>
        </Card>
      ))}
      
      <Card style={{gridColumn:"span 2"}}>
        <Lbl>TODAY'S TASKS — {TODAY}</Lbl>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {todayTodos.length===0&&<div style={{...M,fontSize:11,color:"#6e7681"}}>No tasks for today. Add in the Planner tab!</div>}
          {todayTodos.map(t=>(
            <div key={t.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 10px",background:t.done?"#0d1f0d":"#161b22",borderRadius:6,border:"1px solid "+(t.done?"#1a3a1a":"#21262d")}}>
              <span style={{fontSize:12}}>{t.done?"✅":"⬜"}</span>
              <span style={{...M,fontSize:11,color:t.done?"#57ab5a":"#c9d1d9",flex:1,textDecoration:t.done?"line-through":"none"}}>{t.text}</span>
              <Tag c={t.pri==="High"?"#fca5a5":t.pri==="Medium"?"#fde68a":"#6ee7b7"}>{t.pri}</Tag>
              <Tag c="#6e7681">{t.cat}</Tag>
              <span style={{...M,fontSize:10,color:"#6e7681"}}>{t.est}m</span>
            </div>
          ))}
        </div>
        <ProgBar pct={todayTodos.length?doneToday/todayTodos.length*100:0} color="#6ee7b7" h={5} />
        <div style={{...M,fontSize:10,color:"#6e7681",marginTop:4}}>{doneToday}/{todayTodos.length} done today</div>
      </Card>
      
      <Card>
        <Lbl>UPCOMING DEADLINES</Lbl>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {upcoming.length===0&&<div style={{...M,fontSize:11,color:"#6e7681"}}>No upcoming deadlines</div>}
          {upcoming.map(a=>{
            const days=Math.ceil((new Date(a.deadline)-today)/86400000);
            const dc=days<=3?"#fca5a5":days<=7?"#fde68a":"#6ee7b7";
            return(
              <div key={a.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 10px",background:"#161b22",borderRadius:6,border:"1px solid #21262d"}}>
                <div>
                  <div style={{...M,fontSize:12,color:"#c9d1d9",fontWeight:600}}>{a.company}</div>
                  <div style={{...M,fontSize:10,color:"#8b949e"}}>{a.role}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{...M,fontSize:12,fontWeight:700,color:dc}}>{days}d</div>
                  <div style={{...M,fontSize:9,color:"#6e7681"}}>{a.deadline}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
      
      <Card style={{gridColumn:"1/-1",background:"#0d1f26",border:"1px solid #1a3040"}}>
        <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
          <span style={{fontSize:24,flexShrink:0}}>💡</span>
          <div>
            <Lbl>DAILY PLACEMENT TIP</Lbl>
            <div style={{...M,fontSize:13,color:"#67e8f9",lineHeight:1.6}}>{tip}</div>
          </div>
        </div>
      </Card>
    </div>
  );
}