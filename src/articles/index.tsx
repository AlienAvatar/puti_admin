import BookIcon from '@mui/icons-material/Book';
import ArticleCreate from './ArticleCreate';
import ArticleEdit from './ArticleEdit';
import ArticleList from './ArticleList';
import ArticleShow from './ArticleShow';

export default {
    list: ArticleList,
    create: ArticleCreate,
    edit: ArticleEdit,
    show: ArticleShow,
    icon: BookIcon,
    recordRepresentation: 'title',
};
