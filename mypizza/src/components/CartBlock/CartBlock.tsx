import s from './CartBlock.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { CartItem } from '../CartItem/CartItem';
import { clearCart } from '../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';

export const CartBlock = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const pizzasCount = useSelector((state: RootState) => state.cart.count);
  const pizzasPrice = useSelector((state: RootState) => state.cart.price);
  const dispatch = useDispatch()
  const clearOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(clearCart())
  }

  return (
    <div className={s.cart__container}>
      <div className={s.cart__header}>
        <h2>Корзина</h2>
        <button onClick={clearOnClick}>Очистить корзину</button>
      </div>
      <div className={s.cart__list}>
        {items.map((item, index: number) => (
          <CartItem {...{ ...item, index }} />
        ))}
      </div>
      <div className={s.cart__price_quant}>
        <div className={s.quant}>
          Всего пицц: <span>{Number(pizzasCount)}шт</span>
        </div>
        <div className={s.price}>
          сумма заказа: <span>{Number(pizzasPrice)} Р</span>
        </div>
      </div>
      <div className={s.nav_buttons}>
      <Link to="/">
        <button>Вернуться назад</button>
      </Link>
        <button>Оплатить</button>
      </div>
    </div>
  );
};
