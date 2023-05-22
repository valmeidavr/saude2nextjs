function Mensagem(props: any) {
    return(
        <div>
            {props.mensagem}
        </div>
    )
}

function MeuComponente() {
    return (
        <div>
            <Mensagem mensagem="Teste"/>
        </div>
    )
}

export default MeuComponente;