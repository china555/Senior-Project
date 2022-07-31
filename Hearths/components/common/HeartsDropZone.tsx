import { Box, Input, Text } from "@chakra-ui/react";
import { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";

interface IHeartsDropzoneProps {
  onUploadFile: (files: File[]) => void;
  acceptType: string;
}
export const HeartsDropzone = ({
  onUploadFile,
  acceptType,
}: IHeartsDropzoneProps) => {
  const onDrop = useCallback((acceptedFiles) => {
    onUploadFile(acceptedFiles);
    // Do something with the files
  }, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: acceptType, onDrop });

  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  };

  const activeStyle = {
    borderColor: "#2196f3",
  };

  const acceptStyle = {
    borderColor: "#00e676",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
  };

  const style = useMemo(
    () =>
      ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {}),
      } as React.CSSProperties),
    [isDragActive, isDragReject, isDragAccept]
  );
  return (
    <Box className="container">
      <Box w="100%" {...getRootProps({ className: "dropzone", style })}>
        <Input {...(getInputProps() as any)} />
        {isDragActive ? (
          <Text>Drop the files here ...</Text>
        ) : (
          <Text>Drag n drop some files here, or click to select files</Text>
        )}
      </Box>
    </Box>
  );
};
