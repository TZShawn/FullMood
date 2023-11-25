import React from "react"
import Button from '@mui/material/Button';
import InfoIcon from '@mui/icons-material/Info';
import './Entries.css'; 

interface IEntry {
    date: string,
    content: string
}

interface IEntries {
    entries: IEntry[]
}

export const sampleEntry: IEntry = {
    date: '2023-01-01',
    content: 'Sample content',
  };

export const samplEntry: IEntry = {
    date: '2023-02-01',
    content: 'Sample helo content',
  };

export const sampEntry: IEntry = {
date: '2023-02-01',
content: 'Sample helo content',
};

export const samEntry: IEntry = {
    date: '2023-02-01',
    content: 'Sample helo content',
};

const EntryCard: React.FC<IEntry> = ({date, content}) => {
    return (
      <div className="w-full h-2/6 pt-3 m-auto"> 
      <div className="w-full h-full m-auto flex rounded-3xl border-4 box-shadow">
      <div className="w-3/12 flex p-2 items-center justify-center">
          {date}
        </div>
        <div className="w-7/12 flex items-center justify-center">
          {content}
        </div>
        <div className="w-2/12 flex items-center justify-center">
        <div className=" rounded-md shadow-md">
        <Button variant="contained" color="primary"  endIcon={<InfoIcon />} className="w-full lowercase h-full">
          <div className="normal-case">View</div>
        </Button>
      </div>
        </div>
      </div>
        
      </div>
    );
}

const Entries: React.FC<IEntries> = ({entries}) => {
    // Axios call to BE
    return (
      <div className="w-full h-screen ">
        <div className="row h-2/6 flex w-full">
            <div className="h-full w-10/12 m-auto flex items-end">
                <div className="text-left font-sans pl-4 font-bold text-6xl">
                    Past Entries
                </div>
            </div>
        </div>
        <div className="row h-4/6 pb-2 flex w-full place-content-center">
          <div className="w-10/12 h-full box-content border-2 border-gray-200 rounded-3xl overflow-y-hidden">
            <div className="w-full h-full m-auto overflow-y-auto">

            
            <div className="w-10/12 h-full m-auto mb-5">
            {entries.map((entry, index) => (
              <EntryCard key={index} {...entry} />
            ))}
            </div>
            </div>
          </div>
        </div>
        {
          // {entryArray.map((entry) => {
          //     return (
          //         <EntryCard date={entry.date} content={entry.content} />
          //     )
          // })
        }
      </div>
    );



}

export default Entries;