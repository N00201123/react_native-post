import { Text, Button } from 'react-native';
import { Link } from 'expo-router';

import LoginForm from '../components/LoginForm';

import { useSession } from '../contexts/AuthContext';

export default function Page() {
  const { session, signOut } = useSession();

  return (
    <>
        <Text>Home page</Text>
        

        {(!session) ? <LoginForm /> :  (
          <>

      <Link href={'/posts'} asChild>
            <Button title = "All posts"/>
        </Link>          
        <Text>You're are logged in</Text>
          <Button onPress={signOut} title='Logout' />
    </>
        )}
    
    </>
  );
}