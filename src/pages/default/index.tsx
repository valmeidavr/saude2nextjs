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
        <title>Painel Odontologia</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout titulo="Lista de Unidades" email={props.email} perfil={props.types} sala={props.sala}>
        {/* Abaixo fica o conteudo */}
        <div className="container-fluid p-0">
                <div className="d-flex justify-content-end">
                    <Link href='/unidades/cadastro'>
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
       <p>Total de Unidades: 100</p>
       <div className="container-fluid p-0 d-flex flex-wrap list-card">
          
            <ItemCard id={'1'} regans={'32323'} name={'SEDE ADMINISTRATIVA'}/>
            <ItemCard id={'1'} regans={'32323'} name={'SEDE ADMINISTRATIVA'}/>
            <ItemCard id={'1'} regans={'32323'} name={'SEDE ADMINISTRATIVA'}/>
            <ItemCard id={'1'} regans={'32323'} name={'SEDE ADMINISTRATIVA'}/>
        </div>


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
