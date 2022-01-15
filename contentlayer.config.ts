/* eslint-disable import/no-unresolved */
import { defineDocumentType, makeSource } from 'contentlayer/source-files';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: 'posts/**/*.mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true
    }
  }
}));

export const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: 'pages/**/*.mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true
    }
  }
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, Page],
  markdown: {
    rehypePlugins: []
  }
});
