import { Text, View, Button } from 'react-native';
import { Link, useRouter } from 'expo-router';
import DeleteBtn from './DeleteBtn';
 
interface MyProps {
    platform: {
        _id: string,
        name: string;
        description: string;
    }
    onDelete: (id?: string) => void;
}

export default function PlatformItem({platform, onDelete}: MyProps) {
    const router = useRouter();
    
    

    return (
        <View>
            <Link href={{ 
            pathname: '/platforms/[id]',
            params: { id: platform._id}
         }}>
            {platform.name}
         </Link>
           
           <Text>{platform.description}</Text>
           <Button title="Edit" onPress={() => router.push(`/platforms/${platform._id}/edit`)}/>
           <DeleteBtn resource="platforms" id={platform._id} deleteCallback={onDelete}/>
           <Text>___________________</Text>
        </View>
    )
}