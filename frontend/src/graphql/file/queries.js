import { gql } from '@/libs/apollo-client.js';

export const GET_ALL_FILES_NO_TEMPLATE = gql`
  query GetFiles {
    files {
      id
      name
      url
      isTemplate
      type { id name }
      user { id name }
      ocrFields { id name value }
      ocr { id name result }
      createdAt
    }
  }
`

export const GET_FILE_ID_NO_TEMPLATE = gql`
  query GetFile($id: ID!) {
    file(id: $id) {
      id
      name
      url
      isTemplate
      type { id name }
      user { id name }
      ocrFields { id name value }
      ocr { id name result }
      createdAt
    }
  }
`

export const GET_ALL_FILE_TEMPLATES = gql`
  query FileTemplate {
    fileTemplate {
      id
      name
      url
      type { id name }
      user { id name }
      createdAt
    }
  }
`

export const GET_FILE_TEMPLATE_BY_ID = gql`
  query FileTemplateId($id: ID!) {
    fileTemplateId(id: $id) {
      id
      name
      url
      type { id name }
      user { id name }
      createdAt
    }
  }
`
export const GET_FILE_CHILDREN_BY_TEMPLATE = gql`
  query FileChildrenByTemplate($templateId: ID!) {
    fileChildrenByTemplate(templateId: $templateId) {
      id
      name
      url
      type { id name }
      user { id name }
      createdAt
    }
  }
`