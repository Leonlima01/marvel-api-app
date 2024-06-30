import './Footer.css'
function Footer(){
    const footerStyle = {
        "width":"100%",
        "background-color":"rgb(29, 29, 29)",
        "color":"white",
        "padding":"5px 20px",
        "box-sizing":"border-box",
        "display":"flex",
        "align-items":"end",
        "justify-content":"space-between",
        }
    const linkStyle ={

    }
    return(
        <div className='footer'>
            <div style={{}}>
                <p>&copy; 2024 Leonardo Lima. Todos os direitos reservados.</p>
                <p>Os dados sobre personagens e quadrinhos são fornecidos pela API da Marvel. Todos os direitos reservados à Marvel.</p>
                <ul>
                    <li><a href="https://developer.marvel.com/docs">Documentação da API da Marvel</a></li>
                </ul>
                <p>Meu Contato: <a href="mailto:Leon_lima01@hotmail.com">Leon_lima01@hotmail.com</a></p>
                <p>Portfólio: <a href="https://portfolio-leonardo-lima.web.app/">https://portfolio-leonardo-lima.web.app/</a></p>
            </div>
            <h1 style={{"margin":"30px"}}className="marvel-logo">MARVEL</h1>
        </div>
    );
}

export default Footer