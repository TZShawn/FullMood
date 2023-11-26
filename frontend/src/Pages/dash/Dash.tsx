import React, { useCallback, useEffect, useState } from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import EChartsReact from "echarts-for-react";
import { Checkbox, TextField } from "@mui/material";
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import dayjs, { Dayjs } from 'dayjs';
import Badge from '@mui/material/Badge';
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import NavBar from "../../NavBar";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EntryView from "../../components/entryView";

axios.defaults.baseURL = "http://localhost:4000";

interface IToDoCard {
  text: string;
  id: number;
  done: boolean;
  setUserData: any
}

const ToDoCard: React.FC<IToDoCard> = ({ text, id, done, setUserData }) => {
  const [isChecked, setIsChecked] = React.useState(done);
  const { profile } = useSelector((state: any) => state.profile);

  const handleClick = async (text: string) => {
    console.log(text)
    let newProfile = await axios.post('/todo', {todo: text, delete: true, name: profile}).then(res => res.data)
    setUserData(newProfile)
  }

  return (
    <div className="flex">
      <Checkbox
        checked={isChecked}
        onChange={(e) => {
          setIsChecked(!isChecked);
        }}
      />
      <div className="pt-2">{text}</div>
      <div className="flex-1" />
      <div className="pt-2" onClick={(e) => {handleClick(text)}}>
      {isChecked ? <DeleteIcon /> : ""}
      </div>
    </div>
  );
};

const AddTodo: React.FC<{ todoEdit: boolean; setTodoEdit: any; setUserData: any }> = ({ 
  todoEdit,
  setTodoEdit,
  setUserData
}) => {
  const [text, setText] = React.useState("");
  const { profile } = useSelector((state: any) => state.profile);

  const handleCheckClick = async () => {
    console.log(text);
    let newProfile = await axios.post("/todo", { delete: false, todo: text, name: profile }).then(res => res.data);
    setUserData(newProfile)
    setTodoEdit(false);
  };

  const handleClearClick = () => {
    setTodoEdit(!todoEdit);
  };

  return (
    <div className="w-full flex px-4">
      <input
        type="textfield"
        className="w-full border-2 border-black bg-paper-brown outline-none"
        onChange={(e) => setText(e.target.value)}
      />
      <div onClick={(e) => handleCheckClick()}>
        <CheckIcon />
      </div>
      <div onClick={(e) => handleClearClick()}>
        <ClearIcon />
      </div>
    </div>
  );
};

