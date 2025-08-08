// Mock database utility for managing local storage data

export interface Instructor {
  id: string;
  name: string;
  title: string;
  email: string;
  office: string;
  officeHours: string;
  bio: string;
  image: string;
  rating: number;
  specializations: string[];
}

export interface Schedule {
  days: string[];
  time: string;
  location: string;
  format: 'In-Person' | 'Online' | 'Hybrid';
}

export interface Course {
  id: string;
  title: string;
  code: string;
  description: string;
  detailedDescription: string;
  credits: number;
  department: string;
  semester: string;
  prerequisites: string;
  instructor: Instructor;
  schedule: Schedule;
  learningOutcomes: string[];
  courseTopics: string[];
  assessmentMethods: string[];
  requiredMaterials: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  enrollmentInfo: {
    capacity: number;
    enrolled: number;
    waitlist: number;
  };
  tuition: number;
  duration: string;
  language: string;
  tags: string[];
  rating: number;
  reviews: {
    id: string;
    studentName: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  relatedCourses: string[];
  image: string;
}

export interface Application {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  program: string;
  previousEducation: string;
  gpa: string;
  submittedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
}

class MockDatabase {
  private readonly COURSES_KEY = 'alghazi_courses';
  private readonly APPLICATIONS_KEY = 'alghazi_applications';
  private readonly CONTACTS_KEY = 'alghazi_contacts';

  // Initialize with default data if empty
  async initializeData() {
    if (!localStorage.getItem(this.COURSES_KEY)) {
      const coursesResponse = await fetch('/src/data/courses.json');
      const courses = await coursesResponse.json();
      localStorage.setItem(this.COURSES_KEY, JSON.stringify(courses));
    }
  }

  // Courses
  getCourses(): Course[] {
    const courses = localStorage.getItem(this.COURSES_KEY);
    return courses ? JSON.parse(courses) : [];
  }

  addCourse(course: Omit<Course, 'id'>): Course {
    const courses = this.getCourses();
    const newCourse = { ...course, id: Date.now().toString() };
    courses.push(newCourse);
    localStorage.setItem(this.COURSES_KEY, JSON.stringify(courses));
    return newCourse;
  }

  updateCourse(id: string, course: Partial<Course>): Course | null {
    const courses = this.getCourses();
    const index = courses.findIndex(c => c.id === id);
    if (index === -1) return null;
    
    courses[index] = { ...courses[index], ...course };
    localStorage.setItem(this.COURSES_KEY, JSON.stringify(courses));
    return courses[index];
  }

  deleteCourse(id: string): boolean {
    const courses = this.getCourses();
    const filteredCourses = courses.filter(c => c.id !== id);
    if (filteredCourses.length === courses.length) return false;
    
    localStorage.setItem(this.COURSES_KEY, JSON.stringify(filteredCourses));
    return true;
  }

  // Applications
  getApplications(): Application[] {
    const applications = localStorage.getItem(this.APPLICATIONS_KEY);
    return applications ? JSON.parse(applications) : [];
  }

  addApplication(application: Omit<Application, 'id' | 'submittedAt'>): Application {
    const applications = this.getApplications();
    const newApplication = {
      ...application,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString()
    };
    applications.push(newApplication);
    localStorage.setItem(this.APPLICATIONS_KEY, JSON.stringify(applications));
    return newApplication;
  }

  // Contact Messages
  getContactMessages(): ContactMessage[] {
    const contacts = localStorage.getItem(this.CONTACTS_KEY);
    return contacts ? JSON.parse(contacts) : [];
  }

  addContactMessage(contact: Omit<ContactMessage, 'id' | 'submittedAt'>): ContactMessage {
    const contacts = this.getContactMessages();
    const newContact = {
      ...contact,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString()
    };
    contacts.push(newContact);
    localStorage.setItem(this.CONTACTS_KEY, JSON.stringify(contacts));
    return newContact;
  }
}

export const mockDB = new MockDatabase();