import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";

interface ImageCarouselProps {
  photos: {
    url: string;
    alt: string;
  }[];
}

export default function ImageCarousel({ photos }: ImageCarouselProps) {
  return (
    <Carousel>
      <CarouselContent>
        {photos.map((photo, index) => (
          <CarouselItem key={index} className="w-full max-h-96">
            <Image
              width={400}
              height={300}
              src={photo.url}
              alt={photo.alt}
              loading="lazy"
              className="rounded-xl object-cover h-full w-full"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious variant="neutral" />
      <CarouselNext variant="neutral" />
    </Carousel>
  );
}
