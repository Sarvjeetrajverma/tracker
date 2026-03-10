/* eslint-disable react-refresh/only-export-components */

export const M = { fontFamily: "'JetBrains Mono',monospace" };
export const INP = { ...M, background: "#161b22", border: "1px solid #30363d", /* ... */ };
// ... rest of your Shared.jsx file


export const Tag=({c="#8b949e",children})=><span style={{...M,fontSize:9,padding:"2px 8px",borderRadius:10,background:c+"22",color:c,border:`1px solid ${c}44`,whiteSpace:"nowrap"}}>{children}</span>;
export const Lbl=({children})=><div style={{...M,fontSize:10,color:"#6e7681",letterSpacing:"0.1em",marginBottom:5}}>{children}</div>;
export const GBtn=({onClick,children,s={}})=><button onClick={onClick} style={{background:"#238636",border:"1px solid #2ea043",borderRadius:6,padding:"6px 14px",color:"#fff",...M,fontSize:11,cursor:"pointer",...s}}>{children}</button>;
export const DBtn=({onClick,children,s={}})=><button onClick={onClick} style={{background:"#21262d",border:"1px solid #30363d",borderRadius:6,padding:"6px 14px",color:"#c9d1d9",...M,fontSize:11,cursor:"pointer",...s}}>{children}</button>;
export const XBtn=({onClick})=><button onClick={onClick} style={{background:"transparent",border:"none",color:"#6e7681",cursor:"pointer",fontSize:16,padding:0,lineHeight:1}}>×</button>;
export const Card=({children,style={}})=><div style={{background:"#0d1117",border:"1px solid #21262d",borderRadius:8,padding:16,...style}}>{children}</div>;

export function ProgBar({pct,color="#58a6ff",h=6}){
  return <div style={{height:h,background:"#21262d",borderRadius:h/2,overflow:"hidden"}}><div style={{height:"100%",width:`${Math.min(pct,100)}%`,background:color,borderRadius:h/2,transition:"width 0.5s"}}/></div>;
}

export function Circle({pct,size=64,color="#58a6ff"}){
  const r=size/2-7,ci=2*Math.PI*r,off=ci-(pct/100)*ci;
  return(
    <svg width={size} height={size} style={{flexShrink:0}}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#21262d" strokeWidth={5}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={5} strokeDasharray={ci} strokeDashoffset={off} strokeLinecap="round" style={{transform:"rotate(-90deg)",transformOrigin:"center",transition:"stroke-dashoffset 0.5s"}}/>
      <text x={size/2} y={size/2} textAnchor="middle" dominantBaseline="middle" fill={color} fontSize={12} fontFamily="'JetBrains Mono',monospace" fontWeight="700">{pct}%</text>
    </svg>
  );
}

export function MD({src=""}){
  const h=src.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/`(.*?)`/g,"<code>$1</code>").replace(/^### (.*)/gm,"<h3>$1</h3>").replace(/^## (.*)/gm,"<h2>$1</h2>").replace(/^# (.*)/gm,"<h1>$1</h1>").replace(/^- (.*)/gm,"<li>$1</li>").replace(/\n/g,"<br/>");
  return <div className="md" dangerouslySetInnerHTML={{__html:h}}/>;
}