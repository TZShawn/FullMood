import React from "react";

interface IMoodCell{
    moodType: string,
    moodVal: number,
}

// const MoodCell: React.FC<IMoodCell> = ({ moodType, moodVal }) => {
//     let content;

//     if (moodType === 'happy'){
//         content = <div className="border border-green-300">{moodVal}</div>
//     } else if (moodType === 'sad'){
//         content = <div className="border border-black-300">{moodVal}</div>
//     }
//     return (
//         {content}
//     )
//   };

const Dash: React.FC<{}> = () => {
    
    return (
      <div className="w-full h-screen">
        <div className="row flex h-1/2"> 
            <div className="col w-5/12 flex bg-red-200">
                w
            </div>
            <div className="col w-7/12 flex  bg-red-200">
                <div className="container mx-auto bg-blue-500 p-12 border border-gray-300 rounded-lg shadow-md">
                    <div className="grid grid-rows-7 grid-cols-5 gap-2">

                    </div>
                </div>
            </div>
        </div>
        <div className="row flex h-1/2">
            <div className="col w-8/12 flex bg-red-200">
                <div className="container mx-auto bg-blue-500 p-6 border border-gray-300 rounded-lg shadow-md">

                </div>
            </div>
            <div className="col w-4/12 flex  bg-red-200">
                w
            </div>
        </div>
      </div>
    );
}

export default Dash