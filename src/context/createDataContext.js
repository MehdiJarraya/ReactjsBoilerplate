import React, { useReducer } from 'react';

//We use this  function to automate the creation of context file
// So rather than having  repetitive process (1-calling create context 2- setting up the provider) on each context file

export default (reducer, actions, initialState) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // actions === { addBlogPost: (dispatch) => { return () => {} } }
    // To make dispatch available when using action
    const boundActions = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
        // any data that we want to share with the rest of our application is going to be available on the value prop(global var State, action)
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};