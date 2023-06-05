import { Sandpack } from '@codesandbox/sandpack-react';
import ReactMarkdown from 'react-markdown';

const markdownContent = `
When working with React, you will need to use React.createElement to represent your UI. However, as you may have seen, the syntax is long. It will become even longer and more tedious when you start having more complicated UI.

React uses a special syntax called JSX to solve that issue. This JSX syntax may look similar to HTML, but it is NOT HTML.

Let's see an example:

import React from "react";

const title = <h1>Hello World</h1>

Even though this looks like it's HTML, it really is not HTML. You will see why in the next lesson.

The code above gets translated to the following:

import React from "react";

const title = React.createElement("h1", {}, "Hello World");

Which one is easier to read? The first one is because you're expressing that you need to create an element that is an h1 that contains Hello World.

JSX is syntactic sugar for React.createElement. JSX is providing you with syntactic sugar (as in making it nicer to read/write) for the React.createElement function.

Instead of having you write React.createElement every time, you can write the element in JSX.

Always remember that the JSX that you write is being converted to React.createElement.

JSX is created to make it easier for you to describe your UI.

JSX is NOT part of the browser. Your browser cannot understand JSX because it's a syntax created by React. You will need a tool (such as babel) to convert your JSX code to normal JavaScript (which will contain the React.createElement calls). We'll discuss that later on with create-react-app and Vite.

This course has been configured in a way that simulates the create-react-app/Vite so you can write JSX, and it will get converted to React.createElement(...).

JSX doesn't require React to be in scope (anymore). Before React 17, you had to import React for your JSX to work in every file where you used JSX. This is not necessary anymore. If you're upgrading a source code from React 16, you can leave the import React; they won't cause any harm.

Live demo: Here's a short screencast of how the JSX code you write on the left is getting transformed into React.createElement() on the right. You can also give this a try yourself by using the Babel REPL configured for JSX.

JSX with ReactDOM: Here's an example of how JSX is used with ReactDOM:

<div id="root"></div>
import React from "react";
import {createRoot} from "react-dom/client";

const root = document.querySelector("#root");
createRoot(root).render(<h1>Hello World</h1>);

This will render the <h1>Hello World</h1> inside the #root element.

Recap:
- JSX is a special syntax for React that makes it easier to represent your UI.
- JSX looks similar to HTML but it is not HTML.
- JSX code you write gets transformed into React.createElement.
- JSX is not part of your browser. You need a tool to transform it into valid JavaScript.
- JSX doesn't require React to be in scope anymore.

`;

export default function App() {
  return (
    <div className="container">
      <ReactMarkdown children={markdownContent} />
      <Sandpack
        template="react"
        files={{
          '/App.js': `export default function App() {
  return <h1>Hello Sandpack my old friend</h1>
}`,
          '/button.js': `export default () => <button />`,
        }}
        options={{
          visibleFiles: ['/App.js', '/button.js', '/index.js'],
          activeFile: '/button.js',
        }}
      />
    </div>
  );
}
