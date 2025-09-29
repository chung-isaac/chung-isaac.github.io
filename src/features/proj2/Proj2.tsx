import CodeBlock from "../../components/CodeBlock";

import two_loop_isaac from "./assets/2-loop isaac.png";
import four_loop_isaac from "./assets/4-loop isaac.png";
import airpod_hybrid from "./assets/airpod hybrid.png";
import airpod_low from "./assets/airpod low.png";
import airpod from "./assets/airpod.png";
import bottle_hybrid from "./assets/bottle hybrid.png";
import bottle from "./assets/bottle.png";
import bowser from "./assets/bowser.png";
import cameraman_binarized from "./assets/cameraman binarized.png";
import cameraman_blur_edges from "./assets/cameraman blur edges.png";
import cameraman_blur from "./assets/cameraman blur.png";
import cameraman_Dx from "./assets/cameraman Dx.png";
import cameraman_Dy from "./assets/cameraman Dy.png";
import cameraman_final_DoG from "./assets/cameraman final DoG.png";
import cameraman_final from "./assets/cameraman final.png";
import cameraman_gradient from "./assets/cameraman gradient.png";
import cameraman from "./assets/cameraman.png";
import cat_hybrid from "./assets/cat hybrid.png";
import cat from "./assets/cat.png";
import convolve2d_isaac from "./assets/convolve2d isaac.png";
import DoG_Dx from "./assets/DoG Dx.png";
import DoG_Dy from "./assets/DoG Dy.png";
import Dx_isaac from "./assets/Dx isaac.png";
import Dy_isaac from "./assets/Dy isaac.png";
import fouriers from "./assets/fouriers.png";
import futball from "./assets/futball.png";
import guy from "./assets/guy.png";
import one_piece_blur from "./assets/one piece blur.png";
import one_piece_high from "./assets/one piece high.png";
import one_piece_sharp from "./assets/one piece sharp.png";
import one_piece from "./assets/one piece.png";
import oraple from "./assets/oraple.png";
import original_isaac from "./assets/original isaac.png";
import peashooter_high from "./assets/peashooter high.png";
import peashooter from "./assets/peashooter.png";
import sharpened_images from "./assets/sharpened images.png";
import shoes from "./assets/shoes.png";
import taj_blur from "./assets/taj blur.png";
import taj_high from "./assets/taj high.png";
import taj_sharp from "./assets/taj sharp.png";
import taj from "./assets/taj.png";
import tower from "./assets/tower.png";



