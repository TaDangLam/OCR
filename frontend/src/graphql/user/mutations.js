import { gql } from '@/libs/apollo-client.js';

export const REGISTER_USER = gql`
    mutation Register($name: String!, $email: String!, $password: String!) {
        register(name: $name, email: $email, password: $password) {
            id
            name
            email
        }
    }
`

export const LOGIN_USER = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            accessToken
            refreshToken
            user {
                id
                name
                email
            }
        }
    }
`

export const UPDATE_USER = gql`
    mutation UpdateUser($id: ID!, $name: String!, $email: String!, $password: String!) {
        updateUser(id: $id, name: $name, email: $email, password: $password) {
            id
            name
            email
            createdAt           
        }
    }
`

export const DELETE_USER = gql`
    mutation DeleteUser($id: ID!) {
        deleteUser(id: $id) {
            success
            message
        }
    }
`