import { IMedia } from '../types/generated';
import { FALLBACK_URL } from './constants';
import { getStrapiUrl } from './url';

export function getStrapiMediaFallback(url: string, strapiUrl: string = FALLBACK_URL) {
    return url.startsWith('/') ? getStrapiUrl(strapiUrl, url) : url;
}

export function getStrapiMedia(
    media: IMedia | null,
    strapiUrl?: string
    // Format shouldn't be used with next/image, but we can enable it again if there is a use case
    /* format?: keyof NonNullable<IMedia['attributes']['formats']> | null */
) {
    if (!media) return null;

    const provider = media.attributes.provider;
    const { url } = media.attributes;
    /* const { url } = */
    /*     format === null || format === undefined */
    /*         ? media.attributes */
    /*         : media.attributes?.formats?.[format] ?? media.attributes; */

    if (provider === 'local') {
        return getStrapiMediaFallback(url, strapiUrl);
    }

    return url;
}
