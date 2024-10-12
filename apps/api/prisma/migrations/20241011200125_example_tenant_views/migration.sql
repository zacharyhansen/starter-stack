-- org user view
CREATE
OR REPLACE VIEW example_uat.view_organization_user AS
SELECT
  auth.user.*
FROM
  auth.user
  LEFT JOIN auth.organization_user on auth.user.id = auth.organization_user.user_id
where
  auth.organization_user.organization_id = 'example_uat';

CREATE
OR REPLACE VIEW example_prod.view_organization_user AS
SELECT
  auth.user.*
FROM
  auth.user
  LEFT JOIN auth.organization_user on auth.user.id = auth.organization_user.user_id
where
  auth.organization_user.organization_id = 'example_prod';

-- org business view
CREATE VIEW
  example_uat.view_organization_business AS
SELECT
  auth.business.*
FROM
  auth.business
  LEFT JOIN auth.organization_business on auth.business.id = auth.organization_business.business_id
where
  auth.organization_business.organization_id = 'example_uat';

CREATE VIEW
  example_prod.view_organization_business AS
SELECT
  auth.business.*
FROM
  auth.business
  LEFT JOIN auth.organization_business on auth.business.id = auth.organization_business.business_id
where
  auth.organization_business.organization_id = 'example_prod';