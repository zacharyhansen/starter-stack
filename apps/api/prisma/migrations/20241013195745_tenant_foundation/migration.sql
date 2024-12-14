-- create org admin
SELECT
  create_role_if_not_exists ('admin_foundation', false, false);

GRANT anonymous TO admin_foundation;

-- grant access to foundation to super admin
GRANT USAGE ON SCHEMA foundation TO super_admin;

GRANT ALL ON ALL TABLES IN SCHEMA foundation TO super_admin;

GRANT ALL ON ALL ROUTINES IN SCHEMA foundation TO super_admin;

GRANT ALL ON ALL SEQUENCES IN SCHEMA foundation TO super_admin;

GRANT ALL ON ALL FUNCTIONS IN SCHEMA foundation TO super_admin;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA foundation GRANT ALL ON TABLES TO super_admin;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA foundation GRANT ALL ON ROUTINES TO super_admin;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA foundation GRANT ALL ON SEQUENCES TO super_admin;

-- grant access to foundation to org admin
GRANT USAGE ON SCHEMA foundation TO admin_foundation;

GRANT ALL ON ALL TABLES IN SCHEMA foundation TO admin_foundation;

GRANT ALL ON ALL ROUTINES IN SCHEMA foundation TO admin_foundation;

GRANT ALL ON ALL SEQUENCES IN SCHEMA foundation TO admin_foundation;

GRANT ALL ON ALL FUNCTIONS IN SCHEMA foundation TO admin_foundation;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA foundation GRANT ALL ON TABLES TO admin_foundation;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA foundation GRANT ALL ON ROUTINES TO admin_foundation;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA foundation GRANT ALL ON SEQUENCES TO admin_foundation;

-- insert default roles
INSERT INTO
  foundation.role (slug, label)
VALUES
  ('organization_admin', 'Organization Admin'),
  ('underwriter', 'Underwriter'),
  ('agent', 'Agent'),
  ('auditor', 'Auditor'),
  ('borrower', 'Borrower');

-- user q view
CREATE
OR REPLACE VIEW foundation.q_user AS
SELECT
  auth.user.*
FROM
  foundation.environment_user
  LEFT JOIN auth.user on auth.user.id = foundation.environment_user.user_id;

-- organization
CREATE
OR REPLACE VIEW foundation.q_organization AS
SELECT
  auth.organization.*
FROM
  auth.organization
where
-- !IMPORTANT: This is the tenant not the schema/env
  auth.organization.tenant = 'foundation';

-- environment
CREATE
OR REPLACE VIEW foundation.q_environment AS
SELECT
  auth.environment.*
FROM
  auth.environment
where
  auth.environment.schema = 'foundation';

 -- User Types
DO $$
DECLARE
    schema_name TEXT;
    role_slug TEXT;
    view_sql TEXT;
BEGIN
    -- Loop over each role for each schema
    FOR role_slug IN 
        SELECT r.slug
        FROM foundation.role r
    LOOP
        -- Construct the CREATE OR REPLACE VIEW statement dynamically
        view_sql := 'CREATE OR REPLACE VIEW foundation.' || 'q_' || role_slug || ' AS ' ||
                    'SELECT auth.user.* ' ||
                    'FROM auth.user ' ||
                    'INNER JOIN foundation.environment_user ON auth.user.id = foundation.environment_user.user_id ' ||
                    'WHERE foundation.environment_user.role_slug = ''' || role_slug || '''';
        EXECUTE view_sql;
    END LOOP;
END $$;