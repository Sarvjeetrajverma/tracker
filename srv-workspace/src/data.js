import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Load data from Firestore for a specific user
export async function ld(userId, key, fallback) {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists() && docSnap.data()[key]) {
      return docSnap.data()[key];
    }
    return fallback;
  } catch (error) {
    console.error("Error loading data:", error);
    return fallback;
  }
}

// Save data to Firestore for a specific user
export async function sv(userId, key, value) {
  try {
    const docRef = doc(db, "users", userId);
    await setDoc(docRef, { [key]: value }, { merge: true });
  } catch (error) {
    console.error("Error saving data:", error);
  }
}

export const TODAY = new Date().toISOString().slice(0,10);

export const D_DSA=[
  {id:1,title:"Two Sum",topic:"Array",diff:"Easy",platform:"LeetCode",time:"O(n)",space:"O(n)",notes:"HashMap: store complement as key",date:"2026-01-10",star:true},
  {id:2,title:"Dijkstra's Algorithm",topic:"Graph",diff:"Hard",platform:"GFG",time:"O((V+E)logV)",space:"O(V)",notes:"Min-heap priority queue, relaxation",date:"2026-01-15",star:true},
  {id:3,title:"Longest Common Subsequence",topic:"Dynamic Programming",diff:"Medium",platform:"LeetCode",time:"O(m*n)",space:"O(m*n)",notes:"dp[i][j] = if match, 1+dp[i-1][j-1]",date:"2026-01-20",star:false},
  {id:4,title:"Binary Search",topic:"Binary Search",diff:"Easy",platform:"LeetCode",time:"O(log n)",space:"O(1)",notes:"Classic: lo=0,hi=n-1, while lo<=hi",date:"2026-02-01",star:false},
  {id:5,title:"Number of Islands",topic:"Graph",diff:"Medium",platform:"LeetCode",time:"O(m*n)",space:"O(m*n)",notes:"DFS/BFS to mark visited, count components",date:"2026-02-10",star:true},
];

export const D_NOTES=[
  {id:1,title:"Semaphores & Deadlock",subj:"Operating Systems",content:"**Semaphore**: Integer variable for process synchronization.\n- `wait(S)` — decrement; block if S<0\n- `signal(S)` — increment; wake blocked\n- Binary semaphore = Mutex\n\n**Deadlock 4 Conditions**:\n1. Mutual Exclusion\n2. Hold & Wait\n3. No Preemption\n4. Circular Wait\n\n**Banker's Algorithm**: Safe-state check before allocation.",date:"2026-01-12"},
  {id:2,title:"Memory Management & Paging",subj:"Operating Systems",content:"**Paging**: Divide memory into fixed-size frames.\n- Page Table maps virtual → physical\n- TLB = Translation Lookaside Buffer (cache)\n\n**Page Replacement**:\n- FIFO, LRU, Optimal\n- Belady's Anomaly: FIFO may fault more with more frames\n\n**Segmentation**: Variable-size logical units (code, data, stack)",date:"2026-01-18"},
  {id:3,title:"TCP/IP & OSI Model",subj:"Computer Networks",content:"**OSI 7 Layers** (bottom-up):\n1. Physical — bits, cables\n2. Data Link — MAC, framing\n3. Network — IP, routing\n4. Transport — TCP/UDP\n5. Session — connection mgmt\n6. Presentation — encryption, encoding\n7. Application — HTTP, FTP, DNS\n\n**TCP vs UDP**:\n- TCP: reliable, ordered, connection-oriented\n- UDP: fast, unreliable, connectionless\n\n**3-Way Handshake**: SYN → SYN-ACK → ACK",date:"2026-01-25"},
  {id:4,title:"Normalization & ACID",subj:"DBMS",content:"**Normal Forms**:\n- 1NF: atomic values, no repeating groups\n- 2NF: 1NF + no partial dependency\n- 3NF: 2NF + no transitive dependency\n- BCNF: 3NF + every determinant is candidate key\n\n**ACID Properties**:\n- **A**tomicity — all or nothing\n- **C**onsistency — valid state transition\n- **I**solation — concurrent = serial\n- **D**urability — committed = permanent\n\n**Indexing**: B+ Tree most common, reduces search to O(log n)",date:"2026-02-02"},
  {id:5,title:"OOP Concepts",subj:"Software Engineering",content:"**4 Pillars**:\n1. **Encapsulation** — data hiding, access modifiers\n2. **Abstraction** — hide complexity, show interface\n3. **Inheritance** — IS-A relationship, reuse code\n4. **Polymorphism** — same interface, diff behavior\n\n**SOLID Principles**:\n- S: Single Responsibility\n- O: Open/Closed\n- L: Liskov Substitution\n- I: Interface Segregation\n- D: Dependency Inversion\n\n**Design Patterns**: Singleton, Factory, Observer, Strategy",date:"2026-02-08"},
];

