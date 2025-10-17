import { gql } from '@/libs/apollo-client.js';

// Upload file lên Cloud (Cloudinary)
export const UPLOAD_FILE_CLOUD = gql`
  mutation UploadFileCloud(
    $file: Upload!,
    $name: String!,
    $isTemplate: Boolean!,
    $typeId: ID!,
    $userId: ID!
  ) {
    uploadFileCloud(file: $file, name: $name, isTemplate: $isTemplate, typeId: $typeId, userId: $userId) {
      id
      name
      url
      isTemplate
      type { id name }
      user { id name }
      createdAt
    }
  }
`