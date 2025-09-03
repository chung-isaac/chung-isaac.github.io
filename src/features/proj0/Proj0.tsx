import { useState } from "react";

import closeUp from "./assets/closeUp.jpeg";
import zoomed from "./assets/zoomed.jpeg";
import back from "./assets/back.jpeg";
import forward from "./assets/forward.jpeg";
import blahaj from "./assets/blahaj.gif";

function ToggleImage() {
    const [toggled, setToggled] = useState(false);
    return (
        <button
            type="button"
            onClick={() => setToggled((v) => !v)}
            className="inline-block"
            aria-pressed={toggled}
            aria-label={toggled ? "Show before image" : "Show after image"}
        >
            <img
                src={toggled ? back : forward}
                alt={toggled ? "After state" : "Before state"}
            />
        </button>
    );
}

export default function Proj0() {
    return (
        <main className="flex flex-col items-center gap-8">
            <h1 className="text-3xl font-bold">
                Project #0
            </h1>

            <p className="italic">
                by Isaac :)
            </p>

            <p>
                Welcome to Proj0! I explored three exercises that only needed a simple camera. I used my Sony ZV-E10,
                a camera I borrowed from my dad.
            </p>

            <div className="my-8 h-px w-full bg-white" />

            <h2 className="text-2xl font-semibold">
                Selfie
            </h2>

            <p>
                I actually learned this trick from somewhere (I forgot): if you zoom in on your phone even a tiny bit,
                it makes the photo look a lot better. I think this is because the "fisheye" distortion on the edges
                gets cropped out if you zoom in.
            </p>

            <div className="flex justify-center gap-4">
                <div className="flex flex-col items-center gap-4 max-w-lg">
                    <img src={closeUp} alt="Close up photo of Isaac Chung" className="w-full h-auto" />
                    <p className="italic">
                        "Normal" Close-Up
                    </p>
                </div>
                <div className="flex flex-col items-center gap-4 max-w-lg">
                    <img src={zoomed} alt="Normal zoomed-in photo of Isaac Chung" className="w-full h-auto" />
                    <p className="italic">
                        Zoomed In
                    </p>
                </div>
            </div>

            <div className="my-8 h-px w-full bg-white" />

            <h2 className="text-2xl font-semibold">
                Perspective
            </h2>
            <p>
                It's a bit dark, but when you switch between the two images you can see the perspective change in a weird way.
            </p>
            <div className="flex justify-center gap-4 max-w-lg">
                <ToggleImage />
            </div>
            <p className="italic">
                (Click the image!)
            </p>

            <div className="my-8 h-px w-full bg-white" />

            <h2 className="text-2xl font-semibold">
                The Dolly Zoom
            </h2>

            <img src={blahaj} alt="Animated gif of shark dolly effect" className="w-auto h-auto" />

            <p className="italic">
                The Dolly Zoom, demonstrated on my beloved shark.
            </p>

        </main>
    );
}
