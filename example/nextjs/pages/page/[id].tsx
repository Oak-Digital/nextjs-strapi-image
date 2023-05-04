import { StrapiImage } from '@oak-digital/nextjs-strapi-image';
import { fetchPage } from '@/lib/api';
import { GetServerSideProps, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient, useQuery } from 'react-query';

const GenericPage: NextPage = () => {
    // fetch page from api
    const router = useRouter();
    const { id } = router.query;
    const pageIdExtracted = id ? (Array.isArray(id) ? id?.[0] : id) : id;
    const pageId = parseInt(pageIdExtracted ?? '0');
    const { data: pageData } = useQuery(['page', pageId], () => fetchPage(pageId));

    return (
        <div>
            <h1>{pageData?.data?.attributes.title}</h1>
            <StrapiImage media={pageData?.data.attributes.image?.data} strapiUrl={process.env.NEXT_PUBLIC_STRAPI_ENDPOINT} />
            <div style={{
                width: 50,
                height: 50,
                position: 'relative',
            }}>
                <StrapiImage media={pageData?.data.attributes.image?.data} strapiUrl={process.env.NEXT_PUBLIC_STRAPI_ENDPOINT} fill />
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    // fetch page from api
    const queryClient = new QueryClient();

    if (!context.params?.id) {
        return {
            notFound: true,
        };
    }
    const pageId = parseInt(Array.isArray(context.params.id) ? context.params.id?.[0] : context.params.id);

    await queryClient.prefetchQuery(['page', pageId], () => fetchPage(pageId));
console.log(queryClient.getQueryData(['page', pageId]));
    if (!queryClient.getQueryData(['page', pageId])) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};

export default GenericPage;
