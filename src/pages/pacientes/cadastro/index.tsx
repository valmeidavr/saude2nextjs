import Head from 'next/head'
import { Layout } from 'components';
import { withAuth } from '@/hof/withAuth';
import { http } from '@/util/http';
import { NextPage } from 'next';
import {IPrivatePageProps} from 'interfaces/IPrivatePageProps'
import { FormEvent } from 'react';
import {useRouter} from 'next/router';
import { msgResponse } from '@/util/msg';
import { toast } from 'react-toastify';

const CadastroUnidades: NextPage<IPrivatePageProps> = (props) => {
    const router = useRouter();

    async function onSubmit(event: FormEvent): Promise<void> {
    event.preventDefault()
    
    const name = (document.querySelector("#name") as HTMLInputElement).value;
    const regans = (document.querySelector("#regans") as HTMLInputElement).value;
  
    
    try{
      const {data} = await http.post("/unidades", { name, regans });   
      router.push('/unidades')
      toast.success("Unidade cadastrado.");
    } catch(err) {
        msgResponse(err.response.data.message); 
    }
}

  return (
    <>
      <Head>
        <title>Sistema de Saúde</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout titulo="Cadastro de Pacientes" email={props.email} perfil={props.types} sala={props.sala}>
      <div className="card p-4 shadow">
                <form method='POST' onSubmit={onSubmit}>
                    <div className="form-row">
                        <div className="form-group col-md-10 col-lg-10">
                        <label htmlFor="Nome">Nome do Paciente</label>
                        <input type="text" name="name" className="form-control" id="name" required/>
                        </div>
                    </div>  

                    <div className="form-row">
                        <div className="form-group col-md-12 col-lg-6">
                        <label htmlFor="DataNasc">Data de Nascimento</label>
                        <input type="date" name="DataNasc" className="form-control" id="DataNascPac" required/>
                        </div>
                    </div>
                    <div className="row">
                      <div className="cocol-md-12 col-lg-8l">
                          <div className="form-group col-md-12 col-lg-9">
                            <label htmlFor="RG">RG</label>
                            <input type="number" name="RG" className="form-control" id="RG" required/>
                          </div>
                      </div>
                      <div className="form-row">
                          <div className="form-group col-md-12 col-lg-11">
                            <label htmlFor="CPF">CPF</label>
                            <input type="number" name="CPF" className="form-control" id="CPF" required/>
                          </div>
                      </div>
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group col-md-12 col-lg-2">
                        <label htmlFor="CEP">CEP</label>
                        <input type="number" name="CEP" className="form-control" id="cep" required/>
                        </div>
                    </div> 
                    <div className="form-row">
                        <div className="form-group col-md-12 col-lg-10">
                          <label htmlFor="Lougradouro">Logradouro</label>
                          <input type="text" name="lougradouro" className="form-control" id="lougradouro" required/>
                        </div>
                    </div>
                    <div className="form-row">
                      <div className="form-row">
                          <div className="form-group col-md-12 col-lg-10">
                            <label htmlFor="Bairro">Bairro</label>
                            <input type="text" name="Bairro" className="form-control" id="bairro" required/>
                          </div>
                      </div>
                      <div className="form-row">
                          <div className="form-group col-md-12 col-lg-10">
                            <label htmlFor="Cidade">Cidade</label>
                            <input type="text" name="Cidade" className="form-control" id="cidade" required/>
                          </div>
                      </div>
                      <div className="form-row">
                          <div className="form-group col-md-12 col-lg-6">
                            <label htmlFor="UF">UF</label>
                            <input type="text" name="uf" className="form-control" id="uf" required/>
                          </div>
                      </div>
                    </div>
                     <div className="form-row">
                          <div className="form-group col-md-12 col-lg-6">
                            <label htmlFor="Email">E-mail</label>
                            <input type="email" name="email" className="form-control" id="email" required/>
                          </div>
                      </div>
                      <div className="form-row">
                        <div className="form-row">
                            <div className="form-group col-md-12 col-lg-10">
                              <label htmlFor="Telefone">Telefone</label>
                              <input type="tel" name="tel" className="form-control" id="tel" required/>
                            </div>
                        </div>
                          <div className="form-row">
                              <div className="form-group col-md-12 col-lg-10">
                                <label htmlFor="Telefone Segundario">Telefone</label>
                                <input type="tel" name="tel2" className="form-control" id="tel2" required/>
                              </div>
                          </div>
                      </div>
                      <div className="form-row">
                              <div className="form-group col-md-12 col-lg-6">
                                <label htmlFor="Nome da Mãe">Nome da Mãe</label>
                                <input type="nome_mae" name="nome_mae" className="form-control" id="nome_mae" required/>
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

export default CadastroUnidades;

export const getServerSideProps = withAuth(
  async (ctx: any, cookies: any, payload: any) => {
    const { data } = await http.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${cookies.accessToken}`,
      },
    });
    console.log(data)
    return {
      props: data,
    };
  }
);
