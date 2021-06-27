
import axios from 'axios';
import dotenv from 'dotenv'
import { observable } from 'mobx';


export const ModalStore = observable(
    {   
        movie:{},
    }
); 