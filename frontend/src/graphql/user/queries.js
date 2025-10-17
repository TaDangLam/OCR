import { gql } from '@/libs/apollo-client.js';

export const QUERY_ALL_USER = gql`
    query GetAllUser {
        Users {
            id
            name
            email
            isAdmin
            files { id name url isTemplate }
            createdAt
        }
    }
`

export const QUERY_ALL_USER_ID = gql`
    query GetUserById($id: ID!) {
        User(id: $id) {
            id
            name
            email
            isAdmin
            files { id name url isTemplate }
            createdAt
        }
    }
`
