import React, { useState, useEffect, useRef } from "react";
import "./custom-input.scss";

const CustomInput = props => {
  const inputNode = useRef(null);

  const [suggestionList, setSuggestionList] = useState([]);
  const [showList, setShowList] = useState(false);

  //********************************************

  const handleOnPageClick = event => {
    if (!inputNode.current.contains(event.target)) {
      setShowList(false);
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleOnPageClick);
    return () => {
      window.removeEventListener("mousedown");
    };
  }, []);

  //********************************************

  const onHandleChange = e => {
    let { value } = e.target;
    props.onChangeInput && props.onChangeInput(value);

    let lowerCasedValue = value.toLowerCase();
    let selectedList = [];

    props.datasource.forEach(item => {
      let lowerCasedItem = item.toLowerCase();
      let i = 0;
      while (
        lowerCasedItem[i] === lowerCasedValue[i] &&
        i < lowerCasedItem.length
      ) {
        i++;
        if (i === lowerCasedValue.length) {
          selectedList = [...selectedList, item];
        }
      }
      /* or:
      let pattern = new RegExp(`^${lowerCasedValue}`);
      if (pattern.test(lowerCasedItem)) {
        selectedList = [...selectedList, item];
    }
  */
    });

    /* or:
      let pattern = new RegExp(`^${lowerCasedValue}`);
      const selectedList = props.datasource.filter(item => pattern.test(item));
  */

    setSuggestionList(selectedList);

    if (!value.length || !selectedList.length) {
      setSuggestionList([]);
      setShowList(false);
    } else setShowList(true);
  };

  //********************************************

  const handleOptionClick = val => {
    props.onChangeInput && props.onChangeInput(val);
    setSuggestionList([val]);
    setShowList(false);
  };

  //********************************************

  return (
    <div className="custom-input">
      <div ref={inputNode}>
        <input
          type="text"
          name="country"
          value={props.value}
          onChange={onHandleChange}
          onClick={() =>
            props.value && suggestionList.length && setShowList(true)
          }
          className={`${showList ? "input-with-menu" : "input"}`}
        />

        {showList ? (
          <div className="suggestion-list">
            {suggestionList.map((val, index) => (
              <div
                key={index}
                onClick={() => handleOptionClick(val)}
                className="suggestion-items"
              >
                {val}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CustomInput;
