import parse from 'html-react-parser';
const ShowArticle = ({article}) => {
    return (
        <section>
            {article.title}
            <br/>
            {parse(article.description)}
        </section>
    )
}

export default ShowArticle