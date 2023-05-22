import Head from 'next/head'
import { Layout } from 'components';
import { withAuth } from '@/hof/withAuth';
import { http } from '@/util/http';
import { NextPage } from 'next';
import {IPrivatePageProps} from 'interfaces/IPrivatePageProps'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { link } from 'fs';
import { useRouter } from 'next/router';


const ListaUsuarios: NextPage<IPrivatePageProps> = (props) => {
   const [usuarios, setUsuarios] = useState([]);
   const [isLoading, setLoading] = useState(true);
   const router = useRouter();

  useEffect(() => {
    async function list(): Promise<void> {
      try{
        const dados = await http.get("/users");
        await setUsuarios(dados.data);
        await setLoading(false);
      }catch(err){
        if(err.response.status === 403) {
          router.push('/negado')
        } 
      }
    }
    list()
  }, [])
  
  return (
    <>
      <Head>
        <title>Painel Odontologia</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout titulo="Lista de Usuários" email={props.email} perfil={props.types} sala={props.sala}>
      <div className="container-fluid p-0">
                <div className="d-flex justify-content-end">
                    <Link href='/usuarios/cadastro'>
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
            {isLoading ? (
              <>
                <p>Carregando...</p>
              </>
             ) : (
              <>
                <p> 
                  {(usuarios.length > 0) && 
                      <>Total de Usuários: {usuarios.length}</>
                  }
                </p>
                <div className="container-fluid p-0 d-flex flex-wrap list-card">
                  {usuarios.map((item:ItemCardProps, index) => ( 
                      <React.Fragment key={index}>
                        <ItemCard types={item.types} name={item.name} email={item.email} id={item.id} sala={item.sala}/>
                      </React.Fragment>
                  ))}    
                </div>
              </>
             )}
      </Layout>
    </>
  )
}
interface ItemCardProps {
    id: string,
    name: string,
    types: string,
    email: string,
    sala: string
    
 }

const ItemCard: React.FC<ItemCardProps> = (props: ItemCardProps) => {
    return(
        
            <div className="card usuario-card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    {props.name}
                    <Link href={'usuarios/edit/' + props.id} > <img src="/assets/images/trashCan.svg" width="15px" data-toggle="tooltip" title="Excluir registro"/> </Link>
                </div>
                <div className="card-body d-flex flex-column">
                
                    <div className="container d-flex">
                        <img src="/assets/images/security.svg" width="15px"/>
                        <span>{props.types}</span>
                    </div>
                    <div className="container d-flex">
                        <img src="/assets/images/mail.svg" width="15px"/>
                        <span>{props.email}</span>
                    </div>
                    {(props.types == 'Profissional') && 
                    <div className="container d-flex">
                        <img src="/assets/images/info.svg" width="15px"/>
                        <span>{props.sala}</span>
                    </div>
                    }
                    
                </div>
            </div>
       
    )
}

export default ListaUsuarios;

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
