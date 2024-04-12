import { configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { contactsReducer } from "./contactsSlice";
import { filterReducer } from "./filtersSlice";


const contactPersistConfig = {
    key: "contacts",
    storage,
    whitelist: ["contacts"],
  };
  const filterPersistConfig = {
    key: "filters",
    storage,
  };

export const store = configureStore({
    reducer: {
       contact: persistReducer(contactPersistConfig, contactsReducer),
       filter: persistReducer(filterPersistConfig, filterReducer ) 
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);