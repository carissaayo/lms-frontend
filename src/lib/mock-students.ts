export interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
  progress: number;
  enrolledAt: string;
}

const courses = [
  "React Basics",
  "Node.js Mastery",
  "UI/UX Design",
  "TypeScript 101",
  "MongoDB Fundamentals",
];

const getRandomDate = () => {
  const start = new Date(2025, 0, 1);
  const end = new Date();
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return date.toISOString().split("T")[0];
};

const names = [
  "Jane Doe",
  "John Smith",
  "Alice Johnson",
  "Bob Williams",
  "Sara Adams",
  "Tom Clark",
  "Liam Brown",
  "Emma Davis",
  "Noah Wilson",
  "Olivia Moore",
  "Mason Lee",
  "Sophia Taylor",
  "Lucas White",
  "Ava Harris",
  "Ethan Martin",
  "Isla Thompson",
  "Logan Walker",
  "Chloe King",
  "James Wright",
  "Amelia Scott",
  "Benjamin Green",
  "Harper Young",
  "Elijah Allen",
  "Ella Hill",
  "Daniel Hall",
  "Grace Rivera",
  "Matthew Turner",
  "Lily Phillips",
  "Sebastian Campbell",
  "Zoe Parker",
];

export function fetchStudents(): Promise<Student[]> {
  const students: Student[] = names.map((name, index) => {
    const email = name.toLowerCase().replace(" ", ".") + "@example.com";
    return {
      id: (index + 1).toString(),
      name,
      email,
      course: courses[Math.floor(Math.random() * courses.length)],
      progress: Math.floor(Math.random() * 101), // 0 - 100%
      enrolledAt: getRandomDate(),
    };
  });

  return new Promise((resolve) => {
    setTimeout(() => resolve(students), 800); // Simulate 800ms API delay
  });
}
