import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';

// @ts-expect-error We enforce below that children are not rendered till user data is ready
const UserContext = createContext<UserItemFragment>(undefined);

export const CurrentUserProvider = ({}: { children: ReactNode }) => {
  // if (error) {
  //   return (
  //     <div>
  //       <Alert>
  //         Could not get current user at this time. If this issue persists please
  //         contact support @support
  //       </Alert>
  //     </div>
  //   );
  // }
  // if (loading || !data?.userCurrent) {
  //   return (
  //     <div className="flex flex-col w-full p-4">
  //       <div className="space-y-2">
  //         <Skeleton className="h-12" />
  //         <Skeleton className="h-12" />
  //       </div>
  //     </div>
  //   );
  // }
  return (
    <UserContext.Provider value={null}>
      <div>Loading</div>
    </UserContext.Provider>
  );
};

export const useCurrentUser = () => {
  return useContext(UserContext);
};
