import { ReactNode } from 'react'
import { Menu } from './menu'

interface LayoutProps {
    email?: string,
    titulo?: string,
    perfil?: string,
    sala?: string,
    children: ReactNode
}

export const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
    return (
        <div className="container-fluid">
            <div className="row main-layout">
                <section className="col-2 menu_lateral">
                    <div className="perfil d-flex align-items-center justify-content-center flex-column mt-3">
                            <img src="/assets/images/perfil.svg" width="88px"/>
                            <div className="box_perfil d-flex align-items-center justify-content-center flex-column">
                                <small>{props.email}</small>
                                <small>Perfil: {props.perfil}</small>
                            </div>
                    </div>
                    <Menu/>{/* Menu */}
                </section>
                <section className="col-10">
                <div className="row d-flex flex-column">
                    <div className="menu_topo d-flex justify-content-end">
                        <div className="d-flex justify-content-center align-items-center" style={{cursor: 'pointer'}} data-toggle="tooltip" data-placement="top" title="Clique para trocar de sala!">
                            <small style={{ color: 'black', fontWeight: 'bold', fontSize: '12px'}}>LOCALIZAÇÃO: {props.sala?.toUpperCase()}</small>
                            <img src="/assets/images/change.svg" width="20px" style={{border: 'solid 1px', borderRadius: '4px', backgroundColor: '#2D4562'}} className="img-fluid mr-4 ml-1"/>
                        </div>
                    </div>
                    <div className="conteudo">
                        <div className="container-lg mt-5">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb p-0">
                                  <li className="breadcrumb-item active" aria-current="page">{props.titulo}</li>
                                </ol>
                              </nav> 
                              <hr/>
                             {/*  Conteúdo */}
                              {props.children}
                        </div>   
                    </div>
                </div>
            </section>
            </div>
        </div>
    )
}

