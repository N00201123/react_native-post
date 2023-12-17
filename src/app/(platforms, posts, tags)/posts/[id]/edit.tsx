import axios from 'axios';
import { useEffect, useState} from 'react';
import { TextInput, StyleSheet, Button, Text } from 'react-native';
import {  useLocalSearchParams, useRouter, useNavigation } from 'expo-router';
import { useSession } from '../../../../contexts/AuthContext'
import { PostType } from '../../../../types';


export default function Page() {
  const { session, isLoading } = useSession();
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const navigation = useNavigation();

  const [form, setForm] = useState<PostType>({
    title: "",
    description: "",
    platform: "",
    user: "",
    likes: "",
    date: "",
    tags: ""
  });

useEffect(() => {
  navigation.setOptions({ title: 'Edit Post', });
}, [navigation]);

  useEffect(() => {
    axios.get(`https://express-post-mhct.vercel.app/api/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${session}`
      }
    })
    .then(response => {
      console.log(response.data);
      setPost(response.data);
      setForm(response.data);
    })
    .catch(e => {
      console.log(e);
      setError(e.response.data.message);
    })
  }, []);

  if(isLoading) return <Text>Loading...</Text>

  if(!post) return <Text>{error}</Text>

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
    console.log(form);

    axios.put(`https://express-post-mhct.vercel.app/api/posts/${id}`, form, {
        headers: {
            Authorization: `Bearer ${session}`
        }
    })
    .then( response => {
        console.log(response.data)
        router.push(`/posts/${id}`);
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

        <Text>Likes</Text>
        <TextInput 
            style = {styles.input}
            placeholder='Likes'
            onChange={handleChange}
            value={form.likes}
            id="likes"
        />  

        <Text>Date</Text>
        <TextInput 
            style = {styles.input}
            placeholder='Date'
            onChange={handleChange}
            value={form.date}
            id="date"
            />

        <Text>Tags</Text>
        <TextInput 
            style = {styles.input}
            placeholder='Tags'
            onChange={handleChange}
            value={form.tags}
            id="tags"
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