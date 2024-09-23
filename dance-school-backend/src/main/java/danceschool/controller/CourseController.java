package danceschool.controller;

import danceschool.model.Course;
import danceschool.model.User;
import danceschool.service.CourseService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import danceschool.service.UserService;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/courses")
public class CourseController {
    @Autowired
    private CourseService courseService;
    @Autowired
    private UserService userService;

    private static final Logger logger = LoggerFactory.getLogger(CourseController.class);

    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
        List<Course> courses = courseService.getAllCourses();
        logger.info("Returning {} courses", courses.size());
        courses.forEach(course -> logger.info("Course: {}, Levels: {}", course.getDirection(), course.getLevels()));
        return ResponseEntity.ok(courses);
    }

    @PostMapping("/{courseId}/enroll")
    public ResponseEntity<?> enrollInCourse(@PathVariable Long courseId, Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userService.findByUsername(userDetails.getUsername());
        courseService.enrollUserInCourse(user.getId(), courseId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/enrolled")
    public ResponseEntity<Set<Course>> getEnrolledCourses(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userService.findByUsername(userDetails.getUsername());
        Set<Course> enrolledCourses = courseService.getUserCourses(user.getId());
        logger.info("User {} is enrolled in {} courses", user.getUsername(), enrolledCourses.size());
        enrolledCourses.forEach(course -> logger.info("Enrolled Course: {}, Levels: {}", course.getDirection(), course.getLevels()));
        return ResponseEntity.ok(enrolledCourses);
    }
}

