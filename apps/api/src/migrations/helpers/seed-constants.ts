import type {
  DealStatusId,
  NewDealStatus,
  NewTaskPriority,
  NewTaskStatus,
  TaskPriorityId,
  TaskStatusId,
} from '@repo/postgres-types';

export const TASK_STATUS: NewTaskStatus[] = [
  { id: 0 as TaskStatusId, label: 'Backlog' },
  { id: 1 as TaskStatusId, label: 'Todo' },
  { id: 2 as TaskStatusId, label: 'In Progress' },
  { id: 3 as TaskStatusId, label: 'In Review' },
  { id: 4 as TaskStatusId, label: 'Done' },
  { id: 5 as TaskStatusId, label: 'Cancelled' },
];

export const TASK_PRIORITY: NewTaskPriority[] = [
  { id: 0 as TaskPriorityId, label: 'Urgent' },
  { id: 1 as TaskPriorityId, label: 'High' },
  { id: 2 as TaskPriorityId, label: 'Medium' },
  { id: 3 as TaskPriorityId, label: 'Low' },
  { id: 4 as TaskPriorityId, label: 'No Priority' },
];
export const DEAL_STATUS: NewDealStatus[] = [
  {
    id: 'Pre Qualification' as DealStatusId,
    label: 'Pre Qualification',
    order: 0,
  },
  { id: 'Pricing' as DealStatusId, label: 'Pricing', order: 1 },
  { id: 'Approved' as DealStatusId, label: 'Approved', order: 2 },
  { id: 'Underwriting' as DealStatusId, label: 'Underwriting', order: 3 },
  { id: 'Contract' as DealStatusId, label: 'Contract', order: 4 },
  { id: 'Contract Out' as DealStatusId, label: 'Contract Out', order: 5 },
  { id: 'Contact In' as DealStatusId, label: 'Contact In', order: 6 },
  {
    id: 'Final Underwriting Approval' as DealStatusId,
    label: 'Final Underwriting Approval',
    order: 7,
  },
  { id: 'Pre-Funding' as DealStatusId, label: 'Pre-Funding', order: 8 },
  { id: 'Funded' as DealStatusId, label: 'Funded', order: 9 },
];
