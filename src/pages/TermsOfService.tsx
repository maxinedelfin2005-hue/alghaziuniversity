
import { Card, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-university-navy via-secondary to-background py-12">
      <Card className="w-full max-w-2xl mx-auto shadow-elegant border-none bg-white/90">
        <CardContent className="p-10">
          <div className="flex flex-col items-center text-center">
            <div className="bg-university-gold/20 rounded-full p-4 mb-4">
              <FileText className="h-10 w-10 text-university-gold" aria-hidden="true" />
            </div>
            <h1 className="text-4xl font-bold text-primary mb-4">Terms of Service</h1>
            <p className="text-muted-foreground mb-8 max-w-xl">
              These Terms of Service govern your use of Alghazi University's website and services.
            </p>
          </div>
          <div className="space-y-8 max-w-xl mx-auto">
            <section>
              <h2 className="text-xl font-semibold text-primary mb-2">Acceptable Use</h2>
              <p className="text-muted-foreground">
                You agree to use our website in compliance with applicable laws and not to engage in activities that disrupt or interfere with our services.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-primary mb-2">Content</h2>
              <p className="text-muted-foreground">
                Content on this site is provided for informational purposes. We may update or change information at any time without notice.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-primary mb-2">Limitation of Liability</h2>
              <p className="text-muted-foreground">
                Alghazi University is not liable for damages arising from your use of this site, to the extent permitted by law.
              </p>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsOfService;

