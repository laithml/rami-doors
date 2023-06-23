$("#loginBtn").click(function (e) {
    e.preventDefault();
    let email = $("#emailIn").val();
    let password = $("#passwordIn").val();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    fetch('/login', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong');
            }
        })
        .then(data => {
            console.log(data);
            localStorage.setItem('token', data.token);
            window.location.href = "/";
        })
        .catch(error => {
            console.error(error);
            alert('An error occurred while logging in.');
        });
});

$("#logout").click(function () {
    fetch('/logout', {
        method: 'POST'
    })
        .then(response => {
            if (response.ok) {
                // Redirect to the login page or perform any other desired action
                window.location.href = "/login";
            } else {
                throw new Error('Failed to logout');
            }
        })
        .catch(error => {
            console.error(error);
            alert('An error occurred while logging out.');
        });
});