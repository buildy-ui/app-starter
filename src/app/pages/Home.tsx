import { MainLayout } from '@/app/layouts/MainLayout';
import { components, ui } from '@ui8kit';

export const { Button } = ui.button;
export const { Main } = components.main;
export const { Card, CardHeader, CardContent, CardFooter, CardImage, CardTitle, CardDescription } = ui.card;
export const { Section, Grid, SectionHeader, SectionFooter, SectionContent, SectionTitle, SectionDescription } = components.section;

export const urlImage = 'https://images.unsplash.com/vector-1746618662777-7058cb830c6a?q=80&w=1934&auto=format&fit=crop';

const page = {
  title: 'Welcome to Buildy UI',
  excerpt: 'Modern React component library with theme support and flexible architecture.',
  content: 'Buildy UI provides a set of ready-to-use components that are easily customizable and integrate into any project. Support for dark and light themes, as well as switching between utility-first and semantic styling approaches.',
}

const features = [
  {
    id: 1,
    title: 'Flexible Components',
    excerpt: 'Easily customizable components with support for various styles and themes.',
    featuredImage: {
      url: urlImage,
      alt: 'Flexible Components',
      caption: 'Flexible Components',
    },
  },
  {
    id: 2,
    title: 'TypeScript Support',
    excerpt: 'Full typing for better development experience and code reliability.',
    featuredImage: {
      url: urlImage,
      alt: 'TypeScript Support',
      caption: 'TypeScript Support',
    },
  },
  {
    id: 3,
    title: 'Modern Design',
    excerpt: 'Current design patterns and UI/UX best practices for modern applications.',
    featuredImage: {
      url: urlImage,
      alt: 'Modern Design',
      caption: 'Modern Design',
    },
  },
]

function App() {

  return (
    <MainLayout title={page.title} description={page.excerpt}>
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
export { App as Home }; 