"use client";

import React, { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { FileUploader } from '@aws-amplify/ui-react-storage';
import { uploadData } from 'aws-amplify/storage';

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const [purchases, setPurchases] = useState<Array<Schema["Purchase"]["type"]>>([]);
  const [file, setFile] = useState<File | undefined>();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setFile(files[0]);
    }
  };
  const handleUpload = () => {
    if (file) { // file が undefined でないことを確認
        uploadData({
          path: `picture-submissions/${file.name}`,
          data: file,
        })
        alert(`${file.name}がアップロードされました。`)
    } else{
      alert(`ファイルが選択されていません。`)
    };
  }
  function listPurcahses() {
    client.models.Purchase.observeQuery().subscribe({
      next: (data) => setPurchases([...data.items]),
    });
  }

  useEffect(() => {
    listPurcahses();
  }, []);

  const res = client.queries.sayHello({
    name: "Amplify",
  });
  console.log("res");
  console.log(res);
  // function createPurcahse() {
  //   client.models.Purchase.create({
  //     : window.prompt("Todo content"),
  //   });
  // }
  return (
    <main>
      <h1>My todos</h1>
      {/* <button onClick={createTodo}>+ new</button> */}
      <ul>
        {purchases.map((purchase) => (
          <li key={purchase.id}>{purchase.shop_name}</li>
        ))}
      </ul>
      <div>
     
        <input type="file" onChange={handleChange} />
          <button
            onClick={handleUpload}
        >
          Upload
        </button>
      </div>
    </main>
  );
}
