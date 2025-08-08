// ...existing code...
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Clock, GraduationCap, Search, Star, Users, MapPin, Calendar, DollarSign, Filter, Grid, List } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockDB, Course } from '@/data/mockDatabase';

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [sortBy, setSortBy] = useState('title');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        await mockDB.initializeData();
        const coursesData = mockDB.getCourses();
        setCourses(coursesData);
        setFilteredCourses(coursesData);
      } catch (err) {
        console.error('Error loading courses:', err);
        setError('Failed to load courses. Please try again later.');
        // Set empty arrays as fallback
        setCourses([]);
        setFilteredCourses([]);
      } finally {
        setLoading(false);
      }
    };
    loadCourses();
  }, []);

  useEffect(() => {
    let filtered = courses;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (course.instructor && course.instructor.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (course.tags && course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    }

    // Filter by department
    if (selectedDepartment !== 'all') {
      filtered = filtered.filter(course => course.department === selectedDepartment);
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(course => course.difficulty === selectedDifficulty);
    }

    // Filter by format
    if (selectedFormat !== 'all') {
      filtered = filtered.filter(course => course.schedule && course.schedule.format === selectedFormat);
    }

    // Sort courses
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'credits':
          return a.credits - b.credits;
        case 'tuition':
          return (a.tuition || 0) - (b.tuition || 0);
        default:
          return 0;
      }
    });

    setFilteredCourses(filtered);
  }, [courses, searchTerm, selectedDepartment, selectedDifficulty, selectedFormat, sortBy]);

  const departments = [...new Set(courses.map(course => course.department))];
  const difficulties = [...new Set(courses.map(course => course.difficulty).filter(Boolean))];
  const formats = [...new Set(courses.map(course => course.schedule?.format).filter(Boolean))];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-semibold text-primary mb-2">Error Loading Courses</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-university-navy">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-6 animate-fade-in">Academic Programs</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto animate-fade-in">
            Explore our comprehensive range of undergraduate and graduate programs designed to 
            prepare you for success in your chosen field.
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Main Search */}
            <div className="mb-6">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Search courses, instructors, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 text-lg border-2 border-primary/20 focus:border-primary"
                />
              </div>
            </div>

            {/* Advanced Filters */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  {difficulties.map(diff => (
                    <SelectItem key={diff} value={diff}>{diff}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Formats</SelectItem>
                  {formats.map(format => (
                    <SelectItem key={format} value={format}>{format}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">Title A-Z</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="credits">Credits</SelectItem>
                  <SelectItem value="tuition">Price</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="flex-1"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="flex-1"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              <p className="text-muted-foreground">
                Showing {filteredCourses.length} of {courses.length} courses
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-primary mb-2">No courses found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {filteredCourses.map((course) => (
                <Card key={course.id} className={`border-none shadow-card hover:shadow-elegant transition-all duration-300 group animate-fade-in ${viewMode === 'list' ? 'flex' : ''}`}>
                  {viewMode === 'grid' ? (
                    <>
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex gap-2">
                            <Badge variant="outline" className="bg-university-gold/10 text-university-gold border-university-gold/20">
                              {course.code}
                            </Badge>
                            {course.difficulty && (
                              <Badge variant="secondary" className="text-xs">
                                {course.difficulty}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 mr-1" />
                            {course.credits} credits
                          </div>
                        </div>
                        <CardTitle className="text-xl text-primary group-hover:text-university-gold transition-colors line-clamp-2">
                          {course.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-muted-foreground mb-4 line-clamp-3">
                          {course.description}
                        </p>

                        {/* Course Info */}
                        <div className="space-y-2 mb-4">
                          {course.instructor && (
                            <div className="flex items-center text-sm">
                              <GraduationCap className="h-4 w-4 mr-2 text-university-gold" />
                              <span className="font-medium">Instructor:</span>
                              <span className="ml-1 text-muted-foreground truncate">{course.instructor.name}</span>
                            </div>
                          )}
                          {course.schedule && (
                            <div className="flex items-center text-sm">
                              <Calendar className="h-4 w-4 mr-2 text-university-gold" />
                              <span className="font-medium">Schedule:</span>
                              <span className="ml-1 text-muted-foreground">{course.schedule.time}</span>
                            </div>
                          )}
                          {course.schedule && (
                            <div className="flex items-center text-sm">
                              <MapPin className="h-4 w-4 mr-2 text-university-gold" />
                              <span className="font-medium">Format:</span>
                              <span className="ml-1 text-muted-foreground">{course.schedule.format}</span>
                            </div>
                          )}
                          {course.enrollmentInfo && (
                            <div className="flex items-center text-sm">
                              <Users className="h-4 w-4 mr-2 text-university-gold" />
                              <span className="font-medium">Enrollment:</span>
                              <span className="ml-1 text-muted-foreground">
                                {course.enrollmentInfo.enrolled}/{course.enrollmentInfo.capacity}
                              </span>
                            </div>
                          )}
                          {course.tuition && (
                            <div className="flex items-center text-sm">
                              <DollarSign className="h-4 w-4 mr-2 text-university-gold" />
                              <span className="font-medium">Tuition:</span>
                              <span className="ml-1 text-muted-foreground">${course.tuition}</span>
                            </div>
                          )}
                        </div>

                        {/* Rating */}
                        {course.rating && (
                          <div className="flex items-center mb-4">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(course.rating)
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                              <span className="ml-2 text-sm text-muted-foreground">
                                {course.rating.toFixed(1)} ({course.reviews?.length || 0} reviews)
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Tags */}
                        {course.tags && course.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-4">
                            {course.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}

                        <Button
                          variant="outline"
                          className="w-full group-hover:bg-university-gold group-hover:text-university-navy group-hover:border-university-gold transition-all"
                          onClick={() => setSelectedCourse(course)}
                        >
                          Learn More
                        </Button>
                      </CardContent>
                    </>
                  ) : (
                    // List view
                    <div className="flex w-full">
                      <div className="flex-1 p-6">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex gap-2">
                            <Badge variant="outline" className="bg-university-gold/10 text-university-gold border-university-gold/20">
                              {course.code}
                            </Badge>
                            {course.difficulty && (
                              <Badge variant="secondary" className="text-xs">
                                {course.difficulty}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 mr-1" />
                            {course.credits} credits
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-university-gold transition-colors">
                          {course.title}
                        </h3>

                        <p className="text-muted-foreground mb-3 line-clamp-2">
                          {course.description}
                        </p>

                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                          {course.instructor && (
                            <span className="flex items-center">
                              <GraduationCap className="h-4 w-4 mr-1" />
                              {course.instructor.name}
                            </span>
                          )}
                          {course.schedule && (
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {course.schedule.time}
                            </span>
                          )}
                          {course.rating && (
                            <span className="flex items-center">
                              <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                              {course.rating.toFixed(1)}
                            </span>
                          )}
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedCourse(course)}
                          className="group-hover:bg-university-gold group-hover:text-university-navy group-hover:border-university-gold transition-all"
                        >
                          Learn More
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Course Details Modal */}
      <Dialog open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedCourse && (
            <>
              <DialogHeader>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <DialogTitle className="text-3xl text-primary mb-2">{selectedCourse.title}</DialogTitle>
                    <div className="flex gap-2 mb-2">
                      <Badge variant="outline" className="bg-university-gold/10 text-university-gold border-university-gold/20">
                        {selectedCourse.code}
                      </Badge>
                      {selectedCourse.difficulty && (
                        <Badge variant="secondary">{selectedCourse.difficulty}</Badge>
                      )}
                    </div>
                  </div>
                  {selectedCourse.rating && (
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(selectedCourse.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-lg font-semibold">{selectedCourse.rating.toFixed(1)}</span>
                    </div>
                  )}
                </div>
              </DialogHeader>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="instructor">Instructor</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Course Description</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedCourse.detailedDescription || selectedCourse.description}
                    </p>
                  </div>

                  {selectedCourse.learningOutcomes && (
                    <div>
                      <h4 className="font-semibold mb-2">Learning Outcomes</h4>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {selectedCourse.learningOutcomes.map((outcome, index) => (
                          <li key={index}>{outcome}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Credits:</span>
                        <span>{selectedCourse.credits}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Department:</span>
                        <span>{selectedCourse.department}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Semester:</span>
                        <span>{selectedCourse.semester}</span>
                      </div>
                      {selectedCourse.duration && (
                        <div className="flex justify-between">
                          <span className="font-medium">Duration:</span>
                          <span>{selectedCourse.duration}</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      {selectedCourse.tuition && (
                        <div className="flex justify-between">
                          <span className="font-medium">Tuition:</span>
                          <span className="font-semibold text-university-gold">${selectedCourse.tuition}</span>
                        </div>
                      )}
                      {selectedCourse.enrollmentInfo && (
                        <div className="flex justify-between">
                          <span className="font-medium">Enrollment:</span>
                          <span>{selectedCourse.enrollmentInfo.enrolled}/{selectedCourse.enrollmentInfo.capacity}</span>
                        </div>
                      )}
                      {selectedCourse.schedule && (
                        <div className="flex justify-between">
                          <span className="font-medium">Format:</span>
                          <span>{selectedCourse.schedule.format}</span>
                        </div>
                      )}
                      {selectedCourse.language && (
                        <div className="flex justify-between">
                          <span className="font-medium">Language:</span>
                          <span>{selectedCourse.language}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="details" className="space-y-4">
                  {selectedCourse.courseTopics && (
                    <div>
                      <h4 className="font-semibold mb-2">Course Topics</h4>
                      <div className="grid md:grid-cols-2 gap-2">
                        {selectedCourse.courseTopics.map((topic, index) => (
                          <div key={index} className="flex items-center">
                            <BookOpen className="h-4 w-4 mr-2 text-university-gold" />
                            <span className="text-sm">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedCourse.assessmentMethods && (
                    <div>
                      <h4 className="font-semibold mb-2">Assessment Methods</h4>
                      <ul className="space-y-1">
                        {selectedCourse.assessmentMethods.map((method, index) => (
                          <li key={index} className="text-sm text-muted-foreground">{method}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedCourse.requiredMaterials && (
                    <div>
                      <h4 className="font-semibold mb-2">Required Materials</h4>
                      <ul className="space-y-1">
                        {selectedCourse.requiredMaterials.map((material, index) => (
                          <li key={index} className="text-sm text-muted-foreground">{material}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedCourse.schedule && (
                    <div>
                      <h4 className="font-semibold mb-2">Schedule</h4>
                      <div className="bg-secondary/20 p-4 rounded-lg">
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Days:</span>
                            <p>{selectedCourse.schedule.days.join(', ')}</p>
                          </div>
                          <div>
                            <span className="font-medium">Time:</span>
                            <p>{selectedCourse.schedule.time}</p>
                          </div>
                          <div>
                            <span className="font-medium">Location:</span>
                            <p>{selectedCourse.schedule.location}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="instructor" className="space-y-4">
                  {selectedCourse.instructor && (
                    <div className="bg-secondary/20 p-6 rounded-lg">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-university-gold/20 rounded-full flex items-center justify-center">
                          <GraduationCap className="h-8 w-8 text-university-gold" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold mb-1">{selectedCourse.instructor.name}</h4>
                          <p className="text-university-gold mb-2">{selectedCourse.instructor.title}</p>
                          <p className="text-muted-foreground mb-4">{selectedCourse.instructor.bio}</p>

                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Email:</span>
                              <p>{selectedCourse.instructor.email}</p>
                            </div>
                            <div>
                              <span className="font-medium">Office:</span>
                              <p>{selectedCourse.instructor.office}</p>
                            </div>
                            <div>
                              <span className="font-medium">Office Hours:</span>
                              <p>{selectedCourse.instructor.officeHours}</p>
                            </div>
                            <div>
                              <span className="font-medium">Rating:</span>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                                <span>{selectedCourse.instructor.rating}/5</span>
                              </div>
                            </div>
                          </div>

                          {selectedCourse.instructor.specializations && (
                            <div className="mt-4">
                              <span className="font-medium">Specializations:</span>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {selectedCourse.instructor.specializations.map((spec, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {spec}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="reviews" className="space-y-4">
                  {selectedCourse.reviews && selectedCourse.reviews.length > 0 ? (
                    <div className="space-y-4">
                      {selectedCourse.reviews.map((review) => (
                        <div key={review.id} className="border-l-4 border-university-gold/30 pl-4 py-2">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <span className="font-medium">{review.studentName}</span>
                              <div className="flex items-center mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                          <p className="text-muted-foreground">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No reviews available yet.
                    </div>
                  )}
                </TabsContent>
              </Tabs>

              <div className="flex gap-4 mt-6">
                <Button asChild className="flex-1 bg-university-gold hover:bg-university-gold/90 text-university-navy">
                  <Link to={`/courses/${selectedCourse.id}`}>View Full Details</Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link to="/admissions">Apply Now</Link>
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-university-navy to-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Begin Your Academic Journey?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Take the first step towards your future. Apply now and join our community of learners.
          </p>
          <Button size="lg" asChild className="bg-university-gold hover:bg-university-gold/90 text-university-navy font-semibold">
            <a href="/admissions">Apply for Admission</a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Courses;