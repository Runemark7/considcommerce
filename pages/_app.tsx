import '../styles/globals.scss'
import "../styles/main.scss"
import type { AppProps } from 'next/app'
import Layout from "../components/layout";
import { wrapper } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from 'redux-persist';
import { HookHandler } from "../core/hooks";
import {Provider} from "react-redux";

export default (({ Component, ...rest }: AppProps) => {

    const { store, props } = wrapper.useWrappedStore(rest)
    const { pageProps } = props;
    const persistor = persistStore(store)


    return (
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={<div>Loading</div>}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </PersistGate>
        </Provider>
    )
});

export const hooks:HookHandler = new HookHandler()
