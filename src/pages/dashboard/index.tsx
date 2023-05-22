import Head from 'next/head'
import { Layout } from 'components';
import { withAuth } from '@/hof/withAuth';
import { http } from '@/util/http';
import { NextPage } from 'next';
import {IPrivatePageProps} from 'interfaces/IPrivatePageProps'
import React, { useEffect, useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { IOption } from '@/interfaces/IOption';
import { toast } from 'react-toastify';
import { msgResponse } from '@/util/msg';



const Dashboard: NextPage<IPrivatePageProps> = (props) => {
  const [usuarios, setUsuarios] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function list(): Promise<void> {
      try{
        const dados = await http.get("/users/all");
        await setUsuarios(dados.data);
        await setLoading(false);
      }catch(err : any){
        if(err.response.status === 403) {
          router.push('/negado')
        } 
      }
    }
    list()
  }, [])

  function renderProfissionais() {
    return usuarios.map((usuario: IOption) => {
      return <option key={usuario.id} value={usuario.id}>{usuario.name}</option>
    })
  } 

  async function onSubmit(event: FormEvent): Promise<void> {
    event.preventDefault()
    
    const profissional_id = (document.querySelector("#profissional_id") as HTMLInputElement).value.toString();
    const atendido = '0';
    const paciente = (document.querySelector("#paciente") as HTMLInputElement).value;

    try{
      const {data} = await http.post("/painel", { profissional_id, atendido, paciente});  
      
      /*  Zerar Campos */
      (document.getElementById('paciente') as HTMLInputElement).value = ''; 
      (document.getElementById('profissional_id') as HTMLInputElement).value = ''; 

      toast.success("Atendimento cadastrado.");
    } catch(err : any) {
        msgResponse(err.response.data.message); 
    }
  }

  return (
    <>
      <Head>
        <title>Painel Odontologia - AAPVR</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout titulo="Dashboard" email={props.email} perfil={props.types} sala={props.sala}>
        <div className="card p-4 shadow">
            <div className="alert alert-primary" role="alert">
              <h4 className="alert-heading text-start"><img src="/assets/images/bell.svg"/> Painel de Chamados Odontologia <small style={{color: 'black'}}>versão: 1.0</small></h4>
              <hr/>
              <p className="mb-3">Gerencie salas, usuários, pacientes, acesso ao chamador e painel de TV.</p>  
              <p className="mb-0"><b>Dúvidas?</b></p>
              <p className="mb-0">Estamos à disposição no e-mail informatica@aapvr.com.br ou através do sistema <a href="https://solicitaweb.aapvr.com.br">solicita web.</a></p>
            </div>
        </div>

        <div className="card p-4 shadow">
                <form method='POST' onSubmit={onSubmit}>
                    <div className="form-row">
                        <div className="form-group col-md-10 col-lg-10">
                        <label htmlFor="Nome">Nome do Paciente</label>
                        <input type="text" name="paciente" className="form-control" id="paciente" required/>
                        </div>
                    </div>  
      
                    <div className="form-row">                     
                        <div className="form-group col-md-12 col-lg-4">
                            <label htmlFor="inputState">Profissional</label>
                            <select id="profissional_id" className="form-control" name="profissional_id" required>
                              <option selected disabled value='' style={{ display: 'none'}}>Selecione...</option>
                              {renderProfissionais()}
                            </select>
                        </div>
                    </div>

                    <div className="d-flex mt-4">
                        <button type="reset" className="btn-personalizado-sec mr-3">Limpar</button>
                        <button type="submit" className="btn-personalizado">Salvar</button>
                    </div>
            </form>
        </div> 


      </Layout>
    </>
  )
}

export default Dashboard;

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

