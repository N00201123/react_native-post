import { Text, FlatList, Button } from 'react-native';
import axios from 'axios';
import { Link, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import Item from '../../../components/PlatformItem';
import PlatformItem from '../../../components/PlatformItem';



export default function Page() {
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    //axios.get('http://localhost:3000/api/festivals')
    axios.get('https://express-post-mhct.vercel.app/api/platforms')
      .then(response => {
        console.log(response.data);
        setPlatforms(response.data);
      })
      .catch(e => {
        console.error(e);
      });
  }, []);

 

  const onDelete = (id?: string) => {
    let newPlatforms = platforms.filter((platform: any) => platform._id !== id);
    setPlatforms(newPlatforms);
  }; 

  let platformsList = platforms.map((platform: any) => {
    return <PlatformItem key={platform._id} platform={platform}  onDelete={onDelete}/>
  });

  return (
    <>
        <Text>This is the view all platforms all page</Text>

        {platformsList}


    </>
  );
}