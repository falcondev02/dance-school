$(document).ready(function() {
    const token = localStorage.getItem('token');
    if (!token) {
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
            $('#userInfo').html(`
                <p><strong>Имя пользователя:</strong> ${user.username}</p>
                <p><strong>Email:</strong> ${user.email}</p>
            `);
        },
        error: function(xhr, status, error) {
            error: function(xhr, status, error) {
    console.error('Error:', xhr.responseText);
    console.error('Status:', status);
    console.error('Error:', error);
    alert('Ошибка при загрузке профиля. Пожалуйста, войдите снова.');
    localStorage.removeItem('token');
    window.location.href = 'login.html';
}

        }
    });

    $('#logoutBtn').click(function() {
        localStorage.removeItem('token');
        window.location.href = 'index.html';
    });
});
