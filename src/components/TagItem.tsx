import { Text, View, Button } from 'react-native';
import { Link, useRouter } from 'expo-router';
import DeleteBtn from './DeleteBtn';
 
interface MyProps {
    tag: {
        _id: string,
        user: string;
        posts: string;
    }
    onDelete: (id?: string) => void;
}

export default function PostItem({tag, onDelete}: MyProps) {
    const router = useRouter();
    
    

    return (
        <View>
            <Link href={{ 
            pathname: '/tags/[id]',
            params: { id: tag._id}
         }}>
            {tag.user}
         </Link>

           <Text>{tag.posts}</Text>
           <Button title="Edit" onPress={() => router.push(`/posts/${tag._id}/edit`)}/>
           <DeleteBtn resource="tag" id={tag._id} deleteCallback={onDelete}/>
           <Text>___________________</Text>
        </View>
    )
}