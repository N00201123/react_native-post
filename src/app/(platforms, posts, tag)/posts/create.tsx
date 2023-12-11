import axios from 'axios';
import { useState} from 'react';
import { TextInput, StyleSheet, Button, Text } from 'react-native';
import {  useRouter } from 'expo-router';
import { useSession } from '../../../contexts/AuthContext'
import { PostType } from '../../../types';


export default function Page() {
  const { session, isLoading } = useSession();
  
  const [error, setError] = useState("");
  const router = useRouter();

  const [form, setForm] = useState<PostType>({
    title: "",
    description: "",
    platform: "",
    user: "",
    likes: "",
    date: "",
    tags: ""
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
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("platform", form.platform);
    formData.append("user", form.user);
    formData.append("likes", form.description);
    formData.append("tags", form.description);

    //formData.append("image", {uri: form.image, name: "image.jpg", type: "image/jpeg"});

    axios.post(`https://festivals-api.vercel.app/api/posts/`, form, {
        headers: {
            Authorization: `Bearer ${session}`
        }
    })
    .then( response => {
        console.log(response.data)
        router.push(`/posts/${response.data._id}`);
    })
    .catch(e => {
        console.error(e)
        setError(e.response.data.message);
    });
}

  return (
    <>
    <Text>Title</Text>
       <TextInput 
            style = {styles.input}
            placeholder='Title'
            onChange={handleChange}
            value={form.title}
            id="title"
        />

        <Text>Description</Text>
        <TextInput 
            style = {styles.input}
            placeholder='Description'
            onChange={handleChange}
            value={form.description}
            id="description"
        />

        <Text>Platform</Text>
        <TextInput 
            style = {styles.input}
            placeholder='Platform'
            onChange={handleChange}
            value={form.platform}
            id="platform"
        />

        <Text>User</Text>
        <TextInput 
            style = {styles.input}
            placeholder='User'
            onChange={handleChange}
            value={form.user}
            id="user"
        />

        <Text>likes</Text>
        <TextInput 
            style = {styles.input}
            placeholder='likes'
            onChange={handleChange}
            value={form.description}
            id="likes"
        />

        <Text>tags</Text>
        <TextInput 
            style = {styles.input}
            placeholder='tags'
            onChange={handleChange}
            value={form.description}
            id="tags"
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