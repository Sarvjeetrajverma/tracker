// src/App.jsx
import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./index.css";
import { TODAY, ld, D_DSA, D_NOTES, D_APPS, D_PROJECTS, D_SKILLS, D_HR, D_PATTERNS, D_SYSDESIGN, D_CERTS, D_TODOS } from "./data";
import { M, DBtn } from "./components/ui/Shared";

import Auth from "./components/Auth";
import Home from "./components/Home";
import DSATracker from "./components/DSATracker";
import CSVault from "./components/CSVault";
import Jobs from "./components/Jobs";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Interview from "./components/Interview";
import Certs from "./components/Certs";
import Planner from "./components/Planner";

const TABS = [
  { id: "home", icon: "🏠", label: "Home" },
  { id: "dsa", icon: "⚡", label: "DSA Tracker" },
  { id: "vault", icon: "📚", label: "CS Vault" },
  { id: "jobs", icon: "🗂", label: "Applications" },
  { id: "projects", icon: "💼", label: "Projects" },
  { id: "skills", icon: "🛠", label: "Skills" },
  { id: "interview", icon: "🎯", label: "Interview Prep" },
  { id: "certs", icon: "📜", label: "Certifications" },
  { id: "planner", icon: "📅", label: "Daily Planner" },
];

export default function App() {
  const [user, setUser] = useState(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [tab, setTab] = useState("home");
  const [loaded, setLoaded] = useState(false);
  
  const [problems, setProblems] = useState(D_DSA);
  const [notes, setNotes] = useState(D_NOTES);
  const [apps, setApps] = useState(D_APPS);
  const [projects, setProjects] = useState(D_PROJECTS);
  const [skills, setSkills] = useState(D_SKILLS);
  const [hrQ, setHrQ] = useState(D_HR);
  const [patterns, setPatterns] = useState(D_PATTERNS);
  const [sysdesign, setSysdesign] = useState(D_SYSDESIGN);
  const [certs, setCerts] = useState(D_CERTS);
  const [todos, setTodos] = useState(D_TODOS);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthChecking(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    (async () => {
      setLoaded(false);
      const uid = user.uid;
      const [d, n, a, pr, sk, h, pa, sd, ce, td] = await Promise.all([
        ld(uid, "dsa", D_DSA), ld(uid, "notes", D_NOTES), ld(uid, "apps", D_APPS), 
        ld(uid, "projects", D_PROJECTS), ld(uid, "skills", D_SKILLS), 
        ld(uid, "hrq", D_HR), ld(uid, "patterns", D_PATTERNS), 
        ld(uid, "sysdesign", D_SYSDESIGN), ld(uid, "certs", D_CERTS), ld(uid, "todos", D_TODOS),
      ]);
      setProblems(d); setNotes(n); setApps(a); setProjects(pr); setSkills(sk); setHrQ(h); setPatterns(pa); setSysdesign(sd); setCerts(ce); setTodos(td); 
      setLoaded(true);
    })();
  }, [user]);

  if (authChecking) return <div style={{ background: "#010409", height: "100vh" }}/>;
  if (!user) return <Auth />;
  if (!loaded) return (
    <div style={{ height: "100vh", background: "#010409", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ ...M, color: "#238636", fontSize: 14 }}>Loading your personal dashboard...</div>
    </div>
  );

  return (
    <div style={{ height: "100vh", background: "#010409", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ background: "#0d1117", borderBottom: "1px solid #21262d", display: "flex", alignItems: "center", gap: 0, overflowX: "auto", flexShrink: 0 }}>
        <div style={{ padding: "0 16px", display: "flex", alignItems: "center", gap: 8, borderRight: "1px solid #21262d", height: 46, flexShrink: 0 }}>
          <span style={{ fontSize: 16 }}>🎓</span>
          <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 14, color: "#e6edf3", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>CCSE Final Year</span>
        </div>
        <div style={{ display: "flex", overflowX: "auto" }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ background: "transparent", border: "none", borderBottom: "2px solid " + (tab === t.id ? "#58a6ff" : "transparent"), padding: "0 14px", height: 46, color: tab === t.id ? "#58a6ff" : "#8b949e", ...M, fontSize: 11, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap", flexShrink: 0 }}>
              <span style={{ fontSize: 14 }}>{t.icon}</span>{t.label}
            </button>
          ))}
        </div>
        <div style={{ marginLeft: "auto", padding: "0 16px", display: "flex", alignItems: "center", borderLeft: "1px solid #21262d", height: 46 }}>
           <DBtn onClick={() => signOut(auth)}>Log Out</DBtn>
        </div>
      </div>
      
      <div style={{ flex: 1, padding: 16, overflow: "hidden", minHeight: 0 }}>
        {tab === "home" && <Home dsaList={problems} appList={apps} todoList={todos} skillList={skills} certList={certs} projList={projects} />}
        {tab === "dsa" && <DSATracker problems={problems} setProblems={setProblems} uid={user.uid} />}
        {tab === "vault" && <CSVault notes={notes} setNotes={setNotes} uid={user.uid} />}
        {tab === "jobs" && <Jobs apps={apps} setApps={setApps} uid={user.uid} />}
        {tab === "projects" && <Projects projects={projects} setProjects={setProjects} uid={user.uid} />}
        {tab === "skills" && <Skills skills={skills} setSkills={setSkills} uid={user.uid} />}
        {tab === "interview" && <Interview hrQ={hrQ} setHrQ={setHrQ} patterns={patterns} setPatterns={setPatterns} sysdesign={sysdesign} setSysdesign={setSysdesign} uid={user.uid} />}
        {tab === "certs" && <Certs certs={certs} setCerts={setCerts} uid={user.uid} />}
        {tab === "planner" && <Planner todos={todos} setTodos={setTodos} uid={user.uid} />}
      </div>
    </div>
  );
}