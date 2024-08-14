export interface leaverequest{
  requestId: number;
  studentId: number;
  requestDate: Date;
  reason: string;
  status: string;
  approverId?: number;
  approvalDate?: Date;
}