import React, { createContext, Dispatch, useReducer, useContext } from "react";
import { Items, Item } from "../types";

export type MainState = {
  items: Items;
};

// CHILD NAV STATE CONTEXT
const MainStateContext = createContext<MainState | undefined>(undefined);

// CHILD NAV ACTIONS
type Action =
  | { type: "ADD_ITEM"; item: Item }
  | { type: "DELETE_ITEM"; id: number }
  | { type: "EDIT_ITEM"; item: Item };

// CHILD NAV DISPATCH CONTEXT
type MainDispatch = Dispatch<Action>;
const MainDispatchContext = createContext<MainDispatch | undefined>(undefined);

function MainReducer(state: MainState, action: Action): MainState {
  switch (action.type) {
    case "ADD_ITEM":
      return { ...state, items: addItem(state.items, action.item) };
    case "DELETE_ITEM":
      return { ...state, items: deleteItem(state.items, action.id) };
    case "EDIT_ITEM":
      return { ...state, items: editItem(state.items, action.item) };
    default:
      throw new Error("Unhandled action");
  }
}

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [MainState, dispatch] = useReducer(MainReducer, {
    items: [
      { id: 1, name: "Item no. 1", parentId: 4 },
      { id: 6, name: "Item no. 6", parentId: 2 },
      { id: 5, name: "Item no. 5", parentId: 0 },
      { id: 2, name: "Item no. 2", parentId: 1 },
      { id: 3, name: "Item no. 3", parentId: 2 },
      { id: 9, name: "Item no. 9", parentId: 0 },
      { id: 10, name: "Item no. 10", parentId: 5 },
      { id: 7, name: "Item no. 7", parentId: 10 },
      { id: 4, name: "Item no. 4", parentId: 0 },
      { id: 8, name: "Item no. 8", parentId: 5 },
    ],
  });

  return (
    <MainDispatchContext.Provider value={dispatch}>
      <MainStateContext.Provider value={MainState}>
        {children}
      </MainStateContext.Provider>
    </MainDispatchContext.Provider>
  );
};

export function useMainState() {
  const state = useContext(MainStateContext);
  if (!state) throw new Error("MainState Context Provider not found");
  return state;
}

export function useMainDispatch() {
  const dispatch = useContext(MainDispatchContext);
  if (!dispatch) throw new Error("MainDispatch Context Provider not found");
  return dispatch;
}

export default ContextProvider;

const addItem = (items: Items, item: Item) => {
  const ids: Array<number> = [];
  items.map((item) => {
    if (item) {
      ids.push(item.id);
    }
  });
  const maxId = Math.max(...ids);
  return [
    ...items,
    {
      id: maxId + 1,
      name: item.name,
      parentId: item.parentId,
    },
  ];
};

const deleteItem = (items: Items, id: number) => {
  const newItems: Items = [...items];
  const children: Items = newItems.filter((i) => i && i.parentId === id);

  const index = newItems.findIndex((i) => i && i.id === id);
  if (index !== -1) {
    newItems.splice(index, 1);
  }
  removeChildren(newItems, children);
  return newItems;
};

const removeChildren = (newItems: Items, children: Items) => {
  return children.map((child) => {
    if (child && child.id) {
      const childs: Items = newItems.filter(
        (i) => i && i.parentId === child.id
      );
      const index = newItems.findIndex((i) => i && i.id === child.id);
      if (index !== -1) {
        newItems.splice(index, 1);
      }
      removeChildren(newItems, childs);
    }
  });
};

const editItem = (items: Items, item: Item) => {
  const newItems = [...items];
  const index = newItems.findIndex((i) => i && i.id === item.id);
  if (index !== -1) {
    newItems[index] = item;
  }
  return newItems;
};
