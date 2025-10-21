import { useState } from 'react';

import type { HelloDto } from '@app/common';

import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

import styles from './App.module.scss';

const classNames = (...classes: (string | null | undefined)[]) => {
  return classes
    .map((value) => value?.trim())
    .filter((value) => !!value?.length)
    .join(' ');
};

function App() {
  const [greeting, setGreeting] = useState<string>();

  const handleGreeting = () => {
    fetch('/api/hello?name=React%2BVite')
      .then((res) => res.json() as Promise<HelloDto>)
      .then((data) => setGreeting(data.message));
  };

  return (
    <main className={styles.main}>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className={styles.logo} alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className={classNames(styles.logo, styles.react)}
            alt="React logo"
          />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className={styles.card}>
        <button onClick={handleGreeting}>
          {greeting ? greeting : 'Greet Me'}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className={styles.readTheDocs}>
        Click on the Vite and React logos to learn more
      </p>
    </main>
  );
}

export default App;
