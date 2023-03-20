import { useEffect, useState } from 'react';
import throttle from 'lodash.throttle';
import useThrottle from './hooks/useThrottle';
import useDebounce from './hooks/useDebounce';

function App() {
  const [scrollPosition, setscrollPosition] = useState(0);
  const [text, setText] = useState('');
  const debouncedText = useDebounce(text, 1000);

  // 방법 1: lodash.throttle 사용
  const handleScroll = throttle(() => {
    console.log('handling scroll');
    setscrollPosition(Math.round(window.scrollY));
  }, 100);

  // 방법 2: custom hook 사용
  const hs = useThrottle(handleScroll, 10);

  useEffect(() => {
    window.addEventListener('scroll', hs);

    return () => {
      window.removeEventListener('scroll', hs);
    };
  }, []);

  return (
    <div
      style={{
        height: '5000px',
      }}
    >
      <div
        style={{
          height: 5,
          position: 'fixed',
          left: 0,
          top: 0,
          backgroundColor: 'royalblue',
          width: `${scrollPosition / 38}%`,
          transition: 'width 0.2s ease-out',
        }}
      ></div>
      <h2
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
        }}
      >
        Current scroll position:{' '}
        <span
          style={{
            color: 'royalblue',
          }}
        >
          {scrollPosition}
        </span>{' '}
        px
      </h2>

      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <input
          style={{
            width: '100%',
            outline: 'none',
            padding: '10px',
            fontSize: '1.2rem',
          }}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <p>
          Debounced Value :{' '}
          <span
            style={{
              color: 'royalblue',
              fontWeight: 'bold',
            }}
          >
            {debouncedText}
          </span>
        </p>
      </div>
    </div>
  );
}

export default App;
