function submitForm(type) {
    let firstName = document.getElementById("form-first-name").value;
    let lastName = document.getElementById("form-last-name").value;
    let email = document.getElementById("form-email").value;
    let phone = document.getElementById("form-phone").value;
    let message = document.getElementById("form-message").value;
    const response = fetch('/api/' + type + '/form', {
        method: 'POST',
        body: JSON.stringify({
            firstName: sanitize(firstName),
            lastName: sanitize(lastName),
            email: sanitize(email),
            phone: sanitize(phone),
            message: sanitize(message)
        }),
        headers: {
            "Content-Type": "application/json"
        }

    });
}

// Courtesy of https://stackoverflow.com/a/48226843
// Sanitizer for user inputs
function sanitize(string) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;',
    };
    const reg = /[&<>"'/]/ig;
    return string.replace(reg, (match)=>(map[match]));
}
