# Nextjs Strapi image component

This library provides a small wrapper for [`next/image`](https://nextjs.org/docs/api-reference/next/image) that populates the values from a media coming from strapi.

It automatically populates the following props `src`, `width`, `height` and `alt`;

## Getting started

### Installation

Install the library

```bash
# pnpm
pnpm install @oak-digital/nextjs-strapi-image
# npm
npm install @oak-digital/nextjs-strapi-image
# yarn
yarn add @oak-digital/nextjs-strapi-image
```

### Usage

#### Basic usage

The component can be imported easily. The media prop should be the object that contains `id` and `attributes` key.

Media data example:

```json
{
    "id": 1,
    "attributes": {
        "name": "x.jpg",
        "alternativeText": null,
        "caption": null,
        "width": 2880,
        "height": 1920,
        "formats": {
        },
        "url": "/uploads/x.jpg",
        "previewUrl": null,
        "provider": "local",
        "provider_metadata": null,
        ...
    }
}
```

Basic usage

```tsx
import { StrapiImage } from '@oak-digital/next-strapi-image';

const MyComponent = ({ media }) => {
    return (
        <div>
            {/* ... */}
            <StrapiImage media={media} strapiUrl={process.env.NEXT_PUBLIC_STRAPI_URL} />
        </div>
    );
};
export default MyComponent;
```

#### Local provider (Recommended that you set this up)

If you are using a local image provider for your strapi project (which you most likely are when working locally),
it is recommended to create your own wrapper or store default config somewhere in lib

Wrapper example

```tsx
// components/MyImage.tsx
import { NextStrapiImageProps, StrapiImage } from '@oak-digital/next-strapi-image';
import { FC } from 'react';

const MyImage: FC<Omit<NextStrapiImageProps, 'strapiUrl'>> = (props) => {
    return <StrapiImage strapiUrl={process.env.NEXT_PUBLIC_STRAPI_URL} {...props} />;
};
export default MyImage;
```

Config example

```typescript
// lib/config/strapi-image.ts
import { NextStrapiImageProps } from '@oak-digital/nextjs-strapi-image';

export const strapiImageConfig = {
    strapiUrl: process.env.NEXT_PUBLIC_STRAPI_URL,
} satisfies Partial<NextStrapiImageProps>;
```

```tsx
// components/my-component.tsx
import { StrapiImage } from '@oak-digital/next-strapi-image'
import { strapiImageConfig } from '../lib/config/strapi-image'

const MyComponent = ({ media }) => {
    return (
        <div>
            {/* Component stuff here */}
            <StrapiImage {...strapiImageConfig} media={media} {/* Other next/image props here */} />
        </div>
    )
}
export default MyComponent
```

## Api

### `<StrapiImage />`

| Prop            | Type         | Default | Required | Description                                                                                         |
| --------------- | ------------ | ------- | -------- | --------------------------------------------------------------------------------------------------- |
| `media`         | `IMedia`     | -       | - [x]    | The media received from strapi                                                                      |
| `strapiUrl`     | `string`     | -       | - [ ]    | The default strapi url for local providers                                                          |
| `fallbackSize`  | `boolean`    | `true`    | - [ ]    | If the `width` or `height` from strapi is null, it will use 0 as a fallback to avoid runtime errors |
| `...imageProps` | `ImageProps` | -       | - [ ]    | The rest of the props can be the same as those on `next/image`                                      |

## Testing locally

For testing purposes, there has been added an [`/example`](./example/) directory, where a strapi instance can be started and nextjs to make sure all the seo fields are correctly added.

[Read more](./example/README.md)

## Publishing

```
pnpm run release
```
