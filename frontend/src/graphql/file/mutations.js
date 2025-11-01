import { gql } from '@/libs/apollo-client.js';

// Upload file lên Cloud (Cloudinary)
export const UPLOAD_FILE_CLOUD = gql`
  mutation UploadFileCloud(
    $file: Upload!,
    $name: String!,
    $isTemplate: Boolean!,
    $typeName: String!,
    $userId: ID!
  ) {
    uploadFileCloud(file: $file, name: $name, isTemplate: $isTemplate, typeName: $typeName, userId: $userId) {
      id
      name
      url
      isTemplate
      typeName
      user { id name }
      createdAt
    }
  }
`