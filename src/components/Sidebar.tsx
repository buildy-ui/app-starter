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
      <Box overflow="auto" h="screen" data-class="sidebar-main">
        <Stack p="md" align="start" data-class="sidebar-header">
          <Text c="muted" data-class="sidebar-header-text">Sidebar</Text>
        </Stack>
        <Stack gap="lg" p="md" data-class="sidebar-content">
          <NavMenu />
          <Card rounded={rounded?.default} data-class="sidebar-widget">
            <Text size="xl" c="muted" data-class="widget-title">Widget</Text>
            <Text size="xs" c="muted" data-class="widget-description">This is a widget description that can be used to display information to the user.</Text>
          </Card>
        </Stack>
      </Box>
    </Block>
  )
}