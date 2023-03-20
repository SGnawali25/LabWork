import React, { Component, useEffect, useState } from "react";


const RecipeChoices = ({handleChange, label, choices}) => {

    return (
      <div>
        <div className="radio-buttons">
            <input
              type="text"
              name={label}
              placeholder="Guess the ingredient..."
              onChange={handleChange}
              className = "textbox"
            />
          {/* {choices &&
            choices.map((choice) => (
              <li key={choice}>
                <input
                  id={choice}
                  value={choice}
                  name={label}
                  type="radio"
                  onChange={handleChange}
                />
                 {choice}
              </li>
            ))} */}
          {choices &&
          choices.map((choice) => (
            <li key={choice}>
              
              {choice}
              
            </li>
          ))}
        </div>
      </div>
    );
};

export default RecipeChoices;