import { Layout } from '@/components';
import { withAuth } from '@/hof/withAuth';
import { IPrivatePageProps } from '@/interfaces/IPrivatePageProps';
import { http } from '@/util/http';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect } from 'react';


/* Trocar Default pelo nome da Pagina */
const Agendamentos: NextPage<IPrivatePageProps> = (props) => {

  useEffect(() => {
    $("#my-calendar").zabuto_calendar({
      classname: 'table table-bordered lightgrey-weekends',
      header_format: '[month] de [year]',
      week_starts: 'sunday',
      language: 'pt',
      show_days: true,
      today_markup: '<span class="badge bg-primary">[day]</span>',
      events: [
        {
          "date": "2023-05-10",
          "markup": "<div class='badge rounded-pill bg-success'>[day]</div>"
        }
      ],
      translation: {
        "months" : {
          "1":"Janeiro",
          "2":"Fevereiro",
          "3":"Março",
          "4":"Abril",
          "5":"Maio",
          "6":"Junho",
          "7":"Julho",
          "8":"Agosto",
          "9":"Setembro",
          "10":"Outubro",
          "11":"Novembro",
          "12":"Dezembro"
        },
        "days" : {
          "0":"Dom",
          "1":"Seg",
          "2":"Ter",
          "3":"Qua",
          "4":"Qui",
          "5":"Sex",
          "6":"Sáb"
        },
      }
    });
  }, [])

    return (
      <>
       <Head>
        <title>Sistema de Serviços</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossOrigin="anonymous"></script>
        <script src="/assets/zabuto/zabuto_calendar.min.js"></script>
        <link href="/assets/zabuto/zabuto_calendar.css" rel="stylesheet"></link>
      </Head>
      <Layout titulo="Lista de Unidades" email={props.email} perfil={props.types} sala={props.sala}>
        {/* Abaixo fica o conteudo */}
        <div className="container-fluid p-0">
                <div className="container card_search p-3 d-flex align-items-center">
                    <div className="col-6 d-flex">
                          <select id="servicos" className="form-control" name="servicos" required>
                                <option value="Fisioterapia"> Fisioterapia </option>
                                <option value="Terapia"> Terapia </option>
                           </select>
                        <button className="d-flex justify-content-center align-items-center">
                            <img src="/assets/images/refresh.svg" width="20px"/>
                            Atualizar
                        </button>
                    </div>
                </div>
       </div>
       <div className="card p-4 shadow" style={{marginTop: '-25px'}}>
          <div className="container-fluid p-0 d-flex flex-wrap list-card">
              <div id="my-calendar">
              </div>          
            </div>
        </div>
          {/* Fim do Conteúdo  */}
      </Layout>
      </>
    )
}

/* Trocar Default pelo nome da Pagina */
export default Agendamentos;


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
