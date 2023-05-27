import { Layout } from '@/components';
import { withAuth } from '@/hof/withAuth';
import { IPrivatePageProps } from '@/interfaces/IPrivatePageProps';
import { http } from '@/util/http';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';


/* Trocar Default pelo nome da Pagina */
const Default: NextPage<IPrivatePageProps> = (props) => {
    return (
      <>
       <Head>
        <title>Serviços</title>
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
       <table className="table table-bordered">
            <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col" className='col-6'>SERVIÇO</th>
              <th scope="col">VALOR</th>
              <th scope="col">AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Fisiteorapia</td>
              <td >R$ 100,00</td>
              <td className='d-flex flex-row bd-highlight mb-3'>
                <button className="btn btn-outline-info"><p><img src='/assets/images/edit.svg'/>Edit</p></button>
                <button className="btn btn-outline-danger"><p><img src='/assets/images/blackTrash.svg'/>Deletar</p></button></td>
            </tr>
            
          </tbody>
        </table>
         {/* Fim do Conteúdo  */}
      </Layout>
      </>
    )
}

interface ItemCardProps {
   id: String,
   regans: String,
   name: String
}

const ItemCard: React.FC<ItemCardProps> = (props: ItemCardProps) => {
    return (
      <div className="card usuario-card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    {props.name}
                    <Link href={'unidades/del/' + props.id} > <img src="/assets/images/trashCan.svg" width="15px" data-toggle="tooltip" title="Excluir registro"/> </Link>
                </div>
                <div className="card-body d-flex flex-column">
                    <div className="container d-flex">
                        <img src="/assets/images/info.svg" width="15px"/>
                        <span>ANS: {props.regans}</span>
                    </div>
                </div>
      </div>
    );
}




/* Trocar Default pelo nome da Pagina */
export default Default;


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
