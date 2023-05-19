import React, { useEffect, useReducer } from 'react';
import './app.css';

const initialState = {
  isLoading: true,
  data: [],
  error: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'success': {
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    }
    case 'error': {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    default:
      throw new Error(`Unknown action type ${action.type}`);
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoading, data, error } = state;

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: 'success', payload: data });
      })
      .catch(() => {
        dispatch({ type: 'error', payload: 'Something Went Wrong!' });
      });
  }, []);

  return (
    <div>
      {isLoading ? (
        'Loading...'
      ) : (
        <ul>
          {data.map((item) => (
            <li>{item.title}</li>
          ))}
        </ul>
      )}
      <h3>{error ? error : null}</h3>
    </div>
  );
};
export default App;

// import React, { useEffect, useReducer } from 'react';
// import './app.css';

// const initialState = {
//   isLoading: true,
//   data: {},
//   error: '',
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'success': {
//       return {
//         ...state,
//         isLoading: false,
//         data: action.payload,
//       };
//     }
//     case 'error': {
//       return {
//         ...state,
//         isLoading: false,
//         error: action.payload,
//       };
//     }
//     default:
//       throw new Error(`Unknown action type ${action.type}`);
//   }
// };

// const App = () => {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const { isLoading, data, error } = state;

//   useEffect(() => {
//     fetch('https://jsonplaceholder.typicode.com/todos/1')
//       .then((response) => response.json())
//       .then((data) => {
//         dispatch({ type: 'success', payload: data });
//       })
//       .catch(() => {
//         dispatch({ type: 'error', payload: 'Something Went Wrong!' });
//       });
//   }, []);

//   return (
//     <div>
//       <h3>{isLoading ? 'Loading...' : data.title}</h3>
//       <h3>{error ? error : null}</h3>
//     </div>
//   );
// };
// export default App;