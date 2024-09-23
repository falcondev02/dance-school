package danceschool.model;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "courses")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String direction;

    private String instructor;
    private String styles;
    private String schedule;

    @ElementCollection
    @CollectionTable(name = "course_levels", joinColumns = @JoinColumn(name = "course_id"))
    @Column(name = "level")
    private List<String> levels;

    private String moreInfoLink;

    // Геттеры и сеттеры
}
