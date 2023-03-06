import React from "react";

const buyDoubleStuffed = () => {
    if (count >= 10){
        setMultiplier(multiplier * 2);
        setCount(count - 10);
    }
}

export default buyDoubleStuffed;