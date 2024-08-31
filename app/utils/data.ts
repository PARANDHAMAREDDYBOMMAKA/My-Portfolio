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
  // Add more projects as needed
];
