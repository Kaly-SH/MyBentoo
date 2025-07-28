import * as Sentry from '@sentry/react';
import './App.css'

function App() {
  return (
    <>
      <div>
        <h1>MyBentoo</h1>
        <h3>Site en construction</h3>
        <div className="card">
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
        </div>
      </div>
    </>
  )
}
export default App