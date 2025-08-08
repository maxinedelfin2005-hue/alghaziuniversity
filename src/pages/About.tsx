import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, Target, Eye, Heart, Globe, Users, BookOpen } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: GraduationCap,
      title: 'Academic Excellence',
      description: 'Committed to maintaining the highest standards in education and research'
    },
    {
      icon: Globe,
      title: 'Global Perspective',
      description: 'Fostering international collaboration and cross-cultural understanding'
    },
    {
      icon: Users,
      title: 'Inclusive Community',
      description: 'Creating an environment where all students can thrive and succeed'
    },
    {
      icon: Heart,
      title: 'Social Responsibility',
      description: 'Encouraging students to contribute positively to society'
    }
  ];

  const milestones = [
    { year: '1974', event: 'Alghazi University founded with 500 students' },
    { year: '1985', event: 'Established School of Engineering and Technology' },
    { year: '1995', event: 'Launched first international exchange programs' },
    { year: '2005', event: 'Opened state-of-the-art research facilities' },
    { year: '2015', event: 'Achieved top 100 global university ranking' },
    { year: '2024', event: 'Celebrating 50 years of educational excellence' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-university-navy">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-6 animate-fade-in">About Alghazi University</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto animate-fade-in">
            For over five decades, we have been at the forefront of higher education, 
            nurturing minds and shaping futures through innovation, research, and academic excellence.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-none shadow-card">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-university-gold/10 p-3 rounded-full mr-4">
                    <Target className="h-8 w-8 text-university-gold" />
                  </div>
                  <h2 className="text-3xl font-bold text-primary">Our Mission</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  To provide transformative education that empowers students to become innovative leaders, 
                  critical thinkers, and responsible global citizens. We are committed to advancing knowledge 
                  through research, fostering creativity, and serving our community.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-card">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-university-gold/10 p-3 rounded-full mr-4">
                    <Eye className="h-8 w-8 text-university-gold" />
                  </div>
                  <h2 className="text-3xl font-bold text-primary">Our Vision</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  To be a globally recognized institution of higher learning that leads in educational innovation, 
                  groundbreaking research, and community engagement, while maintaining our commitment to 
                  academic excellence and ethical leadership.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Our Journey</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From humble beginnings to becoming a world-class institution, discover the milestones 
              that have shaped Alghazi University's legacy.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-center mb-8 animate-slide-in">
                <div className="bg-university-gold text-university-navy font-bold py-2 px-4 rounded-full mr-6 min-w-[80px] text-center">
                  {milestone.year}
                </div>
                <Card className="flex-1 border-none shadow-card">
                  <CardContent className="p-4">
                    <p className="text-primary font-medium">{milestone.event}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Our Core Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do and shape the character of our institution
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={index} className="border-none shadow-card hover:shadow-elegant transition-all duration-300 group text-center">
                  <CardContent className="p-6">
                    <div className="bg-university-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-university-gold/20 transition-colors">
                      <IconComponent className="h-8 w-8 text-university-gold" />
                    </div>
                    <h3 className="text-xl font-semibold text-primary mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats & Achievements */}
      <section className="py-20 bg-gradient-to-r from-university-navy to-primary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">By the Numbers</h2>
            <p className="text-xl text-white/90">Our achievements speak for themselves</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold text-university-gold mb-2">15,000+</div>
              <div className="text-lg">Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-university-gold mb-2">800+</div>
              <div className="text-lg">Faculty</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-university-gold mb-2">200+</div>
              <div className="text-lg">Programs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-university-gold mb-2">80+</div>
              <div className="text-lg">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary mb-6">Join Our Legacy</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Become part of a tradition of excellence that has been shaping leaders for over 50 years
          </p>
          <Button size="lg" asChild className="bg-university-gold hover:bg-university-gold/90 text-university-navy font-semibold">
            <a href="/admissions">Start Your Application</a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;