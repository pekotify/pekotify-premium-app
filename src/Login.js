import Logo from './img/logo-colorful.png';

const Login = () => {
    const handleLogin = (e) => {
        e.preventDefault();
        console.log(e.target);
        const form = {
            username: e.target.username.value,
            password: e.target.password.value,
        }

        console.log(form);
        fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: form.username,
                password: form.password
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                console.log("username:");
                console.log(data.user.username);
                if (data.message === 'Login successful') {
                    localStorage.setItem('accesToken', data.accessToken);
                    localStorage.setItem('username', data.user.username);
                    localStorage.setItem('userId', data.user.user_id);
                    localStorage.setItem('isAdmin', data.user.isAdmin);
                    if (data.user.isAdmin === 0) {
                        window.location.href = '/singer-page';
                    } else if (data.user.isAdmin === 1) {
                        window.location.href = '/admin-page';
                    }
                } else if (data.message === 'Wrong password') {
                    alert('Wrong password');
                } else if (data.message === 'User not found') {
                    alert('User not found');
                } else {
                    alert('Something went wrong');
                }
            })
    }

    return (
        <div className="form-container block">
            <div className="control">
                <div className="logo">
                    <img src={Logo} alt="logo" id="logo-img" />
                    <p>Pekotify Premium</p>
                </div>
                <p className="form-text">Login</p>
                <form action="backend/check-login.php" method="post" onSubmit={handleLogin}>
                    <div className="login-form">
                        <div className="field">
                            <p>Username</p>
                            <input type="text" name="username" className="input" placeholder="Username" id="username" />
                        </div>
                        <div className="field">
                            <p>Password</p>
                            <input type="password" name="password" className="input" placeholder="Password" id="password" />
                        </div>
                        <input type="submit" value="Login" className="button is-link" />
                    </div>
                </form>
                <div className="register-box">
                    <p className="register-text">Don't have an account?</p>
                    <a className="button is-light is-info" href='/register'>SIGN UP FOR PEKOTIFY PREMIUM</a>
                </div>
            </div>
        </div>
    );
}

export default Login;