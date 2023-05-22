import Head from 'next/head'
import { Layout } from 'components';
import { withAuth } from '@/hof/withAuth';
import { http } from '@/util/http';
import { NextPage } from 'next';
import {IPrivatePageProps} from 'interfaces/IPrivatePageProps'
import {IChamador} from 'interfaces/IChamador';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';


const Chamador: NextPage<IPrivatePageProps> = (props) => {
    const [usuarios, setUsuarios] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isButtonDisabled, setisButtonDisabled] = useState(false);
    const [isText, setIsTxt] = useState('Chamar Paciente');
    const [msgAtualizar, setmsgAtualizar] = useState('Atualizar');
    const router = useRouter();
  

    useEffect(() => {
      list()
      const interval = setInterval(() => {
      list()
      }, 10000);
  
      return () => clearInterval(interval);
    }, [])

    async function list(): Promise<void> {
      try{
        setmsgAtualizar('Aguarde...')
        const dados = await http.get("/painel");
        await setUsuarios(dados.data);
        await setmsgAtualizar('Atualizar')
      }catch(err:any){
        await setLoading(false);
        if(err.response.status === 403) {
          router.push('/negado')
        } 
      }
    }

      function renderUsers() {
        return usuarios.map((usuario: IChamador, index) => {
          return <TableItem txt={isText} key={index} id={usuario.id} Btn={isButtonDisabled} paciente={usuario.paciente} atendido={usuario.atendido} data={usuario.data} update={updateItem} />
        })
      } 

      const updateList = async () => {
          setLoading(true);
          await list()
          await toast.success("Paciente enviado para o Painel de TV.");
          await setLoading(false);
        } 
      
      async function updateItem(id: String):Promise<void> { 
        const {data} = await http.put(`/painel/${id}`, { 
              atendido: '1'
         });
        updateList(); 

        setisButtonDisabled(true);
        setIsTxt('Aguarde..')
        console.log('chamou timeout')

        setTimeout(() => {
           setisButtonDisabled(false);
           setIsTxt('Chamar Paciente')
        }, 15000);

      
      }

  return (
    <>
      <Head>
        <title>Painel Odontologia</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout titulo="Chamador" email={props.email} perfil={props.types} sala={props.sala}>
      <button className="btn_cadastrar" style={{border: 'solid #24C595 1px', paddingRight: '10px'}} onClick={() => updateList()} data-toggle="tooltip" data-placement="top" title="Clique para atualizar a lista!"><img src='/assets/images/clock.svg' width="30px"/> {msgAtualizar}</button>
        <div className="card p-4 shadow">
        
        <table className="table">
            <thead className="thead-dark" style={{textAlign: 'start'}}> 
                <tr>
                <th scope="col" style={{width: '100px'}}>Hora</th>
                <th scope="col">Paciente</th>
                <th scope="col" style={{width: '150px'}}>Status</th>
                <th scope="col" style={{width: '180px'}}>Ações</th>
                </tr>
            </thead>
            <tbody>
                {renderUsers()}
            </tbody>
            </table>
        </div>

        <div>
          
        </div>
      </Layout>
    </>
  )
}

export default Chamador;

const TableItem: React.FC<IChamador> = (props: IChamador) => {
    return (
        <tr className={props.atendido ? 'table-success' : 'table-danger'}>
            <th scope="row">{props.data}</th>
            <td>{props.paciente}</td>
            <td>{props.atendido ? 'Atendido' : 'Não atendido'}</td>
            <td>{props.atendido ? '' : (<button disabled={props.Btn} onClick={() => props.update(props.id)} type="button" className="btn btn-primary cpac">{props.txt}</button>)}</td>
        </tr>
    )
}

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
