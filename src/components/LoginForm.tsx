import { TextInput, StyleSheet, Button, Text } from 'react-native';
//import { Text } from 'react-native';
import { useState } from 'react';
//import { Button } from 'react-native' ;
import axios from 'axios';
import { useSession } from '../contexts/AuthContext'
import { LoginFormType } from '../types';



export default function LoginForm() {
    const { signIn } = useSession();

    const [form, setForm] = useState<LoginFormType>({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");


    const handleChange = (e: any) => {
        console.log(e.target.value);

        // setForm({
        //     [e.target.id]: e.target.value
        // })

        setForm(previousState => ({
            ...previousState,
            [e.target.id]: e.target.value
        }));
    };

    const handleClick = () => {
        console.log("clicked", form);

        axios.post('https://express-post-mhct.vercel.app/api/users/login', form)
        .then(response => {
            console.log(response.data);
            signIn(response.data.token);
          })
          .catch(e => {
            //console.log(e);
            setError(e.response.data.message);
          })
    };

    return (
        <>
            <TextInput 
                style = {styles.input}
                placeholder='Email'
                onChange={handleChange}
                value={form.email}
                id="email"
            />

        <TextInput 
                style = {styles.input}
                placeholder='Password'
                onChange={handleChange}
                value={form.password}
                id="password"
            />
       
        <Text>{error}</Text>
        <Button
            onPress={handleClick}
            title="Submit"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
/>
        </>
    )
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    }
});