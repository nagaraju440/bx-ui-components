export type TextEditorAssetUploadResult = {
  publicDownloadUrl: string;
};

type TextEditorAssetUploader = (file: File) => Promise<TextEditorAssetUploadResult>;

let uploader: TextEditorAssetUploader | null = null;

export const configureBxUiTextEditorAssetUploader = (nextUploader: TextEditorAssetUploader) => {
  uploader = nextUploader;
};

export const uploadTextEditorAssetToS3 = async (file: File) => {
  if (!uploader) {
    throw new Error(
      "bx-ui-components: configureBxUiTextEditorAssetUploader must be called before image uploads can be used."
    );
  }

  return uploader(file);
};
