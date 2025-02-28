export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export interface TaskCreate {
  title: string;
  description: string;
}

export type FilterType = "ALL" | "COMPLETED" | "PENDING";
