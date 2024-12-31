"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { FileUploader } from '@aws-amplify/ui-react-storage';

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const [purchases, setPurchases] = useState<Array<Schema["Purchase"]["type"]>>([]);

  function listPurcahses() {
    client.models.Purchase.observeQuery().subscribe({
      next: (data) => setPurchases([...data.items]),
    });
  }

  useEffect(() => {
    listPurcahses();
  }, []);

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
      <FileUploader
        acceptedFileTypes={['image/*']}
        path="public/"
        maxFileCount={1}
        isResumable
      />
      </div>
    </main>
  );
}
