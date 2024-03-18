import { useState, Children } from 'react';
import styles from './Slider.module.css';
import arrow from './../../images/icons/arrow.svg';
import Image from 'next/image';

interface SliderPropsType {
    width: number,
    height: number,
    duration: string,
    itemsCount: number,
    borderRadius?: number,
    children: any
}


const Slider: React.FC<SliderPropsType> = ({width, height,  duration, itemsCount, borderRadius, children}) => {


    const [translate, setTranslate] = useState<number>(0);


    const translateValue: number = -((itemsCount - 2 ) * width);


    const nextHandler = () => {
        if (translate >= translateValue) {
            setTranslate(translate - width);
        }
    }


    
    const backHandler = () => {
        if (translate < 0) {
            setTranslate(translate + width);
        }
    }

    return (
        <section className={styles.main}>
            <button onClick={backHandler} className={styles.backBtn}><Image src={arrow} alt='' width={24} height={24} style={{'transform': 'rotate(180deg)'}} /></button>
            <div className={styles.window} style={{'width': width, 'height': height,  'borderRadius': borderRadius}}>
                <div className={styles.all_items} style={{'transform': `translateX(${translate}px)`, 'transition': `transform ${duration} ease`}}>
                    {Children.map(children, child => {
                        return (
                            <div className={styles.item} style={{'width': width, 'height': height}}>{child}</div>
                        )
                    })}
                </div>
            </div>
            <button className={styles.forwardBtn} onClick={nextHandler}><Image src={arrow} alt='' width={24} height={24}/></button>
        </section>
    )
}

export { Slider };