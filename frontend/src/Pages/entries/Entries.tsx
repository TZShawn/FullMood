import React, { useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/Button";
import InfoIcon from "@mui/icons-material/Info";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./Entries.css";
import { Icon } from "@mui/material";
import IOSSwitch from "../../components/IOSToggle";
import MyModal from "../../components/myModal";
import EntryView from "../../components/entryView";
import NavBar from "../../NavBar";

interface IEntry {
  date: string;
  title: string;
  entry: string;
}

interface IEntries {
  entries: IEntry[];
}

export const sampleEntry: IEntry = {
  date: "2023-01-01",
  title: "title1",
  entry: "Sample content",
};

export const samplEntry: IEntry = {
  date: "2023-02-01",
  title: "title1",
  entry: "Sample helo content",
};

export const sampEntry: IEntry = {
  date: "2023-02-01",
  title: "title1",
  entry: "Sample helo content",
};

export const samEntry: IEntry = {
  date: "2023-02-01",
  title: "title1",
  entry: "Sample helo content",
};

const EntryCard: React.FC<IEntry> = ({ date, title, entry }) => {
  const [isViewOpen, setViewOpen] = useState(false);
  const handleOpenView = () => {
    setViewOpen(true);
  };

  const handleCloseView = () => {
    setViewOpen(false);
  };
  return (
    <div className="w-full h-1/6 pt-3 m-auto">
      <div className="w-full h-full m-auto flex rounded-3xl border-4 box-shadow">
        <div className="w-3/12 flex p-2 items-center justify-center">
          {date}
        </div>
        <div className="w-7/12 flex items-center justify-center">{entry}</div>
        <div className="w-2/12 flex items-center justify-center">
          <div
            onClick={handleOpenView}
            className="py-1 px-4 font-bold text-white bg-paper-brown rounded-[30px] w-fit  hover:bg-mid-brown flex"
          >
            <div className="pr-1">View</div> <InfoIcon />
          </div>
          <EntryView
            open={isViewOpen}
            date={date}
            entry={entry}
            title={title}
            onClose={handleCloseView}
          />
        </div>
      </div>
    </div>
  );
};

const Entries: React.FC<IEntries> = ({ entries }) => {
  // Axios call to BE
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      <NavBar current="entries" />
      <div className="row h-[93.7vh] w-full">
        <div className="row h-1/6 flex w-full">
          <div className="h-full w-1/12 flex"></div>

          <div className="h-full w-10/12 flex items-end">
            <div className="text-left font-sans pl-4 font-bold text-5xl pb-3">
              Past Entries
            </div>
            <div className="flex-1" />
            <div className="pb-3">
              <IOSSwitch />
            </div>
            <div className="btn ">
              <IconButton>
                <AddCircleOutlineIcon
                  style={{ fontSize: "3rem", color: "#65C466" }}
                />
              </IconButton>
            </div>
          </div>
          <div className="h-full w-1/12 flex"></div>
        </div>
        <div className="row h-5/6 pb-2 flex w-full place-content-center">
          <div className="w-10/12 h-full box-content border-2 border-gray-200 rounded-3xl overflow-y-hidden">
            <div className="w-full h-full m-auto overflow-y-auto">
              <div className="w-11/12 h-full m-auto mb-5">
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
    </div>
  );
};

export default Entries;
