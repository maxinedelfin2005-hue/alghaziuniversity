import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-university-navy text-university-cream">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* University Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-university-gold">Alghazi University</h3>
            <p className="text-sm leading-relaxed">
              Committed to excellence in education, research, and community service. 
              Shaping tomorrow's leaders through innovative learning and academic distinction.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/4lgha" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-5 w-5 hover:text-university-gold cursor-pointer transition-colors" />
              </a>
              <a href="https://x.com/ALGpain" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                <Twitter className="h-5 w-5 hover:text-university-gold cursor-pointer transition-colors" />
              </a>
              <a href="https://www.instagram.com/4lgha/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-5 w-5 hover:text-university-gold cursor-pointer transition-colors" />
              </a>
              <a href="https://www.linkedin.com/in/alghazi-utap-057b42328/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 hover:text-university-gold cursor-pointer transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-university-gold">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/about" className="hover:text-university-gold transition-colors">About Us</Link>
              <Link to="/courses" className="hover:text-university-gold transition-colors">Academic Programs</Link>
              <Link to="/admissions" className="hover:text-university-gold transition-colors">Admissions</Link>
              <Link to="/contact" className="hover:text-university-gold transition-colors">Contact</Link>
            </nav>
          </div>

          {/* Academic */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-university-gold">Academics</h4>
            <nav className="flex flex-col space-y-2">
              <a href="#" className="hover:text-university-gold transition-colors">Undergraduate</a>
              <a href="#" className="hover:text-university-gold transition-colors">Graduate</a>
              <a href="#" className="hover:text-university-gold transition-colors">Research</a>
              <a href="#" className="hover:text-university-gold transition-colors">Online Learning</a>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-university-gold">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-university-gold mt-0.5" />
                <div>
                  <p className="text-sm">112 POGI ST. BRGY CULIAT, TANDANG SORA AVENUE, QUEZON CITY</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-university-gold" />
                <p className="text-sm">+63 9815747302</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-university-gold" />
                <p className="text-sm">alghazi355@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-university-cream/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">&copy; 2024 Alghazi University. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy" className="text-sm hover:text-university-gold transition-colors">Privacy Policy</a>
              <a href="/terms" className="text-sm hover:text-university-gold transition-colors">Terms of Service</a>
              <a href="/accessibility" className="text-sm hover:text-university-gold transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;