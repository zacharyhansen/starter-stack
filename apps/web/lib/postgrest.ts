import { PostgrestClient } from '@supabase/postgrest-js';
import type {
  Business,
  BusinessUpdate,
  Deal,
  DealStatus,
  DealStatusUpdate,
  DealUpdate,
  NewBusiness,
  NewDeal,
  NewDealStatus,
  NewTask,
  NewTaskPriority,
  NewTaskStatus,
  NewUser,
  Task,
  TaskPriority,
  TaskPriorityUpdate,
  TaskStatus,
  TaskStatusUpdate,
  TaskUpdate,
  User,
  UserUpdate,
  ViewOrganizationBusiness,
  ViewOrganizationUser,
} from '@repo/postgres-types';
import type {
  NewOpportunity,
  Opportunity,
  OpportunityUpdate,
} from '@repo/postgres-types/src/TenantBaseOrg/Opportunity';

interface Database {
  public: {
    Tables: {
      user: {
        Row: User;
        Insert: NewUser;
        Update: UserUpdate;
      };
      // ... other tables
    };
    // Views: {};
    // Functions: {};
  };
  ['tenant_base_org']: {
    Tables: {
      task: {
        Row: Task;
        Insert: NewTask;
        Update: TaskUpdate;
      };
      business: {
        Row: Business;
        Insert: NewBusiness;
        Update: BusinessUpdate;
      };
      opportunity: {
        Row: Opportunity;
        Insert: NewOpportunity;
        Update: OpportunityUpdate;
      };
      task_status: {
        Row: TaskStatus;
        Insert: NewTaskStatus;
        Update: TaskStatusUpdate;
      };
      deal_status: {
        Row: DealStatus;
        Insert: NewDealStatus;
        Update: DealStatusUpdate;
      };
      task_priority: {
        Row: TaskPriority;
        Insert: NewTaskPriority;
        Update: TaskPriorityUpdate;
      };
      deal: {
        Row: Deal;
        Insert: NewDeal;
        Update: DealUpdate;
      };
      view_organization_business: {
        Row: ViewOrganizationBusiness;
      };
      // ... other tables
    };
    Views: {
      view_organization_user: {
        Row: ViewOrganizationUser;
      };
      view_organization_business: {
        Row: ViewOrganizationBusiness;
      };
    };
    // Functions: {
    //   // ... any functions you have
    // };
  };
  // ... other schemas if you have any
}

const postgrest = new PostgrestClient<Database>(
  process.env.NEXT_PUBLIC_POSTGREST_URL!
);

export default postgrest;
