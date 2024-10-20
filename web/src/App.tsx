import React, { useEffect, useState } from "react";
import { debugData } from "./utils/debugData";
import { useNuiEvent } from "./hooks/useNuiEvent";
import { InteractionData } from "./components/Interact";

import Interaction from "./components/Interact";
import { fetchNui } from "./utils/fetchNui";

{
  debugData([
    {
      action: "setVisible",
      data: true,
    },
  ]);

  debugData([
    {
      action: "updateInteraction",
      data: {
        id: "123123",
        options: [
          { text: "Pickup Pistol", icon: "house", disable: false },
          { text: "Pickup Pistol", icon: "house", disable: false },
          { text: "Pickup Pistol", icon: "house", disable: false },
        ],
      },
    },
  ]);
}

const App: React.FC = () => {
  const [pause, setPause] = useState<boolean>(false);
  const [interaction, setInteraction] = useState<InteractionData | null>();
  const [color, setColor] = useState("rgba(25, 113, 194, 0.65)");

  useNuiEvent<{ x: number; y: number; z: number; w: number }>(
    "setColor",
    (color) => {
      setColor(`rgba(${color.x}, ${color.y}, ${color.z}, ${color.w / 255})`);
    }
  );

  useNuiEvent<boolean>("pause", (paused) => {
    setPause(paused);
  });

  useNuiEvent<InteractionData>("updateInteraction", (newInteraction) => {
    setInteraction(newInteraction);
  });

  useEffect(() => {
    fetchNui("loaded");
  }, []);

  return (
    <>
      {interaction && (
        <Interaction
          key={interaction.id}
          interaction={interaction}
          color={color}
        />
      )}
    </>
  );
};

export default App;
