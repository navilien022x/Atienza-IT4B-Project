import type { User } from "../types/index.ts";

// ===== FUNCTIONS (FULLY TYPED) =====

// Get user by ID
function getUser(id: number): User {
  return {
    id,
    name: "Juan dela Cruz",
    email: "juan@example.com",
    role: "student",
    isActive: true,
  };
}

// Calculate grade
function calculateGrade(score: number, maxScore: number): string {
  const percentage: number = (score / maxScore) * 100;

  if (percentage >= 90) return "A";
  if (percentage >= 80) return "B";
  if (percentage >= 70) return "C";
  return "F";
}

// Format course
function formatCourse(name: string, units: number, semester: string): string {
  return `${name} (${units} units) - ${semester}`;
}

// ===== EXECUTION =====

const user: User = getUser(1);

console.log(user);
console.log(calculateGrade(85, 100));
console.log(formatCourse("IT Elective 4", 3, "1st Semester"));