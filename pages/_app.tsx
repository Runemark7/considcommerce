import '../styles/globals.scss'
import "../styles/main.scss"
import type { AppProps } from 'next/app'
import Layout from "../components/layout";
import { wrapper } from "../store/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import {Provider, useStore} from "react-redux";

export default wrapper.withRedux(({ Component, pageProps }: AppProps) => {

    const store = useStore()
    const persistor = persistStore(store)

    return(
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={<div>Fetching data...</div>}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </PersistGate>
        </Provider>
   )
});

