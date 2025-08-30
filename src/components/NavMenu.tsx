import { Stack, Button, Icon, Text, Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@ui8kit/core";
import { Home, BarChart3, LogIn, UserPlus } from "lucide-react";
import { useAppTheme } from '@/hooks/use-theme';
import { useNavigate } from "react-router-dom";

export function NavMenu() {
  const { buttonSize, rounded } = useAppTheme();
  const navigate = useNavigate();

  const roundedItem = rounded.button;

  return (
    <Stack gap="sm" align="start">
      <Button onClick={() => navigate('/')} variant="ghost" size={buttonSize.default} rounded={roundedItem} contentAlign="start" w="full">
        <Icon component="span" lucideIcon={Home} />
        <Text size="sm" c="muted">Overview</Text>
      </Button>

      <Button onClick={() => navigate('/example-page')} variant="ghost" size={buttonSize.default} rounded={roundedItem} contentAlign="start" w="full">
        <Icon component="span" lucideIcon={BarChart3} />
        <Text size="sm" c="muted">Example 404</Text>
      </Button>

      <Accordion type="single" collapsible w="full">
        <AccordionItem gap="sm" value="more">
          <AccordionTrigger rounded={roundedItem}>
            <Text size="sm" c="foreground">More</Text>
          </AccordionTrigger>
          <AccordionContent>
            <Stack gap="xs" align="start">
              <Button onClick={() => navigate('/login')} variant="ghost" size={buttonSize.default} rounded={roundedItem} contentAlign="start" w="full">
                <Icon component="span" lucideIcon={LogIn} />
                <Text size="xs" c="muted">Login</Text>
              </Button>
              <Button onClick={() => navigate('/register')} variant="ghost" size={buttonSize.default} rounded={roundedItem} contentAlign="start" w="full">
                <Icon component="span" lucideIcon={UserPlus} />
                <Text size="xs" c="muted">Register</Text>
              </Button>
            </Stack>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Stack>
  );
}


