export interface Project {
  [x: string]: any;
  id: number;
  title: string;
  kicker: string;
  description: string;
  link?: string;
  repo?: string;
  proxy?: boolean;
  tags: string[];
  imageUrl?: string;
}

const GITHUB = "https://github.com/PARANDHAMAREDDYBOMMAKA";

export const projects: Project[] = [
  {
    id: 1,
    title: "Tone",
    kicker: "At Product Fusion, May 2025 to present",
    description:
      "An open-source platform for building AI voice agents. I work across it: the RAG pipeline, self-hosted speech and language models on GPU Kubernetes, evals and benchmarks, phone and web calling, and the Next.js interface.",
    link: "https://www.trytone.ai/",
    repo: "https://github.com/tonehq/tone",
    tags: ["Python", "FastAPI", "Next.js", "Pipecat", "pgvector", "Kubernetes"],
  },
  {
    id: 2,
    title: "ClaimGuard",
    kicker: "Solo build, Jul to Aug 2026",
    description:
      "Reads hospital insurance claims with a vision-language model, checks them for duplicates, tampering and implausible figures, then auto-approves or routes them to a reviewer. Every decision lands in a hash-chained audit log.",
    link: "https://claimguard-pi.vercel.app/",
    proxy: true,
    repo: `${GITHUB}/cm`,
    tags: ["Spring Boot", "Next.js", "Postgres", "Workers AI", "Groq"],
  },
  {
    id: 3,
    title: "Voice Agent Pipeline",
    kicker: "Solo build in Go, Jun 2026",
    description:
      "A real-time voice agent written from scratch in Go: speech-to-text, an LLM with tool calling, and text-to-speech streamed over a phone call, with a state machine that handles barge-in.",
    repo: `${GITHUB}/go-pipeline`,
    tags: ["Go", "Twilio", "Deepgram", "Cartesia", "OpenAI"],
  },
  {
    id: 4,
    title: "Kube",
    kicker: "Solo build in Go, Mar to Jul 2026",
    description:
      "A self-hosted Kubernetes-as-a-service API. REST endpoints create, scale and delete real k3s clusters inside Docker, behind JWT auth and per-IP rate limiting.",
    repo: `${GITHUB}/kubernetes`,
    tags: ["Go", "k3s", "Docker", "JWT"],
  },
  {
    id: 5,
    title: "FarmCon",
    kicker: "Solo build, Jan to Apr 2025",
    description:
      "A marketplace connecting farmers, suppliers and buyers, with a dashboard for each. Real-time order notifications over Socket.io, and search that went from 500 ms to 50 ms with MeiliSearch and Redis.",
    link: "https://farmcon-cyan.vercel.app/",
    repo: `${GITHUB}/farmcon`,
    tags: ["Next.js 15", "PostgreSQL", "Prisma", "Socket.io", "Redis"],
  },
  {
    id: 6,
    title: "Converse",
    kicker: "Solo build",
    description:
      "A real-time chat app with video and audio calls. This was my deep dive into live state across users, and what happens when two people type at the same time.",
    link: "https://chat-app-silk-nine.vercel.app/",
    imageUrl: "/projects/converse.jpg",
    repo: `${GITHUB}/realtime-chat-application`,
    tags: ["Next.js", "Convex", "Clerk", "LiveKit"],
  },
  {
    id: 7,
    title: "Examinato",
    kicker: "Capstone project",
    description:
      "An online exam platform with automated grading. The tricky part was making the timer sync reliably across sessions and handling students who lose connection mid-exam.",
    link: "https://client-ten-navy.vercel.app/",
    tags: ["JavaScript"],
  },
  {
    id: 8,
    title: "Open World Games Explore",
    kicker: "Side project",
    description:
      "Built to scratch my own itch: a better way to browse open-world games. The fun part was making the filtering feel instant, even with a lot of data.",
    link: "https://frontend-gamma-woad.vercel.app/",
    tags: ["JavaScript"],
  },
  {
    id: 9,
    title: "Claims Management",
    kicker: "Side project",
    description:
      "Manages insurance claims end to end. The challenge was modelling the claim lifecycle with all its status transitions and keeping the UI clear for non-technical users.",
    link: "https://minimal-claims.vercel.app/",
    tags: ["JavaScript"],
  },
  {
    id: 10,
    title: "Library Management",
    kicker: "Side project",
    description:
      "Tracks books and borrowers. Simple on the surface, but overdue logic, availability states and search across thousands of records taught me a lot about data modelling.",
    link: "https://library-management-gamma-nine.vercel.app/",
    tags: ["TypeScript"],
  },
];
