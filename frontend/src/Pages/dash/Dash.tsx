import React, { useCallback, useEffect } from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import EChartsReact from "echarts-for-react";
import { Checkbox, TextField } from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import NavBar from "../../NavBar";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:4000";

interface IToDoCard {
  text: string;
  id: number;
  done: boolean;
}

const ToDoCard: React.FC<IToDoCard> = ({ text, id, done }) => {
  const [isChecked, setIsChecked] = React.useState(done);

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
      {isChecked ? <DeleteIcon /> : ""}
    </div>
  );
};

const AddTodo: React.FC<{ todoEdit: boolean; setTodoEdit: any }> = ({
  todoEdit,
  setTodoEdit,
}) => {
  const [text, setText] = React.useState("");
  const { profile } = useSelector((state: any) => state.profile);

  const handleCheckClick = async () => {
    console.log(text);
    await axios.post("/todo", { delete: false, todo: text, name: profile });
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
  console.log("ASADAS");

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
              return "Grade A";
            } else if (value === 0.625) {
              return "Grade B";
            } else if (value === 0.375) {
              return "Grade C";
            } else if (value === 0.125) {
              return "Grade D";
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
            value: 0.7,
            name: "Grade Rating",
          },
        ],
      },
    ],
  };
  const todoItems = userData?.todo ?? [];
  const happyStuff: string[] = userData?.positives ?? [];
  const sadStuff: string[] = userData?.negatives ?? [];

  const [todoEdit, setTodoEdit] = React.useState(false);
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
                <DateCalendar />
              </LocalizationProvider>
            </div>
          </div>
        </div>
        <div className="flex h-72 px-16">
          <div className="w-8/12 m-2 bg-paper-brown rounded-lg border-4 border-black">
            <div className="font-semibold text-lg p-3">Reccomendations</div>
            <div>
              <div className="p-3 font-semibold text-lg">
                Here are some things that made you happy!
              </div>
              {happyStuff.map((stuf) => {
                return <div>{stuf}</div>;
              })}
              <div className="p-3 font-semibold text-lg">
                Here are some things that made you Sad
              </div>
              {sadStuff.map((stuf) => {
                return <div>{stuf}</div>;
              })}
            </div>
          </div>
          <div className="w-4/12 m-2 bg-paper-brown rounded-lg border-4 overflow-y-auto border-black">
            <div className="font-semibold text-lg p-3">Help Todo List</div>
            {todoItems?.map((tod, key) => {
              return <ToDoCard text={tod.name} id={key} done={tod.done} />;
            })}
            {!todoEdit ? (
              <div
                className="w-full text-center mb-2 cursor-pointer hover:bg-mid-brown"
                onClick={(e) => setTodoEdit(!todoEdit)}
              >
                <AddCircleOutlineIcon />
              </div>
            ) : (
              <AddTodo todoEdit={todoEdit} setTodoEdit={setTodoEdit} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dash;
