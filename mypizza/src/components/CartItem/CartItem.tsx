import React from 'react';
import s from './CartItem.module.css';
import { addItem } from '../../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { CartItemType } from '../../redux/slices/cartSlice';
import { removeItem, clearCart } from '../../redux/slices/cartSlice';

type CartItemProps = CartItemType & {
  index: number;
};

export const CartItem: React.FC<CartItemProps> = ({
  id,
  imageUrl,
  price,
  activeSize,
  title,
  activeType,
  count,
  index,
}) => {
  const dispatch = useDispatch();

  const addItemOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(addItem({ index, price }));
  };

  const removeItemOnClick = () => {
    dispatch(removeItem({ index, price }));
  };

  return (
    <div className={s.list__element}>
      <img className={s.image} src={imageUrl} alt={title} />
      <div className={s.pizza_params__container}>
        <h3>{title}</h3>
        <span>
          {activeType}, {activeSize} см
        </span>
      </div>
      <button onClick={removeItemOnClick}>-</button>
      <span>{count}</span>
      <button onClick={addItemOnClick}>+</button>
      <span>{price} Р</span>
      <button>удалить</button>
    </div>
  );
};
