import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, FileText, Calendar, DollarSign, Users } from 'lucide-react';
import { mockDB } from '@/data/mockDatabase';

const Admissions = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    program: '',
    previousEducation: '',
    gpa: ''
  });

  const requirements = [
    {
      icon: FileText,
      title: 'Academic Transcripts',
      description: 'Official transcripts from all previously attended institutions'
    },
    {
      icon: CheckCircle,
      title: 'Minimum GPA',
      description: 'Undergraduate: 2.5 GPA, Graduate: 3.0 GPA'
    },
    {
      icon: FileText,
      title: 'Application Essay',
      description: 'Personal statement outlining your academic and career goals'
    },
    {
      icon: Users,
      title: 'Letters of Recommendation',
      description: 'Two letters from academic or professional references'
    }
  ];

  const deadlines = [
    { semester: 'Fall 2024', deadline: 'August 1, 2024', status: 'Open' },
    { semester: 'Spring 2025', deadline: 'December 1, 2024', status: 'Open' },
    { semester: 'Summer 2025', deadline: 'April 1, 2025', status: 'Coming Soon' }
  ];

  const programs = [
    'Computer Science',
    'Business Administration',
    'Engineering',
    'Psychology',
    'Biology',
    'Mathematics',
    'English Literature',
    'Chemistry',
    'Physics',
    'Economics'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.program) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Save to mock database
      await mockDB.addApplication(formData);
      
      toast({
        title: "Application Submitted Successfully!",
        description: "We'll review your application and contact you within 2-3 weeks."
      });

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        program: '',
        previousEducation: '',
        gpa: ''
      });
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-university-navy">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-6 animate-fade-in">Admissions</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto animate-fade-in">
            Take the first step towards your future. Join our community of scholars and innovators 
            at Alghazi University.
          </p>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">Admission Requirements</h2>
            <p className="text-xl text-muted-foreground">Everything you need to know to apply</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {requirements.map((req, index) => {
              const IconComponent = req.icon;
              return (
                <Card key={index} className="border-none shadow-card text-center">
                  <CardContent className="p-6">
                    <div className="bg-university-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-university-gold" />
                    </div>
                    <h3 className="text-lg font-semibold text-primary mb-2">{req.title}</h3>
                    <p className="text-muted-foreground text-sm">{req.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application Deadlines */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">Application Deadlines</h2>
            <p className="text-xl text-muted-foreground">Plan ahead for your application</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {deadlines.map((deadline, index) => (
                <Card key={index} className="border-none shadow-card">
                  <CardHeader className="text-center">
                    <Calendar className="h-12 w-12 text-university-gold mx-auto mb-2" />
                    <CardTitle className="text-xl text-primary">{deadline.semester}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-2xl font-bold text-primary mb-2">{deadline.deadline}</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      deadline.status === 'Open' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {deadline.status}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-primary mb-4">Apply Now</h2>
              <p className="text-xl text-muted-foreground">Start your application today</p>
            </div>

            <Card className="border-none shadow-card">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="program">Intended Program *</Label>
                    <Select value={formData.program} onValueChange={(value) => handleInputChange('program', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a program" />
                      </SelectTrigger>
                      <SelectContent>
                        {programs.map(program => (
                          <SelectItem key={program} value={program}>{program}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="previousEducation">Previous Education</Label>
                    <Textarea
                      id="previousEducation"
                      value={formData.previousEducation}
                      onChange={(e) => handleInputChange('previousEducation', e.target.value)}
                      placeholder="Describe your educational background..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gpa">GPA (if applicable)</Label>
                    <Input
                      id="gpa"
                      value={formData.gpa}
                      onChange={(e) => handleInputChange('gpa', e.target.value)}
                      placeholder="e.g., 3.5"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-university-gold hover:bg-university-gold/90 text-university-navy font-semibold" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tuition Info */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">Tuition & Financial Aid</h2>
            <p className="text-xl text-muted-foreground">Making education accessible and affordable</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="border-none shadow-card text-center">
              <CardContent className="p-6">
                <DollarSign className="h-12 w-12 text-university-gold mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-primary mb-2">Undergraduate</h3>
                <p className="text-3xl font-bold text-primary mb-2">$15,000</p>
                <p className="text-muted-foreground">per academic year</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-card text-center">
              <CardContent className="p-6">
                <DollarSign className="h-12 w-12 text-university-gold mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-primary mb-2">Graduate</h3>
                <p className="text-3xl font-bold text-primary mb-2">$18,000</p>
                <p className="text-muted-foreground">per academic year</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-card text-center">
              <CardContent className="p-6">
                <CheckCircle className="h-12 w-12 text-university-gold mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-primary mb-2">Financial Aid</h3>
                <p className="text-lg font-semibold text-primary mb-2">Available</p>
                <p className="text-muted-foreground">scholarships & grants</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admissions;