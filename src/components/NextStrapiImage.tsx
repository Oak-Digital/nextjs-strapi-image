import Image from 'next/image';
import { FC, forwardRef } from 'react';
import { FALLBACK_URL } from '../lib/constants';
import { getStrapiMedia } from '../lib/media';
import { NextStrapiImageProps } from '../types';

const StrapiImage = forwardRef<HTMLImageElement, NextStrapiImageProps>(
    ({ strapiUrl = FALLBACK_URL, fallbackSize = true, media, alt, ...imageProps }, ref) => {
        if (!media) {
            return null;
        }

        const { url, alternativeText, width, height } = media.attributes;
        const src = getStrapiMedia(media);

        if (!src) {
            return null;
        }

        const fallbackSizeProp = fallbackSize ? 0 : undefined;

        return (
            <Image
                {...imageProps}
                ref={ref}
                src={src}
                width={width ?? fallbackSizeProp}
                height={height ?? fallbackSizeProp}
                alt={alt ?? alternativeText ?? ''}
            />
        );
    }
);

export default StrapiImage;
