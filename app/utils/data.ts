export interface Project {
  [x: string]: any;
  id: number;
  title: string;
  description: string;
  link: string;
  imageUrl: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Open World Games Explore",
    description: "Built this to scratch my own itch — I wanted a better way to browse open-world games. The fun part was wiring up the filtering logic to feel instant, even with a lot of data.",
    link: "https://frontend-gamma-woad.vercel.app/",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/capstone-46186.appspot.com/o/Screenshot%202024-08-31%20at%202.44.56%E2%80%AFPM.png?alt=media&token=3cb1a934-8047-4195-ae7e-5dcc1039b571",
  },
  {
    id: 2,
    title: "Examinato",
    description: "An online exam platform with automated grading. The tricky part was making the timer sync reliably across sessions and handling edge cases when students lose connection mid-exam.",
    link: "https://client-ten-navy.vercel.app/",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/capstone-46186.appspot.com/o/Screenshot%202024-08-31%20at%202.41.09%E2%80%AFPM.png?alt=media&token=01312103-0d82-4641-806e-d13b901bdccd",
  },
  {
    id: 3,
    title: "Converse",
    description: "A real-time chat app. This was my deep dive into WebSockets and managing live state across users. Learned a lot about what happens when two people type at the same time.",
    link: "https://chat-app-silk-nine.vercel.app/",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/capstone-46186.appspot.com/o/Screenshot%202025-12-24%20at%209.41.19%E2%80%AFPM.png?alt=media&token=0ec4416d-dadb-43c0-a6bc-af2d37a0cd59",
  },
  {
    id: 4,
    title: "Claims Management",
    description: "Built for managing insurance claims end-to-end. The challenge was modeling the claim lifecycle with all its status transitions and making the UI clear for non-technical users.",
    link: "https://minimal-claims.vercel.app/",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/capstone-46186.appspot.com/o/Screenshot%202025-03-21%20at%2011.14.48%E2%80%AFAM.png?alt=media&token=7ec9c700-e944-4224-961c-f87ec6e8d8a1",
  },
  {
    id: 5,
    title: "Library Management",
    description: "A system for tracking books and borrowers. Straightforward on the surface, but handling overdue logic, availability states, and search across thousands of records taught me a lot about data modeling.",
    link: "https://library-management-gamma-nine.vercel.app/",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/capstone-46186.appspot.com/o/Screenshot%202025-03-21%20at%2011.17.18%E2%80%AFAM.png?alt=media&token=b40c321e-11dd-42d5-a407-fbf683a7a59e",
  },
  {
    id: 6,
    title: "Farmcon",
    description: "Connects farmers directly with consumers. The interesting problem was designing the product listing flow so farmers with limited tech experience could manage their inventory easily.",
    link: "https://farmcon-cyan.vercel.app/",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/capstone-46186.appspot.com/o/Screenshot%202025-12-24%20at%209.45.07%E2%80%AFPM.png?alt=media&token=26539b98-0b80-4ee2-bcd6-8aad5eea0136",
  },
];