export const D_APPS=[
  {id:1,company:"TCS",role:"Software Engineer",col:"Offer",deadline:"2026-03-15",notes:"CTC: 7 LPA. Accepted.",link:""},
  {id:2,company:"Infosys",role:"Systems Engineer",col:"Applied",deadline:"2026-03-20",notes:"Applied via campus portal",link:""},
  {id:3,company:"Wipro",role:"Project Engineer",col:"OA / Test",deadline:"2026-03-18",notes:"Elite NTH OA scheduled",link:""},
  {id:4,company:"Accenture",role:"ASE",col:"Interview",deadline:"2026-03-25",notes:"Technical + HR rounds remaining",link:""},
  {id:5,company:"Cognizant",role:"Programmer Analyst",col:"Rejected",deadline:"2026-02-28",notes:"Failed OA round",link:""},
];

export const D_PROJECTS=[
  {id:1,name:"Smart Campus Management System",desc:"Final year major project. Web app for managing campus resources, attendance, timetables, and student records. Features role-based auth, real-time notifications.",tech:["React","Node.js","MongoDB","Express","JWT","Socket.io"],status:"In Progress",type:"Major Project",github:"",demo:"",role:"Team Lead",team:4,progress:65},
  {id:2,name:"Real-time Chat Application",desc:"Full-stack chat app with socket.io supporting group rooms, private messaging, online status, and message history.",tech:["Node.js","Socket.io","React","MongoDB","Redis"],status:"Complete",type:"Personal",github:"github.com/",demo:"",role:"Solo",team:1,progress:100},
  {id:3,name:"E-Commerce REST API",desc:"RESTful API backend for an e-commerce platform with product catalog, cart, orders, authentication and Stripe payments integration.",tech:["Node.js","Express","PostgreSQL","JWT","Stripe"],status:"In Progress",type:"Personal",github:"",demo:"",role:"Solo",team:1,progress:45},
  {id:4,name:"Student Portal (Minor Project)",desc:"College minor project — student result and attendance management system with faculty and admin dashboards.",tech:["PHP","MySQL","HTML","CSS","Bootstrap"],status:"Complete",type:"Minor Project",github:"",demo:"",role:"Team Member",team:3,progress:100},
];

export const D_SKILLS=[
  {id:1,name:"C++",cat:"Language",lvl:72,note:"STL, templates, competitive programming",status:"good"},
  {id:2,name:"Python",cat:"Language",lvl:78,note:"Pandas, NumPy, Flask, scripting",status:"good"},
  {id:3,name:"JavaScript",cat:"Language",lvl:82,note:"ES6+, async/await, DOM, Node",status:"strong"},
  {id:4,name:"Java",cat:"Language",lvl:60,note:"OOP, Collections, Spring basics",status:"learning"},
  {id:5,name:"SQL",cat:"Database",lvl:74,note:"MySQL, joins, indexing, stored procs",status:"good"},
  {id:6,name:"React.js",cat:"Framework",lvl:76,note:"Hooks, Context, Redux basics",status:"good"},
  {id:7,name:"Node.js / Express",cat:"Framework",lvl:68,note:"REST APIs, middleware, auth",status:"good"},
  {id:8,name:"MongoDB",cat:"Database",lvl:62,note:"CRUD, aggregation pipeline",status:"learning"},
  {id:9,name:"Git & GitHub",cat:"Tool",lvl:82,note:"Branching, PRs, CI workflows",status:"strong"},
  {id:10,name:"Linux / Bash",cat:"Tool",lvl:58,note:"File ops, shell scripts, cron",status:"learning"},
  {id:11,name:"Docker",cat:"DevOps",lvl:35,note:"Basics — build, run, compose",status:"beginner"},
  {id:12,name:"AWS",cat:"Cloud",lvl:40,note:"EC2, S3, IAM, basics",status:"beginner"},
  {id:13,name:"System Design",cat:"CS Core",lvl:42,note:"HLD/LLD, CAP theorem, scalability",status:"learning"},
  {id:14,name:"DBMS",cat:"CS Core",lvl:76,note:"Normalization, transactions, indexing",status:"good"},
  {id:15,name:"OS Concepts",cat:"CS Core",lvl:72,note:"Processes, memory, scheduling, sync",status:"good"},
  {id:16,name:"Computer Networks",cat:"CS Core",lvl:66,note:"TCP/IP, HTTP, DNS, OSI model",status:"learning"},
  {id:17,name:"Machine Learning",cat:"AI/ML",lvl:50,note:"sklearn, regression, classification",status:"learning"},
  {id:18,name:"Data Structures",cat:"CS Core",lvl:74,note:"Trees, graphs, heaps, tries",status:"good"},
];

