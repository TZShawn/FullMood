
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import {TextField} from '@mui/material';
import axios from 'axios';

interface EntryViewProps {
  open: boolean;
  onClose: () => void;
  entry: string;
  title: string;
  date: string;
}

const EntryView: React.FC<EntryViewProps> = ({ open, onClose, entry, title, date }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth className="absolute grid place-items-center top-0 left-0" >
      <DialogContent>

      <div className="z-10 w-[40vw] h-[60vh] rounded-lg ">
        <div className="w-full h-full ">
          <div className='flex'>
          <div className='text-4xl italic font-bold p-3 h-1/6'>
            {title}
          </div>
          <div className='flex-1'>
          </div>
          <div className='btn items-center'>
          <IconButton onClick={onClose}>
            <CancelIcon 
            style={{
              color: "#D5B59C"
            }}
             />
          </IconButton>
          </div>
          </div>
          
          <div className='pl-3 italic'>
            {date}
          </div>
          <div className='italic h-4/6 pl-3 pt-4'>
            {entry}
          </div>
          
        </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EntryView;