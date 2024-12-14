export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  foundation: {
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
          id: string;
          industry?: string | null;
          name_display?: string | null;
          name_legal?: string | null;
          phone?: string | null;
          revenue_average?: number | null;
          state?: Database['public']['Enums']['state_usa'] | null;
          tin?: string | null;
          updated_at: string;
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
          id: string;
          income_average_monthly?: number | null;
          job_title?: string | null;
          owernship?: number | null;
          updated_at: string;
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
            foreignKeyName: 'business_user_business_id_fkey';
            columns: ['business_id'];
            isOneToOne: false;
            referencedRelation: 'business';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'business_user_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'q_agent';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'business_user_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'q_auditor';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'business_user_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'q_borrower';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'business_user_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'q_organization_admin';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'business_user_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'q_underwriter';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'business_user_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'q_user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'business_user_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
        ];
      };
      deal: {
        Row: {
          appetite: number | null;
          assignee_id: string | null;
          created_at: string;
          creator_id: string;
          external_id: string | null;
          id: string;
          interest_rate: number | null;
          label: string;
          loan_amount: number | null;
          loan_processing_fee: number | null;
          opportunity_id: string;
          source: string | null;
          ssbs_score: number | null;
          status_id: string;
          updated_at: string;
          userId: string | null;
          winnability: number | null;
        };
        Insert: {
          appetite?: number | null;
          assignee_id?: string | null;
          created_at?: string;
          creator_id: string;
          external_id?: string | null;
          id: string;
          interest_rate?: number | null;
          label: string;
          loan_amount?: number | null;
          loan_processing_fee?: number | null;
          opportunity_id: string;
          source?: string | null;
          ssbs_score?: number | null;
          status_id: string;
          updated_at: string;
          userId?: string | null;
          winnability?: number | null;
        };
        Update: {
          appetite?: number | null;
          assignee_id?: string | null;
          created_at?: string;
          creator_id?: string;
          external_id?: string | null;
          id?: string;
          interest_rate?: number | null;
          label?: string;
          loan_amount?: number | null;
          loan_processing_fee?: number | null;
          opportunity_id?: string;
          source?: string | null;
          ssbs_score?: number | null;
          status_id?: string;
          updated_at?: string;
          userId?: string | null;
          winnability?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'deal_assignee_id_fkey';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'q_agent';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_assignee_id_fkey';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'q_auditor';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_assignee_id_fkey';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'q_borrower';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_assignee_id_fkey';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'q_organization_admin';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_assignee_id_fkey';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'q_underwriter';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_assignee_id_fkey';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'q_user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_assignee_id_fkey';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_creator_id_fkey';
            columns: ['creator_id'];
            isOneToOne: false;
            referencedRelation: 'q_agent';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_creator_id_fkey';
            columns: ['creator_id'];
            isOneToOne: false;
            referencedRelation: 'q_auditor';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_creator_id_fkey';
            columns: ['creator_id'];
            isOneToOne: false;
            referencedRelation: 'q_borrower';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_creator_id_fkey';
            columns: ['creator_id'];
            isOneToOne: false;
            referencedRelation: 'q_organization_admin';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_creator_id_fkey';
            columns: ['creator_id'];
            isOneToOne: false;
            referencedRelation: 'q_underwriter';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_creator_id_fkey';
            columns: ['creator_id'];
            isOneToOne: false;
            referencedRelation: 'q_user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_creator_id_fkey';
            columns: ['creator_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_opportunity_id_fkey';
            columns: ['opportunity_id'];
            isOneToOne: false;
            referencedRelation: 'opportunity';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_opportunity_id_fkey';
            columns: ['opportunity_id'];
            isOneToOne: false;
            referencedRelation: 'q_opportunity';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_status_id_fkey';
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
          order: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          external_id?: string | null;
          id: string;
          label: string;
          order: number;
          updated_at: string;
        };
        Update: {
          created_at?: string;
          external_id?: string | null;
          id?: string;
          label?: string;
          order?: number;
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
          id: string;
          updated_at: string;
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
            foreignKeyName: 'deal_user_deal_id_fkey';
            columns: ['deal_id'];
            isOneToOne: false;
            referencedRelation: 'deal';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_user_deal_id_fkey';
            columns: ['deal_id'];
            isOneToOne: false;
            referencedRelation: 'q_deal';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_user_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'q_agent';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_user_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'q_auditor';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_user_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'q_borrower';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_user_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'q_organization_admin';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_user_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'q_underwriter';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_user_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'q_user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_user_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
        ];
      };
      environment_user: {
        Row: {
          created_at: string;
          id: string;
          role_slug: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id: string;
          role_slug: string;
          updated_at: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          role_slug?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'environment_user_role_slug_fkey';
            columns: ['role_slug'];
            isOneToOne: false;
            referencedRelation: 'role';
            referencedColumns: ['slug'];
          },
          {
            foreignKeyName: 'environment_user_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'q_agent';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'environment_user_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'q_auditor';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'environment_user_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'q_borrower';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'environment_user_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'q_organization_admin';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'environment_user_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'q_underwriter';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'environment_user_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'q_user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'environment_user_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
        ];
      };
      opportunity: {
        Row: {
          active_deal_id: string | null;
          agent_id: string | null;
          assignee_id: string | null;
          borrower_business_id: string | null;
          borrower_user_id: string | null;
          created_at: string;
          creator_id: string;
          external_id: string | null;
          id: string;
          label: string | null;
          updated_at: string;
        };
        Insert: {
          active_deal_id?: string | null;
          agent_id?: string | null;
          assignee_id?: string | null;
          borrower_business_id?: string | null;
          borrower_user_id?: string | null;
          created_at?: string;
          creator_id: string;
          external_id?: string | null;
          id: string;
          label?: string | null;
          updated_at: string;
        };
        Update: {
          active_deal_id?: string | null;
          agent_id?: string | null;
          assignee_id?: string | null;
          borrower_business_id?: string | null;
          borrower_user_id?: string | null;
          created_at?: string;
          creator_id?: string;
          external_id?: string | null;
          id?: string;
          label?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'opportunity_active_deal_id_fkey';
            columns: ['active_deal_id'];
            isOneToOne: false;
            referencedRelation: 'deal';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_active_deal_id_fkey';
            columns: ['active_deal_id'];
            isOneToOne: false;
            referencedRelation: 'q_deal';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_agent_id_fkey';
            columns: ['agent_id'];
            isOneToOne: false;
            referencedRelation: 'q_agent';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_agent_id_fkey';
            columns: ['agent_id'];
            isOneToOne: false;
            referencedRelation: 'q_auditor';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_agent_id_fkey';
            columns: ['agent_id'];
            isOneToOne: false;
            referencedRelation: 'q_borrower';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_agent_id_fkey';
            columns: ['agent_id'];
            isOneToOne: false;
            referencedRelation: 'q_organization_admin';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_agent_id_fkey';
            columns: ['agent_id'];
            isOneToOne: false;
            referencedRelation: 'q_underwriter';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_agent_id_fkey';
            columns: ['agent_id'];
            isOneToOne: false;
            referencedRelation: 'q_user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_agent_id_fkey';
            columns: ['agent_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_assignee_id_fkey';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'q_agent';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_assignee_id_fkey';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'q_auditor';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_assignee_id_fkey';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'q_borrower';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_assignee_id_fkey';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'q_organization_admin';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_assignee_id_fkey';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'q_underwriter';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_assignee_id_fkey';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'q_user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_assignee_id_fkey';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_borrower_business_id_fkey';
            columns: ['borrower_business_id'];
            isOneToOne: false;
            referencedRelation: 'business';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_borrower_user_id_fkey';
            columns: ['borrower_user_id'];
            isOneToOne: false;
            referencedRelation: 'q_agent';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_borrower_user_id_fkey';
            columns: ['borrower_user_id'];
            isOneToOne: false;
            referencedRelation: 'q_auditor';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_borrower_user_id_fkey';
            columns: ['borrower_user_id'];
            isOneToOne: false;
            referencedRelation: 'q_borrower';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_borrower_user_id_fkey';
            columns: ['borrower_user_id'];
            isOneToOne: false;
            referencedRelation: 'q_organization_admin';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_borrower_user_id_fkey';
            columns: ['borrower_user_id'];
            isOneToOne: false;
            referencedRelation: 'q_underwriter';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_borrower_user_id_fkey';
            columns: ['borrower_user_id'];
            isOneToOne: false;
            referencedRelation: 'q_user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_borrower_user_id_fkey';
            columns: ['borrower_user_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_creator_id_fkey';
            columns: ['creator_id'];
            isOneToOne: false;
            referencedRelation: 'q_agent';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_creator_id_fkey';
            columns: ['creator_id'];
            isOneToOne: false;
            referencedRelation: 'q_auditor';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_creator_id_fkey';
            columns: ['creator_id'];
            isOneToOne: false;
            referencedRelation: 'q_borrower';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_creator_id_fkey';
            columns: ['creator_id'];
            isOneToOne: false;
            referencedRelation: 'q_organization_admin';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_creator_id_fkey';
            columns: ['creator_id'];
            isOneToOne: false;
            referencedRelation: 'q_underwriter';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_creator_id_fkey';
            columns: ['creator_id'];
            isOneToOne: false;
            referencedRelation: 'q_user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_creator_id_fkey';
            columns: ['creator_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
        ];
      };
      property: {
        Row: {
          address: string | null;
          address_line_2: string | null;
          amenities: string[] | null;
          area_sq_km: number | null;
          building_type: Database['public']['Enums']['building_type'] | null;
          city: string | null;
          county: string | null;
          created_at: string;
          deal_id: string;
          description: string | null;
          external_id: string | null;
          id: string;
          last_census_at: string | null;
          state: Database['public']['Enums']['state_usa'] | null;
          submitted_at: string;
          tags: string[] | null;
          type: Database['public']['Enums']['property_type'] | null;
          updated_at: string;
          year_built: number | null;
          zip_code: string | null;
        };
        Insert: {
          address?: string | null;
          address_line_2?: string | null;
          amenities?: string[] | null;
          area_sq_km?: number | null;
          building_type?: Database['public']['Enums']['building_type'] | null;
          city?: string | null;
          county?: string | null;
          created_at?: string;
          deal_id: string;
          description?: string | null;
          external_id?: string | null;
          id: string;
          last_census_at?: string | null;
          state?: Database['public']['Enums']['state_usa'] | null;
          submitted_at?: string;
          tags?: string[] | null;
          type?: Database['public']['Enums']['property_type'] | null;
          updated_at: string;
          year_built?: number | null;
          zip_code?: string | null;
        };
        Update: {
          address?: string | null;
          address_line_2?: string | null;
          amenities?: string[] | null;
          area_sq_km?: number | null;
          building_type?: Database['public']['Enums']['building_type'] | null;
          city?: string | null;
          county?: string | null;
          created_at?: string;
          deal_id?: string;
          description?: string | null;
          external_id?: string | null;
          id?: string;
          last_census_at?: string | null;
          state?: Database['public']['Enums']['state_usa'] | null;
          submitted_at?: string;
          tags?: string[] | null;
          type?: Database['public']['Enums']['property_type'] | null;
          updated_at?: string;
          year_built?: number | null;
          zip_code?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'property_deal_id_fkey';
            columns: ['deal_id'];
            isOneToOne: false;
            referencedRelation: 'deal';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'property_deal_id_fkey';
            columns: ['deal_id'];
            isOneToOne: false;
            referencedRelation: 'q_deal';
            referencedColumns: ['id'];
          },
        ];
      };
      q_columns: {
        Row: {
          created_at: string;
          name: string;
          q_view_name: string;
          q_viewName: string;
          table_column_name: string | null;
          table_name: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          name: string;
          q_view_name: string;
          q_viewName: string;
          table_column_name?: string | null;
          table_name?: string | null;
          updated_at: string;
        };
        Update: {
          created_at?: string;
          name?: string;
          q_view_name?: string;
          q_viewName?: string;
          table_column_name?: string | null;
          table_name?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'q_columns_q_viewName_fkey';
            columns: ['q_viewName'];
            isOneToOne: false;
            referencedRelation: 'q_view';
            referencedColumns: ['name'];
          },
        ];
      };
      q_view: {
        Row: {
          created_at: string;
          name: string;
          root_view: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          name: string;
          root_view: string;
          updated_at: string;
        };
        Update: {
          created_at?: string;
          name?: string;
          root_view?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      role: {
        Row: {
          label: string;
          slug: string;
        };
        Insert: {
          label: string;
          slug: string;
        };
        Update: {
          label?: string;
          slug?: string;
        };
        Relationships: [];
      };
      task: {
        Row: {
          assignee_id: string | null;
          created_at: string;
          creator_id: string;
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
          creator_id: string;
          deal_id: string;
          description?: string | null;
          external_id?: string | null;
          id: string;
          priority_id: number;
          status_id: number;
          title: string;
          updated_at: string;
        };
        Update: {
          assignee_id?: string | null;
          created_at?: string;
          creator_id?: string;
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
            foreignKeyName: 'task_assignee_id_fkey';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'q_agent';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'task_assignee_id_fkey';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'q_auditor';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'task_assignee_id_fkey';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'q_borrower';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'task_assignee_id_fkey';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'q_organization_admin';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'task_assignee_id_fkey';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'q_underwriter';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'task_assignee_id_fkey';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'q_user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'task_assignee_id_fkey';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'task_creator_id_fkey';
            columns: ['creator_id'];
            isOneToOne: false;
            referencedRelation: 'q_agent';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'task_creator_id_fkey';
            columns: ['creator_id'];
            isOneToOne: false;
            referencedRelation: 'q_auditor';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'task_creator_id_fkey';
            columns: ['creator_id'];
            isOneToOne: false;
            referencedRelation: 'q_borrower';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'task_creator_id_fkey';
            columns: ['creator_id'];
            isOneToOne: false;
            referencedRelation: 'q_organization_admin';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'task_creator_id_fkey';
            columns: ['creator_id'];
            isOneToOne: false;
            referencedRelation: 'q_underwriter';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'task_creator_id_fkey';
            columns: ['creator_id'];
            isOneToOne: false;
            referencedRelation: 'q_user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'task_creator_id_fkey';
            columns: ['creator_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'task_deal_id_fkey';
            columns: ['deal_id'];
            isOneToOne: false;
            referencedRelation: 'deal';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'task_deal_id_fkey';
            columns: ['deal_id'];
            isOneToOne: false;
            referencedRelation: 'q_deal';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'task_priority_id_fkey';
            columns: ['priority_id'];
            isOneToOne: false;
            referencedRelation: 'task_priority';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'task_status_id_fkey';
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
          external_id: string | null;
          id: number;
          label: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          external_id?: string | null;
          id?: number;
          label: string;
          updated_at: string;
        };
        Update: {
          created_at?: string;
          external_id?: string | null;
          id?: number;
          label?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      task_status: {
        Row: {
          created_at: string;
          external_id: string | null;
          id: number;
          label: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          external_id?: string | null;
          id?: number;
          label: string;
          updated_at: string;
        };
        Update: {
          created_at?: string;
          external_id?: string | null;
          id?: number;
          label?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      q_agent: {
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
      q_auditor: {
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
      q_borrower: {
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
      q_deal: {
        Row: {
          appetite: number | null;
          assignee_id: string | null;
          created_at: string | null;
          creator_id: string | null;
          external_id: string | null;
          id: string | null;
          interest_rate: number | null;
          label: string | null;
          loan_amount: number | null;
          loan_processing_fee: number | null;
          opportunity_id: string | null;
          source: string | null;
          ssbs_score: number | null;
          status_id: string | null;
          updated_at: string | null;
          userId: string | null;
          winnability: number | null;
        };
        Insert: {
          appetite?: number | null;
          assignee_id?: string | null;
          created_at?: string | null;
          creator_id?: string | null;
          external_id?: string | null;
          id?: string | null;
          interest_rate?: number | null;
          label?: string | null;
          loan_amount?: number | null;
          loan_processing_fee?: number | null;
          opportunity_id?: string | null;
          source?: string | null;
          ssbs_score?: number | null;
          status_id?: string | null;
          updated_at?: string | null;
          userId?: string | null;
          winnability?: number | null;
        };
        Update: {
          appetite?: number | null;
          assignee_id?: string | null;
          created_at?: string | null;
          creator_id?: string | null;
          external_id?: string | null;
          id?: string | null;
          interest_rate?: number | null;
          label?: string | null;
          loan_amount?: number | null;
          loan_processing_fee?: number | null;
          opportunity_id?: string | null;
          source?: string | null;
          ssbs_score?: number | null;
          status_id?: string | null;
          updated_at?: string | null;
          userId?: string | null;
          winnability?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'deal_assignee_id_fkey';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_assignee_id_fkey';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'q_agent';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_assignee_id_fkey';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'q_auditor';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_assignee_id_fkey';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'q_borrower';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_assignee_id_fkey';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'q_organization_admin';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_assignee_id_fkey';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'q_underwriter';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_assignee_id_fkey';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'q_user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_creator_id_fkey';
            columns: ['creator_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_creator_id_fkey';
            columns: ['creator_id'];
            isOneToOne: false;
            referencedRelation: 'q_agent';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_creator_id_fkey';
            columns: ['creator_id'];
            isOneToOne: false;
            referencedRelation: 'q_auditor';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_creator_id_fkey';
            columns: ['creator_id'];
            isOneToOne: false;
            referencedRelation: 'q_borrower';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_creator_id_fkey';
            columns: ['creator_id'];
            isOneToOne: false;
            referencedRelation: 'q_organization_admin';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_creator_id_fkey';
            columns: ['creator_id'];
            isOneToOne: false;
            referencedRelation: 'q_underwriter';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_creator_id_fkey';
            columns: ['creator_id'];
            isOneToOne: false;
            referencedRelation: 'q_user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_opportunity_id_fkey';
            columns: ['opportunity_id'];
            isOneToOne: false;
            referencedRelation: 'opportunity';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_opportunity_id_fkey';
            columns: ['opportunity_id'];
            isOneToOne: false;
            referencedRelation: 'q_opportunity';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deal_status_id_fkey';
            columns: ['status_id'];
            isOneToOne: false;
            referencedRelation: 'deal_status';
            referencedColumns: ['id'];
          },
        ];
      };
      q_environment: {
        Row: {
          environment_type:
            | Database['public']['Enums']['environment_type']
            | null;
          organization_id: string | null;
          schema: 'foundation' | null;
          tenant: 'foundation' | null;
        };
        Insert: {
          environment_type?:
            | Database['public']['Enums']['environment_type']
            | null;
          organization_id?: string | null;
          schema?: 'foundation' | null;
          tenant?: 'foundation' | null;
        };
        Update: {
          environment_type?:
            | Database['public']['Enums']['environment_type']
            | null;
          organization_id?: string | null;
          schema?: 'foundation' | null;
          tenant?: 'foundation' | null;
        };
        Relationships: [
          {
            foreignKeyName: 'environment_organization_id_fkey';
            columns: ['organization_id'];
            isOneToOne: false;
            referencedRelation: 'organization';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'environment_organization_id_fkey';
            columns: ['organization_id'];
            isOneToOne: false;
            referencedRelation: 'q_organization';
            referencedColumns: ['id'];
          },
        ];
      };
      q_opportunity: {
        Row: {
          active_deal_id: string | null;
          agent_id: string | null;
          assignee_id: string | null;
          borrower_business_id: string | null;
          borrower_user_id: string | null;
          created_at: string | null;
          creator_id: string | null;
          external_id: string | null;
          id: string | null;
          label: string | null;
          updated_at: string | null;
        };
        Insert: {
          active_deal_id?: string | null;
          agent_id?: string | null;
          assignee_id?: string | null;
          borrower_business_id?: string | null;
          borrower_user_id?: string | null;
          created_at?: string | null;
          creator_id?: string | null;
          external_id?: string | null;
          id?: string | null;
          label?: string | null;
          updated_at?: string | null;
        };
        Update: {
          active_deal_id?: string | null;
          agent_id?: string | null;
          assignee_id?: string | null;
          borrower_business_id?: string | null;
          borrower_user_id?: string | null;
          created_at?: string | null;
          creator_id?: string | null;
          external_id?: string | null;
          id?: string | null;
          label?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'opportunity_active_deal_id_fkey';
            columns: ['active_deal_id'];
            isOneToOne: false;
            referencedRelation: 'deal';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_active_deal_id_fkey';
            columns: ['active_deal_id'];
            isOneToOne: false;
            referencedRelation: 'q_deal';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_agent_id_fkey';
            columns: ['agent_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_agent_id_fkey';
            columns: ['agent_id'];
            isOneToOne: false;
            referencedRelation: 'q_agent';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_agent_id_fkey';
            columns: ['agent_id'];
            isOneToOne: false;
            referencedRelation: 'q_auditor';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_agent_id_fkey';
            columns: ['agent_id'];
            isOneToOne: false;
            referencedRelation: 'q_borrower';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_agent_id_fkey';
            columns: ['agent_id'];
            isOneToOne: false;
            referencedRelation: 'q_organization_admin';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_agent_id_fkey';
            columns: ['agent_id'];
            isOneToOne: false;
            referencedRelation: 'q_underwriter';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_agent_id_fkey';
            columns: ['agent_id'];
            isOneToOne: false;
            referencedRelation: 'q_user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_assignee_id_fkey';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_assignee_id_fkey';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'q_agent';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_assignee_id_fkey';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'q_auditor';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_assignee_id_fkey';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'q_borrower';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_assignee_id_fkey';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'q_organization_admin';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_assignee_id_fkey';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'q_underwriter';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_assignee_id_fkey';
            columns: ['assignee_id'];
            isOneToOne: false;
            referencedRelation: 'q_user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_borrower_business_id_fkey';
            columns: ['borrower_business_id'];
            isOneToOne: false;
            referencedRelation: 'business';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_borrower_user_id_fkey';
            columns: ['borrower_user_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_borrower_user_id_fkey';
            columns: ['borrower_user_id'];
            isOneToOne: false;
            referencedRelation: 'q_agent';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_borrower_user_id_fkey';
            columns: ['borrower_user_id'];
            isOneToOne: false;
            referencedRelation: 'q_auditor';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_borrower_user_id_fkey';
            columns: ['borrower_user_id'];
            isOneToOne: false;
            referencedRelation: 'q_borrower';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_borrower_user_id_fkey';
            columns: ['borrower_user_id'];
            isOneToOne: false;
            referencedRelation: 'q_organization_admin';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_borrower_user_id_fkey';
            columns: ['borrower_user_id'];
            isOneToOne: false;
            referencedRelation: 'q_underwriter';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_borrower_user_id_fkey';
            columns: ['borrower_user_id'];
            isOneToOne: false;
            referencedRelation: 'q_user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_creator_id_fkey';
            columns: ['creator_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_creator_id_fkey';
            columns: ['creator_id'];
            isOneToOne: false;
            referencedRelation: 'q_agent';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_creator_id_fkey';
            columns: ['creator_id'];
            isOneToOne: false;
            referencedRelation: 'q_auditor';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_creator_id_fkey';
            columns: ['creator_id'];
            isOneToOne: false;
            referencedRelation: 'q_borrower';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_creator_id_fkey';
            columns: ['creator_id'];
            isOneToOne: false;
            referencedRelation: 'q_organization_admin';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_creator_id_fkey';
            columns: ['creator_id'];
            isOneToOne: false;
            referencedRelation: 'q_underwriter';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'opportunity_creator_id_fkey';
            columns: ['creator_id'];
            isOneToOne: false;
            referencedRelation: 'q_user';
            referencedColumns: ['id'];
          },
        ];
      };
      q_organization: {
        Row: {
          clerk_id: string | null;
          created_at: string | null;
          external_id: string | null;
          id: string | null;
          label: string | null;
          tenant: 'foundation' | null;
          updated_at: string | null;
        };
        Insert: {
          clerk_id?: string | null;
          created_at?: string | null;
          external_id?: string | null;
          id?: string | null;
          label?: string | null;
          tenant?: 'foundation' | null;
          updated_at?: string | null;
        };
        Update: {
          clerk_id?: string | null;
          created_at?: string | null;
          external_id?: string | null;
          id?: string | null;
          label?: string | null;
          tenant?: 'foundation' | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      q_organization_admin: {
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
      q_property: {
        Row: {
          address: string | null;
          address_line_2: string | null;
          amenities: string[] | null;
          area_sq_km: number | null;
          building_type: Database['public']['Enums']['building_type'] | null;
          city: string | null;
          county: string | null;
          created_at: string | null;
          deal_id: string | null;
          description: string | null;
          external_id: string | null;
          id: string | null;
          last_census_at: string | null;
          state: Database['public']['Enums']['state_usa'] | null;
          submitted_at: string | null;
          tags: string[] | null;
          type: Database['public']['Enums']['property_type'] | null;
          updated_at: string | null;
          year_built: number | null;
          zip_code: string | null;
        };
        Insert: {
          address?: string | null;
          address_line_2?: string | null;
          amenities?: string[] | null;
          area_sq_km?: number | null;
          building_type?: Database['public']['Enums']['building_type'] | null;
          city?: string | null;
          county?: string | null;
          created_at?: string | null;
          deal_id?: string | null;
          description?: string | null;
          external_id?: string | null;
          id?: string | null;
          last_census_at?: string | null;
          state?: Database['public']['Enums']['state_usa'] | null;
          submitted_at?: string | null;
          tags?: string[] | null;
          type?: Database['public']['Enums']['property_type'] | null;
          updated_at?: string | null;
          year_built?: number | null;
          zip_code?: string | null;
        };
        Update: {
          address?: string | null;
          address_line_2?: string | null;
          amenities?: string[] | null;
          area_sq_km?: number | null;
          building_type?: Database['public']['Enums']['building_type'] | null;
          city?: string | null;
          county?: string | null;
          created_at?: string | null;
          deal_id?: string | null;
          description?: string | null;
          external_id?: string | null;
          id?: string | null;
          last_census_at?: string | null;
          state?: Database['public']['Enums']['state_usa'] | null;
          submitted_at?: string | null;
          tags?: string[] | null;
          type?: Database['public']['Enums']['property_type'] | null;
          updated_at?: string | null;
          year_built?: number | null;
          zip_code?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'property_deal_id_fkey';
            columns: ['deal_id'];
            isOneToOne: false;
            referencedRelation: 'deal';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'property_deal_id_fkey';
            columns: ['deal_id'];
            isOneToOne: false;
            referencedRelation: 'q_deal';
            referencedColumns: ['id'];
          },
        ];
      };
      q_underwriter: {
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
      q_user: {
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
      schema_columns: {
        Row: {
          character_maximum_length: number | null;
          column_default: string | null;
          column_name: unknown | null;
          data_type: string | null;
          foreign_table: string | null;
          generation_expression: string | null;
          is_generated: string | null;
          is_nullable: string | null;
          is_primary_key: boolean | null;
          is_unique: boolean | null;
          is_updatable: string | null;
          object_type: string | null;
          table_name: unknown | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number;
          checksum: string;
          finished_at: string | null;
          id: string;
          logs: string | null;
          migration_name: string;
          rolled_back_at: string | null;
          started_at: string;
        };
        Insert: {
          applied_steps_count?: number;
          checksum: string;
          finished_at?: string | null;
          id: string;
          logs?: string | null;
          migration_name: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Update: {
          applied_steps_count?: number;
          checksum?: string;
          finished_at?: string | null;
          id?: string;
          logs?: string | null;
          migration_name?: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      create_role_if_not_exists: {
        Args: {
          role_name: string;
          with_login?: boolean;
          with_noinherit?: boolean;
          with_password?: string;
        };
        Returns: undefined;
      };
    };
    Enums: {
      building_type: 'condo' | 'multi_family' | 'single_family';
      environment_type: 'production' | 'uat';
      property_type: 'commercial' | 'residential';
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
