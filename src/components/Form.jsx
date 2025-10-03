import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import { addPosts, updateData } from "../api/PostApi";

export default function Form({
  dataSet,
  setDataSet,
  updateDataApi,
  setUpdateDataApi,
}) {
  // State maintaining the input fields
  const [inputData, setInputData] = useState({ title: "", body: "", id: "" });

  /// Showing the current editing post data into the input fields
  useEffect(() => {
    updateDataApi &&
      setInputData({ title: updateDataApi.title, body: updateDataApi.body });
  }, [updateDataApi]);

  // Api data handling for adding post
  const addPostData = async () => {
    const result = await addPosts(inputData);
    console.log("This is the result", result);
    setDataSet((dataSet) => {
      return [...dataSet, result.data];
    });

    console.log("This is the post Api method that we are using here ", result);
  };

  /// Input handler setting the new data typed in the input field
  function inputHandler(e) {
    const name = e.target.name;
    const value = e.target.value;

    setInputData((prev) => {
      return { ...prev, [name]: value };
    });
    console.log(name);
    console.log(value);
    console.log(inputData);
  }

  const isEmpty = Object.keys(updateDataApi).length === 0;

  /// Submit button clicked
  function onSubmitHandler(e) {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value; // now defined
    console.log(action);
    if (action === "Submit") addPostData(inputData);
    else if (action === "Edit") updatePostData();
    setInputData({ title: "", body: "", id: "" });
  }

  /// Api data handling for the update posts
  const updatePostData = async () => {
    try {
      const result = await updateData(updateDataApi.id, inputData);
      console.log("This is the result", result);
      setDataSet((prev) => {
        return prev.map((currElement) => {
          return currElement.id === result.data.id ? result.data : currElement;
        });
      });
      setInputData({ title: "", body: "", id: "" });
      setUpdateDataApi({});
    } catch {}
  };

  return (
    <form action="submit" onSubmit={onSubmitHandler}>
      <div className="inputs">
        <input
          className="InputField"
          placeholder="Title"
          type="text"
          name="title"
          value={inputData.title}
          onChange={inputHandler}
        ></input>
        <input
          className="InputField"
          placeholder="Post Content"
          type="text"
          name="body"
          value={inputData.body}
          onChange={inputHandler}
        ></input>
        <Button
          className="submitButton buttons"
          variant="contained"
          endIcon={<SendIcon />}
          type="submit"
          value={isEmpty ? "Submit" : "Edit"}
        >
          {isEmpty ? "Submit" : "Edit"}
        </Button>
      </div>
    </form>
  );
}
