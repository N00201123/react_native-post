import { Drawer } from 'expo-router/drawer';
import { SessionProvider } from '../contexts/AuthContext';

export default function Layout() {
  return (
  <SessionProvider>
    <Drawer>
     <Drawer.Screen 
        name='index'
        options={{ 
            drawerLabel: "Home",
            title: ""
         }}  
    />
    
    

<Drawer.Screen 
        name='(platforms)'
        options={{ 
            drawerLabel: "Platforms",
            title: ""
         }}  
    />

<Drawer.Screen 
        name='(posts)'
        options={{ 
            drawerLabel: "Posts",
            title: ""
         }}  
    />


<Drawer.Screen 
        name='(tags)'
        options={{ 
            drawerLabel: "Tags",
            title: ""
         }}
      />
   </Drawer>;
  </SessionProvider>
  )
   
}