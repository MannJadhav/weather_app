import React from "react";

const TimeAndLocation = ({ weather }) => {
  return (
    <div>
      <div className="flex item-center justify-center my-6">
        <p className="text-xl font-extralight">
          {weather?.current?.formattedLocalTime}
        </p>
      </div>
      <div className="flex item-center justify-center my-3">
        <p className="text-3xl font-medium">{weather?.current?.name}</p>
      </div>
    </div>
  );
};

export default TimeAndLocation;

// {`${name},${country}`}
