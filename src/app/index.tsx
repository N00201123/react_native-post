import { Text, Button } from 'react-native';
import { Link } from 'expo-router';

import LoginForm from '../components/LoginForm';

import { useSession } from '../contexts/AuthContext';

export default function Page() {
  const { session, signOut } = useSession();

  return (
    <>
    
        

        {(!session) ? <LoginForm /> :  (
          <>

      <Link href={'/posts'} asChild>
          <Button title = "All posts"/>
        </Link>   

      <Link href={'/platforms'} asChild>
          <Button title = "All platforms" color="#E1C722"/>
      </Link>         

      <Link href={'/tags'} asChild>
          <Button title = "All tags" color="#841584"/>
      </Link>  
        <Text>You're are logged in</Text>
          <Button onPress={signOut} title='Logout' color="#22AAE1"/>
    </>
        )}
    
    </>
  );
}