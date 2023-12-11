import { Text, View, Button } from 'react-native';
import { Link, useRouter } from 'expo-router';
import DeleteBtn from './DeleteBtn';
 
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
           <Button title="Edit" onPress={() => router.push(`/posts/${post._id}/edit`)}/>
           <DeleteBtn resource="posts" id={post._id} deleteCallback={onDelete}/>
           <Text>___________________</Text>
        </View>
    )
}