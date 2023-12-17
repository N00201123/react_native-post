import axios from 'axios';
import { useState} from 'react';
import { TextInput, StyleSheet, Button, Text } from 'react-native';
import {  useRouter } from 'expo-router';
import { useSession } from '../../../contexts/AuthContext'
import { PlatformType } from '../../../types';


export default function Page() {
  const { session, isLoading } = useSession();
  
  const [error, setError] = useState("");
  const router = useRouter();

  const [form, setForm] = useState<PlatformType>({
    name: "",
    description: ""
});


  if(isLoading) return <Text>Loading...</Text>


  const handleChange = (e: any) => {
    console.log(e.target.value);

    setForm(previousState => ({
        ...previousState,
        [e.target.id]: e.target.value
    }));
};

const handleClick = () => {
    console.log(form);

    let formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);

    axios.post(`https://express-post-mhct.vercel.app/api/platforms/`, form, {
        headers: {
            Authorization: `Bearer ${session}`
        }
    })
    .then( response => {
        console.log(response.data)
        router.push(`/platforms/${response.data._id}`);
    })
    .catch(e => {
        console.error(e)
        setError(e.response.data.message);
    });
}

  return (
    <>
    <Text>Name</Text>
       <TextInput 
            style = {styles.input}
            placeholder='Name'
            onChange={handleChange}
            value={form.name}
            id="name"
        />

        <Text>Description</Text>
        <TextInput 
            style = {styles.input}
            placeholder='Description'
            onChange={handleChange}
            value={form.description}
            id="description"
        />

      <Button 
          onPress={handleClick}
          title='Submit'
          color="#eb3b5a"
        />
    </>
  );
  
  
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    }
});