'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';

export interface UserObject {
  id: string;
  email?: string;
  name?: string;
  photo?: string;
}

interface AvatarListProps {
  people: UserObject[];
}

export const AvatarGroup = ({ people }: AvatarListProps) => {
  return (
    <div className="flex -space-x-4">
      {people.map(user => (
        <TooltipProvider key={user.id}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className="border-background border-4" key={user.id}>
                <AvatarImage src={user.photo ?? undefined} alt="avatar" />
                <AvatarFallback>
                  {user.name?.split(' ').map(name => name[0])}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent className="TooltipContent" sideOffset={5}>
              {user.name ?? user.email}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};
