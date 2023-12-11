import axios from "axios";
import { useSession } from "../contexts/AuthContext";
import { Button } from "react-native";
import { useState } from "react";

interface MyProps {
    resource: string;
    id: string;
    deleteCallback?: (id?: string) => void;
}

export default function DeleteBtn({resource, id, deleteCallback}: MyProps) {

    const { session } = useSession();
    const [deleting, setDeleting] = useState(false);

    const handleDelete = () => {
        setDeleting(true);
        axios.delete(`https://express-post-mhct.vercel.app/api/${resource}/${id}`, {
      headers: {
        Authorization: `Bearer ${session}`
      }
    })
    .then((response: any) => {
      console.log(response.data);
      if(deleteCallback){
        deleteCallback(id);
      }
    })
    .catch((e: any) => {
      console.log(e);

    });
}

    return (
        <Button title={(deleting) ? "Deleting..": "Delete"} onPress={handleDelete} color="#ff0000"/>
    )
};