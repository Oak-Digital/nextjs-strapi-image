import { ImageProps } from 'next/image';
import { IMedia } from './generated';

const nextStrapiImageOmitted = ['src', 'alt'] as const;

type NextStrapiImageOmitted = (typeof nextStrapiImageOmitted)[number];

export type NextStrapiImageProps = {
    strapiUrl?: string;
    fallbackSize?: boolean;
    alt?: string;
    media?: IMedia | null;
} & Omit<ImageProps, NextStrapiImageOmitted>;
