$(document).ready(function() {
    $('#loginForm').submit(function(e) {
        e.preventDefault();
        
        var username = $('#username').val();
        var password = $('#password').val();

        $.ajax({
            url: 'http://localhost:8081/api/auth/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                username: username,
                password: password
            }),
            success: function(response) {
                error: function(xhr, status, error) {
    console.error('Error:', xhr.responseText);
    console.error('Status:', status);
    console.error('Error:', error);
    alert('Ошибка при загрузке профиля. Пожалуйста, войдите снова.');
    localStorage.removeItem('token');
    window.location.href = 'login.html';
}

            },
            error: function(xhr, status, error) {
                alert('Произошла ошибка при входе. Пожалуйста, попробуйте еще раз.');
            }
        });
    });
});
