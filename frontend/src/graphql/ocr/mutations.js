import { gql } from '@/libs/apollo-client.js';

export const UPLOAD_FILES = gql`
    mutation UploadFiles($templateId: ID!, $userId: ID!, $files: [Upload!]!) {
        uploadFiles(templateId: $templateId, userId: $userId, files: $files) {
            id
            name
            typeName
            url
            isTemplate
        }
    }
`

export const CREATE_OCR_FIELDS = gql`
    mutation CreateOCRField($fileId: ID!, $fieldName: String!, $x: Int!, $y: Int!, $width: Int!, $height: Int!) {
        createOCRField(fileId: $fileId, fieldName: $fieldName, x: $x, y: $y, width: $width, height: $height) {
            id
            fieldName
            x
            y
            width
            height
            createdAt
        }
    }
`

export const CREATE_MANY_OCR_FIELDS = gql`
    mutation CreateManyOCRField($name: String!, $email: String!, $password: String!) {
        createManyOCRField(name: $name, email: $email, password: $password) {
            id
            name
            email
        }
    }
`

export const UPDATE_OCR_FIELDS = gql`
    mutation UpdateOCRField($name: String!, $email: String!, $password: String!) {
        updateOCRField(name: $name, email: $email, password: $password) {
            id
            name
            email
        }
    }
`

export const DELETE_OCR_FIELDS = gql`
    mutation DeleteOCRField($name: String!, $email: String!, $password: String!) {
        deleteOCRField(name: $name, email: $email, password: $password) {
            id
            name
            email
        }
    }
`

export const UPLOAD_BULK_FILES = gql`
    mutation UploadFiles($name: String!, $email: String!, $password: String!) {
        uploadFiles(name: $name, email: $email, password: $password) {
            id
            name
            email
        }
    }
`

export const CREATE_OCR = gql`
    mutation CreateOCR($name: String!, $email: String!, $password: String!) {
        createOCR(name: $name, email: $email, password: $password) {
            id
            name
            email
        }
    }
`

export const RUN_OCR = gql`
    mutation RunOCR($name: String!, $email: String!, $password: String!) {
        runOCR(name: $name, email: $email, password: $password) {
            id
            name
            email
        }
    }
`