const Dash: React.FC<{}> = () => {
  const { profile } = useSelector((state: any) => state.profile);
  let navigate = useNavigate();

  if (profile == 0) {
    navigate("/");
  }

  const [userData, setUserData] = React.useState<{
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

  const entryData = userData?.entrys ?? []

  let moods = entryData.map(entr => entr.mood)

  if (moods.length < 7) {
    moods = moods.slice(0, 7)
  }

  let numbers = 0

  moods.forEach((mood) => {
    if (mood.includes('Negative')) {
      numbers += 0.25
    } else if (mood.includes("Neutral")) {
      numbers += 0.5
    } else if (mood.includes('Positive')) {
      numbers += 0.75
    } else if (mood.includes('Super Positive')) {
      numbers += 1
    }
  })

  numbers = numbers / moods.length

  const [isViewOpen, setViewOpen] = useState(false);
  const options = {
    series: [
      {
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        center: ["50%", "75%"],
        radius: "90%",
        min: 0,
        max: 1,
        splitNumber: 8,
        axisLine: {
          lineStyle: {
            width: 6,
            color: [
              [0.25, "#FF6961"],
              [0.5, "#FF964F"],
              [0.75, "#C4DEA4"],
              [1, "#418134"],
            ],
          },
        },
        pointer: {
          icon: "path://M12.8,0.7l12,40.1H0.7L12.8,0.7z",
          length: "12%",
          width: 20,
          offsetCenter: [0, "-60%"],
          itemStyle: {
            color: "auto",
          },
        },
        axisTick: {
          length: 12,
          lineStyle: {
            color: "auto",
            width: 2,
          },
        },
        splitLine: {
          length: 20,
          lineStyle: {
            color: "auto",
            width: 5,
          },
        },
        axisLabel: {
          color: "#464646",
          fontSize: 20,
          distance: -60,
          rotate: "tangential",
          formatter: function (value: number) {
            if (value === 0.875) {
              return "Super Positive";
            } else if (value === 0.625) {
              return "Positive";
            } else if (value === 0.375) {
              return "Bad";
            } else if (value === 0.125) {
              return "Super Bad";
            }
            return "";
          },
        },
        title: {
          offsetCenter: [0, "-10%"],
          fontSize: 20,
        },
        detail: {
          fontSize: 30,
          offsetCenter: [0, "-35%"],
          valueAnimation: true,
          formatter: function (value: number) {
            return Math.round(value * 100) + "";
          },
          color: "inherit",
        },
        data: [
          {
            value: numbers,
            name: "Mood Rating",
          },
        ],
      },
    ],
  };
  let date = ""
  let entry = ""
  let title = ""
  const todoItems = userData?.todo ?? [];
  let happyStuff: string[] = userData?.positives ?? [];
  if (happyStuff.length > 3) {
    happyStuff = happyStuff.slice(0,4)
  }
  let sadStuff: string[] = userData?.negatives ?? [];
  if (sadStuff.length > 3) {
    sadStuff = sadStuff.slice(0,4)
  }
  const [selectedDate, setSelectedDate] = React.useState("")
  const [todoEdit, setTodoEdit] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState<any>([]) //should be empty if no happy days.
  const [lowlightedDays, setLowlightedDays] = React.useState<any>([]) //should be empty if no happy days.
  const entries = userData?.entrys ?? []
  let idx = -1 
  let dateObj = new Date();
  for (let i = 0; i < entries.length; ++i) {
    if (entries[i].date == selectedDate) {
      idx = i
      break
    }
  }
  date = entries[idx]?.date ?? ""
  entry = entries[idx]?.entry ?? ""
  title = entries[idx]?.title ?? ""
  
  React.useEffect(() => {
    // Create a new array with the filtered dates
    const posEntries = entries.filter(entry => entry.mood.includes("Positive"));
    const negEntries = entries.filter(entry => entry.mood.includes("Negative"));

    const posDates = posEntries.map(entry => entry.date);
    const negDates = negEntries.map(entry => entry.date);

    const posDays: number[] = [];
    posDates.forEach( (date) => {
      var splitted = date.split('/', 3);
      posDays.push(Number(splitted[1]))
    }
    )
    const negDays: number[] = [];
    negDates.forEach( (date) => {
      var splitted = date.split('/', 3);
      negDays.push(Number(splitted[1]))
    }
    )
    // Update the state with the new array
    setHighlightedDays(posDays);
    setLowlightedDays(negDays);
  }, [entries]);

  function ServerDay(props: PickersDayProps<Dayjs> & { highlightedDays?: number[] } & {lowlightedDays?: number[] }) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
  
    
    if (!props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0) {
      return (
        <Badge
          key={props.day.toString()}
          overlap="circular"
          badgeContent={'✅'}
        >
          <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
        </Badge>
      );
    } else if (!props.outsideCurrentMonth && lowlightedDays.indexOf(props.day.date()) >= 0) {
      return (
        <Badge
          key={props.day.toString()}
          overlap="circular"
          badgeContent={'🔴'}
        >
          <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
        </Badge>
      );
    } else {
      return (
        <Badge
          key={props.day.toString()}
          overlap="circular"
          badgeContent={undefined}
        >
          <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
        </Badge>
      );
    }
  
    
  }

  return (
    <div>
      <NavBar current="dashboard" />
      <div className="w-full h-screen bg-background-brown">
        <div className="flex h-4/7 pt-16 px-16">
          <div className="w-5/12 m-2 bg-paper-brown border-black border-4 rounded-lg">
            <div className="font-semibold text-lg p-3">Your Recent Moods</div>
            <div className="m-auto">
              <EChartsReact option={options} />
            </div>
          </div>
          <div className="w-7/12 m-2 bg-paper-brown align-lefr border-black border-4 rounded-lg">
            <div className="font-semibold text-lg p-3 pb-0">Calendar View</div>
            <div className="w-full">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar 
                slots={{
                  day: ServerDay,
                }}
                slotProps={{
                  day: {
                    highlightedDays,
                    lowlightedDays,
                  } as any,
                }}
                onChange={(e) => {
                  // @ts-ignore
                  let value = String(e.$d).split(' ')
                  const finalDate = value[1]+"/"+value[2]+"/"+value[3]
                  setSelectedDate(finalDate)

                  setViewOpen(true)
                }}/>
              </LocalizationProvider>
            </div>
          </div>
        </div>
        <div className="flex h-72 px-16">
          <div className="w-8/12 m-2 bg-paper-brown max-h-72 overflow-y-auto rounded-lg border-4 border-black">
            <div className="font-semibold text-lg p-3">Reccomendations</div>
            <div>
              <div className="p-3 pb-1 font-semibold text-lg">
                Here are some things that made you happy!
              </div>
              {happyStuff.map((stuf) => {
                return <div className="pl-3 px-1 font-md">{`- ${stuf}`}</div>;
              })}
            </div>
          </div>
          <div className="w-4/12 m-2 bg-paper-brown rounded-lg border-4 overflow-y-auto border-black">
            <div className="font-semibold text-lg p-3">Help Todo List</div>
            {todoItems?.map((tod, key) => {
              return <ToDoCard text={tod.name} id={key} done={tod.done} setUserData={setUserData} />;
            })}
            {!todoEdit ? (
              <div
                className="w-full text-center mb-2 cursor-pointer hover:bg-mid-brown"
                onClick={(e) => setTodoEdit(!todoEdit)}
              >
                <AddCircleOutlineIcon />
              </div>
            ) : (
              <AddTodo todoEdit={todoEdit} setTodoEdit={setTodoEdit} setUserData={setUserData}/>
            )}
          </div>
        </div>
      </div>
      <EntryView
            open={isViewOpen}
            date={date}
            entry={entry}
            title={title}
            onClose={() => setViewOpen(false)}
          />
    </div>
  );
};

export default Dash;
