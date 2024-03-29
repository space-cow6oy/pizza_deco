import styles from './Navigation.module.scss';
import classnames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveCategory } from '../../redux/slices/filterSlice';

export const Navigation = (/*{ categoryId, setCategoryId }*/) => {
  const navlinks = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const activeCategory = useSelector((state: any) => state.filter.activeCategory);
  const dispatch = useDispatch();

  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        {navlinks.map((link, index) => (
          <li
            onClick={() => dispatch(setActiveCategory(index))}
            className={
              activeCategory === index
                ? classnames(styles.li, styles.li_active)
                : classnames(styles.li)
            }
            key={index}>
            {link}
          </li>
        ))}
      </ul>
    </nav>
  );
};
