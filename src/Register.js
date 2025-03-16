import Logo from './img/logo-colorful.png';

const Register = () => {
    const handleRegister = (e) => {
        e.preventDefault();
        console.log(e.target);
        if (e.target.password.value !== e.target.confpassword.value) {
            alert("Passwords don't match");
            return;
        }


        const form = {
            name: e.target.name.value,
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
        }
        if (!form.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            alert('Email is not valid');
        }
        if (!form.username.match(/^[a-zA-Z0-9_]+$/)) {
            alert('Username can only contain letters, numbers and underscores');
        }

        fetch('http://localhost:3010/register/check-username?username=' + form.username, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (!data) {
                    alert('Username already exists');
                } else {
                    fetch('http://localhost:3010/register/check-email?email=' + form.email, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (!data) {
                                alert('Email already exists');
                            } else {
                                console.log(data);
                                fetch('http://localhost:3010/register/', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        name: form.name,
                                        username: form.username,
                                        email: form.email,
                                        password: form.password
                                    })
                                })
                                    .then(res => res.json())
                                    .then(data => {
                                        console.log(data);
                                        if (data.message === 'Register successful') {
                                            document.cookie = "accesToken=" + data.accessToken;
                                            document.cookie = "username=" + data.user.username;
                                            document.cookie = "isAdmin=" + data.user.isAdmin;
                                            window.location.href = '/singer-page';
                                        } else {
                                            alert('Something went wrong');
                                        }
                                    })
                            }
                        })
                }
            })


    }

    return (
        <div className="form-container block">
            <div className="logo">
                <img src={Logo} alt="logo" id="logo-img" />
                <p>Pekotify Premium</p>
            </div>
            <p className="form-text">Register</p>
            <form className="control" onSubmit={handleRegister}>
                <div className="field">
                    <p>Name</p>
                    <input className="input" type="text" name="name" placeholder="Enter your name" id="name" required />
                    <p id="name-warning"></p>
                </div>
                <div className="field">
                    <p>Username</p>
                    <input className="input" type="text" name="username" placeholder="Enter a username" id="username" required />
                    <p id="username-warning"></p>
                </div>
                <div className="field">
                    <p>Email</p>
                    <input className="input" type="text" name="email" placeholder="Enter an email" id="email" required />
                    <p id="email-warning"></p>
                </div>
                <div className="field">
                    <p>Password</p>
                    <input className="input" type="password" name="password" placeholder="Enter a password" id="password" required />
                    <p id="password-warning"></p>
                </div>
                <div className="field">
                    <p>Confirm Password</p>
                    <input className="input" type="password" name="confpassword" placeholder="Confirm your password" id="confpassword" required />
                    <p id="confpassword-warning"></p>
                </div>
                <p className="terms-text">By clicking on sign-up, you agree to Pekotify Premium's <a href="https://www.youtube.com/channel/UC1DCedRgGHBdm81E1llLhOQ">Terms and Conditions</a>.
                    <br /><br />To learn more about how Pekotify Premium collects, uses, shares and protects your personal data, please see Pekotify Premium's <a href="https://twitter.com/usadapekora">Privacy Policy</a>.</p>
                <input type="submit" value="Sign Up" className="button is-link" id="submit" />
            </form>
            <p className="login-text">Have an account? <a href="/login">Log in</a></p>
        </div >
    );
}

export default Register;