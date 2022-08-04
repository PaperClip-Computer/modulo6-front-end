export interface ExamItemInfo {
  name: string;
  text?: string;
}

export interface UserExamData {
  name: string;
  data: ExamItemInfo[];
}
