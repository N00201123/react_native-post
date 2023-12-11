import axios from 'axios';
import { useEffect, useState} from 'react';
import { Text } from 'react-native';
import {  useLocalSearchParams } from 'expo-router';
import { useSession } from '../../../../contexts/AuthContext'

export default function Page() {
  const { session, isLoading } = useSession();
  const [platform, setPlatform] = useState(null);
  const [error, setError] = useState("");
  const { id } = useLocalSearchParams();

  useEffect(() => {
    axios.get(`https://express-post-mhct.vercel.app/api/platforms/${id}`, {
      headers: {
        Authorization: `Bearer ${session}`
      }
    })
    .then(response => {
      console.log(response.data);
      setPlatform(response.data);
    })
    .catch(e => {
      console.log(e);
      setError(e.response.data.message);
    })
  }, []);

  if(isLoading) return <Text>Loading...</Text>

  if(!platform) return <Text>{error}</Text>

  return (
    <>
        {/* <Text>{festival.title}</Text> */}
        <Text>{error}</Text>
        
    </>
  );
}