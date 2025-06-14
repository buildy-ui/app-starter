import { components, ui } from '@ui8kit';
import { useThemeMode } from '@hooks/useThemeMode'
import { DarkMode } from './DarkMode';
import { SiteLogo } from './SiteLogo';

export const { Nav, NavItem, NavLink, NavList, NavGroupButtons, NavBar } = components.nav;
export const { Button } = ui.button;
export const { SheetTrigger } = components.sheet;

export function Navigation() {
  const { mode, toggleMode } = useThemeMode();

  return (

    <NavBar>
      <SiteLogo />
      <Nav>
        <NavList>
          <NavItem>
            <NavLink href="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/about">About</NavLink>
          </NavItem>
        </NavList>
      </Nav>

      <NavGroupButtons>
        <Button className={`${mode === 'semantic' ? '!bg-teal-500 text-white' : 'bg-primary text-white'}`} variant="default" size="lg" onClick={toggleMode}>
          Switch to {mode === 'utility' ? 'semantic' : 'utility'}
        </Button>
        <DarkMode />
        <SheetTrigger htmlFor="sheet-toggle">
          <span className="latty latty-menu"></span>
        </SheetTrigger>
      </NavGroupButtons>
    </NavBar>
  );
} 