export default function Proj2() {
    return (
        <main className="flex flex-col items-center gap-8">
            <h1 className="text-3xl font-bold">
                Project #2
            </h1>

            <p className="italic">
                by Isaac :)
            </p>

            <p>
                Welcome to Proj2! I used filters to blur, sharpen, and blend images. Convolutions and
                Gaussian / Laplacian Stacks were used.
            </p>

            <div className="my-8 h-px w-full bg-current" />
            <h2 className="text-2xl font-semibold">
                Part 1.1: Convolutions from Scratch
            </h2>

            <p>
                What is a convolution? In the 2D sense, it's a way to process an image (as a matrix) by "sliding" a
                filter matrix over the image and calculating values based on that filter. Essentially, for every pixel
                in the image, use the filter to calculate a new value for that pixel based on its neighbors.

                To implement this, we'll need to iterate over every pixel in the image, then, for every pixel, we'll
                need to iterate over all of its neighbors.
            </p>

            <CodeBlock code={`import numpy as np

def naive_convolve(image, kernel):
    img_h, img_w = image.shape
    k_h, k_w = kernel.shape

    # use padded image with zeros so it works on edge pixels
    pad_h, pad_w = k_h // 2, k_w // 2
    padded = np.pad(image, ((pad_h, pad_h), (pad_w, pad_w)), mode='constant')

    result = np.zeros_like(image)

    # for every pixel in the image ...
    for i in range(img_h):
        for j in range(img_w):
        new_value = 0.0
        # for every pixel in the kernel ...
        for m in range(k_h):
            for n in range(k_w):
            new_value += kernel[m, n] * padded[i + m, j + n]
            result[i, j] = new_value

    return result
            `} language="python" className='text-left' />

            <p>
                We can actually optimize this further by utilizing Python array slicing. It only takes 2 loops now:
            </p>

            <CodeBlock code={`def faster_convolve(image, kernel):
    img_h, img_w = image.shape
    k_h, k_w = kernel.shape

    # use padded image with zeros so it works on edge pixels
    pad_h, pad_w = k_h // 2, k_w // 2
    padded = np.pad(image, ((pad_h, pad_h), (pad_w, pad_w)), mode='constant')

    result = np.zeros_like(image)

    # for every pixel in the image ...
    for i in range(img_h):
        for j in range(img_w):
        # for every pixel in the kernel ...
        neighbors = padded[i:i + k_h, j:j + k_w]
        result[i, j] = np.sum(neighbors * kernel)

    return result
            `} language="python" className='text-left' />

            <p>
                Here are results for both implementations of convolvutions, along with scipy's own convolve2d. A 9x9
                box filter was used in all cases.
            </p>

            <div className="flex justify-center gap-4">
                <div className="flex flex-col items-center gap-4 max-w-lg">
                    <img src={original_isaac} className="w-full h-auto" />
                    <p className="italic">
                        Original
                    </p>
                </div>
                <div className="flex flex-col items-center gap-4 max-w-lg">
                    <img src={four_loop_isaac} className="w-full h-auto" />
                    <p className="italic">
                        4-loop Convolution
                    </p>
                </div>
                <div className="flex flex-col items-center gap-4 max-w-lg">
                    <img src={two_loop_isaac} className="w-full h-auto" />
                    <p className="italic">
                        2-loop Convolution
                    </p>
                </div>
                <div className="flex flex-col items-center gap-4 max-w-lg">
                    <img src={convolve2d_isaac} className="w-full h-auto" />
                    <p className="italic">
                        scipy's convolve2d
                    </p>
                </div>
            </div>

            <p>
                It's a bit hard to tell since the image was relatively large for a 9x9 box filter to work, but if you zoom in,
                you can see that all the convolution blurs look the same. The difference was in runtime: this was a large image,
                so the 4-loop actually took 3 minutes. The 2-loop took around 1 minute, and convolve2d was super fast, around 23 seconds.
            </p>

            <p>
                Here are the convolutions of the finite difference operators as well, both done with my faster_convolve():
            </p>

            <div className="flex justify-center gap-4">
                <div className="flex flex-col items-center gap-4 max-w-lg">
                    <img src={Dx_isaac} className="w-full h-auto" />
                    <p className="italic">
                        Dx
                    </p>
                </div>
                <div className="flex flex-col items-center gap-4 max-w-lg">
                    <img src={Dy_isaac} className="w-full h-auto" />
                    <p className="italic">
                        Dy
                    </p>
                </div>
            </div>

            <div className="my-8 h-px w-full bg-current" />
            <h2 className="text-2xl font-semibold">
                Part 1.2: Finite Difference Operator
            </h2>

            <p>
                Now, let's work with the cameraman photo. Take the partial derivatives in x and y using the finite difference operators,
                and also calculate the gradient magnitude image. I still stubbornly used my faster_convolve() instead of convolve2d...
            </p>

            <div className="flex justify-center gap-4">
                <div className="flex flex-col items-center gap-4 max-w-lg">
                    <img src={cameraman} className="w-full h-auto" />
                    <p className="italic">
                        Original
                    </p>
                </div>
                <div className="flex flex-col items-center gap-4 max-w-lg">
                    <img src={cameraman_Dx} className="w-full h-auto" />
                    <p className="italic">
                        Dx
                    </p>
                </div>
                <div className="flex flex-col items-center gap-4 max-w-lg">
                    <img src={cameraman_Dy} className="w-full h-auto" />
                    <p className="italic">
                        Dy
                    </p>
                </div>
                <div className="flex flex-col items-center gap-4 max-w-lg">
                    <img src={cameraman_gradient} className="w-full h-auto" />
                    <p className="italic">
                        Gradient Magnitude
                    </p>
                </div>
            </div>

            <p>
                Then, with my chosen threshold of 0.15, binarize the gradient magnitude for much clearer edges!
            </p>

            <div className="flex justify-center gap-4">
                <div className="flex flex-col items-center gap-4 max-w-lg">
                    <img src={cameraman_binarized} className="w-full h-auto" />
                </div>
            </div>

            <p>
                However, this isn't good enough! Look at all the noise on the grass! This is the best I could do; if I made the threshold
                any higher, I saw that some important edges were lost (mainly on the cameraman's coat). How can we improve this ...
            </p>

            <div className="my-8 h-px w-full bg-current" />
            <h2 className="text-2xl font-semibold">
                Part 1.3: Derivative of Gaussian (DoG) Filter
            </h2>

            <p>
                Let's try blurring the image first (with a Gaussian filter), and then try to find the edges.
            </p>

            <div className="flex justify-center gap-4">
                <div className="flex flex-col items-center gap-4 max-w-lg">
                    <img src={cameraman_blur} className="w-full h-auto" />
                    <p className="italic">
                        Blurred
                    </p>
                </div>
                <div className="flex flex-col items-center gap-4 max-w-lg">
                    <img src={cameraman_blur_edges} className="w-full h-auto" />
                    <p className="italic">
                        Blurred Gradient Magnitude
                    </p>
                </div>
                <div className="flex flex-col items-center gap-4 max-w-lg">
                    <img src={cameraman_final} className="w-full h-auto" />
                    <p className="italic">
                        New Binarized Edges (with a threshold of 0.1)
                    </p>
                </div>
            </div>

            <p>
                It looks so much clearer! The Gaussian filter at the start stops us from being caught on small details.
            </p>

            <p>
                Additionally, we can use Derivatives of Gaussians to efficiently use only one convolution (besides the convolutions
                needed to make the DoGs) with the original image and the DoGs. Here are the Dx and Dy DoGs:
            </p>

            <div className="flex justify-center gap-4">
                <div className="flex flex-col items-center gap-4 max-w-lg">
                    <img src={DoG_Dx} className="w-full h-auto" />
                    <p className="italic">
                        Dx
                    </p>
                </div>
                <div className="flex flex-col items-center gap-4 max-w-lg">
                    <img src={DoG_Dy} className="w-full h-auto" />
                    <p className="italic">
                        Dy
                    </p>
                </div>
            </div>

            <p>
                We get essentially the same result.
            </p>

            <div className="flex justify-center gap-4">
                <div className="flex flex-col items-center gap-4 max-w-lg">
                    <img src={cameraman_final} className="w-full h-auto" />
                    <p className="italic">
                        Original Result using 2 Convolutions (threshold 0.15)
                    </p>
                </div>
                <div className="flex flex-col items-center gap-4 max-w-lg">
                    <img src={cameraman_final_DoG} className="w-full h-auto" />
                    <p className="italic">
                        Result using DoG (threshold 0.3)
                    </p>
                </div>
            </div>

            <div className="my-8 h-px w-full bg-current" />
            <h2 className="text-2xl font-semibold">
                Part 2.1: Image "Sharpening"
            </h2>

            <p>
                In this part, we "sharpen" images by getting their high frequencies, and adding them back to the original image.
                Since higher frequencies are interpreted as "details" of an image, the images look more "sharp." Me personally I'm not
                100% sold but ...
            </p>

            <p>
                I used something called an unsharp mask filter. It essentially boosts the high frequencies of an image by subtracting
                its blurred version, which has the low frequencies, from the original image. Then, it adds these high frequencies back to 
                the original image to complete the sharpen effect.
            </p>

            <p>
                Here is the Taj Mahal, sharpened, and how it got there!
            </p>

            <div className="flex justify-center gap-4">
                <div className="flex flex-col items-center gap-4 max-w-lg">
                    <img src={taj} className="w-full h-auto" />
                    <p className="italic">
                        Original
                    </p>
                </div>
                <div className="flex flex-col items-center gap-4 max-w-lg">
                    <img src={taj_blur} className="w-full h-auto" />
                    <p className="italic">
                        Blurred
                    </p>
                </div>
                <div className="flex flex-col items-center gap-4 max-w-lg">
                    <img src={taj_high} className="w-full h-auto" />
                    <p className="italic">
                        High Frequencies
                    </p>
                </div>
                <div className="flex flex-col items-center gap-4 max-w-lg">
                    <img src={taj_sharp} className="w-full h-auto" />
                    <p className="italic">
                        Sharpened
                    </p>
                </div>
            </div>

            <p>
                Here is the same process on a different image! I've been listening to this song ...
            </p>

            <div className="flex justify-center gap-4">
                <div className="flex flex-col items-center gap-4 max-w-lg">
                    <img src={one_piece} className="w-full h-auto" />
                    <p className="italic">
                        Original
                    </p>
                </div>
                <div className="flex flex-col items-center gap-4 max-w-lg">
                    <img src={one_piece_blur} className="w-full h-auto" />
                    <p className="italic">
                        Blurred
                    </p>
                </div>
                <div className="flex flex-col items-center gap-4 max-w-lg">
                    <img src={one_piece_high} className="w-full h-auto" />
                    <p className="italic">
                        High Frequencies
                    </p>
                </div>
                <div className="flex flex-col items-center gap-4 max-w-lg">
                    <img src={one_piece_sharp} className="w-full h-auto" />
                    <p className="italic">
                        Sharpened
                    </p>
                </div>
            </div>

            <p>
                For the rest I got kinda lazy and just used plt to layout the images 😭 Here you go!
            </p>

            <div className="flex justify-center gap-4">
                <img src={sharpened_images} className="w-full h-auto" />
            </div>

            <p>
                The first image didn't change much since it was really high-res and sharp already. You can actually notice a change on the
                other images I chose though--the second one is most obvious, but look at details like Luffy's fist (guy with hat) and Nami's
                face (girl with orange hair) and the sharpening actually worked!
            </p>

            <p>
                Now, for evaluation, I've gone ahead and blurred this sharp photo of Bowser. Then, I attempted to sharpen it back up again.
                It's still a little deep fried but it's not that bad, actually.
            </p>

            <div className="flex justify-center gap-4">
                <img src={bowser} className="w-full h-auto" />
            </div>

            <p>
                It looks like you cannot really "recreate" all the data that gets lost in something like a Gaussian blur, but at least the
                illusion of sharpness helps a little.
            </p>

            <div className="my-8 h-px w-full bg-current" />
            <h2 className="text-2xl font-semibold">
                Part 2.2: Hybrid Images
            </h2>

            <p>
                For this part, I took the low frequencies of one image, the high frequencies of another, and then mashed them together so that
                from a distance, your eyes see the low frequencies, but from close-up, your eyes see the high frequencies.
            </p>

            <div className="flex justify-center gap-4">
                <div className="flex flex-col items-center gap-4 max-w-lg">
                    <img src={guy} className="w-full h-auto" />
                    <p className="italic">
                        Low Frequencies of Derek
                    </p>
                </div>
                <div className="flex flex-col items-center gap-4 max-w-lg">
                    <img src={cat} className="w-full h-auto" />
                    <p className="italic">
                        High Frequencies of Nutmeg!!! I like cats :)
                    </p>
                </div>
                <div className="flex flex-col items-center gap-4 max-w-lg">
                    <img src={cat_hybrid} className="w-full h-auto" />
                    <p className="italic">
                        Hybrid
                    </p>
                </div>
            </div>

            <p className="italic">
                Note: the tilting and size discrepencies were from the given skeleton functions. I ran them manually in a local IDE
                and then hardcoded the points.
            </p>

            <p>
                Here's another example with the Salesforce tower in SF (😭) and a water bottle ...
            </p>

            <div className="flex justify-center gap-4">
                <div className="flex flex-col items-center gap-4 max-w-lg">
                    <img src={bottle} className="w-full h-auto" />
                    <p className="italic">
                        Bottle
                    </p>
                </div>
                <div className="flex flex-col items-center gap-4 max-w-lg">
                    <img src={tower} className="w-full h-auto" />
                    <p className="italic">
                        Tower
                    </p>
                </div>
                <div className="flex flex-col items-center gap-4 max-w-lg">
                    <img src={bottle_hybrid} className="w-full h-auto" />
                    <p className="italic">
                        Hybrid
                    </p>
                </div>
            </div>

            <p>
                Notice the order actually matters! The other way around would have a lot more blue. It looked worse, so I opted for this order.
            </p>

            <p>
                Finally, for my personal favorite: the peashooter and the Airpod Pro.
            </p>

            <div className="flex justify-center gap-4">
                <div className="flex flex-col items-center gap-4 max-w-lg">
                    <img src={airpod} className="w-full h-auto" />
                    <p className="italic">
                        Airpod
                    </p>
                </div>
                <div className="flex flex-col items-center gap-4 max-w-lg">
                    <img src={peashooter} className="w-full h-auto" />
                    <p className="italic">
                        Peashooter
                    </p>
                </div>
                <div className="flex flex-col items-center gap-4 max-w-lg">
                    <img src={airpod_hybrid} className="w-full h-auto" />
                    <p className="italic">
                        Hybrid
                    </p>
                </div>
            </div>

            <p>
                Here is also a frequency analysis of all these images and their filters, using Fourier transforms:
            </p>

            <div className="flex justify-center gap-4">
                <img src={fouriers} className="w-full h-auto" />
            </div>

            <p>
                And here are the actual filters of the images. The Airpod one is barely visible, but there are a lot of nonzero values.
            </p>

            <div className="flex justify-center gap-4">
                <div className="flex flex-col items-center gap-4 max-w-lg">
                    <img src={airpod_low} className="w-full h-auto" />
                    <p className="italic">
                        Airpod
                    </p>
                </div>
                <div className="flex flex-col items-center gap-4 max-w-lg">
                    <img src={peashooter_high} className="w-full h-auto" />
                    <p className="italic">
                        Peashooter
                    </p>
                </div>
            </div>

            <p>
                For the "cutoff frequency" for each of the images, I used a combination of the sigma and kernel size in the Gaussian filters
                for both images. For the Airpod, I used a kernel size of 18 and a sigma of 9, and for the Peashooter, I used a kernel size of
                9 and a sigma of 9. This was mostly from trial-and-error and experimenting.
            </p>

            <div className="my-8 h-px w-full bg-current" />
            <h2 className="text-2xl font-semibold">
                Part 2.3 + 2.4: Gaussian and Laplacian Stacks + Multiresolution Blending
            </h2>

            <p>
                Definitely the most complicated part of the assignment. In a nutshell, here is my understanding of the entire process:
            </p>

            <p>
                A Gaussian stack is blurrier versions of the same image, where each layer is the previous layer with a blur applied. The
                same blur is used throughout. Now, a Laplacian stack represents the data / details LOST in each layer of the Gaussian stack.
                We subtract its respective layer in the Gaussian stack with the next layer in the Gaussian stack to find the data that got lost
                during the blur. 
            </p>

            <p>
                To blend the images, we separately make a Gaussian stack for the mask, then combine the two images and the mask using the
                formula outlined in the paper. Then, to get the final result, we add up the data from each layer starting at the bottom, so
                we essentially reconstruct the image! Very cool :) Here is my implementation of the results from the paper:
            </p>

            <div className="flex justify-center gap-4">
                <img src={oraple} className="w-full h-auto" />
            </div>

            <p>
                I also repeated the process for two footballs, using a hand-drawn mask:
            </p>

            <div className="flex justify-center gap-4">
                <img src={futball} className="w-full h-auto" />
            </div>

            <p>
                Lastly, the smoothest blend of the bunch: I used a custom star mask to blend these two shoe variants.
            </p>

            <div className="flex justify-center gap-4">
                <img src={shoes} className="w-full h-auto" />
            </div>
        </main>
    );
}