export const D_HR=[
  {id:1,q:"Tell me about yourself.",cat:"Introduction",done:false,star:true,notes:"1 min pitch: background → skills → projects → goal"},
  {id:2,q:"Why do you want to work at our company?",cat:"Motivation",done:false,star:true,notes:"Research company, align with their values & tech stack"},
  {id:3,q:"What are your greatest strengths?",cat:"Self-Assessment",done:false,star:false,notes:"Problem-solving, quick learner, team player — back with examples"},
  {id:4,q:"What is your greatest weakness?",cat:"Self-Assessment",done:false,star:false,notes:"Overthinking — working on it by time-boxing decisions"},
  {id:5,q:"Where do you see yourself in 5 years?",cat:"Career Goals",done:false,star:true,notes:"Senior developer → architect track, deep expertise"},
  {id:6,q:"Why should we hire you?",cat:"Value Proposition",done:false,star:true,notes:"Strong CS fundamentals + full stack + project experience + fast learner"},
  {id:7,q:"Describe a challenging situation and how you resolved it",cat:"Behavioral",done:false,star:false,notes:"STAR: Major project — API performance bottleneck, optimized queries"},
  {id:8,q:"Tell me about a time you worked effectively in a team",cat:"Behavioral",done:false,star:false,notes:"STAR: 4-person team, divided modules, weekly syncs"},
  {id:9,q:"How do you handle tight deadlines and pressure?",cat:"Work Style",done:false,star:false,notes:"Prioritize tasks, break into milestones, communicate early"},
  {id:10,q:"What is your expected CTC?",cat:"Compensation",done:false,star:true,notes:"Research market: fresher SWE 6-12 LPA in India. Be confident."},
  {id:11,q:"Do you have any questions for us?",cat:"Closing",done:false,star:true,notes:"Ask: tech stack, team structure, onboarding, growth path"},
  {id:12,q:"Tell me about your final year project",cat:"Technical",done:false,star:true,notes:"Smart Campus: React+Node+MongoDB. Your role, challenges solved."},
  {id:13,q:"What projects have you built independently?",cat:"Technical",done:false,star:true,notes:"Chat App, REST API — explain tech choices"},
  {id:14,q:"How do you stay updated with technology?",cat:"Learning",done:false,star:false,notes:"LeetCode, GFG, YouTube, Coursera, dev blogs"},
  {id:15,q:"Describe your leadership experience",cat:"Leadership",done:false,star:false,notes:"Team lead for major project — task division, code reviews"},
  {id:16,q:"Tell me about a failure and what you learned from it",cat:"Behavioral",done:false,star:false,notes:"STAR: Failed to estimate time for a feature — learned planning"},
  {id:17,q:"Are you comfortable relocating?",cat:"Logistics",done:false,star:false,notes:"Be honest about preference, stay flexible"},
  {id:18,q:"What motivates you to write code?",cat:"Motivation",done:false,star:false,notes:"Problem-solving satisfaction, building things people use"},
  {id:19,q:"How quickly can you learn a new technology?",cat:"Learning",done:false,star:false,notes:"Example: Learned React in 2 weeks for a project deadline"},
  {id:20,q:"What is your CGPA and can you explain it?",cat:"Academic",done:false,star:false,notes:"Be honest, highlight upward trend if any"},
];

