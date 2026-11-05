/** Central registry of every visual asset used by the template. */
export const MEDIA = {
  hero: "/images/hero-students.jpg",
  campus: "/images/campus-lab.jpg",
  success: "/images/graduate-success.jpg",
  online: "/images/online-learning.jpg",
  mentor: "/images/mentor-session.jpg",
  ai: "/images/ai-abstract.jpg",
  code: "/images/code-screen.jpg",
  design: "/images/design-studio.jpg",
  cloud: "/images/cloud-abstract.jpg",
  aurora: "/images/aurora-bg.jpg",
  portrait1: "/images/portrait-1.jpg",
  portrait2: "/images/portrait-2.jpg",
} as const;

export const GALLERY = [
  { src: MEDIA.hero, title: "Collaborate", caption: "Peer learning that sticks" },
  { src: MEDIA.campus, title: "Build", caption: "Hands-on lab sessions" },
  { src: MEDIA.mentor, title: "Mentorship", caption: "1:1 guidance from experts" },
  { src: MEDIA.success, title: "Get placed", caption: "Careers that take off" },
  { src: MEDIA.online, title: "Learn anywhere", caption: "Live classes, your way" },
] as const;
