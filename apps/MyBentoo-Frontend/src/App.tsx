import { useState } from 'react'
import * as Sentry from '@sentry/react';
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <div>
        <h1>MyBentoo</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <button
            onClick={() => {
              try {
                throw new Error("This is your first error!");
              } catch (error) {
                console.error('Erreur capturée localement :', error);
                Sentry.captureException(error);
              }
            }}
          >
            Break the world
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </>
  )
}
export default App