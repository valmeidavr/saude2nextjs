import Head from 'next/head'
import { Layout } from 'components';
import { withAuth } from '@/hof/withAuth';
import { http } from '@/util/http';
import { NextPage } from 'next';
import {IPrivatePageProps} from 'interfaces/IPrivatePageProps'

const NaoAutorizado: NextPage<IPrivatePageProps> = (props) => {
  return (
    <>
      <Head>
        <title>Painel Odontologia</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout titulo="Acesso não autorizado" email={props.email} perfil={props.types} sala={props.sala}>
        <div className="card p-4 shadow">
            <div className="alert alert-danger" role="alert">
              <h4 className="alert-heading text-start"><img src="/assets/images/info.svg"/> Acesso não autorizado!</h4>
              <hr/>
              <p className="mb-3">Seu acesso não foi autorizado para este conteúdo</p>  
              <p className="mb-0"><b>Dúvidas?</b></p>
              <p className="mb-0">Estamos à disposição no e-mail informatica@aapvr.com.br ou através do sistema <a href="https://solicitaweb.aapvr.com.br">solicita web.</a></p>
            </div>
        </div>
      </Layout>
    </>
  )
}

export default NaoAutorizado;

export const getServerSideProps = withAuth(
  async (ctx: any, cookies: any, payload: any) => {
    const { data } = await http.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${cookies.accessToken}`,
      },
    });
    return {
      props: data,
    };
  }
);
