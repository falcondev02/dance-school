$(document).ready(function() {
    $('#registerForm').submit(function(e) {
        e.preventDefault();
        
        var username = $('#username').val();
        var email = $('#email').val();
        var password = $('#password').val();
            console.log('Attempting to register user:', username);

        $.ajax({
            url: 'http://localhost:8081/api/auth/register',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                username: username,
                email: email,
                password: password
            }),
              xhrFields: {
        withCredentials: true
    },
            success: function(response) {
                console.log('Registration successful:', response);

                alert('Регистрация успешна! Теперь вы можете войти.');
                window.location.href = 'login.html';
            },
            error: function(xhr, status, error) {
                console.error('Registration failed:', xhr.responseText);
            console.error('Status:', status);
            console.error('Error:', error);
                alert('Ошибка при регистрации: ' + xhr.responseText);
            }
        });
    });
});
