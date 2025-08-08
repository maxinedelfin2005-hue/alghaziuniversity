
import { Card, CardContent } from '@/components/ui/card';
import { Shield } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-university-navy via-secondary to-background py-12">
      <Card className="w-full max-w-2xl mx-auto shadow-elegant border-none bg-white/90">
        <CardContent className="p-10">
          <div className="flex flex-col items-center text-center">
            <div className="bg-university-gold/20 rounded-full p-4 mb-4">
              <Shield className="h-10 w-10 text-university-gold" aria-hidden="true" />
            </div>
            <h1 className="text-4xl font-bold text-primary mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground mb-8 max-w-xl">
              This Privacy Policy explains how Alghazi University collects, uses, and protects your information when you use our website and services.
            </p>
          </div>
          <div className="space-y-8 max-w-xl mx-auto">
            <section>
              <h2 className="text-xl font-semibold text-primary mb-2">Information We Collect</h2>
              <p className="text-muted-foreground">
                We may collect information you provide directly (like contact and application forms) and technical information collected automatically (like cookies and analytics).
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-primary mb-2">How We Use Information</h2>
              <p className="text-muted-foreground">
                We use your information to provide and improve our services, communicate with you, process applications, and maintain site security.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-primary mb-2">Your Choices</h2>
              <p className="text-muted-foreground">
                You can request access, correction, or deletion of your data. You may also manage cookie settings in your browser.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-primary mb-2">Contact</h2>
              <p className="text-muted-foreground">
                If you have questions about this policy, contact us at
                <a href="mailto:alghazi355@gmail.com" className="text-university-gold font-medium underline ml-1">alghazi355@gmail.com</a>.
              </p>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPolicy;

