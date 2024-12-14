import EntityFlow from './entity-flow';

import PageWrapper from '~/modules/page';

export default function Page() {
  return (
    <PageWrapper
      title="Data Tree"
      description="Manage the permissions and data access for all roles within your instance."
    >
      <EntityFlow />
    </PageWrapper>
  );
}
