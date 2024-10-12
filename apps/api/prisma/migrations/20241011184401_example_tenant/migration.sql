-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "example_prod";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "example_uat";

-- create org admin
SELECT
  create_role_if_not_exists ('admin_example', false, false);

GRANT anonymous TO admin_example;

-- grant access to uat to super admin
GRANT USAGE ON SCHEMA example_uat TO super_admin;

GRANT ALL ON ALL TABLES IN SCHEMA example_uat TO super_admin;

GRANT ALL ON ALL ROUTINES IN SCHEMA example_uat TO super_admin;

GRANT ALL ON ALL SEQUENCES IN SCHEMA example_uat TO super_admin;

GRANT ALL ON ALL FUNCTIONS IN SCHEMA example_uat TO super_admin;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA example_uat GRANT ALL ON TABLES TO super_admin;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA example_uat GRANT ALL ON ROUTINES TO super_admin;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA example_uat GRANT ALL ON SEQUENCES TO super_admin;

-- grant access to prod to super admin
GRANT USAGE ON SCHEMA example_prod TO super_admin;

GRANT ALL ON ALL TABLES IN SCHEMA example_prod TO super_admin;

GRANT ALL ON ALL ROUTINES IN SCHEMA example_prod TO super_admin;

GRANT ALL ON ALL SEQUENCES IN SCHEMA example_prod TO super_admin;

GRANT ALL ON ALL FUNCTIONS IN SCHEMA example_prod TO super_admin;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA example_prod GRANT ALL ON TABLES TO super_admin;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA example_prod GRANT ALL ON ROUTINES TO super_admin;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA example_prod GRANT ALL ON SEQUENCES TO super_admin;

-- grant access to uat to org admin
GRANT USAGE ON SCHEMA example_uat TO admin_example;

GRANT ALL ON ALL TABLES IN SCHEMA example_uat TO admin_example;

GRANT ALL ON ALL ROUTINES IN SCHEMA example_uat TO admin_example;

GRANT ALL ON ALL SEQUENCES IN SCHEMA example_uat TO admin_example;

GRANT ALL ON ALL FUNCTIONS IN SCHEMA example_uat TO admin_example;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA example_uat GRANT ALL ON TABLES TO admin_example;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA example_uat GRANT ALL ON ROUTINES TO admin_example;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA example_uat GRANT ALL ON SEQUENCES TO admin_example;

-- grant access to prod to org admin
GRANT USAGE ON SCHEMA example_prod TO admin_example;

GRANT ALL ON ALL TABLES IN SCHEMA example_prod TO admin_example;

GRANT ALL ON ALL ROUTINES IN SCHEMA example_prod TO admin_example;

GRANT ALL ON ALL SEQUENCES IN SCHEMA example_prod TO admin_example;

GRANT ALL ON ALL FUNCTIONS IN SCHEMA example_prod TO admin_example;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA example_prod GRANT ALL ON TABLES TO admin_example;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA example_prod GRANT ALL ON ROUTINES TO admin_example;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA example_prod GRANT ALL ON SEQUENCES TO admin_example;