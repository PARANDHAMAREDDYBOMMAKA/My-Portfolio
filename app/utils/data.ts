// utils/data.ts
export interface Project {
  id: number;
  title: string;
  description: string;
  link: string;
  imageUrl: string; // New field for project image or video thumbnail
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Open World Games Explore",
    description: "A platform where users can explore a variety of open-world games, filter them based on preferences, and discover new adventures.",
    link: "https://frontend-gamma-woad.vercel.app/",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/capstone-46186.appspot.com/o/Screenshot%202024-08-31%20at%202.44.56%E2%80%AFPM.png?alt=media&token=3cb1a934-8047-4195-ae7e-5dcc1039b571",
  },
  {
    id: 2,
    title: "Examinato",
    description: "An online examination platform that provides a seamless experience for students and educators, including automated grading and analytics.",
    link: "https://client-ten-navy.vercel.app/",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/capstone-46186.appspot.com/o/Screenshot%202024-08-31%20at%202.41.09%E2%80%AFPM.png?alt=media&token=01312103-0d82-4641-806e-d13b901bdccd",
  },
  {
    id: 3,
    title: "Converse",
    description: "A social networking platform that connects people with similar interests and provides a safe space for meaningful conversations.",
    link: "https://chat-app-silk-nine.vercel.app/",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/capstone-46186.appspot.com/o/Screenshot%202025-03-21%20at%2011.12.26%E2%80%AFAM.png?alt=media&token=dea37517-ca2a-438f-894c-08e57d529df8",
  },
  {
    id: 4,
    title: "Claims Management",
    description: "A web application that simplifies the process of managing insurance claims for both patients and insurance companies.",
    link: "https://minimal-claims.vercel.app/",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/capstone-46186.appspot.com/o/Screenshot%202025-03-21%20at%2011.14.48%E2%80%AFAM.png?alt=media&token=7ec9c700-e944-4224-961c-f87ec6e8d8a1",
  },
  {
    id: 5,
    title: "Library management",
    description: "A platfrom where the library can manage their books and users can borrow books.",
    link: "https://library-management-gamma-nine.vercel.app/",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/capstone-46186.appspot.com/o/Screenshot%202025-03-21%20at%2011.17.18%E2%80%AFAM.png?alt=media&token=b40c321e-11dd-42d5-a407-fbf683a7a59e",
  },

  // Add more projects as needed
];
