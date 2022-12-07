import React, { useRef, useState } from "react";
import axios from "axios";
import { Card, Row, Col, Input, Button } from "antd";
const { TextArea } = Input;

const Form = (props) => {
  const [message, setMessage] = useState("");
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);

  const submitHandler = async () => {
    let titles = inputRef1.current.input.value;
    let desc = inputRef2.current.resizableTextArea.textArea.value;
    if (props.method == "post") {
      await axios.post("https://jsonplaceholder.typicode.com/posts", {
        title: titles,
        description: desc,
      });
      setMessage("Publish Success");
      inputRef1.current.input.value = "";
      inputRef2.current.resizableTextArea.textArea.value = "";
    } else if (props.method == "put") {
      await axios.put("https://jsonplaceholder.typicode.com/posts/1", {
        title: titles,
        description: desc,
      });
      setMessage("Put Success");
      inputRef1.current.input.value = "";
      inputRef2.current.resizableTextArea.textArea.value = "";
    } else if(props.method == 'patch'){
        await axios.patch("https://jsonplaceholder.typicode.com/posts/1",{
            title: titles,
            description: desc,
          }); 
          setMessage("Patch Success");
          inputRef1.current.input.value = "";
          inputRef2.current.resizableTextArea.textArea.value = "";
    } 
    else {
      setMessage("Your" + props.method + "Failed");
    }
  };
  return (
    <Card>
      <form>
        <Input
          ref={inputRef1}
          placeholder="Input Title"
          style={{ marginBottom: "10px" }}
        />
        <TextArea
          ref={inputRef2}
          placeholder="input Desciption"
          autoSize={{
            minRows: 3,
            maxRows: 5,
          }}
        />
        {message}
        <Button
          onClick={submitHandler}
          style={{ marginTop: "10px" }}
          type="primary"
          block
          >
          Add
        </Button>
      </form>
    </Card>
  );
};

export default Form;
