import {GraphQLClient, gql} from 'graphql-request';
import author from "../../components/Author";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

/** *************************************************************
 * Any file inside the folder pages/api is mapped to /api/* and  *
 * will be treated as an API endpoint instead of a page.         *
 *************************************************************** */

// export a default function for API route to work
export default async function asynchandler(req, res) {


    // create a new GraphQLClient instance
    const client = new GraphQLClient(graphqlAPI, {
        headers: {
            authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
        },
    });


    const query = gql`
        mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
            createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug:$slug}}}) { id }
        }
    `

    ;


    const result = await client.request(query, {
        name: req.body.name,
        email: req.body.email,
        comment: req.body.comment,
        slug: req.body.slug,
        id: req.body.id,
    });

    console.log(JSON.stringify(result));
    //publish the comment to the blog


    return res.status(200).send(result);
}