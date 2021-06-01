import * as Realm from "realm-web";
import {ApolloClient, HttpLink, InMemoryCache} from "@apollo/client";
import assert from "assert";
import {loader} from 'graphql.macro';

const typeDefs = loader("./schema.graphql");

export const APP_ID = process.env.REACT_APP_APP_ID;
export const API_KEY = process.env.REACT_APP_API_KEY;
const graphqlUri = `https://us-east-1.aws.stitch.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`;
if (!APP_ID)
    console.error("Please provide an APP_ID")
if (!API_KEY)
    console.error("Please provide an API_KEY")

const app = new Realm.App(APP_ID!);

const loginApiKey = async (apiKey: string): Promise<Realm.User | undefined> => {
    const credentials = Realm.Credentials.apiKey(apiKey);
    try {
        const user: Realm.User = await app.logIn(credentials);
        assert(user.id === app.currentUser?.id)
        return user
    } catch (err) {
        console.error("Failed to log in", err);
    }
}

const getValidAccessToken = async () => {
    if (!app.currentUser) {
        await loginApiKey(API_KEY!);
    } else {
        await app.currentUser.refreshCustomData();
    }
    return app.currentUser?.accessToken
}

export const client = new ApolloClient({
    link: new HttpLink({
        uri: graphqlUri,
        fetch: async (uri, options) => {
            const accessToken = await getValidAccessToken();
            if (options && options.headers) {
                (options.headers as any)['Authorization'] = `Bearer ${accessToken}`;
                console.log(options.headers);
            }
            return fetch(uri, options);
        },
    }),
    cache: new InMemoryCache(),
    typeDefs
});