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
                    <MenuItem imgsrc='/assets/images/calendar.svg' href='/agendamentos' label='Agendamentos'/> 
                    <MenuItem imgsrc='/assets/images/form.svg' href='/pacientes' label='Pacientes'/> 
                    <MenuItem imgsrc='/assets/images/supports.svg' href='/servicos' label='Serviços'/> 
                    <MenuItem imgsrc='/assets/images/groups.svg' href='/grupos' label='Grupos'/> 
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