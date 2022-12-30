import { useAsset, useUpdateAsset } from "@livepeer/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useMemo } from "react";
import { useAccount } from "wagmi";

const assetId = "b4c8bae3-ba34-4623-8d45-6124c1e7ba73";

export const WagmiNft = () => {
  const { address } = useAccount();
  const { mutate: updateAsset, status: updateStatus } = useUpdateAsset({
    assetId,
    storage: {
      ipfs: true,
      // metadata overrides can be added here
      // see the source code behind this example
    },
  });

  /// just updateAsset and storage to IPFS  ,then IPFS URI can be extracted from
  /// asset?.storage?.ipfs?.nftMetadata?.url

  return (
    <Box>
      <ConnectButton />
      {address && assetId && (
        <>
          <Text>{assetId}</Text>
          <Button
            onClick={() => {
              updateAsset?.();
            }}
          >
            Upload to IPFS
          </Button>
        </>
      )}
    </Box>
  );
};
