import { useCreateStream, LivepeerProvider, Player } from "@livepeer/react";

import { useState } from "react";

import { Button, Box, TextField } from "@mui/material";

const Stream = () => {
  const [streamName, setStreamName] = useState<string>("");
  const {
    mutate: createStream,
    data: stream,
    status: createStatus,
  } = useCreateStream<LivepeerProvider>({ name: streamName, record: false });

  return (
    <Box>
      <Box>
        <TextField
          type="text"
          placeholder="Stream name"
          onChange={(e) => setStreamName(e.target.value)}
        />
      </Box>

      {stream?.playbackId && (
        <Player
          title={stream?.name}
          playbackId={stream?.playbackId}
          autoPlay
          muted
        />
      )}

      <Button
        onClick={() => {
          createStream?.();
        }}
        disabled={createStatus === "loading" || !createStream}
      >
        Create Stream
      </Button>
    </Box>
  );
};

export default Stream;
