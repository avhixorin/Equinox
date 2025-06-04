"use client";
import { ApolloProvider } from "@apollo/client";
import { Provider as ReduxProvider } from "react-redux";
import client from "@/lib/apolloClient";
import { store, persistor } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
