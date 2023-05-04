import Image from 'next/image';
import { FC, forwardRef } from 'react';
import { FALLBACK_URL } from '../lib/constants';
import { getStrapiMedia } from '../lib/media';
import { NextStrapiImageProps } from '../types';

const StrapiImage = forwardRef<HTMLImageElement, NextStrapiImageProps>(
    ({ strapiUrl = FALLBACK_URL, fallbackSize = true, media, alt, fill, ...imageProps }, ref) => {
        if (!media) {
            return null;
        }

        const { url, alternativeText, width, height } = media.attributes;
        const src = getStrapiMedia(media);

        if (!src) {
            return null;
        }

        const fallbackSizeProp = fallbackSize ? 0 : undefined;

        // If fill is true, we don't need to set width and height.
        const sizeProps = fill ? {
            fill,
        } : {
            width: width ?? fallbackSizeProp,
            height: height ?? fallbackSizeProp,
        };

        return (
            <Image
                {...sizeProps}
                alt={alt ?? alternativeText ?? ''}
                {...imageProps}
                ref={ref}
                src={src}
            />
        );
    }
);

export default StrapiImage;
