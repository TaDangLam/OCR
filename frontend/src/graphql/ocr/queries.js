import { gql } from '@/libs/apollo-client.js';

export const QUERY_ALL_FIELDS_TEMPLATE = gql`
    query OcrFieldsTemplate($fileId: ID!) {
        ocrFieldsTemplate(fileId: $fileId) {
            id
            fieldName
            x
            y
            width
            height
            file {
                id
                name
                url
                isTemplate
            }
        }
    }
`

export const QUERY_RESULT_OCR_FILE_CHLDREN = gql`
    query OcrFile($fileId: ID!) {
        ocrFile(fileId: $fileId) {
            id
            data
            createdAt
            file {
                id
                name
                url
                isTemplate
            }
        }
    }
`

export const QUERY_RESULT_OCR_ALL_CHILDREN_FILE_BY_TEMPLATE = gql`
    query OcrResultsByTemplate($templateId: ID!) {
        ocrResultsByTemplate(templateId: $templateId) {
            id
            data
            createdAt
            file {
                id
                name
                url
            }
        }
    }
`