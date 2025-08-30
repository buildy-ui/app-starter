"use client"
import { Block, Box, Card, Stack, Text } from "@ui8kit/core"
import { NavMenu } from "./NavMenu";
import { useAppTheme } from '@/hooks/use-theme';

interface SidebarProps {
  className?: string;
  dataClass?: string;
}

export function Sidebar({ className, dataClass }: SidebarProps) {
  const { rounded } = useAppTheme();

  return (
    <Block component="aside" className={className} data-class={dataClass}>
      <Box overflow="auto" h="screen">
        <Stack p="md" align="start">
          <Text c="muted">Sidebar</Text>
        </Stack>
        <Stack gap="lg" p="md">
          <NavMenu />
          <Card rounded={rounded?.default}>
            <Text size="xl" c="muted">Widget</Text>
            <Text size="xs" c="muted">This is a widget description that can be used to display information to the user.</Text>
          </Card>
        </Stack>
      </Box>
    </Block>
  )
}