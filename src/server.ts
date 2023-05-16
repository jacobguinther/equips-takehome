import { ApolloServer } from '@apollo/server';
import { startServerAndCreateLambdaHandler, handlers } from '@as-integrations/aws-lambda';
import axios from 'axios';

const typeDefs = `#graphql
    type Institution {
                ZIP: String
                SASSER: Int
                CHRTAGNT: String
                CONSERVE: String
                REGAGENT2: String
                STNAME: String
                INSDATE: String
                TE06N528: String
                TE06N529: String
                FDICDBS: Int
                OCCDIST: String
                CMSA: String
                CBSA_METRO_FLG: String
                TE10N528: String
                CBSA_DIV_NO: String
                MSA_NO: String
                INSSAVE: Int
                CHARTER: String
                TE04N528: String
                TE04N529: String
                CERT: Int
                STALP: String
                CFPBENDDTE: String
                TE09N528: String
                IBA: Int
                INSBIF: Int
                INSFDIC: Int
                ENDEFYMD: String
                MSA: String
                TE02N528: String
                TE02N529: String
                TE07N528: String
                FDICSUPV:String
                FED: String
                REGAGNT: String
                NEWCERT: Int
                CBSA_MICRO_FLG: String
                STCNTY: String
                CSA_FLG: String
                CITY: String
                CLCODE: String
                INACTIVE: Int
                CMSA_NO: String
                INSAGNT1: String
                BKCLASS: String
                EFFDATE: String
                SUPRV_FD: String
                DATEUPDT: String
                INSAGNT2: String
                TE05N528: String
                TE05N529: String
                FDICREGN: String
                FLDOFF: String
                WEBADDR: String
                QBPRCOML: String
                COUNTY: String
                DOCKET: String
                ULTCERT: String
                OTSDIST: String
                LAW_SASSER_FLG: String
                CFPBFLAG: Int
                RISDATE: String
                INSCOML: Int
                OCCDISTDESC: String
                OTSREGNM: String
                RUNDATE: String
                TE03N528: String
                TE03N529: String
                NAME: String
                MDI_STATUS_DESC: String
                CBSA_DIV: String
                ADDRESS: String
                LATITUDE: Float
                PROCDATE: String
                INSSAIF: Int
                CBSA_NO: String
                ACTIVE: Int
                CBSA_METRO_NAME: String
                CFPBEFFDTE: String
                STCHRTR: Int
                LONGITUDE: Float
                MDI_STATUS_CODE: String
                CSA: String
                INSDIF: Int
                TE01N529: String
                OI: Int
                STNUM: String
                OAKAR: Int
                ADDRESS2: String
                PRIORNAME1: String
                FEDDESC: String
                FED_RSSD: String
                CSA_NO: String
                CBSA_METRO: String
                UNINUM: String
                TE01N528: String
                CBSA: String
                CBSA_DIV_FLG: String
                TE08N528: String
                CHANGEC1: Int
                ESTYMD: String
                FEDCHRTR: Int
                ID: String
    }

  type Query {
    institutions: [Institution]
  }
`;

const resolvers = {
  Query: {
    institutions: async () => {
      const resp = await axios
        .get('https://banks.data.fdic.gov/api/institutions')
      if (resp.status === 200) {
        const institutions = resp.data.data.map((institution) => institution.data)
        return institutions
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export const graphqlHandler = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventV2RequestHandler(),
);