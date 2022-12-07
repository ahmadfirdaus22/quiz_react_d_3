import "./App.css";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Card, Row, Col, Input, Button, message } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Form from "./component/Form";

const { Header, Content, Footer } = Layout;
const { TextArea } = Input;

function App() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const inputRef1 = useRef(null);


  const getUsers = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (response.status == 200) {
        setUsers(response.data);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async () => {
    let id = inputRef1.current.input.value;
    const response = await axios.delete(
      "https://jsonplaceholder.typicode.com/posts/"+id, );
      console.log(response)
      if(response.status == 200){
        setMessage("delete Success")
      }
      else{
        setMessage("Failed");
      }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="site-card-wrapper">
      <Layout style={{ padding: "0px 50px" }}>
        <Card
          style={{
            textAlign: "center",
            fontSize: "20px",
            marginBottom: "10px",
          }}
        >
          <h1>Get Data</h1>
        </Card>
        <Row gutter={32}>
          {users.map((user) => (
            <Col span={6} style={{ marginBottom: "10px" }}>
              <Card key={user.id}>
                <p>{user.name}</p>
                <p>{user.phone}</p>
                <p>{user.email}</p>
                <p>{user.website}</p>
              </Card>
            </Col>
          ))}
        </Row>
        <Card
          style={{
            textAlign: "center",
            fontSize: "20px",
            marginBottom: "10px",
          }}
        >
          <h1>Add Data</h1>
        </Card>
        <Form method={"post"} />
        <Card
          style={{
            textAlign: "center",
            fontSize: "20px",
            marginBottom: "10px",
          }}
        >
          <h1>Put Data</h1>
        </Card>
        <Form method={"put"} />
        <Card
          style={{
            textAlign: "center",
            fontSize: "20px",
            marginBottom: "10px",
            marginTop: "20px",
          }}
        >
          <h1>Patch Data</h1>
        </Card>
        <Form method={"patch"} />
        <Card
          style={{
            textAlign: "center",
            fontSize: "20px",
            marginBottom: "10px",
            marginTop: "20px",
          }}
        >
          <h1>Delete Data</h1>
        </Card>
        <Card>
          <Input
            ref={inputRef1}
            placeholder="Input Id"
            style={{ marginBottom: "10px" }}
          />
          {message}
          <Button
            onClick={deletePost}
            style={{ marginTop: "10px" }}
            type="primary"
            block
            danger
          >
            delete
          </Button>
        </Card>
      </Layout>
    </div>
  );
}

export default App;
