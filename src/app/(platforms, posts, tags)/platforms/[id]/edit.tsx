import axios from 'axios';
import { useEffect, useState} from 'react';
import { TextInput, StyleSheet, Button, Text } from 'react-native';
import {  useLocalSearchParams, useRouter, useNavigation } from 'expo-router';
import { useSession } from '../../../../contexts/AuthContext'
import { PlatformType } from '../../../../types';


export default function Page() {
  const { session, isLoading } = useSession();
  const [platform, setPlatform] = useState(null);
  const [error, setError] = useState("");
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const navigation = useNavigation();

  const [form, setForm] = useState<PlatformType>({
    name: "",
    description: ""
});

  useEffect(() => {
    navigation.setOptions({ title: 'Edit Platform', });
  }, [navigation]);

  useEffect(() => {
    axios.get(`https://express-post-mhct.vercel.app/api/platforms/${id}`, {
      headers: {
        Authorization: `Bearer ${session}`
      }
    })
    .then(response => {
      console.log(response.data);
      setPlatform(response.data);
      setForm(response.data);
    })
    .catch(e => {
      console.log(e);
      setError(e.response.data.message);
    })
  }, []);

  if(isLoading) return <Text>Loading...</Text>

  if(!platform) return <Text>{error}</Text>

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

    axios.put(`https://express-post-mhct.vercel.app/api/platforms/${id}`, form, {
        headers: {
            Authorization: `Bearer ${session}`
        }
    })
    .then( response => {
        console.log(response.data)
        router.push(`/platforms/${id}`);
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