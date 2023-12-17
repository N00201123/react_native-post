import { Text, View, StyleSheet, Button } from 'react-native';
import { Link, useRouter } from 'expo-router';
import DeleteBtn from './DeleteBtn';
import { Image } from 'expo-image';
 
interface MyProps {
    post: {
        _id: string,
        title: string;
        likes: number;
    }
    onDelete: (id?: string) => void;
}

export default function PostItem({post, onDelete}: MyProps) {
    const router = useRouter();
    
    

    return (
        <View>
            <Link href={{ 
            pathname: '/posts/[id]',
            params: { id: post._id}
         }}>
            {post.title}
         </Link>

           <Text>{post.likes}</Text>
           <Image
            style={{width: 200, height: 200}}
            //source={`https://api-image-post.s3.eu-west-1.amazonaws.com/${post.image_path}`}
           />
           <Button title="Edit" onPress={() => router.push(`/posts/${post._id}/edit`)}/>
           <DeleteBtn resource="posts" id={post._id} deleteCallback={onDelete}/>
           {/* <Text>___________________</Text> */}
        </View>
    )
}

// const button = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#fff',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//   });