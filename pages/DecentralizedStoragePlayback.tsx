import { Player } from "@livepeer/react";
import { parseArweaveTxId, parseCid } from "livepeer/media";

import { useMemo, useState } from "react";
import { Box, TextField } from "@mui/material";
const DecentralizedStoragePlayback = () => {
  const [url, setUrl] = useState<string>("");

  const idParsed = useMemo(() => parseCid(url) ?? parseArweaveTxId(url), [url]);

  return (
    <>
      <Box>
        <a>IPFS or Arweave URL</a>
        <TextField
          type="text"
          placeholder="ipfs://... or ar://"
          onChange={(e) => setUrl(e.target.value)}
        />

        {url && !idParsed && <a>Provided value is not a valid identifier.</a>}
      </Box>

      {idParsed && (
        <Player
          title={idParsed.id}
          src={url}
          autoPlay
          muted
          autoUrlUpload={{ fallback: true, ipfsGateway: "https://w3s.link" }}
        />
      )}
    </>
  );
};

export default DecentralizedStoragePlayback;
