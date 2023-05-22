import {IMsg} from 'interfaces/IMsg'
import { toast } from 'react-toastify';

export function msgResponse(imsg: IMsg) {
    if(Array.isArray(imsg)){
        console.log(imsg)
        imsg.forEach((element: any) => {
            toast.error(element);
         });  
    } else {
        toast.error(imsg)
    }
}