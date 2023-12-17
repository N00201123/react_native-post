import { Text, FlatList, Button } from 'react-native';
import axios from 'axios';
import { Link, useRouter, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import Item from '../../../components/TagItem';
import TagItem from '../../../components/TagItem';



export default function Page() {
  const [tags, setTags] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: 'All Tags', });
  }, [navigation]);

  useEffect(() => {
    //axios.get('http://localhost:3000/api/festivals')
    axios.get('https://express-post-mhct.vercel.app/api/tags')
      .then(response => {
        console.log(response.data);
        setTags(response.data);
      })
      .catch(e => {
        console.error(e);
      });
  }, []);

 

  const onDelete = (id?: string) => {
    let newTags = tags.filter((tag: any) => tag._id !== id);
    setTags(newTags);
  }; 

  let tagsList = tags.map((tag: any) => {
    return <TagItem key={tag._id} tag={tag}  onDelete={onDelete}/>
  });

  return (
    <>
        <Text>This is the view all tags all page</Text>

        {tagsList}


    </>
  );
}