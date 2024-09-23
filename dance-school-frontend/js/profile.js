$(document).ready(function() {
    
    console.log('Profile page loaded');
    var token = localStorage.getItem('token');
    console.log('Token:', token);

    if (!token) {
        console.log('No token found, redirecting to login');
        window.location.href = 'login.html';
        return;
    }

    $.ajax({
        url: 'http://localhost:8081/api/user/profile',
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function(user) {
            console.log('Profile loaded successfully:', user);
            $('#userInfo').html(`
                <p><strong>Имя пользователя:</strong> ${user.username}</p>
                <p><strong>Email:</strong> ${user.email}</p>
            `);
        },
        error: function(xhr, status, error) {
            console.error('Error loading profile:', error);
            console.error('Status:', status);
            console.error('Response:', xhr.responseText);
            alert('Ошибка при загрузке профиля: ' + (xhr.responseText || error));
            localStorage.removeItem('token');
            window.location.href = 'login.html';
        }
    });

    // Обработчик для кнопки выхода
    $('#logoutBtn').click(function() {
        console.log('Logout button clicked');
        localStorage.removeItem('token');
        window.location.href = 'login.html';
    });
   function loadCourses() {
    $.ajax({
        url: 'http://localhost:8081/api/courses',
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function(courses) {
            var courseListHtml = '';
            courses.forEach(function(course) {
                var levelsHtml = course.levels && course.levels.length > 0
                    ? '<ul>' + course.levels.map(level => `<li>${level}</li>`).join('') + '</ul>'
                    : '<p>Уровни не указаны</p>';
                
                courseListHtml += `
                    <div class="course-item">
                        <h4>НАПРАВЛЕНИЕ "${course.direction}"</h4>
                        <p><strong>Педагог:</strong> ${course.instructor}</p>
                        <p><strong>Стили:</strong> ${course.styles}</p>
                        <p><strong>Расписание:</strong> ${course.schedule}</p>
                        <div><strong>Уровни:</strong> ${levelsHtml}</div>
                        <a href="${course.moreInfoLink}" target="_blank">Подробнее о направлении</a>
                        <button class="enroll-btn" data-course-id="${course.id}">Записаться</button>
                    </div>
                `;
            });
            $('#courseList').html(courseListHtml);

            $('.enroll-btn').click(function() {
                var courseId = $(this).data('course-id');
                enrollInCourse(courseId);
            });
        },
        error: function(xhr, status, error) {
            console.error('Error loading courses:', error);
            $('#courseList').html('<p>Ошибка при загрузке курсов</p>');
        }
    });
}


    function enrollInCourse(courseId) {
    $.ajax({
        url: `http://localhost:8081/api/courses/${courseId}/enroll`,
        type: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function(response) {
            console.log('Enrollment response:', response); // Для отладки
            alert('Вы успешно записались на курс!');
            loadEnrolledCourses(); // Перезагрузка списка записанных курсов
        },
        error: function(xhr, status, error) {
            console.error('Error enrolling in course:', error);
            console.error('Status:', status);
            console.error('Response:', xhr.responseText);
            alert('Ошибка при записи на курс: ' + (xhr.responseText || error));
        }
    });
}


    function loadEnrolledCourses() {
    $.ajax({
        url: 'http://localhost:8081/api/courses/enrolled',
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function(enrolledCourses) {
            console.log('Enrolled courses:', enrolledCourses);
            var enrolledCoursesHtml = '';
            if (enrolledCourses && enrolledCourses.length > 0) {
                enrolledCourses.forEach(function(course) {
                    var levelsHtml = course.levels && course.levels.length > 0
                        ? '<ul>' + course.levels.map(level => `<li>${level}</li>`).join('') + '</ul>'
                        : '<p>Уровни не указаны</p>';
                    
                    enrolledCoursesHtml += `
                        <div class="course-item">
                            <h4>НАПРАВЛЕНИЕ "${course.direction}"</h4>
                            <p><strong>Педагог:</strong> ${course.instructor}</p>
                            <p><strong>Расписание:</strong> ${course.schedule}</p>
                            <div><strong>Уровни:</strong> ${levelsHtml}</div>
                        </div>
                    `;
                });
            } else {
                enrolledCoursesHtml = '<p>Вы пока не записаны ни на один курс.</p>';
            }
            $('#enrolledCoursesList').html(enrolledCoursesHtml);
        },
        error: function(xhr, status, error) {
            console.error('Error loading enrolled courses:', error);
            console.error('Status:', status);
            console.error('Response:', xhr.responseText);
            $('#enrolledCoursesList').html('<p>Ошибка при загрузке ваших курсов</p>');
        }
    });
}




    loadCourses();
    loadEnrolledCourses();
});
