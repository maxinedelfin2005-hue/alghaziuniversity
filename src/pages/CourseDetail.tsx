import { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, GraduationCap, Clock, ArrowLeft, Star, Users, MapPin, Calendar, DollarSign, Mail, Phone } from 'lucide-react';
import { mockDB, Course } from '@/data/mockDatabase';

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    const load = async () => {
      await mockDB.initializeData();
      const c = mockDB.getCourses().find((x) => x.id === id || x.code === id);
      setCourse(c ?? null);
    };
    load();
  }, [id]);

  const notFound = useMemo(() => !course, [course]);

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-university-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <Button variant="outline" asChild className="mb-8 border-white text-white hover:bg-white hover:text-university-navy">
            <Link to="/courses"><ArrowLeft className="h-4 w-4 mr-2" /> Back to Courses</Link>
          </Button>

          {course ? (
            <div className="text-white max-w-4xl">
              <div className="flex flex-wrap gap-3 mb-4">
                <Badge variant="outline" className="bg-white/10 text-white border-white/30 text-sm px-3 py-1">
                  {course.code}
                </Badge>
                {course.difficulty && (
                  <Badge variant="secondary" className="bg-university-gold text-university-navy text-sm px-3 py-1">
                    {course.difficulty}
                  </Badge>
                )}
                {course.schedule && (
                  <Badge variant="outline" className="bg-white/10 text-white border-white/30 text-sm px-3 py-1">
                    {course.schedule.format}
                  </Badge>
                )}
              </div>

              <h1 className="text-5xl font-bold mb-4 leading-tight">{course.title}</h1>
              <p className="text-xl text-white/90 mb-6 leading-relaxed max-w-3xl">
                {course.detailedDescription || course.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-university-gold">{course.credits}</div>
                  <div className="text-white/80 text-sm">Credits</div>
                </div>
                {course.rating && (
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Star className="h-6 w-6 text-yellow-400 fill-current mr-1" />
                      <span className="text-3xl font-bold text-university-gold">{course.rating.toFixed(1)}</span>
                    </div>
                    <div className="text-white/80 text-sm">Rating</div>
                  </div>
                )}
                {course.enrollmentInfo && (
                  <div className="text-center">
                    <div className="text-3xl font-bold text-university-gold">
                      {course.enrollmentInfo.enrolled}/{course.enrollmentInfo.capacity}
                    </div>
                    <div className="text-white/80 text-sm">Enrolled</div>
                  </div>
                )}
                {course.tuition && (
                  <div className="text-center">
                    <div className="text-3xl font-bold text-university-gold">${course.tuition}</div>
                    <div className="text-white/80 text-sm">Tuition</div>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild className="bg-university-gold hover:bg-university-gold/90 text-university-navy font-semibold">
                  <Link to="/admissions">Enroll Now</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-university-navy">
                  Download Syllabus
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-white">
              <h1 className="text-4xl font-bold mb-2">Course not found</h1>
              <p className="text-xl text-white/90">The requested course could not be found.</p>
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {notFound ? (
            <Card className="border-none shadow-card max-w-2xl mx-auto">
              <CardContent className="p-12 text-center">
                <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-primary mb-2">Course Not Found</h2>
                <p className="text-muted-foreground mb-6">We couldn't find the requested course. It may have been moved or removed.</p>
                <Button asChild size="lg">
                  <Link to="/courses">Browse All Courses</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="max-w-7xl mx-auto">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-8">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                  <TabsTrigger value="instructor">Instructor</TabsTrigger>
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-8">
                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                      <Card className="border-none shadow-card">
                        <CardHeader>
                          <CardTitle className="text-2xl text-primary">Course Description</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground leading-relaxed text-lg">
                            {course!.detailedDescription || course!.description}
                          </p>
                        </CardContent>
                      </Card>

                      {course!.learningOutcomes && (
                        <Card className="border-none shadow-card">
                          <CardHeader>
                            <CardTitle className="text-xl text-primary">Learning Outcomes</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-3">
                              {course!.learningOutcomes.map((outcome, index) => (
                                <li key={index} className="flex items-start">
                                  <div className="w-6 h-6 bg-university-gold/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                                    <div className="w-2 h-2 bg-university-gold rounded-full"></div>
                                  </div>
                                  <span className="text-muted-foreground">{outcome}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      )}

                      {course!.tags && course!.tags.length > 0 && (
                        <Card className="border-none shadow-card">
                          <CardHeader>
                            <CardTitle className="text-xl text-primary">Course Tags</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-2">
                              {course!.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="bg-university-gold/10 text-university-gold border-university-gold/20">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                      <Card className="border-none shadow-card">
                        <CardHeader>
                          <CardTitle className="text-primary">Course Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-4 bg-secondary/20 rounded-lg">
                              <div className="text-2xl font-bold text-primary">{course!.credits}</div>
                              <div className="text-sm text-muted-foreground">Credits</div>
                            </div>
                            {course!.rating && (
                              <div className="text-center p-4 bg-secondary/20 rounded-lg">
                                <div className="flex items-center justify-center mb-1">
                                  <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                                  <span className="text-2xl font-bold text-primary">{course!.rating.toFixed(1)}</span>
                                </div>
                                <div className="text-sm text-muted-foreground">Rating</div>
                              </div>
                            )}
                          </div>

                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="font-medium">Department:</span>
                              <span className="text-muted-foreground">{course!.department}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-medium">Semester:</span>
                              <span className="text-muted-foreground">{course!.semester}</span>
                            </div>
                            {course!.duration && (
                              <div className="flex justify-between">
                                <span className="font-medium">Duration:</span>
                                <span className="text-muted-foreground">{course!.duration}</span>
                              </div>
                            )}
                            {course!.language && (
                              <div className="flex justify-between">
                                <span className="font-medium">Language:</span>
                                <span className="text-muted-foreground">{course!.language}</span>
                              </div>
                            )}
                            {course!.tuition && (
                              <div className="flex justify-between">
                                <span className="font-medium">Tuition:</span>
                                <span className="text-university-gold font-semibold">${course!.tuition}</span>
                              </div>
                            )}
                          </div>

                          {course!.prerequisites !== 'None' && (
                            <div className="pt-4 border-t">
                              <span className="font-medium">Prerequisites:</span>
                              <p className="text-muted-foreground mt-1">{course!.prerequisites}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      {course!.enrollmentInfo && (
                        <Card className="border-none shadow-card">
                          <CardHeader>
                            <CardTitle className="text-primary">Enrollment Status</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span>Enrolled:</span>
                                <span className="font-semibold">{course!.enrollmentInfo.enrolled}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Capacity:</span>
                                <span className="font-semibold">{course!.enrollmentInfo.capacity}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Waitlist:</span>
                                <span className="font-semibold">{course!.enrollmentInfo.waitlist}</span>
                              </div>
                              <div className="w-full bg-secondary/20 rounded-full h-2">
                                <div
                                  className="bg-university-gold h-2 rounded-full"
                                  style={{ width: `${(course!.enrollmentInfo.enrolled / course!.enrollmentInfo.capacity) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      <Card className="border-none shadow-card">
                        <CardHeader>
                          <CardTitle className="text-primary">Take Action</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <Button asChild className="w-full bg-university-gold hover:bg-university-gold/90 text-university-navy font-semibold">
                            <Link to="/admissions">Enroll Now</Link>
                          </Button>
                          <Button variant="outline" className="w-full">
                            Add to Wishlist
                          </Button>
                          <Button variant="outline" className="w-full">
                            Share Course
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="curriculum" className="space-y-6">
                  {course!.courseTopics && (
                    <Card className="border-none shadow-card">
                      <CardHeader>
                        <CardTitle className="text-xl text-primary">Course Topics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-4">
                          {course!.courseTopics.map((topic, index) => (
                            <div key={index} className="flex items-center p-3 bg-secondary/10 rounded-lg">
                              <BookOpen className="h-5 w-5 mr-3 text-university-gold" />
                              <span>{topic}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {course!.assessmentMethods && (
                    <Card className="border-none shadow-card">
                      <CardHeader>
                        <CardTitle className="text-xl text-primary">Assessment Methods</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {course!.assessmentMethods.map((method, index) => (
                            <div key={index} className="flex items-center p-3 border-l-4 border-university-gold/30 bg-secondary/10">
                              <GraduationCap className="h-5 w-5 mr-3 text-university-gold" />
                              <span>{method}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {course!.requiredMaterials && (
                    <Card className="border-none shadow-card">
                      <CardHeader>
                        <CardTitle className="text-xl text-primary">Required Materials</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {course!.requiredMaterials.map((material, index) => (
                            <li key={index} className="flex items-start">
                              <div className="w-2 h-2 bg-university-gold rounded-full mr-3 mt-2 flex-shrink-0"></div>
                              <span className="text-muted-foreground">{material}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="instructor" className="space-y-6">
                  {course!.instructor && (
                    <Card className="border-none shadow-card">
                      <CardContent className="p-8">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="w-32 h-32 bg-university-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <GraduationCap className="h-16 w-16 text-university-gold" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-primary mb-2">{course!.instructor.name}</h3>
                            <p className="text-university-gold text-lg mb-4">{course!.instructor.title}</p>
                            <p className="text-muted-foreground leading-relaxed mb-6">{course!.instructor.bio}</p>

                            <div className="grid md:grid-cols-2 gap-6">
                              <div className="space-y-3">
                                <div className="flex items-center">
                                  <Mail className="h-5 w-5 mr-3 text-university-gold" />
                                  <span className="text-sm">{course!.instructor.email}</span>
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="h-5 w-5 mr-3 text-university-gold" />
                                  <span className="text-sm">{course!.instructor.office}</span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-5 w-5 mr-3 text-university-gold" />
                                  <span className="text-sm">{course!.instructor.officeHours}</span>
                                </div>
                              </div>
                              <div>
                                <div className="flex items-center mb-3">
                                  <Star className="h-5 w-5 text-yellow-400 fill-current mr-2" />
                                  <span className="text-lg font-semibold">{course!.instructor.rating}/5</span>
                                  <span className="text-muted-foreground ml-2">Instructor Rating</span>
                                </div>
                                {course!.instructor.specializations && (
                                  <div>
                                    <span className="font-medium mb-2 block">Specializations:</span>
                                    <div className="flex flex-wrap gap-2">
                                      {course!.instructor.specializations.map((spec, index) => (
                                        <Badge key={index} variant="outline" className="bg-university-gold/10 text-university-gold border-university-gold/20">
                                          {spec}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="schedule" className="space-y-6">
                  {course!.schedule && (
                    <Card className="border-none shadow-card">
                      <CardHeader>
                        <CardTitle className="text-xl text-primary">Class Schedule</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-3 gap-6">
                          <div className="text-center p-6 bg-secondary/10 rounded-lg">
                            <Calendar className="h-8 w-8 mx-auto mb-3 text-university-gold" />
                            <h4 className="font-semibold mb-2">Days</h4>
                            <p className="text-muted-foreground">{course!.schedule.days.join(', ')}</p>
                          </div>
                          <div className="text-center p-6 bg-secondary/10 rounded-lg">
                            <Clock className="h-8 w-8 mx-auto mb-3 text-university-gold" />
                            <h4 className="font-semibold mb-2">Time</h4>
                            <p className="text-muted-foreground">{course!.schedule.time}</p>
                          </div>
                          <div className="text-center p-6 bg-secondary/10 rounded-lg">
                            <MapPin className="h-8 w-8 mx-auto mb-3 text-university-gold" />
                            <h4 className="font-semibold mb-2">Location</h4>
                            <p className="text-muted-foreground">{course!.schedule.location}</p>
                          </div>
                        </div>
                        <div className="mt-6 p-4 bg-university-gold/10 rounded-lg">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-university-gold rounded-full mr-3"></div>
                            <span className="font-medium">Format: {course!.schedule.format}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="reviews" className="space-y-6">
                  {course!.reviews && course!.reviews.length > 0 ? (
                    <div className="space-y-4">
                      {course!.reviews.map((review) => (
                        <Card key={review.id} className="border-none shadow-card">
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h4 className="font-semibold">{review.studentName}</h4>
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
                                  <span className="ml-2 text-sm text-muted-foreground">{review.rating}/5</span>
                                </div>
                              </div>
                              <span className="text-sm text-muted-foreground">{review.date}</span>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card className="border-none shadow-card">
                      <CardContent className="p-12 text-center">
                        <Star className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-primary mb-2">No Reviews Yet</h3>
                        <p className="text-muted-foreground">Be the first to review this course after enrollment.</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CourseDetail;

