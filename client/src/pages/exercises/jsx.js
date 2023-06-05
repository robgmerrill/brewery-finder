import { Sandpack } from '@codesandbox/sandpack-react';
import ReactMarkdown from 'react-markdown';
import { useState, useEffect, useContext } from 'react';
import AppContext from '../../components/AppContext';
import { useNavigate } from 'react-router-dom';

const markdownContent = `
# Lesson 1: Introduction to JSX and Its Importance in React

## What is JSX?

JSX stands for <code>JavaScript XML</code>. It's a syntax extension for JavaScript that allows you to write HTML-like code within your JavaScript code. This might seem a bit strange at first, but once you get used to it, it makes building user interfaces in React a lot more intuitive and manageable.

In technical terms, JSX is a type of syntax sugar for the \`React.createElement(component, props, ...children)\` function in React. It provides a more visual and less verbose way to create elements, define component structure, and manage props and children components.

Here's an example of JSX:

\`const element = <h1>Hello, world!</h1>\`

## Why Use JSX in React?


1. **Easier to Write and Read**: With JSX, you can write components that look like standard HTML, which is easier to write and understand, especially for those with a background in web development.
2. **Inline Styling**: JSX allows you to add inline styles, where the styles are written as JavaScript objects. This gives you the full power of JavaScript when dealing with styles (variables, functions, etc.), and also opens up the ability to use conditional styling.
3. **Conditional Rendering**: JSX works perfectly with JavaScript logic, meaning you can easily render elements conditionally, based on the application state.
4. **Enhanced Code Reusability and Nesting**: JSX allows you to nest components inside other components, leading to better code reusability and easier-to-understand structure.

## How is JSX Different from HTML and JavaScript?

Despite its similarities to HTML, JSX is not HTML. Here are a few key differences:

- **className instead of class**: Since \`class\` is a reserved keyword in JavaScript, JSX uses \`className\` instead.
- **camelCase Property Naming**: Instead of HTML attribute names like \`onclick\` and \`tabindex\`, JSX uses camelCase syntax: \`onClick\` and \`tabIndex\`.
- **Expressions in Curly Braces**: Unlike HTML, in JSX you can embed any JavaScript expression within curly braces \`{}\` inside the JSX tags.
- **Self-closing Tags**: All tags must be closed in JSX. If there is no content between tags, they can be self-closed, just like in XML or XHTML.

Even though it seems like we are writing HTML, under the hood, JSX is transpiled to plain JavaScript using tools like Babel.

## Summary

In this lesson, we have introduced JSX and discussed its importance in React. We have learned that JSX makes it easier and more intuitive to build UIs in React, and have touched on the key differences between JSX, HTML, and JavaScript.

In the next lesson, we'll delve deeper into JSX syntax, looking at how to create and nest JSX elements, how to use JavaScript expressions in your JSX, and more.

Remember, it's perfectly okay if this all seems a bit confusing right now. The more you work with React and JSX, the more comfortable you'll become with it. As always, happy coding!
`;

export default function JSX() {
  const [isComplete, setIsComplete] = useState(false);
  const { user } = useContext(AppContext);
  console.log(user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/sign-in');
  }, [user, navigate]);

  // useEffect
  useEffect(() => {
    async function getData() {
      // const result = await fetch('/api/exercises/:id');
      // const data = await result.json();
    }

    getData();
  }, []);

  function handleClick() {
    console.log('clicked');
    // write code
    // make post request to update the isComplete for the exercise
  }

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

      <button onClick={handleClick}>Complete</button>
    </div>
  );
}