export const D_PATTERNS=[
  {id:1,name:"Two Pointers",desc:"Move two indices toward each other or same direction on sorted/linear structure.",probs:["Valid Palindrome","3Sum","Container With Most Water","Remove Duplicates"],done:false,cat:"Array"},
  {id:2,name:"Sliding Window",desc:"Maintain a contiguous subarray window of fixed or variable size.",probs:["Longest Substring Without Repeat","Max Sum Subarray K","Minimum Size Subarray"],done:false,cat:"Array"},
  {id:3,name:"Fast & Slow Pointers",desc:"Two pointers at different speeds for cycle detection.",probs:["Linked List Cycle","Middle of LinkedList","Happy Number"],done:false,cat:"LinkedList"},
  {id:4,name:"Binary Search",desc:"Divide search space in half each step on sorted/monotonic data.",probs:["Search in Rotated Array","Find Peak Element","Koko Eating Bananas","Median of Two Sorted Arrays"],done:false,cat:"Array"},
  {id:5,name:"BFS (Tree / Graph)",desc:"Level-order traversal using queue. Shortest path in unweighted graphs.",probs:["Binary Tree Level Order","Minimum Depth","Rotten Oranges","Word Ladder"],done:false,cat:"Tree/Graph"},
  {id:6,name:"DFS (Tree / Graph)",desc:"Depth-first using recursion or stack. Paths, components, backtracking.",probs:["Path Sum","Number of Islands","Clone Graph","Pacific Atlantic Water Flow"],done:false,cat:"Tree/Graph"},
  {id:7,name:"Dynamic Programming",desc:"Overlapping subproblems + optimal substructure. Memoization or tabulation.",probs:["Climbing Stairs","Coin Change","LCS","0-1 Knapsack","Edit Distance"],done:false,cat:"DP"},
  {id:8,name:"Backtracking",desc:"Explore all options recursively and backtrack on invalid paths.",probs:["N-Queens","Subsets","Permutations","Word Search","Sudoku Solver"],done:false,cat:"Recursion"},
  {id:9,name:"Heap / Priority Queue",desc:"Efficient min/max retrieval for top-K and merge problems.",probs:["Kth Largest Element","Top K Frequent","Merge K Sorted Lists","Task Scheduler"],done:false,cat:"Heap"},
  {id:10,name:"Merge Intervals",desc:"Sort by start, merge overlapping ranges.",probs:["Merge Intervals","Insert Interval","Non-Overlapping Intervals","Meeting Rooms II"],done:false,cat:"Array"},
  {id:11,name:"Topological Sort",desc:"Linear ordering of DAG vertices for dependency problems.",probs:["Course Schedule","Course Schedule II","Alien Dictionary","Build Order"],done:false,cat:"Graph"},
  {id:12,name:"Union Find (DSU)",desc:"Efficiently track and merge connected components.",probs:["Number of Provinces","Redundant Connection","Accounts Merge"],done:false,cat:"Graph"},
  {id:13,name:"Trie",desc:"Prefix tree for efficient string operations and autocomplete.",probs:["Implement Trie","Word Search II","Replace Words","Design Search Autocomplete"],done:false,cat:"Trie"},
  {id:14,name:"Monotonic Stack",desc:"Stack maintaining increasing/decreasing order for next greater/smaller.",probs:["Daily Temperatures","Next Greater Element","Largest Rectangle Histogram","Trapping Rain Water"],done:false,cat:"Stack"},
  {id:15,name:"Greedy",desc:"Locally optimal choice at each step leads to global optimum.",probs:["Jump Game","Gas Station","Activity Selection","Minimum Platforms"],done:false,cat:"Greedy"},
  {id:16,name:"Bit Manipulation",desc:"Use XOR, AND, OR, shifts for space-efficient tricks.",probs:["Single Number","Number of 1 Bits","Reverse Bits","Power of Two"],done:false,cat:"Bits"},
];

