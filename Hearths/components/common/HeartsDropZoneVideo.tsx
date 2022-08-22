import Cookies from "js-cookie";
import { Dispatch, SetStateAction } from "react";
//@ts-ignore
import Dropzone from "react-dropzone-uploader";
import { url } from "../../constant";
interface IDropzone {
  setvideoPath: Dispatch<SetStateAction<string>>;
  setuploadStatus: Dispatch<SetStateAction<string>>;
}
export const HeartsDropzoneVideo = (props: IDropzone) => {
  const { setuploadStatus, setvideoPath } = props;
  const getUploadParams = ({ file }: any) => {
    const formData = new FormData();
    formData.append("file", file);
    const options = { content: formData };
    return {
      url: `${url}/upload/home/program/video`,
      formData,
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      options,
    };
  };
  const handleChangeStatus = ({ meta, file, xhr }: any, status: any) => {
    if (status === "done") {
      let response = JSON.parse(xhr?.response);
      setvideoPath(response.path);
      setuploadStatus(status);
    }
  };

  const handleSubmit = (files: any, allFiles: any) => {
    console.log(files.map((f: any) => f.meta));
    allFiles.forEach((f: any) => f.remove());
  };

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      accept="video/*"
      inputContent={(files: any, extra: any) =>
        extra.reject ? "video files only" : "Drag Files"
      }
      styles={{
        dropzoneReject: { borderColor: "red", backgroundColor: "#DAA" },
        inputLabel: (files: any, extra: any) =>
          extra.reject ? { color: "red" } : {},
      }}
    />
  );
};
