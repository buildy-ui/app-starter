import { Card, Stack, Title, Text, Button } from '@ui8kit/core'
import { useTheme } from '@/providers/theme'

export function NewsletterSignup() {
  const { rounded } = useTheme()
  return (
    <Card p="lg" rounded={rounded.default} shadow="md" bg="primary" data-class="newsletter-signup">
      <Stack gap="md">
        <Title order={3} size="xl" fw="bold" c="primary-foreground">Subscribe</Title>
        <Text size="sm" c="primary-foreground" leading="relaxed">Get the latest posts delivered to your inbox.</Text>
        <input 
          type="email" 
          placeholder="you@example.com" 
          data-class="newsletter-input"
          style={{ padding: '12px', borderRadius: '8px', border: 'none', background: 'white' }}
        />
        <Button variant="secondary" w="full">Subscribe</Button>
      </Stack>
    </Card>
  )
}


