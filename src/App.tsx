import { Block, Stack, Text, Button, Icon } from "@ui8kit/core"
import { Moon, Sun } from "lucide-react"
import { useCallback, useEffect, useState } from "react";

function App() {

  const [isDarkMode, setIsDarkMode] = useState(false);

  // Dark mode toggle
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      document.documentElement.classList.toggle('dark', newMode);
      return newMode;
    });
  }, []);

  // Initialize dark mode from system preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const initialMode = mediaQuery.matches;
    setIsDarkMode(initialMode);
    document.documentElement.classList.toggle('dark', initialMode);
  }, []);

  return (
    <Block h="screen" className="content-center bg-gradient-to-br from-secondary/15 to-primary/15">
      <Stack ta="center" justify="center" align="center" gap="lg" mx="auto">
        <Text size="3xl" fw="bold">Hello World!</Text>
        <Text size="lg" c="secondary-foreground">This is a minimal Vite SWC + Tailwind 3 + Shadcn colors React starter app</Text>
        <Button onClick={toggleDarkMode}>
          {isDarkMode ? "Light Mode" : "Dark Mode"}
          <Icon c="primary-foreground" lucideIcon={isDarkMode ? Moon : Sun} />
        </Button>
      </Stack>
    </Block>
  )
}

export default App 