import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { http } from '@/util/http';
import classNames from 'classnames';


function list() {
  return http.get("painel/tv");
}


const PainelTV: NextPage = () => {
  const [panelTv, setPanelTv] = useState();
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  var nome = '';

 async function chamador() {
    const res = await list();
    setLoading(false);
    setPanelTv(res.data)
    if(res.data.length != '0') {
      if (nome !== res.data[0]?.paciente) {
        responsiveVoice.speak(res.data[0]?.paciente + ',' + res.data[0].sala,"Brazilian Portuguese Female"); 
        responsiveVoice.speak(',' + res.data[0]?.paciente + ',' + res.data[0].sala,"Brazilian Portuguese Female"); 
        nome = res.data[0]?.paciente;
        setTimeout(() => {
          setIsActive(true)
          setIsActive(false)
          console.log('Parando o pisca do painel');
        }, 5000);

      } 
    }
  }

  useEffect(() => { 
    chamador()
    const interval = setInterval(() => {
    chamador()
    }, 10000);

    return () => clearInterval(interval);
    
  }, []);

  return (
    <>
     <Head>
        <title>Painel Odontologia</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
       <nav id="header" className="container-fluid px-5 py-2 bg-blue">
                <div className="row">
                    <div className="col-sm py-4">
                        <img src="/assets/images/logo_rodape.png" alt="logo-aapvr"/>
                    </div>
                    <div className="col-sm d-flex align-items-center">
                        <h1>UNIDADE DE ODONTOLOGIA</h1>
                    </div>
                    <div className="col-sm">
                    </div>
                </div>
            </nav>
            
            {!isLoading && (
                <>  
                  <div className="mx-5 my-3 border-1 card">
                    <div className={isActive ? 'container-fluid panel blink-text' : 'container-fluid panel'}>
                        <h5>NOME DO PACIENTE</h5>
                        <h3>{panelTv[0]?.paciente.toUpperCase()}</h3>
                    </div>
                    <div className={isActive ? 'container-fluid panel blink-text' : 'container-fluid panel'}>
                        <h5>PROFISSIONAL</h5>
                        <h3>{panelTv[0]?.profissional.toUpperCase()}</h3>
                    </div>
                    <div className={isActive ? 'container-fluid panel blink-text' : 'container-fluid panel'}>
                        <h5>SALA</h5>
                        <h3>{panelTv[0]?.sala.toUpperCase()}</h3>
                    </div>
                  </div>

                  <div className="mx-5 my-3 border-1 card">
                    <table className="table">
                        <thead>
                          <tr>
                            <th scope="col-lg">Últimas Chamadas</th>
                            <th scope="col-sm">Sala</th>
                          </tr>
                        </thead>
                        <tbody>
                          {panelTv.map((item, index) => {
                            return index !== 0 && (
                              <tr key={index}>
                                <td>{item.paciente.toUpperCase()}</td>
                                <td>{item.sala.toUpperCase()}</td>
                              </tr>
                            )
                          })}
                        </tbody>
                    </table>
                </div> 
                </>
             )
            }          
    </>
  )
}


export default PainelTV;

