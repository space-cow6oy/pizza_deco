import { FC, useCallback, useRef, useState } from 'react';
import styles from './PizzaBlock.module.scss';
import cl from 'classnames';
import { addToCart } from '../../redux/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

type PizzaBlockProps = {
  id: string;
  imageUrl: string;
  price: number;
  sizes: number[];
  title: string;
  types: number[];
};

export const PizzaBlock: FC<PizzaBlockProps> = ({ id, imageUrl, price, sizes, title, types }) => {
  const pizzaTypes = ['Тонкое', 'Традиционное'];

  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const realSize = sizes[activeSize];
  const realId = useRef(id);

  const dispatch = useDispatch();
  const items = useSelector((state: any) => state.cart.items);

  // console.log(realId, activeTyp);

  const cartClick = () => {
    dispatch(
      addToCart({
        id: realId.current,
        imageUrl,
        price,
        activeSize: realSize,
        title,
        activeType: pizzaTypes[activeSize],
        count: 1,
      }),
    );

    // const activeItem: any = items.filter((item: any)=>{
    //   console.log('item', item)
    //   return item.id === realId && item.activeSize === realSize && item.activeType === pizzaTypes[activeSize]
    // })
    // // console.log('activeItem' , activeItem)
    // if(!activeItem.length === 0 ){//          ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR
    //   console.log('count', activeItem.count)
    //   return activeItem.count
    // }else {
    //   return ''
    // }
  };

  // setActiveCount()

  return (
    <>
      <div className={styles.pizza_container}>
        <div>
          <img className={styles.img} src={imageUrl} alt={title} />
        </div>
        <div>
          <h3 className={styles.h3}>{title}</h3>
          <div className={styles.switch}>
            <div className={styles.switch__type}>
              {types.map((type, index) => (
                <span
                  key={index}
                  onClick={() => setActiveType(index)}
                  className={
                    activeType === index
                      ? cl(styles.type__span, styles.type__span_active)
                      : cl(styles.type__span)
                  }>
                  {pizzaTypes[type]}
                </span>
              ))}
            </div>
            <div className={styles.switch__size}>
              {sizes.map((size, index) => (
                <span
                  key={index}
                  onClick={() => setActiveSize(index)}
                  className={
                    activeSize === index
                      ? cl(styles.size__span, styles.size__span_active)
                      : cl(styles.size__span)
                  }>
                  {' '}
                  {size}{' '}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.price_and_button}>
            <span>от {price} Р</span>
            <button onClick={cartClick} className={styles.button}>
              <span>Добавить </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
