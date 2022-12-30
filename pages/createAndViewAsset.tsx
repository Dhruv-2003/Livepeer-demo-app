import { useCreateAsset, useAssetMetrics, Player } from "@livepeer/react";

import { useCallback, useState, useMemo } from "react";
import { useDropzone } from "react-dropzone";

import { Button, Box, Badge } from "@mui/material";

const CreateAndViewAsset = () => {
  const [video, setVideo] = useState<File | undefined>();
  const {
    mutate: createAsset,
    data: asset,
    status,
    progress,
    error: createError,
  } = useCreateAsset(
    video
      ? {
          sources: [{ name: video.name, file: video }] as const,
        }
      : null
  );

  const { data: metrics } = useAssetMetrics({
    assetId: asset?.[0].id,
    refetchInterval: 30000,
  });

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0 && acceptedFiles?.[0]) {
      setVideo(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "video/*": ["*.mp4"],
    },
    maxFiles: 1,
    onDrop,
  });

  const isLoading = useMemo(
    () =>
      status === "loading" ||
      (asset?.[0] && asset[0].status?.phase !== "ready"),
    [status, asset]
  );

  const progressFormatted = useMemo(
    () =>
      progress?.[0].phase === "failed"
        ? "Failed to process video."
        : progress?.[0].phase === "waiting"
        ? "Waiting"
        : progress?.[0].phase === "uploading"
        ? `Uploading: ${Math.round(progress?.[0]?.progress * 100)}%`
        : progress?.[0].phase === "processing"
        ? `Processing: ${Math.round(progress?.[0].progress * 100)}%`
        : null,
    [progress]
  );

  return (
    <Box>
      {!asset && (
        <Box sx={{ display: "flex" }}>
          <Box {...getRootProps()}>
            <Box {...getInputProps()} />
            <Box>
              <a>Drag and drop or browse files</a>
            </Box>
          </Box>
        </Box>
      )}

      {asset?.[0]?.playbackId && (
        <Player title={asset[0].name} playbackId={asset[0].playbackId} />
      )}

      {createError?.message && <a>{createError.message}</a>}

      <Box sx={{ display: "flex" }}>
        <Box sx={{ display: "flex" }}>
          {metrics?.metrics?.[0] && (
            <Badge>Views: {metrics?.metrics?.[0]?.startViews}</Badge>
          )}
          {video ? (
            <Badge>{video.name}</Badge>
          ) : (
            <a>Select a video file to upload.</a>
          )}
          {progressFormatted && <a>{progressFormatted}</a>}
        </Box>
        {!asset?.[0].id && (
          <Button
            onClick={() => {
              createAsset?.();
            }}
            disabled={isLoading || !createAsset}
          >
            Upload
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default CreateAndViewAsset;
