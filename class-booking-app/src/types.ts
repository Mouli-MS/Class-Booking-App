export type ClassLevel = "Beginner" | "Intermediate" | "Advanced";

export interface Class {
  id: string;
  name: string;
  level: ClassLevel;
  instructor: string;
  center: string;
}
