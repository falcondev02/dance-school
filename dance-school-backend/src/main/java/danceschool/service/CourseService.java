package danceschool.service;

import danceschool.model.Course;
import danceschool.model.User;
import danceschool.repository.CourseRepository;
import danceschool.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Service
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;
    private static final Logger logger = LoggerFactory.getLogger(CourseService.class);
    @Autowired
    private UserRepository userRepository;
    @Transactional(readOnly = true)
    public List<Course> getAllCourses() {
        List<Course> courses = courseRepository.findAll();
        courses.forEach(course -> {
            logger.info("Course: {}, Levels: {}", course.getDirection(), course.getLevels());
            course.getLevels().size(); // This will force loading of levels
        });
        return courses;
    }

    public void enrollUserInCourse(Long userId, Long courseId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        user.getEnrolledCourses().add(course);
        userRepository.save(user);
    }
    
    @Transactional(readOnly = true)
    public Set<Course> getUserCourses(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getEnrolledCourses();
    }
}

