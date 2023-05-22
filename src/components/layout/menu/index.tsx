import { delCookie } from '@/util/cookies'
import Link from 'next/link'
import { useRouter } from 'next/router';

export const Menu: React.FC = () => {
    const router = useRouter();
    const Logout = () => {
        delCookie()
        router.push('/')
    }
    return (
        <div className="menu">
            <hr style={{backgroundColor: 'rgb(200, 200, 200)', marginBottom: '-10px'}}/>
                <ul className="list-unstyled d-flex flex-column" style={{marginLeft: '-10px'}}>
                    <MenuItem imgsrc='/assets/images/dash.svg' href='/dashboard' label='Dashboard'/>
                    <MenuItem imgsrc='/assets/images/tv.svg' href='/painel/tv' label=' Painel TV'/>
                    <MenuItem imgsrc='/assets/images/notificacao.svg' href='/chamador' label='Chamador'/>
{/*                     <MenuItem imgsrc='/assets/images/form.svg' href='#' label='Pacientes'/> */}
                    <MenuItem imgsrc='/assets/images/users.svg' href='/usuarios/lista' label='Usuários'/>
                    <p onClick={() => Logout()} style={{color: 'white', cursor: 'pointer'}}>
                        <img src='/assets/images/logout.svg' width="24px"/>
                        Logout
                    </p>
                </ul>
        </div>
    )
}

interface MenuItemProps {
   imgsrc: string,
   href: string,
   label: string
}

const MenuItem: React.FC<MenuItemProps> = (props: MenuItemProps) => {
    return (
        <li>
            <Link href={props.href}>

                    <img src={props.imgsrc} width="24px"/>
                    {props.label}

             </Link>
        </li>
    )
}