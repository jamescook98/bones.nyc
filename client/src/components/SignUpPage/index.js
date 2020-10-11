import React, { useState } from 'react';
import "./styles.css"
import API from "../../utils/API";

export default function SignInPage() {
    // Set states for username, email, and password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("The email = ", email, " and the password = ", password);

        // Validate form entries
        validateSubmit();

        //event.target.reset();
    }

    // Validate user email
    const validateEmail = (email) => {
        const re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
        return re.test(email);
    }

    // Validate all form entries before posting to the DB
    const validateSubmit = () => {
        console.log("Validating email: ", email, " password: ", password);

        if (email === "" || email === undefined || validateEmail(email) === false) {
            return alert("Please enter a valid email.")
        } else if (password === "" || password === undefined || password.length < 8) {
            return alert("Please enter a valid password of at least 8 characters.")
        } else {
            console.log("Validation passed. Posting to DB email: ", email, " password: ", password);
            // If all conditions pass...
            // Post the new user's info to the Mongo DB...
            API.saveUser({
                email: email,
                password: password
            })
                .then(() => {
                    console.log("The email = ", email, " and the password = ", password, " were saved");
                })
                .catch(error => {
                    console.log("There was an error: ", error);
                    alert("I'm sorry, we have encountered an error with your Signup submission.");
                })

        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label>Email:</label>
                        </td>
                        <td>
                            <input
                                className="form-control"
                                type="text"
                                name="email"
                                placeholder="your@email.com"
                                value={email}
                                onChange={event => setEmail(event.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Password:</label>
                        </td>
                        <td>
                            <input
                                className="form-control"
                                type="password"
                                name="password"
                                placeholder="Enter password here. Minimum of 8 characters."
                                value={password}
                                onChange={event => setPassword(event.target.value)} />
                        </td>
                    </tr>
                </tbody>
            </table>
            <div>
                <button
                    type="submit"
                >
                    Submit
                         </button>
            </div>
        </form>
    )
}