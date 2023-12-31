import { Text, View, Button } from 'react-native';
import { Link, useRouter } from 'expo-router';
import DeleteBtn from './DeleteBtn';
 
interface MyProps {
    tag: {
        _id: string,
        user: string;
        posts: any;
    }
    onDelete: (id?: string) => void;
}

export default function TagItem({tag, onDelete}: MyProps) {
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
        </View>
    )
}