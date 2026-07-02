export type Status = 'Live' | 'In Progress' | 'Proposed';
export type Priority = 'High' | 'Medium' | 'Low';

export interface UseCase {
  id: string;
  name: string;
  resort: string;
  department: string;
  owner: string;
  priority: Priority;
  status: Status;
  roiEstimate: string;
  savings: number;
  adoption: number;
}
