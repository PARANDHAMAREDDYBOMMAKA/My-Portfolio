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
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/capstone-46186.appspot.com/o/Screenshot%202025-12-24%20at%209.41.19%E2%80%AFPM.png?alt=media&token=0ec4416d-dadb-43c0-a6bc-af2d37a0cd59",
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
  {
    id: 6,
    title: "Farmcon",
    description: "A web application that connects farmers with consumers, providing a platform for buying and selling fresh produce directly.",
    link: "https://farmcon-cyan.vercel.app/",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/capstone-46186.appspot.com/o/Screenshot%202025-12-24%20at%209.45.07%E2%80%AFPM.png?alt=media&token=26539b98-0b80-4ee2-bcd6-8aad5eea0136",
  },

];
