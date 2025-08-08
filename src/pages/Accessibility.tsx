
import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';

const Accessibility = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-university-navy via-secondary to-background py-12">
      <Card className="w-full max-w-2xl mx-auto shadow-elegant border-none bg-white/90">
        <CardContent className="p-10">
          <div className="flex flex-col items-center text-center">
            <div className="bg-university-gold/20 rounded-full p-4 mb-4">
              <ShieldCheck className="h-10 w-10 text-university-gold" aria-hidden="true" />
            </div>
            <h1 className="text-4xl font-bold text-primary mb-4">Accessibility</h1>
            <p className="text-muted-foreground mb-8 max-w-xl">
              We are committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply relevant accessibility standards.
            </p>
          </div>
          <div className="space-y-8 max-w-xl mx-auto">
            <section>
              <h2 className="text-xl font-semibold text-primary mb-2">Our Commitment</h2>
              <p className="text-muted-foreground">
                We aim to conform to <span className="font-medium">WCAG 2.1 AA</span> guidelines and welcome feedback to improve accessibility.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-primary mb-2">Feedback</h2>
              <p className="text-muted-foreground">
                If you encounter accessibility barriers on our site, please contact us at
                <a href="mailto:alghazi355@gmail.com" className="text-university-gold font-medium underline ml-1">alghazi355@gmail.com</a>.
              </p>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Accessibility;

