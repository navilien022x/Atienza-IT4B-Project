export interface User {
  id: number;
  name: string;
  email: string;
  role: "student" | "admin" | "instructor";
  isActive: boolean;
  score: number;
}

export interface Course {
  code: string;
  title: string;
  units: number;
  semester: string;
}

export interface Submission {
  id: number;
  studentId: number;
  courseCode: string;
  repoUrl: string;
  submittedAt: Date;
  score?: number;
}

// ONLY TYPES BELOW THIS LINE

export type ID = number | string;

export type Coordinate = {
  x: number;
  y: number;
};

export type Formatter = (value: number) => string;

export type StringOrNumber = string | number;

export type Status = "pending" | "active" | "inactive";

export function printId(id: StringOrNumber): void {
  console.log(`ID: ${id}`);
}

export type StudentWithCourse = User & {
  enrolledCourse: Course;
  gpa: number;
};