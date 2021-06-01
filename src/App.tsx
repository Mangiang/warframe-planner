import React from 'react';
import './App.css';
import {Box} from "@material-ui/core";
import {useQuery} from "@apollo/client";
import gql from "graphql-tag";

export const App = () => {
    const {loading, error, data} = useQuery(gql`
        query {
            recipes (sortBy: NAME_ASC, limit: 1000){
                name
            }
        }
    `);

    if (loading) {
        console.log(loading)
        return <div>loading</div>
    }
    if (error) {
        console.log(error)
        return <div>encountered an error: {JSON.stringify(error)}</div>
    }

    console.log(data)
    return (
        <Box className="App">
            <ul>
                {
                    data.recipes.filter((elt: any) => elt.name?.length > 0).map((elt: any) => <li key={elt.name}>{elt.name}</li>)
                }
            </ul>
        </Box>
    );
}