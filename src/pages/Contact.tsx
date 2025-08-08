import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { mockDB } from '@/data/mockDatabase';

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      details: ['112 POGI ST. BRGY CULIAT, TANDANG SORA AVENUE, QUEZON CITY']
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['+63 9815747302', '+1 (555) 123-4568']
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['alghazi355@gmail.com', 'admissions@alghazi.edu']
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: ['Mon-Fri: 8:00 AM - 5:00 PM', 'Sat: 9:00 AM - 1:00 PM']
    }
  ];

  const departments = [
    { name: 'Admissions Office', phone: '+1 (555) 123-4569', email: 'admissions@alghazi.edu' },
    { name: 'Student Services', phone: '+1 (555) 123-4570', email: 'services@alghazi.edu' },
    { name: 'Academic Affairs', phone: '+1 (555) 123-4571', email: 'academic@alghazi.edu' },
    { name: 'Financial Aid', phone: '+1 (555) 123-4572', email: 'financial@alghazi.edu' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Save to mock database
      await mockDB.addContactMessage(formData);
      
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours."
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Error sending message",
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
          <h1 className="text-5xl font-bold text-white mb-6 animate-fade-in">Contact Us</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto animate-fade-in">
            Get in touch with us. We're here to help you with any questions about 
            Alghazi University and our programs.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <Card key={index} className="border-none shadow-card text-center hover:shadow-elegant transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="bg-university-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-university-gold" />
                    </div>
                    <h3 className="text-lg font-semibold text-primary mb-3">{info.title}</h3>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-muted-foreground text-sm mb-1">{detail}</p>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-4xl font-bold text-primary mb-4">Send us a Message</h2>
                <p className="text-xl text-muted-foreground">
                  Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
              </div>

              <Card className="border-none shadow-card">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        rows={5}
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-university-gold hover:bg-university-gold/90 text-university-navy font-semibold" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Map and Additional Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-primary mb-4">Find Us</h3>
                <div className="bg-muted rounded-lg overflow-hidden h-64 flex items-center justify-center">
                  <iframe
                    title="Alghazi University Location"
                    src="https://www.google.com/maps?q=112+POGI+ST.+BRGY+CULIAT,+TANDANG+SORA+AVENUE,+QUEZON+CITY&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-primary mb-4">Department Contacts</h3>
                <div className="space-y-4">
                  {departments.map((dept, index) => (
                    <Card key={index} className="border-none shadow-card">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-primary mb-2">{dept.name}</h4>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2" />
                            {dept.phone}
                          </div>
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-2" />
                            {dept.email}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media & Additional Info */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-primary mb-4">Connect With Us</h2>
            <p className="text-xl text-muted-foreground">Follow us on social media for the latest updates</p>
          </div>

          <div className="flex justify-center space-x-6 mb-8">
            <a href="https://www.facebook.com/4lgha" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="bg-primary p-4 rounded-full hover:bg-university-gold hover:text-university-navy transition-all cursor-pointer">
              <Facebook className="h-6 w-6 text-white" />
            </a>
            <a href="https://x.com/ALGpain" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="bg-primary p-4 rounded-full hover:bg-university-gold hover:text-university-navy transition-all cursor-pointer">
              <Twitter className="h-6 w-6 text-white" />
            </a>
            <a href="https://www.instagram.com/4lgha/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="bg-primary p-4 rounded-full hover:bg-university-gold hover:text-university-navy transition-all cursor-pointer">
              <Instagram className="h-6 w-6 text-white" />
            </a>
            <a href="https://www.linkedin.com/in/alghazi-utap-057b42328/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="bg-primary p-4 rounded-full hover:bg-university-gold hover:text-university-navy transition-all cursor-pointer">
              <Linkedin className="h-6 w-6 text-white" />
            </a>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-semibold text-primary mb-2">Emergency Contact</h3>
            <p className="text-muted-foreground">For campus emergencies, call: <span className="font-semibold">+1 (555) 911-HELP</span></p>
            <p className="text-sm text-muted-foreground mt-2">Available 24/7</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;