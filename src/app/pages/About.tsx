import { MainLayout } from '@/app/layouts/Main';
import { components, ui } from '@ui8kit';

export const { Button } = ui.button;
export const { Main } = ui.main;
export const { Card, CardHeader, CardContent, CardFooter, CardImage, CardTitle, CardDescription } = ui.card;
export const { Section, Grid, SectionHeader, SectionFooter, SectionContent, SectionTitle, SectionDescription } = components.section;

export const urlImage = 'https://images.unsplash.com/vector-1746618662777-7058cb830c6a?q=80&w=1934&auto=format&fit=crop';

const page = {
  title: 'Switch Theme Mode',
  excerpt: 'Toggle between Tailwind utilities and semantic HTML classes instantly. Same components, different approaches.',
  content: 'Experience how the same React components work seamlessly with both styling approaches. Switch modes to see Tailwind utility classes transform into clean HTML5 semantic markup while maintaining identical functionality and design.',
}

const features = [
  {
    id: 1,
    title: 'Component Flexibility',
    excerpt: 'Build once, style anywhere. Your components adapt to any CSS methodology without code changes.',
    featuredImage: {
      url: urlImage,
      alt: 'Component Flexibility',
      caption: 'Component Flexibility',
    },
  },
  {
    id: 2,
    title: 'Clean Architecture',
    excerpt: 'Separate logic from presentation. Switch between utility-first and semantic approaches effortlessly.',
    featuredImage: {
      url: urlImage,
      alt: 'Clean Architecture',
      caption: 'Clean Architecture',
    },
  },
  {
    id: 3,
    title: 'Developer Experience',
    excerpt: 'Write components once, deploy everywhere. Perfect for teams with different CSS preferences.',
    featuredImage: {
      url: urlImage,
      alt: 'Developer Experience',
      caption: 'Developer Experience',
    },
  },
]

function App() {

  return (
    <MainLayout title={page.title} description={page.excerpt}>
      {/* Реализовать макет и сайдбар и перенести все компоненты из Elysia */}
      <Section>
        <SectionHeader>
          <SectionTitle>{page.title}</SectionTitle>
          <SectionDescription>{page.excerpt}</SectionDescription>
        </SectionHeader>
        <SectionContent className="w-full py-12 px-6 bg-muted rounded-md mb-12">
          <p className="py-6 text-secondary-foreground">{page.content}</p>
        </SectionContent>

        <SectionContent>
          <Grid>
            {features.map((feature) => (
              <Card key={feature.id}>
                <CardImage src={feature.featuredImage.url} alt={feature.featuredImage.alt} caption={feature.featuredImage.caption} />
                <CardContent>
                  <CardTitle>{feature.title}</CardTitle>
                  <p className="text-sm">{feature.excerpt}</p>
                </CardContent>
                <CardFooter className="flex justify-end pb-6">
                  <Button variant="secondary" size="lg">Learn More</Button>
                </CardFooter>
              </Card>
            ))}
          </Grid>
        </SectionContent>
      </Section>
    </MainLayout>
  );
}

export default App;
export { App as About }; 