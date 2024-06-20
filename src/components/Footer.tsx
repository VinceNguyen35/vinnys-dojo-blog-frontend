const Footer = () => {
    return (
        <footer className="footer">
            <a
                href="https://github.com/VinceNguyen35"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img
                    className="github-icon"
                    src="/github-icon.svg"
                    alt="github icon"
                />
                <p><strong>Github: </strong>github.com/VinceNguyen35</p>
            </a>
            <a
                href="https://github.com/VinceNguyen35/vinnys-dojo-blog-frontend"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img
                    className="laptop"
                    src="/laptop.svg"
                    alt="laptop icon"
                />
                <p><strong>Frontend: </strong>github.com/VinceNguyen35/vinnys-dojo-blog-frontend</p>
            </a>
            <a
                href="https://github.com/VinceNguyen35/vinnys-dojo-blog-backend"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img
                    className="server"
                    src="/server.svg"
                    alt="server icon"
                />
                <p><strong>Backend: </strong>github.com/VinceNguyen35/vinnys-dojo-blog-backend</p>
            </a>
        </footer>
    );
}
 
export default Footer;