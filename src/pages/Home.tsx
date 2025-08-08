import { GraduationCap, Users, BookOpen, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import campusHero from '@/assets/campus-hero.jpg';

const Home = () => {
  const stats = [
    { icon: Users, label: 'Students Enrolled', value: '15,000+' },
    { icon: GraduationCap, label: 'Programs Offered', value: '200+' },
    { icon: BookOpen, label: 'Faculty Members', value: '800+' },
    { icon: Award, label: 'Years of Excellence', value: '50+' },
  ];

  const features = [
    {
      title: 'World-Class Education',
      description: 'Experience cutting-edge curriculum designed by industry experts and delivered by renowned faculty.',
      icon: GraduationCap
    },
    {
      title: 'Research Excellence',
      description: 'Join groundbreaking research initiatives that shape the future across multiple disciplines.',
      icon: BookOpen
    },
    {
      title: 'Global Community',
      description: 'Connect with students from over 80 countries in our diverse and inclusive campus environment.',
      icon: Users
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${campusHero})` }}
        >
          <div className="absolute inset-0 bg-university-navy/60"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Welcome to
            <span className="block text-university-gold">Alghazi University</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto animate-fade-in">
            Where knowledge meets innovation. Join our community of scholars, researchers, 
            and leaders who are shaping the future through academic excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button size="lg" asChild className="bg-university-gold hover:bg-university-gold/90 text-university-navy font-semibold">
              <Link to="/admissions">Apply Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-university-navy">
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center animate-slide-in">
                  <IconComponent className="h-12 w-12 text-university-gold mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-primary mb-2">{stat.value}</h3>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Why Choose Alghazi University?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the advantages that make us one of the leading institutions for higher education
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="border-none shadow-card hover:shadow-elegant transition-all duration-300 group">
                  <CardContent className="p-8 text-center">
                    <div className="bg-university-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-university-gold/20 transition-colors">
                      <IconComponent className="h-8 w-8 text-university-gold" />
                    </div>
                    <h3 className="text-xl font-semibold text-primary mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-university-navy">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have chosen Alghazi University as their path to success
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-university-gold hover:bg-university-gold/90 text-university-navy font-semibold">
              <Link to="/courses">Explore Programs</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-primary">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;