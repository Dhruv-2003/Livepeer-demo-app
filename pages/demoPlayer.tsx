import { Player } from "@livepeer/react";

import Image from "next/image";

const playbackId =
  "bafybeida3w2w7fch2fy6rfvfttqamlcyxgd3ddbf4u25n7fxzvyvcaegxy";

import blenderPoster from "../public/livepeer.png";

const PosterImage = () => {
  return (
    <Image
      src={blenderPoster}
      priority
      placeholder="blur"
      alt="https://www.google.com/url?sa=i&url=https%3A%2F%2Flivepeer.org%2F&psig=AOvVaw3VFDlIA-udrgWpFzEEg3rV&ust=1672508393340000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCKCQm7fxofwCFQAAAAAdAAAAABAE"
    />
  );
};

const DemoPlayer = () => {
  return (
    <Player
      title="Waterfalls"
      playbackId={playbackId}
      showPipButton
      showTitle={false}
      aspectRatio="16to9"
      poster={<PosterImage />}
      controls={{
        autohide: 3000,
      }}
      theme={{
        borderStyles: { containerBorderStyle: "hidden" },
        radii: { containerBorderRadius: "10px" },
      }}
    />
  );
};

export default DemoPlayer;
