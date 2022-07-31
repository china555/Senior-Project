import Cookies from "js-cookie";
import { Dispatch, SetStateAction } from "react";
import Dropzone, { IDropzoneProps } from "react-dropzone-uploader";
import { url } from "../../constant";
interface IDropzone {
  setvideoPath: Dispatch<SetStateAction<string>>;
  setuploadStatus: Dispatch<SetStateAction<string>>;
}
export const HeartsDropzoneVideo = (props: IDropzone) => {
  const { setuploadStatus, setvideoPath } = props;
  const getUploadParams: IDropzoneProps["getUploadParams"] = ({
    file,
    meta,
  }) => {
    const body = new FormData();
    body.append("videoUpload", file);
    return {
      url: `${url}/upload/home/program/video`,
      body,
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    };
  };
  const handleChangeStatus: IDropzoneProps["onChangeStatus"] = (
    { meta, file, xhr },
    status
  ) => {
    if (status === "done") {
      let response = JSON.parse(xhr?.response);
      setvideoPath(response.path);
      setuploadStatus(status);
    }
  };

  const handleSubmit: IDropzoneProps["onSubmit"] = (files, allFiles) => {
    console.log(files.map((f) => f.meta));
    allFiles.forEach((f) => f.remove());
  };

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      accept="video/*"
      inputContent={(files, extra) =>
        extra.reject ? "video files only" : "Drag Files"
      }
      styles={{
        dropzoneReject: { borderColor: "red", backgroundColor: "#DAA" },
        inputLabel: (files, extra) => (extra.reject ? { color: "red" } : {}),
      }}
    />
  );
};
