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
      try {
        // Use default mock data instead of fetching from JSON file
        const defaultCourses = this.getDefaultCourses();
        localStorage.setItem(this.COURSES_KEY, JSON.stringify(defaultCourses));
      } catch (error) {
        console.error('Failed to initialize courses data:', error);
        // Set empty array as fallback
        localStorage.setItem(this.COURSES_KEY, JSON.stringify([]));
      }
    }
  }

  // Default courses data
  private getDefaultCourses(): Course[] {
    return [
      {
        id: "CS101",
        title: "Introduction to Computer Science",
        code: "CS101",
        description: "Fundamental concepts of computer science including programming basics, algorithms, and data structures.",
        detailedDescription: "This comprehensive introductory course provides students with a solid foundation in computer science principles. Students will learn programming fundamentals using Python, explore algorithmic thinking, and understand basic data structures. The course emphasizes problem-solving skills and computational thinking that are essential for success in the field of computer science.",
        credits: 3,
        department: "Computer Science",
        semester: "Fall/Spring",
        prerequisites: "None",
        instructor: {
          id: "prof001",
          name: "Dr. Sarah Chen",
          title: "Associate Professor of Computer Science",
          email: "s.chen@alghazi.edu",
          office: "Tech Building, Room 301",
          officeHours: "Mon/Wed 2:00-4:00 PM",
          bio: "Dr. Chen has over 10 years of experience in software engineering and computer science education. She specializes in algorithms, data structures, and programming languages.",
          image: "/images/instructors/dr-chen.jpg",
          rating: 4.8,
          specializations: ["Algorithms", "Data Structures", "Python Programming", "Software Engineering"]
        },
        schedule: {
          days: ["Monday", "Wednesday", "Friday"],
          time: "10:00 AM - 11:00 AM",
          location: "Tech Building, Room 101",
          format: "In-Person"
        },
        learningOutcomes: [
          "Understand fundamental programming concepts",
          "Implement basic algorithms and data structures",
          "Develop problem-solving skills using computational thinking",
          "Write clean, efficient, and well-documented code"
        ],
        courseTopics: [
          "Programming Fundamentals",
          "Variables and Data Types",
          "Control Structures",
          "Functions and Modules",
          "Basic Data Structures",
          "Algorithm Design",
          "Debugging Techniques",
          "Software Development Lifecycle"
        ],
        assessmentMethods: [
          "Programming Assignments (40%)",
          "Midterm Exam (25%)",
          "Final Project (25%)",
          "Class Participation (10%)"
        ],
        requiredMaterials: [
          "Python Programming: An Introduction to Computer Science by John Zelle",
          "Access to Python development environment",
          "Course materials on learning management system"
        ],
        difficulty: "Beginner",
        enrollmentInfo: {
          capacity: 30,
          enrolled: 28,
          waitlist: 5
        },
        tuition: 1200,
        duration: "16 weeks",
        language: "English",
        tags: ["Programming", "Python", "Algorithms", "Beginner-Friendly"],
        rating: 4.7,
        reviews: [
          {
            id: "rev001",
            studentName: "Alex Johnson",
            rating: 5,
            comment: "Excellent introduction to programming. Dr. Chen explains complex concepts in an easy-to-understand way.",
            date: "2024-01-15"
          },
          {
            id: "rev002",
            studentName: "Maria Garcia",
            rating: 4,
            comment: "Great course for beginners. The assignments are challenging but fair.",
            date: "2024-01-10"
          }
        ],
        relatedCourses: ["CS102", "CS201"],
        image: "/images/courses/cs101.jpg"
      },
      {
        id: "MATH201",
        title: "Calculus I",
        code: "MATH201",
        description: "Introduction to differential and integral calculus with applications to science and engineering.",
        detailedDescription: "This course covers the fundamental concepts of calculus including limits, derivatives, and integrals. Students will learn to apply calculus techniques to solve real-world problems in science, engineering, and economics. The course emphasizes both theoretical understanding and practical application.",
        credits: 4,
        department: "Mathematics",
        semester: "Fall/Spring",
        prerequisites: "Pre-Calculus or equivalent",
        instructor: {
          id: "prof002",
          name: "Dr. Michael Rodriguez",
          title: "Professor of Mathematics",
          email: "m.rodriguez@alghazi.edu",
          office: "Math Building, Room 205",
          officeHours: "Tue/Thu 1:00-3:00 PM",
          bio: "Dr. Rodriguez is a renowned mathematician with expertise in calculus and mathematical analysis. He has published numerous papers and has been teaching for over 15 years.",
          image: "/images/instructors/dr-rodriguez.jpg",
          rating: 4.6,
          specializations: ["Calculus", "Mathematical Analysis", "Applied Mathematics", "Differential Equations"]
        },
        schedule: {
          days: ["Monday", "Wednesday", "Friday"],
          time: "9:00 AM - 10:30 AM",
          location: "Math Building, Room 150",
          format: "In-Person"
        },
        learningOutcomes: [
          "Master the concept of limits and continuity",
          "Understand and apply differentiation techniques",
          "Learn integration methods and applications",
          "Solve optimization and related rate problems"
        ],
        courseTopics: [
          "Limits and Continuity",
          "Derivatives and Applications",
          "Integration Techniques",
          "Fundamental Theorem of Calculus",
          "Applications of Integration",
          "Optimization Problems",
          "Related Rates",
          "Curve Sketching"
        ],
        assessmentMethods: [
          "Homework Assignments (30%)",
          "Quizzes (20%)",
          "Midterm Exams (30%)",
          "Final Exam (20%)"
        ],
        requiredMaterials: [
          "Calculus: Early Transcendentals by James Stewart",
          "Graphing calculator (TI-84 or equivalent)",
          "Online homework system access"
        ],
        difficulty: "Intermediate",
        enrollmentInfo: {
          capacity: 35,
          enrolled: 32,
          waitlist: 8
        },
        tuition: 1400,
        duration: "16 weeks",
        language: "English",
        tags: ["Mathematics", "Calculus", "STEM", "Prerequisites"],
        rating: 4.5,
        reviews: [
          {
            id: "rev003",
            studentName: "David Kim",
            rating: 5,
            comment: "Dr. Rodriguez makes calculus accessible and interesting. Highly recommended!",
            date: "2024-01-20"
          }
        ],
        relatedCourses: ["MATH202", "PHYS101"],
        image: "/images/courses/math201.jpg"
      },
      {
        id: "ENG101",
        title: "English Composition",
        code: "ENG101",
        description: "Development of writing skills through practice in various forms of composition and critical analysis.",
        detailedDescription: "This course focuses on developing students' writing abilities through extensive practice in composition, revision, and critical analysis. Students will learn to write clear, coherent, and persuasive essays while developing critical thinking skills through the analysis of various texts.",
        credits: 3,
        department: "English",
        semester: "Fall/Spring/Summer",
        prerequisites: "None",
        instructor: {
          id: "prof003",
          name: "Prof. Emily Watson",
          title: "Assistant Professor of English",
          email: "e.watson@alghazi.edu",
          office: "Humanities Building, Room 120",
          officeHours: "Mon/Wed/Fri 11:00 AM-12:00 PM",
          bio: "Prof. Watson specializes in composition studies and rhetoric. She has extensive experience helping students develop their writing skills and critical thinking abilities.",
          image: "/images/instructors/prof-watson.jpg",
          rating: 4.9,
          specializations: ["Composition", "Rhetoric", "Critical Writing", "Academic Writing"]
        },
        schedule: {
          days: ["Tuesday", "Thursday"],
          time: "2:00 PM - 3:30 PM",
          location: "Humanities Building, Room 201",
          format: "Hybrid"
        },
        learningOutcomes: [
          "Write clear and effective essays",
          "Develop critical thinking and analysis skills",
          "Master the writing process from brainstorming to revision",
          "Use proper citation and avoid plagiarism"
        ],
        courseTopics: [
          "The Writing Process",
          "Essay Structure and Organization",
          "Thesis Development",
          "Research and Citation",
          "Critical Analysis",
          "Revision Strategies",
          "Grammar and Style",
          "Peer Review"
        ],
        assessmentMethods: [
          "Essays (60%)",
          "Peer Reviews (15%)",
          "Class Participation (15%)",
          "Final Portfolio (10%)"
        ],
        requiredMaterials: [
          "The Norton Field Guide to Writing by Richard Bullock",
          "Access to online writing lab",
          "Course packet available at bookstore"
        ],
        difficulty: "Beginner",
        enrollmentInfo: {
          capacity: 25,
          enrolled: 23,
          waitlist: 2
        },
        tuition: 1100,
        duration: "16 weeks",
        language: "English",
        tags: ["Writing", "English", "Critical Thinking", "Communication"],
        rating: 4.8,
        reviews: [
          {
            id: "rev004",
            studentName: "Sarah Thompson",
            rating: 5,
            comment: "Prof. Watson's feedback is incredibly helpful. My writing improved dramatically.",
            date: "2024-01-25"
          }
        ],
        relatedCourses: ["ENG102", "COMM101"],
        image: "/images/courses/eng101.jpg"
      }
    ];
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