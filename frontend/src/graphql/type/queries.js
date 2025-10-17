import { gql } from '@/libs/apollo-client.js';

export const QUERY_ALL_TYPE = gql`
    query GetAllType {
        Types {
            id
            name
            isDelete
            files { id name url isTemplate }
            createdAt
        }
    }
`