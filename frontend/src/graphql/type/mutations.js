import { gql } from '@/libs/apollo-client.js';

export const ADD_NEW_TYPE = gql`
    mutation AddType($name: String!) {
        createType(name: $name) {
            id
            name
            createdAt
        }
    }
`

export const UPDATE_TYPE = gql`
    mutation UpdateType($id: ID!, $name: String!) {
        updateType(id: $id, name: $name) {
            id
            name
            isDelete
        }
    }
`

export const DELETE_TYPE = gql`
    mutation DeleteType($id: ID!) {
        deleteType(id: $id) {
            success
            message
        }
    }
`