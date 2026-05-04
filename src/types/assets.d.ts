declare module "*.svg" {
  const value: {
    src: string;
    height: number;
    width: number;
    blurWidth?: number;
    blurHeight?: number;
  };
  export default value;
}
