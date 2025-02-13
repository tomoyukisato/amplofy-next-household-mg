// import type { Handler } from 'aws-lambda';
import type { Schema } from "../../data/resource"

// export const handler: Handler = async (event, context) => {
//   // your function code goes here
//   return 'Hello, World!';
// };

export const handler: Schema["sayHello"]["functionHandler"] = async (event) => {
    // arguments typed from `.arguments()`
    const { name } = event.arguments
    // return typed from `.returns()`
    console.log(`Hello, ${name}!`);
    return `Hello, ${name}!`
  }