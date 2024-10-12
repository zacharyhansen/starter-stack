export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      business: {
        Row: {
          address: string | null;
          address_line_2: string | null;
          business_type: string | null;
          city: string | null;
          county: string | null;
          created_at: string;
          date_business_began: string | null;
          dba: string | null;
          debt: number | null;
          duns: string | null;
          email: string | null;
          external_id: string | null;
          id: string;
          industry: string | null;
          name_display: string | null;
          name_legal: string | null;
          phone: string | null;
          revenue_average: number | null;
          state: Database['public']['Enums']['state_usa'] | null;
          tin: string | null;
          updated_at: string;
          zip_code: string | null;
        };
        Insert: {
          address?: string | null;
          address_line_2?: string | null;
          business_type?: string | null;
          city?: string | null;
          county?: string | null;
          created_at?: string;
          date_business_began?: string | null;
          dba?: string | null;
          debt?: number | null;
          duns?: string | null;
          email?: string | null;
          external_id?: string | null;
          id?: string;
          industry?: string | null;
          name_display?: string | null;
          name_legal?: string | null;
          phone?: string | null;
          revenue_average?: number | null;
          state?: Database['public']['Enums']['state_usa'] | null;
          tin?: string | null;
          updated_at?: string;
          zip_code?: string | null;
        };
        Update: {
          address?: string | null;
          address_line_2?: string | null;
          business_type?: string | null;
          city?: string | null;
          county?: string | null;
          created_at?: string;
          date_business_began?: string | null;
          dba?: string | null;
          debt?: number | null;
          duns?: string | null;
          email?: string | null;
          external_id?: string | null;
          id?: string;
          industry?: string | null;
          name_display?: string | null;
          name_legal?: string | null;
          phone?: string | null;
          revenue_average?: number | null;
          state?: Database['public']['Enums']['state_usa'] | null;
          tin?: string | null;
          updated_at?: string;
          zip_code?: string | null;
        };
        Relationships: [];
      };
      business_user: {
        Row: {
          business_id: string;
          created_at: string;
          expense_average_monthly: number | null;
          id: string;
          income_average_monthly: number | null;
          job_title: string | null;
          owernship: number | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          business_id: string;
          created_at?: string;
          expense_average_monthly?: number | null;
          id?: string;
          income_average_monthly?: number | null;
          job_title?: string | null;
          owernship?: number | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          business_id?: string;
          created_at?: string;
          expense_average_monthly?: number | null;
          id?: string;
          income_average_monthly?: number | null;
          job_title?: string | null;
          owernship?: number | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'business_user_business_id_foreign';
            columns: ['business_id'];
            isOneToOne: false;
            referencedRelation: 'business';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'business_user_business_id_foreign';
            columns: ['business_id'];
            isOneToOne: false;
            referencedRelation: 'view_organization_business';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'business_user_business_id_foreign';
            columns: ['business_id'];
            isOneToOne: false;
            referencedRelation: 'view_organization_business';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'business_user_business_id_foreign';
            columns: ['business_id'];
            isOneToOne: false;
            referencedRelation: 'view_organization_business';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'business_user_user_id_foreign';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'business_user_user_id_foreign';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'view_organization_user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'business_user_user_id_foreign';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'view_organization_user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'business_user_user_id_foreign';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'view_organization_user';
            referencedColumns: ['id'];
          },
        ];
      };
      knex_migrations: {
        Row: {
          batch: number | null;
          id: number;
          migration_time: string | null;
          name: string | null;
        };
        Insert: {
          batch?: number | null;
          id?: number;
          migration_time?: string | null;
          name?: string | null;
        };
        Update: {
          batch?: number | null;
          id?: number;
          migration_time?: string | null;
          name?: string | null;
        };
        Relationships: [];
      };
      knex_migrations_lock: {
        Row: {
          index: number;
          is_locked: number | null;
        };
        Insert: {
          index?: number;
          is_locked?: number | null;
        };
        Update: {
          index?: number;
          is_locked?: number | null;
        };
        Relationships: [];
      };
      organization: {
        Row: {
          clerk_id: string;
          created_at: string;
          environment_type: Database['public']['Enums']['environment_type'];
          external_id: string | null;
          id: string;
          name: string;
          updated_at: string;
        };
        Insert: {
          clerk_id: string;
          created_at?: string;
          environment_type?: Database['public']['Enums']['environment_type'];
          external_id?: string | null;
          id: string;
          name: string;
          updated_at?: string;
        };
        Update: {
          clerk_id?: string;
          created_at?: string;
          environment_type?: Database['public']['Enums']['environment_type'];
          external_id?: string | null;
          id?: string;
          name?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      organization_business: {
        Row: {
          business_id: string;
          created_at: string;
          id: string;
          organization_id: string;
          updated_at: string;
        };
        Insert: {
          business_id: string;
          created_at?: string;
          id?: string;
          organization_id: string;
          updated_at?: string;
        };
        Update: {
          business_id?: string;
          created_at?: string;
          id?: string;
          organization_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'organization_business_business_id_foreign';
            columns: ['business_id'];
            isOneToOne: false;
            referencedRelation: 'business';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'organization_business_business_id_foreign';
            columns: ['business_id'];
            isOneToOne: false;
            referencedRelation: 'view_organization_business';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'organization_business_business_id_foreign';
            columns: ['business_id'];
            isOneToOne: false;
            referencedRelation: 'view_organization_business';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'organization_business_business_id_foreign';
            columns: ['business_id'];
            isOneToOne: false;
            referencedRelation: 'view_organization_business';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'organization_business_organization_id_foreign';
            columns: ['organization_id'];
            isOneToOne: false;
            referencedRelation: 'organization';
            referencedColumns: ['id'];
          },
        ];
      };
      organization_user: {
        Row: {
          created_at: string;
          id: string;
          organization_id: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          organization_id: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          organization_id?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'organization_user_organization_id_foreign';
            columns: ['organization_id'];
            isOneToOne: false;
            referencedRelation: 'organization';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'organization_user_user_id_foreign';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'organization_user_user_id_foreign';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'view_organization_user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'organization_user_user_id_foreign';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'view_organization_user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'organization_user_user_id_foreign';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'view_organization_user';
            referencedColumns: ['id'];
          },
        ];
      };
      user: {
        Row: {
          address: string | null;
          address_line_2: string | null;
          city: string | null;
          clerk_id: string;
          county: string | null;
          created_at: string;
          credit_score: number | null;
          date_of_birth: string | null;
          email: string;
          external_id: string | null;
          id: string;
          name: string | null;
          phone: string | null;
          ssn: string | null;
          state: Database['public']['Enums']['state_usa'] | null;
          updated_at: string;
          zip_code: string | null;
        };
        Insert: {
          address?: string | null;
          address_line_2?: string | null;
          city?: string | null;
          clerk_id: string;
          county?: string | null;
          created_at?: string;
          credit_score?: number | null;
          date_of_birth?: string | null;
          email: string;
          external_id?: string | null;
          id?: string;
          name?: string | null;
          phone?: string | null;
          ssn?: string | null;
          state?: Database['public']['Enums']['state_usa'] | null;
          updated_at?: string;
          zip_code?: string | null;
        };
        Update: {
          address?: string | null;
          address_line_2?: string | null;
          city?: string | null;
          clerk_id?: string;
          county?: string | null;
          created_at?: string;
          credit_score?: number | null;
          date_of_birth?: string | null;
          email?: string;
          external_id?: string | null;
          id?: string;
          name?: string | null;
          phone?: string | null;
          ssn?: string | null;
          state?: Database['public']['Enums']['state_usa'] | null;
          updated_at?: string;
          zip_code?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      environment_type: 'production' | 'uat';
      state_usa:
        | 'AL'
        | 'AK'
        | 'AZ'
        | 'AR'
        | 'CA'
        | 'CO'
        | 'CT'
        | 'DE'
        | 'FL'
        | 'GA'
        | 'HI'
        | 'ID'
        | 'IL'
        | 'IN'
        | 'IA'
        | 'KS'
        | 'KY'
        | 'LA'
        | 'ME'
        | 'MD'
        | 'MA'
        | 'MI'
        | 'MN'
        | 'MS'
        | 'MO'
        | 'MT'
        | 'NE'
        | 'NV'
        | 'NH'
        | 'NJ'
        | 'NM'
        | 'NY'
        | 'NC'
        | 'ND'
        | 'OH'
        | 'OK'
        | 'OR'
        | 'PA'
        | 'RI'
        | 'SC'
        | 'SD'
        | 'TN'
        | 'TX'
        | 'UT'
        | 'VT'
        | 'VA'
        | 'WA'
        | 'WV'
        | 'WI'
        | 'WY';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  tenant_base_org: {
    Tables: {
      deal: {
        Row: {
          appetite: number | null;
          assignee_id: string | null;
          created_at: string;
          created_by_id: string | null;
          external_id: string | null;
          id: string;
          interest_rate: number | null;
          label: string | null;
          loan_amount: number | null;
          loan_processing_fee: number | null;
          opportunity_id: string;
          source: string | null;
          ssbs_score: number | null;
          status_id: string;
          updated_at: string;
          winnability: number | null;
        };
        Insert: {
          appetite?: number | null;
          assignee_id?: string | null;
          created_at?: string;
          created_by_id?: string | null;
          external_id?: string | null;
          id?: string;
          interest_rate?: number | null;
          label?: string | null;
          loan_amount?: number | null;
          loan_processing_fee?: number | null;
          opportunity_id: string;
          source?: string | null;
          ssbs_score?: number | null;
          status_id: string;
          updated_at?: string;
          winnability?: number | null;
        };
        Update: {
          appetite?: number | null;
          assignee_id?: string | null;
          created_at?: string;
          created_by_id?: string | null;
          external_id?: string | null;
          id?: string;
          interest_rate?: number | null;
          label?: string | null;
          loan_amount?: number | null;
          loan_processing_fee?: number | null;
          opportunity_id?: string;
          source?: string | null;
          ssbs_score?: number | null;
          status_id?: string;
          updated_at?: string;
          winnability?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'deal_assignee_id_foreign';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_assignee_id_foreign';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'view_organization_user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_assignee_id_foreign';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'view_organization_user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_assignee_id_foreign';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'view_organization_user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_created_by_id_foreign';
            columns: ['created_by_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_created_by_id_foreign';
            columns: ['created_by_id'];
            isOneToOne: false;
            referencedRelation: 'view_organization_user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_created_by_id_foreign';
            columns: ['created_by_id'];
            isOneToOne: false;
            referencedRelation: 'view_organization_user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_created_by_id_foreign';
            columns: ['created_by_id'];
            isOneToOne: false;
            referencedRelation: 'view_organization_user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_opportunity_id_foreign';
            columns: ['opportunity_id'];
            isOneToOne: false;
            referencedRelation: 'opportunity';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_status_id_foreign';
            columns: ['status_id'];
            isOneToOne: false;
            referencedRelation: 'deal_status';
            referencedColumns: ['id'];
          },
        ];
      };
      deal_status: {
        Row: {
          created_at: string;
          external_id: string | null;
          id: string;
          label: string;
          order: number | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          external_id?: string | null;
          id: string;
          label: string;
          order?: number | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          external_id?: string | null;
          id?: string;
          label?: string;
          order?: number | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      deal_user: {
        Row: {
          created_at: string;
          deal_id: string;
          id: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          deal_id: string;
          id?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          deal_id?: string;
          id?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'deal_user_deal_id_foreign';
            columns: ['deal_id'];
            isOneToOne: false;
            referencedRelation: 'deal';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_user_user_id_foreign';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_user_user_id_foreign';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'view_organization_user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_user_user_id_foreign';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'view_organization_user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_user_user_id_foreign';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'view_organization_user';
            referencedColumns: ['id'];
          },
        ];
      };
      knex_migrations: {
        Row: {
          batch: number | null;
          id: number;
          migration_time: string | null;
          name: string | null;
        };
        Insert: {
          batch?: number | null;
          id?: number;
          migration_time?: string | null;
          name?: string | null;
        };
        Update: {
          batch?: number | null;
          id?: number;
          migration_time?: string | null;
          name?: string | null;
        };
        Relationships: [];
      };
      knex_migrations_lock: {
        Row: {
          index: number;
          is_locked: number | null;
        };
        Insert: {
          index?: number;
          is_locked?: number | null;
        };
        Update: {
          index?: number;
          is_locked?: number | null;
        };
        Relationships: [];
      };
      opportunity: {
        Row: {
          active_deal_id: string | null;
          assignee_id: string | null;
          borrower_business_id: string | null;
          borrower_id: string | null;
          created_at: string;
          created_by_id: string | null;
          external_id: string | null;
          id: string;
          label: string | null;
          updated_at: string;
        };
        Insert: {
          active_deal_id?: string | null;
          assignee_id?: string | null;
          borrower_business_id?: string | null;
          borrower_id?: string | null;
          created_at?: string;
          created_by_id?: string | null;
          external_id?: string | null;
          id?: string;
          label?: string | null;
          updated_at?: string;
        };
        Update: {
          active_deal_id?: string | null;
          assignee_id?: string | null;
          borrower_business_id?: string | null;
          borrower_id?: string | null;
          created_at?: string;
          created_by_id?: string | null;
          external_id?: string | null;
          id?: string;
          label?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'opportunity_active_deal_id_foreign';
            columns: ['active_deal_id'];
            isOneToOne: false;
            referencedRelation: 'deal';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_assignee_id_foreign';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_assignee_id_foreign';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'view_organization_user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_assignee_id_foreign';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'view_organization_user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_assignee_id_foreign';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'view_organization_user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_borrower_business_id_foreign';
            columns: ['borrower_business_id'];
            isOneToOne: false;
            referencedRelation: 'business';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_borrower_business_id_foreign';
            columns: ['borrower_business_id'];
            isOneToOne: false;
            referencedRelation: 'view_organization_business';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_borrower_business_id_foreign';
            columns: ['borrower_business_id'];
            isOneToOne: false;
            referencedRelation: 'view_organization_business';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_borrower_business_id_foreign';
            columns: ['borrower_business_id'];
            isOneToOne: false;
            referencedRelation: 'view_organization_business';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_borrower_id_foreign';
            columns: ['borrower_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_borrower_id_foreign';
            columns: ['borrower_id'];
            isOneToOne: false;
            referencedRelation: 'view_organization_user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_borrower_id_foreign';
            columns: ['borrower_id'];
            isOneToOne: false;
            referencedRelation: 'view_organization_user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_borrower_id_foreign';
            columns: ['borrower_id'];
            isOneToOne: false;
            referencedRelation: 'view_organization_user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_created_by_id_foreign';
            columns: ['created_by_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_created_by_id_foreign';
            columns: ['created_by_id'];
            isOneToOne: false;
            referencedRelation: 'view_organization_user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_created_by_id_foreign';
            columns: ['created_by_id'];
            isOneToOne: false;
            referencedRelation: 'view_organization_user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_created_by_id_foreign';
            columns: ['created_by_id'];
            isOneToOne: false;
            referencedRelation: 'view_organization_user';
            referencedColumns: ['id'];
          },
        ];
      };
      property: {
        Row: {
          amenities: ('commercial' | 'residential')[] | null;
          area_sq_km: number | null;
          created_at: string;
          deal_id: string;
          description: string | null;
          external_id: string | null;
          id: string;
          is_condo: boolean | null;
          last_census_at: string | null;
          submitted_at: string | null;
          tags: string[] | null;
          type: 'commercial' | 'residential' | null;
          updated_at: string;
          year_built: number | null;
        };
        Insert: {
          amenities?: ('commercial' | 'residential')[] | null;
          area_sq_km?: number | null;
          created_at?: string;
          deal_id: string;
          description?: string | null;
          external_id?: string | null;
          id?: string;
          is_condo?: boolean | null;
          last_census_at?: string | null;
          submitted_at?: string | null;
          tags?: string[] | null;
          type?: 'commercial' | 'residential' | null;
          updated_at?: string;
          year_built?: number | null;
        };
        Update: {
          amenities?: ('commercial' | 'residential')[] | null;
          area_sq_km?: number | null;
          created_at?: string;
          deal_id?: string;
          description?: string | null;
          external_id?: string | null;
          id?: string;
          is_condo?: boolean | null;
          last_census_at?: string | null;
          submitted_at?: string | null;
          tags?: string[] | null;
          type?: 'commercial' | 'residential' | null;
          updated_at?: string;
          year_built?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'property_deal_id_foreign';
            columns: ['deal_id'];
            isOneToOne: false;
            referencedRelation: 'deal';
            referencedColumns: ['id'];
          },
        ];
      };
      task: {
        Row: {
          assignee_id: string | null;
          created_at: string;
          deal_id: string;
          description: string | null;
          external_id: string | null;
          id: string;
          priority_id: number;
          status_id: number;
          title: string;
          updated_at: string;
        };
        Insert: {
          assignee_id?: string | null;
          created_at?: string;
          deal_id: string;
          description?: string | null;
          external_id?: string | null;
          id?: string;
          priority_id?: number;
          status_id?: number;
          title: string;
          updated_at?: string;
        };
        Update: {
          assignee_id?: string | null;
          created_at?: string;
          deal_id?: string;
          description?: string | null;
          external_id?: string | null;
          id?: string;
          priority_id?: number;
          status_id?: number;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'task_assignee_id_foreign';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'task_assignee_id_foreign';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'view_organization_user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'task_assignee_id_foreign';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'view_organization_user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'task_assignee_id_foreign';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'view_organization_user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'task_deal_id_foreign';
            columns: ['deal_id'];
            isOneToOne: false;
            referencedRelation: 'deal';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'task_priority_id_foreign';
            columns: ['priority_id'];
            isOneToOne: false;
            referencedRelation: 'task_priority';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'task_status_id_foreign';
            columns: ['status_id'];
            isOneToOne: false;
            referencedRelation: 'task_status';
            referencedColumns: ['id'];
          },
        ];
      };
      task_priority: {
        Row: {
          created_at: string;
          id: number;
          label: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id: number;
          label: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          label?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      task_status: {
        Row: {
          created_at: string;
          id: number;
          label: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id: number;
          label: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          label?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      view_organization_business: {
        Row: {
          address: string | null;
          address_line_2: string | null;
          business_type: string | null;
          city: string | null;
          county: string | null;
          created_at: string | null;
          date_business_began: string | null;
          dba: string | null;
          debt: number | null;
          duns: string | null;
          email: string | null;
          external_id: string | null;
          id: string | null;
          industry: string | null;
          name_display: string | null;
          name_legal: string | null;
          phone: string | null;
          revenue_average: number | null;
          state: Database['public']['Enums']['state_usa'] | null;
          tin: string | null;
          updated_at: string | null;
          zip_code: string | null;
        };
        Relationships: [];
      };
      view_organization_user: {
        Row: {
          address: string | null;
          address_line_2: string | null;
          city: string | null;
          clerk_id: string | null;
          county: string | null;
          created_at: string | null;
          credit_score: number | null;
          date_of_birth: string | null;
          email: string | null;
          external_id: string | null;
          id: string | null;
          name: string | null;
          phone: string | null;
          ssn: string | null;
          state: Database['public']['Enums']['state_usa'] | null;
          updated_at: string | null;
          zip_code: string | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      property_type: 'commercial' | 'residential';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;
