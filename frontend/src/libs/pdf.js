import * as pdfjsLib from 'pdfjs-dist/build/pdf'

// Cấu hình worker theo chuẩn ESM
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url
).toString()

export { pdfjsLib }
