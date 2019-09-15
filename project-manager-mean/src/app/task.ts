export class Task {
  constructor(
    public Id: number,
    public TaskName: string,
    public Priority: number,
    public ParentTaskName: string,
    public StartDate: string,
    public EndDate: string
  ) {}
}
