"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

const CarouselHome = () => {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )

    return (
        <Carousel
            plugins={[plugin.current]}
            className="w-full max-w-3xl"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent >

                {["/banner1.png", "/banner2.png"].map((src, index) => (
                    <CarouselItem key={index} className="relative w-full h-64">

                        <Image
                            src={src}
                            alt={`Banner ${index + 1}`}
                            fill
                            className="object-cover"
                        />

                    </CarouselItem>

                ))}
            </CarouselContent>

        </Carousel>
    )
}

export default CarouselHome