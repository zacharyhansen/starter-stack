import type { MenuGroupItem } from './menu';
import { SheetMenu } from './sheet-menu';

interface NavbarProps {
  pathname: string;
  menuDefinition: MenuGroupItem[];
  children?: React.ReactNode;
}

export default function Navbar({
  children,
  menuDefinition,
  pathname,
}: Readonly<NavbarProps>) {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 w-full border-b backdrop-blur">
      <div className="mx-4 flex h-12 items-center sm:mx-8">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu pathname={pathname} menuDefinition={menuDefinition} />
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {children}
        </div>
      </div>
    </header>
  );
}
