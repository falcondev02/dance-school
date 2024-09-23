$(document).ready(function() {
    $('#loginForm').submit(function(e) {
        e.preventDefault();
        
        var username = $('#username').val();
        var password = $('#password').val();

        console.log('Attempting login with:', username); // Добавьте это для отладки

        $.ajax({
            url: 'http://localhost:8081/api/auth/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                username: username,
                password: password
            }),
            success: function(response) {
                console.log('Login response:', response); // Добавьте это для отладки
                if (response.token) {
                    localStorage.setItem('token', response.token);
                    console.log('Token saved:', response.token);
                    window.location.href = 'profile.html';
                } else {
                    console.error('No token received');
                    alert('Ошибка входа. Токен не получен.');
                }
            },
            error: function(xhr, status, error) {
                console.error('Login error:', error);
                console.error('Status:', status);
                console.error('Response:', xhr.responseText);
                alert('Ошибка входа: ' + (xhr.responseText || error));
            }
        });
    });
});