export const D_SYSDESIGN=[
  {id:1,topic:"URL Shortener (TinyURL)",status:"not_started",notes:"",diff:"Medium",concepts:["Hashing","Base62","Database Design","Caching","Load Balancing"]},
  {id:2,topic:"Rate Limiter",status:"not_started",notes:"",diff:"Medium",concepts:["Token Bucket","Sliding Window Counter","Redis","Distributed Systems"]},
  {id:3,topic:"Chat Application (WhatsApp-like)",status:"not_started",notes:"",diff:"Hard",concepts:["WebSockets","Message Queue","DB Schema","Notifications","End-to-End Encryption"]},
  {id:4,topic:"Social Media Feed (Instagram/Twitter)",status:"not_started",notes:"",diff:"Hard",concepts:["Fan-out on Write/Read","CDN","Caching","Database Sharding","Feed Ranking"]},
  {id:5,topic:"Search Autocomplete System",status:"not_started",notes:"",diff:"Medium",concepts:["Trie","Caching","Ranking","API Design","Real-time Updates"]},
  {id:6,topic:"Parking Lot (Low Level Design)",status:"not_started",notes:"",diff:"Easy",concepts:["OOP","Design Patterns","UML","State Machine","SOLID Principles"]},
  {id:7,topic:"Elevator System (Low Level Design)",status:"not_started",notes:"",diff:"Medium",concepts:["OOP","Scheduling Algorithms","Observer Pattern","State Management"]},
  {id:8,topic:"Notification System",status:"not_started",notes:"",diff:"Medium",concepts:["Message Queue (Kafka)","Push/Pull","Database","API Gateway","Retry Logic"]},
  {id:9,topic:"Video Streaming (Netflix/YouTube)",status:"not_started",notes:"",diff:"Hard",concepts:["CDN","Video Encoding","Adaptive Bitrate","Storage","Recommendation Engine"]},
  {id:10,topic:"Ride Sharing (Uber/Ola)",status:"not_started",notes:"",diff:"Hard",concepts:["Geolocation","Matching Algorithm","Real-time Tracking","Surge Pricing","Maps API"]},
];

export const D_CERTS=[
  {id:1,name:"AWS Cloud Practitioner (CLF-C02)",platform:"Amazon AWS",cat:"Cloud",progress:15,target:"2026-05-01",status:"In Progress",notes:"Priority — needed for cloud JDs. Practice tests daily."},
  {id:2,name:"NPTEL Python Programming",platform:"NPTEL/Swayam",cat:"Language",progress:100,target:"2025-11-01",status:"Completed",notes:"Elite certificate (top 2%). Add to resume!"},
  {id:3,name:"Machine Learning Specialization",platform:"Coursera (Andrew Ng)",cat:"AI/ML",progress:62,target:"2026-04-15",status:"In Progress",notes:"On Week 8. Neural networks next."},
  {id:4,name:"Meta Front-End Developer",platform:"Coursera (Meta)",cat:"Web Dev",progress:35,target:"2026-06-01",status:"In Progress",notes:"Completed HTML/CSS/React basics courses."},
  {id:5,name:"Google Data Analytics Certificate",platform:"Coursera (Google)",cat:"Data",progress:0,target:"2026-07-01",status:"Not Started",notes:"Good for data analyst roles."},
  {id:6,name:"Docker & Kubernetes Fundamentals",platform:"KodeKloud / Udemy",cat:"DevOps",progress:20,target:"2026-04-30",status:"In Progress",notes:"Containerization basics done."},
  {id:7,name:"Full Stack Web Dev Bootcamp",platform:"Udemy (Angela Yu)",cat:"Web Dev",progress:80,target:"2026-03-01",status:"In Progress",notes:"Almost done! Great for portfolio projects."},
  {id:8,name:"Competitive Programming 101",platform:"Codeforces / ICPC",cat:"DSA",progress:45,target:"2026-04-01",status:"In Progress",notes:"CF rating target: 1200 (Pupil)"},
];

export const D_TODOS=[
  {id:1,text:"Solve 3 LeetCode Medium problems",cat:"DSA",pri:"High",done:false,date:TODAY,est:90},
  {id:2,text:"Complete Normalization chapter — DBMS",cat:"Studies",pri:"Medium",done:false,date:TODAY,est:60},
  {id:3,text:"Work on Smart Campus — Auth module",cat:"Project",pri:"High",done:false,date:TODAY,est:120},
  {id:4,text:"Watch AWS S3 + IAM tutorial",cat:"Cloud",pri:"Medium",done:true,date:TODAY,est:45},
  {id:5,text:"Practice 'Tell me about yourself' out loud",cat:"Interview",pri:"High",done:false,date:TODAY,est:20},
  {id:6,text:"Push code to GitHub — daily streak",cat:"Project",pri:"Medium",done:true,date:TODAY,est:15},
];