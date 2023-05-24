import { Layout } from '@/components';
import { withAuth } from '@/hof/withAuth';
import { IPrivatePageProps } from '@/interfaces/IPrivatePageProps';
import { http } from '@/util/http';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';


/* Trocar Default pelo nome da Pagina */
const Pacientes: NextPage<IPrivatePageProps> = (props) => {
    return (
      <>
       <Head>
        <title>Painel Pacientes</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout titulo="Lista de Pacientes" email={props.email} perfil={props.types}>
        {/* Abaixo fica o conteudo */}
        <div className="container-fluid p-0">
                <div className="d-flex justify-content-end">
                    <Link href='/pacientes/cadastro'>
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
       <p>Total de Pacientes:20</p>
       <div className="container-fluid p-0 d-flex flex-wrap list-card">
          
            <ItemCard id={'1'} nome={'Vinicius de Oliveira Almeida'} cpf={'103.030.697-40'} dataNasc={'28/02/1984'} tel={'(24) 999417827'}/>
            
        </div>


         {/* Fim do Conteúdo  */}
      </Layout>
      </>
    )
}

interface ItemCardProps {
   id: String,
   nome: String,
   cpf: String,
   dataNasc: String,
   tel: String,
}

const ItemCard: React.FC<ItemCardProps> = (props: ItemCardProps) => {
    return (
      <div className="card usuario-card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    {props.nome}
                    <Link href={'paciente/del/' + props.id} > <img src="/assets/images/trashCan.svg" width="15px" data-toggle="tooltip" title="Excluir registro"/> </Link>
                </div>
                <div className="card-body d-flex flex-column">
                    <div className="container d-flex-col-sm-4">
                        <p className="card-text">CPF: {props.cpf}</p>
                        <p className="card-text">Nascimento: {props.dataNasc}</p>
                        <p className="card-text">Telefone: {props.tel}</p>
                     </div>
                </div>
      </div>
    );
}




/* Trocar Default pelo nome da Pagina */
export default Pacientes;


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
