//style and component imports
import '@mantine/core/styles.css';
import { AppShell, Center, Box, Stack, Flex } from '@mantine/core';
export default function App() {
  return (
      <AppShell
        padding="md"
        footer={{ height: 60, width: 60}}
        disabled={false}
        //withBorder={false}
      >
      <AppShell.Main>
        Main
      </AppShell.Main>
      <AppShell.Footer>
        <Flex align='center' justify='center' flex={1}>
           Footer text
        </Flex>
      </AppShell.Footer>
      </AppShell>
    );
}