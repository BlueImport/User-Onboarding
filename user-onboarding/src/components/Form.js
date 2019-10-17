import React, {useState, useEffect} from "react";
import {withFormik, Form, Field} from "formik";
import axios from "axios";
import * as Yup from "yup";


const NewUser = ({values, errors, touched, status}) => {

    const [user, setUser] = useState([]);

    useEffect(() =>{
        if (status) {
            setUser([...user, status])
        }
    }, [status]);

    return(
        <div className="newUserForm">
            <h1>This is a form</h1>
            <Form>
                <div className="nameBox">
                <Field type="text" name="name" placeholder="Name" />
                {touched.name && errors.name && (<p className="error">{errors.name}</p>)}
                </div>

                <div className="emailBox">
                <Field type="email" name="email" placeholder="Email" />
                {touched.email && errors.email && (<p className="error">{errors.email}</p>)}
                </div>

                <div className="passwordBox">
                <Field type="password" name="password" placeholder="Enter your password" />
                {touched.password && errors.password && (<p className="error">{errors.password}</p>)}
                </div>

                <div className="tos">
                <label>Agree to Terms of Services: <Field type="checkbox" name="terms" checked={values.terms} /></label>
                {touched.terms && errors.terms && (<p className="error">{errors.terms}</p>)}
                </div>

                <div className="submitButton">
                <button>Submit</button>  
                </div>
            </Form>
            
            {user.map(person => (
                <ul key={person.id}>
                    <li>Name: {person.name}</li>
                    <li>Email: {person.email}</li>
                    <li>Password: {"●".repeat(person.password.length)}</li>
                </ul>
            ))}
        </div>

    )}
const FormikNewUser = withFormik({
    mapPropsToValues({name, email, password, terms}){
        return{
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || false
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().min(2, "Your name is longer than 1 character.").required("Required field."),
        email: Yup.string().email("Email not valid.").required("Required field."),
        password: Yup.string().min(8, "Password is too short. Add some characters.").required("Required field."),
        terms: Yup.boolean().oneOf([true], "Must accept Terms of Service.").required()
    }),

    handleSubmit(values, {setStatus}){
        axios
            .post("https://reqres.in/api/users/", values)
            .then(response =>{
                console.log(response);
                setStatus(response.data);
            })
            .catch(error => console.log(error.response));
    }
})(NewUser)




export default FormikNewUser; 
