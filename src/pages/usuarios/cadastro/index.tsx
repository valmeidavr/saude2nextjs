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

const CadastroUsuarios: NextPage<IPrivatePageProps> = (props) => {
    const router = useRouter();

    async function onSubmit(event: FormEvent): Promise<void> {
    event.preventDefault()
    
    const name = (document.querySelector("#name") as HTMLInputElement).value;
    const email = (document.querySelector("#email") as HTMLInputElement).value;
    const password = (document.querySelector("#password") as HTMLInputElement).value;
    const types = (document.querySelector("#types") as HTMLInputElement).value;
    const sala = (document.querySelector("#sala") as HTMLInputElement).value;
    
    try{
      const {data} = await http.post("/users", { name, email, password, types, sala });   
      router.push('/usuarios/lista')
      toast.success("Usuário cadastrado.");
    } catch(err) {
        msgResponse(err.response.data.message); 
    }
}

  return (
    <>
      <Head>
        <title>Painel Odontologia</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout titulo="Cadastro de Usuários" email={props.email} perfil={props.types} sala={props.sala}>
      <div className="card p-4 shadow">
                <form method='POST' onSubmit={onSubmit}>
                    <div className="form-row">
                        <div className="form-group col-md-10 col-lg-10">
                        <label htmlFor="Nome">Nome Completo</label>
                        <input type="text" name="name" className="form-control" id="name" required/>
                        </div>
                    </div>  

                    <div className="form-row">
                        <div className="form-group col-md-12 col-lg-6">
                        <label htmlFor="Email">Email</label>
                        <input type="email" name="email" className="form-control" id="email" required/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12 col-lg-6">
                        <label htmlFor="Senha">Senha</label>
                        <input type="password" name="password" className="form-control" id="password" required/>
                        </div>
                    </div>
      
                    <div className="form-row">                     
                        <div className="form-group col-md-12 col-lg-4">
                            <label htmlFor="inputState">Perfil</label>
                            <select id="types" className="form-control" name="types" required>
                            <option selected disabled value='' style={{ display: 'none'}}>Selecione...</option>
                                <option value="Profissional"> Profissional </option>
                                <option value="Secretaria"> Secretaria </option>
                                <option value="Administrador"> Administrador </option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">                     
                        <div className="form-group col-md-12 col-lg-4">
                            <label htmlFor="inputState">Sala</label>
                            <select id="sala" className="form-control" name="sala" required>
                            <option selected disabled value='' style={{ display: 'none'}}>Selecione...</option>
                                <option value="Nenhuma"> Nenhuma </option>
                                <option value="Sala 221"> Sala 221 </option>
                                <option value="Sala 226"> Sala 226 </option>
                                <option value="Sala 228"> Sala 228 </option>
                                <option value="Sala 234"> Sala 234 </option>
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

export default CadastroUsuarios;

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
