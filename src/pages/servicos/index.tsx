import { Layout } from '@/components';
import { withAuth } from '@/hof/withAuth';
import { IPrivatePageProps } from '@/interfaces/IPrivatePageProps';
import { http } from '@/util/http';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import styles from './Servico.module.css';

/* Trocar Default pelo nome da Pagina */
const Servicos: NextPage<IPrivatePageProps> = (props) => {
    return (
      <>
       <Head>
        <title>Sistema de Serviços</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout titulo="Lista de Serviços" email={props.email} perfil={props.types} sala={props.sala}>
        {/* Abaixo fica o conteudo */}
        <div className="container-fluid p-0">
                <div className="d-flex justify-content-end">
                    <Link href='/servicos/cadastro'>
                        <button className="btn_cadastrar d-flex justify-content-center align-items-center px-3 py-1">
                            <img src="/assets/images/plus.svg" width="20px"/>
                            Cadastrar
                        </button>
                    </Link>
                </div>

                <div className="container card_search p-3 d-flex align-items-center">
                    <div className="col-6 d-flex">
                        <input type="text" placeholder="Nome" className="form-control"/>
                        <button className="d-flex justify-content-center align-items-center">
                            <img src="/assets/images/search.svg" width="20px"/>
                            Pesquisar
                        </button>
                    </div>
                </div>
       </div>
       <p>Total de Serviços: 100</p>
       <div className="container-fluid p-0 d-flex">
          <table className="table table-bordered table-hover table-sm" style={{backgroundColor: 'white'}}>
            <thead className="thead-dark">
              <tr>
                <th scope="col" style={{width: '70px', padding: '10px'}}>#</th>
                <th scope="col" style={{padding: '10px'}}>Nome</th>
                <th scope="col" style={{width: '120px', padding: '10px'}}>Valor</th>
                <th scope="col" style={{width: '200px', padding: '10px'}}>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1021</td>
                <td>Fisioterapia</td>
                <td>R$50,00</td>
                <td>
                  <button type="button" className="btn btn-primary btn-sm mr-2" data-toggle="tooltip" title="Editar registro"><img src="/assets/images/edit.svg" width="20px"/>Editar</button>
                  <button type="button" className="btn btn-danger btn-sm" data-toggle="tooltip" title="Excluir registro"><img src="/assets/images/trash-white.svg" width="20px"/>Apagar</button>
                </td>
              </tr>
              <tr>
                <td>1021</td>
                <td>Fisioterapia</td>
                <td>R$50,00</td>
                <td>
                  <button type="button" className="btn btn-primary btn-sm mr-2" data-toggle="tooltip" title="Editar registro"><img src="/assets/images/edit.svg" width="20px"/>Editar</button>
                  <button type="button" className="btn btn-danger btn-sm" data-toggle="tooltip" title="Excluir registro"><img src="/assets/images/trash-white.svg" width="20px"/>Apagar</button>
                </td>
              </tr>
            </tbody>
          </table>
          
        </div>


         {/* Fim do Conteúdo  */}
      </Layout>
      </>
    )
}


/* Trocar Default pelo nome da Pagina */
export default Servicos;


/* Nao alterar */
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
