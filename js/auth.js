const loginForm = document.querySelector('.login__form')
const userName = document.querySelector('.userName')
const userPassword = document.querySelector('.userPassword')

async function login (e) {
    e.preventDefault()
    let res = await fetch('https://blog-page-server.onrender.com/admin/log-in', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            admin_name: userName.value,
            admin_password: userPassword.value
        })
    })
    let req = await res.json()
    if(req.status == 200) {
        localStorage.setItem('token', JSON.stringify(req.token))
        window.location.pathname = '/index.html'
    }
}
loginForm.addEventListener('submit', login)