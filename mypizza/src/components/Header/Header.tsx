import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import pizzaLogo from '../../assets/img/pizza-logo.svg';
import cartImg from '../../assets/img/cart.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export const Header = () => {
  const pizzasCount = useSelector<RootState>((state) => state.cart.count);
  const pizzasPrice = useSelector<RootState>((state) => state.cart.price);

  return (
    <header>
      <div className={styles.header__container}>
        <div className={styles.header__logo}>
          <Link to="/">
            <img className={styles.pizza__logo} src={pizzaLogo} alt="pizzalogo" />
          </Link>
          <div className={styles.header__logo_text}>
            <h1>Пицца</h1>
            <h3>самая вкусная пицца во вселенной</h3>
          </div>
        </div>
        <div>
          <Link to="/cart">
            <button className={styles.cart__button}>
              <div className={styles.header__cart_btn}>
                <span className={styles.span}>{Number(pizzasPrice)} RUB</span>
                <div className={styles.button__right_icon_and_quantity}>
                  <img className={styles.cart__icon} src={cartImg} alt="carticon" />
                  <span className={styles.span}>{Number(pizzasCount)}</span>
                </div>
              </div>
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};
