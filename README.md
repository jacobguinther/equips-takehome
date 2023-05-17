# A GraphQL proxy for the FDIC's bank data API

The FDIC hosts a free API that gives basic information and statistics for all FDIC-insured banks.

[API for Data Miners & Developers](https://banks.data.fdic.gov/)

This project is a serverless implementation of a GraphQL proxy wrapper for the `/institutions` route.

It uses the [Serverless Framework](https://www.serverless.com/framework/docs) for deploying the code and infrastructure on AWS using [AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html).

## Live Version
```
https://ljfg5vxaak.execute-api.us-east-1.amazonaws.com/institutions
```
Example Query
```graphql
{
    institutions {
        ZIP,
        STNAME
    }
}
```

Example Response
```graphql
{
    "data": {
        "institutions": [{
                "ZIP": "04073",
                "STNAME": "Maine"
            },
            {
                "ZIP": "72712",
                "STNAME": "Arkansas"
            },
        ]
    }
}
```

## Local Development:

Prerequisites
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- [Serverless CLI](https://www.serverless.com/framework/docs/getting-started)

> **_NOTE:_** You will also need an aws account and to [add credentials](https://docs.aws.amazon.com/cli/v1/userguide/cli-chap-authentication.html) for the `AWS CLI` to access it.

Clone the project
```bash
git clone git@github.com:jacobguinther/equips-takehome.git
```
Install project dependencies
```bash
npm install
```
To run the function locally we can use the `query.json` file to mock HTTP requests.

Using the `serverless cli` we can use that query to invoke our handler.

```bash
serverless invoke local -f graphql -p query.json
```

## Deploy to AWS

To deploy
```bash
serverless deploy
```

To remove
```bash
serverless remove
```

## Todo
- Add design diagram to readme
- Add automated tests using Jest
- Expand the endpoint to support all of the same query parameters that the FDIC API supports
