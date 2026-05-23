import { useState } from 'react';
import { InputField, Button } from "./../../components/form.jsx";
import { createClient } from '@supabase/supabase-js';

function Register() {
    const supabase = createClient('https://whgrsvgvarzxsfakwcns.supabase.co', 'sb_publishable_xn-_t8xjX7CKphiq22vyvg_GFVk00ge')
    const handleGoogleSignIn = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    // Sends the user smoothly back to your local development server upon successful Google approval
                    redirectTo: 'http://localhost:5173', 
                },
            });

            if (error) throw error;
        } catch (error) {
            console.error("Google authentication failed to initialize:", error.message);
            alert("Authentication failed: " + error.message);
        }
    };

    const handleGitHubSignIn = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'github', // 👈 Changing this string tells Supabase to switch providers
                options: {
                    redirectTo: 'http://localhost:5173', // Redirects back to your local Vite server
                },
            });

            if (error) throw error;
        } catch (error) {
            console.error("GitHub authentication failed to initialize:", error.message);
            alert("Authentication failed: " + error.message);
        }
    };

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [otherErrors, setErrors] = useState({})
    
    const isLengthValid = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isPasswordSecure = isLengthValid && hasUpper && hasLower && hasDigit && hasSpecial;
    
    function checkErrors() {
        let error = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            error.email = true;
        }
        if (pass != confirmPass) {
            error.confirmPass = true;
        }
        if (!name.trim()) {
            error.name = true;
        }
        if (!isPasswordSecure) {
            error.pass = true;
        }
        setErrors(error);
    }

    function validateForm(e) {
        e.preventDefault;
        checkErrors();
        if (Object.keys(otherErrors).length === 0) {
            console.log("success");
        }
    }

    function liStyle(error) {
        const baseStyle = "text-white text-base"
        const color = error ? "text-red-500" : "text-green-500";
        return `${baseStyle} ${color}`;
    }

    const handleInputFocus = (fieldName) => {
        setErrors((prevError) => {
            const updatedErrors = { ...prevError };
            delete updatedErrors[fieldName];
            return updatedErrors;
        });
    }

    return (
        <div className = "flex flex-col justify-center items-center gap-2 w-full h-screen overflow-hidden bg-gray-900">
            <img src="./../../assets/aginote-logo.png" className="rounded-lg aspect-square w-xs" alt="AgiNote Logo" />
            <ul className="flex flex-wrap justify-around content-around list-none">
                <li className={liStyle(isLengthValid)}>✓ Min 8 Characters</li>
                <li className={liStyle(hasUpper)}>✓ Uppercase Letter</li>
                <li className={liStyle(hasLower)}>✓ Lowercase Letter</li>
                <li className={liStyle(hasSpecial)}>✓ Special Character</li>
                <li className={liStyle(hasDigit)}>✓ Numeric Digit</li>
            </ul>
            <form onSubmit={validateForm} className="flex flex-col justify-center items-center">
                <div className="flex flex-wrap justify-around content-around gap-2">
                    <InputField id="name" label="Name" type="text" 
                        value={name} setter={setName} 
                        error={otherErrors.name}
                        onFocus={() => handleInputFocus("name")}/>
                    <InputField id="email" label="E-mail" type="email" 
                        value={email} setter = {setEmail} 
                        error={otherErrors.email} onFocus={() => handleInputFocus("email")}/>
                    <InputField id="pass" label="Password" type="password"
                        value={password} setter={setPassword}
                        error = {otherErrors.pass} onFocus={() => handleInputFocus("pass")}/>
                    <InputField id="confirmPass" label="Confirm Password" type="password" 
                        value={confirmPass} setter={setConfirmPass} 
                        error={otherErrors.confirmPass} 
                        onFocus={() => handleInputFocus("confirmPass")} />
                </div>
                <div className="flex flex-col items-start justify-center">
                    <Button text="Register!" type="submit" onClick={console.log("Submitted")}
                        enabled = {() => { Object.keys(otherErrors).length === 0 }}/>
                    <a>Forgot Password?</a>
                    <a>Forgot E-mail?</a>
                </div>
            </form>
            <div className="flex flex-row justify-around items-center">
                <Button text="Sign In With Google" onClick={handleGoogleSignIn} enabled={true}/>
                <Button text="Sign In With Github" onClick={handleGitHubSignIn} enabled={true}/>
            </div>
        </div>
    );
}

export default Register;
