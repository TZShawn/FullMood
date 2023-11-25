import React from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import EChartsReact from "echarts-for-react";
import { Checkbox } from "@mui/material";

import DeleteIcon from '@mui/icons-material/Delete';

interface IToDoCard {
  text: string,
  id: number,
  done: boolean
}

const ToDoCard: React.FC<IToDoCard> = ({text, id, done}) => {
  const [isChecked, setIsChecked] = React.useState(done)

  return (
    <div className="flex">
      <Checkbox checked={isChecked} onChange={(e) => {setIsChecked(!isChecked)}}/>
      <div className="pt-2">{text}</div>
      <div className="flex-1"/>
      {isChecked ? <DeleteIcon />: ""}
    </div>
  )
}

const Dash: React.FC<{}> = () => {


  const todoItems = [
    {text: "Work out1", done: false},
    {text: "Work out2", done: true},
    {text: "Work out3", done: false},
    {text: "Work out4", done: false},
    {text: "Work out5", done: false},
    {text: "Work out6", done: false},
  ]

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
              [0.25, "#FF6E76"],
              [0.5, "#FDDD60"],
              [0.75, "#58D9F9"],
              [1, "#7CFFB2"],
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

  const happyStuff: string[] = []
  const sadStuff: string[] = []

  return (
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
              return (
                <div>{stuf}</div>
              )
            })}
            <div className="p-3 font-semibold text-lg">
              Here are some things that made you Sad
            </div>
            {sadStuff.map((stuf) => {
              return (
                <div>{stuf}</div>
              )
            })}
          </div>
        </div>
        <div className="w-4/12 m-2 bg-paper-brown rounded-lg border-4 overflow-y-auto border-black">
          <div className="font-semibold text-lg p-3">Help Todo List</div>
          {todoItems.map((tod, key) => {
            return (
            <ToDoCard text={tod.text} id={key} done={tod.done} />
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default Dash;
