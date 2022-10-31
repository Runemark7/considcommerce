import '../styles/globals.scss'
import "../styles/main.scss"
import type { AppProps } from 'next/app'
import Layout from "../components/layout";
import { wrapper } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from 'redux-persist';

export default wrapper.withRedux(({ Component, ...rest }: AppProps) => {

    const {store, props} = wrapper.useWrappedStore(rest)

    return (typeof window === "undefined") ? (
        <PersistGate persistor={persistStore(store)} loading={null}>
            <Layout>
                <Component {...props.pageProps} />
            </Layout>
        </PersistGate>
    ): (
        <PersistGate persistor={persistStore(store)} loading={null}>
            <Layout>
                <Component {...props.pageProps} />
            </Layout>
        </PersistGate>
    )
});

