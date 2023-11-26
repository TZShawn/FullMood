
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import {TextField} from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';

interface MyModalProps {
  open: boolean;
  setModalOpen: any;
  onClose: () => void;
  setUserData: any
}

axios.defaults.baseURL = "http://localhost:4000";

const MyModal: React.FC<MyModalProps> = ({ open, setModalOpen, onClose, setUserData }) => {
  const [title, setTitle] = React.useState("")
  const [entry, setEntry] = React.useState("")

  const { profile } = useSelector((state: any) => state.profile);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const formData = {
        name: profile,
        title: entry,
        entry: title,
      };
      console.log(formData)

      let newProfile = await axios.post('/entry', formData).then(re => re.data)
      setUserData(newProfile)
      setModalOpen(false)

    } catch (error) {
      console.error('Error submitting entry:', error);
    }
  }

  return (
    <Dialog open={open} onClose={onClose} className="absolute w-full h-screen grid place-items-center top-0 left-0" >
      <DialogContent>

      <div className="z-10 w-[33vw] h-[66vh] rounded-lg text-center flex flex-col">
        <div className="w-full h-full gap-2">
          <div className="font-bold text-2xl pb-2 text-center">
            Fill out your entry!
          </div>
          <div className='text-left font-semibold text-md'>Title</div>
          <TextField
          fullWidth
          className='bg-white' 
          id="outlined-basic" 
          placeholder="ex. Amusement Park" 
          variant="outlined"  
          onChange={(e) => setEntry(e.target.value)}/>
          <div className='text-left font-semibold text-md pt-2'>Entry</div>
          <TextField 
          multiline
          rows={10} 
          className='bg-white w-full' 
          id="outlined-basic" 
          placeholder="Dear Diary..." 
          variant="outlined" 
          onChange={(e) => setTitle(e.target.value)}/>
          <div className='flex mt-5 flex-col'>
            <button onClick={handleSubmit} className="flex-1 py-1 px-4 m-auto font-bold text-white bg-paper-brown rounded-[30px] w-fit hover:bg-palette-green flex">Done!</button>
          </div>
          
        </div>
      </div>
      </DialogContent>
    </Dialog>
  );
};

export default MyModal;