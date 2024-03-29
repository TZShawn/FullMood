import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/Button";
import InfoIcon from "@mui/icons-material/Info";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./Entries.css";
import { Icon, alpha, styled } from "@mui/material";
import IOSSwitch from "../../components/IOSToggle";
import MyModal from "../../components/myModal";
import EntryView from "../../components/entryView";
import NavBar from "../../NavBar";
import { pink } from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:4000";

interface IEntry {
  date: string;
  title: string;
  entry: string;
  mood: string;
  swatch: boolean
}

const PinkSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: pink[600],
    '&:hover': {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: pink[600],
  },
}));

interface IEntries {
  entries: IEntry[];
}

// export const sampleEntry: IEntry = {
//   date: "2023-01-01",
//   title: "title1",
//   entry: "Sample content",
// };

// export const samplEntry: IEntry = {
//   date: "2023-02-01",
//   title: "title1",
//   entry: "Sample helo content",
// };

// export const sampEntry: IEntry = {
//   date: "2023-02-01",
//   title: "title1",
//   entry: "Sample helo content",
// };

// export const samEntry: IEntry = {
//   date: "2023-02-01",
//   title: "title1",
//   entry: "Sample helo content",
// };

const EntryCard: React.FC<IEntry> = ({ date, title, entry, mood, swatch }) => {

  const { profile } = useSelector((state: any) => state.profile);
  let navigate = useNavigate();

  if (profile == 0 || !profile) {
    navigate("/");
  }

  const [isViewOpen, setViewOpen] = useState(false);
  const handleOpenView = () => {
    setViewOpen(true);
  };

  let color = "bg-slate-200"

  if ((mood.includes("Negative") || mood.includes("Super negative")) && swatch) {
    color = "bg-red-300"
  } else if (mood.includes("Positive") || mood.includes("Super positive")) {
    color = "bg-green-300"
  }

  const handleCloseView = () => {
    setViewOpen(false);
  };
  return (
    <div className={`w-full h-1/6 pt-3 m-auto`}>
      <div className={`w-full h-full m-auto flex rounded-3xl border-4 box-shadow ${color}`}>
        <div className="w-3/12 flex p-2 items-center justify-center">
          {date}
        </div>
        <div className="w-7/12 flex items-center justify-center">{title}</div>
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

const Entries: React.FC<{}> = ({}) => {

  const { profile } = useSelector((state: any) => state.profile);

  const [togSwitch, setTogSwitch] = React.useState(false)

  const [userData, setUserData] = React.useState<
    | {
        todo: any[];
        entrys: any[];
        negatives: any[];
        positives: any[];
        username: string;
      }
    | undefined
  >(undefined);

  useEffect(() => {
    axios
      .post("/getprofile", { name: profile })
      .then((res) => {
        if ((res.status = 200)) {
          console.log(res.data);
          setUserData(res.data);
        } else {
          console.log(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const entries = userData?.entrys ?? []
  // Axios call to BE
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  let usedEntry = false

  const map = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  entries.forEach((entry) => {
    const entryDate = entry.date.split('/')
    const newDate = new Date()
    let day = newDate.getDate().toString()
    if (day.length == 1) {
      day = '0' + day
    }
    const month: number = newDate.getMonth()
    const year = newDate.getFullYear()
    if (entryDate[1] == day && entryDate[0] == map[month] && entryDate[2] == year.toString()) {
      usedEntry = true
    }
  })

  return (
    <div className="w-full h-screen overflow-hidden">
      <NavBar current="entries" />
      <div className="row h-[100vh] w-full bg-brown">
        <div className="row h-1/6 flex w-full">
          <div className="h-full w-1/12 flex"></div>

          <div className="h-full w-10/12 flex items-end">
            <div className="text-left font-sans pl-4 font-bold text-5xl pb-3 text-white">
              Past Entries
            </div>
            <div className="flex-1" />
            <div className="pb-3">
              <PinkSwitch onClick={(e) => setTogSwitch(!togSwitch)} />
            </div>
            <div className="btn ">
              <IconButton onClick={handleOpenModal}>
                <AddCircleOutlineIcon
                  style={{ fontSize: "3rem", color: "#65C466" }}
                />
              </IconButton>
              <MyModal open={isModalOpen} onClose={handleCloseModal} setModalOpen={setModalOpen} setUserData={setUserData} entryToday={usedEntry}/>
            </div>
          </div>
          <div className="h-full w-1/12 flex"></div>
        </div>
        <div className="row h-5/6 pb-2 flex w-full place-content-center">
          <div className="w-10/12 h-full box-content border-2 border-gray-200 rounded-3xl overflow-y-hidden">
            <div className="w-full h-full m-auto overflow-y-auto bg-paper-brown">
              <div className="w-11/12 h-full m-auto mb-5">
                {entries.map((entry, index) => (
                  <EntryCard date={entry.date.toString()} title={entry.title} entry={entry.entry} mood={entry.mood} swatch={togSwitch}/>
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
