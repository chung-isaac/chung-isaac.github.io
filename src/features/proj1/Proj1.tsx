import cathedral from "./assets/cathedral_custom_chungi_color_12.jpg";
import cheremukha from "./assets/cheremukha_custom_chungi_color_12.jpg";
import church from "./assets/church_custom_chungi_color_12.jpg";
import emir from "./assets/emir_custom_chungi_color_12.jpg";
import estate from "./assets/estate_custom_chungi_color_12.jpg";
import girvas_waterfall from "./assets/girvas_waterfall_custom_chungi_color_12.jpg";
import harvesters from "./assets/harvesters_custom_chungi_color_12.jpg";
import icon from "./assets/icon_custom_chungi_color_12.jpg";
import italil from "./assets/italil_custom_chungi_color_12.jpg";
import lastochikino from "./assets/lastochikino_custom_chungi_color_12.jpg";
import lugano from "./assets/lugano_custom_chungi_color_12.jpg";
import melons from "./assets/melons_custom_chungi_color_12.jpg";
import monastery from "./assets/monastery_custom_chungi_color_12.jpg";
import moscow_river from "./assets/moscow_river_custom_chungi_color_12.jpg";
import self_portrait from "./assets/self_portrait_custom_chungi_color_12.jpg";
import siren from "./assets/siren_custom_chungi_color_12.jpg";
import sunset from "./assets/sunset_custom_chungi_color_12.jpg";
import three_generations from "./assets/three_generations_custom_chungi_color_12.jpg";
import tobolsk from "./assets/tobolsk_custom_chungi_color_12.jpg";

import offsets from "./assets/offsets.json";

const imageMap: Record<string, string> = {
    cathedral: cathedral,
    church: church,
    emir: emir,
    harvesters: harvesters,
    icon: icon,
    italil: italil,
    lastochikino: lastochikino,
    lugano: lugano,
    melons: melons,
    monastery: monastery,
    self_portrait: self_portrait,
    siren: siren,
    three_generations: three_generations,
    tobolsk: tobolsk,
    cheremukha: cheremukha,
    estate: estate,
    girvas_waterfall: girvas_waterfall,
    moscow_river: moscow_river,
    sunset: sunset,
};

export default function Proj0() {
    return (
        <main className="flex flex-col items-center gap-8">
            <h1 className="text-3xl font-bold">
                Project #1
            </h1>

            <p className="italic">
                by Isaac :)
            </p>

            <p>
                Welcome to Proj1! In this project, I colorized images by aligning their color channel photos. 
                We were tasked with colorizing a set of images from the Prokudin-Gorskii photo collection!
                The first five images are custom ones I chose from the collection in the Library of Congress.
            </p>
            <strong>My Python notebook has a detailed walkthrough of my work.</strong>

            <div className="my-8 h-px w-full bg-current" />

            <h2 className="text-2xl font-semibold">
                Gallery
            </h2>

            <div className="flex flex-wrap justify-center gap-6">
                {offsets.map(item => (
                    <div key={item.image}>
                        <img src={imageMap[item.image]} alt={item.image} width="300" />
                        <div>
                            <p>G offset: ({item.G_offset[0]}, {item.G_offset[1]})</p>
                            <p>R offset: ({item.R_offset[0]}, {item.R_offset[1]})</p>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
