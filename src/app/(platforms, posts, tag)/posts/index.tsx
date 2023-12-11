import { Text, FlatList, Button } from 'react-native';
import axios from 'axios';
import { Link, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import Item from '../../../components/PostItem';
import PostItem from '../../../components/PostItem';



export default function Page() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    //axios.get('http://localhost:3000/api/festivals')
    axios.get('https://express-post-mhct.vercel.app/api/posts')
      .then(response => {
        console.log(response.data);
        setPosts(response.data);
      })
      .catch(e => {
        console.error(e);
      });
  }, []);

 

  const onDelete = (id?: string) => {
    let newPosts = posts.filter((post: any) => post._id !== id);
    setPosts(newPosts);
  }; 

  let postsList = posts.map((post: any) => {
    return <PostItem key={post._id} post={post}  onDelete={onDelete}/>
  });

  return (
    <>
        <Text>This is the view all platforms all page</Text>

        {postsList}


    </>
  );
}