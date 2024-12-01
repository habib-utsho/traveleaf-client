/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";
import Container from "@/components/ui/Container";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";

const TestPage = () => {
  const [count, setCount] = useState(0);
  const [isTodoLoading, setIsTodoLoading] = useState(true);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setIsTodoLoading(true);

    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
        setIsTodoLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);

  console.log(count, "count");

  return (
    <div className="bg-slate-50 h-screen ">
      <Container className="space-y-[20px]">
        <h2 className="font-semibold">Use State and Use Effect</h2>

        {/* Use state */}
        <div className="bg-slate-100 p-2 rounded border w-fit">
          <h2 className="font-semibold">Use State</h2>

          <div className="flex gap-2 items-center bg-slate-200 p-2 border">
            <span
              className="text-red-500 p-2 text-xl shadow "
              onClick={() => count > 0 && setCount(count - 1)}
            >
              <MinusCircleOutlined />
            </span>

            <h2 className="font-bold">{count}</h2>

            <span
              className="text-green-500 p-2 text-xl shadow"
              onClick={() => setCount(count + 1)}
            >
              <PlusCircleOutlined />
            </span>
          </div>
        </div>

        {/* Use effect */}
        <div className="bg-slate-100 p-2 rounded border w-fit">
          <h2 className="font-semibold">Use Effect</h2>

          {isTodoLoading ? (
            <h2>Loading....</h2>
          ) : todos?.length === 0 ? (
            <h2>No todos</h2>
          ) : (
            <div className="grid grid-cols-4 gap-4 items-center">
              {todos.map((todo, index) => (
                <div key={index} className="p-2 rounded-md border bg-red-100">
                  <h2>User Id: {todo?.userId}</h2>
                  <h2>Id: {todo?.id}</h2>
                  <h2>title: {todo?.title}</h2>
                  <h2>Is complete: {todo?.completed}</h2>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default TestPage;
