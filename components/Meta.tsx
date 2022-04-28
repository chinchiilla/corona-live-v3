import Head from "next/head";
import React, { FC } from "react";
import { Helmet } from "react-helmet";

interface Props {
    data: {
        title?: string;
        description?: string;
        canonical?: string;
    };
}

const Meta: FC<Props> = ({ data }) => {
    const title = data.title;
    const description = data.description;
    const canonical = `https://corona-live.com/${data.canonical}`;

    return (
        <Head>
            <title>{title}</title>
            {description ? <meta name='description' content={description} /> : null}
            {canonical ? <link rel='canonical' href={canonical} /> : null}

            <meta property='og:title' content={title} />
            {description ? <meta property='og:description' content={description} /> : null}
            {canonical ? <meta property='og:url' content={canonical} /> : null}

            <meta name='twitter:title' content={title} />
            {description ? <meta name='twitter:description' content={description} /> : null}
        </Head>
    );
};

export default Meta;
