import { getPosts, deletePosts, addPosts } from "./api/PostApi";
import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/card.jsx";
import Form from "./components/Form.jsx";
import TextCursor from "./components/TextCursor.jsx";

function App() {
  /// Array of all the posts
  const [dataSet, setDataSet] = useState([]);

  /// The current selected post for editing is stored here
  const [updateDataApi, setUpdateDataApi] = useState({});

  // Api get Data Function
  const getPostsData = async () => {
    const res = await getPosts();
    console.log(res.data);
    setDataSet(res.data);
  };
  /// Api Delete Data Function
  const deletePostsData = async (id) => {
    try {
      console.log("Delete button is clicked");
      const result = await deletePosts(id);
      console.log(result.status);
      if (result.status >= 200 && result.status < 300) {
        setDataSet((prev) => prev.filter((item) => item.id !== id));
        console.log(id);
      } else {
        console.log("Delete failed with status,", result.status);
      }
    } catch (err) {
      console.log("Delete failed", err);
    }
  };
  /// Api Patch/Put Function
  const handleUpdatePost = (item) => {
    console.log("Edit button is clicked and the current item is ", item);
    setUpdateDataApi(item);
  };

  useEffect(() => {
    getPostsData();
  }, []);

  return (
    <>
      <TextCursor
        text="</>"
        delay={0.01}
        spacing={8}
        followMouseDirection={true}
        randomFloat={true}
        exitDuration={0.2}
        removalInterval={1}
        maxPoints={5}
      />

      <Form
        dataSet={dataSet}
        setDataSet={setDataSet}
        updateDataApi={updateDataApi}
        setUpdateDataApi={setUpdateDataApi}
      ></Form>
      <div className="container">
             {dataSet.map((item) => {
          return (
            <Card
              key={item.id}
              title={item.title}
              body={item.body}
              number={item.id}
              deletePostsData={deletePostsData}
              handleUpdatePost={handleUpdatePost}
              item={item}
            ></Card>
          );
        })}
      </div>
    </>
  );
}

export default App;
